# Glitre Loyalty Platform — evidence and performance audit

**Date:** 2 October 2026 (revision 5)
**Project:** Mahmoud portfolio (`portfolio`)
**Hub task:** `task_c9ceb88ec6566562801737edc6ba6e2c` → `task_c9ceb70ac8854372801737edc6ba6e2c` (active)
**Source repository:** `/home/kepler/Desktop/Kepler/Projects/Glitre` (read-only)
**Working portfolio worktree:** `portfolio-task-gleater-platform`
**Companion spec:** `2026-09-30-fuel-platform-case-study-design.md` (titled **Glitre Loyalty Platform**)

> Owner-provided display name for the case study: **Glitre Loyalty Platform**.
> The owner has clarified that the correct public platform name is Glitre.
> Preserve historical source identifiers such as `gLiter` only when quoting
> repository paths or evidence verbatim; use Glitre in the case-study copy.

This is a research-only audit. It maps what the platform actually is,
what has been measured, and what is still owner-claimed, planned, or
unverified. It does not move the source repository, does not copy
sensitive material into the portfolio, and does not invent performance
or revenue figures. Every claim is annotated with a precise source path
and, where useful, a line reference. The companion design spec
consumes this audit and constrains what the case-study page may say.

---

## 1. Coverage matrix

Scope-based inventory. Anything not listed below was either inspected
via the package / module list (not line-by-line read), or excluded on
purpose. The matrix is grouped by source area, then by documentation
area, then by image / evidence area.

### 1.1 Architecture and source — products

| Area | Files / paths inspected | Key takeaways | Excluded |
| --- | --- | --- | --- |
| Repository root | `PROJECT_CONTEXT.md`, `BRANCHING.md`, `HANDOFF.md`, `pnpm-workspace.yaml`, `package.json`, `azure-pipelines.yml` (existence + length), `infra/docker-compose.dev.yml` | Monorepo. Three products (manager dashboard, customer app, worker app) and one shared backend, one contract package. 60 endpoints per the platform's own count; `packages/contract/openapi.yaml` 82 top-level paths when counted with non-versioned aliases — see §1.2. CI covers API + contract only. | Pipeline definition and shell scripts not read line-by-line. |
| Backend / API (`services/api`) | `package.json`, `src/main.ts`, `src/worker.ts`, `src/app.module.ts`, `prisma/schema.prisma` (presence + line count), `Dockerfile`, `openapi.yaml` (mirror under `services/api/`) | NestJS 11 modular monolith + Prisma 6 + PostgreSQL + Redis/BullMQ. One codebase, two entrypoints (HTTP API and BullMQ notification worker). 30 Prisma models, 25 enums, 7 migrations (PROJECT_CONTEXT.md:96). | Service-internal modules list-inspected only. |
| Shared contract (`packages/contract`) | `openapi.yaml` (presence + path count), `types.ts` | OpenAPI 3.1.0 (`openapi.yaml:1-2`), `info.title: gLiter Loyalty Platform API` (`openapi.yaml:2-3`); 82 top-level `/…` paths observed (counted by `^  /` against `openapi.yaml`). The platform's own documentation cites 60 endpoints (`PROJECT_CONTEXT.md:48,75`). 82 includes non-versioned aliases (`/health`, `/ready`) and likely each verb under the same path. **Verification gap:** reconcile path-vs-endpoint count before quoting a number. | Full schema not read. |
| Customer app (`apps/customer`) | `README.md`, `pubspec.yaml`, `design/01-information-architecture.md`, `design/06-screen-catalog.md`, `design/assets/`, `lib/features/` (directory listing) | Flutter Arabic-first RTL, 21 screens catalogued. 5 of 21 screens are still `ComingSoonBody` stubs (`features/home/history_page.dart`, `features/my_qr/my_qr_page.dart`, `features/rewards/my_vouchers_page.dart` per `06-screen-catalog.md:393-421,578-602`; plus `redeem-confirm` interstitial and `voucher reveal`). Complaint submission wired to `POST /me/complaints` (`06-screen-catalog.md:679-710`). | `lib/**` directory-listed; not every Dart file was read. |
| Worker app (`apps/worker`) | `README.md`, `pubspec.yaml`, `design/01-information-architecture.md`, `design/03-screen-specs.md`, `lib/` (directory listing) | Flutter Android, 14 screens, single assigned station, `mobile_scanner` package, `Idempotency-Key` required on `POST /worker/purchases` and `POST /worker/vouchers/consume`. Recent activity has no server endpoint — interim read of volatile local state only (`design/01-information-architecture.md:84-86`, `design/03-screen-specs.md:127-133`). | `lib/**` directory-listed only. |
| Manager dashboard (`apps/web`) | `README.md`, `package.json`, `docs/ux/01-actors-stories-ia.md`, `docs/ux/02-screen-inventory.md`, `docs/ux/03-critical-workflows.md`, `docs/ui-slides/02-slide-inventory.md`, `src/app/` (directory listing), `src/components/` (directory listing) | Next.js 15 + React 19, static export, 9 pages, ar/en with RTL, RBAC navigation. 30 distinct endpoint calls wired to generated contract types (`08_Build_State_Three_Buckets.md:35`). | `src/**` directory-listed; behaviour verified through the 2026-08-16 audit. |
| Infra (`infra/`) | `azure/`, `docker-compose.dev.yml`, `sql/` (directory listing only) | Azure deployment scripts present; local dev uses Postgres + Redis + MinIO via `docker-compose.dev.yml`. Production runs in Azure UAE North (PDPL residency). | Script internals not read. |
| CI / pipeline | `azure-pipelines.yml` | Pipeline file present at repo root (existence only). Per `08_Build_State_Three_Buckets.md:30` and `PROJECT_CONTEXT.md:179`, CI covers API + contract only — **no web stage, no Flutter stage** (Q2). | Pipeline definition not read. |

### 1.2 Architecture documents (read in full)

- `docs/Project-Overview/Architecture/00_Architecture_Overview.md` — full read (202 lines).
- `docs/Project-Overview/05_gLiter_User_Journeys.md` — partial read (focus on persona + J-01 listing; 80 of 574 lines).
- `docs/Release-A/08_Build_State_Three_Buckets.md` — full read (119 lines).
- `docs/Release-A/10_Production_Environment_Runbook.md` — referenced via `PROJECT_CONTEXT.md:122-158` summary; the runbook itself was not read line-by-line. Quoted figures in this audit derive from the PROJECT_CONTEXT summary, which is itself sourced from the runbook.

### 1.3 Audits and design reviews (read in full)

- `audit-2026-08-16/REPORT.md` — full read (215 lines).
- `audit-2026-08-16/findings.json` — schema inspected at line 1-40 (8,834 total lines).
- `audit-2026-08-25-publication-readiness/REPORT.md` — full read (240 lines).

### 1.4 App design docs (read in full or scoped)

- `apps/customer/design/06-screen-catalog.md` — full read (791 lines).
- `apps/customer/design/01-information-architecture.md` — full read (81 lines).
- `apps/worker/design/01-information-architecture.md` — full read (101 lines).
- `apps/worker/design/03-screen-specs.md` — full read (141 lines).
- `apps/web/docs/ux/02-screen-inventory.md` — full read (387 lines).
- `apps/web/docs/ux/03-critical-workflows.md` — full read (236 lines).
- `apps/web/docs/ui-slides/brand-assets/BRAND-SCRAPE.md` — full read (58 lines).

### 1.5 Branding and screenshot candidates — inventory only

Files inspected via `ls` and `file`. Image content examined where noted in §6.

- `apps/customer/assets/{gliter-logo.png, gliter-mark.png}` — logo only.
- `apps/customer/design/assets/{gliter-logo.png, gliter-icon-mark.png}` — logo only.
- `apps/customer/design/assets/station-placeholders/{gliter-station-placeholder-blue-hour.png, gliter-station-placeholder-golden-hour.png}` — design-time placeholders, 1672 × 941 PNG (~2 MB each, candidate compression target: < 250 KB).
- `apps/customer/design/assets/stitch-review/{home.png, my-vouchers.png, profile.png, public-stations.png, redeem-confirm.png, live-app-1.png}` — six Stitch design-time mockups. Five render at 203–226 × 512 PNG; `live-app-1.png` is corrupt (no PNG header per `file`). **None are device captures.**
- `apps/customer/.run/{screen-20260820-192517.png, screen-20260820-194126.png, screen-now3.png, screen-pulled.png, screen-redesign.png, screen-v3.png}` — six candidate UI captures at 1080 × 2400 added in commit `aca5460` (2026-08-20, "chore: add UI reference screenshots to customer app directory"). Five render as Arabic-first RTL station list and station detail screens with Android chrome; `screen-20260820-194126.png` is corrupt (UTF-8 mojibake of the PNG header per `file`, raw bytes inspected). **Device-vs-emulator provenance is unverified** — the commit message reads "UI reference screenshots", filenames include `v3`, `redesign`, `pulled`, `now3`. Visual inspection in §6.3 confirms multiple captures expose literal station identifiers (CRM-seeded IDs) and image-loading spinners.
- `apps/worker/assets/{gliter-logo.png, gliter-pro-logo.png}` — logo only.
- `apps/web/public/brand/{gliter-hero-v2.png, gliter-logo.png, gliter-station-1.jpeg}` — hero (1024×1024 JPEG), logo, one station photo (1280×720 JPEG).
- `apps/web/docs/ui-slides/brand-assets/{gliter-hero-v2.png, gliter-hero1.jpg, gliter-hero2.jpg, gliter-hero3.jpg, gliter-logo.png, gliter-station-1.jpeg, gliter-station-2.jpeg, gliter-station-3.jpeg}` — brand scrape, see `BRAND-SCRAPE.md` for provenance.
- `docs/Project-Overview/Architecture/diagrams/*.png` — ~30 architecture-diagram renderings embedded in the architecture doc. **Not product captures.**
- `apps/{customer,worker}/android/app/src/main/res/{mipmap-*,drawable-*/launch_logo.png}` and `apps/{customer,worker}/ios/Runner/Assets.xcassets/{LaunchImage.imageset,AppIcon.appiconset}/*.png` — Android launcher icons, iOS launch images, iOS app icons. **Not product captures.**

### 1.6 Intentionally excluded

- `node_modules/`, `build/`, `coverage/`, `dist/` — generated / dependency outputs.
- `.git/` — history.
- `outputs/ios-production-quotation-2026-09-24/` — directory listed but empty; nothing to read.
- `.env*` files, secrets, credentials, Key Vault contents, Prisma `seed` data — none read or referenced.
- Live production data, real customer accounts, real OTP codes, real worker sessions.
- Anything marked "secret" or "credentials" in any path under `infra/`, `services/api/`, `apps/*`.
- Direct web fetches of the live Azure URLs — per task instructions, no `curl`, `wget`, or `WebFetch` calls were used.

---

## 2. What the platform is, in one paragraph

A contract-first loyalty platform designed for a fuel-station network
in the GCC. **One shared backend with three customer-facing products**:
a NestJS API (PostgreSQL + Redis/BullMQ) plus an append-only points
ledger, a Next.js manager dashboard (head-office operations, RBAC,
ar/en), a Flutter Arabic-first customer app, and a Flutter Android
station-worker app. Arabic is the **primary** language; English
secondary. Data stays in-region for **Saudi PDPL**, which is why
production runs in Azure **UAE North** (PROJECT_CONTEXT.md:23-25,
120-125). The team is small, with AI agents operating in flagship
models against the shared OpenAPI contract; CI fails the build if any
client drifts from it (PROJECT_CONTEXT.md:46-48, 193-195).

The owner-confirmed case-study display name is **Glitre Loyalty
Platform**. The source repository folder is named `Glitre`; some
historical product-code identifiers use `gLiter`. The public case
study uses Glitre, and evidence citations preserve source spellings.

---

## 3. Architecture, end to end

### 3.1 Stack

| Layer | Technology | Source |
| --- | --- | --- |
| Customer app | Flutter, iOS + Android, Arabic-first RTL | PROJECT_CONTEXT.md:21; Architecture 00:99 |
| Worker app | Flutter, Android | PROJECT_CONTEXT.md:21; Architecture 00:100 |
| Manager dashboard | Next.js 15 + React 19, static export, ar/en | PROJECT_CONTEXT.md:19, 101-104; Architecture 00:101 |
| Backend (foundation) | NestJS 11, modular monolith, server-authoritative | PROJECT_CONTEXT.md:18; Architecture 00:101 |
| Database | PostgreSQL 16, append-only points ledger enforced by trigger | PROJECT_CONTEXT.md:20; Architecture 00:102 |
| Cache / queues / tokens | Azure Managed Redis (prod), BullMQ jobs | PROJECT_CONTEXT.md:20; PROJECT_CONTEXT.md:137 |
| Object storage | Azure Blob Storage (prod) / MinIO (dev) | Architecture 00:104 |
| Hosting | Microsoft Azure, region UAE North today; Saudi East planned Q4 2026 for PDPL (OD-1) | PROJECT_CONTEXT.md:24; Architecture 00:105 |

### 3.2 Eight architectural principles (Architecture 00:115-145)

P1 server-authoritative business logic, P2 immutable ledger, P3 atomic
and idempotent money-sensitive operations, P4 least data / least
privilege, P5 auditable by design, P6 online-first honest failure, P7
bounded components with explicit contracts, P8 build for the next
release. Each principle enforces a numbered requirement (`PR-LOY-001`
etc.). These should be quoted in the case study as **principles**, not
as measured performance.

### 3.3 Component boundaries (Architecture 00 §6)

Seven key decisions — custom backend, modular monolith, Flutter for
both mobile apps, Next.js for the dashboard, append-only ledger +
derived balance, signed short-lived QR + single-use vouchers, adapter
boundary for external sales. AD-7 ("adapter boundary for external
sales") is the contract the future POS / forecourt / ZATCA integration
will plug into without rewriting core loyalty math.

### 3.4 One-sentence journey

A customer identifies at the station with a phone-displayed QR
(Architecture 00:49); the worker records the purchase; the backend
appends a ledger entry and computes points; the customer redeems
points for a single-use voucher; managers and CS audit through the
web dashboard.

### 3.5 End-to-end loyalty journey, traceable to source

| Step | Customer app | Worker app | Backend | Manager dashboard | Source |
| --- | --- | --- | --- | --- | --- |
| 1. Discover stations | Public shell `GET /stations` | — | — | — | `apps/customer/design/01-information-architecture.md:6-10` |
| 2. Register | `/auth/register/start` → `/auth/register/verify` (OTP) | — | `OtpService.start()` returns hint — **no SMS adapter in production**; email-port designed, not built (OD-7) | — | `06-screen-catalog.md:182-289`; `PROJECT_CONTEXT.md:168` B1 row |
| 3. Get QR | `POST /me/qr-token` (rotating, HMAC-signed, single-use Redis nonce via `GETDEL`) | — | Issues HMAC-signed token; `GETDEL` ensures one-time use | — | `PROJECT_CONTEXT.md:82-83` |
| 4. Worker scans | — | `POST /worker/scan` with `qrToken` → `ScanResult` (masked customer, eligibility) | Returns masked customer context | — | `apps/worker/design/03-screen-specs.md:49-66` |
| 5. Purchase entry | — | `POST /worker/purchases` with `Idempotency-Key` (amount, category, payment method, optional external ref) | Append-only ledger entry; computed points; `sarPerPoint` + rounding mode, versioned point-rule engine | — | `apps/worker/design/03-screen-specs.md:69-92`; `PROJECT_CONTEXT.md:82-83` |
| 6. Confirm in dashboard | — | — | Idempotent retry → returns original result | Live under `/transactions`, `/customers/{id}` | `PROJECT_CONTEXT.md:82-83`; `apps/web/docs/ux/03-critical-workflows.md:96-145` |
| 7. Redeem reward | `POST /rewards/{rewardId}/redeem` with `Idempotency-Key` | — | Voucher reserved → QR + backup code revealed | — | `06-screen-catalog.md:506-575` |
| 8. Consume voucher | — | `POST /worker/vouchers/consume` with `Idempotency-Key` | Atomic consume; points debited; voucher status flipped | — | `apps/worker/design/03-screen-specs.md:107-123` |
| 9. Submit complaint | `POST /me/complaints` with `Idempotency-Key` | — | CRM record with internal notes (never customer-visible) and customer-facing resolution | Queue at `/complaints`, assignable, status transitions | `06-screen-catalog.md:679-710`; `apps/web/docs/ux/03-critical-workflows.md:193-216` |
| 10. Reverse / adjust | — | — | Reverse = new opposite ledger entry (never edit); manual adjustment via `/admin/…` | Reversal flow under transactions; manual adjustment requires reason | `apps/web/docs/ux/03-critical-workflows.md:115-189` |

This is the **single end-to-end loyalty journey** the parent case
study must trace, with three explicit hand-offs (customer ↔ worker ↔
manager) and two idempotency boundaries (purchase, redeem).

---

## 4. Verified facts vs. owner-provided vs. hypotheses vs. missing

The task instruction explicitly forbids presenting architecture as
measured performance or inventing metrics. The following taxonomy is
enforced in the case-study spec.

### 4.1 Verified (source: source repository)

| Fact | Source |
| --- | --- |
| Three customer-facing products + one shared backend; one monorepo | PROJECT_CONTEXT.md:14-22 |
| API: NestJS 11 + Prisma 6 + PostgreSQL + Redis/BullMQ | PROJECT_CONTEXT.md:18 |
| Manager dashboard: 9 pages, Next.js 15, RBAC-aware, ar/en | PROJECT_CONTEXT.md:19, 101-104 |
| Customer app: Flutter, Arabic-first RTL, 21 screens catalogued | PROJECT_CONTEXT.md:21; `06-screen-catalog.md:762-805` |
| Worker app: Flutter, Android, 14 screens | PROJECT_CONTEXT.md:21; `apps/worker/design/03-screen-specs.md` (14 entries) |
| 30 Prisma models, 25 enums, 7 migrations, all applied to production | PROJECT_CONTEXT.md:96 |
| 60 contract endpoints (per the platform's own count) | PROJECT_CONTEXT.md:48, 75 |
| Append-only ledger enforced by Postgres trigger | PROJECT_CONTEXT.md:81, 196-197 |
| Idempotency keys on every value-moving endpoint | PROJECT_CONTEXT.md:81, 124 |
| HMAC-signed QR + single-use Redis nonce via `GETDEL` | PROJECT_CONTEXT.md:82-83 |
| `validate-env.ts` refuses boot unless `APP_VERSION`, `CORS_ALLOWED_ORIGINS`, `TRUST_PROXY_HOPS` set; Swagger auto-disables in production | PROJECT_CONTEXT.md:197-199 |
| Manager dashboard ships as static export; locale applied by pre-paint inline script in `layout.tsx` | PROJECT_CONTEXT.md:200-201 |
| Notification worker must stay at 1 replica (outbox not partitioned) | PROJECT_CONTEXT.md:206-207 |
| BullMQ needs the `{gliter}` hash-tagged prefix (compile-time constant in `notification-job.types.ts`) | PROJECT_CONTEXT.md:202-205 |
| `index.html lang/dir` correct in **all 36** audit captures; inline bootstrap prevents LTR↔RTL flash | audit-2026-08-16 §4.3 (lines 126-132) |
| **0 axe-core WCAG 2.1 AA violations across 36 captures** (9 pages × 2 locales × 2 viewports) | audit-2026-08-16 §4.1 (lines 95-110) |
| Mobile 390×844 renders all 9 pages correctly; sidebar collapses to hamburger; RTL drawer flips to right edge | audit-2026-08-16 §4.2 (lines 112-124) |
| 0 console errors, 0 page errors, 0 failed network requests across 36 captures | audit-2026-08-16 §4.4 (lines 134-143) |
| Customer Flutter: 214 tests pass, 79.0% line coverage, `flutter analyze` exits 1 with 2 warnings + 6 infos in tests | audit-2026-08-25 §"Static analysis is not clean" (lines 162-170) |
| Worker Flutter: 67 tests pass, 77.8% line coverage, `flutter analyze` exits 1 with 2 warnings in tests | audit-2026-08-25 §"Static analysis is not clean" (lines 162-170) |
| Both current APKs target Android API 36; `minSdk 24`; HTTPS for live API; both `zipalign -c -P 16 -v 4` pass | audit-2026-08-25 §"Platform packaging checks that already pass" (lines 184-191) |
| Live APK SHA-256s: customer `CB5BF08C8DB996E01F23638CC4DE2EF90EF990A8B5AA10C2D4AF60D1CECEBBD8`; worker `29CB730985967195C8ED1C0E9056C694A4E4ADA83F71DDC170A614B11A208A14` | audit-2026-08-25 §4 (lines 91-96) |
| Embedded production URL: `[private API host omitted]/api/v1` | audit-2026-08-25 §4 (lines 100-101) |
| `/api/v1/health` returned `{"status":"ok","version":"v14"}` at audit time | audit-2026-08-25 §Executive verdict (lines 13-14) |
| OSV API check across 123 resolved Dart packages: 0 known vulnerabilities at audit time | audit-2026-08-25 §"Supply-chain and secret scanning needs automation" (line 174) |
| Production environment live in Azure UAE North as of 2026-08-12 | PROJECT_CONTEXT.md:60, 120-156 |

### 4.2 Owner-provided / claims that need attribution, not assertion

| Claim | Source / reason |
| --- | --- |
| "31 days from kickoff to production" | Currently in the existing portfolio copy (`presentation.ts:114`). The exact span is not dated in the source repo. **Treat as founder-reported figure; attribute, do not assert.** |
| "Customers register and sign in by email code today" | Currently in existing portfolio copy (`presentation.ts:231`). The repo confirms the **interim email OTP path is unblocked by decision** but `OtpService.start()` still has **no delivery mechanism** for SMS and the email-port is **not yet implemented** (`PROJECT_CONTEXT.md:168` B1 row, `08_Build_State_Three_Buckets.md:53` B1 row). **This claim must not stand as written.** |
| Cost $102.16/mo vs quoted $70.33, +$31.83 (+45%) variance, all of it Redis; Basic C0 retired, Managed Redis Balanced B0 ($53) is the cheapest available option | PROJECT_CONTEXT.md:144-149 |
| As-built resource names and line-by-line variance in `docs/client-docs/ExportedEstimateV3.xlsx`; V2 deliberately unmodified as the record of what was quoted | PROJECT_CONTEXT.md:150-153 |
| Customer app bundle id `com.gliter.customer`; label `Gliter`; requests only Internet | audit-2026-08-25 §"Platform packaging checks that already pass" (lines 185-188) |
| Worker app bundle id `com.gliter.worker`; label `Gliter Pro`; requests Internet + Camera | audit-2026-08-25 §"Platform packaging checks that already pass" (lines 185-188) |
| Customer app is **not** published in Google Play or Apple App Store today | audit-2026-08-25 §Executive verdict (lines 11-12); §1, §6 |
| Worker app is **not** deployed to production POS hardware today | audit-2026-08-25 §8 (lines 138-148) |
| POS / pump / forecourt / ZATCA / ERP integration is Release C, not Release A | `08_Build_State_Three_Buckets.md:85` |

### 4.3 Hypotheses (code-based risk, not measured)

| Risk | Why it is a hypothesis | Source |
| --- | --- | --- |
| API request / response latency under load | No load test result in source repo; "production is healthy" is a readiness signal, not a throughput number | `PROJECT_CONTEXT.md:60`; no `docs/QA/load-*.md` found |
| Manager dashboard static-export performance at mobile widths | Lighthouse / Core Web Vitals not measured in the 2026-08-16 audit | audit-2026-08-16 §8 (line 184-185) |
| Customer app cold-start performance on low-end Android | No startup-time benchmark found | — |
| Concurrency under repeated scans and double-taps | Tests are unit/widget; no mobile `integration_test/` directory exists; no end-to-end earn→redeem loop coverage | audit-2026-08-25 §"No mobile end-to-end test suite" (lines 156-160); `08_Build_State_Three_Buckets.md:71` Q1 |
| Offline behaviour of the worker app at a real POS device | "Online-first, honest failure" is the principle (Architecture 00:135); offline fallback is not specified | Architecture 00 §5 P6 |

### 4.4 Missing evidence (must be flagged, not fabricated)

- **Manager dashboard and worker app have no on-disk product screenshots.**
  Customer app has archived UI captures whose provenance must be
  reviewed before any publication. Details:
  - **Manager dashboard:** `audit-2026-08-16/shots/` does **not** exist
    on disk (verified by `ls`). The audit REPORT references 36 PNGs
    (`shots/{desktop,mobile}/{en,ar}/*.png`), but the artifacts are
    excluded by the audit's own `.gitignore` and were not committed.
    `audit-2026-08-25-publication-readiness/customer/` is also empty.
  - **Worker app:** no screenshots or design assets exist in
    `apps/worker/design/` or any other repo path (verified by `ls`).
  - **Customer app:** five renderable archived UI captures exist at
    `apps/customer/.run/` (1080 × 2400 PNGs added in commit `aca5460`,
    2026-08-20); one additional file in the same directory
    (`screen-20260820-194126.png`) is corrupt (raw bytes are a UTF-8
    mojibake of the PNG header — the leading byte sequence `c3 ab`
    decodes to U+00AB, not a PNG signature). Visual inspection (§6.3)
    confirms Android status / navigation chrome, Arabic-first RTL strings,
    and image-loading spinners in hero / thumbnail slots; **multiple
    captures expose literal station identifiers and English-language
    station name strings**. Provenance is otherwise unknown. See §6.3.
  - The Stitch mockups in `apps/customer/design/assets/stitch-review/`
    remain useful design-time references for the catalogued screens; the
    design catalog explicitly warns that several screens (My QR, Redeem
    Confirm, Voucher Reveal, My Vouchers, History) were `ComingSoonBody`
    stubs at the time the Stitch mockups were generated — "spec-only,
    not spec-plus-working-reference" (`06-screen-catalog.md:769-780`).
- **No end-to-end coverage** of the earn → redeem loop (Q1).
- **No CI stages** for web or Flutter manager stage (Q2).
- **Open local-testing defects** LMT-001 / LMT-004 / LMT-005 (Q3).
- **No store submission package** (DoD-S1/S2/S3, gated on G3 org accounts, Q4).
- **No account deletion** flow in API, app, or website (P0 blocker 2).
- **No tested backup restore**; no alert rules; no on-call destination
  (`08_Build_State_Three_Buckets.md:54`, B4 partially closed).
- **No production database seed data** (`PROJECT_CONTEXT.md:187`).
- **Web session not persisted across reloads**: in-memory only; deep
  links bounce to `/login?next=…` (audit-2026-08-16 §3 lines 71-94).
  The audit literally had to navigate via SPA `next/link` clicks to
  capture protected pages.
- **i18n: 7 protected dashboard pages have hardcoded English
  headings/text** in AR locale (audit-2026-08-16 §2 lines 39-69):
  `stations`, `workers`, `customers`, `transactions`, `complaints`,
  `audit`, `offers`. Overview and login are properly localized.
- **Both current "release" APKs are signed with the shared Android
  debug key** (audit-2026-08-25 §3 lines 63-87). Customer
  `apps/customer/android/app/build.gradle.kts:37` and worker
  `apps/worker/android/app/build.gradle.kts:37` both map `release` to
  `signingConfigs.getByName("debug")`.
- **Sessions can expire after 15 minutes without refresh**
  (audit-2026-08-25 §5 lines 114-121): 900-second access-token
  lifetime, neither app refreshes.
- **iOS customer release not configured or validated** (audit-2026-08-25
  §6 lines 122-131): no `DEVELOPMENT_TEAM`, still references "iPhone
  Developer", no current-Xcode archive, no `PrivacyInfo.xcprivacy`.
- **No store-review access prepared for OTP authentication**
  (audit-2026-08-25 §7 lines 132-137): reviewers cannot reproduce a
  flow without live OTP.
- **The public legal pages do not exist** (audit-2026-08-25 §1 lines
  35-49): Azure dashboard `/privacy-policy`, `/terms`,
  `/delete-account` all return soft-404; `[public marketing host
  omitted]/privacy`, `/privacy-policy`, `/terms` all serve the homepage
  HTML.
- **No release CI/CD** (manual deploys only); **no custom domain / TLS
  cert**; **Redis uses access-key auth** rather than Entra ID;
  **Postgres is reachable from any Azure IP** because Container Apps
  Consumption has no static outbound IP (`PROJECT_CONTEXT.md:184-187`).
- **Privacy Policy source contains placeholders** for legal entity
  name, commercial registration number, registered address, privacy
  contact, data retention periods, and effective date
  (audit-2026-08-25 §1 lines 22-30, citing
  `privacy_policy_content.dart:27, 595`).
- **In-app Terms link is a dead control** (`profile_page.dart:129`,
  `onTap: () {}`) (audit-2026-08-25 §1 line 33).

### 4.5 Open decisions carried by the architecture (Architecture 00 §8)

OD-1 Azure region (PDPL residency); OD-2 SMS / OTP provider; OD-3
Object storage Azure Blob vs MinIO; OD-4 Point economics (rate,
rounding, caps, expiry); OD-5 Worker app distribution (public vs
managed). OD-7 is the **interim email-port OTP** decision (decided
2026-08-13; not yet implemented). **OD-2 and OD-7 together gate
publication: until resolved, customer login in production is
unverifiable end-to-end.**

---

## 5. Performance evidence

The task instruction is explicit: do not run production load tests,
do not hit private services, do not claim latency / scale / uptime /
conversion / throughput without evidence. Below is everything
**measured** in the source repository, with the scenario and date it
was last verified.

### 5.1 What was actually measured

| Measurement | Scenario | Date | Source |
| --- | --- | --- | --- |
| Health probe `/api/v1/health` returns `{"status":"ok","version":"v14"}` | Live Azure UAE North | 2026-08-25 | audit-2026-08-25 §Executive verdict |
| Readiness `/api/v1/ready` reports postgres / redis / bullmq all `ok` | Live Azure UAE North | 2026-08-12 | PROJECT_CONTEXT.md:60; `08_Build_State_Three_Buckets.md:53` |
| 0 axe-core WCAG 2.1 AA violations across 36 captures (9 pages × 2 locales × 2 viewports) | Playwright headless Chromium, 1440 × 900 + 390 × 844, fresh context per (locale, viewport) | 2026-08-16 | audit-2026-08-16 §4.1 |
| 0 console errors, 0 page errors, 0 failed network requests across 36 captures | Same Playwright run | 2026-08-16 | audit-2026-08-16 §4.4 |
| Customer Flutter: 214 tests pass, 2,780 / 3,519 = **79.0%** line coverage | `flutter test` + line-coverage tooling | 2026-08-25 | audit-2026-08-25 §"Static analysis" |
| Worker Flutter: 67 tests pass, 773 / 994 = **77.8%** line coverage | Same | 2026-08-25 | audit-2026-08-25 §"Static analysis" |
| `flutter analyze` customer: exit 1, 2 warnings + 6 infos (all in tests) | Static analysis run | 2026-08-25 | audit-2026-08-25 §"Static analysis" |
| `flutter analyze` worker: exit 1, 2 warnings (in tests) | Static analysis run | 2026-08-25 | audit-2026-08-25 §"Static analysis" |
| OSV vulnerability check: 0 matches across 123 resolved Dart packages | OSV API at audit time | 2026-08-25 | audit-2026-08-25 §"Supply-chain" |
| Both APKs pass `zipalign -c -P 16 -v 4` | Local verification | 2026-08-25 | audit-2026-08-25 §"Platform packaging" |
| Both APKs target Android API 36, `minSdk 24`, HTTPS for live API | Build inspection | 2026-08-25 | audit-2026-08-25 §"Platform packaging" |
| Build state dates: production deployed 2026-08-12, audit deepening pass 2026-08-16, publication-readiness audit 2026-08-25 | Repository metadata + audit headers | — | PROJECT_CONTEXT.md:4; audit-2026-08-16:213; audit-2026-08-25:3 |

### 5.2 What was **not** measured and must not be claimed

- No Lighthouse run, no Core Web Vitals. The 2026-08-16 audit explicitly
  states "No Lighthouse / performance pass" (audit-2026-08-16 §8 line 185).
- No load test, no sustained-traffic measurement.
- No API latency p50 / p95 / p99 figures.
- No uptime figure (no on-call destination exists; no alert rule).
- No conversion, activation, retention, or engagement metric.
- No end-to-end earn→redeem loop has been executed and recorded.
- No store review status (neither app is in a store review queue).
- No POS hardware qualification result.
- No measured backup-restore duration or success.

### 5.3 Qualitative revenue / retention mechanism (owner-direction scope)

The owner direction explicitly allows a qualitative description of how
the loyalty platform is intended to support a fuel company's repeat
business, and forbids quantitative revenue / retention / uplift
numbers without source-backed, owner-approved evidence. The platform's
design intent — entirely qualitative, traceable to source — is:

- **Repeat visits.** Every fill-up becomes a recognised transaction
  once a customer identifies themselves at the station with a
  phone-displayed QR (Architecture 00:49, J-01). The QR is HMAC-signed
  and single-use (PROJECT_CONTEXT.md:82-83), so a station cannot
  attribute purchases to the wrong person and a customer cannot share
  the same code twice.
- **Purchase frequency.** Points are awarded on the verified purchase
  through a versioned point-rule engine (`sarPerPoint` + rounding
  mode, PROJECT_CONTEXT.md:82), so the reward mechanics are
  consistent across the network and over time. Five screens are
  intentionally public in the customer app before login
  (`apps/customer/design/01-information-architecture.md:6-13`):
  Stations list, Reward Detail (browse-only), and the persistent
  "Sign up / Sign in" CTA. Discovery is not gated.
- **Retention.** Rewards catalogue, voucher reveal and balance are the
  customer-side surfaces (06-screen-catalog.md:506-575, 762-805);
  offers can be scoped per station and per locale (`08_Build_State_…`
  §1:34). The complaint flow with internal notes versus
  customer-facing resolution (`03-critical-workflows.md:193-216`) keeps
  an explicit trail between the customer and the back office.
- **Offers.** Offer content is multilingual, station-scoped, with
  draft / publish / archive lifecycle (`08_Build_State_…` §1:34). Push
  delivery machinery exists (outbox + BullMQ + retry/intents), but the
  sender adapter is not connected (`08_Build_State_…` §3 "Push
  notifications") — anything copy says about a notification arriving is
  aspirational.
- **Audit-by-design.** The ledger is append-only at the database
  level (Architecture 00:121, P2), reversals are new opposite ledger
  entries never edits (`03-critical-workflows.md:144-189`), and
  manual adjustments require a reason (`03-critical-workflows.md:115-143`).
  The audit-event surface captures actor, time, action, object,
  reason, result, reference (`03-critical-workflows.md:225-235`).
- **Privacy posture.** PDPL residency in UAE North
  (PROJECT_CONTEXT.md:23-25), least-data / least-privilege
  (Architecture 00 §5 P4), workers see masked customer identity and
  eligibility only (`apps/worker/design/01-information-architecture.md:9-13`),
  and customer notes never appear in resolution fields
  (`03-critical-workflows.md:193-216`).

No figure on revenue uplift, conversion rate, retention rate,
frequency change, voucher redemption rate, or active-customer count
is asserted. These are the next phase's measurement work, not the
case-study's claim set.

### 5.4 How the case-study page can deliver many screenshots without harming loading

This is the architectural question the task asks explicitly.
Recommendations feed the design spec. They are analysis, not
measurement.

| Concern | Mitigation | Source / rationale |
| --- | --- | --- |
| Image weight on the wire | Re-encode to WebP/AVIF, target **< 80 KB per mobile-portrait screenshot**, **< 250 KB per dashboard capture**, **< 250 KB for the 1672 × 941 station placeholder** (currently ~2 MB each — strong candidate for compression) | `apps/web/public/brand/gliter-hero-v2.png` is 1024 × 1024 JPEG (already in WebP-friendlier range). The existing HS VPN portfolio uses similar JPEG captures without page-speed complaints — but that is not a measured number. |
| Responsive delivery | `next/image` with `sizes` per slot (full-bleed, half-column, mobile-portrait); `<Image fill priority quality=…>` already used on the homepage (`src/app/work/page.tsx:33-41`). Use `priority` only for the **first above-the-fold image**; lazy-load the rest. | Existing portfolio pattern |
| Lazy loading | Native `loading="lazy"` via `next/image`; no JS-driven reveal unless the design demands it | Existing pattern |
| Many screenshots in one page | Group into discrete sections, each with at most one priority image; pair each non-decorative capture with descriptive `<figcaption>` and a one-line visible provenance caption (platform, age, source) | HS VPN design spec §"Visual assets" precedent |
| Accessible alternatives | Every non-decorative capture has descriptive `alt` naming visible elements and a visible caption naming platform and capture age; decorative diagrams use empty `alt` only when equivalent text is adjacent | HS VPN design spec §"Accessibility, responsive behavior" |
| Caption ordering | Each section reads **claim → evidence → screenshot → consequence**, so the screenshot illustrates a sentence already made, not stand-alone proof | Editorial discipline |

---

## 6. Screenshots and visual assets — what is real, what is not

### 6.1 What the audits referenced but is not on disk

- `audit-2026-08-16/shots/desktop/{en,ar}/*.png` (9 desktop + 9 mobile
  + 9 desktop-ar + 9 mobile-ar = **36 PNGs at 1440 × 900 and 390 ×
  844**) — **NOT present on disk** (verified by `ls`). The directory
  is excluded by the audit's own `.gitignore`
  (`audit-2026-08-16/README.md:34`). The audit *did* capture them at
  audit time; they just were not committed. **Without them, there are
  no on-disk screenshots of the manager dashboard.**
- The audit's `findings.json` (8,834 lines, schema inspected at line
  1-40) records per-capture DOM, axe result, console / network log —
  useful machine-readable evidence, **not** images.
- The first audit pass also missed `apps/customer/.run/` and concluded
  that no customer-app screenshots exist on disk. That conclusion was
  wrong: a full source scan including hidden directories found six
  PNGs there, of which five render. They are catalogued in §6.3.

### 6.2 Customer app design assets (Stitch mockups, not device captures)

| File | Dimensions | Provenance | Use on case study |
| --- | --- | --- | --- |
| `apps/customer/design/assets/stitch-review/home.png` | 203 × 512 PNG | Stitch design tool, pre-implementation mockup | Acceptable as illustrative design intent **with caption stating it is a design mockup, not a device capture**. Frame as "designed in Stitch to match the final app's structure". |
| `apps/customer/design/assets/stitch-review/my-vouchers.png` | 226 × 512 PNG | Same | Same |
| `apps/customer/design/assets/stitch-review/profile.png` | 226 × 512 PNG | Same | Same |
| `apps/customer/design/assets/stitch-review/public-stations.png` | 220 × 512 PNG | Same | Same — visual inspection shows one address-line entry that is plausibly real (1247 شارع …); if used in the case study, the row should be cropped or replaced with the address-blurred variant. |
| `apps/customer/design/assets/stitch-review/redeem-confirm.png` | 226 × 512 PNG | Same — note: Arabic copy on the modal reads "هذا الاسترداد لا يمكن التراجع عنه" (this redemption cannot be reversed), which is the customer's confirmation language and does **not** contradict the platform's append-only ledger (reversals are admin-side new opposite entries) | Acceptable as design intent; the wording is a customer-app UI choice, not a backend truth. |
| `apps/customer/design/assets/stitch-review/live-app-1.png` | **corrupt** (no PNG header) | Same | **Exclude** |
| `apps/customer/design/assets/station-placeholders/gliter-station-placeholder-blue-hour.png` | 1672 × 941 PNG (~2 MB) | Design intent | Acceptable as illustrative placeholder after compression |
| `apps/customer/design/assets/station-placeholders/gliter-station-placeholder-golden-hour.png` | 1672 × 941 PNG (~2 MB) | Same | Same |

Per `06-screen-catalog.md:769-780`, the design catalog explicitly warns
that five screens (My QR, Redeem Confirm, Voucher Reveal, My Vouchers,
History) "have zero real Task 1 implementation to visually cross-check
against" — so the Stitch mockups for those screens are **spec-only**.
The catalog's six design-doc-vs-build reconciliation gaps (items
1-6 below) further limit how literally the Stitch art can be quoted as
the real app:

1. OTP code input: wireframe 6-box vs Task 1 single-field.
2. Register Consent name fields: wireframe two-field (firstName +
   displayName) vs Task 1 one-field labelled `displayName` submitted as
   `firstName`.
3. Duplicate-phone explainer text: wireframe specifies a one-line
   explainer not rendered by Task 1.
4. Home screen header icon: wireframe shows profile/settings icon;
   Task 1 shows only wordmark.
5. Public Reward Detail return target: wireframe implies returning to
   *this specific reward* after verify; Task 1 hardcodes the rewards
   list.
6. Consent shape: contract accepts one `ConsentAcceptance` field; both
   checkboxes are rendered but only `terms` is transmitted today.

### 6.3 Customer app archived UI captures (`apps/customer/.run/`)

The first audit pass missed this path. A source scan (including
hidden directories) found six PNGs added in a single commit `aca5460`
on 2026-08-20 ("chore: add UI reference screenshots to customer app
directory", author `mahmouddattiaa`). This is the **only** customer-app
capture set on disk.

| File | Status | Visual content (inspected 2026-10-01) | Provenance caveat |
| --- | --- | --- | --- |
| `screen-20260820-192517.png` | valid, 1080 × 2400, ~207 KB | Station list ("المحطات"), Arabic-first RTL, Android chrome; 5 list rows; one rendered station photo + several still-loading thumbnails; row text contains a literal CRM-seeded station identifier (truncated in row, full identifier visible in `screen-now3.png`) | Unverified device/emulator origin; commit message says "UI reference screenshots"; visible station identifiers and names appear in the list |
| `screen-20260820-194126.png` | **corrupt** | Raw bytes inspected with `hexdump`: leading bytes are `c3 ab 50 4e 47 0d 0a 1a …` — UTF-8 mojibake of the PNG signature (`c3 ab` decodes to U+00AB). Cannot be decoded by any image tool | — |
| `screen-now3.png` | valid, 1080 × 2400, ~71 KB | Station detail page, Arabic-first RTL, Android chrome; hero area shows a partial-arc image-loading spinner; Arabic "مفتوحة" status badge; "الاتجاهات إلى المحطة" CTA. **Header text contains a literal CRM-seeded station identifier.** | Same caveat; station identifier visible in detail header |
| `screen-pulled.png` | valid, 1080 × 2400, ~60 KB | Station list; same layout as `screen-20260820-192517.png`; one thumbnail shows a partial-arc loading spinner | Same caveat |
| `screen-redesign.png` | valid, 1080 × 2400, ~76 KB | Station detail with carousel dots and **raw enum** service-tag chips (raw enum values, not localized labels); hero area shows a partial-arc loading spinner; header reads "محطة جديدة" (New station); Arabic "مفتوحة" status badge | Same caveat; filename suggests an iteration, not a final capture; **raw enum values visible** |
| `screen-v3.png` | valid, 1080 × 2400, ~165 KB | Station list; same layout as the others; row text contains two literal CRM-seeded station identifiers and three English station-name strings; Arabic "مفتوحة" status badges; one (Riyadh North) marked "مغلقة" (closed); one thumbnail shows a partial-arc loading spinner | Same caveat |

**Privacy findings (must redact before any publication):**

- **Literal CRM-seeded station identifiers** are visible in
  `screen-now3.png` and `screen-v3.png` (a fixed `CRM`-prefixed ID
  pattern appears on multiple rows). These look like seeded test-
  data IDs from a CRM import. The literal identifier strings must
  not appear in this document or the case study in any form, even
  partially.
- **Raw enum service-tag chips** are visible in `screen-redesign.png`
  (`convenience_store`, `fuel`, `tire_service`). These are untranslated
  data values, not customer-facing copy; they would confuse readers and
  must be redacted or excluded.
- **Image-loading spinners in the hero / thumbnail slot** appear in
  four of the five renderable captures. This is itself a published
  signal about a feature gap (station image asset not loaded) and must
  either be redacted (pixel-masked) or the capture excluded in favour
  of the Stitch mockup for the same screen.

Per-file provenance is **unknown** beyond the commit message. There is
no README in the directory, no per-file metadata, and no `adb` log
adjacent. Filenames `v3`, `redesign`, `pulled`, `now3` are not what is
conventionally used for staged device captures. **Treat capture origin
as unknown until evidenced; do not call them physical-device captures
based on appearance alone.**

What these captures do prove, regardless of origin:

- The Flutter customer app renders the **public station list** and
  **station detail** flows with Arabic-first RTL chrome.
- The bottom navigation, header "تسجيل / تسجيل الدخول" CTA, and
  station-row layout all match the design intent
  (`06-screen-catalog.md`, `apps/customer/design/`).
- The captures are the **only** on-disk visual proof of the customer
  app rendering at runtime. There is no equivalent set for the worker
  app, and no equivalent set for the manager dashboard.

What these captures do **not** prove:

- They do not prove the customer app is published, store-listed, or
  deployed to a real Android device at a station.
- They do not prove any of the five still-`ComingSoonBody` screens
  (`06-screen-catalog.md:393-421, 578-602`) — every capture is a
  public station list / station detail surface.
- They do not prove performance, network reliability, image-asset
  availability, or token-refresh behaviour; some captures explicitly
  show image-loading spinners in production-looking positions, which
  is itself a published signal about a feature gap.

The literal station IDs, raw enum service tags, and English station
name strings visible in the captures are **not** quoted in this audit
and **must not** be quoted in the case study. The implementation phase
will need to either redact (pixel-mask) the offending text or exclude
them in favour of the Stitch mockups for the same screens. See
§6.6 for the consolidated sensitive-data rules.

### 6.4 Worker app design assets

**None on disk.** `apps/worker/design/` is docs only
(`01-information-architecture.md` through `11-stitch-generation-run.md`).
No PNGs, no JPEGs, no design mockups in any repo path.

### 6.5 Manager dashboard visual assets

`apps/web/public/brand/` and `apps/web/docs/ui-slides/brand-assets/`
hold logos, station photos, and brand-scrape hero images (the latter
documented in `BRAND-SCRAPE.md`). **No on-disk screenshots of the
manager dashboard itself.** The brand-scrape provenance must be
checked before any of those images are used as illustrations (brand
assets are not the same as dashboard product captures).

### 6.6 Sensitive-data review of approved candidates

Visual inspection findings:

- The five renderable customer-app captures at `apps/customer/.run/`
  expose **literal CRM-seeded station identifiers** (a fixed
  `CRM`-prefixed ID pattern on multiple rows), one address-line style
  station name in English (a placeholder string from seed data), **raw
  enum service-tag chips** (raw enum values, not localized labels),
  and image-loading spinners in hero / thumbnail positions. Station
  identifiers, raw enum service tags, English station names, and
  loading states **must be redacted or the captures excluded** before
  publication; literal values must not appear in either spec document.
- The Stitch mockups at `apps/customer/design/assets/stitch-review/`
  are design-time, generated by a tool, with no real customer data —
  safe for design-intent illustration with provenance. One Stitch
  capture (`public-stations.png`) carries a plausibly real address
  string ("1247 شارع"); if used, the row should be cropped or replaced
  with an address-blurred variant.
- Brand-scrape assets should be visually inspected before publication
  for any incidental text / signage that might reveal location,
  customer, or internal-URL information; the existing `BRAND-SCRAPE.md`
  provenance is the disclosure pattern.
- **The manager dashboard must never link to the live Azure URL** — the
  case study shows screenshots only.

### 6.7 Blocker for on-device capture (recorded, not blocking this dispatch)

The dispatch forbids using ADB or capturing from a physical Android
device in this research dispatch. The open capture / redaction work
for a later implementation dispatch is:

- **Customer app:** the five archived `apps/customer/.run/` captures
  need (a) owner confirmation of device-vs-emulator-vs-render origin,
  (b) pixel redaction of the visible station identifiers, raw enum
  service tags, English station names, and partial-arc loading spinners
  if any are reused, and (c) capture or render of the
  **still-`ComingSoonBody`** screens — **My QR** (the most
  behaviorally rigorous screen; `06-screen-catalog.md:418-465` calls
  for **all eight** state variants as mockups), **Redeem Confirm
  interstitial**, **Voucher Reveal Processing → Success**, **My
  Vouchers (Active / Used / Expired)**, **History**.
- **Worker app:** **Customer Scanner**, **Scanned Customer /
  Eligibility**, **Purchase Entry → Review → Success**, **Voucher
  Scanner → Review → Success**, **Recent Activity**, **Access
  Denied**. None have on-disk design mocks, and the worker app is
  built on `mobile_scanner` against a real camera; the device must be
  the same one a station would use.
- **Manager dashboard:** **9 pages × 2 locales × 2 viewports**. The
  2026-08-16 audit already captured 36 PNGs at the live URL; they were
  just not committed. Recapture script lives at
  `audit-2026-08-16/audit.mjs`; parameters in
  `audit-2026-08-16/README.md:6-10`.

This blocker is recorded for the owner to schedule; it does not block
approval of the design spec.

---

## 7. Production vs. planned — the exact language the page must use

The task instruction is explicit: the customer app is not published,
POS integration is planned, the manager dashboard is private. The
following table is the controlled vocabulary the case-study spec
uses.

| Surface | Production status (today) | Planned | Page language |
| --- | --- | --- | --- |
| API / backend | **Live** in Azure UAE North, 2026-08-12 | SMS OTP sender, push sender, monitoring / alerts, tested backup restore, production seed data | "Live in production" (verified); "SMS sender, push sender and a tested backup restore are the next phase" |
| Manager dashboard | **Live**, private (RBAC-aware, screenshot only) | Legal pages, account deletion, B1 i18n fix, session persistence | "Live and used internally; not published to the open web. The page below shows screenshots with names redacted." |
| Customer app | **Code in place across 21 catalogued screens, not in stores.** Five screens remain `ComingSoonBody` stubs; both APKs are debug-signed; iOS is not configured; the mobile end-to-end test suite is not yet in place | Google Play submission, App Store submission, OTP delivery adapter, account deletion, in-app legal docs, token refresh, store-review access, production signing key | "The 21-screen design is catalogued in Arabic-first RTL; the public station flows render in the build. Five screens are still placeholders, and the mobile earn→redeem loop has no automated end-to-end coverage. **The app is being prepared for store release**: store submission, the mobile end-to-end suite, the OTP delivery adapter, account deletion, and a production signing key are the next phase. Below: design mockups from the Stitch generation pass." (Stitch provenance in caption.) |
| Worker app | **Built across 14 catalogued screens, not deployed to production hardware.** No on-device captures exist; both APKs are debug-signed; no mobile end-to-end test suite exists | POS hardware qualification, MDM / kiosk distribution, vendor SDK integration, app-store-style distribution choice (public vs managed, OD-5), mobile end-to-end test suite, production signing key | "Built for an Android station device. 14 screens catalogued with server-authoritative hand-offs; the earn / voucher-consume loop is not covered by an automated mobile end-to-end test suite. **POS hardware integration is planned, not complete**: hardware qualification, MDM distribution, vendor SDK integration, and the choice between public vs managed distribution are the next phase. Below: design specs and screen flow." (No fake "deployed at a station" claims.) |
| POS / forecourt / ZATCA | **Not started** | Release C | "Planned as Release C. The current loop is manual entry by the worker." |
| Push notifications | **Machinery only** — outbox + BullMQ + retry/intents; no sender adapter, no Firebase/APNs SDK in either app | Release B or later | "Outbox and retry queue exist; the sender adapter is not connected." |

---

## 8. Privacy, security, and forbidden-changes boundary

The task lists forbidden changes: `Private dashboard URL, live
customer data, credentials, unverified performance claims, production
deploy`. The case-study spec inherits these and adds:

- **Do not publish the live manager dashboard URL.** The URL exists at
  `[private dashboard host omitted]`
  (`audit-2026-08-16/README.md:43`). The page shows screenshots only.
- **Do not publish the API URL** in copy that implies a public
  endpoint. The embedded `[private API host omitted]` URL is referenced
  inside the APK; not appropriate for a portfolio.
- **Do not show** real customer accounts, real worker accounts, real
  OTP codes, real voucher codes, real complaint text, real ledger
  entries, real audit-event content.
- **Do not show** server IPs, Azure resource IDs, container-app
  hostnames, Key Vault names, ACR names, managed identity client IDs.
- **Do not show** environment-variable names beyond what is necessary
  for the architecture narrative.
- **Do not show** `[public marketing host omitted]` URLs in copy that
  implies a real public surface — the audit confirms those paths serve
  the company homepage HTML with the same SHA-256
  (`audit-2026-08-25 §1` lines 41-45), so the customer expects
  something misleading on a link.
- **Redact** any incidental text / signage in brand-scrape assets
  before use.
- **Redact** literal station identifiers, raw enum service-tag chips,
  English station-name strings, and loading-state spinners visible in
  the archived `apps/customer/.run/` captures before any are reused as
  portfolio images (see §6.3, §6.6).
- **Attribute** every owner-claim (e.g. "31 days from kickoff to
  production", "today", "live in production for N users") explicitly,
  with the source date and a re-check date.

---

## 9. Self-review against the task's "do not" rules

- Did not edit, format, generate inside, commit to, or otherwise write
  to `/home/kepler/Desktop/Kepler/Projects/Glitre`.
- Did not run `curl`, `wget`, `WebFetch`, or any direct web fetch.
- Did not invent metrics, throughput, latency, uptime, conversion,
  retention, or active-user counts.
- Did not read secret files (no `.env`, no credentials, no live
  customer data, no Prisma `seed`).
- Did not connect to the live Azure API or manager dashboard.
- Did not present the unpublished apps as publicly available, or POS
  integration as complete, or the manager dashboard as publicly
  linkable.
- Did not write implementation code or copy screenshots into the
  portfolio during this dispatch.
- Did not quote literal station identifiers, raw enum service tags,
  English station names, or customer-facing identifiers visible in the
  archived `apps/customer/.run/` captures; redaction / exclusion is the
  implementation phase's responsibility.
- Redacted every literal private dashboard / API host value in this
  document with `[private host omitted]` notes; the live URLs still
  exist in the source repo but not here.
- Read the source `AGENTS.md` and respected the routing rules (no
  `curl`, no `wget`, no `WebFetch`); `ls`, `find`, `file`, and
  `hexdump` were used for short, structural output only.
- Uses `Glitre Loyalty Platform` for public-facing framing; cites the
  repository folder `Glitre` and historical `gLiter` identifiers
  verbatim where they appear in source paths and code.

---

## 10. Open questions for the owner (recorded, not blocking this dispatch)

1. **Are the 36 manager dashboard screenshots from the 2026-08-16 audit
   recoverable from the audit operator's local machine?** If yes,
   capture path becomes straightforward; if no, schedule a re-run of
   `audit-2026-08-16/audit.mjs` against the live URL with a controlled
   admin credential.
2. **Are the five archived `apps/customer/.run/` captures from a real
   device, an emulator, or a render? Can the owner confirm origin and
   approve publication (with pixel redaction of station identifiers,
   raw enum service tags, English station names, and loading
   spinners)?** Per §6.3, the commit message says "UI reference
   screenshots" and filenames do not follow a device-capture
   convention; the captures do prove the customer app renders the
   public station flows, but they must not be called physical-device
   captures on appearance alone.
3. **Are any on-device customer / worker captures available from a real
   test build?** Per §6.7, the worker app needs the same hardware a
   station would use; the customer app needs the `My QR` state machine
   wired.
4. **Does the owner want real iOS / Android captures from the current
   TestFlight / debug-signed builds, or only design-time Stitch
   mockups with explicit provenance?**
5. **Is the "31 days from kickoff to production" figure dated
   accurately?** The figure exists in the current portfolio copy but
   the exact span is not in the repo. If unverifiable, rephrase to
   "deployed to production in 2026-08" with an attribution.
6. **Email-OTP interim delivery status — is the email-port implemented
   yet?** PROJECT_CONTEXT says "design spec done, not yet implemented"
   (`PROJECT_CONTEXT.md:168`, `08_Build_State_Three_Buckets.md:53`).
   The existing portfolio copy implies it ships today; that must be
   rephrased unless the owner confirms otherwise.
7. **Display name (resolved by owner correction):** use `Glitre
   Loyalty Platform` on the public case-study surface (card,
   breadcrumb, hero eyebrow, footer line, OG title). Preserve
   historical `gLiter` identifiers only in verbatim source citations.

---

## 11. Artifact locations

- This audit: `docs/superpowers/specs/2026-09-30-glitre-evidence-audit.md` (working portfolio worktree `portfolio-task-gleater-platform`).
- Companion design spec: `docs/superpowers/specs/2026-09-30-fuel-platform-case-study-design.md` (titled **Glitre Loyalty Platform**).
- Source repository (read-only): `/home/kepler/Desktop/Kepler/Projects/Glitre`.
- Customer-app archived UI captures (read-only, provenance unverified, privacy redaction required): `apps/customer/.run/`.
- Earlier (untracked) draft of both files, read-only: `portfolio-task-fuel-platform/docs/superpowers/specs/` — used as input to this revision and not modified.
- Working portfolio worktree: `/home/kepler/Desktop/Kepler/Worktrees/portfolio-task-gleater-platform`.
