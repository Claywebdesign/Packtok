"use client";

import { useState, useMemo } from "react";
import { Button } from "@packtok/ui/components/button";
import { Input } from "@packtok/ui/components/input";
import { Badge } from "@packtok/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@packtok/ui/components/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@packtok/ui/components/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@packtok/ui/components/alert-dialog";
import { productTabs } from "constants/navigation";
import { MarketplaceProduct, MarketplaceProductStatus } from "types/product";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Package,
  Edit,
  Trash2,
  Grid3X3,
  List,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import {
  useProducts,
  useUpdateProductStatus,
  useDeleteProduct,
} from "../../../hooks";

type ViewMode = "grid" | "list";
type SortField = "title" | "price" | "quantity" | "productType" | "status";
type SortDirection = "asc" | "desc";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Use hooks for data fetching and mutations
  const { data: products = [], isLoading, error } = useProducts();
  const updateStatusMutation = useUpdateProductStatus();
  const deleteProductMutation = useDeleteProduct();

  // Handle error state
  if (error) {
    toast.error("Failed to fetch products");
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEdit = (product: MarketplaceProduct) => {
    // Navigate to edit page - for now just log
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

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 ml-1" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      AVAILABLE: "bg-green-100 text-green-800",
      OUT_OF_STOCK: "bg-red-100 text-red-800",
      DRAFT: "bg-yellow-100 text-yellow-800",
      SOLD: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      MACHINERY: "bg-blue-100 text-blue-800",
      SPARE_PARTS: "bg-purple-100 text-purple-800",
      CONSUMABLES: "bg-orange-100 text-orange-800",
      RAW_MATERIALS: "bg-teal-100 text-teal-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
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
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="MACHINERY">Machinery</option>
              <option value="SPARE_PARTS">Spare Parts</option>
              <option value="CONSUMABLES">Consumables</option>
              <option value="RAW_MATERIALS">Raw Materials</option>
            </select>
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
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                <Package className="h-12 w-12 text-gray-400" />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
                    {product.title}
                  </h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="z-50">
                      <DropdownMenuItem onClick={() => handleEdit(product)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(product.id, "AVAILABLE")
                        }
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        Mark Available
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(product.id, "SOLD")}
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        Mark Sold
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(product.id, "OUT_OF_STOCK")
                        }
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        Mark Out of Stock
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the product "{product.title}"
                              and all associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(product.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              {deleteProductMutation.isPending
                                ? "Deleting..."
                                : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={`${getTypeBadge(product.productType)} text-xs`}
                    >
                      {product.productType.replace("_", " ")}
                    </Badge>
                    <Badge
                      className={`${getStatusBadge(product.status)} text-xs`}
                    >
                      {product.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Stock:</span>
                    <span className="font-medium">{product.quantity} pcs</span>
                  </div>

                  {product.manufacturer && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Brand:</span>
                      <span className="font-medium">
                        {product.manufacturer}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the product "{product.title}" and all
                          associated data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {deleteProductMutation.isPending
                            ? "Deleting..."
                            : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View with Table */
        <div className="bg-white rounded-lg shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 px-6">Image</TableHead>
                <TableHead className="py-4 px-6">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                    onClick={() => handleSort("title")}
                  >
                    Product Name
                    <SortIcon field="title" />
                  </Button>
                </TableHead>
                <TableHead className="py-4 px-6">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                    onClick={() => handleSort("productType")}
                  >
                    Type
                    <SortIcon field="productType" />
                  </Button>
                </TableHead>
                <TableHead className="py-4 px-6">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                    onClick={() => handleSort("price")}
                  >
                    Price
                    <SortIcon field="price" />
                  </Button>
                </TableHead>
                <TableHead className="py-4 px-6">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                    onClick={() => handleSort("quantity")}
                  >
                    Stock
                    <SortIcon field="quantity" />
                  </Button>
                </TableHead>
                <TableHead className="py-4 px-6">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                    onClick={() => handleSort("status")}
                  >
                    Status
                    <SortIcon field="status" />
                  </Button>
                </TableHead>
                <TableHead className="py-4 px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="py-4 px-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-400" />
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {product.title}
                      </div>
                      <div className="text-gray-500 text-xs line-clamp-1">
                        {product.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Badge
                      className={`${getTypeBadge(product.productType)} text-xs`}
                    >
                      {product.productType.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 px-6 font-medium">
                    ${product.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    {product.quantity} pcs
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Badge
                      className={`${getStatusBadge(product.status)} text-xs`}
                    >
                      {product.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="z-50">
                        <DropdownMenuItem onClick={() => handleEdit(product)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(product.id, "AVAILABLE")
                          }
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Mark Available
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(product.id, "SOLD")}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Mark Sold
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(product.id, "OUT_OF_STOCK")
                          }
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Mark Out of Stock
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(product)}
                          variant="destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
