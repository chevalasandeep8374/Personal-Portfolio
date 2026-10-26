"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ParticlesBg } from "@/components/ui/particles-bg";
import {
  Sun,
  Moon,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  MousePointer,
  Layers,
  Palette,
  CheckCircle2,
} from "lucide-react";

export default function ParticlesPage() {
  const [themeMode, setThemeMode] = useState<"auto" | "light" | "dark">("light");
  const [isDarkEffective, setIsDarkEffective] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  // Sync theme with system and html class
  useEffect(() => {
    const updateEffective = () => {
      if (themeMode === "dark") {
        setIsDarkEffective(true);
        document.documentElement.classList.add("dark");
      } else if (themeMode === "light") {
        setIsDarkEffective(false);
        document.documentElement.classList.remove("dark");
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const hasDarkClass = document.documentElement.classList.contains("dark");
        const effective = prefersDark || hasDarkClass;
        setIsDarkEffective(effective);
      }
    };

    updateEffective();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (themeMode === "auto") updateEffective();
    };
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === "auto") return isDarkEffective ? "light" : "dark";
      if (prev === "light") return "dark";
      return "light";
    });
  };

  return (
    <div
      onClick={() => setClickCount((c) => c + 1)}
      style={{
        backgroundColor: isDarkEffective ? "#000814" : "#FFFFFF",
        color: isDarkEffective ? "#F8FAFC" : "#0F172A",
        transition: "background-color 0.4s ease, color 0.4s ease",
      }}
      className="relative min-h-screen w-full overflow-x-hidden selection:bg-orange-500 selection:text-white"
    >
      {/*
        ========================================================================
        1. PARTICLES BACKGROUND
        Fixed full-viewport canvas behind content (z-0).
        Pure #FFFFFF light mode, #000814 dark navy mode, zero blue gradients.
        ========================================================================
      */}
      <ParticlesBg
        theme={themeMode}
        maxDistance={130}
        grabRadius={160}
        interactive={true}
        clickToAdd={true}
        className="fixed inset-0 z-0"
      />

      {/*
        ========================================================================
        2. FOREGROUND CONTENT LAYER
        Using pointer-events-none on outer flex wrapper so background clicks
        reach the canvas for particle spawning, while all content cards,
        links, buttons have pointer-events-auto so they are NEVER blocked.
        ========================================================================
      */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between pointer-events-none">
        {/* Navigation Bar */}
        <header className="pointer-events-auto w-full border-b transition-colors duration-300 backdrop-blur-md border-black/5 dark:border-white/10 bg-white/70 dark:bg-[#000814]/75">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Back link & Title */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Portfolio</span>
              </Link>
              <span className="hidden sm:inline-block text-xs font-mono tracking-wider opacity-40">
                /
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-tight">
                Particle Canvas Studio
              </span>
            </div>

            {/* Quick Links & Theme Switcher */}
            <div className="flex items-center gap-2 sm:gap-4">
              <nav className="hidden md:flex items-center gap-5 text-xs font-medium tracking-wide">
                <Link
                  href="/projects"
                  className="transition-opacity opacity-70 hover:opacity-100"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="transition-opacity opacity-70 hover:opacity-100"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="transition-opacity opacity-70 hover:opacity-100"
                >
                  Contact
                </Link>
              </nav>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTheme();
                }}
                aria-label="Toggle theme mode"
                className="relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all border border-black/10 dark:border-white/15 bg-white/90 dark:bg-white/10 hover:border-black/25 dark:hover:border-white/30 shadow-xs"
              >
                {isDarkEffective ? (
                  <>
                    <Sun className="h-3.5 w-3.5 text-amber-400" />
                    <span className="hidden xs:inline">Dark Navy</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-slate-700" />
                    <span className="hidden xs:inline">Pure White</span>
                  </>
                )}
                <span className="text-[10px] font-mono opacity-50 uppercase ml-0.5">
                  {themeMode}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="pointer-events-auto mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>Standalone Canvas Background Page</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono opacity-50">
              <Sparkles className="h-3 w-3" />
              60 FPS Canvas Physics
            </span>
          </div>

          {/* Heading */}
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
              Harmonious particles.
              <br />
              <span className="opacity-45 font-light">Zero visual interference.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed opacity-75 max-w-2xl font-normal">
              A high-performance particle constellation engineered with smooth velocity physics,
              cursor hover-grab connecting lines, and responsive density. Designed to sit effortlessly
              behind readable editorial typography without blocking user interactions.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all bg-[#0F172A] text-white hover:bg-black dark:bg-[#FCF6F5] dark:text-[#000814] dark:hover:bg-white shadow-sm"
            >
              {isDarkEffective ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span>Switch to {isDarkEffective ? "Light (#FFFFFF)" : "Dark (#000814)"}</span>
            </button>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all border border-black/15 dark:border-white/15 bg-white/60 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 backdrop-blur-sm"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-opacity opacity-60 hover:opacity-100"
            >
              Back to Home
            </Link>
          </div>

          {/* Feature Highlights Grid */}
          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Card 1 */}
            <div className="group relative rounded-2xl p-6 transition-all duration-300 border border-black/8 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md hover:border-black/20 dark:hover:border-white/25">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10">
                <Palette className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="mt-4 text-base font-semibold tracking-tight">Pure White & Black Particles</h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed opacity-70">
                Light mode delivers a pure white background (<code className="font-mono text-[11px]">#FFFFFF</code>)
                with crisp black particles (<code className="font-mono text-[11px]">#000000</code>) and delicate connecting lines. Dark mode
                switches to deep dark navy (<code className="font-mono text-[11px]">#000814</code>) with white nodes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-2xl p-6 transition-all duration-300 border border-black/8 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md hover:border-black/20 dark:hover:border-white/25">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10">
                <MousePointer className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="mt-4 text-base font-semibold tracking-tight">Interactive Grab & Spawn</h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed opacity-70">
                Moving your cursor or touching the screen dynamically draws connecting lines toward nearby particles
                within a 160px grab radius. Clicking anywhere on open canvas creates 4 new radiating particles.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-2xl p-6 transition-all duration-300 border border-black/8 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md hover:border-black/20 dark:hover:border-white/25">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10">
                <Layers className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="mt-4 text-base font-semibold tracking-tight">Zero Click Blocking</h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed opacity-70">
                The canvas is fixed behind all page content (<code className="font-mono text-[11px]">z-0</code>).
                All headings, buttons, links, and cards remain fully clickable and selectable without interference.
              </p>
            </div>
          </div>

          {/* Interactive Status & Testing Bar */}
          <div className="mt-8 rounded-2xl p-5 border border-black/8 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold">Interactive Canvas Active</div>
                  <div className="text-[11px] opacity-60">
                    Try hovering anywhere or clicking on empty space to spawn particles.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="rounded-md px-2.5 py-1 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
                  Clicks logged: <span className="font-bold text-orange-600 dark:text-orange-400">{clickCount}</span>
                </span>
                <span className="rounded-md px-2.5 py-1 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
                  Theme: <span className="font-bold">{isDarkEffective ? "Dark (#000814)" : "Light (#FFFFFF)"}</span>
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="pointer-events-auto w-full border-t border-black/5 dark:border-white/10 py-6 transition-colors duration-300 backdrop-blur-md bg-white/50 dark:bg-[#000814]/50">
          <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 text-xs opacity-60">
            <div>
              <span>© {new Date().getFullYear()} Sandeep Chevala • Particle Background Showcase</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:opacity-100 transition-opacity">
                Home
              </Link>
              <Link href="/projects" className="hover:opacity-100 transition-opacity">
                Projects
              </Link>
              <Link href="/contact" className="hover:opacity-100 transition-opacity">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
