import Image from "next/image";
import newsletterLeft from "@/assets/newsletter-left.png";
import newsletterRight from "@/assets/newsletter-right.png";
import { Button } from "@packtok/ui";

export default function Newsletter() {
  return (
    <div className="relative w-full mx-auto py-16 bg-gradient-to-r from-gray-50 to-white overflow-hidden">
      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto text-center">
        <h1 className="text-xl md:text-4xl font-light text-gray-900 mb-3 tracking-wide">
          Join Our Newsletter
        </h1>
        <h4 className="text-base md:text-lg text-gray-600 mb-8 font-light">
          Sign up for deals, new products and promotions
        </h4>
        <form className="w-[90%]">
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-gray-900 transition-colors duration-300 px-4">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 py-4 px-0 text-sm md:text-lg bg-transparent border-none outline-none placeholder-gray-400 text-gray-900"
            />
            <Button
              type="submit"
              className="ml-4 px-6 py-2 bg-gray-900 text-white text-sm font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-none"
            >
              Join
            </Button>
          </div>
        </form>
      </div>

      {/* Left image absolute */}
      <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-visible md:block hidden">
        <Image
          src={newsletterLeft}
          alt="Newsletter Left Image"
          className="object-contain"
          width={700}
          height={700}
        />
      </div>

      {/* Right image absolute */}
      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 overflow-visible md:block hidden">
        <Image
          src={newsletterRight}
          alt="Newsletter Right Image"
          className="object-contain"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
}
