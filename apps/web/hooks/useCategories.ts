"use client";

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types/marketplace";

export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/categories");
      return data.data as Category[];
    },
    staleTime: 60 * 60 * 1000, // 1 hour (categories don't change often)
    refetchOnWindowFocus: false,
  });
}
