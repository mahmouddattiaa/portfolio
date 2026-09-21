import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getWorkCopy } from "@/content/work";
import { WorkGrid } from "@/components/work-grid";
import { DrawnLine, Reveal } from "@/components/home/reveal";
import { MobileCta } from "@/components/home/mobile-cta";
import "../work-v2.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Publication-safe case studies from Kepler Dev. Each study follows one engagement end to end: the problem, what we designed and built, and how every claim is evidenced.",
};

/*
 * Work page v2 — the studio's published case studies, with the permissions
 * and evidence that justify each one. Words come from src/content/work.
 */
export default function WorkPage() {
  const copy = getWorkCopy("en");

  return (
    <div className="wv2" lang={copy.lang} dir={copy.dir}>
      {/* 1 — Hero */}
      <section
        id="wv2-hero"
        className="wv2-hero"
        aria-labelledby="wv2-hero-title"
      >
        <div className="wv2-hero-media" aria-hidden="true">
          <Image
            className="wv2-hero-photo"
            src="/media/home/hero-tree.webp"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
          />
          <span className="wv2-hero-sun" />
        </div>
        <div className="wv2-hero-content">
          <p className="wv2-eyebrow wv2-rise">{copy.hero.eyebrow}</p>
          <h1 id="wv2-hero-title" className="wv2-rise wv2-rise-late">
            {copy.hero.headline}
          </h1>
          <p className="wv2-hero-lead wv2-rise wv2-rise-late-2">
            <span className="wv2-lead-desktop">{copy.hero.lead}</span>
            <span className="wv2-lead-phone">{copy.hero.leadPhone}</span>
          </p>
        </div>
        {/* The same four engagements twice: the row on wide screens, the
            plain line on phones. Each is display:none at the other size, so
            a screen reader only ever meets one of them. */}
        <div className="wv2-hero-foot">
          <div className="wv2-hero-engagements">
            {copy.engagements.map((name, index) => (
              <span key={name} className="wv2-engagement">
                {index > 0 ? (
                  <span className="wv2-engagement-dot" aria-hidden="true" />
                ) : null}
                {name}
              </span>
            ))}
          </div>
          <p className="wv2-engagements-text">
            {copy.engagements.join(" \u00b7 ")}
          </p>
          <Link
            className="wv2-link wv2-link-light wv2-hero-services"
            href="/services"
          >
            {copy.hero.servicesLink} <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 2 — How to read this work */}
      <section
        id="wv2-how"
        className="wv2-how"
        aria-labelledby="wv2-how-title"
      >
        <div className="wv2-how-left">
          <p className="wv2-eyebrow">{copy.howToRead.eyebrow}</p>
          <h2 id="wv2-how-title">{copy.howToRead.title}</h2>
          <p className="wv2-how-line">{copy.howToRead.line}</p>
        </div>
        <dl className="wv2-how-right" aria-label={copy.howToRead.eyebrow}>
          {copy.howToRead.rows.map((row) => (
            <div key={row.label} className="wv2-how-row">
              <dt>{row.label}</dt>
              <dd>{row.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 3 — Published studies */}
      <section
        id="wv2-studies"
        className="wv2-studies-section"
        aria-labelledby="wv2-studies-title"
      >
        {/* The design leads with the filters, so the heading is for
            structure and screen readers only. */}
        <h2 id="wv2-studies-title" className="sr-only">
          {copy.studies.heading}
        </h2>
        <div className="wv2-pad">
          <WorkGrid />
        </div>
      </section>

      {/* 4 — Project review call */}
      <section
        id="wv2-closing"
        className="wv2-closing"
        aria-labelledby="wv2-closing-title"
      >
        <div className="wv2-closing-content">
          <Reveal>
            <p className="wv2-eyebrow">{copy.closing.eyebrow}</p>
            <h2 id="wv2-closing-title">{copy.closing.title}</h2>
            <div className="wv2-closing-actions">
              <Link className="wv2-button" href="/contact">
                {copy.closing.button} <ArrowUpRight aria-hidden="true" />
              </Link>
              <p>{copy.closing.note}</p>
            </div>
            <div className="wv2-thread" aria-hidden="true">
              <DrawnLine className="wv2-thread-line" />
              <span className="wv2-thread-node" />
            </div>
          </Reveal>
        </div>
      </section>

      <MobileCta
        heroId="wv2-hero"
        closingId="wv2-closing"
        footerId="site-footer"
        label={copy.closing.button}
      />
    </div>
  );
}
