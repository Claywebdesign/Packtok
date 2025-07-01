import { Request, Response, NextFunction, RequestHandler } from "express";

// Allow async handlers to return any value (e.g., an Express `Response` object)
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown> | unknown;

const asyncHandler =
  (requestHandler: AsyncRequestHandler): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };

export { asyncHandler };
