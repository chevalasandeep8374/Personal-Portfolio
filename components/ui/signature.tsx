"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { parse, type Font } from "opentype.js";
import { cn } from "@/lib/utils";

interface SignatureProps {
  /** Text to generate signature for */
  text?: string;
  /** Color of the signature path */
  color?: string;
  /** Font size of the signature */
  fontSize?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
  /** Only animate when in view */
  inView?: boolean;
  /** Only animate once */
  once?: boolean;
  /** Custom font URL to load */
  fontUrl?: string;
}

let cachedFont: Font | null = null;

export function Signature({
  text = "Sandeep Chevala",
  color = "currentColor",
  fontSize = 48,
  duration = 1.6,
  delay = 0,
  className,
  inView = false,
  once = true,
  fontUrl,
}: SignatureProps) {
  const shouldReduce = useReducedMotion();
  const rawId = useId();
  const maskId = `signature-reveal-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const horizontalPadding = fontSize * 0.2;
  const topMargin = fontSize * 2.2;
  const baseline = topMargin;
  const height = fontSize * 3.8;

  const [paths, setPaths] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(() => Math.max(100, text.length * fontSize * 1.25));

  useEffect(() => {
    let isMounted = true;

    async function loadFont() {
      try {
        let font = cachedFont;

        if (!font) {
          const fontPaths = fontUrl
            ? [fontUrl]
            : [
                "/LastoriaBoldRegular.otf",
                "https://www.componentry.fun/LastoriaBoldRegular.otf",
              ];

          for (const path of fontPaths) {
            try {
              if (typeof window !== "undefined") {
                const res = await fetch(path);
                if (res.ok) {
                  const buffer = await res.arrayBuffer();
                  font = parse(buffer);
                  cachedFont = font;
                  break;
                }
              }
            } catch {
              // Try next path
            }
          }
        }

        if (!font) {
          throw new Error("Signature font could not be loaded");
        }

        if (!isMounted) return;

        let x = horizontalPadding;
        const newPaths: string[] = [];

        for (const char of text) {
          const glyph = font.charToGlyph(char);
          const path = glyph.getPath(x, baseline, fontSize);
          newPaths.push(path.toPathData(3));

          const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
          x += advanceWidth * (fontSize / font.unitsPerEm);
        }

        if (isMounted) {
          setPaths(newPaths);
          setWidth(Math.ceil(x + horizontalPadding));
        }
      } catch (error) {
        console.error("Signature font load error:", error);
        if (isMounted) {
          setPaths([]);
          setWidth(Math.ceil(text.length * fontSize * 1.1));
        }
      }
    }

    loadFont();

    return () => {
      isMounted = false;
    };
  }, [text, fontSize, baseline, horizontalPadding, fontUrl]);

  // Dynamic timing so the entire signature completes in approximately `duration`
  const charCount = Math.max(1, paths.length);
  const charStagger = shouldReduce
    ? 0
    : (duration * 0.6) / Math.max(1, charCount - 1);
  const strokeDuration = shouldReduce
    ? 0.01
    : Math.max(0.4, duration - (charCount - 1) * charStagger);

  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  };

  return (
    <motion.svg
      key={`sig-${paths.length}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={cn("text-foreground overflow-visible select-none", className)}
      initial="hidden"
      whileInView={inView ? "visible" : undefined}
      animate={inView ? undefined : "visible"}
      viewport={{ once }}
      aria-label={text}
      role="img"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {paths.map((d, i) =>
            d ? (
              <motion.path
                key={`mask-${i}`}
                d={d}
                stroke="white"
                strokeWidth={fontSize * 0.28}
                fill="none"
                variants={variants}
                transition={{
                  pathLength: {
                    delay: delay + i * charStagger,
                    duration: strokeDuration,
                    ease: "easeInOut",
                  },
                  opacity: {
                    delay: delay + i * charStagger + 0.01,
                    duration: 0.01,
                  },
                }}
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : null
          )}
        </mask>
      </defs>

      {/* Leading stroke line */}
      {paths.map((d, i) =>
        d ? (
          <motion.path
            key={`stroke-${i}`}
            d={d}
            stroke={color}
            strokeWidth={1.8}
            fill="none"
            variants={variants}
            transition={{
              pathLength: {
                delay: delay + i * charStagger,
                duration: strokeDuration,
                ease: "easeInOut",
              },
              opacity: {
                delay: delay + i * charStagger + 0.01,
                duration: 0.01,
              },
            }}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null
      )}

      {/* Filled calligraphy text revealed by the animated mask */}
      <g mask={`url(#${maskId})`}>
        {paths.map((d, i) =>
          d ? <path key={`fill-${i}`} d={d} fill={color} /> : null
        )}
      </g>
    </motion.svg>
  );
}

export default Signature;
