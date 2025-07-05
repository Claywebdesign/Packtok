"use client";

import { useGetProduct } from "../../../../../hooks";
import EditProductForm from "../../_components/edit-product-form";
import { Loading } from "@packtok/ui/components/loading";
import { Button } from "@packtok/ui/components/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface EditProductPageClientProps {
  productId: string;
}

export default function EditProductPageClient({
  productId,
}: EditProductPageClientProps) {
  const router = useRouter();
  const { data: product, isLoading, error } = useGetProduct(productId);

  if (isLoading) {
    return <Loading variant="jimu" className="min-h-screen" />;
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you&apos;re looking for doesn&apos;t exist or you
            don&apos;t have permission to view it.
          </p>
          <Button
            onClick={() => router.push("/dashboard/products")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/products")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
      </div>

      <EditProductForm product={product} />
    </>
  );
}
