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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
      {/* Main Grid - 4 squares with images and text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {mainGridItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-lg p-6 sm:p-8 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col sm:flex-row items-center justify-between transition-all duration-300 hover:shadow-lg hover:bg-gray-50"
          >
            {/* Left side - Text content */}
            <div className="flex-1 w-full sm:w-auto sm:pr-6 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-4 leading-tight font-bold">
                {item.heading}
              </h3>
              <div className="flex items-center justify-center sm:justify-start cursor-pointer group border-b w-fit mx-auto sm:mx-0">
                <span className="text-sm sm:text-base font-medium">
                  See more
                </span>
                <ChevronRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Right side - Image placeholder */}
            <div className="flex-shrink-0 mt-6 sm:mt-0 w-full sm:w-auto">
              <Image
                src={item.image}
                alt={item.heading}
                height={225}
                width={400}
                className="w-full max-w-[250px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[320px] h-auto object-cover mx-auto sm:mx-0"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Smaller Grid - 4 squares with just headings */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {smallGridItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-lg p-4 sm:p-6 min-h-[120px] sm:min-h-[140px] flex items-start justify-start transition-all duration-300 hover:shadow-md hover:bg-gray-50 cursor-pointer flex-col"
          >
            <div className="mb-2 sm:mb-3 text-gray-700 text-base sm:text-lg">
              {item.icon}
            </div>
            <h4 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 text-left mb-1">
              {item.heading}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 text-left">
              {item.subtext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridSection;
