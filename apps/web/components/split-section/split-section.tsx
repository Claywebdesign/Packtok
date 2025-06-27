import { ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type SplitSectionProps = {
  title: string;
  description: string;
  image: StaticImageData | string;
};

export default function SplitSection({
  title,
  description,
  image,
}: SplitSectionProps) {
  return (
    <div>
      <div className="flex flex-col lg:flex-row h-[65vh]">
        {/* Left side - Image */}
        <div className="w-full lg:w-1/2 h-64 lg:h-full">
          <Image
            src={image}
            alt="Featured product"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Text content */}
        <div className="w-full lg:w-1/2 bg-gray-100 p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-2xl lg:text-4xl  text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 text-sm md:text-lg mb-8 leading-relaxed">
            {description}
          </p>
          <Link
            href={"/marketplace"}
            className="flex items-center border-b w-fit md:text-base text-sm"
          >
            Shop Now
            <ArrowRight className="h-5 w-5 inline ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
