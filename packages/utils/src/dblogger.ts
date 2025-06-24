import pino from "pino";

/**
 * A pre-configured logger instance.
 *
 * In a development environment, it uses a human-readable format.
 * In production, it defaults to JSON format for easy parsing by log management systems.
 */
export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,
});
