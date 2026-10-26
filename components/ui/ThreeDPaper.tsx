"use client";

import React, { useState, useRef } from "react";

export interface ThreeDPaperProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  category?: string;
  title?: string;
  actionText?: string;
}

export function ThreeDPaper({
  src,
  alt = "Project Preview",
  children,
  className = "",
  href,
  category,
  title,
  actionText = "VIEW PROJECT ↗",
}: ThreeDPaperProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle, controlled 3D tilt (max 6.5 degrees)
    const rotateX = ((y - centerY) / centerY) * -6.5;
    const rotateY = ((x - centerX) / centerX) * 6.5;

    // Light glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 0.18 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const content = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-zinc-200/90 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out will-change-transform ${className}`}
      style={{
        perspective: "1100px",
        transformStyle: "preserve-3d",
        transform: `perspective(1100px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered
          ? "transform 0.12s ease-out, box-shadow 0.3s ease-out"
          : "transform 0.5s ease-out, box-shadow 0.5s ease-out",
        boxShadow: isHovered
          ? `${-rotate.y * 3}px ${rotate.x * 3 + 24}px 50px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(37, 99, 235, 0.08)`
          : "0 14px 34px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.03)",
      }}
    >
      {/* Visual content: image or custom children */}
      {src ? (
        <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden bg-zinc-100">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle paper texture tint & gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
        </div>
      ) : (
        children
      )}

      {/* Dynamic Specular Paper Sheen/Reflection */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 380px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.75), transparent 75%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Physical Paper Bevel Border / Emboss */}
      <div className="pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[28px] ring-1 ring-inset ring-white/40 z-20" />

      {/* Bottom Floating Pill CTA on Hover */}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between">
        {category && (
          <span className="font-mono text-[10px] tracking-widest uppercase text-white/90 drop-shadow-md">
            {category}
          </span>
        )}
        <div
          className={`ml-auto flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold font-mono text-zinc-950 shadow-lg backdrop-blur-md transition-all duration-300 ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <span>{actionText}</span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block no-underline"
      >
        {content}
      </a>
    );
  }

  return content;
}
