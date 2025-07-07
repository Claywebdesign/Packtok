"use client";

import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  disabled?: boolean;
}

export function Tooltip({ content, children, side = "right", disabled = false }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let x = 0;
      let y = 0;

      switch (side) {
        case "right":
          x = containerRect.right + 8;
          y = containerRect.top + (containerRect.height - tooltipRect.height) / 2;
          break;
        case "left":
          x = containerRect.left - tooltipRect.width - 8;
          y = containerRect.top + (containerRect.height - tooltipRect.height) / 2;
          break;
        case "top":
          x = containerRect.left + (containerRect.width - tooltipRect.width) / 2;
          y = containerRect.top - tooltipRect.height - 8;
          break;
        case "bottom":
          x = containerRect.left + (containerRect.width - tooltipRect.width) / 2;
          y = containerRect.bottom + 8;
          break;
      }

      setPosition({ x, y });
    }
  }, [isVisible, side]);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        ref={containerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="relative"
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          {content}
        </div>
      )}
    </>
  );
}