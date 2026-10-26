"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { skills, skillCategories, Skill, SkillCategory } from "../data/skills";
import {
  RisingBlurIn,
  SequentialDrops,
  HighlightIn,
  OffsetRoll,
} from "./ui/text-animations";
import { GrainOverlay } from "./ui/GrainOverlay";

// Subtle category accent styling (dots & border highlights)
const categoryMeta: Record<
  SkillCategory,
  { dotColor: string; pillBorder: string; badgeBg: string; badgeText: string }
> = {
  "AI / ML": {
    dotColor: "bg-blue-500",
    pillBorder: "hover:border-blue-400/80 hover:bg-blue-50/30",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700 border-blue-200/70",
  },
  "Generative AI": {
    dotColor: "bg-sky-500",
    pillBorder: "hover:border-sky-400/80 hover:bg-sky-50/30",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700 border-sky-200/70",
  },
  "AI Systems": {
    dotColor: "bg-indigo-500",
    pillBorder: "hover:border-indigo-400/80 hover:bg-indigo-50/30",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700 border-indigo-200/70",
  },
  "Data": {
    dotColor: "bg-teal-500",
    pillBorder: "hover:border-teal-400/80 hover:bg-teal-50/30",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-700 border-teal-200/70",
  },
  "Cloud / MLOps": {
    dotColor: "bg-violet-500",
    pillBorder: "hover:border-violet-400/80 hover:bg-violet-50/30",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700 border-violet-200/70",
  },
  "Software": {
    dotColor: "bg-zinc-500",
    pillBorder: "hover:border-zinc-400/80 hover:bg-zinc-50/50",
    badgeBg: "bg-zinc-50",
    badgeText: "text-zinc-700 border-zinc-200/70",
  },
};

// Honest status indicator chip styles
const statusMeta = {
  "Hands-on": "text-emerald-700 bg-emerald-50 border-emerald-200/70",
  "Working Knowledge": "text-blue-700 bg-blue-50 border-blue-200/70",
  "Learning": "text-amber-700 bg-amber-50 border-amber-200/70",
  "Exploring": "text-purple-700 bg-purple-50 border-purple-200/70",
};

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const shouldReduce = useReducedMotion();

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const hasActive = activeId !== null;

  return (
    <section id="stack" className="pt-20 sm:pt-28 pb-6 sm:pb-8 px-4 sm:px-6 max-w-6xl mx-auto select-none relative">
      {/* ── Section Header ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3">
        <OffsetRoll as="span" delay={0.05}>
          <span>03 / TECH STACK</span>
        </OffsetRoll>
        <span className="w-10 h-px bg-zinc-300" />
        <HighlightIn as="span" variant="badge" color="#F2572B">
          <span className="text-[#F2572B] font-semibold px-2 py-0.5 rounded bg-[#F2572B]/10">ECOSYSTEM</span>
        </HighlightIn>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <RisingBlurIn as="h2" distance={20} blur={8} delay={0.1} duration={0.65} className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            What I Work With
          </RisingBlurIn>
          <div className="mt-2">
            <SequentialDrops as="p" mode="words" delay={0.18} duration={0.45} className="text-sm sm:text-base text-zinc-500 font-mono">
              Tools and technologies I use to build intelligent systems.
            </SequentialDrops>
          </div>
        </div>

        {/* Status Legend Hint */}
        <HighlightIn variant="badge" color="#3b82f6" delay={0.2} className="inline-flex self-start sm:self-auto">
          <div className="flex items-center gap-2 text-[10px] xs:text-[11px] font-mono text-zinc-600 bg-zinc-50/80 px-2.5 xs:px-3 py-1.5 rounded-full border border-zinc-200/60">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              Tap or hover for details
            </span>
          </div>
        </HighlightIn>
      </div>

      {/* ── Category Filter Pills: Tracking In (#27) ──────────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.04,
            },
          },
        }}
        className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-8 sm:mb-12"
      >
        {skillCategories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 10,
                  letterSpacing: shouldReduce ? "0em" : "0.06em",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  letterSpacing: "0em",
                  transition: {
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveId(null);
              }}
              className={`
                relative px-3 sm:px-4 py-1.5 min-h-[36px] sm:min-h-[38px] rounded-full text-xs font-mono transition-colors duration-200 cursor-pointer
                ${
                  isSelected
                    ? "text-[#FCF6F5] font-semibold"
                    : "bg-[#FCF6F5] text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200/60"
                }
              `}
            >
              {isSelected && (
                <motion.span
                  layoutId="activeCategoryBg"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-[#F2572B] shadow-sm -z-0"
                />
              )}
              <span className="relative z-10">{cat === "Generative AI" ? "GenAI" : cat}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* ── Interactive Technology Ecosystem (Spotlight Focus) ───────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setActiveId(null)}
        className="
          relative min-h-[320px] sm:min-h-[380px] p-3.5 xs:p-5 sm:p-10 md:p-12
          rounded-2xl sm:rounded-3xl border-2 border-zinc-300 bg-gradient-to-b from-white via-zinc-50/30 to-blue-50/20
          shadow-[0_14px_45px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]
          ring-1 ring-zinc-900/[0.06]
          flex flex-wrap items-center justify-center gap-2 xs:gap-2.5 sm:gap-4 md:gap-5
        "
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => {
            const isHovered = activeId === skill.id;
            const isBlurred = hasActive && !isHovered;
            const meta = categoryMeta[skill.category];

            // Organic staggering: subtle intentional position variances
            const offsetClasses =
              index % 5 === 0
                ? "sm:my-1"
                : index % 3 === 0
                ? "sm:-my-1"
                : index % 2 === 0
                ? "sm:mx-0.5"
                : "";

            return (
              <motion.div
                layout
                key={skill.id}
                initial={{ opacity: 0, scale: 0.82, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{
                  duration: 0.35,
                  delay: shouldReduce ? 0 : Math.min(index * 0.018, 0.25),
                  ease: [0.22, 1, 0.36, 1],
                  layout: { duration: 0.3, ease: "easeOut" },
                }}
                onMouseEnter={() => setActiveId(skill.id)}
                onMouseLeave={() => setActiveId((cur) => (cur === skill.id ? null : cur))}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveId((cur) => (cur === skill.id ? null : skill.id));
                }}
                className={`relative cursor-pointer ${offsetClasses}`}
              >
                {/* ── Base Pill: ALWAYS keeps its exact layout slot (zero layout shift) ─ */}
                <motion.div
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  animate={{
                    opacity: isHovered ? 0 : isBlurred ? 0.35 : 1,
                    filter: isBlurred ? "blur(3px)" : "blur(0px)",
                    scale: isBlurred ? 0.98 : 1,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className={`
                    group flex items-center gap-2 xs:gap-2.5
                    px-3 py-1.5 xs:px-3.5 xs:py-2 sm:px-4 sm:py-2.5
                    rounded-full bg-white
                    border border-zinc-200/90 ${meta.pillBorder}
                    shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.12)]
                    transition-all duration-200
                  `}
                >
                  {/* Clean solid category dot without blinking or flickering */}
                  <span className={`w-2 h-2 rounded-full ${meta.dotColor} shrink-0`} />
                  <span className="font-display font-medium text-[11px] xs:text-xs sm:text-sm text-zinc-800 group-hover:text-zinc-950 tracking-tight whitespace-nowrap transition-colors">
                    {skill.name}
                  </span>
                </motion.div>

                {/* ── Expanded Spotlight Capsule: positioned above without moving any siblings ─ */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: 10 }}
                      animate={{ opacity: 1, scale: 1.05, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 8 }}
                      transition={{
                        type: "spring",
                        damping: 24,
                        stiffness: 400,
                      }}
                      className="
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                        w-[260px] sm:w-[285px] max-w-[calc(100vw-2rem)]
                        p-4 sm:p-5 rounded-2xl sm:rounded-3xl
                        bg-[#FCF6F5]/98 backdrop-blur-md
                        border border-[#F2572B]/30
                        shadow-[0_20px_45px_rgba(242,87,43,0.18),0_2px_8px_rgba(0,0,0,0.04)]
                        ring-2 ring-[#F2572B]/10
                        pointer-events-auto
                        text-left
                        overflow-hidden
                      "
                    >
                      <GrainOverlay opacity={0.035} />
                      {/* Header: Tech Name + Status Badge */}
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${meta.dotColor}`} />
                          <h4 className="font-display font-bold text-sm sm:text-base text-zinc-950 tracking-tight">
                            {skill.name}
                          </h4>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full font-mono text-[9px] sm:text-[10px] font-semibold border ${
                            statusMeta[skill.status]
                          }`}
                        >
                          {skill.status}
                        </span>
                      </div>

                      {/* Category Label */}
                      <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
                        {skill.category}
                      </p>

                      {/* Tagline / Subtitle */}
                      <p className="font-mono text-[11px] sm:text-xs text-[#F2572B] font-semibold mb-1.5 leading-snug">
                        {skill.tagline}
                      </p>

                      {/* Short Description */}
                      <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed mb-2.5 font-sans">
                        {skill.description}
                      </p>

                      {/* Footer Tip */}
                      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] font-mono text-zinc-600">
                        <span>Focused</span>
                        <span>Tap / move away to close</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ── Sub-Legend with Entrance & Hover Animations ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-600 px-2"
      >
        <div className="flex flex-wrap items-center gap-4">
          <motion.span whileHover={{ scale: 1.08 }} className="flex items-center gap-1.5 cursor-default">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> AI / ML
          </motion.span>
          <motion.span whileHover={{ scale: 1.08 }} className="flex items-center gap-1.5 cursor-default">
            <span className="w-2 h-2 rounded-full bg-sky-500" /> GenAI
          </motion.span>
          <motion.span whileHover={{ scale: 1.08 }} className="flex items-center gap-1.5 cursor-default">
            <span className="w-2 h-2 rounded-full bg-indigo-500" /> AI Systems
          </motion.span>
          <motion.span whileHover={{ scale: 1.08 }} className="flex items-center gap-1.5 cursor-default">
            <span className="w-2 h-2 rounded-full bg-teal-500" /> Data
          </motion.span>
          <motion.span whileHover={{ scale: 1.08 }} className="flex items-center gap-1.5 cursor-default">
            <span className="w-2 h-2 rounded-full bg-violet-500" /> Cloud / MLOps
          </motion.span>
          <motion.span whileHover={{ scale: 1.08 }} className="flex items-center gap-1.5 cursor-default">
            <span className="w-2 h-2 rounded-full bg-zinc-500" /> Software
          </motion.span>
        </div>

        <span className="text-zinc-600 hidden md:inline">
          {filteredSkills.length} Technologies
        </span>
      </motion.div>
    </section>
  );
}
