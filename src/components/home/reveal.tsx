"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Marks an element once it scrolls into view. The motion itself lives in CSS
 * (home-v2.css): content is only hidden when scripting is on and the reader
 * has not asked for reduced motion, so it is never lost without JavaScript
 * and server and client render identical markup.
 */
function useInViewOnce<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before the reveal starts. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
};

/** Fades and lifts its content once, as it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 18 }: RevealProps) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  const style = { "--hv2-delay": `${delay}s`, "--hv2-y": `${y}px` } as CSSProperties;

  return (
    <div
      ref={ref}
      className={className ? `hv2-reveal ${className}` : "hv2-reveal"}
      data-inview={inView || undefined}
      style={style}
    >
      {children}
    </div>
  );
}

/** A spine segment that draws downward the first time it scrolls into view. */
export function DrawnLine({ className }: { className?: string }) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();

  return (
    <span
      ref={ref}
      className={className}
      data-inview={inView || undefined}
      aria-hidden="true"
    />
  );
}
