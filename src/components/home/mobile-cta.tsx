"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Phone-only "Start a conversation" bar. It appears once the hero has
 * scrolled away and steps aside while the closing call or the footer is on
 * screen, so it never duplicates a visible call to action or covers the
 * footer links. Hidden above 767px in CSS.
 */
export function MobileCta({
  heroId,
  closingId,
  footerId,
  label,
}: {
  heroId: string;
  closingId: string;
  footerId: string;
  label: string;
}) {
  // Starts hidden: the hero is on screen at load.
  const [blockers, setBlockers] = useState<ReadonlySet<string>>(() => new Set([heroId]));

  useEffect(() => {
    const targets = [heroId, closingId, footerId]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver((entries) => {
      setBlockers((current) => {
        const next = new Set(current);
        for (const entry of entries) {
          if (entry.isIntersecting) next.add(entry.target.id);
          else next.delete(entry.target.id);
        }
        return next;
      });
    });
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [heroId, closingId, footerId]);

  const shown = blockers.size === 0;

  return (
    <div className="hv2-mobile-cta" data-shown={shown || undefined} aria-hidden={!shown}>
      <Link href="/contact" tabIndex={shown ? undefined : -1}>
        {label} <ArrowUpRight aria-hidden="true" />
      </Link>
    </div>
  );
}
