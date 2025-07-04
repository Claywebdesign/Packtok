"use client";

import { Button } from "@packtok/ui/components/button";
import { Badge } from "@packtok/ui/components/badge";
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
import {
  MarketplaceProduct,
  MarketplaceProductStatus,
} from "../../../../types/product";
import { Edit, Trash2, MoreHorizontal, Activity } from "lucide-react";
import { cxBadge, cxTypeBadge } from "../../../../utils/badges";
import Image from "next/image";

interface ProductGridProps {
  products: MarketplaceProduct[];
  onEdit: (product: MarketplaceProduct) => void;
  onDelete: (productId: string) => void;
  onStatusChange: (productId: string, status: MarketplaceProductStatus) => void;
  isDeleting: boolean;
}

export function ProductGrid({
  products,
  onEdit,
  onDelete,
  onStatusChange,
  isDeleting,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          {/* Product Image */}
          <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
            <Image
              width={300}
              height={200}
              className="w-full h-full object-contain rounded-t-lg"
              src={product.imagesThumbnail || ""}
              alt={product.title}
              objectFit="contain"
            />
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
                  <DropdownMenuItem onClick={() => onEdit(product)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onStatusChange(product.id, "AVAILABLE")}
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Mark Available
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onStatusChange(product.id, "SOLD")}
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Mark Sold
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onStatusChange(product.id, "OUT_OF_STOCK")}
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
                          This action cannot be undone. This will permanently
                          delete the product &quot;{product.title}&quot; and all
                          associated data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(product.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
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
                  className={`${cxTypeBadge(product.productType)} text-xs`}
                >
                  {product.productType.replace("_", " ")}
                </Badge>
                <Badge className={`${cxBadge(product.status)} text-xs`}>
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
                  <span className="font-medium">{product.manufacturer}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onEdit(product)}
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
                      This action cannot be undone. This will permanently delete
                      the product &quot;{product.title}&quot; and all associated
                      data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(product.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
