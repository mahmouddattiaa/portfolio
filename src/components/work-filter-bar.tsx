"use client";

import type { KeyboardEvent } from "react";
import Link from "next/link";
type WorkFilterValue = "all" | "web" | "mobile" | "ai" | "rnd";
const categoryLabels: Record<Exclude<WorkFilterValue, "all">, string> = {
  web: "Web & Dashboards",
  mobile: "Mobile & POS Apps",
  ai: "AI & Automation",
  rnd: "Studio R&D",
};
const filters: WorkFilterValue[] = ["all", "web", "mobile", "ai", "rnd"];

export function WorkFilterBar({ filter, counts }: { filter: WorkFilterValue; counts: Record<WorkFilterValue, number> }) {
  function moveFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("a[role='tab']"));
    const current = tabs.indexOf(document.activeElement as HTMLAnchorElement);
    if (current < 0) return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(current + step + tabs.length) % tabs.length];
    next?.focus();
    next?.click();
  }

  return (
    <div className="wv2-filters" role="tablist" aria-label="Filter studio work by category" onKeyDown={moveFocus}>
      {filters.map((value) => {
        const selected = filter === value;
        const label = value === "all" ? "All Work" : categoryLabels[value];
        return <Link key={value} id={`work-filter-${value}`} className="wv2-pill" href={`/work?category=${value}`} scroll={false} role="tab" aria-selected={selected} aria-controls="work-results" tabIndex={selected ? 0 : -1} data-selected={selected || undefined}>{label} <span className="wv2-filter-count">{counts[value]}</span></Link>;
      })}
    </div>
  );
}
