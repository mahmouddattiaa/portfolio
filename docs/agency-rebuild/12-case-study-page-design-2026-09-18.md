# Case study page — design specification

**Date:** 2026-09-18
**Source design:** Canvas "Case Study Page Design" (owner-held; workers cannot open it — this
document is the buildable spec).
**Applies to:** the first published case study, anonymized. See the Hub decision
"Case study 1 evidence packet (anonymized): connected loyalty and operations platform"
(`decision_cee27ca6c4784ad6b64e009eb1a9ae9d`) for the facts. Never invent facts beyond it.

---

## 1. Principles

1. **Consequence first, mechanism second.** Every technical fact is written twice: a plain
   sentence for a non-technical buyer, and a short technical note beside it for their engineer.
2. **No client material.** No client name, logo, screenshots or marketing media until the owner
   records written permission. The product illustrations are drawn in the site's own styling and
   labelled as such.
3. **Honesty is the differentiator.** The status section names what is not done. Do not remove it.
4. **One record, many surfaces.** The page renders from the case study record in
   `src/lib/content.ts`. No copy is retyped into the page component.

## 2. Existing tokens (do not invent new ones)

`--atelier-pearl #EEE7DE` page ground · `--surface #F7F1EB` raised cards ·
`--surface-alt #E5DBD1` inset panels · `--atelier-forest #071C18` dark bands ·
`--atelier-ink #202826` text · `#3C4744` body text on pearl · `--muted #56605C` captions ·
`--atelier-bronze-deep #985F3B` rules and borders · `#6F4224` small accent text on pearl
(the existing bronze fails AA below 24px, so small accent text uses the darker value) ·
`--atelier-bronze-300 #D4A47A` accent on dark. Display face Manrope, body face Inter.
Dark mode must be honoured through the existing theme variables, not hard-coded hexes.

## 3. Section order (desktop)

1. **Hero.** Eyebrow "Case study 01 / classification". Headline in the buyer's language, 60–64px
   Manrope 600. Lead paragraph 21px. Right-hand meta panel: Role, Timeline, Status, Evidence,
   each label 11px uppercase bronze-deep, value 16px, with the confidentiality note under Evidence.
2. **Numbers strip.** Five figures between hairlines: 4 connected products, 60 API operations,
   30 data models, 2 languages, 31 days to production. Figures count up from zero **when the strip
   scrolls into view** (Framer Motion is already a dependency); no count for
   `prefers-reduced-motion: reduce`, which renders final values immediately.
3. **The situation.** Two panels: Before on `--surface-alt`, After on forest with pearl text.
   Four workflow lines each, written as what people did, not as features.
4. **What we delivered.** Four cards, bronze top rule, numbered 01–04, hover lift of 4px.
5. **The moment it happens.** Three illustrative frames — customer phone with a one-time code,
   staff device mid-scan, head-office ledger rows including a reversal. A caption beside the
   heading states the frames are drawn in our own styling and the client's screens are not shown.
   Ledger rows settle in sequentially; the scanner line sweeps; the code expiry pulses.
6. **How it fits together (dark band, full width).** Heading, one supporting line, and the
   architecture diagram on a light card: three clients, one API contract, three service blocks
   (loyalty services / points ledger, emphasised / message queue), and an in-region footprint.
   Connectors draw in once.
7. **Pull quote.** Display type on `--surface-alt` with a bronze left rule, attributed to Mahmoud.
8. **Decisions that matter later.** Three rows, each a buyer-facing heading and paragraph on the
   left and a bordered "How" note on the right.
9. **How it was built / Where it stands.** Two cards. "A small team of developers, working with AI
   agents on flagship models." and the honest next-phase paragraph.
10. **Closing band.** Forest, headline, one line, and the project-review call to action.
11. **Footer line.** Verification date, the confidentiality note, and a link back to `/work`.

## 4. Contents rail (desktop only)

A 136px column on the left, starting below the hero, listing the six section anchors with a
bronze dot on the section currently in view, a hairline, and the verification date. It is
sticky while the article scrolls and must be a real `<nav>` with an accessible label and real
anchor links. Hidden below 1024px.

## 5. Motion

Entrances rise 18px with a 900ms ease and a 140ms stagger; hover lifts 4px; the scanner sweep
and code pulse loop; ledger rows stagger 160ms; diagram connectors draw once. Everything is
disabled under `prefers-reduced-motion: reduce` — no exceptions, and it must be tested.

## 6. Texture

A fractal-noise overlay at roughly 4% opacity, multiply blend, pointer-events none, behind all
content. It must not appear in the accessibility tree and must not affect layout or scrolling.

## 7. Mobile (390px)

Single column, 20px gutters. Same order, with the contents rail dropped, the three product
frames reduced to one phone frame plus three numbered lines, and the decision "How" notes
becoming inset blocks under each paragraph. Nothing shrinks below 15px body type.

## 8. Placement of the record elsewhere (separate task)

- `/work` — a card generated from the same record, replacing the empty state.
- `/` — a short teaser with a link, where the homepage currently promises evidence.
- `/mahmoud` — the "Selected experience" capsule becomes a teaser linking to the study instead
  of separately maintained prose, so there is one source of truth for the project.
- `sitemap.xml` — already generated from the published record; confirm the route appears.

## 9. Constraints

- The publication gate in `src/lib/content.ts` is not to be modified or bypassed.
- No new npm dependency. Framer Motion, already present, covers the motion work.
- `npm run lint` and `npm run build` must pass; screenshots at 390, 768, 1024 and 1440px are
  required evidence, taken against the running page, not mocked.

---

## Appendix A — Approved copy for case study 01 (build from this, verbatim)

The canvas was a design exploration and contains a few phrases that are not supported by the
owner's evidence packet (`decision_cee27ca6c4784ad6b64e009eb1a9ae9d` with amendments
`decision_1c6b23cdecb346d88a35daf1fc5d86a3` and `decision_e02d2d51ab99419d99c627f82c97ba83`).
**This appendix supersedes the canvas wherever they differ.** Do not restore canvas wording.

**Where the copy lives.** Factual fields (title, problem, role, team, scope, technologies,
results, status, verification date) render from the record in `src/lib/content.ts`. The narrative
copy below, which the record has no fields for, lives in one typed module,
`src/components/case-study/presentation.ts`, keyed by the slug `loyalty-operations-platform`.
The page renders the narrative section only when an entry exists for the slug.

**Removed from the canvas and never to appear:** "Twelve seconds at the pump" (no such
measurement exists); "lived in someone's notebook"; "without slowing the queue"; "without the
usual integration week"; "operational monitoring" in the status paragraph. Illustrative screens
must not carry business-looking figures: use the sample values given below and the caption.

### Hero
- Eyebrow: `Case study 01` · `Private client · Fuel retail · GCC`
- Headline: `A fuel-station network had no way to know its repeat customers.`
- Lead: `In about a month we delivered a loyalty system across a customer app, a station staff app and a head-office dashboard — running in production, in-region, with customers signing in by email today.`
- Meta panel: Role `Product and engineering lead` · Timeline `July 2026 – production August 2026` · Status `Live in production` · Evidence `Verified privately` with note `Client name withheld pending permission. Details available in a project review.`

### Numbers strip
`4` connected products · `60` API operations under one contract · `30` data models ·
`2` languages, Arabic-first · `31` days from kickoff to production.

### The situation
- Heading: `Every fill-up was a transaction. None of them was a relationship.`
- Before: `A driver filled up and left. Nothing told the brand they had been there before.` ·
  `Station staff had no way to record a loyalty purchase.` ·
  `Head office could not see which customers came back, or reward the ones who did.` ·
  `Complaints had no central place to be tracked and resolved.`
- After: `The customer shows a code on their phone. Points land against a verified purchase.` ·
  `Staff scan it on the station device and record the purchase.` ·
  `Head office sees every station, customer and transaction in one dashboard.` ·
  `Complaints arrive as tracked cases with an owner and a resolution.`

### What we delivered
- Heading: `Four products that behave like one.`
- 01 Customer app — `Arabic-first, right-to-left. Balance, one-time QR code, rewards, vouchers, station finder and complaints.`
- 02 Station staff app — `Scan, record the purchase, redeem a voucher — and safe to retry on a poor connection.`
- 03 Head-office dashboard — `Stations, staff, customers, transactions, complaints and offers, each role seeing only its own. Arabic and English.`
- 04 The platform beneath — `Points ledger, rules, offers, a retrying message queue, and the in-region cloud environment the apps run on.`

### The moment it happens
- Heading: `From code to points, at the pump.`
- Caption: `Illustrative screens in our own styling. The client's screens, branding and data are not shown.`
- Sample values only: balance `1,250`, code timer `00:58`, purchase `100.00`, points `+ 100`;
  ledger rows `Earn · Station A  + 100`, `Redeem · Reward  − 500`, `Reversal · Case 1001  + 100`,
  `Earn · Station B  + 40`. No "today" totals, no station counts.
- Steps: 01 `The customer shows a code` — `It expires, and it works exactly once, so it cannot be passed around or claimed twice.`
  02 `Staff scan and confirm` — `If the connection drops and they try again, the purchase still settles once.`
  03 `Head office sees it land` — `Every earn, redemption and correction in one ledger that reads like a statement.`

### How it fits together
- Heading: `One agreement in the middle, so nothing drifts apart.`
- Line: `Three applications, one shared definition of what the system does. Change it once and every client follows.`
- Diagram labels: Customer app · Staff app · Head-office dashboard → `One API contract — 60 operations`
  → Loyalty services · Points ledger (`Append-only, enforced by the database`) · Message queue
  (`Sign-in codes and notifications, retried`) → `In-region cloud environment`.

### Pull quote
`The product is built; the workflow is not. People end up bridging the gaps between systems that were never designed to work together.` — Mahmoud Attia, Kepler Dev

### Decisions that matter later
- Heading: `Loyalty points are money. They were built that way from day one.`
- `A balance nobody can quietly edit` — `When a customer disputes their points, there is an answer. Every correction is a new visible entry, so the history reads like a statement.` · How: `The ledger is append-only, enforced by the database rather than by convention.`
- `A code that works exactly once` — `A code cannot be shared and claimed twice, and a repeated tap on a bad connection never awards twice.` · How: `Single-use signed QR codes, plus an idempotency key on every write that moves value.`
- `Four products that cannot drift apart` — `One change reaches the customer app, the staff app and head office together.` · How: `A single API contract is the source of truth; client code is generated from it and CI fails the build when they disagree.`

### How it was built / Where it stands
- `A small team of developers, working with AI agents on flagship models.` — `Each workstream ran on its own branch against the shared contract, with review before merge. That is how four products reached production in about a month.`
- `Live in production, with the next phase named.` — `Customers register and sign in by email code today. App-store distribution and SMS codes are the next phase.`

### Closing
`Have a workflow that never became a product?` — `A project review is one conversation: your workflow, what would actually change it, and an honest answer about scope before anyone writes code.` — button `Start a project review` linking to `/contact`.
