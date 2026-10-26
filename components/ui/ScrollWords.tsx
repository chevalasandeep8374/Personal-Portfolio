"use client";

/**
 * ScrollWords
 * -----------
 * Progressively highlights words from muted → crisp white as the user scrolls
 * through the section. The effect reverses when scrolling back up.
 *
 * Works by mapping scrollYProgress [0 → 1] to a "revealed word count",
 * so the n-th word becomes fully visible when the user reaches the
 * (n / total) fraction of the scroll range.
 *
 * Usage:
 *   <ScrollWords
 *     text="I design and build intelligent systems that understand context..."
 *     className="text-xl leading-relaxed"
 *   />
 */

import React, { useRef, useState } from "react";
import { useScroll, motion, useMotionValueEvent, useReducedMotion } from "framer-motion";

interface ScrollWordsProps {
  text: string;
  className?: string;
  /** Scroll offset start/end – passed directly to useScroll */
  offsetStart?: string;
  offsetEnd?: string;
  /** Color for unrevealed words */
  mutedColor?: string;
  /** Color for revealed words */
  brightColor?: string;
}

export function ScrollWords({
  text,
  className = "",
  offsetStart = "start 0.85",
  offsetEnd = "end 0.35",
  mutedColor = "#a1a1aa",
  brightColor = "#09090b",
}: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [offsetStart as never, offsetEnd as never],
  });

  const words = text.split(" ");
  const total = words.length;

  // Track how many words are "revealed"
  const [revealedCount, setRevealedCount] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setRevealedCount(Math.round(v * total));
  });

  if (shouldReduce) {
    return (
      <p ref={ref} className={className} style={{ color: brightColor }}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden
          animate={{
            color: i < revealedCount ? brightColor : mutedColor,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ display: "inline" }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </p>
  );
}
