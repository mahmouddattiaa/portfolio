# Kepler Dev — What To Do Next

Date: 2026-09-13  
Scope: repository documents, current source, and the public English routes at `https://www.keplerdev.uk/`

## Decision

Do not start another broad redesign. The agency positioning, visual system, founder route, offer structure, contact form, domain, and deployment are already in place. The shortest path to a launch-ready agency website is a **proof-and-conversion completion pass**, followed by one bounded responsive-polish batch.

The site currently makes a credible promise but cannot substantiate it at the moment a buyer looks for proof:

- the homepage presents Kepler Dev as a founder-led digital product studio;
- `/work` says **“No public work yet”**;
- `/mahmoud` shows one concrete experience capsule and two **“permission pending”** placeholders;
- the contact form and a real fallback email are visible publicly, so the older documents that describe both as missing are stale;
- `src/lib/content.ts` still contains an empty `caseStudies` array, making proof the real launch constraint.

## Current health by journey step

| Step | Health | Finding |
| --- | --- | --- |
| 1. Understand the studio | Good | The homepage clearly communicates a founder-led studio serving GCC and international teams. |
| 2. Understand the offer | Good | Four engagement routes are named and explained consistently. |
| 3. Assess credibility | Needs work | No public case study exists, and the founder page exposes unfinished permission-pending entries. |
| 4. Evaluate relevant work | Blocked | `/work` is an honest empty state, but it gives a buyer no concrete evidence to evaluate. |
| 5. Start an enquiry | Mostly ready | The form and fallback email are live; successful delivery and recoverable failure still need an intentional end-to-end test. |

## Ranked next actions

### P0 — Publish one strong, honest case study

Start with the connected loyalty and operations platform (the strongest match for the studio's positioning) if its owner permits publication. An anonymized version is acceptable and better than an empty portfolio.

Resolve this minimum evidence packet before editing the public record:

1. Public name or anonymized title.
2. Client, employer, internal, or owned-product classification.
3. Production status and approximate date range.
4. Mahmoud's exact role.
5. Team context and which work was not Mahmoud's.
6. The operational problem in plain language.
7. What was delivered.
8. One to three defensible outcomes; qualitative outcomes are acceptable when metrics cannot be disclosed.
9. Name/logo/media permission state.
10. Evidence reference, approval owner, and last-verified date.

Then seed the record through the existing publication gate in `src/lib/content.ts`. Do not bypass that gate or publish unverified metrics.

### P0 — Remove visible “permission pending” placeholders

Until the second and third projects are approved, the founder page should show the one supportable experience capsule plus the existing note that more private work can be discussed. An explicit unfinished placeholder reduces trust more than a deliberate, smaller selection.

### P0 — Verify enquiry delivery

Send one controlled test enquiry and confirm all of the following:

- it arrives at the intended inbox;
- the sender sees the success state only after successful delivery;
- validation errors focus the right field;
- provider failure preserves the entered details and exposes the fallback email;
- spam protection and Formspree notification/reply settings are configured;
- the public fallback becomes a domain-branded address such as `hello@keplerdev.uk` when available.

The live form proves that the Vercel configuration enables the route; it does not prove mailbox delivery because no submission was made during this review.

### P1 — Run one small presentation batch

After the first case study is available:

1. Populate `/work` with the real card before redesigning its empty layout.
2. Compress the mobile homepage by roughly 25%, removing repeated statements rather than shrinking readable type.
3. Keep the desktop hero to three lines and move the fold clear of the kicker at 1024 px.
4. Fix the documented contact-link contrast risk.
5. Tighten the mobile drawer so its theme control fits comfortably.

These are worthwhile but should not delay publishing proof or testing the enquiry path.

### P1 — Clean the public trust details

- Replace the personal Gmail fallback with a Kepler Dev domain address when possible.
- Add a short, plain-language privacy notice linked beside the enquiry consent text, with appropriate legal review for the markets being served.
- Remove “Questions, answered” items that do not materially reduce buying uncertainty; use the space for real evidence once available.

### P2 — Reset the documentation baseline

Update `10-current-status-and-context.md`, `decisions.md`, and the engineering handoff so they no longer report the founder photo and fallback email as missing. Mark form delivery as **configured but not end-to-end verified** until the controlled test passes. Make this review the current continuation point.

The root `README.md` also still describes a personal systems-engineer portfolio and an older Next.js version. Rewrite it after the product work so future contributors do not follow the obsolete direction.

## Recommended order for the next three work sessions

### Session 1 — Proof decision

Complete the ten-field evidence packet for the loyalty/operations platform and decide whether it will be named or anonymized. Hide the two unfinished founder capsules.

### Session 2 — Conversion verification

Publish the approved case study, confirm it appears on the homepage, `/work`, its detail route, and the sitemap, then run the controlled enquiry test.

### Session 3 — Responsive polish and documentation

Fix the documented P1 layout issues at 320, 390, 768, 1024, and 1440 px; run lint, TypeScript, and the production build; then update the stale status documents.

## Evidence limits

This review used the live page content returned from the public routes and the repository source/documents. A screenshot-capable browser was not available in this run, so no new visual comparison or claim of WCAG compliance is made. The older screenshot-based audit remains useful for the unresolved P1 items, but those issues should be visually rechecked before closing them.
