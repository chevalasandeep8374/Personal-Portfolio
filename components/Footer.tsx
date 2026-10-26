"use client";

import React from "react";
import { ArrowUp, Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-[#F2572B]/15 bg-[#FCF6F5] py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand identity */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center font-bold text-[10px] group-hover:bg-[#F2572B] group-hover:text-[#FCF6F5] transition-colors">
              SC
            </div>
            <span className="font-extrabold text-sm tracking-tight text-zinc-950 group-hover:text-[#F2572B] transition-colors">
              SANDEEP CHEVALA
            </span>
          </div>
          <span className="mt-1 font-mono text-xs text-zinc-600 tracking-wider text-center sm:text-left break-words">
            AI AGENTIC &amp; AUTOMATION ENGINEER · MULTI-AGENT SYSTEMS · RAG · FASTAPI
          </span>
        </div>

        {/* Links with small logos (Touch-friendly targets) */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs font-mono text-zinc-600">
          <a
            href="https://github.com/chevalasandeep8374"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 py-1 hover:text-[#F2572B] transition-colors group min-h-[40px]"
          >
            <GithubIcon className="w-3.5 h-3.5 text-zinc-700 group-hover:text-[#F2572B] transition-colors" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/sandeep-chevala-286ba2286"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 py-1 hover:text-[#F2572B] transition-colors group min-h-[40px]"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2] group-hover:brightness-110 transition-transform" />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:chevalasandeep@gmail.com"
            className="flex items-center gap-1.5 py-1 hover:text-[#F2572B] transition-colors group min-h-[40px]"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-700 group-hover:text-[#F2572B] transition-colors" />
            <span>Email</span>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 py-1 hover:text-[#F2572B] transition-colors group min-h-[40px]"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-700 group-hover:text-[#F2572B] transition-colors" />
            <span>Resume</span>
          </a>
        </div>

        {/* Copyright, Credits & Scroll To Top */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-xs font-mono text-zinc-600">
          <div className="flex items-center gap-2">
            <span>© 2026 Sandeep Chevala</span>
            <span className="text-zinc-300">·</span>
            <a
              href="https://www.instagram.com/_pradeep_dhfm?srtk=bmt3NG9lbHg0ZTZ0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-[#F2572B] transition-colors underline-offset-4 hover:underline py-1"
            >
              Created by Pradeep Ch
            </a>
          </div>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-white hover:bg-[#F2572B] hover:text-[#FCF6F5] border border-[#F2572B]/15 text-zinc-700 active:scale-90 transition-all cursor-pointer shadow-2xs flex items-center justify-center"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
