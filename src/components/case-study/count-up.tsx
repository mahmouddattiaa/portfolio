"use client";

import { useEffect, useRef, useState } from "react";

export interface CountUpProps {
  value: number;
  durationMs?: number;
  className?: string;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotionNow(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

export function CountUp({ value, durationMs = 1400, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>("0");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotionNow()) {
      Promise.resolve().then(() => setDisplay(formatNumber(value)));
      return;
    }

    let rafId = 0;
    let cancelled = false;

    const animate = () => {
      if (cancelled) return;
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / durationMs);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(value * eased);
        setDisplay(formatNumber(current));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDisplay(formatNumber(value));
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const rect = node.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      animate();
      return () => {
        cancelled = true;
        cancelAnimationFrame(rafId);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || cancelled) return;
          animate();
          observer.disconnect();
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
