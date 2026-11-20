# Product Marketing Context

**Document version:** v1  
**Last updated:** 2026-11-07  

## Product Overview

**One-liner:**  
Kepler Dev is an independent digital product and software engineering studio that turns fragmented operational workflows into connected mobile applications, management dashboards, and backend platforms.

**What it does:**  
We design, engineer, and deploy production software across web, mobile, and specialized point-of-sale hardware. Operating under United Kingdom governance with active delivery across the GCC, UK, and international markets, our engineering team replaces manual spreadsheets, disconnected messaging channels, and paper logs with unified, contract-first software systems.

**Product category:**  
Digital Product Studio & Operational Software Engineering

**Product type:**  
Engineering Studio / Productized Technical Services

**Business model:**  
Productized commercial service engagements across four structured offers:
- **Kepler Product Blueprint** (\$350–\$1,200)
- **Kepler Launch Sprint** (\$3,000–\$8,000)
- **Kepler Operations Platform** (\$6,000–\$15,000+ Phase 1)
- **Kepler Product Care** (\$400–\$1,500+/mo)

---

## Target Audience

**Target companies:**  
GCC mid-market and enterprise operations (fuel/energy retail, loyalty ecosystems, healthcare clinics, hospitality and property management, field operations, EdTech) and international tech companies seeking senior engineering execution.

**Decision-makers:**  
Managing Directors, Chief Operating Officers, Heads of Retail Operations, General Managers, Chief Technology Officers, Technical Co-Founders, and Heads of Product.

**Primary use case:**  
Replacing disconnected, high-friction operational workflows (spreadsheets, WhatsApp, physical paperwork) with synchronized multi-surface software that remains reliable under poor network conditions.

**Jobs to be done:**  
- Unify field staff, customer interactions, and executive oversight under a single verifiable source of truth.
- Build and deploy an initial production release with clear milestone boundaries and zero scope creep.
- Integrate native hardware (Sunmi POS, payment terminals, mobile OS peripherals) without fragile multi-contractor handoffs.

**Use cases:**  
- Multi-surface retail loyalty ecosystems connecting mobile apps, POS terminals, and real-time manager dashboards (`glitre-loyalty-platform`, `quickcharging-pos`).
- Mobile platforms operating reliably over restricted or unstable networks (`hs-vpn`, `fitforge`).
- Multi-portal healthcare and clinic management with cryptographic data privacy (`medconnect-egypt`).
- High-concurrency booking engines with transactional inventory protection (`stayease`).
- Autonomous background operations daemons extracting structured data from unstructured text (`classroom-sentinel`).
- Native keyboard extensions embedding pre-warmed engines for real-time bilingual writing assistance (`aksira-ai-keyboard`).
- Regional EdTech with automated session verification and e-invoicing compliance (`qiraaty`).
- Telemetry-driven habit and learning platforms with spaced repetition schedulers (`focus-ritual`).
- Desktop laboratory equipment lifecycle and reservation systems (`getlab-system`).
- Real-time multiplayer collaborative workspaces (`collab-platform`).
- Studio operational dashboards tracking contract gates and milestones (`agency-os`).

---

## Personas

| Persona | Cares about | Challenge | Value we promise |
| :--- | :--- | :--- | :--- |
| **GCC Operations Director** | Operational uptime, elimination of manual reconciliation, field staff compliance, bilingual RTL adoption. | Field staff bypass slow systems and resort to WhatsApp; paper logs cause inventory loss and billing discrepancies. | Unified multi-surface platforms connecting field apps, POS terminals, and management dashboards under one ledger. |
| **International Technical Co-Founder / CTO** | Architectural integrity, schema enforcement, clean code delivery, adherence to production deadlines. | Managing multiple inconsistent freelance developers leads to schema drift, missed deadlines, and unmaintainable code. | Senior engineering partner delivering contract-first systems with CI drift testing and complete source code ownership. |
| **Station / Retail General Manager** | Fast transaction processing, reliable hardware, immediate receipt printing, zero duplicate charges. | Spotty internet at remote locations halts payment processing; staff struggle with complex multi-step interfaces. | Offline-capable applications with local transaction queues and custom native hardware bridges for instant processing. |

---

## Problems & Pain Points

**Core problem:**  
Critical business processes rely on fragmented consumer communication tools, unversioned spreadsheets, and manual data re-entry, leading to operational blind spots, inventory discrepancies, and revenue leaks.

**Why alternatives fall short:**  
- Generic freelancers write isolated frontend code without understanding system architecture, concurrency locks, or data consistency.
- Traditional agencies charge excessive management fees, cycle through junior developers, and impose proprietary vendor lock-in.
- Off-the-shelf software packages enforce rigid workflows that do not accommodate regional requirements such as Arabic-first RTL interfaces, local payment gateways (Mada, Moyasar), or ZATCA electronic invoicing.

**What it costs them:**  
Reconciling data errors consumes 15–30 staff hours per week, inventory miscounts cause customer disputes, and downtime on field devices stops revenue generation.

**Emotional tension:**  
Anxiety over operational lack of control, mistrust of distant agencies that over-promise and under-deliver, and frustration with software that breaks in the field.

---

## Competitive Landscape

**Direct Competitors:** Regional IT consulting firms and software development agencies — fall short because they use inflated headcounts, mark up subcontracted work, and lack deep native systems engineering capabilities.

**Secondary Competitors:** Off-the-shelf vertical packages (e.g., standard retail POS or clinic software) — fall short because they lack flexibility for custom loyalty structures, impose recurring per-terminal licensing penalties, and often provide inadequate Arabic RTL localization.

**Indirect Competitors:** Internal spreadsheets, paper logs, and informal WhatsApp communication — fall short because they create single points of failure, lack audit trails, and cannot scale beyond a single facility.

---

## Differentiation

**Key differentiators:**  
- **Contract-First Multi-Surface Delivery:** A single OpenAPI schema anchors backend, mobile, and web surfaces, with automated CI drift detection.
- **Offline-First Architecture:** Local transactional queues ensure operations continue during connectivity blackouts.
- **Native Hardware & Platform Bridging:** In-house Kotlin, Swift, and Java engineering for specialized hardware and operating system capabilities.
- **Idempotent Financial Ledgers:** Mathematical safety against duplicate charges and double-counting across point systems and payment webhooks.
- **Bounded Schema-Validated AI:** Deterministic, structured JSON extraction instead of brittle chat wrappers.

**How we do it differently:**  
We work as an engineering-led studio. Clients communicate directly with engineers who architect the system, review every pull request, and verify production deployment.

**Why that's better:**  
Decisions happen quickly, architecture is unified from day one, and clients receive production-ready code with complete documentation and intellectual property transfer.

**Why customers choose us:**  
Proven production delivery across Google Play, Microsoft Azure, and physical POS hardware, bilingual Arabic/English execution, and UK governance standards.

---

## Objections

| Objection | Response |
| :--- | :--- |
| **"How do we know the scope will stay within budget?"** | We define explicit boundaries and exclusions through the Kepler Product Blueprint before writing production code. |
| **"Can you handle our specific hardware and local payment methods?"** | We have verified deployments integrating Sunmi POS devices, Mada (SkyBand) payment bridges, Moyasar processing, and ZATCA compliance. |
| **"What happens after the product launches?"** | We offer Kepler Product Care to provide scheduled monthly engineering capacity, updates, and maintenance. |

**Anti-persona:**  
Companies looking for the lowest-cost bid without regard for code quality, teams wanting an unvalidated 100-feature product built simultaneously, or clients unwilling to participate in technical scope discovery.

---

## Switching Dynamics

**Push:** Ongoing frustration with manual reconciliation, lost data, and crashed applications during peak hours.  
**Pull:** The clarity of a unified multi-surface system with real-time management dashboards and reliable offline operation.  
**Habit:** Familiarity with existing manual spreadsheets and WhatsApp routines among field personnel.  
**Anxiety:** Concern that adopting new software will disrupt daily operations or require extensive employee retraining.

---

## Customer Language

**How they describe the problem:**  
- "Our field staff cannot record sales when the internet drops."
- "We are manually entering the same numbers into three spreadsheets every evening."
- "Our last agency built a web app that does not sync with our mobile users."

**How they describe us:**  
- "An engineering studio that understands our operational workflow."
- "Technical partners who ship working code without unnecessary meetings."

**Words to use:** Contract-first, multi-surface, offline-first, append-only ledger, idempotency, verifiable milestones, direct engineering accountability.  
**Words to avoid:** Banned marketing buzzwords (such as passionate, seamless, cutting-edge, next-generation, revolutionize, robust, and scalable solutions).  

**Glossary:**

| Term | Meaning |
| :--- | :--- |
| **OpenAPI Schema** | The machine-readable contract defining all endpoints and data models shared between backend and client applications. |
| **Idempotency Key** | A unique identifier attached to an API request ensuring that duplicate submissions do not execute multiple transactions. |
| **Append-Only Ledger** | A database architectural pattern where existing records cannot be edited or deleted, ensuring immutable financial and audit integrity. |
| **Sunmi POS** | Android-based industrial hardware terminal used in retail and fueling environments. |
| **Mada** | The domestic payment scheme and debit card network of the Kingdom of Saudi Arabia. |
| **ZATCA** | Zakat, Tax and Customs Authority of Saudi Arabia, governing electronic invoicing mandates. |

---

## Brand Voice

| Attribute | Means | Doesn't mean | Example line |
| :--- | :--- | :--- | :--- |
| **Precise & Engineering-Led** | Using technical terminology accurately and providing concrete proof metrics. | Creating academic jargon for its own sake. | "One OpenAPI contract governs 60 operations and 30 data models across web and mobile surfaces." |
| **Pragmatic & Commercially Grounded** | Focusing on business uptime, operational efficiency, and milestone discipline. | Neglecting clean code or architectural principles. | "Offline transaction queues ensure station sales continue without interruption during connectivity loss." |
| **Direct & Transparent** | Clearly stating what is in scope and what is excluded. | Being dismissive of client aspirations. | "A Product Blueprint delivers decision-ready architecture and scope boundaries before build commitment." |

**Tone by context:**  
- **Support:** Concise, diagnostic, and reassuring.
- **Launch:** Confident, factual, and focused on production verification.
- **Errors:** Clear, transparent, and accompanied by corrective actions.
- **Sales:** Consultative, inquisitive, and rooted in operational reality.
- **Social:** Informative, highlighting architectural patterns and lessons learned from production deployments.

**Terms we own:** Contract-first multi-surface engineering, bounded AI pipelines, idempotent operational ledgers.  
**Never use (and why):** Generic marketing superlatives and dramatic contrast slogans, because they undermine technical credibility with operational decision-makers.

---

## Proof Points

**Metrics:**  
- `10,000+` downloads recorded on Google Play for `hs-vpn`.
- 60 API operations and 30 data models unified under 1 contract in `glitre-loyalty-platform`.
- 0 accessibility violations across 36 audited screens in `glitre-loyalty-platform`.
- 38+ connected healthcare screens across mobile and web in `medconnect-egypt`.
- 40+ hospitality booking screens with atomic inventory locks in `stayease`.
- 30ms cold-start latency achieved via native Kotlin Flutter engine pre-warming in `aksira-ai-keyboard`.
- 24/7 autonomous production uptime achieved by `classroom-sentinel`.

**Catalog of 13 Studio Projects:**  
- **Flagship Case Studies:** `glitre-loyalty-platform`, `hs-vpn`, `quickcharging-pos`, `medconnect-egypt`, `stayease`, `classroom-sentinel`.
- **Showcase & R&D Builds:** `aksira-ai-keyboard`, `fitforge`, `qiraaty`, `focus-ritual`, `getlab-system`, `collab-platform`, `agency-os`.

**Four Commercial Offers:**  
- `Product Blueprint`: 5–10 business days technical definition.
- `Launch Sprint`: 6–10 weeks initial production release.
- `Operations Platform`: 8–16+ weeks multi-surface operational platform.
- `Product Care`: Ongoing monthly engineering capacity and maintenance.

**Value themes:**

| Theme | Proof |
| :--- | :--- |
| **Multi-Surface Coordination** | Verified in `glitre-loyalty-platform` (4 surfaces, 1 contract) and `medconnect-egypt` (3 portals). |
| **Field Resilience** | Verified in `quickcharging-pos` (offline payment queue), `fitforge` (local sync), and `hs-vpn` (catalog fallback). |
| **Native Engineering Depth** | Verified in `hs-vpn` (iOS packet tunnel), `aksira-ai-keyboard` (Kotlin InputMethodService), and `quickcharging-pos` (Sunmi Java bridge). |

---

## Goals

**Business goal:** Establish Kepler Dev as the preferred digital engineering studio for operations-driven businesses in the GCC and international technical teams.  
**Conversion action:** Qualified project inquiry via the `/contact` Project Review funnel or direct fallback contact (`mahmouddattiaa7@gmail.com`).  
**Current metrics:** Active client deployments in Azure UAE North and Google Play; commercial model calibrated for rapid execution.

---

## Learnings

| Date | Learning | Evidence | Applies to | Status |
| :--- | :--- | :--- | :--- | :--- |
| 2026-11-07 | B2B operations buyers prioritize offline uptime and bilingual RTL support over decorative interface animations. | Client requirements on Glitre and QuickChargingPOS. | Services, Case Studies | active |
| 2026-11-07 | Fixed-price quotes without a technical discovery phase lead to scope disputes; requiring a Product Blueprint resolves alignment. | Studio delivery history across multi-surface systems. | Sales, Services | active |

---

## Changelog

- v1 (2026-11-07) — Initial studio product marketing context.
