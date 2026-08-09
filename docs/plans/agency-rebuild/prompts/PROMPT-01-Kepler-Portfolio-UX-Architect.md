# Prompt 01 — Kepler Dev Portfolio UX Architect and Repository Audit

Copy the prompt below into the Codex agent that already has access to the portfolio source repository.

---

You are the senior UX architect and repository auditor for the Kepler Dev agency-portfolio transformation.

Your current task is **read-only analysis and planning**. Do not redesign or modify production application code yet. You may create documentation only under `docs/agency-rebuild/`.

## Business objective

Transform the root of `keplerdev.uk` from Mahmoud Attia's personal developer portfolio into the agency portfolio for Kepler Dev. Preserve Mahmoud's truthful personal/career portfolio under `/mahmoud` unless the existing architecture provides a strong, documented reason for another route.

Kepler Dev is an honest founder-led product studio. It must not pretend to have a large permanent team. Additional specialists are introduced transparently only when project scope and funding require them.

### Primary buyer

An owner/founder of a growing GCC operational business—service, retail, mobility, fuel/energy service, field operation, booking, loyalty, or similar—whose customer, staff, and management workflows are fragmented across WhatsApp, spreadsheets, paper, or disconnected tools.

### Secondary buyer

An international founder with a validated problem who needs a focused mobile or full-stack product taken from scope through deployment.

### Position

“Kepler Dev turns fragmented customer, staff, and management workflows into one focused mobile-first operational product.”

### Offers

1. Product Blueprint.
2. Launch Sprint.
3. Operations Platform.
4. Product Care.

## Critical truth constraints

- Do not treat every current project as a production client project.
- StayEase and FitForge are concepts, not completed production products.
- iScore is risky for public promotion and must not remain as a normal public agency case study without explicit approval and corrected role/dates.
- gLiter is the strongest operations-platform proof but company naming/screenshots require confirmation before publication.
- QuickChargingPOS is employer work and must identify Mahmoud's real role or be anonymized.
- HS VPN is a production client product but every metric and permission still requires verification.
- Focus Ritual is internal/capability work.
- Aksira and PetSpot are Kepler-owned products in development.
- Resolve whether the current “Faseeh AI Keyboard” is Aksira, a previous name, or a separate product. Do not assume.
- Flag all public claims including production counts, earnings, testimonials, dates, delivery promises, and metrics for verification.
- The current $300–$1,500 positioning and “final delivery by day 7” message conflict with the approved agency offers and must not survive on the agency root.

## Required work

1. Inspect the entire repository structure, package manifests, framework, routing, content sources, components, assets, styling, forms, analytics, metadata, tests, configuration, and Vercel-related files.
2. Run the project locally if safe and supported by the repository instructions. Record commands, missing environment requirements, and any failures.
3. Inspect the current root page and all accessible routes at mobile, tablet, and desktop sizes where tooling allows.
4. Produce a route map and component/content dependency map with exact repository paths.
5. Identify what can be reused, what must be rewritten, what should move to `/mahmoud`, and what should be removed from public output.
6. Audit the current conversion journey, navigation, information hierarchy, trust signals, CTAs, contact flow, accessibility, responsiveness, SEO, performance risks, and claim integrity.
7. Propose the minimum credible agency information architecture. At minimum assess `/`, `/work`, `/work/[slug]`, `/mahmoud`, and `/contact`. Avoid empty pages.
8. Recommend the homepage section sequence and explain the purpose of every section.
9. Define a case-study content model that records classification, production status, Mahmoud's role, team context, evidence status, permission status, problem, solution, technical challenge, and result.
10. Recommend how to preserve personal-page URLs and SEO through route changes and redirects.
11. Produce a dependency-ordered implementation plan with small, reviewable milestones. Do not estimate blindly; identify unknowns.
12. Record all questions, assumptions, and conflicting claims in `docs/agency-rebuild/decisions.md`.

## Required outputs

Create:

- `docs/agency-rebuild/01-repo-and-live-site-audit.md`
- `docs/agency-rebuild/02-content-and-claim-inventory.md`
- `docs/agency-rebuild/03-information-architecture.md`
- `docs/agency-rebuild/06-implementation-plan.md`
- `docs/agency-rebuild/decisions.md`

Every finding about the current implementation must cite exact repository paths. Separate observed facts from recommendations.

## Constraints

- Do not modify application code, routes, visual styles, production configuration, or public content during this task.
- Do not delete or overwrite assets.
- Do not invent missing business information.
- Do not recommend a framework rewrite without concrete repository evidence.
- Prefer a strong agency MVP over many thin pages.
- Make the future UI English-first but structurally ready for Arabic/RTL.
- Keep the Vercel deployment and current domain unless the audit reveals a documented blocker.

## Final response

Return:

1. A concise summary of the current architecture.
2. The five most serious conversion/trust problems.
3. The proposed route architecture.
4. Reuse/rewrite/remove counts for current components/content.
5. The recommended first implementation milestone.
6. All files created.
7. Blocking questions that require Mahmoud's decision.

Do not begin implementation until the audit and information architecture are reviewed.

