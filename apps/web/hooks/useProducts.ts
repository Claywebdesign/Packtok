"use client";

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ProductsResponse, ProductFilters } from "@/types/marketplace";

export function useProducts(filters: ProductFilters = {}) {
  const queryKey = ["products", filters];

  return useQuery<ProductsResponse, Error>({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();

      // Add filters to query params
      if (filters.page) params.append("page", filters.page.toString());
      if (filters.limit) params.append("limit", filters.limit.toString());
      if (filters.categoryId) params.append("categoryId", filters.categoryId);
      if (filters.productType)
        params.append("productType", filters.productType);
      if (filters.machineType)
        params.append("machineType", filters.machineType);
      if (filters.condition) params.append("condition", filters.condition);
      if (filters.priceMin)
        params.append("priceMin", filters.priceMin.toString());
      if (filters.priceMax)
        params.append("priceMax", filters.priceMax.toString());
      if (filters.searchTerm) params.append("searchTerm", filters.searchTerm);

      const { data } = await api.get(`/api/v1/products?${params.toString()}`);
      return data.data as ProductsResponse;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
