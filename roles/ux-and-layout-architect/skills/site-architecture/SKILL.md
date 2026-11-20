---
name: site-architecture
description: Map the six portfolio sections, archive access, and flagship detail navigation for the Stage 3 blueprint.
---

# Portfolio hierarchy

Local adaptation of [Corey Haines site architecture](https://github.com/coreyhaines31/marketingskills/blob/main/skills/site-architecture/SKILL.md), consulted 2026-11-01. MIT notice: `../LICENSES.md`.

Use a shallow hierarchy: homepage sections and directly linked case-study details. Map component names, anchors, heading levels, source headings, and destination links in tables.

Inventory all visitor-facing Stage 1 content, including metadata, identity block, FAQs and five contact links. Explicitly exclude alternate H1 candidates and author checklists from the rendered page.

Choose canonical detail URLs for the six flagships. Specify direct loads and refreshes, enhanced desktop dialog behavior, mobile presentation, back/forward behavior, scroll restoration, focus return and no-JavaScript access.

Avoid duplicating a flagship in the archive data model: it may have two entry points into the same detail. All 13 archive entries must remain reachable. Document overlapping filter membership, counts and result announcements.

Use ASCII hierarchy, not new Mermaid. Do not create routes, XML sitemaps, structured-data code, or product files in this role.
