"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import {
  OffsetRoll,
  SequentialDrops,
  HighlightIn,
} from "@/components/ui/text-animations";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

// ─────────────────────────────────────────────────────────────────────────────
// Project data — exactly 4
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "ai-automation",
    number: "01",
    title: "AI Automation",
    subtitle:
      "Building intelligent workflows that connect tools, process information, and automate repetitive tasks with minimal manual effort.",
    category: "Workflow Automation",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
    tags: ["n8n", "Webhooks", "FastAPI", "OpenAI"],
    metric: "99.9% Uptime",
  },
  {
    id: "ai-voice-agents",
    number: "02",
    title: "AI Voice Agents",
    subtitle:
      "Creating AI-powered voice assistants that understand conversations, respond naturally, handle calls, and automate customer interactions.",
    category: "Voice & Conversational AI",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=85",
    tags: ["Voice AI", "WebSockets", "Tool Calling", "Python"],
    metric: "< 450ms Latency",
  },
  {
    id: "lead-generation-multi-agent",
    number: "03",
    title: "Lead Generation & Multi-Agent Systems",
    subtitle:
      "Developing AI agents that research prospects, qualify leads, gather information, and collaborate to complete complex tasks.",
    category: "Multi-Agent Systems",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
    tags: ["LangGraph", "ChromaDB", "Supabase", "CRM"],
    metric: "Autonomous Handoff",
  },
  {
    id: "building-automated-systems",
    number: "04",
    title: "Building Automated Systems",
    subtitle:
      "Designing end-to-end systems that connect APIs, databases, AI models, and business tools into reliable, scalable workflows.",
    category: "Systems Engineering",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
    tags: ["FastAPI", "Docker", "PostgreSQL", "Kafka"],
    metric: "End-to-End Reliability",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Arc / motion constants
// ─────────────────────────────────────────────────────────────────────────────
const SPACING_X = 290;
const CURVE_Y   = 22;
const MAX_ROT   = 4.2;

// ─────────────────────────────────────────────────────────────────────────────
// Single project card — image only, no text inside
// ─────────────────────────────────────────────────────────────────────────────
type Project = (typeof PROJECTS)[number];

function ProjectCard({
  project,
  index,
  phase,
}: {
  project: Project;
  index: number;
  phase: MotionValue<number>;
}) {
  const offset     = useTransform(phase, (p) => index - p);
  const x          = useTransform(offset, (o) => o * SPACING_X);
  const y          = useTransform(offset, (o) => Math.min(o * o * CURVE_Y, 260));
  const scale      = useTransform(offset, (o) => Math.max(0.68, 1 - Math.abs(o) * 0.12));
  const opacity    = useTransform(offset, (o) => Math.max(0.25, 1 - Math.abs(o) * 0.25));
  const rotateZ    = useTransform(offset, (o) => o * MAX_ROT);
  const blurFilter = useTransform(offset, (o) => `blur(${Math.min(Math.abs(o) * 1.5, 4.0).toFixed(1)}px)`);
  const zIndexVal  = useTransform(offset, (o) => Math.max(1, Math.round(30 - Math.abs(o) * 5)));

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        rotateZ,
        zIndex: zIndexVal,
        position: "absolute",
      }}
      className="
        w-[250px] xs:w-[290px] sm:w-[360px] md:w-[410px] lg:w-[450px]
        h-[220px] xs:h-[260px] sm:h-[340px] md:h-[370px] lg:h-[400px]
        rounded-[22px] sm:rounded-[32px]
        overflow-hidden
        shadow-[0_24px_60px_rgba(0,0,0,0.12)]
        will-change-transform select-none
      "
    >
      {/* Full-bleed image with dark scrim */}
      <motion.div
        style={{ filter: blurFilter }}
        className="relative w-full h-full overflow-hidden bg-zinc-900"
      >
        <img
          src={project.image}
          alt={project.title}
          draggable={false}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top badge row */}
        <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between z-20">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-zinc-900 font-mono text-[10px] font-semibold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="font-mono text-xs font-bold text-blue-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
            {project.number}
          </span>
        </div>

        {/* Subtle fine film grain texture overlay */}
        <GrainOverlay opacity={0.045} />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main capabilities section
// ─────────────────────────────────────────────────────────────────────────────
export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const phase = useTransform(scrollYProgress, [0, 1], [0, 3]);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(phase, "change", (v) => {
    setActiveIndex(Math.max(0, Math.min(PROJECTS.length - 1, Math.round(v))));
  });

  const active = PROJECTS[activeIndex];

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="relative"
      style={{ height: "300vh" }}
    >
      {/* ── Pinned viewport ────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FCF6F5]">

        {/* ── Eyebrow ─────────────────────────────────────────────────────── */}
        <div
          className="
            absolute top-6 sm:top-8 left-1/2 -translate-x-1/2
            flex items-center gap-2.5
            font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500
            whitespace-nowrap z-30 pointer-events-none
          "
        >
          <OffsetRoll as="span" delay={0.05}>
            <span>02 / CAPABILITIES</span>
          </OffsetRoll>
          <span className="hidden sm:block w-10 h-px bg-zinc-300" />
          <HighlightIn as="span" variant="badge" color="#F2572B">
            <span className="text-[#F2572B] font-semibold px-2 py-0.5 rounded bg-[#F2572B]/10">WHAT I BUILD</span>
          </HighlightIn>
        </div>

        {/* ── Card arc ────────────────────────────────────────────────────── */}
        <div className="relative flex items-center justify-center h-[220px] xs:h-[260px] sm:h-[340px] md:h-[370px] lg:h-[400px] w-full">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              phase={phase}
            />
          ))}
        </div>

        {/* ── Text panel — below the card arc, in normal flow ─────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 xs:mt-5 sm:mt-8 w-full max-w-[340px] sm:max-w-[540px] md:max-w-[620px] px-3 sm:px-4 text-center z-20"
          >
            <OffsetRoll
              as="h3"
              mode="words"
              duration={0.45}
              className="font-display text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-zinc-950 tracking-tight leading-snug justify-center text-center"
            >
              {active.title}
            </OffsetRoll>
            <SequentialDrops
              as="p"
              mode="words"
              duration={0.4}
              delay={0.08}
              className="font-mono text-[11px] xs:text-xs sm:text-sm text-zinc-600 mt-1.5 sm:mt-2 leading-relaxed justify-center text-center"
            >
              {active.subtitle}
            </SequentialDrops>

            {/* Tags + metric row */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {active.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded bg-white border border-[#F2572B]/20 text-zinc-800 text-[10px] sm:text-[11px] font-mono shadow-2xs"
                >
                  {tag}
                </span>
              ))}
              <HighlightIn variant="badge" color="#F2572B">
                <span className="text-[11px] font-mono text-[#F2572B] font-bold px-1.5 py-0.5 rounded bg-[#F2572B]/10">
                  {active.metric}
                </span>
              </HighlightIn>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Progress pill indicators ─────────────────────────────────────── */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
          {PROJECTS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === activeIndex ? 28 : 6,
                backgroundColor: i === activeIndex ? "#F2572B" : "#d4d4d8",
                opacity: i === activeIndex ? 1 : 0.55,
              }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              style={{ height: 5, borderRadius: 9999, display: "block" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
