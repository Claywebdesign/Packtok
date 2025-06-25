import { Role } from "@packtok/db";
import { Router } from "express";
import { createAdmin } from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { hasRole } from "../middlewares/roles.middleware";

const router = Router();

router.post("/create", authMiddleware, hasRole(Role.SUPER_ADMIN), createAdmin);

export default router;
