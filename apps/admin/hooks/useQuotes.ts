"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import { QuoteRequest, QuoteStatus } from "../types/product";

// Fetch all quote requests (admin)
export function useQuotes() {
  return useQuery({
    queryKey: ["quotes"],
    queryFn: async (): Promise<QuoteRequest[]> => {
      const { data } = await api.get("/api/v1/admins/quotes");
      return data.data || data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Update quote status mutation
export function useUpdateQuoteStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      quoteId,
      status,
    }: {
      quoteId: string;
      status: QuoteStatus;
    }): Promise<QuoteRequest> => {
      const { data } = await api.put(`/api/v1/admins/quotes/${quoteId}`, {
        status,
      });
      return data.data || data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
}

// Get single quote request
export function useQuote(quoteId: string) {
  return useQuery({
    queryKey: ["quote", quoteId],
    queryFn: async (): Promise<QuoteRequest> => {
      const { data } = await api.get(`/api/v1/admins/quotes/${quoteId}`);
      return data.data || data;
    },
    enabled: !!quoteId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
