import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/content";
import type { PresentationContent } from "./presentation";
import { CaseStudyArticle } from "./case-study-article";
import {
  breadcrumbLabels,
  deeperStudyCards,
  surfaceStatusRows,
} from "./glitre-content";

const LOOP_STEPS = [
  {
    number: "01",
    title: "Customer shows a code",
    body: "The customer app issues a single-use signed QR. The worker scans it.",
  },
  {
    number: "02",
    title: "Worker records the purchase",
    body: "An Idempotency-Key rides along. A bad connection never double-counts.",
  },
  {
    number: "03",
    title: "Ledger records a verified earn",
    body: "The backend appends a ledger entry; the points rule engine computes the reward.",
  },
  {
    number: "04",
    title: "Customer redeems a reward",
    body: "A voucher is reserved and revealed.",
  },
  {
    number: "05",
    title: "Worker consumes the voucher",
    body: "Points are debited atomically.",
  },
  {
    number: "06",
    title: "Head office sees the repeat visit",
    body: "Every verified purchase lands in the dashboard; the original record is never edited.",
  },
];

export function GlitreArticle({
  study,
  copy,
}: {
  study: CaseStudy;
  copy: PresentationContent;
}) {
  return (
    <div className="glitre-article">
      <nav className="glitre-breadcrumb" aria-label="Breadcrumb">
        <Link href="/work">{breadcrumbLabels.work}</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{breadcrumbLabels.overview}</span>
      </nav>

      <CaseStudyArticle study={study} copy={copy} />

      <section
        id="section-loop"
        className="cs-section"
        aria-labelledby="section-loop-title"
      >
        <p className="cs-section-eyebrow">The end-to-end loyalty loop</p>
        <h2 id="section-loop-title" className="cs-section-heading">
          Three hand-offs, two idempotency boundaries, one ledger.
        </h2>
        <ol className="glitre-loop-frames" aria-label="Loyalty loop steps">
          {LOOP_STEPS.map((step) => (
            <li key={step.number} className="glitre-loop-step">
              <span className="glitre-loop-step-number">Step {step.number}</span>
              <h3 className="glitre-loop-step-title">{step.title}</h3>
              <p className="glitre-loop-step-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="section-surface-status"
        className="cs-section"
        aria-labelledby="section-surface-status-title"
      >
        <p className="cs-section-eyebrow">Production vs. planned</p>
        <h2 id="section-surface-status-title" className="cs-section-heading">
          What is live today, and what is named as the next phase.
        </h2>
        <ul className="glitre-surface-table" aria-label="Surface status">
          {surfaceStatusRows.map((row) => (
            <li key={row.surface} className="glitre-surface-row">
              <span className="glitre-surface-name">{row.surface}</span>
              <span className="glitre-surface-detail">
                <span className="glitre-surface-detail-today">
                  <strong>Today.</strong> {row.status}
                </span>{" "}
                <span className="glitre-surface-detail-next">
                  <strong>Next.</strong> {row.next}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="section-deeper"
        className="cs-section"
        aria-labelledby="section-deeper-title"
      >
        <p className="cs-section-eyebrow">Deeper studies</p>
        <h2 id="section-deeper-title" className="cs-section-heading">
          One product at a time.
        </h2>
        <ul className="glitre-deeper">
          {deeperStudyCards.map((card) => (
            <li key={card.key}>
              <article className="glitre-deeper-card">
                <p className="glitre-deeper-product">{card.product}</p>
                <p className="glitre-deeper-scope">{card.scope}</p>
                <p className="glitre-deeper-evidence">
                  <strong>What you will see.</strong> {card.evidence}
                </p>
                <p className="glitre-deeper-not-shown">
                  <strong>What is not shown.</strong> {card.notShown}
                </p>
                <Link className="glitre-deeper-link" href={card.href}>
                  Read the {card.product.toLowerCase()} study <ArrowUpRight aria-hidden="true" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
