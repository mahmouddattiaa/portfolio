# UX User Stories and User Journeys

**Product:** Personal / studio portfolio site, currently branded **Kepler Dev**
**Source root:** `portfolio/`
**Stack (verified, `package.json`):** Next.js `^16.2.3`, React `19.2.3`, Tailwind `^4`, framer-motion `^12.38.0`, lucide-react, `@vercel/analytics`
**Date:** 2026-08-13
**Method:** Every claim below was read out of the current working tree. Anything not verifiable in code is explicitly tagged **[ASSUMPTION]**.

---

## 0. Read this first — the build does not match its description

Before any persona work is useful, three verified facts about the current tree have to be on the table, because they invalidate most of what a reader would assume from the brief or the `README.md`.

### 0.1 The site is an agency site, not a personal developer portfolio

`src/app/layout.tsx:14-15` sets the title to *"Kepler Dev — Connected product engineering"* and describes a *"founder-led product engineering studio."* The homepage (`src/app/page.tsx:12`) leads with *"Replace fragmented operations with one connected product."* The routes are `/`, `/work`, `/work/[slug]`, `/mahmoud`, `/contact`.

The brief for this document described a personal portfolio with a hero, project grid, tech stack, experience timeline, and testimonials. **That site still exists in the repo but is not wired to any route.** See 0.2.

This matters for personas: a technical recruiter and a peer developer arrive expecting a *person*; the site answers as a *studio*. That mismatch is a real, measurable conversion risk and is tracked as **FR-01**.

### 0.2 Fifteen of nineteen components are orphaned dead code

Import-graph analysis across `src/**` shows only **four** components are reachable from any route:

| Live (reachable from a route) | Orphaned (zero importers) |
|---|---|
| `site-shell.tsx` (Header/Footer, via `layout.tsx:5`) | `hero.tsx`, `navbar.tsx`, `about.tsx`, `process.tsx`, `tech-stack.tsx`, `experience-timeline.tsx`, `testimonials.tsx`, `terminal.tsx`, `contact.tsx`, `project-card-premium.tsx`, `project-details-modal.tsx`, `preloader.tsx`, `custom-cursor.tsx`, `scroll-progress.tsx`, `animated-background.tsx` |
| `theme-provider.tsx` (`layout.tsx:6`) | |
| `work-grid.tsx` (`page.tsx:5`, `work/page.tsx:2`) | |
| `contact-form.tsx` (`contact/page.tsx:2`) | |

Corroborating evidence that these are genuinely dead, not merely lazily loaded:

- `src/app/globals.css` contains **no** `.project-card`, `.preloader`, `.custom-cursor`, `.terminal`, `.tech-stack`, `.testimonial`, `.hero-title`, or `.navbar` rules. The styling that would render them was removed.
- `framer-motion` is imported by **14 files, all of them orphans** — zero live code paths use it. It is a shipped dependency with no runtime consumer.
- `@formspree/react` (`package.json`) is **never imported anywhere** in `src/`. The live contact path uses a raw `fetch` in `src/app/api/contact/route.ts:31`.
- `src/lib/data.ts` (381 lines of projects, skills, and experience — the file the brief named as "source of truth") is imported **only** by orphaned components. It is unreachable. The actual live content source is **`src/lib/content.ts`**.

**Consequence for this document:** every journey below is written against `content.ts`, `work-grid.tsx`, `site-shell.tsx`, and `contact-form.tsx`. The rich project-card / modal / timeline experience described in the brief is *not currently shippable UX* — it is a restoration decision, captured as epic **Discovery** and **Work** stories.

### 0.3 There is zero published work on the work page

This is the single most important UX fact in the codebase.

```
src/lib/content.ts:41   export const caseStudies: CaseStudy[] = [];
```

The array is **empty**. `publicCaseStudies` (`content.ts:43-48`) filters that empty array through a publication gate, so it is also empty. Therefore:

- `work-grid.tsx:12` takes its early-return branch on **every render**, on both `/` and `/work`. Every visitor sees the empty state: *"Proof is published with its context intact… Detailed studies are still behind their evidence and permission checks."*
- The classification filter row (`work-grid.tsx:7,13`) and the `aria-live` results counter are **never rendered at all** — they are unreachable code behind the early return.
- `src/app/work/[slug]/page.tsx:5-6` sets `dynamicParams = false` and generates static params from the empty array. **Every** `/work/<anything>` URL therefore returns a 404. Any previously shared or indexed case-study deep link is dead.
- `src/app/sitemap.ts` emits only the four top-level routes.

The `docs/agency-rebuild/progress.md` log confirms this is *deliberate* — the team gated publication on evidence and permission approval (release blockers Q-02/Q-03). It is an honest engineering choice. It is still, from the visitor's side, a portfolio with no portfolio.

### 0.4 The contact form is environment-gated, not placeholder-gated

The brief asked whether the Formspree ID is still a placeholder. **Verified: it is not a placeholder — there is no hardcoded ID at all.** The mechanism is stricter than a placeholder:

```
src/lib/contact-config.ts:5-13
  provider      = process.env.CONTACT_PROVIDER
  formId        = process.env.FORMSPREE_FORM_ID
  fallbackEmail = process.env.CONTACT_FALLBACK_EMAIL
  enabled: provider === "formspree" && Boolean(formId)
```

- `src/app/contact/page.tsx:7` renders `<ContactForm>` only when `config.enabled`; otherwise it renders a *"Online project enquiries are not available at the moment"* panel.
- `src/app/api/contact/route.ts:20` returns **503** when not enabled, before any provider call.
- **No `.env.example` or `.env.local.example` exists in the repo** (verified by directory listing). A new environment therefore defaults to *contact disabled*, and the fallback `mailto:` only appears if `CONTACT_FALLBACK_EMAIL` is also set and passes the regex at `contact-config.ts:1-3`.

So in any unconfigured deployment, **the site has no working contact channel of any kind** — no form, no email, no social profile links (`site-shell.tsx:21` footer contains only Work / Services / About / Process / Contact). `public/resume.docx` exists on disk but is linked from nowhere in live code.

---

## 1. Personas

Four personas, grounded in who actually reaches a developer/studio portfolio. Traffic-share figures are **[ASSUMPTION]** — the site has no custom analytics events (see §5), so no first-party data exists to derive them.

---

### P1 — Rana, Technical Recruiter / In-house Talent Partner

| | |
|---|---|
| **Role** | Agency or in-house recruiter, screening for a mid/senior full-stack or mobile role |
| **Technical depth** | Low-to-moderate. Reads stack keywords, not code. |
| **Arrival context** | Desktop, dual monitor, during a screening block. Referral: LinkedIn profile link, CV header URL, or an ATS-attached link. |
| **Time budget** | **20–45 seconds** on first pass. She is triaging a stack of candidates. |
| **Goals** | Confirm this is a real, currently-active engineer; extract stack, seniority signal, location/timezone, and a way to contact or download a CV. |
| **Success criteria** | Within one screen: a name, a role title, a stack list, at least one named project, and a contact route or CV. She can paste a summary into her ATS note field. |
| **Failure / bounce triggers** | Cannot tell whether this is a person or a company. No CV. No email or LinkedIn. Project section shows "nothing published." Has to click more than twice to find contact. |
| **Current-build verdict** | **Fails.** Brand is a company (`layout.tsx:14`), no CV link, no LinkedIn/GitHub in the footer (`site-shell.tsx:21`), work section is empty (`content.ts:41`), and contact is a qualification form aimed at buyers, not candidates (`contact-form.tsx:49`). |

---

### P2 — Tomás, Engineering Lead doing a code-quality check

| | |
|---|---|
| **Role** | Staff engineer or EM, second-stage screen after a recruiter passed the profile |
| **Technical depth** | High. Will read source, not marketing copy. |
| **Arrival context** | Desktop, often a second browser tab beside a CV or a GitHub profile. Referral: recruiter handoff, or direct from a GitHub README. |
| **Time budget** | **3–8 minutes**, but front-loaded: he decides in the first 30 seconds whether to spend the rest. |
| **Goals** | Find one non-trivial project, understand the architecture decision behind it, verify the claimed role was substantive (built it vs. configured it), and reach source code or a live deployment. |
| **Success criteria** | Reaches a case study with a stated problem, a named architecture, an explicit "my role was X," and a repo or live URL he can open. |
| **Failure / bounce triggers** | Marketing abstraction with no technical specifics. Claims with no artifact. No repo links. Dead deep links. Vague "led delivery" phrasing. |
| **Current-build verdict** | **Fails at the first click.** The `CaseStudy` type (`content.ts:14-35`) is genuinely well-designed for him — it has `technicalChallenges`, `mahmoudRole`, `teamContext`, `technologies`, and a `proofState` per result. But zero records exist, so `/work` shows the empty state and every `/work/<slug>` 404s (`work/[slug]/page.tsx:5-6`). The homepage offers him only a *"Request a project review"* CTA (`page.tsx:12,20`), which is a sales action he will not take. |

---

### P3 — Dana, Prospective Freelance / Studio Client

| | |
|---|---|
| **Role** | Ops lead, founder, or product owner at an SMB with a broken internal workflow |
| **Technical depth** | Low. Thinks in outcomes, budget, and risk. |
| **Arrival context** | Mixed desktop/mobile, often mobile first (evening browsing) then desktop to enquire. Referral: word of mouth, Upwork profile, a search for "custom internal tool developer." |
| **Time budget** | **2–5 minutes**, willing to go deeper if trust builds. |
| **Goals** | Decide whether this person/studio can be trusted with a real budget. Understand the engagement model, roughly what it costs, and what the first step is. |
| **Success criteria** | Finds an engagement shape that matches her situation, sees at least one comparable prior project, and can start a conversation without committing. |
| **Failure / bounce triggers** | No evidence of prior work. No pricing signal at all. A long qualification form as the only contact route. No named human accountable. |
| **Current-build verdict** | **Partially served — the best-served persona of the four.** The offers grid (`page.tsx:16`, data at `content.ts:50-79`) gives her four clearly-scoped engagement shapes with Best fit / Outcome / **Boundary** / next step, and each deep-links to a pre-filled form via `/contact?offer=<name>` (wired at `contact-form.tsx:10`). The FAQ (`page.tsx:19`, `content.ts:81-89`) directly answers her pricing and ownership questions. The `/mahmoud` route (`mahmoud/page.tsx:7`) names an accountable human. **But** she still sees zero prior work, and if env vars are unset she hits the "enquiries unavailable" wall (`contact/page.tsx:7`). |

---

### P4 — Kwame, Peer Developer from a social link

| | |
|---|---|
| **Role** | Another developer — potential collaborator, or just curious |
| **Technical depth** | High, but low-commitment. |
| **Arrival context** | **Mobile, ~70%** [ASSUMPTION]. Thumb-scrolling from an X/LinkedIn/Reddit post or a Discord drop. Frequently a cold, uncached first visit on mid-tier mobile data. |
| **Time budget** | **10–30 seconds.** He is in a feed-browsing mode and will bounce without guilt. |
| **Goals** | Satisfy curiosity — see something technically interesting, or something visually impressive. Maybe follow, maybe bookmark. |
| **Success criteria** | Something concrete and interesting is visible **without scrolling**. If it is good, he opens a repo or follows a profile. |
| **Failure / bounce triggers** | An abstract corporate value proposition above the fold. No visible code, screenshot, or demo. Nothing to follow. Slow first paint. |
| **Current-build verdict** | **Fails.** The mobile hero (`globals.css:70`) is `min-height: 40rem` of photographic poster plus the abstract headline *"Replace fragmented operations with one connected product"* — he must scroll past a full screen of B2B positioning before reaching anything. There are no GitHub/X/LinkedIn links anywhere (`site-shell.tsx:21`) so there is no follow action even if he wanted one. |

---

## 2. User Journeys

Stage model: **Awareness → Landing → Scan → Evaluate → Deep-dive → Convert → Follow-up.**
"What they see" names the real component and, where relevant, the file:line.

---

### J1 — Rana's 30-second skim (desktop, recruiter) ⏱️ *the "30-second skim" journey*

| Stage | Goal | What she actually sees today | Thought / emotion | Friction | Drop-off risk |
|---|---|---|---|---|---|
| **Awareness** | Verify a candidate link from an ATS | Link preview from `opengraph-image.tsx` — a dark card reading **"Kepler Dev"**, not a person's name | *"Is this the right link? This is a company."* | OG card carries no person name; `layout.tsx:21-27` structured data does include a `Person` named "Mahmoud" but a recruiter never sees JSON-LD | **Medium** |
| **Landing** (0–5s) | Match the page to the candidate | `site-shell.tsx:19` header: Kepler Dev wordmark, nav *Work / Services / Process / About*, a `Cairo · GMT+2` timezone chip, theme `<select>`, and a *"Request a project review"* button. Hero (`page.tsx:12`) fills ~88vh. | *"This is an agency pitch. Where's the person?"* | The word **"Services"** confirms company, not candidate. Her target's name appears nowhere above the fold. | **High** |
| **Scan** (5–20s) | Find stack + projects | Scrolls past `01 — The problem` (`page.tsx:13`) and `02 — A connected platform` (`page.tsx:14`) — both pure prose — to `03 — Selected work` (`page.tsx:15`) | *"Two full sections of copy and no facts yet."* | Two abstract sections sit between the hero and the only proof section | **High** |
| **Evaluate** (20–30s) | Read the projects | `<WorkGrid>` renders the **empty state** (`work-grid.tsx:12`): *"Proof is published with its context intact… behind their evidence and permission checks."* | *"There is no work here. I can't evaluate this."* | Zero projects (`content.ts:41`). Even the filter row never renders. | **Critical — this is where she leaves** |
| **Deep-dive** | — | Not reached | — | — | — |
| **Convert** | Get a CV or an email | Only CTA is *"Request a project review"* (`page.tsx:20`). No CV link; `public/resume.docx` exists on disk but is unlinked. No LinkedIn/GitHub in footer (`site-shell.tsx:21`). | *"There's no way to contact him as a candidate."* | Zero recruiter-shaped conversion path | **Certain** |
| **Follow-up** | Note it in the ATS | Nothing to record | — | — | — |

**Net:** Rana bounces at roughly 25 seconds having learned only a company name and a timezone. **Stories: US-DISC-01, US-DISC-04, US-WORK-01, US-CRED-04, US-CONV-05.**

---

### J2 — Tomás's code-quality check (desktop, engineering lead)

| Stage | Goal | What he actually sees today | Thought / emotion | Friction | Drop-off risk |
|---|---|---|---|---|---|
| **Awareness** | Handoff link from Rana, or a README link | Same Kepler Dev OG card | *"Studio site. OK, let's find the work."* | — | Low |
| **Landing** | Skip the pitch, find `/work` | Header nav exposes `/work` directly (`site-shell.tsx:11`) — good, one click | *"Good, there's a Work nav item."* | None — nav is well-structured | Low |
| **Scan** | Reach the work index | `/work` route hero: *"Product work, shown with the context required to read it honestly"* (`work/page.tsx:5`) | *"Strong framing. Promising."* | The headline promises rigor the page can't deliver | Low |
| **Evaluate** | Open one case study | `<WorkGrid>` empty state again (`work-grid.tsx:12`) — *"Request a project review if you need a relevant private capabilities discussion"* | *"It's asking me to book a sales call to see code samples. I'm not a buyer."* | **Persona/CTA mismatch.** The empty state's only escape hatch is a commercial CTA. | **Critical** |
| **Deep-dive** | Read architecture, open a repo | Unreachable. If he pastes a `/work/faseeh-ai` URL from an older share, `dynamicParams = false` + empty `generateStaticParams` (`work/[slug]/page.tsx:5-6`) returns **404**. | *"Dead link. Moving on."* | Every historical case-study URL is a hard 404 with no redirect and no "see all work" recovery | **Certain** |
| **Convert** | Nothing to convert to | — | — | No GitHub link anywhere in live code | — |
| **Follow-up** | — | — | — | — | — |

**Note on latent quality:** the `CaseStudy` contract at `content.ts:14-35` and the detail template at `work/[slug]/page.tsx:8` (Context → Role and team → What was delivered → Evidence, with a per-claim `verified-public` / `verified-private` label) are *exactly* the structure Tomás wants. The template is built and correct; it has no data. This is a content problem, not a design problem. **Stories: US-WORK-01, US-WORK-02, US-WORK-06, US-CRED-01, US-CRED-02.**

---

### J3 — Dana's evaluation (mobile-first, then desktop) 📱 *the mobile-first journey*

| Stage | Goal | What she actually sees today | Thought / emotion | Friction | Drop-off risk |
|---|---|---|---|---|---|
| **Awareness** | Referral, evening, iPhone on 4G | — | *"Let me have a quick look."* | — | Low |
| **Landing** (mobile, 375px) | Understand what this is | `.hero-redesign` at `min-height: 40rem` (`globals.css:70`) — full-bleed WebP poster (`page.tsx:12`, `priority`, `sizes="100vw"`), gradient scrim, headline capped to `max-width: 10ch`. Header collapses: `.desktop-nav`/`.desktop-cta` hidden below 1023px, hamburger shown (`globals.css:31`); `.timezone` hidden below 1023px (`globals.css:69`). | *"Clean. Serious. But what do they do?"* | **40rem of hero before any content** — roughly 1.2 mobile viewports of pure positioning. The 10ch headline wrap makes "Replace fragmented operations with one connected product" span ~5 lines. | **Medium** |
| **Scan** | Find something concrete | Scrolls through `01 — The problem` (3 stacked cards, `globals.css:70` collapses all grids to 1 column) and `02 — A connected platform` | *"This describes my problem exactly, actually."* | The problem framing genuinely resonates — this is the site's strongest content for her | Low |
| **Evaluate** | See if they've done it before | `03 — Selected work` → **empty state** (`work-grid.tsx:12`) | *"No examples at all? That's a risk."* | Zero social proof at the exact moment trust is being formed | **High** |
| **Deep-dive** | Understand engagement + cost | Recovers at the offers grid (`page.tsx:16`): four offers, each with **Best fit / Outcome / Boundary / next step** (`content.ts:50-79`). Then the FAQ (`page.tsx:19`) answers pricing (*"discussed after the project review, not presented as a generic menu"*), ownership, and "do I need a spec." | *"OK — 'Product Blueprint' is what I need. And they're upfront about scope boundaries."* | This section does real work. The `Boundary` field is an unusually honest trust signal. | Low |
| **Convert** | Start a conversation | Taps *"Discuss Product Blueprint"* → `/contact?offer=Product%20Blueprint` (`page.tsx:16`). The `offer` param pre-selects the dropdown (`contact/page.tsx:7` → `contact-form.tsx:10`). **If env is unset**, she instead hits *"Online project enquiries are not available at the moment"* (`contact/page.tsx:7`) — and with no `CONTACT_FALLBACK_EMAIL`, **no alternative channel is shown at all.** | *"…so how do I actually reach them?"* | **Dead end.** A visitor who cleared every trust hurdle has no way to convert. | **Critical (when unconfigured)** |
| **Convert (configured)** | Fill the form | 10 fields; 5 required (`contact.ts:18-26`: name, valid email, problem, outcome, consent). Two free-text areas asking *"What workflow or problem needs attention?"* and *"What would a useful outcome look like?"*. Mobile: `.button { width: 100% }` (`globals.css:32`), `.form-grid` collapses to 1 column. | *"That's a lot of typing on a phone."* | Two required essay fields on mobile is the highest-effort step in the funnel | **Medium-High** |
| **Follow-up** | Confirmation | On success the whole form is replaced by `.form-success` with focus moved to the heading (`contact-form.tsx:19,46`) | *"Sent. Good."* | No email echo, no expected-response-time, no calendar option | **Medium** |

**Accessibility credit where due (verified):** the mobile menu portals to `document.body` (`site-shell.tsx:18`), traps Tab and Shift+Tab, closes on Escape, locks body scroll, and restores focus to the trigger on close (`site-shell.tsx:17`). That is a correctly-built dialog. **Stories: US-DISC-02, US-WORK-01, US-CONV-01, US-CONV-02, US-CONV-03, US-A11Y-05.**

---

### J4 — Kwame's mobile drive-by (peer developer)

| Stage | Goal | What he actually sees today | Thought / emotion | Friction | Drop-off risk |
|---|---|---|---|---|---|
| **Awareness** | Taps a link in a feed | OG card: "Kepler Dev — Connected product engineering" (`opengraph-image.tsx:4`) | *"Hm, an agency?"* | Card promises B2B, not craft | **Medium** |
| **Landing** (0–3s) | See something cool | 40rem photographic hero + agency headline. Theme applied pre-paint by the inline script (`layout.tsx:20`) so no flash. | *"Corporate."* | Nothing technical, visual-craft-y, or personal above the fold | **High** |
| **Scan** (3–10s) | One flick of the thumb | `01 — The problem`: three text cards | *"Still reading a pitch deck."* | Two prose sections before any proof | **High** |
| **Evaluate** (10–20s) | Anything to look at? | Empty work state | *"Nothing to see."* | — | **Critical** |
| **Convert / Follow** | Follow or star something | **Nothing.** No GitHub, no X, no LinkedIn, no repo link in any live component (`site-shell.tsx:21`, `page.tsx`, `mahmoud/page.tsx:7`). | *"Can't even follow him."* | Zero low-commitment conversion affordance | **Certain** |

**Net:** highest-volume, lowest-cost persona converts at effectively zero because no follow-shaped action exists on the site. **Stories: US-DISC-02, US-DISC-05, US-CONV-06, US-CRED-04.**

---

## 3. User Stories

**Priority key (MoSCoW):** M = Must, S = Should, C = Could, W = Won't (this cycle).
**Total: 34 stories across 6 epics.**

---

### Epic A — Discovery & First Impression (`US-DISC-*`)

---

**US-DISC-01 — Identify the person behind the studio** · **M**
> As a **technical recruiter**, I want to see a named human with a role title within the first viewport, so that I can confirm I'm on the right candidate's site before I spend more time.

- **Given** a visitor loads `/` at 1440×900, **When** the hero (`page.tsx:12`) renders, **Then** the visible text contains "Mahmoud" and a role descriptor, without scrolling.
- **Given** a link is shared to LinkedIn or Slack, **When** the OG image (`opengraph-image.tsx`) renders, **Then** it contains both the person name and the studio name.
- **Given** the JSON-LD graph at `layout.tsx:21-27`, **When** the `Person` node is serialised, **Then** it includes `jobTitle` and `sameAs` (profile URLs), not only `name`, `url`, and `worksFor`.
- **Given** any page, **When** the header renders (`site-shell.tsx:19`), **Then** either the wordmark or an adjacent element identifies the accountable individual.

---

**US-DISC-02 — Reach concrete proof within one viewport on mobile** · **M**
> As a **peer developer on a phone**, I want something concrete visible almost immediately, so that I don't bounce during a 10-second drive-by.

- **Given** a 375×667 viewport, **When** `/` loads, **Then** the hero occupies **≤ 70vh** (currently `min-height: 40rem` at `globals.css:70`).
- **Given** the same viewport, **When** the user performs one full-screen scroll, **Then** at least one concrete artifact (project name, screenshot, or stack list) is visible.
- **Given** a 375px viewport, **When** the h1 renders, **Then** it wraps to **≤ 3 lines** (currently `max-width: 10ch` at `globals.css:70` forces ~5).
- **Given** a cold cache on a throttled Fast 3G profile, **When** `/` loads, **Then** LCP ≤ 2.5s.

---

**US-DISC-03 — Route straight to work from anywhere** · **S**
> As **any visitor**, I want a persistent path to the work, so that I never have to scroll the pitch to find proof.

- **Given** any route, **When** the header renders, **Then** a "Work" link is present (**already satisfied** — `site-shell.tsx:11`).
- **Given** the current route is `/work`, **When** the nav renders, **Then** that link carries `aria-current="page"` (currently **no** `aria-current` exists anywhere in `src/` — verified by grep).
- **Given** a viewport < 1024px, **When** the hamburger is opened, **Then** "Work" is the first focusable nav item (**already satisfied** — `site-shell.tsx:17` focuses the first `a, button, select`).

---

**US-DISC-04 — Signal audience fit above the fold** · **S**
> As a **recruiter or peer developer**, I want to know immediately whether this site is for hiring or for buying, so that I don't invest 30 seconds in the wrong context.

- **Given** `/` at any breakpoint, **When** the hero renders, **Then** it exposes at least one non-commercial affordance (CV, GitHub, or "for recruiters" link) alongside the "Request a project review" CTA (`page.tsx:12`).
- **Given** the current build, **When** a visitor completes the hero, **Then** they can distinguish hiring-track from client-track navigation without reading the FAQ.

---

**US-DISC-05 — Restore or formally retire the orphaned experience layer** · **M**
> As the **site owner**, I want a decision recorded on the 15 orphaned components, so that the repo stops carrying a second, invisible portfolio.

- **Given** the import graph, **When** `hero.tsx`, `navbar.tsx`, `about.tsx`, `process.tsx`, `tech-stack.tsx`, `experience-timeline.tsx`, `testimonials.tsx`, `terminal.tsx`, `contact.tsx`, `project-card-premium.tsx`, `project-details-modal.tsx`, `preloader.tsx`, `custom-cursor.tsx`, `scroll-progress.tsx`, and `animated-background.tsx` are analysed, **Then** each is either wired to a route **or** deleted.
- **Given** `src/lib/data.ts` (381 lines) is reachable only from orphans, **When** the decision is applied, **Then** it is either merged into `content.ts` or removed.
- **Given** `framer-motion` has zero live importers, **When** the decision is "retire", **Then** it is removed from `package.json` dependencies.
- **Given** `@formspree/react` is never imported (the live path uses `fetch` at `api/contact/route.ts:31`), **When** dependencies are audited, **Then** it is removed.
- **Given** the components are retired, **When** `README.md` is read, **Then** it no longer documents `project-card.tsx`, `hero.tsx`, `tech-stack.tsx`, or `data.ts` as the project structure.

---

**US-DISC-06 — Eliminate the pre-proof prose gap** · **C**
> As a **time-pressed visitor**, I want fewer abstract sections between the hero and the work, so that proof arrives sooner.

- **Given** `/`, **When** sections are counted between the hero (`page.tsx:12`) and `<WorkGrid>` (`page.tsx:15`), **Then** there is at most **one** (currently two: `page.tsx:13`, `page.tsx:14`).
- **Given** a 375px viewport, **When** the user scrolls, **Then** the first project is reachable within **two** full-screen scrolls.

---

### Epic B — Work / Projects Browsing (`US-WORK-*`)

---

**US-WORK-01 — Publish at least three case studies** · **M** 🔴 *highest-impact story in this document*
> As **any visitor**, I want to see actual projects, so that I can evaluate capability rather than read claims about it.

- **Given** `content.ts:41`, **When** the app builds, **Then** `caseStudies` contains **≥ 3** records (currently `[]`).
- **Given** those records, **When** they pass the gate at `content.ts:43-48` (`publicationStatus === "public"`, no `unverified` result, neither permission `pending`), **Then** `publicCaseStudies.length ≥ 3`.
- **Given** `publicCaseStudies` is non-empty, **When** `/work` renders, **Then** `work-grid.tsx:12` does **not** take its early return and the `.work-grid` cards render.
- **Given** each record, **When** a card renders (`work-grid.tsx:13`), **Then** it shows a classification label, `productionStatus`, `problem`, `mahmoudRole`, and an evidence label.
- **Given** at least one record has `classification: "client"` or `"employer"`, **Then** the grid demonstrates paid, non-hobby work.
- **Given** `generateStaticParams` (`work/[slug]/page.tsx:6`), **When** the build runs, **Then** ≥ 3 static detail routes are emitted and none 404.

---

**US-WORK-02 — Read a full case study with technical depth** · **M**
> As an **engineering lead**, I want each case study to state the problem, my role, the technical challenges, and the evidence, so that I can judge whether the work was substantive.

- **Given** a published record, **When** `/work/<slug>` renders (`work/[slug]/page.tsx:8`), **Then** the sections **Context**, **Role and team**, **What was delivered**, and **Evidence** all render with non-empty content.
- **Given** the `CaseStudy` type (`content.ts:14-35`), **When** the detail page renders, **Then** `technicalChallenges` and `technologies` are **displayed** — currently both fields exist on the type but are **never rendered** by `work/[slug]/page.tsx:8`.
- **Given** a result claim, **When** it renders, **Then** it carries a "Verified public evidence" or "Verified privately" label (**already satisfied** — `work/[slug]/page.tsx:8`).
- **Given** a record with an external repo or live URL, **When** the page renders, **Then** the link is present and opens correctly.
- **Given** `media[]` on the type (`content.ts:31`), **When** approved screenshots exist, **Then** they render with their `alt` text.

---

**US-WORK-03 — Filter work by engagement classification** · **S**
> As a **recruiter or client**, I want to filter by work type, so that I can isolate the category relevant to me.

- **Given** `publicCaseStudies.length > 0`, **When** `/work` renders, **Then** the seven filter buttons render (`work-grid.tsx:7,13`) — currently unreachable behind the `work-grid.tsx:12` early return.
- **Given** a filter is selected, **When** the grid updates, **Then** only matching `classification` cards render (`work-grid.tsx:11`).
- **Given** a filter is selected, **When** the count updates, **Then** `aria-live="polite"` announces "N studies shown" (**already correct** — `work-grid.tsx:13`).
- **Given** a filter button, **When** it is active, **Then** it carries `aria-pressed="true"` — currently state is conveyed **only** by the `selected` CSS class (`work-grid.tsx:13`, `globals.css:30`), so screen-reader users cannot perceive which filter is on. Verified: **zero** `aria-pressed` occurrences in `src/`.
- **Given** a filter yields no matches, **When** the grid renders, **Then** the "No published studies match that filter" state shows (**already implemented** — `work-grid.tsx:13`).

---

**US-WORK-04 — Persist filter state in the URL** · **C**
> As a **visitor sharing a filtered view**, I want the filter in the URL, so that the link reproduces what I saw.

- **Given** a filter selection, **When** it changes, **Then** the URL updates to `/work?filter=<classification>` without a full navigation.
- **Given** `/work?filter=client` is loaded directly, **When** `WorkGrid` mounts, **Then** `useState` (`work-grid.tsx:10`) initialises from the param rather than `"all"`.
- **Given** browser Back is pressed after filtering, **Then** the previous filter is restored.

---

**US-WORK-05 — Recover gracefully from a dead case-study URL** · **S**
> As a **visitor following an old or shared link**, I want a useful 404, so that a stale URL doesn't end my visit.

- **Given** `dynamicParams = false` (`work/[slug]/page.tsx:5`) and an unknown slug, **When** the route resolves, **Then** a custom `not-found` page renders with links to `/work` and `/contact` (no `not-found.tsx` currently exists in `src/app/`).
- **Given** `publicCaseStudies` is empty, **When** any `/work/*` URL is requested, **Then** the response explains that studies are pending rather than showing a bare 404.
- **Given** a slug is renamed, **When** the old URL is requested, **Then** a 301 redirect is configured in `next.config.ts` (currently empty of redirects).

---

**US-WORK-06 — Offer a private-evidence path for gated work** · **S**
> As an **engineering lead who cannot see NDA'd work**, I want a non-commercial way to request technical evidence, so that the gate doesn't read as "no work exists."

- **Given** the empty state (`work-grid.tsx:12`), **When** it renders, **Then** its CTA is not exclusively *"Request a project review"* — it offers a technical/portfolio-review path.
- **Given** a `verified-private` result, **When** the detail page renders it, **Then** the UI states *why* it is private and how it can be verified.
- **Given** the empty state, **When** it renders, **Then** it states how many studies exist privately, so absence reads as discretion rather than emptiness.

---

**US-WORK-07 — Surface the stack per project** · **S**
> As a **recruiter keyword-matching a role**, I want technologies visible on the card itself, so that I can match a JD without opening every study.

- **Given** a card (`work-grid.tsx:13`), **When** it renders, **Then** the first 4–6 entries of `technologies` (`content.ts:30`) render as chips — currently `technologies` is **not** rendered on the card at all.
- **Given** a technology appears on ≥ 2 studies, **When** the work index renders, **Then** it is available as a secondary facet. *(Depends on US-WORK-03.)*

---

### Epic C — Credibility & Proof (`US-CRED-*`)

---

**US-CRED-01 — Preserve the evidence-gating contract** · **M**
> As the **site owner**, I want every published claim gated on verified evidence and permission, so that credibility survives scrutiny.

- **Given** a record with any `proofState === "unverified"`, **When** the gate runs (`content.ts:45`), **Then** it is excluded.
- **Given** `clientNamePermission === "pending"` or `screenshotPermission === "pending"`, **When** the gate runs (`content.ts:46-47`), **Then** it is excluded.
- **Given** `publicationStatus !== "public"`, **When** the gate runs (`content.ts:44`), **Then** it is excluded.
- **Given** the gate is modified, **When** CI runs, **Then** a unit test asserts each exclusion branch (**no test suite exists in the repo** — `package.json` has no `test` script).

---

**US-CRED-02 — Show verification recency** · **S**
> As an **engineering lead**, I want to know when a claim was last verified, so that I can weight stale evidence appropriately.

- **Given** `lastVerified` exists on the type (`content.ts:34`), **When** a detail page renders, **Then** the date is displayed — currently the field is **captured but never rendered** by `work/[slug]/page.tsx:8`.
- **Given** `lastVerified` is older than 12 months, **When** the page renders, **Then** the label is visually de-emphasised.
- **Given** a card in the grid, **When** it renders, **Then** the evidence label distinguishes public from private (**already satisfied** — `work-grid.tsx:13`).

---

**US-CRED-03 — Provide a credible founder/about page** · **S**
> As a **prospective client**, I want to know who is accountable, so that I can assess delivery risk.

- **Given** `/mahmoud` (`mahmoud/page.tsx:7`), **When** it renders, **Then** it names the accountable lead and lists technical strengths (**already satisfied** — `mahmoud/page.tsx:6`).
- **Given** the page, **When** it renders, **Then** it includes **verifiable specifics**: years of experience, named employers, or education. Currently all four strength entries are capability prose with **zero** dates, company names, or artifacts.
- **Given** the nav labels this route "About" (`site-shell.tsx:11`) but the URL is `/mahmoud`, **When** a visitor shares the URL, **Then** the label and path are reconciled.
- **Given** a photograph is approved, **When** the page renders, **Then** it displays (`docs/agency-rebuild/decisions.md` notes `public/resources/pics/mahmoud-headshot.jpeg` exists but is unlinked from live code, pending approval — release blocker Q-06).

---

**US-CRED-04 — Link verifiable external profiles** · **M**
> As **any visitor**, I want GitHub, LinkedIn, and a CV, so that I can verify claims outside this site.

- **Given** the footer (`site-shell.tsx:21`), **When** it renders, **Then** it contains GitHub and LinkedIn links — currently it contains **only** Work / Services / About / Process / Contact and a copyright line.
- **Given** `public/resume.docx` exists on disk, **When** any live page renders, **Then** it is linked (currently linked from **nowhere** in `src/`) **and** converted to PDF for cross-platform viewing.
- **Given** the JSON-LD `Person` node (`layout.tsx:25`), **When** it serialises, **Then** it includes a `sameAs` array of those profile URLs.
- **Given** each external link, **When** it renders, **Then** it carries `rel="noopener noreferrer"`.

---

**US-CRED-05 — Publish real testimonials or remove the claim surface** · **C**
> As a **prospective client**, I want third-party validation, so that trust doesn't rest only on self-description.

- **Given** `testimonials.tsx` is orphaned (zero importers, no supporting CSS), **When** the retire/restore decision from US-DISC-05 is made, **Then** it is either wired with **attributed, permission-cleared** quotes or deleted.
- **Given** a testimonial is published, **When** it renders, **Then** it carries a real name, role, and company, subject to the same permission gate as case studies.

---

**US-CRED-06 — Keep marketing claims consistent with the code** · **S**
> As the **site owner**, I want stated technology versions to match `package.json`, so that a technical visitor doesn't catch an error.

- **Given** any version string in copy, **When** it renders, **Then** it matches `package.json` (`docs/agency-rebuild/decisions.md` records `tech-stack.tsx` claiming "Next.js 15" while `package.json` pins `^16.2.3` — currently latent because the component is orphaned, but it re-activates if restored).
- **Given** `README.md`, **When** it is read, **Then** its "Project Structure" and "Design System" sections describe the **current** build. It currently documents the old violet/cyan `#09090b` personal portfolio and files (`project-card.tsx`, `data.ts`) that are dead or absent.

---

### Epic D — Contact & Conversion (`US-CONV-*`)

---

**US-CONV-01 — Guarantee a working contact channel in every environment** · **M** 🔴
> As **any visitor ready to make contact**, I want at least one reachable channel, so that a configuration gap never costs a lead.

- **Given** `CONTACT_PROVIDER` / `FORMSPREE_FORM_ID` are unset, **When** `/contact` renders (`contact/page.tsx:7`), **Then** a working `mailto:` fallback is **always** shown — currently the fallback renders only if `CONTACT_FALLBACK_EMAIL` is *also* set and passes `contact-config.ts:1-3`, so the default unconfigured state offers **no channel at all**.
- **Given** the repo, **When** a developer clones it, **Then** an `.env.example` documents `CONTACT_PROVIDER`, `FORMSPREE_FORM_ID`, and `CONTACT_FALLBACK_EMAIL` (**no such file exists** — verified by directory listing).
- **Given** production, **When** the site is deployed, **Then** a build-time or health check asserts `getContactConfig().enabled === true`.
- **Given** the footer, **When** it renders, **Then** it contains a direct contact affordance independent of `/contact`.

---

**US-CONV-02 — Reduce first-contact effort** · **S**
> As a **prospective client on a phone**, I want a short first step, so that I'm not asked for two essays before any relationship exists.

- **Given** the form (`contact-form.tsx:49`), **When** it renders on ≤ 767px, **Then** required fields number **≤ 3** — currently 5 are required (`contact.ts:21-25`), including two free-text areas (`problem`, `outcome`).
- **Given** a two-step design, **When** step 1 is submitted, **Then** name + email + one-line problem is sufficient to open a conversation.
- **Given** the offer deep link `/contact?offer=<name>` (`page.tsx:16`), **When** the form mounts, **Then** the dropdown is pre-selected (**already satisfied** — `contact-form.tsx:10`).
- **Given** a user abandons mid-form, **When** they return within the session, **Then** entered values are restored (currently `useState`-only — a reload loses everything).

---

**US-CONV-03 — Recover from every submission failure without data loss** · **M**
> As a **visitor whose submission fails**, I want my input preserved and a clear alternative, so that a transient error doesn't lose the lead.

- **Given** a 503 from `api/contact/route.ts:20`, **When** the response returns, **Then** the error summary renders with `role="alert"` and receives focus (**already satisfied** — `contact-form.tsx:18,49`).
- **Given** any failure, **When** it renders, **Then** all entered values remain in the fields (**already satisfied** — `setValues` is untouched on the failure path, `contact-form.tsx:40-42`).
- **Given** a 502 from the provider (`route.ts:36`), **When** it renders, **Then** a `mailto:` fallback with the message pre-populated is offered.
- **Given** a 422 with field errors (`route.ts:27`), **When** the summary renders, **Then** each error is a button that focuses its field (**already satisfied** — `contact-form.tsx:21,49`).
- **Given** a 429 rate-limit (`route.ts:21`), **When** it renders, **Then** the copy explains the wait rather than implying user error.

---

**US-CONV-04 — Confirm submission credibly** · **S**
> As a **visitor who submitted an enquiry**, I want a confirmation that sets expectations, so that I don't wonder whether it worked.

- **Given** a 200 response, **When** success renders (`contact-form.tsx:46`), **Then** focus moves to the success heading (**already satisfied** — `contact-form.tsx:19`).
- **Given** the success state, **When** it renders, **Then** it states an expected response window (e.g. "within two business days").
- **Given** a successful submission, **When** it is processed, **Then** an automated acknowledgement email is sent to the address supplied.
- **Given** the success state, **When** it renders, **Then** it offers a next action (read the work, book a call).

---

**US-CONV-05 — Provide a hiring-track conversion path** · **M**
> As a **recruiter or hiring manager**, I want a contact path that isn't a client-qualification form, so that I can reach out about a role.

- **Given** `/contact` (`contact/page.tsx:7`), **When** it renders, **Then** an option distinguishes "hiring enquiry" from "project review".
- **Given** the `offer` dropdown (`contact-form.tsx:49`), **When** the enquiry is about employment, **Then** the two required essay fields ("What workflow needs attention?" / "What outcome?") are not imposed.
- **Given** any page, **When** a recruiter looks for a CV, **Then** a download link is reachable in ≤ 2 clicks. *(Depends on US-CRED-04.)*

---

**US-CONV-06 — Offer a low-commitment follow action** · **S**
> As a **peer developer**, I want to follow or star something without filling a form, so that a 20-second visit can still convert.

- **Given** any page, **When** the footer renders (`site-shell.tsx:21`), **Then** GitHub / LinkedIn / X links are present. *(Shares acceptance with US-CRED-04.)*
- **Given** a case study, **When** a public repo exists, **Then** a direct repo link renders on the card.
- **Given** an RSS/writing surface [ASSUMPTION: none exists today], **When** a visitor wants updates, **Then** a subscribe affordance is present.

---

**US-CONV-07 — Keep anti-spam invisible to real users** · **S**
> As a **legitimate visitor**, I want spam protection that never blocks me, so that submission stays frictionless.

- **Given** the honeypot field (`contact-form.tsx:49`), **When** it renders, **Then** it is visually hidden and `tabIndex={-1}` (**already satisfied** — `.honeypot` at `globals.css:52`).
- **Given** a filled honeypot, **When** the API processes it (`route.ts:25`), **Then** it returns `{ok:true}` without forwarding (**already satisfied** — silent discard, correct pattern).
- **Given** the rate limiter (`route.ts:5-16`), **When** the app runs on serverless with multiple instances, **Then** limits are enforced in shared state — the current `Map` is **per-process in-memory** and resets on cold start, so the 5-per-15-minutes cap is not reliably enforced in production.
- **Given** a rate-limited user, **When** they retry, **Then** the 429 copy explains the wait (`route.ts:21`).

---

### Epic E — Accessibility & Performance (`US-A11Y-*`)

---

**US-A11Y-01 — Convey filter state to assistive technology** · **M**
> As a **screen-reader user browsing work**, I want to hear which filter is active, so that I can navigate the grid.

- **Given** a filter button (`work-grid.tsx:13`), **When** it is active, **Then** `aria-pressed="true"`; inactive buttons expose `aria-pressed="false"`. Verified: **zero** `aria-pressed` in `src/`; state is currently CSS-only via `.selected` (`globals.css:30`).
- **Given** the filter group, **When** it renders, **Then** it is labelled (**already satisfied** — `role="group" aria-label="Filter work by classification"`, `work-grid.tsx:13`).
- **Given** a filter change, **When** the count updates, **Then** it is announced politely (**already satisfied** — `aria-live="polite"`, `work-grid.tsx:13`).
- **Given** the `.selected` style (`globals.css:30`), **When** rendered in forced-colors mode, **Then** the active state remains perceivable without relying on `background: var(--accent)` alone.

---

**US-A11Y-02 — Mark the current page in navigation** · **S**
> As a **screen-reader or keyboard user**, I want the active nav item identified, so that I know where I am.

- **Given** the desktop nav (`site-shell.tsx:19`), **When** the current route matches an item (`site-shell.tsx:11`), **Then** that link carries `aria-current="page"`. Verified: **zero** `aria-current` in `src/`.
- **Given** the mobile panel nav (`site-shell.tsx:18`), **Then** the same applies.
- **Given** the active item, **When** rendered, **Then** it is visually distinct as well as programmatically marked.

---

**US-A11Y-03 — Maintain keyboard-operable, focus-visible navigation** · **M**
> As a **keyboard-only user**, I want every interactive element reachable with a visible focus ring, so that I can use the site without a mouse.

- **Given** any focusable element, **When** focused via keyboard, **Then** a 3px outline with 3px offset renders (**already satisfied** — `globals.css:11`).
- **Given** page load, **When** Tab is pressed once, **Then** the skip link appears and targets `#main-content` (**already satisfied** — `layout.tsx:30`, `globals.css:13-14`).
- **Given** the mobile dialog (`site-shell.tsx:18`), **When** it opens, **Then** focus moves inside, Tab cycles, Shift+Tab reverse-cycles, Escape closes, body scroll locks, and focus returns to the trigger (**all already satisfied** — `site-shell.tsx:17`).
- **Given** the theme `<select>` (`site-shell.tsx:13`), **When** focused, **Then** it is operable by keyboard and labelled (**already satisfied** — `sr-only` span + `aria-label`).

---

**US-A11Y-04 — Respect reduced-motion and colour-contrast requirements** · **M**
> As a **user with vestibular sensitivity or low vision**, I want motion suppressed and text legible, so that the site is usable and comfortable.

- **Given** `prefers-reduced-motion: reduce`, **When** the page renders, **Then** transitions, animations, and smooth scrolling are neutralised (**already satisfied** — `globals.css:33`; note `html { scroll-behavior: smooth }` at `globals.css:6` is correctly overridden there).
- **Given** the light palette (`globals.css:56`: `--text:#11110f` on `--bg:#faf8f2`) and dark palette (`globals.css:57`: `#faf8f2` on `#11110f`), **When** contrast is measured, **Then** body text meets WCAG AA (both pass comfortably; `--muted:#67645d` on `#faf8f2` is the one to verify against 4.5:1).
- **Given** the hero (`globals.css:66`), **When** `#faf8f2` text renders over the scrim gradient at its lightest stop (`rgba(17,17,15,.1)` at 78%), **Then** contrast is verified at 375px, 768px, and 1440px — the scrim is directional (`90deg`) and the mobile override at `globals.css:70` changes the stops, so this needs per-breakpoint checking.
- **Given** motion is restored via US-DISC-05, **When** any `framer-motion` component renders, **Then** it honours `useReducedMotion()`.

---

**US-A11Y-05 — Meet touch-target minimums throughout** · **S**
> As a **mobile user**, I want tap targets large enough to hit reliably, so that I don't mis-tap.

- **Given** the "correction sprint" rules (`globals.css:35-53`), **When** the wordmark, nav links, footer links, FAQ summaries, text CTAs, and error-summary buttons render, **Then** each is ≥ 2.75rem tall (**already satisfied**).
- **Given** the filter buttons (`globals.css:30`), **When** rendered, **Then** `min-height: 2.75rem` applies (**already satisfied**) **and** horizontal padding gives ≥ 44px width for short labels like "All work".
- **Given** `.button { width: 100% }` on ≤ 767px (`globals.css:32`), **When** form controls render, **Then** the submit control is full-width (**already satisfied**).
- **Given** any two adjacent targets, **When** they render at 375px, **Then** ≥ 8px separates them (`.filters { gap: .5rem }` at `globals.css:30` yields 8px — **satisfied**).

---

**US-A11Y-06 — Hold Core Web Vitals on mobile** · **S**
> As a **mobile visitor on a slow connection**, I want the page usable quickly, so that I don't abandon during load.

- **Given** a Fast 3G throttle at 375px, **When** `/` loads, **Then** LCP ≤ 2.5s. The LCP element is the hero WebP (`page.tsx:12`, `priority`, `fill`, `sizes="100vw"`) — correctly prioritised, but `sizes="100vw"` on a `min-height: 40rem` mobile hero requests a large asset.
- **Given** the theme script (`layout.tsx:20`), **When** the page paints, **Then** no theme flash occurs (**already satisfied** — synchronous, pre-paint, `try/catch`-wrapped).
- **Given** three Google font families (`layout.tsx:8-10`: Geist, Newsreader, Geist_Mono), **When** the page loads, **Then** their combined weight is audited and unused weights dropped.
- **Given** the hero, **When** it renders, **Then** CLS ≤ 0.1 (`fill` + a fixed `min-height` container makes this likely — **[ASSUMPTION]**, unmeasured).
- **Given** US-DISC-05 removes `framer-motion` and `@formspree/react`, **When** the bundle is rebuilt, **Then** the JS payload measurably decreases.

---

**US-A11Y-07 — Keep the document outline and landmarks sound** · **S**
> As a **screen-reader user**, I want a correct heading and landmark structure, so that I can navigate by structure.

- **Given** any page, **When** the DOM renders, **Then** exactly one `<h1>` exists (verify `/`: the hero h1 at `page.tsx:12` — but `work-grid.tsx:12`'s empty state uses `<h2>` and `work-grid.tsx:13`'s cards use `<h2>`, which is correct; `/work` has an `<h1>` at `work/page.tsx:5`, so `<WorkGrid>` on `/` nests `<h2>`s under `page.tsx:15`'s `<h2>` — **audit needed**).
- **Given** any page, **When** landmarks are enumerated, **Then** `header`, `main` (`layout.tsx:30`), and `footer` are present and unique (**already satisfied**).
- **Given** the two footer navs (`site-shell.tsx:21`), **When** they render, **Then** each has a distinct `aria-label` (**already satisfied** — "Footer navigation" / "Footer secondary navigation").
- **Given** decorative imagery, **When** it renders, **Then** `alt=""` is used (**already satisfied** — hero poster at `page.tsx:12`, reverse brand mark at `site-shell.tsx:12`).

---

### Epic F — Content Maintenance (`US-MAINT-*`)

---

**US-MAINT-01 — Consolidate the CSS token layers** · **S**
> As the **site owner**, I want one authoritative token set, so that a colour change doesn't silently fail.

- **Given** `globals.css`, **When** `:root` blocks are counted, **Then** there is **one** light and **one** dark block. Currently there are **two of each**: the original teal/navy system at `globals.css:3-4` (`--accent:#087e7a`) and the redesign paper/ink/red system at `globals.css:56-57` (`--accent:#e5432f`), which wins purely on source order.
- **Given** the file, **When** it is read, **Then** the three stacked comment-delimited layers (base `:1-33`, "Correction sprint" `:35-53`, "Agency redesign handoff" `:55-70`) are merged, with the six media queries deduplicated into breakpoint-ordered blocks.
- **Given** the dead selectors, **When** the merge runs, **Then** rules targeting removed orphan components are dropped. *(Depends on US-DISC-05.)*

---

**US-MAINT-02 — Establish one content source of truth** · **M**
> As the **site owner**, I want a single content module, so that I never edit the wrong file.

- **Given** `src/lib/content.ts` is live and `src/lib/data.ts` (381 lines) is reachable only from orphans, **When** the consolidation runs, **Then** exactly one content module remains.
- **Given** any content edit, **When** it is made, **Then** it changes rendered output — currently editing `data.ts` changes **nothing** on any route.
- **Given** the offer `<option>` list is hardcoded in `contact-form.tsx:49` while offer names live in `content.ts:50-79`, **When** an offer is renamed, **Then** the dropdown updates automatically. Both currently agree on all four names, but the coupling is manual and will silently drift.

---

**US-MAINT-03 — Guard the publication contract with tests** · **S**
> As the **site owner**, I want automated checks on the evidence gate, so that unverified work can never ship.

- **Given** the repo, **When** `npm test` is run, **Then** a suite executes (`package.json` currently defines only `dev`, `build`, `start`, `lint`).
- **Given** a fixture with `proofState: "unverified"`, **When** the gate at `content.ts:43-48` runs, **Then** it is excluded.
- **Given** a fixture with `screenshotPermission: "pending"`, **Then** it is excluded.
- **Given** a fully-approved fixture, **Then** it is included and renders on `/work`.
- **Given** CI, **When** a PR is opened, **Then** lint, build, and the gate tests must pass.

---

**US-MAINT-04 — Keep documentation synchronised with the build** · **S**
> As a **future maintainer (or agent)**, I want docs that describe the current build, so that I don't act on a stale mental model.

- **Given** `README.md`, **When** read, **Then** its project structure matches the live tree — it currently documents `project-card.tsx`, `hero.tsx`, `tech-stack.tsx`, and `data.ts` as the architecture and describes a violet/cyan `#09090b` design system that no longer exists.
- **Given** `docs/agency-rebuild/progress.md`, **When** a release ships, **Then** an entry is appended (**pattern already in place** — entries for 2026-08-09 and 2026-08-11).
- **Given** `docs/agency-rebuild/decisions.md` release blockers (Q-02/Q-03 case-study permissions, Q-04 contact provider, Q-06 founder approval), **When** each is resolved, **Then** the log is updated and the corresponding story is unblocked.

---

**US-MAINT-05 — Make adding a case study a low-friction operation** · **C**
> As the **site owner**, I want a fast, safe path to publish new work, so that the portfolio doesn't go stale.

- **Given** the `CaseStudy` contract (`content.ts:14-35`), **When** a new record is added, **Then** TypeScript enforces all 18 required fields at compile time (**already satisfied**).
- **Given** a new record, **When** `npm run build` runs, **Then** its static route is generated automatically (`work/[slug]/page.tsx:6`) (**already satisfied**).
- **Given** the repo, **When** a maintainer adds work, **Then** a documented template or scaffold exists showing a complete filled example (none currently — the array is empty, so there is no worked reference).

---

## 4. Journey Friction Log

Every row was verified in the working tree. Severity reflects impact on the persona journeys in §2.

| ID | Friction (verified) | Evidence | Persona(s) | Journey stage | Severity | Resolved by |
|---|---|---|---|---|---|---|
| **FR-01** | **Zero published case studies.** `caseStudies` is an empty array, so `publicCaseStudies` is empty and `WorkGrid` takes its empty-state early return on every render of both `/` and `/work`. The filter row and results counter are unreachable code. | `src/lib/content.ts:41`, `:43-48`; `src/components/work-grid.tsx:12` | P1, P2, P3, P4 | Evaluate | **Critical** | US-WORK-01 |
| **FR-02** | **All `/work/*` deep links 404.** `dynamicParams = false` plus `generateStaticParams` over an empty array means no detail route is generated and no fallback exists. No `not-found.tsx` in `src/app/`. | `src/app/work/[slug]/page.tsx:5-6` | P2, P4 | Deep-dive | **Critical** | US-WORK-01, US-WORK-05 |
| **FR-03** | **No contact channel in an unconfigured environment.** `enabled` requires both `CONTACT_PROVIDER === "formspree"` and `FORMSPREE_FORM_ID`; the `mailto:` fallback requires a *third* var. No `.env.example` exists, so the default state has no form, no email, no social link. | `src/lib/contact-config.ts:5-13`; `src/app/contact/page.tsx:7`; `src/app/api/contact/route.ts:20`; repo root listing | P3 | Convert | **Critical** | US-CONV-01 |
| **FR-04** | **No external verification links anywhere.** No GitHub, LinkedIn, or X in any live component. `public/resume.docx` exists on disk but is linked from nowhere in `src/`. JSON-LD `Person` has no `sameAs`. | `src/components/site-shell.tsx:21`; `src/app/layout.tsx:25`; `public/` listing | P1, P2, P4 | Convert / Follow-up | **Critical** | US-CRED-04, US-CONV-06 |
| **FR-05** | **15 of 19 components are orphaned dead code**, with no CSS support in `globals.css`, and `src/lib/data.ts` (381 lines) is reachable only from them. `framer-motion` (14 orphan-only importers) and `@formspree/react` (never imported) ship as unused dependencies. | Import-graph analysis of `src/**`; `globals.css` selector audit; `package.json` | Owner | Maintenance | **High** | US-DISC-05, US-MAINT-02 |
| **FR-06** | **Filter active state is CSS-only.** The `selected` class is the sole indicator; no `aria-pressed` exists anywhere in `src/`. Screen-reader and forced-colors users cannot perceive which filter is on. *(Latent until FR-01 is fixed.)* | `src/components/work-grid.tsx:13`; `src/app/globals.css:30`; grep: 0 hits for `aria-pressed` | All | Evaluate | **High** | US-A11Y-01 |
| **FR-07** | **No `aria-current` on navigation.** Neither the desktop nav nor the mobile panel marks the active route. | `src/components/site-shell.tsx:11,18,19`; grep: 0 hits for `aria-current` | All | Scan | **Medium** | US-A11Y-02 |
| **FR-08** | **Site identity is a studio, not a person.** Title, description, OG image, and hero all lead with "Kepler Dev"; the person is named only in JSON-LD and on `/mahmoud`. | `src/app/layout.tsx:14-15`; `src/app/opengraph-image.tsx:4`; `src/app/page.tsx:12` | P1, P2, P4 | Landing | **High** | US-DISC-01, US-DISC-04 |
| **FR-09** | **Mobile hero consumes >1 viewport before any content.** `min-height: 40rem` (≈640px) at ≤767px, with the h1 capped at `max-width: 10ch` forcing a ~5-line wrap of a 7-word headline. | `src/app/globals.css:70` | P3, P4 | Landing | **High** | US-DISC-02 |
| **FR-10** | **Two abstract prose sections sit between the hero and the only proof section.** | `src/app/page.tsx:13`, `:14` vs `:15` | P1, P4 | Scan | **Medium** | US-DISC-06 |
| **FR-11** | **Type fields captured but never rendered.** `technicalChallenges`, `technologies`, `media`, `lastVerified`, `targetUser`, and `solution` all exist on `CaseStudy` but the detail template renders only Context / Role and team / What was delivered / Evidence. The card renders no `technologies`. | `src/lib/content.ts:14-35` vs `src/app/work/[slug]/page.tsx:8` and `src/components/work-grid.tsx:13` | P1, P2 | Deep-dive | **High** | US-WORK-02, US-WORK-07, US-CRED-02 |
| **FR-12** | **Empty state's only escape is a sales CTA.** Both the no-work and no-match states route exclusively to "Request a project review" / "private capabilities review" — wrong for a recruiter or peer developer. | `src/components/work-grid.tsx:12,13` | P1, P2, P4 | Evaluate | **High** | US-WORK-06, US-CONV-05 |
| **FR-13** | **High-effort first contact.** 5 required fields including two free-text areas ("What workflow needs attention?" / "What would a useful outcome look like?"), and no draft persistence — a reload loses all input. | `src/lib/contact.ts:21-25`; `src/components/contact-form.tsx:10,49` | P3 | Convert | **Medium** | US-CONV-02 |
| **FR-14** | **Rate limiter is per-process in-memory.** A module-scope `Map` resets on every cold start and is not shared across serverless instances, so the 5-per-15-minutes cap is not reliably enforced in production. | `src/app/api/contact/route.ts:5-16,21` | Owner | Convert | **Medium** | US-CONV-07 |
| **FR-15** | **Duplicate CSS token systems.** Two full light/dark `:root` palettes coexist (teal/navy `--accent:#087e7a` at `:3-4`; paper/ink/red `--accent:#e5432f` at `:56-57`), resolved only by source order. Three stacked layers and six media queries across one 71-line, ~21KB file. | `src/app/globals.css:3-4`, `:56-57`, `:31-33`, `:69-70` | Owner | Maintenance | **Medium** | US-MAINT-01 |
| **FR-16** | **`README.md` documents a build that no longer exists** — "Systems Engineer Portfolio", `project-card.tsx`, `hero.tsx`, `data.ts`, and a violet/cyan `#09090b` design system. | `README.md` vs live tree | Owner | Maintenance | **Medium** | US-MAINT-04 |
| **FR-17** | **No test suite.** `package.json` scripts are `dev`, `build`, `start`, `lint` only — nothing guards the publication gate that the entire credibility model rests on. | `package.json` | Owner | Maintenance | **Medium** | US-MAINT-03 |
| **FR-18** | **No custom analytics events.** `@vercel/analytics` provides pageviews only; no funnel step in §5 is currently measurable. | `src/app/layout.tsx:3,30`; grep: no `track(` calls in `src/` | Owner | All | **Medium** | §5 instrumentation |
| **FR-19** | **`/mahmoud` route vs "About" label mismatch**, and the page carries no verifiable specifics — no dates, employers, or education, only capability prose. | `src/components/site-shell.tsx:11`; `src/app/mahmoud/page.tsx:6,7` | P1, P3 | Deep-dive | **Low** | US-CRED-03 |
| **FR-20** | **Possible heading-hierarchy issue on `/`.** `page.tsx:15` renders an `<h2>` section heading, and `<WorkGrid>` renders its own `<h2>`s inside it — siblings where nesting is implied. Needs an axe/HTML-outline audit once FR-01 is fixed. | `src/app/page.tsx:15`; `src/components/work-grid.tsx:12,13` | A11y | Scan | **Low** | US-A11Y-07 |

### Sequencing

**FR-01 is the keystone.** FR-02, FR-06, FR-11, FR-12, and FR-20 are all either invisible or unfixable until case-study records exist. FR-03 and FR-04 are independent and are the cheapest high-value fixes in the table — an `.env.example`, a footer link row, and a linked PDF CV would close three of the four Critical rows in under an hour.

---

## 5. Success Metrics

**Instrumentation baseline (verified):** the site ships `@vercel/analytics` (`layout.tsx:3,30`), which gives pageviews and referrers only. There is **not a single custom event** in `src/`. Every metric below therefore requires new instrumentation. The lightest path that fits the current stack:

```
import { track } from "@vercel/analytics";   // already a dependency
```

Fire named events from the four live components. No new dependency is needed. **[ASSUMPTION]** — targets are industry-typical starting points, not derived from this site's history, because no historical funnel data exists.

---

### Epic A — Discovery & First Impression

| Metric | Definition | Instrumentation | Target |
|---|---|---|---|
| **Mobile bounce rate** | Single-pageview sessions at < 768px | Vercel Analytics device segment (available today) | < 55% |
| **Hero pass-through** | Sessions scrolling past the hero | `IntersectionObserver` on the `03 — Selected work` section (`page.tsx:15`); `track('section_view', {id:'work'})` | > 60% mobile |
| **Identity recognition** | Sessions reaching `/mahmoud` or a CV download | Route pageview + `track('cv_download')` on the new CV link | > 15% of P1-shaped sessions |
| **Time to first meaningful scroll** | Ms from load to first scroll past 100vh | `performance.now()` at the first scroll event past threshold | Median < 8s |

---

### Epic B — Work / Projects Browsing

| Metric | Definition | Instrumentation | Target |
|---|---|---|---|
| **Time-to-first-project-open** ⭐ | Ms from landing to first `/work/<slug>` navigation | Timestamp on `/` mount; `track('case_study_open', {slug, ms})` on the card link in `work-grid.tsx:13` | Median < 45s |
| **Work-index → detail CTR** | Sessions on `/work` that open ≥ 1 study | `case_study_open` count ÷ `/work` pageviews | > 40% |
| **Filter engagement** | Sessions using ≥ 1 filter | `track('work_filter', {classification})` in the `onClick` at `work-grid.tsx:13` | > 20% |
| **Case-study read depth** | Sessions scrolling to the Evidence section | `IntersectionObserver` on the Evidence `<section>` (`work/[slug]/page.tsx:8`) | > 50% |
| **Empty-state exposure** ⭐ | Sessions that see the `work-grid.tsx:12` early return | `track('work_empty_state')` in that branch | **0%** once US-WORK-01 ships |
| **Dead deep-link rate** | 404s on `/work/*` | Server logs / Vercel 404 monitoring | < 0.1% of sessions |

---

### Epic C — Credibility & Proof

| Metric | Definition | Instrumentation | Target |
|---|---|---|---|
| **External verification clicks** | Clicks on GitHub / LinkedIn / repo links | `track('external_link', {destination})` on the new footer links (`site-shell.tsx:21`) | > 12% of sessions |
| **CV download rate** | Downloads ÷ sessions | `track('cv_download')` | > 8% of P1-shaped sessions |
| **Founder-page reach** | `/mahmoud` pageviews ÷ total sessions | Vercel Analytics route report (available today) | > 20% |
| **Evidence-label coverage** | % of published result claims carrying `verified-public` | Build-time assertion over `content.ts` | > 60% |

---

### Epic D — Contact & Conversion

| Metric | Definition | Instrumentation | Target |
|---|---|---|---|
| **Contact-form completion rate** ⭐ | Successful submissions ÷ form views | `track('contact_view')` on mount + `track('contact_success')` at `contact-form.tsx:39` | > 25% |
| **Form abandonment point** | Last field touched before exit | `track('field_blur', {field})` on each `update()` call (`contact-form.tsx:20`) | Identify the top-2 drop fields |
| **Validation-error rate** | Submissions blocked client-side ÷ attempts | `track('contact_validation_error', {fields})` at `contact-form.tsx:28` | < 20% |
| **Delivery-failure rate** | 502/503/429 ÷ valid submissions | Log the status in `api/contact/route.ts:20,21,36,39` | < 1% |
| **Contact-unavailable exposure** ⭐ | Sessions seeing the disabled panel | `track('contact_unavailable')` in the `contact/page.tsx:7` else-branch | **0%** in production |
| **Offer deep-link attribution** | Submissions arriving via `/contact?offer=` | Read `searchParams` (`contact/page.tsx:7`) into the submission payload | > 40% of submissions |
| **Enquiry quality** | % of submissions that become a real conversation | Manual tagging at the destination inbox | > 50% |

---

### Epic E — Accessibility & Performance

| Metric | Definition | Instrumentation | Target |
|---|---|---|---|
| **Automated a11y violations** | axe-core serious + critical, per route | `@axe-core/cli` in CI across `/`, `/work`, `/mahmoud`, `/contact` | **0** |
| **Keyboard-only task completion** | Manual: land → open a study → submit contact, keyboard only | Quarterly manual pass; script the route list | 100% |
| **Mobile LCP** | p75 at 375px | Vercel Speed Insights (add package) or CrUX | ≤ 2.5s |
| **CLS** | p75 all devices | Same | ≤ 0.1 |
| **JS transferred** | Initial route payload | `next build` output, tracked per release | ≤ 120KB gzipped |
| **Screen-reader filter comprehension** | Users correctly identifying the active filter | Moderated test, 5 AT users, post-US-A11Y-01 | 5/5 |

---

### Epic F — Content Maintenance

| Metric | Definition | Instrumentation | Target |
|---|---|---|---|
| **Published case-study count** ⭐ | `publicCaseStudies.length` | Build-time log / CI assertion | ≥ 3, then ≥ 1 added per quarter |
| **Content freshness** | Days since the newest `lastVerified` (`content.ts:34`) | Build-time computation; warn past 180 days | < 180 days |
| **Orphaned-component count** | Components with zero importers | CI import-graph check (e.g. `knip` or `ts-prune`) | **0** |
| **Unused dependencies** | Packages with zero imports | `depcheck` in CI | **0** |
| **Gate test coverage** | Branches of `content.ts:43-48` covered | Coverage report once US-MAINT-03 lands | 100% |
| **Doc drift** | Release entries missing from `progress.md` | PR checklist item | 0 |

---

### Suggested measurement sequence

1. **Week 1 — instrument before changing anything.** Add the `track()` calls above. `work_empty_state` and `contact_unavailable` alone will quantify FR-01 and FR-03 in real traffic and settle any debate about priority.
2. **Week 2–3 — ship the cheap Critical fixes.** `.env.example` + footer profile links + linked PDF CV (US-CONV-01, US-CRED-04). Watch `external_link` and `cv_download` appear from zero.
3. **Week 4+ — publish case studies (US-WORK-01).** Then `time-to-first-project-open` and `work-index → detail CTR` become measurable for the first time, and `work_empty_state` should fall to zero.
4. **Ongoing — re-baseline quarterly.** Re-run the persona journeys in §2 against the live build and update the friction log in §4.

---

## Appendix — Verification notes

**Read in full or analysed programmatically:** `src/app/page.tsx`, `layout.tsx`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `globals.css`, `contact/page.tsx`, `mahmoud/page.tsx`, `work/page.tsx`, `work/[slug]/page.tsx`, `api/contact/route.ts`; `src/lib/content.ts`, `contact.ts`, `contact-config.ts`; `src/components/site-shell.tsx`, `theme-provider.tsx`, `work-grid.tsx`, `contact-form.tsx`; `package.json`, `next.config.ts`, `README.md`; `docs/agency-rebuild/{progress,decisions,sessions/handoff}.md`.

**Analysed via import graph, not read line-by-line:** the 15 orphaned components. Their orphan status was established by (a) zero matches for their `@/components/<name>` import path across `src/**`, and (b) absence of their class selectors from `globals.css`.

**Explicitly marked assumptions:** persona traffic shares; the 70% mobile figure for P4; all numeric metric targets; CLS estimate; the absence of an RSS/writing surface.

**Not verified (would need a running build):** rendered contrast ratios at each breakpoint, actual Core Web Vitals, real screen-reader behaviour, and the visual result of any state that depends on non-empty `caseStudies` — since no such state can currently be produced.

**No source files were modified in producing this document.**
