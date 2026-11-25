# SEO & Market Research Brief — Kepler Dev

> Deliverable for Stage 1 Role 1.2 (`seo-and-market-researcher`). Downstream consumers: Conversion Copywriter (Role 1.3), Technical GEO, and Frontend Implementation.

## 1. Search Intent & Keyword Clusters

Live Google Autocomplete harvesting was executed via `roles/seo-and-market-researcher/scripts/keyword_suggest.py` in both English (`--lang en --expand-intents`) and Arabic (`--lang ar --expand-intents`) to capture unbranded founder discovery queries, commercial evaluation terms, and regional GCC/Egypt operational software demand without fabricating search volume metrics.

### Seed Harvest Summary

| Seed Query | Locale & Intent Expansion | Top Observed Autocomplete Suggestions | Target Route |
| --- | --- | --- | --- |
| `mvp development studio` | `en: alternative, pricing, vs, for, how to` | `mvp development studio`; `mvp development company for startups`; `mvp development company in uk`; `what is mvp in product development`; `what is mvp in app development` | `/` |
| `build an app idea` | `en: alternative, pricing, vs, for, how to` | `build my app idea`; `how to develop an app idea`; `how to start an app idea`; `how to build an app idea` | `/` |
| `mvp agency` | `en: alternative, pricing, vs, for, how to` | `agency mvp pricing`; `mvp cost`; `mvp vs full product`; `mvp vs mve`; `mvp agency` | `/services` |
| `custom software studio` | `en: alternative, pricing, vs, for, how to` | `custom software studio`; `custom software examples` | `/work` |
| `sunmi pos integration` | `en: alternative, pricing, vs, for, how to` | `sunmi pos integration`; `sunmi pos system`; `sunmi pos system price`; `sunmi pos system t2` | `/services` |
| `شركة برمجة تطبيقات` | `ar: سعر, تكلفة, أفضل شركة, للشركات الناشئة, كيف, في السعودية, في مصر` | `شركة برمجة تطبيقات في السعودية`; `أفضل شركة برمجة تطبيقات في السعودية`; `شركة برمجة تطبيقات في مصر`; `أفضل شركة برمجة تطبيقات في مصر`; `شركة برمجة تطبيقات في الرياض`; `شركة برمجة تطبيقات في الامارات` | `/ar` |
| `برمجة تطبيقات` | `ar: سعر, تكلفة, أفضل شركة, للشركات الناشئة, كيف, في السعودية, في مصر` | `أفضل شركة برمجة تطبيقات`; `أفضل شركة برمجة تطبيقات في السعودية`; `أفضل شركة برمجة تطبيقات في مصر`; `أفضل شركة برمجة تطبيقات في الكويت`; `برمجة تطبيقات الهواتف الذكية`; `برمجة تطبيقات الويب` | `/ar` |
| `تكلفة تطبيق` | `ar: سعر, تكلفة, أفضل شركة, للشركات الناشئة, كيف, في السعودية, في مصر` | `تكلفة انشاء تطبيق في السعودية`; `تكلفة تصميم تطبيق جوال في السعودية`; `تكلفة انشاء تطبيق في مصر`; `تكلفة تطبيق متجر الكتروني`; `تكلفة تطبيق توصيل` | `/ar` |
| `نظام نقاط بيع` | `ar: سعر, تكلفة, أفضل شركة, للشركات الناشئة, كيف, في السعودية, في مصر` | `نظام نقاط بيع pos`; `نظام نقاط بيع سحابي`; `نقاط بيع في السعودية`; `افضل نظام نقاط بيع` | `/ar` |

*Note on zero-count long-tail expansions:* Niche phrases such as `turn app idea into mvp`, `custom operations software`, `تنفيذ فكرة تطبيق`, `بناء MVP`, and `لوحة تحكم عربية` returned `0` extra intent-modifier completions in Google Autocomplete due to long-tail specificity; secondary buyer vocabulary for those segments is grounded directly in verbatim ICP queries from `docs/positioning-brief.md` and `.agents/product-marketing.md`.

### Clustered Buyer Intent Map

| Cluster Name | Intent Stage | Primary Keyword | Secondary Buyer Phrases | Mapped Route | Proof / Angle from Positioning Brief |
| --- | --- | --- | --- | --- | --- |
| **Unbranded Idea-to-MVP Discovery (EN)** | Unbranded Discovery | `build my app idea` | `how to develop an app idea`, `how to start an app idea`, `mvp development company for startups`, `"I have an app idea, who can build an MVP?"` | `/` | `Product Blueprint` in 3-5 business days (`From $300`, 100% credited) + `Launch Sprint` in 2-5 weeks (`From $1,800`), backed by `10K+` `HS VPN` Google Play downloads |
| **Bilingual GCC & Egypt App / POS Discovery (AR)** | Bilingual Discovery & Commercial (AR) | `أفضل شركة برمجة تطبيقات في السعودية` | `تكلفة انشاء تطبيق في السعودية`, `تكلفة تصميم تطبيق جوال في السعودية`, `شركة برمجة تطبيقات في مصر`, `نظام نقاط بيع pos`, `"عندي فكرة تطبيق مين يبرمجها؟"`, `"كم تكلفة بناء تطبيق MVP؟"` | `/ar` | Arabic-first RTL engineering from Cairo for Saudi Arabia, GCC, Egypt, and UK; `Glitre Loyalty Platform` (4 RTL surfaces), `QuickChargingPOS` (Sunmi + Mada), and `Qiraaty` (ZATCA + Moyasar) |
| **Shipped Portfolio & Technical Proof (EN)** | Validation / Navigational | `custom software examples` | `custom software studio`, `Flutter and NestJS portfolio`, `Sunmi Android POS case study`, `Arabic RTL web dashboard examples` | `/work` | 13 verified builds across 6 flagship case studies (`Glitre`, `HS VPN`, `QuickChargingPOS`, `MedConnect Egypt`, `StayEase`, `Classroom Sentinel`) and 7 R&D/product builds |
| **Commercial Pricing, Comparison & Operations Platforms (EN)** | Commercial & Comparison | `agency mvp pricing` | `mvp cost`, `mvp vs full product`, `sunmi pos integration`, `replace WhatsApp and spreadsheets with custom operations platform`, `monthly product engineering retainer no lock-in` | `/services` | 4-tier fixed-scope ladder (`From $300` Blueprint, `From $1,800` Launch Sprint, `From $4,000 (Phase 1)` Operations Platform, `From $250/mo` Product Care) + 3-prong Economic & Speed Mechanism |
| **Contract-First Engineering Process & Informational Trust (EN)** | Informational & Comparison | `what is mvp in product development` | `contract-first OpenAPI architecture`, `Cairo GCC UK software engineering overlap`, `automated software verification gates`, `fixed-scope sprint vs agency retainer` | `/studio` | Direct senior Cairo studio (`Africa/Cairo` overlapping `Asia/Riyadh` & `Europe/London`), 5 Studio Engineering Signatures, `Classroom Sentinel` 24/7 daemon, and `AgencyOS` governance |
| **Blueprint & Project Intake (EN)** | High-Intent Conversion | `start mvp product blueprint` | `book software scoping call`, `contact Kepler Dev`, `hello@keplerdev.uk` | `/contact` | Low-friction intake for `Product Blueprint` (`From $300`, 100% credited toward build) with fast response across Cairo, GCC, and UK business hours |
| **Legal Trading Identity & Data Minimization (EN)** | Trust / Compliance | `Kepler Dev privacy policy` | `Mahmoud Attia trading as Kepler Dev`, `studio legal notice Cairo Egypt`, `client data minimization policy` | `/privacy` | Transparent legal identity (`Mahmoud Attia, trading as Kepler Dev`, Cairo, Egypt), `hello@keplerdev.uk`, and zero fabricated corporate filings |

## 2. Multi-Route Metadata Table (<title>, <meta description>, Canonical & hreflang)

Every `<title>` is strictly `45-60` characters and every `<meta description>` is strictly `135-160` characters. All canonical URLs begin with `https://www.keplerdev.uk`, covering every route in `required_routes`. Escaped pipes (`\|`) preserve table structure while indicating rendered pipe separators.

| Route | Title | Title Chars | Meta Description | Desc Chars | Canonical URL | hreflang |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Custom App, MVP & Operations Studio \| Kepler Dev | `48` | Cairo software studio shipping fixed-scope MVPs in 2-5 weeks and bilingual operations platforms from $300 blueprints, backed by 10K+ app downloads. | `147` | https://www.keplerdev.uk/ | `en, ar, x-default` |
| `/ar` | شركة برمجة تطبيقات ولوحات تحكم عربية \| Kepler Dev | `49` | ستوديو هندسي من القاهرة لبناء تطبيقات الجوال، أنظمة نقاط بيع Sunmi، ولوحات التحكم العربية بأسعار تبدأ من $300 خلال 2-5 أسابيع للسعودية ومصر والخليج. | `148` | https://www.keplerdev.uk/ar | `ar, en, x-default` |
| `/work` | 13 Shipped Apps, Sunmi POS & SaaS Builds \| Kepler Dev | `53` | Inspect 13 production builds by Kepler Dev across Saudi Arabia, Egypt, and the UK, including 10K+ Google Play installs, Sunmi POS, and Azure UAE dashboards. | `156` | https://www.keplerdev.uk/work | `en, x-default` |
| `/services` | MVP Pricing, Launch Sprints & Platforms \| Kepler Dev | `52` | Compare Kepler Dev's 4 fixed-scope tiers from $300 Blueprints to $1,800 Launch Sprints and $4,000 Operations Platforms, with direct senior Cairo delivery. | `154` | https://www.keplerdev.uk/services | `en, x-default` |
| `/studio` | Contract-First OpenAPI Engineering Team \| Kepler Dev | `52` | Meet our Cairo engineering team overlapping Riyadh and London hours. Contract-first OpenAPI specs, native hardware bridges, and strict verification gates. | `154` | https://www.keplerdev.uk/studio | `en, x-default` |
| `/contact` | Start a $300 Product Blueprint Call \| Kepler Dev | `48` | Send your app idea or operations scope to hello@keplerdev.uk. Book a 20-minute call across Cairo, GCC, and UK hours to start a credited $300 Blueprint. | `151` | https://www.keplerdev.uk/contact | `en, x-default` |
| `/privacy` | Privacy Policy & Trading Identity \| Kepler Dev | `46` | Read Kepler Dev's plain-language privacy policy and honest trading identity: Mahmoud Attia, trading as Kepler Dev in Cairo, Egypt, with minimal data handling. | `158` | https://www.keplerdev.uk/privacy | `en, x-default` |

## 3. Semantic Heading Hierarchy (H1 -> H2 -> H3) Across Core Routes

Each route enforces a single `<h1>` aligned with its primary keyword cluster, followed by logical `<h2>` buyer-evaluation sections and `<h3>` sub-headings without skipped heading levels.

### Route: `/`
- **H1:** Build Your App Idea or Replace Manual Operations in 2 to 5 Weeks
  - **H2:** Why Early-Stage Founders and Operations Teams Stall Between Agencies and Freelancers
    - **H3:** Agency Discovery Overhead vs. Direct Cairo Engineering Economics
    - **H3:** Fragile Freelance Glue Code vs. Contract-First OpenAPI Architecture
  - **H2:** Four Fixed-Scope Offers From $300 Technical Blueprints to Phased Platforms
    - **H3:** Product Blueprint — Decision-Ready Scope in 3-5 Business Days (From $300, 100% Credited)
    - **H3:** Launch Sprint — Production Web or Mobile MVP in 2-5 Weeks (From $1,800)
    - **H3:** Operations Platform — Multi-Surface Apps, Sunmi POS & RTL Dashboards (From $4,000 Phase 1)
    - **H3:** Product Care — Ongoing Monthly Engineering Capacity Without Lock-In (From $250/mo)
  - **H2:** Production Proof Across Mobile, Sunmi POS & Bilingual Web Systems
    - **H3:** Glitre Loyalty Platform — 4 Surfaces, 60 OpenAPI Operations & Zero WCAG Violations
    - **H3:** HS VPN — 10K+ Google Play Downloads With Native Kotlin and Swift Bridges
    - **H3:** QuickChargingPOS — Signed Mada Payments on Physical Sunmi Terminals
  - **H2:** Frequently Asked Questions About MVP Costs, Timelines & Studio Delivery
    - **H3:** How can founders turn an app idea into an affordable MVP without agency markup?
    - **H3:** How much does a custom app or operations platform cost and how fast does Kepler Dev ship?
    - **H3:** How is Kepler Dev different from traditional digital agencies and freelance developers?
    - **H3:** What production proof backs Kepler Dev's mobile apps, Sunmi POS terminals, and bilingual platforms?

### Route: `/ar`
- **H1:** شركة برمجة تطبيقات ومنصات عمليات ولوحات تحكم عربية خلال 2 إلى 5 أسابيع
  - **H2:** لماذا تتعثر الأفكار والشركات بين الوكالات المكلفة والمستقلين غير الموثقين؟
    - **H3:** تنفيذ هندسي مباشر من القاهرة بتداخل كامل مع ساعات العمل في السعودية والخليج ولندن
    - **H3:** عقد OpenAPI موحد يربط تطبيقات الجوال وأجهزة نقاط البيع ولوحة التحكم العربية
  - **H2:** باقات التطوير والتسعير الواضحة بدءاً من $300
    - **H3:** مخطط المنتج (Product Blueprint) — نطاق عمل وخطة تقنية خلال 3-5 أيام عمل بدءاً من $300
    - **H3:** سباق الإطلاق (Launch Sprint) — إطلاق نسخة MVP إنتاجية خلال 2-5 أسابيع بدءاً من $1,800
    - **H3:** منصة العمليات (Operations Platform) — تطبيقات ميدانية وأجهزة Sunmi POS بدءاً من $4,000
    - **H3:** رعاية المنتج (Product Care) — تطوير وصيانة شهرية مرنة بدءاً من $250 شهرياً
  - **H2:** أنظمة إنتاجية منشورة في السعودية والخليج ومصر
    - **H3:** منصة جليتر للولاء — أربع واجهات عربية RTL في Azure UAE North
    - **H3:** نظام QuickChargingPOS — مدفوعات مدى الموقعة على أجهزة Sunmi POS
    - **H3:** منصة قراءتي — امتثال الفوترة الإلكترونية ZATCA ومدفوعات ميسر
  - **H2:** الأسئلة الشائعة حول تكلفة بناء التطبيقات ومراحل التسليم
    - **H3:** عندي فكرة تطبيق أو منصة SaaS، كيف أبدأ مع كيبلر ديف بدون مخاطرة؟
    - **H3:** كم تكلفة تطوير التطبيق أو منصة العمليات وما مدة التسليم الفعلية؟
    - **H3:** ما الفرق بين كيبلر ديف والوكالات التقليدية والمستقلين؟
    - **H3:** ما الأنظمة الحقيقية التي تثبت خبرة كيبلر ديف في السعودية والخليج؟

### Route: `/work`
- **H1:** 13 Shipped Mobile Apps, Sunmi POS Systems & Bilingual Platforms
  - **H2:** Flagship Production & Multi-Surface Case Studies
    - **H3:** Glitre Loyalty Platform — GCC Fuel-Station Ecosystem (60 OpenAPI Operations)
    - **H3:** HS VPN — Anti-DPI Consumer VPN With 10K+ Google Play Downloads
    - **H3:** QuickChargingPOS — Physical Sunmi Android POS & SkyBand Mada Bridge
    - **H3:** MedConnect Egypt — 38+ Screen Healthcare & Geofence Referral Platform
    - **H3:** StayEase — 40+ Screen Hospitality Booking With TTL Room Locks
    - **H3:** Classroom Sentinel — 24/7 Schema-Constrained Arabic/English AI Daemon
  - **H2:** Studio Showcase & R&D Engineering Builds
    - **H3:** Aksira AI Keyboard, FitForge, Qiraaty (ZATCA) & Focus Ritual
    - **H3:** GetLab System, AI Collab Platform & AgencyOS Governance

### Route: `/services`
- **H1:** Transparent Software Pricing, Fixed-Scope Sprints & Operations Platforms
  - **H2:** Compare Our Four Engagement Tiers & Explicit Scope Boundaries
    - **H3:** Product Blueprint (From $300 | 3-5 Business Days | 100% Credited)
    - **H3:** Launch Sprint (From $1,800 | 2-5 Weeks)
    - **H3:** Operations Platform (From $4,000 Phase 1 | 5-10 Weeks Phased)
    - **H3:** Product Care (From $250/mo | Monthly Client-Owned Backlog)
  - **H2:** How Our Economic & Speed Mechanism Protects Budget and Quality
    - **H3:** Direct Cairo Senior Engineering Without Account-Manager Markup
    - **H3:** Contract-First OpenAPI Specs & Automated Scaffolding Elimination
    - **H3:** Mandatory Independent Verification Gates Before Release

### Route: `/studio`
- **H1:** Contract-First Engineering Studio Built in Cairo for GCC & UK Teams
  - **H2:** Five Studio Engineering Signatures Behind Every Release
    - **H3:** Contract-First Multi-Surface Systems & CI Schema-Drift Checks
    - **H3:** Offline-First Field Queues, Native Bridges & Idempotent Financial Ledgers
    - **H3:** Bounded, Schema-Validated AI Pipelines Running 24/7
  - **H2:** Operating Footprint, Governance & Honest Studio Identity
    - **H3:** Same-Day Timezone Overlap Across Cairo, Riyadh & London
    - **H3:** AgencyOS Milestone Checkpoints & Verified Studio Credentials

### Route: `/contact`
- **H1:** Start Your Credited $300 Product Blueprint or Project Scoping Call
  - **H2:** Share Your Goal, Target Surfaces & Timeline
    - **H3:** Idea-Stage Founders — Scope Your MVP Before Writing Code
    - **H3:** Operations Leads — Replace WhatsApp & Spreadsheets in Phased Releases
  - **H2:** Direct Studio Contact & Next-Step Expectations
    - **H3:** Email hello@keplerdev.uk or Book Across Cairo, GCC & UK Hours

### Route: `/privacy`
- **H1:** Privacy Policy & Legal Trading Identity for Kepler Dev
  - **H2:** Honest Legal & Trading Identity
    - **H3:** Mahmoud Attia, Trading as Kepler Dev (Cairo, Egypt)
  - **H2:** Project Inquiry Data Minimization & Retention
    - **H3:** How Briefs Sent to hello@keplerdev.uk Are Handled

## 4. AI Search (GEO) Citability & Query Fan-Out (40-60 Words Each)

Each blockquote below is strictly `40-60` words, self-contained, and engineered for generative search query fan-out across both English and native Arabic unbranded discovery prompts.

### Block 1 — Top-of-Page Entity Identity Block (55 words)

> Kepler Dev is a contract-first bilingual digital product and operational software engineering studio in Cairo serving founders and SMEs across Saudi Arabia, the GCC, Egypt, and the UK. We deliver Product Blueprints from $300 in 3-5 business days and Launch Sprints from $1,800 in 2-5 weeks, backed by 10K+ Google Play installs on HS VPN.

### Block 2 — FAQ 1: How can founders turn an app idea into an affordable MVP without agency markup? (58 words)

> Founders with an app or SaaS idea can start with a Kepler Dev Product Blueprint from $300 in 3-5 business days, 100% credited toward development. The Blueprint delivers workflow scope, an OpenAPI system plan, and a fixed estimate before a Launch Sprint ships a production web or mobile v1 in 2-5 weeks across GCC, Egypt, and UK markets.

### Block 3 — FAQ 2: How much does a custom app or operations platform cost and how fast does Kepler Dev ship? (53 words)

> Kepler Dev prices fixed-scope builds transparently across four tiers: Product Blueprint from $300 in 3-5 business days, Launch Sprint from $1,800 in 2-5 weeks, phased Operations Platform from $4,000 in 5-10 weeks, and Product Care from $250/mo. Direct senior Cairo engineering removes agency overhead while contract-first OpenAPI specs and automated scaffolding accelerate delivery.

### Block 4 — FAQ 3: How is Kepler Dev different from traditional digital agencies and freelance developers? (55 words)

> Unlike high-overhead agencies charging account-manager markups or unverified freelancers shipping brittle glue code, Kepler Dev pairs direct senior Cairo engineers with contract-first OpenAPI schemas and mandatory independent verification gates. Across Glitre Loyalty Platform, one OpenAPI contract unified 4 surfaces, 60 operations, 30 data models, and scored zero WCAG 2.1 AA violations across 36 audited captures.

### Block 5 — FAQ 4: What production proof backs Kepler Dev's mobile apps, Sunmi POS terminals, and bilingual platforms? (51 words)

> Kepler Dev ships production mobile apps, Arabic-first RTL dashboards, and industrial hardware integrations for Saudi, GCC, Egyptian, and UK clients. Verified systems include QuickChargingPOS running signed SkyBand Mada payments on physical Sunmi Android POS terminals, Glitre live in Azure UAE North, MedConnect Egypt across 38+ screens, and Classroom Sentinel operating 24/7.

### Block 6 — Arabic Entity Identity Block (55 words)

> كيبلر ديف (Kepler Dev) ستوديو هندسي لتطوير التطبيقات والمنصات التشغيلية من القاهرة يخدم رواد الأعمال والشركات في السعودية والخليج ومصر وبريطانيا. نبدأ بمخطط المنتج بدءاً من $300 خلال 3-5 أيام عمل، ونطلق النسخة الأولى بدءاً من $1,800 خلال 2-5 أسابيع، مع سجل موثق يضم أكثر من 10 آلاف تحميل لتطبيق HS VPN على جوجل بلاي.

### Block 7 — Arabic FAQ 1: عندي فكرة تطبيق أو منصة SaaS، كيف أبدأ مع كيبلر ديف بدون مخاطرة؟ (50 words)

> رواد الأعمال الباحثون عن تنفيذ فكرة تطبيق أو منصة SaaS يبدأون مع كيبلر ديف بمخطط المنتج بدءاً من $300 خلال 3-5 أيام عمل، وتُخصم قيمته كاملة عند التنفيذ. يشمل المخطط نطاق العمل، وخطة OpenAPI، وجدول التسليم، وتكلفة ثابتة واضحة قبل إطلاق النسخة الأولى في السعودية ومصر والخليج خلال 2-5 أسابيع.

### Block 8 — Arabic FAQ 2: كم تكلفة تطوير التطبيق أو منصة العمليات وما مدة التسليم الفعلية؟ (49 words)

> تعتمد كيبلر ديف أربع باقات واضحة: مخطط المنتج بدءاً من $300، وسباق الإطلاق بدءاً من $1,800 خلال 2-5 أسابيع، ومنصة العمليات بدءاً من $4,000 للمرحلة الأولى خلال 5-10 أسابيع، ورعاية المنتج بدءاً من $250 شهرياً. التنفيذ المباشر من فريق القاهرة يلغي رسوم الوسطاء، وعقد OpenAPI الموحد يمنع إعادة العمل.

### Block 9 — Arabic FAQ 3: ما الفرق بين كيبلر ديف والوكالات التقليدية والمستقلين؟ (51 words)

> تتفوق كيبلر ديف على الوكالات التقليدية بطيئة التنفيذ والمستقلين غير الموثقين عبر هندسة مباشرة من القاهرة بتداخل ساعات العمل مع الرياض ولندن، وعقود OpenAPI موحدة، وبوابات تحقق مستقلة لكل إصدار. في منصة جليتر للولاء، وحّد عقد واحد أربع واجهات عربية RTL و60 عملية برمجية دون أي مخالفات إتاحة WCAG 2.1 AA.

### Block 10 — Arabic FAQ 4: ما الأنظمة الحقيقية التي تثبت خبرة كيبلر ديف في السعودية والخليج؟ (52 words)

> تثبت كيبلر ديف جاهزيتها الإنتاجية عبر أنظمة فعلية تعمل في الخليج ومصر، منها نظام QuickChargingPOS على أجهزة Sunmi POS لمدفوعات مدى عبر SkyBand، ومنصة جليتر على Azure UAE North بسجل نقاط غير قابل للتعديل، ومنصة قراءتي المتوافقة مع الفوترة الإلكترونية ZATCA ومدفوعات ميسر، إضافة إلى أكثر من 38 شاشة في MedConnect Egypt.

## 5. Production @graph JSON-LD Structured Data

Single linked `@graph` schema satisfying `Organization`, `ProfessionalService`, `WebSite`, `Service`, `Offer`, `PriceSpecification`, `areaServed`, `knowsAbout`, verified `sameAs`, and bilingual EN/AR `FAQPage` synced verbatim with Section 4 (and zero `Person` schema).

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://www.keplerdev.uk/#organization",
      "name": "Kepler Dev",
      "legalName": "Mahmoud Attia, trading as Kepler Dev",
      "url": "https://www.keplerdev.uk/",
      "email": "hello@keplerdev.uk",
      "description": "Contract-first bilingual (Arabic-first RTL and English) digital product and operational software engineering studio in Cairo serving founders and SMEs across Saudi Arabia, the GCC, Egypt, and the UK.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cairo",
        "addressCountry": "EG"
      },
      "areaServed": ["SA", "AE", "QA", "KW", "EG", "GB"],
      "knowsAbout": [
        "Contract-First OpenAPI Architecture",
        "MVP Development for Founders",
        "Flutter and React Native Mobile Apps",
        "Arabic-First RTL Web Dashboards",
        "Sunmi Android POS and Mada Payments",
        "Idempotent Financial Ledgers and Webhooks",
        "Bounded Schema-Validated AI Systems"
      ],
      "sameAs": [
        "https://github.com/mahmouddattiaa",
        "https://www.linkedin.com/in/mahmoud-attia-b372b0352"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.keplerdev.uk/#website",
      "url": "https://www.keplerdev.uk/",
      "name": "Kepler Dev",
      "inLanguage": ["en", "ar"],
      "publisher": {
        "@id": "https://www.keplerdev.uk/#organization"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.keplerdev.uk/#service-blueprint",
      "name": "Product Blueprint",
      "description": "Decision-ready technical direction delivered in 3-5 business days: workflow scope, OpenAPI and system plan, first-release boundaries, milestone schedule, and fixed build estimate 100% credited toward the build.",
      "provider": {
        "@id": "https://www.keplerdev.uk/#organization"
      },
      "areaServed": ["SA", "AE", "QA", "KW", "EG", "GB"],
      "offers": {
        "@id": "https://www.keplerdev.uk/#offer-blueprint"
      }
    },
    {
      "@type": "Offer",
      "@id": "https://www.keplerdev.uk/#offer-blueprint",
      "name": "Product Blueprint (3-5 Business Days, 100% Credited)",
      "url": "https://www.keplerdev.uk/services",
      "priceCurrency": "USD",
      "itemOffered": {
        "@id": "https://www.keplerdev.uk/#service-blueprint"
      },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": 300,
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.keplerdev.uk/#service-launch-sprint",
      "name": "Launch Sprint",
      "description": "Production v1 web or mobile MVP delivered in 2-5 weeks with core user journey, role permissions, backend API and database, lightweight admin console, and direct cloud deployment.",
      "provider": {
        "@id": "https://www.keplerdev.uk/#organization"
      },
      "areaServed": ["SA", "AE", "QA", "KW", "EG", "GB"],
      "offers": {
        "@id": "https://www.keplerdev.uk/#offer-launch-sprint"
      }
    },
    {
      "@type": "Offer",
      "@id": "https://www.keplerdev.uk/#offer-launch-sprint",
      "name": "Launch Sprint (2-5 Weeks)",
      "url": "https://www.keplerdev.uk/services",
      "priceCurrency": "USD",
      "itemOffered": {
        "@id": "https://www.keplerdev.uk/#service-launch-sprint"
      },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": 1800,
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.keplerdev.uk/#service-operations-platform",
      "name": "Operations Platform",
      "description": "Phased 5-10 week multi-surface operational platform uniting customer apps, staff or Sunmi Android POS field surfaces, Arabic-first RTL head-office dashboards, one shared OpenAPI contract, and an idempotent ledger.",
      "provider": {
        "@id": "https://www.keplerdev.uk/#organization"
      },
      "areaServed": ["SA", "AE", "QA", "KW", "EG", "GB"],
      "offers": {
        "@id": "https://www.keplerdev.uk/#offer-operations-platform"
      }
    },
    {
      "@type": "Offer",
      "@id": "https://www.keplerdev.uk/#offer-operations-platform",
      "name": "Operations Platform (Phase 1, 5-10 Weeks Phased)",
      "url": "https://www.keplerdev.uk/services",
      "priceCurrency": "USD",
      "itemOffered": {
        "@id": "https://www.keplerdev.uk/#service-operations-platform"
      },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": 4000,
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.keplerdev.uk/#service-product-care",
      "name": "Product Care",
      "description": "Agreed monthly engineering capacity against a client-owned backlog covering feature increments, dependency updates, verification checks, and production stability fixes without retainer lock-in.",
      "provider": {
        "@id": "https://www.keplerdev.uk/#organization"
      },
      "areaServed": ["SA", "AE", "QA", "KW", "EG", "GB"],
      "offers": {
        "@id": "https://www.keplerdev.uk/#offer-product-care"
      }
    },
    {
      "@type": "Offer",
      "@id": "https://www.keplerdev.uk/#offer-product-care",
      "name": "Product Care (Monthly Engineering Capacity)",
      "url": "https://www.keplerdev.uk/services",
      "priceCurrency": "USD",
      "itemOffered": {
        "@id": "https://www.keplerdev.uk/#service-product-care"
      },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": 250,
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.keplerdev.uk/#faq",
      "inLanguage": ["en", "ar"],
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How can founders turn an app idea into an affordable MVP without agency markup?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Founders with an app or SaaS idea can start with a Kepler Dev Product Blueprint from $300 in 3-5 business days, 100% credited toward development. The Blueprint delivers workflow scope, an OpenAPI system plan, and a fixed estimate before a Launch Sprint ships a production web or mobile v1 in 2-5 weeks across GCC, Egypt, and UK markets."
          }
        },
        {
          "@type": "Question",
          "name": "How much does a custom app or operations platform cost and how fast does Kepler Dev ship?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kepler Dev prices fixed-scope builds transparently across four tiers: Product Blueprint from $300 in 3-5 business days, Launch Sprint from $1,800 in 2-5 weeks, phased Operations Platform from $4,000 in 5-10 weeks, and Product Care from $250/mo. Direct senior Cairo engineering removes agency overhead while contract-first OpenAPI specs and automated scaffolding accelerate delivery."
          }
        },
        {
          "@type": "Question",
          "name": "How is Kepler Dev different from traditional digital agencies and freelance developers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike high-overhead agencies charging account-manager markups or unverified freelancers shipping brittle glue code, Kepler Dev pairs direct senior Cairo engineers with contract-first OpenAPI schemas and mandatory independent verification gates. Across Glitre Loyalty Platform, one OpenAPI contract unified 4 surfaces, 60 operations, 30 data models, and scored zero WCAG 2.1 AA violations across 36 audited captures."
          }
        },
        {
          "@type": "Question",
          "name": "What production proof backs Kepler Dev's mobile apps, Sunmi POS terminals, and bilingual platforms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kepler Dev ships production mobile apps, Arabic-first RTL dashboards, and industrial hardware integrations for Saudi, GCC, Egyptian, and UK clients. Verified systems include QuickChargingPOS running signed SkyBand Mada payments on physical Sunmi Android POS terminals, Glitre live in Azure UAE North, MedConnect Egypt across 38+ screens, and Classroom Sentinel operating 24/7."
          }
        },
        {
          "@type": "Question",
          "name": "عندي فكرة تطبيق أو منصة SaaS، كيف أبدأ مع كيبلر ديف بدون مخاطرة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "رواد الأعمال الباحثون عن تنفيذ فكرة تطبيق أو منصة SaaS يبدأون مع كيبلر ديف بمخطط المنتج بدءاً من $300 خلال 3-5 أيام عمل، وتُخصم قيمته كاملة عند التنفيذ. يشمل المخطط نطاق العمل، وخطة OpenAPI، وجدول التسليم، وتكلفة ثابتة واضحة قبل إطلاق النسخة الأولى في السعودية ومصر والخليج خلال 2-5 أسابيع."
          }
        },
        {
          "@type": "Question",
          "name": "كم تكلفة تطوير التطبيق أو منصة العمليات وما مدة التسليم الفعلية؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تعتمد كيبلر ديف أربع باقات واضحة: مخطط المنتج بدءاً من $300، وسباق الإطلاق بدءاً من $1,800 خلال 2-5 أسابيع، ومنصة العمليات بدءاً من $4,000 للمرحلة الأولى خلال 5-10 أسابيع، ورعاية المنتج بدءاً من $250 شهرياً. التنفيذ المباشر من فريق القاهرة يلغي رسوم الوسطاء، وعقد OpenAPI الموحد يمنع إعادة العمل."
          }
        },
        {
          "@type": "Question",
          "name": "ما الفرق بين كيبلر ديف والوكالات التقليدية والمستقلين؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تتفوق كيبلر ديف على الوكالات التقليدية بطيئة التنفيذ والمستقلين غير الموثقين عبر هندسة مباشرة من القاهرة بتداخل ساعات العمل مع الرياض ولندن، وعقود OpenAPI موحدة، وبوابات تحقق مستقلة لكل إصدار. في منصة جليتر للولاء، وحّد عقد واحد أربع واجهات عربية RTL و60 عملية برمجية دون أي مخالفات إتاحة WCAG 2.1 AA."
          }
        },
        {
          "@type": "Question",
          "name": "ما الأنظمة الحقيقية التي تثبت خبرة كيبلر ديف في السعودية والخليج؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تثبت كيبلر ديف جاهزيتها الإنتاجية عبر أنظمة فعلية تعمل في الخليج ومصر، منها نظام QuickChargingPOS على أجهزة Sunmi POS لمدفوعات مدى عبر SkyBand، ومنصة جليتر على Azure UAE North بسجل نقاط غير قابل للتعديل، ومنصة قراءتي المتوافقة مع الفوترة الإلكترونية ZATCA ومدفوعات ميسر، إضافة إلى أكثر من 38 شاشة في MedConnect Egypt."
          }
        }
      ]
    }
  ]
}
```

## 6. Copywriter & Frontend Handoff Rules

- **Copywriter (Role 1.3):** Preserve every `<title>`, `<meta description>`, `H1` intent alignment, and all `40-60 word` GEO identity and FAQ answer blocks (EN Blocks 1-5 and AR Blocks 6-10) verbatim unless re-audited through `seo_audit.py --verify`.
- **Voice, Legal Identity & Bindings:** Maintain `brand_plural` (`"we"`, `"our"`, `"Kepler Dev"`, `"our engineering team"`) in all marketing prose; never emit unquoted `I`, `my`, or `myself`. In `/privacy` and legal notices, state `Mahmoud Attia, trading as Kepler Dev` (Cairo, Egypt) and `hello@keplerdev.uk`. Keep Arabic pricing lines strictly in native units (`بدءاً من $250 شهرياً`, never `/mo`). Exclude all `forbidden_tokens` from `.kepler/stage-1-bindings.json` and unverified claims (such as uncreated directory URLs or years in business).
- **Frontend Implementation:** Render the Section 5 `@graph` JSON-LD inside a single `<script type="application/ld+json">` on the primary entry surfaces (keeping `FAQPage` questions synchronized per locale), output `<link rel="canonical">` and bidirectional `hreflang` (`en`, `ar`, `x-default`) per Section 2, and enforce one `<h1>` per route with zero skipped heading levels.
- **Internal Linking:** Connect every case study, `/work`, `/studio`, and `/ar` back to `/services` and `/contact` using descriptive intent-aligned anchor text (`Product Blueprint`, `Launch Sprint`, `Operations Platform`, `مخطط المنتج`, `سباق الإطلاق`).
- **`/llms.txt` & AI Crawler Policy (`robots.txt`):**
  - **`robots.txt` AI Search & Training Crawler Directives:** Explicitly configure user-agent rules for `OAI-SearchBot`, `GPTBot`, `PerplexityBot`, `ClaudeBot`, and `Google-Extended`:
    - **Allow for live search retrieval & citation:** `OAI-SearchBot`, `PerplexityBot`, and `ClaudeBot` must have `Allow: /`, `Allow: /ar`, `Allow: /work`, `Allow: /services`, `Allow: /studio`, `Allow: /contact`, and `Allow: /llms.txt` (never block `/llms.txt` or `/ar`).
    - **Explicit policy for model-training crawlers (`GPTBot` and `Google-Extended`):** Allow `GPTBot` and `Google-Extended` on public marketing routes (`/`, `/ar`, `/work`, `/services`, `/studio`, `/llms.txt`) so AI overviews and commercial assistants surface accurate pricing, capabilities, and proof points, while keeping private/admin/API paths (`/api/`, `/admin/`) disallowed across all bots.
  - **Bilingual `/llms.txt` File Specification:** Publish `https://www.keplerdev.uk/llms.txt` as concise plain Markdown containing:
    1. **Entity & Category:** `Kepler Dev` (`Mahmoud Attia, trading as Kepler Dev`, Cairo, Egypt) — contract-first bilingual (Arabic-first RTL and English) digital product and operational software engineering studio serving Saudi Arabia, the GCC, Egypt, and the UK.
    2. **Offers, Cycle Times & Starting Prices:** `Product Blueprint` (`From $300`, 3-5 business days, 100% credited), `Launch Sprint` (`From $1,800`, 2-5 weeks), `Operations Platform` (`From $4,000 Phase 1`, 5-10 weeks phased), `Product Care` (`From $250/mo`; Arabic: `بدءاً من $250 شهرياً`), plus the 3-prong Economic & Speed Mechanism.
    3. **Verified Proof Summary:** `Glitre Loyalty Platform` (4 surfaces, 60 OpenAPI ops, Azure UAE North, 0 WCAG violations), `HS VPN` (`10K+` Google Play downloads), `QuickChargingPOS` (Sunmi Android POS + signed Mada/SkyBand payments), `MedConnect Egypt` (`38+` screens), `StayEase` (`40+` screen assets), `Classroom Sentinel` (24/7 AI daemon), and `Qiraaty` (ZATCA + Moyasar).
    4. **Canonical Route Map (EN & AR):** One-line summaries and canonical links for `/`, `/ar`, `/work`, `/services`, `/studio`, `/contact`, and `/privacy`.
    5. **Schema & Contact Pointer:** Reference to the on-page `@graph` JSON-LD (`Organization` / `ProfessionalService`, `Service`, `Offer` + `PriceSpecification`, `FAQPage`), verified `sameAs` (`https://github.com/mahmouddattiaa`, `https://www.linkedin.com/in/mahmoud-attia-b372b0352`), and direct scoping email `hello@keplerdev.uk`.

## 7. Mandatory Self-Audit Checklist

| Check | Requirement | Evidence / Measurement | Status |
| --- | --- | --- | --- |
| 1. Required H2 Structure | All 7 numbered H2 sections present in exact order | Verified via `seo_audit.py --verify` | PASS |
| 2. Keyword Research Grounding | Live EN/AR autocomplete and unbranded discovery queries mapped to routes | `keyword_suggest.py --lang en` and `--lang ar` outputs summarized in Section 1 | PASS |
| 3. Metadata Character Budgets | Every route `<title>` is `45-60` chars and `<meta description>` is `135-160` chars | All 7 routes verified (`46-53` title chars; `147-158` desc chars; `/ar` native Arabic script) | PASS |
| 4. Canonical & Route Coverage | All `required_routes` (`/`, `/ar`, `/work`, `/services`, `/studio`, `/contact`, `/privacy`) aligned to `https://www.keplerdev.uk` | Checked against `.kepler/stage-1-bindings.json` | PASS |
| 5. GEO Citability Word Counts | All 5 EN blocks plus 5 native AR parity blocks strictly `40-60` words | Verified in Section 4 (`49-58` words across all 10 blockquotes) | PASS |
| 6. JSON-LD `@graph` Validity | Valid JSON, `>= 3` entities, `PriceSpecification`, `sameAs`, and required types (`Organization`, `ProfessionalService`, `WebSite`, `Service`, `Offer`, `FAQPage`) with zero `Person` | Parsed and validated in Section 5 (`11` linked `@graph` nodes) | PASS |
| 7. Handoff & Prose Cleanliness | `/llms.txt` + AI crawler policy (`OAI-SearchBot`, `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`) documented; zero buzzwords or voice violations | `seo_audit.py --verify` and `prose_audit.py` exit `0` | PASS |
