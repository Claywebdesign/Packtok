import { Router } from "express";
import { createQuote } from "../controllers/quote.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createQuote);

export default router;
