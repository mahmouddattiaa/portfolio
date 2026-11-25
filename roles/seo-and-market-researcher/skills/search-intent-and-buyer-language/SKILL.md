---
name: search-intent-and-buyer-language
description: Use when harvesting live English and Arabic autocomplete buyer queries and unbranded discovery phrases with keyword_suggest.py, clustering intent, and mapping keyword clusters to project routes.
---

# Search Intent & Buyer Language

## Purpose

Turn the positioning strategy from `docs/positioning-brief.md` and `.agents/product-marketing.md` into grounded, buyer-phrased search intent clusters mapped to concrete site routes. Never invent search volume numbers or rely on internal jargon that buyers do not type into search engines.

## Step 1 — Derive 2 to 5 Clean Seed Queries (Including Unbranded Discovery)

Extract seeds directly from the category, core problem, and primary use cases in `docs/positioning-brief.md`:
- **Category seed:** what the product or service is called by buyers (e.g., `"automated invoice reconciliation"`, `"mvp development studio"`).
- **Problem / Unbranded Discovery seed:** how founders or buyers search before knowing vendor names (e.g., `"turn app idea into MVP"`, `"where to build an app idea"`, `"month end reconciliation software"`).
- **Offer / audience seed:** role or segment modifier (e.g., `"finance ops automation"`, `"saas agency for founders"`).
- **Arabic seeds (when `"ar"` is in `locales`):** native buyer phrases such as `"تنفيذ فكرة تطبيق MVP"` or `"شركة برمجة تطبيقات"` (never machine-translate English idioms).

Keep each seed 2–5 words long so autocomplete returns real long-tail completions.

## Step 2 — Harvest Live Autocomplete with `keyword_suggest.py`

Run the kit's zero-API harvester with intent expansion enabled:

```bash
python3 roles/seo-and-market-researcher/scripts/keyword_suggest.py \
  "<seed-1>" "<seed-2>" "<seed-3>" \
  --expand-intents --format markdown
```

### Bilingual Harvesting (`--lang ar`)

When `"ar"` is configured in `locales` (in `.kepler/stage-1-bindings.json`), run a dedicated Arabic pass using `--lang ar`:

```bash
python3 roles/seo-and-market-researcher/scripts/keyword_suggest.py \
  "تنفيذ فكرة تطبيق" "بناء MVP" \
  --lang ar --expand-intents --format markdown
```

`--expand-intents` automatically selects locale-specific buyer modifiers:
- **`--lang en` (5 modifiers):** `alternative`, `pricing`, `vs`, `for`, `how to`
- **`--lang ar` (7 Arabic modifiers):** `سعر`, `تكلفة`, `أفضل شركة`, `للشركات الناشئة`, `كيف`, `في السعودية`, `في مصر`

If network access is unavailable or a query returns no completions, record the exact command and note the offline fallback using verbatim buyer phrasing from `docs/positioning-brief.md` and `.agents/product-marketing.md`. Never fabricate third-party volume metrics.

## Step 3 — Harvest & Classify Unbranded Discovery Queries Alongside Core Clusters

Buyers frequently ask unbranded discovery questions before comparing vendors (e.g., `"turn app idea into MVP"`, `"where to build an app idea"`, `"تكلفة تنفيذ فكرة تطبيق MVP"`). Always harvest and cluster these explicitly alongside commercial and comparison queries:

| Intent Stage | Buyer Mindset | Typical Modifiers | Best Route Type |
| --- | --- | --- | --- |
| **Unbranded Discovery** | Has a goal or idea and is looking for where/how to execute | `"turn app idea into MVP"`, `"where to build an app idea"`, `"تكلفة تنفيذ فكرة تطبيق MVP"` | `/`, `/services`, `/ar`, GEO FAQ blocks |
| **Commercial** | Ready to evaluate a vendor or solution | `software`, `platform`, `agency`, `service`, `pricing`, `سعر`, `تكلفة`, `أفضل شركة` | `/`, `/features`, `/services`, `/pricing`, `/ar` |
| **Comparison** | Shortlisting options or switching away from incumbents | `vs`, `alternative`, `best`, `compare`, `review` | `/pricing`, `/compare`, `/about`, FAQ blocks |
| **Informational** | Diagnosing a problem or learning a method | `how to`, `what is`, `guide`, `checklist`, `كيف` | `/docs`, `/blog`, `/about`, GEO FAQ blocks |
| **Navigational / Brand** | Verifying entity trust, credentials, or contact path | brand name, `contact`, `case studies`, `security` | `/`, `/about`, `/contact`, `/work` |

## Step 4 — Map Clusters 1-to-1 to Routes (Prevent Cannibalization)

1. Check `required_routes` and `locales` in `.kepler/stage-1-bindings.json` (if present) so every required route (including `/ar` routes when configured) gets an explicit intent assignment.
2. Assign **one primary commercial or discovery cluster per route**. Two routes in the same locale must never compete for the exact same primary keyword.
3. Attach 2–4 secondary buyer phrases (including unbranded discovery variants) to each cluster to guide `H2`/`H3` headings and body copy.
4. Pair every cluster with one verifiable proof point or mechanism from `docs/positioning-brief.md` so the downstream Copywriter (Role 1.3) knows what evidence justifies ranking for that query.

## Output Checklist for Section 1

- Seed Harvest Summary table lists exact seeds run (EN and AR when bilingual), `--lang` flag and intent modifiers used, top observed suggestions, and target route.
- Clustered Buyer Intent Map explicitly covers **Unbranded Discovery**, **Commercial**, **Comparison**, and **Informational** stages without duplicate primary targets across same-locale routes.
- Zero invented monthly search volume figures, zero internal-only buzzwords, and full compliance with `voice_mode` and `forbidden_tokens` from `.kepler/stage-1-bindings.json`.
