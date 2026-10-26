"use client";

import { useEffect } from "react";

export default function ScrollToTopOnRefresh() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Disable default browser scroll restoration so refresh always starts at top
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      // Scroll immediately to top on mount
      window.scrollTo(0, 0);

      // If URL had a hash on refresh, clean it to prevent jumping
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }

      // Also reset on beforeunload
      const handleBeforeUnload = () => {
        window.scrollTo(0, 0);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

  return null;
}
