# Kepler Dev Agency Rebuild — Working Brief

Status: architecture baseline for review  
Prepared: 9 August 2026  
Implementation status: not started

## Mission

Transform `keplerdev.uk` from a personal, low-ticket freelancer portfolio into the English-first agency presence for Kepler Dev while preserving Mahmoud Attia's technical history at `/mahmoud`.

The agency should sell scoped product delivery to founders and operators whose customer, staff, and management workflows are fragmented across WhatsApp, spreadsheets, paper, or disconnected software. The experience must be premium, calm, technically credible, and honest about the founder-led delivery model.

## Authoritative inputs

This document set reconciles:

- `docs/plans/agency-rebuild/Kepler-Dev-Portfolio-Transformation-Brief.md`
- `docs/plans/agency-rebuild/prompts/PROMPT-01-Kepler-Portfolio-UX-Architect.md`
- `docs/KeplerDev/Kepler-Dev-Agency-Plan(1).md`
- `docs/KeplerDev/Kepler-Dev-Market-Research.md`
- `docs/KeplerDev/Kepler-Dev-Offer-Architecture.md`
- `docs/KeplerDev/KEPLERDEV_PROJECT_PORTFOLIO.md`
- the implementation under `src/` and assets under `public/`
- live project memory in the Obsidian vault

When strategy documents and current code disagree, current code is authoritative for what is published; approved strategy is authoritative for the intended agency direction; unresolved publication facts remain blocked.

## Locked direction

- Primary buyer: GCC founder or owner with a real operational workflow and a small-to-medium team.
- Secondary buyer: international/Upwork founder needing a scoped MVP or product build.
- Position: founder-led product engineering studio for connected mobile products, backends, dashboards, integrations, and launch support.
- Offer ladder: Product Blueprint, Launch Sprint, Operations Platform, Product Care.
- MVP routes: `/`, `/work`, `/work/[slug]`, `/mahmoud`, and `/contact`.
- Current Next.js/React/Tailwind stack remains; the audit found no evidence for a rewrite.
- English-first MVP, with content and layout contracts ready for future Arabic/RTL.
- Light, dark, and system theme selection is part of the foundation.
- Unverified metrics, permissions, testimonials, delivery promises, or team claims cannot be published as fact.

## Success condition

The MVP is complete when a qualified buyer can understand the problem Kepler Dev solves, see defensible proof, understand the engagement paths and founder-led model, and submit a useful project enquiry without encountering contradictory low-budget positioning.

## Reading order

1. `01-repo-and-live-site-audit.md`
2. `02-content-and-claim-inventory.md`
3. `03-information-architecture.md`
4. `05-design-system-and-wireframes.md`
5. `06-implementation-plan.md`
6. `decisions.md`

