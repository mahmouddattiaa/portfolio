---
name: onpage-seo-and-jsonld-schema
description: Use when budgeting 45-60 char titles, 135-160 char meta descriptions, semantic H1-H2-H3 outlines, bilingual canonical/hreflang tags, enriched @graph JSON-LD with PriceSpecification and sameAs, and /llms.txt AI crawler handoff rules.
---

# On-Page SEO, `@graph` JSON-LD & AI Crawler Handoff

## Purpose

Translate Section 1 intent clusters and Section 4 GEO blocks into exact, build-ready on-page SEO specifications: route metadata, heading outlines, canonical/`hreflang` rules, an enriched `@graph` JSON-LD schema block, and explicit `/llms.txt` + `robots.txt` AI crawler handoff rules.

## 1. Metadata Character Budgets (Section 2)

Use the exact table columns expected by `seo_audit.py`:

`| Route | Title | Title Chars | Meta Description | Desc Chars | Canonical URL | hreflang |`

Hard budgets for every route row:
- **`<title>`:** strictly **45 to 60 characters** (inclusive). Put the primary intent keyword near the front and the brand/entity name at the end separated by `—` or an escaped pipe `\|` so Markdown table columns stay intact.
- **`<meta description>`:** strictly **135 to 160 characters** (inclusive). Combine what the page offers, who it serves, one concrete proof point, and a clear next step.
- **Route coverage:** Include every route listed in `required_routes` from `.kepler/stage-1-bindings.json` (if set), or all core routes identified in `docs/context/project-digest.md`.
- **Arabic metadata parity:** When `"ar"` is in `locales` and an `/ar` route is configured (or `require_bilingual_geo` is set), the `/ar` row MUST have native Arabic script (`[\u0600-\u06FF]`) in both its `<title>` (45–60 chars) and `<meta description>` (135–160 chars).
- **Canonical URL:** Every canonical URL must begin with `canonical_origin` from `.kepler/stage-1-bindings.json` (when configured). Use consistent trailing-slash rules (`https://example.com/` for root, `https://example.com/ar` or `https://example.com/pricing` for sub-routes).
- **`hreflang`:** Match `locales` from `.kepler/stage-1-bindings.json` (default `en`). When multiple locales exist, list each locale code plus `x-default` pointing to the default locale URL.

Verify character counts programmatically (never eyeball them) and confirm with `seo_audit.py --verify`.

## 2. Semantic Heading Hierarchy (Section 3)

Provide a clean `H1 -> H2 -> H3` outline for each core route (and `/ar` when bilingual):
- **Exactly one `H1` per route:** Aligns with the route's primary keyword cluster from Section 1 without keyword stuffing.
- **Logical `H2` anchors:** Map to buyer evaluation stages (problem, mechanism, capabilities, proof, pricing/process, FAQ).
- **`H3` sub-headings:** Break down specific capabilities, deliverables, or verbatim FAQ questions from Section 4.
- **No skipped levels:** Never jump from `H1` directly to `H3` or use heading tags purely for visual font sizing.

## 3. Production `@graph` JSON-LD (Section 5)

Provide one valid JSON-LD block inside a fenced ```` ```json ```` code block using a linked `@graph` array:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://example.com/#organization",
      "name": "Example Studio",
      "url": "https://example.com/",
      "areaServed": ["SA", "AE", "EG", "US"],
      "knowsAbout": ["MVP Development", "Web Engineering", "Product Design"],
      "sameAs": [
        "https://github.com/example-studio",
        "https://www.linkedin.com/company/example-studio"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://example.com/#mvp-service",
      "name": "Fixed-Scope MVP Sprint",
      "provider": { "@id": "https://example.com/#organization" },
      "areaServed": ["SA", "AE", "EG", "US"],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": 4500,
          "priceCurrency": "USD"
        }
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com/",
      "name": "Example Studio",
      "publisher": { "@id": "https://example.com/#organization" }
    },
    {
      "@type": "FAQPage",
      "@id": "https://example.com/#faq",
      "inLanguage": ["en", "ar"],
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Example buyer question?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Example factual answer matching Section 4."
          }
        }
      ]
    }
  ]
}
```

Mandatory rules:
1. **Minimum entities:** `@graph` must be a JSON array with **at least 3 linked objects** connected via stable `@id` URIs.
2. **Respect bindings:**
   - Include every `@type` listed in `required_jsonld_types` (default when unset: `["WebSite", "FAQPage"]`).
   - Exclude every `@type` listed in `forbidden_jsonld_types` (e.g., exclude `Person` when studio bindings forbid solo-person schema).
3. **Enriched entity fields:**
   - **`Organization` / `ProfessionalService`:** Include `areaServed`, `knowsAbout`, and a non-empty `sameAs` array of valid `https://` external authority URLs (GitHub, LinkedIn, Crunchbase, X, Clutch, etc.) when `require_same_as` is set or authority profiles exist.
   - **`Offer` + `PriceSpecification`:** Attach an `Offer` containing `priceSpecification` (`@type: "PriceSpecification"`, `minPrice` or `price`, and `priceCurrency`) from upstream pricing facts (mandatory when `require_price_specification` is set).
   - **Locale-synced `FAQPage`:** Mirror Section 4 FAQ questions/answers in `mainEntity`, including Arabic `Question`/`Answer` pairs (or `inLanguage` metadata) when `"ar"` is in `locales`.
4. **No placeholder URLs or unverified claims:** Every URL, price, region, and offer in `@graph` must match `.kepler/stage-1-bindings.json` and upstream docs.

## 4. `/llms.txt` & AI Crawler Policy (`robots.txt`) Handoff (Section 6)

Include an explicit **AI Crawler & `/llms.txt` Handoff** subsection or bullet block in Section 6 covering:
1. **`robots.txt` AI Search & Training Crawler Directives:** Explicitly name `OAI-SearchBot`, `GPTBot`, `PerplexityBot`, `ClaudeBot`, and `Google-Extended`, stating which bots are allowed for search retrieval/citation (at minimum allow `OAI-SearchBot`, `PerplexityBot`, and `ClaudeBot` on public marketing, `/llms.txt`, and `/ar` routes; state the project's explicit policy for `GPTBot` and `Google-Extended`).
2. **Bilingual `/llms.txt` Specification:** Instruct Frontend/Engineering to serve `/llms.txt` at `<canonical_origin>/llms.txt` in concise Markdown with:
   - Entity identity, category, target buyer, starting price & cycle time, geography, and verifiable proof.
   - Canonical links + one-line summaries for every core route (`/` and `/ar` when bilingual, plus `/pricing`, `/services`, etc.).
   - Explicit pointer to the JSON-LD schema and primary contact/conversion route.
3. **Checklist Sync:** Complete the 7-row Self-Audit Checklist in Section 7 only after running `seo_audit.py --verify` and `prose_audit.py` with exit code `0`.
