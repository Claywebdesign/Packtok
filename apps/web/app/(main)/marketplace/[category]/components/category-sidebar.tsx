"use client";

import { useRouter } from "next/navigation";
import { CategoryItem } from "@/types";
import { Checkbox } from "@packtok/ui/components/checkbox";
import { Button } from "@packtok/ui/components/button";
import { MarketplaceFilters } from "@/hooks/useMarketplaceFilters";
import { useCategories } from "@/hooks";

interface CategorySidebarProps {
  category: CategoryItem;
  filters: MarketplaceFilters;
  onFilterChange: (
    filterType: keyof MarketplaceFilters,
    value: string,
    checked: boolean
  ) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  isMobileOverlay?: boolean;
}

const MACHINE_TYPES = [
  { value: "MONO_CARTON" as const, label: "Mono Carton" },
  { value: "MASTER_CARTON" as const, label: "Master Carton" },
  { value: "BOTH" as const, label: "Both" },
  { value: "OTHER" as const, label: "Other" },
];

const PRICE_RANGES = [
  { min: "0", max: "50000", label: "0 - 50k Lakhs" },
  { min: "50000", max: "100000", label: "50k - 1L Lakhs" },
  { min: "100000", max: "250000", label: "1L - 2.5L Lakhs" },
  { min: "250000", max: "500000", label: "2.5L - 5L Lakhs" },
  { min: "500000", max: "", label: "5L+ Lakhs" },
];

export default function CategorySidebar({
  category,
  filters,
  onFilterChange,
  onResetFilters,
  hasActiveFilters,
  isMobileOverlay = false,
}: CategorySidebarProps) {
  const router = useRouter();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  return (
    <div
      className={`space-y-6 ${isMobileOverlay ? "p-0" : "bg-white rounded-lg border p-4 lg:p-6"}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <h3 className="text-lg font-semibold">Filter</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="text-blue-600 hover:text-blue-800"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3 text-sm lg:text-base">CATEGORIES</h4>
        {categoriesLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {categories?.map((cat) => (
              <div key={cat.id} className="flex items-center space-x-2">
                <Checkbox
                  id={cat.id}
                  checked={filters.categories.includes(cat.id)}
                  onCheckedChange={(checked) =>
                    onFilterChange("categories", cat.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={cat.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {cat.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Machine Type Filter - only show for Machinery */}
      {category.title === "Machinery" && (
        <div>
          <h4 className="font-medium mb-3 text-sm lg:text-base">
            MACHINE TYPE
          </h4>
          <div className="space-y-2">
            {MACHINE_TYPES.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={type.value}
                  checked={filters.machineType.includes(type.value)}
                  onCheckedChange={(checked) =>
                    onFilterChange(
                      "machineType",
                      type.value,
                      checked as boolean
                    )
                  }
                />
                <label
                  htmlFor={type.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range Filter */}
      <div>
        <h4 className="font-medium mb-3 text-sm lg:text-base">PRICE</h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <div key={range.label} className="flex items-center space-x-2">
              <Checkbox
                id={range.label}
                checked={
                  filters.priceRange.min === range.min &&
                  filters.priceRange.max === range.max
                }
                onCheckedChange={(checked) =>
                  onFilterChange("priceRange", range.label, checked as boolean)
                }
              />
              <label
                htmlFor={range.label}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
