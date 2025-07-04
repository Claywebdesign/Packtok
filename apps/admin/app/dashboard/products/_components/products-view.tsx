"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@packtok/ui/components/button";
import { Input } from "@packtok/ui/components/input";
import { Loading } from "@packtok/ui/components/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@packtok/ui/components/select";
import { productTabs } from "../../../../constants/navigation";
import {
  MarketplaceProduct,
  MarketplaceProductStatus,
} from "../../../../types/product";
import { Plus, Search, Filter, Grid3X3, List, Package } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import {
  useProducts,
  useUpdateProductStatus,
  useDeleteProduct,
} from "../../../../hooks";
import { ProductGrid } from "./product-grid";
import { ProductTable } from "./product-table";

type ViewMode = "grid" | "list";
type SortField = "title" | "price" | "quantity" | "productType" | "status";
type SortDirection = "asc" | "desc";

interface ProductsViewProps {
  initialProducts?: MarketplaceProduct[];
}

export function ProductsView({ initialProducts = [] }: ProductsViewProps) {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const { data: products = initialProducts, isLoading, error } = useProducts();
  const updateStatusMutation = useUpdateProductStatus();
  const deleteProductMutation = useDeleteProduct();

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch products");
    }
  }, [error]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEdit = (product: MarketplaceProduct) => {
    console.log("Edit product:", product);
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProductMutation.mutateAsync(productId);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleStatusChange = async (
    productId: string,
    newStatus: MarketplaceProductStatus,
  ) => {
    try {
      await updateStatusMutation.mutateAsync({ productId, status: newStatus });
      toast.success("Product status updated successfully");
    } catch (error) {
      toast.error("Failed to update product status");
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === "all" || product.productType === selectedType;
      return matchesSearch && matchesType;
    });

    if (viewMode === "list") {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
        }
        if (typeof bValue === "string") {
          bValue = bValue.toLowerCase();
        }

        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [searchTerm, selectedType, sortField, sortDirection, viewMode, products]);

  if (isLoading) {
    return <Loading variant="jimu" className="min-h-screen" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4">
        {productTabs.map((tab) => (
          <Link key={tab.value} href={tab.href}>
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? "default" : "outline"}
              onClick={() => setActiveTab(tab.value)}
              className={
                activeTab === tab.value ? "bg-blue-600 text-white" : ""
              }
            >
              {tab.name}
              {tab.value === "add-product" && <span className="ml-2">+</span>}
            </Button>
          </Link>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="MACHINERY">Machinery</SelectItem>
                <SelectItem value="SPARE_PARTS">Spare Parts</SelectItem>
                <SelectItem value="CONSUMABLES">Consumables</SelectItem>
                <SelectItem value="RAW_MATERIALS">Raw Materials</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional View Rendering */}
      {viewMode === "grid" ? (
        <ProductGrid
          products={filteredAndSortedProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          isDeleting={deleteProductMutation.isPending}
        />
      ) : (
        <ProductTable
          products={filteredAndSortedProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      )}

      {/* Empty State */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
