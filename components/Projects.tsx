"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  projects,
  Project,
  projectCategories,
  ProjectCategory,
} from "../data/projects";
import {
  ArrowRight,
  Activity,
  ExternalLink,
  Sparkles,
  X,
  CheckCircle2,
  Server,
  Layers,
  Play,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import {
  RisingBlurIn,
  SequentialDrops,
  HighlightIn,
  OffsetRoll,
} from "./ui/text-animations";
import { GrainOverlay } from "./ui/GrainOverlay";

// Helper to validate external URLs (filters placeholders like '[ADD GITHUB URL]')
function getValidUrl(url?: string): string | null {
  if (!url || url.trim() === "" || url.includes("[ADD")) {
    return null;
  }
  return url;
}

// Helper to extract YouTube embed URL from standard or short link
function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0` : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPACT, FLAT, EDITORIAL PROJECT CARD (Dark Chapter with Blue Accents)
// ─────────────────────────────────────────────────────────────────────────────
interface CompactProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

function CompactProjectCard({ project, index, onSelect }: CompactProjectCardProps) {
  const shouldReduce = useReducedMotion();
  const demoLink = getValidUrl(project.demoUrl);
  const githubLink = getValidUrl(project.githubUrl);

  const handleCardClick = () => {
    onSelect(project);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(project);
    }
  };

  const staggerDelay = shouldReduce
    ? 0
    : (index % 3) * 0.12 + Math.floor(index / 3) * 0.08;

  return (
    <motion.article
      layout
      initial={
        shouldReduce
          ? { opacity: 0 }
          : { opacity: 0, y: 46, scale: 0.93, filter: "blur(8px)" }
      }
      whileInView={
        shouldReduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.94, filter: "blur(4px)" }}
      whileHover={
        shouldReduce
          ? {}
          : { y: -8, transition: { duration: 0.3, ease: "easeOut" } }
      }
      transition={{
        duration: 0.7,
        delay: staggerDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-label={`Open project details for ${project.title}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="
        group relative flex flex-col justify-between
        p-4 sm:p-5 rounded-2xl sm:rounded-3xl
        bg-[#090B0E]
        border border-white/12
        hover:border-[#38BDF8]/60
        hover:bg-[#0D1015]
        shadow-[0_8px_32px_rgba(0,0,0,0.5)]
        hover:shadow-[0_16px_48px_rgba(56,189,248,0.22)]
        transition-colors duration-400
        overflow-hidden cursor-pointer
        focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#38BDF8]
      "
    >
      {/* Subtle intro specular light sweep across card when revealed */}
      {!shouldReduce && (
        <motion.div
          initial={{ x: "-120%", opacity: 0 }}
          whileInView={{ x: "220%", opacity: [0, 0.35, 0] }}
          viewport={{ once: true }}
          transition={{
            duration: 1.1,
            delay: staggerDelay + 0.25,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
        />
      )}
      <GrainOverlay opacity={0.06} />
      <div>
        {/* Top Meta Strip: Project Category + Optional Featured Pill */}
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-zinc-300 uppercase">
              {project.categories[0] || project.category.split("|")[0].trim()}
            </span>
          </div>

          {project.featured && (
            <HighlightIn variant="badge" color="#38BDF8">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/40 text-[#38BDF8] text-[10px] font-semibold uppercase tracking-wider">
                <Sparkles className="w-2.5 h-2.5 text-[#38BDF8]" />
                Featured
              </span>
            </HighlightIn>
          )}
        </div>

        {/* Heavy Grain Movement Visual Stage (Inspired by the tutorial poster reference) */}
        {project.imageUrl && (
          <div className="mt-3 mb-3.5 rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 bg-black relative group/media aspect-[16/10]">
            {/* Billowing 3D Wave Image with Smooth Scaling on Hover */}
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:-translate-y-1"
            />

            {/* Subtle Contrast Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090B0E]/80 via-transparent to-black/20 pointer-events-none" />

            {/* Dense Monochromatic Film-Grain Noise Overlay (jitters with movement on hover) */}
            <div
              className="pointer-events-none absolute inset-0 bg-[url('/textures/grain.png')] bg-repeat opacity-35 mix-blend-overlay group-hover:animate-grain-jitter"
              style={{ backgroundSize: "128px 128px" }}
            />

            {/* Top-Left: Squircle Badge like the [Ps] logo in the reference */}
            <div className="absolute top-2.5 left-2.5 z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-black/70 backdrop-blur-md border border-white/80 text-white font-mono font-bold text-xs sm:text-sm shadow-md group-hover:border-[#38BDF8] group-hover:text-[#38BDF8] group-hover:shadow-[0_0_14px_rgba(56,189,248,0.5)] transition-all">
              {project.number}
            </div>

            {/* Top-Right: Monospace Tag (like Adobe Photoshop in reference) */}
            <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-300">
              <span className="truncate max-w-[120px]">
                {project.categories[0] || "AI System"}
              </span>
            </div>

            {/* Bottom-Right: Lab/Spec Tag (like The Photoshop Lab in reference) */}
            <div className="absolute bottom-2.5 right-2.5 z-10 text-[9px] font-mono tracking-widest uppercase text-white/80 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/15">
              {project.technologies[0] || "ENGINE"}
            </div>
          </div>
        )}

        {/* Title & Short Description: Bold modern geometric styling */}
        <div className="mt-1">
          <OffsetRoll as="h3" mode="words" className="font-onest text-lg sm:text-xl md:text-[22px] font-extrabold text-[#FCF6F5] group-hover:text-white transition-colors leading-snug tracking-tight">
            {project.title}
          </OffsetRoll>

          <p className="mt-1 font-mono text-[11px] sm:text-xs text-[#CBD2DC] font-medium line-clamp-1">
            {project.subtitle}
          </p>

          <SequentialDrops as="p" mode="words" delay={0.05} className="mt-2 text-xs text-[#9AA3AF] leading-relaxed line-clamp-2 font-sans">
            {project.description}
          </SequentialDrops>
        </div>

        {/* Compact Tech Badges (3-4 essential tags) */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/15 text-[10px] font-mono text-[#FCF6F5] group-hover:border-white/30 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/10 text-[10px] font-mono text-[#A5ADB8]">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Clear "View Details" trigger + external demo/code buttons */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
        {/* View Details Action Indicator with Blue Accent */}
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#FCF6F5] group-hover:text-[#38BDF8] transition-colors">
          <span className="text-[11px] uppercase tracking-wide">View Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8] transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>

        {/* External Quick Action Buttons (Clicks do NOT trigger modal open) */}
        <div className="flex items-center gap-2">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={demoLink.includes("youtu") ? `Watch live demo video for ${project.title}` : `Open live demo for ${project.title}`}
              title={demoLink.includes("youtu") ? "Watch Live Demo Video" : "Open Live Demo"}
              onClick={(e) => e.stopPropagation()}
              className="p-2 sm:p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#08090B] transition-colors shadow-sm active:scale-95"
            >
              {demoLink.includes("youtu") ? (
                <Play className="w-3.5 h-3.5 sm:w-3 sm:h-3 fill-current" />
              ) : (
                <ExternalLink className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
              )}
            </a>
          )}

          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open repository for ${project.title}`}
              title="Open Source Code"
              onClick={(e) => e.stopPropagation()}
              className="p-2 sm:p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[#FCF6F5] transition-colors active:scale-95"
            >
              <GithubIcon className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED PROJECT DETAIL OVERLAY MODAL (SAME-PAGE)
// Portaled directly to document.body with z-[99999] so it is completely
// above the page and navbar. Uses blue accents for the dark theme.
// ─────────────────────────────────────────────────────────────────────────────
interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const shouldReduce = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Lock background scroll and hide floating header when modal is open
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("project-modal-open");

    // Focus close button on open for accessibility
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove("project-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [project, onClose]);

  if (!project) return null;

  const demoLink = getValidUrl(project.demoUrl);
  const githubLink = getValidUrl(project.githubUrl);
  const youTubeEmbed = getYouTubeEmbedUrl(project.demoUrl);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-8"
    >
      {/* 1. Full-screen Backdrop Overlay (z-[99999]) */}
      <motion.div
        key="project-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        aria-hidden="true"
      />

      {/* 2. Floating Project-Detail Card (z-[100000]) */}
      <motion.div
        key={`project-modal-card-${project.id}`}
        initial={
          shouldReduce
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.94, y: 16 }
        }
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={
          shouldReduce
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.94, y: 10 }
        }
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative z-[100000] w-full max-w-3xl
          max-h-[84vh] sm:max-h-[82vh]
          my-auto
          flex flex-col
          rounded-2xl sm:rounded-3xl
          bg-[#0E1217]
          border border-white/20
          shadow-[0_25px_90px_rgba(0,0,0,0.95)]
          overflow-hidden
        "
      >
        <GrainOverlay opacity={0.045} />
        {/* Top Sticky Header Bar: Solid background, Project Number, Category, and Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-7 py-3 sm:py-4 bg-[#12161E] border-b border-white/15">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#38BDF8] text-[#08090B] font-bold shadow-xs text-[11px] sm:text-xs">
              PROJECT {project.number}
            </span>
            <span className="text-[#38BDF8] font-medium truncate max-w-[130px] xs:max-w-[200px] sm:max-w-md">
              {project.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="
              min-w-[40px] min-h-[40px] p-2 rounded-full
              flex items-center justify-center
              bg-white/10 hover:bg-white/20
              border border-white/20
              text-[#FCF6F5]
              hover:text-white
              transition-all duration-150 cursor-pointer
              focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#38BDF8] active:scale-95
            "
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Content Body with High-Contrast Readable Text */}
        <div className="overflow-y-auto px-5 sm:px-8 py-5 sm:py-6 space-y-6 scrollbar-thin">

          {/* Header Block: Categories, Title, Subtitle, Action Buttons */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FCF6F5] text-xs font-mono font-medium"
                >
                  {cat}
                </span>
              ))}
              {project.featured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/50 text-[#38BDF8] text-xs font-mono font-semibold">
                  <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                  Primary Featured
                </span>
              )}
            </div>

            <h2
              id="project-modal-title"
              className="text-2xl sm:text-3xl md:text-4xl font-black font-onest text-white tracking-tight leading-snug"
            >
              {project.title}
            </h2>

            <p className="mt-1.5 text-sm sm:text-base text-[#D4DAE4] font-medium leading-relaxed">
              {project.subtitle}
            </p>

            {/* Quick Action Links Bar */}
            {(demoLink || githubLink) && (
              <div className="flex flex-wrap items-center gap-3 mt-4">
                {demoLink && (
                  <a
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#08090B] font-mono text-xs sm:text-sm font-bold transition-colors shadow-sm"
                  >
                    {demoLink.includes("youtu") ? (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Live Demo Video</span>
                      </>
                    ) : (
                      <>
                        <span>Open Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </>
                    )}
                  </a>
                )}

                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#FCF6F5] font-mono text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Source Code</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Proportional Preview Video or Image */}
          {youTubeEmbed ? (
            <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
              <iframe
                src={youTubeEmbed}
                title={`${project.title} — Live Demo Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/95 backdrop-blur-md text-white font-mono font-bold text-xs shadow-md pointer-events-none">
                <Play className="w-3 h-3 fill-current" />
                <span>LIVE DEMO VIDEO</span>
              </div>
            </div>
          ) : project.imageUrl ? (
            <div className="relative aspect-[16/9] max-h-[260px] sm:max-h-[300px] w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 bg-black">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1217]/70 via-transparent to-transparent opacity-50 pointer-events-none" />
              {/* Dense Monochromatic Film-Grain Noise */}
              <div
                className="pointer-events-none absolute inset-0 bg-[url('/textures/grain.png')] bg-repeat opacity-35 mix-blend-overlay"
                style={{ backgroundSize: "128px 128px" }}
              />
              {/* Squircle Badge in Modal Header */}
              <div className="absolute top-3 left-3 z-10 flex items-center justify-center w-9 h-9 rounded-xl bg-black/70 backdrop-blur-md border border-white/80 text-white font-mono font-bold text-sm shadow-md">
                {project.number}
              </div>
            </div>
          ) : null}

          {/* Overview & System Purpose */}
          <section className="space-y-2.5 pt-3 border-t border-white/15">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              OVERVIEW &amp; SYSTEM PURPOSE
            </h3>
            <p className="text-[15px] sm:text-base text-[#F0F3F8] leading-relaxed font-normal">
              {project.description}
            </p>
          </section>

          {/* Key Features & Architecture Highlights */}
          {project.features && project.features.length > 0 && (
            <section className="space-y-3 pt-3 border-t border-white/15">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                KEY FEATURES &amp; ARCHITECTURAL HIGHLIGHTS
              </h3>
              <ul className="grid grid-cols-1 gap-2.5">
                {project.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-[15px] text-[#E4E8F0] leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Technology Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <section className="space-y-3 pt-3 border-t border-white/15">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#FCF6F5] font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#38BDF8]" />
                TECHNOLOGIES &amp; TOOLS USED
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-xs font-mono text-[#FCF6F5] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Deployment Info */}
          {project.deploymentInfo && (
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/15 flex items-start sm:items-center gap-3 font-mono text-xs text-[#F0F3F8]">
              <Server className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong className="text-white">Deployment &amp; Infrastructure:</strong>{" "}
                {project.deploymentInfo}
              </span>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 sm:px-8 py-3.5 bg-[#0A0D12] border-t border-white/15 flex items-center justify-between font-mono text-xs text-[#D4D8E2]">
          <span>Press ESC or click outside to close</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#FCF6F5] hover:text-[#38BDF8] transition-colors cursor-pointer"
          >
            Close ✕
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PROJECTS SECTION (Dark Chapter with Blue Accents & Balanced Spacing)
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("All Projects");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(
    null
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter projects based on selected category (preserves all 6 projects)
  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "All Projects") return true;
    return project.categories.includes(selectedCategory);
  });

  return (
    <section
      id="work"
      className="relative z-10 pt-8 sm:pt-12 pb-20 sm:pb-28 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Section Header Eyebrow with Blue Dot Accent */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#A5ADB8] mb-4">
        <OffsetRoll as="span" delay={0.05}>
          <span>04 / SELECTED WORK</span>
        </OffsetRoll>
        <span className="w-12 h-px bg-white/20" />
        <HighlightIn as="span" variant="badge" color="#38BDF8">
          <span className="text-[#FCF6F5] font-semibold flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span className="text-[#38BDF8]">AI SYSTEMS &amp; AUTOMATION</span>
          </span>
        </HighlightIn>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
        <div>
          <RisingBlurIn as="h2" distance={24} blur={8} delay={0.1} duration={0.65} className="font-onest text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#FCF6F5] uppercase leading-none">
            SELECTED WORK
          </RisingBlurIn>

          <div className="mt-2.5">
            <SequentialDrops as="p" mode="words" delay={0.18} duration={0.45} className="max-w-md text-[#CBD2DC] text-xs sm:text-sm leading-relaxed font-mono">
              Production AI agents, automated workflows, and intelligent systems built for real-world impact.
            </SequentialDrops>
          </div>
        </div>

        <HighlightIn variant="badge" color="#38BDF8" delay={0.2} className="self-start md:self-auto">
          <div className="flex items-center gap-2 font-mono text-xs text-[#A5ADB8] bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
            <Activity className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-[#FCF6F5] font-medium">
              {filteredProjects.length} Projects Displayed
            </span>
          </div>
        </HighlightIn>
      </div>

      {/* ── Category Filter Pills with Electric Blue Active State ───────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-none touch-pan-x">
        {projectCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[36px]
                ${
                  isActive
                    ? "bg-[#38BDF8] text-[#08090B] font-bold shadow-[0_0_16px_rgba(56,189,248,0.45)] border border-[#38BDF8]"
                    : "bg-white/5 text-[#A5ADB8] hover:text-[#FCF6F5] hover:bg-white/10 border border-white/10"
                }
              `}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Responsive Grid of Compact Project Cards ─────────────────────── */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <CompactProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setActiveProjectModal}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Same-Page Animated Project Detail Modal Overlay via React Portal ──── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeProjectModal && (
              <ProjectDetailModal
                project={activeProjectModal}
                onClose={() => setActiveProjectModal(null)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
