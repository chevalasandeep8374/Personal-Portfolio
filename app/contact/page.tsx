import React from "react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { PageContentWrapper } from "@/components/transitions/CurtainTransition";

export const metadata = {
  title: "Contact — Sandeep Chevala | AI / ML Engineer",
  description: "Get in touch with Sandeep Chevala for AI/ML engineering, Agentic AI, and production software roles.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#FCF6F5] text-zinc-900 selection:bg-[#F2572B] selection:text-[#FCF6F5]">
      <Navbar />

      <main className="w-full pt-16">
        <PageContentWrapper>
          <Contact />
        </PageContentWrapper>
      </main>

      <Footer />
    </div>
  );
}
