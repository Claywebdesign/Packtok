import CategoryItem from "./category-item";
import { CategoryItem as CategoryItemType } from "@/types";

export default function CategoryList({
  categoryDataList,
}: {
  categoryDataList: CategoryItemType[];
}) {
  return (
    <div className="flex flex-col gap-8 py-8">
      {categoryDataList.map((category, idx) => (
        <CategoryItem
          key={idx}
          title={category.title}
          subtitle={category.subtitle}
          description={category.description}
          image={category.image}
        />
      ))}
    </div>
  );
}
