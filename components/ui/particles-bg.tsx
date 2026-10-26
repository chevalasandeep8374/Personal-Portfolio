"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

export interface ParticlesBgProps {
  className?: string;
  style?: React.CSSProperties;
  quantity?: number;
  maxDistance?: number;
  grabRadius?: number;
  interactive?: boolean;
  clickToAdd?: boolean;
  theme?: "light" | "dark" | "auto";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export function ParticlesBg({
  className = "",
  style,
  quantity,
  maxDistance = 160,
  grabRadius = 180,
  interactive = true,
  clickToAdd = true,
  theme = "auto",
}: ParticlesBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Track automatic theme detection (prefers-color-scheme & html.dark)
  const [detectedDark, setDetectedDark] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const evaluateTheme = () => {
      const hasDarkClass =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDetectedDark(hasDarkClass || prefersDark);
    };

    evaluateTheme();

    // 1. Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onMediaChange = () => evaluateTheme();
    mediaQuery.addEventListener("change", onMediaChange);

    // 2. Observe changes to the 'class' attribute of <html> and <body>
    const observer = new MutationObserver(() => evaluateTheme());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      mediaQuery.removeEventListener("change", onMediaChange);
      observer.disconnect();
    };
  }, []);

  const isDark = useMemo(() => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return detectedDark;
  }, [theme, detectedDark]);

  // Theme color specifications:
  // Light: Pure white bg (#FFFFFF), BOLD deep black particles (#000000), crisp visible connecting lines
  // Dark:  Dark navy bg (#000814), BOLD luminous white particles (#FFFFFF), crisp translucent connecting lines
  const colors = useMemo(() => {
    return isDark
      ? {
          bg: "#000814",
          particle: { r: 255, g: 255, b: 255, alpha: 1.0 },
          line: { r: 255, g: 255, b: 255, maxOpacity: 0.45 },
          grab: { r: 255, g: 255, b: 255, maxOpacity: 0.75 },
        }
      : {
          bg: "#FFFFFF",
          particle: { r: 0, g: 0, b: 0, alpha: 1.0 }, // Pure solid black for bold visibility
          line: { r: 0, g: 0, b: 0, maxOpacity: 0.45 }, // Crisp, clearly visible black lines
          grab: { r: 0, g: 0, b: 0, maxOpacity: 0.75 }, // Strong hover-grab lines
        };
  }, [isDark]);

  // Bold particle creation: larger radius (3.5px - 5.5px) and solid opacity
  const createParticle = useCallback(
    (width: number, height: number, x?: number, y?: number): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.25 + Math.random() * 0.4; // smooth, steady float
      return {
        x: x !== undefined ? x : Math.random() * width,
        y: y !== undefined ? y : Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 3.2 + Math.random() * 2.4, // BOLD radius: 3.2px to 5.6px (6.4px - 11.2px diameter)
        alpha: 0.85 + Math.random() * 0.15, // Solid, highly visible alpha (0.85 - 1.0)
      };
    },
    []
  );

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    if (width === 0 || height === 0) return;

    // Generous responsive density so particles are plentiful and prominently visible
    const count =
      quantity !== undefined
        ? quantity
        : Math.max(50, Math.min(140, Math.floor((width * height) / 10000)));

    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push(createParticle(width, height));
    }
    particlesRef.current = newParticles;
  }, [quantity, createParticle]);

  // Handle Resize and Retina display sharpness
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      if (width === 0 || height === 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }

      initParticles();
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [initParticles]);

  // Interactive mouse & touch handlers (hover grab + click to add)
  useEffect(() => {
    if (!interactive) return;

    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          return;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      mouseRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickToAdd) return;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Add 4 bold particles radiating from click location
      for (let i = 0; i < 4; i++) {
        particlesRef.current.push(
          createParticle(container.clientWidth, container.clientHeight, clickX, clickY)
        );
      }

      // Limit max particles to preserve smooth performance
      if (particlesRef.current.length > 180) {
        particlesRef.current.splice(0, 4);
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    container.addEventListener("mouseleave", handlePointerLeave);
    container.addEventListener("touchend", handlePointerLeave);
    container.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      container.removeEventListener("touchend", handlePointerLeave);
      container.removeEventListener("click", handleClick);
    };
  }, [interactive, clickToAdd, createParticle]);

  // Main Render Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // 1. Update and draw floating movement
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries smoothly
        if (p.x < -15) p.x = width + 15;
        else if (p.x > width + 15) p.x = -15;

        if (p.y < -15) p.y = height + 15;
        else if (p.y > height + 15) p.y = -15;

        // Draw bold particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.particle.r}, ${colors.particle.g}, ${colors.particle.b}, ${p.alpha * colors.particle.alpha})`;
        ctx.fill();

        // 2. Connecting lines between particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * colors.line.maxOpacity;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${colors.line.r}, ${colors.line.g}, ${colors.line.b}, ${lineAlpha})`;
            ctx.lineWidth = 1.4; // Bold, crisp connecting line
            ctx.stroke();
          }
        }

        // 3. Hover-grab interaction (connect line to cursor / touch position)
        if (mouse.active && interactive) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.hypot(mdx, mdy);

          if (mdist < grabRadius) {
            const grabAlpha = (1 - mdist / grabRadius) * colors.grab.maxOpacity;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${colors.grab.r}, ${colors.grab.g}, ${colors.grab.b}, ${grabAlpha})`;
            ctx.lineWidth = 1.8; // Bold hover-grab line
            ctx.stroke();
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [colors, maxDistance, grabRadius, interactive]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        backgroundColor: colors.bg,
        transition: "background-color 0.4s ease",
        ...style,
      }}
      className={`absolute inset-0 w-full h-full pointer-events-auto overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
}

export default ParticlesBg;
