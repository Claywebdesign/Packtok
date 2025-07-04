"use client";

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/marketplace";

export function useProduct(productId: string) {
  return useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/products/${productId}`);
      return data.data as Product;
    },
    enabled: Boolean(productId),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
}
