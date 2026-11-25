# Stage 1 Final Conversion Copy & Pitch Specification

**Project:** `<Project Name>`
**Canonical Origin:** `<https://example.com>`
**Voice Mode:** `<brand_plural | solo_first_person | neutral>`
**Source Briefs:** `docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`

---

## 1. Global Navigation, Footer & Voice Contract

### Voice & Tone Contract
- **Perspective:** `<Active voice rule from .kepler/stage-1-bindings.json>`
- **Tone Guardrails:** Direct, consequence-first, mechanism-second, strictly grounded in verified project facts.
- **Arabic Transcreation (if configured):** `<Natural GCC/Egyptian founder-friendly Arabic, zero English /mo unit leaks, bilingual 40-60 word GEO parity>`
- **Forbidden Terms & Attribution Guardrails:** `<Configured forbidden_tokens and allowed_exceptions, or None>`

### Global Header Navigation
| Slot | Label | Target Route | Intent |
|---|---|---|---|
| Primary 1 | `<Label>` | `/` | Home / Core Positioning |
| Primary 2 | `<Label>` | `<Route>` | Core Offer / Capabilities |
| Primary 3 | `<Label>` | `<Route>` | Proof / Case Studies |
| Action CTA | `<Primary CTA>` | `<Conversion Route>` | Primary Conversion |

### Global Footer Copy
- **Brand Summary (1 sentence):** `<Concise entity summary aligned to positioning brief>`
- **Footer Links:** `<Grouped links matching required_routes>`
- **Legal / Attribution Line:** `<Copyright and canonical contact channel>`

---

## 2. Primary Landing Route (/) Copy & GEO Identity Block

### GEO Identity Block (40–60 Words)

> `<Replace with a standalone 40 to 60 word identity blockquote naming the entity, core category, target audience, primary mechanism, and verified scope or proof so search and answer engines can quote it verbatim without surrounding context.>`

### Above-the-Fold Hero
- **Eyebrow:** `<3–7 word category and ICP qualifier>`
- **H1:** `<6–12 word consequence-first headline aligned to primary SEO keyword>`
- **Lead:** `<20–38 word bridge from buyer bottleneck to concrete mechanism>`
- **Primary CTA:** `<Action verb + outcome>` -> `<Target route>`
- **Secondary CTA:** `<Lower-friction action>` -> `<Target route>`
- **Risk-Reversal Micro-Copy:** `<1-sentence expectation setter>`

### Problem -> Mechanism -> Outcome Section
- **Section H2:** `<Problem framing heading>`
- **Buyer Bottleneck:** `<Specific operational pain grounded in positioning brief>`
- **How It Works (3 Steps):**
  1. `<Step 1 — concrete input or audit>`
  2. `<Step 2 — concrete mechanism or build>`
  3. `<Step 3 — verifiable output or handoff>`

---

## 3. Core Product, Features & Offers Copy

### Offer & Tier Comparison
| Offer / Tier | Best For | Core Deliverables | Primary CTA |
|---|---|---|---|
| `<Offer 1>` | `<Buyer trigger>` | `<Concrete scope items>` | `<Offer CTA>` |
| `<Offer 2>` | `<Buyer trigger>` | `<Concrete scope items>` | `<Offer CTA>` |
| `<Offer 3>` | `<Buyer trigger>` | `<Concrete scope items>` | `<Offer CTA>` |

### Detailed Offer & Capability Blocks
- **`<Offer / Capability Name>`:** `<Consequence-first summary followed by exact mechanism, deliverables, and proof anchor.>`

---

## 4. Proof, Case Studies & Credibility Copy

### Proof Summary Header
- **Section H2:** `<Evidence-backed heading>`
- **Lead:** `<1–2 sentences framing verifiable outcomes>`

### Proof Items & Case Studies
| Item / Case Study | Context & Constraint | Concrete Action | Verified Outcome |
|---|---|---|---|
| `<Item 1>` | `<Environment + bottleneck>` | `<Shipped implementation or decision>` | `<Observed result or artifact>` |
| `<Item 2>` | `<Environment + bottleneck>` | `<Shipped implementation or decision>` | `<Observed result or artifact>` |

---

## 5. Secondary Routes & Conversion Funnel Copy

### Route-by-Route Copy Specifications
- **Route `<Route Path>`:**
  - **H1:** `<SEO-aligned H1>`
  - **Lead:** `<Consequence-first intro>`
  - **Core Sections:** `<Bulleted section copy and proof blocks>`
  - **CTA:** `<Route-specific CTA + micro-copy>`

### Conversion Form / Funnel Copy
- **Form Heading:** `<Action-oriented heading>`
- **Expectation Micro-Copy:** `<Exact response timeframe, who replies, and what happens next>`
- **Field Labels & Helper Copy:** `<List each field with concise helper text>`
- **Submit Button:** `<Verb + outcome>`
- **Post-Submit Confirmation:** `<Confirmation headline, next steps, and fallback contact>`

---

## 6. Frequently Asked Questions (40-60 Word GEO Answers)

### Q1: `<High-intent buyer question 1>`

> `<Replace with a standalone 40 to 60 word direct answer grounded in the positioning and SEO briefs. State the exact answer in the first sentence, followed by concrete scope, timeline, or mechanism details.>`

### Q2: `<High-intent buyer question 2>`

> `<Replace with a standalone 40 to 60 word direct answer grounded in the positioning and SEO briefs. State the exact answer in the first sentence, followed by concrete scope, timeline, or mechanism details.>`

### Q3: `<High-intent buyer question 3>`

> `<Replace with a standalone 40 to 60 word direct answer grounded in the positioning and SEO briefs. State the exact answer in the first sentence, followed by concrete scope, timeline, or mechanism details.>`

### Q4: `<High-intent buyer question 4>`

> `<Replace with a standalone 40 to 60 word direct answer grounded in the positioning and SEO briefs. State the exact answer in the first sentence, followed by concrete scope, timeline, or mechanism details.>`

---

## 7. Mandatory Self-Audit Checklist

| # | Audit Gate | Verification Evidence | Status |
|---|---|---|---|
| 1 | All 7 required H2 sections present in exact order with non-empty copy | Verified against template headings | PASS |
| 2 | Consequence-first, mechanism-second framing across hero and offers | Reviewed in Step 1 and Step 2 | PASS |
| 3 | Seven Sweeps copy-editing rubric applied end to end | Completed Clarity through CTA sweeps | PASS |
| 4 | GEO blockquotes (Section 2 identity + Section 6 FAQs) strictly 40–60 words | Counted and verified via `copy_audit.py` | PASS |
| 5 | All configured `required_routes`, `required_offers`, and `required_items` covered | Cross-checked against `.kepler/stage-1-bindings.json` | PASS |
| 6 | Voice mode, forbidden tokens, and allowed exceptions strictly enforced | Verified via `prose_audit.py` | PASS |
| 7 | Zero banned AI buzzwords, zero structural tells, zero unfilled placeholders | Verified via `prose_audit.py` and `copy_audit.py` | PASS |
