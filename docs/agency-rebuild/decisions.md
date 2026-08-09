# Agency Rebuild Decisions, Assumptions, and Questions

Updated: 9 August 2026

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

## Evidence conflicts resolved by current repository

- Older vault notes say a professional photo is pending. Current assets include `public/resources/pics/mahmoud-headshot.jpeg` and other founder photographs, and `src/components/about.tsx` renders the headshot. **Remaining issue:** approval/recency, not absence.
- Older notes say `public/Focus-Ritual` is empty. Current screenshots exist under `public/projects/focus-ritual/`. **Remaining issue:** proof classification and media approval, not absence.
- Older notes describe Formspree and WhatsApp work. Current `src/components/contact.tsx` renders Upwork, email, and LinkedIn only; no form or WhatsApp appears. `@formspree/react` remains installed. **Conclusion:** production contact behavior must be specified from current code, not old handoff claims.
- `src/components/tech-stack.tsx` says “Next.js 15,” while `package.json` uses Next.js 16.2.3. **Action:** correct or remove version-specific marketing copy during the content migration.

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

Choose the primary enquiry path and operational owner:

- Formspree, another provider, or a custom endpoint;
- destination email;
- whether WhatsApp is offered and the verified international-format business number;
- required form fields;
- response-time promise;
- privacy/consent wording and spam protection;
- fallback when submission fails.

Do not place provider IDs or secrets in this document.

Blocks: `/contact` implementation and launch.

### Q-05 — Offer and pricing publication

Confirm the public names and current ranges for Product Blueprint, Launch Sprint, Operations Platform, and Product Care. Should the MVP show ranges, “starting at,” or qualification-only pricing? Confirm that outreach feedback has not changed the approved offer direction.

Blocks: final offers/FAQ copy; route foundation can proceed with withheld prices.

### Q-06 — Founder content approval

Which current founder photo is approved for the agency home and `/mahmoud`? Confirm the short biography, résumé file/link, employment titles/dates, and whether iScore can be named publicly at all.

Blocks: final founder section and personal-route publication review.

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
