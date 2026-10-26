import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, Project } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageContentWrapper } from "@/components/transitions/CurtainTransition";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  CheckCircle2,
  Server,
  Sparkles,
  Terminal,
  Workflow,
  Cpu,
  Play,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all 6 genuine projects so all routes are pre-rendered
export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.id,
  }));
}

// Dynamic SEO metadata
export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found — Sandeep Chevala",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} — Sandeep Chevala | AI / ML Engineer`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Sandeep Chevala`,
      description: project.description,
      images: project.imageUrl ? [{ url: project.imageUrl }] : [],
    },
  };
}

// Helper to filter placeholder URLs like '[ADD GITHUB URL]'
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

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.id === slug);

  // Graceful Not-Found State
  if (projectIndex === -1) {
    return (
      <div className="relative min-h-screen bg-[#08090B] text-[#F5F7FA] selection:bg-[#990011] selection:text-[#FCF6F5]">
        <Navbar />
        <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
          <div className="p-8 max-w-md rounded-2xl bg-[#111419] border border-white/10 shadow-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#990011] font-semibold mb-2 block">
              404 · NOT FOUND
            </span>
            <h1 className="text-2xl font-bold font-display text-white mb-3">
              Project Not Found
            </h1>
            <p className="text-sm text-[#A5ADB8] mb-6 leading-relaxed">
              The project you are looking for does not exist or may have been relocated.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#990011] hover:bg-[#80000e] text-[#FCF6F5] font-mono text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Projects</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const project = projects[projectIndex];
  const demoLink = getValidUrl(project.demoUrl);
  const githubLink = getValidUrl(project.githubUrl);
  const youTubeEmbed = getYouTubeEmbedUrl(project.demoUrl);

  // Previous and next projects for sequential navigation
  const prevProject =
    projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  return (
    <div className="relative min-h-screen bg-[#08090B] text-[#F5F7FA] selection:bg-[#990011] selection:text-[#FCF6F5]">
      <Navbar />

      <main className="w-full pt-28 sm:pt-32 pb-24 px-4 sm:px-6 max-w-5xl mx-auto">
        <PageContentWrapper>
          {/* ── 1. Top Navigation & Breadcrumbs ── */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-white/10 text-xs font-mono"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-[#A5ADB8] hover:text-[#FCF6F5] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#990011] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Selected Work</span>
            </Link>

            <div className="flex items-center gap-3 text-[#A5ADB8]/70">
              <span>PROJECT {project.number} OF {String(projects.length).padStart(2, "0")}</span>
              <span>•</span>
              <span className="text-[#990011] font-semibold uppercase">
                {project.categories[0] || "AI System"}
              </span>
            </div>
          </nav>

          {/* ── 2. Project Header ── */}
          <header className="mb-10 sm:mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#990011]/20 border border-[#990011]/40 text-[#FCF6F5] text-xs font-mono font-semibold uppercase tracking-wider">
                {project.number}
              </span>
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#A5ADB8] text-xs font-mono"
                >
                  {cat}
                </span>
              ))}
              {project.featured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FCF6F5] text-xs font-mono font-semibold">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  Primary Featured Project
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-tight mb-4">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#A5ADB8] font-normal leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>
          </header>

          {/* ── 3. Project Preview Video or Image ── */}
          {(youTubeEmbed || project.imageUrl) && (
            <div className="mb-12 sm:mb-16 rounded-3xl overflow-hidden border border-white/10 bg-[#111419] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {youTubeEmbed ? (
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <iframe
                    src={youTubeEmbed}
                    title={`${project.title} — Live Demo Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-600/95 backdrop-blur-md text-white font-mono font-bold text-xs shadow-md pointer-events-none">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>LIVE DEMO VIDEO</span>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-40 pointer-events-none" />
                </div>
              )}

              {/* Sub-strip with Action Links */}
              <div className="p-4 sm:p-6 bg-[#0d1015] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#A5ADB8]">
                  <Workflow className="w-4 h-4 text-[#990011]" />
                  <span>{project.category}</span>
                </div>

                <div className="flex items-center gap-3">
                  {demoLink && (
                    <a
                      href={demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#990011] hover:bg-[#80000e] text-[#FCF6F5] text-xs font-mono font-bold transition-colors shadow-sm"
                    >
                      {demoLink.includes("youtu") ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Live Demo Video</span>
                        </>
                      ) : (
                        <>
                          <span>Live Demo</span>
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-[#FCF6F5] text-xs font-mono font-medium transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}

                  {!demoLink && !githubLink && (
                    <span className="text-xs font-mono text-[#A5ADB8]/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      Internal / Production Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── 4. Main Details Grid (Overview, Architecture, Features) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
            {/* Left Column (7 cols): Overview & Features */}
            <div className="lg:col-span-7 space-y-10">
              {/* Overview */}
              <section aria-labelledby="overview-heading">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#990011] font-semibold mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#990011]" />
                  <span>OVERVIEW</span>
                </div>
                <h2
                  id="overview-heading"
                  className="text-xl sm:text-2xl font-bold font-display text-white mb-4"
                >
                  System Purpose &amp; Summary
                </h2>
                <p className="text-sm sm:text-base text-[#A5ADB8] leading-relaxed">
                  {project.description}
                </p>
              </section>

              {/* Key Features & Architecture Highlights */}
              {project.features && project.features.length > 0 && (
                <section aria-labelledby="features-heading">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#990011] font-semibold mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#990011]" />
                    <span>KEY ARCHITECTURE &amp; WORKFLOW HIGHLIGHTS</span>
                  </div>
                  <h2
                    id="features-heading"
                    className="text-xl sm:text-2xl font-bold font-display text-white mb-5"
                  >
                    Implemented Features &amp; Capabilities
                  </h2>

                  <ul className="space-y-3.5">
                    {project.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-[#111419] border border-white/5 text-xs sm:text-sm text-[#A5ADB8] leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#990011] mt-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Right Column (5 cols): Tech Stack & Deployment Metadata */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              {/* Technology Stack Box */}
              <section
                aria-labelledby="tech-heading"
                className="p-6 rounded-2xl bg-[#111419] border border-white/10"
              >
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#990011] font-semibold mb-3">
                  <Cpu className="w-4 h-4 text-[#990011]" />
                  <span>TECHNOLOGY STACK</span>
                </div>
                <h3
                  id="tech-heading"
                  className="text-base font-bold text-white font-display mb-4"
                >
                  Tools, Frameworks &amp; APIs
                </h3>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#FCF6F5]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Deployment & Execution Details */}
              {project.deploymentInfo && (
                <section
                  aria-labelledby="deployment-heading"
                  className="p-6 rounded-2xl bg-[#111419] border border-white/10"
                >
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#990011] font-semibold mb-3">
                    <Server className="w-4 h-4 text-[#990011]" />
                    <span>DEPLOYMENT INFRASTRUCTURE</span>
                  </div>
                  <h3
                    id="deployment-heading"
                    className="text-base font-bold text-white font-display mb-2"
                  >
                    Hosting &amp; Environments
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-[#A5ADB8] leading-relaxed">
                    {project.deploymentInfo}
                  </p>
                </section>
              )}

              {/* Direct Actions Card */}
              <div className="p-6 rounded-2xl bg-[#111419] border border-white/10 space-y-3">
                <span className="font-mono text-xs text-[#A5ADB8] uppercase tracking-wider block">
                  Project Availability
                </span>

                <div className="flex flex-col gap-2 pt-1">
                  {demoLink && (
                    <a
                      href={demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#990011] hover:bg-[#80000e] text-[#FCF6F5] text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <span>Launch Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {githubLink && (
                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[#FCF6F5] text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Explore Repository</span>
                    </a>
                  )}

                  <Link
                    href="/contact"
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#FCF6F5] text-xs font-mono text-center block transition-colors"
                  >
                    Discuss This Architecture
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── 5. Project Footer & Previous / Next Links ── */}
          <footer className="pt-10 border-t border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Previous Project Link */}
              <Link
                href={`/projects/${prevProject.id}`}
                className="group p-5 rounded-2xl bg-[#111419] border border-white/10 hover:border-[#990011]/50 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#A5ADB8] mb-2">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>PREVIOUS PROJECT</span>
                </div>
                <div className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#FCF6F5] line-clamp-1">
                  {prevProject.title}
                </div>
              </Link>

              {/* Next Project Link */}
              <Link
                href={`/projects/${nextProject.id}`}
                className="group p-5 rounded-2xl bg-[#111419] border border-white/10 hover:border-[#990011]/50 transition-all flex flex-col justify-between text-left sm:text-right"
              >
                <div className="flex items-center justify-start sm:justify-end gap-1.5 text-xs font-mono text-[#A5ADB8] mb-2">
                  <span>NEXT PROJECT</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#FCF6F5] line-clamp-1">
                  {nextProject.title}
                </div>
              </Link>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#FCF6F5] transition-colors"
              >
                <span>View All 6 Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </footer>
        </PageContentWrapper>
      </main>

      <Footer />
    </div>
  );
}
