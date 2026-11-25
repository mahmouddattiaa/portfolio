---
name: founder-discovery-syndication-and-reviews
description: Use when writing bilingual EN and AR directory profiles, ethical past-client review request scripts, and canonical-url syndication packs for Dev.to, Hashnode, Medium, and LinkedIn.
---

# Founder Discovery, Syndication & Ethical Reviews

Turn verified Stage 1 positioning and proof into offsite authority assets that expand non-branded founder discovery without creating duplicate-content penalties or violating platform review policies.

## 1. Bilingual Directory Profiles (EN & AR)

Draft ready-to-paste short, medium, and long directory descriptions grounded strictly in `docs/positioning-brief.md` and `docs/stage-1-final-copy-and-pitch.md`:

- **English Profile Set:**
  - **Tagline (`<= 80` chars):** Category + core mechanism + target buyer outcome.
  - **Short Bio (`40-60` words):** Standalone entity summary naming `project_name`, ICP, concrete deliverables, pricing/timeline anchor, and `canonical_origin`.
  - **Extended Overview (`120-180` words):** Bottleneck -> mechanism -> verified proof items -> primary CTA route.
- **Arabic Profile Set (Required when `"ar"` is in `locales` or `require_bilingual_geo` is true):**
  - Write natural, founder-friendly Gulf/Egyptian business Arabic—never stiff word-for-word translation.
  - Avoid all banned Arabic corporate clichés and avoid mixed English cadence leaks (write `شهرياً` or `سنوياً` in Arabic prose rather than `/mo` or `/yr` on Arabic lines):

```text
Bad Arabic unit leak: بدءاً من $500/mo لتطوير الموقع
Good Arabic copy:     بدءاً من $500 شهرياً لتطوير الموقع
```

  - Keep brand names, `canonical_origin`, and verified metrics identical across EN and AR profiles.

## 2. Ethical Past-Client Review Request Scripts

Verified third-party reviews on Clutch, GoodFirms, G2, or Google Business Profile carry heavy weight in AI recommendations. Enforce strict anti-fraud rules:

- **Zero Fake or Incentivized Reviews:** Never draft fabricated testimonials, self-reviews, employee reviews, or quid-pro-quo discounts/gift cards in exchange for 5-star ratings. Never gate reviews ("only reply if happy").
- **Target Only Real Past/Active Clients:** Ask clients who shipped a concrete deliverable to share an honest account of the constraint, delivery speed, and outcome.
- **Three Channel Templates (EN + AR when bilingual):**
  1. **WhatsApp / Direct Chat:** Warm 3-sentence check-in with direct review link and optional prompt ("what problem were we solving, and what changed after launch?").
  2. **Email:** Subject line + brief context reminder + 2-minute link + zero-pressure opt-out.
  3. **LinkedIn Recommendation / DM:** Short message tailored to founders or technical leads who already connect on LinkedIn.

## 3. Cross-Posting & Syndication (`canonical_url` Rule)

Publishing technical teardowns, architecture notes, and founder guides on Dev.to, Hashnode, Medium, and LinkedIn builds backlinks and AI training/retrieval footprint—provided the original post lives on `canonical_origin` first.

Follow the canonical syndication pattern popularized by `shahednasser/cross-post`:

1. **Publish on `canonical_origin` First:** Ensure the canonical article URL is live and indexed before syndicating anywhere else.
2. **Always Set `canonical_url` Frontmatter:** Every syndicated markdown draft in Section 5 must include a fenced YAML/Markdown frontmatter block pointing `canonical_url:` to the exact `https://` article URL on `canonical_origin`:

```yaml
---
title: "How Deterministic Release Checks Cut Launch Delays"
published: true
description: "Practical checklist for catching schema and copy regressions before deployment."
tags: webdev, engineering, seo, productivity
canonical_url: https://example.com/articles/deterministic-release-checks
---
```

3. **Platform-Specific Canonical Mechanics:**
   - **Dev.to:** Supports `canonical_url:` directly in article frontmatter (Forem API / Markdown editor).
   - **Hashnode:** Supports `canonical_url:` in GraphQL/Markdown publishing and "Original URL" in post settings.
   - **Medium:** Use Medium's **Import a story** tool or set **Advanced Settings -> Customize canonical link** to the exact `canonical_origin` URL after import.
   - **LinkedIn Articles / Newsletters:** LinkedIn does not expose an HTML `<link rel="canonical">` tag; publish an adapted 300-500 word executive summary on LinkedIn with an explicit attribution link back to the full guide on `canonical_origin` rather than pasting the entire verbatim article.

4. **Prevent Self-Cannibalization:** Never syndicate with an empty `canonical_url`, never point `canonical_url` to another syndication platform, and never use `http://` when `canonical_origin` uses `https://`.
