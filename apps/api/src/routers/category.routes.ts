import { Role } from "@packtok/db";
import { Router } from "express";
import {
  getCategories,
  postCategory,
  removeCategory,
} from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { hasRole } from "../middlewares/roles.middleware";

const router = Router();

router.get("/", getCategories);
router.post("/", authMiddleware, /* any authenticated user */ postCategory);
router.delete(
  "/:id",
  authMiddleware,
  hasRole(Role.ADMIN, Role.SUPER_ADMIN),
  removeCategory
);

export default router;
