---
name: positioning-workshop
description: Use when defining product category, buyer ICPs, competitive alternatives, proof-backed differentiation, and the Geoffrey Moore positioning statement for Stage 1.
---

# Positioning Workshop (Geoffrey Moore + April Dunford)

## Purpose
Turn raw project facts (`docs/context/project-digest.md`, `.agents/project-brief.md`, optional Stage 0 PRD, and `.kepler/stage-1-bindings.json`) into a sharp, defensible market position before any offer packaging, SEO research, or copywriting starts.

## Core Methodology (5-Part Dunford Sequence)

Work strictly in this order so each decision constrains the next:

### 1. Competitive Alternatives (What Buyers Actually Do Today)
Never list only direct software rivals. Identify what target buyers would use if this product or service did not exist:
- **Status-quo workarounds:** spreadsheets, manual scripts, email threads, ad-hoc freelance hires, or doing nothing.
- **Direct category peers:** established vendors, open-source incumbents, or competing agencies.
- **Internal build:** engineering teams maintaining brittle in-house tooling.

For each alternative, name the exact failure mode that triggers switching (e.g., slow turnaround, hidden billing, lack of deterministic validation, broken handoffs).

### 2. Unique Attributes & Verified Capabilities
List only capabilities that exist in the project digest or locked PRD. Pair every attribute with a concrete artifact, metric, architecture decision, or delivery guarantee.
- Reject unverified adjectives. Replace vague claims with observable mechanisms (e.g., "zero external runtime dependencies" instead of "fast and lightweight").
- If a capability is planned rather than shipped, label its maturity explicitly so downstream copywriters never overclaim.

### 3. Differentiated Value (Jobs-To-Be-Done Outcomes)
Translate each unique attribute into the measurable buyer outcome it unlocks:
- **Functional job:** what task finishes faster, safer, or with fewer errors.
- **Operational risk reduction:** what failure mode disappears (downtime, compliance drift, rework, vendor lock-in).
- **Economic impact:** what time, headcount, or budget is reclaimed.

### 4. Target Buyer & User Profiles (ICPs)
Define 2 to 4 concrete segments. For each ICP, document:
- **Role & context:** who signs off (economic buyer) vs. who operates the product daily (end user).
- **Trigger event:** the exact moment they start searching for an alternative.
- **Underserved JTBD need:** what current alternatives fail to solve cleanly.
- **Primary objection:** the main reason they hesitate to adopt or buy.
- **Buyer vocabulary:** exact phrases they type into search or say on discovery calls.

#### Dual-ICP Discovery Coverage (Mandatory Separation)
When a product or service serves both early-stage founders and established teams, separate these two buyer modes explicitly instead of merging them into one generic persona:
- **(a) Unbranded / Idea-Stage Discovery Buyers:** Founders, operators, or non-technical buyers who do not search with engineering or agency jargon. They ask plain-language discovery questions (for example: *"I have an app idea, who can build an MVP?"*, *"how much does it cost to build a custom app?"*, or Arabic equivalents such as *"عندي فكرة تطبيق مين يبرمجها؟"* / *"كم تكلفة بناء تطبيق MVP؟"*). Capture these verbatim unbranded discovery queries in the ICP `Buyer Vocabulary` column.
- **(b) Mature Operational / Technical Buyers:** COOs, CTOs, VPs of Engineering, or product leads evaluating replacement of manual workflows, system integration, reliability, or delivery velocity (for example: *"fixed-scope legacy checkout rebuild"*, *"production engineering sprint with automated verification"*). Capture their operational and technical phrases separately in `Buyer Vocabulary`.

### 5. Market Category & Geoffrey Moore Positioning Statement
Choose a market category that makes the unique value obvious within 5 seconds:
- **Existing category:** best when buyers already have budget and search volume for the category name.
- **Sub-category / niche:** best when winning a specific vertical, workflow, or technical constraint against broad incumbents.
- **New category:** use only when no existing label fits without misleading buyers; always anchor it to a familiar reference point.

Draft the positioning statement using the Geoffrey Moore template:
- **For** `<target buyer segment>`
- **Who** `<underserved JTBD need or acute pain>`
- **The `<product/brand>`** is a `<market category>`
- **That** `<primary quantified or verifiable benefit>`
- **Unlike** `<primary competitive alternative and status-quo workaround>`
- **Our product/service** `<key proof-backed differentiation mechanism>`

## Bad vs. Good Positioning Examples

```markdown
BAD (Vague, adjective-heavy, unprovable):
For modern businesses who want better digital experiences, Acme is an innovative
platform that delivers cutting-edge, scalable solutions with unmatched quality.

GOOD (Specific ICP, real alternative, concrete mechanism):
For B2B finance teams reconciling multi-currency invoices across 3+ ERPs, LedgerCheck
is an automated reconciliation engine that flags line-item discrepancies before month-end
close. Unlike manual spreadsheet audits or brittle custom scripts, LedgerCheck runs
deterministic decimal checks with immutable audit logs in under 5 minutes.
```

```markdown
BAD (Generic studio/tool claim):
We help startups grow faster with clean code and modern design.

GOOD (Sharp trigger, clear boundary, verifiable proof):
For seed-to-Series-A engineering leads blocked by slow legacy checkouts, Orbit Studio
delivers fixed-scope web performance and checkout rebuilds in 4 weeks. Unlike open-ended
retainer agencies, every engagement ships with automated Lighthouse budgets and documented
handoff runbooks.
```

## Voice & Binding Compliance Check
Before moving to Step 2, verify your positioning thesis against `.kepler/stage-1-bindings.json` (if present):
- Check `voice_mode` (`brand_plural`, `solo_first_person`, or `neutral`).
- Ensure zero `forbidden_tokens` appear in positioning statements or category names.
- Confirm every `required_offers`, `required_routes`, and `required_items` entry has a clear strategic home.
