# Kepler Dev — Current Status & Context

**Last updated:** 2026-09-17
**Live:** https://www.keplerdev.uk/ (Vercel auto-deploys on every push to `origin/master`)
**Repo:** `mahmouddattia/portfolio` on GitHub
**Owner:** Mahmoud (founder, sole accountable lead)

This document is the "you are here" map for anyone (including future agents) picking up the Kepler Dev agency site. It supersedes the build history in commit messages for the purpose of on-boarding.

The current continuation point is `docs/agency-rebuild/11-next-step-priority-review-2026-09-13.md`. The next three sessions defined there are: (1) proof decision, (2) conversion verification, (3) responsive polish and documentation. Treat this file as the historical baseline; read the priority review first when picking up work.

---

## 1. TL;DR

The site is now a coherent Global Atelier agency experience. Every route uses the same forest / mineral / pearl / bronze palette, the same Kepler Fold motif, the same geometric "K" wordmark, and the same atelier typography. The founder photo, working-context photograph, and a public fallback email are all live. The enquiry form is hardened (success only on API confirmation, focus on first invalid field, fallback email inside failure messages, non-JSON errors not misreported as network failures, optional `CONTACT_PROVIDER_ENDPOINT` override). Form delivery is configured but not yet end-to-end verified; the owner will run the live test and record the result.

| | State |
|---|---|
| Visual consistency across routes | **Done** — homepage + all inner pages on Global Atelier |
| Wordmark | **Done** — Concept A (Kepler Fold monogram) live, header + footer variants |
| Kepler Fold | **Done** — proper material study (5 PNG + 5 WebP, hero + 4 distinct fragments) |
| Mobile menu | **Done** — drawer scrolls, theme control reachable at 320/360/390/414 |
| Accessibility | **Done** — axe 0 definite violations; 18 incomplete (textured fold backgrounds) |
| Founder photo (Q-06) | **Done** — real portrait + working-context photograph live on `/mahmoud` |
| Public fallback email | **Done** — surfaced on `/contact` via `NEXT_PUBLIC_CONTACT_FALLBACK_EMAIL` |
| `/mahmoud` placeholder capsules | **Done** — permission-pending entries 02 and 03 removed; only the one supportable capsule remains |
| Enquiry form hardening | **Done** — success-after-confirm, focus-on-first-invalid, fallback-in-failure, non-JSON not misreported, optional provider endpoint override |
| Form delivery (Q-04) | **Configured but not end-to-end verified** — owner to run controlled live test |
| Real case studies (Q-02/Q-03) | **Blocked on user** — `publicCaseStudies` empty by design |
| Responsive polish (P1 batch) | **Not done** — documented in review 11 |
| Privacy notice + FAQ trim (P1 batch) | **Not done** — documented in review 11 |

The site is no longer a personal portfolio. It is positioned as a founder-led digital product studio for the GCC + international market. Q-02/Q-03 plus the controlled form-delivery test are the remaining blockers to qualified-lead conversion.

---

## 2. The transformation

### What it was (until mid-2026)
A single-page personal portfolio in `master`:
- Cyber/IDE aesthetic — Zinc-950 + violet/cyan accents
- Hero: "Mobile & Backend Developer · AI Integration Specialist"
- Contact section: `$300–$1,500` engagements
- "Day 7 — Final Delivery" promises
- Single client-rendered root, all content in `src/components/`
- Eleven projects in `src/lib/data.ts`, seven with `link: "#"` placeholders

### What it became
A five-route agency website on the same stack:
- `/` — Global Atelier hero, capabilities, approach, assurance, services, FAQ, final CTA
- `/work` — proof policy, no-public-work honest state
- `/work/[slug]` — case-study route (dynamic, but no public records yet)
- `/mahmoud` — founder route with real portrait and working-context photograph (placeholders removed)
- `/contact` — qualification form with verified mailto fallback, provider wiring ready
- `/ar` — Arabic RTL mirror of the homepage
- One reusable `RouteHero` component shared by EN/AR
- Header wordmark = the Kepler Fold miniaturised to 32 px

### The decision sequence
1. **2026-08-09** — Original audit (`docs/agency-rebuild/01-repo-and-live-site-audit.md`) found 5 critical conversion/trust problems.
2. **2026-08-09** — First rebuild pass: agency routes scaffolded, `publicCaseStudies` typed contract with empty default, contact form with safe "unavailable" state.
3. **2026-08-11** — Handoff redesign: paper/ink/coral visual system. Initially shipped.
4. **2026-08-13** — `08-global-atelier-preimplementation-design.md` selected **Option 3 — Global Atelier** over Quiet Confidence and Warm Modernism. The homepage moved to forest/mineral/pearl/bronze.
5. **2026-08-13** — `09-frontend-agent-global-atelier-brief.md` was the locked implementation brief for the visual direction.
6. **2026-08-16** — Deep UI audit with Playwright + axe-core (180 captures, 14 interactions). Found that the inner pages were still on the old coral palette, the wordmark was generic, the Fold asset was a flat graphic, the mobile menu was cut off.
7. **2026-08-16 → 2026-08-21** — Three remediation batches (A, B, C) shipped.
8. **2026-09-04** — Real founder portrait shipped on `/mahmoud` (commit `17c3b0a`).
9. **2026-09-05** — Working-context photograph added to `/mahmoud` (commit `d630814`).
10. **2026-09-13** — Priority review 11 reframed the remaining work as proof-and-conversion completion plus one bounded responsive-polish batch. That review is the current continuation point.
11. **2026-09-17** — `/mahmoud` placeholder capsules 02 and 03 removed (commit `1f08faf`); enquiry form hardened through commits `4762b96` and `5c8a1a1`. This file was reset in the same pass; see `progress.md` for the dated entry.

---

## 3. Design system: Global Atelier

Locked visual direction, not subject to reinterpretation without explicit user approval.

### Palette (defined in `src/app/global-atelier.css`)
| Token | Value | Role |
|---|---|---|
| `--atelier-forest` | `#07120F` | Primary dark canvas |
| `--atelier-forest-raised` | `#102925` | Raised dark field |
| `--atelier-mineral` | `#484A45` | Secondary material plane |
| `--atelier-pearl` | `#EEE9E0` | Light canvas / dark-mode text |
| `--atelier-pearl-300` | `#CEC7BC` | Secondary dark-mode text |
| `--atelier-ink` | `#202826` | Text on pearl |
| `--atelier-bronze` | `#A86F48` | CTA, rules, focus, restrained accents |
| `--atelier-bronze-300` | `#D4A47A` | Soft highlight only |
| `--atelier-bronze-deep` | `#985F3B` | Deeper bronze (default for kicker) |

**Rule:** bronze occupies less than ~12% of any viewport. It is an accent and focus signal, not a background.

### Typography (defined in `src/app/layout.tsx`)
- **Manrope** — `--font-atelier-display`, geometric display for headlines
- **Inter** — `--font-atelier-body`, neutral humanist for body
- **IBM Plex Sans Arabic** — `--font-atelier-arabic`, for Arabic locale

Headlines use `clamp(3rem, 4.85vw, 4.85rem)` desktop; max-inline-size 12.5ch on hero, 14ch on route heroes.

### The Kepler Fold (proprietary motif)
Two precise material planes (forest + mineral) meeting at a calm central aperture (pearl), with a single thin bronze edge along the seam. Subtle mineral grain on the gray plane only; the forest stays matte.

Asset family under `public/media/kepler-fold/`:
- `hero-fold.png` / `.webp` — 1800×1013, 16:9
- `capability-fragment.png` / `.webp` — 1200×300, 4:1, top-right bronze edge
- `approach-fragment.png` / `.webp` — 1200×300, 4:1, central diagonal seam
- `assurance-fragment.png` / `.webp` — 800×800, 1:1, bottom edge visible
- `final-cta-fragment.png` / `.webp` — 1200×600, 2:1, fold peeking from right

12 alternative candidates and 5 intermediate 4K source renders are in `_candidates/` and `_build/` subfolders, kept out of git via `.gitignore`. Promote a different candidate by moving it to the folder root and re-committing.

### Wordmark
Concept A — the Fold as monogram. Two angled material planes (currentColor + mineral) meeting at a vertical seam, with a calm pearl aperture and a bronze hairline. The text "KEPLER DEV" sits to the right in tracked uppercase, system sans. Lives at `public/brand/wordmark-a-mark.svg` (152×32 header) and `public/brand/wordmark-a-footer.svg` (116×24 footer).

Concepts B (Orbit K) and C (Tactile stamp K) were created during the design pass and discarded; they live only in the audit artifacts at `artifacts/audit-2026-08-16/wordmark-*.png`.

### Bilingual
English is the only shipped language. Arabic is a real RTL composition: the layout flips, the Fold moves to the inline-start side, the kicker/lead/CTA copy translates, IBM Plex Sans Arabic is the body face. Arabic copy in `/ar/page.tsx` is marked **provisional** until native-speaker review.

### Motion
All non-essential animation honors `prefers-reduced-motion`. Drawer slide-in is the main remaining motion. No smooth-scroll hijacking, no custom cursor, no continuous decoration.

---

## 4. The 2026-08-16 audit (the trigger for Batches A–C)

Full report: `artifacts/audit-2026-08-16/AUDIT-REPORT.md` (~600 lines, 5 P0 + 5 P1 + 5 P2 + 6 P3 findings).

The headline gaps that drove the remediation work:

| ID | Finding | Status |
|---|---|---|
| **P0-1** | Inner pages still on coral handoff, not Global Atelier | **Fixed (Batch A)** |
| **P0-2** | Mobile menu theme control cut off at viewport | **Fixed (Batch C)** — drawer scrolls |
| **P0-3** | Arabic hero fold on wrong side, blocking headline into 5 narrow lines | **Fixed (Batch A)** — `[dir="rtl"] .hero-fold` override |
| **P0-4** | Kicker / Arabic capability number fail WCAG AA | **Fixed (Batch A)** — bronze-deep / per-section overrides |
| **P0-5** | `/contact` blocks every CTA with no fallback | **Hardened (Batches A–C + commits 4762b96/5c8a1a1)** — `NEXT_PUBLIC_CONTACT_FALLBACK_EMAIL` env + mailto in both states; Formspree route wired with success-after-confirm, focus-on-first-invalid, fallback inside failure messages, non-JSON errors not misreported as network failures, optional `CONTACT_PROVIDER_ENDPOINT` override. End-to-end delivery verification still owned by Mahmoud |
| **P1-1** | Kepler Fold weaker than design target (flat graphic) | **Fixed (Batch B)** — real material study |
| **P1-2** | Fold fragments look like rectangular blocks | **Fixed (Batch B)** — 4 distinct crops |
| P1-3 | Homepage still 6 782 px on mobile 320 (Batch 4 of audit plan) | Not done |
| P1-4 | `/work` too thin | Not done |
| P1-5 | Hero type wraps to 4 lines on desktop | Not done |
| P1-6 | Hero fold intrudes into kicker at 1024 | Not done |
| P2-1 | Inner-page footer doesn't match homepage | Fixed by Batch A (one shell) |
| P2-3 | Lucide capability icons look similar at small sizes | Not done |
| P3-4 | KeplerFold LCP lazy-loaded | **Fixed (Batch A)** — eager by default |
| P3-5 | Fold fragment parents no `block-size`, fill image collapses | **Fixed (Batch A)** — explicit `block-size` |
| P3-6 | `middleware.ts` deprecated in Next 16 | **Fixed (Batch A)** — renamed to `proxy.ts` |
| P3-1 | `kepler-dev-horizontal-reverse.svg` width/height warning | **Fixed (Batch A)** — new wordmark uses explicit dims |

Audit metrics at the time: 5 definite axe `color-contrast` violations, 12 incomplete, 38 console warnings, 0 failed requests. Post-Batch-A: 0 definite, 18 incomplete (all over textured fold), 0 console warnings.

The audit harness lives at `artifacts/audit-2026-08-16/`:
- `run-audit.js` — re-runnable Playwright + axe harness
- `analyze.js` — metrics aggregator
- `run-audit-batch-a.js` — focused post-Batch-A re-run
- `live/`, `local/`, `interactions/` — 180 + 96 captures
- `evidence/audit-summary.json` — full per-capture metrics

Re-running: `cd artifacts/audit-2026-08-16 && node run-audit.js && node analyze.js`. Point at a different dev port by editing the `TARGETS` array in `run-audit.js`.

---

## 5. What was shipped (recent commit log)

```
bf63a1d  Merge portfolio-task-enquiry: harden enquiry form states
5c8a1a1  fix(contact): remove QA debug hooks from shipped code
4762b96  fix(contact): harden enquiry form states
1f08faf  feat(mahmoud): drop permission-pending placeholder capsules 02 and 03
d630814  feat: add working-context photograph to /mahmoud
17c3b0a  feat: add real founder portrait to /mahmoud hero
b50646e  feat: redesign /mahmoud to 8-section editorial profile
6d5a075  docs: add agency rebuild context document and folder cleanup plan
a84d242  chore: gitignore one-off audit dumps and remove on-disk copies
b0461df  chore: compress homepage + safe-area drawer
f4ef8e9  Batch B + C: new Kepler Fold material study + mobile drawer fix
19eee26  Cleanup: remove unused B/C wordmark + legacy coral marks
09ae751  Wordmark A: Kepler Fold monogram, replaces thin geometric K
febe7ba  Batch A: inner pages + shell on Global Atelier, full system swap
```

### bf63a1d / 5c8a1a1 / 4762b96 (enquiry hardening)
- `src/components/contact-form.tsx` — success state only after the API confirms (`response.ok`); client validation moves focus to the first invalid field while keeping the error summary visible; server-returned validation errors keep focus on the first invalid field and the summary focus useEffect tracks status transitions so it never steals focus back mid-correction; provider and network failure preserve the entered values and embed the fallback email inside the failure message itself; `response.json()` parsing is wrapped in a try/catch so a non-JSON or empty error body from the API is not misreported as a network failure
- `src/app/api/contact/route.ts` — forwards to `config.providerUrl`; rejects with 503 when no provider URL is configured; the QA-only debug branches were removed in `5c8a1a1` so shipped traffic cannot drive non-JSON or empty error responses through the API
- `src/lib/contact-config.ts` — exposes `CONTACT_PROVIDER_ENDPOINT` as an optional server-side override for the provider URL, defaulting to the real Formspree URL when unset and validating the `http(s)` scheme

### 1f08faf (placeholder removal)
- Removed the two `permission pending` experience capsules from `src/app/mahmoud/page.tsx`; only the one supportable capsule (`Connected loyalty and operations platform`) renders now, with the `private engagements are not listed publicly` footnote preserved

### d630814 / 17c3b0a (founder photographs)
- Real founder portrait shipped on `/mahmoud` hero (`public/brand/founder-portrait.{jpg,webp}` + mobile variant)
- Working-context photograph added as the editorial interlude between Selected Experience and Personal Role (`public/brand/founder-working-context.webp` + mobile variant)

### f4ef8e9 (Batch B + C)
- 10 new Kepler Fold assets under `public/media/kepler-fold/` (5 PNG + 5 WebP)
- `KeplerFold` default src → new hero, default dimensions updated
- 4 fragment call sites in `page.tsx` + 4 in `ar/page.tsx` now pass per-section src
- `global-atelier.css` — mobile drawer `overflow-y: auto` + `max-block-size: 100svh` + reduced gap
- `kepler-fold-global-atelier-v1.png` removed
- `.gitignore` updated to keep `_candidates/` and `_build/` out of git

### 19eee26 (Cleanup)
- Removed `wordmark-b-*.svg`, `wordmark-c-*.svg` (unused redesign candidates)
- Removed `kepler-dev-horizontal-primary.svg`, `kepler-dev-horizontal-reverse.svg` (legacy coral)

### 09ae751 (Wordmark A)
- New `wordmark-a-mark.svg` + `wordmark-a-footer.svg`
- `BrandMark` takes `variant` prop, returns full lockup
- Removed inline `<span>KEPLER DEV</span>` from header, footer, mobile drawer
- CSS: replaced forced 32×32 IMG dimensions with the lockup's actual aspect ratio

### febe7ba (Batch A)
- New `RouteHero` shared by EN/AR
- `/work`, `/mahmoud`, `/contact`, `/ar` restructured to atelier system
- P0-3 RTL fold flip
- P0-4 kicker contrast fix
- P3-4 fold eager-loaded
- P3-5 explicit block-size on fragment parents
- P3-6 `middleware.ts` → `proxy.ts`
- P0-5 contact mailto fallback
- `.env.example` with safe placeholder fallback
- New `founder-portrait-placeholder.svg`

---

## 6. Current file map (only the live paths)

### Routes
- `src/app/page.tsx` — homepage (hero → capabilities → approach → assurance → services → FAQ → final CTA)
- `src/app/work/page.tsx` — proof policy + no-public-work honest state
- `src/app/mahmoud/page.tsx` — founder route with real portrait, working-context photograph, and one supportable experience capsule
- `src/app/contact/page.tsx` — qualification form wired to Formspree via `/api/contact`; the live form is configured but the controlled end-to-end delivery test is still owed
- `src/app/ar/page.tsx` — Arabic RTL homepage (provisional, native review pending)
- `src/app/api/contact/route.ts` — server route, forwards to the configured Formspree URL with rate limiting, validation, and recoverable failure messages
- `src/proxy.ts` — Next 16 middleware

### Components
- `src/components/site-shell.tsx` — `Header`, `Footer`, `BrandMark` (header + footer variants)
- `src/components/route-hero.tsx` — reusable atelier hero used by `/work`, `/mahmoud`, `/contact`, `/ar`
- `src/components/kepler-fold.tsx` — fold image, takes `src` + `priority` props, eager by default
- `src/components/contact-form.tsx`, `work-grid.tsx`, `theme-provider.tsx` — supporting
- `src/components/kepler-fold.tsx` (the visual motif) — already covered

### Styles
- `src/app/globals.css` — original baseline + correction sprint + coral handoff. Mostly historical; the atelier system overrides it.
- `src/app/global-atelier.css` — atelier tokens (`--atelier-*`), header, drawer, wordmark sizing, focus styles, RTL overrides
- `src/app/global-atelier-home.css` — homepage + atelier route system, the bulk of the visual rules

### Content
- `src/lib/content.ts` — `CaseStudy` type contract, `publicCaseStudies` (currently empty by design), `offers`, `faqs`
- `src/lib/contact-config.ts` — reads `NEXT_PUBLIC_CONTACT_FALLBACK_EMAIL` + `CONTACT_FALLBACK_EMAIL`

### Assets
- `public/brand/wordmark-a-mark.svg` (152×32 header)
- `public/brand/wordmark-a-footer.svg` (116×24 footer)
- `public/brand/founder-portrait.jpg` + `founder-portrait.webp` + `founder-portrait-mobile.webp` (real portrait shipped in `17c3b0a`)
- `public/brand/founder-working-context.webp` + `founder-working-context-mobile.webp` (working-context photograph shipped in `d630814`)
- `public/brand/founder-portrait-placeholder.svg` (retained only for compatibility with any internal reference that still points to it)
- `public/media/kepler-fold/hero-fold.{png,webp}` + 4 fragment pairs
- `public/media/kepler-fold-global-atelier-v1.png` — removed

### Config
- `next.config.ts` — defaults
- `.env.example` — non-secret placeholders for `CONTACT_PROVIDER`, `FORMSPREE_FORM_ID`, `CONTACT_FALLBACK_EMAIL`, `NEXT_PUBLIC_CONTACT_FALLBACK_EMAIL`

---

## 7. Open items (ranked by impact)

The priority review 11 (`docs/agency-rebuild/11-next-step-priority-review-2026-09-13.md`) is the current continuation point. The P0–P2 items below come from that review and the previous audit. Items that have already shipped (real founder photograph, placeholder-capsule removal, enquiry hardening) are documented in section 5 above and are not repeated here.

### Q-04 — Form delivery (configured, not end-to-end verified)
**Status:** Formspree is the agreed provider. The form, API route, public fallback email, success-after-confirm, focus-on-first-invalid, fallback-in-failure, and non-JSON error handling are all shipped. The form renders correctly in both its available and unavailable states. The controlled live test has not been run yet: actual mailbox delivery and the recoverable failure path still need one end-to-end verification by the owner.
**What's needed:** One controlled live enquiry, confirming (a) arrival at the inbox, (b) success state only after delivery, (c) validation focus on the first invalid field, (d) provider failure preserves entered details and exposes the fallback email, and (e) the public fallback becomes a domain-branded address such as `hello@keplerdev.uk` when available. The form should not be reported as `verified-public` until this passes.

### Q-02 / Q-03 — Real case studies
**Status:** `publicCaseStudies` is empty by design. `gLiter`, `QuickChargingPOS`, and `HS VPN` are the shortlist candidates. `Faseeh AI Keyboard` vs `Aksira` is open. Only one capsule (the connected loyalty and operations platform) is supportable on `/mahmoud` until client permission is resolved.
**What's needed:** User picks the first 2–3 case studies, confirms public name + role + team context + permission + screenshot permission + evidence state per project. These get seeded into `caseStudies` in `src/lib/content.ts`. The `publicCaseStudies` filter handles the rest automatically. Until then, `/work` is the honest empty state.

### Privacy notice + FAQ trim (P1 — review 11)
Replace the personal Gmail fallback with a Kepler Dev domain address when possible. Add a short, plain-language privacy notice linked beside the enquiry consent text, with appropriate legal review for the markets being served. Remove FAQ items that do not materially reduce buying uncertainty; reclaim the space for real evidence once available.

### P1-3 — Homepage compression
The homepage is 6 782 px tall on mobile 320 (target: 25–35% less). The plan in `docs/agency-rebuild/07-audit-remediation-plan.md` Batch 4 is:
- Merge repeated problem/system/process/value statements
- Drop approach body copy from 4 paragraphs to 2 lines
- Remove the pearl/forest split on the assurance section if the right column is empty without public work
- Aim for ~5 000 px on mobile

### P1-4 — `/work` is too thin
1 700 px on desktop feels under-developed. Needs an editorial intro panel + a placeholder for 2–3 case-study cards. The data is empty by design (Q-02), so the layout needs to support 2–3 cards without looking sparse.

### P1-5 — Hero type wraps to 4 lines on desktop
The design target is 3 lines. Tighten the type ramp or shorten the kicker area.

### P1-6 — Hero fold intrudes into kicker at 1024
The fold's left edge enters the kicker line. Either push the fold further right or cap the kicker column at a smaller max-width.

### P2-3 — Lucide capability icons
`Compass`, `Box`, `Layers3`, `Heart` look similar at small sizes. Replace with distinct bronze glyphs as in the design target (compass needle, experience cube, layers stack, heart shape).

### Pre-existing 3 axe `color-contrast` violations on `/contact`
The verified-fallback `<a href="mailto:...">` link is `#985F3B` on `#EEE7E0` = 4.24:1 (needs 4.5:1 for AA). Quick fix: scope a darker color to `.atelier-contact-unavailable a[href^="mailto:"]` or deepen the global `--atelier-bronze-deep` token. Flagged by Batch C; not in its scope.

### Mobile drawer fits without scroll
At 390 px the bottom of the theme select sits near the viewport edge. Users can scroll to see it (Batch C fix), but ideally the entire stack fits. One more pass to reduce 0.25rem of vertical gap or shrink the wordmark in the drawer.

---

## 8. How to continue

**Start here:** review 11 (`docs/agency-rebuild/11-next-step-priority-review-2026-09-13.md`) is the current continuation point. It defines the three next sessions — proof decision, conversion verification, responsive polish and documentation — and ranks every remaining open item.

The work pattern that worked for Batches A–C is:

1. **Read review 11** at `docs/agency-rebuild/11-next-step-priority-review-2026-09-13.md` for the live P0–P2 list, then this file for the historical baseline
2. **Read the audit report** at `artifacts/audit-2026-08-16/AUDIT-REPORT.md` for the underlying P0–P3 findings that produced the studio baseline
3. **Read the design system spec** at `docs/agency-rebuild/08-global-atelier-preimplementation-design.md`
4. **Pick a single batch** (or a small one) with explicit acceptance criteria
5. **Dispatch in parallel** when the work touches disjoint files:
   - `visual-designer` for assets (SVG, image generation, design choices)
   - `frontend-craftsman` for code (component, CSS, integration)
6. **Require** `npm run lint` + `npx tsc --noEmit` + `npm run build` to pass before "done"
7. **Re-run the audit harness** on the post-batch build to compare to baseline
8. **Stage explicitly** (don't `git add .` — pick files), commit with descriptive message
9. **Push to origin** — Vercel auto-rebuilds

The user (Mahmoud) merges in their own flow. Workers do not commit by default; the orchestrator (Kepler Agent OS) commits after integration review.

Available agents (registered, Kepler Agent OS team):
- `web-lead-engineer` — overall engineering, documentation reset, handoff
- `frontend-craftsman` — production code, design system implementation
- `visual-designer` — assets, mockups, tokens
- `interaction-architect` — IA, flows, a11y specs
- `design-researcher` — research, audits
- `quality-release-engineer` — review gate for completed work
- `coder`, `general` — fallback

---

## 9. Conventions worth preserving

- **AI-assisted commits include a `Co-Authored-By:` trailer** identifying the assistant (e.g. `Co-Authored-By: MiniMax M3 via OpenCode`); the owner remains the primary author
- **LF→CRLF auto-conversion** is the Windows git config; expect the warning on every commit. Don't fight it.
- **`public/media/kepler-fold/_candidates/` and `_build/`** are git-ignored intermediate work. Promote a different candidate by moving it to the folder root
- **atelier tokens** live in `src/app/global-atelier.css` only — don't re-define them in `global-atelier-home.css` or per-component CSS
- **`KeplerFold` defaults** to the new hero; the four section fragments are explicit `src` props
- **`RouteHero`** is the shared hero between EN routes and `/ar`; don't hand-roll another hero
- **`publicCaseStudies` filter** in `src/lib/content.ts` is the publication gate. A case study only becomes public when `publicationStatus === "public"` + every result has `proofState !== "unverified"` + both permission fields are not "pending"
- **Arabic copy is provisional** until native-speaker review is recorded. Don't ship real copy changes to `/ar/page.tsx` without a reviewer
- **`KeplerFold` is the LCP** on the homepage — `priority` and `loading="eager"` are required, never lazy
- **`getContactConfig()`** in `src/lib/contact-config.ts` is the single source of truth for the provider URL, fallback email, and `enabled` flag. Read it; do not duplicate the logic

---

## 10. Audit-evidence directory (local, untracked)

`artifacts/audit-2026-08-16/` is the full evidence package for this rebuild cycle:
- `AUDIT-REPORT.md` — the 2026-08-16 audit findings (master reference)
- `BATCH-A-WORKER-BRIEF.md`, `WORDMARK-REDO-BRIEF.md`, `BATCH-B-WORKER-BRIEF.md`, `BATCH-C-WORKER-BRIEF.md` — the worker briefs
- `batch-A-after/`, `batch-B-after/`, `batch-BC-after/`, `batch-C-after/`, `wordmark-after/`, `wordmark-rationale.md` — captures and design rationale
- `run-audit.js`, `analyze.js`, `capture-*.cjs`, `batch-A-diff.js` — re-runnable harness
- `live/`, `local/`, `interactions/` — 180 + 96 + 14 capture files from the original 2026-08-16 sweep

This directory is on disk and `.gitignore`d at the audit level (via the existing `artifacts/qa/*-profile/` pattern). Local evidence, not part of the deploy.

---

## 11. Quick links

- **Current continuation point:** `docs/agency-rebuild/11-next-step-priority-review-2026-09-13.md`
- **Live site:** https://www.keplerdev.uk/
- **Vercel project:** (Vercel dashboard)
- **GitHub:** https://github.com/mahmouddattiaa/portfolio
- **Audit report:** `artifacts/audit-2026-08-16/AUDIT-REPORT.md`
- **Design spec:** `docs/agency-rebuild/08-global-atelier-preimplementation-design.md`
- **Implementation brief:** `docs/agency-rebuild/09-frontend-agent-global-atelier-brief.md`
- **Remediation plan (predecessor):** `docs/agency-rebuild/07-audit-remediation-plan.md`
- **Progress log:** `docs/agency-rebuild/progress.md`
- **Locked decisions log:** `docs/agency-rebuild/decisions.md`

---

*If anything in here is wrong, fix the file and re-commit. If a Batch is reopened, append the new evidence under `artifacts/audit-2026-08-16/` and reference it from the relevant section above.*
