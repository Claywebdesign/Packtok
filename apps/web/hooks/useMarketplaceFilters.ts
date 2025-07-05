"use client";

import { useState, useCallback } from "react";
import { MachineType } from "@/types/marketplace";

export interface MarketplaceFilters {
  categories: string[];
  machineType: MachineType[];
  priceRange: {
    min: string;
    max: string;
  };
}

const initialFilters: MarketplaceFilters = {
  categories: [],
  machineType: [],
  priceRange: { min: "", max: "" },
};

export function useMarketplaceFilters() {
  const [filters, setFilters] = useState<MarketplaceFilters>(initialFilters);

  const updateFilter = useCallback(
    (filterType: keyof MarketplaceFilters, value: string, checked: boolean) => {
      setFilters((prev) => {
        if (filterType === "priceRange") {
          const PRICE_RANGES = [
            { min: "0", max: "50000", label: "0 - 50k Lakhs" },
            { min: "50000", max: "100000", label: "50k - 1L Lakhs" },
            { min: "100000", max: "250000", label: "1L - 2.5L Lakhs" },
            { min: "250000", max: "500000", label: "2.5L - 5L Lakhs" },
            { min: "500000", max: "", label: "5L+ Lakhs" },
          ];

          const range = PRICE_RANGES.find((r) => r.label === value);
          if (range) {
            return {
              ...prev,
              priceRange: checked
                ? { min: range.min, max: range.max }
                : { min: "", max: "" },
            };
          }
          return prev;
        }

        const currentValues = prev[filterType] as (MachineType | string)[];
        if (checked) {
          return {
            ...prev,
            [filterType]: [...currentValues, value],
          };
        } else {
          return {
            ...prev,
            [filterType]: currentValues.filter((v) => v !== value),
          };
        }
      });
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const hasActiveFilters = useCallback(() => {
    return (
      filters.categories.length > 0 ||
      filters.machineType.length > 0 ||
      filters.priceRange.min !== "" ||
      filters.priceRange.max !== ""
    );
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters: hasActiveFilters(),
  };
}
