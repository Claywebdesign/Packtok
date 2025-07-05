import { Prisma, QuoteStatus, prisma } from "@packtok/db";
import { ApiError } from "../utils/apiError";

export const createQuoteRequest = async (
  userId: string,
  data: Omit<Prisma.QuoteRequestUncheckedCreateInput, "userId" | "status"> & {
    productId: string;
  }
) => {
  return prisma.quoteRequest.create({
    data: {
      ...data,
      userId,
      status: QuoteStatus.PENDING,
    },
  });
};

export const getAllQuoteRequests = async () => {
  return prisma.quoteRequest.findMany({
    include: {
      user: {
        select: { id: true, name: true, email: true, phone_number: true, country: true },
      },
      product: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateQuoteStatus = async (
  quoteId: string,
  status: QuoteStatus
) => {
  const quote = await prisma.quoteRequest.findUnique({
    where: { id: quoteId },
  });
  if (!quote) {
    throw new ApiError(404, "Quote request not found");
  }
  return prisma.quoteRequest.update({
    where: { id: quoteId },
    data: { status },
  });
};
