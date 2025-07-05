import React from "react";
import { Button } from "@packtok/ui/components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import AddProductForm from "../_components/add-product-form";

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard/products">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        </div>

        <AddProductForm />
      </div>
    </div>
  );
}
