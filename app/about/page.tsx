import React from "react";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Footer from "@/components/Footer";
import { PageContentWrapper } from "@/components/transitions/CurtainTransition";

export const metadata = {
  title: "About — Sandeep Chevala | AI / ML Engineer",
  description: "Learn about Sandeep Chevala, his AI/ML background, engineering capabilities, and architecture focus.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#FCF6F5] text-zinc-900 selection:bg-[#F2572B] selection:text-[#FCF6F5]">
      <Navbar />

      <main className="w-full pt-16">
        <PageContentWrapper>
          <About />
          <Capabilities />
        </PageContentWrapper>
      </main>

      <Footer />
    </div>
  );
}
