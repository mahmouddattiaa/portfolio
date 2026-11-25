# Stage 1 Offsite Entity & Citation Pack

**Project:** Kepler Dev
**Canonical Origin:** `https://www.keplerdev.uk`
**Locales:** `en, ar`
**Source Briefs:** `docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `docs/stage-1-final-copy-and-pitch.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`

---

## 1. Canonical Entity Record (NAP, Legal Framing, Pricing & Timelines)

- **Canonical Brand Name:** Kepler Dev (Arabic transliteration standardized as `كيبلر ديف`)
- **Canonical Origin:** `https://www.keplerdev.uk` (primary Arabic entry route: `https://www.keplerdev.uk/ar`)
- **Entity Type (Schema.org):** `Organization` / `ProfessionalService` (`@id`: `https://www.keplerdev.uk/#organization`; never emit `Person` as the primary entity)
- **Operating Footprint / Service Area (`areaServed`):** Direct engineering studio based in Cairo, Egypt (`Africa/Cairo`), with same-day working-hour overlap across Saudi Arabia (`Asia/Riyadh`), the GCC (UAE, Qatar, Kuwait), Egypt, and the United Kingdom (`Europe/London`). Languages supported: native Arabic-first RTL (`ar`) and English (`en`), plus French and German communication. Do not invent a physical street suite or coworking mail-drop address.
- **Public Contact Channel:** `hello@keplerdev.uk` and `https://www.keplerdev.uk/contact` (never publish personal Gmail addresses or unverified phone numbers on public directories).
- **Honest Legal-Entity Framing:** `Mahmoud Attia, trading as Kepler Dev` (Cairo, Egypt) — an independent digital product and operational software engineering studio. Never claim corporate incorporation or regulatory registrations outside our actual operating jurisdiction, and never write client-facing prose in first-person singular (`brand_plural` voice only).
- **Verified Founding / Team Scope:** Independent engineering studio led by Mahmoud Attia in Cairo, Egypt; founding year and numeric headcount are not publicly claimed beyond direct senior engineering execution (on directory forms requiring a numeric range, select the smallest honest bracket `1–9` or `1` without inflating tenure or headcount).
- **Locked Pricing Anchors:**
  - **Product Blueprint:** `From $300` (100% credited toward the build if the client proceeds)
  - **Launch Sprint:** `From $1,800` (scoped transparently after Blueprint; no arbitrary upper ceiling)
  - **Operations Platform:** `From $4,000` (Phase 1, scoped per phase with no artificial upper ceiling)
  - **Product Care:** `From $250/mo` (Arabic copy always uses `بدءاً من $250 شهرياً`)
- **Locked Delivery Timelines:**
  - **Product Blueprint:** `3–5 business days`
  - **Launch Sprint:** `2–5 weeks`
  - **Operations Platform:** `5–10 weeks, phased`
  - **Product Care:** `Monthly` (agreed engineering capacity against a client-owned backlog, no long-term lock-in)
- **Verified Production Proof Anchors:**
  - **Glitre Loyalty Platform:** 4 connected GCC fuel-station surfaces under 1 OpenAPI contract (`60` operations, `30` data models, Arabic-first RTL + English), backend and 9-page RTL manager dashboard live in Azure UAE North, append-only PostgreSQL ledger, `0` axe-core WCAG 2.1 AA violations across `36` audited captures.
  - **HS VPN:** Live on Google Play (`10K+` downloads recorded Sept 2026; ~1,500 Turkmenistan users recorded in Firebase; iOS on TestFlight) with Flutter, Kotlin, Swift `NEPacketTunnelProvider`, FastAPI, and WireGuard/AmneziaWG.
  - **QuickChargingPOS:** Deployed on physical Sunmi industrial POS terminals with React Native, custom Java `NamiPayModule` for SHA-256 HMAC-signed SkyBand/Mada payments, thermal receipts, and offline delivery caching.
  - **Additional Verified Builds (`/work`):** `MedConnect Egypt` (`38+` screens, AES-256 National ID encryption + GPS geofence check-ins), `StayEase` (`40+` screen assets, MongoDB TTL room locks + idempotent Stripe webhooks), `Classroom Sentinel` (24/7 bilingual AI operations daemon), and `Qiraaty` (Laravel 10, HMAC-SHA256 Daily.co webhooks, Moyasar, Saudi ZATCA e-invoicing).

---

## 2. Priority Directory & Search Engine Submission Matrix

| Platform | Category | Priority | Submission URL / Property | Required Parity Fields | Status |
|---|---|---|---|---|---|
| **Google Search Console** | Search Indexer | P0 | `https://www.keplerdev.uk` | Verified domain property, XML sitemap (`https://www.keplerdev.uk/sitemap.xml`), `robots.txt` check (`OAI-SearchBot`, `Googlebot`, `Google-Extended`), `/llms.txt` crawl check | Ready for DNS/Domain Verification |
| **Bing Webmaster Tools** | Search Indexer (ChatGPT Search & Copilot) | P0 | `https://www.keplerdev.uk` | Verified domain property (or GSC import), XML sitemap (`https://www.keplerdev.uk/sitemap.xml`), IndexNow API key hosted at `https://www.keplerdev.uk` root | Ready for Verification & IndexNow Setup |
| **GitHub** | Technical Proof Node (`sameAs` Live) | P0 | `https://github.com/mahmouddattiaa` | Verified website link (`https://www.keplerdev.uk`), concise studio bio (`Mahmoud Attia, trading as Kepler Dev`), pinned public proof repositories, `hello@keplerdev.uk` | Live (Align Bio & Canonical Link) |
| **LinkedIn Personal Profile** | Founder Authority Node (`sameAs` Live) | P0 | `https://www.linkedin.com/in/mahmoud-attia-b372b0352` | Headline naming `Kepler Dev`, canonical link to `https://www.keplerdev.uk`, verified Cairo/GCC/UK studio positioning and proof summary | Live (Align Featured Link & Summary) |
| **LinkedIn Company Page** | B2B Entity & Knowledge Graph Node | P1 | Pending Creation (reserve `kepler-dev` slug once created) | Exact brand name `Kepler Dev`, website `https://www.keplerdev.uk`, location Cairo, Egypt, Arabic/English positioning, 4 service anchors | Pending Creation |
| **Clutch.co** | High-Authority B2B Buyer Directory | P1 | Pending Creation (apply with verified profile once live) | Honest trading identity (`Mahmoud Attia, trading as Kepler Dev`), `From $300` / `From $1,800` pricing anchors, Cairo footprint, verified past-client reviews | Pending Creation |
| **GoodFirms** | B2B Software & Agency Directory | P1 | Pending Creation (register after Clutch alignment) | Matching NAP, `https://www.keplerdev.uk`, `hello@keplerdev.uk`, mobile/web/POS service split, portfolio links back to `/work` | Pending Creation |
| **Crunchbase** | Structured Entity Graph Database | P2 | Pending Creation (create after B2B directories) | Independent studio stage (zero fabricated funding/incorporation), Cairo, Egypt, category tags, links to `https://www.keplerdev.uk` and live `sameAs` URLs | Pending Creation |

---

## 3. Verified sameAs URL Registry (JSON-LD Parity)

> `sameAs` contains only verified, live external `https://` authority profile URLs matching `.kepler/stage-1-bindings.json` and Role 1.5 JSON-LD. The primary site domain is never placed inside `sameAs`, and uncreated profiles are tracked separately as planned until live and verified.

### Verified Live `sameAs` Registry (Synced to `Organization` & `ProfessionalService` `@graph`)

| Platform | Canonical `sameAs` URL | Status | Target JSON-LD Node |
|---|---|---|---|
| GitHub | `https://github.com/mahmouddattiaa` | Live | `Organization`, `ProfessionalService` |
| LinkedIn | `https://www.linkedin.com/in/mahmoud-attia-b372b0352` | Live | `Organization`, `ProfessionalService` |

```json
{
  "sameAs": [
    "https://github.com/mahmouddattiaa",
    "https://www.linkedin.com/in/mahmoud-attia-b372b0352"
  ]
}
```

### Planned Offsite Profiles (Excluded From Live JSON-LD `sameAs` Until Created)

| Platform | Target Handle / Slug Rule | Status | Promotion Gate Before Adding to JSON-LD `sameAs` |
|---|---|---|---|
| **LinkedIn Company Page** | Reserve `kepler-dev` company URL under `linkedin.com/company/` | Pending Creation | Must be publicly accessible over `https://`, link back to the primary domain, and show matching brand/location details |
| **Clutch.co** | Create verified vendor profile for `Kepler Dev` | Pending Creation | Must pass Clutch verification with honest trading identity and matching starting price floor |
| **GoodFirms** | Create verified company listing for `Kepler Dev` | Pending Creation | Must display matching NAP, Cairo footprint, and live case study links |
| **Crunchbase** | Create organization record for `Kepler Dev` | Pending Creation | Must publish verified studio stage and link back to live external profiles |

---

## 4. Bilingual Directory Profiles & Review Request Scripts (EN & AR)

### English Directory Profile Copy

- **Tagline (`70` chars):** `Contract-First Bilingual Apps, Sunmi POS & Ops Platforms | Kepler Dev`
- **Short Profile (`56` words):**
  Kepler Dev is a contract-first bilingual digital product and operational software engineering studio in Cairo serving founders and SMEs across Saudi Arabia, the GCC, Egypt, and the UK. We deliver Product Blueprints from $300 in 3-5 business days and Launch Sprints from $1,800 in 2-5 weeks, backed by 10K+ Google Play installs on HS VPN (https://www.keplerdev.uk).
- **Extended Overview (`151` words):**
  Early-stage founders and operations-driven SMEs across Saudi Arabia, the GCC, Egypt, and the UK often stall between slow, high-overhead agencies and unverified freelancers whose mobile apps, POS terminals, and web dashboards drift out of sync. Kepler Dev (`Mahmoud Attia, trading as Kepler Dev`) solves this from Cairo with same-day Riyadh and London working-hour overlap. Before writing feature code, we lock one shared OpenAPI contract across every surface, automate repetitive boilerplate, and run mandatory independent verification gates on every release. Our four fixed-scope engagements cover `Product Blueprint` (From $300, 3–5 business days, 100% credited toward build), `Launch Sprint` (From $1,800, 2–5 weeks), phased `Operations Platform` (From $4,000 Phase 1, 5–10 weeks), and `Product Care` (From $250/mo). Verified production builds include `Glitre Loyalty Platform` (4 RTL surfaces in Azure UAE North), `HS VPN` (`10K+` Google Play downloads), and `QuickChargingPOS` on physical Sunmi terminals. Start at `https://www.keplerdev.uk/contact`.

### Arabic Directory Profile Copy (`ar` Parity)

- **العنوان المختصر:** `ستوديو هندسي لتطبيقات الجوال وأجهزة Sunmi POS ولوحات التحكم العربية | كيبلر ديف`
- **التعريف المختصر (`55` كلمة):**
  كيبلر ديف (Kepler Dev) ستوديو هندسي من القاهرة لتطوير التطبيقات والمنصات التشغيلية لرواد الأعمال والشركات في السعودية والخليج ومصر وبريطانيا. نبدأ بمخطط المنتج بدءاً من $300 خلال 3-5 أيام عمل، ونطلق النسخة الأولى بدءاً من $1,800 خلال 2-5 أسابيع، مع رعاية شهرية بدءاً من $250 شهرياً وسجل يضم 10 آلاف تحميل لتطبيق HS VPN على https://www.keplerdev.uk/ar.
- **التعريف الموسع (`142` كلمة):**
  تتعثر كثير من أفكار التطبيقات ومنصات الشركات بين الوكالات التقليدية بطيئة التنفيذ والمستقلين الذين يتركون واجهات الويب والجوال ونقاط البيع دون عقد تقني موحد. يعمل ستوديو كيبلر ديف (`Mahmoud Attia, trading as Kepler Dev`) من القاهرة بتداخل يومي مع ساعات العمل في الرياض ودبي ولندن لتسليم منتجات رقمية وأنظمة تشغيلية ثنائية اللغة (عربي RTL وإنجليزي). نثبت عقد OpenAPI موحداً منذ اليوم الأول، ونزيل الأكواد المتكررة مع تطبيق بوابات تحقق مستقلة لكل إصدار. تشمل باقاتنا: مخطط المنتج بدءاً من $300 (3-5 أيام عمل وتُخصم قيمته كاملة عند التنفيذ)، وسباق الإطلاق بدءاً من $1,800 (2-5 أسابيع)، ومنصة العمليات بدءاً من $4,000 للمرحلة الأولى، ورعاية المنتج بدءاً من $250 شهرياً. من أعمالنا الإنتاجية: منصة جليتر للولاء على Azure UAE North، وتطبيق HS VPN بأكثر من 10 آلاف تحميل، ونظام QuickChargingPOS على أجهزة Sunmi POS، ومنصة قراءتي المتوافقة مع ZATCA. تواصل معنا عبر https://www.keplerdev.uk/contact.

### Ethical Past-Client Review Request Scripts (Zero Fake or Incentivized Reviews)

> Policy: Send only to real past or active clients who shipped a verified deliverable with Kepler Dev. Never offer discounts, payments, or quid-pro-quo perks for ratings, and never filter out critical feedback.

- **WhatsApp / Direct Chat (EN):**
  `Hi [Client Name], hope operations are running smoothly after our work on [Project Name]. Our Kepler Dev engineering team is updating our verified B2B directory profile on [Clutch / GoodFirms], and a brief honest review from your team would help founders and ops leads evaluating similar builds. Whenever you have two minutes, you can share what constraint we were solving and how the release held up here: [Direct Review URL].`

- **Email Request (EN):**
  - **Subject:** `Quick 2-minute feedback request on [Project Name] — Kepler Dev`
  - **Body:**
    `Hi [Client Name], thank you again for partnering with our engineering team at Kepler Dev on [Project Name]. As we formalize our listings on [Clutch / GoodFirms], independent client reviews carry the most weight for teams deciding whether to run a Product Blueprint or Operations Platform sprint with us. If you have two minutes this week, we would appreciate an honest note on what problem we tackled, how communication and delivery speed felt, and how the system performs in production: [Direct Review URL]. Totally optional if your schedule is packed—appreciate your time either way.`

- **LinkedIn DM (EN):**
  `Hi [Client Name], great seeing [Project / Company Name] keep moving forward. We are collecting candid LinkedIn recommendations around the [mobile / Sunmi POS / RTL dashboard] architecture we shipped together at Kepler Dev. If you are open to writing two or three honest sentences on working with our team, we would value your perspective.`

- **WhatsApp / Direct Chat (AR — GCC & Regional Clients):**
  `مرحباً [اسم العميل]، نتمنى أن يكون العمل على [اسم المشروع] يسير بسلاسة واستقرار. نقوم حالياً بتحديث ملف استوديو كيبلر ديف على منصة [Clutch / GoodFirms]، ويسعدنا إذا تكرّمت بدقيقتين لمشاركة تقييمك الصادق حول التحدي الذي عالجناه وسرعة التسليم وجودة النظام بعد الإطلاق عبر هذا الرابط: [رابط التقييم المباشر]. مشاركتك اختيارية تماماً ونقدّر وقتك.`

- **Email Request (AR — GCC & Regional Clients):**
  - **الموضوع:** `طلب رأيكم الصادق حول تجربة العمل على [اسم المشروع] — كيبلر ديف`
  - **النص:**
    `أهلاً [اسم العميل]، نشكركم مجدداً على ثقتكم بفريق كيبلر ديف خلال تنفيذ [اسم المشروع]. مع توثيق أعمالنا على منصة [Clutch / GoodFirms]، تساعد التقييمات المباشرة من العملاء الفعليين رواد الأعمال ومديري العمليات على تقييم أسلوب عملنا الهندسي بشفافية. إذا أتيح لكم دقيقتان هذا الأسبوع، نرجو مشاركة تقييمكم الصادق حول نطاق العمل، الالتزام بالجدول الزمني، وأداء النظام في التشغيل الفعلي عبر الرابط التالي: [رابط التقييم المباشر]. في حال انشغالكم لا يوجد أي التزام، ويسعدنا استمرار تواصلكم معنا على hello@keplerdev.uk.`

---

## 5. Syndication Articles & Canonical Frontmatter Pack

### Target Syndication Channels & Canonical Rules

- **Publish on `https://www.keplerdev.uk` First:** Confirm each technical guide is live, indexed in Google Search Console and Bing Webmaster Tools, and emitting its self-referential `<link rel="canonical">` before cross-posting anywhere.
- **Dev.to & Hashnode:** Cross-post full technical teardowns using `canonical_url:` in YAML frontmatter pointing verbatim to the `https://www.keplerdev.uk` article URL.
- **Medium:** Import via Medium's story importer and verify **Advanced Settings -> Customize canonical link** points to `https://www.keplerdev.uk/...`.
- **LinkedIn Articles / Newsletters:** Publish a 300–500 word executive summary linking directly back to the canonical `https://www.keplerdev.uk` article rather than pasting the entire full-length piece verbatim.

### Article #1 Canonical Frontmatter & Outline (Contract-First Multi-Surface Systems)

```yaml
---
title: "How One OpenAPI Contract Kept 4 Surfaces and Arabic RTL in Sync on Glitre"
published: true
description: "How Kepler Dev unified 60 API operations, 30 models, Flutter apps, and an Arabic-first RTL dashboard in Azure UAE North with zero WCAG violations."
tags: openapi, architecture, flutter, webdev
canonical_url: https://www.keplerdev.uk/articles/contract-first-openapi-four-surfaces-glitre
---
```
- **Target Primary URL:** `https://www.keplerdev.uk/articles/contract-first-openapi-four-surfaces-glitre`
- **Key Takeaways:**
  - Locking 60 OpenAPI operations and 30 data models before feature coding prevents mobile, backend, and dashboard schema drift across 2–5 week sprint cycles.
  - Database-enforced append-only PostgreSQL ledgers, single-use signed QR codes, and idempotency keys stop loyalty-point duplication at the storage boundary.
  - Arabic-first RTL engineering verified with automated accessibility gates achieved `0` axe-core WCAG 2.1 AA violations across `36` audited dashboard captures in Azure UAE North.

### Article #2 Canonical Frontmatter & Outline (Hardware POS & Founder Scoping)

```yaml
---
title: "Bridging Sunmi Android POS Hardware and Mada Payments Without Field Drops"
published: true
description: "Inside QuickChargingPOS: bridging React Native to Java NamiPayModule for SHA-256 HMAC-signed SkyBand Mada settlements and offline queuing."
tags: android, reactnative, fintech, engineering
canonical_url: https://www.keplerdev.uk/articles/sunmi-pos-mada-payments-offline-queue
---
```
- **Target Primary URL:** `https://www.keplerdev.uk/articles/sunmi-pos-mada-payments-offline-queue`
- **Key Takeaways:**
  - When cross-platform wrappers hit industrial POS limits, a dedicated Java `NamiPayModule` bridges Android Intents cleanly for SHA-256 HMAC-signed SkyBand/Mada transactions.
  - Local offline fuel-delivery caching and Sunmi Printer SDK thermal receipt queues keep station forecourts operational during intermittent field connectivity.
  - Pairing a `3–5 business day` `Product Blueprint` (`From $300`, 100% credited) with phased `Operations Platform` delivery removes upfront scope ambiguity for GCC operators.

---

## 6. AI Visibility Prompt Benchmark Suite & Optional MCP Setup

### Unbranded Discovery Prompt Benchmark (Run Monthly Across ChatGPT Search, Perplexity, Gemini, Claude)

| # | Locale | Buyer Stage | Unbranded Discovery Prompt | Target Engines | Citation & Fact Check Criteria |
|---|---|---|---|---|---|
| 1 | `en` | Idea-Stage Founder | "Who can turn an app idea into a technical blueprint and fixed-price MVP in 2 to 5 weeks without agency retainer lock-in?" | ChatGPT Search, Perplexity, Gemini, Claude | Direct `https://www.keplerdev.uk` or `sameAs` citation + accurate `$300` Blueprint (100% credited) and `$1,800` Launch Sprint anchors |
| 2 | `en` | Idea-Stage Founder | "How much does it cost to build a custom v1 web or mobile app MVP with a direct engineering studio instead of a high-overhead agency?" | ChatGPT Search, Perplexity, Gemini, Claude | Brand appears in top 3 recommendations with accurate `$300` / `$1,800` floors and `3–5 business days` / `2–5 weeks` timelines |
| 3 | `en` | Operational Buyer | "Which software engineering studios build Arabic-first RTL admin dashboards connected to Flutter or React Native mobile apps under one OpenAPI contract?" | ChatGPT Search, Perplexity, Gemini, Claude | Cites `https://www.keplerdev.uk` or `/work/glitre-loyalty-platform` with accurate 60-operation / 4-surface proof |
| 4 | `en` | Operational Buyer | "Who has production experience integrating Sunmi Android POS terminals with SkyBand Mada card payments and offline field queues in Saudi Arabia and the GCC?" | ChatGPT Search, Perplexity, Gemini, Claude | Cites `/work/quickcharging-pos`, `NamiPayModule`, and honest Cairo-to-GCC delivery footprint |
| 5 | `en` | Operational Buyer | "Which engineering teams offer ongoing monthly Flutter and NestJS product maintenance on a client-owned backlog starting under $500 per month?" | ChatGPT Search, Perplexity, Gemini, Claude | Cites `Product Care` (`From $250/mo`) and zero lock-in backlog boundary without hallucinating pricing |
| 6 | `en` | Technical / Risk Lead | "What Cairo-based software studio overlaps Riyadh and London business hours and enforces automated verification gates and idempotent ledgers?" | ChatGPT Search, Perplexity, Gemini, Claude | Accurate `Africa/Cairo` + `Asia/Riyadh` + `Europe/London` overlap and honest `Mahmoud Attia, trading as Kepler Dev` framing |
| 7 | `ar` | Idea-Stage Founder | "عندي فكرة تطبيق جوال أو منصة SaaS، ما هي أفضل شركة أو فريق تقني يبدأ بخطة تقنية وتكلفة واضحة قبل البرمجة؟" | ChatGPT Search, Perplexity, Gemini, Claude | Arabic response links `https://www.keplerdev.uk/ar` or `/contact` and mentions مخطط المنتج بدءاً من `$300` |
| 8 | `ar` | Operational Buyer | "ما أفضل ستوديو برمجة في مصر والسعودية لبناء لوحة تحكم عربية RTL وتطبيق جوال مرتبط بأجهزة نقاط بيع Sunmi POS ومدفوعات مدى؟" | ChatGPT Search, Perplexity, Gemini, Claude | Cites `Glitre` و`QuickChargingPOS` و`Qiraaty` (ZATCA / Moyasar) دون تضخيم أو عبارات دعائية مكررة |
| 9 | `ar` | Live-Product Buyer | "كم تكلفة بناء تطبيق MVP لشركة ناشئة في السعودية أو الخليج وما خيارات الصيانة الشهرية بدون عقود احتكار؟" | ChatGPT Search, Perplexity, Gemini, Claude | Accurate Arabic pricing (`$1,800` لسباق الإطلاق و`$250 شهرياً` لرعاية المنتج) دون تسريب وحدات إنجليزية |

### Monthly Scoring Protocol & Regression Triggers

- **Scoring Rubric (Clean Fresh Session per Engine):** Record **Citation / Link Present (`Y/N`)**, **Brand Mention Position (`0` absent, `1–3` top tier, `4+` late)**, **Fact Accuracy (`Pass/Drift` on `$300` / `$1,800` / `$4,000` / `$250` and legal identity)**, and **Third-Party Sources Cited** (GitHub, LinkedIn, Clutch, GoodFirms, Dev.to, Hashnode).
- **Cadence:** Capture baseline `T0` prior to directory/syndication rollout, re-run at `T+30` days after Google Search Console, Bing Webmaster Tools / IndexNow, and `sameAs` updates propagate, and repeat quarterly.
- **Regression Trigger:** If a cited prompt drops or drifts on pricing/legal claims, verify Bing Webmaster Tools index status first (which feeds ChatGPT Search), then audit `https://www.keplerdev.uk/llms.txt`, on-page `@graph` JSON-LD, and directory parity.

### Optional Open-Source & MCP Tooling Reference

| Tool / Repository | License | Purpose in Offsite & GEO Ops | Operational Notes |
|---|---|---|---|
| `limelit-co/open` | Apache-2.0 | Go CLI + SQLite tracker + MCP server for AI search citation benchmarks | Logs month-over-month prompt runs locally without third-party SaaS lock-in |
| `Auriti-Labs/geo-optimizer-skill` | MIT | FastMCP server and rubric for scoring post-launch GEO citability | Audits page extractability across `/` and `/ar` after Stage 3 deployment |
| `AminForou/mcp-gsc` | MIT | Google Search Console MCP server for impressions, clicks, and index status | Scope Google Cloud OAuth/service-account credentials strictly read-only |
| `houtini-ai/google-knowledge-graph-mcp` | MIT | Free-tier Google Knowledge Graph Search API MCP | Tracks whether `Kepler Dev` resolves to an entity `MID` and `sameAs` graph |
| `ncosentino/bing-webmaster-mcp` | MIT | Bing Webmaster Tools & IndexNow MCP bridge for ChatGPT Search indexing | **Security note:** Inspect repository source code locally before running due to low community star count |
| `AgriciDaniel/claude-seo` | MIT | Structured E-E-A-T and technical SEO review checklists | Complements Role 1.2 on-page checks with authority and citation hygiene |

---

## 7. Mandatory Self-Audit Checklist

| # | Audit Gate | Verification Evidence | Status |
|---|---|---|---|
| 1 | All 7 required H2 sections present in exact order with non-empty content | Sections 1–7 match `stage-1-offsite-citation-pack.template.md` headings verbatim | PASS |
| 2 | Section 1 locks canonical name, origin, honest legal framing, pricing, and timelines | Locks `Kepler Dev`, `https://www.keplerdev.uk`, `Mahmoud Attia, trading as Kepler Dev` (Cairo, Egypt), calibrated pricing (`$300` / `$1,800` / `$4,000` / `$250/mo`), and zero fabricated corporate/tenure claims | PASS |
| 3 | Section 2 matrix includes Google Search Console, Bing Webmaster Tools, and >= 2 directories on separate rows | Dedicated separate rows for Google Search Console, Bing Webmaster Tools (+ IndexNow), GitHub, LinkedIn Personal Profile, LinkedIn Company Page, Clutch.co, GoodFirms, and Crunchbase | PASS |
| 4 | Section 3 `sameAs` registry matches `.kepler/stage-1-bindings.json` with zero self-references | Lists verified `https://github.com/mahmouddattiaa` and `https://www.linkedin.com/in/mahmoud-attia-b372b0352` strictly, separates pending profiles as planned, and excludes `www.keplerdev.uk` from `sameAs` | PASS |
| 5 | Section 4 includes bilingual EN + AR profiles and ethical past-client review scripts | Includes EN tagline/short/extended profiles, native Arabic profiles using `بدءاً من $250 شهرياً` (zero `/mo` leaks), and 5 zero-incentive EN/AR outreach templates | PASS |
| 6 | Section 5 syndication frontmatter sets `canonical_url:` to `https://www.keplerdev.uk/...` | Both fenced YAML frontmatter blocks point `canonical_url:` directly to `https://www.keplerdev.uk/articles/...` | PASS |
| 7 | Section 6 has >= 5 unbranded EN + >= 2 AR prompts and clean prose/citation audit | Includes 6 unbranded EN + 3 native AR prompts across ChatGPT Search, Perplexity, Gemini, and Claude; verified via `citation_audit.py` and `prose_audit.py` exiting `0` | PASS |
