"use client";

import { useState } from "react";
import { CategoryItem } from "@/types";
import { useMarketplaceFilters } from "@/hooks";
import CategorySidebar from "./category-sidebar";
import ProductGrid from "./product-grid";
import MobileFilterOverlay from "./mobile-filter-overlay";

interface CategoryContentProps {
  category: CategoryItem;
}

export default function CategoryContent({ category }: CategoryContentProps) {
  const { filters, updateFilter, resetFilters, hasActiveFilters } =
    useMarketplaceFilters();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Count active filters
  const activeFilterCount =
    filters.machineType.length +
    (filters.priceRange.min || filters.priceRange.max ? 1 : 0);

  return (
    <div className="py-8">
      <div className="flex lg:flex-row flex-col gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block lg:w-80 flex-shrink-0">
          <CategorySidebar
            category={category}
            filters={filters}
            onFilterChange={updateFilter}
            onResetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <ProductGrid
            category={category}
            filters={filters}
            onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
            hasActiveFilters={hasActiveFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <MobileFilterOverlay
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        category={category}
        filters={filters}
        onFilterChange={updateFilter}
        onResetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}
