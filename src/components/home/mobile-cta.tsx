"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Phone-only "Start a conversation" bar. It appears once the hero has
 * scrolled away and steps aside while the closing call is on screen, so it
 * never duplicates a visible call to action. Hidden above 767px in CSS.
 */
export function MobileCta({
  heroId,
  closingId,
}: {
  heroId: string;
  closingId: string;
}) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [closingVisible, setClosingVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const closing = document.getElementById(closingId);
    if (!hero || !closing) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting);
        if (entry.target === closing) setClosingVisible(entry.isIntersecting);
      }
    });
    observer.observe(hero);
    observer.observe(closing);
    return () => observer.disconnect();
  }, [heroId, closingId]);

  const shown = !heroVisible && !closingVisible;

  return (
    <div className="hv2-mobile-cta" data-shown={shown || undefined} aria-hidden={!shown}>
      <Link href="/contact" tabIndex={shown ? undefined : -1}>
        Start a conversation <ArrowUpRight aria-hidden="true" />
      </Link>
    </div>
  );
}
