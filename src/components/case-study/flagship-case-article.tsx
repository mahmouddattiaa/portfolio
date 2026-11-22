"use client";

import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import type { FlagshipPresentation } from "./flagship-presentations";
import { CaseStudyMediaGallery } from "./media-gallery";
import { useState } from "react";

export function FlagshipCaseArticle({ study, copy }: { study: CaseStudy; copy: FlagshipPresentation }) {
  return (
    <div className="cs-article cs-flagship-article">
      <header id="section-hero" className="cs-section cs-hero" aria-labelledby="cs-hero-title">
        <div><p className="cs-hero-eyebrow">{copy.eyebrow}</p><h1 id="cs-hero-title" className="cs-hero-headline">{copy.headline}</h1><p className="cs-hero-lead">{copy.lead}</p></div>
        <dl className="cs-hero-meta" aria-label="Executive snapshot">
          {copy.snapshot.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
      </header>

      <section id="section-numbers" className="cs-section" aria-labelledby="cs-metrics-title">
        <p className="cs-section-eyebrow">Evidence at a glance</p>
        <h2 id="cs-metrics-title" className="cs-section-heading">Measured and documented scope.</h2>
        <div className="cs-evidence-metrics">
          {copy.metrics.map((metric) => <article key={metric.label}><span>{metric.value}</span><h3>{metric.label}</h3><p>{metric.source}</p></article>)}
        </div>
        <p className="cs-evidence-note">{copy.evidenceNote}</p>
      </section>

      <section id="section-situation" className="cs-section" aria-labelledby="cs-situation-title">
        <p className="cs-section-eyebrow">The situation</p><h2 id="cs-situation-title" className="cs-section-heading">From a broken hand-off to a bounded workflow.</h2>
        <div className="cs-situation">
          {[copy.before, copy.after].map((panel) => <article key={panel.heading} className={`cs-situation-panel ${panel.heading === "Before" ? "cs-situation-panel--before" : "cs-situation-panel--after"}`}><h3 className="cs-situation-heading">{panel.heading}</h3><ul className="cs-situation-list">{panel.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}
        </div>
      </section>

      <section id="section-delivery" className="cs-section" aria-labelledby="cs-delivery-title">
        <p className="cs-section-eyebrow">Executive snapshot</p><h2 id="cs-delivery-title" className="cs-section-heading">{study.title}: where the work sits today.</h2>
        <div className="cs-delivery-grid">
          <article className="cs-delivery-card"><span className="cs-delivery-number">01</span><h3 className="cs-delivery-title">Operational problem</h3><p className="cs-delivery-body">{study.problem}</p></article>
          <article className="cs-delivery-card"><span className="cs-delivery-number">02</span><h3 className="cs-delivery-title">What we built</h3><p className="cs-delivery-body">{study.solution}</p></article>
          <article className="cs-delivery-card"><span className="cs-delivery-number">03</span><h3 className="cs-delivery-title">Release boundary</h3><p className="cs-delivery-body">{study.context}</p></article>
        </div>
      </section>

      <section id="section-architecture" className="cs-architecture" aria-labelledby="cs-architecture-heading">
        <div className="cs-architecture-shell">
          <div className="cs-architecture-header">
            <p className="cs-architecture-eyebrow">System architecture</p><h2 id="cs-architecture-heading" className="cs-architecture-heading">{copy.architectureHeading}</h2><p className="cs-architecture-line">{copy.architectureLine}</p>
          </div>
          <ZoomableArchitecture copy={copy} slug={study.slug} />
        </div>
      </section>

      <CaseStudyMediaGallery project={study} heading={copy.galleryHeading} />

      <section id="section-decisions" className="cs-section" aria-labelledby="cs-decisions-heading">
        <p className="cs-section-eyebrow">Decisions that matter later</p><h2 id="cs-decisions-heading" className="cs-section-heading">Three choices tied to the operating outcome.</h2>
        <div className="cs-decisions">{copy.decisions.map((decision, index) => <article key={decision.heading} className="cs-decision-row"><div><span className="cs-delivery-number">0{index + 1}</span><h3 className="cs-decision-heading">{decision.heading}</h3><p className="cs-decision-paragraph">{decision.consequence}</p></div><aside className="cs-decision-how"><span className="cs-decision-how-label">How</span><p className="cs-decision-how-body">{decision.mechanism}</p></aside></article>)}</div>
      </section>

      <section className="cs-section cs-flagship-proof" aria-labelledby="cs-proof-title">
        <p className="cs-section-eyebrow">Evidence record</p><h2 id="cs-proof-title" className="cs-section-heading">What supports the published claims.</h2>
        <ul>{study.results.map((result) => <li key={result.claim}><span data-proof={result.proofState}>{result.proofState === "verified-public" ? "Publicly verified" : "Privately verified"}</span><p>{result.claim}</p>{result.evidenceRef ? <small>{result.evidenceRef}</small> : null}</li>)}</ul>
      </section>

      <section className="cs-closing" aria-labelledby="cs-closing-title"><div><p className="cs-section-eyebrow">A similar operational challenge?</p><h2 id="cs-closing-title">Start with a scoped project review.</h2><p>Choose an engagement and share the workflow, constraints and target timeline.</p><Link className="cs-closing-button" href={`/contact?offer=${copy.offer}`}>Discuss a project <span aria-hidden="true">→</span></Link></div></section>
      <footer className="cs-footer-line"><span>Source: Stage 2 case study and verified project records · {study.lastVerified}</span><Link href="/work">Back to all work <span aria-hidden="true">→</span></Link></footer>
    </div>
  );
}

function ZoomableArchitecture({ copy, slug }: { copy: FlagshipPresentation; slug: string }) {
  const [zoom, setZoom] = useState(1);
  const columns = [0, 1, 2].map((column) => copy.nodes.map((node, index) => ({ node, index })).filter(({ node }) => node.column === column));
  const position = (index: number) => {
    const node = copy.nodes[index];
    const row = columns[node.column].findIndex((entry) => entry.index === index);
    return { x: 28 + node.column * 310, y: 58 + row * 116 };
  };
  return (
    <div className="cs-diagram-wrap">
      <div className="cs-diagram-toolbar" aria-label="Diagram zoom controls"><button type="button" onClick={() => setZoom((value) => Math.min(1.6, value + 0.15))} aria-label="Zoom diagram in">+</button><button type="button" onClick={() => setZoom((value) => Math.max(0.8, value - 0.15))} aria-label="Zoom diagram out">−</button><button type="button" onClick={() => setZoom(1)}>Reset zoom</button><span aria-live="polite">{Math.round(zoom * 100)}%</span></div>
      <div className="cs-diagram-scroll" role="region" aria-label={`${slug} architecture diagram. Use the zoom controls or scroll horizontally to inspect.`} tabIndex={0}>
        <svg viewBox="0 0 958 420" role="img" aria-labelledby={`${slug}-diagram-title`} style={{ width: `${zoom * 958}px` }}>
          <title id={`${slug}-diagram-title`}>{copy.architectureText}</title>
          <defs><marker id={`${slug}-arrow`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8z" fill="var(--kd-accent)" /></marker></defs>
          {copy.edges.map(([from, to, label], index) => { const a = position(from); const b = position(to); const mid = (a.x + 258 + b.x) / 2; return <g key={`${from}-${to}-${index}`}><path d={`M${a.x + 258} ${a.y + 40} C${mid} ${a.y + 40}, ${mid} ${b.y + 40}, ${b.x} ${b.y + 40}`} fill="none" stroke="var(--kd-accent)" strokeWidth="2" markerEnd={`url(#${slug}-arrow)`} />{label ? <text x={mid - 34} y={(a.y + b.y) / 2 + 30} className="cs-diagram-edge-label">{label}</text> : null}</g>; })}
          {copy.nodes.map((node, index) => { const p = position(index); return <g key={node.title}><rect x={p.x} y={p.y} width="258" height="80" rx="6" className={`cs-diagram-node ${node.column === 1 ? "cs-diagram-node--accent" : ""}`} /><text x={p.x + 16} y={p.y + 31} className="cs-diagram-node-text">{node.title}</text><text x={p.x + 16} y={p.y + 55} className="cs-diagram-node-sub">{node.detail}</text></g>; })}
        </svg>
      </div>
      <details className="cs-diagram-alternative"><summary>Read the architecture in text</summary><p>{copy.architectureText}</p><ol>{copy.nodes.map((node) => <li key={node.title}><strong>{node.title}:</strong> {node.detail}</li>)}</ol></details>
    </div>
  );
}
