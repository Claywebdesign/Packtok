import { fetchJson } from "../../../lib/fetcher";
import { MarketplaceProduct } from "../../../types/product";
import { ProductsView } from "./_components/products-view";

async function getProducts(): Promise<MarketplaceProduct[]> {
  try {
    return await fetchJson<MarketplaceProduct[]>("/api/v1/admins/products");
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <ProductsView initialProducts={products} />
    </div>
  );
}
