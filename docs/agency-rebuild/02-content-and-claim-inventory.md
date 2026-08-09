# Content and Claim Inventory

## Status model

Repository presence is not publication proof. Every externally visible claim must use one of these states:

- **Verified for publication:** evidence and permission are recorded.
- **Verified privately:** evidence exists but public naming/screenshots are not allowed.
- **Repository-asserted:** current code or docs say it, but evidence/permission is not recorded.
- **Needs correction:** known conflict, ambiguity, or misleading treatment.
- **Do not publish:** concept/private/employer-sensitive fact without approval.

## High-risk current claims

| Current claim | Source | Current evidence state | Agency action |
|---|---|---|---|
| “Production Projects” | `src/components/hero.tsx` | Repository-asserted; undefined count | Replace with named, classified proof only. |
| “Self-Hosted Infrastructure” | `src/components/hero.tsx` | Supported by project narratives, not quantified | Use only with a specific case-study reference. |
| “$1k+ Earned on Mostaql” | `src/components/hero.tsx` | Repository-asserted | Verify platform evidence and decide whether it supports premium agency trust. Prefer removing from agency root. |
| “Available on Upwork” | `src/components/hero.tsx` | Link exists | Keep only on `/mahmoud` or as a secondary channel, not the agency's primary CTA. |
| `$300–$1,500` availability | `src/components/contact.tsx` | Published but strategically obsolete | Remove from agency root. Approved offers start from a different model/range. |
| “Day 7 — Final Delivery” | `src/components/process.tsx` | Published but conflicts with offer architecture | Remove. Replace with phased discovery, build, launch, and support. |
| Client testimonials | `src/components/testimonials.tsx` | Text and attribution exist; permission/source not recorded | Publish only after permission and exact wording/source are logged. |
| “10+ Linux servers” and project performance claims | `src/lib/data.ts` (HS VPN) | Repository-asserted | Verify metric, date, client permission, Play Store ownership, and screenshots. |
| Faseeh keyboard cold start `~700ms` to `~30ms` | `src/lib/data.ts` | Repository-asserted; product identity conflicts with Aksira | Resolve identity and reproduce/source metric before use. |
| iScore high-security/national-credit-bureau work | `src/lib/data.ts` experience | Employer-sensitive | Do not use as an agency case study without explicit approval and corrected role/dates. |
| Founder photos/certificates | `public/resources/pics/` | Assets exist; usage/recency approval not recorded | Choose approved founder image and document caption/permission. |

## Project classification and publication gate

| Project | Current source | Working classification | Production state | Evidence/permission gaps | Recommended agency use |
|---|---|---|---|---|---|
| gLiter loyalty/operations platform | `docs/KeplerDev/KEPLERDEV_PROJECT_PORTFOLIO.md` | Employer/client operations work; confirm | Strongest operations proof per strategy | Company naming, screenshots, Mahmoud's role, team context, results, permission | Priority case study if permission is granted; otherwise anonymized operations case study. |
| HS VPN | `src/lib/data.ts` | Client product | Production/Play Store asserted | Client permission, metrics, dates, role/team, screenshots/testimonial | Priority technical case study after verification. |
| QuickChargingPOS | `src/lib/data.ts` | Employer work | Production context asserted | Employer/product naming, real role, screenshots, outcomes | Anonymized integration proof or named case study with approval. |
| Faseeh AI Keyboard | `src/lib/data.ts` | Unknown: may be Aksira, old name, or separate | Play Store link asserted | Identity, ownership, status, metric evidence, screenshots | Blocked until identity is resolved. |
| Aksira | strategy/project docs | Kepler-owned product | In development | Relationship to Faseeh, release state, public assets | Labs/capability proof, clearly marked in development. |
| Focus Ritual | `src/lib/data.ts`, `public/projects/focus-ritual/` | Internal/capability work | Deployed demo asserted | Ownership, demo stability, accurate feature scope, results | Secondary capability study; never imply client outcome. |
| Classroom Sentinel | `src/lib/data.ts` | Personal/university/internal automation; confirm | 24/7 service asserted | Owner/user, live status, permission, outcomes | Technical supporting proof, likely on `/mahmoud`. |
| GetLab System | `src/lib/data.ts` | University/academic work | Unknown | Role, team, deployment, users, screenshots, permission | Personal portfolio unless strong real-world evidence exists. |
| MedConnect Egypt | `src/lib/data.ts` | Unclassified | Unknown | Ownership, status, team, evidence, permission | Withhold from agency work index until classified. |
| StayEase | `src/lib/data.ts` | Concept | Not a completed production product | Needs explicit concept label | Personal/capability archive only; never client proof. |
| FitForge | `src/lib/data.ts` | Concept | Not a completed production product | Needs explicit concept label | Personal/capability archive only; never client proof. |
| AI Collab Platform | `src/lib/data.ts` | Unclassified/capability | Unknown | Ownership, status, outcomes, screenshots | Withhold or mark experimental after confirmation. |
| AgencyOS | `src/lib/data.ts` | Internal concept/product | Unknown | Product status and relationship to Kepler Labs | Labs/capability only if truthful and useful. |
| PetSpot | strategy docs | Kepler-owned product | In development | Scope, status, public assets | Optional future `/labs` item; not MVP proof. |

## Case-study content contract

The future source of truth should require these fields. A build must fail or a record must remain `draft` when publication gates are incomplete.

```ts
type ProofState = "verified-public" | "verified-private" | "unverified";
type Classification =
  | "client"
  | "employer"
  | "internal"
  | "owned-product"
  | "university"
  | "concept";

interface CaseStudy {
  slug: string;
  title: string;
  publicTitle?: string; // anonymized title when needed
  classification: Classification;
  productionStatus: "production" | "pilot" | "prototype" | "in-development" | "concept";
  publicationStatus: "draft" | "public" | "private";
  targetUser: string;
  problem: string;
  engagementContext: string;
  mahmoudRole: string;
  teamContext: string;
  scope: string[];
  solution: string;
  technicalChallenges: string[];
  results: Array<{ claim: string; evidenceRef?: string; proofState: ProofState }>;
  technologies: string[];
  timeline?: string;
  media: Array<{ src: string; alt: string; permissionRef?: string }>;
  clientNamePermission: "approved" | "anonymize" | "pending";
  screenshotPermission: "approved" | "anonymize" | "pending";
  testimonialPermission?: "approved" | "pending" | "none";
  lastVerified: string;
}
```

Evidence references should point to an internal, access-controlled register—not secrets or private client material committed to the public repository.

## Content disposition

### Reuse with verification

- Technical project narratives from `src/lib/data.ts` as research inputs, not finished copy.
- Founder employment, education, and capability details on `/mahmoud` after date/role review.
- The two testimonials only after exact-text and naming permission.
- Existing product screenshots that are accurate, current, optimized, and approved.

### Rewrite

- Agency hero, proof strip, problem framing, offers, process, founder-led model, FAQ, and contact CTA.
- Project cards around classification, problem, role, outcome, and proof—not technology lists.
- Metadata and social descriptions for each route.

### Move to `/mahmoud`

- Job-seeking/freelance identity, Upwork/Mostaql links, employment timeline, technical stack, certifications, terminal presentation, and broad personal project archive.
- Low-level implementation detail that demonstrates engineering depth but does not help an agency buyer choose an engagement.

### Remove from public output unless resolved

- Low-budget positioning and one-week final-delivery promise.
- Empty `#` project links.
- Unclassified projects presented as client proof.
- Sensitive employer/client names, screenshots, metrics, and testimonials without permission.
- “Agency/team” language that implies undeclared permanent staff.

## Minimum copy inputs still required

- One approved agency positioning line and CTA label after outreach feedback.
- Two or three approved case-study records that satisfy the contract.
- Founder-led delivery disclosure: Mahmoud's role, contractor policy, and client point of accountability.
- Public or private pricing decision for each offer.
- Contact destination, response-time expectation, qualification fields, privacy copy, and fallback channel.
- Approved founder photo and short biography.

