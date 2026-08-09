# Repository and Production-Surface Audit

Audit date: 9 August 2026  
Repository: `D:/Personal Project/portofolio/portfolio`  
Production surface checked: `https://www.keplerdev.uk/`

## Executive finding

The repository is a healthy, buildable single-page personal portfolio, not yet an agency website. The stack should be evolved rather than replaced. The central rebuild problem is content and route architecture: one client-rendered root currently combines personal positioning, technical proof, low-ticket CTAs, and project modals. Kepler Dev needs a multi-route, truth-controlled agency experience with the current personal content preserved at `/mahmoud`.

The five most serious conversion and trust problems are:

1. **The root sells the wrong commercial position.** The hero identifies Mahmoud as a mobile/backend developer and the contact section advertises `$300–$1,500` engagements, conflicting with the approved agency offers (`src/components/hero.tsx`, `src/components/contact.tsx`).
2. **The delivery promise is not credible for the approved scope.** “Day 7 — Final Delivery” and “Fast, Transparent Delivery” are incompatible with 6–16+ week product engagements (`src/components/process.tsx`).
3. **Project truth is mixed together.** Production client work, employer work, internal capability projects, concepts, and university work share the same visual treatment; unavailable links use `#` (`src/lib/data.ts`, `src/components/project-card-premium.tsx`).
4. **The contact journey does not qualify agency work.** The current surface provides Upwork, email, and LinkedIn cards only; it has no project form, success/error states, budget/timeline/context fields, or clear agency CTA (`src/components/contact.tsx`).
5. **The information architecture cannot support agency decision-making.** Only `/` exists as a content page, projects open in a modal, and there are no indexable service, case-study, founder, or contact destinations (`src/app/page.tsx`, `src/components/project-details-modal.tsx`).

## Evidence and validation

Observed on 9 August 2026:

- `npm run lint` passed.
- `npm run build` passed using Next.js 16.2.3 and generated `/`, `/robots.txt`, `/sitemap.xml`, and `/opengraph-image` plus the framework not-found route.
- Both `https://keplerdev.uk` and `https://www.keplerdev.uk` returned HTTP 200; the apex resolved to `www`.
- The live title remains “Mahmoud Attia | Mobile & Backend Developer | AI Integration Specialist,” matching `src/app/layout.tsx`.
- Git was on `master` tracking `origin/master`; `docs/` was already untracked before this audit.

No automated viewport screenshot harness or end-to-end test suite is configured. Responsive and interaction findings below are therefore code-based, not claims of visual device certification.

## Current architecture

| Area | Observed implementation | Assessment |
|---|---|---|
| Framework | Next.js App Router 16.2.3, React 19.2.3, TypeScript 5 (`package.json`) | Suitable for the rebuild. |
| Rendering | `src/app/page.tsx` is one large client component controlling filters and the project modal. | Split route composition from client-only interactions. |
| Routes | Content only at `/`; generated metadata routes in `src/app/robots.ts`, `src/app/sitemap.ts`, and `src/app/opengraph-image.tsx`. | Insufficient for agency SEO and buyer journeys. |
| Content source | Project and experience objects in `src/lib/data.ts`; most page copy lives inside components. | Replace component-embedded commercial copy with typed content contracts. |
| Styling | Tailwind CSS 4 plus global tokens/animations in `src/app/globals.css`. | Reusable base, but tokens are dark-only and presentation is tightly coupled to components. |
| Typography | Geist, Syne, and JetBrains Mono loaded in `src/app/layout.tsx`. | Reuse; reduce “terminal” cues on agency pages. |
| Motion | Framer Motion across page and components (`package.json`, `src/components/*`). | Keep selectively and honor reduced-motion preferences. |
| Analytics | Vercel Analytics mounted in `src/app/layout.tsx`. | Add named conversion events and a measurement contract. |
| Contact | Static link cards in `src/components/contact.tsx`; `@formspree/react` is installed but unused. | Build a qualification flow; resolve provider/config before launch. |
| SEO | Site-wide personal metadata in `src/app/layout.tsx`; canonical root, Open Graph image, robots and sitemap exist. | Establish route-level agency and Person metadata plus structured data. |
| Assets | 153 public files, about 85.8 MB. Founder photos and Focus Ritual screenshots exist under `public/resources/pics/` and `public/projects/focus-ritual/`. | Asset availability is better than vault notes indicate; performance/permission review remains. |
| Tests | No test script or visible unit/E2E suite in `package.json`. | Add focused route, form, and accessibility coverage during implementation. |

## Current route and dependency map

```text
src/app/layout.tsx
├─ global fonts and metadata
├─ src/app/globals.css
├─ Vercel Analytics
└─ src/app/page.tsx (client)
   ├─ shell effects: Preloader, ScrollProgress, CustomCursor, AnimatedBackground
   ├─ Navbar
   ├─ Hero
   ├─ About
   ├─ TechStack
   ├─ projects from src/lib/data.ts
   │  ├─ filter state in page.tsx
   │  ├─ ProjectCardPremium
   │  └─ ProjectDetailsModal
   ├─ Terminal
   ├─ ExperienceTimeline ← experience from src/lib/data.ts
   ├─ Process
   ├─ Testimonials
   └─ Contact
```

Current section order in `src/app/page.tsx` is Hero, About, Tech Stack, Projects, Terminal, Experience, Process, Testimonials, Contact. Navigation links only to About, Projects, Experience, and Contact (`src/components/navbar.tsx`).

## UX and conversion audit

### Positioning and hierarchy

- The hero leads with job-title capability rather than the buyer's operational outcome (`src/components/hero.tsx`).
- Proof badges—“Production Projects,” “Self-Hosted Infrastructure,” and “$1k+ Earned on Mostaql”—have no adjacent evidence or qualification (`src/components/hero.tsx`).
- The primary CTA, “View My Work,” jumps down-page; the secondary sends visitors to Upwork. Neither begins an agency qualification journey (`src/components/hero.tsx`).
- Technical stack and terminal sections appear before the delivery method and buyer problem, making the page developer-first rather than buyer-first (`src/app/page.tsx`, `src/components/tech-stack.tsx`, `src/components/terminal.tsx`).

### Proof and claims

- Eleven projects are defined in `src/lib/data.ts`, but classification and permission are absent from the public content model.
- Seven current project records use `link: "#"`, which implies clickability without proof access (`src/lib/data.ts`).
- StayEase and FitForge are concepts but are presented alongside production work (`src/lib/data.ts`).
- QuickChargingPOS is employer work; the public card needs the real role or anonymization (`src/lib/data.ts`).
- The current iScore experience description makes high-security and national-credit-bureau claims; public use requires approval and corrected role/dates (`src/lib/data.ts`).
- Testimonials are attributed, but the repository does not record publication permission or source evidence (`src/components/testimonials.tsx`).

### Contact journey

- There is no `<form>` in `src/components/contact.tsx`.
- The installed Formspree client is not imported by current source (`package.json`, `src/components/contact.tsx`).
- The current component contains no WhatsApp number or link, contrary to older vault handoff notes (`src/components/contact.tsx`).
- Email is exposed directly. A future form must define spam protection, privacy language, routing, and fallback behavior.

## Accessibility and responsive audit

Strengths:

- The mobile navigation uses a native button with `aria-label` and `aria-expanded` (`src/components/navbar.tsx`).
- Project modal work includes dialog semantics and keyboard handling (`src/components/project-details-modal.tsx`).
- Images use Next Image in major content components (`src/components/about.tsx`, `src/components/project-card-premium.tsx`).
- Layouts use responsive Tailwind breakpoints throughout.

Risks to resolve:

- `cursor-none` is applied to the root and a custom cursor is used (`src/app/page.tsx`, `src/components/custom-cursor.tsx`), which can degrade input clarity and should not be used on touch/coarse pointers.
- A mandatory 1.4-second preloader delays access regardless of actual readiness (`src/components/preloader.tsx`).
- Motion is pervasive; the implementation needs a system-level reduced-motion policy rather than component-by-component assumptions (`src/app/globals.css`, multiple `src/components/*.tsx`).
- The mobile menu lacks documented focus trapping/return behavior and Escape handling (`src/components/navbar.tsx`).
- The current palette is dark-only (`src/app/globals.css`); there is no light/dark/system control.
- Modal project details are less robust than semantic case-study routes for history, deep links, screen readers, and SEO (`src/components/project-details-modal.tsx`).
- Visual QA is still required at 320, 375, 768, 1024, and 1440px widths.

## SEO and performance audit

- `src/app/layout.tsx` applies personal metadata globally. Route-level metadata is required so `/` represents Kepler Dev and `/mahmoud` represents the person.
- `src/app/sitemap.ts` currently knows only the root; all approved public routes must be added.
- Organization and Person structured data are absent.
- The production metadata domain and redirect behavior are consistent on `www`, but the default URL in code must remain aligned across layout, sitemap, robots, and deployment environment (`src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`).
- Roughly 85.8 MB of public assets warrants an asset-by-asset usage and optimization pass; this does not imply all files are shipped on the first load.
- A fully client-rendered page, custom cursor, preloader, animated background, and broad Framer Motion usage create avoidable JavaScript and interaction cost (`src/app/page.tsx`). Prefer server components for route/page composition and client islands only where needed.
- No route-level Lighthouse, Web Vitals budget, or automated regression test is currently documented.

## Component disposition

Disposition counts cover the 15 current files in `src/components/`.

| Disposition | Count | Components | Intent |
|---|---:|---|---|
| Reuse/adapt | 6 | `about.tsx`, `experience-timeline.tsx`, `project-card-premium.tsx`, `project-details-modal.tsx`, `tech-stack.tsx`, `testimonials.tsx` | Reuse data/interaction ideas, mostly on `/mahmoud` or as redesigned proof blocks. Modal use should be personal-only; agency case studies get routes. |
| Rewrite for agency contracts | 4 | `navbar.tsx`, `hero.tsx`, `process.tsx`, `contact.tsx` | Replace positioning, route behavior, semantics, and states while preserving useful implementation patterns. |
| Retire from agency root | 5 | `animated-background.tsx`, `custom-cursor.tsx`, `preloader.tsx`, `scroll-progress.tsx`, `terminal.tsx` | May remain on `/mahmoud` only if performance and accessibility justify them; do not drive the agency identity. |

`src/app/page.tsx` itself must be decomposed and rewritten as an agency route composition. `src/lib/data.ts` should be migrated into typed personal/project/case-study content contracts rather than copied unchanged.

## Conclusion

There is no framework blocker. The safe direction is a route and content-model evolution inside the current App Router stack, preceded by claim/permission decisions. Implementation should begin only after `decisions.md` resolves the critical proof and contact questions.

