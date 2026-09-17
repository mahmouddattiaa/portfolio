# Agency Rebuild Implementation Progress

## 2026-09-17 — Placeholder removal, enquiry hardening, and documentation reset

- `/mahmoud` placeholders removed (commit `1f08faf`): dropped the two `permission pending` experience capsules (02 and 03) so only the one supportable capsule (Connected loyalty and operations platform) renders. The `private engagements are not listed publicly` footnote is preserved.
- Enquiry form hardened (commits `4762b96`, `5c8a1a1`):
  - `src/components/contact-form.tsx` — success state only renders after the API confirms (`response.ok`); client validation moves focus to the first invalid field while the error summary remains visible; server-returned validation errors keep focus on the first invalid field and the summary-focus useEffect tracks status transitions so it never steals focus back mid-correction; provider failure and network failure preserve every entered value and embed the fallback email inside the failure message itself; `response.json()` parsing is wrapped in its own try/catch so a non-JSON or empty error body is not misreported as a network failure.
  - `src/app/api/contact/route.ts` — forwards the request to `config.providerUrl`; rejects with 503 when no provider URL is configured. The QA-only `?debug=non-json` and `?debug=empty` branches, plus the `?api-debug=` passthrough in the form, were removed from shipped code so shipped traffic cannot drive non-JSON or empty error responses through these hooks. The non-JSON and empty-body client branches were re-verified by temporarily editing `route.ts`, exercising the client, and reverting via `git checkout`; the committed state never returns those bodies.
  - `src/lib/contact-config.ts` — exposes `CONTACT_PROVIDER_ENDPOINT` as an optional server-side override for the provider URL, defaulting to the real Formspree URL when unset; the `http(s)` scheme is required so the override cannot redirect traffic at `file:` or `data:` targets.
  - Form delivery remains **configured but not end-to-end verified**; the owner owes one controlled live enquiry before the public contract can be promoted past D-16 in `decisions.md`.
- Documentation baseline reset (this pass): `10-current-status-and-context.md` no longer reports the founder photo and fallback email as missing; the priority review 11 (`docs/agency-rebuild/11-next-step-priority-review-2026-09-13.md`) is named as the current continuation point; `decisions.md` records D-14 (placeholder removal), D-15 (enquiry hardening), D-16 (form delivery status), and D-17 (priority review 11 as continuation point); `README.md` rewritten for the Kepler Dev agency site on Next.js 16.

## 2026-08-09 — MVP preview implementation

- Implemented agency routes: `/`, `/work`, `/work/[slug]`, `/mahmoud`, and `/contact`.
- Added a three-state theme foundation, no-flash initial theme script, responsive shell, modal mobile navigation, keyboard focus handling, and reduced-motion rules.
- Added typed publication-gated case-study contracts; the public dataset intentionally remains empty until public proof and permissions are approved.
- Replaced personal/terminal-oriented pages with publication-safe agency copy, no-proof work states, founder route without a required photo, and qualification-contact form states.
- Created an intentionally unconfigured provider adapter. The contact form preserves values and reports a recoverable configuration failure rather than claiming delivery.
- Added route metadata, safe Organization/Person structured data, updated sitemap, and an agency social-preview image.

## Release blockers

- Q-02 / Q-03: public case-study shortlist, permissions, and evidence verification.
- Q-04: end-to-end verification of the configured Formspree delivery path (provider wiring itself is done).
- Privacy notice beside the enquiry consent text, FAQ trim (P1 batch).
- Responsive polish at 320, 375, 768, 1024, and 1440px (P1 batch).

## 2026-08-09 — Post-implementation correction sprint

- Replaced repeated homepage process descriptions with the approved distinct delivery copy and process note.
- Removed the duplicate `/work` CTA, retained the single no-public-proof CTA, and refreshed the no-public-work wording.
- Replaced the oversized founder initial with the documented text-led fallback and approved founder copy; no photograph or unapproved facts were introduced.
- Added 44px interactive targets for wordmark, navigation, footer links, FAQ disclosures, and text CTAs.
- Moved the mobile dialog to a document portal after visual QA found it did not cover the complete viewport; recheck confirms a full 320px overlay and 44px wordmark/menu targets.
- Contact is now an honest configuration-unavailable state until approved provider configuration exists. The server route is ready for an explicitly configured Formspree provider, with server validation, honeypot protection, in-process rate limiting, recoverable errors, success state, and a conditional verified fallback email.
- QA screenshots are saved in `artifacts/qa/`. `npm run lint` and `npm run build` pass.

## 2026-08-11 — Redesign handoff implementation

- Applied the supplied Agency website redesign visual language: paper/ink/signal-red tokens, Newsreader editorial typography, rule-based layout, branded header/footer, and responsive photographic hero.
- Added the supplied Kepler Dev logo lockups and hero poster to `public/brand/` and `public/media/`.
- Restyled the existing work, founder, contact, navigation, empty-state, and theme surfaces for the new system while preserving their content contracts and accessibility behavior.
- Deliberately did not import handoff-only emails, pricing, case studies, metrics, or commercial claims because they remain outside the approved publication records.
- `npm run lint` and `npm run build` pass.
