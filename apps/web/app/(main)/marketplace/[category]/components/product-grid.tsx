"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CategoryItem,
  ProductFilters,
  ProductType,
  ProductCondition,
} from "@/types";
import { Badge } from "@packtok/ui/components/badge";
import { Button } from "@packtok/ui/components/button";
import { Card, CardContent } from "@packtok/ui/components/card";
import { Filter } from "lucide-react";
import Image from "next/image";
import { useProducts, MarketplaceFilters } from "@/hooks";
import Pagination from "@/components/pagination/pagination";

interface ProductGridProps {
  category: CategoryItem;
  filters: MarketplaceFilters;
  onOpenMobileFilters?: () => void;
  hasActiveFilters?: boolean;
  activeFilterCount?: number;
}

export default function ProductGrid({
  category,
  filters,
  onOpenMobileFilters,
  hasActiveFilters,
  activeFilterCount,
}: ProductGridProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState<
    ProductCondition | "ALL"
  >("ALL");

  // Build query filters
  const queryFilters = useMemo((): ProductFilters => {
    // Map category title to productType for API
    const productTypeMap: { [key: string]: ProductType } = {
      Machinery: "MACHINERY",
      "Spare Parts": "SPARE_PARTS",
      "Raw Materials": "RAW_MATERIALS",
      Consumables: "CONSUMABLES",
    };

    const productType = productTypeMap[category.title];

    return {
      productType,
      categoryId:
        filters.categories.length > 0 ? filters.categories[0] : undefined,
      condition: selectedCondition !== "ALL" ? selectedCondition : undefined,
      machineType:
        filters.machineType.length > 0
          ? (filters.machineType[0] as
              | "MONO_CARTON"
              | "MASTER_CARTON"
              | "BOTH"
              | "OTHER")
          : undefined,
      priceMin: filters.priceRange.min
        ? parseInt(filters.priceRange.min)
        : undefined,
      priceMax: filters.priceRange.max
        ? parseInt(filters.priceRange.max)
        : undefined,
      page: currentPage,
      limit: 20,
    };
  }, [category.title, filters, selectedCondition, currentPage]);

  // Use the products hook
  const { data: productsData, isLoading, error } = useProducts(queryFilters);
  const products = productsData?.items || [];
  const totalPages = Math.ceil((productsData?.total || 0) / 20);
  const handleProductClick = (productId: string) => {
    router.push(`/marketplace/product/${productId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category.title, filters, selectedCondition]);

  return (
    <div>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onOpenMobileFilters}
          className="w-full flex items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && activeFilterCount && (
            <Badge
              variant="secondary"
              className="ml-2 bg-blue-100 text-blue-800"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl lg:text-2xl font-semibold">{category.title}</h2>
        <div className="flex gap-2">
          <Button
            variant={selectedCondition === "ALL" ? "default" : "outline"}
            size="sm"
            className="text-xs lg:text-sm"
            onClick={() => setSelectedCondition("ALL")}
          >
            All Equipment
          </Button>
          <Button
            variant={selectedCondition === "NEW" ? "default" : "outline"}
            size="sm"
            className="text-xs lg:text-sm"
            onClick={() => setSelectedCondition("NEW")}
          >
            New Equipment
          </Button>
          <Button
            variant={selectedCondition === "USED" ? "default" : "outline"}
            size="sm"
            className="text-xs lg:text-sm"
            onClick={() => setSelectedCondition("USED")}
          >
            Used Equipment
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-48 lg:h-56 bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden cursor-pointer group border-none shadow-none"
              onClick={() => handleProductClick(product.id)}
            >
              <CardContent className="p-0">
                <div className="relative bg-[#F3F5F7]">
                  <Image
                    src={
                      product.imagesThumbnail ||
                      product.images[0] ||
                      "/marketplace1.png"
                    }
                    alt={product.title}
                    width={400}
                    height={300}
                    className="h-48 lg:h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-800">★★★★★</span>
                  </div>
                  <h3 className="font-semibold text-base lg:text-lg mb-1 text-gray-900">
                    {product.manufacturer || "Corrugated Machinery"}
                  </h3>
                  {product.productType !== "MACHINERY" && (
                    <p className="text-lg font-bold text-gray-900">
                      ${product.price || "39.99"}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="text-center py-12">
          {error ? (
            <>
              <h3 className="text-xl font-semibold text-red-600 mb-4">
                Error loading products
              </h3>
              <p className="text-gray-500">
                Please try again later or contact support if the problem
                persists.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-600 mb-4">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or check back later for new listings.
              </p>
            </>
          )}
        </div>
      )}

      {!isLoading && productsData && (
        <div className="mt-8 space-y-4">
          <div className="text-center text-gray-500">
            <p>
              Showing {products.length} of {productsData.total} product
              {productsData.total !== 1 ? "s" : ""}
            </p>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-6"
          />
        </div>
      )}
    </div>
  );
}
