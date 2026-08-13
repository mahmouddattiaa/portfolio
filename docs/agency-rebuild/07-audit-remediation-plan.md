# Audit Remediation Implementation Plan

Date: 2026-08-13  
Status: Ready for execution, subject to the approval gates below  
Inputs: current implementation audit, Karve Digital reference analysis, existing agency rebuild decisions

## Outcome

Move the current site from a visually solid but conversion-incomplete implementation to a launch-ready agency website with:

- a working and recoverable contact path;
- at least one honest, permission-safe proof item or a deliberately reframed work promise;
- a reliable mobile navigation shell;
- a shorter, more decisive homepage;
- a Karve-aligned visual rhythm without copying Karve's identity;
- approved founder trust signals.

The sequence is dependency-driven. Conversion and proof come before decorative expansion.

## Guardrails

- Do not fabricate client names, logos, screenshots, testimonials, metrics, or outcome claims.
- Keep `publicCaseStudies` as the publication gate; do not bypass it in a page component.
- Keep contact delivery environment-configured; never commit provider secrets or a private destination address.
- Preserve the current light/dark/system theme behavior and reduced-motion support.
- Treat Karve as visual grammar: dense rhythm, geometric type, technical atmosphere, strong proof cadence. Do not reproduce its copy, layout, or assets literally.
- Validate at 320, 390, 720, and 1440 pixels after every user-facing batch.

## Approval gates

| Gate | Decision needed | Blocks | Safe work that can proceed |
|---|---|---|---|
| Q-04 | Contact provider, Formspree form ID, verified fallback email, privacy/consent copy | Live contact submission | Form states, environment contract, disabled-state UX, tests |
| Q-02 | Public case-study shortlist and publication permission | Publishing client work | Work templates and gating tests |
| Q-03 | Whether Faseeh or Aksira is the first approved proof item | First public work card/detail route | Empty-state and CTA correction |
| Q-06 | Approved founder facts, current portrait, and public profile links | Founder trust upgrade | Layout shell and optional-field behavior |
| Visual sign-off | Keep coral continuity and add geometric display type plus abstract technical hero treatment | Final Karve-aligned art direction | Homepage compression and token preparation |

## Recommended execution order

### Batch 0 — Baseline and decision lock

Purpose: make the work reproducible and prevent content decisions from being invented during implementation.

Files:

- `docs/agency-rebuild/decisions.md`
- `docs/agency-rebuild/07-audit-remediation-plan.md`
- new `.env.example` when contact implementation begins

Actions:

1. Record the Q-04 provider/fallback/privacy decision.
2. Record the Q-02/Q-03 proof selection and permission state.
3. Record the Q-06 founder asset/fact approval.
4. Confirm the recommended visual route: retain the existing coral accent, introduce a more geometric display face, and use one original abstract technical hero asset.
5. Capture a fresh desktop and mobile baseline before changing UI code.

Acceptance:

- Every content-bearing implementation task points to an approved decision or remains visibly gated.
- No secret values appear in the plan, `.env.example`, source code, or screenshots.

### Batch 1 — P0 contact conversion recovery

Purpose: ensure every primary CTA reaches a usable next step.

Primary files:

- `src/lib/contact-config.ts`
- `src/app/contact/page.tsx`
- `src/components/contact-form.tsx`
- `src/app/api/contact/route.ts` if the server route remains part of the selected provider path
- `.env.example`

Implementation:

1. Keep the existing `CONTACT_PROVIDER=formspree` and `FORMSPREE_FORM_ID` environment gate.
2. Document `CONTACT_FALLBACK_EMAIL` as optional but strongly recommended; use a non-secret example value only.
3. Make the fallback visible on both enabled and disabled form states, not only after failure.
4. Keep client and server validation aligned for name, email, project context, offer, and consent.
5. Prevent double submission while the request is pending.
6. Provide explicit pending, success, recoverable error, and unavailable states with keyboard focus and screen-reader announcements.
7. Add privacy/consent text only after Q-04 approval.
8. Track only safe events such as form started, validation category, success, failure, and fallback clicked; never send message contents or email addresses to analytics.

Acceptance:

- Every `Request a project review` CTA reaches either an enabled form or a verified fallback.
- Disabled configuration never renders a form that cannot deliver.
- Invalid, pending, success, provider-error, and fallback paths are manually verified.
- Refreshing or resubmitting does not create accidental duplicate sends.
- No provider key or destination secret is committed.

Rollback:

- Removing the provider environment variables returns the page to the safe unavailable state while preserving the verified fallback.

### Batch 2 — P0 proof promise recovery

Purpose: stop the homepage from promising selected work that resolves to an empty route.

Primary files:

- `src/lib/content.ts`
- `src/components/work-grid.tsx`
- `src/app/work/page.tsx`
- `src/app/work/[slug]/page.tsx`
- `src/app/page.tsx`

Preferred path after Q-02/Q-03 approval:

1. Publish one case study through the existing typed record.
2. Complete classification, production status, Mahmoud's role, team context, permission states, and evidence states.
3. Include only approved media. Omit media rather than substituting a fake visual.
4. Label every outcome as verified public, verified private, qualitative, or unmeasured.
5. Ensure homepage card, work index, metadata, and slug route all derive from the same record.

Fallback path if proof approval remains blocked:

1. Remove or rename `View selected work` so it does not promise unavailable evidence.
2. Route the secondary hero action to a real section such as services or process.
3. Keep `/work` honest about private examples without presenting an empty grid as a portfolio.

Acceptance:

- No public route exposes a draft, pending-permission item, or unapproved screenshot.
- An unknown or unpublished slug returns 404.
- The homepage never renders a proof CTA that dead-ends in an empty promise.
- Each visible claim can be traced to its source record and evidence state.

### Batch 3 — P1 mobile shell and accessibility hygiene

Purpose: fix the confirmed mobile wordmark defect and raise the legibility floor without redesigning the shell.

Primary files:

- `src/components/site-shell.tsx`
- `src/app/refinement.css`
- `src/app/globals.css`

Implementation:

1. Render the reverse wordmark explicitly inside the dark portal-based mobile panel, or scope the logo swap to `.mobile-panel` as well as `.site-header`.
2. Verify the menu at 320, 390, 720, and 1023 pixels in light, dark, and system modes.
3. Confirm focus entry, focus containment, Escape close, overlay close, route-change close, and focus return.
4. Raise recurring 11.5–12.5px utility text to a practical 13–14px floor unless it is purely decorative.
5. Recheck contrast after type and theme changes.

Acceptance:

- The Kepler Dev wordmark is visible in every mobile-menu theme state.
- Menu controls remain at least 44 by 44 pixels.
- Keyboard users can open, traverse, close, and recover focus without losing context.
- No horizontal overflow appears at the four validation widths.

### Batch 4 — P1 homepage compression

Purpose: reduce the current 8,620–12,812px page length and make each section perform a distinct conversion job.

Primary files:

- `src/app/page.tsx`
- `src/app/refinement.css`
- `src/app/globals.css`
- shared section components only where a real reuse boundary already exists

Target narrative:

1. Hero: audience, outcome, primary CTA, honest secondary CTA.
2. Problem recognition: one compact diagnostic section.
3. Connected platform: the core system model and offer context.
4. Proof: approved selected work or an intentionally omitted block.
5. Ways to work: clear offer ladder.
6. Delivery: combine process and repeated value language into one numbered section.
7. FAQ: objections that are not already answered above.
8. Final CTA: project-review conversion.

Editing rules:

- Merge repeated problem/system/process/value statements instead of simply shrinking spacing.
- Keep one strong sentence per idea and one proof mechanism per section.
- Omit the proof section automatically when there is no approved record.
- Preserve semantic heading order and anchor targets used by navigation.
- Aim for roughly 25–35% less vertical length on desktop and mobile while retaining all essential decisions.

Acceptance:

- Each section has a unique job and a single dominant action.
- The page remains understandable with motion disabled.
- Navigation anchors still land on the intended section.
- Desktop and mobile comparison captures show materially tighter pacing without clipped content.

### Batch 5 — P1 Karve-aligned visual system

Purpose: close the reference gap after the funnel and proof are credible.

Primary files:

- `src/app/globals.css`
- `src/app/refinement.css`
- `src/app/layout.tsx` or the existing font-loading module
- `src/app/page.tsx`
- `public/` only for approved or newly generated original assets

Recommended direction:

- Keep the current near-black, warm-white, and coral palette for brand continuity.
- Add a geometric display face for major headlines while retaining the current utilitarian body/mono hierarchy.
- Replace generic empty atmosphere with one original abstract technical hero composition sized for its actual slot.
- Increase the cadence of proof, offer, and system modules; avoid ornamental sections with no conversion role.
- Reuse the existing grid, hairline, mono numbering, and reduced-motion conventions.

Acceptance:

- The result feels closer to Karve in rhythm, scale, and technical confidence while remaining recognizably Kepler Dev.
- No source asset, copy block, logo, or distinctive composition is copied from Karve.
- The hero asset has approved provenance, useful alt treatment, correct crop, and responsive sizing.
- Light and dark modes retain AA contrast for text and interactive controls.

### Batch 6 — P1 founder trust upgrade

Purpose: support a founder-led agency claim with approved, current evidence.

Primary files:

- `src/app/mahmoud/page.tsx` or its current founder component
- `src/lib/content.ts`
- approved assets under `public/resources/pics/`

Implementation after Q-06:

1. Use the approved current portrait.
2. Add only verified role, experience, and operating-model facts.
3. Add approved public profile links.
4. Keep optional facts absent when not approved rather than filling gaps with generic claims.
5. Tie the founder section to the agency delivery model and project-review CTA.

Acceptance:

- Every founder fact is approved and traceable.
- Portrait, links, and CTA work at all validation widths.
- The page explains why the founder-led model is useful to the client, not only who Mahmoud is.

### Batch 7 — Release validation

Purpose: validate the complete conversion journey rather than isolated screenshots.

Automated commands:

```text
npm run lint
npx tsc --noEmit
npm run build
```

Route and interaction matrix:

| Area | Required checks |
|---|---|
| Homepage | Hero CTA, secondary CTA, section anchors, work state, FAQ, final CTA |
| Contact | Disabled, enabled, validation, pending, success, provider error, fallback |
| Work | Empty/omitted state, approved card, approved detail, unknown slug 404 |
| Founder | Portrait, approved links, CTA |
| Shell | Desktop navigation, mobile portal, theme modes, focus behavior |
| Responsive | 320, 390, 720, 1440 widths; no overflow or clipped controls |
| Accessibility | Heading order, landmarks, names, focus, status announcements, contrast, reduced motion |

Release criteria:

- Lint, type-check, and production build pass.
- All intended routes return 200; unpublished work returns 404.
- The primary conversion path works from every repeated CTA.
- No P0 issue remains open.
- P1 issues are either closed or explicitly accepted in `decisions.md`.
- A fresh desktop/mobile evidence set is captured and compared against both the pre-change baseline and the approved direction.

## Commit boundaries

Keep each batch independently reviewable:

1. `fix: restore mobile navigation wordmark`
2. `feat: enable recoverable project enquiries`
3. `feat: publish approved agency proof`
4. `refactor: tighten homepage conversion narrative`
5. `feat: align agency visual rhythm with approved direction`
6. `feat: add approved founder trust signals`
7. `test: validate agency release journeys`

Do not combine approval records or generated audit artifacts with unrelated code changes.

## First implementation slice

Begin with two tracks:

- unblock Q-04 and implement Batch 1 as the highest launch-impact change;
- while Q-04 is being confirmed, complete the isolated Batch 3 mobile wordmark fix because it has no content or business dependency.

Do not publish a case study until Q-02/Q-03 is resolved. If those decisions remain blocked when Batch 1 is complete, implement the Batch 2 fallback path so the site stops promising unavailable work.
