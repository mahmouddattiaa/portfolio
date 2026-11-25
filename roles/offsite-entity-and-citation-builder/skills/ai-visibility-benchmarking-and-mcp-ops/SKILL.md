---
name: ai-visibility-benchmarking-and-mcp-ops
description: Use when designing EN and AR unbranded discovery prompt benchmarks across AI answer engines and documenting optional OSS citation trackers and search MCP workflows.
---

# AI Visibility Benchmarking & Optional MCP Ops

Measure whether AI answer engines cite and recommend the brand for unbranded buyer problems—without guessing—and document lightweight open-source tools teams can run locally to monitor search, entity graph, and citation metrics.

## 1. Unbranded Discovery Prompt Benchmark Design

Branded queries ("What is `<Project Name>`?") only test recall. Offsite visibility depends on **unbranded category and problem queries** where a buyer does not yet know the brand exists.

Include at least **5 distinct unbranded discovery prompts** in Section 6 (and at least **2 native Arabic prompts** when `"ar"` is in `locales` or `require_bilingual_geo` is configured):

1. **Idea-Stage Founder Prompts (Plain-Language Bottleneck):**
   - Ask from the perspective of a non-technical or early-stage founder describing symptoms, budget constraints, or timeline urgency without jargon.
   - Example: *"Who builds reliable custom MVPs for early-stage SaaS founders in under four weeks with fixed pricing?"*
2. **Operational Buyer / Technical Lead Prompts (Mechanism & Comparison):**
   - Ask about concrete architecture, verification guarantees, compliance, or regional delivery (e.g., bilingual EN/AR web systems, fixed-scope engineering sprints).
3. **Native Arabic Discovery Prompts (when bilingual):**
   - Write natural Gulf/Egyptian founder queries rather than translated English phrasing (e.g., *"ما هي أفضل شركة أو فريق تقني لبناء موقع وتطبيق متكامل لشركة ناشئة بتكلفة واضحة؟"*).
   - Zero Arabic corporate clichés and zero `/mo` unit leaks.

## 2. Scoring Protocol Across Four Answer Engines

Run each prompt verbatim on a clean, logged-out or fresh session across **ChatGPT Search**, **Perplexity**, **Gemini**, and **Claude** on a monthly cadence:

- **Citation / Link Present (`Y/N`):** Does the answer link directly to `canonical_origin` or a verified `sameAs` directory profile?
- **Brand Mention Position (`0` = absent, `1-3` = top tier, `4+` = late mention):** Track rank among recommended alternatives.
- **Fact Accuracy (`Pass/Drift`):** Check whether the engine states the correct pricing anchor, timeline, and service scope—or hallucinates outdated claims.
- **Competitor & Directory Sources Cited:** Record which third-party domains (Clutch, GoodFirms, GitHub, Dev.to, LinkedIn) the engine relied on so directory and syndication effort targets the exact sources driving answers.

## 3. Optional Open-Source & MCP Tooling Reference

Document these optional MIT / Apache-2.0 tools cleanly in Section 6 as operator aids (do not treat them as mandatory runtime dependencies for Stage 1 verification):

| Tool / Repository | License | Purpose in Offsite & GEO Ops | Operational Notes |
|---|---|---|---|
| `limelit-co/open` | Apache-2.0 | Go CLI + SQLite tracker + MCP server for monitoring AI search citations across engines | Stores historical prompt runs locally for month-over-month citation diffs |
| `Auriti-Labs/geo-optimizer-skill` | MIT | FastMCP server and rubric for scoring Generative Engine Optimization (GEO) citability | Useful for auditing page extractability after Stage 2/3 deployment |
| `AminForou/mcp-gsc` | MIT | Google Search Console MCP server for inspecting search impressions, clicks, and indexing errors | Requires Google Cloud OAuth/service-account credentials scoped read-only |
| `houtini-ai/google-knowledge-graph-mcp` | MIT | Free-tier Google Knowledge Graph Search API MCP for looking up entity `MID` and `sameAs` confidence | Verify whether the brand resolves to a Knowledge Graph MID over time |
| `ncosentino/bing-webmaster-mcp` | MIT | Bing Webmaster Tools & IndexNow MCP bridge for Bing / ChatGPT Search indexing checks | **Security note:** Inspect the repository source locally before running due to low community star count |
| `AgriciDaniel/claude-seo` | MIT | Structured E-E-A-T and technical SEO audit rubrics for agentic site reviews | Complements Role 1.2 on-page checks with experience/authority checklists |

## 4. Cadence & Regression Triggers

- **Baseline Run:** Run all benchmark prompts before directory submissions go live (`T0`), at `T+30` days after GSC/Bing indexing and `sameAs` propagation, and quarterly thereafter.
- **Regression Trigger:** If a previously cited prompt drops or shows wrong pricing/legal claims, inspect Bing Webmaster Tools indexing first (for ChatGPT Search) and verify Clutch/LinkedIn/on-site JSON-LD parity before changing copy.
