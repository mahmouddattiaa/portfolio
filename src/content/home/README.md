# Homepage copy

Every word on the homepage lives here, not in the page or its components.

- `types.ts` — `HomeCopy`, the shape every language version must fill.
- `en.ts` — the English copy.
- `index.ts` — `getHomeCopy(locale)`, used by `src/app/page.tsx`.

## Adding the Arabic version

The Arabic homepage is written, not translated. Keep the keys; write copy that
reads naturally to an Arabic-speaking reader, even when it says something a
little differently from the English.

1. Copy `en.ts` to `ar.ts`, rename the export to `homeAr`, and set
   `lang: "ar"` and `dir: "rtl"`.
2. Rewrite each value in Arabic. TypeScript will not let a key go missing.
3. Offers and FAQ answers currently come from `src/lib/content.ts` in English.
   Give `homeAr.services.offers` and `homeAr.faq.items` their own Arabic lists
   in `ar.ts` rather than editing the English source.
4. Register `ar: homeAr` in `index.ts` and add `"ar"` to `HomeLocale`.
5. Render the homepage from `src/app/ar/page.tsx` with `getHomeCopy("ar")`.
   The layout already mirrors for `dir="rtl"`.

## What stays out of this file

Case-study facts, figures and the illustrative sample values (balance, timer,
ledger rows, the numbers strip) come from
`src/components/case-study/presentation.ts`, so the homepage and the case study
page can never disagree. An Arabic case study needs its own presentation entry.
