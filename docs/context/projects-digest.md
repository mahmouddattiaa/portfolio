# Kepler Dev — Pre-Digested Studio & 13-Project Engineering Context

> **For AI Agents:** Read this digest first instead of scanning raw code. Need deep architectural detail on a single project? Check `assets/KEPLERDEV_PROJECT_PORTFOLIO.md`.

---

## 1. Studio Identity & Commercial Goal
- **Studio Name:** Kepler Dev (`https://www.keplerdev.uk`)
- **Identity Rule (CRITICAL):** Kepler Dev is a **standalone digital product and software engineering studio** (`"we"`, `"our"`, `"Kepler Dev"`, `"our engineering team"`). Never attribute work to a solo individual, never mention `"Mahmoud"`, and never use `"founder-led"` or `"I / my"` framing.
- **Operating Footprint:** United Kingdom governance & engineering direction, serving operations-heavy businesses across the **GCC (Saudi Arabia, UAE, Qatar, Kuwait)**, **Egypt/MENA**, **UK/Europe**, and **international markets**.
- **Languages Supported:** English (`en`) and Arabic-first RTL (`ar`), plus multilingual communication in French and German.
- **Temporary Contact Email:** `mahmouddattiaa7@gmail.com` (used only as the contact fallback address).
- **Primary Commercial Goal:**
  - Convert visiting **GCC business owners / operations leaders** (retail, fuel/energy, loyalty, healthcare, hospitality, education, field services) and **international product founders / CTOs** into qualified **Project Review** enquiries (`/contact`).

---

## 2. Kepler Dev's Commercial Offer Ladder (From `docs/KeplerDev/Kepler-Dev-Offer-Architecture.md`)

| # | Offer Name | Best Fit / Target Buyer | Typical Duration | Working Starting Range | Promised Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Kepler Product Blueprint** | A business owner or founder with an operational bottleneck or product idea that needs a concrete technical scope before quoting a build. | 5–10 business days | \$350–\$1,200 | A decision-ready architecture, OpenAPI/system plan, first-release scope with explicit exclusions, milestone schedule, and build estimate the client owns outright. |
| **2** | **Kepler Launch Sprint** | A founder or product team with a validated problem that needs a focused, production-ready v1 web or mobile release. | 6–10 weeks | \$3,000–\$8,000 | One primary product surface (mobile or web), core user journey, auth, backend API/database, lightweight admin view, and production deployment. |
| **3** | **Kepler Operations Platform** | A growing GCC/MENA or international business replacing fragmented WhatsApp, spreadsheet, and paper workflows with one connected system. | 8–16+ weeks (phased) | \$6,000–\$15,000+ (Phase 1) | Connected customer surface, staff/field Android or web surface, and head-office management dashboard backed by one API contract and ledger. |
| **4** | **Kepler Product Care** | Teams with a live product in production that need deliberate monthly engineering improvements, reliability, and roadmap increments. | Monthly | \$400–\$1,500+/mo | Dedicated monthly engineering capacity against a client-owned backlog, release verification, and dependency/infrastructure upkeep. |

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
