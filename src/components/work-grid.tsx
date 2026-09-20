"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useId, useMemo, useState } from "react";
import {
  classificationLabels,
  publicCaseStudies,
  type CaseStudy,
  type Classification,
} from "@/lib/content";
import { getWorkCopy } from "@/content/work";

const ALL = "all" as const;
type FilterValue = typeof ALL | Classification;

const productionStatusLabel: Record<CaseStudy["productionStatus"], string> = {
  production: "In production",
  pilot: "Pilot",
  prototype: "Prototype",
  "in-development": "In development",
  concept: "Concept",
};

function formatLongDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  const monthName = date.toLocaleString("en-GB", {
    month: "long",
    timeZone: "UTC",
  });
  return `${day.replace(/^0/, "")} ${monthName} ${year}`;
}

function summarizeStudy(study: CaseStudy): string {
  const first = study.problem.split(/(?<=\.)\s+/)[0] ?? study.problem;
  return first.replace(/\.$/, "");
}

function summariseSurfaces(study: CaseStudy): string {
  return study.scope
    .map((item) => item.split(/\s+with\s+/i)[0].trim())
    .slice(0, 4)
    .join(" · ");
}

function roleWithNameRemoved(role: string): string {
  return role.replace(/\bMahmoud\s+(?:Mohamed\s+)?Attia\b/g, "the studio").trim();
}

export function WorkGrid() {
  const copy = getWorkCopy("en");
  const baseId = useId().replace(/:/g, "");

  const availableClassifications = useMemo(() => {
    const seen = new Set<Classification>();
    for (const study of publicCaseStudies) seen.add(study.classification);
    return Array.from(seen);
  }, []);

  const filters: FilterValue[] = useMemo(
    () => [ALL, ...availableClassifications],
    [availableClassifications],
  );

  const [filter, setFilter] = useState<FilterValue>(ALL);

  const visible = useMemo(
    () =>
      filter === ALL
        ? publicCaseStudies
        : publicCaseStudies.filter((study) => study.classification === filter),
    [filter],
  );

  const countWord = visible.length === 1 ? copy.studies.countSuffixSingular : copy.studies.countSuffixPlural;

  if (!publicCaseStudies.length) {
    return (
      <div className="wv2-empty" aria-live="polite">
        <p className="wv2-eyebrow">{copy.howToRead.eyebrow}</p>
        <h2>{copy.studies.empty.title}</h2>
        <p>{copy.studies.empty.body}</p>
      </div>
    );
  }

  const [lead, ...rest] = visible;

  return (
    <div className="wv2-studies">
      <div className="wv2-studies-head">
        <div
          className="wv2-filters"
          role="group"
          aria-label={copy.studies.filterLabel}
        >
          {filters.map((value) => {
            const selected = filter === value;
            const label = value === ALL ? copy.studies.allLabel : classificationLabels[value];
            return (
              <button
                key={value}
                type="button"
                className="wv2-pill"
                data-selected={selected || undefined}
                aria-pressed={selected}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p className="wv2-count" aria-live="polite" aria-atomic="true">
          <span>
            {visible.length} {countWord} {copy.studies.countPrefix}
          </span>
          <span className="wv2-count-tail">
            {copy.studies.countSeparator}
            {copy.studies.moreInPreparation}
            {copy.studies.countSeparator}
            {copy.studies.privateOnRequest}
          </span>
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="wv2-empty" aria-live="polite">
          <h2>{copy.studies.empty.title}</h2>
          <p>{copy.studies.empty.body}</p>
        </div>
      ) : (
        <>
          {lead && <LeadCard study={lead} baseId={baseId} copy={copy} />}

          {rest.length > 0 ? (
            <ul className="wv2-grid" aria-label={copy.studies.gridLabel}>
              {rest.map((study) => (
                <li key={study.slug}>
                  <CompactCard study={study} />
                </li>
              ))}
            </ul>
          ) : null}

          <ul className="wv2-placeholders" aria-hidden="true">
            {copy.studies.placeholders.map((placeholder, index) => (
              <li key={index} className="wv2-placeholder">
                <p className="wv2-placeholder-label">{placeholder.label}</p>
                <p className="wv2-placeholder-title">{placeholder.title}</p>
                <p className="wv2-placeholder-body">{placeholder.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function LeadCard({
  study,
  baseId,
  copy,
}: {
  study: CaseStudy;
  baseId: string;
  copy: ReturnType<typeof getWorkCopy>;
}) {
  const allPublic = study.results.every((r) => r.proofState === "verified-public");
  const proof = allPublic
    ? { text: copy.studies.lead.verifiedPublic, isPublic: true }
    : { text: copy.studies.lead.verifiedPrivate, isPublic: false };
  const date = formatLongDate(study.lastVerified);
  const role = roleWithNameRemoved(study.mahmoudRole);

  return (
    <article className="wv2-lead" aria-labelledby={`${baseId}-${study.slug}-title`}>
      <div className="wv2-lead-left">
        <div className="wv2-chips">
          <span className="wv2-chip wv2-chip-classification">
            {classificationLabels[study.classification]}
          </span>
          <span className="wv2-chip wv2-chip-status">
            {productionStatusLabel[study.productionStatus]}
          </span>
        </div>
        <h3 id={`${baseId}-${study.slug}-title`} className="wv2-lead-title">
          {study.publicTitle || study.title}
        </h3>
        <p className="wv2-lead-problem">{study.problem}</p>
        {study.technologies.length > 0 ? (
          <ul className="wv2-tags" aria-label={copy.meta.builtWith}>
            {study.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        ) : null}
        <Link className="wv2-read wv2-read-copper" href={`/work/${study.slug}`}>
          {copy.studies.card.read} <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>

      <dl className="wv2-lead-right" aria-label={study.publicTitle || study.title}>
        <div className="wv2-fact">
          <dt>{copy.studies.lead.ourRole}</dt>
          <dd>{role}</dd>
        </div>
        <div className="wv2-fact">
          <dt>{copy.studies.lead.context}</dt>
          <dd>
            {study.engagementContext}
            {study.clientNamePermission === "anonymize" ? (
              <span className="wv2-fact-note">
                {" "}
                {copy.studies.lead.contextAnonymized}
              </span>
            ) : null}
          </dd>
        </div>
        <div className="wv2-fact">
          <dt>{copy.studies.lead.evidence}</dt>
          <dd>
            <span data-state={proof.isPublic ? "public" : "private"}>{proof.text}</span>
            <span className="wv2-fact-note">
              {copy.studies.lead.lastCheckedPrefix} {date}
            </span>
          </dd>
        </div>
        <div className="wv2-fact">
          <dt>{copy.studies.lead.surfaces}</dt>
          <dd>{summariseSurfaces(study)}</dd>
        </div>
      </dl>
    </article>
  );
}

function CompactCard({ study }: { study: CaseStudy }) {
  const copy = getWorkCopy("en");

  return (
    <article className="wv2-card" aria-labelledby={`wv2-card-${study.slug}-title`}>
      <div className="wv2-chips">
        <span className="wv2-chip wv2-chip-classification">
          {classificationLabels[study.classification]}
        </span>
        <span className="wv2-chip wv2-chip-status">
          {productionStatusLabel[study.productionStatus]}
        </span>
      </div>
      <h3 id={`wv2-card-${study.slug}-title`} className="wv2-card-title">
        {study.publicTitle || study.title}
      </h3>
      <p className="wv2-card-summary">{summarizeStudy(study)}</p>
      <Link className="wv2-read wv2-read-copper" href={`/work/${study.slug}`}>
        {copy.studies.card.read} <ArrowUpRight aria-hidden="true" />
      </Link>
    </article>
  );
}
