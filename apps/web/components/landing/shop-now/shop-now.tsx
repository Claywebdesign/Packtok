import React from "react";
import machinery from "@/assets/machinery.png";
import spareParts from "@/assets/spare-parts.png";
import rawMaterials from "@/assets/raw-materials.png";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ShopNow() {
  return (
    <div className="flex gap-2 md:gap-4 p-2 md:p-4 w-full md:w-[85%] max-w-[95%] mx-auto">
      {/* Left Rectangle - Full Height */}
      <div className="w-1/2 bg-gray-100 p-2 sm:p-4 md:p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-4xl mb-2">Machinery</h2>
          <Link
            href={"/marketplace/machinery"}
            className="text-sm md:text-lg leading-relaxed border-b border-gray-800"
          >
            Shop Now <ArrowRight className="inline-block" size={20} />
          </Link>
        </div>
        <Image
          src={machinery}
          alt="machinery"
          className="w-full h-auto object-cover mt-4"
        />
      </div>

      {/* Right Side - Two Rectangles */}
      <div className="w-1/2 flex flex-col gap-2 md:gap-4">
        {/* Top Right Rectangle */}
        <div className="h-1/2 bg-gray-100 p-2 sm:p-4 md:p-6 flex flex-col sm:flex-row items-center sm:items-end gap-2 md:gap-6">
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl md:text-4xl mb-2">
              Spare Parts
            </h3>
            <Link
              href={"/marketplace/spare-parts"}
              className="text-sm md:text-lg text-left border-b border-gray-800"
            >
              Shop Now <ArrowRight className="inline-block" size={20} />
            </Link>
          </div>
          <Image
            src={spareParts}
            alt="spare parts"
            className="object-cover flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48"
          />
        </div>

        {/* Bottom Right Rectangle */}
        <div className="h-1/2 bg-gray-100 p-2 sm:p-4 md:p-6 flex flex-col sm:flex-row items-center sm:items-end gap-2 md:gap-6">
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl md:text-4xl mb-2">
              Raw Materials
            </h3>
            <Link
              href={"/marketplace/raw-materials"}
              className="text-sm md:text-lg text-left border-b border-gray-800"
            >
              Shop Now <ArrowRight className="inline-block" size={20} />
            </Link>
          </div>
          <Image
            src={rawMaterials}
            alt="raw materials"
            className="object-cover flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48"
          />
        </div>
      </div>
    </div>
  );
}
