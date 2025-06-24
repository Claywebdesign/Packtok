"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import slider1 from "@/assets/slider-1.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const images = [slider1, slider1, slider1];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative select-none w-[85%] mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, idx) => (
            <div className="flex-[0_0_100%] relative" key={idx}>
              <Image
                src={image}
                alt={"image"}
                width={1920}
                height={740}
                sizes="(max-width: 768px) 100vw, 1920px"
                className="object-cover w-full h-[657px] md:h-[740px]"
                priority={idx == 0}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md ${prevBtnEnabled ? "opacity-100 hover:bg-gray-100" : "opacity-50 cursor-not-allowed"}`}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md ${nextBtnEnabled ? "opacity-100 hover:bg-gray-100" : "opacity-50 cursor-not-allowed"}`}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
