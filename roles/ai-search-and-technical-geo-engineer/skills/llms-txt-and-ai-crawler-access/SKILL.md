---
name: llms-txt-and-ai-crawler-access
description: Use when authoring or auditing public/llms.txt, robots.ts/robots.txt AI search vs. training-bot policies, and crawler access matrices.
---

# `llms.txt` Specification & AI Crawler Access (Step 1)

Make the site machine-readable for AI answer engines and retrieval crawlers without exposing private APIs or violating brand/training-bot policies.

## 1. AnswerDotAI `llms.txt` Specification

Place the file at `public/llms.txt` (served at `<canonical_origin>/llms.txt`). Follow the exact AnswerDotAI Markdown structure:

1. **H1 Title (Line 1):** `# <Brand or Product Name>` — single top-level heading matching the locked entity name.
2. **Blockquote Summary:** `> <1-3 concise sentences>` — state what the entity builds, who it serves, pricing floor or scope if public, and canonical domain. No marketing hype or banned buzzwords.
3. **Optional Context Paragraph:** Short plain-text facts (headquarters, delivery model, supported languages, primary contact).
4. **H2 Link Sections (`## ...`):** Group curated links as Markdown bullet items `- [Label](https://...): Short description` using absolute URLs rooted at `canonical_origin`.
   - Core sections typically include `## Core Pages`, `## Services & Pricing` (or `## Product & Docs`), and `## Legal & Contact`.
   - Every URL must match `canonical_origin` when configured in `.kepler/stage-1-bindings.json`.

### Bilingual EN + AR `llms.txt` Rules

When `"ar"` is in `locales` and either an `/ar` route is in `required_routes` or `require_bilingual_geo` is `true`:
- Include an Arabic summary sentence (in the blockquote or under `## Arabic Overview / النظرة العامة`) written in natural, accurate Arabic script without English `/mo` unit leaks.
- Include explicit `- [Label](<canonical_origin>/ar...)` links for all Arabic routes in a dedicated `## Arabic Routes` (or `## الصفحات العربية`) section.

```markdown
# Example Studio

> Example Studio builds scoped web applications and internal tools for founders and product teams in 2 to 5 weeks, starting at $2,500 per milestone.
> تبني Example Studio تطبيقات ويب مخصصة وأنظمة أعمال للفرق والشركات الناشئة خلال أسبوعين إلى خمسة أسابيع بنطاق وتسعير واضحين.

## Core Pages

- [Home](https://example.com/): Overview of services, delivery model, and client proof.
- [Pricing](https://example.com/pricing): Transparent project tiers and milestone pricing.

## Arabic Routes

- [الصفحة الرئيسية](https://example.com/ar): ملخص الخدمات والباقات باللغة العربية.
```

## 2. AI Search & Citation Bots vs. Training-Bot Matrix

Separate **live AI search/citation retrieval bots** (which users rely on to cite and link your pages in answers) from **foundation-model training crawlers** (which scrape data for future model pre-training). Never lump them under a blind `User-agent: *` block.

| User-Agent | Operator | Category | Default Policy | Notes |
|---|---|---|---|---|
| `OAI-SearchBot` | OpenAI | AI Search / Citation | `Allow: /` | Required for ChatGPT search citations; never block with `Disallow: /` |
| `ChatGPT-User` | OpenAI | Live User Fetch | `Allow: /` | Triggered on user link inspection inside ChatGPT |
| `PerplexityBot` | Perplexity | AI Search / Citation | `Allow: /` | Indexes pages for Perplexity citations; never block with `Disallow: /` |
| `Perplexity-User` | Perplexity | Live User Fetch | `Allow: /` | Real-time user-triggered page retrieval |
| `ClaudeBot` | Anthropic | AI Search / Retrieval | `Allow: /` | Anthropic web index crawler; keep `Allow: /` unless explicitly opted out |
| `Claude-SearchBot` | Anthropic | AI Search / Citation | `Allow: /` | Search-specific retrieval crawler |
| `Bingbot` | Microsoft | Search Index | `Allow: /` | Powers Bing, Copilot search, and IndexNow discovery |
| `Googlebot` | Google | Search Index | `Allow: /` | Powers Google Search and AI Overviews |
| `GPTBot` | OpenAI | Model Training | Explicit `Allow` or `Disallow` | Separate decision from `OAI-SearchBot`; match owner preference |
| `Google-Extended` | Google | Model Training (Gemini) | Explicit `Allow` or `Disallow` | Does not block Googlebot search indexing; match owner preference |

### Implementation Patterns (`robots.txt` vs. `src/app/robots.ts`)

- Always declare `Sitemap: <canonical_origin>/sitemap.xml` (or `sitemap` property in `robots.ts`).
- You may disallow non-public paths (`/api`, `/admin`, `/_next`) under `User-agent: *`, while keeping `/`, `/ar`, and public routes open.
- Never place `Disallow: /` on `OAI-SearchBot`, `PerplexityBot`, or `ClaudeBot`, and never leave `User-agent: *` with `Disallow: /` without explicit `Allow: /` overrides for search/citation bots.

```ts
// src/app/robots.ts (Next.js MetadataRoute.Robots pattern)
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api", "/_next"] },
      { userAgent: ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "ClaudeBot", "Claude-SearchBot", "Bingbot", "Googlebot"], allow: "/" },
      { userAgent: ["GPTBot", "Google-Extended"], allow: "/" }, // or disallow: "/" per owner policy
    ],
    sitemap: "https://example.com/sitemap.xml",
  };
}
```

## 3. Optional OSS Tooling (Non-Blocking Enhancements)

If the target environment permits Node/Python package installation outside the kit's stdlib scripts, these vetted open-source tools help generate and test `llms.txt`:
- **`AnswerDotAI/llms-txt` (Apache-2.0):** Reference `llms_txt` parser and CLI (`llms_txt2ctx`) to validate section headings, blockquote summary, and Markdown link extraction against the official spec.
- **`strattlabs/llms-txt-kit` (MIT):** Build-time generator and validator for `llms.txt` / `llms-full.txt` bundles in Next.js and static repositories.
