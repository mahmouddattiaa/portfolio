---
name: directory-and-entity-consistency
description: Use when locking canonical NAP records, honest legal framing, pricing and timeline consistency, search-engine submission matrices, and verified external sameAs registries synced to JSON-LD.
---

# Directory & Entity Consistency

Establish a single source of truth for offsite entity records so search engines, B2B directories, and AI answer engines resolve the brand unambiguously without conflicting names, prices, or legal claims.

## 1. Canonical NAP & Entity Identity

Every external profile and search-engine submission must reuse identical core identifiers sourced from `.kepler/stage-1-bindings.json` and `docs/positioning-brief.md`:

- **Canonical Brand Name:** Exact `project_name` casing and spacing across page titles, directory titles, and social handles. Never alternate between an acronym, a legal suffix, and a tagline in the primary name field.
- **Canonical Origin:** Exact `canonical_origin` (`https://...` without mixed `http://` or `www` variants). All directory website fields and social profile links must resolve to this single origin.
- **Address / Service Area Framing:** State the true operating footprint (`areaServed` from Stage 1 SEO/positioning briefs—e.g., remote-first, specific cities, or GCC/MENA/EU regions). Never invent a street office, coworking mail-drop, or virtual suite address.
- **Contact Channel (Phone / Email / Intake Route):** Use one dedicated public contact email and/or intake URL (`canonical_origin` contact path). Avoid exposing personal phone numbers unless already published in canonical project docs.

## 2. Legal-Entity Honesty Rule

Directories such as Clutch.co, GoodFirms, and Crunchbase prompt for incorporation year, company size, and registration numbers. Follow strict truth-in-entity rules:

- **No Fabricated Incorporation:** If the project operates as an independent studio, solo practice, or pre-incorporation product team, state that plainly (e.g., "Independent software practice" or the exact legal structure verified in `docs/context/project-digest.md`). Never invent an LLC/Ltd suffix, registration ID, or street headquarters.
- **No Inflated Tenure or Headcount:** Only state launch year, shipped project count, or team size if verified in upstream Stage 0/1 briefs. Use `1` or exact verified range when a form requires team size.
- **Consistent Legal-vs-Brand Attribution:** Respect `voice_mode` and `forbidden_tokens` from `.kepler/stage-1-bindings.json` (only use `allowed_exceptions` where explicitly permitted, such as copyright or legal attribution lines).

## 3. Pricing-Anchor & Timeline Consistency

AI retrieval pipelines cross-check directory profiles against on-site landing pages and `Offer` / `PriceSpecification` JSON-LD. Any mismatch erodes citation trust:

- Copy starting prices, retainer rates, fixed-scope packages, and delivery timelines verbatim from `docs/positioning-brief.md` and `docs/stage-1-final-copy-and-pitch.md`.
- Keep currency, billing cadence, and scope exclusions identical across Clutch, GoodFirms, LinkedIn Services, and on-site JSON-LD.
- If pricing is custom or quoted per scope, use the same verified range or floor everywhere rather than guessing a directory's dropdown bracket upward or downward.

## 4. Priority Search Engines & Directory Matrix

Cover both search indexers and high-authority B2B/developer entity hubs in Section 2 of the deliverable:

| Platform | Why It Matters for Discovery & AI Citations | Required Parity Fields |
|---|---|---|
| **Google Search Console** | Primary Google indexing, sitemap submission, canonical verification, and Knowledge Panel signals | Verified `canonical_origin` domain property, XML sitemap URL, `robots.txt` check |
| **Bing Webmaster Tools** | **Critical for ChatGPT Search**, Copilot, and DuckDuckGo index coverage; supports IndexNow instant URL pings | Verified `canonical_origin` (or GSC import), sitemap URL, IndexNow key status |
| **LinkedIn Company Page** | High-trust entity node for B2B buyers and Knowledge Graph disambiguation | Exact `project_name`, `canonical_origin`, category, service area, 1-line positioning |
| **GitHub Organization** | Authoritative technical proof node for developer tools, OSS packages, and engineering studios | Verified domain badge on `canonical_origin`, org bio, pinned proof repos |
| **Clutch.co** | High-ranking B2B buyer directory cited by Perplexity and ChatGPT for agency/service recommendations | Exact pricing floor, team size, verified client reviews, service focus percentages |
| **GoodFirms** | Secondary B2B software and agency directory frequently scraped in "best [category] firm" roundups | Matching NAP, service split, verified portfolio links back to `canonical_origin` |
| **Crunchbase** | Structured entity graph node feeding funding, leadership, and category taxonomy to LLMs | Honest founding year, stage, category tags, social/web links |

Include additional category-relevant directories (e.g., **Product Hunt**, **G2**, **Capterra**, **AlternativeTo**) when appropriate for SaaS or developer tools.

## 5. Verified `sameAs` Registry (Synced to Role 1.2 / 1.5 JSON-LD)

Section 3 of `docs/stage-1-offsite-citation-pack.md` locks the canonical `sameAs` array consumed by Role 1.2 (`seo-and-market-researcher`) and Role 1.5 (JSON-LD implementation):

1. **External HTTPS URLs Only:** Every `sameAs` entry must be a live or reserved `https://` profile URL on an external authority domain (minimum 2 verified external URLs).
2. **Never Self-Reference `canonical_origin`:** Never place `canonical_origin` or any URL sharing `urlparse(canonical_origin).netloc` inside `sameAs`. `sameAs` connects the on-site `@id` entity to external authoritative profiles; self-referencing creates a circular entity graph.
3. **Bindings Parity:** If `.kepler/stage-1-bindings.json` defines `expected_same_as`, verify every listed URL appears verbatim in Section 3 and flag any URL that is not yet live (`Pending Creation` vs `Live`) without dropping it from the registry.
4. **Handoff Format:** Provide a clean table (`Platform`, `Canonical Profile URL`, `Status`, `JSON-LD Node`) plus a copy-ready JSON array snippet for the site's `Organization` / `ProfessionalService` / `SoftwareApplication` `@graph` node.
