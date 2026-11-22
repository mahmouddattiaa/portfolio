# Kepler Dev Stage 4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved Stage 1–3 agency site and produce reproducible Stage 4 evidence before preparing the Stage 5 handoff.

**Architecture:** Evolve the existing Atelier components and styles. Keep one typed project registry, one shared homepage renderer with EN/AR content, shared semantic theme tokens, and the existing server-side contact gateway. Preserve the dedicated Glitre and HS VPN presentations; add a reusable, project-specific presentation for the four remaining flagships.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion, Formspree, Vercel Analytics. Use Playwright for browser verification and zero-dependency Python for the implementation audit.

**Spec:** `docs/stage-3-design-critique-and-locked-spec.md` is the primary implementation authority. Checkpoint 2 is approved in the current user request. This plan does not reopen the visual design.

## Global constraints

- Repository: `/home/kepler/Desktop/Kepler/Projects/portfolio`. Baseline: clean `master`, `d23a9a2`, six commits ahead of its tracked remote at preflight.
- Preserve the courtyard tree photography, floating glass pill navigation, asymmetric homepage work sections, rectangular work cards, and existing Atelier typography.
- Use standalone studio voice throughout. Preserve the temporary fallback email only for contact purposes. Keep the permanent legacy-personal-route redirect to `/studio`; it already exists in `next.config.ts`.
- Homepages transition from the four-step approach directly into services. Neither homepage contains an inline studio band. `/studio` stays a dedicated route.
- Exactly six flagship case studies and seven showcase builds. Category membership overlaps and produces counts `13 / 8 / 5 / 5 / 5`.
- Adopt `--kd-*`, Light accent `#6F4224`, Dark accent `#D4A47A`, Inter UI labels, and a 14px small-text floor. Use Manrope for Latin headings and IBM Plex Sans Arabic for Arabic.
- Arabic uses full copy parity, logical CSS, zero letter spacing, nonbreaking Latin product names, isolated Latin/numeric tokens, and mirrored directional arrows.
- Never modify the separate Personal Portfilio repository. Never commit `.env.local`. No commit, remote push, deployment, or live contact submission is included in this execution plan.
- Keep approved Stage 1–3 documents and verified reference PNGs intact. Record compression substitutions in Stage 4 evidence rather than rewriting historical source evidence.
- A successful build or audit alone does not establish visual fidelity, accessibility, delivery of an email, or independent review acceptance.

## Binding owner amendments (2026-11-22)
These four approved amendments override conflicting plan details:
- Replace all five pending-approval customer placeholders with five illustrative RTL device screens; add four illustrative POS steps to the Glitre worker route matching verified pages 10 and 11.
- Work directly in the approved local checkout on `stage-4-agency-implementation`; leave `.env.local` untouched.
- Scan edited/new `src/content/**`, `src/lib/content.ts`, `src/app/**`, and rendered `src/components/**` for personal attribution and the canonical banned AI-copy words in `roles/conversion-copywriter/scripts/copy_audit.py`.
- Verify Focus Ritual WebP and served references before removing the old oversized PNG from `public`; historical documents may retain their original evidence paths.

## Preflight findings

The existing app has two public case studies, three commercial offers, a separate older Arabic homepage, and an expanded contact intake. The dynamic case-study route currently depends on `getPresentation`; extending the registry alone would leave new flagships without valid presentations. The current screenshot utility, `scripts/shoot.mjs`, points to a Windows Chrome executable and cannot serve as the Linux Playwright gate unchanged.

The local Hub CLI works using the AgentOS source and existing database below. A new orchestrator session bootstrapped successfully, with no assignment. Its project record still has a legacy Windows path and older portfolio tasks; none is a Stage 4 assignment. Do not claim unrelated ready tasks or revive blocked historical work. Record the Stage 4 assignment and this plan against the correct agency work before modifying task-owned files.

```text
AgentOS source: /home/kepler/Desktop/Kepler/AgentOS/src
Hub database: /home/kepler/Desktop/Kepler/AgentOS/data/kepler-hub.db
Orchestrator session: session_a91602322cf045b8a72932e8f5eeb4b0
```

## Review focus

1. Unknown, repeated, and browser-back `?category=` values must leave the catalog in a valid, announced state.
2. Missing, malformed, or stale `?offer=` values must leave a usable, editable engagement select. A provider failure must preserve all entered values.
3. Long Latin titles, email addresses, and USD ranges must reflow correctly in Arabic at 320px and at 200% text size.
4. Direct navigation to each new flagship and every Glitre child route must return a complete page with correct metadata, rather than a registry entry followed by a 404 or empty presentation.
5. Theme changes, reduced motion, menu/dialog keyboard use, and returning focus must work after client-side navigation as well as on an initial load.

## Task 1 — Role kit, assignment, and reproducible checks

**Create:**

- `roles/agency-frontend-engineer/ROLE.md` — under 60 lines; supplied input paths, scope, source precedence, four progressive steps, and verification commands.
- `roles/agency-frontend-engineer/START-SESSION.md` — exact four-line implementation dispatch.
- `roles/agency-frontend-engineer/templates/stage-4-implementation-results.template.md` — scope, file map, evidence, limitations, independent review, and Stage 5 readiness.
- `roles/agency-frontend-engineer/skills/implementation-contract/SKILL.md` — compact local contract for the approved stage, without duplicating the source blueprints.
- `roles/agency-frontend-engineer/scripts/implementation_audit.py` — zero-dependency deterministic source/media/evidence checks.
- `scripts/stage-4/verify-ui.mjs` — production-browser assertions, captures, and JSON evidence.

**Produces:** `implementation_audit.py --scan` for iterative source checks, and `--verify <report>` for the final source-plus-evidence gate. Failed or missing evidence exits nonzero; a Markdown PASS string alone is insufficient.

- [ ] Resolve the Stage 4 Hub task, lease, owned paths, and review route. Keep the current user approval attached as the scope authority. Use the approved checkout and record its path and branch.
- [ ] Build the role kit before product edits, following the existing role-kit structure. Dispatch bounded owned paths; prevent concurrent edits to shared content and CSS contracts.
- [ ] Add audit checks for canonical slugs/categories, four offers, EN/AR key parity, referenced media existence and case, compression limits, video metadata loading, structured data types, and required routes.
- [ ] Add browser-evidence validation requiring every planned route/theme/viewport combination, zero horizontal overflow, managed artifacts with matching hashes/times, and explicit website-to-design visual comparisons. Source-only checks must not certify rendered contrast or screenshots.
- [ ] Run the audit against the baseline and save the expected failures. Run lint/build once for baseline evidence, retaining exit codes and bounded log files.

## Task 2 — Slice A: Semantic CSS and accessible shell states

**Modify:** `src/app/globals.css`, `global-atelier.css`, `global-atelier-home.css`, `home-v2.css`, `work-v2.css`, `services-v2.css`, `case-study.css`, and Glitre-specific CSS where it overrides shared colors. Inspect `refinement.css` for competing overrides.

**Consumes:** design-system §§3, 5–8; Arabic spec §4; verified Light/Dark reference images. **Produces:** shared tokens and stable existing class names for downstream route work.

- [ ] Add the exact Light/Dark semantic token values from the design-system compatibility snippet and map Tailwind v4 `@theme` to them.
- [ ] Replace competing color literals and route-local palette definitions with semantic variables. Temporary legacy aliases may refer to `--kd-*`; they must not create independent palettes.
- [ ] Audit fixed dark sections separately so their text uses the correct on-dark tokens in both global themes. Preserve hero scrims and photographed surfaces.
- [ ] Replace physical spacing/alignment where it affects RTL; apply Arabic typography and directional behavior under `[lang="ar"]` / `[dir="rtl"]`.
- [ ] Enforce 14px UI labels, badges, metadata and rails; 44px controls; 16px form inputs; 88px desktop / 72px mobile scroll clearance; and reduced-motion behavior including Framer Motion components.
- [ ] Verify computed tokens, font sizes, focus visibility, theme switching, 320px reflow, and representative Arabic text before expanding the route matrix.

```css
:root { --kd-accent: #6f4224; --kd-focus: #6f4224; }
:root[data-theme="dark"] { --kd-accent: #d4a47a; --kd-focus: #d4a47a; }
[lang="ar"] { letter-spacing: 0; text-transform: none; }
section[id] { scroll-margin-top: 88px; }
@media (max-width: 599px) { section[id] { scroll-margin-top: 72px; } }
```

These declarations are a contract excerpt; the full token table and component states come from the locked design system.

## Task 3 — Slice B: Global shell, metadata, and schema

**Modify:** `src/app/layout.tsx`, `src/components/site-shell.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`; route metadata in the page tasks. Inspect `src/proxy.ts` and preserve its request locale propagation.

- [ ] Localize skip navigation, menu labels, appearance controls, footer labels, and clocks from the request locale. Keep real `<time dir="ltr">` and isolated email tokens.
- [ ] Preserve the floating dark pill and implement the mobile toggle with inline SVG bars, expanded state, Escape handling, focus containment, and focus return.
- [ ] Keep the existing permanent redirect and verify its HTTP behavior. Preserve the existing case-study legacy-slug redirect as well.
- [ ] Apply exact Stage 1 metadata strings and canonical URLs. Pair EN/AR/x-default home alternates without implying translated versions of English-only inner pages.
- [ ] Emit safe JSON-LD with stable entity identifiers: Organization / ProfessionalService, WebSite, offers as Service, relevant SoftwareApplication records, and rendered FAQPage content. Preserve evidence dates and avoid turning a historical download count into a current claim.
- [ ] Rebuild the 1200×630 OG image from the courtyard motif and locked palette with 64px safe margins. Use the verified Stage 3 OG PNG to resolve visual differences from older text-only instructions.
- [ ] Verify rendered JSON parsing, entity types, canonical/hreflang tags, sitemap route coverage, redirect status/location, robots domain, and OG response dimensions.

## Task 4 — Slice C: Canonical catalog and optimized media

**Modify:** `src/lib/content.ts`. **Create if needed:** focused catalog/presentation data modules under `src/content/work/`, while retaining compatible exports used by current Glitre routes.

**Produces:** typed `projectCatalog`, `publicCaseStudies`, `offers`, and `faqs`. `publicCaseStudies` remains gated by evidence and publication permissions and contains exactly the six approved flagships.

```ts
type ProjectCategory = "web" | "mobile" | "ai" | "rnd";
type ProjectKind = "flagship" | "showcase";
// Each catalog record carries a canonical slug, kind, category array,
// studioRole, context, evidence, surfaces, and verified media references.
```

- [ ] Read each Stage 2 case-study section before transcribing it. Preserve scope and release boundaries; never fill missing results with invented impact metrics.
- [ ] Register flagship slugs: `glitre-loyalty-platform`, `hs-vpn`, `quickcharging-pos`, `medconnect-egypt`, `stayease`, `classroom-sentinel`.
- [ ] Register showcase slugs: `aksira-ai-keyboard`, `fitforge`, `qiraaty`, `focus-ritual`, `getlab-system`, `collab-platform`, `agency-os`.
- [ ] Encode the exact taxonomy matrix: web includes Glitre, MedConnect, StayEase, Qiraaty, Focus Ritual, GetLab, AI Collab, AgencyOS; mobile includes Glitre, HS VPN, QuickChargingPOS, Aksira, FitForge; AI includes Classroom Sentinel, Aksira, Qiraaty, Focus Ritual, AI Collab; R&D includes Classroom Sentinel, Aksira, GetLab, AI Collab, AgencyOS.
- [ ] Replace the three-offer registry with four approved offers and canonical query values `blueprint`, `launch-sprint`, `operations-platform`, `product-care`. Apply the locked pricing and four FAQs.
- [ ] Convert the Focus Ritual primary PNG into `/projects/focus-ritual/focus-ritual-hero.webp`; re-encode `/projects/glitre-loyalty-platform/manager/sign-in.webp`. Require each served output to be below 200,000 bytes and inspect UI text for legibility. Keep source originals until replacement references are verified.
- [ ] Validate every case-sensitive image/video reference. Route images through responsive `next/image` with explicit ratios; use metadata preload for every one of the seven project videos.
- [ ] Assert unique slugs, six gated flagships, seven showcases, category counts, offer query values, media existence, and both byte limits.

## Task 5 — Slice D1: Shared EN/AR homepage and services

**Modify:** `src/app/page.tsx`, `src/app/ar/page.tsx`, `src/content/home/{en,index,types}.ts`, `src/components/home/ways-accordion.tsx`, related homepage components, `src/app/services/page.tsx`, `src/content/services/en.ts`.

**Create:** `src/content/home/ar.ts` and `src/components/home/home-page.tsx`. **Interfaces:** `getHomeCopy(locale: "en" | "ar"): HomeCopy`; shared renderer accepts typed copy, with no route-specific duplicate layout.

- [ ] Transcribe Stage 1 English and Stage 3 Arabic copy into matching structures, including hero CTAs, GEO block, four commercial offers, four FAQs, and illustrative screen labels.
- [ ] Render Glitre, HS VPN, and QuickChargingPOS as the approved asymmetric two-column showcase. Add the other ten builds to the compact index with the all-13-project destination.
- [ ] Keep the four-step approach immediately followed by services on both homepages. Leave studio navigation pointing to `/studio`.
- [ ] Apply `/work` to the secondary hero CTA and `/contact` to the primary CTA. Offer actions append their canonical `?offer=` values.
- [ ] Localize UI and embedded illustrative labels; use nonbreaking spaces inside multi-word Latin names and `<bdi dir="ltr">` for mixed-script values. Flip directional arrows only where their meaning requires it.
- [ ] Render `/services` as three product lines and the balanced 2×2 offer grid with aligned pricing, boundary rows, and the dark delivery-path band.
- [ ] Verify deep EN/AR key parity, four offers and FAQs, absence of the provisional banner and inline studio band, hero fold budgets, and RTL reflow at 320px and 200% text size.

## Task 6 — Slice D2: Work index and six flagship presentations

**Modify:** `src/app/work/page.tsx`, `src/components/work-grid.tsx`, `src/content/work/en.ts`, `src/app/work/[slug]/page.tsx`, `src/components/case-study/` data and presentation components, and the three Glitre child pages where needed.

**Create:** a reusable flagship detail renderer for the four additional case studies, a media gallery/lightbox, and code-drawn project diagram cards as focused components.

- [ ] Render 13 uniform rectangular bordered cards using OUR ROLE / CONTEXT / EVIDENCE / SURFACES and honest release labels. AgencyOS carries “Concept / Design Build”. Keep spec-backed schematic cards distinguishable from real product captures.
- [ ] Add All Work plus four category filters, URL synchronization, back/forward handling, safe unknown-value fallback, keyboard controls, result count, and polite announcements. Wrap search-parameter consumers in the App Router boundary needed for production builds.
- [ ] Support complete direct navigation to all six flagship routes. Add four project-specific executive snapshots, Before/After panels, architecture diagrams with accessible text, three engineering decisions, evidence-backed numbers, galleries, video where available, and offer-prefilled closing actions.
- [ ] Preserve Glitre overview/customer/worker/manager routes. Keep customer/worker screens explicitly illustrative; use all four approved English manager WebPs with `admin@example.invalid`.
- [ ] Show live Android captures alongside historically dated iOS TestFlight captures for HS VPN. Do not imply an App Store launch.
- [ ] Frame StayEase captures upright with scrollable 440px desktop / 360px mobile detail viewports and 200px card viewports. Preserve portrait image proportions.
- [ ] Use real `<dialog>` gallery behavior with accessible names, Escape dismissal, trapped focus, and focus return. Add sticky contents clearance and reduced-motion support.
- [ ] Test all filter states and direct routes, 136px desktop rail behavior, mobile card capacity, media loading, lightbox keyboard behavior, and no 404s from missing presentation data.

## Task 7 — Slice D3: Studio, contact, privacy, and shared validation

**Modify:** `src/app/studio/page.tsx`, `src/app/contact/page.tsx`, `src/app/privacy/page.tsx`, `src/components/route-hero.tsx`, `src/components/contact-form.tsx`, `src/lib/contact.ts`, and `src/app/api/contact/route.ts` where the payload contract changes. Preserve `src/lib/contact-config.ts` server-only configuration boundaries.

**Contact contract:** six visible fields: `name`, `company`, `email`, `offer`, optional `timing`, and `problem` (workflow brief). A hidden honeypot may remain. Remove dependencies on previously required `outcome` and consent fields from the shared validator and provider mapping. Show the locked privacy note and link beside submission.

- [ ] Use flush courtyard photography for Studio, Contact and Privacy heroes; replace legacy geometric imagery. Apply approved governance, IP ownership, and UK/Cairo/GCC copy. Build the two-column UK GDPR controller ledger from the existing approved privacy content without inventing a legal identity or address.
- [ ] Update the client form, shared validator, API parsing, and provider payload together. Do not weaken server validation, input limits, honeypot handling, rate limiting, or configuration validation while reducing the visible intake.
- [ ] Require name, company, valid email, a supported engagement value including “Not sure yet”, and at least 20 trimmed characters in the brief. Validate `timing` against its supported optional values. Apply the exact locked validation and status copy.
- [ ] Normalize `?offer=` against the four canonical offer values. An unknown or repeated parameter must not create an invalid select option or crash the page.
- [ ] Focus the first invalid field; connect inline errors; disable submission while pending with busy state; preserve values after HTTP/network failure; provide Retry submission and the email fallback. Keep the form usable when configuration is unavailable, with clear delivery status and contact fallback.
- [ ] Test validation and pending behavior, invalid/stale prefill, provider 429/5xx/non-JSON/network failures, successful mocked delivery, retry preservation, and success reset using intercepted/local test responses. Do not send live external email during Stage 4.

## Task 8 — Integration, independent review, and Stage 5 handoff

**Create:** `docs/stage-4-implementation-results.md`; browser artifacts under `design/reviews/stage-4/`; verification logs under an appropriate ignored local evidence directory with paths recorded in the report.

- [ ] Run lint, production build, and TypeScript checking after integration. Resolve failures before the production-browser matrix.
- [ ] Run the Stage 0 and copy audits using their actual argument contracts. The handoff omits required arguments: decoupling `--verify` needs the Stage 0 report path; the copy audit needs explicit input files.

```bash
npm run lint
npm run build
npx tsc --noEmit
python3 roles/repo-hygiene-and-decoupling-engineer/scripts/decoupling_audit.py --verify docs/stage-0-cleanup-and-decoupling-report.md
python3 roles/conversion-copywriter/scripts/copy_audit.py docs/stage-4-implementation-results.md
python3 roles/agency-frontend-engineer/scripts/implementation_audit.py --verify docs/stage-4-implementation-results.md
```

- [ ] Start a production server owned by this session. Run Playwright against 16 pages: `/`, `/ar`, `/work`, `/services`, `/studio`, `/contact`, `/privacy`, six flagship routes, and the three Glitre child routes. Use 320×844, 390×844 and 1440×900, in Light and Dark. `/ar` supplies real RTL coverage at every size/theme; do not use a synthetic `dir` toggle as evidence of translation parity.
- [ ] Save 96 full-page captures plus focused interaction/fold/OG captures. Each matrix row records route, viewport, theme, HTTP status, overflow pixels, browser errors, and screenshot path. Wait for fonts/images, trigger in-view sections, then return to the top before captures.
- [ ] Assert `document.documentElement.scrollWidth <= window.innerWidth` for every matrix row. Add 200% text-size tests on representative templates; check computed 14px metadata floor, 44px controls, fonts, reduced motion, theme persistence, menu/dialog keyboard behavior, prefill/retry and filter URL behavior.
- [ ] Visually inspect each template in Light/Dark and RTL against `design/reviews/verified/`. Record reference-to-browser pairs and concrete findings; fix P0/P1 differences and inspect new captures after changes. Do not report screenshots as inspected based only on filenames or automation exit codes.
- [ ] Run browser accessibility/contrast checks on representative templates; retain results and distinguish automated checks from manual keyboard and visual review. Reserve the full release/security gates for Stage 5.
- [ ] Obtain an independent implementation review using the project workflow. The implementer cannot sign its own material acceptance. Resolve blocking findings and rerun only affected checks plus required final integration checks.
- [ ] Write the results report with actual exit codes, coverage, artifacts, compression sizes, limitations, review findings, and explicit Stage 5 readiness. Run the final implementation audit against the completed report and evidence.
- [ ] Read `docs/05-stage-5-release-and-security.md` for the handoff. Carry forward public-asset allowlisting, video faststart/H.264/AAC, full accessibility/security/dependency checks, and controlled live form delivery. A Stage 4 PASS prepares this handoff; it does not certify launch or authorize publication.
- [ ] Record Hub evidence/checkpoint and leave changes reviewable and uncommitted. Report exact working directory and remaining risks. Do not push.

## Completion gate

### OpenPencil comparison evidence contract

Task 8 must start the local production server and compare browser captures with fresh OpenPencil exports from only the newer RIGHT-side Evolved Desktop and Evolved Mobile frames in `canvas/documents/Kepler-Dev-Current-Site-Review-Recovered-2026-10-26.fig`. The locked handoff positions are x=3060 (desktop) and x=4660 (mobile); verify live frame names and IDs before recording evidence. The older LEFT-side baseline frames are not implementation targets. Store stable managed captures under `design/reviews/latest/openpencil/<page-key>/<width>x<height>-<theme>-<locale>.png` and `design/reviews/latest/website/<page-key>/<width>x<height>-<theme>-<locale>.png`, indexed in the shared `design/reviews/latest/manifest.json`. Preserve `sources.openpencil` when the website runner updates `sources.website`; invalidate comparisons when replacing corresponding browser captures. Each comparison identifies distinct website and OpenPencil records and carries route, theme, viewport, locale/direction, design document fingerprint and page/node IDs, findings, verdict, reviewer and time. No source-only check can satisfy this independent visual acceptance gate.

Task 9 is conditional cleanup: only after runtime acceptance, independent visual review, and owner confirmation, back up the canonical `.fig` outside public and remove only inventoried older LEFT-side frames. Preserve RIGHT Evolved frames, new pages, components, variables and shared dependencies. Inspect live node IDs and dependencies before deletion; do not infer cleanup targets from coordinates alone. Record the backup, deleted-node inventory, retained-frame integrity and approval evidence. Do not perform this cleanup before confirmation.

Stage 4 is complete only after the required static/build checks, project audits, browser matrix, visual inspection, interaction checks, and independent review all have supporting evidence and no unresolved blocking findings. Until then, label the stage in progress or blocked with the specific missing evidence. This plan itself contains no implementation or verification PASS claim.
