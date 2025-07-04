// Auth hooks
export { useCurrentUser } from "./useCurrentUser";
export { useLogin } from "./useLogin";

// Marketplace hooks
export {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useUpdateProductStatus,
  useDeleteProduct,
} from "./useProducts";

export {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
} from "./useCategories";

export {
  useSubmissions,
  useApproveSubmission,
  useRejectSubmission,
} from "./useSubmissions";

export { useQuotes, useUpdateQuoteStatus, useQuote } from "./useQuotes";

// Re-export types
export type { Submission } from "./useSubmissions";
