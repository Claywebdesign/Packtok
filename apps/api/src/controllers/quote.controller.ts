import { Request, Response } from "express";
import { createQuoteRequest } from "../services/quote.service";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const createQuote = asyncHandler(async (req: Request, res: Response) => {
  const { productId, companyName, address, message, additionalInfo } = req.body;
  const quote = await createQuoteRequest(req.user!.id, {
    productId,
    companyName,
    address,
    message,
    additionalInfo,
  });
  res.status(201).json(new ApiResponse(201, quote, "Quote request submitted"));
});
