"use client";

/**
 * ShutterReveal
 * -------------
 * A cinematic rectangular shutter text-reveal component for main website content.
 *
 * Sequence:
 *  1. Target text starts concealed (clipPath: inset(0 100% 0 0)).
 *  2. A solid rectangular shutter block emerges at the left edge.
 *  3. The rectangle glides smoothly from left (0%) to right (100%).
 *  4. As it sweeps, the text behind it is progressively revealed from left to right.
 *  5. Text remains 100% stationary throughout.
 *  6. Upon completion, the shutter block contracts/fades out cleanly.
 *  7. Revealed text remains fully readable and accessible.
 *
 * COLOR ADAPTATION RULE:
 *  The shutter rectangle automatically matches the exact text color (`currentColor`)
 *  or custom local color treatment passed via the `color` prop.
 *   - White text on black background -> White shutter rectangle
 *   - Black text on white background -> Black shutter rectangle
 *   - Sky-blue text -> Sky-blue shutter rectangle
 *   - Custom colored text -> Matches text color or explicit contrasting color
 */

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type TagType = "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span" | "article" | "section";

interface ShutterRevealProps {
  children: React.ReactNode;
  as?: TagType;
  className?: string;
  variant?: "heading" | "text";
  color?: string; // Optional custom color override (e.g. "#2563eb", "#38bdf8", "#ffffff", "#09090b")
  delay?: number;
  duration?: number;
  once?: boolean;
}

const EASE_SHUTTER: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ShutterReveal({
  children,
  as: Tag = "div",
  className = "",
  variant = "heading",
  color,
  delay = 0,
  duration,
  once = true,
}: ShutterRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-50px" });
  const shouldReduce = useReducedMotion();

  const isHeading = variant === "heading";
  const animDuration = duration ?? (isHeading ? 0.85 : 0.65);

  // Shutter rectangle style: uses explicit color prop OR dynamically adapts to text color (`currentColor`)
  const shutterStyle: React.CSSProperties = color
    ? { backgroundColor: color }
    : { backgroundColor: "currentColor" };

  if (shouldReduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag ref={ref as any} className={`relative inline-block overflow-hidden ${className}`}>
      {/*
        1. RECTANGULAR SHUTTER BLOCK OVERLAY
        Sweeps from left: 0% to left: 100% across the text box.
        Dynamic color matching via currentColor / custom color prop.
      */}
      <motion.span
        initial={{ left: "0%", width: "0%", opacity: 1 }}
        animate={
          inView
            ? {
                left: ["0%", "0%", "100%"],
                width: ["0%", "100%", "0%"],
                opacity: [1, 1, 0],
              }
            : {}
        }
        transition={{
          duration: animDuration,
          delay,
          times: [0, 0.5, 1],
          ease: EASE_SHUTTER,
        }}
        style={shutterStyle}
        className="absolute top-0 bottom-0 z-20 pointer-events-none rounded-sm"
      />

      {/*
        2. STATIONARY TEXT WITH SYNCHRONIZED CLIP-PATH REVEAL
        Uncovers from inset(0 100% 0 0) -> inset(0 0% 0 0) as shutter sweeps
      */}
      <motion.span
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{
          duration: animDuration * 0.8,
          delay: delay + animDuration * 0.15,
          ease: EASE_SHUTTER,
        }}
        className="block w-full h-full"
      >
        {children}
      </motion.span>
    </Tag>
  );
}
