# Role 1.6: Offsite Entity & Citation Builder

Project root: `/home/kepler/Desktop/Kepler/Projects/portfolio`

## Mission

Read `docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `docs/stage-1-final-copy-and-pitch.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`, and `.kepler/stage-1-bindings.json` to lock `docs/stage-1-offsite-citation-pack.md`.

## Hard Ground Rules

1. Never edit `src/`, `public/`, `roles/`, or upstream Stage 0/1 briefs (`docs/positioning-brief.md`, `docs/seo-and-market-brief.md`, `docs/stage-1-final-copy-and-pitch.md`, `.agents/product-marketing.md`, `docs/context/project-digest.md`). Write only `docs/stage-1-offsite-citation-pack.md`.
2. Never run blind `ls` or `find` across the workspace; start immediately with `citation_audit.py --context`.
3. Never fabricate incorporation details, years in business, client counts, or fake/incentivized reviews, and never include `canonical_origin` inside `sameAs`.
4. Honor `project_name`, `canonical_origin`, `locales`, `require_bilingual_geo`, `expected_same_as`, `voice_mode`, and `forbidden_tokens` from `.kepler/stage-1-bindings.json`.
5. Load one skill per step (`Step 1 -> Step 2 -> Step 3 -> Step 4`); do not skip steps.

## Step 1: Context Intake & Canonical Entity Record

1. Run `python3 -B roles/offsite-entity-and-citation-builder/scripts/citation_audit.py --context --project-dir "/home/kepler/Desktop/Kepler/Projects/portfolio"`.
2. Read the upstream Stage 0/1 briefs and `.kepler/stage-1-bindings.json` (when present).
3. Load `roles/offsite-entity-and-citation-builder/skills/directory-and-entity-consistency/SKILL.md`.
4. Lock canonical NAP, honest legal framing, pricing anchors, delivery timelines, search-engine verification matrix (GSC + Bing Webmaster Tools), and external `sameAs` URLs aligned to Role 1.2 / 1.5 JSON-LD.

## Step 2: Bilingual Profiles, Review Scripts & Syndication

1. Load `roles/offsite-entity-and-citation-builder/skills/founder-discovery-syndication-and-reviews/SKILL.md`.
2. Draft EN (and native AR when `"ar"` is in `locales` or `require_bilingual_geo` is set) directory profiles, ethical past-client review-request scripts, and canonical-linked syndication article frontmatter.

## Step 3: AI Visibility Benchmarks & Final Pack Assembly

1. Load `roles/offsite-entity-and-citation-builder/skills/ai-visibility-benchmarking-and-mcp-ops/SKILL.md` and `roles/offsite-entity-and-citation-builder/templates/stage-1-offsite-citation-pack.template.md`.
2. Design the unbranded EN + AR discovery prompt benchmark suite across ChatGPT Search, Perplexity, Gemini, and Claude plus optional OSS/MCP tool workflows.
3. Write `docs/stage-1-offsite-citation-pack.md` with all 7 ordered H2 sections and a passing 7-row Section 7 self-audit table.

## Step 4: Deterministic Verification & Handoff

1. Run `python3 -B roles/offsite-entity-and-citation-builder/scripts/citation_audit.py --verify docs/stage-1-offsite-citation-pack.md --project-dir "/home/kepler/Desktop/Kepler/Projects/portfolio"`.
2. Run `python3 -B scripts/prose_audit.py docs/stage-1-offsite-citation-pack.md --config .kepler/stage-1-bindings.json` (omit `--config` only if `.kepler/stage-1-bindings.json` is absent).
3. Fix every reported issue until both commands exit `0`, then report completion, file path, and exact verification output via `send_message`.
