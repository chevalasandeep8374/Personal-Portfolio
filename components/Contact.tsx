"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  ArrowRight,
  FileText,
  Sparkles,
  Send,
  MessageSquare,
  Phone,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./Icons";
import { FadeInUp } from "./ui/FadeInUp";
import {
  RisingBlurIn,
  SequentialDrops,
  HighlightIn,
  OffsetRoll,
} from "./ui/text-animations";
import { GrainOverlay } from "./ui/GrainOverlay";

export default function Contact() {
  const [copied, setCopied] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const emailAddress = "chevalasandeep@gmail.com";
  const phoneNumber = "+91 8374948078";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 sm:py-36 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-600 mb-6">
        <OffsetRoll as="span" delay={0.05}>
          <span>07 / CONTACT</span>
        </OffsetRoll>
        <span className="w-12 h-px bg-zinc-300 dark:bg-zinc-800" />
        <HighlightIn as="span" variant="badge" color="#00f0ff">
          <span className="text-[#00f0ff] font-semibold px-2 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            GET IN TOUCH
          </span>
        </HighlightIn>
      </div>

      {/* Outer Card with Continuous Moving Flowing Neon Blue Border Beam */}
      <motion.div
        initial={{ opacity: 0, y: 44, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative p-[1.5px] rounded-[32px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(0,240,255,0.2)]"
      >
        {/* Continuous Flowing Neon Light Beam (Moving around the perimeter) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,#00f0ff_315deg,#38BDF8_340deg,#00f0ff_360deg)] pointer-events-none"
        />

        <div className="p-5 xs:p-7 sm:p-14 lg:p-16 rounded-[26px] sm:rounded-[30.5px] bg-gradient-to-b from-[#070D18]/98 via-[#050912]/98 to-[#02050A]/99 text-white relative overflow-hidden">
          {/* Subtle fine film-grain overlay */}
          <GrainOverlay opacity={0.045} />

          {/* Dynamic Moving Neon Blue Aurora / Orbs */}
          <motion.div
            animate={{
              x: [0, 80, -40, 0],
              y: [0, -60, 40, 0],
              scale: [1, 1.25, 0.9, 1],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-[#00f0ff]/20 rounded-full blur-[110px] pointer-events-none"
          />
          <motion.div
            animate={{
              x: [0, -70, 50, 0],
              y: [0, 50, -40, 0],
              scale: [1, 1.2, 0.95, 1],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-24 -left-24 w-[450px] h-[450px] bg-[#0284C7]/25 rounded-full blur-[100px] pointer-events-none"
          />
          <motion.div
            animate={{
              x: [-40, 40, -40],
              y: [30, -30, 30],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-[#38BDF8]/20 rounded-full blur-[90px] pointer-events-none"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
            {/* Left Column: Big Editorial Headline & Direct Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="mb-5 sm:mb-6">
                  <HighlightIn variant="badge" color="#00f0ff">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs font-mono text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]" />
                      <span>ACCEPTING NEW CHALLENGES</span>
                    </div>
                  </HighlightIn>
                </div>

                <RisingBlurIn as="h2" distance={24} blur={8} delay={0.1} duration={0.7} className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase leading-[1.05] sm:leading-[0.95] text-white font-display break-words">
                  LET&apos;S BUILD SOMETHING{" "}
                  <span className="bg-gradient-to-r from-[#00f0ff] via-[#38BDF8] to-[#60A5FA] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                    INTELLIGENT
                  </span>
                  .
                </RisingBlurIn>

                <div className="mt-4 sm:mt-6">
                  <SequentialDrops as="p" mode="words" delay={0.2} duration={0.45} className="text-sm sm:text-lg text-zinc-300 max-w-xl leading-relaxed font-normal">
                    Open to opportunities in AI/ML, Generative AI, and autonomous systems. Let&apos;s connect.
                  </SequentialDrops>
                </div>
              </div>

              {/* Quick Email & Phone Copy Box & Socials */}
              <FadeInUp distance={16} duration={0.6} delay={0.26} className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#00f0ff]/15 flex flex-col gap-4 sm:gap-5">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <a
                    href={`mailto:${emailAddress}`}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 min-h-[44px] rounded-full bg-gradient-to-r from-[#00f0ff] via-[#38BDF8] to-[#0284C7] hover:brightness-110 text-[#030914] font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-[0_0_25px_rgba(0,240,255,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-[#00f0ff]/50 overflow-hidden relative cursor-pointer"
                  >
                    <HighlightIn variant="sweep" delay={0.3}>
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#030914]" />
                        <span>Send Direct Email</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#030914]" />
                      </span>
                    </HighlightIn>
                  </a>

                  <a
                    href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 min-h-[44px] rounded-full bg-[#081120]/80 hover:bg-[#0c1a30] text-zinc-200 font-mono text-xs border border-[#00f0ff]/25 hover:border-[#00f0ff]/60 hover:text-[#00f0ff] transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.06)]"
                    title="Call directly"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>{phoneNumber}</span>
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 min-h-[44px] rounded-full bg-[#081120]/80 hover:bg-[#0c1a30] text-zinc-200 font-mono text-xs border border-[#00f0ff]/25 hover:border-[#00f0ff]/60 hover:text-[#00f0ff] transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.06)]"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00f0ff]" />
                        <span className="text-[#00f0ff] font-semibold">Email Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Social Channels Row */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs pt-2">
                  <a
                    href="https://www.linkedin.com/in/sandeep-chevala-286ba2286"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-full bg-[#081120]/80 hover:bg-[#0c1a30] border border-[#00f0ff]/20 hover:border-[#00f0ff]/50 text-zinc-300 hover:text-[#00f0ff] transition-all shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://github.com/chevalasandeep8374"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-full bg-[#081120]/80 hover:bg-[#0c1a30] border border-[#00f0ff]/20 hover:border-[#00f0ff]/50 text-zinc-300 hover:text-[#00f0ff] transition-all shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href="mailto:chevalasandeep@gmail.com"
                    className="flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-full bg-[#081120]/80 hover:bg-[#0c1a30] border border-[#00f0ff]/20 hover:border-[#00f0ff]/50 text-zinc-300 hover:text-[#00f0ff] transition-all shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span className="truncate max-w-[200px] xs:max-w-none">chevalasandeep@gmail.com</span>
                  </a>
                </div>
              </FadeInUp>
            </div>

            {/* Right Column: Direct Message Neon Blue Glass Card with Moving Border Beam */}
            <div className="lg:col-span-5 relative p-[1.5px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(0,240,255,0.18)]">
              {/* Flowing Inner Neon Beam */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-[150%] bg-[conic-gradient(from_180deg,transparent_0deg,transparent_280deg,#00f0ff_330deg,#38BDF8_360deg)] pointer-events-none"
              />
              <div className="relative rounded-[calc(1.5rem-1.5px)] overflow-hidden p-4 xs:p-6 sm:p-8 bg-gradient-to-b from-[#0A1426]/90 via-[#060D1A]/92 to-[#03070E]/95 backdrop-blur-2xl">
                {/* Moving glass refraction light */}
                <motion.div
                  animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -25, 25, 0],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-20 -right-20 w-48 h-48 bg-[#00f0ff]/25 rounded-full blur-2xl pointer-events-none"
                />
                <motion.div
                  animate={{
                    x: [0, -25, 25, 0],
                    y: [0, 25, -25, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-16 -left-16 w-44 h-44 bg-[#0284C7]/25 rounded-full blur-2xl pointer-events-none"
                />

                <GrainOverlay opacity={0.035} />

                {/* Glass Header Bar */}
                <div className="relative z-10 flex items-center justify-between pb-4 mb-5 border-b border-[#00f0ff]/15">
                  <div className="flex items-center gap-2.5 font-mono text-xs text-zinc-200">
                    <div className="w-7 h-7 rounded-lg bg-[#00f0ff]/15 border border-[#00f0ff]/35 flex items-center justify-center text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.25)]">
                      <MessageSquare className="w-3.5 h-3.5 text-[#00f0ff]" />
                    </div>
                    <span className="font-semibold tracking-wider uppercase text-[11px] text-zinc-200">SEND A MESSAGE</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/25 text-[10px] font-mono text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.15)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_6px_#00f0ff]" />
                    <span>ACTIVE</span>
                  </div>
                </div>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-14 text-center flex flex-col items-center justify-center gap-3 text-zinc-200 relative z-10"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#00f0ff]/20 border border-[#00f0ff]/40 text-[#00f0ff] flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                      <Check className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-lg text-white font-onest">Message Transmitted!</h3>
                    <p className="text-xs text-zinc-400 max-w-xs font-mono leading-relaxed">
                      Thank you for reaching out. I will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-300 uppercase tracking-wider font-medium mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Engineering Leader / Founder"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#040812]/70 hover:bg-[#060c1c]/70 focus:bg-[#060e22]/90 backdrop-blur-md border border-[#00f0ff]/20 hover:border-[#00f0ff]/40 focus:border-[#00f0ff] text-white placeholder-zinc-500 text-sm sm:text-xs shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.6)] focus:ring-2 focus:ring-[#00f0ff]/30 focus:outline-none transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-300 uppercase tracking-wider font-medium mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#040812]/70 hover:bg-[#060c1c]/70 focus:bg-[#060e22]/90 backdrop-blur-md border border-[#00f0ff]/20 hover:border-[#00f0ff]/40 focus:border-[#00f0ff] text-white placeholder-zinc-500 text-sm sm:text-xs shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.6)] focus:ring-2 focus:ring-[#00f0ff]/30 focus:outline-none transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-300 uppercase tracking-wider font-medium mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell me about your project, team, or opportunity..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#040812]/70 hover:bg-[#060c1c]/70 focus:bg-[#060e22]/90 backdrop-blur-md border border-[#00f0ff]/20 hover:border-[#00f0ff]/40 focus:border-[#00f0ff] text-white placeholder-zinc-500 text-sm sm:text-xs shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.6)] focus:ring-2 focus:ring-[#00f0ff]/30 focus:outline-none transition-all duration-200 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full py-3.5 sm:py-3 px-6 min-h-[46px] bg-gradient-to-r from-[#00f0ff] via-[#38BDF8] to-[#0284C7] hover:brightness-110 active:scale-[0.98] text-[#030914] rounded-xl text-xs sm:text-xs font-bold font-mono tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(0,240,255,0.45),inset_0_1px_1px_rgba(255,255,255,0.5)] border border-[#00f0ff]/50 transition-all cursor-pointer overflow-hidden relative group"
                    >
                      <HighlightIn variant="sweep" delay={0.2}>
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-3.5 h-3.5 text-[#030914]" />
                          <span>Send Transmission</span>
                        </span>
                      </HighlightIn>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
