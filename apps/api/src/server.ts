import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
  ErrorRequestHandler,
  Express,
  Request,
  Response,
} from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
import config from "./config";
import adminRouter from "./routers/admin.routes";
import authRouter from "./routers/auth.routes";
import { ApiError } from "./utils/apiError";
import logger from "./utils/logger";

const app: Express = express();

app.use(pinoHttp({ logger }));
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.get("/healthcheck", (req: Request, res: Response): void => {
  res.status(200).send("OK");
});

// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admins", adminRouter);

// Global Error Handler
const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ApiError) {
    res.status((err as ApiError).statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  logger.error(err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

app.use(errorHandler);

// Start the HTTP server only when this file is executed directly (e.g. pnpm dev)
if (require.main === module) {
  const port = Number(config.port);
  app.listen(port, () => {
    logger.info(`API server listening on port ${port}`);
  });
}

export default app;
