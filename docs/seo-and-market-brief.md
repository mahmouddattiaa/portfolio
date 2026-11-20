# Kepler Dev — B2B SEO, GEO & Multi-Route Metadata Specification (Stage 1)

**Brand:** Kepler Dev (`https://www.keplerdev.uk`)  
**Identity:** Standalone UK & GCC Digital Product and Software Engineering Studio  
**Status:** Locked Stage 1 SEO & Structured Data Brief

---

## 1. B2B Search Intent & Keyword Clusters

| Cluster | Target Route | Primary Commercial Keyword | Secondary / Long-Tail Keywords | Buyer Intent |
| :--- | :--- | :--- | :--- | :--- |
| **1. Studio & Operational Software** | `/` & `/studio` | digital product studio uk | operational software engineering studio, multi-surface software development studio, contract-first engineering studio, b2b software engineering firm london | Commercial investigation and agency replacement evaluation by managing directors, COOs, and technical leaders seeking direct senior engineering accountability. |
| **2. Engagements & Product Lines** | `/services` | custom software development gcc | product blueprint discovery sprint, custom operational platform build, sunmi pos software development, mobile app development studio, monthly engineering retainer | Transactional evaluation of engineering delivery models, milestone structures, initial release timelines, and fixed architecture discovery pricing. |
| **3. Case Studies & Proof** | `/work` & `/work/[slug]` | loyalty platform development | fuel retail pos application development, offline-first mobile app development, wireguard vpn client development, clinical healthcare booking platform architecture | Evaluative technical due diligence by CTOs and operations directors verifying live production deployments, architectural patterns, and verified engineering metrics. |
| **4. GCC Arabic RTL Market** | `/ar` | شركة تطوير برمجيات الرياض | تطوير تطبيقات الجوال والأنظمة التشغيلية, نظام نقاط بيع محطات الوقود, تكامل مدى وهيئة الزكاة والضريبة والجمارك, منصة ولاء العملاء المجمعة | High commercial intent by GCC business owners and retail operators requiring Arabic-first RTL operational platforms compliant with Mada and ZATCA regulations. |

---

## 2. Multi-Route Metadata Table (`<title>`, `<meta description>`, Canonical & `hreflang`)

*Rule: Every `<title>` must be `45–60 characters` and every `<meta description>` must be `135–160 characters`.*

| Route | Exact `<title>` (`45–60 chars`) | Char Count | Exact `<meta name="description">` (`135–160 chars`) | Char Count | Canonical URL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Kepler Dev — Operational Software & Product Studio | 50 | Kepler Dev engineers connected mobile applications, operational dashboards, and backend platforms for operations-driven businesses across the UK and GCC. | 153 | `https://www.keplerdev.uk/` |
| `/work` | Selected Work & Engineering Case Studies — Kepler Dev | 53 | Explore production systems built by Kepler Dev: retail loyalty platforms, offline POS terminals, consumer utilities, and clinical workflows across 13 builds. | 157 | `https://www.keplerdev.uk/work` |
| `/services` | Engineering Services & Productized Offers — Kepler Dev | 54 | Review our four commercial engineering models: Product Blueprint, Launch Sprint, Operations Platform, and Product Care with transparent scopes and fixed gates. | 159 | `https://www.keplerdev.uk/services` |
| `/studio` | Our Studio Engineering Standards & Footprint — Kepler Dev | 57 | Learn about Kepler Dev's contract-first engineering discipline, dual UK and GCC governance, production safety guarantees, and direct senior delivery. | 149 | `https://www.keplerdev.uk/studio` |
| `/contact` | Schedule a Project Review & Architecture Call — Kepler Dev | 58 | Consult directly with senior engineers at Kepler Dev to scope your operational software, mobile app, or multi-surface system build on predictable timelines. | 156 | `https://www.keplerdev.uk/contact` |
| `/ar` | استوديو كبلر ديف — هندسة البرمجيات والأنظمة التشغيلية | 53 | كبلر ديف استوديو هندسي يطور تطبيقات الجوال ومنصات الإدارة التشغيلية المتصلة وشبكات نقاط البيع في المملكة العربية السعودية والخليج وفق معايير الحوكمة الدقيقة. | 157 | `https://www.keplerdev.uk/ar` |
| `/work/glitre-loyalty-platform` | Glitre Loyalty Platform Case Study — Kepler Dev Studio | 54 | How Kepler Dev engineered a GCC fuel loyalty ecosystem across 4 surfaces under 1 OpenAPI contract with an append-only points ledger and zero axe violations. | 156 | `https://www.keplerdev.uk/work/glitre-loyalty-platform` |
| `/work/hs-vpn` | HS VPN Engineering Retrospective & Case Study — Kepler Dev | 58 | How Kepler Dev built HS VPN for restricted networks, reaching 10,000+ Google Play downloads with native Kotlin, Swift tunnel extensions, and WireGuard fallback. | 160 | `https://www.keplerdev.uk/work/hs-vpn` |
| `/work/quickcharging-pos` | QuickChargingPOS Hardware Case Study — Kepler Dev Studio | 56 | Engineering an offline-first fuel POS on Sunmi Android hardware with Java NamiPayModule, Mada HMAC-SHA256 signatures, and thermal receipt print automation. | 155 | `https://www.keplerdev.uk/work/quickcharging-pos` |
| `/work/medconnect-egypt` | MedConnect Egypt Clinical MVP Case Study — Kepler Dev | 53 | How Kepler Dev engineered a 38-screen clinical coordination platform with AES-256 encrypted National IDs, SHA-256 blind indexing, and GPS geofenced check-ins. | 158 | `https://www.keplerdev.uk/work/medconnect-egypt` |
| `/work/stayease` | StayEase Property Booking Architecture — Kepler Dev | 51 | Architecting a high-concurrency booking engine with MongoDB transactional TTL inventory locks and idempotent Redis Stripe webhook settlement over 40+ screens. | 158 | `https://www.keplerdev.uk/work/stayease` |
| `/work/classroom-sentinel` | Classroom Sentinel Autonomous Daemon — Kepler Dev Studio | 56 | Building a 24/7 autonomous academic operations daemon using Python asyncio, schema-constrained Gemini extraction, and idempotent Telegram alerts in production. | 159 | `https://www.keplerdev.uk/work/classroom-sentinel` |

### `hreflang` & OpenGraph Contract
- `alternates.languages`:
  - `en` → `https://www.keplerdev.uk/`
  - `ar` → `https://www.keplerdev.uk/ar`
  - `x-default` → `https://www.keplerdev.uk/`
- OpenGraph & Twitter Card Specifications:
  - `og:site_name`: `Kepler Dev`
  - `og:type`: `website`
  - `og:image`: `https://www.keplerdev.uk/images/og-keplerdev-default.png`
  - `og:image:width`: `1200`
  - `og:image:height`: `630`
  - `og:image:alt`: `Kepler Dev — Independent Digital Product and Software Engineering Studio`
  - `twitter:card`: `summary_large_image`
  - `twitter:title`: `Kepler Dev — Operational Software & Product Studio`
  - `twitter:description`: `Contract-first engineering studio delivering connected mobile applications, operational dashboards, and backend platforms across the UK and GCC.`

---

## 3. Semantic Heading Hierarchy (`H1` → `H2` → `H3`) Across Core Routes

### A. Homepage (`/`)
- `H1`: We Engineer Multi-Surface Software for Operations That Cannot Fail
- `H2` Sections:
  - `H2`: The Operational Disconnect vs. Direct Senior Engineering
    - `H3`: Moving Past Fragile WhatsApp Channels and Disconnected Spreadsheets
    - `H3`: Direct Engineering Ownership Without Bureaucratic Agency Overhead
  - `H2`: Three Core Product Lines (What We Build)
    - `H3`: Web Applications and Operational Management Dashboards
    - `H3`: Mobile and Industrial Point-of-Sale Applications
    - `H3`: Integrations, AI Automation, and Workflow Pipelines
  - `H2`: Featured Production Case Studies
    - `H3`: Glitre Loyalty Platform (Multi-Surface Fuel Retail Ecosystem)
    - `H3`: HS VPN (Network Resilience and Native Platform Tunneling)
    - `H3`: QuickChargingPOS (Sunmi Android POS Hardware and Offline Payments)
  - `H2`: Five Studio Engineering Signatures
    - `H3`: Contract-First Multi-Surface Delivery Anchored by OpenAPI
    - `H3`: Offline-First and Unstable Network Architectural Resilience
    - `H3`: Native Platform and Industrial Hardware Bridging
    - `H3`: Idempotent Financial Ledgers and Distributed Webhook Locks
    - `H3`: Bounded Schema-Validated Artificial Intelligence Systems
  - `H2`: Four Structured Commercial Offers (How We Work)
    - `H3`: Kepler Product Blueprint (Architecture & Scope Definition)
    - `H3`: Kepler Launch Sprint (Accelerated Initial Production Release)
    - `H3`: Kepler Operations Platform (Full Multi-Surface Enterprise System)
    - `H3`: Kepler Product Care (Dedicated Monthly Engineering Capacity)
  - `H2`: Verified Production Metrics and Technical Proof Points
  - `H2`: Direct Engineering Review and Project Qualification

### B. Work Index (`/work`)
- `H1`: Production Systems Engineered for Operational Demands
- `H2` Sections:
  - `H2`: Filterable Catalog of 13 Studio Builds
    - `H3`: Capability Filtering Across Web, Mobile, and Systems
    - `H3`: Classification by Production Work, Studio Builds, and Applied R&D
  - `H2`: Six Flagship Engineering Case Studies
    - `H3`: Glitre Loyalty Platform (Azure UAE North, 4 Surfaces, 1 Contract)
    - `H3`: HS VPN (Google Play 10,000+ Downloads, Native Packet Tunnels)
    - `H3`: QuickChargingPOS (Sunmi POS Hardware, Offline Mada Queues)
    - `H3`: MedConnect Egypt (38+ Screens, AES-256 Encrypted Patient IDs)
    - `H3`: StayEase (40+ Screens, Transactional MongoDB TTL Room Locks)
    - `H3`: Classroom Sentinel (24/7 Operations Daemon, Gemini JSON Parsing)
  - `H2`: Seven Studio Showcase and Applied R&D Builds
    - `H3`: Aksira (Native Kotlin Keyboard with 30ms Engine Cold Start)
    - `H3`: FitForge (Offline-First Strength Training and Volume Engine)
    - `H3`: Qiraaty (HMAC-SHA256 Webhooks, Moyasar, ZATCA Invoicing)
    - `H3`: Focus Ritual (Pomodoro Telemetry, SM-2 Spaced Repetition)
    - `H3`: GetLab System (C# WinForms, SQL Server Equipment Reservation)
    - `H3`: AI Collab Platform (Low-Latency WebSockets, Shared AI Assistant)
    - `H3`: AgencyOS (Internal Studio Milestones and Contract Gates)
  - `H2`: Architectural Verification Standards Across All Studio Projects

### C. Services (`/services`)
- `H1`: Commercial Engineering Engagements and Product Lines
- `H2` Sections:
  - `H2`: Three Core Product Lines (What We Build)
    - `H3`: Web Applications and Operational Management Dashboards
    - `H3`: Mobile and Industrial Point-of-Sale Applications
    - `H3`: Integrations, AI Workflows, and Regional Regulatory Compliance
  - `H2`: Four Structured Commercial Offers (How We Work)
    - `H3`: Kepler Product Blueprint (Technical Discovery & Specification)
    - `H3`: Kepler Launch Sprint (Production-Grade Initial Software Release)
    - `H3`: Kepler Operations Platform (Multi-Surface Enterprise Software)
    - `H3`: Kepler Product Care (Dedicated Monthly Engineering Retainer)
  - `H2`: Explicit Engagement Boundaries and Milestones
  - `H2`: Schedule a Technical Scoping Discussion

### D. Studio (`/studio`)
- `H1`: Studio Engineering Principles and Governance Standards
- `H2` Sections:
  - `H2`: Why Kepler Dev Operates as an Independent Senior Studio
    - `H3`: Direct Engineering Ownership Without Intermediary Account Managers
    - `H3`: United Kingdom Legal Governance and Commercial Accountability
    - `H3`: Active GCC Operational Delivery and Bilingual Architecture
  - `H2`: Contract-First Architecture and Automated Schema Drift Prevention
  - `H2`: Fault-Tolerant Native Hardware and Offline Resilience
  - `H2`: Mathematical Data Integrity and Append-Only Financial Ledgers
  - `H2`: Complete Client Source Code and Infrastructure Ownership

### E. Contact (`/contact`)
- `H1`: Schedule a Direct Project Review and Architecture Call
- `H2` Sections:
  - `H2`: Qualification Criteria for Potential Engineering Engagements
    - `H3`: Evaluating Operational Bottlenecks and High-Stakes Workflows
    - `H3`: Project Timeline, Technical Constraints, and Budget Alignment
  - `H2`: Direct Project Review Intake Form
  - `H2`: What to Expect During the Architecture Discovery Session
  - `H2`: Direct Communication Channels and Studio Contact Information

---

## 4. AI Search (GEO) Citability & Query Fan-Out (`40–60 Words` Each)

### B2B Query Fan-Out Mapping
1. **Primary Buyer Query:** "custom software development studio for multi-surface retail and field operations in GCC"
   - Fan-out variants: "bilingual arabic english retail pos software", "offline first field inventory mobile app", "sunmi hardware integration agency"
2. **Commercial Pricing Query:** "cost and delivery timeline to build custom loyalty platform with POS and mobile apps"
   - Fan-out variants: "software architecture discovery sprint price", "fixed scope b2b app development sprint", "monthly engineering maintenance retainer"
3. **Architecture & Standards Query:** "b2b software engineering firm with offline-first mobile apps and Arabic RTL support"
   - Fan-out variants: "contract first openapi multi-surface development", "append-only database ledger implementation", "saudi zatca e-invoicing integration"
4. **Governance & IP Query:** "who owns source code and intellectual property when hiring an independent engineering studio"
   - Fan-out variants: "uk commercial law software development contract", "client cloud deployment azure uae", "vendor lock-in elimination custom software"

### A. Top-of-Page GEO Studio Identity Block (`40–60 words`)

> Kepler Dev is an independent UK and GCC digital product and software engineering studio. Operating under United Kingdom governance with active field delivery across Saudi Arabia, the UAE, and international markets, our engineering team designs and deploys connected mobile applications, operational management dashboards, and contract-first backend systems for operations-driven enterprises.

### B. 4 Self-Contained B2B FAQ Answer Blocks (`40–60 words` each)

1. **Q1: How does Kepler Dev scope and price custom software engagements?**

> Kepler Dev scopes custom engagements through four structured commercial tiers: a fixed-definition Product Blueprint ($350–$1,200), a focused Launch Sprint ($3,000–$8,000 for initial production releases), an Operations Platform build ($6,000–$15,000+ phased), and monthly Product Care ($400–$1,500+/mo). Every engagement begins with explicit architectural boundaries, OpenAPI schemas, and verifiable acceptance milestones before production development begins.

2. **Q2: What kinds of operational, web, and mobile platforms does Kepler Dev build?**

> Kepler Dev engineers multi-surface systems connecting mobile applications, industrial hardware, and management dashboards. Production examples include the Glitre fuel loyalty ecosystem connecting four surfaces under one contract, the HS VPN utility with native mobile tunnels, QuickChargingPOS on Sunmi Android hardware, and MedConnect Egypt uniting patient, physician, and admin portals under cryptographic privacy.

3. **Q3: How does Kepler Dev handle Arabic-first RTL, offline networks, and regional compliance?**

> Kepler Dev designs native Arabic-first RTL interfaces paired with English localization for GCC operations. In QuickChargingPOS, our team integrated custom Java modules for Sunmi terminals to execute HMAC-SHA256 signed Mada payments offline. In Aksira, we embedded bilingual writing within a native Android keyboard, while Glitre and Qiraaty implement append-only ledgers and ZATCA compliance.

4. **Q4: Who owns the source code, API contracts, and infrastructure after launch?**

> Clients maintain 100% unconditional ownership of all source code, database architectures, OpenAPI specifications, and deployment infrastructure upon milestone completion. Kepler Dev deploys directly to client-owned cloud environments, such as Microsoft Azure UAE North or AWS. We provide complete technical documentation, schema drift testing in continuous integration, and optional monthly Product Care maintenance without proprietary lock-in.

---

## 5. Production `@graph` `JSON-LD` Structured Data (Zero `Person` Entities)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://www.keplerdev.uk/#organization",
      "name": "Kepler Dev",
      "url": "https://www.keplerdev.uk",
      "logo": "https://www.keplerdev.uk/images/kepler-logo.png",
      "description": "Independent UK & GCC digital product and software engineering studio engineering multi-surface systems, mobile apps, and operational platforms.",
      "email": "mahmouddattiaa7@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GB"
      },
      "areaServed": [
        "United Kingdom",
        "Saudi Arabia",
        "United Arab Emirates",
        "Qatar",
        "Kuwait",
        "Egypt"
      ],
      "knowsAbout": [
        "Custom Software Development",
        "Mobile Application Engineering",
        "Multi-Surface Platforms",
        "OpenAPI Architecture",
        "Sunmi POS Software",
        "Offline-First Systems",
        "Append-Only Financial Ledgers"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.keplerdev.uk/#website",
      "url": "https://www.keplerdev.uk",
      "name": "Kepler Dev",
      "publisher": {
        "@id": "https://www.keplerdev.uk/#organization"
      },
      "inLanguage": [
        "en",
        "ar"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.keplerdev.uk/#service-product-blueprint",
      "name": "Kepler Product Blueprint",
      "provider": {
        "@id": "https://www.keplerdev.uk/#organization"
      },
      "serviceType": "Technical Discovery & Architecture",
      "description": "Technical discovery, system architecture, OpenAPI schema design, and fixed-scope delivery specification completed in 5–10 business days.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "350-1200",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.keplerdev.uk/#service-launch-sprint",
      "name": "Kepler Launch Sprint",
      "provider": {
        "@id": "https://www.keplerdev.uk/#organization"
      },
      "serviceType": "Initial Production Software Release",
      "description": "Accelerated 6–10 week production build of a single validated product surface, core customer workflow, backend API, and cloud deployment.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "3000-8000",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.keplerdev.uk/#service-operations-platform",
      "name": "Kepler Operations Platform",
      "provider": {
        "@id": "https://www.keplerdev.uk/#organization"
      },
      "serviceType": "Multi-Surface Operational System",
      "description": "Phased 8–16+ week multi-surface engineering connecting customer mobile apps, field or POS terminals, and real-time management dashboards.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "6000-15000",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.keplerdev.uk/#service-product-care",
      "name": "Kepler Product Care",
      "provider": {
        "@id": "https://www.keplerdev.uk/#organization"
      },
      "serviceType": "Continuous Engineering & Maintenance",
      "description": "Dedicated monthly engineering capacity for roadmap increments, infrastructure maintenance, security patches, and release verification.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "400-1500",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.keplerdev.uk/work/glitre-loyalty-platform#software",
      "name": "Glitre Loyalty Platform",
      "operatingSystem": "iOS, Android, Web",
      "applicationCategory": "BusinessApplication",
      "description": "GCC fuel-station loyalty ecosystem connecting four surfaces under one OpenAPI contract with an append-only points ledger.",
      "author": {
        "@id": "https://www.keplerdev.uk/#organization"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.keplerdev.uk/work/hs-vpn#software",
      "name": "HS VPN",
      "operatingSystem": "Android, iOS",
      "applicationCategory": "UtilitiesApplication",
      "description": "Consumer privacy utility engineered for restricted networks with native Kotlin, Swift NEPacketTunnelProvider, and WireGuard fallback.",
      "author": {
        "@id": "https://www.keplerdev.uk/#organization"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.keplerdev.uk/work/quickcharging-pos#software",
      "name": "QuickChargingPOS",
      "operatingSystem": "Android Sunmi POS",
      "applicationCategory": "BusinessApplication",
      "description": "Industrial fuel-station POS running on Sunmi hardware with custom Java HMAC-SHA256 Mada payment module and offline queueing.",
      "author": {
        "@id": "https://www.keplerdev.uk/#organization"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.keplerdev.uk/work/medconnect-egypt#software",
      "name": "MedConnect Egypt",
      "operatingSystem": "iOS, Android, Web",
      "applicationCategory": "HealthcareApplication",
      "description": "Clinical booking platform with AES-256 encrypted National IDs, SHA-256 blind indexing, and GPS geofence-verified check-ins.",
      "author": {
        "@id": "https://www.keplerdev.uk/#organization"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.keplerdev.uk/work/stayease#software",
      "name": "StayEase",
      "operatingSystem": "Web",
      "applicationCategory": "BusinessApplication",
      "description": "Hospitality booking platform engineered with MongoDB transactional TTL room locks and idempotent Redis Stripe webhook settlement.",
      "author": {
        "@id": "https://www.keplerdev.uk/#organization"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.keplerdev.uk/work/classroom-sentinel#software",
      "name": "Classroom Sentinel",
      "operatingSystem": "Linux Server Daemon",
      "applicationCategory": "BusinessApplication",
      "description": "Autonomous 24/7 academic operations daemon with schema-constrained Gemini JSON extraction and idempotent Telegram notifications.",
      "author": {
        "@id": "https://www.keplerdev.uk/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.keplerdev.uk/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Kepler Dev scope and price custom software engagements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kepler Dev scopes custom engagements through four structured commercial tiers: a fixed-definition Product Blueprint ($350–$1,200), a focused Launch Sprint ($3,000–$8,000 for initial production releases), an Operations Platform build ($6,000–$15,000+ phased), and monthly Product Care ($400–$1,500+/mo). Every engagement begins with explicit architectural boundaries, OpenAPI schemas, and verifiable acceptance milestones before production development begins."
          }
        },
        {
          "@type": "Question",
          "name": "What kinds of operational, web, and mobile platforms does Kepler Dev build?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kepler Dev engineers multi-surface systems connecting mobile applications, industrial hardware, and management dashboards. Production examples include the Glitre fuel loyalty ecosystem connecting four surfaces under one contract, the HS VPN utility with native mobile tunnels, QuickChargingPOS on Sunmi Android hardware, and MedConnect Egypt uniting patient, physician, and admin portals under cryptographic privacy."
          }
        },
        {
          "@type": "Question",
          "name": "How does Kepler Dev handle Arabic-first RTL, offline networks, and regional compliance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kepler Dev designs native Arabic-first RTL interfaces paired with English localization for GCC operations. In QuickChargingPOS, our team integrated custom Java modules for Sunmi terminals to execute HMAC-SHA256 signed Mada payments offline. In Aksira, we embedded bilingual writing within a native Android keyboard, while Glitre and Qiraaty implement append-only ledgers and ZATCA compliance."
          }
        },
        {
          "@type": "Question",
          "name": "Who owns the source code, API contracts, and infrastructure after launch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Clients maintain 100% unconditional ownership of all source code, database architectures, OpenAPI specifications, and deployment infrastructure upon milestone completion. Kepler Dev deploys directly to client-owned cloud environments, such as Microsoft Azure UAE North or AWS. We provide complete technical documentation, schema drift testing in continuous integration, and optional monthly Product Care maintenance without proprietary lock-in."
          }
        }
      ]
    }
  ]
}
```

---

## 6. Copywriter & Frontend Engineer Handoff Rules

1. **Strict Metadata Strings:** Preserve the exact `<title>` and `<meta name="description">` strings per route across page templates, Next.js metadata objects, and OpenGraph headers.
2. **GEO Extractable Answer Integrity:** Keep the Top-of-Page GEO Studio Identity Block and the 4 FAQ answers strictly within `40–60 words` to ensure clean extraction by generative search engines and answer assistants.
3. **Decoupled Studio Entity:** Never add `@type: "Person"` or personal names (`Mahmoud`), solo pronouns (`I`/`my`), or founder labels to JSON-LD, metadata, or page content. Maintain pure studio voice (`we`, `our`, `Kepler Dev`).
4. **Canonical Uniformity:** Ensure all canonical URLs, schema `@id` values, and OpenGraph tags resolve to origin `https://www.keplerdev.uk`.
5. **Strict Heading Hierarchy:** Maintain exactly one `H1` tag per route followed by logical `H2` sections and nested `H3` components without skipped levels.

---

## 7. Mandatory 7-Rule Self-Audit Checklist

| # | Check | Status | Concrete Evidence |
| :--- | :--- | :--- | :--- |
| **1** | **All 12 Route Metadata Rows Valid:** Every `<title>` is `45–60 chars` and `<meta description>` is `135–160 chars`. | `PASS` | Verified by `seo_audit.py` across all 12 routes. |
| **2** | **Canonical URLs Use `https://www.keplerdev.uk`:** All routes & `hreflang` alternates specified. | `PASS` | Section 2 table and OpenGraph contract. |
| **3** | **GEO Blocks Are `40–60 Words`:** Identity block + 4 FAQ answers strictly within `40–60 words`. | `PASS` | Verified by `seo_audit.py` (5 blocks: 50, 52, 52, 53, 55 words). |
| **4** | **Valid `@graph` JSON-LD with Zero `Person` Entities:** Parses cleanly as JSON and contains `Organization`, `WebSite`, `Service`, and `FAQPage`. | `PASS` | Verified by `seo_audit.py` (contains Organization, ProfessionalService, WebSite, 4 Services, 6 SoftwareApplications, FAQPage; 0 Person entities). |
| **5** | **All 6 Flagship Case Study Routes Included:** `glitre-loyalty-platform`, `hs-vpn`, `quickcharging-pos`, `medconnect-egypt`, `stayease`, `classroom-sentinel`. | `PASS` | Included in Section 2, Section 3, Section 4, and Section 5 JSON-LD schema. |
| **6** | **Standalone Studio Voice:** Zero personal names or founder references. | `PASS` | Verified by `copy_audit.py`. |
| **7** | **Zero Banned Words & Structural Slogans:** `copy_audit.py` exits `0`. | `PASS` | Verified by `copy_audit.py` with exit code `0`. |
