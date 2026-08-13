+# Kepler Dev current implementation audit

**Audit date:** 2026-08-13  
**Audited build:** commit `87c311c`, fresh local production build  
**Figma audit board:** https://www.figma.com/design/C1qdd9EH8oXcXWyBoimBl9  
**Overall health:** **Fair — visually coherent and technically sound, but not ready for lead acquisition**  
**Primary reason:** the site creates interest successfully, then blocks both proof and contact at the decision point.

![Verified Figma audit board](figma-board-verification.png)

## Scope and evidence

This audit covered:

- Routes: `/`, `/work`, `/mahmoud`, and `/contact`
- Viewports: 1440 × 1000, 720 × 900, 390 × 844, and 320 × 900
- Dark and light themes
- Keyboard entry, skip link, mobile menu, focus return, reduced motion, target sizing, semantic structure, and automated WCAG A/AA checks
- Production build, lint, TypeScript, metadata, robots, and sitemap
- Visual alignment with the approved Karve reference direction

Evidence files:

- `runtime-evidence.json`
- `interaction-accessibility-evidence-production.json`
- `narrow-evidence.json`
- `screenshots/`

## Executive verdict

Kepler Dev already has a recognizable point of view: near-black surfaces, coral accents, serif display type, mono labels, strong rules, and modular grids. It feels calmer and more considered than a generic freelancer portfolio. The proposition is also unusually specific: connected operational products rather than broad “digital transformation.”

The problem is not the top of the funnel. The problem is what happens after the visitor believes the promise:

1. **“View selected work” leads to “No public work yet.”**
2. **Every project-review CTA leads to a page where enquiries are unavailable and no verified fallback is shown.**
3. **The founder-led story has no portrait, external profile, or verified proof point to make the person tangible.**

This produces a site that looks credible but cannot yet complete the trust-and-contact journey. The correct next milestone is therefore not more decorative polish. It is to unblock one honest proof path and one reliable contact path, then tighten the visual system toward the Karve direction.

## Health summary

| Area | Health | Evidence-based assessment |
|---|---|---|
| Visual system | Good | Strong palette, spacing, editorial hierarchy, consistent grids and borders |
| Positioning and message | Good | Specific operational-product proposition; clear founder-led model |
| Responsive layout | Good | No horizontal overflow at 1440, 720, 390, or 320px |
| Navigation and interaction | Good | Production menu, focus trap, Escape close, focus return, theme switch, and skip link work |
| Accessibility baseline | Good with caveats | Zero definite axe A/AA violations; 44px targets; reduced-motion behavior; hero contrast requires manual review |
| Proof and credibility | Poor | Public work route and homepage proof section are empty |
| Conversion | Poor | Contact route intentionally exposes neither form nor fallback |
| Karve-reference alignment | Partial | Atmosphere, numbering, grid, and restraint align; hero type/art and proof rhythm do not |
| Technical validation | Good | ESLint, TypeScript, and production build pass |

## 1. Homepage — desktop acquisition path

![Homepage desktop](screenshots/home-desktop.png)

**Current-state summary:** The homepage presents a strong proposition, diagnoses the workflow problem, explains the service model, exposes the proof gate, lists engagement options, describes delivery, answers FAQs, and repeats the project-review CTA.

**Strengths**

- The opening statement is specific and outcome-oriented.
- The hero gives one dominant action, one secondary path, and a plain-language next-step expectation.
- Section labels, large headlines, grid lines, and coral accents create a disciplined editorial rhythm.
- The service and process sections explain how the agency works without unsupported metrics or client claims.
- The decorative hero image has empty alt text, while its meaning is fully present in adjacent copy.

**UX findings**

- **Critical — the secondary hero promise is broken at the content level.** “View selected work” sounds like proof is available, but the destination says “No public work yet.”
- **High — the homepage is overlong for the amount of evidence it contains.** It is 8,620px high at 1440px and repeats the connected-system / handoff / clarity argument across several adjacent sections.
- **High — the page gives process more space than proof.** Visitors learn how Kepler thinks several times before seeing any evidence that Kepler has delivered it.
- **Medium — the literal executive-in-an-office hero image shifts the brand toward general operations consulting.** The approved Karve translation called for an abstract technical atmosphere and large geometric sans typography. The current photo/serif pairing is polished, but it is visibly farther from the chosen reference.
- **Medium — light mode is technically correct but visually hybrid.** The shell and content turn light while the hero remains a dark poster. This is coherent, but the switch reads more as a surface inversion than a designed alternate art direction.

**Accessibility findings**

- A keyboard user reaches a clearly visible “Skip to main content” link first.
- Heading order is coherent: one H1, section H2s, and card H3s.
- All visible interactive targets measured at least 44px in one dimension.
- Automated axe checks returned no definite WCAG A/AA violations.
- Axe marked nine homepage contrast cases as “incomplete” because text sits over the hero image. Manual inspection of the captured desktop and mobile states shows strong dark scrim coverage, but this still needs real-device review under brightness/contrast variation.

**Validation limits**

- Chrome on Windows only; Safari and Firefox were not tested.
- Automated checks are not a screen-reader test.
- Performance was not scored with Lighthouse in this run.

## 2. Homepage — responsive behavior

![Homepage mobile](screenshots/home-mobile.png)

**Current-state summary:** The same content collapses cleanly into a single-column editorial sequence with a full-width primary CTA and stacked cards.

**Strengths**

- No horizontal overflow at 720, 390, or 320px.
- The hero remains readable and the subject crop does not cover the primary text.
- Grid content preserves semantic reading order when stacked.
- Buttons remain comfortably touchable.
- The 320px screenshot remained structurally intact.

**UX findings**

- **High — the mobile page is 11,512px at 390px and 12,812px at 320px.** The journey becomes a very long series of similarly weighted text blocks.
- **High — mobile loses the desktop page’s contrast between overview and detail.** Once all grids stack, service cards, process cards, and value cards share almost the same rhythm.
- **Medium — several support labels and meta lines resolve to approximately 11.5–12.5px.** They are not primary body copy, but their frequency makes the page visually fine-grained and harder to scan.
- **Medium — the second CTA remains a trust sink on mobile, where changing routes costs more attention.**

**Accessibility findings**

- All tested controls still met the 44px target check at 320, 390, and 720px.
- No responsive overflow was detected.
- Reduced-motion emulation produced no running animations after load.
- The audit did not perform true browser text-only zoom; 720px and 320px reflow checks are proxies, not a complete 200% zoom certification.

## 3. Work route — credibility path

![Work route mobile](screenshots/work-mobile.png)

**Current-state summary:** The page explains the publication standard honestly, then shows an empty state with a project-review CTA.

**Strengths**

- The proof policy is unusually responsible: classifications, role, team context, evidence state, and permissions are treated distinctly.
- The empty state is designed rather than broken.
- The page is simple, scannable, and responsive.

**UX findings**

- **Critical — this is a credibility route with no credibility object.** A prospect cannot inspect a shipped interface, outcome, artifact, role, testimonial, or externally verifiable link.
- **High — the page asks for contact as the only resolution, but the contact destination is also unavailable.** Together, these routes form a closed loop.
- **Medium — the oversized headline and proof-policy explanation dominate a page whose actual content is one empty card.** On desktop, this creates more ceremony than value.

**Recommended decision**

Until one study passes the evidence and permission gate, either:

- publish a correctly classified owned/internal/university artifact with honest constraints; or
- replace “View selected work” with a route that actually has content, such as “See how projects are scoped.”

Do not fabricate logos, client outcomes, testimonials, or metrics to fill this gap.

## 4. Founder route — human trust path

![Founder route desktop](screenshots/mahmoud-desktop.png)

**Current-state summary:** The founder page communicates technical range, delivery philosophy, and accountability through editorial text and grid sections.

**Strengths**

- The copy is focused and avoids an unfocused resume dump.
- The page connects product decisions to engineering delivery.
- The “founder accountable” positioning is clear and differentiated from a large agency handoff model.
- The responsive stack remains stable.

**UX findings**

- **High — the founder-led promise lacks a visible founder.** There is no portrait, short verified track record, LinkedIn/GitHub link, or concrete role history in the captured page.
- **High — the page restates capabilities more than it deepens trust.** Several blocks overlap with the homepage service/process message.
- **Medium — 3,870px of mobile content is substantial for a page with no visual evidence or external validation.**
- **Medium — the route title is simply “Mahmoud,” while the page is doing a more important trust job.** A sharper title/description could reinforce founder-led product engineering.

**Accessibility findings**

- The page has one H1 and a logical H2/H3 structure.
- No definite automated A/AA violations were found.
- The very small uppercase eyebrow labels are legible in the captures but should not get smaller.

## 5. Contact route — conversion path

![Contact route desktop](screenshots/contact-desktop.png)

**Current-state summary:** The route explains what context to share, then displays a publication-safe notice that online enquiries are unavailable until a provider and fallback are configured.

**Strengths**

- The system does not pretend a form works when no provider is configured.
- The unavailable state is explicit and technically honest.
- The layout is simple and readable.

**UX findings**

- **Critical — every primary CTA on the site ends here, but this page offers no action.** There is no form, mail link, calendar, Upwork link, LinkedIn link, or other verified fallback.
- **Critical — the copy says “This form is designed…” while no form is rendered.** This is a direct expectation mismatch.
- **High — the route is titled “Request a project review,” yet requesting one is impossible.** This causes the highest-intent visitor to hit a dead end.
- **Medium — the unavailable notice is styled like a temporary operational message, but the footer gives the visitor no recovery path.**

**Recommended decision**

Do not expose project-review CTAs publicly until both are configured:

1. A tested delivery provider.
2. A verified fallback that the user has approved for publication.

Once enabled, test invalid, pending, success, provider-error, and preserved-input recovery states. The form component already contains accessible error and success patterns, but the disabled production state prevented runtime validation in this audit.

## 6. Navigation, theme, and interaction shell

![Mobile navigation](screenshots/home-mobile-menu-open.png)

**Current-state summary:** Desktop navigation is centered and restrained. Mobile uses a modal side panel with a primary CTA and theme selector.

**Strengths**

- The production menu opens by click and keyboard.
- Focus moves to the close button, remains trapped in the dialog, closes on Escape, and returns to the trigger.
- Body scrolling is locked while the dialog is open.
- The theme selector changes the document theme and color scheme in the fresh production build.
- Active route styling is visible on desktop.
- All four routes returned 200.

**UX and accessibility findings**

- **High — the Kepler wordmark is invisible inside the dark mobile panel.** Runtime inspection shows the primary dark logo remains `display:block` at 141 × 28px while the reverse logo is `display:none`; it is therefore present but unreadable on the dark background. The CSS only swaps logos inside `.site-header`, not the portal-rendered mobile panel.
- **Medium — the menu occupies nearly the full viewport but leaves a narrow strip of the obscured page visible.** This is defensible as a drawer cue, though the missing wordmark makes the top-left feel broken.
- **Operational note — the pre-existing port-3011 dev server was stale.** It served HTML and scripts but failed HMR websocket handshakes; React interactions did not hydrate. A fresh production build on port 3022 passed menu and theme tests. Restart the dev server before the next review.
- The local production preview returns 404 for Vercel Analytics’ `/_vercel/insights/script.js`, which is expected outside Vercel and is not a production-site conclusion.

## 7. Technical, SEO, and accessibility validation

**Passed**

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- All public routes returned 200
- One `main`, one `header`, one `footer`, and labelled navigation landmarks on each route
- No horizontal overflow at tested widths
- No measured visible target below 44px
- No definite axe WCAG A/AA violations on eight route/viewport combinations
- Reduced-motion CSS removes practical animation duration and iteration
- Homepage metadata includes title, description, canonical URL, Open Graph title/description/image
- `robots.txt` and `sitemap.xml` return 200 and use `https://www.keplerdev.uk`

**Not certified by this run**

- Real screen-reader behavior
- Safari/Firefox compatibility
- 200% browser text zoom
- Contact form validation/success/failure states while the publication gate is closed
- Deployed analytics behavior
- Core Web Vitals under real network/device conditions

## Priority matrix

| Priority | Finding | Why it matters | Recommended action |
|---|---|---|---|
| P0 | Contact has no actionable path | All primary CTAs terminate without conversion | Configure tested provider + approved fallback, then re-enable CTAs |
| P0 | “Selected work” has no work | The proof promise damages trust at the exact validation moment | Publish one evidence-safe study or reroute/rename the CTA |
| P1 | Hero is still far from the Karve target | Photo + serif reads premium editorial consulting, not close to the chosen geometric technical reference | Move to bold geometric sans and abstract technical art after direction approval |
| P1 | Homepage is excessively long on mobile | 11.5k–12.8k px increases abandonment and flattens hierarchy | Merge repeated problem/system/process/value sections; reduce copy by roughly one third |
| P1 | Founder page lacks a human/proof layer | Founder-led positioning cannot build relationship trust from copy alone | Add approved portrait, verified facts, and approved profile links |
| P1 | Mobile menu wordmark disappears in dark mode | Visible brand defect in a core interaction | Apply reverse-logo theme rule to the mobile panel/portal |
| P2 | Frequent 11.5–12.5px support text | Reduces scanability, especially on mobile | Establish a 13–14px practical floor for persistent/supporting text |
| P2 | Stale dev preview process | Can create false interaction failures during design review | Restart and verify the dev server before each review session |

## Karve-reference gap

The current implementation has already adopted several parts of the reference successfully:

- near-black atmosphere
- restrained accent color
- numbered labels
- modular editorial grids
- long-form service narrative
- sharp, low-radius components
- publication-safe handling of proof

It is still materially different in the most memorable parts:

- **Typography:** Kepler is serif-led; Karve is large geometric sans-led.
- **Hero art:** Kepler uses a literal business photo; the approved translation called for an abstract technical atmosphere.
- **Proof rhythm:** Karve earns trust early through visible work and brand evidence; Kepler exposes an empty proof state.
- **Pacing:** Kepler has more explanatory copy and fewer visual/proof interruptions.
- **Motion:** Kepler is mostly static; the reference uses restrained reveal behavior.

The best translation is not a literal clone. Keep Kepler’s focused connected-operations proposition, coral continuity, publication gates, accessible target sizing, and reduced-motion behavior. Change the hero typography/art, proof sequencing, and density only after the proof and contact blockers are resolved.

## Recommended execution order

1. Unblock the conversion route with a verified contact provider and fallback.
2. Unblock one honest proof route or remove the promise of selected work.
3. Approve the Karve translation: geometric sans + abstract technical hero, retaining coral.
4. Compress the homepage and founder page around evidence, not repeated capability language.
5. Fix the dark mobile-menu wordmark and raise the smallest persistent text.
6. Re-run Chrome, Safari, Firefox, screen-reader, 200% zoom, and real-device QA before launch.
