# Dependency-Ordered Implementation Plan

Implementation has not started. All code work should occur on a dedicated branch and preview deployment after architecture/content approval.

## Entry gates

Before broad UI work:

- approve the MVP route architecture;
- resolve the critical questions in `decisions.md` or explicitly accept safe placeholders/withholding;
- approve at least two publication-safe case studies;
- approve the agency positioning/CTA and founder-led disclosure;
- choose the contact provider/destination and required qualification fields.

## Recommended first implementation milestone

### Milestone 1 — Preservation and route/content foundation

Goal: create a reviewable multi-route skeleton without losing the current personal portfolio or publishing unverified agency claims.

Scope:

1. Create typed content/publication contracts for site facts, offers, founder content, and case studies.
2. Move the existing personal experience behind `/mahmoud`, preserving its useful content while removing low-budget and one-week-delivery claims.
3. Establish server-rendered route shells for `/`, `/work`, `/work/[slug]`, and `/contact` with shared header/footer and per-route metadata.
4. Add a light/dark/system theme foundation and accessible theme control.
5. Seed only approved case-study records; draft/private records cannot generate public routes.
6. Update sitemap/robots/structured-data contracts in the preview branch.

Acceptance criteria:

- All five MVP route patterns resolve in preview; unknown case-study slugs return not found.
- Existing personal history remains accessible at `/mahmoud` with Person metadata and no contradictory commercial CTA.
- `/` has Organization metadata and truthful placeholder-safe agency structure; no unsupported metrics or client names render.
- Route/page composition is server-rendered by default; client code is limited to theme, mobile navigation, form state, and justified enhancements.
- Light, dark, and system modes work before first paint, persist correctly, and expose an accurate accessible selected state.
- Keyboard navigation reaches and operates header, theme control, main content, and footer in a logical order.
- `npm run lint` and `npm run build` pass.
- A preview deployment is available for content/architecture review; production remains untouched.

This milestone is recommended first because it isolates the highest migration risk—preserving personal proof while changing the root identity—and gives later copy/design work stable routes and schemas.

## Milestone 2 — Agency homepage conversion flow

Dependencies: positioning, offers, founder disclosure, proof facts.

Deliver:

- hero, problem recognition, flagship solution/system diagram;
- verified proof strip with automatic omission when empty;
- selected work, offer ladder, process, differentiation, founder model, FAQ, final CTA;
- responsive navigation and page layouts.

Acceptance:

- Every claim maps to an approved content record.
- The primary CTA is visible early, repeated intentionally, and always leads to `/contact`.
- No section depends on animation to communicate meaning.
- 320–1440px layout review finds no horizontal overflow, clipped controls, or unstable media.

## Milestone 3 — Work index and case-study system

Dependencies: case-study permission/evidence records and approved media.

Deliver:

- `/work` with explicit proof classifications;
- static/public `/work/[slug]` generation from content contracts;
- reusable system diagram, evidence/result, media, and related-offer modules;
- draft/private exclusion.

Acceptance:

- At least two defensible public studies are complete.
- Role, team context, production state, and classification are visible above the fold.
- Metrics render only when `proofState` permits publication.
- Cards use real routes; no `#` links or modal-only details.

## Milestone 4 — Qualification contact flow

Dependencies: provider, destination, fields, budget policy, privacy/consent copy.

Deliver:

- accessible form states and validation;
- provider integration through environment configuration;
- email fallback and anti-spam strategy;
- analytics events for contact start, validation failure category, success, and fallback use—without collecting sensitive form contents.

Acceptance:

- Success and recoverable-error paths are tested.
- Duplicate submission is prevented.
- No secret/provider key is committed or documented.
- Keyboard and screen-reader status announcements work.
- Production environment variable readiness is verified before launch.

## Milestone 5 — SEO, performance, accessibility, and launch

Deliver:

- route-specific metadata, canonicals, Open Graph assets, sitemap, robots, Organization/Person structured data;
- redirect/link migration review;
- image optimization and unused-asset audit;
- reduced-motion and coarse-pointer behavior;
- automated smoke/accessibility coverage and manual responsive QA;
- analytics event validation;
- preview stakeholder review and production release checklist.

Acceptance targets:

- No critical automated accessibility violations; manual keyboard and screen-reader smoke test complete.
- No unexpected layout shift from principal images.
- Core Web Vitals are measured on the preview with representative content; any failed “good” threshold has a documented fix or launch decision.
- All public claims have approved evidence status and permissions.
- Contact submission succeeds in the production environment.
- Canonicals, sitemap entries, social previews, and structured data validate.

## Content/design collaboration sequence

1. Resolve `decisions.md` critical items.
2. Product marketing produces approved page copy and proof records.
3. UI design refines this token/wireframe foundation against real copy and media.
4. Engineering executes the milestones above.
5. QA validates preview before production.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Proof approvals delay case studies | Build schemas/routes with withheld draft records; never fill gaps with invented claims. |
| Root identity change loses personal discovery | Publish `/mahmoud` with dedicated Person metadata, internal links, sitemap entry, and updated profile links. |
| Client-side effects inflate the new root | Server-first route composition and measurable client-island budget. |
| Form works locally but fails in production | Explicit deployment environment checklist and end-to-end submission test. |
| English assumptions block Arabic later | Logical CSS properties and content separation now; defer translation and locale routing until decided. |
| Existing untracked docs are overwritten | Limit implementation commits to reviewed files and preserve existing `docs/` content. |

## Validation commands

Current repository scripts support:

```text
npm run lint
npm run build
```

Add test commands only when the corresponding test harness is intentionally introduced. Do not claim device, accessibility, performance, or form validation from lint/build alone.

