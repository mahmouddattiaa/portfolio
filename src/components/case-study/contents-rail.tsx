"use client";

import { useEffect, useState } from "react";

export interface RailSection {
  id: string;
  label: string;
}

export function ContentsRail({
  sections,
  verification,
}: {
  sections: RailSection[];
  verification: string;
}) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="cs-rail" aria-label="On this page">
      <div className="cs-rail-inner">
        <p className="cs-rail-title">On this page</p>
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ol>
        <p className="cs-rail-meta">{verification}</p>
      </div>
    </nav>
  );
}
