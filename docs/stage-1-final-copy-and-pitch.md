# Stage 1 Final Conversion Copy & Pitch Specification

**Project:** Kepler Dev
**Canonical Origin:** `https://www.keplerdev.uk`
**Voice Mode:** `brand_plural`
**Source Briefs:** `docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`, `.kepler/stage-1-bindings.json`

---

## 1. Global Navigation, Footer & Voice Contract

### Voice & Tone Contract
- **Perspective:** Studio plural voice (`"we"`, `"our"`, `"us"`, `"Kepler Dev"`, `"our engineering team"`) across all English and Arabic client-facing copy. Zero unquoted first-person singular pronouns (`I`, `my`, `myself`) in prose, headings, tables, or blockquotes. In legal, privacy, and directory notices, state honest trading identity: `Mahmoud Attia, trading as Kepler Dev` (Cairo, Egypt).
- **Tone Guardrails:** Direct, consequence-first, mechanism-second, strictly grounded in verified studio facts. Translate early-stage founder goals into plain-language scoping steps while giving technical and operational buyers concrete architecture, hardware, and ledger proof.
- **Arabic Transcreation:** Natural Egyptian-to-GCC founder and business Arabic written natively for RTL rather than translated word-for-word. Every Arabic pricing reference uses native Arabic duration wording (`بدءاً من $300`, `بدءاً من $1,800`, `بدءاً من $4,000`, `بدءاً من $250 شهرياً`) with zero English duration suffixes on Arabic lines, paired with 40–60 word Arabic GEO parity blocks.
- **Attribution & Scope Guardrails:** Public contact email is `hello@keplerdev.uk` only. Verified external `sameAs` profiles are `https://github.com/mahmouddattiaa` and `https://www.linkedin.com/in/mahmoud-attia-b372b0352`. Allowed identity exception is `Mahmoud Attia` (`Mahmoud Attia, trading as Kepler Dev`). Exclude all internal orchestration tooling names, fabricated corporate or data-regulator registrations, personal Gmail addresses, unlaunched directory profiles, and superseded pricing anchors.

### Global Header Navigation
| Slot | English Label | Arabic Label (`/ar`) | Target Route | Intent |
|---|---|---|---|---|
| Brand Mark | Kepler Dev | كيبلر ديف (Kepler Dev) | `/` (EN) / `/ar` (AR) | Home & Primary Positioning |
| Primary 1 | Work | الأعمال | `/work` | Verified Case Studies & R&D Builds |
| Primary 2 | Services | الخدمات والأسعار | `/services` | Offer Tiers, Pricing & Mechanism |
| Primary 3 | Studio | الاستوديو | `/studio` | Engineering Process & Timezone Overlap |
| Locale Switch | العربية | English | `/ar` / `/` | Bilingual Route Switcher |
| Action CTA | Start a Blueprint | ابدأ مخطط المنتج | `/contact` | Primary Scoping Conversion |

### Global Footer Copy
- **English Brand Summary (1 sentence):** Kepler Dev is a Cairo-based contract-first software engineering studio shipping bilingual mobile apps, web platforms, and connected POS systems for founders and SMEs across Saudi Arabia, the GCC, Egypt, and the UK.
- **Arabic Brand Summary (1 sentence):** كيبلر ديف ستوديو هندسي مقره القاهرة يبني تطبيقات الجوال ومنصات العمليات والأنظمة المتصلة بأجهزة نقاط البيع لرواد الأعمال والشركات في السعودية والخليج ومصر وبريطانيا.
- **Footer Links:** Home (`/`) · العربية (`/ar`) · Work (`/work`) · Services (`/services`) · Studio (`/studio`) · Contact (`/contact`) · Privacy (`/privacy`)
- **Legal / Attribution Line (EN):** `Mahmoud Attia, trading as Kepler Dev · Cairo, Egypt · Direct engineering inquiries: hello@keplerdev.uk · Verified profiles: GitHub & LinkedIn.`
- **Legal / Attribution Line (AR):** `محمود عطية، يزاول النشاط تحت اسم Kepler Dev · القاهرة، مصر · البريد الرسمي للتواصل: hello@keplerdev.uk`

---

## 2. Primary Landing Route (/) Copy & GEO Identity Block

### Route Metadata (`/`)
- `<title>`: `Custom App, MVP & Operations Studio | Kepler Dev` (48 chars)
- `<meta description>`: `Cairo software studio shipping fixed-scope MVPs in 2-5 weeks and bilingual operations platforms from $300 blueprints, backed by 10K+ app downloads.` (147 chars)
- **Canonical & hreflang:** `https://www.keplerdev.uk/` · `en`, `ar`, `x-default`

### GEO Identity Block (40–60 Words)

> Kepler Dev is a contract-first bilingual digital product and operational software engineering studio in Cairo serving founders and SMEs across Saudi Arabia, the GCC, Egypt, and the UK. We deliver Product Blueprints from $300 in 3-5 business days and Launch Sprints from $1,800 in 2-5 weeks, backed by 10K+ Google Play installs on HS VPN.

### Arabic GEO Identity Block (40–60 Words — `/ar` Parity)

> كيبلر ديف (Kepler Dev) ستوديو هندسي لتطوير التطبيقات والمنصات التشغيلية من القاهرة يخدم رواد الأعمال والشركات في السعودية والخليج ومصر وبريطانيا. نبدأ بمخطط المنتج بدءاً من $300 خلال 3-5 أيام عمل، ونطلق النسخة الأولى بدءاً من $1,800 خلال 2-5 أسابيع، مع سجل موثق يضم أكثر من 10 آلاف تحميل لتطبيق HS VPN على جوجل بلاي.

### Above-the-Fold Hero
- **Eyebrow:** `Bilingual App & Operations Engineering Studio`
- **H1:** `Build Your App Idea or Replace Manual Operations in 2 to 5 Weeks`
- **Lead:** `Turn an unformed app idea into a shipped v1 release or replace WhatsApp threads and spreadsheets with one connected system. Our Cairo engineering team locks one shared OpenAPI contract before coding and delivers across web, mobile, and Sunmi POS.`
- **Primary CTA:** `Start a $300 Blueprint` -> `/contact`
- **Secondary CTA:** `Inspect 13 Shipped Builds` -> `/work`
- **Risk-Reversal Micro-Copy:** `Blueprint ships in 3–5 business days, costs From $300, and credits 100% toward your build when you proceed.`

### Problem -> Mechanism -> Outcome Section
- **Section H2:** `Why Early-Stage Founders and Operations Teams Stall Between Agencies and Freelancers`
- **Buyer Bottleneck (Dual-ICP Framing):**
  - **For Idea-Stage Founders:** Founders searching `"I have an app idea, who can build an MVP?"` or `"how much does it cost to build a custom app?"` usually hit two dead ends: traditional agencies that lock runway inside multi-month discovery retainers before any code runs, or cheap freelance builds that stall as soon as mobile apps and backends fall out of sync.
  - **For Operations-Driven SMEs:** Growing businesses across Saudi Arabia, the GCC, Egypt, and the UK lose stock accuracy, bookings, and cash accountability when customer orders sit in WhatsApp chats, inventory lives in spreadsheets, and branch POS terminals never reconcile with the head-office dashboard.
- **H3: Agency Discovery Overhead vs. Direct Cairo Engineering Economics**
  - Direct senior engineering execution from Cairo (`Africa/Cairo`) overlaps Riyadh (`Asia/Riyadh`) and London (`Europe/London`) working hours with zero account-manager markup. That structure keeps entry anchors at `From $300` for technical scoping and `From $1,800` for production v1 releases without sacrificing senior ownership.
- **H3: Fragile Freelance Glue Code vs. Contract-First OpenAPI Architecture**
  - Before UI or backend coding begins, we freeze one OpenAPI contract covering every endpoint, data model, and error state across web, mobile, and POS clients. Automated scaffolding clears repetitive CRUD boilerplate while mandatory independent verification gates catch schema drift, ledger bugs, and accessibility defects before launch.
- **How It Works (3 Steps):**
  1. **Scope Without Guesswork (`Product Blueprint`, From $300):** In 3–5 business days, we map user flows, lock the OpenAPI and system plan, define v1 boundaries, and hand you a fixed milestone quote you own outright (100% credited toward the build).
  2. **Build in Parallel Sprints (`Launch Sprint` From $1,800 / `Operations Platform` From $4,000 Phase 1):** Engineers build backend, mobile, POS, and Arabic-first RTL dashboards simultaneously against the locked contract in 2–5 week or 5–10 week phased cycles.
  3. **Verify & Take Full Ownership:** Every release passes automated CI drift checks, deterministic ledger/webhook tests, and runbook handoff so your team owns the repository, cloud accounts, and roadmap (with optional `Product Care` from `$250/mo`).

### Homepage Proof Strip & Offer Bridge
- **Section H2:** `Production Proof Across Mobile, Sunmi POS & Bilingual Web Systems`
- **H3: Glitre Loyalty Platform — 4 Surfaces, 60 OpenAPI Operations & Zero WCAG Violations**
  - Connected four GCC fuel-station surfaces (Arabic-first RTL manager dashboard live in Azure UAE North, backend API, customer app, and worker app) under one OpenAPI contract with an append-only PostgreSQL points ledger and 0 axe-core WCAG 2.1 AA violations across 36 audited captures.
- **H3: HS VPN — 10K+ Google Play Downloads With Native Kotlin and Swift Bridges**
  - Engineered for restrictive networks with Flutter, native Kotlin, Swift `NEPacketTunnelProvider`, FastAPI, and WireGuard/AmneziaWG; live on Google Play with `10K+` downloads recorded in September 2026 and ~1,500 Turkmenistan users recorded in Firebase.
- **H3: QuickChargingPOS — Signed Mada Payments on Physical Sunmi Terminals**
  - Deployed directly onto industrial Sunmi Android POS terminals via a custom Java `NamiPayModule` bridging Android Intents for SHA-256 HMAC-signed SkyBand/Mada payments, thermal receipt printing, and offline fuel-delivery caching.
- **Section CTA:** `Compare Pricing & Tiers` -> `/services` · `Inspect All 13 Builds` -> `/work`

---

## 3. Core Product, Features & Offers Copy

### Offer & Tier Comparison
| Offer / Tier | Best For | Core Deliverables | Pricing & Timeline | Explicit Boundary | Primary CTA |
|---|---|---|---|---|---|
| **Product Blueprint** | Idea-stage founders or ops leads needing concrete technical scope before coding | Workflow scope, OpenAPI and system plan, v1 boundaries, milestone schedule, fixed build estimate owned outright by the client | `From $300` · `3–5 business days` (`100%` credited toward build) | No production code, visual UI build, or cloud deployment | `Book a Blueprint Call` -> `/contact` |
| **Launch Sprint** | Founders or product teams with validated scope ready to ship a production v1 MVP | Production v1 web or mobile app, core user journey, role permissions, backend API/database, lightweight admin console, cloud deploy | `From $1,800` · `2–5 weeks` | Single core product surface and v1 workflow; multi-terminal POS or phased migrations sit in Operations Platform | `Start With a Blueprint` -> `/contact` |
| **Operations Platform** | SMEs replacing WhatsApp threads, spreadsheets, and paper logs with one system | Connected customer app, staff or Sunmi Android POS field surface, Arabic-first RTL dashboard, shared OpenAPI contract, idempotent ledger | `From $4,000` (Phase 1) · `5–10 weeks, phased` | Delivered in verified phases rather than open-ended retainers; physical hardware procurement stays with client | `Request Ops Scoping` -> `/contact` |
| **Product Care** | Live-product teams needing deliberate monthly increments, fixes, and stability checks | Agreed monthly senior engineering capacity against a client-owned backlog (Arabic: `بدءاً من $250 شهرياً`) | `From $250/mo` · `Monthly` | Covers ongoing increments and stability within monthly capacity; ground-up platforms require Launch Sprint or Operations Platform | `Reserve Monthly Capacity` -> `/contact` |

### Detailed Offer & Capability Blocks
- **`Product Blueprint` — Turn an App Idea Into a Fixed Plan Before Spending Build Budget:**
  - **Buyer Trigger:** You have an app or SaaS idea to pitch, or an operational workflow to replace, and need clear answers on cost, architecture, and first-release scope without writing a check for months of guesswork.
  - **Scope & Mechanism:** Within 3–5 business days, our engineers map the exact user journeys, freeze the OpenAPI data structure, separate v1 essentials from phase-two features, and issue a fixed-price milestone schedule. You own every document outright, and the full `$300+` fee is credited 100% if you move into development with Kepler Dev.
  - **Proof Anchor:** Mirrors the contract-first discipline that unified 60 API operations and 30 data models across four surfaces on `Glitre Loyalty Platform`.
  - **Next Step:** `Book a Blueprint Call` -> `/contact`

- **`Launch Sprint` — Ship a Real Production v1 Web or Mobile MVP in 2–5 Weeks:**
  - **Buyer Trigger:** Your scope is validated (via a `Product Blueprint` or existing spec) and you need a live web or mobile release that real customers can use, pay through, and test—not a fragile click-through mockup.
  - **Scope & Mechanism:** Starting at `From $1,800`, we build one core web or mobile surface, its role-based permissions, backend API and database, a lightweight admin console, and direct cloud deployment under one locked OpenAPI contract. Automated scaffolding handles standard CRUD layers while senior engineers own business logic and verification gates.
  - **Proof Anchor:** Backed by production and multi-surface studio builds including `HS VPN` (`10K+` Google Play downloads), `StayEase` (`40+` screen assets with Stripe webhook settlement), and `FitForge` (`25+` offline-first screens).
  - **Next Step:** `Scope Your Launch Sprint` -> `/contact`

- **`Operations Platform` — Replace WhatsApp, Spreadsheets & Paper Logs With Connected Field and Head-Office Systems:**
  - **Buyer Trigger:** Manual WhatsApp orders, spreadsheet reconciliation, or paper receipts are causing commission leakage, double-bookings, or branch blind spots across Saudi Arabia, the GCC, Egypt, or the UK.
  - **Scope & Mechanism:** Starting at `From $4,000 (Phase 1)` across 5–10 week phased deliveries, we connect customer mobile apps, staff or Sunmi Android POS terminals, and Arabic-first RTL manager dashboards behind one OpenAPI schema and an append-only financial ledger.
  - **Proof Anchor:** Proven in production by `Glitre Loyalty Platform` (live in Azure UAE North, 0 WCAG violations across 36 captures), `QuickChargingPOS` (physical Sunmi POS + SkyBand/Mada payments), `Qiraaty` (ZATCA + Moyasar), and `MedConnect Egypt` (`38+` screens with GPS geofence check-ins).
  - **Next Step:** `Request an Operations Scoping Review` -> `/contact`

- **`Product Care` — Predictable Monthly Senior Engineering Without Agency Lock-In:**
  - **Buyer Trigger:** Your product is already live, and you need steady feature increments, payment/webhook hardening, dependency updates, and production stability checks without hiring full-time headcount.
  - **Scope & Mechanism:** Starting at `From $250/mo` (Arabic copy: `بدءاً من $250 شهرياً`), we commit agreed monthly senior engineering hours directly against your prioritized backlog—zero idle retainer padding and zero multi-year lock-in.
  - **Proof Anchor:** Grounded in long-running production stewardship including `HS VPN` multi-node fleet operations and `Classroom Sentinel` running 24/7.
  - **Next Step:** `Request Monthly Capacity` -> `/contact`

### Economic & Speed Mechanism (Why Fast + Verified + Competitive Hold Together)
1. **Direct Cairo Studio Economics:** Senior engineers in Cairo (`Africa/Cairo`) work directly with founders and COOs across Riyadh (`Asia/Riyadh`) and London (`Europe/London`), stripping out agency account managers, sales commissions, and overhead tiers.
2. **Contract-First OpenAPI + Automated Scaffolding:** Locking one OpenAPI schema on day one lets mobile, web, POS, and backend streams run in parallel without mid-sprint rework, while internal boilerplate automation eliminates repetitive CRUD wiring.
3. **Mandatory Independent Verification Gates:** Every build passes CI schema-drift checks, automated type/test suites, idempotent ledger and webhook verification, and documented deployment runbooks before handoff.

### Five Studio Engineering Signatures
1. **Contract-First Multi-Surface Systems:** One OpenAPI/schema contract connects web, mobile, and POS clients with CI drift detection (`Glitre Loyalty Platform`, `MedConnect Egypt`).
2. **Offline-First & Bad-Network Resilience:** Local queues, Hive persistence, and 3-tier remote config fallback preserve data integrity across forecourts and unstable networks (`QuickChargingPOS`, `FitForge`, `HS VPN`).
3. **Native Platform & Hardware Bridging:** Custom Kotlin, Java, and Swift modules bridge OS and hardware capabilities when cross-platform frameworks hit limits (`NEPacketTunnelProvider` in `HS VPN`, pre-warmed `FlutterEngine` in `Aksira`, Java `NamiPayModule` in `QuickChargingPOS`).
4. **Idempotent Financial Ledgers & Webhooks:** Append-only database ledgers, Redis webhook deduplication, MongoDB TTL room locks, and HMAC-SHA256 signature verification block double-spends and double-bookings (`Glitre`, `StayEase`, `Qiraaty`).
5. **Bounded, Schema-Validated AI Systems:** LLMs operate strictly inside JSON schemas, fallback cascades, and deterministic schedulers (`Classroom Sentinel`, `Aksira`, `Focus Ritual`).

---

## 4. Proof, Case Studies & Credibility Copy

### Proof Summary Header
- **Section H2:** `13 Shipped Mobile Apps, Sunmi POS Systems & Bilingual Platforms`
- **Lead:** Inspect 6 flagship production and studio case studies alongside 7 showcase and R&D systems, each documented with its exact stack, operational constraint, and verified engineering outcome.

### Flagship Proof Items & Case Studies (6 Dedicated `/work/[slug]` Deep Dives)
| Item / Case Study | Context & Constraint | Concrete Action | Verified Outcome |
|---|---|---|---|
| **Glitre Loyalty Platform** (`glitre-loyalty-platform`) | GCC fuel-station loyalty ecosystem requiring 4 connected surfaces (Arabic-first RTL manager dashboard, backend, customer app, worker app) without client/API drift or points tampering. | Built NestJS, PostgreSQL, Redis, Flutter, and Next.js/TypeScript surfaces under 1 OpenAPI contract (`60` operations, `30` data models); enforced append-only PostgreSQL points ledger, single-use signed QR codes, and idempotency keys on every value-moving write. | Backend & 9-page Arabic-first RTL manager dashboard live in Azure UAE North; `0` axe-core WCAG 2.1 AA violations across `36` audited captures. |
| **HS VPN** (`hs-vpn`) | Consumer VPN operating in restrictive network environments (Iran and Turkmenistan) where deep packet inspection drops standard configs and breaks client discovery. | Engineered Flutter app backed by native Kotlin, Swift `NEPacketTunnelProvider`, Python FastAPI peer registrar, WireGuard/AmneziaWG multi-node Linux fleet, 3-tier catalog fallback, and handshake-verified connection state. | Live on Google Play with `10K+` downloads recorded Sept 2026, ~1,500 Turkmenistan users recorded in Firebase, and iOS active on TestFlight. |
| **QuickChargingPOS** (`quickcharging-pos`) | Fuel-station cashiers on physical Sunmi industrial Android POS hardware needed reliable Mada card settlements, printed receipts, and resilience during forecourt connectivity drops. | Built React Native POS application with a custom Java `NamiPayModule` bridging Android Intents for SHA-256 HMAC-signed SkyBand/Mada payments, Sunmi Printer SDK thermal receipts, and offline fuel-delivery caching. | Deployed in production on physical Sunmi industrial POS terminals with signed Mada card processing and offline delivery queuing. |
| **MedConnect Egypt** (`medconnect-egypt`) | Multi-surface healthcare referral network needed strict patient National ID privacy and prevention of off-site referral commission fraud across three portals. | Engineered `38+` screens across Patient app, Doctor app (React Native Expo), Admin web portal (React), and NestJS + PostgreSQL/Prisma + Redis backend with AES-256 National ID encryption, SHA-256 blind indexing, and GPS geofence clinic check-ins. | Complete multi-surface MVP uniting patient booking, geofence-verified doctor referrals, and searchable encrypted identity verification. |
| **StayEase** (`stayease`) | Hospitality booking marketplace faced concurrent last-room double-booking races and duplicate payment callback settlement risks. | Built `40+` screen assets on React, Redux Toolkit, Node.js/Express, MongoDB, Redis, and Stripe with MongoDB transactional TTL room locks and idempotent Redis-backed Stripe webhook settlement. | Eliminated concurrent last-room double-booking race conditions and duplicate Stripe settlement charges across checkout flows. |
| **Classroom Sentinel** (`classroom-sentinel`) | Academic operations required 24/7 extraction of structured deadlines from messy Arabic and English classroom posts without missed or duplicate Telegram alerts. | Built autonomous Python `asyncio` + `aiosqlite` daemon integrating Google Classroom API, Telegram Bot API, and schema-constrained Gemini JSON extraction with idempotent 24h and 2h alert tracking. | Runs 24/7 in production parsing bilingual posts into structured deadlines and dispatching duplicate-free 24h and 2h Telegram reminders. |

### Studio Showcase & R&D Engineering Builds (7 Filterable `/work` Entries)
| Build & Slug | Classification | Verified Stack | Consequence & Engineering Proof |
|---|---|---|---|
| **Aksira (Faseeh AI Keyboard)** (`aksira-ai-keyboard`) | Studio R&D Build (Mobile + AI) | Flutter, Kotlin `InputMethodService`, Supabase Edge Functions (Deno), Gemini 2.5 | Embedded a pre-warmed `FlutterEngine` inside a native Kotlin `InputMethodService`, cutting Android keyboard cold start from ~700ms to ~30ms with bilingual Arabic/English rewrite and cascading LLM fallback. |
| **FitForge** (`fitforge`) | Studio Product Build (Mobile + Backend) | Flutter, Riverpod, Hive, Node.js/Express, MongoDB | Built `25+` offline-first workout tracking screens pairing local Hive persistence and conflict-free cloud sync with a deterministic MEV/MAV/MRV training volume engine. |
| **Qiraaty** (`qiraaty`) | Client / Regional Platform (Saudi EdTech) | PHP 8.1, Laravel 10, MySQL 8, Daily.co Webhooks, Moyasar, ZATCA | Delivered Saudi live-class infrastructure with HMAC-SHA256 idempotent Daily.co attendance webhooks, session dead-air detection, Moyasar payments, and Saudi ZATCA e-invoicing compliance. |
| **Focus Ritual** (`focus-ritual`) | Studio Product Build (Web + AI) | React 18, Express 5, MongoDB, Gemini 1.5 Pro, GCS | Combined Pomodoro telemetry and idempotent habit tracking with an AI PDF-to-flashcard pipeline governed by deterministic SM-2 spaced-repetition scheduling. |
| **GetLab System** (`getlab-system`) | Studio R&D System (Desktop & SQL) | C# (.NET WinForms), Microsoft SQL Server, ADO.NET | Implemented desktop laboratory equipment lifecycle tracking, role-based access control, reservation conflict checks, and relational SQL reporting. |
| **AI Collab Platform** (`collab-platform`) | Studio R&D Prototype (Real-Time Web + AI) | React, Express, Socket.io, Gemini API | Engineered low-latency WebSocket multiplayer workspace synchronization paired with shared contextual AI assistance inside active rooms. |
| **AgencyOS** (`agency-os`) | Internal Studio Tool (Delivery Governance) | Next.js, TypeScript, Tailwind CSS | Tracks multi-surface software delivery milestones, API contract gates, and client review checkpoints across active studio sprints. |

---

## 5. Secondary Routes & Conversion Funnel Copy

### Route-by-Route Copy Specifications

- **Route `/ar` (Arabic Primary Entry Route — Native Arabic-First RTL):**
  - `<title>`: `شركة برمجة تطبيقات ولوحات تحكم عربية | Kepler Dev` (49 chars)
  - `<meta description>`: `ستوديو هندسي من القاهرة لبناء تطبيقات الجوال، أنظمة نقاط بيع Sunmi، ولوحات التحكم العربية بأسعار تبدأ من $300 خلال 2-5 أسابيع للسعودية ومصر والخليج.` (148 chars)
  - **Canonical & hreflang:** `https://www.keplerdev.uk/ar` · `ar`, `en`, `x-default`
  - **GEO Identity Block:** Renders the 55-word Arabic GEO Identity Block (Section 2) and Arabic FAQs Q5–Q8 (Section 6).
  - **Eyebrow:** `ستوديو هندسي ثنائي اللغة · القاهرة ← الرياض ودبي ولندن`
  - **H1:** `شركة برمجة تطبيقات ومنصات عمليات ولوحات تحكم عربية خلال 2 إلى 5 أسابيع`
  - **Lead:** `حوّل فكرة التطبيق إلى نسخة أولى جاهزة للإطلاق، أو استبدل رسائل واتساب وجداول الإكسل بمنصة موحدة تربط تطبيق الجوال، جهاز Sunmi POS، ولوحة التحكم العربية تحت عقد OpenAPI واحد وبأسعار تبدأ من $300.`
  - **Primary CTA:** `ابدأ مخطط المنتج ($300)` -> `/contact`
  - **Secondary CTA:** `تصفح 13 مشروعاً منفذاً` -> `/work`
  - **Risk-Reversal Micro-Copy:** `مخطط المنتج يُسلّم خلال 3–5 أيام عمل بدءاً من $300 وتُخصم قيمته 100% من تكلفة التنفيذ عند المتابعة.`
  - **Core Sections (Aligned to SEO Brief H2/H3):**
    - **H2: لماذا تتعثر الأفكار والشركات بين الوكالات المكلفة والمستقلين غير الموثقين؟**
      - *لرواد الأعمال وأصحاب الأفكار ("عندي فكرة تطبيق مين يبرمجها؟" / "كم تكلفة بناء تطبيق MVP؟"):* نبدأ بخطوة واضحة دون تعقيد تقني أو رسوم وسطاء، فتخرج بخطة عمل وتكلفة ثابتة قبل كتابة سطر برمجي واحد.
      - *لشركات العمليات في السعودية والخليج ومصر ("نظام إدارة عمليات ولوحة تحكم عربية" / "نظام نقاط بيع pos"):* نربط تطبيق العملاء والموظفين وأجهزة نقاط البيع ولوحة الإدارة العربية في مسار واحد يمنع تضارب الحجوزات وفقدان الفواتير.
      - **H3: تنفيذ هندسي مباشر من القاهرة بتداخل كامل مع ساعات العمل في السعودية والخليج ولندن** — تواصل مباشر مع المهندسين في توقيت متزامن مع الرياض ودبي ولندن دون طبقات مديري حسابات ترفع التكلفة وتبطئ القرار.
      - **H3: عقد OpenAPI موحد يربط تطبيقات الجوال وأجهزة نقاط البيع ولوحة التحكم العربية** — تثبيت العقد البرمجي من اليوم الأول مع أتمتة الأكواد المتكررة وبوابات تحقق مستقلة لكل إصدار.
    - **H2: باقات التطوير والتسعير الواضحة بدءاً من $300**
      - **H3: مخطط المنتج (Product Blueprint) — نطاق عمل وخطة تقنية خلال 3-5 أيام عمل بدءاً من $300** (تُخصم قيمته كاملة عند التنفيذ).
      - **H3: سباق الإطلاق (Launch Sprint) — إطلاق نسخة MVP إنتاجية خلال 2-5 أسابيع بدءاً من $1,800**.
      - **H3: منصة العمليات (Operations Platform) — تطبيقات ميدانية وأجهزة Sunmi POS بدءاً من $4,000** (للمرحلة الأولى خلال 5–10 أسابيع على مراحل).
      - **H3: رعاية المنتج (Product Care) — تطوير وصيانة شهرية مرنة بدءاً من $250 شهرياً** (سعة هندسية شهرية على قائمة مهام يملكها العميل دون التزام طويل الأجل).
    - **H2: أنظمة إنتاجية منشورة في السعودية والخليج ومصر**
      - **H3: منصة جليتر للولاء — أربع واجهات عربية RTL في Azure UAE North** (60 عملية برمجية، 30 نموذج بيانات، سجل نقاط غير قابل للتعديل، و0 مخالفات WCAG 2.1 AA).
      - **H3: نظام QuickChargingPOS — مدفوعات مدى الموقعة على أجهزة Sunmi POS** (تكامل SkyBand وطباعة حرارية وتخزين مؤقت للعمل دون اتصال).
      - **H3: منصة قراءتي — امتثال الفوترة الإلكترونية ZATCA ومدفوعات ميسر** (مع تحقق HMAC-SHA256 لحضور جلسات Daily.co ورصد الانقطاع الصوتي).
  - **Route CTA:** `احجز مكالمة استكشافية بالعربية` -> `/contact`

- **Route `/work` (Verified Portfolio & Engineering Proof Archive):**
  - `<title>`: `13 Shipped Apps, Sunmi POS & SaaS Builds | Kepler Dev` (53 chars)
  - `<meta description>`: `Inspect 13 production builds by Kepler Dev across Saudi Arabia, Egypt, and the UK, including 10K+ Google Play installs, Sunmi POS, and Azure UAE dashboards.` (156 chars)
  - **Canonical & hreflang:** `https://www.keplerdev.uk/work` · `en`, `x-default`
  - **H1:** `13 Shipped Mobile Apps, Sunmi POS Systems & Bilingual Platforms`
  - **Lead:** `Audit real architectures before committing budget. Filter 6 flagship production and studio case studies alongside 7 R&D systems across mobile, industrial POS, RTL web dashboards, and bounded AI automation.`
  - **Core Sections:**
    - **H2: Flagship Production & Multi-Surface Case Studies** — Dedicated cards and `/work/[slug]` deep-dive links for `Glitre Loyalty Platform`, `HS VPN`, `QuickChargingPOS`, `MedConnect Egypt`, `StayEase`, and `Classroom Sentinel`.
    - **H2: Studio Showcase & R&D Engineering Builds** — Filterable technical summaries for `Aksira (Faseeh AI Keyboard)`, `FitForge`, `Qiraaty`, `Focus Ritual`, `GetLab System`, `AI Collab Platform`, and `AgencyOS`.
  - **CTA:** `Scope a Similar Build With a $300 Blueprint` -> `/contact` (Secondary: `Compare Offer Tiers` -> `/services`)

- **Route `/services` (Pricing, Engagement Boundaries & Economic Mechanism):**
  - `<title>`: `MVP Pricing, Launch Sprints & Platforms | Kepler Dev` (52 chars)
  - `<meta description>`: `Compare Kepler Dev's 4 fixed-scope tiers from $300 Blueprints to $1,800 Launch Sprints and $4,000 Operations Platforms, with direct senior Cairo delivery.` (154 chars)
  - **Canonical & hreflang:** `https://www.keplerdev.uk/services` · `en`, `x-default`
  - **H1:** `Transparent Software Pricing, Fixed-Scope Sprints & Operations Platforms`
  - **Lead:** `Know what ships, what stays out of scope, and what each phase costs upfront—with zero agency markups and a 100% credited Product Blueprint before full build commitment.`
  - **Core Sections:**
    - **H2: Compare Our Four Engagement Tiers & Explicit Scope Boundaries** — Full Section 3 table and detailed scope/boundary cards for `Product Blueprint` (`From $300`), `Launch Sprint` (`From $1,800`), `Operations Platform` (`From $4,000` Phase 1), and `Product Care` (`From $250/mo`).
    - **H2: How Our Economic & Speed Mechanism Protects Budget and Quality** — Direct Cairo senior execution (`Africa/Cairo` overlapping `Asia/Riyadh` & `Europe/London`), contract-first OpenAPI specs + boilerplate elimination, and mandatory independent verification gates.
    - **Competitive Comparison Callout:** Explains side-by-side why Kepler Dev avoids multi-month agency retainers and fragile freelance glue code, anchored by `Glitre`, `MedConnect Egypt` (`38+` screens), and `StayEase` (`40+` screen assets).
  - **CTA:** `Start With a Credited $300 Product Blueprint` -> `/contact`

- **Route `/studio` (Engineering Rigor, Timezone Overlap & Governance):**
  - `<title>`: `Contract-First OpenAPI Engineering Team | Kepler Dev` (52 chars)
  - `<meta description>`: `Meet our Cairo engineering team overlapping Riyadh and London hours. Contract-first OpenAPI specs, native hardware bridges, and strict verification gates.` (154 chars)
  - **Canonical & hreflang:** `https://www.keplerdev.uk/studio` · `en`, `x-default`
  - **H1:** `Contract-First Engineering Studio Built in Cairo for GCC & UK Teams`
  - **Lead:** `Senior engineers working directly with founders and operations leads—pairing one OpenAPI contract, native Kotlin/Java/Swift hardware bridges, and independent verification gates across Cairo, Riyadh, and London hours.`
  - **Core Sections:**
    - **H2: Five Studio Engineering Signatures Behind Every Release** — Contract-first multi-surface systems, offline-first resilience + native bridges + idempotent ledgers, and 24/7 schema-validated AI (`Classroom Sentinel`).
    - **H2: Operating Footprint, Governance & Honest Studio Identity**
      - **H3: Same-Day Timezone Overlap Across Cairo, Riyadh & London** — Real-time collaboration across `Africa/Cairo`, `Asia/Riyadh`, and `Europe/London` in native Arabic (`ar`) and English (`en`), plus French and German communication.
      - **H3: AgencyOS Milestone Checkpoints & Verified Studio Credentials** — Milestone checkpoints tracked transparently alongside verified GitHub (`https://github.com/mahmouddattiaa`) and LinkedIn (`https://www.linkedin.com/in/mahmoud-attia-b372b0352`) profiles and honest trading identity (`Mahmoud Attia, trading as Kepler Dev`, Cairo, Egypt).
  - **CTA:** `Schedule a Technical Scoping Call` -> `/contact` (Secondary: `Review Our 4 Offer Tiers` -> `/services`)

- **Route `/contact` (Blueprint & Project Intake Funnel):**
  - `<title>`: `Start a $300 Product Blueprint Call | Kepler Dev` (48 chars)
  - `<meta description>`: `Send your app idea or operations scope to hello@keplerdev.uk. Book a 20-minute call across Cairo, GCC, and UK hours to start a credited $300 Blueprint.` (151 chars)
  - **Canonical & hreflang:** `https://www.keplerdev.uk/contact` · `en`, `x-default`
  - **H1:** `Start Your Credited $300 Product Blueprint or Project Scoping Call`
  - **Lead:** `Share your goal, target surfaces, and timeline in two minutes. A senior engineer from our Cairo studio replies directly across Cairo, GCC, and UK hours—no sales middlemen.`
  - **Core Sections:**
    - **H2: Share Your Goal, Target Surfaces & Timeline** — Separate guidance tracks for Idea-Stage Founders (`Product Blueprint` -> `Launch Sprint`) and Operations Leads (`Operations Platform` -> `Product Care`).
    - **H2: Direct Studio Contact & Next-Step Expectations** — Direct email `hello@keplerdev.uk`, same-day business-hour response window across `Africa/Cairo`, `Asia/Riyadh`, and `Europe/London`, and what the first 20-minute call produces.
  - **CTA:** `Send Brief for Blueprint Review` (form submit) · Fallback: `Email hello@keplerdev.uk`

- **Route `/privacy` (Honest Legal Trading Identity & Data Minimization):**
  - `<title>`: `Privacy Policy & Trading Identity | Kepler Dev` (46 chars)
  - `<meta description>`: `Read Kepler Dev's plain-language privacy policy and honest trading identity: Mahmoud Attia, trading as Kepler Dev in Cairo, Egypt, with minimal data handling.` (158 chars)
  - **Canonical & hreflang:** `https://www.keplerdev.uk/privacy` · `en`, `x-default`
  - **H1:** `Privacy Policy & Legal Trading Identity for Kepler Dev`
  - **Lead:** `Clear legal disclosure and minimal inquiry data handling with zero fabricated corporate claims.`
  - **Core Sections:**
    - **H2: Honest Legal & Trading Identity** — **H3: Mahmoud Attia, Trading as Kepler Dev (Cairo, Egypt)** — Kepler Dev operates from Cairo, Egypt as an independent software engineering studio (`Mahmoud Attia, trading as Kepler Dev`). We do not claim corporate incorporation or regulatory registrations outside our actual operating jurisdiction.
    - **H2: Project Inquiry Data Minimization & Retention** — **H3: How Briefs Sent to hello@keplerdev.uk Are Handled** — We collect only the contact details and project notes you choose to send via `/contact` or `hello@keplerdev.uk` for scoping and engineering communication. We never sell inquiry data, share briefs with third-party brokers, or retain details longer than needed for active evaluation or delivery; request deletion anytime via `hello@keplerdev.uk`.
  - **CTA:** `Questions About Data Handling? Email hello@keplerdev.uk` -> `/contact`

### Conversion Form / Funnel Copy (`/contact` — EN & AR)
- **Form Heading (EN):** `Tell Us What You Need to Ship`
- **Form Heading (AR):** `شاركنا هدف المشروع والجدول الزمني المطلوب`
- **Expectation Micro-Copy (EN):** `A senior engineer replies the same business day across Cairo, Riyadh, and London hours with either a proposed 20-minute scoping slot or clarifying scope questions.`
- **Expectation Micro-Copy (AR):** `يرد عليك مهندس أول من فريقنا في نفس يوم العمل بتوقيت القاهرة والرياض ولندن لتحديد مكالمة سريعة مدتها 20 دقيقة أو طلب التفاصيل اللازمة للتسعير.`
- **Field Labels & Helper Copy:**
  1. **Your Name / الاسم:** `So we know who to address in our reply.` / `لنتمكن من مخاطبتك بشكل مباشر في الرد.`
  2. **Work Email / البريد الإلكتروني:** `Where we send your Blueprint schedule, questions, and calendar link.` / `لإرسال جدول مخطط المنتج أو رابط المكالمة مباشرة.`
  3. **Starting Track / المسار المناسب:** Options: `Product Blueprint (From $300 · 3–5 days)` | `Launch Sprint (From $1,800 · 2–5 weeks)` | `Operations Platform (From $4,000 Phase 1)` | `Product Care (From $250/mo)` — Arabic options: `مخطط المنتج (بدءاً من $300)` | `سباق الإطلاق (بدءاً من $1,800)` | `منصة العمليات (بدءاً من $4,000)` | `رعاية المنتج (بدءاً من $250 شهرياً)`. *Helper:* `Not sure yet? Pick Product Blueprint—100% credited toward any build.` / `غير متأكد بعد؟ اختر مخطط المنتج وتُخصم قيمته كاملة عند التنفيذ.`
  4. **What Are You Building or Replacing? / ما الذي ترغب في بنائه أو استبداله؟:** `Describe your app idea or current manual workflow (WhatsApp, spreadsheets, POS, web dashboard) in plain language.` / `اشرح فكرة التطبيق أو العمل اليدوي الحالي (واتساب، إكسل، نقاط البيع، لوحة الإدارة) بلغة بسيطة.`
- **Objection Micro-Copy Adjacent to Submit:** `No lock-in retainers. You own your Blueprint, source repositories, and cloud accounts outright.` / `بدون عقود احتكار طويلة الأجل؛ تملك المخطط والشيفرة البرمجية وحسابات السحابة بالكامل.`
- **Submit Button (EN / AR):** `Request Blueprint or Scoping Call` / `أرسل الملخص وحدد موعد المكالمة`
- **Post-Submit Confirmation (EN):** `Brief Received — Next Step Within One Business Day. We have logged your scoping request for review by our Cairo engineering team. If you want to attach diagrams or an existing spec immediately, reply or write directly to hello@keplerdev.uk.`
- **Post-Submit Confirmation (AR):** `تم استلام ملخص مشروعك — نرد عليك خلال يوم عمل واحد. يراجع فريقنا الهندسي في القاهرة تفاصيل طلبك، ويمكنك إرسال أي ملفات أو مخططات إضافية مباشرة إلى hello@keplerdev.uk.`

---

## 6. Frequently Asked Questions (40-60 Word GEO Answers)

### Q1: How can founders turn an app idea into an affordable MVP without agency markup?

> Founders with an app or SaaS idea can start with a Kepler Dev Product Blueprint from $300 in 3-5 business days, 100% credited toward development. The Blueprint delivers workflow scope, an OpenAPI system plan, and a fixed estimate before a Launch Sprint ships a production web or mobile v1 in 2-5 weeks across GCC, Egypt, and UK markets.

### Q2: How much does a custom app or operations platform cost and how fast does Kepler Dev ship?

> Kepler Dev prices fixed-scope builds transparently across four tiers: Product Blueprint from $300 in 3-5 business days, Launch Sprint from $1,800 in 2-5 weeks, phased Operations Platform from $4,000 in 5-10 weeks, and Product Care from $250/mo. Direct senior Cairo engineering removes agency overhead while contract-first OpenAPI specs and automated scaffolding accelerate delivery.

### Q3: How is Kepler Dev different from traditional digital agencies and freelance developers?

> Unlike high-overhead agencies charging account-manager markups or unverified freelancers shipping brittle glue code, Kepler Dev pairs direct senior Cairo engineers with contract-first OpenAPI schemas and mandatory independent verification gates. Across Glitre Loyalty Platform, one OpenAPI contract unified 4 surfaces, 60 operations, 30 data models, and scored zero WCAG 2.1 AA violations across 36 audited captures.

### Q4: What production proof backs Kepler Dev's mobile apps, Sunmi POS terminals, and bilingual platforms?

> Kepler Dev ships production mobile apps, Arabic-first RTL dashboards, and industrial hardware integrations for Saudi, GCC, Egyptian, and UK clients. Verified systems include QuickChargingPOS running signed SkyBand Mada payments on physical Sunmi Android POS terminals, Glitre live in Azure UAE North, MedConnect Egypt across 38+ screens, and Classroom Sentinel operating 24/7.

### Q5 (AR): عندي فكرة تطبيق أو منصة SaaS، كيف أبدأ مع كيبلر ديف بدون مخاطرة؟

> رواد الأعمال الباحثون عن تنفيذ فكرة تطبيق أو منصة SaaS يبدأون مع كيبلر ديف بمخطط المنتج بدءاً من $300 خلال 3-5 أيام عمل، وتُخصم قيمته كاملة عند التنفيذ. يشمل المخطط نطاق العمل، وخطة OpenAPI، وجدول التسليم، وتكلفة ثابتة واضحة قبل إطلاق النسخة الأولى في السعودية ومصر والخليج خلال 2-5 أسابيع.

### Q6 (AR): كم تكلفة تطوير التطبيق أو منصة العمليات وما مدة التسليم الفعلية؟

> تعتمد كيبلر ديف أربع باقات واضحة: مخطط المنتج بدءاً من $300، وسباق الإطلاق بدءاً من $1,800 خلال 2-5 أسابيع، ومنصة العمليات بدءاً من $4,000 للمرحلة الأولى خلال 5-10 أسابيع، ورعاية المنتج بدءاً من $250 شهرياً. التنفيذ المباشر من فريق القاهرة يلغي رسوم الوسطاء، وعقد OpenAPI الموحد يمنع إعادة العمل.

### Q7 (AR): ما الفرق بين كيبلر ديف والوكالات التقليدية والمستقلين؟

> تتفوق كيبلر ديف على الوكالات التقليدية بطيئة التنفيذ والمستقلين غير الموثقين عبر هندسة مباشرة من القاهرة بتداخل ساعات العمل مع الرياض ولندن، وعقود OpenAPI موحدة، وبوابات تحقق مستقلة لكل إصدار. في منصة جليتر للولاء، وحّد عقد واحد أربع واجهات عربية RTL و60 عملية برمجية دون أي مخالفات إتاحة WCAG 2.1 AA.

### Q8 (AR): ما الأنظمة الحقيقية التي تثبت خبرة كيبلر ديف في السعودية والخليج؟

> تثبت كيبلر ديف جاهزيتها الإنتاجية عبر أنظمة فعلية تعمل في الخليج ومصر، منها نظام QuickChargingPOS على أجهزة Sunmi POS لمدفوعات مدى عبر SkyBand، ومنصة جليتر على Azure UAE North بسجل نقاط غير قابل للتعديل، ومنصة قراءتي المتوافقة مع الفوترة الإلكترونية ZATCA ومدفوعات ميسر، إضافة إلى أكثر من 38 شاشة في MedConnect Egypt.

---

## 7. Mandatory Self-Audit Checklist

| # | Audit Gate | Verification Evidence | Status |
|---|---|---|---|
| 1 | All 7 required H2 sections present in exact order with non-empty copy | Sections 1–7 match `stage-1-final-copy-and-pitch.template.md` headings verbatim | PASS |
| 2 | Consequence-first, mechanism-second framing across hero, offers, and secondary routes | Hero, all 4 offer blocks, and all 7 route specs open with buyer outcomes followed by concrete OpenAPI, verification-gate, and Cairo-economics mechanisms | PASS |
| 3 | Seven Sweeps copy-editing rubric applied end to end | Audited sequentially across Clarity, Voice, Specificity, "So What?", Proof Grounding, Objection Removal, and CTA Actionability | PASS |
| 4 | GEO blockquotes (Section 2 identity + Section 6 FAQs) strictly 40–60 words | All 10 blockquotes (2 identity + 8 EN/AR FAQs) preserved verbatim from `docs/seo-and-market-brief.md` (`49–58` words each) | PASS |
| 5 | All configured `required_routes` and `required_offers` plus all 13 portfolio builds covered | Covers `/`, `/ar`, `/work`, `/services`, `/studio`, `/contact`, `/privacy`, `Product Blueprint`, `Launch Sprint`, `Operations Platform`, `Product Care`, and all 13 builds | PASS |
| 6 | Voice mode, Arabic unit hygiene, honest trading identity, and forbidden tokens enforced | Verified `brand_plural`, `Mahmoud Attia, trading as Kepler Dev`, `بدءاً من $250 شهرياً`, zero `/mo` on Arabic lines, and zero forbidden tokens | PASS |
| 7 | Zero banned AI buzzwords, zero structural tells, zero unfilled placeholders | Verified with `copy_audit.py --verify` and `prose_audit.py --config .kepler/stage-1-bindings.json` exiting `0` | PASS |
