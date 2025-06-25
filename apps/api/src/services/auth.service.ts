import { User, prisma } from "@packtok/db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import config from "../config";
import { ApiError } from "../utils/apiError";
import logger from "../utils/logger";

const resend = new Resend(config.resend.apiKey);

// Dynamically configurable cost factor; default to 12 if env not set
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10);

// Constant-time SHA-256 hash for refresh-tokens
const hashRefreshToken = (token: string): string =>
  crypto
    .createHash("sha256")
    .update(token + config.jwt.secret)
    .digest("hex");

export const registerUser = async (
  userData: Omit<User, "id" | "createdAt" | "updatedAt" | "verified" | "role">
): Promise<User> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    userData.password,
    BCRYPT_SALT_ROUNDS
  );
  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });

  await sendVerificationOtp(user.email);

  return user;
};

export const sendVerificationOtp = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = crypto
    .createHash("sha256")
    .update(otp + config.jwt.secret)
    .digest("hex");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.otp.upsert({
    where: { userId: user.id },
    update: { hashedOtp, expiresAt },
    create: { userId: user.id, hashedOtp, expiresAt },
  });

  await resend.emails.send({
    from: config.resend.fromEmail,
    to: email,
    subject: "Your Verification Code",
    html: `<p>Your OTP is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
  });
};

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { otp: true },
  });

  if (!user || !user.otp) {
    throw new ApiError(400, "Invalid OTP request");
  }

  const hashedCandidate = crypto
    .createHash("sha256")
    .update(otp + config.jwt.secret)
    .digest("hex");

  if (
    user.otp.hashedOtp !== hashedCandidate ||
    user.otp.expiresAt < new Date()
  ) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { verified: true },
  });

  await prisma.otp.delete({ where: { id: user.otp.id } });

  return true;
};

const generateTokens = async (userId: string) => {
  const accessToken = jwt.sign(
    { sub: userId },
    config.jwt.secret as jwt.Secret,
    {
      expiresIn: config.jwt.accessExpiration,
    } as jwt.SignOptions
  );

  const refreshToken = jwt.sign(
    { sub: userId },
    config.jwt.secret as jwt.Secret,
    {
      expiresIn: config.jwt.refreshExpiration,
    } as jwt.SignOptions
  );

  const hashedRefreshToken = hashRefreshToken(refreshToken);
  await prisma.refreshToken.create({
    data: {
      userId,
      hashedToken: hashedRefreshToken,
    },
  });

  return { accessToken, refreshToken };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{
  accessToken: string;
  refreshToken: string;
  user: Omit<User, "password">;
}> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.verified) {
    await sendVerificationOtp(email);
    throw new ApiError(
      403,
      "Account not verified. A new OTP has been sent to your email."
    );
  }

  const { accessToken, refreshToken } = await generateTokens(user.id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _unused, ...userWithoutPassword } = user;

  return { accessToken, refreshToken, user: userWithoutPassword };
};

export const refreshAccessToken = async (token: string): Promise<string> => {
  const decoded = jwt.verify(token, config.jwt.secret as jwt.Secret) as {
    sub: string;
  };
  const userId = decoded.sub;

  const userRefreshTokens = await prisma.refreshToken.findMany({
    where: { userId },
  });
  if (!userRefreshTokens.length) {
    throw new ApiError(401, "No valid session found");
  }

  const hashedCandidate = hashRefreshToken(token);
  const tokenMatch = userRefreshTokens.some(
    (rt) => rt.hashedToken === hashedCandidate
  );

  if (!tokenMatch) throw new ApiError(401, "Invalid refresh token");

  const newAccessToken = jwt.sign(
    { sub: userId },
    config.jwt.secret as jwt.Secret,
    {
      expiresIn: config.jwt.accessExpiration,
    } as jwt.SignOptions
  );

  return newAccessToken;
};

export const logoutUser = async (token: string): Promise<void> => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret as jwt.Secret) as {
      sub: string;
    };
    const userId = decoded.sub;

    const userRefreshTokens = await prisma.refreshToken.findMany({
      where: { userId },
    });

    const hashedCandidate = hashRefreshToken(token);

    for (const rt of userRefreshTokens) {
      if (rt.hashedToken === hashedCandidate) {
        await prisma.refreshToken.delete({ where: { id: rt.id } });
        break;
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    logger.warn("Logout attempt with invalid token");
  }
};
