import { Router } from "express";
import {
  getCurrentUser,
  login,
  logout,
  refresh,
  signup,
  verifyUserOtp,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/verify-otp", verifyUserOtp);

router.get("/me", authMiddleware, getCurrentUser);

export default router;


