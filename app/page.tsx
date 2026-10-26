import React from "react";
import LogoIntro from "@/components/LogoIntro";
import ScrollToTopOnRefresh from "@/components/ScrollToTopOnRefresh";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { DarkTransition } from "@/components/DarkTransition";
import { PageContentWrapper } from "@/components/transitions/CurtainTransition";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FCF6F5] text-zinc-900 selection:bg-[#F2572B] selection:text-[#FCF6F5]">
      {/* Scroll restoration guard: always open from Hero starting page on refresh */}
      <ScrollToTopOnRefresh />

      {/* Initial Logo Intro Overlay */}
      <LogoIntro />

      {/* Floating Pill Navigation */}
      <Navbar />

      <main className="w-full">
        <PageContentWrapper>
          {/* 1. Hero: Who I am + Interactive AI Pipeline Visual */}
          <Hero />

          {/* 2. About: I BUILD INTELLIGENT SYSTEMS */}
          <About />

          {/* 3. Capabilities: WHAT I BUILD */}
          <Capabilities />

          {/* 4. Tech Stack: HOW I BUILD (interactive spotlight) */}
          <TechStack />

          {/*
            ── CINEMATIC DARK TRANSITION ──────────────────────────────────────
            After TechStack, a scroll-linked clip-path reveal transitions the
            page from the light world into the deep dark chapter.
            Projects and Experience render inside the DarkTransition wrapper.
          */}
          <DarkTransition>
            {/* 5. Selected Work: WHAT I'VE BUILT (dark editorial case studies) */}
            <Projects />

            {/* 6. Experience: WHERE I'VE WORKED (dark timeline) */}
            <Experience />

            {/* Separator before returning to light */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </DarkTransition>

          {/* 7. Currently Exploring: WHAT I'M LEARNING/BUILDING (Marquee) */}
          <CurrentlyBuilding />

          {/* 8. Contact: LET'S BUILD SOMETHING INTELLIGENT */}
          <Contact />
        </PageContentWrapper>
      </main>

      {/* 9. Minimal Editorial Footer */}
      <Footer />
    </div>
  );
}
