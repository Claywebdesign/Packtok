import features1 from "@/assets/features1.png";
import features2 from "@/assets/features2.png";
import features3 from "@/assets/features3.png";
import features4 from "@/assets/features4.png";
import {
  ChevronRight,
  DollarSign,
  LockKeyhole,
  Phone,
  TruckElectric,
} from "lucide-react";
import Image from "next/image";

const GridSection = () => {
  // Sample data for the main grid items
  const mainGridItems = [
    {
      id: 1,
      heading: "Turnkey Projects",
      image: features1,
    },
    {
      id: 2,
      heading: "Maintainance & Servicing",
      image: features2,
    },
    {
      id: 3,
      heading: "Consultancy Services",
      image: features3,
    },
    {
      id: 4,
      heading: "Sell Old Machinery",
      image: features4,
    },
  ];

  // Sample data for the smaller grid items
  const smallGridItems = [
    {
      id: 1,
      icon: <TruckElectric />,
      heading: "Free Shipping",
      subtext: "Orders above 20000",
    },
    {
      id: 2,
      icon: <DollarSign />,
      heading: "Money Back",
      subtext: "30 Days Return Guarantee",
    },
    {
      id: 3,
      icon: <LockKeyhole />,
      heading: "Secure Payments",
      subtext: "Secured",
    },
    {
      id: 4,
      icon: <Phone />,
      heading: "24/7 Support",
      subtext: "Phone and Email Support",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Main Grid - 4 squares with images and text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {mainGridItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 p-4 sm:p-6 h-72 sm:h-80 md:h-96 lg:h-[28rem] flex md:flex-row flex-col items-center justify-between transition-all duration-300 hover:shadow-lg hover:bg-gray-50 overflow-hidden"
          >
            {/* Left side - Text content */}
            <div className="flex-1 pr-0 sm:pr-4">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-gray-900 mb-2 leading-tight font-bold">
                {item.heading}
              </h3>
              <div className="flex items-center cursor-pointer group border-b w-fit">
                <span className="text-xs sm:text-sm font-medium">See more</span>
                <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Right side - Image placeholder */}
            <div className="flex-shrink-0 mt-4 md:mt-0">
              <Image
                src={item.image}
                alt={item.heading}
                height={225}
                width={400}
                className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-96 h-auto object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Smaller Grid - 4 squares with just headings */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {smallGridItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 p-3 sm:p-4 h-28 sm:h-32 flex items-left justify-center transition-all duration-300 hover:shadow-md hover:bg-gray-50 cursor-pointer flex-col"
          >
            <div className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">
              {item.icon}
            </div>
            <h4 className="text-xs sm:text-sm md:text-base font-medium text-gray-900 text-left">
              {item.heading}
            </h4>
            <p className="text-xs text-gray-500 text-left hidden sm:block">
              {item.subtext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridSection;
