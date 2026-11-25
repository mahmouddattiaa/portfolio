---
name: shared-marketing-context
description: Use when distilling docs/positioning-brief.md into .agents/product-marketing.md as the single positioning source of truth for SEO, Copywriting, UX, and Engineering.
---

# Shared Marketing Context (`.agents/product-marketing.md`)

## Purpose
`.agents/product-marketing.md` is the compact, machine- and human-readable positioning contract consumed by Role 1.2 (`seo-and-market-researcher`), Role 1.3 (`conversion-copywriter`), Stage 2 UX/Design, and Stage 3 Engineering.

While `docs/positioning-brief.md` holds the full strategic rationale, `.agents/product-marketing.md` distills the locked decisions into fast-lookup rules so downstream roles never drift in voice, terminology, offers, or proof.

## Distillation Rules

### 1. Brand Identity, Voice & Attribution Rules
- Record the canonical project/brand name, canonical origin (if configured), and entity type (`Organization`, `SoftwareApplication`, `Person`, etc.).
- State the active `voice_mode` from `.kepler/stage-1-bindings.json` (`brand_plural`, `solo_first_person`, or `neutral`) and spell out the pronoun rule in plain English.
- List any `forbidden_tokens` and `allowed_exceptions` so downstream writers and engineers never leak disallowed names or pronouns.
- Define 3 to 4 tone attributes as concrete pairs (e.g., "Direct over promotional", "Specific over abstract", "Evidence-first over aspirational").

### 2. Positioning & Value Proposition Summary
- Include the locked Geoffrey Moore positioning statement verbatim from `docs/positioning-brief.md`.
- Summarize the one-sentence category thesis and the top 3 proof-backed differentiators in bullet form.
- State the primary competitive alternatives (including status-quo workarounds) so SEO and Copywriting target the right comparison angles.

### 3. Target Audience, Pain Points & Buyer Language
- Summarize each ICP in 2 to 3 scannable lines (role, trigger event, core pain, primary objection).
- Provide a **Buyer Language Bank**: exact phrases buyers use to describe their problem and desired outcome, contrasted with internal jargon to avoid.

### 4. Offers, Capabilities & Proof Inventory
- List every locked offer/tier with its `Best Fit`, `Deliverables` summary, `Explicit Boundary`, and `Next Step`.
- Provide a compact verified proof ledger (exact metrics, shipped items, and technical facts downstream roles are permitted to cite).
- Explicitly note any unverified or placeholder metrics that must NOT be cited until measured.

### 5. Route Funnel & Conversion Goals
- Provide a single route table covering every required route (`Route`, `Visitor Intent`, `Primary Conversion Goal`, `Primary CTA Direction`, `Required Proof`).
- Ensure route paths match `.kepler/stage-1-bindings.json` (`required_routes`) verbatim when configured.

### 6. Terminology, Guardrails & Banned Claims
- **Preferred vocabulary:** exact canonical spellings for product lines, offers, and technical terms.
- **Banned claims & clichés:** unverified superlatives, AI filler words, and structural slogan tells that `prose_audit.py` rejects.
- **Scope guardrails:** claims that are strictly out of bounds (e.g., unsupported compliance certifications, unshipped features presented as live, fabricated customer counts).

## Voice & Attribution Drift Red Flags

| Binding Setting | Drift to Reject | Compliant Replacement |
|---|---|---|
| `voice_mode: "brand_plural"` | "I build fixed-scope web apps for founders." | "We deliver fixed-scope web apps for engineering teams." |
| `voice_mode: "solo_first_person"` | "The organization strives to optimize client outcomes." | "I audit checkout bottlenecks and ship fixes in 4 weeks." |
| `forbidden_tokens: ["FounderName"]` | "Founded by FounderName to help startups grow." | "Built by the studio engineering team for B2B product leads." |

## Cross-File Synchronization Check
Before running Step 4 verification, confirm exact alignment between `docs/positioning-brief.md` and `.agents/product-marketing.md`:
- Offer names and boundaries match character-for-character.
- Route paths and primary conversion goals match.
- Proof items and metrics match with zero contradictions.
- Both files satisfy all rules in `.kepler/stage-1-bindings.json` and pass `positioning_audit.py --verify` plus `prose_audit.py`.
