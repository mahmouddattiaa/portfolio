# Stage 1 Offsite Entity & Citation Pack

**Project:** `<Project Name>`
**Canonical Origin:** `<https://example.com>`
**Locales:** `<en | en, ar>`
**Source Briefs:** `docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `docs/stage-1-final-copy-and-pitch.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`

---

## 1. Canonical Entity Record (NAP, Legal Framing, Pricing & Timelines)

- **Canonical Brand Name:** `<Project Name>`
- **Canonical Origin:** `<https://example.com>`
- **Operating Footprint / Service Area (`areaServed`):** `<Verified city, region, or remote delivery scope>`
- **Public Contact Channel:** `<contact@example.com and /contact intake route>`
- **Honest Legal-Entity Framing:** `<Verified legal status or independent practice framing; no fabricated incorporation or registration numbers>`
- **Verified Founding / Team Scope:** `<Verified launch year and team size, or "Not disclosed">`
- **Locked Pricing Anchors:** `<Exact starting prices, fixed-scope tiers, and currency from positioning brief>`
- **Locked Delivery Timelines:** `<Exact turnaround windows from positioning and copy briefs>`

---

## 2. Priority Directory & Search Engine Submission Matrix

| Platform | Category | Priority | Submission URL / Property | Required Parity Fields | Status |
|---|---|---|---|---|---|
| **Google Search Console** | Search Indexer | P0 | `<https://example.com>` | Domain property, XML sitemap, `robots.txt` check | `<Ready / Verified>` |
| **Bing Webmaster Tools** | Search Indexer (ChatGPT Search) | P0 | `<https://example.com>` | Domain verification, XML sitemap, IndexNow key | `<Ready / Verified>` |
| **LinkedIn Company Page** | Authority Entity Node | P0 | `<https://www.linkedin.com/company/example>` | Exact brand name, origin, category, service area | `<Ready / Live>` |
| **GitHub Organization** | Technical Proof Node | P0 | `<https://github.com/example>` | Verified domain badge, org bio, pinned proof repos | `<Ready / Live>` |
| **Clutch.co** | B2B Buyer Directory | P1 | `<https://clutch.co/profile/example>` | Pricing floor, team size, verified reviews, service split | `<Ready / Pending>` |
| **GoodFirms** | B2B Software Directory | P1 | `<https://www.goodfirms.co/company/example>` | Matching NAP, service percentages, portfolio links | `<Ready / Pending>` |
| **Crunchbase** | Entity Graph Database | P2 | `<https://www.crunchbase.com/organization/example>` | Honest stage/founding year, category tags, web links | `<Ready / Pending>` |

---

## 3. Verified sameAs URL Registry (JSON-LD Parity)

> Keep `sameAs` strictly external: include only verified `https://` authority profile URLs on third-party domains, and never list the primary site origin inside `sameAs`.

| Platform | Canonical `sameAs` URL | Status | Target JSON-LD Node |
|---|---|---|---|
| LinkedIn | `<https://www.linkedin.com/company/example>` | `<Live / Pending Creation>` | `Organization` |
| GitHub | `<https://github.com/example>` | `<Live / Pending Creation>` | `Organization` |
| Clutch.co | `<https://clutch.co/profile/example>` | `<Live / Pending Creation>` | `Organization` |
| GoodFirms | `<https://www.goodfirms.co/company/example>` | `<Live / Pending Creation>` | `Organization` |

```json
{
  "sameAs": [
    "<https://www.linkedin.com/company/example>",
    "<https://github.com/example>"
  ]
}
```

---

## 4. Bilingual Directory Profiles & Review Request Scripts (EN & AR)

### English Directory Profile Copy
- **Tagline (`<= 80` chars):** `<Category + core mechanism + buyer outcome>`
- **Short Profile (`40-60` words):** `<Standalone entity summary naming brand, ICP, mechanism, pricing anchor, and canonical origin.>`
- **Extended Overview (`120-180` words):** `<Bottleneck, mechanism, verified proof items, and primary CTA route.>`

### Arabic Directory Profile Copy (When Bilingual `ar` Configured)
- **العنوان المختصر:** `<Arabic category + core outcome without corporate clichés>`
- **التعريف المختصر (`40-60` كلمة):** `<Natural Arabic summary using شهرياً/سنوياً rather than English unit suffixes.>`

### Ethical Past-Client Review Request Scripts (Zero Fake or Incentivized Reviews)
- **WhatsApp / Direct Chat (EN):** `<Warm 3-sentence check-in to a real past client with direct Clutch/GoodFirms/Google review link.>`
- **Email Request (EN):** `<Subject line + short project context + 2-minute honest feedback link.>`
- **LinkedIn DM (EN):** `<Brief founder-to-founder request for an honest LinkedIn recommendation.>`
- **Arabic Client Follow-Up (AR, if bilingual):** `<Natural Arabic WhatsApp/email review request for past Arabic-speaking clients.>`

---

## 5. Syndication Articles & Canonical Frontmatter Pack

### Target Syndication Channels
- **Dev.to & Hashnode:** Publish full technical/founder guides only after the original URL is live on the primary domain, using `canonical_url:` in YAML frontmatter.
- **Medium:** Use Medium's import tool or set the canonical link in Advanced Settings to the exact `https://` article URL on the primary domain.
- **LinkedIn Articles / Posts:** Publish a 300-500 word executive summary linking directly back to the canonical guide.

### Article #1 Canonical Frontmatter & Outline
```yaml
---
title: "<Problem-focused article title>"
published: true
description: "<135-160 character summary grounded in verified positioning>"
tags: engineering, webdev, startups, productivity
canonical_url: <https://example.com/articles/article-slug>
---
```
- **Target Primary URL:** `<https://example.com/articles/article-slug>`
- **Key Takeaways:** `<3 bullet takeaways grounded in verified project proof>`

---

## 6. AI Visibility Prompt Benchmark Suite & Optional MCP Setup

### Unbranded Discovery Prompt Benchmark (Run Monthly Across ChatGPT Search, Perplexity, Gemini, Claude)

| # | Locale | Buyer Stage | Unbranded Discovery Prompt | Target Engines | Citation & Fact Check Criteria |
|---|---|---|---|---|---|
| 1 | `en` | Idea-Stage Founder | `<Plain-language unbranded founder problem prompt>` | ChatGPT Search, Perplexity, Gemini, Claude | Direct domain or `sameAs` citation + accurate pricing anchor |
| 2 | `en` | Idea-Stage Founder | `<Budget and timeline-constrained unbranded MVP/service prompt>` | ChatGPT Search, Perplexity, Gemini, Claude | Brand appears in top 3 options with accurate turnaround |
| 3 | `en` | Operational Buyer | `<Mechanism-specific comparison or technical reliability prompt>` | ChatGPT Search, Perplexity, Gemini, Claude | Cites canonical page or GitHub/Clutch proof |
| 4 | `en` | Operational Buyer | `<Category + regional or compliance discovery prompt>` | ChatGPT Search, Perplexity, Gemini, Claude | Accurate `areaServed` and honest legal/team scope |
| 5 | `ar` | Idea-Stage Founder | `<Native Arabic unbranded discovery prompt without clichés>` | ChatGPT Search, Perplexity, Gemini, Claude | Arabic response links primary domain or Arabic profile |
| 6 | `ar` | Operational Buyer | `<Native Arabic technical/pricing comparison prompt>` | ChatGPT Search, Perplexity, Gemini, Claude | Accurate scope and pricing expressed cleanly in Arabic |

### Optional Open-Source & MCP Tooling Reference
- **`limelit-co/open`** (Apache-2.0): Go CLI + SQLite + MCP citation tracker for logging month-over-month AI engine mention rates.
- **`Auriti-Labs/geo-optimizer-skill`** (MIT): FastMCP server for scoring post-launch GEO extractability.
- **`AminForou/mcp-gsc`** (MIT): Read-only Google Search Console MCP for indexing and query impression checks.
- **`houtini-ai/google-knowledge-graph-mcp`** (MIT): Free-tier Google Knowledge Graph MID and `sameAs` entity lookup.
- **`ncosentino/bing-webmaster-mcp`** (MIT): Bing Webmaster Tools & IndexNow MCP (inspect repository source locally before running due to low star count).
- **`AgriciDaniel/claude-seo`** (MIT): E-E-A-T and technical SEO audit checklists.

---

## 7. Mandatory Self-Audit Checklist

| # | Audit Gate | Verification Evidence | Status |
|---|---|---|---|
| 1 | All 7 required H2 sections present in exact order with non-empty content | Checked against Role 1.6 template structure | PASS |
| 2 | Section 1 locks canonical name, origin, honest legal framing, pricing, and timelines | Cross-checked against positioning brief and bindings | PASS |
| 3 | Section 2 matrix includes Google Search Console, Bing Webmaster Tools, and >= 2 directories | Verified table rows for indexers and B2B hubs | PASS |
| 4 | Section 3 `sameAs` registry contains >= 2 external HTTPS URLs and zero self-references | Audited all URLs against `canonical_origin` netloc | PASS |
| 5 | Section 4 includes EN (+ native AR if configured) profiles and ethical review scripts | Confirmed zero fake/incentivized review language | PASS |
| 6 | Section 5 syndication frontmatter sets `canonical_url:` to `https://` on `canonical_origin` | Verified YAML frontmatter block in Section 5 | PASS |
| 7 | Section 6 has >= 5 unbranded discovery prompts (>= 2 AR if bilingual) and clean prose audit | Verified via `citation_audit.py` and `prose_audit.py` | PASS |
