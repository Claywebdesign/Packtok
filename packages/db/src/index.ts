import { logger } from "@packtok/utils";
import { PrismaClient } from "@prisma/client";

// Augment the global scope with a `prisma` property so the singleton
// instance can be reused across module reloads in development.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * A singleton instance of the Prisma Client.
 *
 * This implementation prevents the creation of multiple Prisma Client instances
 * in development environments due to hot-reloading with tools like Next.js or tsx.
 * In production, it ensures a single, efficient connection pool is maintained.
 *
 * It's configured with extensive logging for better observability:
 * - Emits query events for detailed performance tracking.
 * - Logs info, warnings, and errors to the console.
 * - Error formatting is 'pretty' in development and 'minimal' in production.
 */
const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "stdout",
        level: "info",
      },
      {
        emit: "stdout",
        level: "warn",
      },
      {
        emit: "stdout",
        level: "error",
      },
    ],
    errorFormat: process.env.NODE_ENV === "production" ? "minimal" : "pretty",
  });

// Subscribe to query events for detailed logging.
// During the first run, Prisma types may not yet be generated which causes
// type-checking issues.  Cast the callback param to `any` to avoid errors
// until `pnpm prisma generate` has been executed.
// @ts-expect-error – Prisma types are not present until `prisma generate` is executed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
prisma.$on("query", (e: any) => {
  logger.info(
    {
      query: e.query,
      params: e.params,
      duration: `${e.duration}ms`,
    },
    "Prisma query executed"
  );
});

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// Re-export all types from '@prisma/client' so they can be easily
// imported from this single module across your monorepo.
export * from "@prisma/client";

// Export the instantiated Prisma Client singleton.
export { prisma };
