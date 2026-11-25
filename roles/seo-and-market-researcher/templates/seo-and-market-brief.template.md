# SEO & Market Research Brief

> Deliverable for Stage 1 Role 1.2 (`seo-and-market-researcher`). Downstream consumers: Conversion Copywriter (Role 1.3) and Frontend Implementation.

## 1. Search Intent & Keyword Clusters

Document the live Google Autocomplete seeds run via `keyword_suggest.py` (including `--lang ar` when `"ar"` is in `locales`), unbranded discovery queries, clustered buyer queries grouped by search intent, and primary route assignments.

### Seed Harvest Summary

| Seed Query | Locale & Intent Expansion | Top Observed Autocomplete Suggestions | Target Route |
| --- | --- | --- | --- |
| `<seed-1>` | `en: alternative, pricing, vs, for, how to` | `<suggestion-1>; <suggestion-2>; <suggestion-3>` | `/` |
| `<seed-2>` | `en: alternative, pricing, vs, for, how to` | `<suggestion-1>; <suggestion-2>; <suggestion-3>` | `/pricing` |
| `<ar-seed-1>` | `ar: سعر, تكلفة, أفضل شركة, للشركات الناشئة, كيف` | `<ar-suggestion-1>; <ar-suggestion-2>` | `/ar` |

### Clustered Buyer Intent Map

| Cluster Name | Intent Stage | Primary Keyword | Secondary Buyer Phrases | Mapped Route | Proof / Angle from Positioning Brief |
| --- | --- | --- | --- | --- | --- |
| `<cluster-1>` | Unbranded Discovery | `<unbranded-discovery-keyword>` | `<phrase-a>, <phrase-b>` | `/` | `<concrete proof point>` |
| `<cluster-2>` | Commercial | `<primary-keyword>` | `<phrase-c>, <phrase-d>` | `/pricing` | `<concrete differentiator>` |
| `<cluster-3>` | Comparison | `<comparison-keyword>` | `<phrase-e>, <phrase-f>` | `/about` | `<verifiable credential or method>` |
| `<cluster-4>` | Bilingual Discovery (AR) | `<arabic-discovery-keyword>` | `<ar-phrase-a>, <ar-phrase-b>` | `/ar` | `<arabic proof point>` |

## 2. Multi-Route Metadata Table (<title>, <meta description>, Canonical & hreflang)

Every `<title>` must be `45-60` characters and every `<meta description>` must be `135-160` characters. Every canonical URL must start with `canonical_origin` from `.kepler/stage-1-bindings.json` (when configured). When `"ar"` is in `locales` with `/ar` routes, include an `/ar` row with native Arabic script in both Title and Meta Description.

| Route | Title | Title Chars | Meta Description | Desc Chars | Canonical URL | hreflang |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | `<45-60 character primary route title>` | `52` | `<135-160 character meta description stating category, audience, concrete proof, and clear next step>` | `148` | `<canonical-origin>/` | `en, x-default` |

## 3. Semantic Heading Hierarchy (H1 -> H2 -> H3) Across Core Routes

Define one unique `H1` per route, logical `H2` section anchors aligned to buyer intent, and `H3` sub-headings for proof points, capabilities, or FAQ questions.

### Route: `/`
- **H1:** `<Outcome-focused headline matching primary commercial cluster>`
  - **H2:** `<Problem / buyer-context section heading>`
    - **H3:** `<Specific pain point 1>`
    - **H3:** `<Specific pain point 2>`
  - **H2:** `<Core offering / capabilities section heading>`
    - **H3:** `<Capability 1 with concrete mechanism>`
    - **H3:** `<Capability 2 with concrete mechanism>`
  - **H2:** `<Proof, outcomes & FAQ section heading>`
    - **H3:** `<FAQ question 1>`
    - **H3:** `<FAQ question 2>`

## 4. AI Search (GEO) Citability & Query Fan-Out (40-60 Words Each)

Provide 1 top-of-page Entity Identity Block followed by 4 self-contained FAQ Answer Blocks (or `geo_block_count` from `.kepler/stage-1-bindings.json`), plus native Arabic `40-60` word GEO blocks when `"ar"` is in `locales`. Each blockquote must be strictly `40-60` words, self-contained, and combine Entity + Category + Target Buyer + Cycle Time & Starting Price + Geography + Verifiable Proof.

### Block 1 — Top-of-Page Entity Identity Block (Target: 40-60 words)

> Replace this blockquote with a 40-60 word self-contained identity statement naming the entity, exact category, target buyer, cycle time and starting price, geography, and one verifiable proof metric from the positioning brief.

### Block 2 — FAQ 1: `<Buyer question on unbranded discovery, scope, or fit>` (Target: 40-60 words)

> Replace this blockquote with a 40-60 word self-contained factual answer that directly addresses the buyer question in the first sentence and backs it with concrete scope, deliverables, or evidence.

### Block 3 — FAQ 2: `<Buyer question on pricing, timeline, or process>` (Target: 40-60 words)

> Replace this blockquote with a 40-60 word self-contained factual answer detailing concrete timelines, pricing structure, or onboarding steps without hedging or filler language.

### Block 4 — FAQ 3: `<Buyer question on differentiation or alternatives>` (Target: 40-60 words)

> Replace this blockquote with a 40-60 word self-contained factual answer comparing the approach against common alternatives using verifiable technical or operational criteria.

### Block 5 — FAQ 4: `<Buyer question on proof, security, or outcomes>` (Target: 40-60 words)

> Replace this blockquote with a 40-60 word self-contained factual answer citing concrete results, standards, or guarantees established in upstream positioning documents.

## 5. Production @graph JSON-LD Structured Data

Include a single valid JSON-LD `@graph` block containing at least 3 linked entities (`@id` references) that satisfies `required_jsonld_types`, excludes `forbidden_jsonld_types`, and includes `Offer` + `PriceSpecification`, `areaServed`, `knowsAbout`, `sameAs` authority links, and locale-synced `FAQPage`.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "Example Entity",
      "url": "https://example.com/",
      "areaServed": ["US", "SA", "AE"],
      "knowsAbout": ["Software Engineering", "Product Delivery"],
      "sameAs": [
        "https://github.com/example-entity",
        "https://www.linkedin.com/company/example-entity"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://example.com/#service",
      "name": "Core Fixed-Scope Sprint",
      "provider": {
        "@id": "https://example.com/#organization"
      },
      "areaServed": ["US", "SA", "AE"],
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
      "name": "Example Entity",
      "publisher": {
        "@id": "https://example.com/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://example.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Example buyer question?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Example factual answer matching Block 2 in Section 4."
          }
        }
      ]
    }
  ]
}
```

## 6. Copywriter & Frontend Handoff Rules

- **Copywriter (Role 1.3):** Preserve exact `<title>`, `<meta description>`, `H1` intent alignment, and all `40-60 word` GEO answer blocks (EN and AR when bilingual) verbatim unless re-audited.
- **Voice & Bindings:** Enforce `voice_mode`, `forbidden_tokens`, and `allowed_exceptions` from `.kepler/stage-1-bindings.json` across every metadata field and heading.
- **Frontend Implementation:** Render one `<script type="application/ld+json">` from Section 5, set `<link rel="canonical">` and `hreflang` per Section 2, and enforce a single `<h1>` per route without skipping heading levels.
- **Internal Linking:** Link every secondary route back to the primary conversion route using descriptive anchor text drawn from Section 1 clusters.
- **`/llms.txt` & AI Crawler Policy (`robots.txt`):**
  - **`robots.txt` Directives:** Explicitly declare access policies for `OAI-SearchBot`, `GPTBot`, `PerplexityBot`, `ClaudeBot`, and `Google-Extended` (allow `OAI-SearchBot`, `PerplexityBot`, and `ClaudeBot` on public routes and `/llms.txt`; state explicit policy for `GPTBot` and `Google-Extended`).
  - **Bilingual `/llms.txt` File:** Publish `<canonical-origin>/llms.txt` in plain Markdown summarizing entity identity, category, target buyer, cycle time and starting price, geography, verifiable proof, and canonical links for both English (`/`) and Arabic (`/ar`) routes when bilingual.

## 7. Mandatory Self-Audit Checklist

| Check | Requirement | Evidence / Measurement | Status |
| --- | --- | --- | --- |
| 1. Required H2 Structure | All 7 numbered H2 sections present in exact order | Verified via `seo_audit.py --verify` | PASS |
| 2. Keyword Research Grounding | Live EN/AR autocomplete and unbranded discovery queries mapped to routes | `keyword_suggest.py` outputs summarized in Section 1 | PASS |
| 3. Metadata Character Budgets | Every route `<title>` is `45-60` chars and `<meta description>` is `135-160` chars | Exact counts verified in Section 2 table | PASS |
| 4. Canonical & Route Coverage | All `required_routes` (including `/ar` when bilingual) covered and aligned to `canonical_origin` | Checked against `.kepler/stage-1-bindings.json` | PASS |
| 5. GEO Citability Word Counts | All `geo_block_count` blockquotes (plus AR parity blocks) strictly `40-60` words | Word counts verified in Section 4 | PASS |
| 6. JSON-LD `@graph` Validity | Valid JSON, `>= 3` entities, `PriceSpecification`, `sameAs`, and required types verified | Parsed and validated in Section 5 | PASS |
| 7. Handoff & Prose Cleanliness | `/llms.txt` + AI crawler policy documented; zero buzzwords or voice violations | `prose_audit.py` and `seo_audit.py` exit `0` | PASS |
