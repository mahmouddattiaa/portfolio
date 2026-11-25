---
name: conversion-copywriting
description: Use when drafting multi-route landing page, offer, proof, and funnel copy from locked positioning and SEO briefs.
---

# Conversion Copywriting (Step 1)

Draft concrete, conversion-ready copy for every required route using only verified facts from `docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`, and `.kepler/stage-1-bindings.json`.

## Core Rule: Consequence First, Mechanism Second

Every headline, subhead, and offer block follows a strict two-part sequence:
1. **Consequence (what changes for the buyer):** State the measurable outcome, risk removed, or workflow shortened before naming features or implementation details.
2. **Mechanism (how the product or service delivers it):** Name the exact architecture, workflow step, deliverable, or constraint that makes the consequence believable.

Weak (mechanism first, vague claim):
> Built on an async queue with typed schemas for faster operations.

Strong (consequence first, concrete mechanism):
> Cut invoice reconciliation from 4 hours to 5 minutes with deterministic decimal checks and automated discrepancy flags.

## Above-the-Fold Hero Anatomy

Every primary landing route (`/`) and major offer route must include five explicit elements:

1. **Eyebrow (3–7 words):** Category anchor + ICP qualifier. Tells the visitor immediately whether they are in the right place.
2. **H1 Headline (6–12 words):** Single sharp consequence paired with the primary search keyword from `docs/seo-and-market-brief.md`. Never stack two separate promises in one H1.
3. **Lead Paragraph (20–38 words):** Connects the buyer's current bottleneck to the specific mechanism and scope of delivery.
4. **Primary CTA (2–4 words, action verb + outcome):** Tells the buyer exactly what happens on click (for example: `Book a Scope Review`, `Start Free Sandbox`, `Request Audit`). Avoid vague labels like `Learn More` or `Submit`.
5. **Secondary CTA + Risk Reversal Micro-Copy:** Gives skeptical or early-stage visitors a lower-friction path (for example: `View Case Studies`, `Read Technical Spec`) plus a 1-line expectation setter (response time, pricing transparency, or no-credit-card note).

## Proof-Backed Feature & Offer Blocks

For every offer in `required_offers` and every core capability:
- **Buyer Trigger:** When a team or buyer actually needs this tier or feature.
- **Concrete Scope / Deliverables:** Bulleted, verifiable outputs (artifacts, SLAs, integrations, or limits). No abstract promises.
- **Proof Anchor:** Link each major claim to an existing metric, case study, benchmark, or architecture detail from `docs/context/project-digest.md` or `docs/positioning-brief.md`. If no metric exists, cite the concrete mechanism or verification step instead of inventing numbers.
- **Direct Next Step:** Route-specific CTA tied to that offer.

## Proof, Case Studies & Credibility Section

Structure every proof item or required portfolio/product entry in `required_items` using the **Context -> Constraint -> Action -> Verified Outcome** pattern:
- **Context:** Who or what environment the work served.
- **Constraint:** The real technical, operational, or business bottleneck.
- **Action:** The concrete implementation, deliverable, or decision made.
- **Verified Outcome:** Observed result, benchmark, or shipped artifact (strictly grounded in source docs).

## Friction-Reducing CTA & Conversion Funnel Copy

On contact, demo, pricing, or signup routes:
- **Expectation Framing:** State exactly what happens after form submission or signup (who replies, within what timeframe, and what the first step produces).
- **Field Labels & Helper Text:** Explain why each required input is asked so buyers do not abandon forms.
- **Objection Micro-Copy:** Place 1-sentence answers to top buyer hesitations (timeline, lock-in, security, pricing range, or handoff ownership) directly adjacent to the CTA button.
- **Confirmation State:** Draft the post-submit confirmation headline, summary, and fallback contact channel.

## Route & SEO Alignment Rules

- Preserve every exact primary keyword, H1 intent, and route path locked in `docs/seo-and-market-brief.md` and `.kepler/stage-1-bindings.json` (`required_routes`).
- Keep navigation labels concise (1–2 words) and consistent across header and footer copy.
- Draft the Section 2 GEO Identity Block and every Section 6 FAQ answer as standalone Markdown blockquotes (`> ...`) targeting `40–60` words each so answer engines can quote them verbatim without surrounding context.

## Unbranded Discovery & Idea-Stage Founder Framing

When upstream briefs target non-technical or idea-stage founders arriving with an unformed app or workflow idea (rather than an existing codebase or RFP):
- **Translate plain goals into scoped builds:** Anchor on the business bottleneck the founder recognizes ("replace manual WhatsApp and spreadsheet orders with one booking and payment flow") instead of opening with stack jargon.
- **De-risk the first step:** Frame discovery as a short, concrete scoping deliverable—user flows, data contracts, fixed price, and milestone dates—so founders know exactly what gets built before full development starts.
- **Avoid patronizing simplification:** Keep tone peer-to-peer and commercially concrete; show clear ownership of code, accounts, and launch handoff.

## High Quality + Fast Cycle + Competitive Price Mechanism Copy

Whenever positioning promises fast turnaround (such as 2–5 week delivery) alongside production quality and competitive pricing, justify all three with an explicit operational mechanism—never leave speed and price sounding like a low-cost freelancer shortcut:
- **Contract-first OpenAPI / schema lock:** Freeze API contracts, data models, and route acceptance criteria before UI/backend implementation begins so parallel build streams avoid mid-sprint rework.
- **AI-assisted execution on scaffolding:** Use AI-assisted generation for repetitive boilerplate while senior engineers own architecture, edge cases, and integration boundaries.
- **Mandatory independent review gates:** Enforce automated type, test, and lint checks plus an independent verification pass before handoff, separating a disciplined lean studio from ad-hoc solo freelancing.
