# Stage 1 Technical GEO & AI Search Verification Report

**Project:** Kepler Dev
**Canonical Origin:** `https://www.keplerdev.uk`
**Locales:** `en, ar`
**Target Repo Surfaces:** `public/llms.txt`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/layout.tsx`

---

## 1. Technical GEO Surface Inventory (llms.txt, robots, sitemap, JSON-LD)

| Surface | Path Checked | Status | Notes |
|---|---|---|---|
| `llms.txt` | `public/llms.txt` | CREATED | AnswerDotAI-compliant bilingual EN + AR Markdown summary with canonical `https://www.keplerdev.uk` links, calibrated pricing (`From $300`, `From $1,800`, `From $4,000`, `From $250/mo`, `بدءاً من $250 شهرياً`), 2–5 week sprint timelines, verified proof, and external `sameAs` links. |
| Robots Policy | `src/app/robots.ts` | UPDATED | Separates AI search/citation bots (`OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `ClaudeBot`, `Claude-SearchBot`, `Bingbot`, `Googlebot`) and training crawlers (`GPTBot`, `Google-Extended`) from `*`, allowing `/` and disallowing `/api/` and `/admin/`, with `host` and `sitemap` set to `https://www.keplerdev.uk`. |
| XML Sitemap | `src/app/sitemap.ts` | PRESENT | Verified emission of all 7 core `required_routes` (`/`, `/ar`, `/work`, `/services`, `/studio`, `/contact`, `/privacy`), 6 public flagship case studies (`/work/[slug]`), and 3 Glitre surface sub-routes under `https://www.keplerdev.uk`. |
| JSON-LD `@graph` | `src/app/layout.tsx` | UPDATED | Deduplicated `@graph` with unique `@id` anchors (removed duplicate `glitre-loyalty-platform#software` node), `Organization`, `ProfessionalService`, `WebSite`, 5 `Service` nodes, 4 `Offer` nodes with `PriceSpecification` in `USD` (`300`, `1800`, `4000`, `250` + `unitCode: "MON"`), `areaServed`, expanded `knowsAbout`, verified `sameAs`, and locale-aware `FAQPage` (zero `Person` type). |

---

## 2. llms.txt Specification & AnswerDotAI Compliance Check

- **H1 Title:** `# Kepler Dev`
- **Blockquote Summary:** Bilingual EN + AR factual summary stating that Kepler Dev (`Mahmoud Attia, trading as Kepler Dev`, Cairo, Egypt) is a contract-first bilingual (Arabic-first RTL and English) digital product and operational software engineering studio serving founders and SMEs across Saudi Arabia, the GCC, Egypt, and the UK, with Product Blueprints from $300 (3–5 business days), Launch Sprints from $1,800 (2–5 weeks), Operations Platforms from $4,000 (Phase 1, 5–10 weeks), and Product Care from $250/mo (`بدءاً من $250 شهرياً`).
- **Curated Link Sections:**
  - `## Core Pages`: Links to `https://www.keplerdev.uk/`, `https://www.keplerdev.uk/ar`, `https://www.keplerdev.uk/work`, `https://www.keplerdev.uk/services`, `https://www.keplerdev.uk/studio`, `https://www.keplerdev.uk/contact`, and `https://www.keplerdev.uk/privacy`.
  - `## Services & Pricing`: Canonical `https://www.keplerdev.uk/services` anchors detailing all 4 fixed-scope engagements and boundaries.
  - `## Flagship Case Studies & Verified Proof`: Links to `https://www.keplerdev.uk/work/glitre-loyalty-platform`, `hs-vpn`, `quickcharging-pos`, `medconnect-egypt`, `stayease`, and `classroom-sentinel`.
  - `## الصفحات والخدمات باللغة العربية (Arabic Routes & Overview)`: Native Arabic route and offer summaries anchored to `https://www.keplerdev.uk/ar` using `بدءاً من $250 شهرياً`.
  - `## Machine-Readable Endpoints & Verified Profiles`: Links to `https://www.keplerdev.uk/sitemap.xml`, `https://www.keplerdev.uk/robots.txt`, `https://github.com/mahmouddattiaa`, `https://www.linkedin.com/in/mahmoud-attia-b372b0352`, and `mailto:hello@keplerdev.uk`.
- **Bilingual EN + AR Parity (configured):** Verified in `public/llms.txt` — Arabic blockquote paragraph and dedicated Arabic section with `/ar` canonical links and native Arabic duration wording (`بدءاً من $250 شهرياً`).

---

## 3. AI Crawler Access Matrix (robots.ts / robots.txt)

| User-Agent | Category | Policy (`Allow` / `Disallow`) | Scope / Path Rules | Rationale |
|---|---|---|---|---|
| `OAI-SearchBot` | AI Search / Citation | `Allow` (with private exclusions) | `Allow: /`; `Disallow: ["/api/", "/admin/"]` | Enables ChatGPT search indexing and direct source citations across EN and AR routes |
| `ChatGPT-User` | Live User Fetch | `Allow` (with private exclusions) | `Allow: /`; `Disallow: ["/api/", "/admin/"]` | Supports real-time link inspection when buyers query ChatGPT |
| `PerplexityBot` | AI Search / Citation | `Allow` (with private exclusions) | `Allow: /`; `Disallow: ["/api/", "/admin/"]` | Enables Perplexity search indexing and citation retrieval |
| `Perplexity-User` | Live User Fetch | `Allow` (with private exclusions) | `Allow: /`; `Disallow: ["/api/", "/admin/"]` | Supports live user-triggered retrieval inside Perplexity |
| `ClaudeBot` | AI Search / Retrieval | `Allow` (with private exclusions) | `Allow: /`; `Disallow: ["/api/", "/admin/"]` | Keeps Anthropic web retrieval index open for public studio pages |
| `Claude-SearchBot` | AI Search / Citation | `Allow` (with private exclusions) | `Allow: /`; `Disallow: ["/api/", "/admin/"]` | Supports Claude search citation retrieval |
| `Bingbot` | Search Index | `Allow` (with private exclusions) | `Allow: /`; `Disallow: ["/api/", "/admin/"]` | Powers Bing, Microsoft Copilot search, and IndexNow ingestion |
| `Googlebot` | Search Index | `Allow` (with private exclusions) | `Allow: /`; `Disallow: ["/api/", "/admin/"]` | Powers Google Search and AI Overviews |
| `GPTBot` | Model Training | `Allow` (explicit public policy) | `Allow: /`; `Disallow: ["/api/", "/admin/"]` | Studio policy permits model indexing of public marketing, pricing, and `/llms.txt` pages while excluding `/api/` and `/admin/` |
| `Google-Extended` | Model Training | `Allow` (explicit public policy) | `Allow: /`; `Disallow: ["/api/", "/admin/"]` | Studio policy permits Gemini grounding on public pages while keeping private routes disallowed |

---

## 4. Schema.org @graph Entity Map & Typed JSON-LD Verification

- **Deduplication Check:** Verified in `src/app/layout.tsx`. Previously, `softwareRecords` generated a `SoftwareApplication` node for `glitre-loyalty-platform#software` inside `ProfessionalService.mentions`, and a second standalone `glitre-loyalty-platform#software` node existed at the top level of `@graph`. `ProfessionalService.mentions` now references `{ "@id": record["@id"] }`, and `...softwareRecords` emits each flagship `SoftwareApplication` node exactly once at the top level of `@graph`. Zero duplicate `@id` anchors exist across all nodes.
- **Required & Forbidden Types:** Verified presence of `Organization`, `ProfessionalService`, `WebSite`, `Service`, `Offer`, and `FAQPage` inside `@graph`, plus `SoftwareApplication` nodes for public case studies. Zero `Person` nodes are emitted.
- **PriceSpecification & `sameAs`:** All 4 commercial offers emit `Offer` nodes linked via `itemOffered` to their corresponding `Service` nodes, each carrying a nested `PriceSpecification` in `USD` (`minPrice`: `300`, `1800`, `4000`, and `250` with `unitCode: "MON"` for Product Care). `Organization` and `ProfessionalService` emit verified external `sameAs` URLs (`https://github.com/mahmouddattiaa` and `https://www.linkedin.com/in/mahmoud-attia-b372b0352`), 6 `areaServed` `Country` entries, and 10 expanded `knowsAbout` capabilities. `FAQPage` switches `inLanguage` (`"en"` or `"ar"`) and `mainEntity` dynamically from `x-kepler-locale`.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.keplerdev.uk/#organization",
      "name": "Kepler Dev",
      "legalName": "Mahmoud Attia, trading as Kepler Dev",
      "url": "https://www.keplerdev.uk",
      "description": "Independent digital product and software engineering studio in Cairo delivering contract-first bilingual (Arabic-first RTL and English) operational products across Saudi Arabia, the GCC, Egypt, and the United Kingdom.",
      "email": "hello@keplerdev.uk",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cairo",
        "addressCountry": "EG"
      },
      "areaServed": [
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Qatar" },
        { "@type": "Country", "name": "Kuwait" },
        { "@type": "Country", "name": "Egypt" }
      ],
      "knowsAbout": [
        "Contract-First OpenAPI Architecture",
        "Connected mobile applications",
        "Operational dashboards",
        "Backend platforms",
        "Arabic-first RTL web dashboards",
        "Offline-first software",
        "Flutter and React Native mobile apps",
        "Sunmi Android POS and Mada payments",
        "Idempotent financial ledgers and webhooks",
        "Bounded schema-validated AI systems"
      ],
      "sameAs": [
        "https://github.com/mahmouddattiaa",
        "https://www.linkedin.com/in/mahmoud-attia-b372b0352"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.keplerdev.uk/#professional-service",
      "name": "Kepler Dev",
      "url": "https://www.keplerdev.uk",
      "description": "Product engineering services for operations-driven businesses across the UK, Saudi Arabia, GCC, and Egypt.",
      "provider": { "@id": "https://www.keplerdev.uk/#organization" },
      "areaServed": [
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Qatar" },
        { "@type": "Country", "name": "Kuwait" },
        { "@type": "Country", "name": "Egypt" }
      ],
      "sameAs": [
        "https://github.com/mahmouddattiaa",
        "https://www.linkedin.com/in/mahmoud-attia-b372b0352"
      ],
      "mentions": [
        { "@id": "https://www.keplerdev.uk/work/glitre-loyalty-platform#software" },
        { "@id": "https://www.keplerdev.uk/work/hs-vpn#software" },
        { "@id": "https://www.keplerdev.uk/work/quickcharging-pos#software" },
        { "@id": "https://www.keplerdev.uk/work/medconnect-egypt#software" },
        { "@id": "https://www.keplerdev.uk/work/stayease#software" },
        { "@id": "https://www.keplerdev.uk/work/classroom-sentinel#software" }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.keplerdev.uk/#website",
      "url": "https://www.keplerdev.uk",
      "name": "Kepler Dev",
      "publisher": { "@id": "https://www.keplerdev.uk/#organization" },
      "inLanguage": ["en", "ar"]
    },
    {
      "@type": "Service",
      "@id": "https://www.keplerdev.uk/#engineering-services",
      "name": "Kepler Dev product engineering engagements",
      "provider": { "@id": "https://www.keplerdev.uk/#organization" },
      "inLanguage": ["en", "ar"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Productized engineering engagements",
        "itemListElement": [
          { "@id": "https://www.keplerdev.uk/#service-blueprint" },
          { "@id": "https://www.keplerdev.uk/#service-launch-sprint" },
          { "@id": "https://www.keplerdev.uk/#service-operations-platform" },
          { "@id": "https://www.keplerdev.uk/#service-product-care" }
        ]
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.keplerdev.uk/#service-blueprint",
      "name": "Product Blueprint",
      "provider": { "@id": "https://www.keplerdev.uk/#organization" },
      "offers": { "@id": "https://www.keplerdev.uk/#offer-blueprint" }
    },
    {
      "@type": "Offer",
      "@id": "https://www.keplerdev.uk/#offer-blueprint",
      "name": "Product Blueprint (3–5 business days)",
      "url": "https://www.keplerdev.uk/services",
      "priceCurrency": "USD",
      "itemOffered": { "@id": "https://www.keplerdev.uk/#service-blueprint" },
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
      "provider": { "@id": "https://www.keplerdev.uk/#organization" },
      "offers": { "@id": "https://www.keplerdev.uk/#offer-launch-sprint" }
    },
    {
      "@type": "Offer",
      "@id": "https://www.keplerdev.uk/#offer-launch-sprint",
      "name": "Launch Sprint (2–5 weeks)",
      "url": "https://www.keplerdev.uk/services",
      "priceCurrency": "USD",
      "itemOffered": { "@id": "https://www.keplerdev.uk/#service-launch-sprint" },
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
      "provider": { "@id": "https://www.keplerdev.uk/#organization" },
      "offers": { "@id": "https://www.keplerdev.uk/#offer-operations-platform" }
    },
    {
      "@type": "Offer",
      "@id": "https://www.keplerdev.uk/#offer-operations-platform",
      "name": "Operations Platform (5–10 weeks, phased)",
      "url": "https://www.keplerdev.uk/services",
      "priceCurrency": "USD",
      "itemOffered": { "@id": "https://www.keplerdev.uk/#service-operations-platform" },
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
      "provider": { "@id": "https://www.keplerdev.uk/#organization" },
      "offers": { "@id": "https://www.keplerdev.uk/#offer-product-care" }
    },
    {
      "@type": "Offer",
      "@id": "https://www.keplerdev.uk/#offer-product-care",
      "name": "Product Care (Monthly)",
      "url": "https://www.keplerdev.uk/services",
      "priceCurrency": "USD",
      "itemOffered": { "@id": "https://www.keplerdev.uk/#service-product-care" },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": 250,
        "priceCurrency": "USD",
        "unitCode": "MON"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.keplerdev.uk/#faq",
      "inLanguage": "en",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Kepler Dev scope and price custom software engagements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kepler Dev scopes custom engagements through four structured commercial tiers: a fixed-definition Product Blueprint (3–5 business days, from $300, 100% credited toward build), a focused Launch Sprint (2–5 weeks, from $1,800 for initial production releases), an Operations Platform build (5–10 weeks phased, from $4,000), and monthly Product Care (from $250/mo)."
          }
        }
      ]
    }
  ]
}
```

---

## 5. Canonical, Sitemap & Bilingual hreflang Technical Audit

| Route | Canonical URL | Sitemap Listed | Reciprocal `hreflang` | SSR HTML Crawlability |
|---|---|---|---|---|
| `/` | `https://www.keplerdev.uk/` | Yes (`src/app/sitemap.ts`) | `en`, `ar`, `x-default` (`src/app/page.tsx`) | Verified Server Component (`HomePage` SSR HTML + `layout.tsx` JSON-LD) |
| `/ar` | `https://www.keplerdev.uk/ar` | Yes (`src/app/sitemap.ts`) | `en`, `ar`, `x-default` (`src/app/ar/page.tsx`) | Verified Server Component (`HomePage` RTL SSR HTML + locale-aware `FAQPage` JSON-LD) |
| `/work` | `https://www.keplerdev.uk/work` | Yes (`src/app/sitemap.ts`) | Single-language EN route (no translated counterpart) | Verified Server Component exporting `metadata` |
| `/services` | `https://www.keplerdev.uk/services` | Yes (`src/app/sitemap.ts`) | Single-language EN route (no translated counterpart) | Verified Server Component exporting `metadata` |
| `/studio` | `https://www.keplerdev.uk/studio` (`metadataBase` + `/studio`) | Yes (`src/app/sitemap.ts`) | Single-language EN route (no translated counterpart) | Verified Server Component exporting `metadata` |
| `/contact` | `https://www.keplerdev.uk/contact` (`metadataBase` + `/contact`) | Yes (`src/app/sitemap.ts`) | Single-language EN route (no translated counterpart) | Verified Server Component exporting `metadata` |
| `/privacy` | `https://www.keplerdev.uk/privacy` (`metadataBase` + `/privacy`) | Yes (`src/app/sitemap.ts`) | Single-language EN route (no translated counterpart) | Verified Server Component exporting `metadata` |

---

## 6. IndexNow & Optional Deep Crawl Handoff (squirrelscan / schema-dts)

- **IndexNow Key Verification:** No static `INDEXNOW_KEY.txt` file was provisioned inside `public/` during Stage 1 because repository edits are scoped strictly to `public/llms.txt`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/layout.tsx`, and this report. Prior to production IndexNow submission, generate a valid key matching `^[A-Za-z0-9-]{8,128}$`, save it to `public/INDEXNOW_KEY.txt`, and validate with `python3 -B roles/ai-search-and-technical-geo-engineer/scripts/indexnow_ping.py --verify-key public/INDEXNOW_KEY.txt`.
- **IndexNow Dry-Run / Submission:** Real offline payload constructed via `python3 -B roles/ai-search-and-technical-geo-engineer/scripts/indexnow_ping.py --build-payload --host www.keplerdev.uk --key keplerdev-indexnow-placeholder-key --urls https://www.keplerdev.uk/ https://www.keplerdev.uk/ar https://www.keplerdev.uk/work https://www.keplerdev.uk/services https://www.keplerdev.uk/studio https://www.keplerdev.uk/contact https://www.keplerdev.uk/privacy --key-location https://www.keplerdev.uk/keplerdev-indexnow-placeholder-key.txt` (live HTTP submission not yet executed pending production deploy and key file placement):

```json
{
  "host": "www.keplerdev.uk",
  "key": "keplerdev-indexnow-placeholder-key",
  "urlList": [
    "https://www.keplerdev.uk/",
    "https://www.keplerdev.uk/ar",
    "https://www.keplerdev.uk/work",
    "https://www.keplerdev.uk/services",
    "https://www.keplerdev.uk/studio",
    "https://www.keplerdev.uk/contact",
    "https://www.keplerdev.uk/privacy"
  ],
  "keyLocation": "https://www.keplerdev.uk/keplerdev-indexnow-placeholder-key.txt"
}
```

- **Optional OSS Handoff (`squirrelscan` / `unlighthouse` / `schema-dts`):** After deploying to staging or production, run `squirrel audit https://www.keplerdev.uk --format llm` and `unlighthouse` across all 16 sitemap URLs, optionally pair `src/app/layout.tsx` with `schema-dts` (`WithContext` `Graph` typing) if strict TypeScript schema typing is added in Stage 4, and execute live `indexnow_ping.py --submit` once the production `INDEXNOW_KEY.txt` file is hosted at `https://www.keplerdev.uk/INDEXNOW_KEY.txt`.

---

## 7. Mandatory Self-Audit Checklist

| # | Audit Gate | Verification Evidence | Status |
|---|---|---|---|
| 1 | Seven H2 sections present in exact order with non-empty content | Sections 1–7 match `stage-1-technical-geo-report.template.md` verbatim | PASS |
| 2 | `public/llms.txt` conforms to AnswerDotAI spec and bilingual EN+AR parity | Verified via `geo_tech_audit.py --verify docs/stage-1-technical-geo-report.md --project-dir . --audit-repo` | PASS |
| 3 | AI crawler matrix separates search/citation bots from training bots with explicit policy | Verified `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `ClaudeBot`, `Claude-SearchBot`, `Bingbot`, `Googlebot`, `GPTBot`, `Google-Extended`, and `*` in `src/app/robots.ts` | PASS |
| 4 | Schema.org `@graph` contains zero duplicate `@id` anchors and satisfies required/forbidden types | Verified deduplicated `glitre-loyalty-platform#software` and presence of `Organization`, `ProfessionalService`, `WebSite`, `Service`, `Offer`, `FAQPage` (zero `Person`) in `src/app/layout.tsx` | PASS |
| 5 | `PriceSpecification` and external `sameAs` authority URLs validated when configured | Verified `USD` `PriceSpecification` (`300`, `1800`, `4000`, `250` + `unitCode: "MON"`) and external `sameAs` URLs against `.kepler/stage-1-bindings.json` | PASS |
| 6 | Sitemap, canonicals, reciprocal `hreflang`, and IndexNow dry-run verified | Verified `src/app/sitemap.ts`, route `alternates`, SSR metadata, and real `indexnow_ping.py --build-payload` output | PASS |
| 7 | Zero unfilled slots, zero banned AI slop, and zero disallowed tokens | Verified via `prose_audit.py docs/stage-1-technical-geo-report.md --config .kepler/stage-1-bindings.json` and `geo_tech_audit.py` | PASS |
