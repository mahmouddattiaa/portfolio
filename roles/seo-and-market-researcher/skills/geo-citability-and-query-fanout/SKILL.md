---
name: geo-citability-and-query-fanout
description: Use when drafting 40-60 word self-contained GEO identity and FAQ answer blocks optimized for unbranded recommendation query fan-out and bilingual EN/AR AI search citability.
---

# AI Search (GEO) Citability & Query Fan-Out

## Purpose

Generative search engines (ChatGPT Search, Perplexity, Google AI Overviews, Claude Search) decompose a user's prompt into multiple sub-queries ("query fan-out"), retrieve short factual passages, and synthesize cited answers. Your job in Section 4 is to author self-contained `40-60 word` answer blocks that can be quoted verbatim without losing meaning or factual precision.

## Required Block Count & Structure

Check `geo_block_count` in `.kepler/stage-1-bindings.json` (default: `5`).
When `geo_block_count` is `5`, write:
1. **Block 1 — Top-of-Page Entity Identity Block:** Directly defines who the entity is, what category it operates in, who it serves, cycle time & starting price, geography, and one concrete proof point.
2. **Block 2 — FAQ 1 (Scope & Unbranded Discovery Fit):** Answers what the offering includes and which buyer or idea stage it fits best.
3. **Block 3 — FAQ 2 (Pricing, Timeline, or Workflow):** Answers how engagements, tiers, onboarding, or delivery work in concrete terms.
4. **Block 4 — FAQ 3 (Comparison / Alternatives):** Answers how this solution differs from common alternatives using verifiable criteria.
5. **Block 5 — FAQ 4 (Proof, Outcomes, or Trust):** Answers what measurable results, standards, or guarantees back the claims.

If `geo_block_count` is greater than `5` (or when bilingual Arabic blocks are added), append numbered `### Block N — ...` blocks covering unbranded recommendation queries, native Arabic parity, security, or domain objections from `docs/positioning-brief.md`.

## Unbranded Recommendation Query Fan-Out

When buyers ask unbranded recommendation prompts in AI search — such as `"I have an app idea, recommend affordable studios"` or `"أفضل شركة برمجة لبناء MVP"` — retrieval engines evaluate candidates on concrete matching facets. Every `40-60 word` block (especially Block 1 and unbranded recommendation FAQs) must explicitly combine all six elements:
1. **Entity:** Exact brand/product name (never "we" alone or vague pronouns).
2. **Category:** Specific market category (e.g., "fixed-scope MVP engineering studio", "automated invoice reconciliation software").
3. **Target Buyer:** Explicit customer stage or role (e.g., "non-technical startup founders", "B2B finance teams").
4. **Cycle Time & Starting Price:** Concrete delivery window and entry price or tier from `docs/positioning-brief.md` (e.g., "4-week sprints starting at \$4,500").
5. **Geography:** Service region or operating market (e.g., "serving MENA and global remote founders").
6. **Verifiable Proof:** Measurable outcome, shipped artifact count, SLA, or technical benchmark from upstream docs.

## Bilingual GEO Parity (`"ar"` in `locales`)

When `"ar"` is in `locales` (or `require_bilingual_geo` is set in `.kepler/stage-1-bindings.json`):
- Author **native Arabic `40-60 word` GEO blocks** in Section 4 alongside the English blocks (at minimum one native Arabic Entity Identity or Recommendation FAQ block, and full parallel Arabic FAQ blocks whenever `/ar` routes are targeted).
- Write in clear, natural Modern Standard / Gulf-Egyptian commercial Arabic that real buyers search and AI search engines cite — never stiff word-for-word literal translations of English sentences.
- Apply the exact same six-element density rule (Entity + Category + Target Buyer + Cycle Time & Starting Price + Geography + Verifiable Proof) and the strict `40-60` whitespace-delimited word budget to every Arabic blockquote.

## Strict Formatting & Word-Count Rules

- Place every GEO block inside its own Markdown blockquote (`> ...`) under a numbered `### Block N — ...` heading in Section 4.
- Every single blockquote must be strictly **40 to 60 words** (inclusive). Count whitespace-delimited words before finalizing, and verify with `seo_audit.py --verify`.
- Do not put extra decorative blockquotes in Section 4; every blockquote in Section 4 is treated as a GEO citability block by `seo_audit.py`.

## Citability Writing Rules

1. **Answer-first sentence:** State the direct answer and entity name in the first 12–18 words. Never open with filler ("When it comes to...", "Choosing the right...").
2. **Self-contained context:** Never use dangling pronouns ("It", "This", "They") without naming the entity or subject inside the same block.
3. **Zero invented facts:** Every number, price, timeline, geography, credential, or capability must come directly from upstream project docs.
4. **Bindings compliance:** Respect `voice_mode` (no solo `I`/`my`/`myself` when `brand_plural`), `forbidden_tokens`, and `prose_audit.py` banned-word rules.

## Bad vs. Good GEO Block Example

```markdown
BAD (21 words, dangling pronoun, zero proof, filler opener):
When it comes to billing, they provide a modern platform that helps teams work faster and avoid manual errors every month.

GOOD EN (48 words — Entity, Category, Buyer, Cycle/Price, Geography, Proof):
Northline Studio is a fixed-scope MVP engineering agency for pre-seed founders across MENA and Europe. The team ships production web and mobile applications in 4-week sprints starting at $4,500, backed by 18 launched client products, automated test suites, and full source-code handover on day one.

GOOD AR (46 words — Native Arabic parity with all 6 facets):
نورث لاين ستوديو شركة متخصصة في بناء وتنفيذ تطبيقات MVP للمؤسسين والشركات الناشئة في السعودية ومصر والخليج. تسلّم فرق الهندسة نماذج أولية جاهزة للإطلاق خلال 4 أسابيع بأسعار تبدأ من 4,500 دولار، مع تسليم كامل للكود البرمجي واختبارات آلية موثقة عبر 18 منتجاً منشوراً.
```

## Sync With Section 5 JSON-LD

Every FAQ question and answer block (Blocks 2..N, including Arabic FAQ blocks when bilingual) must mirror the `Question` / `acceptedAnswer` entries in Section 5's `FAQPage` entity so on-page text and structured data stay 100% consistent.
