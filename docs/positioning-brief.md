# Kepler Dev — Studio Positioning & Offer Architecture Brief (Stage 1)

**Brand:** Kepler Dev (`https://www.keplerdev.uk`)  
**Identity:** Independent UK & GCC Digital Product and Software Engineering Studio (`we` / `our` / `Kepler Dev`)  
**Status:** Locked Stage 1 Strategy Brief

---

## 1. Studio Positioning Statement & Core Value Proposition

- **Category:** Independent Digital Product & Operational Software Studio
- **Flagship Positioning Statement:** Kepler Dev engineers multi-surface digital products, mobile applications, and connected management platforms for operations-driven businesses across the GCC, UK, and international markets. We replace disconnected spreadsheets, manual paper records, and informal messaging channels with unified, contract-first software systems.
- **Why Kepler Dev Exists (The Market Gap):** Most businesses requiring operational software face a damaging tradeoff. Fragmented freelancers write isolated components without unified architecture or long-term accountability, while large agencies charge enterprise overhead, pass projects through multiple account managers, and ship bloated codebases with hidden vendor lock-in. Kepler Dev fills this void by operating as an independent, senior engineering studio. We combine contract-first system design, native hardware and mobile execution, and direct engineering ownership to deliver production-grade software on predictable schedules.

---

## 2. Target Buyer Profiles (ICPs)

### Primary Buyer: GCC & MENA Operations Leaders & Business Owners
- **Industries:** Fuel and energy retail, commercial loyalty programs, healthcare clinics, hospitality and property management, field operations, and regional EdTech.
- **Triggering Pain:** Day-to-day operations rely on fragmented WhatsApp communication, disparate spreadsheets, manual reconciliation, or brittle commercial software that crashes when network connections drop.
- **What Convinces Them:** Native Arabic-first RTL design paired with English bilingual execution, database-enforced append-only financial ledgers, offline-capable field and POS terminals, and United Kingdom commercial and data governance standards.
- **Decision-Makers:** Managing Directors, Chief Operating Officers, Heads of Retail Operations, General Managers.

### Secondary Buyer: International Product Founders & Technical Leads (CTOs)
- **Industries:** Software startups, venture-backed tech companies, mobile utility providers, and domain-specific B2B platforms.
- **Triggering Pain:** The team needs a focused, production-grade initial product release or complex native operating system integration (`Kotlin`, `Swift`, Java POS, WireGuard tunnels, OpenAPI contracts) without managing multiple disparate subcontractors.
- **What Convinces Them:** Verified production track record across Google Play and Microsoft Azure, automated schema drift detection in continuous integration, transparent sprint tracking, and unconditional client ownership of all intellectual property and source code.
- **Decision-Makers:** Technical Co-Founders, Chief Technology Officers, Heads of Product.

---

## 3. Three Core Product Lines (`What We Build`)

| # | Product Line | Core Capabilities & Technical Scope | Proof Projects from Our 13-Project Catalog |
| :--- | :--- | :--- | :--- |
| **1** | **Web Apps & Operational Dashboards** | Role-based management portals, append-only financial and points ledgers, property booking engines, and real-time operational control planes with strict accessibility standards. | `glitre-loyalty-platform`, `stayease`, `medconnect-egypt`, `qiraaty`, `agency-os`, `getlab-system` |
| **2** | **Mobile & Industrial POS Applications** | iOS, Android, and Sunmi POS hardware applications built for field personnel, station operators, and end customers—equipped with offline transaction queues and native Kotlin/Swift/Java platform channels. | `hs-vpn`, `quickcharging-pos`, `glitre-loyalty-platform`, `aksira-ai-keyboard`, `fitforge` |
| **3** | **Integrations, AI & Workflow Automation** | OpenAPI contract management, secure payment and regional e-invoicing webhooks (Mada, Moyasar, ZATCA), background daemons, and schema-constrained AI pipelines. | `classroom-sentinel`, `aksira-ai-keyboard`, `focus-ritual`, `collab-platform`, `qiraaty` |

---

## 4. Four Commercial Engagement Offers (`How We Work`)

| Offer Name | Best Fit | Duration & Starting Range | Concrete Deliverables | Explicit Boundary | Next Step |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Kepler Product Blueprint** | High-stakes operational workflows or product concepts requiring rigorous technical validation and scope definition prior to capital commitment. | 5–10 business days (\$350–\$1,200) | Technical discovery session, end-to-end workflow map, OpenAPI and data architecture specification, defined initial release scope with explicit exclusions, milestone delivery plan, and fixed-scope build estimate. | Specification and architecture only; no production application code is written during a Product Blueprint. | The client owns the Blueprint deliverable outright; option to commission a Launch Sprint or Operations Platform build. |
| **Kepler Launch Sprint** | Validated product concepts or targeted single-workflow software ready for an accelerated, production-grade initial release. | 6–10 weeks (\$3,000–\$8,000) | Single primary product surface (responsive web or native mobile app), core customer journey, authentication and role controls, backend database and API, lightweight management interface, and production cloud deployment. | Agreed initial release scope only; additional user personas or secondary workflows require a separate development phase. | Source code handover and transition into Kepler Product Care. |
| **Kepler Operations Platform** | Growing multi-role operational businesses replacing disconnected manual workflows with a coordinated software ecosystem. | 8–16+ weeks phased (\$6,000–\$15,000+ Phase 1) | Multi-surface system comprising a customer mobile app, staff or POS application, and head-office management dashboard connected to a shared API contract and database ledger. | Phased milestone delivery with strict acceptance gates per phase; out-of-scope integrations handled via formal change requests. | Rollout to live operational locations followed by Phase 2 extensions or Kepler Product Care. |
| **Kepler Product Care** | Operating businesses and launched products requiring structured monthly engineering capacity, uptime reliability, and continuous improvements. | Monthly retainer (\$400–\$1,500+/mo) | Dedicated monthly engineering hours committed to client-prioritized backlog items, dependency updates, security patches, infrastructure monitoring, and release regression checks. | Prioritized engineering sprint capacity, not an unscheduled 24/7 emergency helpdesk. | Ongoing monthly engagement renewed on value delivery. |

---

## 5. Five Studio Engineering Signatures (Competitive Differentiation)

1. **Contract-First Multi-Surface Delivery:**  
   We anchor multi-surface platforms to a single OpenAPI contract schema that governs backends, mobile clients, and web dashboards simultaneously. Automated continuous integration checks flag schema drift before deployment, ensuring that API modifications never silently disrupt client interfaces (`glitre-loyalty-platform`, `medconnect-egypt`).

2. **Offline-First & Unstable-Network Resilience:**  
   Field applications, retail point-of-sale terminals, and consumer utilities are engineered to operate continuously through network disruptions. Local data stores queue transactional operations and reconcile with central servers using conflict-free resolution patterns once connectivity returns (`quickcharging-pos`, `fitforge`, `hs-vpn`).

3. **Native Platform & Hardware Bridging (`Kotlin`, `Swift`, `Java`):**  
   When cross-platform frameworks encounter operating system boundaries, our engineering team implements custom native bridges. We develop native iOS network extensions, Android system-level input method services, and hardware-level serial printer and payment device drivers (`hs-vpn`, `aksira-ai-keyboard`, `quickcharging-pos`).

4. **Idempotent Financial Ledgers & Webhook Locks:**  
   Every transaction that updates financial balances, loyalty points, or room inventory uses strict idempotency keys, append-only database designs, and atomic distributed locks. This eliminates duplicate charges, double-spent loyalty balances, and concurrent reservation collisions (`glitre-loyalty-platform`, `stayease`, `qiraaty`).

5. **Bounded, Schema-Validated AI Systems:**  
   We integrate language models and machine perception inside deterministic business logic and strict JSON schema validators. Rather than open-ended prompt wrappers, our AI pipelines employ fallback cascades and deterministic parsing to ensure predictable, structured output (`classroom-sentinel`, `aksira-ai-keyboard`, `focus-ritual`).

---

## 6. The 13-Project Agency Portfolio Architecture

### A. 6 Flagship Studio Case Studies (Dedicated `/work/[slug]` Deep-Dive Routes)

| # | Slug | Title | Classification & Status | Primary Offer Proved | Why It Is a Flagship |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | `glitre-loyalty-platform` | **Glitre Loyalty Platform** | Client Work · Production | Operations Platform | Multi-surface GCC fuel-retail loyalty ecosystem connecting 4 distinct surfaces (Next.js RTL dashboard, Flutter customer and worker apps, NestJS backend) under 1 OpenAPI contract (60 operations, 30 data models). Features an append-only PostgreSQL points ledger, single-use cryptographic QR validation, and zero axe-core accessibility violations across 36 audited screens. |
| **2** | `hs-vpn` | **HS VPN** | Client Work · Production (`10K+` Google Play downloads) | Launch Sprint | Consumer privacy utility engineered for severe network restrictions. Combines a Flutter interface with native Kotlin and Swift `NEPacketTunnelProvider` implementations, WireGuard / AmneziaWG protocols, a multi-node Linux infrastructure fleet, and a FastAPI catalog fallback. |
| **3** | `quickcharging-pos` | **QuickChargingPOS** | Client Work · Production (Sunmi POS hardware) | Operations Platform | Industrial point-of-sale application deployed on physical Sunmi Android hardware at fuel stations. Implements a custom Java `NamiPayModule` to execute HMAC-SHA256 signed Mada (SkyBand) payment transactions, automated thermal receipt printing, and local offline transaction queuing. |
| **4** | `medconnect-egypt` | **MedConnect Egypt** | Studio Product Build · Multi-Surface MVP | Operations Platform | Healthcare coordination system linking 38+ interfaces across patient mobile, physician mobile, and administrative web portals. Incorporates AES-256 encrypted personal identification with SHA-256 blind indexing for secure queries, alongside geofenced clinic check-in validation. |
| **5** | `stayease` | **StayEase** | Studio Product Build · Web Platform | Launch Sprint | Full-stack hospitality booking platform engineered with MongoDB transactional TTL inventory locks to prevent duplicate room reservations under concurrent traffic, paired with idempotent Redis-backed Stripe payment webhook handling across 40+ user screens. |
| **6** | `classroom-sentinel` | **Classroom Sentinel** | Studio Automation System · 24/7 Production | Launch Sprint | Autonomous background operations service running 24/7 using Python `asyncio` and `aiosqlite`. Ingests unstructured academic announcements in English and Arabic, parses schedules via schema-constrained Gemini JSON extraction, and delivers idempotent Telegram notifications. |

### B. 7 Studio Showcase & R&D Builds (Filterable on `/work`)

| # | Slug | Title | Category Filter | Classification | 1-Sentence Studio Proof Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **7** | `aksira-ai-keyboard` | **Aksira (Faseeh AI Keyboard)** | `Mobile Apps` / `AI & Systems` | Studio R&D Build | System-wide Android keyboard hosting a pre-warmed Flutter engine inside a native Kotlin `InputMethodService` to reduce startup latency from 700ms to 30ms with bilingual writing assistance. |
| **8** | `fitforge` | **FitForge** | `Mobile Apps` | Studio Product Build | Offline-first training application with a deterministic volume calculation engine and Hive local database synchronization across 25+ screens. |
| **9** | `qiraaty` | **Qiraaty** | `Web & Dashboards` | Client / Regional Platform | Regional live education platform with HMAC-SHA256 webhook reconciliation for Daily.co video sessions, Moyasar payment integration, and Saudi ZATCA e-invoicing compliance. |
| **10** | `focus-ritual` | **Focus Ritual** | `Web & Dashboards` / `AI & Systems` | Studio Product Build | Structured productivity application combining Pomodoro session telemetry, habit tracking, and automated flashcard generation via a deterministic SM-2 spaced repetition scheduler. |
| **11** | `getlab-system` | **GetLab System** | `Web & Dashboards` / `Studio R&D` | Studio R&D System | Desktop laboratory inventory management system built in C# .NET with Microsoft SQL Server handling conflict-checked reservations and asset lifecycle tracking. |
| **12** | `collab-platform` | **AI Collab Platform** | `Web & Dashboards` / `AI & Systems` | Studio R&D Prototype | Collaborative workspace platform combining low-latency WebSocket communication with contextual AI facilitation for distributed team sessions. |
| **13** | `agency-os` | **AgencyOS** | `Web & Dashboards` / `Studio R&D` | Internal Studio Tool | Internal operational dashboard created in Next.js and TypeScript to track multi-surface engineering milestones, API schema verification gates, and client sign-offs. |

---

## 7. Multi-Route Conversion Architecture & Hero Direction

- **Route Funnel Map:**
  - `/` (Homepage): Communicates core studio positioning, highlights primary buyer operational challenges, outlines the 3 product lines, features 3 primary case studies (`glitre-loyalty-platform`, `hs-vpn`, `quickcharging-pos`), presents verified production metrics, and directs inquiries to `/contact`.
  - `/work` (13-Project Index): Filterable directory organizing all 13 studio engineering projects by capability (`Web & Dashboards`, `Mobile Apps`, `AI & Systems`) and delivery status, with immediate pathways to dedicated case studies.
  - `/work/[slug]` (6 Flagship Case Studies): In-depth technical retrospectives for `glitre-loyalty-platform`, `hs-vpn`, `quickcharging-pos`, `medconnect-egypt`, `stayease`, and `classroom-sentinel` detailing business context, architecture diagrams, technical hurdles resolved, and verified production metrics.
  - `/services` (What We Build + How We Work): Comprehensive breakdown of the 3 Product Lines and the 4 Commercial Offers (`Product Blueprint`, `Launch Sprint`, `Operations Platform`, `Product Care`), detailing exact deliverables, duration, starting price points, and scope parameters.
  - `/studio` (Studio Accountability, Engineering Standards, UK/GCC Footprint): Documents our studio engineering principles, dual UK legal governance and GCC operational footprint, contract-first development standards, and code delivery guarantees.
  - `/contact` (Project Review Qualification Form + Fallback Email): Multi-step inquiry questionnaire designed to evaluate incoming client requirements (timeline, budget range, existing operational bottlenecks) alongside a direct fallback email (`mahmouddattiaa7@gmail.com`).
  - `/ar` (Arabic RTL Mirror): Complete right-to-left localized experience for GCC and Middle Eastern executives, focusing on regional regulatory compliance (ZATCA, Mada), bilingual system architecture, and local operational requirements.

- **Recommended Homepage Hero Headline & Sub-headline:**
  - **Headline:** We Engineer Multi-Surface Software for Operations That Cannot Fail.
  - **Sub-headline:** Kepler Dev builds connected mobile applications, operational control dashboards, and resilient backend systems for growing businesses across the GCC, UK, and international markets.
  - **Primary CTA:** Book a Project Review (`/contact`)
  - **Secondary CTA:** Explore Studio Case Studies (`/work`)

---

## 8. Mandatory 7-Rule Self-Audit Checklist

| # | Check | Status | Concrete Evidence |
| :--- | :--- | :--- | :--- |
| **1** | **Standalone Studio Voice (`We / Kepler Dev`):** Zero occurrences of personal names, solo ownership titles, or first-person singular pronouns. | `PASS` | Verified compliant with studio voice standards. |
| **2** | **All 13 Projects Mapped:** 6 Flagships + 7 Showcase builds present with accurate facts from `projects-digest.md`. | `PASS` | All 13 project slugs referenced across sections 3, 5, 6, and 7. |
| **3** | **4 Commercial Offers Defined:** Blueprint, Launch Sprint, Operations Platform, and Product Care included with ranges and boundaries. | `PASS` | Defined in Section 4 with durations, starting price ranges, and boundaries. |
| **4** | **3 Product Lines Defined:** Web & Dashboards, Mobile & POS Apps, and Integrations/AI mapped to proof projects. | `PASS` | Detailed in Section 3 with exact technical scope and catalog mappings. |
| **5** | **Multi-Route Funnel Mapped:** `/`, `/work`, `/work/[slug]`, `/services`, `/studio`, `/contact`, and `/ar` covered. | `PASS` | Complete route funnel map articulated in Section 7. |
| **6** | **Shared `.agents/product-marketing.md` Written:** Aligned with this brief for SEO and Copywriter roles. | `PASS` | Documented in companion file `.agents/product-marketing.md`. |
| **7** | **Zero Banned Words & Structural Slogans:** Meets strict copy audit standards without forbidden phrasing. | `PASS` | Zero forbidden terms or artificial slogans used. |
