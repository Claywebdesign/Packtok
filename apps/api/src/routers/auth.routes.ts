import { Router } from "express";
import {
  signup,
  verifyUserOtp,
  login,
  logout,
  refresh,
  getCurrentUser,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyUserOtp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);

router.get("/me", authMiddleware, getCurrentUser);

export default router;
