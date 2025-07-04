"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Heart,
  Minus,
  Plus,
  ChevronDown,
  ChevronUp,
  Play,
  FileText,
} from "lucide-react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import QuoteModal from "./quote-modal";

interface ProductDetailsProps {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    imagesThumbnail: string;
    videoUrl?: string;
    specifications: any;
    condition: string;
    manufacturer?: string;
    model?: string;
    year?: number;
    additionalInfo?: string;
    category: {
      name: string;
    };
    productType: string;
    machineType?: string;
    quantity: number;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const { user, accessToken } = useAuthStore();
  const router = useRouter();

  const images = product.images || [];
  const hasImages = images.length > 0;
  const hasVideo = product.videoUrl && product.videoThumbnail;
  const hasPdf = product.pdfUrl;

  // Prepare gallery items for react-image-gallery
  const galleryItems = [];

  // Add images
  if (hasImages) {
    images.forEach((image) => {
      galleryItems.push({
        original: image,
        thumbnail: image,
      });
    });
  }

  // Add video if available
  if (hasVideo) {
    galleryItems.push({
      original: product.videoUrl,
      thumbnail: product.videoThumbnail,
      renderItem: () => (
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          <video
            src={product.videoUrl}
            controls
            className="max-w-full max-h-full object-contain"
            poster={product.videoThumbnail}
          />
        </div>
      ),
    });
  }

  // Fallback if no media
  if (galleryItems.length === 0 && product.imagesThumbnail) {
    galleryItems.push({
      original: product.imagesThumbnail,
      thumbnail: product.imagesThumbnail,
    });
  }

  const handleQuantityChange = (increment: boolean) => {
    setQuantity((prev) => {
      if (increment) {
        return Math.min(prev + 1, product.quantity);
      } else {
        return Math.max(prev - 1, 1);
      }
    });
  };

  const handleQuoteClick = () => {
    if (!user || !accessToken) {
      router.push("/auth/signin");
      return;
    }
    setShowQuoteModal(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const specifications = product.specifications || {};

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {galleryItems.length > 0 ? (
            <ImageGallery
              items={galleryItems}
              showThumbnails={galleryItems.length > 1}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={galleryItems.length > 1}
              autoPlay={false}
              slideDuration={500}
              slideInterval={3000}
              thumbnailPosition="bottom"
              useBrowserFullscreen={true}
            />
          ) : (
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src="/placeholder.jpg"
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">11 Reviews</span>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

          {/* Product Description */}
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Specifications */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Specifications</h3>
            <div className="space-y-1 text-sm text-gray-600">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </span>
                  <span className="ml-2">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Quantity ({product.quantity} available)
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(false)}
                className={`p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors ${
                  quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-semibold min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(true)}
                className={`p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors ${
                  quantity >= product.quantity
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={quantity >= product.quantity}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Wishlist
            </button>
            <button
              onClick={handleQuoteClick}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Send Quote
            </button>
            {hasPdf && (
              <a
                href={product.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Download Specifications
              </a>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">SKU</span>
              <span className="font-medium">
                {product.id ? product.id.slice(-8).toUpperCase() : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">CATEGORY</span>
              <span className="font-medium">
                {product.category?.name || "N/A"}
              </span>
            </div>
            {product.manufacturer && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">MANUFACTURER</span>
                <span className="font-medium">{product.manufacturer}</span>
              </div>
            )}
            {product.model && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">MODEL</span>
                <span className="font-medium">{product.model}</span>
              </div>
            )}
            {product.year && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">YEAR</span>
                <span className="font-medium">{product.year}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">CONDITION</span>
              <span className="font-medium">{product.condition}</span>
            </div>
          </div>

          {/* Additional Info */}
          {product.additionalInfo && (
            <div className="border-t pt-4">
              <button
                onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="font-semibold">Additional Info</span>
                {showAdditionalInfo ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {showAdditionalInfo && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Details</h4>
                    <p className="text-sm text-gray-600">
                      {product.additionalInfo}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Packaging</h4>
                    <p className="text-sm text-gray-600">
                      Width: 20 " Height: 1 ¼ " Length: 21 ¼ "
                      <br />
                      Weight: 7 lb 8 oz
                      <br />
                      Package(s): 1
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12 border-t pt-8">
        <div className="flex border-b">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
            Questions
          </button>
          <button className="px-4 py-2 border-b-2 border-black text-black font-medium">
            Reviews
          </button>
        </div>
        <div className="py-8">
          <p className="text-gray-600">
            No reviews yet. Be the first to review this product.
          </p>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        productId={product.id}
        productTitle={product.title}
      />
    </div>
  );
}
