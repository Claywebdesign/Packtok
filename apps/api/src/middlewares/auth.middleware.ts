import { Permission, User, prisma } from "@packtok/db";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, "password"> & { permissions: Permission[] };
    }
  }
}

export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, config.jwt.secret as jwt.Secret) as {
      sub: string;
    };
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.sub },
      include: { adminPermissions: true },
    });

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...userWithoutPassword } = user;
    const permissions = user.adminPermissions.map((p) => p.permission);

    req.user = { ...userWithoutPassword, permissions };
    next();
  }
);
