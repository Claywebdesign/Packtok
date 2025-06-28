import { CategoryList, Footer, Newsletter, PageHeader } from "@/components";
import { marketplaceCategories } from "@/constant";

export default function Page() {
  return (
    <main>
      <div className="w-[85%] mx-auto">
        <PageHeader
          title="Marketplace"
          subtitle="Explore Our Machinery & Industrial Solutions."
          image="/marketplace1.png"
        />
        <CategoryList categoryDataList={marketplaceCategories} />
      </div>
      <Newsletter />
      <Footer />
    </main>
  );
}
