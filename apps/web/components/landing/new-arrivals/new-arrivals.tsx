import Link from "next/link";
import ProductCard from "./product-card";
import { ArrowRight } from "lucide-react";

const newArrivalsData = [
  {
    id: 1,
    name: "Cake Machine",
    price: 299,
    originalPrice: 399,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Cake Machine",
    price: 89,
    originalPrice: 120,
    rating: 5,
  },
  {
    id: 3,
    name: "Cake Machine",
    price: 179,
    originalPrice: 250,
    rating: 4,
  },
  {
    id: 4,
    name: "Cake Machine",
    price: 129,
    originalPrice: 180,
    rating: 4.5,
  },
  {
    id: 5,
    name: "Cake Machine",
    price: 49,
    originalPrice: 75,
    rating: 5,
  },
];

export default function NewArrivals() {
  return (
    <section className="py-6 sm:py-8 md:py-10 w-[95%] sm:w-[90%] md:w-[85%] mx-auto">
      <div className="container mx-auto px-4">
        {/* Section Header - Left Aligned */}
        <div className="mb-6 sm:mb-8 md:mb-12 flex md:flex-row flex-col justify-between md:items-center items-left gap-4 md:gap-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 font-bold">New Arrivals</h2>
          <Link
            href={"/marketplace"}
            className="items-center flex border-b w-fit text-sm sm:text-base md:text-lg gap-1"
          >
            More Products <ArrowRight size={16} className="sm:w-5 sm:h-5" />
          </Link>
        </div>

        {/* Horizontally Scrollable Product List */}
        <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-6 sm:pb-8 -mx-4 px-4 no-scrollbar">
          {newArrivalsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
