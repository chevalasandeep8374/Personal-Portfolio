"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DROP_EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];
const ROLL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type TagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

// ============================================================================
// 1. RISING BLUR IN
// Text rises gently from below while transitioning from blurred to sharp.
// Best for: major headings, section titles, hero subtitles, editorial headers.
// ============================================================================
interface RisingBlurInProps {
  children: React.ReactNode;
  as?: TagType;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: number; // in pixels (default 8)
  stagger?: number;
  by?: "block" | "words";
  once?: boolean;
}

export function RisingBlurIn({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  duration = 0.75,
  distance = 24,
  blur = 8,
  stagger = 0.05,
  by = "block",
  once = true,
}: RisingBlurInProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-40px" });
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    const Component = Tag as any;
    return <Component className={className}>{children}</Component>;
  }

  const MotionTag = motion[Tag] as any;

  if (by === "words" && typeof children === "string") {
    const words = children.split(" ");
    return (
      <MotionTag
        ref={ref}
        className={cn("inline-flex flex-wrap gap-x-[0.28em] gap-y-1", className)}
        aria-label={children}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            aria-hidden="true"
            initial={{ opacity: 0, y: distance, filter: `blur(${blur}px)` }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: distance, filter: `blur(${blur}px)` }
            }
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: MOTION_EASE,
            }}
            className="inline-block will-change-[transform,opacity,filter]"
          >
            {word}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: distance, filter: `blur(${blur}px)` }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: distance, filter: `blur(${blur}px)` }
      }
      transition={{
        duration,
        delay,
        ease: MOTION_EASE,
      }}
      className={cn("will-change-[transform,opacity,filter]", className)}
    >
      {children}
    </MotionTag>
  );
}

// ============================================================================
// 2. SEQUENTIAL DROPS
// Words or individual text elements enter one after another with a smooth downward motion.
// Best for: paragraphs, lists, card descriptions, grouped copy, item specs.
// ============================================================================
interface SequentialDropsProps {
  children: React.ReactNode;
  as?: TagType;
  className?: string;
  delay?: number;
  stagger?: number;
  distance?: number;
  duration?: number;
  mode?: "auto" | "words" | "children";
  once?: boolean;
}

export function SequentialDrops({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  stagger = 0.045,
  distance = 18,
  duration = 0.55,
  mode = "auto",
  once = true,
}: SequentialDropsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-40px" });
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    const Component = Tag as any;
    return <Component className={className}>{children}</Component>;
  }

  const MotionTag = motion[Tag] as any;

  // Split string into words when children is a string
  if ((mode === "words" || (mode === "auto" && typeof children === "string")) && typeof children === "string") {
    const words = children.split(" ");
    return (
      <MotionTag
        ref={ref}
        className={cn("inline-flex flex-wrap gap-x-[0.26em] gap-y-0.5", className)}
        aria-label={children}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            aria-hidden="true"
            initial={{ opacity: 0, y: -distance }}
            animate={
              inView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -distance }
            }
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: DROP_EASE,
            }}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  // Stagger children elements if array passed
  if (Array.isArray(children)) {
    return (
      <MotionTag ref={ref} className={className}>
        {React.Children.map(children, (child, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -distance }}
            animate={
              inView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -distance }
            }
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: DROP_EASE,
            }}
            className="will-change-transform"
          >
            {child}
          </motion.div>
        ))}
      </MotionTag>
    );
  }

  // Single block downward drop
  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: -distance }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: -distance }
      }
      transition={{
        duration,
        delay,
        ease: DROP_EASE,
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </MotionTag>
  );
}

// ============================================================================
// 3. HIGHLIGHT IN
// Text reveals with a subtle animated highlight or light sweep that emphasizes the content.
// Best for: key words, technologies, metrics, CTA buttons, highlighted phrases.
// ============================================================================
interface HighlightInProps {
  children: React.ReactNode;
  as?: TagType;
  variant?: "sweep" | "marker" | "badge";
  color?: string; // highlight color
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function HighlightIn({
  children,
  as: Tag = "span",
  variant = "sweep",
  color = "#F2572B",
  delay = 0,
  duration = 0.85,
  className,
  once = true,
}: HighlightInProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-40px" });
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    const Component = Tag as any;
    return <Component className={className}>{children}</Component>;
  }

  const MotionTag = motion[Tag] as any;

  if (variant === "marker") {
    // Highlighter marker effect: translucent colored bar smoothly draws behind the text
    return (
      <MotionTag
        ref={ref}
        className={cn("relative inline-block px-1 rounded-sm", className)}
      >
        <motion.span
          aria-hidden="true"
          initial={{ width: "0%" }}
          animate={inView ? { width: "100%" } : { width: "0%" }}
          transition={{
            duration,
            delay: delay + 0.1,
            ease: MOTION_EASE,
          }}
          style={{ backgroundColor: color }}
          className="absolute inset-0 opacity-20 -z-10 rounded-sm pointer-events-none"
        />
        <motion.span
          initial={{ opacity: 0.7 }}
          animate={inView ? { opacity: 1 } : { opacity: 0.7 }}
          transition={{ duration: 0.4, delay }}
        >
          {children}
        </motion.span>
      </MotionTag>
    );
  }

  if (variant === "badge") {
    // Subtle luminous pulse / border sheen for badges and pill tags
    return (
      <MotionTag
        ref={ref}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={
          inView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.94 }
        }
        transition={{ duration: 0.5, delay, ease: MOTION_EASE }}
        className={cn("relative inline-flex items-center overflow-hidden", className)}
      >
        {/* Shimmer light sweep bar */}
        <motion.span
          aria-hidden="true"
          initial={{ x: "-100%" }}
          animate={inView ? { x: "200%" } : { x: "-100%" }}
          transition={{
            duration: 1.1,
            delay: delay + 0.2,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 pointer-events-none"
        />
        {children}
      </MotionTag>
    );
  }

  // Default "sweep" - light sheen sweep across the text
  return (
    <MotionTag
      ref={ref}
      className={cn("relative inline-block overflow-hidden", className)}
    >
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.4, delay }}
        className="relative z-10 inline-block"
      >
        {children}
      </motion.span>
      {/* Light sweep overlay */}
      <motion.span
        aria-hidden="true"
        initial={{ left: "-100%" }}
        animate={inView ? { left: "150%" } : { left: "-100%" }}
        transition={{
          duration: 0.95,
          delay: delay + 0.15,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="absolute top-0 bottom-0 w-3/4 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] z-20 pointer-events-none"
      />
    </MotionTag>
  );
}

// ============================================================================
// 4. OFFSET ROLL
// Text enters with a smooth rolling or rotating motion, using a slight offset for a layered effect.
// Best for: selected headings, project titles, short labels, section numbers.
// ============================================================================
interface OffsetRollProps {
  children: React.ReactNode;
  as?: TagType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  mode?: "words" | "block";
  once?: boolean;
}

export function OffsetRoll({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.65,
  mode = "words",
  once = true,
}: OffsetRollProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-40px" });
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    const Component = Tag as any;
    return <Component className={className}>{children}</Component>;
  }

  const MotionTag = motion[Tag] as any;

  if (mode === "words" && typeof children === "string") {
    const words = children.split(" ");
    return (
      <MotionTag
        ref={ref}
        className={cn("inline-flex flex-wrap gap-x-[0.25em] gap-y-0.5", className)}
        style={{ perspective: 800 }}
        aria-label={children}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden py-0.5"
            aria-hidden="true"
          >
            <motion.span
              initial={{
                opacity: 0,
                y: "105%",
                rotateX: -45,
                transformOrigin: "bottom center",
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: "0%",
                      rotateX: 0,
                    }
                  : {
                      opacity: 0,
                      y: "105%",
                      rotateX: -45,
                    }
              }
              transition={{
                duration,
                delay: delay + i * stagger,
                ease: ROLL_EASE,
              }}
              className="inline-block will-change-[transform,opacity]"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </MotionTag>
    );
  }

  // Block roll
  return (
    <div ref={ref as any} className="overflow-hidden py-0.5" style={{ perspective: 800 }}>
      <MotionTag
        initial={{
          opacity: 0,
          y: "105%",
          rotateX: -40,
          transformOrigin: "bottom center",
        }}
        animate={
          inView
            ? {
                opacity: 1,
                y: "0%",
                rotateX: 0,
              }
            : {
                opacity: 0,
                y: "105%",
                rotateX: -40,
              }
        }
        transition={{
          duration,
          delay,
          ease: ROLL_EASE,
        }}
        className={cn("will-change-[transform,opacity]", className)}
      >
        {children}
      </MotionTag>
    </div>
  );
}
