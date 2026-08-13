# Global Atelier — Pre-implementation Design Direction

Date: 2026-08-13  
Status: Selected direction; pre-build design package  
Selected concept: Option 3 — Global Atelier

## 1. Decision

Global Atelier is the locked visual direction for the Kepler Dev agency website.

The other two concepts remain preserved references:

- Quiet Confidence — use as a reference for restraint and international clarity.
- Warm Modernism — use as a reference for warmth and conversational character.

Global Atelier owns the implementation. It combines deep forest, mineral stone, pearl, and muted bronze with tactile folded planes, calm typography, and culturally neutral warmth. The site should feel like a considered global studio—not a coding company, generic SaaS business, architecture firm, or luxury-fashion label.

## 2. Brand promise

Kepler Dev helps ambitious teams make thoughtful digital products that move their business forward.

The website should communicate:

- human judgment before technology;
- clarity before complexity;
- quality without showmanship;
- a warm, accountable working relationship;
- comfort working across the GCC, international markets, languages, and time zones.

Technology is a capability, not the visual subject.

## 3. The Kepler Fold

The proprietary visual motif is the **Kepler Fold**.

It consists of two precise material planes moving around a calm central aperture. The planes represent business context and product craft; the opening represents clarity and forward movement. Its angular relationship may quietly echo the Kepler brand mark, but it must never redraw the logo at large scale.

### Motif rules

- Use the complete Fold once in the hero.
- Reuse only crops, edges, apertures, and transitions afterward.
- Maintain one deep-forest plane, one mineral plane, a pearl inner surface, and a muted bronze edge.
- Keep the central opening visually calm; do not turn it into a glowing portal.
- Texture should read as subtle mineral grain, not leather, fabric, paper samples, wall cladding, or interior finishes.
- Avoid photoreal folds that make the studio look like architecture, fashion, furniture, or materials retail.
- On mobile, crop the Fold behind and below the copy while protecting text contrast.
- In RTL, recompose the Fold toward the opposite edge; do not mechanically flip the logo or Latin wordmark.

## 4. Visual system

### Core palette

| Token | Starting value | Role |
|---|---:|---|
| Forest 950 | `#07120F` | Primary dark canvas |
| Forest 900 | `#0D1A17` | Raised dark field |
| Mineral 700 | `#484A45` | Secondary material plane |
| Pearl 100 | `#EEE9E0` | Light canvas and primary dark-mode text |
| Pearl 300 | `#CEC7BC` | Secondary dark-mode text |
| Ink 950 | `#111412` | Text on pearl |
| Bronze 500 | `#A86F48` | CTA, rules, focus, restrained accents |
| Bronze 300 | `#CA9871` | Soft highlight only |

Bronze should occupy less than roughly 12% of any viewport. It is an accent and focus signal, not a background theme.

### Typography

- English display: a geometric sans with human proportions; large, calm, and tightly edited.
- English body: a neutral humanist sans with excellent screen legibility.
- Arabic display/body: a modern Arabic sans with generous counters and a compatible visual weight; no calligraphic or ornamental styling.
- Use at most two families per locale.
- Mobile body copy: minimum 16px.
- Utility text: minimum 13px except truly decorative numerals.
- English headlines should avoid jargon and unnecessary punctuation.
- Arabic line breaks must be reviewed manually at all breakpoints.

### Surface and edge language

- Use full-width fields and strong editorial grouping before cards.
- Primary separation comes from space, material contrast, and alignment.
- Use 1px bronze or mineral rules sparingly.
- A soft corner or material fold is permitted at major transitions; do not round every component.
- Shadows remain low-opacity and broad. No glassmorphism, neon edges, or glowing panels.

## 5. Bilingual content system

English and Arabic are first-class experiences.

### English hero

- Eyebrow: **Independent digital product studio · Cairo · Working worldwide**
- Headline: **Thoughtful digital products, made to move your business forward.**
- Body: **We partner with ambitious teams across the GCC and worldwide to shape, design, and build products people value—and businesses can grow with.**
- Primary CTA: **Start a conversation**
- Secondary CTA: **Explore our approach**
- Trust line: **Founder-led · Bilingual collaboration · Working across borders**

### Arabic hero

- Eyebrow: **استوديو مستقل للمنتجات الرقمية**
- Headline: **منتجات رقمية مدروسة تدفع أعمالك إلى الأمام.**
- Body: **نتعاون مع فرق طموحة في الخليج وحول العالم لنصمم ونبني منتجات يحبها الناس وتساعد الأعمال على النمو.**
- Primary CTA: **ابدأ الحديث معنا**
- Secondary CTA: **اكتشف أسلوب عملنا**
- Trust line: **بقيادة المؤسس · تعاون بالعربية والإنجليزية · نعمل حول العالم**

### Supporting English copy

- Capability heading: **Clear thinking. Beautiful execution. Reliable delivery.**
- Capability body: **From early direction to launch and long-term care, we bring strategy, design, and engineering together around one clear goal.**
- Capability labels: **Direction · Experience · Build · Care**
- Approach heading: **A thoughtful process, shaped around your business.**
- Steps: **Listen closely · Find the focus · Make it real · Improve with care**
- Private-work heading: **Relevant work, shared with context.**
- Private-work body: **Much of our work is private. We share suitable examples directly, with permission and the story behind each decision.**
- Founder heading: **One accountable partner from first conversation to launch.**
- Founder body: **You work directly with the founder and a focused team that stays close to your product and your business.**
- Final CTA: **Tell us what you’re building.**

### Supporting Arabic copy

- Capability heading: **فكر واضح. تنفيذ جميل. تسليم يعتمد عليه.**
- Capability body: **من تحديد الاتجاه إلى الإطلاق والتطوير المستمر، نجمع الاستراتيجية والتصميم والهندسة حول هدف واحد واضح.**
- Capability labels: **الاتجاه · التجربة · البناء · التطوير**
- Approach heading: **أسلوب عمل مدروس، مصمم حول احتياجات أعمالك.**
- Steps: **نستمع جيداً · نحدد الأولوية · نحول الفكرة إلى واقع · نطور بعناية**
- Private-work heading: **أعمال مناسبة، نشاركها مع سياقها.**
- Private-work body: **الكثير من أعمالنا خاص. نشارك أمثلة مناسبة مباشرة، بعد الحصول على الإذن، مع توضيح القرارات التي شكلت كل تجربة.**
- Founder heading: **شريك واحد مسؤول معك من أول حديث حتى الإطلاق.**
- Founder body: **تعمل مباشرة مع المؤسس وفريق متخصص يبقى قريباً من منتجك واحتياجات أعمالك.**
- Final CTA: **حدثنا عما تريد بناءه.**

Arabic wording requires native-speaker review before publication. The English and Arabic versions should preserve intent rather than force literal one-to-one translation.

## 6. Homepage architecture

1. **Header** — logo, Work, Services, Approach, Studio, EN/AR, and primary action on larger screens; compact locale and menu on mobile.
2. **Hero** — brand promise, concise context, two actions, trust line, complete Kepler Fold.
3. **Capabilities** — Direction, Experience, Build, and Care shown as one editorial system, not four isolated cards.
4. **Approach** — four simple steps; copy explains judgment and collaboration rather than internal process theatre.
5. **Work and context** — approved public work when available; otherwise the honest private-work explanation with a conversation route.
6. **Founder-led model** — one accountable senior partner, supported by the right specialists when required.
7. **Services** — focused ways to work, using approved offers; keep pricing and timing gated.
8. **FAQ** — only unresolved objections; avoid repeating preceding content.
9. **Final CTA** — short, warm invitation to describe the opportunity.
10. **Footer** — bilingual navigation, Cairo and worldwide operating context, approved public profiles, privacy, and copyright.

## 7. Responsive and RTL behavior

- Desktop content follows a 12-column grid; mobile is a 4-column grid.
- English begins from the left; Arabic begins from the right.
- In Arabic, navigation order, alignment, arrows, progress lines, and menu entry direction follow RTL.
- The Latin Kepler Dev wordmark is never mirrored.
- Locale labels use native names: `EN / العربية` in English and `العربية / EN` in Arabic.
- Use CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline`, `border-inline`) rather than duplicated left/right rules.
- Set `lang` and `dir` on the document root for each locale.
- Keep CTA targets at least 44×44px.
- Test Arabic at 320, 390, 720, and 1440px with manual line-break review.

## 8. Motion storyboard

Motion should make the brand feel composed and responsive. It must never become the subject.

| Moment | Behavior | Timing | Reduced motion |
|---|---|---:|---|
| Initial load | Header fades; hero lines reveal through masks; CTA and trust line follow | 500–750ms total | Immediate content with short opacity fade |
| Kepler Fold | Two planes settle into alignment with subtle depth and bronze edge light | 900–1200ms, once | Static final composition |
| Pointer proximity | Fold shifts 2–4px and light responds softly | Continuous, damped | Disabled |
| Section entry | Pearl/dark aperture crossfades while heading rises 12px | 450–600ms | Opacity only |
| Approach rule | Bronze line draws in reading direction; steps appear sequentially | 500–700ms | Entire rule and steps appear together |
| CTA hover | Background tone changes, arrow translates 3–4px, edge sharpens | 160–220ms | Color/focus change only |
| Locale change | Content crossfades after `lang`/`dir` changes; Fold recomposes | 200–300ms | Immediate swap |
| Mobile menu | One material plane enters from the control side; links stagger subtly | 250–350ms | Immediate panel with opacity fade |

Motion rules:

- Use transform and opacity for the majority of effects.
- No smooth-scroll hijacking.
- No scroll-hidden essential content.
- No particles, cursor replacements, looping text marquees, continuous section movement, or sound.
- The Fold may use a lightweight canvas/WebGL implementation only if it stays smooth on mid-range mobile hardware; otherwise use layered optimized raster assets and CSS transforms.
- Honor `prefers-reduced-motion` for every non-essential effect.

## 9. Interaction details

- Primary CTA: bronze field, dark text, clear focus ring, subtle arrow response.
- Secondary CTA: text action with a rule; never compete with the primary action.
- Locale switch: visible on every route, preserves the equivalent route and content context.
- Mobile menu: full-height, readable, focus-trapped, Escape-close, overlay-close, focus-return, and correct RTL entry side.
- Work disclosure: never imply public proof when none exists. The private-work action opens the real contact path.
- Contact experience: warm, short, and qualification-focused; show a verified fallback when the provider is unavailable.

## 10. Design acceptance before implementation

- The desktop English, mobile English, and mobile Arabic/RTL visual targets are approved.
- A native Arabic reviewer approves all public Arabic copy.
- The Kepler Fold reads as a digital-product-studio motif in user review—not architecture, interiors, fashion, or materials retail.
- All public proof, founder facts, contact operations, and external links pass their existing approval gates.
- Animation scope is accepted with a performance budget and reduced-motion equivalents.
- Final typography choices have confirmed English/Arabic licensing and webfont performance.

## 11. Evidence files

- `artifacts/design/global-atelier-preimplementation-2026-08-13/01-desktop-en.png`
- `artifacts/design/global-atelier-preimplementation-2026-08-13/02-mobile-en.png`
- `artifacts/design/global-atelier-preimplementation-2026-08-13/03-mobile-ar-rtl.png`

These images are visual targets, not production assets. Implementation must use real type, semantic HTML, accessible controls, and deliberately prepared material artwork rather than flattening the page into screenshots.
