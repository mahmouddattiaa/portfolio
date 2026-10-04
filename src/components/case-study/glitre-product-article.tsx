import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import {
  breadcrumbLabels,
  deeperStudyCardFor,
  glitreVerifiedLabel,
  neighbourStudiesFor,
  productStatusLine,
  type DeeperStudyKey,
} from "./glitre-content";
import type { RailSection } from "./contents-rail";

export interface GlitreProductSection {
  id: string;
  eyebrow?: string;
  heading: string;
  body?: ReactNode;
}

export interface GlitreProductVisualSlot {
  src?: string;
  alt: string;
  caption: string;
  provenance: string;
  /** Rendered only when src is provided; otherwise the inventory fallback renders. */
  inventoryFallback: ReactNode;
}

export interface GlitreProduct {
  key: DeeperStudyKey;
  railSections: RailSection[];
  heroEyebrow: string;
  heroHeadline: string;
  heroStatus: string;
  heroEvidence: string;
  sections: GlitreProductSection[];
  visualSlots: GlitreProductVisualSlot[];
  controlledVocabulary: string[];
  /** Optional override for the "What this page cannot show" heading; defaults to the deeper-study card's `notShown`. */
  controlledVocabularyHeading?: string;
}

export function GlitreProductArticle({ product }: { product: GlitreProduct }) {
  const card = deeperStudyCardFor(product.key);
  const neighbours = neighbourStudiesFor(product.key);
  return (
    <div className="cs-article glitre-product-article">
      <nav className="glitre-breadcrumb" aria-label="Breadcrumb">
        <Link href="/work">{breadcrumbLabels.work}</Link>
        <span aria-hidden="true">›</span>
        <Link href="/work/glitre-loyalty-platform">{breadcrumbLabels.overview}</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">
          {product.key === "manager"
            ? breadcrumbLabels.manager
            : product.key === "customer-app"
              ? breadcrumbLabels.customerApp
              : breadcrumbLabels.workerApp}
        </span>
      </nav>

      <header className="glitre-hero" aria-labelledby={`glitre-${product.key}-title`}>
        <p className="cs-hero-eyebrow">{product.heroEyebrow}</p>
        <h1 id={`glitre-${product.key}-title`} className="cs-hero-headline">
          {product.heroHeadline}
        </h1>
        <p className="cs-hero-lead">{product.heroStatus}</p>
        <p className="glitre-hero-evidence">
          <strong>Evidence.</strong> {product.heroEvidence}
        </p>
      </header>

      {product.sections.map((section) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="cs-section">
          {section.eyebrow ? <p className="cs-section-eyebrow">{section.eyebrow}</p> : null}
          <h2 id={`${section.id}-title`} className="cs-section-heading">
            {section.heading}
          </h2>
          {section.body}
        </section>
      ))}

      <section id="glitre-visual-proof" aria-labelledby="glitre-visual-proof-title" className="cs-section">
        <p className="cs-section-eyebrow">Real visual proof</p>
        <h2 id="glitre-visual-proof-title" className="cs-section-heading">
          What the page can show today.
        </h2>
        {product.visualSlots.length === 0 ? (
          <p className="glitre-empty">
            Screen gallery will be added in the next review phase.
          </p>
        ) : (
          <ul className="glitre-gallery">
            {product.visualSlots.map((slot, index) => (
              <li key={index}>
                {slot.src ? (
                  <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slot.src} alt={slot.alt} loading="lazy" />
                    <figcaption>
                      <span className="glitre-gallery-caption">{slot.caption}</span>
                      <span className="glitre-gallery-provenance">{slot.provenance}</span>
                    </figcaption>
                  </figure>
                ) : (
                  slot.inventoryFallback
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="glitre-not-shown" aria-labelledby="glitre-not-shown-title" className="cs-section">
        <p className="cs-section-eyebrow">What this page cannot show</p>
        <h2 id="glitre-not-shown-title" className="cs-section-heading">
          {product.controlledVocabularyHeading ?? card.notShown}
        </h2>
        <ul className="glitre-controlled">
          {product.controlledVocabulary.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section id="glitre-neighbour" aria-labelledby="glitre-neighbour-title" className="cs-section">
        <p className="cs-section-eyebrow">Other product studies</p>
        <h2 id="glitre-neighbour-title" className="cs-section-heading">
          Move between the three products.
        </h2>
        <ul className="glitre-deeper">
          {neighbours.map((neighbour) => (
            <li key={neighbour.key}>
              <article className="glitre-deeper-card">
                <p className="glitre-deeper-product">{neighbour.product}</p>
                <p className="glitre-deeper-scope">{neighbour.scope}</p>
                <p className="glitre-deeper-not-shown">{neighbour.notShown}</p>
                <Link className="glitre-deeper-link" href={neighbour.href}>
                  Read the {neighbour.product.toLowerCase()} study <ArrowUpRight aria-hidden="true" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
        <p>
          <Link className="glitre-back" href="/work/glitre-loyalty-platform">
            ← Back to the Glitre Loyalty Platform overview
          </Link>
        </p>
      </section>

      <footer className="cs-footer-line" aria-label="Verification and return">
        <span>
          {glitreVerifiedLabel} · {productStatusLine[product.key]}
        </span>
        <Link href="/work">Back to selected work <span aria-hidden="true">→</span></Link>
        <span className="sr-only">
          Published case study: Glitre Loyalty Platform · {card.product}
        </span>
      </footer>
    </div>
  );
}
