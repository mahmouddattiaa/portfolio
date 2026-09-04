# Kepler Dev — Current Status & Context

**Last updated:** 2026-08-28
**Live:** https://www.keplerdev.uk/ (Vercel auto-deploys on every push to `origin/master`)
**Repo:** `mahmouddattia/portfolio` on GitHub
**Owner:** Mahmoud (founder, sole accountable lead)

This document is the "you are here" map for anyone (including future agents) picking up the Kepler Dev agency site. It supersedes the build history in commit messages for the purpose of on-boarding.

---

## 1. TL;DR

The site is now a coherent Global Atelier agency experience. Every route uses the same forest / mineral / pearl / bronze palette, the same Kepler Fold motif, the same geometric "K" wordmark, and the same atelier typography. Most of the conversion-critical issues from the 2026-08-16 audit are fixed and live.

| | State |
|---|---|
| Visual consistency across routes | **Done** — homepage + all inner pages on Global Atelier |
| Wordmark | **Done** — Concept A (Kepler Fold monogram) live, header + footer variants |
| Kepler Fold | **Done** — proper material study (5 PNG + 5 WebP, hero + 4 distinct fragments) |
| Mobile menu | **Done** — drawer scrolls, theme control reachable at 320/360/390/414 |
| Accessibility | **Done** — axe 0 definite violations; 18 incomplete (textured fold backgrounds) |
| Homepage compression (Batch D) | **Not done** — still 6 782 px on mobile 320 |
| Real case studies (Q-02/Q-03) | **Blocked on user** — `publicCaseStudies` empty by design |
| Live contact provider (Q-04) | **Blocked on user** — `.env.example` has placeholder, no Formspree ID |
| Founder photo (Q-06) | **Blocked on user** — placeholder SVG says "PHOTO PENDING APPROVAL" |

The site is no longer a personal portfolio. It is positioned as a founder-led digital product studio for the GCC + international market. Q-02/Q-03 and Q-04 are the only remaining blockers to qualified-lead conversion.

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
- `/mahmoud` — founder route with photo-pending placeholder
- `/contact` — qualification form with verified mailto fallback
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
| **P0-5** | `/contact` blocks every CTA with no fallback | **Partially fixed (Batch A)** — `NEXT_PUBLIC_CONTACT_FALLBACK_EMAIL` env var + mailto in both states; Formspree still needs Q-04 |
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

## 5. What was shipped (commit log on `master`)

```
f4ef8e9  Batch B + C: new Kepler Fold material study + mobile drawer fix
19eee26  Cleanup: remove unused B/C wordmark + legacy coral marks
09ae751  Wordmark A: Kepler Fold monogram, replaces thin geometric K
febe7ba  Batch A: inner pages + shell on Global Atelier, full system swap
b4dba20  Previous: implement global atelier homepage styling
2be598c  Previous: document current-state implementation audit
87c311c  Previous: refine homepage flow and add Karve reference audit
```

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
- `src/app/mahmoud/page.tsx` — founder route with photo-pending placeholder
- `src/app/contact/page.tsx` — qualification form (intentionally disabled until Q-04)
- `src/app/ar/page.tsx` — Arabic RTL homepage (provisional, native review pending)
- `src/app/api/contact/route.ts` — server route, ready for Formspree (Q-04)
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
- `public/brand/founder-portrait-placeholder.svg` (600×750 honest empty state)
- `public/media/kepler-fold/hero-fold.{png,webp}` + 4 fragment pairs
- `public/media/kepler-fold-global-atelier-v1.png` — removed

### Config
- `next.config.ts` — defaults
- `.env.example` — non-secret placeholders for `CONTACT_PROVIDER`, `FORMSPREE_FORM_ID`, `CONTACT_FALLBACK_EMAIL`, `NEXT_PUBLIC_CONTACT_FALLBACK_EMAIL`

---

## 7. Open items (ranked by impact)

### Q-04 — Live contact provider (P0-5 partial)
**Status:** Formspree is the agreed provider. The form, API route, and mailto fallback are wired. What's missing is the form ID and a verified fallback email.
**What's needed:** User provides `FORMSPREE_FORM_ID` (and a real `CONTACT_FALLBACK_EMAIL` to replace the `project-review@keplerdev.example` placeholder), set as Vercel environment variables.
**Once provided:** Set `CONTACT_PROVIDER=formspree` + `FORMSPREE_FORM_ID` → form goes live. Replace the public fallback placeholder with a real address.

### Q-02 / Q-03 — Real case studies
**Status:** `publicCaseStudies` is empty by design. `gLiter`, `QuickChargingPOS`, and `HS VPN` are the shortlist candidates. `Faseeh AI Keyboard` vs `Aksira` is open.
**What's needed:** User picks the first 2–3 case studies, confirms public name + role + team context + permission + screenshot permission + evidence state per project. These get seeded into `caseStudies` in `src/lib/content.ts`. The `publicCaseStudies` filter handles the rest automatically.

### Q-06 — Founder photo
**Status:** Honest "PHOTO PENDING APPROVAL" placeholder is live on `/mahmoud`.
**What's needed:** User provides a current portrait + permission + the approved bio + résumé file.

### P1-3 — Homepage compression (Batch D)
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

The work pattern that worked for Batches A–C is:

1. **Read the audit report** at `artifacts/audit-2026-08-16/AUDIT-REPORT.md` for the P0–P3 priority list
2. **Read the design system spec** at `docs/agency-rebuild/08-global-atelier-preimplementation-design.md`
3. **Pick a single batch** (or a small one) with explicit acceptance criteria
4. **Dispatch in parallel** when the work touches disjoint files:
   - `visual-designer` for assets (SVG, image generation, design choices)
   - `frontend-craftsman` for code (component, CSS, integration)
5. **Require** `npm run lint` + `npx tsc --noEmit` + `npm run build` to pass before "done"
6. **Re-run the audit harness** on the post-batch build to compare to baseline
7. **Stage explicitly** (don't `git add .` — pick files), commit with descriptive message
8. **Push to origin** — Vercel auto-rebuilds

The user (Mahmoud) merges in their own flow. Workers do not commit by default; the orchestrator (Mavis) commits after integration review.

Available agents (registered, Mavis's team):
- `frontend-craftsman` — production code, design system implementation
- `visual-designer` — assets, mockups, tokens
- `interaction-architect` — IA, flows, a11y specs
- `design-researcher` — research, audits
- `coder`, `general` — fallback

---

## 9. Conventions worth preserving

- **No AI co-author trailer** on commit messages
- **LF→CRLF auto-conversion** is the Windows git config; expect the warning on every commit. Don't fight it.
- **`public/media/kepler-fold/_candidates/` and `_build/`** are git-ignored intermediate work. Promote a different candidate by moving it to the folder root
- **atelier tokens** live in `src/app/global-atelier.css` only — don't re-define them in `global-atelier-home.css` or per-component CSS
- **`KeplerFold` defaults** to the new hero; the four section fragments are explicit `src` props
- **`RouteHero`** is the shared hero between EN routes and `/ar`; don't hand-roll another hero
- **`publicCaseStudies` filter** in `src/lib/content.ts` is the publication gate. A case study only becomes public when `publicationStatus === "public"` + every result has `proofState !== "unverified"` + both permission fields are not "pending"
- **Arabic copy is provisional** until native-speaker review is recorded. Don't ship real copy changes to `/ar/page.tsx` without a reviewer
- **`KeplerFold` is the LCP** on the homepage — `priority` and `loading="eager"` are required, never lazy

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

- **Live site:** https://www.keplerdev.uk/
- **Vercel project:** (Vercel dashboard)
- **GitHub:** https://github.com/mahmouddattiaa/portfolio
- **Audit report:** `artifacts/audit-2026-08-16/AUDIT-REPORT.md`
- **Design spec:** `docs/agency-rebuild/08-global-atelier-preimplementation-design.md`
- **Implementation brief:** `docs/agency-rebuild/09-frontend-agent-global-atelier-brief.md`
- **Remediation plan (predecessor):** `docs/agency-rebuild/07-audit-remediation-plan.md`
- **Locked decisions log:** `docs/agency-rebuild/decisions.md`

---

*If anything in here is wrong, fix the file and re-commit. If a Batch is reopened, append the new evidence under `artifacts/audit-2026-08-16/` and reference it from the relevant section above.*
