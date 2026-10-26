"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

export interface ScrollSplitCardItem {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  icon?: React.ReactNode;
}

export interface ScrollSplitCardProps {
  className?: string;
  imageSrc: string;
  cards: ScrollSplitCardItem[];
  containerRef?: React.RefObject<HTMLDivElement | null>;
  endingText?: string;
  frontHeading?: string;
  frontSubheading?: string;
}

export function ScrollSplitCard({
  className,
  imageSrc,
  cards,
  containerRef: externalContainerRef,
  endingText = "Build. Learn. Experiment.",
  frontHeading = "Build systems that think.",
  frontSubheading = "Ship agents that work.",
}: ScrollSplitCardProps) {
  const internalContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = externalContainerRef || internalContainerRef;

  // Real page scroll progress scrubbed directly to container scroll
  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Heavy, non-bouncy physical card spring interpolation
  const scrollYProgress = useSpring(rawScrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0005,
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Separation (X) - balanced across small mobile through desktop
  const maxSep = isMobile ? 8 : 22;
  const holdSep = isMobile ? 6 : 14;
  const leftX = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.75, 1], [0, 0, -maxSep, -holdSep, -holdSep]);
  const rightX = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.75, 1], [0, 0, maxSep, holdSep, holdSep]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.45, 1], [1, 1, 0.96, 0.96]);

  // 3D Flip (rotateY)
  const rotateY = useTransform(scrollYProgress, [0, 0.35, 0.70, 1], [0, 0, 180, 180]);
  const rotateZLeft = useTransform(scrollYProgress, [0, 0.35, 0.70, 1], [0, 0, 3, 3]);
  const rotateZRight = useTransform(scrollYProgress, [0, 0.35, 0.70, 1], [0, 0, -3, -3]);

  // Dynamic borders & radii so panels appear as 1 flat image initially
  const borderRadiusLeft = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    ["16px 0px 0px 16px", "16px 0px 0px 16px", "16px 16px 16px 16px"]
  );
  const borderRadiusMiddle = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    ["0px 0px 0px 0px", "0px 0px 0px 0px", "16px 16px 16px 16px"]
  );
  const borderRadiusRight = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    ["0px 16px 16px 0px", "0px 16px 16px 0px", "16px 16px 16px 16px"]
  );
  const borderOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 0, 0.2]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 0, 0.35]);
  const boxShadow = useMotionTemplate`inset 0 1px 1px rgba(255, 255, 255, ${borderOpacity}), inset 0 -24px 48px rgba(0, 0, 0, ${shadowOpacity}), 0 25px 50px -12px rgba(0, 0, 0, ${shadowOpacity})`;

  // CRITICAL RULE: NO VERTICAL CARD DISPLACEMENT
  // Cards remain stable and centered in the viewport throughout the entire scroll.

  // Indicator text at start
  const startTextOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const startTextY = useTransform(scrollYProgress, [0, 0.12], [0, 15]);

  // Ending text reveals in Content Reveal (0.70 -> 0.85) and holds through 1.00
  const textOpacity = useTransform(scrollYProgress, [0, 0.7, 0.85, 1], [0, 0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.7, 0.85, 1], [20, 20, 0, 0]);

  // Front-card text overlay dissolves as the separation and 3D flip begin
  const frontTextOpacity = useTransform(scrollYProgress, [0, 0.18, 0.38], [1, 1, 0]);

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={cn("relative h-[320vh] w-full", className)}
    >
      {/* Sticky Viewport: Perfectly centered, pins to top of screen during scroll */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden [perspective:1200px] pt-14 sm:pt-0">

        {/* Starting Text Indicator */}
        <motion.div
          className="absolute top-[12%] sm:top-[16%] left-0 right-0 text-center pointer-events-none z-10"
          style={{
            opacity: startTextOpacity,
            y: startTextY,
          }}
        >
          <p className="text-xs sm:text-sm font-display font-medium tracking-widest text-neutral-400 uppercase">
            Scroll down to explore
          </p>
        </motion.div>

        {/* 3D Animated Cards Container: Stable in center, responds purely to scroll */}
        <motion.div
          style={{ scale, transformStyle: "preserve-3d" }}
          className="flex h-[235px] xs:h-[270px] sm:h-[400px] md:h-[420px] w-[90%] xs:w-[92%] sm:w-full max-w-4xl px-1 sm:px-4 relative items-center"
        >
          {cards.slice(0, 3).map((card, i) => (
            <motion.div
              key={i}
              className="relative h-full flex-1"
              style={{
                x: i === 0 ? leftX : i === 2 ? rightX : 0,
                rotateY,
                rotateZ: i === 0 ? rotateZLeft : i === 2 ? rotateZRight : 0,
                zIndex: i, // Left under Middle, Right above Middle for natural overlap
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Side: Original Image Split */}
              <motion.div
                className="absolute inset-0 overflow-hidden [backface-visibility:hidden]"
                style={{
                  zIndex: 2,
                  borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  boxShadow,
                }}
              >
                <div
                  className="absolute inset-0 h-full w-[300%]"
                  style={{
                    left: `${-100 * i}%`,
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                  }}
                />

                {/* Text inside the image */}
                {(frontHeading || frontSubheading) && (
                  <motion.div
                    style={{
                      left: `${-100 * i}%`,
                      opacity: frontTextOpacity,
                    }}
                    className="absolute inset-0 h-full w-[300%] flex flex-col items-center justify-center text-center px-4 pointer-events-none z-10 select-none"
                  >
                    <div className="flex flex-col items-center gap-1 sm:gap-2 px-5 sm:px-8 py-3.5 sm:py-5 rounded-2xl bg-black/45 backdrop-blur-[2px] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] max-w-[88%] sm:max-w-xl">
                      {frontHeading && (
                        <p className="font-display font-bold text-sm xs:text-base sm:text-2xl md:text-3xl lg:text-[34px] text-white tracking-tight leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                          {frontHeading}
                        </p>
                      )}
                      {frontSubheading && (
                        <p className="font-display font-bold text-sm xs:text-base sm:text-2xl md:text-3xl lg:text-[34px] text-[#F2572B] tracking-tight leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                          {frontSubheading}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                <GrainOverlay opacity={0.035} />
              </motion.div>

              {/* Back Side: Revealed Content Card */}
              <motion.div
                className={cn(
                  "absolute inset-0 overflow-hidden flex flex-col justify-end p-2 xs:p-2.5 sm:p-7 md:p-8 [backface-visibility:hidden] will-change-transform",
                  "border border-white/10 bg-gradient-to-br from-white/10 to-transparent",
                  "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-24px_48px_rgba(0,0,0,0.2)]"
                )}
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  transform: "rotateY(180deg)",
                  zIndex: 1,
                  borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                  boxShadow,
                }}
              >
                {/* Grainy Noise Overlay */}
                <GrainOverlay opacity={0.05} />

                <div className="relative z-10 mb-auto">{card.icon}</div>
                <h3 className="relative z-10 mb-1 sm:mb-3 text-[11px] xs:text-xs sm:text-xl md:text-2xl font-display font-semibold leading-tight">
                  {card.title}
                </h3>
                <p className="relative z-10 text-[8.5px] xs:text-[9.5px] sm:text-sm opacity-90 leading-tight sm:leading-relaxed font-display line-clamp-3 xs:line-clamp-4 sm:line-clamp-none">
                  {card.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Ending Text in Sticky Viewport (Placed comfortably below cards with no overlap) */}
        <motion.div
          className="absolute bottom-[6%] sm:bottom-[10%] left-0 right-0 text-center pointer-events-none z-10 px-4"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          <p className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-neutral-900">
            {endingText}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
