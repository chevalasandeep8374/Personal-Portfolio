import React from "react";
import { cn } from "@/lib/utils";

export interface GrainOverlayProps {
  className?: string;
  opacity?: number;
  blendMode?: "overlay" | "multiply" | "soft-light" | "screen" | "normal";
}

/**
 * GrainOverlay: A lightweight, subtle monochromatic film-grain texture overlay.
 * Clipped to parent card's border radius, pointer-events-none, hardware-accelerated.
 */
export function GrainOverlay({
  className,
  opacity = 0.045,
  blendMode = "overlay",
}: GrainOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-10 rounded-[inherit] overflow-hidden select-none",
        className
      )}
      style={{
        backgroundImage: "url('/textures/grain.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        opacity,
        mixBlendMode: blendMode,
      }}
    />
  );
}

export default GrainOverlay;
