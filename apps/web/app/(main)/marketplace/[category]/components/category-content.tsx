"use client";

import { useState, useEffect } from "react";
import { CategoryItem } from "@/types";
import { useMarketplaceFilters } from "@/hooks";
import CategorySidebar from "./category-sidebar";
import ProductGrid from "./product-grid";
import MobileFilterOverlay from "./mobile-filter-overlay";

interface CategoryContentProps {
  category: CategoryItem;
  initialSearchTerm?: string;
}

export default function CategoryContent({
  category,
  initialSearchTerm,
}: CategoryContentProps) {
  const {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    setSearchTerm,
  } = useMarketplaceFilters();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Set initial search term from URL if provided
  useEffect(() => {
    if (initialSearchTerm && initialSearchTerm !== filters.searchTerm) {
      setSearchTerm(initialSearchTerm);
    }
  }, [initialSearchTerm, filters.searchTerm, setSearchTerm]);

  // Count active filters
  const activeFilterCount =
    filters.categories.length +
    filters.machineType.length +
    filters.conditions.length +
    filters.productTypes.length +
    filters.priceRanges.length +
    (filters.searchTerm ? 1 : 0) +
    Object.values(filters.customFilters).reduce(
      (acc, values) => acc + values.length,
      0
    );

  return (
    <div className="py-8">
      <div className="flex lg:flex-row flex-col gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block lg:w-56 flex-shrink-0">
          <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <CategorySidebar
              category={category}
              filters={filters}
              onFilterChange={updateFilter}
              onResetFilters={resetFilters}
              hasActiveFilters={hasActiveFilters}
              onSearchChange={setSearchTerm}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <ProductGrid
            category={category}
            filters={filters}
            onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
            hasActiveFilters={hasActiveFilters}
            activeFilterCount={activeFilterCount}
            onResetFilters={resetFilters}
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
        onSearchChange={setSearchTerm}
      />
    </div>
  );
}
