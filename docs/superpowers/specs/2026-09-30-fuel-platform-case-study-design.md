# Glitre Loyalty Platform — case study design specification

**Date:** 2 October 2026 (revision 5)
**Display name (owner-provided):** **Glitre Loyalty Platform**
**Project:** Mahmoud portfolio (`portfolio`)
**Hub task:** `task_c9ceb70ac8854372801737edc6ba6e2c` (active)
**Worktree:** `portfolio-task-gleater-platform`
**Companion audit:** `2026-09-30-glitre-evidence-audit.md`
**Status:** Design awaiting owner review — no implementation in this dispatch

> The owner-provided display name is **Glitre Loyalty Platform**.
> The source repository contains historical naming variants, including
> `gLiter` in some code identifiers. Use the owner-confirmed name Glitre
> in every public-facing line, and preserve historical spellings only
> when quoting source paths or identifiers verbatim.

This spec defines the case-study surface for the loyalty platform that
the engineer's team built and deployed for a fuel-station network in
the GCC. It follows the existing portfolio's HS VPN model
(`docs/superpowers/specs/2026-09-25-hs-vpn-portfolio-design.md`) and
inherits the publication gate in `src/lib/content.ts`. Every page,
route, screenshot, claim, and file change lives inside the existing
`src/app/work/`, `src/components/case-study/`, `src/content/work/`,
`src/lib/`, and `docs/superpowers/specs/` owned paths.

---

## 1. Intent and success

A visitor lands on `/work`, sees **one flagship engagement** for the
loyalty platform (replacing today's text-only entry), reads the parent
case study at `/work/glitre-loyalty-platform`, and can opt into one of
three deeper product studies (`/work/glitre-loyalty-platform/manager`,
`/work/glitre-loyalty-platform/customer-app`,
`/work/glitre-loyalty-platform/worker-app`) without ever linking into
the private manager dashboard, or implying that the unpublished
customer / worker apps are publicly available. Each page shows real
screenshots where they exist and honest, captioned design-time mockups
where they do not.

The display name is **Glitre Loyalty Platform**. The three products
are the manager dashboard, the customer app, and the worker app. The
shared backend / API is the foundation, not a fourth product.

Success means:

- The work index still shows **one** flagship card (not four) for the
  loyalty platform.
- The parent case study communicates platform breadth and real visual
  proof above the fold, then walks one end-to-end loyalty journey,
  then links to the three deeper studies.
- Each deeper study earns its place by showing **product-specific
  evidence** the parent study cannot show: dashboard role / Arabic
  coverage, customer app screen flow, worker app screen flow and
  station hand-off discipline.
- Every claim is traceable to the companion audit; every screenshot
  has a visible provenance caption and a privacy-redaction record.
- The manager dashboard stays private — only redacted screenshots and
  a controlled vocabulary ("used internally", "screenshots only").
- The customer app is described as **preparing for store release**
  (not in stores, not downloadable from a public URL).
- The worker app is described as **POS integration planned, not
  complete** (no station hardware qualification yet, no production
  POS deployment).
- The npm `build` and `lint` pass; the existing publication gate in
  `src/lib/content.ts` still rejects anything `unverified` or
  `pending`.

---

## 2. Visitor experience, page by page

### 2.1 Work index — `/work`

No structural change to the index. The current flagship fuel-platform
card already lives at the top of `caseStudies`
(`src/lib/content.ts:43-101`); the HS VPN precedent is the second
card. This work replaces the empty `media: []` on the loyalty-platform
card with redacted screenshots and adds three "deeper study" badges,
but **keeps it as one card**.

The card copy moves from text-only to a one-line "what we built" + a
visible "3 deeper studies" row linking to the parent study only. The
deeper studies are reachable from inside the parent article, not from
the card. The index filters (client / employer / internal / owned /
university / concept) keep working; no new filter category is added.

**Slug:** `glitre-loyalty-platform`. Use **Glitre Loyalty Platform**
as the display name in the card title, breadcrumb, and parent study's
hero eyebrow. The lowercase slug is URL structure only. See §3.1 for
the slug strategy and the existing `loyalty-operations-platform` URL behavior.

### 2.2 Parent study — `/work/glitre-loyalty-platform`

Replaces today's `/work/loyalty-operations-platform` slug for new
visitors. The existing article in
`src/components/case-study/case-study-article.tsx` and its
presentation in `src/components/case-study/presentation.ts` are
reused for the new slug; the HS VPN precedent shows the slug swap
pattern (`src/app/work/[slug]/page.tsx:54`).

Order of sections (mirrors HS VPN design §"Full article", with the
end-to-end loyalty loop as a new "the loop" section between the numbers
and the situation):

1. **Hero and facts** — eyebrow `Case study · Loyalty platform · Fuel retail · GCC`;
   headline remains anchored on the *platform* ("A fuel-station
   network had no way to know its repeat customers"); role `Product
   and engineering lead`; timeline `July 2026 – production August
   2026`; status `Backend live in Azure UAE North (2026-08-12) ·
   Manager dashboard live and private · Customer app code in place
   across 21 catalogued screens, preparing for store release · Worker
   app code in place across 14 catalogued screens, POS hardware
   integration planned, not complete`.
   **Remove** today's "customers signing in by email today" — the
   email-port is **designed, not implemented** (`audit §4.2` row 2).
   The owner-provided direction places the customer app in
   "preparing for store release" and the worker app's POS integration
   in "planned, not complete" — both phrasings appear in copy.
2. **The platform at a glance** — diagram already in
   `src/components/case-study/architecture-diagram.tsx:64` is reused;
   the diagram label changes from "Four products" to **"Three
   products, one shared backend"** (customer app, worker app, manager
   dashboard, with the API as the foundation beneath).
3. **The end-to-end loyalty loop** — **new section**, traceable to
   `audit §3.5` table. Three hand-offs (customer ↔ worker ↔ manager
   dashboard), two idempotency boundaries (purchase, redeem). Frames
   use the existing `illustrative-frames.tsx` so visual continuity
   with the HS VPN spec is preserved.
4. **What we delivered** — keep the existing `deliveryCards`
   structure but reduce from four cards to **three product cards**
   plus **one foundation card** (the backend / API). Each card gets
   the controlled vocabulary from `audit §7`:
   - Customer app: *"Arabic-first, right-to-left. 21 screens
     catalogued; the public station flows render in the build. Five
     screens remain `ComingSoonBody` stubs; no mobile end-to-end test
     suite yet. Preparing for store release — store submission, OTP
     delivery adapter, account deletion, and a production signing key
     are the next phase."*
   - Worker app: *"Android, scanner-led, idempotent retries. 14
     screens catalogued with server-authoritative hand-offs. POS
     hardware integration is planned, not complete — hardware
     qualification, MDM distribution, and the choice between public
     vs managed distribution are the next phase."*
   - Manager dashboard: *"Internal tool. Nine pages, role-based,
     Arabic and English. Live and used internally; not published to
     the open web."*
   - The foundation: *"One API contract, one ledger, one queue. In
     Azure UAE North."*
5. **How it fits together** — keep existing `architectureHeading` +
   `architectureLine`; add one explicit sentence on **why one OpenAPI
   contract is the seam** (link to `packages/contract/openapi.yaml` as
   the source of truth — not the URL, the fact).
6. **Deeper studies** — three-card row linking to
   `/work/glitre-loyalty-platform/manager`,
   `/work/glitre-loyalty-platform/customer-app`,
   `/work/glitre-loyalty-platform/worker-app`. Each card has:
   product name, one-line scope, **what evidence you will see here**
   (e.g. *"role-aware screens in Arabic and English"* for the manager
   dashboard), and **what is not shown** (e.g. *"the live dashboard
   URL"*).
7. **Decisions that matter later** — keep the existing three
   decisions (`presentation.ts:201-223`): balance nobody can quietly
   edit, code that works exactly once, products that cannot drift
   apart. Add a fourth: *"Data stays in-region"* — Saudi PDPL is the
   reason the production region is UAE North and not central
   (`PROJECT_CONTEXT.md:24`).
8. **Closing** — keep the existing closing (`presentation.ts:234-239`)
   but update the lead-in: the next-phase work is named honestly
   (customer app store release, worker POS hardware qualification,
   dashboard legal pages and account deletion).

### 2.3 Manager dashboard study — `/work/glitre-loyalty-platform/manager`

A dedicated article that goes deep on the manager dashboard. **No
link into the live dashboard.** Screenshots only, with redacted
customer / worker names where the original would show them. The
audit's audited findings (audit-2026-08-16) are the source of truth
for what was actually captured and what was measured.

Order:

1. **Hero** — eyebrow `Dashboard study · Internal operations`.
   Headline: *"An internal control surface for stations, workers,
   customers, transactions, complaints and offers."* Role: `Product
   and engineering lead`. Status: `Live and private`. Evidence:
   `Verified privately` — detail in the audit report.
2. **Nine pages** — inventory from
   `apps/web/docs/ux/02-screen-inventory.md`: login, overview,
   stations, workers, customers, transactions, complaints, audit,
   offers. Each page gets one sentence on its role.
3. **Real visual proof** — the audit captured 36 PNGs at 1440 × 900
   and 390 × 844 for the 9 pages × 2 locales × 2 viewports, with **0
   axe-core WCAG 2.1 AA violations, 0 console errors, 0 failed
   network requests** (`audit §5.1`). Because the captures are not
   on disk (`audit §6.1`), the implementation dispatch must decide
   between (a) recovering the captures from the audit operator's
   machine, (b) re-running `audit-2026-08-16/audit.mjs`, or (c)
   sourcing redacted mockups. **In this design dispatch, screenshots
   are listed in §4 Screenshot inventory; no images are committed.**
4. **Roles and permissions** — RBAC-aware navigation; `admin / cs /
   finance` roles with silent token refresh and access-denied states.
   Quote the `apps/web/docs/ux/03-critical-workflows.md` requirement
   *"use minimum necessary disclosure. Never calculate balance
   client-side"* (line 89-93).
6. **Arabic-first rendering** — the platform says Arabic is primary,
   English secondary. Honest disclosure: 7 protected pages currently
   ship with hardcoded English headings/text in AR locale
   (`audit-2026-08-16 §2 lines 39-69`). Quote the fix path as part
   of the work-in-progress narrative, not as a hidden flaw.
7. **Critical workflows** — the eight flows in
   `apps/web/docs/ux/03-critical-workflows.md`: Login, Stations,
   Workers, Customer Lookup, Transaction Search, Manual Adjustment,
   Reversal, Rewards & Offers, Audit. Surface the **reversal** flow
   specifically — *"Reversal never edits the original transaction.
   Use 'reverse' language, not delete or undo history"*
   (`03-critical-workflows.md:166-167`) — as a concrete example of
   the audit-by-design principle.
8. **What you cannot see here** — controlled vocabulary: the live
   dashboard URL is private; this page shows redacted screenshots
   only; production tenant data is not exposed; credentials and
   tokens are not shown.

### 2.4 Customer app study — `/work/glitre-loyalty-platform/customer-app`

Order:

1. **Hero** — eyebrow `Customer app study · Arabic-first loyalty`.
   Headline: *"From a phone, a driver sees a balance, holds up a
   code, redeems a reward, files a complaint."* Status: `Code in
   place across 21 catalogued screens in Arabic-first RTL; 5 remain
   `ComingSoonBody` stubs; mobile end-to-end test suite is not yet in
   place; preparing for store release — not yet in stores.`
   Evidence: `Verified privately` — design and code archived.
2. **The loop the customer experiences** — five-step walk traced to
   `audit §3.5` (Discover stations → Register → My QR → Redeem
   reward → Submit complaint), with each step calling out which of
   the **21 screens** in `06-screen-catalog.md:762-766` the customer
   lands on.
3. **What we built** — concrete list: 21 screens in 4 groups (Public
   4, Registration 3, Login 2, Authenticated 12) catalogued
   (`06-screen-catalog.md:60-766`); Arabic-first with RTL; Latin
   digits for points and countdowns per the settled RTL convention
   (`01-information-architecture.md:65-69`); explicit "five screens
   still use `ComingSoonBody` stubs" (`audit §1.1` row 1).
4. **Real visual proof** — at present, **two distinct sources of
   customer-app imagery** exist (`audit §6.2`, `audit §6.3`):
   - **Five usable Stitch design-time mockups** (`audit §6.2`):
     `home.png`, `my-vouchers.png`, `profile.png`,
     `public-stations.png`, `redeem-confirm.png`. All 203–226 × 512.
     **None are device captures** — every caption must say so. The
     implementation dispatch will copy these into
     `public/projects/glitre-loyalty-platform/customer-app/` with a
     `STITCH-SOURCE.md` provenance note alongside, mirroring the HS
     VPN precedent. The address-line row visible in
     `public-stations.png` ("1247 شارع …") should be cropped or
     replaced before any public copy.
   - **Five renderable archived UI captures** at
     `apps/customer/.run/` (`audit §6.3`):
     `screen-20260820-192517.png`, `screen-now3.png`,
     `screen-pulled.png`, `screen-redesign.png`, `screen-v3.png`.
     All 1080 × 2400, added in commit `aca5460` (2026-08-20). These
     are the **only** on-disk visual proof that the Flutter app
     actually renders the public station flows. **Their device-vs-
     emulator provenance is unverified** (commit message reads "UI
     reference screenshots"; filenames do not follow a device-
     capture convention). Visual inspection (this audit, §6.3)
     confirms multiple captures expose literal CRM-seeded station
     identifiers, raw enum service-tag chips (raw enum values, not
     localized labels), an English station-name string from seed
     data, and image-loading spinners in the hero slot. The
     implementation dispatch **must not** publish any of them
     without (a) owner confirmation of origin, and (b) pixel
     redaction of visible station identifiers, raw enum service
     tags, English station names, and partial-arc loading spinners,
     or — preferred for the case study — substitute the Stitch
     mockup for the same screen and keep the `.run/` capture as
     private evidence. `screen-20260820-194126.png` is corrupt and
     excluded.
5. **What's next — preparing for store release** — token refresh
   (15-minute expiry is unmitigated today — `audit §4.4` sessions
   bullet); email-OTP interim delivery (designed, not implemented —
   `audit §4.2` row 2); account deletion (absent across API, app,
   website — `audit §4.4` account deletion bullet); privacy policy
   source still has placeholders for legal entity details (`audit
   §4.4` privacy placeholders bullet); production signing keys
   (today's APKs are debug-signed — `audit §4.4` debug-signed-APKs
   bullet); iOS bundle configuration (`audit §4.4` iOS release
   bullet); store-review OTP access (`audit §4.4` no-reviewer-access
   bullet); in-app Terms link (`audit §4.4` dead-control bullet).
6. **What you cannot see here** — controlled vocabulary: no store
   listing to link to, no production OTP delivery, no real device
   captures unless the owner provides them.

### 2.5 Worker app study — `/work/glitre-loyalty-platform/worker-app`

Order:

1. **Hero** — eyebrow `Worker app study · Android station
   operations`. Headline: *"A scanner-led app for the worker at the
   station, with idempotent retries that settle once."* Status: `14
   screens catalogued with server-authoritative hand-offs; code in
   place but not deployed to production hardware; POS hardware
   integration is planned, not complete; no mobile end-to-end test
   suite.` Evidence: `Verified privately` — design and code
   archived.
2. **The loop the worker experiences** — `audit §3.5` row 4-8:
   scan → purchase entry → review → confirm; voucher consume;
   session activity. Traced to `apps/worker/design/03-screen-specs.md`
   and `apps/worker/design/01-information-architecture.md`.
3. **What we built** — 14 screens (`03-screen-specs.md`), one
   assigned station (no station picker), `mobile_scanner` for QR
   capture, `Idempotency-Key` on every value-moving write.
   Server-authoritative — *"The worker app never calculates points,
   balances, eligibility, station authority, or voucher validity"*
   (`apps/worker/design/01-information-architecture.md:9-13`).
4. **Hand-off discipline** — three concrete examples: (a) the
   success screen never shows the customer's full balance
   (`03-screen-specs.md:93-96` — *"Do not display: computed
   estimates, unconfirmed points, or customer full balance"*); (b)
   minimal disclosure — only the server-returned masked identity is
   shown to the worker (`01-information-architecture.md:11`); (c)
   "No false success" — success appears only after a confirmed 2xx
   response (`01-information-architecture.md:10`).
5. **Real visual proof** — **none on disk today** (`audit §6.4`
   worker design assets). The implementation dispatch must source
   real captures from a future build or fall back to labelled design-
   intent sections.
6. **What's next — POS integration planned** — POS hardware name,
   Android version, CPU ABI, scanner interface, kiosk / MDM policy,
   vendor printer SDK, real-device qualification (`audit §5.2` POS
   qualification bullet, `audit §4.4` POS bullet). Production
   signing key (`audit §4.4` debug-signed-APKs bullet). Worker app
   distribution model: public vs managed (OD-5). Until those exist,
   the page does not claim production-station deployment.
7. **What you cannot see here** — controlled vocabulary: no live
   POS hardware to point to; no production-distribution channel; no
   vendor SDK integration.

### 2.6 Back-navigation and inter-study links

- Every page has a **visible breadcrumb** above the title: `Work ›
  Glitre Loyalty Platform › <Manager | Customer app | Worker
  app>`.
- Each deeper study ends with a **three-card "neighbour studies"
  row** in the same style as the parent's deeper-studies row, so a
  visitor can move between the three products without going back to
  the work index.
- The parent study is reachable from every deeper study via the
  breadcrumb and via a "Back to overview" button row.
- The footer line on every page is the standard case-study footer
  (`presentation.ts:240-246`) updated to reference the manager
  dashboard's `verificationDate` and a confidentiality note.

---

## 3. Routes, navigation, and Next.js structure

| Route | Page | Render via |
| --- | --- | --- |
| `/work` | Work index | `src/app/work/page.tsx` — unchanged structure |
| `/work/glitre-loyalty-platform` | Parent study | `src/app/work/[slug]/page.tsx` with slug `glitre-loyalty-platform` |
| `/work/loyalty-operations-platform` | Legacy inbound URL | `src/app/work/[slug]/page.tsx` issues a permanent redirect to `/work/glitre-loyalty-platform` |
| `/work/glitre-loyalty-platform/manager` | Manager deep study | New dynamic route, but rendered through a **shared** child layout — see §3.3 |
| `/work/glitre-loyalty-platform/customer-app` | Customer app deep study | Same shared layout |
| `/work/glitre-loyalty-platform/worker-app` | Worker app deep study | Same shared layout |

### 3.1 Owner-selected slug and legacy URL behavior

The current entry is at slug `loyalty-operations-platform`
(`src/lib/content.ts:43-101`). On 2026-10-02, the owner selected the
permanent-redirect option. Rename the existing case-study record and
its presentation key to `glitre-loyalty-platform`; do not create a
second case-study record and do not flip `publicationStatus` to
`private`. The work index must show one Glitre Loyalty Platform card.

Keep `/work/loyalty-operations-platform` working as a permanent redirect
to `/work/glitre-loyalty-platform`. Implement it inside the task-owned
`src/app/work/[slug]/page.tsx`: include the legacy slug explicitly in
`generateStaticParams` while `dynamicParams = false`, then call
`permanentRedirect('/work/glitre-loyalty-platform')` before looking up a
case-study record. Next.js `permanentRedirect` returns HTTP 308
([API reference](https://nextjs.org/docs/app/api-reference/functions/permanentRedirect)).
Do not change `next.config.ts`; it is outside this task's owned paths.

The publication gate in `src/lib/content.ts:11` continues to exclude
`unverified` and `pending` records. The rename leaves that gate intact.

### 3.2 `src/app/work/[slug]/page.tsx`

Currently selects between HS VPN (a dedicated `HsVpnArticle`) and the
generic `CaseStudyArticle` (lines 54-77). This design adds a third
branch for `glitre-loyalty-platform` and its children:

- For `glitre-loyalty-platform`, render a new `GlitreArticle`
  (parent study component) reusing the existing `ContentsRail`,
  `CaseStudyGrain`, `ThemeGate`, and `cs-page` / `cs-shell` /
  `cs-layout` classes.
- For `glitre-loyalty-platform/manager`,
  `glitre-loyalty-platform/customer-app`,
  `glitre-loyalty-platform/worker-app`, render a new
  `GlitreProductArticle` child component.

### 3.3 Shared layout for the four pages

A new `src/app/work/glitre-loyalty-platform/` directory holds:

- `layout.tsx` — breadcrumb, theme-gate, grain, contents-rail,
  footer-line. Wraps all four routes. The contents-rail labels
  change per page; the layout does not.
- `page.tsx` — the parent study.
- `manager/page.tsx` — the manager deep study.
- `customer-app/page.tsx` — the customer app deep study.
- `worker-app/page.tsx` — the worker app deep study.
- `content.ts` — the locale-aware copy for all four, following the
  existing `src/content/work/index.ts` pattern.

### 3.4 Existing precedents that are reused, not duplicated

- `src/components/case-study/contents-rail.tsx` — used by parent and
  children.
- `src/components/case-study/grain.tsx` — used by parent and children.
- `src/components/case-study/theme-gate.tsx` — used by parent and
  children.
- `src/components/case-study/architecture-diagram.tsx` — reused for
  the parent's "How it fits together" section; updated label for the
  manager dashboard.
- `src/components/case-study/illustrative-frames.tsx` — reused for
  the parent's end-to-end journey frames.
- `src/components/case-study/architecture-band.tsx` and
  `closing-band.tsx` — reused on the parent study.

No new CSS framework is introduced. New visual styles go into a
dedicated `src/app/work/glitre-loyalty-platform/glitre.css`
mirroring the HS VPN precedent's scoped files, and are imported once
from the shared layout.

---

## 4. Screenshot inventory and captions

The implementation dispatch copies approved sources into
`public/projects/glitre-loyalty-platform/<product>/` with a sibling
`SOURCE.md` provenance note per product. **Nothing is copied in this
design dispatch.** The table below is the controlled inventory.

### 4.1 Manager dashboard

| Slot | Source | Caption | Permission |
| --- | --- | --- | --- |
| Overview (desktop EN) | `audit-2026-08-16/shots/desktop/en/overview.png` (not on disk — see `audit §6.1`) | "Manager dashboard, overview, English, desktop. Names and station identifiers redacted. From the 2026-08-16 accessibility and locale audit." | Mahmoud approval, Hub decision (to record) |
| Overview (desktop AR) | `audit-2026-08-16/shots/desktop/ar/overview.png` | "Same view in Arabic with full RTL mirroring. The overview page is the dashboard's reference page for localization." | Same |
| Stations (desktop AR) | `audit-2026-08-16/shots/desktop/ar/stations.png` | "Stations, Arabic, desktop. Note: this page is one of seven protected pages whose English headings still surface in Arabic; the fix is documented work, not a hidden flaw." | Same |
| Transactions (desktop EN) | `audit-2026-08-16/shots/desktop/en/transactions.png` | "Transactions search, English, desktop. Cursor pagination, server-side filters, URL-encoded filter state." | Same |
| Transactions (mobile AR) | `audit-2026-08-16/shots/mobile/ar/transactions.png` | "Same view at 390 × 844 with the sidebar collapsed to a hamburger and the RTL drawer flipped to the right edge." | Same |
| Complaints (desktop EN) | `audit-2026-08-16/shots/desktop/en/complaints.png` | "Complaint queue. Internal notes never appear in customer-facing resolution fields." | Same |

Until the captures are sourced, the parent study and the manager
study must show **no dashboard screenshots**. The case-study text
still works without them, because the manager study can show the
**inventory of nine pages** as a labelled table until the captures
arrive.

### 4.2 Customer app

#### 4.2.1 Stitch design-time mockups

| Slot | Source | Caption | Permission |
| --- | --- | --- | --- |
| Public Stations | `apps/customer/design/assets/stitch-review/public-stations.png` | "Public stations list (Stitch design mockup, not a device capture). Anyone can browse the network before registering; discovery is intentionally not gated." | Mahmoud approval, design provenance |
| Home | `apps/customer/design/assets/stitch-review/home.png` | "Authenticated home (Stitch design mockup). Balance card, voucher banner when a Reserved voucher exists, recent activity." | Same |
| My Vouchers | `apps/customer/design/assets/stitch-review/my-vouchers.png` | "My Vouchers (Stitch design mockup). Active / Used / Expired filter; expired vouchers flip client-side from `validUntil`." | Same |
| Profile | `apps/customer/design/assets/stitch-review/profile.png` | "Profile (Stitch design mockup). Language toggle (Arabic / English), theme toggle (Light / Dark / System), complaint entry, sign-out." | Same |
| Redeem Confirm | `apps/customer/design/assets/stitch-review/redeem-confirm.png` | "Redeem confirm interstitial (Stitch design mockup). Single-use, idempotent; `Idempotency-Key` is generated once on open and reused on retry." | Same |
| Excluded | `apps/customer/design/assets/stitch-review/live-app-1.png` | **Corrupt file; do not use.** | — |
| Excluded | `apps/customer/design/assets/station-placeholders/*.png` | Station placeholders are design-time assets; not used as product screenshots. The 1672 × 941 PNGs (~2 MB each) are acceptable as illustrative placeholders **only after compression** to < 250 KB. | — |

#### 4.2.2 Archived `.run/` UI captures (gated on owner review and redaction)

Five renderable captures exist at `apps/customer/.run/` (1080 × 2400
PNGs added in commit `aca5460`, 2026-08-20). They are the only on-
disk visual proof that the Flutter app actually renders the public
station flows. **Provenance is unverified** — the commit message
reads "UI reference screenshots" (not "device captures" or "emulator
captures"), filenames include `v3`, `redesign`, `pulled`, `now3`, and
two filenames carry a date-time suffix. Visual inspection (this audit,
§6.3) confirms **every one of the five renderable captures exposes
literal CRM-seeded station identifiers (a fixed `CRM`-prefixed ID
pattern on multiple rows), at least one capture exposes raw enum
service-tag chips (raw enum values, not localized labels), at least
one capture exposes an English station-name string from seed data,
and image-loading spinners appear in hero / thumbnail positions in
four captures.** Literal station IDs, raw enum service tags, English
station names, and customer names must not appear in the case study
in any form, even partially.

The implementation dispatch must choose **per slot** between:

- (a) **Redact and reuse** — pixel-mask visible station identifiers,
  raw enum service tags, English station names, and loading
  spinners, then publish with a captioned provenance line: *"Customer
  app runtime capture, August 2026, origin confirmed by owner;
  identifiers, raw service-tag values, English station names, and
  loading states redacted."*
- (b) **Substitute the Stitch mockup for the same screen** and keep
  the `.run/` capture as private evidence only.
- (c) **Skip the slot** entirely until the implementation phase lands
  real-device captures (see `audit §6.7`).

Until the owner confirms origin and approves the redaction approach,
**none of these are committed to
`public/projects/glitre-loyalty-platform/customer-app/`**.

| Slot (planned) | Source | State | Permission |
| --- | --- | --- | --- |
| Public station list | `apps/customer/.run/screen-20260820-192517.png` | Station-list capture; layout matches Stitch mockup at higher fidelity; visible CRM-seeded station identifiers require pixel redaction | Owner confirms origin; pixel redaction approved |
| Public station list (alt) | `apps/customer/.run/screen-pulled.png` or `screen-v3.png` | Same view, second take; one thumbnail shows a partial-arc loading spinner; row text contains a literal CRM-seeded station identifier (truncated in row) and other CRM-prefixed IDs | Owner confirms origin; pixel redaction approved |
| Station detail | `apps/customer/.run/screen-now3.png` | Station detail with image-loading spinner in the hero slot; station detail header contains a literal CRM-seeded station identifier | Owner confirms origin; pixel redaction approved |
| Station detail (alt) | `apps/customer/.run/screen-redesign.png` | Station detail with carousel dots and three **raw enum** service-tag chips (`convenience_store`, `fuel`, `tire_service`); hero slot shows loading spinner | Owner confirms origin; pixel redaction approved |
| Excluded | `apps/customer/.run/screen-20260820-194126.png` | **Corrupt file (UTF-8 mojibake of the PNG header); do not use.** | — |

### 4.3 Worker app

**No usable screenshots on disk.** Slots reserved:

| Slot | Source (planned) | Caption (planned) |
| --- | --- | --- |
| Home / Station Hub | `apps/worker/design/` (no asset yet) | "Worker home, station hub. Two dominant actions: scan customer purchase, consume voucher." |
| Customer Scanner | Same | "Live QR scanner via the `mobile_scanner` package. Permission UX is part of the flow." |
| Purchase Confirming → Success | Same | "Pending state shows the server-confirmation message only — never a success icon. Success shows `transactionRef` and `pointsAwarded`." |
| Voucher Review | Same | "Final review before consume; `Idempotency-Key` generated once and reused on retry." |
| Recent Activity | Same | "Read-only, current session only. Activity does not survive a restart until a server endpoint exists." |

Until these exist, the worker study shows the screen inventory as a
labelled list and uses **textual** hand-off frames (no fake
screenshots). The case study page says so in copy, not in a footnote.

### 4.4 Brand / hero candidates (parent study only)

`apps/web/public/brand/{gliter-hero-v2.png, gliter-logo.png,
gliter-station-1.jpeg}` and
`apps/web/docs/ui-slides/brand-assets/*.jpg,*.jpeg` are brand
assets, not product captures. The brand-scrape provenance
(`BRAND-SCRAPE.md`) must be preserved if any are deployed, and any
incidental signage re-checked for identifiers before publication.
**The HS VPN precedent shows how to disclose brand-scrape provenance
in a caption.**

### 4.5 Forbidden visual material

- The live manager dashboard URL `[private dashboard host omitted]`.
- The API URL `[private API host omitted]` (the embedded production
  URL inside the APK; not appropriate for a portfolio).
- `[public marketing host omitted]/*` URLs (they currently serve the
  company homepage HTML with the same SHA-256 — `audit §4.4`
  public-legal-pages bullet, citing `audit-2026-08-25 §1` lines
  35-49).
- The `com.gliter.*` bundle identifiers (acceptable in code
  disclosure, not as marketing copy that implies public availability).
- Any customer / worker name, phone, OTP, voucher code, complaint
  text, ledger entry, audit-event content.
- Literal station identifiers (including CRM-seeded IDs visible in
  the archived `apps/customer/.run/` captures), raw enum service-tag
  chips, English station-name strings, and partial-arc loading
  spinners visible in those captures, unless pixel-redacted under
  owner approval (`audit §6.3`, `audit §6.6`).
- The original `gLiter` logo as a portfolio brand mark — use the
  portfolio's own brand treatment when the platform is shown at the
  parent level. Use the owner-confirmed **Glitre Loyalty Platform**
  name in the case-study surface; do not substitute the historical
  `gLiter` logo or spelling.

---

## 5. Claim / evidence rules

Every result on the page must satisfy:

| Field | Rule | Source |
| --- | --- | --- |
| `claim` | One sentence. No "today", "now", "live users", "active users". | This spec |
| `proofState` | One of `verified-public`, `verified-private`, `unverified`. Never `unverified` in a public record. | `src/lib/content.ts:11` |
| `evidenceRef` | Concrete path, runbook, date, or Hub decision ID. | `src/lib/content.ts:29` |
| `lastVerified` | ISO date, never more than 30 days stale at the moment the case study is published. | `src/lib/content.ts:34` |

The 12 controlled claims for the Glitre Loyalty Platform record are:

1. *Backend is live in production in Azure UAE North.*
   `verified-private`, evidence: `PROJECT_CONTEXT.md:60, 120-156` +
   `audit-2026-08-25 §Executive verdict`, last-verified 2026-09-17
   (re-check before each release).
2. *One OpenAPI contract is the seam between the API and the three
   clients.* `verified-private`, evidence:
   `PROJECT_CONTEXT.md:46-48` and `packages/contract/openapi.yaml`
   exists.
3. *The manager dashboard runs 9 pages, role-based, Arabic and
   English with RTL.* `verified-private`, evidence:
   `apps/web/docs/ux/02-screen-inventory.md` + `audit-2026-08-16 §4`.
4. *0 axe-core WCAG 2.1 AA violations across the dashboard's 36
   audited captures.* `verified-private`, evidence:
   `audit-2026-08-16 §4.1` (lines 95-110).
5. *The customer app design catalogs 21 screens across the loop in
   Arabic-first RTL; the public station flows render in the build,
   while five screens remain `ComingSoonBody` stubs and no automated
   mobile end-to-end test suite exists. The app is preparing for
   store release — not yet in stores.* `verified-private`, evidence:
   `06-screen-catalog.md:60-766`; `audit §4.4` (mobile end-to-end
   suite bullet); `audit §7` customer-app controlled vocabulary.
6. *The worker app design catalogs 14 screens with server-
   authoritative hand-offs; no on-device captures, no mobile end-
   to-end test suite, and no POS hardware qualification exist. POS
   hardware integration is planned, not complete.*
   `verified-private`, evidence:
   `apps/worker/design/03-screen-specs.md`; `audit §4.4`;
   `audit §5.2` (POS qualification bullet); `audit §7` worker-app
   controlled vocabulary.
7. *Customer and worker apps are not published in any store today.*
   `verified-private`, evidence: `audit-2026-08-25 §Executive
   verdict` (lines 11-12) + §3, §6.
8. *Both current Android APKs are signed with the shared debug
   key.* `verified-private`, evidence: `audit-2026-08-25 §3`.
9. *Email-OTP interim delivery is designed, not implemented.*
   `verified-private`, evidence: `PROJECT_CONTEXT.md:168`,
   `08_Build_State_Three_Buckets.md:53`.
10. *POS / forecourt / ZATCA integration is Release C, not Release
    A.* `verified-private`, evidence:
    `08_Build_State_Three_Buckets.md:85`.
11. *Append-only points ledger is enforced by a database trigger.*
    `verified-private`, evidence: `PROJECT_CONTEXT.md:81, 196-197`.
12. *No measured throughput, latency, uptime, conversion, retention,
    revenue, or active-customer figures are claimed.*
    `verified-private`, evidence: `audit §5.2`. (The case study
    explicitly does not assert performance or revenue numbers.)

### 5.1 Owner-provided figures — attribution rules

Any figure not directly measurable in the source repo (timeline,
cost, days from kickoff, named resource, contact, or named vendor) is
attributed to the owner in copy, never asserted as fact. Examples the
implementation dispatch must phrase carefully:

- *"About a month from kickoff to production"* (existing copy) —
  rephrase to *"Deployed to production in August 2026"* with
  attribution to the owner's build log; the exact day count is not in
  the repo.
- *"$102.16/mo vs quoted $70.33"* — rephrase to *"Live cost ~$102/
  month on Azure, +45% over the original $70 quote, driven entirely
  by a Redis SKU change after a Basic-tier retirement"* with
  attribution to `PROJECT_CONTEXT.md:144-149`. **Do not** quote
  monthly Azure spend as a headline figure; it is a footnote at most.

### 5.2 What the page must not claim

The list below is enforced in `src/lib/content.ts:11` (`unverified`
is already excluded) and in the design's textual rules:

- Public App Store / Google Play availability for either app.
- Live POS hardware deployment for the worker app.
- POS / forecourt / ZATCA integration status beyond "planned as
  Release C".
- Live customer count, active users, points earned, vouchers
  redeemed, or revenue uplift.
- Latency, throughput, uptime, conversion, retention.
- Privacy / security claims beyond the architecture's stated
  principles.
- Engagement dates the owner has not confirmed.
- The historical internal spelling `gLiter` as a public-facing
  display name; **Glitre Loyalty Platform** is the approved public
  rendering.

---

## 6. Performance approach for the page

The audit separates **measured** accessibility / console / network
results (`audit §4.1`, `audit §5.1`) from **unmeasured** latency,
throughput, start-up and Core Web Vitals (`audit §4.3`, `audit
§5.2`). The page therefore asserts nothing about runtime performance
and instead frames the following rules as **design budgets** for the
page itself, not measured numbers for the products being shown:

- **Image format:** WebP first, AVIF where the build pipeline
  supports it. No PNG-as-JPEG for screenshots. The two 1672 × 941
  `station-placeholders` PNGs (~2 MB each) are a clear compression
  target.
- **Image weight budget (design target, not measured):** ≤ 80 KB per
  mobile-portrait screenshot; ≤ 250 KB per dashboard capture; ≤ 250
  KB for station placeholders; ≤ 400 KB per hero / banner.
- **Responsive delivery:** `next/image` with explicit `sizes` per
  slot; no raw `<img>` for product captures.
- **Priority loading:** only the **first above-the-fold image** of
  the parent study and the **first capture of each deeper study**
  carry `priority`. Every other capture is lazy.
- **Layout shift:** every non-decorative `<Image>` has explicit
  `width` / `height` (or `fill` inside a sized container) so the
  CLS contribution is zero.
- **Captions:** visible text adjacent to every non-decorative
  capture, with the source label (platform, age, source). Caption
  text is part of the document, not inside the image.
- **Group boundaries:** each deeper study uses at most one priority
  image; the rest are lazy.
- **No JavaScript-driven reveal** for screenshots; honor the
  existing reduced-motion preferences.

Latency, load, throughput, start-up, and Core Web Vitals for the
products shown are **not measured** in the source repository and
must not be claimed on the page. The image-weight budgets above are
an internal design target, not a measured outcome. A Lighthouse run
on the portfolio page itself is **optional follow-up**
(`audit-2026-08-16 §7` recommendation 5) and does not gate the
release.

---

## 7. Responsive and accessibility behaviour

Inherited from the existing case-study shell
(`src/app/work/[slug]/page.tsx` + `case-study.css`) and the HS VPN
design precedent:

- One clear article title per route; section headings map to
  contents-rail IDs (`section-numbers`, `section-situation`,
  `section-delivery`, `section-moment`, `section-architecture`,
  `section-decisions`, plus new `section-loop` for the parent's end-
  to-end story).
- Screenshots get descriptive `alt` text naming the visible UI plus
  the visible caption naming platform and capture age.
- Decorative diagrams use empty `alt` only when equivalent text is
  adjacent.
- Keyboard accessibility: links and image captions remain reachable
  via tab order with visible focus rings.
- Reduced-motion honored via existing site-wide pattern.
- Mobile: image galleries may scroll horizontally with a visible cue;
  layout never introduces horizontal page overflow.
- Desktop: image proportions intact; captions adjacent.
- Unknown slugs continue to return the existing not-found behaviour —
  the `dynamicParams = false` line in
  `src/app/work/[slug]/page.tsx:16` is updated to include
  `glitre-loyalty-platform`,
  `glitre-loyalty-platform/manager`,
  `glitre-loyalty-platform/customer-app`,
  `glitre-loyalty-platform/worker-app`.
- If any image fails to load, the surrounding text and structure
  remain understandable.

---

## 8. Production vs. planned — page language

The page uses the controlled vocabulary from `audit §7`. The five
production-status rows are:

| Surface | Page says |
| --- | --- |
| Backend / API | "Live in Azure UAE North, 2026-08-12. SMS sender, push notifications, tested backup restore, and production seed data are the next phase." |
| Manager dashboard | "Live and used internally; not published to the open web. Screenshots on this page are redacted." |
| Customer app | "Code in place across 21 catalogued screens in Arabic-first RTL; the public station flows render in the build. Five screens remain `ComingSoonBody` stubs and the mobile end-to-end test suite is not yet in place. **Preparing for store release** — store submission, the mobile end-to-end suite, the OTP delivery adapter, account deletion, in-app legal docs, token refresh, store-review access, and a production signing key are the next phase. The captures below are Stitch design mockups from the design-generation pass; they illustrate the settled design intent, not the current debug-signed APK." |
| Worker app | "Built for an Android station device; 14 screens catalogued with server-authoritative hand-offs. **POS hardware integration is planned, not complete** — hardware qualification, MDM distribution, vendor SDK integration, and the choice between public vs managed distribution are the next phase. The earn / voucher-consume loop is not covered by an automated mobile end-to-end test suite. Not deployed to production hardware yet; below: design specs and screen flow." |
| POS / forecourt / ZATCA | "Planned as Release C. The current loop is manual entry by the worker." |
| Push notifications | "Outbox and retry queue exist; the sender adapter is not connected. Notifications listed in product copy are aspirational until this lands." |

---

## 9. Files likely to change

### 9.1 Owned (in scope)

| Path | Change |
| --- | --- |
| `src/lib/content.ts` | Rename the existing `loyalty-operations-platform` record to `glitre-loyalty-platform`; ensure `publicCaseStudies` filter still rejects `unverified` and `pending`. Update the heroMeta, results and `lastVerified` fields to match the controlled vocabulary. **Remove** the existing "customers register and sign in by email code today" copy — see `audit §4.2` row 2. |
| `src/content/work/index.ts` | No change unless the locale set grows. |
| `src/app/work/page.tsx` | No change unless the card needs the deeper-studies badges; default is no change. |
| `src/app/work/[slug]/page.tsx` | Keep the Glitre parent branch; add an early `permanentRedirect('/work/glitre-loyalty-platform')` for the old slug and include that slug in `generateStaticParams` because `dynamicParams = false`. Do not edit `next.config.ts`. |
| `src/components/work-grid.tsx` | No change unless a deeper-studies badge becomes a per-card affordance. |
| `src/app/work/glitre-loyalty-platform/layout.tsx` | **New** — shared chrome for the four routes. |
| `src/app/work/glitre-loyalty-platform/page.tsx` | **New** — parent study. |
| `src/app/work/glitre-loyalty-platform/manager/page.tsx` | **New** — manager dashboard study. |
| `src/app/work/glitre-loyalty-platform/customer-app/page.tsx` | **New** — customer app study. |
| `src/app/work/glitre-loyalty-platform/worker-app/page.tsx` | **New** — worker app study. |
| `src/app/work/glitre-loyalty-platform/glitre.css` | **New** — scoped styles. |
| `src/content/work/glitre-loyalty-platform/en.ts` | **New** — locale-aware copy. |
| `src/components/case-study/glitre-article.tsx` | **New** — parent study renderer. |
| `src/components/case-study/glitre-product-article.tsx` | **New** — child study renderer. |
| `src/components/case-study/glitre-content.ts` | **New** — content and rail sections for all four pages. |
| `public/projects/glitre-loyalty-platform/manager/` | **New** — approved dashboard screenshots + `SOURCE.md` provenance. |
| `public/projects/glitre-loyalty-platform/customer-app/` | **New** — approved Stitch mockups + `SOURCE.md`. |
| `public/projects/glitre-loyalty-platform/worker-app/` | **New** — approved captures + `SOURCE.md` once available. |
| `docs/superpowers/specs/2026-09-30-fuel-platform-case-study-design.md` | **This document** (titled **Glitre Loyalty Platform**). |
| `docs/superpowers/specs/2026-09-30-glitre-evidence-audit.md` | **Companion audit.** |

### 9.2 Forbidden

- `src/lib/data.ts` is legacy and **not** the source of truth. Do not
  edit it.
- `public/projects/hs-vpn/` is the HS VPN evidence set. Do not mix.
- `src/components/case-study/hs-vpn-article.tsx` and
  `hs-vpn-content.ts` are HS VPN–specific. Do not reuse for the
  loyalty platform.
- `src/components/case-study/presentation.ts` may be edited to rename
  the existing `presentationBySlug["loyalty-operations-platform"]` key
  to `presentationBySlug["glitre-loyalty-platform"]` and to replace its
  copy with the approved Glitre story. Do not add a second presentation
  entry.

### 9.3 Unowned (do not touch)

- Anything under
  `/home/kepler/Desktop/Kepler/Projects/Glitre/`.
- `.env.local`, secrets, credentials.
- CI configuration, Vercel project settings.
- The earlier untracked draft at
  `/home/kepler/Desktop/Kepler/Worktrees/portfolio-task-fuel-platform/docs/superpowers/specs/`
  (read-only input to this revision; the earlier `task_…` is not this
  task).

---

## 10. Implementation dispatch — evidence and dependencies

This spec is a design dispatch. It does **not** implement the case
study and does **not** produce build, lint, screenshot, or content-
review evidence. The implementation dispatch that follows this spec
must produce, before any of the four routes publish:

- **`npm run build`** — production build passing. Required evidence
  per the task's `required_evidence` field.
- **`npm run lint`** — ESLint passing. Required evidence per the
  task's `required_evidence` field.
- **Screenshots** — only those approved per §4 are copied into
  `public/projects/glitre-loyalty-platform/<product>/` with a
  sibling `SOURCE.md` per product. The five renderable archived
  `apps/customer/.run/` captures (`audit §6.3`) and the brand-scrape
  assets remain gated on owner approval and pixel redaction of
  literal station identifiers, raw enum service tags, English
  station names, and partial-arc loading spinners. The single
  corrupt file (`screen-20260820-194126.png`, `audit §6.3`) is
  excluded entirely.
- **Content review** — each of the 12 controlled claims in §5 is
  checked against the source cited; the publication gate in
  `src/lib/content.ts` still rejects `unverified` or `pending`. A
  re-check date within the `lastVerified` window (≤ 30 days stale at
  publication) is set per claim.
- **Open questions** — every question in §11 is either resolved or
  recorded as still-open with the agreed phrasing before any of the
  four routes go to review.

The implementation dispatch respects the forbidden-changes boundary
in §8 and the task's `Private dashboard URL, live customer data,
credentials, unverified performance claims, production deploy` list.
The dispatch does **not** claim build, lint, screenshot, content-
review, or implementation evidence that this research dispatch did
not produce; each piece of evidence is recorded in the Hub with the
relevant role (web-ui-engineer, quality-release-engineer, or owner).

Performance on the page itself is a separate question from product
performance: §6 separates measured accessibility / console / network
results (`audit §5.1`) from unmeasured latency, throughput, start-up
and Core Web Vitals (`audit §5.2`); image-weight budgets there are
design targets for the portfolio page, not measured outcomes for the
products shown.

---

## 11. Open questions for the owner (recorded, not blocking this dispatch)

1. **Manager dashboard captures:** can the 36 audit PNGs be recovered,
   or should `audit-2026-08-16/audit.mjs` be re-run, or should the
   implementation dispatch fall back to text + labelled inventory?
2. **Worker app captures:** does the owner have real captures from a
   test build, or should the implementation dispatch commission a new
   capture pass against the same POS-class hardware?
3. **Customer app captures — Stitch vs `.run/`:** does the owner
   prefer the Stitch mockups (clearly captioned as design intent)
   for the customer-app page, **or** does the owner confirm that the
   five renderable `apps/customer/.run/` captures are device /
   emulator captures and approve pixel-redaction of the visible
   station identifiers, raw enum service tags, English station
   names, and partial-arc loading spinners (`audit §6.3`,
   `audit §6.6`, `audit §10` question 2)? Until confirmed, the
   implementation dispatch must not commit any `.run/` PNG to
   `public/projects/glitre-loyalty-platform/customer-app/`.
4. **Legacy URL (resolved 2026-10-02):** rename the existing record to
   `glitre-loyalty-platform` and permanently redirect
   `/work/loyalty-operations-platform` to
   `/work/glitre-loyalty-platform` from the owned `[slug]` page. Include
   the legacy slug in `generateStaticParams`; leave `next.config.ts`
   unchanged.
5. **Production-status language:** confirm the controlled vocabulary
   in §8 before any of the four pages go to review.
6. **Display name (resolved by owner correction):** use
   `Glitre Loyalty Platform` as the public-facing name (card title,
   hero eyebrow, breadcrumb, OG title, footer line). Preserve
   historical `gLiter` spellings only when quoting source identifiers
   or evidence verbatim.

---

## 12. Self-review against the task's "do not" rules

- Did not edit, format, generate inside, commit to, or otherwise
  write to `/home/kepler/Desktop/Kepler/Projects/Glitre`.
- Did not run `curl`, `wget`, `WebFetch`, or any direct web fetch.
- Did not invent metrics, throughput, latency, uptime, conversion,
  retention, revenue, or active-user counts.
- Did not read secret files, credentials, or live customer data.
- Did not connect to the live Azure API or manager dashboard.
- Did not present the unpublished apps as publicly available, POS
  integration as complete, or the manager dashboard as publicly
  linkable.
- Did not write implementation code or copy screenshots into the
  portfolio during this dispatch.
- Did not produce build, lint, screenshot, or content-review
  evidence that this research phase did not produce. The owner will
  run `npm run build` and `npm run lint` in the implementation
  dispatch.
- Did not quote literal station identifiers, raw enum service tags,
  English station names, or customer-facing identifiers visible in
  the archived `apps/customer/.run/` captures; redaction / exclusion
  is the implementation phase's responsibility.
- Redacted every literal private dashboard / API host value and the
  public marketing host in §4.5 with `[private host omitted]` notes;
  the live URLs still exist in the source repo but not here.
- Uses `Glitre Loyalty Platform` as the public-facing display name.
  Source paths retain the actual repository folder name `Glitre`;
  historical `gLiter` identifiers are quoted only where they appear
  verbatim in filenames or code.
- Performance language in §6 is separated into **measured**
  accessibility / console / network audit results (cited from
  `audit §5.1`) and **unmeasured** latency, load, throughput, start-
  up, Core Web Vitals (cited from `audit §5.2`); image-weight
  budgets are framed as design targets, not measured outcomes.
- Read the source `AGENTS.md` and respected the routing rules.

## 13. Artifact locations

- This design spec: `docs/superpowers/specs/2026-09-30-fuel-platform-case-study-design.md` (titled **Glitre Loyalty Platform**).
- Companion audit: `docs/superpowers/specs/2026-09-30-glitre-evidence-audit.md`.
- Source repository (read-only): `/home/kepler/Desktop/Kepler/Projects/Glitre`.
- Customer-app archived UI captures (read-only, provenance unverified, privacy redaction required): `apps/customer/.run/`.
- Earlier (untracked) draft of both files, read-only: `portfolio-task-fuel-platform/docs/superpowers/specs/`.
- Working portfolio worktree: `/home/kepler/Desktop/Kepler/Worktrees/portfolio-task-gleater-platform`.
