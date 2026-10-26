"use client";

/**
 * DarkTransition
 * ──────────────
 * Clean, seamless transition between the light world and the dark chapter.
 * Featuring the interactive Schooling Fish simulation across the dark section.
 */

import React from "react";
import { SchoolingFish } from "@/components/ui/SchoolingFish";

interface DarkTransitionProps {
  children: React.ReactNode;
}

function DarkEntry() {
  return (
    <div
      className="relative w-full h-12 sm:h-16 bg-gradient-to-b from-[#FCF6F5] via-[#08090B]/60 to-[#08090B]"
      aria-hidden="true"
    />
  );
}

function LightExit() {
  return (
    <div
      className="relative w-full h-12 sm:h-16 bg-gradient-to-b from-[#08090B] via-[#08090B]/60 to-[#FCF6F5]"
      aria-hidden="true"
    />
  );
}

export function DarkTransition({ children }: DarkTransitionProps) {
  return (
    <>
      <DarkEntry />
      <div className="dark-section relative bg-[#08090B] overflow-hidden">
        {/* Schooling Fish Interactive Simulation */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
          <SchoolingFish className="w-full h-full" fishColor="#9CDAFF" countMultiplier={1.5} />
        </div>

        {/* Foreground Content (Projects, Experience) */}
        <div className="relative z-10 pointer-events-auto">
          {children}
        </div>
      </div>
      <LightExit />
    </>
  );
}
