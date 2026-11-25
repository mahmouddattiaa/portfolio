---
name: offer-and-funnel-architecture
description: Use when packaging commercial offers or product tiers, mapping proof inventory, and designing route-level CRO conversion funnels in Stage 1.
---

# Offer Packaging & Multi-Route CRO Architecture

## Purpose
Translate the locked positioning thesis into clear commercial offers (or adoption tiers), map every verified proof asset to a buyer segment, and specify the conversion sequence for every required route.

## Part 1 — Commercial Offer & Tier Packaging

This structure works across business models: SaaS subscription tiers, studio/agency service packages, developer-tool adoption paths (OSS -> Team -> Enterprise), or productized audits.

For every offer or tier (covering 100% of `required_offers` in `.kepler/stage-1-bindings.json` if configured), define five mandatory fields:

1. **Best Fit:** Exact ICP segment, company stage, or technical trigger that belongs here.
2. **Deliverables:** Concrete capabilities, artifacts, SLAs, or access levels included. Use observable nouns, never vague promises.
3. **Pricing Anchor & Timeline:** Transparent starting floor (e.g., `From $...`) or pricing model paired with a concrete delivery cycle.
4. **Explicit Boundary:** What is intentionally out of scope for this tier (prevents scope creep, clarifies upgrade paths, and builds buyer trust).
5. **Next Step:** Single unambiguous conversion action (e.g., `Start free sandbox`, `Book 20-minute scoping call`, `Install CLI via npm`, `Request security packet`).

### Offer Ladder Hygiene & Entry-Tier Pricing Anchor
- **Zero overlap:** A buyer reading two adjacent tiers should immediately know which one fits today.
- **Value metric alignment:** Anchor progression to a real scaling axis (seats, usage volume, deployment scope, SLA tier, or engagement speed).
- **Entry-tier pricing anchor hygiene:** Pair high-consideration offers with a low-friction paid diagnostic or architecture blueprint credited toward the full build if the client proceeds. Publish transparent `"From $..."` floors rather than opaque "Contact us" walls or self-limiting high ceilings that underprice complex scopes.

### Economic & Speed Mechanism (Mandatory Rule)
Whenever an offer combines competitive pricing, compressed delivery cycles, and high engineering quality, document the operational mechanism in Section 4 (`### Economic & Speed Mechanism`) or Section 5 of `docs/positioning-brief.md` so buyers never mistake speed and fair pricing for low quality:
1. **Cost & Overhead Removal:** State what unnecessary cost is eliminated (e.g., zero agency account-manager overhead, direct senior-engineer execution, reusable modules).
2. **Cycle Speed Mechanism:** State what compresses delivery time (e.g., contract-first architecture specs, AI-accelerated scaffolding inside typed boundaries, fixed-scope sprint cadence).
3. **Quality & Verification Gate:** State what enforces production reliability (e.g., mandatory independent verification gates, automated end-to-end tests, deterministic CI checks, documented handoff runbooks).

Pair this mechanism in Section 5 with explicit contrasts against both **slow, high-overhead agencies** (multi-month retainers, account-manager markup) and **cheap, unverified freelancers** (untested glue code, missing verification, stalled handoffs).

## Part 2 — Proof, Feature & Portfolio Inventory Mapping

Every proof point in the project digest (case studies, shipped repositories, benchmarks, customer outcomes, open-source packages, or core product modules) must earn its place in the funnel.

Build a complete inventory matrix covering 100% of `required_items` (if configured in bindings) or all primary assets from `docs/context/project-digest.md`:
- **Asset / Proof Item:** Exact canonical name from the digest.
- **Target ICP:** Which buyer profile cares about this proof.
- **Supported Offer / Product Line:** Which tier or capability it validates.
- **Proof Type & Metric:** Quantified outcome, architectural proof, live artifact, or compliance credential.
- **Primary Route Placement:** Exact route where this item appears first.

If an asset has no metric yet, state the verified technical fact (architecture, stack, constraint solved) instead of inventing numbers.

## Part 3 — Multi-Route Conversion Architecture (CRO Funnel)

Every route in `required_routes` (or the core site map from the project brief) needs a distinct job in the buyer journey. Never treat secondary pages as duplicate homepages.

### Standard Page Conversion Sequence
Structure primary landing and offer routes around six sequential jobs:
1. **Hero:** Category clarity + primary outcome + single primary CTA above the fold.
2. **Proof:** Immediate credibility signal (metrics, shipped artifacts, logos, or live demo preview) before asking for commitment.
3. **Mechanism:** How the product or delivery process works in 3 to 4 concrete steps.
4. **Offer:** Clear comparison of tiers, scopes, or adoption paths with explicit boundaries.
5. **Objection Handling:** Direct answers to top buyer hesitations (migration effort, pricing model, security, ownership, timeline).
6. **CTA:** Low-friction closing action matched to visitor intent (plus one secondary path for evaluators not ready to buy).

### Route Role Differentiation
Define for each route:
- **Visitor Intent:** What question brought the user to this URL.
- **Primary Conversion Goal:** The single action that marks success on this route.
- **Hero Direction:** Headline angle, subheadline proof anchor, and primary CTA label (directional brief, not final polished copy).
- **Mandatory Proof Blocks:** Which inventory items must appear on this route.
- **Handoff Route:** Where undecided visitors go next.

## Quality Checks Before Step 3
- Every `required_offers` entry has `Best Fit`, `Deliverables`, `Pricing Anchor & Timeline`, `Explicit Boundary`, and `Next Step`.
- Entry-tier offers use a credited diagnostic/blueprint and transparent `"From $..."` floors without self-limiting ceilings.
- Section 4 or 5 documents the three-part **Economic & Speed Mechanism** (cost/overhead, cycle speed, quality/verification gate) and contrasts against slow high-overhead agencies and cheap unverified freelancers.
- Every `required_items` entry (when configured) is mapped in the inventory table.
- Every `required_routes` entry has a unique conversion goal and hero direction.
- No two routes compete for the exact same primary CTA without a distinct visitor intent.
