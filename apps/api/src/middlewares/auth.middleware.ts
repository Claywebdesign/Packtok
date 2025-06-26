import { Permission, User, prisma } from "@packtok/db";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

declare global {
  namespace Express {
    interface Request {
      user?: User & { permissions: Permission[] };
    }
  }
}

export const authMiddleware = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    let decodedToken: { sub: string; email?: string };
    try {
      decodedToken = jwt.verify(
        token,
        config.supabase.jwtSecret as jwt.Secret
      ) as { sub: string; email?: string };
    } catch {
      throw new ApiError(401, "Invalid access token");
    }

    const userId = decodedToken.sub;


    let user: any = await prisma.user.findUnique({
      where: { id: userId },
      include: { adminPermissions: true },
    });


    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          name: "", // To be updated later from the client if needed
          email: decodedToken.email ?? "", // fallback empty string
        },
        include: { adminPermissions: true },
      } as any);
    }

    const permissions = (user.adminPermissions ?? []).map(
      (p: any) => p.permission
    );

    const rest = { ...user } as User;
    delete (rest as any).adminPermissions;

    req.user = {
      ...rest,
      permissions,
    };

    next();
  }
);
