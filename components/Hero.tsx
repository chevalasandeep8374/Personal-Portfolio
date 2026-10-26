"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowDown,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { RisingBlurIn, HighlightIn } from "@/components/ui/text-animations";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

export default function Hero() {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const shouldReduce = useReducedMotion();

  const heroWords = ["Sandeep", "Chevala"];

  // Background typography text: visible ambient texture behind the Hero
  const bgTypographyItems = [
    "SANDEEP AI ENGINEER",
    "SANDEEP AI ENGINEER",
    "SANDEEP AI ENGINEER",
    "SANDEEP AI ENGINEER",
  ];

  return (
    <section
      id="home"
      className="relative min-h-[85vh] sm:min-h-screen pt-20 sm:pt-28 pb-10 sm:pb-16 px-4 sm:px-6 flex flex-col justify-center items-center overflow-hidden bg-white select-none"
    >
      {/* =========================================================================
          1. LARGE BACKGROUND TYPOGRAPHY: "SANDEEP AI/ML"
          Layer: Hero background -> Background Typography (z-[1]) -> Content (z-10/20)
          Subtle, elegant ambient texture in light muted grayscale tone
      ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-[1] select-none">
        <motion.div
          animate={{
            x: ["-5%", "5%", "-5%"],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center will-change-transform select-none"
        >
          {/* First Set */}
          <div className="flex items-center gap-12 sm:gap-24 pr-12 sm:pr-24 flex-shrink-0">
            {bgTypographyItems.map((text, i) => (
              <span
                key={`bg1-${i}`}
                className="font-display font-black text-[48px] xs:text-[68px] sm:text-[170px] md:text-[230px] lg:text-[290px] text-zinc-300/35 sm:text-zinc-400/60 uppercase tracking-tight leading-none whitespace-nowrap"
              >
                {text}
              </span>
            ))}
          </div>

          {/* Second Set */}
          <div className="flex items-center gap-12 sm:gap-24 pr-12 sm:pr-24 flex-shrink-0" aria-hidden="true">
            {bgTypographyItems.map((text, i) => (
              <span
                key={`bg2-${i}`}
                className="font-display font-black text-[48px] xs:text-[68px] sm:text-[170px] md:text-[230px] lg:text-[290px] text-zinc-300/35 sm:text-zinc-400/60 uppercase tracking-tight leading-none whitespace-nowrap"
              >
                {text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          2. FLOATING 3D SHAPES (Positioned Exactly Like Reference Image)
      ========================================================================= */}
      {/* SHAPE 1: Top-Left Orange Pyramid */}
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.65, y: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-10 pointer-events-none top-20 xs:top-24 sm:top-[10%] left-2 xs:left-3 sm:left-[8%] md:left-[14%] w-16 xs:w-22 sm:w-36 md:w-44 lg:w-52 max-w-[220px]"
      >
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [8, 12, 8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="/shapes/orange-pyramid.avif"
            alt="Orange 3D Pyramid"
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </motion.div>
      </motion.div>

      {/* SHAPE 2: Top-Right Turquoise Star */}
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.65, y: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-10 pointer-events-none top-20 xs:top-24 sm:top-[8%] right-2 xs:right-3 sm:right-[8%] md:right-[13%] w-16 xs:w-22 sm:w-36 md:w-44 lg:w-52 max-w-[210px]"
      >
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [-4, 2, -4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <img
            src="/shapes/turquoise-star.avif"
            alt="Turquoise 3D Star"
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </motion.div>
      </motion.div>

      {/* SHAPE 3: Middle-Left 3D GitHub Round Shape */}
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.65, y: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-20 pointer-events-auto top-[40%] sm:top-[36%] left-1.5 xs:left-2.5 sm:left-[4%] md:left-[10%] w-20 xs:w-24 sm:w-32 md:w-44 lg:w-52 max-w-[210px] touch-manipulation"
      >
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [-3, 3, -3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <a
            href="https://github.com/chevalasandeep8374"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="block w-full h-full cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F2572B] rounded-full"
          >
            <img
              src="/shapes/github-round.png"
              alt="GitHub profile"
              className="w-full h-auto object-contain drop-shadow-2xl transition-all duration-300 group-hover:brightness-105"
            />
          </a>
        </motion.div>
      </motion.div>

      {/* SHAPE 4: Middle-Right 3D LinkedIn Round Shape */}
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.65, y: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.36, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-20 pointer-events-auto top-[40%] sm:top-[36%] right-1.5 xs:right-2.5 sm:right-[4%] md:right-[10%] w-20 xs:w-24 sm:w-32 md:w-44 lg:w-52 max-w-[210px] touch-manipulation"
      >
        <motion.div
          animate={{
            y: [0, 14, 0],
            rotate: [3, -3, 3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        >
          <a
            href="https://www.linkedin.com/in/sandeep-chevala-286ba2286"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="block w-full h-full cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F2572B] rounded-full"
          >
            <img
              src="/shapes/linkedin-round.png"
              alt="LinkedIn profile"
              className="w-full h-auto object-contain drop-shadow-2xl transition-all duration-300 group-hover:brightness-105"
            />
          </a>
        </motion.div>
      </motion.div>

      {/* SHAPE 5: Bottom-Left Blue Cylinder */}
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.65, y: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-10 pointer-events-none bottom-3 sm:bottom-[4%] left-2 xs:left-3 sm:left-[10%] md:left-[16%] w-18 xs:w-24 sm:w-40 md:w-48 lg:w-56 max-w-[230px]"
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [-48, -42, -48],
          }}
          transition={{
            duration: 7.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          <img
            src="/shapes/blue-cylinder.avif"
            alt="Blue 3D Cylinder"
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </motion.div>
      </motion.div>

      {/* SHAPE 6: Bottom-Right Yellow Cube */}
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.65, y: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.48, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-10 pointer-events-none bottom-3 sm:bottom-[4%] right-2 xs:right-3 sm:right-[10%] md:right-[16%] w-18 xs:w-24 sm:w-36 md:w-44 lg:w-52 max-w-[220px]"
      >
        <motion.div
          animate={{
            y: [0, 12, 0],
            rotate: [4, -4, 4],
          }}
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <img
            src="/shapes/yellow-cube.avif"
            alt="Yellow 3D Cube"
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </motion.div>
      </motion.div>

      {/* =========================================================================
          3. CENTER HERO STAGE (Greeting, 3D Flip Card, Clients, CTA Button)
      ========================================================================= */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-xl mx-auto mt-2 sm:mt-4 px-2">
        {/* Main Hero Headline Typography: Coordinated Staggered Reveal (#20) */}
        <div className="mb-4">
          <motion.h1
            aria-label="Sandeep Chevala"
            className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-[42px] font-bold text-zinc-900 tracking-tight flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
          >
            {heroWords.map((word, i) => (
              <motion.span
                key={word}
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: shouldReduce ? 0 : 0.08 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <RisingBlurIn
            as="div"
            distance={12}
            blur={6}
            delay={shouldReduce ? 0 : 0.22}
            duration={0.6}
            className="mt-2"
          >
            <p className="font-display text-xs xs:text-sm sm:text-base md:text-lg font-medium text-zinc-600 tracking-normal px-2">
              AI Agentic &amp; Automation Engineer
            </p>
          </RisingBlurIn>
        </div>

        {/* =====================================================================
            4. THE 3D FLIP CARD (Front: Photo | Back: "Scroll to more")
        ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 sm:mb-8"
        >
          {/* Card Flip Container: flips on hover or tap */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`card-flip-container cursor-pointer w-[165px] h-[180px] xs:w-[185px] xs:h-[200px] sm:w-[280px] sm:h-[295px] md:w-[300px] md:h-[315px] rounded-[28px] sm:rounded-[46px] ${
              isFlipped ? "flipped" : ""
            }`}
          >
            <div className="card-flip-inner rounded-[28px] sm:rounded-[46px]">

              {/* FRONT SIDE: User's photo on clean backdrop */}
              <div className="card-flip-front relative overflow-hidden bg-[#E8E8E8] shadow-[0_18px_36px_rgba(0,0,0,0.14),0_4px_12px_rgba(242,87,43,0.08)] flex items-end justify-center rounded-[28px] sm:rounded-[46px]">
                <GrainOverlay opacity={0.035} />
                <img
                  src="/sandeep.jpg"
                  alt="Sandeep Chevala - AI/ML"
                  className="w-full h-full object-cover object-[center_16%] pointer-events-none select-none rounded-[28px] sm:rounded-[46px]"
                />

                {/* Subtle indicator hint to flip */}
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-display font-medium px-2 py-0.5 rounded-full flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity z-20">
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Flip</span>
                </div>
              </div>

              {/* BACK SIDE: "Scroll to more" / Explore prompt */}
              <div className="card-flip-back relative overflow-hidden bg-gradient-to-br from-[#F2572B] via-[#E04B20] to-[#B33512] shadow-[0_20px_35px_rgba(242,87,43,0.36)] rounded-[28px] sm:rounded-[46px] text-[#FCF6F5] p-5 sm:p-6 flex flex-col justify-between items-center text-center border border-white/20">
                <GrainOverlay opacity={0.05} />
                {/* Circular Spinning Text Badge on Back */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mt-1">
                  <div className="relative w-full h-full animate-spin-slow">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path
                        id="circlePathBack"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                      />
                      <text className="font-display text-[9px] font-bold fill-[#FCF6F5] uppercase tracking-[0.18em]">
                        <textPath href="#circlePathBack" startOffset="0%">
                          ✦ SCROLL DOWN ✦ EXPLORE MORE ✦
                        </textPath>
                      </text>
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-[#FCF6F5]">
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                  </div>
                </div>

                {/* Center Content */}
                <div className="my-auto">
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#FCF6F5] mb-1">
                    Scroll to Explore
                  </h3>
                  <p className="font-display text-xs sm:text-[13px] text-[#FCF6F5]/85 max-w-[200px] leading-snug">
                    Discover Generative AI, LLM systems, &amp; production projects below.
                  </p>
                </div>

                {/* Quick Anchor Link Button */}
                <a
                  href="#about"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full py-2.5 px-4 rounded-full bg-[#FCF6F5] text-[#F2572B] font-display text-xs font-bold hover:bg-white transition-colors shadow-sm"
                >
                  View My Work ↓
                </a>
              </div>

            </div>
          </div>
        </motion.div>


        {/* =====================================================================
            6. CTA BUTTON: "Let's Work Together!"
            Matches the big prominent capsule button with orange & soft ivory
        ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center justify-center px-7 sm:px-12 py-3.5 sm:py-4 rounded-full bg-[#F2572B] text-[#FCF6F5] font-display text-[15px] sm:text-[19px] font-bold tracking-tight border border-[#F2572B] shadow-[0_12px_28px_rgba(242,87,43,0.25)] hover:shadow-[0_18px_36px_rgba(242,87,43,0.35)] hover:bg-[#D9451C] active:scale-95 transition-all duration-200 min-h-[44px]"
          >
            <HighlightIn variant="sweep" delay={0.4} duration={0.9}>
              <span>Let&apos;s Work Together!</span>
            </HighlightIn>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
