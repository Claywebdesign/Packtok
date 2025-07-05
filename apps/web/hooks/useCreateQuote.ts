"use client";

import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { CreateQuotePayload, QuoteRequest } from "@/types/marketplace";

export function useCreateQuote() {
  const queryClient = useQueryClient();

  return useMutation<QuoteRequest, Error, CreateQuotePayload>({
    mutationFn: async (payload: CreateQuotePayload) => {
      const { data } = await api.post("/api/v1/quotes", payload);
      return data.data as QuoteRequest;
    },
    onSuccess: (_data) => {
      toast.success("Quote request submitted successfully!");
      // Invalidate and refetch any related queries
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
    onError: (error: Error) => {
      const axiosError = error as any;
      const message =
        axiosError?.response?.data?.message || "Failed to submit quote request";
      toast.error(message);
    },
  });
}
