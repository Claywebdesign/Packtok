"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@packtok/ui/components/button";
import CategorySidebar from "./category-sidebar";
import { CategoryItem } from "@/types";
import { MarketplaceFilters } from "@/hooks/useMarketplaceFilters";

interface MobileFilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  category: CategoryItem;
  filters: MarketplaceFilters;
  onFilterChange: (
    filterType: keyof MarketplaceFilters,
    value: string,
    checked: boolean
  ) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export default function MobileFilterOverlay({
  isOpen,
  onClose,
  category,
  filters,
  onFilterChange,
  onResetFilters,
  hasActiveFilters,
}: MobileFilterOverlayProps) {
  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#4d4b4b67] z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <CategorySidebar
            category={category}
            filters={filters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
            hasActiveFilters={hasActiveFilters}
            isMobileOverlay
          />
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <Button onClick={onClose} className="w-full" size="sm">
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
}
