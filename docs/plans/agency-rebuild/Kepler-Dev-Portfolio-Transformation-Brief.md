# Kepler Dev — Agency Portfolio Transformation Brief

**Status:** Approved direction for Codex-led repository work  
**Date:** 8 August 2026  
**Primary domain:** `keplerdev.uk`

## 1. Mission

Transform the existing personal developer portfolio into a credible, conversion-focused agency portfolio for Kepler Dev while preserving Mahmoud's personal profile under a dedicated route.

The first agency portfolio is required before systematic outbound. It does not need every future case study or feature, but it must communicate the correct buyer, problem, offer, proof, and next step without exaggeration.

## 2. Business context

Kepler Dev begins as an honest founder-led product studio and may add funded specialists when project scope requires them. It is not presented as a large permanent team.

### Primary buyer

The founder or owner of a growing GCC service, retail, mobility, fuel/energy-service, booking, field-operation, or loyalty business whose customer, employee, and management workflows are fragmented across WhatsApp, spreadsheets, paper, or disconnected systems.

### Secondary buyer

An international founder with a validated problem who needs a focused mobile or full-stack product taken from scope through deployment.

### Primary position

> Kepler Dev turns fragmented customer, staff, and management workflows into one focused mobile-first operational product.

### Offer ladder

1. Kepler Product Blueprint.
2. Kepler Launch Sprint.
3. Kepler Operations Platform.
4. Kepler Product Care.

### Agency qualities

- Direct and honest.
- Advisory rather than blindly agreeable.
- Warm and founder-friendly.
- Technically credible when detail improves a decision.
- Structured, accountable, and transparent about capacity.

## 3. Current-site problems to resolve

The current live site is visually and commercially centered on Mahmoud as an individual developer. Its public message currently emphasizes bots, AI integration, mobile/backend execution, day-seven delivery, and projects in the $300–$1,500 range.

The transformation must address:

- Personal identity at the root instead of agency identity.
- Service emphasis that attracts small automation work rather than the target operations/MVP engagements.
- Low published price range that conflicts with the new offers.
- “Day 7 final delivery” language that conflicts with phased 6–16 week product work.
- Unverified “10+ production projects” and similar metrics.
- Projects or concepts whose status may be overstated.
- Missing flagship operations proof, especially the fuel/loyalty platform.
- Employment and client work that must not be presented as wholly agency-owned.
- Technical-tool sections that occupy more attention than buyer outcomes.
- A hacker/terminal-style identity that may not create the right level of business trust for GCC operators.

## 4. Proof rules

Every public project must state:

- Classification: client, employer, university, internal, or Kepler-owned.
- Production status.
- Mahmoud's exact contribution.
- Team context.
- What can legally and ethically be named or shown.
- Results only when evidence exists.

### Working case-study priority

1. **gLiter fuel and loyalty platform** — customer application, worker application, management platform, backend, and Azure deployment. Treat the company name and screenshots as unpublished until permission is confirmed.
2. **HS VPN** — production client product; publish only verified metrics and permissions.
3. **QuickChargingPOS / operational POS integration** — employer work; clearly state role and anonymize if needed.
4. **Focus Ritual** — internal/capability project; do not imply client adoption.
5. **Aksira** — Kepler-owned product in development; it belongs under Kepler Labs or an “in development” label.

### Claims requiring correction or confirmation

- iScore is considered risky for public promotion and should not be published as a normal agency case study without explicit permission and accurate role/dates.
- StayEase and FitForge are concepts/UI directions, not completed production products.
- Resolve whether the current “Faseeh AI Keyboard” and Aksira are the same product, renamed products, or separate concepts before publishing either claim.
- AgencyOS, MedConnect, GetLab, AI Collab, testimonials, revenue, production counts, and employment dates must be checked against the proof inventory and source evidence.

An internal placeholder may represent missing proof during development. An unverified claim must not appear on the public build.

## 5. Recommended information architecture

The UX architect may adjust this based on the actual repository, but must preserve the intent.

### Required MVP routes

- `/` — Kepler Dev agency homepage.
- `/work` — selected work and proof classifications.
- `/work/[slug]` — case-study template.
- `/mahmoud` — founder/personal portfolio.
- `/contact` — qualification-oriented contact flow.

### Optional routes when justified

- `/services` — offers and engagement paths.
- `/process` — Blueprint-to-launch delivery method.
- `/about` — agency model, founder, principles, and Kepler Studio/Labs vision.
- `/labs` — Aksira and PetSpot, clearly marked as products in development.

The MVP should avoid creating empty pages. A strong homepage with reusable case-study routes is better than many thin service pages.

## 6. Homepage conversion structure

Recommended sequence:

1. **Navigation** — Work, Services/Process, About, Contact, Founder.
2. **Hero** — operational outcome, target buyer, short credibility statement, primary and secondary CTA.
3. **Proof strip** — only verified production/deployment facts.
4. **Problem recognition** — fragmented customer, staff, and management workflows.
5. **Flagship solution** — connected mobile product, backend, dashboard, integrations, and launch ownership.
6. **Selected work** — two or three strongest defensible case studies.
7. **Offers** — Blueprint, Launch Sprint, Operations Platform, Product Care.
8. **Process** — clarify, phase, build, launch, support.
9. **Why Kepler Dev** — founder accountability, mobile-first depth, operations integration, honest scope control.
10. **Founder-led model** — who Mahmoud is and how extra capacity is handled transparently.
11. **FAQ** — scope, timelines, pricing method, ownership, support, GCC/remote delivery.
12. **Final CTA** — request a project review or Product Blueprint.

### Working hero direction

> **Turn fragmented operations into one connected product.**
>
> Kepler Dev designs and builds mobile apps, staff workflows, management dashboards, and the systems behind them for growing GCC businesses—from scope through launch and support.

Primary CTA: **Plan your first release**  
Secondary CTA: **View selected work**

This is working copy, not immutable final copy. The marketing agent must refine it without widening the position into a generic service list.

## 7. Personal portfolio route

The personal route should:

- Preserve Mahmoud's career, technical depth, education, employment, and personal projects.
- Clearly identify his role as founder and lead product engineer at Kepler Dev.
- Link back to the agency services for commercial enquiries.
- Remove or correct unsupported public claims.
- Avoid competing CTAs or a contradictory low-budget positioning.

Recommended route: `/mahmoud` because it is explicit and durable. The UX architect may recommend `/founder` only with a clear redirect/SEO plan.

## 8. Design direction

The visual system should feel like a premium, technically serious product studio—not a template agency and not a hacker terminal.

### Desired qualities

- Precise, calm, confident, and modern.
- Business-legible for GCC owners and operators.
- Technically distinctive without overwhelming nontechnical buyers.
- Warm enough that founders feel supported.
- Subtle Kepler/astronomical cues without decorative space clichés.

### Working visual direction

- Deep navy or near-black foundation.
- Warm off-white reading surfaces.
- Celestial blue/teal for action and systems.
- Restrained gold accent for Kepler identity.
- Strong typography, generous spacing, clear information hierarchy.
- Product UI, workflow, and device imagery instead of generic stock photography.
- Motion only where it explains relationships or improves orientation.

### Avoid

- Excessive terminal text, neon cyberpunk styling, fake dashboards, spinning planets, particle backgrounds, and constant animation.
- Large grids of technology logos before the buyer understands the outcome.
- Claims such as “best,” “world-class,” “10x,” or “enterprise-grade” without proof.
- Generic smiling-team stock imagery.

## 9. Functional requirements

- Excellent responsive behavior across mobile, tablet, and desktop.
- Accessible semantic structure and keyboard interaction.
- Fast loading and stable layout.
- Correct metadata, canonical URLs, social previews, sitemap, and robots handling.
- Organization and Person structured data where accurate.
- Clear contact/qualification flow with useful error and success states.
- Analytics events for primary CTA, case-study views, contact starts, and successful submissions.
- Vercel preview deployment before production.
- Preserve existing domain and avoid losing valid personal-page SEO through redirects.
- Architecture ready for future English/Arabic and RTL support, but English-only MVP is acceptable.

The engineering agent should preserve the current stack where it remains appropriate. A framework rewrite requires evidence from the audit, not preference.

## 10. Multi-agent collaboration protocol

All portfolio agents work from one shared documentation directory inside the repository:

```text
docs/agency-rebuild/
  00-transformation-brief.md
  01-repo-and-live-site-audit.md
  02-content-and-claim-inventory.md
  03-information-architecture.md
  04-messaging-and-page-copy.md
  05-design-system-and-wireframes.md
  06-implementation-plan.md
  07-qa-and-launch-report.md
  decisions.md
```

Rules:

- Every agent reads `00-transformation-brief.md` and all numbered outputs before its own task.
- No agent silently changes a locked business decision.
- Conflicts and assumptions go into `decisions.md`.
- Each claim records its evidence status.
- Each agent cites repository paths when describing the current implementation.
- UX/content approval precedes broad visual implementation.
- Implementation occurs on a dedicated branch and uses preview deployments.

## 11. Agent sequence

### Agent 1 — UX Architect / Repository Auditor

Read-only audit and proposed information architecture. No product code changes.

### Agent 2 — Product Marketing Strategist

Convert the agency strategy, audit, offers, and proof classifications into final page messaging and conversion copy.

### Agent 3 — Senior Product/UI Designer

Create the design system, responsive wireframes, component behavior, and visual direction using the approved IA/copy.

### Agent 4 — Senior Frontend Engineer

Implement the approved system in the existing repository, preserving or evolving the stack based on the audit.

### Agent 5 — QA, Accessibility, Performance, and SEO

Test the preview, verify all claims/routes/forms/metadata, and block production launch on material failures.

### Optional specialist reviews

- Backend/DevOps agent for contact forms, analytics, security, redirects, and Vercel configuration.
- Finance agent for public pricing language and profitability consistency.
- Legal/privacy reviewer for policy wording and client-data collection.

## 12. Portfolio schedule

- 8–11 August: audit and architecture evidence.
- 12–16 August: messaging, UX, design direction, and implementation plan.
- 17–27 August: implementation and preview iteration.
- 28–31 August: QA, corrections, and production deployment.
- After launch: controlled outreach and evidence-based website iteration.

## 13. Definition of done for the agency MVP

- Root domain communicates Kepler Dev, not an individual freelancer service menu.
- Target buyer and triggering operational problem are clear within the opening screen.
- At least two defensible work examples are visible with accurate classifications.
- Offer paths and next actions are understandable.
- Personal portfolio remains accessible without contradicting the agency message.
- No unverified claim is public.
- Mobile, accessibility, performance, metadata, forms, analytics, and redirects pass review.
- Production deployment is verified on `keplerdev.uk`.

