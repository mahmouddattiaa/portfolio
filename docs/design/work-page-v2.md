# Work page v2 — implementation spec

The approved design for `/work`. It was designed on a canvas the implementer cannot
open, so this file is the source of truth. Build exactly this. Where something is not
specified, follow the homepage (`src/app/page.tsx`, `src/app/home-v2.css`), which is the
same design language and already shipped.

Voice rule that governs every word on this page: **the page speaks as the studio**
("we"). Mahmoud is never named on `/work`. The card field that used to read "Role" now
reads "Our role".

## Design tokens (identical to the homepage)

| Token | Value | Use |
| --- | --- | --- |
| forest | `#071C18` | hero, closing band |
| forest deep | `#061713` | footer |
| cream | `#EEE7DE` | text on forest, "how to read" band |
| sand | `#E5DBD1` | the studies section ground |
| card | `#F6F1EA` | case study cards |
| ink | `#202826` | body text on light grounds |
| ink muted | `#4B5551` | secondary text on light grounds |
| copper | `#CF8649` | lines, accents |
| copper text | `#8F5327` | eyebrows and links on light grounds |
| copper light | `#D4A47A` | eyebrows and links on forest |

Manrope for headings (weight 450), Inter for text. Square corners everywhere except the
navigation pill and the filter pills (`border-radius: 999px`). Desktop side margin 72px
via the existing `--hv2-g` gutter; phone 20px. Touch targets at least 44px.

## Page structure

1. Hero (forest, photographic)
2. How to read this work (cream)
3. Published studies (sand)
4. Project review call (forest)
5. Footer (existing shared footer, unchanged)

### 1. Hero

Height `420px` on desktop (plus the navigation space variable), `520px` on phones. Full
bleed photograph behind it: a dark crop of the homepage tree image. Use
`public/media/home/hero-tree.webp`, cropped to the right-hand canopy and darkened. Add a
scrim over it so text contrast holds:

- desktop: `linear-gradient(90deg, #071C18 0%, rgba(7,28,24,0.94) 34%, rgba(7,28,24,0.72) 62%, rgba(7,28,24,0.58) 100%)`
  plus `linear-gradient(180deg, rgba(7,28,24,0.55) 0%, rgba(7,28,24,0) 40%)`
- phone: `linear-gradient(180deg, rgba(7,28,24,0.86) 0%, rgba(7,28,24,0.9) 45%, rgba(7,28,24,0.7) 100%)`

A soft copper radial light sits over the photo on the right, the same idea as the
homepage hero, drifting slowly. No zoom animation on this page.

Copy, exactly:

- eyebrow: `WORK`
- h1 (48px desktop, 34px phone): `The products we design, build and keep running.`
- lead (16px, max 700px): `Each study follows one engagement end to end: the problem, what we designed and built, the decisions that shaped it, and how every claim is evidenced. Client names and screens appear only where we have permission.`
  On phones shorten to: `Each study follows one engagement end to end: the problem, what we designed and built, and how every claim is evidenced.`

Bottom row of the hero, above a 1px `rgba(238,231,222,0.16)` rule: the four engagements
as plain text separated by small dots — `Product Blueprint`, `Launch Sprint`,
`Operations Platform`, `Product Care` — and, pushed to the right, a link to `/services`
reading `How we work with teams` with a right arrow. On phones the four names wrap onto
one line of small text with the link beneath.

### 2. How to read this work (cream)

Two columns on desktop: left column (460px) holds the eyebrow `HOW TO READ THIS WORK`,
an h2 `Published only with permission and evidence.` (40px) and the line
`Relevant private examples can be discussed in a project review.` The right column
(768px, starting at x=600 on a 1440 grid) holds three rows divided by 1px rules, each
with a fixed-width label and a paragraph:

- `CLASSIFICATION` — `Client work, employer work, internal build, owned product, university project or concept. Each study says which it is.`
- `PRODUCTION STATUS` — `In production, pilot, prototype, in development or concept. A running product and an idea are never shown as the same thing.`
- `EVIDENCE` — `Every claim is marked as publicly verifiable or privately verified, with the date it was last checked.`

Single column on phones, label above paragraph.

### 3. Published studies (sand)

**Filter row.** Pills, left aligned. Only categories that actually have a published
study may appear, plus `All work` first, which is selected by default. Derive them from
`publicCaseStudies` — do not hard-code the seven classifications. Selected pill: forest
background, cream text. Unselected: transparent with a `rgba(32,40,38,0.22)` border.
Right of the row, small muted text: `<n> stud(y|ies) shown · more in preparation ·
private examples on request`, in an `aria-live="polite"` region.

**Lead card.** While there are fewer than three published studies, the first study is a
single full-width card: 40px padding, `#F6F1EA` on a `rgba(32,40,38,0.14)` border, in
two columns (left 660px, right fills).

Left column, top to bottom: chips row, title, problem, technology tags, read link.

- chips: classification chip (copper text on `rgba(207,134,73,0.14)`) and production
  status chip (`#2F4F42` on `rgba(47,79,66,0.12)`), both uppercase 11px
- title: h3, Manrope 36px, the study's `publicTitle ?? title`
- problem: the study's `problem`, 16px
- technology tags: each `technologies` entry in a 28px outlined chip
- read link: `Read the case study` + right arrow, copper text, linking to
  `/work/<slug>`

Right column: a stack of labelled rows divided by 1px rules —

- `OUR ROLE` — the study's role text, with any personal name removed
- `CONTEXT` — the engagement context; when `clientNamePermission` is `anonymize`, the
  text must say the client name is withheld
- `EVIDENCE` — `Verified publicly` or `Verified privately`, then
  `, last checked <lastVerified formatted as 17 September 2026>`
- `SURFACES` — a short summary of the surfaces built

**Grid.** With three or more studies, the first stays the lead card and the rest form a
two-column grid of equal 232px cards below it: chips, title (26px), a one-line summary,
and the read link pinned to the bottom.

**In preparation.** Below the cards, a row of three dashed placeholders on desktop (one
column of two on phones): `rgba(32,40,38,0.3)` dashed border, the label
`IN PREPARATION`, a muted title placeholder, and
`Published once its evidence and permissions are in place.` These are static markup,
not data.

**Empty state.** If a filter matches nothing: `No published studies match that filter.`
plus `Try another classification, or request a project review.`

### 4. Project review call (forest)

Eyebrow `NOT EVERYTHING IS PUBLIC`, h2 `The rest is a conversation.` (52px desktop, 34px
phone), a copper gradient button `Request a project review` linking to `/contact`, and
beside it `Work under agreement can be walked through privately, in context.` Beneath,
the copper thread line that grows in and ends in a pulsing node — reuse the homepage
closing treatment.

## Behaviour and motion

- The hero eyebrow, headline and lead rise in on load; the copper light drifts.
- Cards lift 4px on hover with a soft shadow, and the read arrow steps 4px right.
- Filters change the visible set without a page load.
- Every animation stops under `prefers-reduced-motion: reduce`.
- Reuse the homepage's CSS-driven reveal approach (`data-inview`), not Framer Motion.

## Words

All page copy lives in a typed dictionary, the same shape as `src/content/home`: add
`src/content/work/{types.ts,en.ts,index.ts}` with a `getWorkCopy("en")`. The page and
components read from it. Facts about studies keep coming from `src/lib/content.ts`.

## Constraints

- Do not change the publication gate in `src/lib/content.ts`, the case study records, or
  anything under `src/app/page.tsx` and `src/app/home-v2.css`.
- Styles for this page go in their own scoped stylesheet, mirroring how `home-v2.css`
  is scoped under `.hv2`.
- `npm run lint` and `npm run build` must pass.
- Screenshots at 390, 768, 1024 and 1440 are required evidence. Capture them with
  `node scripts/shoot.mjs http://localhost:3100/work artifacts/qa/work-v2 390,768,1024,1440`
  against a production build (`npm run build` then `npm run start -- -p 3100`).

## Where this design came from

The approved design lives on a private design canvas only the site owner can open. This
file is its written form and is what you build against. If something here is ambiguous,
do not invent a third option: follow the homepage, and say in your evidence which choice
you made and why.

The reviewer holds the canvas and compares it against the screenshots left in
`artifacts/qa/work-v2/`, so those screenshots are the work being reviewed, not a
formality.
