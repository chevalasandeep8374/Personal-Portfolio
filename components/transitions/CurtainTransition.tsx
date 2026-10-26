"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface CurtainContextType {
  navigateTo: (href: string) => void;
  isNavigating: boolean;
}

const CurtainContext = createContext<CurtainContextType>({
  navigateTo: () => {},
  isNavigating: false,
});

export const useCurtainTransition = () => useContext(CurtainContext);

// Cubic-bezier easing for smooth, cinematic curtain sweep
const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export function CurtainTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Animation phase states: 'idle' | 'closing' | 'closed' | 'opening'
  const [phase, setPhase] = useState<"idle" | "closing" | "closed" | "opening">("idle");
  const pendingHrefRef = useRef<string | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isNavigating = phase !== "idle";

  // Clear safety timeout helper
  const clearSafetyTimeout = () => {
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
  };

  // Trigger internal page-to-page navigation
  const navigateTo = useCallback(
    (href: string) => {
      // Prevent duplicate transitions if already animating
      if (phase !== "idle") return;

      // Handle same-page hash or direct path match without curtain
      if (!href || href === pathname || href.startsWith("#")) {
        if (href.startsWith("#")) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
        return;
      }

      // If user prefers reduced motion, navigate directly
      if (shouldReduceMotion) {
        router.push(href);
        return;
      }

      pendingHrefRef.current = href;
      setPhase("closing");

      // Failsafe timeout: ensure curtain never remains permanently stuck
      clearSafetyTimeout();
      safetyTimeoutRef.current = setTimeout(() => {
        setPhase("idle");
        pendingHrefRef.current = null;
      }, 3500);
    },
    [phase, pathname, router, shouldReduceMotion]
  );

  // When curtain finishes closing (fully covers screen), execute route change
  const handleClosingComplete = () => {
    if (phase === "closing" && pendingHrefRef.current) {
      setPhase("closed");
      const destination = pendingHrefRef.current;
      router.push(destination);
    }
  };

  // When pathname changes while curtain is closed, open curtain to reveal new page
  useEffect(() => {
    if (phase === "closed") {
      // Small tick to ensure new route component renders behind curtain
      const timer = setTimeout(() => {
        setPhase("opening");
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname, phase]);

  // When curtain finishes opening off-screen to the right, reset to idle
  const handleOpeningComplete = () => {
    if (phase === "opening") {
      clearSafetyTimeout();
      setPhase("idle");
      pendingHrefRef.current = null;
    }
  };

  // Listen to browser popstate (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      if (phase !== "idle") {
        clearSafetyTimeout();
        setPhase("idle");
        pendingHrefRef.current = null;
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [phase]);

  // Global click interceptor for eligible internal <a> tags
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Only process primary left clicks without modifier keys
      if (
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, downloads, mailto, tel, and new tab links
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      // Check if this is an internal link between different pages
      const isInternalRoute =
        href.startsWith("/") && !href.startsWith("//") && href !== pathname;

      if (isInternalRoute) {
        e.preventDefault();
        navigateTo(href);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [navigateTo, pathname]);

  return (
    <CurtainContext.Provider value={{ navigateTo, isNavigating }}>
      {children}

      {/* =========================================================================
          PURE BLACK CURTAIN OVERLAY
          Fixed above the entire viewport (z-[9999]).
          Phase 'closing': animates from x: -100% -> 0% (left to right cover).
          Phase 'opening': animates from x: 0% -> 100% (slides off-screen to right).
      ========================================================================= */}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="curtain-overlay"
            aria-hidden="true"
            initial={phase === "closing" ? { x: "-100%" } : { x: "0%" }}
            animate={
              phase === "closing" || phase === "closed"
                ? { x: "0%" }
                : { x: "100%" }
            }
            transition={{
              duration: 0.48,
              ease: CURTAIN_EASE,
            }}
            onAnimationComplete={() => {
              if (phase === "closing") {
                handleClosingComplete();
              } else if (phase === "opening") {
                handleOpeningComplete();
              }
            }}
            className="fixed inset-0 z-[9999] pointer-events-auto bg-[#000000] w-screen h-screen min-h-screen select-none will-change-transform"
          />
        )}
      </AnimatePresence>
    </CurtainContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Content Entrance Wrapper
// Subtly fades and slides destination content upward as curtain opens
// ─────────────────────────────────────────────────────────────────────────────
export function PageContentWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
