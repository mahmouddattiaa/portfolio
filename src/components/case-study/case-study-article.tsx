import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import type { PresentationContent } from "./presentation";
import { CountUp } from "./count-up";
import {
  CustomerPhoneFrame,
  StaffScannerFrame,
  LedgerFrame,
} from "./illustrative-frames";
import { ArchitectureBand } from "./architecture-band";
import { ClosingBand } from "./closing-band";

interface CaseStudyArticleProps {
  study: CaseStudy;
  copy: PresentationContent;
}

export function CaseStudyArticle({ study, copy }: CaseStudyArticleProps) {
  return (
    <div className="cs-article">
      {/* 1. Hero */}
      <section
        id="section-hero"
        className="cs-section cs-hero"
        aria-labelledby="cs-hero-title"
      >
        <div>
          <p className="cs-hero-eyebrow">{copy.heroEyebrow}</p>
          <h1 id="cs-hero-title" className="cs-hero-headline">
            {copy.heroHeadline}
          </h1>
          <p className="cs-hero-lead">{copy.heroLead}</p>
        </div>
        <dl className="cs-hero-meta" aria-label="Project facts">
          {copy.heroMeta.map((entry) => (
            <div key={entry.label}>
              <dt>{entry.label}</dt>
              <dd>
                {entry.value}
                {entry.note ? (
                  <span className="cs-hero-meta-note"> · {entry.note}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 2. Numbers strip */}
      <section
        id="section-numbers"
        className="cs-section"
        aria-labelledby="cs-numbers-title"
      >
        <h2 id="cs-numbers-title" className="sr-only">
          Numbers at a glance
        </h2>
        <div className="cs-numbers">
          {copy.numbers.figures.map((figure) => (
            <div key={figure.caption} className="cs-number-cell">
              <span className="cs-number-value">
                <CountUp value={figure.value} />
                {figure.suffix ?? null}
              </span>
              <p className="cs-number-caption">{figure.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The situation */}
      <section
        id="section-situation"
        className="cs-section"
        aria-labelledby="cs-situation-title"
      >
        <div>
          <p className="cs-section-eyebrow">The situation</p>
          <h2 id="cs-situation-title" className="cs-section-heading">
            {copy.situationHeading}
          </h2>
        </div>
        <div className="cs-situation">
          <div className="cs-situation-panel cs-situation-panel--before">
            <h3 className="cs-situation-heading">
              {copy.situationBefore.heading}
            </h3>
            <ul className="cs-situation-list">
              {copy.situationBefore.paragraphs.map((paragraph) => (
                <li key={paragraph}>{paragraph}</li>
              ))}
            </ul>
          </div>
          <div className="cs-situation-panel cs-situation-panel--after">
            <h3 className="cs-situation-heading">
              {copy.situationAfter.heading}
            </h3>
            <ul className="cs-situation-list">
              {copy.situationAfter.paragraphs.map((paragraph) => (
                <li key={paragraph}>{paragraph}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. What we delivered */}
      <section
        id="section-delivery"
        className="cs-section"
        aria-labelledby="cs-delivery-title"
      >
        <div>
          <p className="cs-section-eyebrow">What we delivered</p>
          <h2 id="cs-delivery-title" className="cs-section-heading">
            {copy.deliveryHeading}
          </h2>
        </div>
        <div className="cs-delivery-grid">
          {copy.deliveryCards.map((card) => (
            <article key={card.title} className="cs-delivery-card">
              <span className="cs-delivery-number" aria-hidden="true">
                {card.number}
              </span>
              <h3 className="cs-delivery-title">{card.title}</h3>
              <p className="cs-delivery-body">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 5. The moment it happens */}
      <section
        id="section-moment"
        className="cs-section"
        aria-labelledby="cs-moment-title"
      >
        <div className="cs-moment-header">
          <p className="cs-section-eyebrow">The moment it happens</p>
          <h2 id="cs-moment-title" className="cs-section-heading">
            {copy.momentHeading}
          </h2>
          <p className="cs-moment-caption">{copy.momentCaption}</p>
        </div>
        <div className="cs-frames">
          <CustomerPhoneFrame sample={copy.momentSamples} />
          <StaffScannerFrame sample={copy.momentSamples} />
          <LedgerFrame sample={copy.momentSamples} />
        </div>
        <ol className="cs-mobile-steps" aria-label="Steps">
          {copy.momentSteps.map((step) => (
            <li key={step.number} className="cs-mobile-step">
              <span className="cs-mobile-step-number" aria-hidden="true">
                {step.number}
              </span>
              <h3 className="cs-mobile-step-title">{step.title}</h3>
              <p className="cs-mobile-step-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. Architecture band (full-width dark, breaks out of the article column) */}
      <ArchitectureBand
        heading={copy.architectureHeading}
        line={copy.architectureLine}
      />

      {/* 7. Pull quote */}
      <section
        id="section-quote"
        className="cs-section"
        aria-labelledby="cs-quote-title"
      >
        <h2 id="cs-quote-title" className="sr-only">
          Founder reflection
        </h2>
        <figure className="cs-quote">
          <blockquote className="cs-quote-body">
            &ldquo;{copy.pullQuote.body}&rdquo;
          </blockquote>
          <figcaption className="cs-quote-attr">
            — {copy.pullQuote.attribution}
          </figcaption>
        </figure>
      </section>

      {/* 8. Decisions that matter later */}
      <section
        id="section-decisions"
        className="cs-section"
        aria-labelledby="cs-decisions-title"
      >
        <div>
          <p className="cs-section-eyebrow">Decisions that matter later</p>
          <h2 id="cs-decisions-title" className="cs-section-heading">
            {copy.decisionsHeading}
          </h2>
        </div>
        <div className="cs-decisions">
          {copy.decisionsRows.map((row) => (
            <article key={row.heading} className="cs-decision-row">
              <div>
                <h3 className="cs-decision-heading">{row.heading}</h3>
                <p className="cs-decision-paragraph">{row.paragraph}</p>
              </div>
              <aside className="cs-decision-how" aria-label={row.howLabel}>
                <span className="cs-decision-how-label">{row.howLabel}</span>
                <p className="cs-decision-how-body">{row.how}</p>
              </aside>
            </article>
          ))}
        </div>
      </section>

      {/* 9. How it was built / Where it stands — no heading per spec; two cards only */}
      <section
        id="section-built"
        className="cs-section"
        aria-label="How it was built and where it stands"
      >
        <div className="cs-built-grid">
          {copy.builtCards.map((card) => (
            <article key={card.heading} className="cs-built-card">
              <h3 className="cs-built-card-heading">{card.heading}</h3>
              <p className="cs-built-card-body">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 10. Closing band (full-width dark, breaks out of the article column) */}
      <ClosingBand
        heading={copy.closing.headline}
        lead={copy.closing.lead}
        buttonLabel={copy.closing.buttonLabel}
        buttonHref={copy.closing.buttonHref}
      />

      {/* 11. Footer line */}
      <footer
        className="cs-footer-line"
        aria-label="Verification and return"
      >
        <span>
          {copy.footerLine.verificationDate} ·{" "}
          {copy.footerLine.confidentiality}
        </span>
        <Link href={copy.footerLine.backHref}>
          {copy.footerLine.backLabel} <span aria-hidden="true">→</span>
        </Link>
        <span className="sr-only">
          Published case study: {study.publicTitle || study.title}
        </span>
      </footer>
    </div>
  );
}
