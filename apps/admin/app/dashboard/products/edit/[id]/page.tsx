import EditProductPageClient from "./edit-product-page-client";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <EditProductPageClient productId={params.id} />
      </div>
    </div>
  );
}
