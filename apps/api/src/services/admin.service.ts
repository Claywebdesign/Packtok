import { Permission, Role, User, prisma } from "@packtok/db";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError";

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10);

export const createAdminUser = async (
  adminData: Omit<User, "id" | "createdAt" | "updatedAt" | "verified" | "role">,
  permissions: Permission[]
): Promise<User> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: adminData.email },
  });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    adminData.password,
    BCRYPT_SALT_ROUNDS
  );

  const newAdmin = await prisma.user.create({
    data: {
      ...adminData,
      password: hashedPassword,
      role: Role.ADMIN,
      verified: true, // Admins are created as verified
    },
  });

  if (permissions && permissions.length > 0) {
    await prisma.adminPermission.createMany({
      data: permissions.map((permission) => ({
        userId: newAdmin.id,
        permission: permission,
      })),
    });
  }

  return newAdmin;
};
