---
name: technical-geo-crawl-and-indexnow
description: Use when auditing sitemap.ts/sitemap.xml, canonical URLs, reciprocal hreflang, SSR HTML crawlability, and submitting IndexNow URL pings.
---

# Technical GEO Crawl Hygiene & IndexNow (Step 3)

Verify that every indexable route is discoverable in `sitemap.ts` / `sitemap.xml`, emits clean canonical and reciprocal `hreflang` tags, renders core content in initial SSR HTML, and supports instant IndexNow indexing.

## 1. Sitemap Hygiene (`src/app/sitemap.ts` / `public/sitemap.xml`)

- Every indexable route in `required_routes` (plus verified blog/case-study routes) must appear with an absolute URL rooted at `canonical_origin`.
- Exclude `noindex`, redirect (`3xx`), or private utility routes (`/api`, `/404`, `/thank-you` if `noindex`).
- Keep trailing-slash convention identical across `sitemap`, `<link rel="canonical">`, `hreflang`, and `llms.txt` (`https://example.com/` for root, `https://example.com/ar` or `/pricing` without mixed trailing slashes).
- Include accurate `lastModified` / `<lastmod>` dates and `alternates.languages` (or `<xhtml:link rel="alternate" hreflang="...">`) when bilingual routes exist.

```ts
// src/app/sitemap.ts (Next.js MetadataRoute.Sitemap pattern)
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://example.com";
  return [
    {
      url: `${origin}/`,
      lastModified: new Date("2026-01-15"),
      alternates: { languages: { en: `${origin}/`, ar: `${origin}/ar` } },
    },
    {
      url: `${origin}/ar`,
      lastModified: new Date("2026-01-15"),
      alternates: { languages: { en: `${origin}/`, ar: `${origin}/ar` } },
    },
  ];
}
```

## 2. Canonical & Reciprocal `hreflang` Audit

- **Self-referencing canonical:** Each route emits `<link rel="canonical" href="<canonical_origin><route>" />` pointing to its own preferred URL (never pointing `/ar` back to `/`).
- **Reciprocal `hreflang`:** If `/` declares `hreflang="ar"` pointing to `/ar`, then `/ar` must declare `hreflang="en"` pointing back to `/` plus self-referencing `hreflang="ar"` and `x-default` pointing to `/`.
- **Single-language consistency:** Omit cross-locale `hreflang` links for routes that do not have a translated counterpart.

## 3. SSR HTML Crawlability Check

AI search crawlers (`OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`) often do not execute heavy client-side JavaScript:
- Confirm `<h1>`, primary GEO summary text, FAQ answers, and `<script type="application/ld+json">` exist in the initial server-rendered HTML response (`curl -s` or build output `.next/server/app/*.html`), not deferred behind client-only `useEffect` or `"use client"` fetch hooks.
- Verify no unintended `X-Robots-Tag: noindex` or `<meta name="robots" content="noindex">` header/tag exists on indexable routes.

## 4. IndexNow Instant Ping Workflow (`scripts/indexnow_ping.py`)

IndexNow notifies Bing (which feeds Microsoft Copilot and downstream AI search indexes) and Yandex immediately when technical GEO or copy updates ship.

1. **Provision Key File:** Generate an alphanumeric/hyphen key (`8-128` chars, `^[A-Za-z0-9-]{8,128}$`) and place it at `public/<key>.txt` containing only `<key>`.
2. **Verify Key File:**
   `python3 -B roles/ai-search-and-technical-geo-engineer/scripts/indexnow_ping.py --verify-key public/<key>.txt`
3. **Preview Payload (Offline Dry-Run):**
   `python3 -B roles/ai-search-and-technical-geo-engineer/scripts/indexnow_ping.py --submit --host example.com --key <key> --urls https://example.com/ https://example.com/ar --dry-run`
4. **Live Submission (Only After Deploy & When Authorized):**
   Remove `--dry-run` to POST JSON (`Content-Type: application/json; charset=utf-8`) to `https://api.indexnow.org/indexnow` and confirm HTTP `200` or `202`.

## 5. Optional OSS Crawl & Audit Handoff

- **`squirrelscan/squirrelscan` (MIT):** Run `squirrel audit <origin> --format llm` in staging/live environments to collect broken links, redirect chains, and SSR metadata anomalies in LLM-readable output.
- **`harlan-zw/unlighthouse` (MIT):** Run full-site SEO, accessibility, and Core Web Vitals sweeps across all sitemap routes before final production sign-off.
