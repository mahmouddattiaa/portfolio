import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { builds, offers } from "@/lib/content";
import { getServicesCopy } from "@/content/services";
import { Reveal } from "@/components/home/reveal";
import { MobileCta } from "@/components/home/mobile-cta";
import "../services-v2.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "What Kepler Dev builds and how we work with teams: web apps and dashboards, mobile apps and integrations, delivered through three paid engagements — Product Blueprint, Launch Sprint and Product Care.",
};

/*
 * Services page v2 — what the studio builds and how an engagement runs.
 * Words come from src/content/services; the engagement and build names come
 * from src/lib/content.ts so this page, the homepage accordion and the work
 * page hero cannot drift apart.
 */
export default function ServicesPage() {
  const copy = getServicesCopy("en");

  return (
    <div className="sv2" lang={copy.lang} dir={copy.dir}>
      {/* 1 — Hero */}
      <section
        id="sv2-hero"
        className="sv2-hero"
        aria-labelledby="sv2-hero-title"
      >
        <div className="sv2-hero-media" aria-hidden="true">
          <Image
            className="sv2-hero-photo"
            src="/media/home/hero-tree.webp"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
          />
          <span className="sv2-hero-sun" />
        </div>
        <div className="sv2-hero-content">
          <p className="sv2-eyebrow sv2-rise">{copy.hero.eyebrow}</p>
          <h1 id="sv2-hero-title" className="sv2-rise sv2-rise-late">
            {copy.hero.headline}
          </h1>
          <p className="sv2-hero-lead sv2-rise sv2-rise-late-2">
            <span className="sv2-lead-desktop">{copy.hero.lead}</span>
            <span className="sv2-lead-phone">{copy.hero.leadPhone}</span>
          </p>
        </div>
        {/* The same engagement names twice: the row on wide screens, the
            plain line on phones. Each is display:none at the other size, so
            a screen reader only ever meets one of them. */}
        <div className="sv2-hero-foot">
          <div className="sv2-hero-engagements">
            {offers.map((offer, index) => (
              <span key={offer.name} className="sv2-engagement">
                {index > 0 ? (
                  <span className="sv2-engagement-dot" aria-hidden="true" />
                ) : null}
                {offer.name}
              </span>
            ))}
          </div>
          <p className="sv2-engagements-text">
            {offers.map((offer) => offer.name).join(" · ")}
          </p>
          <Link className="sv2-link sv2-link-light sv2-hero-work" href="/work">
            {copy.hero.workLink} <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 2 — What we build */}
      <section
        id="sv2-builds"
        className="sv2-builds"
        aria-labelledby="sv2-builds-title"
      >
        <div className="sv2-section-head">
          <div>
            <p className="sv2-eyebrow">{copy.builds.eyebrow}</p>
            <h2 id="sv2-builds-title">{copy.builds.title}</h2>
          </div>
          <p className="sv2-section-line">{copy.builds.line}</p>
        </div>
        <ul className="sv2-builds-grid">
          {builds.map((item) => (
            <li key={item.name} className="sv2-build">
              <h3>{item.name}</h3>
              <p>{item.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 — The three engagements */}
      <section
        id="sv2-engagements"
        className="sv2-engagements"
        aria-labelledby="sv2-engagements-title"
      >
        <div className="sv2-section-head">
          <div>
            <p className="sv2-eyebrow">{copy.engagements.eyebrow}</p>
            <h2 id="sv2-engagements-title">{copy.engagements.title}</h2>
          </div>
          <p className="sv2-section-line">{copy.engagements.line}</p>
        </div>
        <ul className="sv2-engagement-grid">
          {offers.map((offer, index) => (
            <li key={offer.name}>
              <article
                className="sv2-card"
                aria-labelledby={`sv2-offer-${index}-title`}
              >
                <div className="sv2-card-head">
                  <h3 id={`sv2-offer-${index}-title`}>{offer.name}</h3>
                  <span className="sv2-card-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <dl className="sv2-card-facts">
                  <div>
                    <dt>{copy.engagements.labels.bestFit}</dt>
                    <dd className="sv2-card-fit">{offer.bestFit}</dd>
                  </div>
                  <div>
                    <dt>{copy.engagements.labels.outcome}</dt>
                    <dd>{offer.outcome}</dd>
                  </div>
                  <div>
                    <dt>{copy.engagements.labels.boundary}</dt>
                    <dd>{offer.boundary}</dd>
                  </div>
                </dl>
                <p className="sv2-card-next">
                  <span className="sv2-card-next-label">
                    {copy.engagements.labels.next} &rarr;
                  </span>{" "}
                  {offer.next}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 — The path, and who does the work */}
      <section id="sv2-path" className="sv2-path" aria-labelledby="sv2-path-title">
        <div className="sv2-section-head">
          <div>
            <p className="sv2-eyebrow">{copy.path.eyebrow}</p>
            <h2 id="sv2-path-title">{copy.path.title}</h2>
          </div>
          <p className="sv2-section-line">{copy.path.line}</p>
        </div>

        <ol className="sv2-steps">
          {offers.map((offer, index) => (
            <li key={offer.name} className="sv2-step">
              <span className="sv2-step-node" aria-hidden="true" />
              <p className="sv2-step-name">{offer.name}</p>
              <p className="sv2-step-line">{copy.path.steps[index]}</p>
            </li>
          ))}
        </ol>

        <div className="sv2-team" aria-labelledby="sv2-team-title">
          <div>
            <p className="sv2-eyebrow">{copy.team.eyebrow}</p>
            <h3 id="sv2-team-title">{copy.team.title}</h3>
          </div>
          <p className="sv2-team-body">{copy.team.body}</p>
        </div>
      </section>

      {/* 5 — Pricing */}
      <section
        id="sv2-pricing"
        className="sv2-pricing"
        aria-labelledby="sv2-pricing-title"
      >
        <div className="sv2-pricing-inner">
          <div className="sv2-pricing-left">
            <p className="sv2-eyebrow">{copy.pricing.eyebrow}</p>
            <h2 id="sv2-pricing-title">{copy.pricing.title}</h2>
          </div>
          <div className="sv2-pricing-right">
            <p className="sv2-pricing-body">{copy.pricing.body}</p>
            <dl className="sv2-pricing-rows">
              {copy.pricing.rows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 6 — Project review call */}
      <section
        id="sv2-closing"
        className="sv2-closing"
        aria-labelledby="sv2-closing-title"
      >
        <div className="sv2-closing-content">
          <Reveal>
            <div className="sv2-closing-row">
              <div>
                <h2 id="sv2-closing-title">{copy.closing.title}</h2>
                <p className="sv2-closing-note">{copy.closing.note}</p>
              </div>
              <Link className="sv2-button" href="/contact">
                {copy.closing.button} <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <MobileCta
        heroId="sv2-hero"
        closingId="sv2-closing"
        footerId="site-footer"
        label={copy.closing.button}
      />
    </div>
  );
}
