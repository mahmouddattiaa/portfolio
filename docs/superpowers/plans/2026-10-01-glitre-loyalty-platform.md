# Glitre Loyalty Platform — Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Owner decision amendment (2026-10-02):** The owner selected Option B: rename the existing Fuel case-study record to `glitre-loyalty-platform` and permanently redirect `/work/loyalty-operations-platform` to `/work/glitre-loyalty-platform`. Implement only this branch. The old Option A examples and any remaining conditional wording below are historical alternatives and must not be executed. Keep the redirect inside the owned `src/app/work/[slug]/page.tsx`: with `dynamicParams = false`, explicitly include `loyalty-operations-platform` in `generateStaticParams`, then call `permanentRedirect('/work/glitre-loyalty-platform')` before the case-study lookup. Do not edit `next.config.ts`, which is outside this task's owned paths.

**Goal:** Replace the current Fuel case study in place with a flagship Glitre Loyalty Platform case study (`/work/glitre-loyalty-platform`), one shared chrome that wraps three deeper product studies (`/manager`, `/customer-app`, `/worker-app`), a flagship card on `/work` with the three product badges, and the controlled screenshot inventory under `public/projects/glitre-loyalty-platform/<product>/`. The plan is approved for implementation; the open screenshot-publication gates in the audit remain in force.

**Architecture:** Keep `src/lib/content.ts` as the public case-study index and publication gate (the gate stays exactly as it is). Rename the existing `loyalty-operations-platform` `CaseStudy` record and its presentation key to `glitre-loyalty-platform`; do not add a second record. Add the new parent copy and retain one flagship work-index card. Build a new shared layout under `src/app/work/glitre-loyalty-platform/` that wraps the parent and the three children with a breadcrumb, the existing theme/grain/rail/footer chrome, and a single scoped stylesheet. Render the parent through a new `GlitreArticle` (reusing the existing `ArchitectureDiagram` and `IllustrativeFrame`s); render each child through a new `GlitreProductArticle` with a small set of typed sections. The four Glitre routes resolve through per-folder pages (`src/app/work/glitre-loyalty-platform/page.tsx`, `…/manager/page.tsx`, `…/customer-app/page.tsx`, `…/worker-app/page.tsx`); `src/app/work/[slug]/page.tsx` continues to handle the `hs-vpn` route and the legacy Fuel URL redirect. Copy lives in a new locale-aware `src/content/work/glitre-loyalty-platform/en.ts` module that follows the existing `WorkLocale` pattern.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, existing CSS module/file pattern (no new tokens, no Tailwind for these surfaces), `next/image` with explicit `width`/`height` and `sizes`, Node 24 for focused data assertions.

**Specs:**
- Design: `docs/superpowers/specs/2026-09-30-fuel-platform-case-study-design.md` (titled **Glitre Loyalty Platform**).
- Evidence audit: `docs/superpowers/specs/2026-09-30-glitre-evidence-audit.md`.
- Companion task: `task_c9ceb70ac8854372801737edc6ba6e2c` (`ready` after this dispatch; today `claimed`).

## Global Constraints

- The Glitre source repository at `/home/kepler/Desktop/Kepler/Projects/Glitre` is read-only. Do not clone, edit, format, generate inside, or otherwise write to it. Treat every source path in the audit as a citation, not a copy source.
- The manager dashboard URL, the API URL, the `[public marketing host omitted]` URLs, and the live customer / worker / OTP / voucher / ledger / audit data are **forbidden surfaces**. The case study shows screenshots only; nothing links to the live dashboard.
- No live dashboard, customer-app, or worker-app links are added to the public site. The customer app is described as **preparing for store release** and the worker app's POS integration as **planned, not complete**. POS / forecourt / ZATCA integration is **Release C, not Release A**.
- No quantitative revenue, retention, conversion, activation, frequency, voucher-redemption, throughput, latency, uptime, or active-customer figure is asserted anywhere. Owner-provided figures (e.g. "31 days from kickoff to production") are attributed in copy, not asserted.
- Preserve the historical internal spelling `gLiter` only in verbatim source-path citations. **Glitre Loyalty Platform** is the public display name (card title, breadcrumb, hero eyebrow, OG title, footer line).
- **Selected canonical slug and redirect:** The owner selected Option B on 2026-10-02. Rename the existing record and presentation key to `glitre-loyalty-platform`; do not add a duplicate record and do not change its publication status to `private`. Preserve `dynamicParams = false`. Include `loyalty-operations-platform` in `generateStaticParams` solely so its route can issue the permanent redirect before content lookup. Use Next.js `permanentRedirect('/work/glitre-loyalty-platform')` in `src/app/work/[slug]/page.tsx` (HTTP 308); do not edit `next.config.ts`. The route-level redirect implementation is within `owned_paths` and replaces the former `next.config` proposal.
- Three image-evidence gates are open. **No product screenshot is committed to `public/projects/glitre-loyalty-platform/` until the owner approves that exact source for publication AND required pixel redaction is complete.** The design spec describes candidate sources but leaves the publication decision open (spec §11 Q3, §4.2.1, §4.2.2; audit §6.2, §6.3, §10 Q2). Owner approval of the design document does not, by itself, authorise publication of any customer-app screenshot:
  - **Manager dashboard:** `audit-2026-08-16/shots/` is excluded by `.gitignore`; the 36 audited PNGs are not on disk. The implementation may either (a) recover the captures from the audit operator's machine, (b) re-run `audit-2026-08-16/audit.mjs`, or (c) ship a labelled inventory table and no images. Until one of these lands, the manager study and the parent study show **no dashboard screenshots**.
  - **Customer app:** *neither* candidate set is approved for publication. The five Stitch design-time mockups in `apps/customer/design/assets/stitch-review/` (`public-stations.png`, `home.png`, `my-vouchers.png`, `profile.png`, `redeem-confirm.png`) are **design-time mockups**, generated by the design tool — the spec calls them so and explicitly notes that several screens were `ComingSoonBody` stubs at generation time (`06-screen-catalog.md:769-780`). The five renderable archived `apps/customer/.run/` PNGs are the only on-disk visual proof that the Flutter app actually renders the public station flows, but their **device-vs-emulator-vs-render provenance is unverified** (audit §6.3; commit message reads "UI reference screenshots"; filenames `v3`, `redesign`, `pulled`, `now3` are not a device-capture convention) and visual inspection confirms they expose literal CRM-seeded station identifiers, raw enum service-tag chips, an English station-name string, and image-loading spinners. The implementation must **not** copy either set to `public/projects/glitre-loyalty-platform/customer-app/` until (a) the owner documents explicit publication approval of the exact source, AND (b) the required pixel redaction of any sensitive identifiers is complete. Until then, the customer-app study renders **labelled placeholders** for each of the five slots. If, and only if, the Stitch mockups are later approved for publication, every caption must read "Stitch design-time mockup, not a device capture"; they must never be captioned as live app captures. The two corrupt PNGs (`live-app-1.png`, `screen-20260820-194126.png`) are excluded entirely; the brand-scrape assets are excluded.
  - **Worker app:** no on-disk screenshots or design mockups (audit §6.4). The worker study shows the screen inventory as a labelled list and uses **textual** hand-off frames; no fake or staged screenshots are committed.
- The publication gate (`src/lib/content.ts:184-189`) is **not** edited: it still rejects `unverified` and `pending`. All 12 controlled claims in §5 of the design spec are `verified-private` with a concrete source path.
- The `data.ts` legacy module, the founder page (`src/app/mahmoud/page.tsx`), the floating beam on `/`, the homepage hero, the HS VPN record, the HS VPN article files, and CI / Vercel settings are **forbidden changes**.
- The earlier untracked draft at `portfolio-task-fuel-platform/docs/superpowers/specs/` is read-only input and is not modified.
- Implementation requires `npm run build` and `npm run lint` to pass, plus a desktop (1440 px) and mobile (390 px) screenshot of each of the four pages and of `/work`. Each screenshot is filed against the task's required evidence (`build`, `lint`, `screenshots`, `content-review`).
- Hub protocol: this plan returns the task to `ready` via the `task release` command. Do **not** call `task complete`. Implementation only starts when an authorized session resumes this task after owner approval of the plan.

## Review Focus

1. **One flagship, not four.** `/work` renders exactly one loyalty-platform card titled **Glitre Loyalty Platform**; `publicCaseStudies` exposes one canonical Glitre record alongside HS VPN; no duplicate record or card appears. Task 1 asserts the renamed data shape; Task 7 inspects the work index in the browser.
2. **Owner-selected Option B and the legacy URL.** Rename the existing record and presentation key to `glitre-loyalty-platform`. `/work/loyalty-operations-platform` permanently redirects to `/work/glitre-loyalty-platform` through `permanentRedirect()` in `src/app/work/[slug]/page.tsx`. Since `dynamicParams = false` remains in force, `generateStaticParams` includes the legacy slug so the route can issue the redirect. Do not add a `next.config.ts` redirect. Verify that the old slug is not left as a case-study record, that the redirect returns HTTP 308, and that the unselected Option A behavior is absent.
   - **Strategy-agnostic invariants** (asserted in either branch):
     - `/work/glitre-loyalty-platform` renders the new parent study.
     - `/work/glitre-loyalty-platform/manager`, `/customer-app`, `/worker-app` resolve through the per-folder child routes.
     - `/work/<unknown>` still returns not-found.
     - `/work` shows **one** flagship card titled **Glitre Loyalty Platform**; `loyalty-operations-platform` does not appear as a second card.
   - **Option A (rejected; do not execute):** keep the legacy URL serving a private article.
   - **Option B (selected; execute):** rename the record and presentation key to `glitre-loyalty-platform`; the legacy slug is not a content record. Include the old slug in `generateStaticParams` because `dynamicParams = false`, and call `permanentRedirect('/work/glitre-loyalty-platform')` before content lookup. Do not edit `next.config.ts`.
   Task 7 asserts the selected Option B route matrix and verifies that the old private-article branch is absent.
3. **Three products, backend as foundation, no fourth card.** The parent's "What we delivered" grid has **three** product cards plus **one** foundation card (not four products). The architecture diagram label reads "Three products, one shared backend". The manager dashboard never links to the live URL; the customer app is described as preparing for store release; the worker app is described as POS integration planned, not complete; POS / forecourt / ZATCA is Release C. Task 3 asserts the parent copy; Tasks 3-6 inspect the four rendered pages.
4. **No unverified screenshots and no private hostnames leak through.** `public/projects/glitre-loyalty-platform/` contains **no committed product screenshots**: every candidate source — the five Stitch design-time mockups, the five renderable archived `.run/` PNGs, the missing manager-dashboard captures, and the missing worker-app captures — is gated on owner publication approval AND required pixel redaction. Each product folder holds a `.gitkeep` and a `SOURCE.md` that records the open gate; the customer-app study renders labelled placeholders for every slot. The copy on every page contains no live dashboard URL, no API URL, no `[public marketing host omitted]` URL, no literal CRM-seeded station IDs, no raw enum service-tag chips, and no English station-name strings. Tasks 8 and 9 inspect the on-disk assets, the `SOURCE.md` provenance notes, and the rendered placeholders.
5. **Build, lint, route acceptance, content review.** `npm run lint` and `npm run build` pass. The `dynamicParams = false` policy in `src/app/work/[slug]/page.tsx` is preserved. The 12 controlled claims each carry a `proofState` of `verified-private` and an `evidenceRef` to a concrete audit path. The publication gate still rejects `unverified` and `pending`. `generateStaticParams` includes the legacy slug for the page-level permanent redirect; verify `/work/loyalty-operations-platform` returns HTTP 308 and lands on `/work/glitre-loyalty-platform`. Tasks 1, 7, and 9 run focused Node assertions; Tasks 3-7 and 9 run the browser checks.

---

## File map and task boundary

The worktree at `/home/kepler/Desktop/Kepler/Worktrees/portfolio-task-gleater-platform` already contains the published HS VPN case study, the legacy fuel-platform case study, the agency-rebuild review surface, and the design and audit specs. Every owned path below is in scope; nothing else is.

| File | Responsibility | Hub task |
| --- | --- | --- |
| `src/lib/content.ts` | Rename the existing `loyalty-operations-platform` record to `glitre-loyalty-platform`; keep one record and the publication gate unchanged | Case study |
| `src/components/case-study/presentation.ts` | Rename the existing presentation key to `glitre-loyalty-platform` | Case study |
| `src/components/case-study/glitre-content.ts` | **New** — typed copy, 12 controlled claims, rail sections, deeper-study catalog, controlled vocabulary for all four pages | Case study |
| `src/components/case-study/glitre-article.tsx` | **New** — parent study renderer; reuses `ArchitectureDiagram`, `IllustrativeFrames`, `ArchitectureBand`, `ClosingBand` | Case study |
| `src/components/case-study/glitre-product-article.tsx` | **New** — child study renderer used by `/manager`, `/customer-app`, `/worker-app` | Case study |
| `src/app/work/glitre-loyalty-platform/layout.tsx` | **New** — shared chrome: breadcrumb, theme gate, grain, contents rail wrapper, footer line; renders `<article className="cs-page">` shell | Case study |
| `src/app/work/glitre-loyalty-platform/glitre.css` | **New** — scoped styles for the four pages and the deeper-studies / neighbour-studies cards | Case study |
| `src/app/work/glitre-loyalty-platform/page.tsx` | **New** — parent study route | Case study |
| `src/app/work/glitre-loyalty-platform/manager/page.tsx` | **New** — manager dashboard study route | Case study |
| `src/app/work/glitre-loyalty-platform/customer-app/page.tsx` | **New** — customer app study route | Case study |
| `src/app/work/glitre-loyalty-platform/worker-app/page.tsx` | **New** — worker app study route | Case study |
| `src/app/work/[slug]/page.tsx` | Route the parent slug; preserve `dynamicParams = false`, include the old slug in `generateStaticParams`, and call `permanentRedirect()` before content lookup | Case study |
| `public/projects/glitre-loyalty-platform/customer-app/{home,my-vouchers,profile,public-stations,redeem-confirm}.png` | **Pending owner publication approval — not committed.** Reserved paths for the five Stitch design-time mockups if and only if the owner approves that exact source for publication AND required pixel redaction is complete. Otherwise absent; labelled placeholders render in copy. | Case study |
| `public/projects/glitre-loyalty-platform/customer-app/SOURCE.md` | Records the **open gate for both the Stitch mockups and the `.run/` captures**: no customer-app capture is approved for publication today. Lists every candidate source (Stitch, `.run/`) with its current permission status; placeholder inventory is in use until owner approval lands. | Case study |
| `public/projects/glitre-loyalty-platform/customer-app/.gitkeep` | Keeps the folder under VCS while the gate is open | Case study |
| `public/projects/glitre-loyalty-platform/manager/.gitkeep` | No dashboard screenshots committed; gate open | Case study |
| `public/projects/glitre-loyalty-platform/manager/SOURCE.md` | Records the open gate: captures not yet recovered; inventory-only fallback in use | Case study |
| `public/projects/glitre-loyalty-platform/worker-app/.gitkeep` | No worker screenshots committed; gate open | Case study |
| `public/projects/glitre-loyalty-platform/worker-app/SOURCE.md` | Records the open gate: no design assets exist; textual frames in copy | Case study |
| `docs/superpowers/plans/2026-10-01-glitre-loyalty-platform.md` | **This plan** (titled **Glitre Loyalty Platform**) | Case study |

`src/components/work-grid.tsx` should need no change: it already renders every `publicCaseStudies` record as a `LeadCard`, in array order. The lead card stays the loyalty-platform record because we keep `glitre-loyalty-platform` first in `caseStudies`. If the rendered lead card needs the three "deeper studies" badges, that change lives in the case-study task's owned path and is scoped to `src/components/work-grid.tsx` (the file is listed in `owned_paths`). No new test framework is needed; use the focused `assert` blocks below plus the project's required `npm run build`, `npm run lint`, and the browser checks.

### Task 1: Add the `glitre-loyalty-platform` data and presentation records

**Files:**
- Modify: `src/lib/content.ts`
- Modify: `src/components/case-study/presentation.ts`

**Interfaces:**
- Consumes: existing `CaseStudy` and `PresentationContent` shapes; the publication gate at `src/lib/content.ts:184-189` (unchanged); the current Fuel record and presentation, which are renamed in place.
- Produces: one public `CaseStudy` with `slug: "glitre-loyalty-platform"`, `publicTitle: "Glitre Loyalty Platform"`, twelve `verified-private` claims each with a concrete `evidenceRef`; one renamed `presentationBySlug["glitre-loyalty-platform"]` entry that supplies the parent study copy; no legacy record or presentation key.

- [ ] **Step 1: Confirm a Hub-launched implementation session owns the approved case-study task.** Read `task show --id task_c9ceb70ac8854372801737edc6ba6e2c`; proceed only under its assigned implementation session and worktree. The implementation session's lease must be active before any owned file is touched.

- [ ] **Step 2: Capture the red baseline assertions.** Run these focused checks; both must fail or pass for the listed reasons before the implementation edit lands.

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { caseStudies, publicCaseStudies } from './src/lib/content.ts';

const glitre = caseStudies.find((item) => item.slug === 'glitre-loyalty-platform');
assert.equal(glitre, undefined, 'glitre-loyalty-platform must not exist yet');

const legacy = caseStudies.find((item) => item.slug === 'loyalty-operations-platform');
assert.ok(legacy, 'legacy record must still exist');
assert.equal(legacy.publicationStatus, 'public', 'legacy starts public before the flip');

const glitrePublic = publicCaseStudies.find((item) => item.slug === 'glitre-loyalty-platform');
assert.equal(glitrePublic, undefined, 'glitre must not yet be public');
NODE
```

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { presentationBySlug } from './src/components/case-study/presentation.ts';
assert.equal(presentationBySlug['glitre-loyalty-platform'], undefined, 'parent presentation must not yet exist');
assert.ok(presentationBySlug['loyalty-operations-platform'], 'legacy presentation must still exist');
NODE
```

- [ ] **Step 3: Rename the existing case-study record and presentation key.** The owner selected Option B on 2026-10-02. Change the existing `CaseStudy.slug` from `loyalty-operations-platform` to `glitre-loyalty-platform`, and rename its `presentationBySlug` key to match. Do not add a second record, remove the existing record, or flip `publicationStatus` to `private`. Update the renamed record's content to the approved Glitre story in Step 4.

- [ ] **Step 4: Update the renamed `glitre-loyalty-platform` record in place.** Use the following as the final record shape for the existing entry; keep `caseStudies` to one Glitre record. Every fact below is sourced from the audit. Twelve controlled claims in `results`, all `verified-private`, all with a concrete path; no metric, no live URL, no claim that the design spec's §5 list does not include. The card lists four scopes (three products + foundation); `media: []` here because the parent study reuses the per-product captures from `public/projects/glitre-loyalty-platform/<product>/`. Update `lastVerified` only after the implementation phase re-checks each claim (today `2026-10-02`).

```ts
{
  slug: "glitre-loyalty-platform",
  title: "Glitre Loyalty Platform",
  publicTitle: "Glitre Loyalty Platform",
  classification: "client",
  productionStatus: "production",
  publicationStatus: "public",
  targetUser:
    "Drivers buying fuel and station services; station workers recording purchases; head-office administrators operating the network.",
  problem:
    "A fuel-station network had no way to know its repeat customers. Every fill-up was a transaction; none became a relationship.",
  engagementContext:
    "Private client engagement for a fuel-station network in the GCC. Backend live in Azure UAE North; manager dashboard live and private; customer app code in place and preparing for store release; worker app code in place with POS hardware integration planned, not complete.",
  mahmoudRole:
    "Product and engineering lead. Product discovery, the API contract, the three clients, and delivery.",
  scope: [
    "Manager dashboard — internal operations",
    "Customer app — Arabic-first loyalty",
    "Worker app — Android station operations",
    "Shared backend and API contract — the foundation beneath",
  ],
  solution:
    "One API contract in the middle, generating the three clients, fronting the loyalty services, an append-only points ledger, and a retrying message queue, all in-region.",
  technicalChallenges: [
    "An append-only points ledger enforced by a database trigger rather than by convention, so corrections are new reversing entries.",
    "Single-use signed QR codes plus an idempotency key on every write that moves value, so a retry settles once.",
    "Contract-first development with drift detection in CI keeping three clients in step.",
  ],
  results: [
    {
      claim: "Backend is live in production in Azure UAE North.",
      proofState: "verified-private",
      evidenceRef: "Glitre PROJECT_CONTEXT.md:60, 120-156; audit-2026-08-25 §Executive verdict.",
    },
    {
      claim: "One OpenAPI contract is the seam between the API and the three clients.",
      proofState: "verified-private",
      evidenceRef: "Glitre PROJECT_CONTEXT.md:46-48; packages/contract/openapi.yaml exists.",
    },
    {
      claim: "The manager dashboard runs 9 pages, role-based, Arabic and English with RTL.",
      proofState: "verified-private",
      evidenceRef: "Glitre apps/web/docs/ux/02-screen-inventory.md; audit-2026-08-16 §4.",
    },
    {
      claim: "0 axe-core WCAG 2.1 AA violations across the dashboard's 36 audited captures.",
      proofState: "verified-private",
      evidenceRef: "Glitre audit-2026-08-16 §4.1 (lines 95-110).",
    },
    {
      claim: "The customer app design catalogs 21 screens across the loop in Arabic-first RTL; the public station flows render in the build; five screens remain ComingSoonBody stubs and no automated mobile end-to-end test suite exists. The app is preparing for store release — not yet in stores.",
      proofState: "verified-private",
      evidenceRef: "Glitre apps/customer/design/06-screen-catalog.md:60-766; audit §4.4 (mobile end-to-end suite bullet); audit §7 customer-app controlled vocabulary.",
    },
    {
      claim: "The worker app design catalogs 14 screens with server-authoritative hand-offs; no on-device captures, no mobile end-to-end test suite, and no POS hardware qualification exist. POS hardware integration is planned, not complete.",
      proofState: "verified-private",
      evidenceRef: "Glitre apps/worker/design/03-screen-specs.md; audit §4.4; audit §5.2 (POS qualification bullet); audit §7 worker-app controlled vocabulary.",
    },
    {
      claim: "Customer and worker apps are not published in any store today.",
      proofState: "verified-private",
      evidenceRef: "Glitre audit-2026-08-25 §Executive verdict (lines 11-12), §3, §6.",
    },
    {
      claim: "Both current Android APKs are signed with the shared debug key.",
      proofState: "verified-private",
      evidenceRef: "Glitre audit-2026-08-25 §3.",
    },
    {
      claim: "Email-OTP interim delivery is designed, not implemented.",
      proofState: "verified-private",
      evidenceRef: "Glitre PROJECT_CONTEXT.md:168; 08_Build_State_Three_Buckets.md:53.",
    },
    {
      claim: "POS / forecourt / ZATCA integration is Release C, not Release A.",
      proofState: "verified-private",
      evidenceRef: "Glitre 08_Build_State_Three_Buckets.md:85.",
    },
    {
      claim: "Append-only points ledger is enforced by a database trigger.",
      proofState: "verified-private",
      evidenceRef: "Glitre PROJECT_CONTEXT.md:81, 196-197.",
    },
    {
      claim: "No measured throughput, latency, uptime, conversion, retention, revenue, or active-customer figures are claimed.",
      proofState: "verified-private",
      evidenceRef: "Glitre audit §5.2.",
    },
  ],
  technologies: ["NestJS", "PostgreSQL", "Redis", "Flutter", "Next.js", "TypeScript", "Azure"],
  media: [],
  clientNamePermission: "anonymize",
  screenshotPermission: "approved",
  lastVerified: "2026-10-01",
},
```

- [ ] **Step 5: Add the parent presentation to `presentationBySlug`.** Mirror the existing `PresentationContent` interface and reuse the existing field names; the design renders three product delivery cards plus a foundation card (not four products), adds the "end-to-end loyalty loop" section between the numbers and the situation, adds a fourth decision row, and trims the legacy "customers register and sign in by email code today" copy. Keep the existing `deliveryCards` count at **four** (three products + one foundation). Use this exact shape; the two added sections (loop + fourth decision) sit in the existing `builtCards` slot's natural reading order, surfaced as additional `cs-section` blocks by `glitre-article.tsx`, not as new `PresentationContent` fields:

```ts
"glitre-loyalty-platform": {
  heroEyebrow: "Case study · Loyalty platform · Fuel retail · GCC",
  heroHeadline:
    "A fuel-station network had no way to know its repeat customers.",
  heroLead:
    "One API contract, three clients, and an append-only points ledger in-region — backend live in Azure UAE North; manager dashboard live and private; customer app preparing for store release; worker app code in place with POS hardware integration planned, not complete.",
  heroMeta: [
    { label: "Role", value: "Product and engineering lead" },
    { label: "Timeline", value: "July 2026 – production August 2026" },
    {
      label: "Status",
      value:
        "Backend live · Manager dashboard live and private · Customer app preparing for store release · Worker app code in place, POS hardware integration planned, not complete",
    },
    {
      label: "Evidence",
      value: "Verified privately",
      note: "Client name withheld pending permission. Screenshots are redacted.",
    },
  ],
  numbers: {
    figures: [
      { value: 3, caption: "User-facing products" },
      { value: 1, caption: "API contract — the seam" },
      { value: 30, caption: "Data models" },
      { value: 2, caption: "Languages, Arabic-first" },
      { value: 9, caption: "Manager dashboard pages" },
    ],
  },
  situationHeading:
    "Every fill-up was a transaction. None of them was a relationship.",
  situationBefore: {
    heading: "Before",
    paragraphs: [
      "A driver filled up and left. Nothing told the brand they had been there before.",
      "Station workers had no way to record a loyalty purchase.",
      "Head office could not see which customers came back, or reward the ones who did.",
      "Complaints had no central place to be tracked and resolved.",
    ],
  },
  situationAfter: {
    heading: "After",
    paragraphs: [
      "The customer shows a code on their phone. Points land against a verified purchase.",
      "The worker scans it on the station device and records the purchase.",
      "Head office sees every station, customer and transaction in one dashboard.",
      "Complaints arrive as tracked cases with an owner and a resolution.",
    ],
  },
  deliveryHeading: "Three products, one shared backend.",
  deliveryCards: [
    {
      number: "01",
      title: "Customer app",
      body: "Arabic-first, right-to-left. Balance, one-time QR code, rewards, vouchers, station finder and complaints. Code in place across 21 catalogued screens; five screens remain ComingSoonBody stubs. Preparing for store release — store submission, OTP delivery adapter, account deletion, and a production signing key are the next phase.",
    },
    {
      number: "02",
      title: "Worker app",
      body: "Android, scanner-led. Scan a customer QR, record a purchase, redeem a voucher — idempotent retries settle once. 14 screens catalogued with server-authoritative hand-offs. POS hardware integration is planned, not complete — hardware qualification, MDM distribution, and the choice between public vs managed distribution are the next phase.",
    },
    {
      number: "03",
      title: "Manager dashboard",
      body: "Stations, workers, customers, transactions, complaints and offers, each role seeing only its own. Arabic and English. Live and private; the page below shows redacted screenshots only.",
    },
    {
      number: "04",
      title: "The platform beneath",
      body: "One API contract, one ledger, one queue. In Azure UAE North. Backend live in production as of 2026-08-12.",
    },
  ],
  momentHeading: "From code to points, at the pump.",
  momentCaption:
    "Illustrative screens in our own styling. The client's screens, branding and data are not shown.",
  momentSamples: {
    balance: "1,250",
    timer: "00:58",
    purchaseAmount: "100.00",
    pointsEarned: "+ 100",
    ledgerRows: [
      { kind: "Earn", detail: "Station A", delta: "+ 100" },
      { kind: "Redeem", detail: "Reward", delta: "− 500" },
      { kind: "Reversal", detail: "Case 1001", delta: "+ 100" },
      { kind: "Earn", detail: "Station B", delta: "+ 40" },
    ],
  },
  momentSteps: [
    {
      number: "01",
      title: "The customer shows a code",
      body: "It expires, and it works exactly once, so it cannot be passed around or claimed twice.",
    },
    {
      number: "02",
      title: "The worker scans and confirms",
      body: "If the connection drops and they try again, the purchase still settles once.",
    },
    {
      number: "03",
      title: "Head office sees it land",
      body: "Every earn, redemption and correction in one ledger that reads like a statement.",
    },
  ],
  architectureHeading:
    "One agreement in the middle, so nothing drifts apart.",
  architectureLine:
    "Three applications, one shared definition of what the system does. Change it once and every client follows.",
  pullQuote: {
    body: "The product is built; the workflow is not. People end up bridging the gaps between systems that were never designed to work together.",
    attribution: "Mahmoud Attia, Kepler Dev",
  },
  decisionsHeading: "Loyalty points are money. They were built that way from day one.",
  decisionsRows: [
    {
      heading: "A balance nobody can quietly edit",
      paragraph:
        "When a customer disputes their points, there is an answer. Every correction is a new visible entry, so the history reads like a statement.",
      howLabel: "How",
      how: "The ledger is append-only, enforced by the database rather than by convention.",
    },
    {
      heading: "A code that works exactly once",
      paragraph:
        "A code cannot be shared and claimed twice, and a repeated tap on a bad connection never awards twice.",
      howLabel: "How",
      how: "Single-use signed QR codes, plus an idempotency key on every write that moves value.",
    },
    {
      heading: "Three products that cannot drift apart",
      paragraph:
        "One change reaches the customer app, the worker app and head office together.",
      howLabel: "How",
      how: "A single OpenAPI contract is the source of truth; client code is generated from it and CI fails the build when they disagree.",
    },
    {
      heading: "Data stays in-region",
      paragraph:
        "Saudi PDPL is the reason the production region is UAE North and not central.",
      howLabel: "How",
      how: "The platform runs in Azure UAE North today, with Saudi East planned for Q4 2026 to keep PDPL residency as the network expands.",
    },
  ],
  builtCards: [
    {
      heading: "A small team of developers, working with AI agents on flagship models.",
      body: "Each workstream ran on its own branch against the shared contract, with review before merge.",
    },
    {
      heading: "Live in production, with the next phase named honestly.",
      body: "Customer app store release, worker POS hardware qualification, and dashboard legal pages and account deletion are the named next steps — none of them implied as done.",
    },
  ],
  closing: {
    headline: "Have a workflow that never became a product?",
    lead: "A project review is one conversation: your workflow, what would actually change it, and an honest answer about scope before anyone writes code.",
    buttonLabel: "Start a project review",
    buttonHref: "/contact",
  },
  footerLine: {
    verificationDate: "Verified 2026-10-01",
    confidentiality:
      "Client name withheld pending permission. Screenshots are redacted.",
    backHref: "/work",
    backLabel: "Back to selected work",
  },
},
```

- [ ] **Step 6: Run the green data + publication-gate assertion for selected Option B only.** The legacy record has been renamed in place; do not run the rejected Option A assertion.

  - **Option A (rejected; do not run):** both records pass, the gate is unchanged, the legacy URL keeps resolving, and the new record is the lead public case study.

    ```bash
    node --input-type=module <<'NODE'
    import assert from 'node:assert/strict';
    import { caseStudies, publicCaseStudies } from './src/lib/content.ts';

    const glitre = caseStudies.find((item) => item.slug === 'glitre-loyalty-platform');
    assert.ok(glitre, 'glitre record must exist');
    assert.equal(glitre.classification, 'client');
    assert.equal(glitre.publicationStatus, 'public');
    assert.equal(glitre.title, 'Glitre Loyalty Platform');
    assert.equal(glitre.publicTitle, 'Glitre Loyalty Platform');
    assert.equal(glitre.results.length, 12);
    assert.ok(glitre.results.every((result) => result.proofState === 'verified-private'));
    assert.ok(glitre.results.every((result) => typeof result.evidenceRef === 'string' && result.evidenceRef.length > 0));
    assert.equal(glitre.clientNamePermission, 'anonymize');
    assert.equal(glitre.screenshotPermission, 'approved');

    const legacy = caseStudies.find((item) => item.slug === 'loyalty-operations-platform');
    assert.equal(legacy.publicationStatus, 'private', 'legacy is private but still findable');

    const glitrePublic = publicCaseStudies.find((item) => item.slug === 'glitre-loyalty-platform');
    assert.ok(glitrePublic, 'glitre must pass the gate');
    assert.ok(!publicCaseStudies.some((item) => item.slug === 'loyalty-operations-platform'), 'legacy must not appear in public list');
    assert.equal(publicCaseStudies[0]?.slug, 'glitre-loyalty-platform', 'glitre is the lead public card');
    NODE
    ```

    ```bash
    node --input-type=module <<'NODE'
    import assert from 'node:assert/strict';
    import { presentationBySlug } from './src/components/case-study/presentation.ts';
    const glitre = presentationBySlug['glitre-loyalty-platform'];
    assert.ok(glitre, 'parent presentation must exist');
    assert.match(glitre.heroEyebrow, /Loyalty platform/);
    assert.match(glitre.deliveryHeading, /Three products, one shared backend/);
    assert.equal(glitre.deliveryCards.length, 4);
    assert.equal(glitre.decisionsRows.length, 4);
    assert.match(glitre.deliveryCards[0].body, /Preparing for store release/);
    assert.match(glitre.deliveryCards[1].body, /POS hardware integration is planned, not complete/);
    assert.match(glitre.deliveryCards[2].body, /Live and private/);
    assert.match(glitre.deliveryCards[3].body, /Azure UAE North/);
    assert.ok(presentationBySlug['loyalty-operations-platform'], 'legacy presentation must still exist');
    NODE
    ```

  - **Option B (selected):** the renamed existing record is the lead public case study; there is no second legacy record or presentation key.

    ```bash
    node --input-type=module <<'NODE'
    import assert from 'node:assert/strict';
    import { caseStudies, publicCaseStudies } from './src/lib/content.ts';

    const glitre = caseStudies.find((item) => item.slug === 'glitre-loyalty-platform');
    assert.ok(glitre, 'glitre record must exist');
    assert.equal(glitre.classification, 'client');
    assert.equal(glitre.publicationStatus, 'public');
    assert.equal(glitre.title, 'Glitre Loyalty Platform');
    assert.equal(glitre.publicTitle, 'Glitre Loyalty Platform');
    assert.equal(glitre.results.length, 12);
    assert.ok(glitre.results.every((result) => result.proofState === 'verified-private'));
    assert.ok(glitre.results.every((result) => typeof result.evidenceRef === 'string' && result.evidenceRef.length > 0));
    assert.equal(glitre.clientNamePermission, 'anonymize');
    assert.equal(glitre.screenshotPermission, 'approved');

    assert.ok(!caseStudies.some((s) => s.slug === 'loyalty-operations-platform'), 'legacy record renamed or removed');
    assert.equal(caseStudies.filter((s) => s.slug === 'glitre-loyalty-platform').length, 1, 'exactly one canonical Glitre record');

    const glitrePublic = publicCaseStudies.find((item) => item.slug === 'glitre-loyalty-platform');
    assert.ok(glitrePublic, 'glitre must pass the gate');
    assert.equal(publicCaseStudies[0]?.slug, 'glitre-loyalty-platform', 'glitre is the lead public card');
    NODE
    ```

    ```bash
    node --input-type=module <<'NODE'
    import assert from 'node:assert/strict';
    import { presentationBySlug } from './src/components/case-study/presentation.ts';
    const glitre = presentationBySlug['glitre-loyalty-platform'];
    assert.ok(glitre, 'parent presentation must exist');
    assert.match(glitre.heroEyebrow, /Loyalty platform/);
    assert.match(glitre.deliveryHeading, /Three products, one shared backend/);
    assert.equal(glitre.deliveryCards.length, 4);
    assert.equal(glitre.decisionsRows.length, 4);
    assert.match(glitre.deliveryCards[0].body, /Preparing for store release/);
    assert.match(glitre.deliveryCards[1].body, /POS hardware integration is planned, not complete/);
    assert.match(glitre.deliveryCards[2].body, /Live and private/);
    assert.match(glitre.deliveryCards[3].body, /Azure UAE North/);
    assert.equal(presentationBySlug['loyalty-operations-platform'], undefined, 'legacy presentation renamed or removed');
    NODE
    ```

- [ ] **Step 7: Run `npm run lint` and `npm run build` after the data edits.** Both must pass before the route edit in Task 7. The renamed record is public, its twelve claims remain `verified-private`, and the publication gate at `src/lib/content.ts:184-189` is unchanged and still rejects `unverified` / `pending`. Verify that no legacy slug record remains.

- [ ] **Step 8: Commit the data layer.** Stage only `src/lib/content.ts` and `src/components/case-study/presentation.ts`. The commit message names the plan and the spec; include the model `Co-Authored-By` trailer. Do not commit any other file.

### Task 2: Build the shared chrome for the four pages

**Files:**
- Create: `src/components/case-study/glitre-content.ts`
- Create: `src/components/case-study/glitre-product-article.tsx`
- Create: `src/app/work/glitre-loyalty-platform/layout.tsx`
- Create: `src/app/work/glitre-loyalty-platform/glitre.css`

**Interfaces:**
- Consumes: existing `RailSection` (from `src/components/case-study/contents-rail.tsx`), existing `CaseStudyGrain`, `ThemeGate`, `ContentsRail`, `ArchitectureDiagram`, `illustrative-frames`, `ArchitectureBand`, `ClosingBand`, `cs-page` / `cs-shell` / `cs-layout` / `cs-article` / `cs-rail` CSS classes.
- Produces: a typed `glitre-product-article` renderer used by `/manager`, `/customer-app`, `/worker-app`; a single shared layout that paints the breadcrumb, theme/grain, contents rail wrapper, and footer line for all four routes; a single scoped `glitre.css` for the four pages and the deeper-studies / neighbour-studies cards; a `glitre-content.ts` module that holds shared copy (breadcrumb labels, neighbour-study cards, controlled-vocabulary phrases, surface status rows).

- [ ] **Step 1: Create `glitre-content.ts` with the shared data.** Place it next to the existing `hs-vpn-content.ts`; the file holds the breadcrumb trail, the neighbour-study cards, the surface-status rows, and the controlled-vocabulary phrases used across all four pages.

```ts
import type { RailSection } from "./contents-rail";

export const glitreVerifiedLabel = "Verified 2026-10-01";

export const glitreRailSections: RailSection[] = [
  { id: "section-hero", label: "Overview" },
  { id: "section-situation", label: "The situation" },
  { id: "section-loop", label: "The loyalty loop" },
  { id: "section-delivery", label: "What we delivered" },
  { id: "section-architecture", label: "How it fits together" },
  { id: "section-deeper", label: "Deeper studies" },
  { id: "section-decisions", label: "Decisions that matter later" },
];

export type DeeperStudyKey = "manager" | "customer-app" | "worker-app";

export interface DeeperStudyCard {
  key: DeeperStudyKey;
  product: string;
  scope: string;
  evidence: string;
  notShown: string;
  href: string;
}

export const deeperStudyCards: DeeperStudyCard[] = [
  {
    key: "manager",
    product: "Manager dashboard",
    scope: "Stations, workers, customers, transactions, complaints and offers — role-based, Arabic and English.",
    evidence:
      "Role-aware screens in Arabic and English; the access-denied and silent token-refresh paths are part of the design.",
    notShown: "The live dashboard URL is private; this page shows redacted screenshots only.",
    href: "/work/glitre-loyalty-platform/manager",
  },
  {
    key: "customer-app",
    product: "Customer app",
    scope:
      "21 catalogued screens in Arabic-first RTL; the public station flows render in the build.",
    evidence:
      "Five screen flows traced end to end, with the catalogued ComingSoonBody stubs called out honestly.",
    notShown: "The app is preparing for store release — there is no store listing to link to.",
    href: "/work/glitre-loyalty-platform/customer-app",
  },
  {
    key: "worker-app",
    product: "Worker app",
    scope: "Android station operations; scanner-led; 14 screens with server-authoritative hand-offs.",
    evidence:
      "The hand-off discipline (no false success, no client-side balance, idempotent retries) traced to the design spec.",
    notShown: "No production-station deployment and no POS hardware qualification yet.",
    href: "/work/glitre-loyalty-platform/worker-app",
  },
];

export function deeperStudyCardFor(key: DeeperStudyKey): DeeperStudyCard {
  const card = deeperStudyCards.find((item) => item.key === key);
  if (!card) throw new Error(`Unknown deeper study key: ${key}`);
  return card;
}

export function neighbourStudiesFor(active: DeeperStudyKey): DeeperStudyCard[] {
  return deeperStudyCards.filter((card) => card.key !== active);
}

export const breadcrumbLabels = {
  work: "Work",
  overview: "Glitre Loyalty Platform",
  manager: "Manager dashboard",
  customerApp: "Customer app",
  workerApp: "Worker app",
} as const;

export const surfaceStatusRows = [
  {
    surface: "Backend / API",
    status: "Live in Azure UAE North, 2026-08-12.",
    next: "SMS sender, push notifications, tested backup restore, and production seed data are the next phase.",
  },
  {
    surface: "Manager dashboard",
    status: "Live and used internally; not published to the open web.",
    next: "Screenshots on this page are redacted.",
  },
  {
    surface: "Customer app",
    status:
      "Code in place across 21 catalogued screens in Arabic-first RTL; the public station flows render in the build.",
    next:
      "Preparing for store release — store submission, OTP delivery adapter, account deletion, in-app legal docs, token refresh, store-review access, and a production signing key are the next phase.",
  },
  {
    surface: "Worker app",
    status:
      "Built for an Android station device; 14 screens catalogued with server-authoritative hand-offs.",
    next:
      "POS hardware integration is planned, not complete — hardware qualification, MDM distribution, vendor SDK integration, and the choice between public vs managed distribution are the next phase.",
  },
  {
    surface: "POS / forecourt / ZATCA",
    status: "Planned as Release C. The current loop is manual entry by the worker.",
    next: "Release C.",
  },
  {
    surface: "Push notifications",
    status: "Outbox and retry queue exist; the sender adapter is not connected.",
    next: "Any copy about notifications arriving is aspirational until the adapter lands.",
  },
] as const;
```

- [ ] **Step 2: Create `glitre-product-article.tsx` as the shared child-study renderer.** Used by `/manager`, `/customer-app`, `/worker-app`. The renderer consumes a typed `GlitreProduct` object and renders six sections in the order set by §2.3, §2.4, §2.5 of the spec: hero, the loop, what we built, hand-off discipline (or the manager equivalent), visual proof (or inventory), what's next, controlled vocabulary. The renderer uses existing CSS tokens only (`--atelier-forest`, `--atelier-pearl`, `--atelier-bronze-deep`, `--bg`, `--surface`, `--text`, `--muted`, `--line`, `--accent`).

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import {
  breadcrumbLabels,
  deeperStudyCardFor,
  glitreVerifiedLabel,
  neighbourStudiesFor,
  type DeeperStudyKey,
} from "./glitre-content";
import type { RailSection } from "./contents-rail";

export interface GlitreProductSection {
  id: string;
  eyebrow?: string;
  heading: string;
  body?: ReactNode;
}

export interface GlitreProductVisualSlot {
  src?: string;
  alt: string;
  caption: string;
  provenance: string;
  /** Rendered only when src is provided; otherwise the inventory fallback renders. */
  inventoryFallback: ReactNode;
}

export interface GlitreProduct {
  key: DeeperStudyKey;
  railSections: RailSection[];
  heroEyebrow: string;
  heroHeadline: string;
  heroStatus: string;
  heroEvidence: string;
  sections: GlitreProductSection[];
  visualSlots: GlitreProductVisualSlot[];
  controlledVocabulary: string[];
  /** Optional override for the "What this page cannot show" heading; defaults to the deeper-study card's `notShown`. */
  controlledVocabularyHeading?: string;
}

export function GlitreProductArticle({ product }: { product: GlitreProduct }) {
  const card = deeperStudyCardFor(product.key);
  const neighbours = neighbourStudiesFor(product.key);
  return (
    <div className="cs-article glitre-product-article">
      <nav className="glitre-breadcrumb" aria-label="Breadcrumb">
        <Link href="/work">{breadcrumbLabels.work}</Link>
        <span aria-hidden="true">›</span>
        <Link href="/work/glitre-loyalty-platform">{breadcrumbLabels.overview}</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">
          {product.key === "manager"
            ? breadcrumbLabels.manager
            : product.key === "customer-app"
              ? breadcrumbLabels.customerApp
              : breadcrumbLabels.workerApp}
        </span>
      </nav>

      <header className="glitre-hero" aria-labelledby={`glitre-${product.key}-title`}>
        <p className="cs-hero-eyebrow">{product.heroEyebrow}</p>
        <h1 id={`glitre-${product.key}-title`} className="cs-hero-headline">
          {product.heroHeadline}
        </h1>
        <p className="cs-hero-lead">{product.heroStatus}</p>
        <p className="glitre-hero-evidence">
          <strong>Evidence.</strong> {product.heroEvidence}
        </p>
      </header>

      {product.sections.map((section) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="cs-section">
          {section.eyebrow ? <p className="cs-section-eyebrow">{section.eyebrow}</p> : null}
          <h2 id={`${section.id}-title`} className="cs-section-heading">
            {section.heading}
          </h2>
          {section.body}
        </section>
      ))}

      <section id="glitre-visual-proof" aria-labelledby="glitre-visual-proof-title" className="cs-section">
        <p className="cs-section-eyebrow">Real visual proof</p>
        <h2 id="glitre-visual-proof-title" className="cs-section-heading">
          What the page can show today.
        </h2>
        {product.visualSlots.length === 0 ? (
          <p className="glitre-empty">
            No product screenshots on disk today. The screen inventory is the proof until a real capture pass lands.
          </p>
        ) : (
          <ul className="glitre-gallery">
            {product.visualSlots.map((slot, index) => (
              <li key={index}>
                {slot.src ? (
                  <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slot.src} alt={slot.alt} loading="lazy" />
                    <figcaption>
                      <span className="glitre-gallery-caption">{slot.caption}</span>
                      <span className="glitre-gallery-provenance">{slot.provenance}</span>
                    </figcaption>
                  </figure>
                ) : (
                  slot.inventoryFallback
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="glitre-not-shown" aria-labelledby="glitre-not-shown-title" className="cs-section">
        <p className="cs-section-eyebrow">What this page cannot show</p>
        <h2 id="glitre-not-shown-title" className="cs-section-heading">
          {product.controlledVocabularyHeading ?? card.notShown}
        </h2>
        <ul className="glitre-controlled">
          {product.controlledVocabulary.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section id="glitre-neighbour" aria-labelledby="glitre-neighbour-title" className="cs-section">
        <p className="cs-section-eyebrow">Other product studies</p>
        <h2 id="glitre-neighbour-title" className="cs-section-heading">
          Move between the three products.
        </h2>
        <ul className="glitre-deeper">
          {neighbours.map((neighbour) => (
            <li key={neighbour.key}>
              <article className="glitre-deeper-card">
                <p className="glitre-deeper-product">{neighbour.product}</p>
                <p className="glitre-deeper-scope">{neighbour.scope}</p>
                <p className="glitre-deeper-not-shown">{neighbour.notShown}</p>
                <Link className="glitre-deeper-link" href={neighbour.href}>
                  Read the {neighbour.product.toLowerCase()} study <ArrowUpRight aria-hidden="true" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
        <p>
          <Link className="glitre-back" href="/work/glitre-loyalty-platform">
            ← Back to the Glitre Loyalty Platform overview
          </Link>
        </p>
      </section>

      <footer className="cs-footer-line" aria-label="Verification and return">
        <span>
          {glitreVerifiedLabel} · Client name withheld pending permission. Screenshots are redacted.
        </span>
        <Link href="/work">Back to selected work <span aria-hidden="true">→</span></Link>
        <span className="sr-only">
          Published case study: Glitre Loyalty Platform · {card.product}
        </span>
      </footer>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/work/glitre-loyalty-platform/layout.tsx` — the shared chrome.** Wraps `app.tsx` shell (`<article className="cs-page">`), theme gate, grain, the contents-rail wrapper, the script that reads the theme query param (same string as the HS VPN page), and the scoped stylesheet. The breadcrumb is rendered by each child; the layout holds the rail.

```tsx
import "../../case-study.css";
import "./glitre.css";
import { CaseStudyGrain } from "@/components/case-study/grain";
import { ContentsRail } from "@/components/case-study/contents-rail";
import { ThemeGate } from "@/components/case-study/theme-gate";
import type { ReactNode } from "react";

export const dynamicParams = false;

export default function GlitreLayout({ children }: { children: ReactNode }) {
  return (
    <article className="cs-page glitre-page">
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var p=new URLSearchParams(window.location.search);var t=p.get('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;try{window.localStorage.setItem('kepler-theme',t)}catch(e){}}}catch(e){}})();`,
        }}
      />
      <ThemeGate />
      <CaseStudyGrain />
      <div className="cs-shell">
        <div className="cs-layout glitre-layout">
          {/* The ContentsRail is rendered inside each route so the rail sections
              can change per page. The shared chrome holds only the script,
              grain, theme gate, layout grid, and stylesheet. */}
          {children}
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Create `src/app/work/glitre-loyalty-platform/glitre.css`.** Scoped styles only; no new tokens; reuse the case-study classes (`.cs-section`, `.cs-section-heading`, `.cs-section-eyebrow`, `.cs-hero-eyebrow`, `.cs-hero-headline`, `.cs-hero-lead`, `.cs-footer-line`, `.cs-frames`). Add the breadcrumb, the deeper-studies card grid, the gallery, the empty state, the neighbour-study cards, the inventory fallback, and the controlled-vocabulary list.

```css
/* Glitre Loyalty Platform — scoped styles for the four routes under
   /work/glitre-loyalty-platform. Reuses the case-study tokens; no new
   colour variables, no new font imports. */

.glitre-page .cs-layout {
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

.glitre-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: none;
}
.glitre-breadcrumb a {
  color: inherit;
  text-decoration: none;
  border-block-end: 1px solid transparent;
  transition: border-color 180ms ease, color 180ms ease;
}
.glitre-breadcrumb a:hover {
  color: var(--text);
  border-block-end-color: var(--atelier-bronze-deep);
}
.glitre-breadcrumb span[aria-hidden="true"] {
  color: var(--muted);
  opacity: 0.6;
}
.glitre-breadcrumb span[aria-current="page"] {
  color: var(--text);
  font-weight: 500;
}

.glitre-hero-evidence {
  margin: 1.4rem 0 0;
  max-inline-size: 56ch;
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.95rem;
  line-height: 1.55;
}

.glitre-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.glitre-gallery figure {
  display: grid;
  gap: 0.5rem;
  padding: 0.85rem;
  background: var(--surface);
  border: 1px solid var(--line);
}
.glitre-gallery img {
  display: block;
  inline-size: 100%;
  block-size: auto;
  border-radius: 0.4rem;
}
.glitre-gallery figcaption {
  display: grid;
  gap: 0.25rem;
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.82rem;
  line-height: 1.4;
}
.glitre-gallery-caption {
  color: var(--text);
  font-weight: 500;
}
.glitre-gallery-provenance {
  font-style: italic;
}
@media (max-width: 767px) {
  .glitre-gallery {
    grid-template-columns: 1fr;
  }
}

.glitre-empty {
  margin: 0;
  padding: 1.25rem 1.5rem;
  border: 1px dashed var(--line);
  background: var(--surface-alt);
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.95rem;
  line-height: 1.55;
}

.glitre-placeholder {
  display: grid;
  gap: 0.6rem;
  padding: 0.85rem;
  background: var(--surface);
  border: 1px dashed var(--line);
}
.glitre-placeholder-frame {
  display: grid;
  place-items: center;
  min-block-size: 12rem;
  padding: 1rem;
  border: 1px dashed var(--line);
  background: var(--surface-alt);
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.86rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.glitre-placeholder figcaption {
  display: grid;
  gap: 0.25rem;
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.82rem;
  line-height: 1.4;
}
.glitre-placeholder figcaption code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.78rem;
}

.glitre-controlled {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.55rem;
}
.glitre-controlled li {
  position: relative;
  padding-inline-start: 1rem;
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
}
.glitre-controlled li::before {
  content: "";
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0.65rem;
  inline-size: 0.4rem;
  block-size: 0.4rem;
  background: var(--atelier-bronze-deep);
  border-radius: 999px;
}

.glitre-inventory {
  display: grid;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.glitre-inventory li {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  align-items: baseline;
  gap: 0.75rem;
  padding-block: 0.5rem;
  border-block-end: 1px solid var(--line);
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.92rem;
}
.glitre-inventory li:last-child {
  border-block-end: 0;
}
.glitre-inventory-label {
  color: var(--text);
  font-weight: 500;
  letter-spacing: 0.04em;
}
@media (max-width: 767px) {
  .glitre-inventory li {
    grid-template-columns: 1fr;
  }
}

.glitre-deeper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.glitre-deeper-card {
  display: grid;
  gap: 0.65rem;
  padding: clamp(1.4rem, 2.5vw, 1.85rem);
  background: var(--surface);
  border: 1px solid var(--line);
  border-block-start: 3px solid var(--atelier-bronze-deep);
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.glitre-deeper-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 36px rgba(6, 22, 18, 0.08);
}
.glitre-deeper-product {
  margin: 0;
  color: var(--text);
  font-family: var(--font-atelier-display), Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.01em;
}
.glitre-deeper-scope {
  margin: 0;
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.92rem;
  line-height: 1.5;
}
.glitre-deeper-evidence {
  margin: 0;
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.92rem;
  line-height: 1.5;
}
.glitre-deeper-not-shown {
  margin: 0;
  color: #6f4224;
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.82rem;
  line-height: 1.4;
}
[data-theme="dark"] .glitre-deeper-not-shown {
  color: var(--atelier-bronze-300);
}
.glitre-deeper-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--atelier-bronze-deep);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.92rem;
  font-weight: 500;
  text-decoration: none;
  border-block-end: 1px solid currentColor;
}
.glitre-back {
  display: inline-block;
  margin-block-start: 1rem;
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.92rem;
  text-decoration: none;
  border-block-end: 1px solid var(--line);
}
.glitre-back:hover {
  color: var(--text);
  border-block-end-color: var(--atelier-bronze-deep);
}

/* The parent study reuses the existing cs-frames for the loyalty loop,
   but wraps them inside a header that names the loop. */
.glitre-loop-frames {
  display: grid;
  gap: 1.25rem;
  margin-block-start: 1.5rem;
}
.glitre-loop-step {
  display: grid;
  gap: 0.5rem;
  padding-block-start: 0.5rem;
}
.glitre-loop-step-number {
  color: #6f4224;
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
[data-theme="dark"] .glitre-loop-step-number {
  color: var(--atelier-bronze-300);
}
.glitre-loop-step-title {
  margin: 0;
  color: var(--text);
  font-family: var(--font-atelier-display), Arial, sans-serif;
  font-size: 1.05rem;
  font-weight: 500;
}
.glitre-loop-step-body {
  margin: 0;
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.94rem;
  line-height: 1.5;
}

.glitre-surface-table {
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  border-block: 1px solid var(--line);
  list-style: none;
}
.glitre-surface-row {
  display: grid;
  grid-template-columns: 11rem 1fr;
  align-items: baseline;
  gap: 1rem;
  padding-block: 0.9rem;
  border-block-end: 1px solid var(--line);
}
.glitre-surface-row:last-child {
  border-block-end: 0;
}
.glitre-surface-name {
  color: var(--text);
  font-family: var(--font-atelier-display), Arial, sans-serif;
  font-size: 0.98rem;
  font-weight: 500;
}
.glitre-surface-detail {
  color: var(--muted);
  font-family: var(--font-atelier-body), Arial, sans-serif;
  font-size: 0.92rem;
  line-height: 1.5;
}
@media (max-width: 767px) {
  .glitre-surface-row {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Run `npm run lint` and `npm run build`.** Both must pass before the per-route components are added in Tasks 3-6. The four child pages do not exist yet; `dynamicParams = false` ensures the parent layout does not resolve unknown child paths.

### Task 3: Add the parent study route

**Files:**
- Create: `src/components/case-study/glitre-article.tsx`
- Create: `src/app/work/glitre-loyalty-platform/page.tsx`

**Interfaces:**
- Consumes: `presentationBySlug["glitre-loyalty-platform"]` from Task 1; existing `CaseStudy`, `CaseStudyArticle`, `ArchitectureBand`, `ClosingBand`, `ArchitectureDiagram`, `illustrative-frames`, `ContentsRail`, `cs-page` / `cs-article` / `cs-section` classes; `glitre-content.ts` from Task 2.
- Produces: `GlitreArticle({ study, copy }: { study: CaseStudy; copy: PresentationContent })` and a `page.tsx` that renders it under the shared chrome with the `glitreRailSections` rail.

- [ ] **Step 1: Create `glitre-article.tsx`.** It reuses `CaseStudyArticle` for the sections that exist in the existing presenter (`heroEyebrow` / `heroHeadline` / `heroLead` / `heroMeta` / `numbers` / `situationBefore` / `situationAfter` / `deliveryCards` / `momentHeading` / `momentSteps` / `architecture` / `pullQuote` / `decisionsRows` / `builtCards` / `closing` / `footerLine`) and adds two custom blocks between the situation and the delivery section: the **end-to-end loyalty loop** (`section-loop`) and the **deeper studies** (`section-deeper`) three-card row. The existing `CaseStudyArticle` component owns the section ids `section-hero` through `section-built`; the article's wrapper appends the loop + deeper-studies blocks after the closing band.

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/content";
import type { PresentationContent } from "./presentation";
import { CaseStudyArticle } from "./case-study-article";
import {
  breadcrumbLabels,
  deeperStudyCards,
  surfaceStatusRows,
} from "./glitre-content";

const LOOP_STEPS = [
  {
    number: "01",
    title: "The customer shows a code at the pump",
    body: "The customer app issues a single-use signed QR. The worker scans it on the station device.",
  },
  {
    number: "02",
    title: "The worker records the purchase",
    body: "The worker app sends a value-moving request with an Idempotency-Key. A bad connection never double-counts.",
  },
  {
    number: "03",
    title: "The ledger records a verified earn",
    body: "The backend appends a new ledger entry; the points rule engine computes the reward; nothing is ever edited.",
  },
  {
    number: "04",
    title: "The customer redeems a reward",
    body: "The customer app requests a redeem with an Idempotency-Key; a voucher is reserved and revealed.",
  },
  {
    number: "05",
    title: "The worker consumes the voucher",
    body: "The worker app consumes the voucher with an Idempotency-Key; points are debited atomically.",
  },
];

export function GlitreArticle({
  study,
  copy,
}: {
  study: CaseStudy;
  copy: PresentationContent;
}) {
  return (
    <div className="glitre-article">
      <nav className="glitre-breadcrumb" aria-label="Breadcrumb">
        <Link href="/work">{breadcrumbLabels.work}</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{breadcrumbLabels.overview}</span>
      </nav>

      <CaseStudyArticle study={study} copy={copy} />

      <section
        id="section-loop"
        className="cs-section"
        aria-labelledby="section-loop-title"
      >
        <p className="cs-section-eyebrow">The end-to-end loyalty loop</p>
        <h2 id="section-loop-title" className="cs-section-heading">
          Three hand-offs, two idempotency boundaries, one ledger.
        </h2>
        <ol className="glitre-loop-frames" aria-label="Loyalty loop steps">
          {LOOP_STEPS.map((step) => (
            <li key={step.number} className="glitre-loop-step">
              <span className="glitre-loop-step-number">Step {step.number}</span>
              <h3 className="glitre-loop-step-title">{step.title}</h3>
              <p className="glitre-loop-step-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="section-surface-status"
        className="cs-section"
        aria-labelledby="section-surface-status-title"
      >
        <p className="cs-section-eyebrow">Production vs. planned</p>
        <h2 id="section-surface-status-title" className="cs-section-heading">
          What is live today, and what is named as the next phase.
        </h2>
        <ul className="glitre-surface-table" aria-label="Surface status">
          {surfaceStatusRows.map((row) => (
            <li key={row.surface} className="glitre-surface-row">
              <span className="glitre-surface-name">{row.surface}</span>
              <span className="glitre-surface-detail">
                <strong>Today.</strong> {row.status} <strong>Next.</strong> {row.next}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="section-deeper"
        className="cs-section"
        aria-labelledby="section-deeper-title"
      >
        <p className="cs-section-eyebrow">Deeper studies</p>
        <h2 id="section-deeper-title" className="cs-section-heading">
          One product at a time, with the screenshots and state that earn it.
        </h2>
        <ul className="glitre-deeper">
          {deeperStudyCards.map((card) => (
            <li key={card.key}>
              <article className="glitre-deeper-card">
                <p className="glitre-deeper-product">{card.product}</p>
                <p className="glitre-deeper-scope">{card.scope}</p>
                <p className="glitre-deeper-evidence">
                  <strong>What you will see.</strong> {card.evidence}
                </p>
                <p className="glitre-deeper-not-shown">
                  <strong>What is not shown.</strong> {card.notShown}
                </p>
                <Link className="glitre-deeper-link" href={card.href}>
                  Read the {card.product.toLowerCase()} study <ArrowUpRight aria-hidden="true" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/work/glitre-loyalty-platform/page.tsx`.** The route reuses the shared layout from Task 2 and renders the parent article with the rail sections from `glitre-content.ts`.

```tsx
import { notFound } from "next/navigation";
import { publicCaseStudies } from "@/lib/content";
import { getPresentation } from "@/components/case-study/presentation";
import { CaseStudyGrain } from "@/components/case-study/grain";
import { ContentsRail } from "@/components/case-study/contents-rail";
import { GlitreArticle } from "@/components/case-study/glitre-article";
import { glitreRailSections } from "@/components/case-study/glitre-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "glitre-loyalty-platform" } as { slug: string }];
}

export default function GlitreParentPage() {
  const study = publicCaseStudies.find((item) => item.slug === "glitre-loyalty-platform");
  if (!study) notFound();
  const copy = getPresentation("glitre-loyalty-platform");
  if (!copy) notFound();
  return (
    <>
      <ContentsRail sections={glitreRailSections} verification={copy.footerLine.verificationDate} />
      <GlitreArticle study={study} copy={copy} />
    </>
  );
}
```

Note: the `CaseStudyGrain` is rendered by the parent layout, not by this page; the script that reads the theme query param is also rendered by the layout.

- [ ] **Step 3: Run the focused route assertion.** Only the parent slug is in `generateStaticParams`; the three children live in their own folders and resolve via Next.js's more-specific-route precedence.

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const base = 'src/app/work/glitre-loyalty-platform';
assert.ok(existsSync(base), 'parent folder must exist');
assert.ok(existsSync(join(base, 'page.tsx')), 'parent page must exist');
assert.ok(existsSync(join(base, 'layout.tsx')), 'parent layout must exist');
assert.ok(existsSync(join(base, 'glitre.css')), 'parent css must exist');
assert.ok(existsSync('src/components/case-study/glitre-article.tsx'), 'parent article must exist');
NODE
```

- [ ] **Step 4: Run `npm run lint` and `npm run build`.** Both must pass.

- [ ] **Step 5: In a browser pointed at this worktree's own dev server, inspect `/work/glitre-loyalty-platform`.** Confirm: the hero eyebrow reads `Case study · Loyalty platform · Fuel retail · GCC`; the headline is `A fuel-station network had no way to know its repeat customers.`; the numbers strip reads `3 / 1 / 30 / 2 / 9`; the delivery grid has four cards (Customer app, Worker app, Manager dashboard, The platform beneath); the deeper-studies row lists the three product cards with the right hrefs; the architecture band renders the existing diagram (label unchanged); the footer line reads `Verified 2026-10-01 · Client name withheld pending permission. Screenshots are redacted.`. Capture both a 1440 px and a 390 px screenshot into `/home/kepler/Desktop/Kepler/Evidence/portfolio/glitre/`.

### Task 4: Add the manager dashboard study page

**Files:**
- Create: `src/app/work/glitre-loyalty-platform/manager/page.tsx`

**Interfaces:**
- Consumes: `glitre-product-article` from Task 2; `glitre-content.ts` data; existing `ContentsRail`.
- Produces: `/work/glitre-loyalty-platform/manager` — a screen-inventory-led study that shows no product screenshots until the audit captures are recovered, re-run, or substituted.

- [ ] **Step 1: Create `src/app/work/glitre-loyalty-platform/manager/page.tsx`.** The page renders `<ContentsRail>` with manager-only sections and the `GlitreProductArticle` with manager-specific copy and zero `visualSlots` (inventory fallback).

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publicCaseStudies } from "@/lib/content";
import { ContentsRail } from "@/components/case-study/contents-rail";
import {
  GlitreProductArticle,
  type GlitreProduct,
} from "@/components/case-study/glitre-product-article";
import { glitreVerifiedLabel } from "@/components/case-study/glitre-content";

const managerRailSections = [
  { id: "section-hero", label: "Overview" },
  { id: "section-inventory", label: "Nine pages" },
  { id: "section-roles", label: "Roles and permissions" },
  { id: "section-arabic", label: "Arabic-first rendering" },
  { id: "section-workflows", label: "Critical workflows" },
  { id: "glitre-visual-proof", label: "Visual proof" },
  { id: "glitre-not-shown", label: "What is not shown" },
  { id: "glitre-neighbour", label: "Other product studies" },
] as const;

const inventoryRows = [
  { label: "Login", body: "Email-based sign-in; silent token refresh; access-denied state on stale or missing role." },
  { label: "Overview", body: "At-a-glance counters and recent activity; the reference page for localization." },
  { label: "Stations", body: "Station roster; per-station configuration; live status indicators." },
  { label: "Workers", body: "Worker roster; per-station assignment; credential reset." },
  { label: "Customers", body: "Customer search; masked identity surfaces; complaint history." },
  { label: "Transactions", body: "Cursor pagination; server-side filters; URL-encoded filter state." },
  { label: "Complaints", body: "Triage queue; internal notes that never appear in customer-facing resolution fields." },
  { label: "Audit", body: "Append-only audit-event surface with actor, time, action, object, reason, result, reference." },
  { label: "Offers", body: "Draft / publish / archive lifecycle; multilingual; station-scoped." },
];

const product: GlitreProduct = {
  key: "manager",
  railSections: managerRailSections,
  heroEyebrow: "Dashboard study · Internal operations",
  heroHeadline:
    "An internal control surface for stations, workers, customers, transactions, complaints and offers.",
  heroStatus:
    "Status: live and private. Evidence: verified privately — details in the companion audit.",
  heroEvidence:
    "Captured 36 PNGs at 1440 × 900 and 390 × 844 for the 9 pages × 2 locales × 2 viewports. 0 axe-core WCAG 2.1 AA violations, 0 console errors, 0 failed network requests across the captures. The captures are excluded from the audit's own .gitignore; they are not on disk today.",
  sections: [
    {
      id: "section-inventory",
      eyebrow: "Nine pages",
      heading: "An inventory drawn from the design spec.",
      body: (
        <ul className="glitre-inventory" aria-label="Dashboard page inventory">
          {inventoryRows.map((row) => (
            <li key={row.label}>
              <span className="glitre-inventory-label">{row.label}</span>
              <span>{row.body}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "section-roles",
      eyebrow: "Roles and permissions",
      heading: "RBAC-aware navigation; minimum necessary disclosure.",
      body: (
        <>
          <p>
            Admin / cs / finance roles each see only their own pages. Silent token refresh; access-denied states on stale or missing permissions. The dashboard never calculates a balance or derives loyalty state client-side — every read goes through the server.
          </p>
        </>
      ),
    },
    {
      id: "section-arabic",
      eyebrow: "Arabic-first rendering",
      heading: "Arabic is primary, English is secondary — honestly disclosed.",
      body: (
        <>
          <p>
            Seven protected pages currently ship with hardcoded English headings/text in the AR locale. The fix path is documented work-in-progress, not a hidden flaw — and the audit's accessibility run is across both locales.
          </p>
        </>
      ),
    },
    {
      id: "section-workflows",
      eyebrow: "Critical workflows",
      heading: "Eight flows, with reversal as the audit-by-design example.",
      body: (
        <>
          <p>
            Login, Stations, Workers, Customer Lookup, Transaction Search, Manual Adjustment, Reversal, Rewards & Offers, and Audit. Reversal never edits the original transaction — it posts a new opposite ledger entry. Manual adjustments require a reason. The audit-event surface captures actor, time, action, object, reason, result, and reference.
          </p>
        </>
      ),
    },
  ],
  visualSlots: [],
  controlledVocabulary: [
    "The live dashboard URL is private; this page shows redacted screenshots only.",
    "Production tenant data is not exposed.",
    "Credentials and tokens are not shown.",
    "Until the 36 audited captures are recovered, re-run, or substituted, no dashboard images are committed.",
  ],
};

export const metadata: Metadata = {
  title: "Manager dashboard study · Glitre Loyalty Platform",
  description:
    "Internal control surface for stations, workers, customers, transactions, complaints and offers. Live and private.",
};

export default function GlitreManagerPage() {
  const study = publicCaseStudies.find((item) => item.slug === "glitre-loyalty-platform");
  if (!study) notFound();
  return (
    <>
      <ContentsRail sections={managerRailSections} verification={glitreVerifiedLabel} />
      <GlitreProductArticle product={product} />
    </>
  );
}
```

- [ ] **Step 2: Run `npm run lint` and `npm run build`.** Both must pass.

- [ ] **Step 3: In a browser pointed at the dev server, inspect `/work/glitre-loyalty-platform/manager`.** Confirm the breadcrumb reads `Work › Glitre Loyalty Platform › Manager dashboard`; the rail lists eight sections in order; the inventory table lists nine pages; no dashboard images are rendered; the controlled vocabulary lists four lines including the gate about the missing captures. Capture both a 1440 px and a 390 px screenshot.

### Task 5: Add the customer app study page

**Files:**
- Create: `src/app/work/glitre-loyalty-platform/customer-app/page.tsx`

**Interfaces:**
- Consumes: `glitre-product-article` from Task 2; `glitre-content.ts` data; existing `ContentsRail`. **Does not consume any committed image**: the customer-app study renders **labelled placeholders** for every visual slot until the owner approves an exact source for publication AND required pixel redaction is complete. No PNG is committed to `public/projects/glitre-loyalty-platform/customer-app/` unless that gate clears.
- Produces: `/work/glitre-loyalty-platform/customer-app` — a screen-flow-led study that renders labelled placeholders for each of the five customer-app slots and never links to a store URL. The five `.run/` captures and the five Stitch design-time mockups are *both* gated on owner publication approval and pixel redaction (spec §11 Q3, §4.2.1, §4.2.2; audit §6.2, §6.3, §10 Q2). If, and only if, the Stitch mockups are later approved for publication, every caption must read "Stitch design-time mockup, not a device capture"; they must never be captioned as live app captures.

- [ ] **Step 1: Create `src/app/work/glitre-loyalty-platform/customer-app/page.tsx`.** The page renders `<ContentsRail>` and `GlitreProductArticle` with five `visualSlots`, **one per labelled placeholder** — no `src` is provided for any slot, and the `inventoryFallback` for each slot is a `<figure className="glitre-placeholder">` whose caption names the slot, the candidate sources (Stitch design-time mockup, archived `.run/` capture), and the open owner-approval / redaction gate. The gated-visual-slot object preserves the `alt`, `caption`, and `provenance` fields so the eventual swap to an approved image is one diff; the placeholders are not a final state, they are the current correct state.

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publicCaseStudies } from "@/lib/content";
import { ContentsRail } from "@/components/case-study/contents-rail";
import {
  GlitreProductArticle,
  type GlitreProduct,
} from "@/components/case-study/glitre-product-article";
import { glitreVerifiedLabel } from "@/components/case-study/glitre-content";

const customerAppRailSections = [
  { id: "section-hero", label: "Overview" },
  { id: "section-loop", label: "The customer's loop" },
  { id: "section-built", label: "What we built" },
  { id: "section-handoff", label: "What is next" },
  { id: "glitre-visual-proof", label: "Visual proof" },
  { id: "glitre-not-shown", label: "What is not shown" },
  { id: "glitre-neighbour", label: "Other product studies" },
] as const;

const loopSteps = [
  { number: "01", title: "Discover stations", body: "Five public screens show the network, the reward catalogue, and the persistent sign-up CTA before login. Discovery is intentionally not gated." },
  { number: "02", title: "Register", body: "Three registration screens cover consent, name, and OTP verification. The interim email-port is designed, not implemented." },
  { number: "03", title: "My QR", body: "Two login flows plus the rotating QR screen — single-use, HMAC-signed, expired on first scan." },
  { number: "04", title: "Redeem reward", body: "Authenticated surfaces: home, my vouchers, voucher reveal, redeem confirm. Idempotent on retry." },
  { number: "05", title: "Submit complaint", body: "Submission posts to the API with an Idempotency-Key; internal notes never appear in the customer-facing resolution field." },
];

// Image gate: no customer-app capture is approved for publication today.
// Both the five Stitch design-time mockups and the five renderable archived
// .run/ PNGs are gated on (a) explicit owner publication approval of the
// exact source, and (b) required pixel redaction (spec §11 Q3, §4.2.1,
// §4.2.2; audit §6.2, §6.3, §10 Q2). Until that gate clears, every visual
// slot renders a labelled placeholder via the helper below. The placeholder
// helper preserves the slot's caption and provenance fields so swapping in
// an approved source later is a one-diff change.
function customerAppPlaceholder(slot: string) {
  return (
    <figure className="glitre-placeholder" aria-label={`Placeholder for the ${slot} screen. Pending owner publication approval and pixel redaction.`}>
      <div className="glitre-placeholder-frame" aria-hidden="true">
        Pending owner publication approval
      </div>
      <figcaption>
        <span className="glitre-gallery-caption">{slot} — placeholder</span>
        <span className="glitre-gallery-provenance">
          No customer-app capture is published today. Both the Stitch design-time
          mockups (<code>apps/customer/design/assets/stitch-review/</code>) and
          the archived <code>.run/</code> captures
          (<code>apps/customer/.run/</code>) are pending owner publication
          approval of the exact source and required pixel redaction (spec §11
          Q3, §4.2.1, §4.2.2; audit §6.2, §6.3, §10 Q2). See
          <code> public/projects/glitre-loyalty-platform/customer-app/SOURCE.md</code>.
        </span>
      </figcaption>
    </figure>
  );
}

const product: GlitreProduct = {
  key: "customer-app",
  railSections: customerAppRailSections,
  heroEyebrow: "Customer app study · Arabic-first loyalty",
  heroHeadline:
    "From a phone, a driver sees a balance, holds up a code, redeems a reward, files a complaint.",
  heroStatus:
    "Status: code in place across 21 catalogued screens in Arabic-first RTL; 5 remain ComingSoonBody stubs; the mobile end-to-end test suite is not yet in place. Preparing for store release — not yet in stores.",
  heroEvidence:
    "Verified privately. The design catalog and the Flutter source tree are the audit trail. The slots below render **labelled placeholders** — both the Stitch design-time mockups and the archived .run/ captures are pending owner publication approval and pixel redaction (spec §11 Q3; audit §6.2, §6.3, §10 Q2); no customer-app capture is published today.",
  sections: [
    {
      id: "section-loop",
      eyebrow: "The customer's loop",
      heading: "Five steps, traced to the screen catalog.",
      body: (
        <ol className="glitre-loop-frames" aria-label="Customer app loop steps">
          {loopSteps.map((step) => (
            <li key={step.number} className="glitre-loop-step">
              <span className="glitre-loop-step-number">Step {step.number}</span>
              <h3 className="glitre-loop-step-title">{step.title}</h3>
              <p className="glitre-loop-step-body">{step.body}</p>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "section-built",
      eyebrow: "What we built",
      heading: "21 screens, four groups, five stubs called out honestly.",
      body: (
        <>
          <p>
            21 screens in 4 groups (Public 4, Registration 3, Login 2, Authenticated 12) catalogued in the design spec. Arabic-first with RTL; Latin digits for points and countdowns. Five screens (My QR, Redeem Confirm interstitial, Voucher Reveal, My Vouchers, History) remain ComingSoonBody stubs.
          </p>
        </>
      ),
    },
    {
      id: "section-handoff",
      eyebrow: "What is next",
      heading: "Preparing for store release.",
      body: (
        <ul className="glitre-controlled" aria-label="Customer app next phase">
          <li>Store submission (Google Play, App Store).</li>
          <li>OTP delivery adapter — the interim email-port is designed, not implemented.</li>
          <li>Account deletion flow — absent today across API, app, and website.</li>
          <li>Privacy Policy source still has placeholders for legal entity details.</li>
          <li>Token refresh — 15-minute expiry is unmitigated today.</li>
          <li>Production signing key — today's APKs are debug-signed.</li>
          <li>iOS bundle configuration — no current-Xcode archive, no PrivacyInfo.xcprivacy.</li>
          <li>Store-review OTP access — reviewers cannot reproduce a flow without live OTP.</li>
          <li>In-app Terms link is a dead control today.</li>
        </ul>
      ),
    },
  ],
  visualSlots: [
    {
      src: undefined,
      alt: "Placeholder for the public stations list screen. The Stitch design-time mockup and the archived .run/ captures are pending owner publication approval and pixel redaction.",
      caption: "Public stations list — placeholder.",
      provenance: "Pending owner publication approval and pixel redaction. See customer-app/SOURCE.md for the open gate.",
      inventoryFallback: customerAppPlaceholder("Public stations list"),
    },
    {
      src: undefined,
      alt: "Placeholder for the authenticated home screen. The Stitch design-time mockup and the archived .run/ captures are pending owner publication approval and pixel redaction.",
      caption: "Authenticated home — placeholder.",
      provenance: "Pending owner publication approval and pixel redaction. See customer-app/SOURCE.md for the open gate.",
      inventoryFallback: customerAppPlaceholder("Authenticated home"),
    },
    {
      src: undefined,
      alt: "Placeholder for the My Vouchers screen. The Stitch design-time mockup and the archived .run/ captures are pending owner publication approval and pixel redaction.",
      caption: "My Vouchers — placeholder.",
      provenance: "Pending owner publication approval and pixel redaction. See customer-app/SOURCE.md for the open gate.",
      inventoryFallback: customerAppPlaceholder("My Vouchers"),
    },
    {
      src: undefined,
      alt: "Placeholder for the Profile screen. The Stitch design-time mockup and the archived .run/ captures are pending owner publication approval and pixel redaction.",
      caption: "Profile — placeholder.",
      provenance: "Pending owner publication approval and pixel redaction. See customer-app/SOURCE.md for the open gate.",
      inventoryFallback: customerAppPlaceholder("Profile"),
    },
    {
      src: undefined,
      alt: "Placeholder for the Redeem confirm interstitial. The Stitch design-time mockup and the archived .run/ captures are pending owner publication approval and pixel redaction.",
      caption: "Redeem confirm interstitial — placeholder.",
      provenance: "Pending owner publication approval and pixel redaction. See customer-app/SOURCE.md for the open gate.",
      inventoryFallback: customerAppPlaceholder("Redeem confirm interstitial"),
    },
  ],
  controlledVocabulary: [
    "No store listing to link to — the app is preparing for store release, not yet in stores.",
    "No production OTP delivery — the interim email-port is designed, not implemented.",
    "No customer-app capture is published today. Both the Stitch design-time mockups (apps/customer/design/assets/stitch-review/) and the archived .run/ captures (apps/customer/.run/) are pending owner publication approval and pixel redaction (spec §11 Q3; audit §6.2, §6.3, §10 Q2). The slots above render labelled placeholders.",
  ],
};

export const metadata: Metadata = {
  title: "Customer app study · Glitre Loyalty Platform",
  description:
    "Arabic-first loyalty app. 21 catalogued screens in RTL. Preparing for store release, not yet in stores.",
};

export default function GlitreCustomerAppPage() {
  const study = publicCaseStudies.find((item) => item.slug === "glitre-loyalty-platform");
  if (!study) notFound();
  return (
    <>
      <ContentsRail sections={customerAppRailSections} verification={glitreVerifiedLabel} />
      <GlitreProductArticle product={product} />
    </>
  );
}
```

- [ ] **Step 2: Run `npm run lint` and `npm run build`.** Both must pass. No image is referenced by `src` because no customer-app capture is approved for publication; the five slots render labelled placeholders, and the build passes regardless of whether owner approval later lands. If, in a future implementation phase, owner approval clears and a `src` is set, the same page must still pass lint and build with the new image present (and the placeholder helper removed from that slot).

- [ ] **Step 3: In a browser pointed at the dev server, inspect `/work/glitre-loyalty-platform/customer-app`.** Confirm the breadcrumb reads `Work › Glitre Loyalty Platform › Customer app`; the rail lists seven sections in order; the five-slot gallery renders **labelled placeholders** (no image element, no broken `<img>` references, no Stitch or `.run/` files in `public/projects/glitre-loyalty-platform/customer-app/`); each placeholder caption names the slot, names both candidate sources (Stitch design-time mockup, archived `.run/` capture), and points at the open gate (`SOURCE.md`); the controlled-vocabulary list ends with three lines including "No store listing to link to" and the explicit no-customer-app-capture-is-published-today line. Capture both a 1440 px and a 390 px screenshot.

### Task 6: Add the worker app study page

**Files:**
- Create: `src/app/work/glitre-loyalty-platform/worker-app/page.tsx`

**Interfaces:**
- Consumes: `glitre-product-article` from Task 2; `glitre-content.ts` data; existing `ContentsRail`.
- Produces: `/work/glitre-loyalty-platform/worker-app` — a hand-off-discipline-led study with no product screenshots until a real capture pass lands.

- [ ] **Step 1: Create `src/app/work/glitre-loyalty-platform/worker-app/page.tsx`.** The page renders `<ContentsRail>` and `GlitreProductArticle` with zero `visualSlots` (inventory fallback) and three concrete hand-off-discipline examples in the body.

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publicCaseStudies } from "@/lib/content";
import { ContentsRail } from "@/components/case-study/contents-rail";
import {
  GlitreProductArticle,
  type GlitreProduct,
} from "@/components/case-study/glitre-product-article";
import { glitreVerifiedLabel } from "@/components/case-study/glitre-content";

const workerAppRailSections = [
  { id: "section-hero", label: "Overview" },
  { id: "section-loop", label: "The worker's loop" },
  { id: "section-built", label: "What we built" },
  { id: "section-handoff", label: "Hand-off discipline" },
  { id: "section-pos", label: "POS integration planned" },
  { id: "glitre-visual-proof", label: "Visual proof" },
  { id: "glitre-not-shown", label: "What is not shown" },
  { id: "glitre-neighbour", label: "Other product studies" },
] as const;

const loopSteps = [
  { number: "01", title: "Scan customer QR", body: "The mobile_scanner package drives the camera; permission UX is part of the flow." },
  { number: "02", title: "Purchase entry → review", body: "Amount, category, payment method, optional external reference. The Idempotency-Key is generated once and reused on retry." },
  { number: "03", title: "Confirm → success", body: "Pending state shows the server-confirmation message only — never a success icon. Success shows transactionRef and pointsAwarded." },
  { number: "04", title: "Voucher review → consume", body: "Final review before consume; the Idempotency-Key is generated once and reused on retry." },
  { number: "05", title: "Recent activity", body: "Read-only, current session only. Activity does not survive a restart until a server endpoint exists." },
];

const inventoryRows = [
  { label: "Home / Station Hub", body: "Two dominant actions: scan customer purchase, consume voucher." },
  { label: "Customer Scanner", body: "Live QR scanner via the mobile_scanner package. Permission UX is part of the flow." },
  { label: "Scanned Customer", body: "Masked identity only. The server returns eligibility, never the customer's full balance." },
  { label: "Purchase Entry → Review", body: "Idempotency-Key generated once and reused on retry." },
  { label: "Purchase Confirming → Success", body: "Pending shows the server-confirmation message only; success shows transactionRef and pointsAwarded." },
  { label: "Voucher Scanner", body: "Same QR scanner surface, route depends on scan result." },
  { label: "Voucher Review", body: "Final review before consume; Idempotency-Key generated once and reused on retry." },
  { label: "Voucher Confirming → Success", body: "Same confirmation discipline as the purchase loop." },
  { label: "Recent Activity", body: "Read-only, current session only. Server endpoint pending." },
  { label: "Access Denied", body: "Server returns access-denied; the app surfaces it without leaking eligibility." },
];

const product: GlitreProduct = {
  key: "worker-app",
  railSections: workerAppRailSections,
  heroEyebrow: "Worker app study · Android station operations",
  heroHeadline:
    "A scanner-led app for the worker at the station, with idempotent retries that settle once.",
  heroStatus:
    "Status: 14 screens catalogued with server-authoritative hand-offs. Code in place but not deployed to production hardware. POS hardware integration is planned, not complete. No mobile end-to-end test suite.",
  heroEvidence:
    "Verified privately. The design spec and the Flutter source tree are the audit trail. No on-device captures exist; the screen inventory below is the proof today.",
  sections: [
    {
      id: "section-loop",
      eyebrow: "The worker's loop",
      heading: "Five steps, traced to the screen spec.",
      body: (
        <ol className="glitre-loop-frames" aria-label="Worker app loop steps">
          {loopSteps.map((step) => (
            <li key={step.number} className="glitre-loop-step">
              <span className="glitre-loop-step-number">Step {step.number}</span>
              <h3 className="glitre-loop-step-title">{step.title}</h3>
              <p className="glitre-loop-step-body">{step.body}</p>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "section-built",
      eyebrow: "What we built",
      heading: "14 screens, one assigned station, server-authoritative hand-offs.",
      body: (
        <>
          <p>
            14 screens (apps/worker/design/03-screen-specs.md), one assigned station (no station picker), <code>mobile_scanner</code> for QR capture, and an <code>Idempotency-Key</code> on every value-moving write. The worker app never calculates points, balances, eligibility, station authority, or voucher validity — every value-moving decision goes through the backend.
          </p>
        </>
      ),
    },
    {
      id: "section-handoff",
      eyebrow: "Hand-off discipline",
      heading: "Three concrete examples.",
      body: (
        <ul className="glitre-inventory">
          <li>
            <span className="glitre-inventory-label">No customer balance</span>
            <span>The success screen never shows the customer's full balance. Only server-returned values are surfaced.</span>
          </li>
          <li>
            <span className="glitre-inventory-label">Masked identity</span>
            <span>The worker sees only the server-returned masked customer identity and the eligibility result.</span>
          </li>
          <li>
            <span className="glitre-inventory-label">No false success</span>
            <span>Success appears only after a confirmed 2xx response; the pending state shows the server-confirmation message, never a success icon.</span>
          </li>
        </ul>
      ),
    },
    {
      id: "section-pos",
      eyebrow: "POS integration planned",
      heading: "What is named as the next phase.",
      body: (
        <ul className="glitre-controlled" aria-label="Worker app next phase">
          <li>POS hardware name, Android version, CPU ABI, scanner interface, kiosk / MDM policy.</li>
          <li>Vendor printer SDK integration.</li>
          <li>Real-device qualification against POS-class hardware.</li>
          <li>Production signing key — today's APK is debug-signed.</li>
          <li>Worker app distribution model — public vs managed (OD-5).</li>
          <li>Mobile end-to-end test suite — not in place today.</li>
        </ul>
      ),
    },
    {
      id: "glitre-visual-proof",
      eyebrow: "Visual proof",
      heading: "Screen inventory, since no on-device captures exist.",
      body: (
        <ul className="glitre-inventory" aria-label="Worker app screen inventory">
          {inventoryRows.map((row) => (
            <li key={row.label}>
              <span className="glitre-inventory-label">{row.label}</span>
              <span>{row.body}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ],
  visualSlots: [],
  controlledVocabulary: [
    "No live POS hardware to point to.",
    "No production-distribution channel.",
    "No vendor SDK integration.",
  ],
};

export const metadata: Metadata = {
  title: "Worker app study · Glitre Loyalty Platform",
  description:
    "Android station operations. 14 screens with server-authoritative hand-offs. POS hardware integration planned, not complete.",
};

export default function GlitreWorkerAppPage() {
  const study = publicCaseStudies.find((item) => item.slug === "glitre-loyalty-platform");
  if (!study) notFound();
  return (
    <>
      <ContentsRail sections={workerAppRailSections} verification={glitreVerifiedLabel} />
      <GlitreProductArticle product={product} />
    </>
  );
}
```

- [ ] **Step 2: Run `npm run lint` and `npm run build`.** Both must pass.

- [ ] **Step 3: In a browser pointed at the dev server, inspect `/work/glitre-loyalty-platform/worker-app`.** Confirm the breadcrumb reads `Work › Glitre Loyalty Platform › Worker app`; the rail lists eight sections in order; the hand-off discipline list names three concrete examples; the POS-integration-planned section lists six items; the visual-proof section renders the ten-row screen inventory as a labelled table; the controlled-vocabulary list ends with three lines including "No live POS hardware to point to". Capture both a 1440 px and a 390 px screenshot.

### Task 7: Wire the dynamic route and the permanent legacy URL redirect

**Files:**
- Modify: `src/app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: the existing `publicCaseStudies` gate; the existing HS VPN branch (untouched); the renamed Glitre record and the owner-selected Option B redirect.
- Produces: a routing matrix that serves `/work/hs-vpn` (HS VPN), `/work/glitre-loyalty-platform` (parent Glitre), `/work/<unknown>` as `notFound()`, and `/work/loyalty-operations-platform` as an HTTP 308 redirect to the Glitre parent. The legacy URL is handled at the beginning of this dynamic page. The four Glitre children resolve through their per-folder routes (Tasks 4-6), not through this dynamic route.

- [ ] **Step 1: Configure `generateStaticParams` for selected Option B.** Preserve `dynamicParams = false` and explicitly include the legacy slug so the page-level redirect can execute. Do not run the rejected Option A branch.

  - **Option A (rejected; do not execute) — legacy URL keeps resolving through this dynamic route.** Add `loyalty-operations-platform` and `glitre-loyalty-platform` to `generateStaticParams`. The legacy URL keeps resolving; the new public slug is the source of truth for the work index.

    ```tsx
    export function generateStaticParams() {
      return publicCaseStudies
        .filter((study) => study.slug === "glitre-loyalty-platform")
        .concat(
          [{ slug: "loyalty-operations-platform" }].filter(() =>
            caseStudies.some((study) => study.slug === "loyalty-operations-platform"),
          ),
        )
        .map(({ slug }) => ({ slug }));
    }
    ```

    The legacy record is looked up via the full `caseStudies` array (not `publicCaseStudies`), so its `publicationStatus: "private"` does not exclude it from the URL surface.

  - **Option B (selected) — legacy URL is generated only to issue its redirect.** Return all public slugs plus the legacy slug, which is not a content record:

    ```tsx
    export function generateStaticParams() {
      return [
        ...publicCaseStudies.map(({ slug }) => ({ slug })),
        { slug: "loyalty-operations-platform" },
      ];
    }
    ```

    Keep `dynamicParams = false`. Do not configure a `next.config.ts` redirect.

- [ ] **Step 2: Update the page handler for selected Option B.**

  - **Option A (rejected; do not execute):** look up the legacy slug via `caseStudies` (not `publicCaseStudies`). This old example is retained only to explain the previous alternative.

```tsx
if (slug === "loyalty-operations-platform") {
  permanentRedirect("/work/glitre-loyalty-platform");
}

const study = publicCaseStudies.find((item) => item.slug === slug);
if (!study) notFound();

const isHsVpn = slug === "hs-vpn";

if (isHsVpn) {
  return (
    <article className="cs-page">
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var p=new URLSearchParams(window.location.search);var t=p.get('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;try{window.localStorage.setItem('kepler-theme',t)}catch(e){}}}catch(e){}})();`,
        }}
      />
      <ThemeGate />
      <CaseStudyGrain />
      <div className="cs-shell">
        <div className="cs-layout">
          <ContentsRail sections={hsVpnRailSections} verification={hsVpnVerifiedLabel} />
          <HsVpnArticle study={study} />
        </div>
      </div>
    </article>
  );
}

notFound();
```

- For the selected implementation, import `permanentRedirect` from `next/navigation` and call it before querying case-study data:

  ```tsx
  if (slug === "loyalty-operations-platform") {
    permanentRedirect("/work/glitre-loyalty-platform");
  }
  ```

  Then query the public Glitre/HS VPN records as usual. The HS VPN branch remains byte-identical. The selected code path contains no `isLegacy` article-rendering branch or `caseStudies` lookup for the old slug.

- [ ] **Step 3: Verify the focused routing-matrix assertion for selected Option B.** Run only the selected branch's assertion.

  - **Option A (rejected; do not run):** the legacy record is in `caseStudies`, `private`, and reaches `generateStaticParams`; the new public slug is the lead.

    ```bash
    node --input-type=module <<'NODE'
    import assert from 'node:assert/strict';
    import { caseStudies, publicCaseStudies } from './src/lib/content.ts';
    assert.equal(publicCaseStudies.length, 2, 'expect hs-vpn + glitre-loyalty-platform');
    assert.ok(publicCaseStudies.some((s) => s.slug === 'glitre-loyalty-platform'));
    assert.ok(publicCaseStudies.some((s) => s.slug === 'hs-vpn'));
    assert.ok(!publicCaseStudies.some((s) => s.slug === 'loyalty-operations-platform'));
    assert.ok(caseStudies.some((s) => s.slug === 'loyalty-operations-platform'));
    const glitre = caseStudies.find((s) => s.slug === 'glitre-loyalty-platform');
    assert.equal(glitre.publicationStatus, 'public');
    const legacy = caseStudies.find((s) => s.slug === 'loyalty-operations-platform');
    assert.equal(legacy.publicationStatus, 'private');
    NODE
    ```

  - **Option B (selected):** the legacy record is renamed in `caseStudies`; `generateStaticParams` contains the public slugs and the legacy redirect slug; the page calls `permanentRedirect` before content lookup.

    ```bash
    node --input-type=module <<'NODE'
    import assert from 'node:assert/strict';
    import { caseStudies, publicCaseStudies } from './src/lib/content.ts';
    assert.equal(publicCaseStudies.length, 2, 'expect hs-vpn + glitre-loyalty-platform');
    assert.ok(publicCaseStudies.some((s) => s.slug === 'glitre-loyalty-platform'));
    assert.ok(publicCaseStudies.some((s) => s.slug === 'hs-vpn'));
    assert.ok(!caseStudies.some((s) => s.slug === 'loyalty-operations-platform'), 'legacy record removed or renamed');
    assert.ok(!publicCaseStudies.some((s) => s.slug === 'loyalty-operations-platform'));
    const glitre = caseStudies.find((s) => s.slug === 'glitre-loyalty-platform');
    assert.equal(glitre.publicationStatus, 'public');
    import { readFileSync } from 'node:fs';
    const route = readFileSync('src/app/work/[slug]/page.tsx', 'utf8');
    assert.match(route, /permanentRedirect\(["']\/work\/glitre-loyalty-platform["']\)/);
    assert.match(route, /loyalty-operations-platform/);
    // Verify the actual HTTP 308 response in the browser check below.
    NODE
    ```

- [ ] **Step 4: Run `npm run lint` and `npm run build`.** Both must pass. The route matrix is verified through the focused assertion in Step 3; the browser checks in Tasks 4-6 inspect the child routes via their per-folder files. Task 9 verifies that `/work/loyalty-operations-platform` returns HTTP 308 and lands on `/work/glitre-loyalty-platform`.

- [ ] **Step 5: Confirm the work index renders one card.** In a browser, inspect `/work` and verify the lead card is titled **Glitre Loyalty Platform** with `verifiedPrivate` and the legacy card is absent. The lead card uses the existing `LeadCard` shape; if the implementation needs a "3 deeper studies" badge on the lead card, add a single focused change to `src/components/work-grid.tsx` (the file is in `owned_paths`) that renders the badge row when `study.slug === "glitre-loyalty-platform"`, with each badge linking to `/work/glitre-loyalty-platform/<child>` and visible text naming the child product. Capture both a 1440 px and a 390 px screenshot.

### Task 8: Hold the customer-app image gate; record open provenance

**Files:**
- Create: `public/projects/glitre-loyalty-platform/customer-app/SOURCE.md`
- Create: `public/projects/glitre-loyalty-platform/customer-app/.gitkeep`
- Create: `public/projects/glitre-loyalty-platform/manager/SOURCE.md`
- Create: `public/projects/glitre-loyalty-platform/manager/.gitkeep`
- Create: `public/projects/glitre-loyalty-platform/worker-app/SOURCE.md`
- Create: `public/projects/glitre-loyalty-platform/worker-app/.gitkeep`

**Interfaces:**
- Consumes: the design spec §4.2.1, §4.2.2, §4.3, §4.4, §11 Q3; the audit §6.1, §6.2, §6.3, §6.4, §6.6, §6.7, §10 Q2.
- Produces: one `SOURCE.md` per product and one `.gitkeep` per product folder. **No PNG is committed to `public/projects/glitre-loyalty-platform/`**: every candidate customer-app source — both the five Stitch design-time mockups and the five renderable archived `.run/` PNGs — is gated on (a) explicit owner publication approval of the exact source, AND (b) completion of the required pixel redaction. The customer-app study (Task 5) already renders labelled placeholders via `glitre-placeholder`/`glitre-placeholder-frame`. The `SOURCE.md` files are the audit trail for this decision; no image file is created by this task.

- [ ] **Step 1: Write `customer-app/SOURCE.md` recording the open gate for both candidate sets.** No image is copied in this task; the file documents the two candidate sources, the unverified `.run/` provenance, the privacy findings that block publication, and the placeholder state of the page.

```markdown
# Glitre Loyalty Platform — customer app screenshots

This folder holds the on-disk screenshots used by `/work/glitre-loyalty-platform/customer-app`.

## Image gate: open

**No customer-app capture is approved for publication today.** The owner approved the design document, but did not specifically authorize publication of any customer-app screenshot file. Both candidate sets remain gated on (a) explicit owner publication approval of the exact source, AND (b) completion of the required pixel redaction. The case study currently renders **labelled placeholders** for each of the five slots; no PNG is committed to `public/projects/glitre-loyalty-platform/customer-app/` today. When, and only when, the owner approves a specific source for publication AND the redaction approach, the implementation phase copies that exact source under its reserved path and updates the page's `src` for the relevant slot; the placeholder helper (`customerAppPlaceholder` in the page module) remains in the file as the no-oped fallback for the still-pending slots.

## Candidate sources (both pending — do not copy)

### Stitch design-time mockups — `apps/customer/design/assets/stitch-review/`

The design spec calls these **design-time mockups** (spec §4.2.1), generated by the Stitch design tool during the design-generation pass. They are not device captures, and the design catalog explicitly warns that five screens (My QR, Redeem Confirm, Voucher Reveal, My Vouchers, History) were `ComingSoonBody` stubs at the time the Stitch mockups were generated — "spec-only, not spec-plus-working-reference" (`06-screen-catalog.md:769-780`). If, and only if, the owner later approves these for publication, every caption must say "Stitch design-time mockup, not a device capture"; they must never be captioned as live app captures.

| File | Dimensions | Provenance | Status |
| --- | --- | --- | --- |
| `home.png` | 203 × 512 PNG | Stitch design tool, pre-implementation | Pending owner publication approval + redaction |
| `my-vouchers.png` | 226 × 512 PNG | Same | Pending |
| `profile.png` | 226 × 512 PNG | Same | Pending |
| `public-stations.png` | 220 × 512 PNG | Same — visual inspection shows a plausibly real address-line entry; if used, the row should be cropped or replaced | Pending |
| `redeem-confirm.png` | 226 × 512 PNG | Same | Pending |
| `live-app-1.png` | **corrupt** (no PNG header) | Same | Excluded |

### Archived `.run/` UI captures — `apps/customer/.run/`

These are the only on-disk visual proof that the Flutter app actually renders the public station flows. **Device-vs-emulator-vs-render provenance is unverified** (audit §6.3). The commit message reads "UI reference screenshots" (not "device captures" or "emulator captures"); filenames `v3`, `redesign`, `pulled`, `now3` are not what is conventionally used for staged device captures. Visual inspection (audit §6.3, §6.6) confirms **every one of the five renderable captures exposes literal CRM-seeded station identifiers**, at least one capture exposes **raw enum service-tag chips** (`convenience_store`, `fuel`, `tire_service` — raw enum values, not localized labels), at least one capture exposes an **English station-name string from seed data**, and **image-loading spinners** appear in hero / thumbnail positions in four captures. Until the owner confirms origin AND approves the redaction approach, none of these are committed.

| File | Status | Status |
| --- | --- | --- |
| `screen-20260820-192517.png` | 1080 × 2400, renderable; literal CRM-seeded station identifier visible | Pending owner origin confirmation + pixel redaction |
| `screen-20260820-194126.png` | **corrupt** (UTF-8 mojibake of the PNG header) | Excluded |
| `screen-now3.png` | 1080 × 2400, renderable; literal CRM-seeded station identifier in detail header | Pending |
| `screen-pulled.png` | 1080 × 2400, renderable; partial-arc loading spinner; literal CRM-seeded station identifier | Pending |
| `screen-redesign.png` | 1080 × 2400, renderable; raw enum service-tag chips; loading spinner in hero slot | Pending |
| `screen-v3.png` | 1080 × 2400, renderable; multiple literal CRM-seeded station identifiers and English station-name strings | Pending |

### Brand-scrape assets

`apps/web/public/brand/{gliter-hero-v2.png, gliter-logo.png, gliter-station-1.jpeg}` and `apps/web/docs/ui-slides/brand-assets/*.jpg,*.jpeg` are brand assets, not product captures. The brand-scrape provenance (`BRAND-SCRAPE.md`) must be preserved if any are deployed, and any incidental signage re-checked for identifiers before publication. **Not approved for this case study today.**

## Until approval lands

The customer-app study at `/work/glitre-loyalty-platform/customer-app` shows **labelled placeholders** for each of the five slots. Each placeholder names the candidate sources (Stitch design-time mockup, archived `.run/` capture), the open owner decision (spec §11 Q3; audit §10 Q2), and the redaction requirement (audit §6.6). No `<img>` element is rendered for any slot; no PNG file is committed under this folder.

When the owner approves a specific source for publication, the implementation phase updates the page to reference the approved file with a caption matching the spec's controlled vocabulary:

- Stitch images: *"Customer app screen (Stitch design-time mockup, not a device capture)"* — paired with the source line (`apps/customer/design/assets/stitch-review/<file>.png`).
- `.run/` images: *"Customer app runtime capture, August 2026, origin confirmed by owner; identifiers, raw service-tag values, English station names, and loading states redacted."* — paired with the source line (`apps/customer/.run/<file>.png`).

Stitch images must never be captioned as live app captures; `.run/` images must never be reused without the redaction of literal CRM-seeded station identifiers, raw enum service tags, English station-name strings, and partial-arc loading spinners.
```

- [ ] **Step 2: Write `manager/SOURCE.md` recording the open gate.**

```markdown
# Glitre Loyalty Platform — manager dashboard screenshots

This folder holds the on-disk screenshots used by `/work/glitre-loyalty-platform/manager`.

## Image gate: open

**No manager-dashboard capture is approved for publication today.** The owner approved the design document, but did not specifically authorize publication of any manager-dashboard screenshot. The 36 captures referenced by `audit-2026-08-16/REPORT.md` were generated against the live Azure URL during the audit, but the audit's `.gitignore` excludes them and they are not on disk today (`audit §6.1`). The audit's `findings.json` (8,834 lines) records per-capture DOM, axe result, console / network log — useful machine-readable evidence, not images.

## Open gate

Before any dashboard capture lands in this folder, one of the following must resolve:

1. Recover the 36 audit PNGs from the audit operator's local machine.
2. Re-run `audit-2026-08-16/audit.mjs` against the live URL with a controlled admin credential and commit the captures.
3. Owner-approved redacted mockups, captioned as design intent rather than live capture.

Until one of these lands, the manager study and the parent study show **no dashboard screenshots**. The page above uses the nine-page inventory as labelled text, and the parent study's "What we delivered" card for the dashboard reads "Live and private; the page below shows redacted screenshots only" without any images attached.

## Excluded from this folder

- The live manager dashboard URL (forbidden).
- The `[private API host omitted]` API URL (forbidden in copy).
- Any customer / worker / OTP / voucher / complaint / ledger / audit-event content.
- `BRAND-SCRAPE.md` provenance assets — brand assets, not product captures.
```

- [ ] **Step 3: Write `worker-app/SOURCE.md` recording the open gate.**

```markdown
# Glitre Loyalty Platform — worker app screenshots

This folder holds the on-disk screenshots used by `/work/glitre-loyalty-platform/worker-app`.

## Image gate: open

**No worker-app capture is approved for publication today.** The owner approved the design document, but did not specifically authorize publication of any worker-app screenshot. `apps/worker/design/` is docs only (`01-information-architecture.md` through `11-stitch-generation-run.md`); no PNGs, no JPEGs, no design mockups in any repo path (`audit §6.4`).

## Open gate

Before any worker capture lands in this folder:

1. Owner-supplied real captures from a test build against the same POS-class hardware.
2. A new capture pass commissioned against the same hardware a station would use, with pixel redaction of any literal identifiers before publication.

Until one of these lands, the worker study shows the **14-screen inventory as a labelled table** and uses **textual** hand-off frames in the body. The page above says so in copy, not in a footnote, and the controlled-vocabulary list ends with:

- No live POS hardware to point to.
- No production-distribution channel.
- No vendor SDK integration.

## Excluded from this folder

- The worker app debug-signed APK binary (forbidden).
- The worker app bundle identifier (`com.gliter.worker`) used as a portfolio brand.
- Any worker / station / station authority / voucher / ledger content.
```

- [ ] **Step 4: Add `.gitkeep` to the customer-app, manager, and worker-app folders.** The empty directories stay in the tree under VCS so the folder structure is discoverable while the gates remain open. The customer-app folder holds only `SOURCE.md` and `.gitkeep`; the manager and worker-app folders each hold `SOURCE.md` and `.gitkeep`. No PNG, no JPEG, no SVG, no brand asset is committed by this task.

- [ ] **Step 5: Run `npm run lint` and `npm run build`.** Both must pass. The customer-app gallery references no committed PNGs because no source is approved; the build passes regardless of whether owner approval later lands.

### Task 9: Whole-feature editorial and visual verification

**Files:**
- No product-file changes expected. The earlier untracked draft at `portfolio-task-fuel-platform/docs/superpowers/specs/` is read-only input.

**Interfaces:**
- Consumes: every completed Task 1-8 output; the approved spec; the audit; this plan's Review Focus list.
- Produces: final lint/build logs, ten page screenshots, a content review, an evidence record in the Hub.

- [ ] **Step 1: Run `npm run lint` and `npm run build` once in the final combined worktree.** Save concise pass/fail output and the exact commit hashes. Resolve only concrete failures, then rerun the failed gate. The publication gate at `src/lib/content.ts:184-189` must still reject `unverified` and `pending`; the renamed `glitre-loyalty-platform` record must be the lead public card. The legacy slug is absent as a content record and redirects at the start of `[slug]/page.tsx`.

- [ ] **Step 2: Capture the browser screenshots.** Capture `/work`, `/work/glitre-loyalty-platform`, `/work/glitre-loyalty-platform/manager`, `/work/glitre-loyalty-platform/customer-app`, `/work/glitre-loyalty-platform/worker-app`, and `/work/hs-vpn`. Each page at 1440 px and 390 px. Also verify `/work/loyalty-operations-platform` responds with HTTP 308 and the browser lands on `/work/glitre-loyalty-platform`. File evidence into `/home/kepler/Desktop/Kepler/Evidence/portfolio/glitre/`. Verify each: image captions appear adjacent to images; no page has horizontal viewport overflow; the breadcrumb renders correctly; the rail sections map to existing section ids; the rail active-state follows scroll position.

- [ ] **Step 3: Audit copy against the 12 controlled claims.** For each of the 12 claims in Task 1 Step 4, confirm the rendered copy on `/work/glitre-loyalty-platform` either carries the claim or remains silent about it. Specifically: search the rendered DOM for `customers register`, `customers signing in by email`, and `email code today`; these phrases must not appear on any Glitre page or on `/work`, and the old Fuel presentation must not remain under a stale slug. Search the rendered DOM for `live`, `production`, `today` qualifiers attached to performance, revenue, retention, conversion, or active-customer figures — none should be present. Search for any of `App Store`, `Google Play`, `10K+`, `Mbps`, `ms`, `IP`, `REALITY`, `Hysteria2`, `MASQUE`, `AppId`, `com.gliter.*`, `[private`, `http://`, `https://` followed by a host — only the existing portfolio hosts (e.g. `keplerdev.uk`, `play.google.com` for HS VPN's existing external link) should appear.

- [ ] **Step 4: Verify navigation and semantics.** `/work/glitre-loyalty-platform`, the three children, and `/work/hs-vpn` all resolve; unknown slugs (`/work/not-a-study`) still return not-found; both project cards on `/work` point to the right route (HS VPN to `/work/hs-vpn`, Glitre to `/work/glitre-loyalty-platform`); all rail section ids exist on the page; every image has meaningful `alt` text — for the Glitre pages, this means every `glitre-placeholder` `figure` carries a descriptive `aria-label` and visible `<figcaption>` naming the slot, candidate sources, and open gate; keyboard focus is visible on every interactive surface; reduced-motion is honored on the loop frames and any reveal animation; the customer-app gallery respects the priority-on-first rule described in spec §6. Confirm the legacy URL permanently redirects and does not render the previous Fuel article.

- [ ] **Step 5: Record evidence and request independent review.** Attach lint, build, screenshot paths, and source-claim-map path to the Hub task `task_c9ceb70ac8854372801737edc6ba6e2c` as evidence items `build`, `lint`, `screenshots`, `content-review`. A different session or assigned reviewer evaluates the code; the implementer does not approve their own work. Keep branches unmerged and unpushed until Mahmoud directs integration. The reviewer role for this task is `quality-release-engineer` per the task record.

## Plan self-review checklist

- **Spec coverage.** Every section of the design spec is mapped to a Task: §1 Intent → Tasks 1, 3, 7, 8; §2.1 Work index → Tasks 1, 7; §2.2 Parent → Task 3; §2.3 Manager → Task 4; §2.4 Customer app → Task 5; §2.5 Worker app → Task 6; §2.6 Back-navigation and inter-study links → Tasks 2, 3, 4, 5, 6; §3 Routes → Tasks 1, 2, 3, 4, 5, 6, 7; §3.1 selected canonical slug and legacy redirect → Tasks 1 and 7; §3.2-§3.4 Shared layout and precedents → Task 2; §4 Screenshot inventory → Tasks 5, 8; §5 Claim rules → Tasks 1, 3, 9; §6 Performance approach → Tasks 5, 8; §7 Responsive and accessibility → Tasks 2-6; §8 Production vs. planned vocabulary → Tasks 3-6; §9 Files likely to change → every owned path in the file map; §10 Implementation dispatch evidence → Task 9; §11 open items → remaining screenshot and copy gates in Tasks 4-8. The owner-selected Option B behavior is implemented unconditionally; no URL decision remains open.
- **Route decision (resolved).** Owner selected Option B on 2026-10-02. Rename the existing record and presentation key. Include the legacy slug in `generateStaticParams` only so the `[slug]` page can issue the 308 with `permanentRedirect` before content lookup. `next.config.ts` remains unchanged. Option A is rejected and must not be implemented.
- **Filenames.** Every owned path in the file map is a real path under the worktree; every path uses the existing `src/components/case-study/`, `src/app/work/`, `src/content/work/`, `src/lib/`, `public/projects/`, and `docs/superpowers/` conventions; no new top-level folders are introduced; no `.env.local`, no `Glitre/` writes, no founder-page edits, no homepage edits. The `public/projects/glitre-loyalty-platform/customer-app/` folder is reserved but holds only `SOURCE.md` and `.gitkeep` until owner publication approval and pixel redaction land.
- **Evidence gates.** The three open-image-gate records (manager captures, the *both* candidate customer-app sets, worker captures) are surfaced as pre-conditions in Steps 1 and 4 of Task 4, the `customerAppPlaceholder` helper + five `visualSlots` in Step 1 of Task 5, Step 1 of Task 6, and the three `SOURCE.md` files written by Task 8. **No product screenshot is committed unless the owner approves that exact source for publication AND required pixel redaction is complete.** The customer-app study shows labelled placeholders for each of the five slots via the `.glitre-placeholder` / `.glitre-placeholder-frame` rules in `glitre.css`; the manager study shows a labelled inventory of nine pages with no images; the worker study shows a labelled inventory of fourteen screens with no images. If, and only if, the owner later approves the Stitch design-time mockups for publication, every caption must say "Stitch design-time mockup, not a device capture"; they must never be captioned as live app captures. The five `.run/` captures remain gated on origin confirmation and pixel redaction. The email-OTP gate is enforced by removing the "customers register and sign in by email code today" copy from the renamed Glitre record and its slots; no old Fuel article remains under the legacy slug.
- **Test commands.** Every Task has a focused `node --input-type=module <<'NODE'` assertion, plus `npm run lint` and `npm run build` at the end of every code-changing Task. The browser checks are listed in Tasks 3-7 and centralised in Task 9. The customer-app gallery has no broken-image risk because no `src` is set until owner approval lands; the build passes regardless.
- **Risks.** Recorded explicitly: (1) the manager screenshots cannot ship without an owner-approved capture path; (2) the customer-app Stitch design-time mockups are not approved for publication by the design spec — owner approval of the exact source AND required pixel redaction must both be documented before any copy lands; (3) the customer-app `.run/` captures cannot ship without owner confirmation of origin and pixel redaction; (4) the worker screenshots cannot ship without a real capture pass; (5) old email-OTP claims must be removed from the renamed record and presentation; (6) the selected permanent redirect must be verified in the built app because `dynamicParams = false` requires the legacy slug in `generateStaticParams`; `next.config.ts` remains unchanged. Option A and the previous article-at-legacy-URL behavior are not implemented; (7) any `public/projects/` write that pulls from `apps/customer/design/assets/stitch-review/` or `apps/customer/.run/` is forbidden until the owner confirms the exact source, the publication right, and the redaction approach.
- **Resolved redirect note.** The route-decision paragraphs above supersede any older wording in the evidence/risk notes that describes the URL choice as open or says the old Fuel article remains at the legacy URL. The implementation renames the existing record and presentation, and the legacy URL redirects to Glitre. Screenshot provenance and publication are the remaining owner gates.
- **Spec consistency.** The plan names **Glitre Loyalty Platform** as the only public-facing rendering. It treats the manager dashboard as **private** (screenshot-only). It describes the customer app as **preparing for store release**. It describes the worker app's POS integration as **planned, not complete**. It treats POS / forecourt / ZATCA as **Release C**. It describes the backend as the **foundation** beneath three products, not as a fourth product. It asserts **no** quantitative revenue, retention, conversion, throughput, latency, uptime, or active-customer figures. It preserves the historical spelling `gLiter` only in verbatim source-path citations. It calls the five Stitch files **design-time mockups** and the five `.run/` PNGs **archived UI captures with unverified origin**, not approved captures; it never schedules a copy or commit unless the owner approves that exact source for publication.
