# Information Architecture and Page Blueprints

## Architecture recommendation

Use a compact five-route MVP. Keep services, process, and about as substantial homepage sections until there is enough differentiated content and search demand to justify separate pages.

```text
/
├─ /work
│  └─ /work/[slug]
├─ /mahmoud
└─ /contact
```

Future routes, not MVP commitments: `/services`, `/process`, `/about`, `/labs`, and locale-prefixed `/ar/...`.

## Route contracts

| Route | Primary audience/job | Required content | Primary CTA | Indexing |
|---|---|---|---|---|
| `/` | Founder/operator deciding whether Kepler Dev understands the problem | Outcome-led hero, verified proof, problem framing, flagship solution, selected work, offers, process, differentiation, founder model, FAQ | Request a project review | Index; Organization metadata |
| `/work` | Buyer validating delivery credibility | Proof policy, filter by classification/capability, selected public case studies, clear labels for internal/owned work | Discuss a similar project | Index |
| `/work/[slug]` | Buyer assessing relevance and risk | Context, problem, role/team, solution, system view, challenge, result/evidence, scope boundaries, next step | Discuss your workflow | Index only `publicationStatus: public` records |
| `/mahmoud` | Recruiter, technical evaluator, or buyer checking founder depth | Founder role, biography, experience, selected personal/employer work, technical signature, education/certifications, résumé and profiles | Work with Kepler Dev | Index; Person metadata |
| `/contact` | Qualified prospect ready to share context | Expectation-setting, accessible qualification form, privacy/fallback, response state | Submit project review | Index unless spam policy requires otherwise |

## Global navigation

Desktop order: Work, Services, Process, About, Founder, Contact. Services, Process, and About initially point to homepage section IDs; Work, Founder, and Contact are routes.

Mobile navigation must:

- open from a native button;
- move focus into the panel, trap it while modal, close on Escape, and return focus to the trigger;
- close after route or anchor selection;
- expose the current route with `aria-current="page"`;
- keep the theme selector reachable without hiding the primary CTA.

The persistent CTA label should match the contact intent—recommended working label: **Request a project review**.

## Homepage blueprint

| Order | Section | User question answered | Content/interaction requirement |
|---:|---|---|---|
| 1 | Navigation | Where can I go and what action matters? | Route links, theme selector, one CTA. |
| 2 | Hero | Is this built for a business like mine? | Operational outcome, GCC/remote buyer context, short founder-led credibility, primary contact CTA, secondary work CTA. No unsupported superlatives. |
| 3 | Verified proof strip | Why should I keep reading? | Maximum three facts linked to case studies; hide the strip until facts are publication-ready. |
| 4 | Problem recognition | Do they understand my current workflow? | Customer/staff/management fragmentation expressed in buyer language. |
| 5 | Flagship solution | What does Kepler Dev actually build? | Connected mobile experience, backend, management view, integrations, launch ownership; show a simple system diagram. |
| 6 | Selected work | Have they solved comparable complexity? | Two or three truth-labelled studies; problem, exact role, classification, outcome/evidence. |
| 7 | Offer ladder | How can we start? | Blueprint, Launch Sprint, Operations Platform, Product Care; fit, outcome, typical duration, next step. Pricing only if approved. |
| 8 | Delivery process | How will risk be managed? | Clarify, phase, build, launch, support; approvals and change control. Remove day-based promises. |
| 9 | Why Kepler Dev | Why this studio? | Founder accountability, mobile/offline depth, integration experience, honest scope control. |
| 10 | Founder-led model | Who is accountable? | Mahmoud bio/photo, transparent capacity model, link to `/mahmoud`. |
| 11 | FAQ | What could stop me enquiring? | Scope, timing, pricing logic, IP/source ownership, support, geography/remote delivery, team model. |
| 12 | Final CTA | What do I do now? | Project-review CTA with expectations and fallback email. |

## `/work` blueprint

1. Introduction and proof policy.
2. Featured work: verified public client/employer studies.
3. Capability work: internal and owned products, explicitly labelled.
4. Optional filters that never mix classification invisibly.
5. CTA for a similar workflow.

Do not render a project card when its only destination is `#`. Draft/private records stay out of the public list.

## Case-study blueprint

1. Classification/status eyebrow.
2. Outcome-oriented title and concise summary.
3. Fact bar: role, team context, status, platform, timeframe if verified.
4. Starting problem and operational constraints.
5. System/solution overview.
6. Mahmoud's exact responsibility and boundaries.
7. One or two hard technical/operational challenges.
8. Results with evidence state; qualitative result is acceptable when metrics are unavailable.
9. Media with captions and permission-safe alt text.
10. Related offer and CTA.

Agency studies use routes, not modal-only details. A lightweight image gallery may be a client island inside the otherwise server-rendered page.

## `/mahmoud` blueprint

1. Founder identity and role at Kepler Dev.
2. Short technical profile and approved photo.
3. Technical signature: offline-first, integrations, reliability, mobile/native bridges.
4. Experience timeline with corrected roles/dates.
5. Selected personal/employer/academic work with visible classifications.
6. Skills/stack as supporting evidence, not a logo wall.
7. Education/certifications and résumé/profile links.
8. Agency CTA.

The route may preserve selected visual personality from the current site. It must not retain contradictory budget or delivery claims.

## `/contact` blueprint and state model

Recommended fields:

- name;
- work email;
- company and country;
- current workflow/problem;
- desired outcome;
- project type/offer interest;
- target timing;
- working budget band if approved;
- optional relevant link;
- consent acknowledgement.

State flow:

```text
idle → validating → submitting → success
          │             └→ recoverable error
          └→ field errors
```

Requirements:

- visible labels and helpful error summaries;
- preserve input after recoverable failure;
- announce status with an appropriate live region;
- disable duplicate submission without creating a keyboard trap;
- show expected response time only if operationally true;
- expose a verified email fallback;
- keep provider ID/config in deployment environment, never in documentation.

## Component and content boundaries

```text
app routes (server components)
├─ site chrome
├─ page sections
│  └─ typed content records
├─ case-study renderer
│  └─ publication-safe CaseStudy records
└─ client islands
   ├─ theme selector
   ├─ mobile navigation
   ├─ contact form state
   ├─ work filters (optional enhancement)
   └─ media gallery (optional enhancement)
```

Recommended source boundaries:

- `src/content/site.ts` — navigation, agency facts, FAQs, offers.
- `src/content/case-studies.ts` — validated public case studies.
- `src/content/founder.ts` — personal experience and links.
- `src/lib/content-schema.ts` — contracts and validation.
- route-local components for page-specific composition; shared primitives only after the second concrete use.

These are implementation recommendations, not files created by this audit.

## SEO preservation

- Change root metadata from Person/freelancer to Kepler Dev Organization.
- Create unique Person metadata and canonical URL for `/mahmoud`.
- Add Organization JSON-LD on agency routes and Person JSON-LD on `/mahmoud`, using only verified facts.
- Add every public route/case study to `src/app/sitemap.ts`; keep draft/private studies excluded.
- Preserve `www.keplerdev.uk` as canonical if deployment remains configured that way.
- There is no route-level redirect that can preserve old `/#projects` hashes because fragments are not sent to the server. Keep the root useful, publish a clear Founder link, and consider temporarily supporting familiar section IDs where they do not distort the agency page.
- Do not redirect `/` to `/mahmoud`; `/` becomes the agency home.

## Internationalization readiness

- Keep content separate from JSX.
- Use logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline`) and avoid directional icon assumptions.
- Ensure layout can set `lang` and `dir` per route tree.
- Do not launch placeholder Arabic pages. Decide the locale URL strategy before translation work.

