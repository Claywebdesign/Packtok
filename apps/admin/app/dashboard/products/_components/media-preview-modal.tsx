"use client";

import { Button } from "@packtok/ui/components/button";
import { X, Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { useState, useEffect } from "react";

interface MediaPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  mediaType: "image" | "video";
  mediaName: string;
}

export default function MediaPreviewModal({
  isOpen,
  onClose,
  mediaUrl,
  mediaType,
  mediaName,
}: MediaPreviewModalProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setZoom(1);
      setRotation(0);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.25));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = mediaUrl;
    link.download = mediaName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50 p-4 flex items-center justify-between">
        <div className="text-white">
          <h3 className="font-medium truncate max-w-md">{mediaName}</h3>
          <p className="text-sm text-gray-300 capitalize">{mediaType} Preview</p>
        </div>
        
        <div className="flex items-center gap-2">
          {mediaType === "image" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 0.25}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRotate}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center w-full h-full p-16">
        {mediaType === "image" ? (
          <img
            src={mediaUrl}
            alt={mediaName}
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
            }}
            onClick={onClose}
          />
        ) : (
          <video
            src={mediaUrl}
            controls
            className="max-w-full max-h-full"
            autoPlay
          />
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm text-center bg-black bg-opacity-50 px-4 py-2 rounded-lg">
        {mediaType === "image" ? (
          <p>Click image or press <span className="font-mono bg-white/20 px-1 rounded">Esc</span> to close</p>
        ) : (
          <p>Press <span className="font-mono bg-white/20 px-1 rounded">Esc</span> to close</p>
        )}
      </div>

      {/* Backdrop click handler */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  );
}