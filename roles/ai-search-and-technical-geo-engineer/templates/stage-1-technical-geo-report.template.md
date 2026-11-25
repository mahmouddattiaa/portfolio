# Stage 1 Technical GEO & AI Search Verification Report

**Project:** `<Project Name>`
**Canonical Origin:** `<https://example.com>`
**Locales:** `<en | en, ar>`
**Target Repo Surfaces:** `public/llms.txt`, `public/robots.txt` or `src/app/robots.ts`, `public/sitemap.xml` or `src/app/sitemap.ts`, `src/app/layout.tsx`

---

## 1. Technical GEO Surface Inventory (llms.txt, robots, sitemap, JSON-LD)

| Surface | Path Checked | Status | Notes |
|---|---|---|---|
| `llms.txt` | `public/llms.txt` | `<PRESENT / CREATED / UPDATED>` | `<Summary of AnswerDotAI structure and locale coverage>` |
| Robots Policy | `<public/robots.txt or src/app/robots.ts>` | `<PRESENT / CREATED / UPDATED>` | `<Sitemap link + AI search vs. training-bot split>` |
| XML Sitemap | `<public/sitemap.xml or src/app/sitemap.ts>` | `<PRESENT / CREATED / UPDATED>` | `<Route coverage and canonical origin check>` |
| JSON-LD `@graph` | `src/app/layout.tsx` | `<PRESENT / CREATED / UPDATED>` | `<Entity count, deduplication, and schema types>` |

---

## 2. llms.txt Specification & AnswerDotAI Compliance Check

- **H1 Title:** `<Exact entity name>`
- **Blockquote Summary:** `<1-3 concise factual sentences>`
- **Curated Link Sections:** `<List H2 sections and verified canonical URLs>`
- **Bilingual EN + AR Parity (if configured):** `<Confirm Arabic summary and /ar route links in public/llms.txt, or N/A>`

---

## 3. AI Crawler Access Matrix (robots.ts / robots.txt)

| User-Agent | Category | Policy (`Allow` / `Disallow`) | Scope / Path Rules | Rationale |
|---|---|---|---|---|
| `OAI-SearchBot` | AI Search / Citation | `Allow` | `/` | ChatGPT search indexing and citation retrieval |
| `ChatGPT-User` | Live User Fetch | `Allow` | `/` | Real-time link inspection in ChatGPT |
| `PerplexityBot` | AI Search / Citation | `Allow` | `/` | Perplexity search indexing and citation retrieval |
| `Perplexity-User` | Live User Fetch | `Allow` | `/` | Real-time user-triggered fetch |
| `ClaudeBot` | AI Search / Retrieval | `Allow` | `/` | Anthropic web retrieval index |
| `Claude-SearchBot` | AI Search / Citation | `Allow` | `/` | Claude search citation retrieval |
| `Bingbot` | Search Index | `Allow` | `/` | Bing, Copilot search, and IndexNow ingestion |
| `Googlebot` | Search Index | `Allow` | `/` | Google Search and AI Overviews |
| `GPTBot` | Model Training | `<Allow or Disallow>` | `< / or /api >` | `<Owner training-bot policy decision>` |
| `Google-Extended` | Model Training | `<Allow or Disallow>` | `< / or /api >` | `<Owner Gemini training policy decision>` |

---

## 4. Schema.org @graph Entity Map & Typed JSON-LD Verification

- **Deduplication Check:** `<Confirm zero duplicate @id definitions across @graph nodes>`
- **Required & Forbidden Types:** `<Confirm required_jsonld_types present and forbidden_jsonld_types absent>`
- **PriceSpecification & `sameAs`:** `<Confirm currency/price fields and external sameAs hosts>`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "Example Studio",
      "url": "https://example.com/",
      "areaServed": ["US", "SA", "AE"],
      "knowsAbout": ["Custom Web Applications", "Technical GEO"],
      "sameAs": [
        "https://github.com/example-studio",
        "https://www.linkedin.com/company/example-studio"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com/",
      "name": "Example Studio",
      "inLanguage": ["en", "ar"],
      "publisher": { "@id": "https://example.com/#organization" }
    },
    {
      "@type": "Service",
      "@id": "https://example.com/#service",
      "name": "Scoped Web Application Delivery",
      "provider": { "@id": "https://example.com/#organization" },
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "USD",
          "minPrice": 2500
        }
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://example.com/#faq",
      "inLanguage": "en",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How are technical GEO surfaces verified?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every surface is validated against AnswerDotAI llms.txt rules, crawler access stanzas, deduplicated @graph JSON-LD, and sitemap canonicals."
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
| `/` | `<https://example.com/>` | `<Yes / No>` | `<en, ar, x-default or N/A>` | `<Verified SSR HTML>` |
| `<Route>` | `<Canonical URL>` | `<Yes / No>` | `<Reciprocal tags or N/A>` | `<Verified SSR HTML>` |

---

## 6. IndexNow & Optional Deep Crawl Handoff (squirrelscan / schema-dts)

- **IndexNow Key Verification:** `<Command output or N/A if key not provisioned>`
- **IndexNow Dry-Run / Submission:** `<Dry-run payload status or live HTTP 200/202 result>`
- **Optional OSS Handoff (`squirrelscan` / `unlighthouse` / `schema-dts`):** `<Recommended staging checks>`

---

## 7. Mandatory Self-Audit Checklist

| # | Audit Gate | Verification Evidence | Status |
|---|---|---|---|
| 1 | Seven H2 sections present in exact order with non-empty content | Verified against report template | PASS |
| 2 | `public/llms.txt` conforms to AnswerDotAI spec and bilingual EN+AR parity | Verified via `geo_tech_audit.py --audit-repo` | PASS |
| 3 | AI crawler matrix separates search/citation bots from training bots with explicit policy | Checked `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `GPTBot`, `Google-Extended` | PASS |
| 4 | Schema.org `@graph` contains zero duplicate `@id` anchors and satisfies required/forbidden types | Verified via JSON-LD graph parser | PASS |
| 5 | `PriceSpecification` and external `sameAs` authority URLs validated when configured | Verified against `.kepler/stage-1-bindings.json` | PASS |
| 6 | Sitemap, canonicals, reciprocal `hreflang`, and IndexNow dry-run verified | Verified via `geo_tech_audit.py` and `indexnow_ping.py` | PASS |
| 7 | Zero unfilled slots, zero banned AI slop, and zero disallowed tokens | Verified via `prose_audit.py` and `geo_tech_audit.py` | PASS |
