# Stage 3 Multi-Page UX Wireframe & Layout Blueprint (Kepler Dev)

Replace every `FILL` marker. Keep all ten exact numbered H2 headings and machine-audited table headers. Write prose, ASCII component trees, and Markdown tables (zero Mermaid/JSON). Reference copy by Stage 1/2 source section headings.

## 1. Scope and Source Locks
FILL: purpose, multi-route agency scope (`/`, `/work`, `/work/[slug]`, `/services`, `/studio`, `/contact`, `/ar`), standalone studio voice lock (zero founder/personal bio), source precedence (`stage-1-final-copy-and-pitch.md`, `stage-2-visual-asset-manifest.md`, `stage-2-flagship-case-studies.md`, `seo-and-market-brief.md`), and handoff boundaries to Role 2A (tokens), Role 2B (Arabic RTL), and Role 3 (critic).

## 2. Page Hierarchy and Copy Placement
FILL: ASCII route & section tree covering navigation, footer (`Europe/London` & `Cairo & GCC`), and all sections of `/`, `/work`, `/work/[slug]`, `/services`, `/studio`, and `/contact`, plus the mapping table below.

| Source block | Target route and component | Placement and heading level | Progressive disclosure behavior |
| --- | --- | --- | --- |
| FILL | FILL | FILL | FILL |

## 3. Responsive Grids and Fold Budgets
FILL: breakpoints (`<600px` phone `390x844` / `320px` reflow, `600-899px` tablet, `900-1199px` compact desktop, `>=1200px` wide desktop `1440x900`), max container width, gutters, column grids, sticky header clearance, and `200%` text zoom behavior.

| Viewport | Container px | Gutters px | Flagship / work columns | Showcase grid columns |
| --- | ---: | ---: | ---: | ---: |
| 390x844 | FILL | FILL | FILL | FILL |
| 1440x900 | FILL | FILL | FILL | FILL |

Above-the-fold homepage height budgets (`navigation`, `eyebrow / identity`, `h1`, `subhead`, `primary CTA`, `secondary CTA`, `proof / visual strip`, `spacing`):

| Viewport | Element | Height px |
| --- | --- | ---: |
| 390x844 | FILL | FILL |
| 1440x900 | FILL | FILL |

## 4. Core Route Section Architecture & Homepage Budgets
FILL: section-by-section blueprint for Homepage (`/`) plus summary specs for `/services`, `/studio`, and `/contact` harmonizing all inner routes with the v2 editorial layout.

| Section | Anchor / Route | Desktop layout | Mobile layout | Mobile budget px |
| --- | --- | --- | --- | ---: |
| Hero + GEO Identity | `#hv2-hero` (`/`) | FILL | FILL | FILL |
| Selected Work | `#work` (`/`) | FILL | FILL | FILL |
| How We Deliver | `#approach` (`/`) | FILL | FILL | FILL |
| The Studio | `#studio` (`/`) | FILL | FILL | FILL |
| Ways to Work + Offers | `#services` (`/`) | FILL | FILL | FILL |
| FAQ + Closing CTA | `#faq` & `#closing` (`/`) | FILL | FILL | FILL |

Collapsed `/work` card capacity geometry (Total must equal Media + Text/Actions + Spacing):

| Collapsed card | Total px | Media px | Text and actions px | Spacing px |
| --- | ---: | ---: | ---: | ---: |
| Work catalog card mobile | FILL | FILL | FILL | FILL |

## 5. Project Frames and Asset Mapping (All 13 Builds)
FILL: exact manifest frame type and cover path (backtick-wrapped) for all 13 projects (`Glitre Loyalty Platform` through `AgencyOS`), explaining `StayEase` vertical portrait scroll framing, `HS VPN` primary Android + secondary iOS strip, confidential client illustrations for `Glitre Loyalty Platform`, and explicit interaction states (`default`, `hover`, `focus`, `active`) for `GlitreIllustrativeDeviceFrames`, `ClassroomSentinelPipelineCard`, `AksiraDualEngineCard`, `QiraatyComplianceBadge`, `GetLabDatabaseBadge`, and `AICollabRealtimeBadge`.

| Project | Frame | Cover or component | Desktop geometry | Mobile geometry | Fit and fallback |
| --- | --- | --- | --- | --- | --- |
| FILL | FILL | FILL | FILL | FILL | FILL |

## 6. Six Flagship Case Study Pages (`/work/[slug]`)
FILL: detail page layout spec (sticky 136px desktop contents rail above `1024px`, single-column mobile drop, Numbers Strip, Before/After panels, Visual/Video Gallery with full-image lightbox/zoom, System Architecture Diagram with accessible text summary, 3 Consequence-First Decisions, Honest Scope Boundaries, Closing CTA), keyboard/focus return, and no-JavaScript progressive enhancement. Each `Five walkthrough steps` cell must contain 5 semicolon-separated steps.

| Flagship | Canonical route | Snapshot source | Diagram source | Decisions source | Five walkthrough steps |
| --- | --- | --- | --- | --- | --- |
| FILL | FILL | FILL | FILL | FILL | FILL |

## 7. Work Index Filters and 13-Project Taxonomy (`/work`)
FILL: filter bar mechanics (`All Work (13)`, `Web & Dashboards`, `Mobile & POS Apps`, `AI & Automation`, `Studio R&D`), live count updates, URL query sync (`?category=`), keyboard arrow/tab support, empty state, and accessible DOM preservation for all 13 cards + the 4 Stage 1 B2B FAQ answers.

| Project | Web & Dashboards | Mobile & POS Apps | AI & Automation | Studio R&D |
| --- | --- | --- | --- | --- |
| FILL | FILL | FILL | FILL | FILL |

## 8. Contact Qualification Funnel (`/contact`) & Studio Routing
FILL: 6-field qualification form (`Your name`, `Company or organization`, `Work email address`, `Which engagement model fits best?`, `Target launch or discovery window`, `What workflow or product are we engineering?`), `?offer=` URL prefill from `/services` and `/`, client + server validation with focus-on-first-invalid-field, submitting/success/recoverable-failure states, `mahmouddattiaa7@gmail.com` mailto fallback, and `/privacy` link.

## 9. Accessibility and Performance Handoff
FILL: `>=44x44px` tap targets, skip-link, semantic landmarks, reduced motion (`prefers-reduced-motion: reduce`), `320px` overflow guard, lazy/eager media loading rules, Stage 4 compression flags (`Screenshot 2026-04-09 225636.png` `594.2 KB` & `sign-in.webp` `502.4 KB`), and deferring exact color/contrast verification to Role 2A (`ui-design-system-architect`).

## 10. Mandatory Self-Audit Checklist

| Check | Status | Evidence |
| --- | --- | --- |
| Multi-route studio hierarchy (`/`, `/work`, `/work/[slug]`, `/services`, `/studio`, `/contact`, `/ar`) | FILL | FILL |
| All 13 projects mapped with exact Stage 2 covers & frame types | FILL | FILL |
| All 6 flagship `/work/[slug]` deep dives complete (5 walkthrough steps each) | FILL | FILL |
| Responsive fold budgets (`390x844` <= 844px, `1440x900` <= 900px) & compact card geometry | FILL | FILL |
| Filter taxonomy matrix accurate across 13 projects (`8` / `5` / `5` / `5`) | FILL | FILL |
| Deterministic wireframe verifier (`wireframe_audit.py --verify`) exits `0` | FILL | FILL |
| Standalone studio voice (`copy_audit.py` exits `0`, zero personal/founder leaks) | FILL | FILL |
