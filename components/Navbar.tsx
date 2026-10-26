"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { useCurtainTransition } from "./transitions/CurtainTransition";
import { HighlightIn } from "./ui/text-animations";

interface NavItem {
  name: string;
  href: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home", sectionId: "home" },
  { name: "About", href: "#about", sectionId: "about" },
  { name: "Services", href: "#capabilities", sectionId: "capabilities" },
  { name: "Stack", href: "#stack", sectionId: "stack" },
  { name: "Projects", href: "#work", sectionId: "work" },
  { name: "Contact", href: "#contact", sectionId: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { navigateTo } = useCurtainTransition();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isDarkSection, setIsDarkSection] = useState<boolean>(false);

  const isManualScrolling = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic window width measurement for 100% full-width edge-to-edge docking
  useEffect(() => {
    if (typeof window === "undefined") return;
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth > 0 && windowWidth < 768;

  // Raw scroll position from page
  const { scrollY } = useScroll();

  // Damped spring scroll for liquid-smooth continuous animation across all devices
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 220,
    damping: 28,
    mass: 0.15,
    restDelta: 0.001,
  });

  // Target horizontal clearance on each side when scrolled into the 896px pill
  const targetSideInset = windowWidth > 0 ? Math.max(16, (windowWidth - 896) / 2) : 272;

  // Detect reduced-motion preference for accessibility
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  // Continuous scroll-driven transitions between scroll 0 and 110px:
  // 1. Top & horizontal edge clearance: 0px at top (100% full width to every side) -> 18px top / targetSideInset sides
  const headerPaddingTop = useTransform(smoothScrollY, [0, 110], ["0px", "18px"]);
  const headerPaddingX = useTransform(smoothScrollY, [0, 110], ["0px", `${targetSideInset}px`]);

  // 2. Corner radius: 0px (flat rectangular full-width header) -> full pill capsule (40px)
  const navBorderRadius = useTransform(smoothScrollY, [0, 110], ["0px", "40px"]);

  // 3. Internal padding: spacious at top -> compact floating pill
  const navPaddingY = useTransform(smoothScrollY, [0, 110], ["14px", "8px"]);
  const navPaddingX = useTransform(smoothScrollY, [0, 110], ["28px", "16px"]);

  // 4. Visual appearance: #1C1C1C charcoal dark header with refined glass border & shadow
  const navBgColor = useTransform(
    smoothScrollY,
    [0, 110],
    ["rgba(28, 28, 28, 0.98)", "rgba(28, 28, 28, 0.94)"]
  );
  const navBorderColor = useTransform(
    smoothScrollY,
    [0, 110],
    ["rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.18)"]
  );
  const navBoxShadow = useTransform(
    smoothScrollY,
    [0, 110],
    [
      "0 1px 3px rgba(0, 0, 0, 0.20)",
      "0 16px 36px -4px rgba(0, 0, 0, 0.50)",
    ]
  );

  // Smoothly scrolls to section target while accounting for sticky header clearance
  const scrollToSection = (sectionId: string) => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      return;
    }

    const el = document.getElementById(sectionId);
    if (!el) return;

    // Header clearance: 88px on sm/desktop, 76px on mobile
    const headerOffset = window.innerWidth >= 640 ? 88 : 76;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  // Scroll spy: tracks which section is in view during manual scrolling
  useEffect(() => {
    // If on subpages, route directly dictates active state and dark section
    if (pathname === "/about") {
      setActiveSection("about");
      setIsDarkSection(false);
      return;
    }
    if (pathname === "/projects" || pathname?.startsWith("/projects/")) {
      setActiveSection("work");
      setIsDarkSection(true);
      return;
    }
    if (pathname === "/contact") {
      setActiveSection("contact");
      setIsDarkSection(false);
      return;
    }
    if (pathname !== "/") return;

    let rafId: number | null = null;

    const checkDarkSection = () => {
      // 1. Direct section check for Selected Work (#work) and Experience (#experience)
      const workEl = document.getElementById("work");
      const expEl = document.getElementById("experience");
      const darkContainer = document.querySelector(".dark-section");

      if (workEl && expEl) {
        const workRect = workEl.getBoundingClientRect();
        const expRect = expEl.getBoundingClientRect();
        // The navbar floats near the top (0-80px).
        // Dark section is active when #work top reaches near top of screen (<= 160px)
        // and stays active until #experience bottom leaves the top (>= 60px).
        if (workRect.top <= 160 && expRect.bottom >= 60) {
          setIsDarkSection(true);
          return;
        }
      }

      if (darkContainer) {
        const rect = darkContainer.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 60) {
          setIsDarkSection(true);
          return;
        }
      }

      // 2. Active section fallback
      if (activeSection === "work" || activeSection === "experience") {
        setIsDarkSection(true);
        return;
      }

      setIsDarkSection(false);
    };

    const updateActiveSection = () => {
      // If a manual click-scroll is currently animating, do not overwrite state mid-flight
      if (isManualScrolling.current) return;

      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. Top of page: always Home
      if (currentScrollY < 80) {
        setActiveSection("home");
        setIsDarkSection(false);
        return;
      }

      // 2. Bottom of document: always Contact (ensures activation even on short bottom sections)
      if (windowHeight + currentScrollY >= docHeight - 70) {
        setActiveSection("contact");
        setIsDarkSection(false);
        return;
      }

      // 3. Middle sections: focal point line at 25-30% down the screen, below the floating navbar
      const focalPoint = 110 + windowHeight * 0.22;

      // Ordered list of section IDs as they appear in the DOM
      const sections = [
        "home",
        "about",
        "capabilities",
        "stack",
        "work",
        "experience",
        "contact",
      ];

      let current = "home";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // If the top edge has crossed or reached above the focal line
        if (rect.top <= focalPoint) {
          current = id;
        }
      }

      setActiveSection(current);
      if (current === "work" || current === "experience") {
        setIsDarkSection(true);
      }
    };

    const handleScroll = () => {
      checkDarkSection();
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial check on mount
    checkDarkSection();
    updateActiveSection();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [pathname]);

  // Handle direct URL hash landing or refresh
  useEffect(() => {
    if (pathname !== "/" || typeof window === "undefined") return;

    const initialHash = window.location.hash.replace("#", "");
    if (initialHash) {
      const timer = setTimeout(() => {
        scrollToSection(initialHash);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Handle browser back/forward buttons
  useEffect(() => {
    if (pathname !== "/" || typeof window === "undefined") return;

    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        scrollToSection(hash);
      } else {
        scrollToSection("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [pathname]);

  // Map active section identifier to the displayed nav tab name
  const getActiveItemName = (): string => {
    if (pathname === "/about") return "About";
    if (pathname === "/projects" || pathname?.startsWith("/projects/")) return "Projects";
    if (pathname === "/contact") return "Contact";

    if (pathname === "/") {
      if (activeSection === "contact") return "Contact";
      if (activeSection === "work" || activeSection === "experience") return "Projects";
      if (activeSection === "stack") return "Stack";
      if (activeSection === "capabilities") return "Services";
      if (activeSection === "about") return "About";
      return "Home";
    }

    return "Home";
  };

  const activeName = getActiveItemName();

  // Click handler: smoothly scrolls to section on home page or navigates with hash if on subpage
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    e.preventDefault();

    if (item.sectionId) {
      setActiveSection(item.sectionId);
      if (item.sectionId === "work" || item.sectionId === "experience") {
        setIsDarkSection(true);
      } else {
        setIsDarkSection(false);
      }
    }

    if (pathname === "/") {
      isManualScrolling.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollToSection(item.sectionId);

      // Cleanly sync URL hash without triggering navigation or cluttering history
      if (typeof window !== "undefined" && window.history?.replaceState) {
        window.history.replaceState(null, "", `#${item.sectionId}`);
      }

      // Re-enable automatic scroll-spy once smooth scroll completes
      scrollTimeoutRef.current = setTimeout(() => {
        isManualScrolling.current = false;
      }, 750);

      setMobileMenuOpen(false);
      return;
    }

    // Subpage fallback: navigate to homepage with hash target
    navigateTo(`/#${item.sectionId}`);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        paddingTop: isReducedMotion ? "18px" : isMobile ? "12px" : headerPaddingTop,
        paddingLeft: isReducedMotion ? `${targetSideInset}px` : isMobile ? "14px" : headerPaddingX,
        paddingRight: isReducedMotion ? `${targetSideInset}px` : isMobile ? "14px" : headerPaddingX,
      }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="w-full flex items-center justify-between pointer-events-auto">
        {/* Morphing Nav Bar: 100% full width to every side at top -> Floating pill when scrolled (#1C1C1C / White in dark section) */}
        <motion.nav
          aria-label="Main Navigation"
          style={{
            borderRadius: isReducedMotion ? "9999px" : isMobile ? "9999px" : navBorderRadius,
            paddingTop: isReducedMotion ? "8px" : isMobile ? "8px" : navPaddingY,
            paddingBottom: isReducedMotion ? "8px" : isMobile ? "8px" : navPaddingY,
            paddingLeft: isReducedMotion ? "16px" : isMobile ? "14px" : navPaddingX,
            paddingRight: isReducedMotion ? "16px" : isMobile ? "14px" : navPaddingX,
            backgroundColor: isDarkSection ? "#FFFFFF" : "#1C1C1C",
            borderColor: isDarkSection ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.15)",
            boxShadow: isDarkSection
              ? "0 20px 40px -4px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.08)"
              : "0 16px 36px -4px rgba(0, 0, 0, 0.50)",
          }}
          className={`w-full flex items-center justify-between border backdrop-blur-xl transition-[background-color,border-color,box-shadow,color] duration-300 ease-in-out ${
            isDarkSection
              ? "!bg-white !text-zinc-950 shadow-2xl"
              : "!bg-[#1C1C1C] !text-white shadow-xl"
          }`}
        >
          {/* Brand Monogram */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, navItems[0])}
            aria-label="Sandeep portfolio home"
            className="flex items-center gap-1.5 sm:gap-2 group px-1 sm:px-2 py-1 rounded-full transition-transform active:scale-95 cursor-pointer select-none shrink-0"
          >
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs tracking-wider shadow-sm transition-colors duration-300 ${
              isDarkSection
                ? "bg-[#1C1C1C] text-white group-hover:bg-[#F2572B]"
                : "bg-white text-[#1C1C1C] group-hover:bg-[#F2572B] group-hover:text-white"
            }`}>
              SC
            </div>
            <div className="flex flex-col">
              <HighlightIn variant="sweep" delay={0.3}>
                <span className={`text-xs sm:text-sm font-display font-bold tracking-wider transition-colors duration-300 uppercase ${
                  isDarkSection
                    ? "text-zinc-950 group-hover:text-[#F2572B]"
                    : "text-white group-hover:text-[#F2572B]"
                }`}>
                  SANDEEP
                </span>
              </HighlightIn>
            </div>
          </a>

          {/* Center Capsule Navigation Links (Desktop & Tablet Landscape) */}
          <div className={`hidden md:flex items-center gap-1 backdrop-blur-md px-2 py-1.5 rounded-full border shadow-sm transition-colors duration-300 ${
            isDarkSection
              ? "bg-zinc-100/90 border-zinc-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              : "bg-white/10 border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          }`}>
            {navItems.map((item) => {
              const isActive = activeName === item.name;

              return (
                <a
                  key={item.name}
                  href={`#${item.sectionId}`}
                  onClick={(e) => handleNavClick(e, item)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3 sm:px-4 py-1.5 font-display text-[13px] font-medium rounded-full transition-colors duration-200 cursor-pointer select-none inline-block ${
                    isActive
                      ? "text-white font-semibold"
                      : isDarkSection
                        ? "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/70"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavCapsule"
                      className="absolute inset-0 bg-[#F2572B] rounded-full shadow-xs -z-0"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action: Mobile Menu Toggle (Touch-friendly >= 44x44px) */}
          <div className="flex items-center justify-end md:min-w-[100px]">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className={`md:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-full flex items-center justify-center active:scale-90 transition-colors duration-300 cursor-pointer ${
                isDarkSection
                  ? "text-zinc-900 hover:bg-zinc-100 active:bg-zinc-200"
                  : "text-white hover:bg-white/10 active:bg-white/20"
              }`}
            >
              {mobileMenuOpen ? (
                <X className={`w-5 h-5 ${isDarkSection ? "text-zinc-900" : "text-white"}`} />
              ) : (
                <Menu className={`w-5 h-5 ${isDarkSection ? "text-zinc-900" : "text-white"}`} />
              )}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden fixed top-20 left-3 right-3 sm:left-4 sm:right-4 max-h-[calc(100dvh-5.5rem)] overflow-y-auto backdrop-blur-2xl border rounded-3xl p-4 sm:p-5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] pointer-events-auto z-50 transition-colors duration-300 ${
              isDarkSection
                ? "bg-white/95 text-zinc-900 border-zinc-200"
                : "bg-[#1C1C1C]/95 text-white border-white/15"
            }`}
          >
            <div className="flex flex-col gap-1.5">
              <div className={`flex items-center justify-between pb-3 mb-1 border-b text-xs font-mono ${
                isDarkSection ? "border-zinc-200 text-zinc-500" : "border-white/10 text-white/70"
              }`}>
                <span>NAVIGATION</span>
                <span className="flex items-center gap-1 text-emerald-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available 2026
                </span>
              </div>
              {navItems.map((item) => {
                const isActive = activeName === item.name;

                return (
                  <a
                    key={item.name}
                    href={`#${item.sectionId}`}
                    onClick={(e) => handleNavClick(e, item)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between px-3.5 py-3 min-h-[44px] rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#F2572B] text-white font-semibold"
                        : isDarkSection
                          ? "text-zinc-800 hover:bg-zinc-100 active:bg-zinc-200"
                          : "text-white/90 hover:bg-white/10 active:bg-white/15"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className={`w-4 h-4 ${isActive ? "text-white" : isDarkSection ? "text-zinc-500" : "text-white/70"}`} />
                  </a>
                );
              })}
              <div className={`pt-3 mt-1 border-t ${isDarkSection ? "border-zinc-200" : "border-white/10"}`}>
                <a
                  href="#contact"
                  onClick={(e) =>
                    handleNavClick(
                      e,
                      navItems.find((i) => i.sectionId === "contact") || navItems[5]
                    )
                  }
                  className="w-full py-3 min-h-[44px] bg-[#F2572B] hover:bg-[#D9451C] text-white rounded-xl text-center text-sm font-medium flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Let&apos;s Build Together</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
