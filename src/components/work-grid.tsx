"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  classificationLabels,
  publicCaseStudies,
  type Classification,
} from "@/lib/content";

const filters: Array<"all" | Classification> = [
  "all",
  "client",
  "employer",
  "internal",
  "owned-product",
  "university",
  "concept",
];

export function WorkGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const studies = useMemo(
    () =>
      publicCaseStudies.filter(
        (study) => filter === "all" || study.classification === filter,
      ),
    [filter],
  );
  if (!publicCaseStudies.length)
    return (
      <section className="atelier-empty-state" aria-labelledby="no-work-title">
        <p className="atelier-kicker">Work</p>
        <h2 id="no-work-title">No public work yet.</h2>
        <p>
          Detailed studies are still behind their evidence and permission
          checks. Request a project review if you need a relevant private
          capabilities discussion.
        </p>
        <Link className="atelier-secondary-action" href="/contact">
          Request a project review
        </Link>
      </section>
    );
  return (
    <>
      <div
        className="atelier-filters"
        role="group"
        aria-label="Filter work by classification"
      >
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "selected" : ""}
            onClick={() => setFilter(item)}
            type="button"
          >
            {item === "all" ? "All work" : classificationLabels[item]}
          </button>
        ))}
      </div>
      <p className="atelier-results" aria-live="polite">
        {studies.length} {studies.length === 1 ? "study" : "studies"} shown
      </p>
      {studies.length ? (
        <div className="atelier-work-grid">
          {studies.map((study) => (
            <article key={study.slug} className="atelier-work-card">
              <p className="atelier-kicker">
                {classificationLabels[study.classification]} ·{" "}
                {study.productionStatus}
              </p>
              <h3>{study.publicTitle || study.title}</h3>
              <p>{study.problem}</p>
              <p className="atelier-work-card-meta">
                <strong>Role:</strong> {study.mahmoudRole}
              </p>
              <p className="atelier-work-card-meta">
                <strong>Evidence:</strong>{" "}
                {study.results.every(
                  (result) => result.proofState === "verified-public",
                )
                  ? "Verified public evidence"
                  : "Verified privately"}
              </p>
              <Link href={`/work/${study.slug}`}>
                Read the case study <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <section className="atelier-empty-state">
          <h2>No published studies match that filter.</h2>
          <p>
            Try another classification, or request a private capabilities
            review.
          </p>
        </section>
      )}
    </>
  );
}
