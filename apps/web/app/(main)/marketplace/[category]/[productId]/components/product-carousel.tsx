"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Maximize2 } from "lucide-react";
import ImageZoomModal from "./image-zoom-modal";
import "./embla.css";

interface ProductCarouselProps {
  images: string[];
  videoUrl?: string;
  videoThumbnail?: string;
  productTitle: string;
  fallbackImage?: string;
}

interface MediaItem {
  type: "image" | "video";
  src: string;
  thumbnail: string;
}

export default function ProductCarousel({
  images,
  videoUrl,
  videoThumbnail,
  productTitle,
  fallbackImage,
}: ProductCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    loop: false,
    align: "center",
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  // Prepare media items
  const mediaItems: MediaItem[] = [];

  // Add images
  if (images && images.length > 0) {
    images.forEach((image) => {
      mediaItems.push({
        type: "image",
        src: image,
        thumbnail: image,
      });
    });
  }

  // Add video if available
  if (videoUrl && videoThumbnail) {
    console.log("Adding video:", { videoUrl, videoThumbnail });
    mediaItems.push({
      type: "video",
      src: videoUrl,
      thumbnail: videoThumbnail,
    });
  }

  // Debug: Log all media items
  console.log("All media items:", mediaItems);

  // Fallback if no media
  if (mediaItems.length === 0 && fallbackImage) {
    mediaItems.push({
      type: "image",
      src: fallbackImage,
      thumbnail: fallbackImage,
    });
  }

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setZoomModalOpen(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isHovered) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage positions
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setMousePosition({ x: xPercent, y: yPercent });
  };

  const handleMouseEnter = () => {
    if (mediaItems[selectedIndex]?.type === "image") {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (mediaItems.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <Image
          src="/placeholder.jpg"
          alt={productTitle}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative group">
        <div
          className="embla bg-gray-100 overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ height: "500px" }}
          ref={emblaMainRef}
        >
          <div className="embla__container flex h-full">
            {mediaItems.map((item, index) => (
              <div
                className="embla__slide relative flex-[0_0_100%] h-full"
                key={index}
              >
                <div
                  ref={index === selectedIndex ? imageRef : null}
                  className="relative w-full h-full group"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.type === "image" ? (
                    <>
                      <Image
                        src={item.src}
                        alt={`${productTitle} - Image ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                      {/* Magnifier lens */}
                      {isHovered && index === selectedIndex && (
                        <div
                          className="absolute w-32 h-32 border-2 border-white shadow-xl pointer-events-none z-10 rounded-full"
                          style={{
                            left: `${mousePosition.x}%`,
                            top: `${mousePosition.y}%`,
                            transform: "translate(-50%, -50%)",
                            background: "rgba(255, 255, 255, 0.15)",
                            backdropFilter: "blur(1px)",
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={item.src}
                        poster={item.thumbnail}
                        controls
                        className="w-full h-full object-contain"
                        preload="metadata"
                      />
                    </div>
                  )}
                  {/* Fullscreen button */}
                  <button
                    onClick={() => handleImageClick(index)}
                    className="absolute top-4 right-4 p-2 bg-black bg-opacity-20 hover:bg-opacity-40 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <Maximize2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        {mediaItems.length > 1 && (
          <>
            <button
              className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-90 flex items-center justify-center transition-all duration-300 z-10 shadow-md opacity-0 group-hover:opacity-100 ${
                selectedIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
              }`}
              onClick={scrollPrev}
              disabled={selectedIndex === 0}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-90 flex items-center justify-center transition-all duration-300 z-10 shadow-md opacity-0 group-hover:opacity-100 ${
                selectedIndex === mediaItems.length - 1 ? "opacity-30 cursor-not-allowed" : ""
              }`}
              onClick={scrollNext}
              disabled={selectedIndex === mediaItems.length - 1}
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Magnified Image Display - positioned to the right on desktop */}
      {isHovered && mediaItems[selectedIndex]?.type === "image" && (
        <div className="hidden lg:block absolute left-full top-0 ml-6 w-96 h-96 z-20">
          <div className="w-full h-full bg-white border border-gray-200 shadow-xl overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${mediaItems[selectedIndex].src})`,
                backgroundSize: "300%",
                backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      )}

      {/* Thumbnails */}
      {mediaItems.length > 1 && (
        <div className="mt-4">
          <div className="embla-thumbs" ref={emblaThumbsRef}>
            <div className="embla__container flex gap-2">
              {mediaItems.map((item, index) => (
                <div
                  key={index}
                  className="embla__slide flex-[0_0_auto] min-w-0"
                  style={{ width: "100px" }}
                >
                  <button
                    onClick={() => onThumbClick(index)}
                    className={`relative w-full overflow-hidden transition-all duration-300 ${
                      item.type === "video" ? "bg-gray-800" : "bg-gray-100"
                    } ${
                      index === selectedIndex
                        ? "ring-2 ring-blue-500"
                        : "ring-1 ring-gray-300 hover:ring-gray-400"
                    }`}
                    style={{ height: "100px" }}
                  >
                    {item.thumbnail ? (
                      item.type === "video" ? (
                        <Image
                          width={100}
                          height={100}
                          src={item.thumbnail}
                          alt={`Thumbnail ${index + 1} (Video)`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.log(
                              `Failed to load video thumbnail: ${item.thumbnail}`
                            );
                            console.log(`Video URL: ${item.src}`);
                            e.currentTarget.style.display = "none";
                          }}
                          onLoad={() => {
                            console.log(
                              `Successfully loaded video thumbnail: ${item.thumbnail}`
                            );
                          }}
                        />
                      ) : (
                        <Image
                          src={item.thumbnail}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="100px"
                          onError={(e) => {
                            console.log(
                              `Failed to load image thumbnail: ${item.thumbnail}`
                            );
                          }}
                        />
                      )
                    ) : (
                      <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                        <span className="text-white text-xs">No Image</span>
                      </div>
                    )}
                    {item.type === "video" && (
                      <div className="absolute inset-0 bg-[#5f5f5f98] bg-opacity-20 flex items-center justify-center z-10">
                        <div className="bg-white bg-opacity-95 rounded-full p-2 shadow-lg">
                          <Play
                            className="w-5 h-5 text-gray-800"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      <ImageZoomModal
        isOpen={zoomModalOpen}
        onClose={() => setZoomModalOpen(false)}
        mediaItems={mediaItems}
        currentIndex={selectedIndex}
        productTitle={productTitle}
      />
    </div>
  );
}
