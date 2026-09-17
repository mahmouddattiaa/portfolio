# Agency Rebuild Decisions, Assumptions, and Questions

Updated: 17 September 2026

## Decision log

| ID | Status | Decision | Rationale/source |
|---|---|---|---|
| D-01 | Locked | Use the current Next.js App Router/React/Tailwind stack. | Lint/build pass; no evidence supports a rewrite. |
| D-02 | Proposed for approval | MVP routes are `/`, `/work`, `/work/[slug]`, `/mahmoud`, `/contact`. | Approved transformation brief; avoids thin pages. |
| D-03 | Proposed for approval | Keep services, process, and about as home sections for MVP. | Offer/process content can convert without separate thin routes. |
| D-04 | Locked | Root becomes Kepler Dev; personal portfolio moves to `/mahmoud`. | Agency strategy and transformation brief. |
| D-05 | Locked | Projects require classification, production status, role/team context, evidence status, and permission status. | Truth constraints. |
| D-06 | Locked | StayEase and FitForge cannot be presented as completed production work. | Transformation brief. |
| D-07 | Locked | iScore is not a normal public agency case study without explicit approval and corrected facts. | Transformation brief. |
| D-08 | Locked | Light, dark, and system themes are part of the foundation. | UX architecture requirement. |
| D-09 | Proposed for approval | `www.keplerdev.uk` remains canonical. | Current production redirect and code default align. |
| D-10 | Proposed for approval | Agency project detail uses routes, not modal-only presentation. | Accessibility, deep-linking, SEO, and buyer review needs. |
| D-11 | Proposed for approval | Lead with “Replace fragmented operations with one connected product.” | `04-messaging-and-page-copy.md`; states the primary buyer problem and desired transformation without an unsupported performance claim. |
| D-12 | Proposed for approval | Use “Request a project review” as the single primary CTA across the MVP. | Qualification-first conversion path; avoids implying an automatic call, quote, or delivery commitment. |
| D-13 | Locked until Q-05 is resolved | Withhold public prices and numerical durations; explain that both follow scope review. | Working offer ranges exist, but publication and outreach validation are not approved. |
| D-14 | Locked | `/mahmoud` shows the real founder portrait and working-context photograph; the two `permission pending` experience capsules (02 and 03) are dropped until client permission is resolved. The `private engagements are not listed publicly` footnote is kept. | Commits `17c3b0a`, `d630814`, `1f08faf`; review 11 P0. |
| D-15 | Locked | Enquiry form behaviour: success state only after the API confirms (`response.ok`); client validation moves focus to the first invalid field while the error summary remains visible; failure messages embed the verified fallback email; `response.json()` parsing is wrapped in try/catch so non-JSON or empty error bodies are not misreported as network failures; an optional `CONTACT_PROVIDER_ENDPOINT` override exists for operator-set server env only and never accepts a per-request override. QA-only debug hooks in `src/app/api/contact/route.ts` and the `?api-debug=` passthrough in `contact-form.tsx` are removed from shipped code. | Commits `4762b96`, `5c8a1a1`; review 11 P0 verification checklist. |
| D-16 | Pending verification | Form delivery status is **configured but not end-to-end verified**. The provider wiring, hardened states, and fallback email are live, but actual mailbox delivery and the recoverable failure path require one controlled live enquiry by the owner before they may be reported as verified. | Review 11 P0, 2026-09-13; follows the orchestrator settlement that the shipped debug-hook removal is the only QA affordance in code. |
| D-17 | Locked | Priority review 11 (`11-next-step-priority-review-2026-09-13.md`) is the current continuation point. The next three sessions are (1) proof decision, (2) conversion verification, (3) responsive polish and documentation. | Review 11, 2026-09-13. |

## Evidence conflicts resolved by current repository

- Older vault notes say a professional photo is pending. Current `/mahmoud` ships the real portrait at `public/brand/founder-portrait.{jpg,webp,mobile.webp}` (commit `17c3b0a`) plus the working-context photograph at `public/brand/founder-working-context.webp` (commit `d630814`). The placeholder portrait SVG is retained only for compatibility with any internal reference that still points to it. **Conclusion:** the founder photograph is live; no missing-photo claim survives.
- Older notes say `public/Focus-Ritual` is empty. Current screenshots exist under `public/projects/focus-ritual/`. **Remaining issue:** proof classification and media approval, not absence.
- Older contact flow described Formspree and WhatsApp work. Current contact behaviour lives in `src/app/contact/page.tsx`, `src/app/api/contact/route.ts`, `src/components/contact-form.tsx`, and `src/lib/contact-config.ts`; the form is wired to Formspree through `/api/contact` with the verified mailto fallback (`NEXT_PUBLIC_CONTACT_FALLBACK_EMAIL`) exposed on the route hero in both the available and unavailable states. `@formspree/react` remains in `package.json`. The live form has not yet been end-to-end verified, so the public contract remains "configured but not verified" per D-16.
- `src/components/tech-stack.tsx` still says “Next.js 15,” while `package.json` uses Next.js 16.2.3. The documentation reset does not include source-code changes; the version string should be reconciled with the actual Next.js major when the file is next touched under a content-pass task.

## Assumptions used in the architecture

- Kepler Dev can truthfully operate as a founder-led studio, with Mahmoud as the accountable lead; permanent team size is not assumed.
- English is the only MVP language; Arabic/RTL is architectural readiness, not launch scope.
- The existing Vercel deployment and domain remain unless deployment evidence later reveals a blocker.
- Public pricing can be omitted without weakening the route architecture.
- Case studies may use qualitative outcomes when metrics are unavailable, provided classification and role are clear.
- Existing components are implementation references, not locked visual designs.

## Blocking questions for Mahmoud

These block publication or the first implementation milestone where noted.

### Q-01 — Agency identity and delivery model

Can “Kepler Dev” be presented publicly as the trading/agency name, and what exact sentence describes the founder-led capacity model? Confirm whether contractors are used, how they are disclosed, and that Mahmoud remains the client's accountable lead.

Blocks: final root/about copy and Organization structured data.

### Q-02 — Case-study permissions and shortlist

For gLiter, QuickChargingPOS, and HS VPN, confirm separately:

- public company/product name or anonymized name;
- Mahmoud's exact role and team context;
- production/pilot status and dates;
- screenshot/logo permission;
- metrics/results that may be published;
- testimonial wording/name permission.

Then approve the first two or three agency case studies.

Blocks: case-study seeding, proof strip, `/work`, and homepage selected work.

### Q-03 — Faseeh versus Aksira

Is “Faseeh AI Keyboard” the current/previous name of Aksira, a separate client/product, or an unrelated project? Confirm ownership, public name, release status, Play Store URL, and whether the `700ms → 30ms` metric can be evidenced.

Blocks: any public agency use of this project.

### Q-04 — Contact conversion path

The enquiry path is Formspree (D-15). The destination email, the verified fallback address (`NEXT_PUBLIC_CONTACT_FALLBACK_EMAIL`), the form fields, and the hardened states are all implemented. Remaining inputs the owner should confirm before public launch:

- destination inbox and operational owner;
- whether WhatsApp is offered and the verified international-format business number;
- privacy/consent wording beside the form and a linked privacy notice;
- response-time promise;
- one controlled live enquiry that closes D-16.

Do not place provider IDs or secrets in this document.

### Q-05 — Offer and pricing publication

Confirm the public names and current ranges for Product Blueprint, Launch Sprint, Operations Platform, and Product Care. Should the MVP show ranges, “starting at,” or qualification-only pricing? Confirm that outreach feedback has not changed the approved offer direction.

Blocks: final offers/FAQ copy; route foundation can proceed with withheld prices.

### Q-06 — Founder content approval

The founder portrait and working-context photograph on `/mahmoud` are shipped (D-14). Remaining inputs the owner should confirm before public launch:

- the short biography and résumé file/link on the agency home;
- employment titles/dates;
- whether iScore can be named publicly at all.

### Q-07 — Canonical and personal URL

Approve `/mahmoud` and `https://www.keplerdev.uk` as canonical choices. Identify any external profiles/campaigns that currently link to root anchors so migration communication can be planned.

Blocks: metadata/sitemap finalization.

### Q-08 — Evidence and claim sign-off owner

Who owns the private evidence/permission register and gives final approval when a case study or claim changes from `draft` to `public`? Confirm where approval references and last-verified dates are recorded without committing private client evidence or secrets to the public repository.

Blocks: durable claim governance and safe publication of the proof strip, case studies, metrics, testimonials, and client media.

## Non-blocking follow-up decisions

- Whether a future Arabic site uses `/ar` locale prefixes or a separate domain/subdomain.
- Whether `/services`, `/process`, `/about`, or `/labs` earns a separate route after MVP analytics/search evidence.
- Whether Upwork remains visible on the agency home or only on `/mahmoud`.
- Whether selected personal visual effects remain on `/mahmoud` after performance/accessibility review.
- Exact analytics event naming and retention/privacy policy.
