"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

// ============ Color Utilities ============
function parseColor(c: string | number | undefined, fallback: number): number {
  if (typeof c === "number") return c;
  if (typeof c === "string") {
    const v = parseInt(c.replace("#", ""), 16);
    return Number.isFinite(v) ? v : fallback;
  }
  return fallback;
}

const TAU = Math.PI * 2;
const isSafeCount = (n: number, max: number) => Number.isSafeInteger(n) && n >= 0 && n <= max;

function createRNG(seed: number) {
  let s = seed;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export interface SchoolingFishProps {
  className?: string;
  style?: React.CSSProperties;
  countMultiplier?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  cohesion?: number;
  separation?: number;
  alignment?: number;
  turning?: number;
  tailAmplitude?: number;
  pointerStrength?: number;
  glow?: number;
  fishColor?: string;
}

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  size: number;
}

const DEFAULT_SETTINGS = {
  countMultiplier: 1.6,
  minSize: 14,
  maxSize: 24,
  speed: 2.4,
  cohesion: 0.75,
  separation: 0.04,
  alignment: 1.95,
  turning: 1.8,
  tailAmplitude: 0.55,
  pointerStrength: 1.3,
  glow: 1.05,
  color: 10279679, // #9CDAFF
};

const NEIGHBOR_RADIUS = 0.18;

function computeBoidForce(
  self: Fish,
  allFish: Fish[],
  pointer: { x: number; y: number; active: boolean },
  s: typeof DEFAULT_SETTINGS
) {
  let sepX = 0;
  let sepY = 0;
  let cohX = 0;
  let cohY = 0;
  let alignVx = 0;
  let alignVy = 0;
  let count = 0;

  for (const other of allFish) {
    if (other === self) continue;
    const dx = other.x - self.x;
    const dy = other.y - self.y;
    const dist = Math.hypot(dx, dy);
    if (dist > NEIGHBOR_RADIUS || dist < 1e-8) continue;
    cohX += dx;
    cohY += dy;
    alignVx += other.vx - self.vx;
    alignVy += other.vy - self.vy;
    count++;

    if (dist < s.separation) {
      const force = (1 - dist / s.separation) * 0.65;
      sepX -= (dx / dist) * force;
      sepY -= (dy / dist) * force;
    }
  }

  let fx = 0;
  let fy = 0;
  if (count > 0) {
    fx += (cohX / count) * s.cohesion * 1.8 + (alignVx / count) * s.alignment * 1.2;
    fy += (cohY / count) * s.cohesion * 1.8 + (alignVy / count) * s.alignment * 1.2;
  }
  fx += sepX;
  fy += sepY;

  // Pointer avoidance (cursor repulsion)
  if (pointer.active) {
    const dx = self.x - pointer.x;
    const dy = self.y - pointer.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 0.22) {
      const force = (1 - dist / 0.22) * s.pointerStrength * 1.8;
      fx += (dist ? dx / dist : 1) * force;
      fy += (dist ? dy / dist : 0) * force;
    }
  }

  return { x: fx, y: fy };
}

function createFish(count: number, rng: () => number): Fish[] {
  return Array.from({ length: count }, () => {
    const angle = rng() * TAU;
    const r = Math.sqrt(rng());
    const speedAngle = -0.3 + rng() * 0.6;
    return {
      x: 0.5 + Math.cos(angle) * r * 0.3,
      y: 0.5 + Math.sin(angle) * r * 0.25,
      vx: Math.cos(speedAngle) * 0.12,
      vy: Math.sin(speedAngle) * 0.12,
      phase: rng() * TAU,
      size: rng(),
    };
  });
}

export function SchoolingFish(props: SchoolingFishProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fishRef = useRef<Fish[]>([]);
  const timeRef = useRef(0);
  const viewportKeyRef = useRef("");
  const visibleRef = useRef(true);

  const settings = useMemo(
    () => ({
      countMultiplier: props.countMultiplier ?? DEFAULT_SETTINGS.countMultiplier,
      minSize: props.minSize ?? DEFAULT_SETTINGS.minSize,
      maxSize: props.maxSize ?? DEFAULT_SETTINGS.maxSize,
      speed: props.speed ?? DEFAULT_SETTINGS.speed,
      cohesion: props.cohesion ?? DEFAULT_SETTINGS.cohesion,
      separation: props.separation ?? DEFAULT_SETTINGS.separation,
      alignment: props.alignment ?? DEFAULT_SETTINGS.alignment,
      turning: props.turning ?? DEFAULT_SETTINGS.turning,
      tailAmplitude: props.tailAmplitude ?? DEFAULT_SETTINGS.tailAmplitude,
      pointerStrength: props.pointerStrength ?? DEFAULT_SETTINGS.pointerStrength,
      glow: props.glow ?? DEFAULT_SETTINGS.glow,
      color: parseColor(props.fishColor, DEFAULT_SETTINGS.color),
    }),
    [
      props.countMultiplier,
      props.minSize,
      props.maxSize,
      props.speed,
      props.cohesion,
      props.separation,
      props.alignment,
      props.turning,
      props.tailAmplitude,
      props.pointerStrength,
      props.glow,
      props.fishColor,
    ]
  );

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const baseCount = isMobile ? 55 : 180;
  const fishCount = Math.round(baseCount * settings.countMultiplier);
  const validCount = isSafeCount(fishCount, 2000);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let lastTime = performance.now();
    let viewport = { width: 1, height: 1, dpr: 1 };
    const pointer = { x: 0, y: 0, active: false };
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      viewport = { width: rect.width, height: rect.height, dpr };
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pointer.x = x;
        pointer.y = y;
        pointer.active = true;
      } else {
        pointer.active = false;
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) pointer.active = false;
    };

    const tick = (time: number) => {
      const delta = Math.min(50, time - lastTime);
      lastTime = time;

      if (visibleRef.current && !document.hidden && validCount) {
        const { width, height } = viewport;
        ctx.clearRect(0, 0, width, height);

        const minDim = Math.min(width, height);
        const wN = width / minDim;
        const hN = height / minDim;
        const viewportKey = `${width}:${height}`;

        if (fishRef.current.length !== fishCount || viewportKeyRef.current !== viewportKey) {
          const rng = createRNG(6917);
          fishRef.current = createFish(fishCount, rng);
          viewportKeyRef.current = viewportKey;
        }

        const dt = (delta / 1000) * settings.speed * (motionQuery.matches ? 0.12 : 1);
        timeRef.current += dt;
        const t = timeRef.current;

        // Spatial grid acceleration for neighbor queries
        const cellSize = NEIGHBOR_RADIUS;
        const grid = new Map<string, Fish[]>();
        for (const f of fishRef.current) {
          const gx = Math.floor(f.x / cellSize);
          const gy = Math.floor(f.y / cellSize);
          const key = `${gx},${gy}`;
          const bucket = grid.get(key) || [];
          bucket.push(f);
          grid.set(key, bucket);
        }

        const neighborBuckets: Fish[][] = new Array(fishRef.current.length);
        for (let i = 0; i < fishRef.current.length; i++) {
          const f = fishRef.current[i];
          const gx = Math.floor(f.x / cellSize);
          const gy = Math.floor(f.y / cellSize);
          const neighbors: Fish[] = [];
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const bucket = grid.get(`${gx + dx},${gy + dy}`);
              if (bucket) neighbors.push(...bucket);
            }
          }
          neighborBuckets[i] = neighbors;
        }

        // Compute Boid forces
        const forces = fishRef.current.map((f, i) => {
          const boid = computeBoidForce(
            f,
            neighborBuckets[i],
            {
              x: pointer.x / minDim,
              y: pointer.y / minDim,
              active: pointer.active && !motionQuery.matches,
            },
            settings
          );

          // Center attraction & organic meandering
          const centerX = wN * (0.5 + 0.22 * Math.sin(t * 0.14));
          const centerY = hN * (0.5 + 0.17 * Math.cos(t * 0.19));
          boid.x += (centerX - f.x) * 0.08 * settings.cohesion;
          boid.y += (centerY - f.y) * 0.08 * settings.cohesion;
          boid.x += Math.cos(t * 0.7 + f.phase) * 0.018;
          boid.y += Math.sin(t * 0.7 + f.phase) * 0.018;

          // Soft boundary repulsions
          if (f.x < 0.1) boid.x += (0.1 - f.x) * 2;
          if (f.x > wN - 0.1) boid.x -= (f.x - wN + 0.1) * 2;
          if (f.y < 0.1) boid.y += (0.1 - f.y) * 2;
          if (f.y > hN - 0.1) boid.y -= (f.y - hN + 0.1) * 2;

          return boid;
        });

        // Update & render fish
        const colorHex = `#${settings.color.toString(16).padStart(6, "0")}`;
        for (let i = 0; i < fishRef.current.length; i++) {
          const f = fishRef.current[i];
          const force = forces[i];

          const forceMag = Math.hypot(force.x, force.y);
          const turnScale = forceMag > 0.65 ? 0.65 / forceMag : 1;
          f.vx += force.x * turnScale * dt * settings.turning;
          f.vy += force.y * turnScale * dt * settings.turning;

          const vMag = Math.hypot(f.vx, f.vy);
          const targetSpeed = 0.1 + f.size * 0.045;
          if (vMag > 0) {
            f.vx = (f.vx / vMag) * targetSpeed;
            f.vy = (f.vy / vMag) * targetSpeed;
          }

          f.x += f.vx * dt;
          f.y += f.vy * dt;

          const sizePx = settings.minSize + (settings.maxSize - settings.minSize) * f.size;
          if (!Number.isFinite(f.x) || !Number.isFinite(f.y) || !Number.isFinite(sizePx) || sizePx > 10000) {
            continue;
          }

          const tailSwing = Math.sin(t * 9 + f.phase) * sizePx * 0.12 * settings.tailAmplitude;
          ctx.save();
          ctx.translate(f.x * minDim, f.y * minDim);
          ctx.rotate(Math.atan2(f.vy, f.vx));
          ctx.fillStyle = colorHex;
          ctx.strokeStyle = colorHex;
          ctx.globalAlpha = 0.55 + f.size * 0.4;

          // Fish Body
          ctx.beginPath();
          ctx.moveTo(sizePx * 0.45, 0);
          ctx.bezierCurveTo(
            sizePx * 0.12,
            -sizePx * 0.13,
            -sizePx * 0.2,
            -sizePx * 0.09,
            -sizePx * 0.35,
            tailSwing * 0.45
          );
          ctx.bezierCurveTo(
            -sizePx * 0.15,
            sizePx * 0.09,
            sizePx * 0.13,
            sizePx * 0.13,
            sizePx * 0.45,
            0
          );
          ctx.fill();

          // Tail Fin
          ctx.lineWidth = Math.max(0.5, sizePx * 0.025);
          ctx.beginPath();
          ctx.moveTo(-sizePx * 0.25, tailSwing * 0.3);
          ctx.lineTo(-sizePx * 0.56, tailSwing - sizePx * 0.12);
          ctx.lineTo(-sizePx * 0.47, tailSwing);
          ctx.lineTo(-sizePx * 0.56, tailSwing + sizePx * 0.12);
          ctx.lineTo(-sizePx * 0.25, tailSwing * 0.3);
          ctx.stroke();

          // Soft Luminous Glow
          if (settings.glow > 0) {
            ctx.globalAlpha = Math.min(0.28, settings.glow * 0.15);
            ctx.lineWidth = sizePx * 0.16;
            ctx.beginPath();
            ctx.moveTo(sizePx * 0.25, 0);
            ctx.lineTo(-sizePx * 0.2, tailSwing * 0.25);
            ctx.stroke();
          }

          // Eye
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = "#f0faff";
          ctx.beginPath();
          ctx.arc(sizePx * 0.28, -sizePx * 0.025, Math.max(0.45, sizePx * 0.025), 0, TAU);
          ctx.fill();

          ctx.restore();
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      lastTime = performance.now();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
        lastTime = performance.now();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [settings, fishCount, validCount]);

  return (
    <div
      className={cn("w-full h-full pointer-events-none select-none", props.className)}
      style={props.style}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
}

export default SchoolingFish;
