---
name: seven-sweeps-copy-editing
description: Use when editing conversion copy through seven structured passes covering clarity, voice, specificity, outcomes, proof, friction, and CTAs.
---

# Seven Sweeps Copy Editing (Step 2)

Do not edit everything in one unstructured pass. Run seven sequential sweeps on the full draft from Step 1, fixing one failure mode per sweep before moving to the next.

## Sweep 1: Clarity

**Goal:** Every sentence is understood on the first read without rereading.
- Cut compound clauses with more than two ideas into separate sentences.
- Replace abstract nouns (`optimization`, `enablement`, `transformation`, `solution`) with plain verbs and concrete objects.
- Check every heading: if a reader scans only H1, H2, and H3 lines, they should still understand what is offered, for whom, and how it works.
- Flag any jargon that the target ICP from `docs/positioning-brief.md` would not use daily; either define it inline in 5 words or replace it.

## Sweep 2: Voice & Perspective Consistency

**Goal:** Zero persona drift across routes, headings, micro-copy, and FAQs.
- Check `.kepler/stage-1-bindings.json` for `voice_mode`:
  - `brand_plural`: Use `we`, `our`, `us`, or the brand name consistently. Remove all unquoted `I`, `my`, `myself`.
  - `solo_first_person`: Use `I`, `my`, `me` consistently. Remove corporate `we` unless referencing a client partnership.
  - `neutral`: Use product/entity third-person consistently without mixing first-person pronouns.
- Verify zero occurrences of any `forbidden_tokens` outside `allowed_exceptions`.
- Keep register uniform: direct, technically grounded, peer-to-peer.

## Sweep 3: Specificity over Adjectives

**Goal:** Replace empty modifiers with verifiable detail.
- Hunt down vague adjectives and adverbs (`fast`, `reliable`, `modern`, `comprehensive`, `high-quality`, `innovative`, `powerful`, `tailored`).
- Replace each with a concrete number, constraint, artifact, timeframe, or mechanism from `docs/context/project-digest.md`:
  - `fast` -> `sub-200ms response` or `ships in 2 weeks`
  - `comprehensive` -> `covers 5 routes, schema markup, and copy audit`
  - `reliable` -> `zero-downtime blue/green deploy with automated rollback`
- If a claim has no backing detail in the upstream docs, downgrade it to a factual scope statement rather than guessing.

## Sweep 4: "So What?" Outcome Link

**Goal:** Every feature or technical fact connects directly to a buyer consequence.
- Read every bullet point and ask: *"So what does this change for the buyer?"*
- If a bullet only describes an internal implementation detail, prepend or append the operational consequence (time saved, error class prevented, cost avoided, or handoff speed).
- Verify the primary hero, offer cards, and secondary routes all lead with buyer outcomes rather than internal process steps.

## Sweep 5: Evidence & Proof Grounding

**Goal:** Zero unsubstantiated claims or fabricated numbers.
- Cross-check every metric, client claim, timeline, and capability against `docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, and `docs/context/project-digest.md`.
- Remove any invented percentages, testimonials, or unverified comparisons.
- Confirm every entry in `required_items` and `required_offers` (when configured in `.kepler/stage-1-bindings.json`) has concrete, grounded copy.

## Sweep 6: Friction & Objection Removal

**Goal:** Eliminate hesitation right where the buyer decides to act.
- Check every pricing/offer section and form section for the top three buyer objections from `docs/positioning-brief.md` (cost clarity, timeline risk, ownership/lock-in, or migration effort).
- Ensure micro-copy directly beneath each CTA clarifies what happens next, how long it takes, and what is required from the buyer.
- Remove unnecessary form fields, legalese, or defensive phrasing.

## Sweep 7: CTA Actionability

**Goal:** Every page and major section ends with a clear, low-friction next action.
- Audit every primary and secondary CTA across all routes:
  - Starts with a concrete verb (`Book`, `Start`, `Request`, `Inspect`, `Compare`, `Download`).
  - Names the exact destination or artifact (`Book a 20-Minute Scope Call`, `Inspect Live Benchmarks`).
  - Matches the visitor's intent level on that route (high-intent CTA on pricing/contact; exploratory CTA on proof/about).
- Confirm no route ends in a dead end without a clear path to the conversion funnel.
