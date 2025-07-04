import React from "react";
import { Button } from "@packtok/ui/components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import AddProductForm from "../_components/add-product-form";

export default function AddProductPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        </div>
      </div>

      <AddProductForm />
    </div>
  );
}
