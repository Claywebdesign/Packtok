import { Permission, Role } from "@packtok/db";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";

export const hasRole = (...requiredRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }
    if (!requiredRoles.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden: Insufficient role"));
    }
    next();
  };
};

export const hasPermission = (...requiredPermissions: Permission[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }

    // Super admin has all permissions
    if (req.user.role === Role.SUPER_ADMIN) {
      return next();
    }

    if (req.user.role !== Role.ADMIN) {
      return next(new ApiError(403, "Forbidden: Admin role required"));
    }

    const userPermissions: Permission[] = req.user.permissions ?? [];

    const hasRequiredPermissions = requiredPermissions.every((p) =>
      userPermissions.includes(p)
    );

    if (!hasRequiredPermissions) {
      return next(new ApiError(403, "Forbidden: Insufficient permissions"));
    }

    next();
  };
};
