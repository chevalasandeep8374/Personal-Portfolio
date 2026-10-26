"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences, ExperienceItem, education, certifications } from "../data/experience";
import { Calendar, MapPin, CheckCircle2, Award, Sparkles, GraduationCap, ShieldCheck } from "lucide-react";
import {
  RisingBlurIn,
  SequentialDrops,
  HighlightIn,
  OffsetRoll,
} from "./ui/text-animations";
import { GrainOverlay } from "./ui/GrainOverlay";

// ─────────────────────────────────────────────────────────────────────────────
// Experience section — dark chapter with classic typography & blue accents
// ─────────────────────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* ── Section Header ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#A5ADB8] mb-6">
        <OffsetRoll as="span" delay={0.05}>
          <span>05 / CAREER</span>
        </OffsetRoll>
        <span className="w-12 h-px bg-white/20" />
        <HighlightIn as="span" variant="badge" color="#38BDF8">
          <span className="text-[#FCF6F5] font-semibold flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span className="text-[#38BDF8]">TRACK RECORD</span>
          </span>
        </HighlightIn>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <RisingBlurIn as="h2" distance={24} blur={8} delay={0.1} duration={0.7} className="font-classic text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FCF6F5] uppercase leading-none">
            EXPERIENCE
          </RisingBlurIn>
        </div>
      </div>

      {/* Intro copy with classic serif typography */}
      <div className="mb-16 max-w-2xl">
        <SequentialDrops as="p" mode="words" delay={0.2} duration={0.45} className="text-base sm:text-lg leading-relaxed text-[#CBD2DC] font-serif">
          Practical engineering experience spanning AI/ML systems, real-time microservices, anomaly detection pipelines, and scalable web application development.
        </SequentialDrops>
      </div>

      {/* ── Editorial Timeline ────────────────────────────────────────────── */}
      <div className="relative ml-4 sm:ml-8 pl-6 sm:pl-10 flex flex-col gap-10 sm:gap-14">
        {/* Vertical timeline rule */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.08]" />

        {experiences.map((exp, index) => (
          <ExperienceEntry key={exp.id} exp={exp} index={index} />
        ))}
      </div>

      {/* ── Education & Certifications ────────────────────────────────────── */}
      <div className="mt-24 pt-16 border-t border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Education Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#A5ADB8]">
            <GraduationCap className="w-4 h-4 text-[#38BDF8]" />
            <span>ACADEMIC BACKGROUND</span>
          </div>

          <div className="flex flex-col gap-4">
            {education.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="relative overflow-hidden p-6 rounded-2xl bg-[#111419] border border-white/[0.08] hover:border-[#38BDF8]/40 transition-colors shadow-md group"
              >
                <GrainOverlay opacity={0.04} />
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <h4 className="text-lg font-bold text-white font-classic group-hover:text-[#38BDF8] transition-colors">
                    {edu.degree}
                  </h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] font-mono text-xs font-semibold shrink-0">
                    {edu.score}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#CBD2DC]">
                  <span>{edu.institution}</span>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#38BDF8]" />
                    {edu.location}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#38BDF8]" />
                    {edu.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#A5ADB8]">
            <Award className="w-4 h-4 text-[#38BDF8]" />
            <span>INDUSTRY CERTIFICATIONS</span>
          </div>

          <div className="flex flex-col gap-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-[#131924] to-[#0f1217] border border-[#38BDF8]/30 hover:border-[#38BDF8]/60 transition-colors shadow-[0_4px_25px_rgba(56,189,248,0.1)] group"
              >
                <GrainOverlay opacity={0.04} />
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center shrink-0 text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-classic leading-snug group-hover:text-[#38BDF8] transition-colors">
                      {cert.name}
                    </h4>
                    <p className="mt-1 text-xs font-mono text-[#38BDF8]/90 font-medium">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Single timeline entry with classic typography and blue accents
// ─────────────────────────────────────────────────────────────────────────────
function ExperienceEntry({
  exp,
  index,
}: {
  exp: ExperienceItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isFeatured = exp.featured;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* Timeline dot */}
      <div
        className={`
          absolute -left-[31px] sm:-left-[47px] top-2
          w-3.5 h-3.5 rounded-full
          transition-all duration-300
          ${
            isFeatured
              ? "bg-[#38BDF8] border-2 border-[#FCF6F5]/90 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
              : "bg-[#08090B] border-2 border-white/20 group-hover:border-[#38BDF8] group-hover:bg-[#38BDF8]/20"
          }
        `}
      />

      <div
        className={`
          relative overflow-hidden
          p-4 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl
          border transition-all duration-300
          ${
            isFeatured
              ? "bg-gradient-to-br from-[#131924] via-[#111419] to-[#0f1217] border-[#38BDF8]/35 shadow-[0_8px_36px_rgba(56,189,248,0.15)] hover:border-[#38BDF8]/60"
              : "bg-[#111419] border-white/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:border-white/[0.15]"
          }
        `}
      >
        <GrainOverlay opacity={0.045} />
        {/* Header: Role, Company, Period, Badges */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-white/[0.07]">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <OffsetRoll as="h3" mode="words" className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#FCF6F5] tracking-wide font-classic">
                {exp.role}
              </OffsetRoll>
              {isFeatured && (
                <HighlightIn variant="badge" color="#38BDF8">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/50 text-[#38BDF8] text-[10px] font-mono uppercase tracking-wider font-semibold">
                    <Sparkles className="w-2.5 h-2.5 text-[#38BDF8]" />
                    Featured
                  </span>
                </HighlightIn>
              )}
              {exp.achievement && (
                <HighlightIn variant="badge" color="#10b981">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-wider font-semibold">
                    <Award className="w-2.5 h-2.5 text-emerald-400" />
                    {exp.achievement}
                  </span>
                </HighlightIn>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#CBD2DC]">
              <HighlightIn variant="sweep" color="#38BDF8">
                <span className="text-[#38BDF8] font-semibold">{exp.company}</span>
              </HighlightIn>
              {exp.location && (
                <>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#38BDF8]" />
                    {exp.location}
                  </span>
                </>
              )}
              {exp.type && (
                <>
                  <span className="text-white/20">•</span>
                  <span>{exp.type}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#CBD2DC] bg-white/[0.05] px-3 py-1 rounded-full self-start sm:self-auto border border-white/[0.07] shrink-0">
            <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{exp.period}</span>
          </div>
        </div>

        {/* Summary with Classic Serif */}
        <SequentialDrops as="p" mode="words" delay={0.1} className="mt-4 text-sm sm:text-base text-[#D0D6E0] leading-relaxed font-serif">
          {exp.summary}
        </SequentialDrops>

        {/* Key Technical Contributions */}
        <div className="mt-5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8]/90 mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            KEY RESPONSIBILITIES &amp; CONTRIBUTIONS
          </h4>
          <ul className="flex flex-col gap-2.5">
            {exp.contributions.map((c, cIdx) => (
              <li
                key={cIdx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD2DC] leading-relaxed font-serif"
              >
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mt-6 pt-5 border-t border-white/[0.07] flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-[#A5ADB8] mr-1">TECH:</span>
          {exp.techStack.map((tech) => (
            <span
              key={tech}
              className={`
                px-2.5 py-1 rounded-full font-mono text-xs transition-colors
                ${
                  isFeatured
                    ? "bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 hover:border-[#38BDF8]/60"
                    : "bg-white/[0.05] text-[#CBD2DC] border border-white/[0.08] hover:border-[#38BDF8]/40 hover:text-[#FCF6F5]"
                }
              `}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
