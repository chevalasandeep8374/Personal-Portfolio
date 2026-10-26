import React from "react";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { PageContentWrapper } from "@/components/transitions/CurtainTransition";
import { SchoolingFish } from "@/components/ui/SchoolingFish";

export const metadata = {
  title: "Projects — Sandeep Chevala | AI / ML Engineer",
  description: "Explore AI automation, Agentic AI, LangGraph, RAG, and production Machine Learning projects by Sandeep Chevala.",
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-[#08090B] text-[#F5F7FA] selection:bg-[#990011] selection:text-[#FCF6F5] overflow-hidden">
      {/* Ambient Interactive Schooling Fish Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-45">
        <SchoolingFish className="w-full h-full" fishColor="#9CDAFF" countMultiplier={1.5} />
      </div>

      <Navbar />

      <main className="w-full pt-16 relative z-10">
        <PageContentWrapper>
          <Projects />
        </PageContentWrapper>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
