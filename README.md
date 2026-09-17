# Kepler Dev

Source for the [Kepler Dev](https://www.keplerdev.uk/) agency site — a founder-led studio for connected mobile, web, and operational products. Built on Next.js and deployed automatically to Vercel on every push to `master`.

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router, React Server Components)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5 (strict)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Framer Motion](https://www.framer.com/motion/) for the reduced-motion-aware entrance animations
- [@formspree/react](https://formspree.io/) on the client, with the server route forwarding through `/api/contact`
- [@vercel/analytics](https://vercel.com/analytics) for lightweight traffic measurement

See `package.json` for exact versions.

## Getting started

Prerequisites: Node.js (current LTS) and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

```bash
npm run build   # production build
npm run lint    # ESLint via eslint-config-next
```

## Environment

The contact form reads its configuration from environment variables through `src/lib/contact-config.ts`. Values are operator-set server env and must never be checked into the repository. The names that the route and form recognise are:

- `CONTACT_PROVIDER` — must be `formspree` to enable the online form
- `FORMSPREE_FORM_ID` — the Formspree form ID
- `CONTACT_FALLBACK_EMAIL` — server-side fallback used by `src/app/api/contact/route.ts`
- `NEXT_PUBLIC_CONTACT_FALLBACK_EMAIL` — public fallback surfaced on `/contact`
- `CONTACT_PROVIDER_ENDPOINT` — optional server-side override for the provider URL (defaults to the real Formspree URL when unset; must use `http://` or `https://`)

`.env.example` lists every variable with its role and an empty value. Do not commit a populated `.env.local`.

## Repository layout

- `src/app/` — routes (`/`, `/work`, `/work/[slug]`, `/mahmoud`, `/contact`, `/ar`) and `src/app/api/contact/route.ts`
- `src/components/` — site shell, route hero, contact form, Kepler Fold motif, work grid
- `src/lib/` — `content.ts` (case-study contract + publication gate), `contact.ts` (validation), `contact-config.ts` (provider config)
- `src/app/global-atelier.css`, `src/app/global-atelier-home.css` — atelier tokens and route styling
- `public/brand/`, `public/media/kepler-fold/` — wordmark, founder photographs, Kepler Fold asset family

## Documentation

The rebuild history lives under `docs/agency-rebuild/`:

- `11-next-step-priority-review-2026-09-13.md` — current continuation point (proof, conversion verification, responsive polish)
- `10-current-status-and-context.md` — "you are here" map and file inventory
- `decisions.md` — locked decisions, evidence conflicts, and open questions
- `progress.md` — dated implementation log
- `sessions/handoff.md` — recent engineering handoffs
- `00-…09-…` — the original brief, audit, IA, copy, design, and implementation documents

`artifacts/audit-2026-08-16/AUDIT-REPORT.md` is the 2026-08-16 audit report and its re-runnable Playwright + axe harness.

## Conventions

- `getContactConfig()` in `src/lib/contact-config.ts` is the single source of truth for the provider URL, fallback email, and `enabled` flag — read it instead of duplicating the logic
- `publicCaseStudies` in `src/lib/content.ts` is the publication gate; do not bypass it
- Atelier tokens live in `src/app/global-atelier.css` only
- The Kepler Fold is the homepage LCP — `priority` and `loading="eager"` are required, never lazy
- Stage commits explicitly (pick files) and never push AI-generated secrets or `.env.local` content

## Contact

The site exposes `/contact` with a verified mailto fallback rendered in both the available and unavailable form states. The first-request form behaviour is documented in `docs/agency-rebuild/decisions.md` (D-15, D-16).
