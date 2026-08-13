# Frontend Agent Brief — Global Atelier UI Overhaul

You are implementing the approved full UI overhaul of the Kepler Dev agency website in the existing repository:

`D:\Personal Project\portofolio\portfolio`

This is an active shared codebase. You are not alone. Preserve all existing and concurrent user/agent changes, do not reset or revert unrelated files, and adapt your work around any edits that appear while you are implementing.

## Objective

Translate the locked **Option 3 — Global Atelier** visual direction into a faithful, responsive, bilingual-ready production implementation.

The new site must feel calm, cultured, human, globally credible, and premium. It should sell taste, quality, collaboration, and reliable progress—not code, infrastructure, dashboards, devices, or technological spectacle.

Do not reinterpret the art direction. Do not merge in other concepts unless Mahmoud explicitly requests it.

## Read these sources first, in this order

### Live project memory

1. `C:\Users\Mahmoud Attia\Documents\ClaudeVault\projects\portfolio\MOC.md`
2. `C:\Users\Mahmoud Attia\Documents\ClaudeVault\projects\portfolio\context.md`
3. `C:\Users\Mahmoud Attia\Documents\ClaudeVault\projects\portfolio\progress.md`
4. `C:\Users\Mahmoud Attia\Documents\ClaudeVault\projects\portfolio\sessions\handoff.md`

The vault is the source of truth when it conflicts with stale repository notes.

### Locked design target

1. `docs/agency-rebuild/08-global-atelier-preimplementation-design.md`
2. `artifacts/design/global-atelier-preimplementation-2026-08-13/01-desktop-en.png`
3. `artifacts/design/global-atelier-preimplementation-2026-08-13/02-mobile-en.png`
4. `artifacts/design/global-atelier-preimplementation-2026-08-13/03-mobile-ar-rtl.png`

Open and inspect all three images directly. Do not infer their design from filenames or prose alone.

### Product, copy, safety, and implementation context

1. `docs/agency-rebuild/07-audit-remediation-plan.md`
2. `docs/agency-rebuild/decisions.md`
3. `docs/agency-rebuild/04-messaging-and-page-copy.md`
4. `docs/agency-rebuild/05-design-system-and-wireframes.md`
5. `docs/agency-rebuild/06-implementation-plan.md`
6. `artifacts/audits/current-implementation-2026-08-13/implementation-audit.md`
7. `artifacts/research/karve-digital-2026-08-13/karve-reference-analysis.md`

Karve is only a quality benchmark. Do not copy its layout, assets, motion, identity, or copy.

## Locked design decisions

- Direction: Global Atelier.
- Palette: deep forest, mineral stone, pearl, muted bronze.
- Main visual device: the proprietary **Kepler Fold**.
- English hero headline: **Thoughtful digital products, made to move your business forward.**
- Primary CTA: **Start a conversation**.
- Secondary CTA: **Explore our approach**.
- Brand tone: warm, confident, culturally neutral, and friendly to GCC and international clients.
- English and Arabic are first-class. Arabic is a real RTL composition, not an English layout with translated strings.
- The other saved concepts—Quiet Confidence and Warm Modernism—are references only and are not implementation targets.

## Non-negotiable visual constraints

- Do not use hero photography, stock people, dashboards, product screens, laptops, code, charts, data networks, nodes, glowing paths, or generic SaaS graphics.
- Do not turn the Kepler Fold into CSS/div art, a handcrafted SVG, or a crude gradient polygon. Prepare it as a real visual asset or an implementation-quality motion asset based on the approved target.
- Do not flatten editable UI copy into screenshots.
- Do not use the complete Fold repeatedly. Use it once in the hero; afterward use only cropped edges, apertures, or transition fragments.
- The Fold must read as a digital-product-studio brand motif, not architecture, interiors, fabric, leather, paper, or materials retail.
- Avoid card grids, nested cards, excessive rounded corners, glassmorphism, neon, particle fields, and decorative regional clichés.
- Do not invent clients, logos, testimonials, metrics, case studies, public proof, prices, delivery times, founder facts, or contact promises.
- Use a real icon library consistent with the design; do not substitute emoji, text glyphs, or approximate hand-drawn icons.

## Publication and business gates

Do not resolve these independently:

- Q-02/Q-03: public work and permissions.
- Q-04: live contact provider, fallback, and privacy/consent copy.
- Q-06: founder facts, portrait, and public links.

Respect the existing publication-safe content types and `publicCaseStudies` gate. If no approved work exists, render the approved private-work explanation and a real contact route; do not imply that public case studies exist.

Do not put secrets or real private destination addresses in source, docs, `.env.example`, screenshots, or commits.

## Implementation sequence

### Slice 1 — Foundations and shell

1. Audit the current tokens, font loading, logo assets, header, theme provider, and homepage structure before editing.
2. Introduce semantic Global Atelier tokens without breaking existing light/dark/system behavior unless the approved direction explicitly replaces a mode.
3. Select web-licensed English and Arabic fonts with compatible weight and metrics; document sources and performance impact.
4. Fix the confirmed mobile-menu reverse-wordmark defect while rebuilding the header.
5. Implement the responsive header, locale control, navigation, focus behavior, and mobile drawer.
6. Establish logical-property CSS for future RTL: `margin-inline`, `padding-inline`, `inset-inline`, and `border-inline`.

### Slice 2 — Homepage visual target

1. Implement the English desktop homepage against `01-desktop-en.png`.
2. Implement the intentional mobile reflow against `02-mobile-en.png`; do not merely stack desktop sections.
3. Build the complete homepage architecture from the design specification:
   - hero;
   - capabilities;
   - approach;
   - approved work/private-work disclosure;
   - founder-led reassurance;
   - approved services/ways to work;
   - concise FAQ;
   - final CTA and footer.
4. Compress repeated legacy sections. Do not carry forward the current 8,620–12,812px page length or repeated problem/system/process/value language.
5. Use real semantic HTML and live text. The generated design frames are references, never production page images.

### Slice 3 — Bilingual and RTL

1. Implement a route or locale architecture that sets correct `lang` and `dir` on the root document.
2. Use the exact approved English and provisional Arabic copy from `08-global-atelier-preimplementation-design.md`.
3. Implement the Arabic mobile composition against `03-mobile-ar-rtl.png`.
4. Reverse navigation order, alignment, arrows, rules, menu entry side, and Fold placement appropriately.
5. Never mirror the Latin Kepler Dev wordmark.
6. Keep Arabic publication marked provisional until native-speaker review is recorded.

### Slice 4 — Motion and interaction

Implement the motion storyboard from the design specification:

- masked hero-line reveal;
- one-time Fold alignment/opening;
- subtle material-light response;
- calm section aperture transitions;
- reading-direction approach rule;
- restrained CTA arrow/edge response;
- locale crossfade;
- mobile material-plane drawer.

Motion must use transform/opacity wherever possible, remain restrained, and preserve meaning with JavaScript disabled or motion reduced.

Do not add smooth-scroll hijacking, essential scroll-hidden content, custom cursors, looping marquees, particles, sound, or continuous decorative movement.

## Responsive and accessibility requirements

- Verify at 320, 390, 720, 1024, and 1440px.
- No horizontal overflow, clipped headings, obscured Fold, or unreadable texture.
- Body copy is at least 16px on mobile; utility text is generally at least 13px.
- Interactive targets are at least 44×44px.
- Preserve semantic heading order, landmarks, accessible names, visible focus, keyboard navigation, Escape close, overlay close, focus trap, and focus return.
- Honor `prefers-reduced-motion` for every non-essential animation.
- Verify contrast on both textured dark surfaces and pearl sections; do not assume the mockup proves compliance.
- Review Arabic line breaks manually at every required width.

## Contact and proof behavior

- Every primary CTA must end at either an enabled form or a verified fallback.
- If Q-04 is still unresolved, keep the safe unavailable state and do not pretend submission works.
- If no public case study passes the publication gate, remove any `View selected work` promise that leads to an empty state and use the approved private-work message instead.
- Do not implement a cosmetic success state for a request that was not actually delivered.

## Verification

Run at minimum:

```text
npm run lint
npx tsc --noEmit
npm run build
```

Then verify in a fresh local process, not the known stale port-3011 server:

- English desktop target at 1440px.
- English mobile target at 390px and narrow safety at 320px.
- Arabic RTL target at 390px and 320px.
- Header, locale switch, menu, anchors, CTAs, FAQ, contact path, theme behavior if retained, focus, keyboard, and reduced motion.
- Browser console has no errors or hydration warnings.

Create a visual comparison using the reference and implementation at the same viewport. Fix visible P0/P1/P2 mismatches before handoff. Record any remaining P3 polish separately.

## Working and reporting rules

- Start by reporting the files you expect to own and any existing dirty changes that overlap them.
- Keep changes scoped and reviewable; avoid unrelated refactors.
- Do not commit unless Mahmoud or the supervising agent explicitly requests it.
- Update the live Obsidian project memory after a completed implementation milestone or significant design/technical decision.
- Keep the user updated with concise visual outcomes and blockers, not raw terminal output.

## First action

Read the required sources, inspect the three target images, inspect the current implementation and git status, then respond with:

1. the files you plan to edit;
2. any overlap risk with existing changes;
3. the chosen English/Arabic font pairing and why;
4. the proposed Kepler Fold asset/animation implementation;
5. a short Slice 1 execution plan.

After that, begin Slice 1 and continue through verification unless a genuine approval gate blocks the work.
