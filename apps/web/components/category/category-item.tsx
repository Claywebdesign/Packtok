"use client";

import { CategoryItem as CategoryItemType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CategoryItem({
  title,
  slug,
  subtitle,
  description,
  image,
}: CategoryItemType) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/marketplace/${slug}`);
  };

  return (
    <div
      className="flex flex-col md:gap-8 gap-12 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex md:flex-row flex-col justify-between items-center md:gap-0 gap-4">
        <Image
          src={image}
          alt={title}
          width={600}
          height={600}
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <div className="flex flex-col text-center mx-auto">
          <h3 className="md:text-4xl text-2xl font-bold group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p>{subtitle}</p>
        </div>
      </div>
      <p className="text-gray-500 md:text-base text-sm md:block hidden">
        {description}
      </p>
    </div>
  );
}
