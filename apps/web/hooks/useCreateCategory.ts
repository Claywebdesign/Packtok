"use client";

import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Category } from "@/types/marketplace";

interface CreateCategoryPayload {
  name: string;
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, CreateCategoryPayload>({
    mutationFn: async (payload: CreateCategoryPayload) => {
      const { data } = await api.post("/api/v1/categories", payload);
      return data.data as Category;
    },
    onSuccess: (data) => {
      toast.success(`Category "${data.name}" created successfully!`);
      // Invalidate categories to refresh the list
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to create category";
      toast.error(message);
    },
  });
}
