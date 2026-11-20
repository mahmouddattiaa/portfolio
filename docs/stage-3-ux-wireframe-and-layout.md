# Stage 3 Multi-Page UX Wireframe & Layout Blueprint (Kepler Dev)

**Brand:** Kepler Dev (`https://www.keplerdev.uk`)  
**Voice:** Standalone UK & GCC Digital Product Studio (`we` / `our` / `Kepler Dev`)  
**Stage:** Stage 3, Role 1 — Multi-Page UX & Funnel Architecture Specification  
**Status:** Locked Layout Blueprint for Stage 3 Role 2A, Role 2B, Role 3, and Stage 4 Implementation

---

## 1. Scope and Source Locks

This blueprint specifies the multi-route information architecture, conversion funnel, responsive layout grids, frame geometry, and interaction states for **Kepler Dev** (`https://www.keplerdev.uk`) across `/`, `/work`, `/work/[slug]`, `/services`, `/studio`, `/contact`, and `/ar`.

### Studio Voice & Audience Lock
- **Standalone Studio Voice:** All rendered labels, headings, and component specs maintain collective studio framing (`we`, `our`, `Kepler Dev`). Zero personal names, zero solo pronouns, and zero third-party freelance marketplace references appear anywhere in rendered UI. The address `mahmouddattiaa7@gmail.com` appears strictly as the contact fallback email.
- **Primary Audience & Conversion Goal:** Operations directors across the GCC/MENA (fuel retail, loyalty, clinics, hospitality, EdTech) and international product leads/CTOs arriving from search, referrals, or technical profiles. Every route funnels qualified visitors to **Book a Project Review** (`/contact`) or inspect verified engineering proof on `/work/[slug]`.
- **Shallow Navigation Depth:** Visitors reach any of the 6 flagship deep dives in at most 2 clicks from `/` (`#work` -> `/work/[slug]` or `Header` -> `/work` -> `/work/[slug]`) and reach project qualification in 1 click from every route's header, hero, or closing CTA.

### Source Precedence & Role Handoff Boundaries
1. **Copy & Metadata Truth:** `docs/stage-1-final-copy-and-pitch.md` and `docs/seo-and-market-brief.md` govern every route `<title>`, `<meta name="description">`, canonical URL, `hreflang` pair, heading hierarchy (`H1` -> `H2` -> `H3`), 40–60 word GEO blocks, and 6-field form strings. Alternate H1 candidates and internal self-audit checklists are excluded from rendered DOM.
2. **Visual & Case Study Truth:** `docs/stage-2-visual-asset-manifest.md` and `docs/stage-2-flagship-case-studies.md` govern all 13 studio builds, exact `public/projects` asset paths, frame types, alt texts, and honest release boundaries. Zero raster screenshots are invented for spec-backed builds (`Aksira`, `Qiraaty`, `GetLab System`, `AI Collab Platform`).
3. **Downstream Boundaries:**
   - **Role 2A (`ui-design-system-architect`):** Owns color palettes, typography scales, elevation tokens, border radii, and WCAG AA contrast ratios. Numeric pixel budgets in this document are calculated layout targets pending Stage 4/5 browser measurement.
   - **Role 2B (`arabic-rtl-architect`):** Owns `/ar` RTL mirroring, logical CSS properties (`margin-inline`, `padding-inline`, `text-align: start`), Arabic typography, and regional UX adaptations.
   - **Role 3 (`ux-critic`):** Owns final Stage 3 design gate review before Stage 4 Next.js implementation begins.

---

## 2. Page Hierarchy and Copy Placement

### Multi-Route ASCII Route & Section Tree

```text
Kepler Dev App Shell (Global Layout)
├── SkipLink ("Skip to main content" -> #main-content)
├── SiteHeader (sticky top bar, 72px desktop / 56px mobile, max-w 1240px)
│   ├── BrandMark ("Kepler Dev" -> /)
│   ├── PrimaryNav (Work -> /work, Services -> /services, Studio -> /studio, Contact -> /contact)
│   └── UtilityControls (EN / العربية -> /ar, Appearance toggle: Light / Dark / System, mobile DrawerButton >=44x44px)
├── <main id="main-content">
│   ├── Route: / (Homepage)
│   │   ├── #hv2-hero       (Eyebrow, H1, Lead, Primary CTA -> /contact, Secondary CTA -> /work, 4 Proof Pills, GEO Identity Block)
│   │   ├── #work           (H2 Selected Work, 3 Featured Flagship Cards -> /work/[slug], All-13 Link -> /work)
│   │   ├── #approach       (H2 Operational Disconnect, 2 H3 Sub-angles, 4 Numbered Delivery Steps 01-04)
│   │   ├── #capabilities   (H2 Three Core Product Lines + 3 H3, H2 Five Signatures + 5 H3, H2 Verified Metrics Strip)
│   │   ├── #studio         (H2 Direct Engineering Accountability, Pull Quote, 4 Studio Facts, Link -> /studio)
│   │   ├── #services       (H2 Four Structured Offers + 4 H3 Cards -> /services & /contact?offer=..., Compare Link -> /services)
│   │   ├── #faq            (4 B2B FAQ Accordion/Disclosure Items, 40-60 words each)
│   │   └── #closing        (H2 Direct Engineering Review, CTA -> /contact, Email Fallback)
│   ├── Route: /work (13-Project Catalog)
│   │   ├── WorkHero        (Eyebrow, H1, Desktop/Mobile Lead, 3 Proof Governance Rows)
│   │   ├── CategoryFilterBar (All Work (13), Web & Dashboards, Mobile & POS Apps, AI & Automation, Studio R&D)
│   │   ├── FlagshipSection (H2 Six Flagship Engineering Case Studies -> 6 Cards -> /work/[slug])
│   │   ├── ShowcaseSection (H2 Seven Studio Showcase & Applied R&D Builds -> 7 Cards)
│   │   ├── VerificationBar (H2 Architectural Verification Standards Across All Studio Projects)
│   │   └── WorkFaqAndCta   (4 B2B FAQ Items + Closing CTA -> /contact)
│   ├── Route: /work/[slug] (6 Dedicated Flagship Deep Dives)
│   │   ├── DetailBreadcrumb (Work / Project Title)
│   │   ├── DetailHeader    (Classification Tag, H1, 1-Sentence Outcome, Numbers Strip, Live/Repo Badges)
│   │   ├── StickyTocRail   (Desktop >=1024px left 136px rail; mobile horizontal jump strip)
│   │   ├── BeforeAfterGrid (H2 Operational Problem: Before vs. After)
│   │   ├── ArchitectureBox (H2 System Architecture + Zoom/Pan Diagram Container + Accessible Text Summary)
│   │   ├── DecisionsStack  (H2 3 Key Engineering Decisions: Consequence -> Mechanism -> Outcome)
│   │   ├── WalkthroughGrid (H2 Visual Walkthrough & Scope Boundaries: Video + Ordered Gallery + Lightbox)
│   │   └── DetailClosing   (Related Offer Pill -> /contact?offer=... + Next/Prev Flagship Links)
│   ├── Route: /services (Product Lines & Commercial Offers)
│   │   ├── ServicesHero    (Eyebrow, H1, Lead)
│   │   ├── ProductLines    (H2 Three Core Product Lines + 3 H3 + Proof Project Links)
│   │   ├── OfferLadder     (H2 Four Structured Commercial Offers + 4 H3 with For / You get / It stops at / Then + ?offer= CTAs)
│   │   ├── GovernanceRules (H2 Explicit Engagement Boundaries and Milestones)
│   │   └── ServicesClosing (H2 Schedule a Technical Scoping Discussion -> /contact)
│   ├── Route: /studio (Engineering Standards & UK/GCC Footprint)
│   │   ├── StudioHero      (Eyebrow, H1, Lead)
│   │   ├── Accountability  (H2 Independent Senior Studio + 2 H3 Ownership Blocks)
│   │   ├── SignaturesDeep  (4 Engineering Standard Deep-Dive Sections)
│   │   ├── FootprintGrid   (UK Governance Europe/London + GCC Delivery Africa/Cairo & Asia/Riyadh)
│   │   └── StudioClosing   (H2 Put Your System Requirements in Front of Senior Engineers -> /contact, /work)
│   ├── Route: /contact (Project Review Qualification Funnel)
│   │   ├── ContactHero     (Eyebrow, H1, Lead, Direct Email Fallback)
│   │   ├── Qualification   (H2 Qualification Criteria + 2 H3 + H2 What to Expect)
│   │   ├── IntakeForm      (H2 Direct Project Review Intake Form: 6 Fields + Validation + Submit States)
│   │   └── DirectChannels  (H2 Direct Communication Channels, Operating Clocks, Privacy Note)
│   └── Route: /ar (Arabic RTL Mirror of Core Funnel & Metadata)
│       └── Mirrored layout governed by Role 2B (Arabic RTL Architect)
└── SiteFooter (max-w 1240px)
    ├── Brand & Tagline ("Operational software, mobile applications, and point-of-sale systems...")
    ├── RouteLinks (Work, Services, Studio, Contact, Privacy -> /privacy, Arabic -> /ar)
    ├── OperatingClocks ("United Kingdom (Europe/London)" & "Cairo & GCC (Africa/Cairo / Asia/Riyadh)")
    └── Contact & Ownership ("Request a project review" -> /contact, mahmouddattiaa7@gmail.com, Client-owned IP note)
```

### Stage 1 Copy Placement & Heading Mapping Table

| Source block | Target route and component | Placement and heading level | Progressive disclosure behavior |
| --- | --- | --- | --- |
| `Section 1: Header Navigation & Controls` | Global `SiteHeader` (all routes) | Sticky top bar (`nav` landmark, non-heading brand mark) | Desktop shows 4 nav links + locale + theme toggle inline; `<900px` collapses nav links into accessible drawer button (`>=44x44px`). |
| `Section 1: Footer Copy & Operating Clocks` | Global `SiteFooter` (all routes) | Bottom `footer` landmark, 4-column desktop / 1-column mobile | All links, UK (`Europe/London`) & Cairo/GCC (`Africa/Cairo` / `Asia/Riyadh`) clocks, and `mahmouddattiaa7@gmail.com` stay visible without folding. |
| `Section 1: Multi-Route Metadata Contract` | Next.js `generateMetadata` & `<head>` across 12 routes | Non-rendered `<title>`, `<meta description>`, canonical, `hreflang`, `@graph` JSON-LD | Emitted verbatim per route; alternate H1 ideas and self-audit tables excluded from rendered HTML. |
| `Section 2.1: Hero & Top-of-Page GEO Block` | `/` -> `HeroSection` + `GeoIdentityBlock` (`#hv2-hero`) | Top of page (`H1`: `We Engineer Multi-Surface Software...`, body lead, 4 proof pills, 50-word GEO block) | Above-the-fold priority on `1440x900` and `390x844`; GEO block sits in compact summary card with zero truncation on desktop and concise visible summary on mobile. |
| `Section 2.2: Selected Work` | `/` -> `FeaturedWorkGrid` (`#work`) | Section 2 (`H2`: `Featured Production Case Studies`, 3 flagship `H3` cards) | Displays 3 primary flagships (`Glitre Loyalty Platform`, `HS VPN`, `QuickChargingPOS`) with cover frames, consequence-first summary, and `/work/[slug]` CTA; link beneath opens full 13-project `/work` index. |
| `Section 2.3: How We Deliver` | `/` -> `DeliveryApproachSection` (`#approach`) | Section 3 (`H2`: `The Operational Disconnect vs. Direct Senior Engineering`, 2 `H3` sub-angles, 4 step rows) | 2-column split on desktop (editorial contrast left, Steps `01`–`04` right); mobile stacks vertically with compact step cards. |
| `Section 2.4: What We Build & Standards` | `/` -> `CapabilitiesAndProofSection` (`#capabilities`) | Section 4 (`H2` Product Lines + 3 `H3`, `H2` Five Signatures + 5 `H3`, `H2` Verified Metrics) | Product Lines render as 3-column grid; Five Signatures render as scannable numbered rows or collapsible accordion details on `<600px` while keeping titles visible. |
| `Section 2.5: The Studio` | `/` -> `StudioSummarySection` (`#studio`) | Section 5 (`H2`: `Direct Engineering Accountability Under UK Governance`, pull quote, 4 fact pairs) | Pull quote + 2x2 studio facts grid; CTA navigates to `/studio` for full engineering governance deep dive. |
| `Section 2.6: Ways to Work Together` | `/` -> `CommercialOffersSection` (`#services`) | Section 6 (`H2`: `Four Structured Commercial Offers`, 4 `H3` cards) | 4-card commercial ladder showing duration, starting USD range, summary, and deep link to `/services` + prefilled `/contact?offer=...`. |
| `Section 2.7 & 2.8: FAQs & Closing CTA` | `/` -> `FaqSection` (`#faq`) + `ClosingCtaBanner` (`#closing`) | Sections 7–8 (`H2` Questions, Answered + 4 `H3` items; `H2` Closing CTA) | FAQ answers (`40–60 words`) use native `<details>`/`<summary>` or accessible disclosure buttons (first item expanded on desktop, all searchable in DOM); Closing CTA displays single primary button + email fallback. |
| `Section 3.1–3.3: Work Index & 13 Cards` | `/work` -> `WorkCatalogPage` | `H1` + 3 governance rows + filter bar + `H2` Flagships (`6 H3`) + `H2` Showcase (`7 H3`) + `H2` Verification | Filter pills filter 13 cards client-side with URL `?category=` sync; all 13 cards stay in DOM when `All Work (13)` is active and remain directly reachable via `/work/[slug]` or anchor IDs. |
| `Section 4: Services Copy` | `/services` -> `ServicesPage` | `H1` + `H2` Product Lines (`3 H3`) + `H2` Commercial Offers (`4 H3`) + `H2` Governance + `H2` Closing | Offer cards expose `For` / `You get` / `It stops at` / `Then` rows directly on desktop and via compact structured rows on mobile, each with prefilled `/contact?offer=` CTA. |
| `Section 5: Studio Copy` | `/studio` -> `StudioPage` | `H1` + `H2` Accountability (`2 H3`) + 4 Engineering `H2`s + `H2` UK & GCC Footprint + `H2` Closing | Replaces any legacy personal or solo-bio route with pure studio governance, contract-first proofs, and `Europe/London` + `Africa/Cairo` / `Asia/Riyadh` delivery regions. |
| `Section 6: Contact / Project Review` | `/contact` -> `ContactPage` | `H1` + `H2` Qualification (`2 H3`) + `H2` Discovery Expectations + `H2` Intake Form + `H2` Channels | 2-column desktop (qualification context left, 6-field form right); mobile places H1 + brief expectation above form so inquiry fields appear rapidly. |

---

## 3. Responsive Grids and Fold Budgets

Layout structure follows a mobile-first fluid grid starting at `390px` (verified down to `320px` single-column reflow without horizontal page scroll) and scaling across four content-driven breakpoints:
- **Phone (`<600px`, target `390x844` and `320px` reflow):** Single-column flow, `16px` inline page padding (`12px` at `320px`), `16px` vertical stack gap, full-width `>=44x44px` controls, and `env(safe-area-inset-left/right/bottom)` padding on sticky header and mobile drawer.
- **Tablet (`600–899px`):** 2-column grids for showcase cards and offer cards, `24px` inline padding, `20px` gutters, collapsed hamburger nav transitioning at `900px`.
- **Compact Desktop (`900–1199px`):** Full horizontal top navigation, 2-column case study layout, `32px` inline padding, `24px` gutters.
- **Wide Desktop (`>=1200px`, target `1440x900`):** Centered `1240px` max-width container (`100px` outer margins at `1440px`), `24px` column gutters, 3-column flagship/showcase grids, and `136px` sticky table-of-contents rail on `/work/[slug]` (`>=1024px`).

### Sticky Clearance & 200% Text Zoom Rules
- **Sticky Header Clearance:** All anchored sections (`#hv2-hero`, `#work`, `#approach`, `#capabilities`, `#studio`, `#services`, `#faq`, `#closing`) and case-study anchor headings apply `scroll-margin-top: 88px` on desktop (`>=900px`) and `72px` on mobile (`<900px`) so sticky navigation never clips headings on jump links or keyboard focus scroll.
- **200% Zoom & `320px` Reflow:** All flex/grid children set `min-width: 0` and fluid `minmax(0, 1fr)` tracks. Proof pills, tech-stack tags, and filter bars wrap cleanly with `flex-wrap: wrap` and `gap: 8px`. Header navigation drops into the compact mobile menu below `900px` or when text scaling increases effective width, preventing nav text overlap at `200%` browser zoom.

### Responsive Grid Parameters

| Viewport | Container px | Gutters px | Flagship / work columns | Showcase grid columns |
| --- | ---: | ---: | ---: | ---: |
| 390x844 | 358 | 16 | 1 | 1 |
| 1440x900 | 1240 | 24 | 3 | 3 |

### Above-the-Fold Homepage Height Budgets (Calculated Pending Browser Verification)

Above-the-fold homepage height budgets (`navigation`, `eyebrow / identity`, `h1`, `subhead`, `primary CTA`, `secondary CTA`, `proof / visual strip`, `spacing`) keep the complete `H1`, availability indicator, primary CTA, and four proof pills visible inside the initial viewport without forcing horizontal scrolling:

| Viewport | Element | Height px |
| --- | --- | ---: |
| 390x844 | Navigation bar (sticky top) | 56 |
| 390x844 | Eyebrow and availability status | 24 |
| 390x844 | H1 locked headline (4 lines) | 120 |
| 390x844 | Subhead lead summary | 84 |
| 390x844 | Primary CTA button (Book a Project Review) | 48 |
| 390x844 | Secondary CTA button (Explore Studio Case Studies) | 48 |
| 390x844 | Four proof pills and GEO identity strip | 184 |
| 390x844 | Spacing (top/bottom padding and stack gaps) | 96 |
| 1440x900 | Navigation bar (sticky top) | 72 |
| 1440x900 | Eyebrow and availability status | 28 |
| 1440x900 | H1 locked headline (2 lines) | 112 |
| 1440x900 | Subhead lead summary | 64 |
| 1440x900 | Primary CTA and Secondary CTA inline row | 52 |
| 1440x900 | GEO studio identity block and four proof pills | 176 |
| 1440x900 | Featured production preview peek (top edge of `#work`) | 120 |
| 1440x900 | Spacing (hero padding and vertical rhythm gaps) | 112 |

*Calculated Totals:* `390x844` = `660px` (`<= 844px`, leaving `184px` headroom for font-size/line-height expansion); `1440x900` = `736px` (`<= 900px`, leaving `164px` headroom).

---

## 4. Core Route Section Architecture & Homepage Budgets

### Homepage (`/`) Section-by-Section Architecture
1. **Hero + GEO Identity (`#hv2-hero`):** Left-weighted asymmetric split on desktop (8 cols headline, lead, CTAs, 4 proof pills; 4 cols compact GEO Studio Identity Block + availability metadata). Mobile stacks headline -> lead -> full-width primary CTA -> secondary CTA -> 2x2 proof pills (`10K+ Downloads`, `60 API Ops / 1 Contract`, `0 WCAG AA Errors`, `24/7 Daemon + POS`) -> concise GEO block.
2. **Selected Work (`#work`):** Presents the 3 lead production flagships (`Glitre Loyalty Platform`, `HS VPN`, `QuickChargingPOS`) in a 3-column desktop / 1-column mobile card grid with a prominent `View all 13 studio builds and case studies` link to `/work`.
3. **How We Deliver (`#approach`) + Capabilities (`#capabilities`):** Pairs the operational disconnect contrast and 4 numbered delivery steps (`01`–`04`) with the 3 core product lines, 5 engineering signatures, and verified metrics strip. On mobile, signatures collapse descriptions behind accessible `>=44px` disclosure toggles while titles remain visible.
4. **The Studio (`#studio`):** Editorial pull quote + 2x2 studio facts grid (`Operating Base`, `Regions Served`, `Languages`, `Delivery Model`) linking to `/studio`.
5. **Ways to Work + Offers (`#services`):** 4-column desktop (`2x2` tablet, `1-col` mobile) offer ladder (`Product Blueprint`, `Launch Sprint`, `Operations Platform`, `Product Care`) displaying duration, starting range, summary, and deep link to `/services` + `/contact?offer=...`.
6. **FAQ + Closing CTA (`#faq` & `#closing`):** 4 B2B FAQ disclosures (`40–60 words` each) followed by a high-contrast closing review banner with primary CTA (`Book a Project Review` -> `/contact`) and direct fallback `mahmouddattiaa7@gmail.com`.

### Inner Route Layout Summaries (`/services`, `/studio`, `/contact`, `/ar`)
- **`/services`:** 12-column editorial grid: compact hero -> 3-column Product Lines grid with linked proof slugs -> 4 stacked or 2x2 detailed Offer Matrix cards (`For`, `You get`, `It stops at`, `Then`, prefilled `/contact?offer=` CTA) -> 3-column Delivery Governance strip -> Closing CTA.
- **`/studio`:** Editorial long-form grid (`8-col` prose + `4-col` sticky summary facts on desktop): Hero -> Studio Accountability (`2 H3` ownership blocks) -> 4 Engineering Signature cards with linked flagship proofs -> Dual Footprint split (`United Kingdom Europe/London` vs. `Cairo & GCC Africa/Cairo · Asia/Riyadh`) -> Closing CTA.
- **`/contact`:** Asymmetric 12-column conversion layout (`5-col` qualification & discovery expectations left; `7-col` 6-field qualification form right on desktop; form-first or concise qualification summary above form on mobile) -> Direct Channels & Privacy strip.
- **`/ar`:** Mirrors `/` and primary conversion flow with `dir="rtl"`, Arabic metadata from Stage 1, and layout direction rules delegated to Role 2B (`arabic-rtl-architect`).

### Homepage Section Layout & Mobile Height Budgets

| Section | Anchor / Route | Desktop layout | Mobile layout | Mobile budget px |
| --- | --- | --- | --- | ---: |
| Hero + GEO Identity | `#hv2-hero` (`/`) | 8/4 asymmetric split (`1240px` max) with inline CTA row and side GEO card | Single column: eyebrow, H1, lead, stacked CTAs, 2x2 proof pills, GEO block | 660 |
| Selected Work | `#work` (`/`) | 3-column flagship card grid + footer link to `/work` | Single column: 3 compact cards with 16:10/portrait media cap + `/work` link | 1480 |
| How We Deliver | `#approach` (`/`) | 5/7 split (2 H3 angles left, 4 steps `01-04` right) + 3/5 capability grids | Stacked narrative + compact numbered step list + collapsible signature details | 1520 |
| The Studio | `#studio` (`/`) | 6/6 split: studio statement left, 2x2 facts grid right, link to `/studio` | Single column quote block + 4 compact key-value rows + `/studio` link | 540 |
| Ways to Work + Offers | `#services` (`/`) | 4-column offer grid (2x2 at 900-1199px) + compare CTA to `/services` | Vertical stack of 4 bounded offer cards (duration, USD range, 2-line summary) | 1120 |
| FAQ + Closing CTA | `#faq` & `#closing` (`/`) | 2-column FAQ list + centered closing banner with CTA and email fallback | Single-column accordion (collapsed by default) + full-width closing CTA card | 780 |

### Collapsed `/work` Card Capacity Geometry (Mobile Target `358px` Width)

Total height strictly equals Media + Text/Actions + Spacing:

| Collapsed card | Total px | Media px | Text and actions px | Spacing px |
| --- | ---: | ---: | ---: | ---: |
| Work catalog card mobile | 460 | 200 | 212 | 48 |

Breakdown: `200px` capped aspect-preserved media viewport (`object-contain` or scrollable strip preview), `212px` text/action stack (tag badge `22px` + `H3` title `48px` + 3-line summary `68px` + stack pill row `26px` + `>=44px` CTA/detail button `48px`), and `48px` internal card padding and inter-block gaps (`16px` top + `16px` bottom + `16px` media-to-copy gap).

---

## 5. Project Frames and Asset Mapping (All 13 Builds)

Every media wrapper preserves intrinsic image proportions without stretching, sets explicit `width` and `height` attributes, and uses verified `public/projects` assets from `docs/stage-2-visual-asset-manifest.md`. Zero raster images are invented for the four spec-backed projects (`Aksira`, `Qiraaty`, `GetLab System`, `AI Collab Platform`).

### Special Framing Rules
- **`Glitre Loyalty Platform` (`multi-app-ecosystem-frame`):** Pairs real owner-approved English manager console WebP captures (`/projects/glitre-loyalty-platform/manager/overview.webp` primary cover + `stations.webp`, `complaints.webp`, `sign-in.webp`) with `GlitreIllustrativeDeviceFrames`—two code-drawn, clearly labeled *"Illustrative Customer & Station Worker Flows (Confidential Client Mobile Surfaces)"* cards displaying the `1,250` points balance / `00:58` expiring QR timer and `100.00` purchase / `+ 100` points settlement flow.
- **`HS VPN` (`mobile-portrait-frame`):** Leads with the live Google Play Android dark-mode capture (`/projects/hs-vpn/hero.png`, `706x1600`) and `/projects/hs-vpn/preview.mp4`, with a clearly labeled secondary *"iOS TestFlight Historical Strip"* showing `/projects/HS-VPN/connected-ios.jpg`, `/projects/HS-VPN/servers-ios.jpg`, and `/projects/HS-VPN/statistics-ios.jpg` (respecting Linux case sensitivity between lowercase `public/projects/hs-vpn` and uppercase `public/projects/HS-VPN`).
- **`StayEase` (`mobile-portrait-frame`):** All 6 captures in `public/projects/StayEase` (`239x1600` to `583x1600`) are tall vertical mobile-viewport web captures. Cards and detail galleries wrap them inside a scrollable portrait viewport (`max-height: 440px` desktop / `360px` mobile with subtle scroll cue) or paired portrait frames rather than cropping into 16:9 desktop boxes.
- **`Classroom Sentinel` (`video-and-terminal-architecture-frame`):** Pairs `/projects/Sintenel/logo.png` (`1024x1024`) badge header and on-demand `/projects/Sintenel/preview.mp4` player on the left with `ClassroomSentinelPipelineCard` (`Stage 01 — Async Poller` -> `Stage 02 — Schema-Constrained Parser` -> `Stage 03 — Idempotent Dispatcher`) on the right.

### 13-Project Frame & Asset Mapping Table

| Project | Frame | Cover or component | Desktop geometry | Mobile geometry | Fit and fallback |
| --- | --- | --- | --- | --- | --- |
| Glitre Loyalty Platform | `multi-app-ecosystem-frame` | `/projects/glitre-loyalty-platform/manager/overview.webp` + `GlitreIllustrativeDeviceFrames` | 16:9 composite (`1842x965` browser frame + 2 inset device cards, max-h `320px`) | 16:10 browser preview (`200px` max-h) + toggleable illustrative tab | `object-contain` on browser capture; fallback to `GlitreIllustrativeDeviceFrames` SVG/HTML shell if image fails. |
| HS VPN | `mobile-portrait-frame` | `/projects/hs-vpn/hero.png` | 9:16 centered portrait bezel inside `16:10` dark stage (`max-h 320px`) | Centered portrait bezel (`max-h 200px`) | `object-contain` (`706x1600` intrinsic); poster fallback + clickable video modal for `/projects/hs-vpn/preview.mp4`. |
| QuickChargingPOS | `mobile-portrait-frame` | `/projects/quickcharging/home_station_ready/screen.png` | Sunmi POS terminal bezel (`max-h 320px`) with status badge | Compact terminal bezel (`max-h 200px`) | `object-contain` (`706x1600` intrinsic); fallback text status card if asset load fails. |
| MedConnect Egypt | `desktop-browser-frame` + `mobile-portrait-frame` | `/projects/medconnect/doctor_dashboard/screen.png` | Square/4:3 hybrid stage (`1600x1566`, `max-h 320px`) | Square-fit frame (`max-h 200px`) | `object-contain` preserving `1600x1566` ratio; fallback 3-portal badge strip (`Doctor / Patient / Admin`). |
| StayEase | `mobile-portrait-frame` | `/projects/StayEase/stayease_landing_page/screen.png` | Paired portrait scroll frame (`max-h 320px` card, `440px` detail) | Scrollable portrait frame (`max-h 200px` card, `360px` detail) | `object-cover object-top` in scrollable container (`267x1600` intrinsic); never cropped to 16:9. |
| Classroom Sentinel | `video-and-terminal-architecture-frame` | `/projects/Sintenel/logo.png` + `/projects/Sintenel/preview.mp4` + `ClassroomSentinelPipelineCard` | Split stage: `96x96` icon + video trigger left, 3-stage pipeline right (`max-h 320px`) | Compact icon + 3-stage vertical stack (`max-h 200px`) | `object-contain` on `1024x1024` emblem; pipeline card remains readable with zero media required. |
| Aksira | `interactive-architecture-card` | `AksiraDualEngineCard` | Code-rendered 3-stage latency strip (`700ms -> 30ms` pill + bilingual toolbar, `min-h 240px`) | Vertical 3-stage strip + metric pill (`200px`) | Pure HTML/CSS interactive diagram card (zero `/projects/` PNGs); works without JS via static state. |
| FitForge | `mobile-portrait-frame` | `/projects/FitForge/home_screen/screen.png` | Portrait mobile bezel (`512x1600`, `max-h 320px`) | Centered portrait bezel (`max-h 200px`) | `object-contain` preserving `512x1600` aspect; fallback metric badge (`MEV/MAV/MRV`). |
| Qiraaty | `minimal-archive-badge-card` | `QiraatyComplianceBadge` | Code-rendered 3-rail Saudi compliance ledger card (`Daily.co -> HMAC-SHA256 -> Moyasar/ZATCA`) | Stacked 3-rail compliance strip (`200px`) | Pure semantic HTML/CSS card (zero `/projects/` PNGs); zero image network dependency. |
| Focus Ritual | `desktop-browser-frame` | `/projects/focus-ritual/Screenshot 2026-04-09 225636.png` | Browser chrome frame (`988x601`, `max-h 320px`) | Browser chrome frame (`max-h 200px`) | `object-contain` (`988x601` intrinsic); fallback SM-2 telemetry summary card. |
| GetLab System | `minimal-archive-badge-card` | `GetLabDatabaseBadge` | Code-rendered 3-tier relational schematic (`RBAC -> Conflict Guard -> SQL Server Ledger`) | Stacked 3-tier schematic (`200px`) | Pure semantic HTML/CSS card (zero `/projects/` PNGs); zero image network dependency. |
| AI Collab Platform | `minimal-archive-badge-card` | `AICollabRealtimeBadge` | Code-rendered multiplayer room schematic (`Client A + Client B <-> Socket.io <-> Gemini`) | Compact room diagram (`200px`) | Pure semantic HTML/CSS card (zero `/projects/` PNGs); zero image network dependency. |
| AgencyOS | `desktop-browser-frame` | `/projects/AgencyOS/stitch_agency_operating_system/executive_performance_dashboard/screen.png` | 5:4 desktop browser frame (`1600x1280`, `max-h 320px`) | Browser frame (`max-h 200px`) | `object-contain` (`1600x1280` intrinsic); clear *"Concept / Design Build"* badge preserved. |

### Named Custom Component Interaction States

All six custom code-rendered showcase components implement explicit keyboard and pointer states (`>=44x44px` interactive controls where clickable, zero essential proof hidden behind hover-only triggers):

| Component Name | `default` | `hover` | `focus` | `active` |
| --- | --- | --- | --- | --- |
| `GlitreIllustrativeDeviceFrames` | Displays Customer QR (`00:58`) & Worker Settlement (`+ 100`) cards side-by-side with illustrative caption | Subtle border emphasis on active surface tab/card; zero content shift | Visible focus ring (`>=2px` offset outline) on surface switcher buttons (`Customer App` / `Worker App`) | Toggles expanded step readout (`QR Issued -> Scanned -> Ledger Committed`) and updates `aria-pressed` |
| `ClassroomSentinelPipelineCard` | Shows 3 connected pipeline stages (`Async Poller`, `Gemini JSON Schema`, `Telegram Dispatcher`) + video play button | Highlights stage node border and reveals stage latency/interval metadata (`1800s`, `24h/2h`) | Focus ring on each stage pill and `/projects/Sintenel/preview.mp4` play control | Selects stage to display sample structured output schema summary below pipeline (`aria-selected`) |
| `AksiraDualEngineCard` | Shows `700ms -> 30ms` cold-start comparison pill + bilingual AR/EN rewrite strip | Elevates active stage chip (`Host Input` -> `InputMethodService` -> `Deno Cascade`) | Focus ring on language toggle (`Arabic RTL` / `English LTR`) and stage buttons | Switches preview strip between Arabic and English rewrite sample without network call |
| `QiraatyComplianceBadge` | Displays 3-rail Saudi compliance flow (`Daily.co -> HMAC-SHA256 -> Moyasar & ZATCA`) + `PHP 8.1` badge | Highlights verification rail connector | Focus ring on rail inspection toggle button | Expands inline `webhook_deliveries` & `DeadAirAnalyzer` technical check summary (`aria-expanded`) |
| `GetLabDatabaseBadge` | Displays 3-tier relational schema (`WinForms RBAC -> Conflict Guard -> SQL Server Ledger`) | Highlights stored-procedure gate badge (`30+ SPs`) | Focus ring on tier inspection button | Toggles sample stored-procedure guard summary (`sp_ReserveEquipment`, `sp_ReturnEquipment`) |
| `AICollabRealtimeBadge` | Displays dual-client WebSocket room diagram (`Client A + Client B <-> Socket.io <-> Gemini`) | Subtle pulse disabled under `prefers-reduced-motion`; steady border highlight | Focus ring on room-state toggle button | Cycles displayed room event (`Code Edit Sync` / `Shared AI Prompt`) in `aria-live="polite"` preview |

---

## 6. Six Flagship Case Study Pages (`/work/[slug]`)

Each flagship links from `#work` on `/` and from `/work` to its canonical route `/work/[slug]`. Direct page loads, hard browser refreshes, and non-JavaScript visits render full server-side HTML with zero loss of content.

### Case Study Detail Page Architecture
- **Desktop (`>=1024px`):** Asymmetric 2-column grid with a **sticky `136px` left contents rail** (`Overview`, `Before / After`, `Architecture`, `3 Decisions`, `Walkthrough`, `Boundaries & CTA`) and a fluid `1fr` (`<=880px` reading width) main editorial column.
- **Tablet & Mobile (`<1024px`):** Contents rail collapses into a horizontal scrollable jump-pill strip below the Numbers Strip (`>=44px` pill touch targets) with `scroll-margin-top: 72px`.
- **Numbers Strip & Before/After:** Horizontal KPI strip (`4`–`5` verified metrics) above a 2-column desktop / 1-column mobile *Operational Problem: Before vs. After* comparison block.
- **System Architecture Viewer:** Renders the Stage 2 Mermaid/diagram asset inside a contained viewer (`overflow-x: auto`, pinch/zoom or `+` / `-` / `Reset` controls `>=44x44px`, plus `Open full diagram` modal). Every diagram includes a visible `<details>` or adjacent **Accessible Text Architecture Summary** so screen readers and small screens never depend on pan/zoom alone.
- **3 Consequence-First Decisions:** Numbered `01`–`03` blocks ordered *Business Consequence -> Technical Mechanism -> Verified Status / Outcome*.
- **Media Gallery, Video & Lightbox:** Video previews (`preview.mp4`) use `preload="metadata"` with static poster and explicit play control (never autoplay). Clicking any gallery thumbnail opens an accessible `<dialog>` lightbox with `Esc` close, `Prev`/`Next` (`>=44x44px`), image counter, and **strict focus return** to the triggering thumbnail button. Back/forward navigation preserves browser scroll restoration.

### Six Flagship Canonical Deep-Dive Mapping Table

| Flagship | Canonical route | Snapshot source | Diagram source | Decisions source | Five walkthrough steps |
| --- | --- | --- | --- | --- | --- |
| Glitre Loyalty Platform | `/work/glitre-loyalty-platform` | `Stage 2 Case Studies §1.A` | `Stage 2 Case Studies §1.C` | `Stage 2 Case Studies §1.D` | 1. Operations Overview (`/projects/glitre-loyalty-platform/manager/overview.webp`); 2. Stations Management (`/projects/glitre-loyalty-platform/manager/stations.webp`); 3. Complaints Queue (`/projects/glitre-loyalty-platform/manager/complaints.webp`); 4. Role-Based Sign-In (`/projects/glitre-loyalty-platform/manager/sign-in.webp`); 5. Illustrative Customer & Worker Flows (`GlitreIllustrativeDeviceFrames`) |
| HS VPN | `/work/hs-vpn` | `Stage 2 Case Studies §2.A` | `Stage 2 Case Studies §2.C` | `Stage 2 Case Studies §2.D` | 1. Connected Tunnel Dashboard (`/projects/hs-vpn/hero.png` + `/projects/hs-vpn/preview.mp4`); 2. Global Server Selection (`/projects/hs-vpn/server_selection.png`); 3. Live Session Telemetry (`/projects/hs-vpn/statistics_page.png`); 4. Infrastructure Architecture (`/projects/hs-vpn/premium_infrastructure.png`); 5. Privacy Setup & Secondary iOS TestFlight Strip (`/projects/hs-vpn/privacy_setup.png` + `/projects/HS-VPN/connected-ios.jpg`) |
| QuickChargingPOS | `/work/quickcharging-pos` | `Stage 2 Case Studies §3.A` | `Stage 2 Case Studies §3.C` | `Stage 2 Case Studies §3.D` | 1. Station Ready Terminal (`/projects/quickcharging/home_station_ready/screen.png` + `/projects/quickcharging/preview.mp4`); 2. Charging Configuration (`/projects/quickcharging/charging_configuration/screen.png`); 3. Mada Payment Processing (`/projects/quickcharging/payment_processing/screen.png`); 4. Receipt & Settlement Success (`/projects/quickcharging/payment_success/screen.png`); 5. Offline Transaction Ledger (`/projects/quickcharging/transaction_history/screen.png`) |
| MedConnect Egypt | `/work/medconnect-egypt` | `Stage 2 Case Studies §4.A` | `Stage 2 Case Studies §4.C` | `Stage 2 Case Studies §4.D` | 1. Doctor Referral Dashboard (`/projects/medconnect/doctor_dashboard/screen.png` + `/projects/medconnect/preview.mp4`); 2. Encrypted Patient Record (`/projects/medconnect/patient_medical_record/screen.png`); 3. Geofenced Referral Creation (`/projects/medconnect/create_referral_form/screen.png`); 4. Patient Portal Home (`/projects/medconnect/patient_portal_home/screen.png`); 5. Network Admin Console (`/projects/medconnect/admin_dashboard/screen.png`) |
| StayEase | `/work/stayease` | `Stage 2 Case Studies §5.A` | `Stage 2 Case Studies §5.C` | `Stage 2 Case Studies §5.D` | 1. Property Landing & Search (`/projects/StayEase/stayease_landing_page/screen.png` + `/projects/StayEase/stayease_search_results/screen.png`); 2. Property Detail & TTL Lock (`/projects/StayEase/stayease_hotel_detail/screen.png`); 3. Idempotent Confirmation (`/projects/StayEase/stayease_confirmation/screen.png`); 4. Host Inventory Dashboard (`/projects/StayEase/stayease_host_dashboard/screen.png`); 5. Guest & Host Inbox + Video (`/projects/StayEase/stayease_inbox/screen.png` + `/projects/StayEase/preview.mp4`) |
| Classroom Sentinel | `/work/classroom-sentinel` | `Stage 2 Case Studies §6.A` | `Stage 2 Case Studies §6.C` | `Stage 2 Case Studies §6.D` | 1. Service Mark & Live Daemon Video (`/projects/Sintenel/logo.png` + `/projects/Sintenel/preview.mp4`); 2. Stage 01 Async Classroom Poller (`ClassroomSentinelPipelineCard`); 3. Stage 02 Gemini JSON Schema Parser (`ClassroomSentinelPipelineCard`); 4. Stage 03 Idempotent Telegram Dispatcher (`24h`/`2h` thresholds); 5. Honest Scope & `systemd` Allowlist Boundaries (`Stage 2 Case Studies §6.E`) |

---

## 7. Work Index Filters and 13-Project Taxonomy (`/work`)

The `/work` index unifies all **6 Flagship Case Studies** and **7 Studio Showcase & Applied R&D Builds** without duplicating flagship entries in the underlying content data model (homepage `#work` and `/work` both read from the same canonical slug registry).

### Filter Mechanics & Accessibility
- **Filter Tabs (`role="tablist"` or `<fieldset>` radio/button group):**
  1. `All Work (13)` (default, `?category=all`)
  2. `Web & Dashboards (8)` (`?category=web`)
  3. `Mobile & POS Apps (5)` (`?category=mobile`)
  4. `AI & Automation (5)` (`?category=ai`)
  5. `Studio R&D (5)` (`?category=rnd`)
- **Live Counts & Announcements:** Each filter pill renders `>=44px` height, supports Left/Right arrow key + Tab navigation, syncs to URL query parameter `?category=` via `router.replace` (so back/forward and shared URLs preserve filter state), and updates a polite `aria-live="polite"` status banner (`"Showing X of 13 studio builds in [Category]"`).
- **Overlapping Category Membership:** Multi-surface projects (`Glitre Loyalty Platform`, `Classroom Sentinel`, `Aksira`, `Qiraaty`, `Focus Ritual`, `GetLab System`, `AI Collab Platform`) belong to multiple categories simultaneously without duplicating cards when `All Work (13)` is selected.
- **No-JS & Empty State Behavior:** Without JavaScript, all 13 projects remain visible in semantic `<section>` groups (6 Flagships linking to `/work/[slug]` + 7 Showcase cards with inline architectural summaries), alongside the 4 Stage 1 B2B FAQ disclosures. If an unknown `?category=` query produces 0 matches, a clear empty state offers a `Reset to All Work (13)` button (`>=44x44px`).

### 13-Project Overlapping Filter Taxonomy Matrix

Exact distribution across the 13 studio builds: **Web & Dashboards (`8`)** / **Mobile & POS Apps (`5`)** / **AI & Automation (`5`)** / **Studio R&D (`5`)** (`Classroom Sentinel` joins `Studio R&D` as a non-client internal studio automation daemon alongside `Aksira`, `GetLab System`, `AI Collab Platform`, and `AgencyOS`).

| Project | Web & Dashboards | Mobile & POS Apps | AI & Automation | Studio R&D |
| --- | --- | --- | --- | --- |
| Glitre Loyalty Platform | Yes | Yes | No | No |
| HS VPN | No | Yes | No | No |
| QuickChargingPOS | No | Yes | No | No |
| MedConnect Egypt | Yes | No | No | No |
| StayEase | Yes | No | No | No |
| Classroom Sentinel | No | No | Yes | Yes |
| Aksira | No | Yes | Yes | Yes |
| FitForge | No | Yes | No | No |
| Qiraaty | Yes | No | Yes | No |
| Focus Ritual | Yes | No | Yes | No |
| GetLab System | Yes | No | No | Yes |
| AI Collab Platform | Yes | No | Yes | Yes |
| AgencyOS | Yes | No | No | Yes |

---

## 8. Contact Qualification Funnel (`/contact`) & Studio Routing

### Funnel Entry Points & `?offer=` URL Prefill
- Every primary CTA (`Book a Project Review`, `Request a project review`) routes to `/contact`.
- Commercial offer cards on `/#services` and `/services` append `?offer=blueprint`, `?offer=launch-sprint`, `?offer=operations-platform`, or `?offer=product-care` so the Tier `<select>` pre-selects cleanly on arrival while remaining user-editable.

### 6-Field Qualification Form Specification (Low-Friction Single-Screen Layout)
To minimize cognitive friction while capturing Stage 1's exact scoping parameters, fields are arranged in compact paired rows on desktop (`>=600px`) and stacked `>=44px` tall controls on mobile:
1. **Your name `*`** (`type="text"`, `autocomplete="name"`, hint `e.g., Tariq Al-Mansour or Sarah Jenkins`) — Error: *"Please enter your name so we know who to address."*
2. **Company or organization `*`** (`type="text"`, `autocomplete="organization"`, hint `e.g., Gulf Fuel Retail Co. or MedTech Operations Ltd`) — Error: *"Please enter your company or project name."*
3. **Work email address `*`** (`type="email"`, `autocomplete="email"`, hint `name@company.com`) — Error: *"Please enter a valid email address so we can reply."*
4. **Which engagement model fits best? `*`** (`<select>`, 5 locked Stage 1 options from `Product Blueprint` through `Not sure yet`) — Error: *"Select the engagement tier closest to your current stage."*
5. **Target launch or discovery window** (optional `<select>`, paired side-by-side with Field 4 on desktop: `Immediate`, `This quarter`, `Planning ahead`)
6. **What workflow or product are we engineering? `*`** (`<textarea>`, `min-height: 120px`, minimum 20 characters) — Error: *"Add a short description of your workflow or goals (at least 20 characters)."*

### Validation, Submission, Error Recovery & Direct Fallback States
- **Client & Server Validation:** Validates on submit (and clears individual field errors on input change). Invalid fields receive `aria-invalid="true"` and `aria-describedby` pointing to the inline error message; keyboard focus jumps automatically to the first invalid field.
- **Pending State:** Submit button (`Send project review request`, `>=48px` height) disables with `aria-busy="true"` and updates label to `Sending project brief...`.
- **Success State:** Replaces or summarizes form with `role="status"` confirmation: *"Project review request received. A senior engineer will review your brief and reply within one business day."* plus a button to submit another inquiry.
- **Recoverable Failure & Retry:** On Formspree network or HTTP error, preserves 100% of user-typed inputs, displays a `role="alert"` banner (*"Your submission could not be delivered through the form right now. Please email your brief directly to mahmouddattiaa7@gmail.com."*), provides a `Retry submission` button (`>=44x44px`), and renders a clickable `mailto:mahmouddattiaa7@gmail.com` fallback link.
- **Privacy & Trust Signals:** Displays UK (`Europe/London`) and Cairo & GCC (`Africa/Cairo · Asia/Riyadh`) operating clocks, the Formspree transmission privacy note, and a direct link to `/privacy` beside the submit action.

---

## 9. Accessibility and Performance Handoff

### Accessibility Requirements (WCAG 2.1 AA Targets)
- **Touch & Pointer Targets:** Every navigation link, theme/locale switch, filter pill, FAQ trigger, gallery control, lightbox button, and form input/submit control meets a minimum `44x44px` hit target (`min-height: 44px; min-width: 44px`).
- **Landmarks & Skip Navigation:** Single `<header>`, `<nav aria-label="Primary">`, `<main id="main-content">`, and `<footer>` per route, preceded by a keyboard-focusable `Skip to main content` link (`top: 8px` on focus).
- **Heading Integrity:** Strictly one `H1` per route; zero skipped levels (`H1 -> H2 -> H3`).
- **Reduced Motion (`prefers-reduced-motion: reduce`):** Disables smooth scroll animations, accordion slide transitions, and hover micro-transforms; status badges render static indicators with zero looping pulse animations.
- **Diagram & Overflow Safety:** Horizontal overflow at `320px` and `200%` text zoom is prevented globally via `min-width: 0` and wrapping grids; wide architecture diagrams isolate scroll inside their own `overflow-x: auto` frame and expose a full-text summary.
- **Visual Tokens Deferred to Role 2A & Role 2B:** Exact hex colors, font families, type ramp sizes, and contrast verification (`>=4.5:1` body / `>=3:1` UI) belong to Role 2A (`ui-design-system-architect`); `/ar` RTL mirroring belongs to Role 2B (`arabic-rtl-architect`).

### Media Loading & Stage 4 Optimization Backlog
- **LCP & Eager Loading:** Only above-the-fold primary hero media or the lead case-study hero (`/projects/glitre-loyalty-platform/manager/overview.webp`, `/projects/hs-vpn/hero.png` on its detail page) uses `loading="eager"` and `fetchpriority="high"`.
- **Below-Fold Lazy Loading:** All other flagship cards, showcase thumbnails, and detail gallery captures use `loading="lazy"`, `decoding="async"`, and responsive `sizes` attributes. All 7 `.mp4` walkthroughs set `preload="metadata"` with click-to-play controls (zero autoplay video).
- **Stage 4 Critical Compression Flags (`>500 KB` on disk):**
  1. `` `/projects/focus-ritual/Screenshot 2026-04-09 225636.png` `` (`594.2 KB`) — re-encode to `<200 KB` WebP and URL-safe path before production deploy.
  2. `` `/projects/glitre-loyalty-platform/manager/sign-in.webp` `` (`502.4 KB`) — re-encode to `<200 KB` WebP while keeping text legible.

---

## 10. Mandatory Self-Audit Checklist

| Check | Status | Evidence |
| --- | --- | --- |
| Multi-route studio hierarchy (`/`, `/work`, `/work/[slug]`, `/services`, `/studio`, `/contact`, `/ar`) | PASS | Section 2 maps all 7 route groups, global header/footer, UK/GCC clocks, and every Stage 1 copy block with heading levels (`H1 -> H2 -> H3`). |
| All 13 projects mapped with exact Stage 2 covers & frame types | PASS | Section 5 maps all 13 builds (`Glitre Loyalty Platform` through `AgencyOS`), all 6 frame tokens, and all 6 custom component state tables using verified `public/projects` asset paths. |
| All 6 flagship `/work/[slug]` deep dives complete (5 walkthrough steps each) | PASS | Section 6 defines the `136px` sticky TOC rail, diagram viewer, lightbox focus return, no-JS access, and 5 semicolon-separated walkthrough steps for all 6 flagships. |
| Responsive fold budgets (`390x844` <= 844px, `1440x900` <= 900px) & compact card geometry | PASS | Section 3 budgets total `660px` (`390x844`) and `736px` (`1440x900`); Section 4 collapsed `/work` card geometry equals `460px = 200 + 212 + 48`. |
| Filter taxonomy matrix accurate across 13 projects (`8` / `5` / `5` / `5`) | PASS | Section 7 maps all 13 projects across `Web & Dashboards` (`8`), `Mobile & POS Apps` (`5`), `AI & Automation` (`5`), and `Studio R&D` (`5`) with overlapping multi-surface support. |
| Deterministic wireframe verifier (`wireframe_audit.py --verify`) exits `0` | PASS | Executed `python3 roles/ux-and-layout-architect/scripts/wireframe_audit.py --verify docs/stage-3-ux-wireframe-and-layout.md` -> exit `0` (`PASS`). |
| Standalone studio voice (`copy_audit.py` exits `0`, zero personal/founder leaks) | PASS | Executed `python3 roles/conversion-copywriter/scripts/copy_audit.py docs/stage-3-ux-wireframe-and-layout.md` -> exit `0` (`PASS`). |
