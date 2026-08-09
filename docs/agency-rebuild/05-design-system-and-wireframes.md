# Kepler Dev Final Design System and Responsive Wireframes

Status: final design specification for engineering handoff

Scope: agency MVP routes `/`, `/work`, `/work/[slug]`, `/mahmoud`, and `/contact`

Canonical host: `https://www.keplerdev.uk`

Content source of truth: `04-messaging-and-page-copy.md`

Business-decision source of truth: `decisions.md`

This document replaces the provisional visual direction. It defines the visual system, responsive behavior, interaction states, optional-content rules, and component contracts required to implement the approved architecture and copy without inventing UX during development.

## 1. Authority and non-negotiable content contract

- Render the approved copy from `04-messaging-and-page-copy.md`; this document describes placement and behavior, not substitute marketing copy.
- The persistent primary CTA is always **Request a project review**. A route or offer may preselect the contact form's offer-interest value, but must not rename the CTA.
- The hero headline is **Replace fragmented operations with one connected product.**
- Kepler Dev is a founder-led studio. Mahmoud is the accountable technical and delivery lead. Approved contractors may be disclosed without presenting a fictional permanent team.
- Technology follows the buyer problem, Mahmoud's role, delivered scope, production status, and evidence. A stack list never leads a page or card.
- No client name, logo, screenshot, metric, testimonial, role claim, team claim, production claim, or outcome appears without a publication-ready record and permission reference.
- Proof, prices, numerical durations, testimonials, client logos, screenshots, the founder photograph, WhatsApp, the budget field, and public case studies are optional. Missing optional content collapses completely.
- Placeholder tokens, empty cards, “coming soon” tiles, draft content, and unpublished records must be filtered before rendering.
- English is the MVP language. Components must use logical properties, start/end alignment, and DOM order that can support later Arabic/RTL without structural redesign.
- Light, dark, and system themes are first-class and provide equivalent hierarchy, affordance, and contrast.

## 2. Final visual direction

### Brand personality

Kepler Dev should feel like a calm, senior product partner: precise enough for technical buyers, legible to business owners, and candid about delivery context. The visual tone is premium through restraint, not decoration. It is founder-led without becoming a résumé site.

Five working attributes:

1. **Connected:** layouts reveal relationships between workflows, people, and systems.
2. **Accountable:** role, status, and evidence are easy to find rather than hidden in footnotes.
3. **Calm:** generous space, stable surfaces, restrained motion, and limited color.
4. **Technical:** diagrams and evidence are exact, but technology does not dominate the buyer story.
5. **Human:** editorial typography and founder context prevent the agency from feeling anonymous or corporate-fictional.

### Visual references as principles

- Use editorial studio composition: strong headlines, narrow readable prose, asymmetric but disciplined grids, and deliberate section pacing.
- Borrow information density from excellent technical documentation: explicit labels, meaningful grouping, and predictable states.
- Borrow confidence from premium professional-service sites: few colors, few surface levels, real proof, and no decorative dashboards.
- Borrow clarity from product interfaces: visible status, focus states, recoverable errors, and relationships shown in diagrams.
- Do not imitate a specific brand, product screenshot, or template.

### Composition philosophy

- Each section answers one buyer question. The reading order is problem → connected response → proof → offer → process → accountability → next step.
- Use a 12-column desktop grid, but keep primary prose to 5–7 columns. Let diagrams, media, or evidence occupy the complementary area.
- Alternate density rather than background color on every section. A quiet section may be followed by a denser bordered composition.
- Use asymmetry only where it improves scanning. Do not stagger cards or offsets simply to look designed.
- Repetition should expose system logic: consistent labels, card anatomy, evidence placement, and CTA position.

### Whitespace

- Whitespace is the main luxury signal. Use section gaps rather than oversized cards or large empty hero heights.
- Mobile section padding: 64px normally, 48px for related subsections, 80px for hero/final CTA.
- Desktop section padding: 96px normally, 128px for hero/final CTA, 72px between subsections.
- Keep heading-to-intro spacing at 16–24px and intro-to-content spacing at 32–48px.
- Do not preserve spacing for omitted optional content.

### Surfaces and elevation

- The canvas is warm off-white in light mode and deep navy in dark mode.
- Primary surfaces are nearly flat. Use thin borders and tonal separation before shadows.
- Elevated surfaces are reserved for the sticky header, mobile navigation panel, dialogs, and focused media lightbox.
- Cards within cards are prohibited unless the inner element is a distinct evidence or status region.
- No glassmorphism, blurred neon panels, gradient borders, or glow-based hierarchy.

### Image and product-media direction

- Prefer approved real product UI, workflow artifacts, and founder photography over generic stock imagery.
- Frame screenshots with quiet neutral surfaces; do not add fake browser chrome, fabricated data, or decorative device mockups that obscure the product.
- Show a complete workflow before isolated UI details. Captions state what is shown, why it matters, and whether it is recreated or anonymized.
- The connected-platform diagram depicts actors and operational relationships before technical services.
- A missing image results in a text-led layout or an approved diagram, never a placeholder rectangle.

### Patterns to avoid

- Terminal windows, command prompts, matrix grids, hacker green, blinking cursors, or agency-root custom cursors.
- Full-screen preloaders, simulated delays, scroll-jacking, excessive parallax, or continuous ambient animation.
- Hero counters without verified evidence, logo clouds without permission, and invented dashboard screenshots.
- Oversized pills everywhere, gradient-filled headings, glowing blue cards, or template-like alternating feature bands.
- Claims of scale, speed, team size, client outcomes, or release status that exceed the evidence record.
- Making `/mahmoud` a duplicate homepage or making the homepage a résumé.

## 3. Final design tokens

### 3.1 Color system

All text/background pairings below meet WCAG 2.2 AA for their specified use. Ratios are calculated from sRGB relative luminance and rounded to two decimals. Strong borders and focus indicators exceed 3:1 against adjacent surfaces. Subtle borders are decorative and must not be the only indicator of state.

#### Light theme

| Token | Value | Use |
|---|---:|---|
| `canvas` | `#F4F3EE` | Page background |
| `surface` | `#FBFAF6` | Cards, header, forms |
| `surface-subtle` | `#ECEBE5` | Grouped rows, diagram zones |
| `text` | `#101A2B` | Primary text |
| `text-muted` | `#526071` | Secondary text and captions |
| `action` | `#145F7A` | Primary button and links |
| `action-hover` | `#0E5068` | Hover/pressed action |
| `action-text` | `#FFFFFF` | Text on action |
| `focus` | `#087EA4` | Focus ring; never body text on canvas |
| `border` | `#D5D5CF` | Decorative separation |
| `border-strong` | `#7E8997` | Controls, meaningful diagrams |
| `accent-warm` | `#8A642B` | Sparse editorial accent only |
| `success` | `#27633F` | Success text/icon |
| `warning` | `#76550F` | Warning text/icon |
| `danger` | `#9B2C2C` | Error text/icon |
| `private` | `#6044A1` | Verified-private evidence label |

#### Dark theme

| Token | Value | Use |
|---|---:|---|
| `canvas` | `#08111F` | Page background |
| `surface` | `#0D1929` | Cards, header, forms |
| `surface-subtle` | `#142338` | Grouped rows, diagram zones |
| `text` | `#EEF2F6` | Primary text |
| `text-muted` | `#B5C0CD` | Secondary text and captions |
| `action` | `#70CDE0` | Primary button and links |
| `action-hover` | `#91DCEB` | Hover action |
| `action-text` | `#07121D` | Text on action |
| `focus` | `#8ADAF0` | Focus ring |
| `border` | `#263A50` | Decorative separation |
| `border-strong` | `#60738A` | Controls, meaningful diagrams |
| `accent-warm` | `#D8B06A` | Sparse editorial accent only |
| `success` | `#88D3A1` | Success text/icon |
| `warning` | `#E7C36D` | Warning text/icon |
| `danger` | `#FF9B9B` | Error text/icon |
| `private` | `#C2A7F2` | Verified-private evidence label |

#### Required contrast checks

| Foreground / background | Ratio | Permitted use |
|---|---:|---|
| Light `text` / `canvas` | 15.69:1 | Any text |
| Light `text-muted` / `canvas` | 5.78:1 | Body, labels, captions |
| Light `action-text` / `action` | 7.12:1 | Buttons |
| Light `action` / `surface` | 6.82:1 | Links and icons |
| Light `focus` / `canvas` | 4.17:1 | Focus indicator |
| Light `border-strong` / `surface` | 3.40:1 | Control boundary and diagrams |
| Dark `text` / `canvas` | 16.81:1 | Any text |
| Dark `text-muted` / `surface` | 9.58:1 | Body, labels, captions |
| Dark `action-text` / `action` | 10.33:1 | Buttons |
| Dark `action` / `surface` | 9.68:1 | Links and icons |
| Dark `focus` / `canvas` | 12.04:1 | Focus indicator |
| Dark `border-strong` / `surface` | 3.63:1 | Control boundary and diagrams |
| Light `success` / `surface-subtle` | 5.97:1 | Success text/icon |
| Light `warning` / `surface-subtle` | 5.71:1 | Warning text/icon |
| Light `danger` / `surface-subtle` | 6.30:1 | Error text/icon |
| Light `private` / `surface-subtle` | 6.19:1 | Private-evidence text/icon |
| Dark `success` / `surface-subtle` | 8.95:1 | Success text/icon |
| Dark `warning` / `surface-subtle` | 9.36:1 | Warning text/icon |
| Dark `danger` / `surface-subtle` | 7.85:1 | Error text/icon |
| Dark `private` / `surface-subtle` | 7.61:1 | Private-evidence text/icon |
| Light `accent-warm` / `canvas` | 4.80:1 | Small editorial text/icon |
| Dark `accent-warm` / `canvas` | 9.31:1 | Small editorial text/icon |

Status/evidence components use a tinted background plus dark/light status text and an icon or word label. Color alone never communicates classification, production status, evidence, success, warning, or error.

### 3.2 Typography

- **Geist Sans:** body, UI, navigation, forms, long-form case studies, and numerals.
- **Syne:** Kepler Dev wordmark, H1, and selected H2s. Limit to weights 600–700 and avoid all-caps paragraphs.
- **JetBrains Mono:** evidence labels, compact technical annotations, and code-like identifiers only. Never use for navigation, primary CTA, long prose, or the homepage hero body.
- Maximum prose measure: `68ch`; explanatory form text: `60ch`; hero body: `52ch`.
- Body line height: 1.6; headings: 1.02–1.15; labels: 1.3.

#### Fluid type scale

| Role | Size | Weight | Typical use |
|---|---|---:|---|
| Display | `clamp(2.75rem, 7vw, 6rem)` | 650–700 | Homepage H1 |
| H1 route | `clamp(2.5rem, 5.5vw, 4.75rem)` | 650–700 | Route title |
| H2 | `clamp(2rem, 3.6vw, 3.5rem)` | 600–700 | Section title |
| H3 | `clamp(1.375rem, 2vw, 2rem)` | 600 | Card/module title |
| Lead | `clamp(1.125rem, 1.4vw, 1.375rem)` | 400 | Introductory copy |
| Body | `clamp(1rem, 0.25vw + .95rem, 1.125rem)` | 400 | Main prose |
| Small | `0.875rem` | 400–550 | Descriptions and metadata |
| Label | `0.75rem` | 600 | Status/evidence labels; tracking `0.04em` |

At 320px, the homepage headline must fit without forced `<br>` elements, clipping, or words below 44px. Display type may wrap to four lines.

### 3.3 Spacing, sizing, and layout

Base spacing unit: 4px.

| Token | Value |
|---|---:|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-20` | 80px |
| `space-24` | 96px |
| `space-32` | 128px |

- Minimum interactive target: 44×44px; preferred primary control height: 48px.
- Page gutters: 16px at 320–374; 20px at 375–639; 24px at 640–1023; 32px at 1024–1279; 48px at 1280+.
- Primary container: `min(100% - 2 × gutter, 1280px)`.
- Reading container: 760px maximum. Form container: 720px maximum.
- Mobile grid: 4 columns, 16px gap. Tablet: 8 columns, 20px gap. Desktop: 12 columns, 24px gap. Wide: 12 columns, 28px gap.
- Components must not depend on fixed card heights. Equal height is permitted only within a row when copy remains fully visible.

### 3.4 Radius, borders, shadows, and focus

| Token | Value | Use |
|---|---:|---|
| `radius-sm` | 6px | Badges, compact controls |
| `radius-md` | 10px | Inputs, buttons |
| `radius-lg` | 16px | Cards, evidence blocks |
| `radius-xl` | 24px | Feature media and CTA blocks |
| `radius-pill` | 999px | Filters/status only, not general containers |
| `border-default` | 1px solid `border` | Decorative grouping |
| `border-meaningful` | 1px solid `border-strong` | Inputs and diagram edges |
| `shadow-1` | `0 8px 24px rgb(8 17 31 / 0.08)` | Sticky header/menu |
| `shadow-2` | `0 20px 60px rgb(8 17 31 / 0.16)` | Dialog/lightbox only |

- Keyboard focus: 2px solid `focus`, 3px outward offset, never suppressed.
- A focused item may also change surface or border, but the ring remains visible.
- Focus must remain visible at 200% zoom and must not be covered by the sticky header.

### 3.5 Motion

| Token | Duration | Use |
|---|---:|---|
| `motion-instant` | 0ms | Reduced-motion replacement |
| `motion-fast` | 120ms | Pressed/hover color |
| `motion-base` | 180ms | Disclosure/menu state |
| `motion-slow` | 280ms | Section relationship/diagram reveal |

- Easing: enter `cubic-bezier(.2,.8,.2,1)`; exit `cubic-bezier(.4,0,1,1)`.
- No essential information waits for animation. With `prefers-reduced-motion: reduce`, remove transforms and nonessential opacity sequences, disable smooth scroll, and use immediate state changes.

### 3.6 Breakpoints

| Name | Width | Design responsibility |
|---|---:|---|
| `xs` | 320px | Smallest supported layout and copy stress test |
| `sm` | 375px | Common mobile reference |
| `md` | 768px | Tablet; selective two-column layout |
| `lg` | 1024px | Desktop navigation and 12-column composition |
| `xl` | 1280px | Full content container |
| `2xl` | 1440px | Wide-desktop whitespace and line-length test |

Breakpoints are content-driven; components may switch earlier if their content no longer fits. There is no hover-only functionality at any breakpoint.

## 4. Final site shell

### Skip link and landmarks

- The first focusable element is **Skip to main content**.
- It is visually hidden until focused, then appears above the header with a high-contrast surface.
- Every route has one `header`, one `main` with a stable target ID, and one `footer`. Sections use headings, not ARIA landmarks for every block.

### Desktop navigation (1024px+)

- Left: Kepler Dev wordmark linking to `/`.
- Center/right: Work, Services, Process, About. Section links point to homepage IDs when invoked from another route.
- Utility: theme selector followed by **Request a project review**.
- Active route uses text weight plus a 2px underline/edge; `aria-current="page"` is applied only to the current route.
- On the homepage, section links may update an active indicator through intersection observation, but this must not replace route `aria-current` or cause focus changes.

### Mobile navigation (below 1024px)

- Header shows wordmark, theme control, and a 44×44 menu button with accessible name and expanded state.
- Menu opens as a top/right modal panel with an overlay. Background becomes inert; focus moves to the first link, is trapped inside, and returns to the menu trigger on close.
- Escape, overlay click, link selection, and close button dismiss the panel. Body scroll is locked without shifting page width.
- Primary CTA appears once inside the menu and remains reachable without scrolling on a 320×568 viewport where practical.

### Theme selector

- Three values: Light, Dark, System. Use a native-like menu or radio group; do not cycle an unlabeled icon through hidden states.
- The current setting is announced in the control label. System reflects `prefers-color-scheme` while retaining the saved choice `system`.
- Apply theme before first paint to avoid a flash. Persist only the theme preference; the site remains usable when storage is unavailable.

### Sticky behavior

- Header is sticky at the viewport top after initial render; no mandatory hero reveal is required.
- Default header is opaque enough to preserve contrast. Add `shadow-1` only after content scrolls beneath it.
- Header height: 64px mobile, 72px desktop. Anchor destinations use matching `scroll-margin-top` plus 16px.

### CTA behavior

- Header, section, card, and final CTA instances use the exact label **Request a project review**.
- Link to `/contact`. An offer or case-study context may add a safe query parameter or route state that preselects the offer-interest field; it must not submit the form or infer private data.
- Do not render duplicate primary CTAs adjacent to one another. On 320px screens the CTA may be full width; on larger screens it is content width.

### Footer

- Four groups maximum: brand statement, route links, approved profile/contact links, legal/canonical information.
- Show founder-led wording only in its approved form. Omit unverified email/WhatsApp/profile links individually.
- Include theme control only if usability testing shows the header control is hard to rediscover; otherwise avoid duplication.
- Copyright year may be computed. No claims such as “all rights reserved” are necessary unless desired.

## 5. Responsive homepage wireframes

The DOM order is identical at all widths:

1. Hero
2. Optional verified-proof strip
3. Problem recognition
4. Connected-platform explanation and diagram
5. Selected work or no-public-proof state
6. Offer ladder
7. Process
8. Why Kepler Dev
9. Founder-led model
10. FAQ
11. Final CTA

### 5.1 320px mobile

```text
[64px header: wordmark | theme | menu]

[Hero / 80px block padding]
Eyebrow
H1: approved headline, natural wrap up to 4 lines
Approved lead, max 52ch but full width here
[Request a project review — full width]
[supporting text link only if approved]

[Optional proof strip: 1-column facts; section absent when empty]

[Problem recognition]
Eyebrow + H2 + full approved intro
3–4 problem cards, stacked; no fixed heights

[Connected platform]
Copy first
Text alternative / relationship list
Diagram second, horizontally contained; no required panning

[Selected work]
Heading + full proof-policy intro
Cards stacked OR no-public-proof panel and primary CTA

[Offers]
Four cards stacked; best fit → outcome → boundary → progression → CTA

[Process]
Five semantic ordered-list steps, stacked

[Why Kepler Dev]
Reasons stacked, followed by founder disclosure

[Founder-led model]
Text first; optional 4:5 photo below; no empty media slot

[FAQ]
One-column native disclosures

[Final CTA]
Heading + supporting copy + full-width primary CTA

[Footer]
```

Acceptance at 320px:

- No horizontal page scroll at 400% text zoom equivalent.
- No forced hero line breaks; no clipped 44px targets.
- Classification/status/evidence labels wrap as rows, not squeezed into one line.
- Long contact, evidence, and role/team disclosures remain complete.

### 5.2 375px mobile

- Same one-column structure with 20px gutters.
- Hero CTA may remain full width. Supporting link may sit below, never beside it if either wraps.
- Work metadata may use two rows; badges must not reduce title width below a readable measure.
- Gallery shows one image per row. Filter controls wrap with visible selected state.

### 5.3 768px tablet

- Eight-column grid; most headings occupy six columns.
- Hero uses six columns and leaves two columns as breathing room; do not introduce decorative art just to fill space.
- Problem cards use a 2×2 grid. Offers use two columns. Process remains an ordered list or uses a two-column editorial split.
- Connected-platform copy uses three columns and diagram five columns when the diagram remains legible; otherwise stack.
- Selected work uses two columns. Founder text/photo may use 5/3 columns; text expands to eight when photo is absent.
- Final CTA may place copy and action on separate rows to preserve full copy.

### 5.4 1024px desktop

```text
[72px sticky header: brand | route/section nav | theme | primary CTA]

[Hero: 8 columns copy | 4 columns deliberate whitespace/context note]
[Optional proof strip: up to 3 equal facts]
[Problem: 5 columns intro | 7 columns card grid]
[Connected: 5 columns copy | 7 columns diagram]
[Selected work: heading row | 2-column cards]
[Offer ladder: intro | 2×2 cards with progression connector outside cards]
[Process: 5 semantic steps across or 2-row layout when copy needs it]
[Why Kepler Dev: 5 columns thesis | 7 columns reasons]
[Founder-led: 7 columns copy | 5 columns approved photo; 12 columns without]
[FAQ: 4 columns intro | 8 columns disclosures]
[Final CTA: 8 columns copy | 4 columns action]
[Footer]
```

- The optional hero side area is not a proof counter. It may hold an approved short operating principle or remain whitespace.
- Never shrink body text to preserve a multi-column layout.

### 5.5 1440px wide desktop

- Center the 1280px container with 48px minimum page gutters.
- Maintain reading measures; additional width becomes breathing room, larger diagram area, or media—not longer prose lines.
- Selected work may use three columns only when at least three publication-ready cards exist and each accommodates its full truth labels. Otherwise retain two columns.
- Hero copy remains at eight columns maximum and display type stops scaling at 96px.
- FAQ and long narrative never exceed the reading container.

### Optional proof strip

- Maximum three verified facts. Each item includes fact, context, and evidence/case-study link.
- Render only facts whose records are `publicationStatus: public` with evidence and permission references.
- If zero records qualify, omit the section and its surrounding divider/margin. Do not replace it with generic counters.

## 6. `/work` wireframes

### Content order

1. Route introduction using the approved headline and introduction.
2. **How to read this work** proof-policy explanation.
3. Classification filters.
4. Results count announced politely after filtering.
5. Truth-labelled case-study grid or a defined empty state.
6. Final CTA.

### Desktop (1024px+)

```text
[Route intro: 8 columns]
[Proof policy: 8-column bordered editorial block]
[Filter row: All | Client | Employer | Internal | Kepler-owned | University | Concept]
[Result count / clear filters]
[2-column card grid; 3 columns only at 1440 when density passes]
[Final CTA]
```

### Mobile (320–767px)

- Intro and proof policy stack.
- Filters are a wrapping group of buttons; do not require a horizontal carousel. If space becomes excessive, use an accessible single-select menu labelled **Filter work by classification**.
- Result count follows the group. Focus stays on the selected filter; results update without moving focus.
- Cards stack and show title, outcome/context, classification, production status, role/team summary, evidence state, and CTA. Technology is last or omitted from the card.

### Required states

- **Filtered empty:** retain filters and show the exact empty-state copy from `04`, with a clear-filter action.
- **No public proof:** replace the entire grid with the approved no-public-proof statement and **Request a project review**. Do not render empty filter controls.
- **Draft unavailable:** a direct request to a draft/nonpublic slug returns the site 404 or a neutral unavailable state; never expose draft metadata.
- **Private evidence:** card may state that evidence exists but cannot be published. It must not imply the viewer can access it.
- **No screenshot:** card becomes text-led with no reserved media frame.
- **Loading:** prefer server-rendered results. If client filtering is delayed, use stable card skeletons labelled as loading; never simulate delay.

## 7. `/work/[slug]` wireframes

### Content order

1. Breadcrumb back to Work.
2. Classification badge and production-status badge.
3. Outcome-oriented H1 and approved summary.
4. Role and team disclosure.
5. Problem.
6. System overview with text alternative.
7. Delivered scope.
8. Technical or operational challenges and decisions.
9. Outcomes and evidence.
10. Technology as supporting information.
11. Media gallery when approved.
12. What this demonstrates / related offer.
13. **Request a project review**.

### Desktop

```text
[breadcrumb]
[classification] [production status]
[H1 + outcome summary: 8 columns]
[role/team disclosure: 8-column bordered block]

[problem: 5 columns | approved system visual: 7 columns]
[system overview text alternative: reading measure]
[delivered scope modules]
[constraints and decisions: narrative + callouts]
[evidence block: type, claim, source status, last verified when public]
[technology: compact supporting list]
[media gallery + captions, when permitted]
[what this demonstrates | related offer]
[final CTA]
```

### Mobile

- Preserve the same order. Status badges appear before the H1 and may wrap.
- Role/team disclosure is not collapsed behind a disclosure control.
- Diagram is followed immediately by its text alternative. If the diagram needs zoom, show an explicit **Open larger diagram** control; core meaning remains in the page text.
- Gallery is one column, preserving source aspect ratio. A lightbox is optional and cannot be the only way to read captions.

### Evidence states

Every outcome uses one of these visible states:

| State | Treatment |
|---|---|
| Verified public | Claim, context, source label/link where publishable, verification date |
| Verified private | State that supporting evidence exists but is confidential; omit inaccessible links |
| Qualitative | Describe the observed change without a number; identify the evidence type |
| Unmeasured | State that no verified outcome measure is available; focus on delivered scope |
| Not publishable | Omit the claim and media completely |

### Anonymized case study

- Title uses the approved industry/workflow descriptor, never a disguised client name.
- The opening context states that identifying details are withheld.
- Role, team, production status, and evidence limitations remain explicit.
- Use a neutral approved workflow diagram or recreated non-identifying UI only when permission covers the recreation. Blurring a confidential screenshot is not permission.
- Remove company colors, logos, unique data, URLs, and identifying captions.
- If even a qualitative outcome could identify the client, omit it.

## 8. `/mahmoud` wireframes

### Purpose

This route establishes the accountable founder and preserves personality from the current portfolio without moving terminal/hacker styling into the agency system.

### Content order

1. Founder identity and approved title.
2. Approved biography.
3. Relationship between Mahmoud and Kepler Dev.
4. Technical strengths framed as business/product capability.
5. Experience timeline.
6. Classified personal, employer, university, and Kepler-owned work.
7. Education and verified credentials.
8. Approved profile links.
9. Agency CTA.

### Desktop

- Hero: seven columns of identity/biography; five columns for an approved 4:5 portrait. Without the portrait, text remains seven or eight columns and the remaining space is intentional.
- Technical strengths: three or four editorial modules; no proficiency bars or arbitrary scores.
- Experience: chronological list with organization/title/dates only when approved. Each item states contribution and context.
- Work: reuse classification and status semantics from `/work`; do not present employer/university projects as agency case studies.
- Education/credentials: compact factual list with verification links where appropriate.

### Mobile

- Identity and biography precede the portrait. The portrait may be omitted with no empty shell.
- Timeline becomes a simple ordered list; dates do not create a narrow text column.
- Profile links have descriptive names, not icon-only controls.

### Personal-character allowance

- Syne display typography, one restrained mono annotation per section group, candid founder photography, and an editorial “technical signature” list are permitted.
- Terminal chrome, fake commands, hacker green, custom cursor, typewriter effects, scanlines, and résumé skill meters are prohibited.

## 9. `/contact` wireframes and state model

### Page layout

- Desktop: five columns for approved introduction, process expectation, and verified fallback; seven columns for the form.
- Mobile/tablet: introduction first, form second, fallback last.
- The form uses one column by default. Name/email may share a row at 768px+ only if labels, descriptions, and errors remain readable.

### Fields

Use the exact labels, descriptions, options, required/optional status, and validation copy from `04`.

Recommended structure:

1. Name — required.
2. Work email — required.
3. Company and country — required.
4. Public product/company link — optional, complete `https://` URL.
5. Current workflow/problem — required multiline.
6. Desired outcome — required multiline.
7. Offer interest — required; includes **Not sure yet** and accepts route-aware preselection.
8. Target timing — required; avoids invented duration promises.
9. Budget — optional and rendered only if approved bands exist.
10. Additional context — optional multiline when included by final content contract.
11. Consent checkbox and approved privacy text — required.
12. Submit: **Request a project review**.

Descriptions remain visible beneath labels; placeholders provide examples only and never replace labels.

### With and without budget

- With budget: place it after target timing. Use approved ranges plus **Not sure yet / Prefer to discuss** as defined in content.
- Without budget: remove field, description, validation, and grid gap. Target timing spans the full row. Do not mention budget elsewhere as a missing step.

### Validation

- Validate on submit and after a field has been blurred; do not show errors while a user is typing for the first time.
- On invalid submit, focus the error summary heading at the top of the form. Summary links move focus to each field.
- Inline errors appear below descriptions and are associated through `aria-describedby` along with help text.
- Use error icon/text and `aria-invalid`; never red border alone.

### Submission states

| State | Behavior |
|---|---|
| Idle | All fields editable; submit enabled when technically possible |
| Submitting | Preserve values, disable duplicate submit, change label to a clear progress phrase, announce politely; no simulated delay |
| Success | Replace form with approved confirmation, keep route context, focus confirmation heading; do not promise response timing unless approved |
| Recoverable failure | Keep all values and selections, show form-level error, focus it, re-enable submit, provide retry and verified email fallback |
| Configuration failure | Do not expose provider details; show safe fallback only if verified |
| Offline | Preserve values in memory for the current page, explain connectivity issue, allow retry; do not claim the enquiry was received |

### Email fallback

- Render only a verified monitored address approved in Q-04.
- Use descriptive text such as **Email Kepler Dev at …**, not “click here.”
- If no address is approved, omit the fallback rather than show a placeholder or unmonitored inbox.

## 10. Component specifications

### Buttons

- Variants: primary, secondary, quiet/text, destructive (form/admin errors only).
- Primary is filled `action`; secondary uses meaningful border; quiet is underlined or gains an underline on hover/focus.
- States: default, hover, focus-visible, active, disabled, loading, success, error when relevant.
- Disabled controls remain legible, expose disabled semantics, and are never the only explanation for an unmet prerequisite.
- Buttons trigger actions; links navigate. Never style a noninteractive element as either.

### Links

- Body links are underlined by default. Navigation/card links may use another persistent cue plus focus treatment.
- External links identify destination in accessible text when surprising. Do not force new tabs.
- Card titles may be the primary link. Do not wrap the entire card if the card contains other controls.

### Navigation

- See shell behavior. Preserve semantic lists, exact destinations, active state, keyboard order, and section-link behavior across routes.
- No mega-menu is needed for MVP.

### Theme selector

- Three explicit options, keyboard navigable, current value announced, persisted without blocking render, and equivalent in mobile/desktop navigation.

### Case-study card

Required anatomy in order:

1. Optional approved media; absent without reserved space.
2. Classification label.
3. Production-status label.
4. Title and outcome/context summary.
5. Mahmoud role and team summary.
6. Evidence state.
7. Optional supporting technology.
8. **Read the case study**.

- A card cannot publish unless title, classification, status, role/team disclosure, evidence state, slug, and publication status are valid.
- Do not use a logo as the only project identifier.

### Evidence strip

- One to three verified facts, each with context and evidence destination.
- Entire component returns no markup when no fact is public.
- No carousel, auto-rotation, or animated counter.

### Evidence block

- Shows visible evidence type, claim/context, public/private/qualitative/unmeasured state, source/link when allowed, and verification date where appropriate.
- Private evidence never exposes internal filenames, client identifiers, or storage locations.

### Offer card

Required anatomy:

1. Offer name from `04`.
2. Best fit.
3. Intended outcome.
4. Included scope.
5. Scope boundary/not included.
6. Progression/what it can lead to.
7. Optional price and duration only when approved.
8. **Request a project review** with offer interest preselected.

- The four offers are Product Blueprint, Launch Sprint, Operations Platform, and Product Care unless `decisions.md` changes them.
- No “most popular” badge without evidence and approval.

### Process steps

- Use an ordered list of the five approved steps. Step number, name, client input, Kepler Dev action, and output remain readable without animation.
- Desktop connectors are decorative; DOM order carries meaning.

### FAQ disclosures

- Prefer native `details/summary` or a WAI-ARIA accordion implemented exactly.
- Summary is a 44px target; expanded state is exposed; focus remains on the trigger.
- Multiple items may remain open unless research supports a single-open pattern.
- No FAQ answer is shortened to fit a collapsed design.

### Classification badges

- Values: Client, Employer, Internal, Kepler-owned, University, Concept.
- Text label always visible. Use neutral styling; classification is factual, not a quality score.

### Status badges

- Use only approved production-status vocabulary from `04` and the content contract.
- Never infer production from screenshots, repository activity, or marketing copy.

### Form controls

- Visible label, optional/required indicator, persistent description, 48px minimum height, meaningful border, focus ring, and linked error.
- Textareas resize vertically. Selects expose current value. Checkbox label is clickable and wraps cleanly.
- Autofill, password managers, keyboard input, browser validation, and 200% zoom must not break layout.

### Empty states

- Define cause, next action, and whether surrounding controls remain useful.
- Use approved copy. No decorative illustration is required.
- Never render “coming soon” project cards.

### System diagrams

- Use semantic HTML text alternative adjacent to the visual.
- Visual vocabulary: actors/zones as labelled nodes, operational flows as solid lines, optional/external systems as dashed lines, arrow direction where meaningful.
- Lines and nodes meet non-text contrast when they communicate meaning. Do not rely on color; use labels/line style.
- Mobile version may simplify geometry but not omit relationships.

### Media galleries

- Use responsive images with intrinsic dimensions, captions, and approval metadata.
- Preserve UI screenshot aspect ratio; use `object-fit: contain` for full-screen/mobile UI evidence.
- Lightbox, if used: dialog semantics, focus trap/return, Escape close, previous/next names, caption association, and reduced-motion support.
- Gallery component renders nothing when no approved media exists.

### Final CTA blocks

- Approved heading/body from route copy plus **Request a project review**.
- One primary action. A secondary route link is allowed only when it advances the same journey.
- Avoid decorative gradients that reduce contrast or compete with the action.

## 11. Optional-content collapse rules

| Optional content | When absent |
|---|---|
| Proof strip | Remove section, divider, heading, and both margins |
| Client logos | Remove logo row; do not substitute names without permission |
| Metrics | Use approved qualitative/unmeasured evidence treatment or omit claim |
| Testimonials | Remove complete module; never show quote marks or empty carousel |
| Case-study screenshots | Convert card/page region to text-led layout; no media shell |
| Founder photograph | Expand copy grid; remove frame, caption, and reserved column |
| Prices | Remove price row and related separator |
| Numerical durations | Remove duration row; keep process and target-timing copy qualitative |
| Contractor sentence | Use approved founder-only disclosure; no implication of a permanent team |
| WhatsApp | Remove channel and spacing; retain verified alternatives only |
| Budget field | Remove label/control/help/error and close grid gap |
| Public case studies | Use no-public-proof state and CTA; remove filters and empty grid |
| Related case study | Omit module; keep related offer/final CTA |

Implementation rule: optionality is resolved at the component boundary from publication-ready data. CSS must not merely hide unpublished content that remains in the DOM.

## 12. Interaction and motion states

- **Hover:** reinforce affordance with color/border/underline; never reveal essential content only on hover.
- **Focus:** use the defined focus ring and ensure sticky surfaces do not obscure it.
- **Active/pressed:** immediate tonal change and small translation of at most 1px when motion is allowed.
- **Loading:** preserve layout, identify the loading region, and announce only meaningful asynchronous changes.
- **Success:** use explicit success heading/message and move focus only after a submitted task completes.
- **Error:** plain-language summary plus inline correction; preserve work.
- **Disabled:** communicate why when the user may need to act; never use low opacity alone.
- **Reduced motion:** all navigation, filters, disclosures, theme changes, diagrams, galleries, and forms remain fully understandable without animation.
- Scroll reveals may use opacity plus ≤12px movement once per section at `motion-slow`; they are optional and removed under reduced motion.
- No mandatory preloader and no agency-root custom cursor.

## 13. Asset plan

Every asset record must include owner, permission scope, public/private status, focal point/crop, alt-text owner, and last verification date.

| Visual type | Purpose / placement | Ratio and mobile crop | Fallback | Alt-text responsibility | Permission | Loading |
|---|---|---|---|---|---|---|
| Kepler Dev wordmark | Header/footer identity | Wide lockup; no crop | Text wordmark in Syne | Brand/content owner | Agency-owned mark | Inline text or priority SVG asset |
| Founder portrait | Homepage founder section and `/mahmoud` | 4:5; mobile keeps face/shoulders | Text-led section | Mahmoud/content owner writes contextual alt; decorative duplicate uses empty alt | Explicit founder approval | Lazy below fold; priority only if route hero LCP |
| Case-study cover | `/work` card | 16:10; mobile crop must retain task context | Text-led card | Case-study owner | Project/client/employer approval | Responsive lazy load |
| Product screenshot | Case-study gallery | Source ratio; do not crop essential UI | Omit or approved diagram | Case-study owner describes visible workflow, not appearance only | Media and data approval | Lazy; intrinsic size; responsive formats |
| Connected-system diagram | Homepage/system overview | 16:10 desktop; simplified portrait mobile version | Adjacent semantic text alternative | UX/content owner | Kepler-owned or approved recreation | Eager only if near LCP; otherwise lazy |
| Anonymized workflow visual | Approved anonymous case study | 16:10 | Text narrative | Case-study/evidence owner | Approval must cover recreation and public use | Lazy |
| Client logo | Verified proof only | Original safe area; no crop | Omit | Client name may be alt if informative | Written logo permission | Lazy |
| Social preview | Per-route sharing | 1200×630 | Text-first branded template | Route content owner | All included proof/media approved | Generated at build/request time |
| Icons | Controls/status/diagram support | 16–24px | Text label remains | Empty alt/hidden when label duplicates meaning | Licensed icon library | Bundled, no remote request |

Current candidate assets are not automatically approved. `public/resources/pics/mahmoud-headshot.jpeg` and `public/projects/focus-ritual/` confirm availability, not public-use permission or final crop quality.

## 14. Engineering handoff

### Recommended component boundaries

- `SiteHeader`, `DesktopNavigation`, `MobileNavigation`, `ThemeSelector`, `SiteFooter`, `SkipLink`
- `SectionIntro`, `Hero`, `VerifiedProofStrip`, `ProblemCardGroup`, `ConnectedSystem`, `ProcessList`, `FounderDisclosure`, `FaqList`, `FinalCta`
- `WorkFilters`, `CaseStudyGrid`, `CaseStudyCard`, `ClassificationBadge`, `ProductionStatusBadge`, `EvidenceBadge`, `EmptyState`
- `CaseStudyHero`, `RoleTeamDisclosure`, `ScopeList`, `DecisionModule`, `EvidenceBlock`, `TechnologyList`, `MediaGallery`, `RelatedOffer`
- `OfferCard`, `OfferLadder`
- `ProjectReviewForm`, `Field`, `ErrorSummary`, `SubmissionStatus`, `EmailFallback`

Boundaries reflect content and accessibility responsibilities. Do not create a client component for every visual wrapper.

### Server versus client components

- Server by default: route layouts, metadata, page copy, publication filtering, case-study rendering, cards, offers, evidence, footer, and static diagrams.
- Client only where browser state is required: theme selection, mobile menu, work filters if client-side, FAQ only if native disclosure is insufficient, gallery lightbox, and contact form submission/state.
- Filter unpublished records on the server before serialization. Do not send private evidence, permission notes, draft copy, or secrets to client bundles.
- Progressive enhancement: navigation links, case-study pages, content, FAQ content, and email fallback remain usable without JavaScript. Form fallback depends on the selected provider contract.

### Responsive acceptance criteria

- Validate at exactly 320, 375, 768, 1024, and 1440px with final copy from `04`.
- No horizontal page scroll, clipped focus ring, overlap, unintended truncation, or unreadably narrow prose.
- Test longest approved headline, card title, role/team disclosure, evidence label, FAQ question, form description, validation error, and CTA.
- Test 200% browser zoom at 1280px and text-only zoom where supported.
- Test every optional-content combination, especially no proof, no media, no photo, no price/duration, no budget, and no public case studies.
- Test future RTL structure by switching `dir="rtl"`: reading order, logical spacing, icon direction, badges, forms, and diagrams must remain coherent even before Arabic copy is written.

### Accessibility acceptance criteria

- Target WCAG 2.2 AA.
- Automated axe check has no serious/critical findings; manual keyboard and screen-reader review still required.
- Landmarks/headings are logical; one H1 per route; skip link works.
- All functions work by keyboard with visible focus and no trap except intentional modal behavior.
- Mobile menu and gallery dialogs manage focus, background inertness, labelling, Escape, and return focus.
- Status and evidence never rely on color alone. Text contrast is ≥4.5:1 for normal text and ≥3:1 for large text; meaningful non-text UI contrast is ≥3:1.
- Form errors are announced, linked, and recoverable; entered values survive recoverable failure.
- Touch targets are at least 44×44px; reflow works at 320 CSS px and 400% zoom expectations.
- Reduced motion is respected and animation is never required for understanding.
- Diagrams and galleries have equivalent text/caption information.

### Content-density tests

At each required viewport, run these fixtures:

1. Full approved homepage copy with proof strip present.
2. Homepage with proof, work cards, founder photo, prices, durations, and contractor sentence absent.
3. Work card with longest classification/status/role/evidence strings and no image.
4. Case study with verified-private evidence, long role/team disclosure, and no gallery.
5. Anonymized case study with every permitted disclosure visible.
6. Contact form with budget and every inline error visible.
7. Contact form without budget in recoverable failure with values preserved.
8. FAQ with the longest question and answer expanded.

Pass criteria: no copy shortening, hidden disclosure, overflow, overlap, fixed-height clipping, orphaned label, or empty shell.

### Performance considerations

- No mandatory preloader. Server-render route content and stream only where it improves perceived readiness.
- Define intrinsic media dimensions to prevent layout shift. Use Next Image or equivalent responsive sizing and modern formats where appropriate.
- Hero LCP should be text unless an approved founder/product image is essential; do not prioritize below-fold galleries.
- Lazy-load galleries and lightbox code. Avoid shipping animation code to static sections.
- Subset self-hosted fonts, limit loaded weights, and use font-display behavior that avoids invisible text.
- Theme initialization must be tiny and blocking only as needed to prevent flash.
- Establish implementation budgets and verify with production builds: no avoidable route-wide client bundle, no large unoptimized image, and no layout shift from optional media.

### Assets still required

- Approved public case-study shortlist with classification, production status, role/team context, evidence, names, logos, screenshots, metrics, testimonial permissions, and verification dates.
- Approved founder portrait/crop, biography, role/title, employment and education facts, credentials, profile links, and alt text.
- Approved connected-system diagram content and any anonymized workflow recreations.
- 1200×630 social-preview templates and permission-safe route media.
- Contact provider configuration, verified destination/fallback email, consent/privacy language, spam control, and optional approved budget bands.

### Decisions still unresolved

Continue to track Q-01 through Q-08 in `decisions.md`:

- public trading/studio and contractor disclosure wording;
- case-study shortlist and permissions;
- Faseeh/Aksira identity and claims;
- contact provider, channels, privacy, response target, and WhatsApp policy;
- offer-name approval and price/duration publication policy;
- founder facts, photo, and profile approvals;
- canonical/personal URL approval;
- evidence register owner and final publication sign-off.

These do not block implementing resilient layouts and components. They block publishing the affected content.

## 15. Marketing-handoff revision traceability

| Required revision from `04` | Final treatment in this document |
|---|---|
| 1. Optional proof strip | Sections 5 and 10; fully collapsed when empty |
| 2. Persistent primary CTA | Sections 1 and 4; exact label and route-aware preselection |
| 3. Truth treatments | Sections 6, 7, and 10; classification/status/role/evidence required |
| 4. Empty and evidence states | Sections 6, 7, 9, and 10 |
| 5. Expanded offer cards | Sections 5 and 10; best fit/outcome/boundary/progression, optional price/time |
| 6. Conditional founder disclosure | Sections 5 and 8; works without photo/contractor sentence |
| 7. Complete contact states | Section 9; descriptions, consent, summary, preserved error, success, fallback |
| 8. Optional collapse and no placeholders | Sections 1 and 11; server publication filtering |
| 9. Technology secondary | Sections 1, 6, 7, and 10 |
| 10. Final-copy density tests | Sections 5 and 14 at 320/375/768/1024/1440 |

## 16. Definition of design complete

Engineering may begin when this document and `04` are accepted as the UX/content contract. Publication remains gated by `decisions.md` and the evidence register. A route is design-complete only when it passes the specified viewport, optional-content, accessibility, state, and final-copy density tests without inventing or suppressing material disclosures.
