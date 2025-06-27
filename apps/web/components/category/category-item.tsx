import { CategoryItem as CategoryItemType } from "@/types";
import Image from "next/image";

export default function CategoryItem({
  title,
  subtitle,
  description,
  image,
}: CategoryItemType) {
  return (
    <div className="flex flex-col md:gap-8 gap-12">
      <div className="flex md:flex-row flex-col justify-between items-center md:gap-0 gap-4">
        <Image src={image} alt={title} width={600} height={600} />
        <div className="flex flex-col text-center mx-auto">
          <h3 className="md:text-4xl text-2xl font-bold">{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      <p className="text-gray-500 md:text-base text-sm md:block hidden">
        {description}
      </p>
    </div>
  );
}
