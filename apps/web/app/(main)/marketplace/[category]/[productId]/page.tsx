import { notFound } from "next/navigation";
import { Newsletter } from "@/components";
import ProductDetails from "./components/product-details";

interface ProductPageProps {
  params: {
    category: string;
    productId: string;
  };
}

async function getProduct(productId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${productId}`,
      {
        cache: "no-store",
      }
    );
    console.log("Fetching product:", response);

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.productId);
  console.log("Product data:", product);
  if (!product) {
    notFound();
  }

  return (
    <main>
      <div className="w-[85%] mt-16 mx-auto">
        <ProductDetails product={product.data} />
      </div>
      <Newsletter />
    </main>
  );
}
