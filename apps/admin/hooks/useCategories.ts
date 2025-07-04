"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import { Category } from "../types/product";
import { QK } from "../utils/queryKeys";

// Fetch all categories
export function useCategories() {
  return useQuery({
    queryKey: QK.categories,
    queryFn: async (): Promise<Category[]> => {
      const { data } = await api.get("/api/v1/categories");
      return data.data || data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes (categories don't change often)
  });
}

// Create category mutation
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryData: { name: string }): Promise<Category> => {
      const { data } = await api.post("/api/v1/categories", categoryData);
      return data.data || data;
    },
    onSuccess: () => {
      // Invalidate categories query to refetch
      queryClient.invalidateQueries({ queryKey: QK.categories });
    },
  });
}

// Delete category mutation
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId: string): Promise<void> => {
      await api.delete(`/api/v1/categories/${categoryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QK.categories });
    },
  });
}
