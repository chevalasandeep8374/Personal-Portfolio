"use client";

/**
 * RevealLines
 * -----------
 * Wraps each text line in an overflow:hidden clip and animates the inner span
 * upward into view when the element enters the viewport.
 *
 * Usage:
 *   <RevealLines as="h2" lines={["Line one", "Line two"]} className="font-editorial text-6xl" />
 *   <RevealLines as="p">Single string child\nSecond line</RevealLines>
 *
 * Accessibility: the wrapper element gets aria-label with the full joined text
 * so screen readers read it as one coherent sentence; each inner span is
 * aria-hidden so the visual clip wrappers are skipped.
 */

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export interface RevealLineItem {
  text: string;
  className?: string;
}

interface RevealLinesProps {
  /** Explicit line array (strings or { text, className } objects). If omitted, splits children string on "\n". */
  lines?: (string | RevealLineItem)[];
  children?: React.ReactNode;
  /** HTML tag to render the outer wrapper */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  /** Delay before the first line starts (seconds) */
  delay?: number;
  /** Stagger between lines (seconds) */
  stagger?: number;
  /** Y travel distance in px */
  distance?: number;
  /** Duration per line (seconds) */
  duration?: number;
  /** Trigger once only? */
  once?: boolean;
  /** Viewport margin for trigger */
  margin?: string;
}

const LINE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function RevealLines({
  lines,
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  stagger = 0.09,
  distance = 40,
  duration = 0.75,
  once = true,
  margin = "-60px",
}: RevealLinesProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: margin as never });
  const shouldReduce = useReducedMotion();

  // Resolve lines array
  let resolvedLines: RevealLineItem[];
  if (lines) {
    resolvedLines = lines.map((item) =>
      typeof item === "string" ? { text: item } : item
    );
  } else if (typeof children === "string") {
    resolvedLines = (children as string)
      .split("\n")
      .map((text) => ({ text }));
  } else {
    resolvedLines = [{ text: "" }];
  }

  // Full text for accessibility label
  const fullText = resolvedLines.map((l) => l.text).join(" ");

  return (
    // @ts-expect-error – polymorphic tag
    <Tag ref={ref} className={className} aria-label={fullText}>
      {resolvedLines.map((line, i) => (
        <span
          key={i}
          className="reveal-line-clip"
          aria-hidden="true"
        >
          <motion.span
            style={{ display: "block" }}
            className={line.className}
            initial={shouldReduce ? { opacity: 0 } : { y: distance, opacity: 0 }}
            animate={
              inView
                ? shouldReduce
                  ? { opacity: 1 }
                  : { y: 0, opacity: 1 }
                : shouldReduce
                ? { opacity: 0 }
                : { y: distance, opacity: 0 }
            }
            transition={{
              duration: shouldReduce ? 0.3 : duration,
              delay: shouldReduce ? delay : delay + i * stagger,
              ease: LINE_EASE,
            }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
