---
name: typed-jsonld-graph-and-entity-map
description: Use when designing or verifying deduplicated Schema.org @graph JSON-LD entities, PriceSpecification offers, sameAs anchors, and bilingual inLanguage nodes.
---

# Typed `@graph` JSON-LD & Entity Map (Step 2)

Build a single, deduplicated Schema.org `@graph` in `src/app/layout.tsx` (and route-level extensions when needed) so search engines and LLMs resolve one canonical entity identity without conflicting or duplicate nodes.

## 1. Deduplicated `@graph` & Stable `@id` Anchors

Every core entity gets a deterministic, fragment-anchored `@id` derived from `canonical_origin`:
- **Organization / LocalBusiness / ProfessionalService:** `<canonical_origin>/#organization`
- **WebSite:** `<canonical_origin>/#website`
- **Primary Service / SoftwareApplication:** `<canonical_origin>/#service` (or `#product`)
- **FAQPage:** `<canonical_origin>/#faq` (synced with the page's visible FAQ Q&As)

Rules for `@graph` integrity:
1. **Zero duplicate `@id` definitions:** Each `@id` URI may appear as a top-level entity node in `@graph` at most once. Other nodes reference it solely via `{"@id": "<canonical_origin>/#organization"}`.
2. **Match bindings:** Include every `@type` in `required_jsonld_types` and omit every `@type` in `forbidden_jsonld_types` (for example, do not emit `Person` when the brand is an `Organization` or `ProfessionalService`).
3. **Preserve existing layout:** When editing `src/app/layout.tsx`, update only the `<script type="application/ld+json">` payload—never alter JSX layout, styling, or visible copy.

## 2. Typed Properties: Offers, Authority & Language

- **`Offer` + `PriceSpecification`:** When `require_price_specification` is enabled (or pricing exists in upstream briefs), include an `Offer` containing a `priceSpecification` object with `"@type": "PriceSpecification"`, non-empty `"priceCurrency"` (ISO 4217, e.g. `"USD"`, `"SAR"`, `"GBP"`), and `"minPrice"` or `"price"`.
- **`areaServed`:** List verified geographic markets as `Place` or `Country` objects or ISO/region strings grounded in `docs/seo-and-market-brief.md`.
- **`knowsAbout`:** List verified technical domains, frameworks, or service categories from upstream briefs (never unverified buzzwords).
- **`sameAs`:** When `require_same_as` is enabled, include external authority profile URLs (GitHub, LinkedIn, X, Crunchbase, or verified directories). Every `sameAs` URL must be `https://` (or `http://`) and belong to an external host (`urlparse(url).netloc != urlparse(canonical_origin).netloc`).
- **Bilingual `inLanguage`:** When `"ar"` is in `locales` (or `require_bilingual_geo` is true), declare `"inLanguage": ["en", "ar"]` on `WebSite` / `Service`, or emit locale-matched `inLanguage` (`"en"` / `"ar"`) on route-specific `@graph` blocks so Arabic pages declare `"inLanguage": "ar"`.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "Example Studio",
      "url": "https://example.com/",
      "areaServed": ["US", "SA", "AE", "GB"],
      "knowsAbout": ["Custom Web Applications", "SaaS MVP Architecture", "Technical SEO"],
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
      "inLanguage": ["en", "ar"],
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
          "name": "How long does initial delivery take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Core scoped builds ship in 2 to 5 weeks with frozen API contracts and automated tests."
          }
        }
      ]
    }
  ]
}
```

## 3. Optional OSS Tooling (Non-Blocking Enhancements)

- **`google/schema-dts` (Apache-2.0):** TypeScript Schema.org type definitions (`WithContext<Graph>`) for compile-time verification inside `src/app/layout.tsx`.
- **`scrapinghub/extruct` (BSD-3 pattern):** Python HTML structured-data extractor pattern for auditing rendered `<script type="application/ld+json">` blocks in built HTML outputs.
