# Kepler Dev — Pre-Digested Studio & 13-Project Engineering Context

> **For AI Agents:** Read this digest first instead of scanning raw code. Need deep architectural detail on a single project? Check `assets/KEPLERDEV_PROJECT_PORTFOLIO.md`.

---

## 1. Studio Identity & Commercial Goal
- **Studio Name & Domain:** Kepler Dev (`https://www.keplerdev.uk`, Arabic `/ar`)
- **Voice & Honest Legal Identity (CRITICAL):** Kepler Dev is an independent digital product and operational software engineering studio based in Cairo, Egypt (`Mahmoud Attia, trading as Kepler Dev`), writing in studio plural voice (`"we"`, `"our"`, `"Kepler Dev"`, `"our engineering team"`) across client-facing copy while stating honest legal/trading identity (`Mahmoud Attia, trading as Kepler Dev`, Cairo, Egypt) in legal, privacy, and directory notices. Never fabricate a UK Ltd entity, UK ICO registration, years in business, or unverified metrics.
- **Operating Footprint:** Direct Cairo engineering studio (`Africa/Cairo`) with same-day time-zone overlap across Saudi Arabia and the GCC (`Asia/Riyadh`), Egypt/MENA, the United Kingdom (`Europe/London`), Europe, and international product teams.
- **Languages Supported:** Native Arabic-first RTL (`ar`) and English (`en`), plus French and German communication.
- **Public Contact Email:** `hello@keplerdev.uk` (never publish personal Gmail addresses).
- **Verified External Profiles (`sameAs`):** `https://github.com/mahmouddattiaa` and `https://www.linkedin.com/in/mahmoud-attia-b372b0352` (LinkedIn Company Page, Clutch.co, and GoodFirms are pending creation — do not place uncreated URLs into live JSON-LD `sameAs`).
- **Dual-ICP Commercial Goal:**
  1. **Early-Stage Founders & Idea Pitchers (EN & AR):** Non-technical or product-minded founders with an app or SaaS idea who need a concrete technical architecture Blueprint (`3–5 business days, From $300`, 100% credited toward build) or an affordable, fast v1 MVP (`Launch Sprint, 2–5 weeks, From $1,800`).
  2. **Operations-Driven SMEs & GCC Businesses (EN & AR):** Growing businesses in Saudi Arabia, UAE, Qatar, Kuwait, Egypt, and the UK replacing WhatsApp threads, spreadsheets, and paper logs with connected mobile apps, POS terminals, and head-office dashboards (`Operations Platform, 5–10 weeks phased, From $4,000 (Phase 1)`) plus ongoing `Product Care (Monthly, From $250/mo)`.
- **3-Prong Economic & Speed Mechanism (Competitive Pricing + High Quality + Faster Delivery):**
  1. **Contract-First OpenAPI Architecture:** Locking one shared API schema before coding eliminates mobile/web/backend rework and prevents schema drift.
  2. **AI-Assisted Boilerplate Elimination + Mandatory Independent Verification Gates:** Automated tooling removes repetitive CRUD/scaffolding overhead while senior engineers enforce strict verification gates and automated tests on every release (**CRITICAL: NEVER name `"Kepler Agent OS"` or `"AgentOS"` publicly — market only the engineering discipline**).
  3. **Direct Cairo-to-GCC/UK Studio Economics:** Direct senior engineering execution from Cairo removes traditional agency account-manager overhead, delivering competitive pricing with predictable `2–5 week` sprint cycles.

---

## 2. Kepler Dev's Calibrated Commercial Offer Ladder (Synced with `src/lib/content.ts` & `src/content/home/ar.ts`)

| # | Offer Name | Best Fit / Target Buyer | Typical Duration | Starting Anchor | Promised Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Product Blueprint** | A founder pitching an app idea or an operations lead needing concrete technical scope before writing code. | 3–5 business days | From $300 | A decision-ready technical direction: workflow scope, OpenAPI/system plan, first-release boundaries, milestone schedule, and fixed build estimate you own outright (100% credited toward build). |
| **2** | **Launch Sprint** | A founder or product team with a validated scope ready to ship a production v1 web or mobile release fast. | 2–5 weeks | From $1,800 | A working product in production (web or mobile), core user journey, role permissions, backend API/database, lightweight admin console, and direct cloud deployment. |
| **3** | **Operations Platform** | An operations-driven business replacing fragmented WhatsApp threads, spreadsheets, and paper logs with one connected system. | 5–10 weeks, phased | From $4,000 (Phase 1) | Connected customer app, staff or Sunmi Android POS field surface, and Arabic-first head-office dashboard backed by one OpenAPI contract and ledger. |
| **4** | **Product Care** | Teams with a live product in production that need deliberate monthly engineering increments, fixes, and stability checks. | Monthly | From $250/mo | Agreed monthly engineering capacity against a client-owned backlog (Arabic copy always uses `بدءاً من $250/شهرياً`, never English `/mo`). |

---

## 3. Kepler Dev's 5 Studio Engineering Signatures (Why B2B Clients Choose Us)

1. **Contract-First Multi-Surface Systems:** One OpenAPI/schema contract sits between the backend and every web, mobile, and POS client, with CI drift detection so a change on one side never silently breaks another (`Glitre Loyalty Platform`, `MedConnect Egypt`).
2. **Offline-First & Bad-Network Resilience:** Field staff apps, POS terminals, and consumer mobile apps keep working on unstable connections and reconcile cleanly without duplicate state (`QuickChargingPOS` offline fuel queue, `FitForge` Hive sync, `HS VPN` 3-tier remote config fallback).
3. **Native Platform & Hardware Bridging:** When Flutter or React Native hit OS limits, our engineers write native Kotlin, Java, and Swift bridges (`NEPacketTunnelProvider` on iOS in `HS VPN`, Kotlin `InputMethodService` hosting a cached `FlutterEngine` in `Aksira`, Java `NamiPayModule` HMAC-SHA256 Sunmi POS payment bridge in `QuickChargingPOS`).
4. **Idempotent Financial Ledgers & Webhooks:** Every transaction that moves money, points, or inventory is protected by idempotency keys, append-only database triggers, or atomic locks (`Glitre` append-only PostgreSQL points ledger, `StayEase` Redis webhook deduplication + MongoDB TTL room locks, `Qiraaty` HMAC-SHA256 Daily.co & Moyasar webhooks).
5. **Bounded, Schema-Validated AI Systems:** We integrate LLMs and computer vision inside strict JSON schemas, fallback cascades, and deterministic business logic rather than fragile prompt wrappers (`Classroom Sentinel`, `Aksira`, `Focus Ritual`).

---

## 4. Master Digest of All 13 Kepler Dev Studio Projects

### A. 6 Flagship Studio Case Studies (Dedicated `/work/[slug]` Deep-Dive Pages)

| # | Slug | Project Title | Classification & Status | Tech Stack | Studio Delivery & Verified Proof Points |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | `glitre-loyalty-platform` | **Glitre Loyalty Platform** | Client Work · Production (Backend & 9-Page RTL Manager Dashboard live in Azure UAE North; Customer & Worker apps built) | NestJS, PostgreSQL, Redis, Flutter, Next.js, TypeScript, Azure | GCC fuel-station loyalty ecosystem connecting 4 surfaces under 1 OpenAPI contract (60 operations, 30 data models, 2 languages Arabic-first RTL). Database-enforced append-only points ledger, single-use signed QR codes, idempotency keys on every value-moving write, and 0 axe-core WCAG 2.1 AA violations across 36 audited dashboard captures. |
| **2** | `hs-vpn` | **HS VPN** | Client Work · Production (**Live on Google Play**, `10K+` downloads recorded Sept 2026; iOS on TestFlight) | Flutter, Kotlin, Swift (`NEPacketTunnelProvider`), Python FastAPI, WireGuard / AmneziaWG, Firebase | Anti-DPI consumer VPN engineered for restrictive networks (operated in Iran and Turkmenistan with ~1,500 Turkmenistan users recorded in Firebase). Multi-node Linux server fleet, FastAPI peer registrar, 3-tier catalog fallback, and handshake-verified connection state. |
| **3** | `quickcharging-pos` | **QuickChargingPOS** | Client Work · Production (Deployed on physical Sunmi industrial POS terminals) | React Native, Java (`NamiPayModule`), Sunmi Printer SDK, SkyBand / Mada Payment SDK | Industrial fuel-station POS application running on Sunmi hardware. Custom Java native module bridging Android Intents for SHA-256 HMAC-signed Mada (SkyBand) payment payloads, built-in thermal receipt printing, and offline fuel-delivery transaction caching. |
| **4** | `medconnect-egypt` | **MedConnect Egypt** | Studio Product Build · Full Multi-Surface MVP (`38+` screens across Doctor, Patient & Admin portals) | NestJS, React Native (Expo), React Web, PostgreSQL, Prisma, Redis | Healthcare booking and clinic referral platform uniting a Patient mobile app, Doctor mobile app, and Admin web portal. Features AES-256 encrypted National IDs with searchable SHA-256 blind indexing and GPS geofence-verified clinic check-ins to prevent referral commission fraud. |
| **5** | `stayease` | **StayEase** | Studio Product Build · Full-Stack Web Platform (`40+` screen assets) | React, Redux Toolkit, Node.js/Express, MongoDB, Redis, Stripe | Hospitality and property booking platform engineered with MongoDB transactional TTL room locks (preventing concurrent double-booking of the last room) and idempotent Redis-backed Stripe webhook settlement. |
| **6** | `classroom-sentinel` | **Classroom Sentinel** | Studio Automation System · Running 24/7 in Production | Python `asyncio`, `aiosqlite`, Google Classroom API, Telegram Bot API, Gemini | Autonomous 24/7 academic operations daemon that polls Google Classroom, extracts deadlines from unstructured Arabic and English announcements using schema-constrained Gemini JSON output, and dispatches idempotent 24h and 2h Telegram notifications. |

### B. 7 Studio Showcase & R&D Builds (Filterable on `/work`)

| # | Slug | Project Title | Category & Classification | Tech Stack | Studio Engineering Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **7** | `aksira-ai-keyboard` | **Aksira (Faseeh AI Keyboard)** | Mobile + AI (`Studio R&D Build`) | Flutter, Kotlin (`InputMethodService`), Supabase Edge Functions (Deno), Gemini 2.5 | System-wide Android AI keyboard embedding a pre-warmed `FlutterEngine` inside a native Kotlin `InputMethodService`, cutting keyboard cold start from ~700ms to ~30ms with real-time Arabic/English rewrite, translation, and cascading LLM fallback. |
| **8** | `fitforge` | **FitForge** | Mobile + Backend (`Studio Product Build`) | Flutter, Riverpod, Hive (offline storage), Node.js/Express, MongoDB | Offline-first strength training platform with a deterministic workout volume engine (MEV/MAV/MRV periodization landmarks) and conflict-free local-to-cloud session synchronization (`25+` screens). |
| **9** | `qiraaty` | **Qiraaty** | Web & EdTech (`Client / Regional Platform`) | PHP 8.1, Laravel 10, MySQL 8, Daily.co Webhooks, Moyasar Payments, ZATCA | Saudi live-class education platform featuring HMAC-SHA256 idempotent Daily.co video attendance webhooks, automated session dead-air detection, Moyasar payment processing, and Saudi ZATCA e-invoicing compliance. |
| **10** | `focus-ritual` | **Focus Ritual** | Web + AI (`Studio Product Build`) | React 18, Express 5, MongoDB, Gemini 1.5 Pro, Google Cloud Storage | Deep-work and learning platform combining Pomodoro telemetry, idempotent habit tracking, and AI PDF-to-flashcard generation paired with a deterministic SM-2 spaced-repetition scheduler. |
| **11** | `getlab-system` | **GetLab System** | Desktop & Operations DB (`Studio R&D System`) | C# (.NET WinForms), Microsoft SQL Server, ADO.NET | Desktop laboratory equipment and reservation management system handling inventory lifecycles, role-based access control, reservation conflict checks, and relational SQL reporting. |
| **12** | `collab-platform` | **AI Collab Platform** | Real-Time Web + AI (`Studio R&D Prototype`) | React, Express, Socket.io, Gemini API | Real-time multiplayer team workspace combining low-latency WebSocket room synchronization with shared contextual AI assistance. |
| **13** | `agency-os` | **AgencyOS** | Web Dashboard (`Internal Studio Tool`) | Next.js, TypeScript, Tailwind CSS | Internal studio operations dashboard designed to track multi-surface software delivery milestones, API contract gates, and client review checkpoints. |
