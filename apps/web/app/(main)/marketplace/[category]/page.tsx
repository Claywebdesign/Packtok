import { notFound } from "next/navigation";
import { PageHeader, Newsletter } from "@/components";
import { marketplaceCategories } from "@/constant";
import CategoryContent from "./components/category-content";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category;
  const category = marketplaceCategories.find(
    (cat) => cat.slug === categorySlug
  );

  if (!category) {
    notFound();
  }

  return (
    <main>
      <div className="w-[85%] mx-auto">
        <PageHeader
          title={category.title}
          subtitle={category.subtitle}
          image={category.image}
        />
        <CategoryContent category={category} />
      </div>
      <Newsletter />
    </main>
  );
}
