"use client";

import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import React from "react";
import Image from "next/image";

interface MediaItem {
  type: "image" | "video";
  src: string;
  thumbnail: string;
}

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: MediaItem[];
  currentIndex: number;
  productTitle: string;
}

export default function ImageZoomModal({
  isOpen,
  onClose,
  mediaItems,
  currentIndex,
  productTitle,
}: ImageZoomModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const imageRef = useRef<HTMLDivElement>(null);

  const currentItem = mediaItems[activeIndex];
  const canNavigate = mediaItems.length > 1;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setActiveIndex(currentIndex);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentIndex]);

  const navigatePrev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [activeIndex]);

  const navigateNext = useCallback(() => {
    if (activeIndex < mediaItems.length - 1) {
      setActiveIndex(activeIndex + 1);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [activeIndex, mediaItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && canNavigate) {
        navigatePrev();
      } else if (e.key === "ArrowRight" && canNavigate) {
        navigateNext();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose, canNavigate, navigateNext, navigatePrev]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      setPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.max(0.5, Math.min(4, prev + delta)));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Navigation buttons */}
        {canNavigate && (
          <>
            <button
              onClick={navigatePrev}
              disabled={activeIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors"
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </button>
            <button
              onClick={navigateNext}
              disabled={activeIndex === mediaItems.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors"
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </button>
          </>
        )}

        {/* Zoom controls */}
        {currentItem.type === "image" && (
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button
              onClick={handleZoomIn}
              className="p-3 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors"
              disabled={scale >= 4}
            >
              <ZoomIn className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-3 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors"
              disabled={scale <= 0.5}
            >
              <ZoomOut className="w-6 h-6 text-white" />
            </button>
          </div>
        )}

        {/* Scale indicator */}
        {currentItem.type === "image" && (
          <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-black bg-opacity-50 rounded-full">
            <span className="text-white text-sm">
              {Math.round(scale * 100)}%
            </span>
          </div>
        )}

        {/* Image counter */}
        {canNavigate && (
          <div className="absolute bottom-4 right-4 z-10 px-3 py-1 bg-black bg-opacity-50 rounded-full">
            <span className="text-white text-sm">
              {activeIndex + 1} / {mediaItems.length}
            </span>
          </div>
        )}

        {/* Media container */}
        <div
          ref={imageRef}
          className={`relative w-full h-full flex items-center justify-center overflow-hidden ${
            currentItem.type === "image" && scale > 1
              ? "cursor-move"
              : "cursor-zoom-in"
          }`}
          onMouseDown={
            currentItem.type === "image" ? handleMouseDown : undefined
          }
          onMouseMove={
            currentItem.type === "image" ? handleMouseMove : undefined
          }
          onMouseUp={currentItem.type === "image" ? handleMouseUp : undefined}
          onMouseLeave={
            currentItem.type === "image" ? handleMouseUp : undefined
          }
          onWheel={currentItem.type === "image" ? handleWheel : undefined}
        >
          {currentItem.type === "image" ? (
            <div
              className="relative transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                width: "90vw",
                height: "90vh",
              }}
            >
              <Image
                src={currentItem.src}
                alt={`${productTitle} - Image ${activeIndex + 1}`}
                fill
                className="object-contain"
                draggable={false}
              />
            </div>
          ) : (
            <video
              src={currentItem.src}
              controls
              autoPlay
              className="max-w-full max-h-full object-contain"
              style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
