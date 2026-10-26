"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Signature } from "@/components/ui/signature";

export default function LogoIntro() {
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Ensure we start at the top Hero section immediately
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    // Total sequence timing:
    // 0ms - 200ms: Black screen initial hold
    // 200ms - 1850ms: Signature handwriting animation (1.65s)
    // 1850ms - 2450ms: Hold fully revealed signature (~600ms)
    // 2450ms - 3400ms: Black curtain glides upward (y: 0% -> -100%)
    // 3450ms: Unmount overlay completely
    const totalDuration = shouldReduceMotion ? 1200 : 3450;
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  if (isComplete) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] w-screen h-screen min-h-screen overflow-hidden pointer-events-none select-none flex items-center justify-center bg-black"
    >
      {/* =========================================================================
          CINEMATIC BLACK INTRO CURTAIN
          Black background that sweeps upward (y: 0% -> -100%) after the reveal hold.
      ========================================================================= */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{
          delay: shouldReduceMotion ? 0.6 : 2.45,
          duration: shouldReduceMotion ? 0.5 : 0.95,
          ease: [0.76, 0, 0.24, 1], // Smooth cinematic curve
        }}
        className="absolute inset-0 bg-[#08090B] will-change-transform flex items-center justify-center w-full h-full px-4 sm:px-6"
      >
        {/* =========================================================================
            ANIMATED SIGNATURE HANDWRITING (White on Obsidian Black)
        ========================================================================= */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: [1, 1, 0],
            scale: shouldReduceMotion ? [1, 1, 1] : [1, 1, 0.96],
          }}
          transition={{
            duration: shouldReduceMotion ? 0.6 : 1.0,
            delay: shouldReduceMotion ? 0.6 : 2.35,
            times: [0, 0.5, 1],
            ease: [0.33, 1, 0.68, 1],
          }}
          className="relative flex items-center justify-center text-center max-w-full pointer-events-none"
        >
          <Signature
            text="Sandeep Chevala"
            color="#FFFFFF"
            fontSize={56}
            duration={1.65}
            delay={0.2}
            className="w-auto max-w-[88vw] sm:max-w-2xl md:max-w-3xl h-24 sm:h-32 md:h-40 drop-shadow-[0_0_24px_rgba(255,255,255,0.45)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
