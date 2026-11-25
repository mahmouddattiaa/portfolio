# Product Marketing Context — Kepler Dev

> Single positioning source of truth for Role 1.2 (`seo-and-market-researcher`), Role 1.3 (`conversion-copywriter`), Stage 2 UX/Design, and Stage 3 Engineering.

## 1. Brand Identity, Voice & Attribution Rules

- **Canonical Brand Name:** Kepler Dev
- **Canonical Origin:** `https://www.keplerdev.uk` (Arabic entry route `/ar`)
- **Entity Type:** Organization (`ProfessionalService` / `Organization` in schema; never `Person`)
- **Voice Mode:** `brand_plural`
- **Pronoun Rule:** Always write in studio plural voice (`"we"`, `"our"`, `"Kepler Dev"`, `"our engineering team"`) across all client-facing copy. Never use unquoted first-person singular pronouns (`I`, `my`, `myself`) in prose. In legal, privacy, and directory notices, state honest legal/trading identity: `Mahmoud Attia, trading as Kepler Dev` (Cairo, Egypt).
- **Tone Attributes:** Direct over promotional; specific over abstract; evidence-first over aspirational; bilingual-native (Arabic-first RTL and English) over translated.
- **Attribution Guardrails:** Public contact email is `hello@keplerdev.uk` only. Verified external `sameAs` profiles are strictly `https://github.com/mahmouddattiaa` and `https://www.linkedin.com/in/mahmoud-attia-b372b0352`. Allowed identity exception is `Mahmoud Attia`. Never emit any forbidden token from `.kepler/stage-1-bindings.json` (including internal studio tooling names, fabricated UK corporate or data-regulator registrations, personal Gmail addresses, or superseded offer pricing anchors).

## 2. Positioning & Value Proposition Summary

**Category:** Contract-First Bilingual Digital Product & Operational Software Engineering Studio

**Positioning Statement:**
> For early-stage founders launching a first product and operations-driven SMEs in Saudi Arabia, the GCC, Egypt, and the UK replacing manual workflows, Kepler Dev is a contract-first bilingual (Arabic-first RTL and English) digital product and operational software engineering studio that turns unvalidated ideas into decision-ready blueprints in 3–5 business days and ships multi-surface v1 releases or phased operational platforms in 2–10 weeks under one shared API schema. Unlike slow, high-overhead digital agencies and cheap, unverified freelancers, it pairs direct senior engineering execution from Cairo with contract-first OpenAPI architecture, AI-assisted boilerplate elimination, and mandatory independent verification gates on every release.

**Top 3 Differentiators:**
1. **Contract-First OpenAPI Multi-Surface Architecture:** One shared schema contract aligns backend, web, mobile, and Sunmi POS clients from day one with CI drift checks (`Glitre Loyalty Platform`: 60 operations, 30 data models across 4 surfaces).
2. **Direct Cairo-to-GCC/UK Studio Economics + Fast Sprint Cadence:** Senior engineering execution from Cairo overlaps Riyadh and London hours while removing agency account-manager markup, shipping `Product Blueprint` in 3–5 business days and `Launch Sprint` in 2–5 weeks.
3. **Production Hardware, Offline & Ledger Verification:** Native Kotlin/Java/Swift bridging (`NEPacketTunnelProvider`, Sunmi `NamiPayModule`, pre-warmed `FlutterEngine`), offline queues, idempotent ledgers/webhooks, and mandatory independent verification gates protect live operations.

## 3. Target Audience, Pain Points & Buyer Language

| ICP Segment | Core Pain & Trigger | Primary Objection | Buyer Phrases to Use | Jargon to Avoid |
|---|---|---|---|---|
| **ICP 1 — Unbranded / Idea-Stage Discovery Buyer (Early-Stage Founders & Idea Pitchers)** | Needs to turn an app or SaaS idea into a concrete plan and affordable v1 MVP without technical guesswork | Fear of hidden agency fees, scope blowups, or an unusable prototype | `"I have an app idea, who can build an MVP?"`, `"how much does it cost to build a custom app?"`, `"fixed-price MVP"`, `"عندي فكرة تطبيق مين يبرمجها؟"`, `"كم تكلفة بناء تطبيق MVP؟"` | OpenAPI spec drift, Riverpod state graphs, Hive local adapters, HMAC-SHA256 blind indexing |
| **ICP 2 — Mature Operational / Technical Buyer (GCC/UK SMEs, COOs, CTOs, Ops Leads)** | WhatsApp threads, spreadsheets, and paper logs cause double-booking, inventory gaps, or POS/dashboard sync failures | Migration downtime, weak field internet, hardware integration risk, and post-launch lock-in | `"replace WhatsApp and spreadsheets with one system"`, `"Arabic-first RTL dashboard and mobile app"`, `"Sunmi Android POS Mada integration"`, `"نظام إدارة عمليات ولوحة تحكم عربية"` | Generic agency hype, unverified uptime promises, vague "AI transformation" claims |
| **ICP 3 — Live-Product Teams (Post-Launch Founders & PMs)** | Production app needs monthly feature increments, webhook hardening, and stability checks without full-time hiring overhead | Paying for idle retainer hours or slow support queues | `"monthly engineering capacity"`, `"client-owned backlog"`, `"صيانة وتطوير مستمر للتطبيقات"` | Lock-in retainers, vague SLA tiers |

## 4. Offers, Capabilities & Proof Inventory

### Locked Offers & Tiers
- **`Product Blueprint`:** Best fit for early-stage founders pitching an app idea or operations leads needing concrete scope before writing code. Includes workflow scope, OpenAPI/system plan, first-release boundaries, milestone schedule, and fixed build estimate owned outright by the client. Pricing & timeline: `From $300; 3–5 business days (100% credited toward build)`. Boundary: no production code, visual UI implementation, or cloud deployment included. Next step: book a Blueprint scoping call on `/contact`.
- **`Launch Sprint`:** Best fit for founders or product teams with validated scope ready to ship a production v1 web or mobile release fast. Includes production v1 app, core user journey, role permissions, backend API/database, lightweight admin console, and direct cloud deployment. Pricing & timeline: `From $1,800; 2–5 weeks` (no arbitrary upper ceiling). Boundary: single core product surface and v1 workflow; multi-terminal hardware POS or phased legacy migrations belong in `Operations Platform`. Next step: start with a `Product Blueprint` or book a Launch Sprint scoping call on `/contact`.
- **`Operations Platform`:** Best fit for operations-driven businesses in GCC, Egypt, and UK replacing fragmented WhatsApp threads, spreadsheets, and paper logs with one connected system. Includes connected customer app, staff or Sunmi Android POS field surface, Arabic-first RTL head-office dashboard, shared OpenAPI contract, and idempotent ledger. Pricing & timeline: `From $4,000 (Phase 1); 5–10 weeks, phased` (no artificial upper ceiling). Boundary: delivered in discrete verified phases; physical hardware procurement remains with client. Next step: request an operations scoping review on `/contact`.
- **`Product Care`:** Best fit for teams with a live product in production needing deliberate monthly engineering increments, fixes, and stability checks. Includes agreed monthly engineering capacity against a client-owned backlog. Pricing & timeline: `From $250/mo; Monthly` (Arabic copy must always state `بدءاً من $250 شهرياً`, never English unit suffixes on Arabic lines). Boundary: covers ongoing increments and stability within monthly capacity; ground-up net-new products require `Launch Sprint` or `Operations Platform`. Next step: request a monthly capacity slot on `/contact`.

### Economic & Speed Mechanism
- **Cost & Overhead Advantage:** Direct senior Cairo engineering execution removes agency account-manager markup and middle layers, keeping entry anchors at `From $300` (`Product Blueprint`, 100% credited) and `From $1,800` (`Launch Sprint`).
- **Cycle Speed Mechanism:** Contract-first OpenAPI specs align all surfaces before coding, while internal AI-assisted boilerplate elimination removes repetitive CRUD setup to sustain `2–5 week` sprint delivery.
- **Quality & Verification Gate:** Every release passes mandatory independent verification gates, automated end-to-end and CI drift checks, deterministic ledger/webhook tests, and documented handoff runbooks.

### Verified Proof Ledger
- **Glitre Loyalty Platform:** Client production build — backend & 9-page Arabic-first RTL manager dashboard live in Azure UAE North; 4 connected surfaces under 1 OpenAPI contract (60 operations, 30 data models, 2 languages); append-only PostgreSQL ledger, single-use signed QR codes, idempotency keys, and 0 axe-core WCAG 2.1 AA violations across 36 audited captures.
- **HS VPN:** Client production build — live on Google Play (`10K+` downloads recorded Sept 2026; ~1,500 Turkmenistan users recorded in Firebase; iOS on TestFlight); Flutter, Kotlin, Swift `NEPacketTunnelProvider`, FastAPI, WireGuard/AmneziaWG, 3-tier catalog fallback.
- **QuickChargingPOS:** Client production build — deployed on physical Sunmi industrial POS terminals; React Native + Java `NamiPayModule` for SHA-256 HMAC-signed Mada (SkyBand) payments, thermal receipt printing, and offline fuel-delivery caching.
- **MedConnect Egypt:** Studio product build — `38+` screens across Patient app, Doctor app, and Admin portal (NestJS, React Native Expo, React, PostgreSQL/Prisma, Redis); AES-256 encrypted National IDs with SHA-256 blind indexing and GPS geofence clinic check-ins.
- **StayEase:** Studio product build — `40+` screen assets (React, Redux Toolkit, Node.js/Express, MongoDB, Redis, Stripe); MongoDB transactional TTL room locks and idempotent Redis-backed Stripe webhooks.
- **Classroom Sentinel:** Production automation daemon running 24/7 (`asyncio`, `aiosqlite`, Google Classroom API, Telegram Bot API, Gemini) extracting Arabic/English deadlines via schema-constrained JSON and sending idempotent 24h/2h alerts.
- **Additional Verified Builds (`/work`):** `Aksira (Faseeh AI Keyboard)` (~700ms to ~30ms Android keyboard cold start via pre-warmed `FlutterEngine`), `FitForge` (`25+` screens, offline Hive + MEV/MAV/MRV engine), `Qiraaty` (Laravel 10, HMAC-SHA256 Daily.co webhooks, Moyasar, Saudi ZATCA e-invoicing), `Focus Ritual` (Gemini 1.5 Pro PDF-to-flashcard + SM-2), `GetLab System` (C#/.NET + SQL Server), `AI Collab Platform` (Socket.io + Gemini), `AgencyOS` (internal milestone & contract-gate dashboard).
- **Unverified / Out-of-Bounds Metrics (Do Not Cite):** Never claim years in business, total revenue generated for clients, unverified App Store download totals beyond Google Play `10K+` on `HS VPN`, or unlaunched directory badges (Clutch.co, GoodFirms, LinkedIn Company Page are pending creation).

## 5. Route Funnel & Conversion Goals

| Route | Visitor Intent | Primary Conversion Goal | Primary CTA Direction | Required Proof |
|---|---|---|---|---|
| `/` | First-time EN visitor assessing studio fit, speed, and pricing | Book `Product Blueprint` (`From $300`) or project call on `/contact` | Start a Product Blueprint / Discuss your build | Economic & Speed Mechanism + 4-tier ladder + `Glitre`, `HS VPN`, `QuickChargingPOS` |
| `/ar` | Arabic-first founder or GCC/Egypt SME operator searching in Arabic | Book Arabic scoping / `Product Blueprint` call on `/contact` | ابدأ بمخطط المنتج / احجز مكالمة استكشافية | `Glitre` RTL, `QuickChargingPOS`, `Qiraaty` (ZATCA/Moyasar), Arabic pricing anchors |
| `/work` | Buyer validating shipped engineering depth across platforms | Open a flagship case study or request a similar build on `/contact` | Inspect flagship builds / Scope a similar build | All 6 flagship case studies + 7 R&D/product builds |
| `/services` | High-intent evaluator comparing offer tiers, pricing anchors, and boundaries | Choose an offer tier and initiate scoping on `/contact` | Start with Product Blueprint (`From $300`) | 4-tier offer table + Economic & Speed Mechanism + `MedConnect Egypt` / `StayEase` |
| `/studio` | Risk-averse technical buyer checking process rigor and timezone overlap | Verify engineering gates and move to scoping on `/contact` | Review our engineering gates / Book a call | 5 Engineering Signatures + `Classroom Sentinel` + `AgencyOS` + Cairo/Riyadh/London overlap |
| `/contact` | Ready-to-engage prospect submitting project details | Submit brief or email `hello@keplerdev.uk` | Send project brief / Book 20-minute scoping call | Credited Blueprint policy + `hello@keplerdev.uk` + response window |
| `/privacy` | Legal/compliance reviewer checking entity identity and data practices | Confirm honest trading identity and minimal data handling | Contact `hello@keplerdev.uk` for privacy questions | `Mahmoud Attia, trading as Kepler Dev` (Cairo, Egypt) + zero fabricated UK entity claims |

## 6. Terminology, Guardrails & Banned Claims

- **Canonical Terminology:** `Kepler Dev`, `Product Blueprint`, `Launch Sprint`, `Operations Platform`, `Product Care`, `Contract-First OpenAPI Architecture`, `Cairo, Egypt`, `hello@keplerdev.uk`, `Mahmoud Attia, trading as Kepler Dev`.
- **Banned Claims & Clichés:** Zero unverified superlatives, zero AI buzzwords flagged by `prose_audit.py` (such as `seamless`, `cutting-edge`, `robust`, `holistic`, `world-class`, `craftsmanship`), zero banned Arabic corporate clichés, zero English unit leaks on Arabic lines (`بدءاً من $250 شهرياً` only), and zero structural slogan tells.
- **Out-of-Bounds Claims:** Never mention internal agent orchestration brand names, never claim UK corporate registration or UK data-regulator filings, never publish personal Gmail addresses, never use superseded pricing floors, never use `Person` as the primary schema type, and never claim uncreated directory profiles in `sameAs`.
