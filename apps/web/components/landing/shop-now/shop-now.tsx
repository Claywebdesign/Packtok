import React from "react";
import machinery from "@/assets/machinery.png";
import spareParts from "@/assets/spare-parts.png";
import rawMaterials from "@/assets/raw-materials.png";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ShopNow() {
  return (
    <div className="flex gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 w-[95%] sm:w-[90%] md:w-[85%] mx-auto">
      {/* Left Rectangle - Full Height */}
      <div className="w-1/2 bg-gray-100 p-2 sm:p-4 md:p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-2 font-bold">Machinery</h2>
          <Link
            href={"/marketplace/machinery"}
            className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed border-b border-gray-800 inline-flex items-center gap-1"
          >
            Shop Now <ArrowRight className="inline-block" size={16} />
          </Link>
        </div>
        <Image
          src={machinery}
          alt="machinery"
          className="w-full h-auto object-cover mt-2 sm:mt-4"
        />
      </div>

      {/* Right Side - Two Rectangles */}
      <div className="w-1/2 flex flex-col gap-2 md:gap-4">
        {/* Top Right Rectangle */}
        <div className="h-1/2 bg-gray-100 p-2 sm:p-4 md:p-6 flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-4 md:gap-6">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-2 font-bold">
              Spare Parts
            </h3>
            <Link
              href={"/marketplace/spare-parts"}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-left border-b border-gray-800 inline-flex items-center gap-1"
            >
              Shop Now <ArrowRight className="inline-block" size={16} />
            </Link>
          </div>
          <Image
            src={spareParts}
            alt="spare parts"
            className="object-cover flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-48 lg:h-48"
          />
        </div>

        {/* Bottom Right Rectangle */}
        <div className="h-1/2 bg-gray-100 p-2 sm:p-4 md:p-6 flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-4 md:gap-6">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-2 font-bold">
              Raw Materials
            </h3>
            <Link
              href={"/marketplace/raw-materials"}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-left border-b border-gray-800 inline-flex items-center gap-1"
            >
              Shop Now <ArrowRight className="inline-block" size={16} />
            </Link>
          </div>
          <Image
            src={rawMaterials}
            alt="raw materials"
            className="object-cover flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-48 lg:h-48"
          />
        </div>
      </div>
    </div>
  );
}
