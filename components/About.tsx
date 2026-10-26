"use client";

import React from "react";
import { Cpu, Bot, Sparkles } from "lucide-react";
import { ScrollSplitCard } from "@/components/ui/scroll-split-card";
import {
  RisingBlurIn,
  SequentialDrops,
  HighlightIn,
  OffsetRoll,
} from "@/components/ui/text-animations";

export default function About() {
  return (
    <section id="about" className="relative w-full bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-12 sm:pb-16 text-center">
        <div className="mb-6 flex justify-center">
          <OffsetRoll as="div" delay={0.05}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF6F5] text-xs font-display font-semibold text-[#F2572B] border border-[#F2572B]/20 uppercase tracking-widest">
              ABOUT
            </span>
          </OffsetRoll>
        </div>

        {/* Coordinated Premium Text Animations for the 3 Heading Statements */}
        <div className="flex flex-col items-center gap-1.5 sm:gap-3">
          <div>
            <RisingBlurIn as="h2" distance={24} blur={8} delay={0.1} className="text-neutral-950 font-display font-bold tracking-tight text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Ideas spark the journey.
            </RisingBlurIn>
          </div>

          <div>
            <OffsetRoll as="p" delay={0.25} className="text-neutral-600 font-normal italic font-serif text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              Experiments shape the craft.
            </OffsetRoll>
          </div>

          <div>
            <HighlightIn as="p" variant="sweep" color="#F2572B" delay={0.4} className="text-[#F2572B] font-display font-bold tracking-tight text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Building makes it real.
            </HighlightIn>
          </div>
        </div>

        {/* Sequential Drops Animation for Subtext Below */}
        <div className="mt-6 sm:mt-8 max-w-2xl mx-auto px-2">
          <SequentialDrops
            as="p"
            mode="words"
            delay={0.5}
            className="text-sm sm:text-lg font-medium text-neutral-600 leading-relaxed font-serif justify-center text-center"
          >
            I learn by building — turning ideas into working prototypes, testing new technologies and improving through hands-on projects.
          </SequentialDrops>
        </div>
      </div>

      <ScrollSplitCard
        imageSrc="/about-ai-cinematic.jpg"
        frontHeading="Build systems that think."
        frontSubheading="Ship agents that work."
        endingText="Build. Learn. Experiment."
        cards={[
          {
            title: "AI & Machine Learning",
            description:
              "Building practical solutions with machine learning, generative AI and intelligent systems while continuously learning through experimentation.",
            bgColor: "#0f172a",
            textColor: "#ffffff",
            icon: <Cpu className="w-8 h-8 text-blue-400 mb-2" />,
          },
          {
            title: "Automation & AI Agents",
            description:
              "Exploring AI agents, workflow automation, voice systems and intelligent tools that connect models with real-world applications.",
            bgColor: "#F2572B",
            textColor: "#FCF6F5",
            icon: <Bot className="w-8 h-8 text-[#FCF6F5] mb-2" />,
          },
          {
            title: "Build. Learn. Experiment.",
            description:
              "I learn by building — turning ideas into working prototypes, testing new technologies and improving through hands-on projects.",
            bgColor: "#18181b",
            textColor: "#ffffff",
            icon: <Sparkles className="w-8 h-8 text-amber-300 mb-2" />,
          },
        ]}
      />
    </section>
  );
}
