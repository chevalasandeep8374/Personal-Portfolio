"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import {
  RisingBlurIn,
  OffsetRoll,
  HighlightIn,
} from "./ui/text-animations";
import { GrainOverlay } from "./ui/GrainOverlay";

interface FocusTopic {
  number: string;
  title: string;
  tag: string;
  tagline: string;
}

const topics: FocusTopic[] = [
  {
    number: "01",
    title: "AI Voice Agents",
    tag: "VOICE AI",
    tagline:
      "Building natural, real-time AI voice agents with speech recognition, conversational AI, interruption handling, and low-latency voice responses.",
  },
  {
    number: "02",
    title: "AI Automation Agency",
    tag: "AI BUSINESS",
    tagline:
      "Exploring how to build an AI agency that helps businesses automate repetitive workflows, improve operations, and save time using intelligent systems.",
  },
  {
    number: "03",
    title: "Autonomous AI Agents",
    tag: "AGENTIC AI",
    tagline:
      "Creating AI agents that plan tasks, use tools, manage multi-step workflows, and complete useful tasks with minimal human intervention.",
  },
  {
    number: "04",
    title: "AI Workflow Automation",
    tag: "WORKFLOW",
    tagline:
      "Connecting APIs, business tools, and AI models to build practical automations for lead generation, customer support, data processing, and daily operations.",
  },
  {
    number: "05",
    title: "MCP & AI Tool Integration",
    tag: "MCP",
    tagline:
      "Exploring Model Context Protocol, tool integrations, and ways to connect AI assistants with external applications and data sources.",
  },
  {
    number: "06",
    title: "AI Products & SaaS Ideas",
    tag: "PRODUCTS",
    tagline:
      "Experimenting with AI-powered products and scalable software ideas that solve real-world problems and can become useful business offerings.",
  },
];

export default function CurrentlyBuilding() {
  return (
    <section className="py-20 sm:py-24 border-y border-[#F2572B]/15 bg-[#FCF6F5]/70 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] xs:text-xs uppercase tracking-widest text-zinc-600 mb-2">
            <Compass className="w-3.5 h-3.5 text-[#F2572B] shrink-0" />
            <OffsetRoll as="span" delay={0.05}>
              <span>06 / ACTIVE RESEARCH & EXPERIMENTS</span>
            </OffsetRoll>
          </div>
          <RisingBlurIn as="h2" distance={20} blur={8} delay={0.1} duration={0.65} className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 uppercase leading-none font-display">
            CURRENTLY EXPLORING
          </RisingBlurIn>
        </div>
      </div>

      {/* Animated Infinite Horizontal Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden py-3"
      >
        {/* Soft edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-10 xs:w-16 sm:w-28 bg-gradient-to-r from-[#FCF6F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 xs:w-16 sm:w-28 bg-gradient-to-l from-[#FCF6F5] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-4">
          {[...topics, ...topics].map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden flex items-start gap-3 px-4 xs:px-5 py-3.5 xs:py-4 rounded-2xl bg-white border border-[#F2572B]/10 shadow-xs shrink-0 hover:border-[#F2572B]/30 transition-colors max-w-[280px] xs:max-w-sm sm:max-w-md"
            >
              <GrainOverlay opacity={0.035} />
              <div className="w-2 h-2 rounded-full bg-[#F2572B] animate-pulse mt-1.5 shrink-0 z-20" />
              <div className="flex-1 relative z-20">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-mono text-xs font-semibold text-zinc-400">
                    {item.number}
                  </span>
                  <span className="text-zinc-300 font-mono text-xs">•</span>
                  <span className="font-bold text-xs sm:text-sm text-zinc-900 tracking-tight">
                    {item.title}
                  </span>
                  <HighlightIn variant="badge" color="#F2572B">
                    <span className="px-1.5 py-0.5 rounded font-mono text-[9px] uppercase bg-[#FCF6F5] text-[#F2572B] border border-[#F2572B]/15 font-semibold">
                      {item.tag}
                    </span>
                  </HighlightIn>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-600 leading-relaxed font-normal">
                  {item.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
