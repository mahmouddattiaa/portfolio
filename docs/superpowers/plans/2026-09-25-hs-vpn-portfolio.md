# HS VPN Portfolio Feature and Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish an evidence-backed HS VPN client case study on `/work/hs-vpn`, a card on `/work`, and a screenshot-led homepage feature beside the existing fuel-station work.

**Architecture:** Keep `src/lib/content.ts` as the public case-study index and publication gate. Add a dedicated HS VPN article within the existing detail-page shell, and a focused homepage component after the fuel-station feature; both use the same two approved historical iOS captures and explicit platform labels.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, existing CSS modules/files, `next/image`, Node 24 for focused data assertions.

**Spec:** `docs/superpowers/specs/2026-09-25-hs-vpn-portfolio-design.md`

## Global Constraints

- The HS VPN source at `/run/media/kepler/Main Drive/Personal Project/HS VPN` is read-only. Do not change `.env.local`, the publication gate, existing loyalty claims, or the fuel-station homepage feature.
- Client work with publishing rights; credit Mahmoud as the end-to-end lead without implying sole authorship.
- Android is publicly available on Google Play. iOS reached TestFlight only. The approved images are older iOS captures and need visible captions on every surface.
- The only numeric public outcome in scope is **10K+ Google Play downloads, checked 25 September 2026**. Do not infer active users, speed, connection success, revenue, retention, or current live-node count.
- No server IPs, keys, private data, absolute privacy claims, unsupported performance figures, or future transport claims in new copy or chosen media. Do not use source screenshots `03`, `04`, `05`, `06`, `08`, or `09`.
- Keep the existing loyalty case study first on `/work` and on the homepage. HS VPN follows it. No CMS, product dependency, or unrelated refactor.
- The approved Hub case-study task is `task_bfbbe77faf924ea495714b2600646067` (status `ready`). The homepage task is `task_b10d9c1abc1e4b0bbda283f54a481c7d` (status `proposed`, dependent on the case-study task). Only Mahmoud may approve/requeue Hub work. Do not edit the homepage-owned paths until that task is approved and properly launched or claimed through an authorized Hub session. The existing orchestrator's manually resumed session must not `task claim` because it has no lease renewal.
- Do not push or merge without Mahmoud's instruction. Code completion requires `npm run lint`, `npm run build`, a source-to-claim map, and mobile/desktop screenshots of `/`, `/work`, and `/work/hs-vpn`.

## Review Focus

1. **Unpublished or unknown slug:** `/work/<unknown>` still yields not-found; the new slug is present in `generateStaticParams()`. Task 2 checks both routes.
2. **Broken media reference:** both referenced images exist under `public/projects/HS-VPN/` and render at native portrait ratio. Task 1 asserts files exist; Task 4 inspects them in browser.
3. **Platform ambiguity:** every HS VPN screenshot is labeled historical iOS; the Android release and iOS TestFlight text are visibly separate. Tasks 2 and 3 check rendered pages.
4. **Mobile overflow and inaccessible gallery:** at 390px, the page itself has no horizontal overflow, screenshots remain readable, and links work with keyboard focus. Task 4 checks this on all three surfaces.
5. **Unsupported claims leaking through copy or images:** new text and selected images do not contain unverified speeds, privacy absolutes, node/IP details, or a public iOS release claim. Tasks 1 and 4 compare them to the source-to-claim map and inspected images.

---

## File map and task boundary

| File | Responsibility | Hub task |
| --- | --- | --- |
| `public/projects/HS-VPN/connected-ios.jpg`, `statistics-ios.jpg` | Copies of the two approved genuine source captures | Case study |
| `src/lib/content.ts` | HS VPN draft record, then public index entry when its article works | Case study |
| `src/components/case-study/hs-vpn-content.ts` | Article copy, rail IDs, decisions, and connection steps | Case study |
| `src/components/case-study/hs-vpn-article.tsx` | HS VPN article only | Case study |
| `src/app/work/[slug]/page.tsx` | Chooses the proper article and rail by slug | Case study |
| `src/app/case-study.css` | Scoped HS VPN detail-page styles | Case study |
| `src/components/home/hs-vpn-feature.tsx` | HS VPN homepage visual feature | Homepage |
| `src/app/page.tsx` | Inserts the HS VPN feature after the fuel-station block | Homepage |
| `src/content/home/en.ts`, `types.ts` | Homepage copy in existing localization pattern | Homepage |
| `src/app/home-v2.css` | Scoped homepage feature and responsive gallery styles | Homepage |

`src/components/work-grid.tsx` should need no change: it already renders every `publicCaseStudies` record and makes the first record the lead card. If a demonstrated defect requires a change, keep it inside the case-study task's owned path and add a focused verification step. No new test framework is needed; use the focused assertions below plus the project's required build, lint, and browser checks.

### Task 1: Prepare the HS VPN draft record and approved media

**Files:**
- Create: `public/projects/HS-VPN/connected-ios.jpg`
- Create: `public/projects/HS-VPN/statistics-ios.jpg`
- Modify: `src/lib/content.ts`

**Interfaces:**
- Consumes: existing `CaseStudy` interface and `publicCaseStudies` filter in `src/lib/content.ts`.
- Produces: a draft `CaseStudy` with `slug: "hs-vpn"`, `media[0].src === "/projects/HS-VPN/connected-ios.jpg"`, and `media[1].src === "/projects/HS-VPN/statistics-ios.jpg"`. Task 2 publishes the record when its article works; Task 3 reads it after publication.

- [ ] **Step 1: Confirm a Hub-launched implementation session owns the approved case-study task.** Read `task show --id task_bfbbe77faf924ea495714b2600646067`; proceed only under its assigned implementation session and worktree. Keep the spec commit `fde2915` in that worktree.
- [ ] **Step 2: Run the red content assertion.** From the worktree, run this exact focused check. It must fail because `hs-vpn` is absent:

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { caseStudies } from './src/lib/content.ts';
const study = caseStudies.find((item) => item.slug === 'hs-vpn');
assert.ok(study, 'HS VPN draft record must exist');
assert.equal(study.classification, 'client');
assert.equal(study.media.length, 2);
NODE
```

- [ ] **Step 3: Copy only the approved screenshots.** Preserve original pixels and check their dimensions. A filesystem-capable Node tool can run the following code with the worktree as the destination root:

```js
const fs = require('node:fs');
const path = require('node:path');
const source = '/run/media/kepler/Main Drive/Personal Project/HS VPN/assets/images/appstore_screenshots';
const destination = 'public/projects/HS-VPN';
fs.mkdirSync(destination, { recursive: true });
fs.copyFileSync(path.join(source, 'screenshot_01.jpg'), path.join(destination, 'connected-ios.jpg'));
fs.copyFileSync(path.join(source, 'screenshot_02.jpg'), path.join(destination, 'statistics-ios.jpg'));
```

- [ ] **Step 4: Add the HS VPN `CaseStudy` after the loyalty record.** Keep it `draft` until Task 2 adds the live article, so `/work` never links to a missing page. Use the exact proof fields below; retain every existing loyalty field unchanged. Copy is concise here because the article in Task 2 supplies depth.

```ts
{
  slug: "hs-vpn",
  title: "HS VPN",
  publicTitle: "HS VPN",
  classification: "client",
  productionStatus: "production", // Android production; iOS TestFlight only
  publicationStatus: "draft", // Task 2 changes this to public with the working article
  targetUser: "People who need a dependable VPN connection on restrictive networks.",
  problem: "On restrictive networks, starting a VPN tunnel does not always mean a protected connection works. HS VPN makes connection state visible and waits for handshake evidence before showing a protected session.",
  engagementContext: "Client mobile product. Android is published on Google Play; iOS reached TestFlight.",
  mahmoudRole: "End-to-end product and engineering lead: idea, visual design, architecture, infrastructure, and store delivery.",
  teamContext: "Mahmoud led the product end to end with other contributors involved in the repository.",
  scope: ["Flutter mobile app", "Android native VPN tunnel", "iOS packet-tunnel implementation", "Server registrar and configuration control plane"],
  solution: "A simple location-and-connect experience backed by catalog fallback, peer registration, a native tunnel, and a confirmed handshake before protected status appears.",
  technicalChallenges: ["Keep connection status tied to handshake evidence.", "Recover when remote catalog data is unavailable.", "Coordinate Flutter orchestration with native VPN lifecycle and server registration."],
  results: [
    { claim: "Android is publicly available on Google Play.", proofState: "verified-public", evidenceRef: "Google Play listing, checked 2026-09-25." },
    { claim: "Google Play displayed 10K+ downloads on 25 September 2026.", proofState: "verified-public", evidenceRef: "Google Play listing, checked 2026-09-25; dated distribution count only." },
    { claim: "The iOS build reached TestFlight, with no public App Store release confirmed.", proofState: "verified-private", evidenceRef: "TestFlight session report and Mahmoud confirmation, 2026-09-25." },
  ],
  technologies: ["Flutter", "Kotlin", "Swift", "WireGuard", "FastAPI", "Firebase Remote Config"],
  media: [
    { src: "/projects/HS-VPN/connected-ios.jpg", alt: "Earlier iOS HS VPN screen showing the connected dashboard and primary connection control.", permissionRef: "Mahmoud approval, Hub decision_508fb6540b344bf79319ee09ba46b873" },
    { src: "/projects/HS-VPN/statistics-ios.jpg", alt: "Earlier iOS HS VPN statistics screen showing session duration and traffic panels.", permissionRef: "Mahmoud approval, Hub decision_508fb6540b344bf79319ee09ba46b873" },
  ],
  clientNamePermission: "approved",
  screenshotPermission: "approved",
  lastVerified: "2026-09-25",
},
```

- [ ] **Step 5: Run the green content and media assertion.** This must pass, including the draft publication gate and physical file references:

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { caseStudies, publicCaseStudies } from './src/lib/content.ts';
const study = caseStudies.find((item) => item.slug === 'hs-vpn');
assert.ok(study);
assert.equal(study.classification, 'client');
assert.equal(study.media.length, 2);
assert.ok(study.results.every((result) => result.proofState !== 'unverified'));
assert.ok(study.media.every((item) => existsSync(`public${item.src}`)));
assert.ok(!publicCaseStudies.some((item) => item.slug === 'hs-vpn'), 'draft must remain unpublished');
assert.equal(publicCaseStudies[0]?.slug, 'loyalty-operations-platform');
NODE
```

- [ ] **Step 6: Verify and commit the unpublished preparation.** Run `npm run lint` and `npm run build`; inspect `/work` to confirm there is no HS VPN card while the record is draft. Stage only the two images and `src/lib/content.ts`; commit with a `Co-Authored-By` trailer naming the model. Keep the source-to-claim map with the Hub task evidence.

### Task 2: Add the full HS VPN article in the existing detail shell

**Files:**
- Create: `src/components/case-study/hs-vpn-content.ts`
- Create: `src/components/case-study/hs-vpn-article.tsx`
- Modify: `src/lib/content.ts`
- Modify: `src/app/work/[slug]/page.tsx`
- Modify: `src/app/case-study.css`

**Interfaces:**
- Consumes: draft `CaseStudy` and approved media from Task 1; existing `ContentsRail`, `ThemeGate`, `CaseStudyGrain`, and `CaseStudyArticle`.
- Produces: `HsVpnArticle({ study }: { study: CaseStudy })`, `hsVpnRailSections: RailSection[]`, and `hsVpnVerifiedLabel: string`. The dynamic route selects these only for `slug === "hs-vpn"`.

- [ ] **Step 1: Write the route acceptance checks before editing.** Record the expected path list `['/work/hs-vpn', '/work/loyalty-operations-platform', '/work/not-a-study']`. The first two must render; the last must return not-found after the change. After Task 1, `hs-vpn` is absent from `publicCaseStudies` and `generateStaticParams()`; verify that red behavior before publishing it with the dedicated article.
- [ ] **Step 2: Create the article data module with fixed rail IDs and the source-backed connection sequence.** These exported names are the interface used by the route and component:

```ts
import type { RailSection } from "./contents-rail";

export const hsVpnVerifiedLabel = "Verified 25 September 2026";
export const hsVpnRailSections: RailSection[] = [
  { id: "hsvpn-problem", label: "The problem" },
  { id: "hsvpn-experience", label: "The experience" },
  { id: "hsvpn-role", label: "Mahmoud's role" },
  { id: "hsvpn-connection", label: "A connection" },
  { id: "hsvpn-decisions", label: "Key decisions" },
  { id: "hsvpn-delivery", label: "Delivery" },
];
export const hsVpnConnectionSteps = [
  { title: "Resolve a server catalog", body: "Use Remote Config, a last-known-good cache, or a bundled catalog so an unavailable remote response does not remove every option." },
  { title: "Choose a candidate profile", body: "Order the supported profiles for the device and network; Android can prefer an AmneziaWG-capable option when enabled." },
  { title: "Register the client", body: "Send the client's public key to the selected node's registrar for peer registration and address assignment." },
  { title: "Start the native tunnel", body: "Hand the connection to Android or iOS VPN APIs rather than treating a Flutter button event as a tunnel." },
  { title: "Confirm the handshake", body: "Show Protected only after handshake evidence indicates that the session is working." },
] as const;
export const hsVpnDecisions = [
  { title: "Make the status honest", consequence: "A user sees Protected only after a real handshake, not merely after a service starts.", mechanism: "Connection state waits for native handshake evidence." },
  { title: "Recover the catalog", consequence: "A remote configuration outage need not remove every location.", mechanism: "Remote Config, cached, and bundled catalog layers." },
  { title: "Keep native responsibility clear", consequence: "Product flow can change without bypassing OS tunnel rules.", mechanism: "Flutter orchestrates; Kotlin and Swift own native VPN lifecycle." },
  { title: "Place ads after connection truth", consequence: "Monetization does not define protected status or block a disconnect action.", mechanism: "Connection-aware placement and remote switches." },
] as const;
```

- [ ] **Step 3: Create `HsVpnArticle` with the exact article sections.** Use `next/image` with width `1284`, height `2778`, `sizes="(max-width: 767px) 82vw, 380px"`, and the `study.media` alt text. The component renders: `h1` and project facts; `hsvpn-problem` (restrictive-network problem); `hsvpn-experience` (two images and visible “Earlier iOS app captures” caption); `hsvpn-role` (idea, design, architecture, infra, stores, other contributors); `hsvpn-connection` (ordered `hsVpnConnectionSteps`); `hsvpn-decisions` (decision cards and Android/iOS/registrar architecture text); `hsvpn-delivery` (Android Play, iOS TestFlight, dated 10K+ figure, limitations), then `/work` and `/contact` links. For the image rendering and section IDs, use this shape:

```tsx
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import { hsVpnConnectionSteps, hsVpnDecisions } from "./hs-vpn-content";

export function HsVpnArticle({ study }: { study: CaseStudy }) {
  return <div className="cs-article hsvpn-article">
    <header className="hsvpn-hero">
      <p className="cs-section-eyebrow">Client work · Mobile VPN</p>
      <h1>HS VPN: a connection that earns its Protected state.</h1>
      <p>Mahmoud led the product from the first idea and visual language through architecture, infrastructure, and store delivery.</p>
      <p>Android is on Google Play. The iOS implementation reached TestFlight.</p>
    </header>
    <section id="hsvpn-problem" aria-labelledby="hsvpn-problem-title">
      <h2 id="hsvpn-problem-title">A started tunnel is not yet a working connection.</h2>
      <p>On networks that interfere with ordinary VPN traffic, the app needs more than a successful tap. It needs a usable server profile, native tunnel startup, and handshake evidence before it can show a protected session.</p>
      <p>The practical product problem was to make that state understandable. A reassuring green label would be misleading if the device had started a tunnel service but never exchanged traffic with the selected peer. The experience therefore follows what the connection actually does, including failure and fallback states.</p>
    </section>
    <section id="hsvpn-experience" aria-labelledby="hsvpn-experience-title">
      <h2 id="hsvpn-experience-title">Choose, connect, understand.</h2>
      <p>The main path keeps location choice and the connection control close together. Once connected, the dashboard makes the session state prominent, while a separate statistics view lets someone inspect the session. Those simple screens sit on top of catalog selection, peer registration, and native tunnel work.</p>
      <p>Earlier iOS app captures; these do not depict the current Android release.</p>
      <div className="hsvpn-gallery">{study.media.map((media) => <figure key={media.src}>
        <Image src={media.src} alt={media.alt} width={1284} height={2778} sizes="(max-width: 767px) 82vw, 380px" />
        <figcaption>{media.src.includes("connected") ? "Connected dashboard · earlier iOS capture" : "Session statistics · earlier iOS capture"}</figcaption>
      </figure>)}</div>
    </section>
    <section id="hsvpn-role" aria-labelledby="hsvpn-role-title">
      <h2 id="hsvpn-role-title">From idea to store delivery.</h2>
      <p>{study.mahmoudRole} Other contributors participated in the repository; this case study describes Mahmoud's leadership and decisions.</p>
      <p>His scope crossed the product and operational boundaries: defining the connection experience, shaping the dark visual language, deciding how Flutter and native VPN code would divide responsibilities, designing the registration and configuration path, running the server infrastructure, and moving the mobile builds through store delivery.</p>
      <p>The app is free and ad-supported. Its ad triggers follow confirmed connection events and can be adjusted remotely, so a placement does not become the signal that a user is protected or an obstacle to disconnecting.</p>
    </section>
    <section id="hsvpn-connection" aria-labelledby="hsvpn-connection-title">
      <h2 id="hsvpn-connection-title">What happens after Connect.</h2>
      <ol>{hsVpnConnectionSteps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol>
    </section>
    <section id="hsvpn-decisions" aria-labelledby="hsvpn-decisions-title">
      <h2 id="hsvpn-decisions-title">Decisions behind a trustworthy state.</h2>
      <p>Flutter owns product flow and catalog choice. Native Kotlin and Swift code own tunnel lifecycle. A per-node FastAPI registrar handles peer registration; Remote Config, cache, and bundled data keep the catalog recoverable.</p>
      <p>On Android, the current connection path can use AmneziaWG-oriented operation where enabled to address networks that interfere with ordinary WireGuard. The checked-in iOS implementation uses plain WireGuard through a packet-tunnel extension. The two platforms should therefore be described separately, even though they share product intent and much of the Flutter experience.</p>
      <p>When Remote Config cannot provide a usable catalog, the app can use a last-known-good cached catalog or bundled bootstrap data. Version gates help coordinate an app release with server configuration. These choices keep a remote configuration problem from automatically removing every connection option.</p>
      <div>{hsVpnDecisions.map((decision) => <article key={decision.title}><h3>{decision.title}</h3><p>{decision.consequence}</p><p>{decision.mechanism}</p></article>)}</div>
    </section>
    <section id="hsvpn-delivery" aria-labelledby="hsvpn-delivery-title">
      <h2 id="hsvpn-delivery-title">Where the product stands.</h2>
      <p>Android is publicly listed on Google Play. The listing displayed 10K+ downloads when checked on 25 September 2026; this is a distribution count, not an active-user or success measure.</p>
      <p>iOS reached TestFlight. The reviewed evidence does not establish a public App Store release or measured connection success, speed, revenue, or retention outcomes.</p>
      <p>The visible interaction is one tap. The engineering work is the catalog, registered peer, native tunnel, and confirmed handshake that make the word Protected defensible. The portfolio documents those decisions without exposing server addresses, keys, or operational access details.</p>
      <Link href="/work">All work</Link><Link href="/contact">Discuss a project</Link>
    </section>
  </div>;
}
```

- [ ] **Step 4: Route the slug without changing the loyalty article, then publish the record.** Change the HS VPN record's `publicationStatus` from `draft` to `public` in `src/lib/content.ts` in the same edit as the route switch. Keep `generateStaticParams()` and `generateMetadata()` driven by `publicCaseStudies`. Replace only the current presentation-only not-found branch and selected article/rail with this structure:

```tsx
const isHsVpn = slug === "hs-vpn";
const copy = isHsVpn ? null : getPresentation(slug);
const article = isHsVpn
  ? <HsVpnArticle study={study} />
  : copy
    ? <CaseStudyArticle study={study} copy={copy} />
    : notFound();
const sections = isHsVpn ? hsVpnRailSections : RAIL_SECTIONS;
const verification = isHsVpn ? hsVpnVerifiedLabel : copy!.footerLine.verificationDate;
// Keep the existing page shell and render:
<ContentsRail sections={sections} verification={verification} />
{article}
```

Import `HsVpnArticle`, `hsVpnRailSections`, and `hsVpnVerifiedLabel`; retain the existing theme script, `ThemeGate`, `CaseStudyGrain`, and shell markup. If TypeScript rejects `copy!` under this branch, calculate the verification label through `copy ? copy.footerLine.verificationDate : hsVpnVerifiedLabel` after `article` and never let the non-HS slug bypass `notFound()`.

- [ ] **Step 5: Add only scoped article styles.** Under `.hsvpn-article`, give sections readable vertical rhythm, a max-width text measure, two portrait images side by side on wide screens, and a contained horizontal gallery on narrow screens. Use the existing typography and theme variables. Start from:

```css
.hsvpn-article > section { margin-block-start: clamp(4rem, 7vw, 7rem); }
.hsvpn-article > section > h2 { max-inline-size: 18ch; font-size: clamp(2rem, 4vw, 3.75rem); line-height: 1.08; }
.hsvpn-gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.hsvpn-gallery img { display: block; inline-size: 100%; block-size: auto; }
.hsvpn-gallery figcaption { margin-block-start: .65rem; font-size: .8rem; }
@media (max-width: 767px) { .hsvpn-gallery { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; } .hsvpn-gallery figure { flex: 0 0 min(82vw, 24rem); scroll-snap-align: start; } }
```

- [ ] **Step 6: Run build/lint and inspect `/work` plus both detail routes.** `npm run lint` and `npm run build` must pass. In a browser pointed at this worktree's own dev server, check `/work`, `/work/hs-vpn`, `/work/loyalty-operations-platform`, and `/work/not-a-study`. Confirm the new client card and filter, rail links, image ratio, captions, metadata title, 404 behavior, desktop/mobile layouts, and no newly exposed unsupported claims. Run this focused publication assertion:

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { publicCaseStudies } from './src/lib/content.ts';
assert.equal(publicCaseStudies[0]?.slug, 'loyalty-operations-platform');
const hs = publicCaseStudies.find((item) => item.slug === 'hs-vpn');
assert.ok(hs, 'the working article must now pass the publication gate');
assert.equal(hs.media.length, 2);
assert.equal(hs.screenshotPermission, 'approved');
NODE
```
- [ ] **Step 7: Commit the article files** with a model `Co-Authored-By` trailer. Record the case-study task's required lint, build, screenshots, and source-claim-map evidence; obtain independent review before the task is marked accepted.

### Task 3: Feature HS VPN on the homepage with real screenshots

**Files:**
- Create: `src/components/home/hs-vpn-feature.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/home-v2.css`
- Modify: `src/content/home/en.ts`
- Modify: `src/content/home/types.ts`

**Interfaces:**
- Consumes: the public `CaseStudy` record and its two media refs from Task 1, plus the live `/work/hs-vpn` route from Task 2.
- Produces: `HsVpnFeature({ study, copy }: { study: CaseStudy; copy: HomeCopy["work"]["hsVpn"] })`, rendered only when the publication-gated HS VPN record is present.

- [ ] **Step 1: Satisfy the Hub gate.** Read `task show --id task_b10d9c1abc1e4b0bbda283f54a481c7d`. Do not edit any homepage-owned path while it is `proposed`; Mahmoud must approve it in the Hub and authorize launch. Honor its dependency on the accepted case-study task.
- [ ] **Step 2: Capture the red homepage baseline.** In a browser attached to this worktree, record that the existing fuel-station selected-work block appears but no HS VPN block or HS VPN screenshot appears yet. Keep this screenshot for the visual before/after check.
- [ ] **Step 3: Add typed English copy for the HS VPN feature.** Extend `HomeCopy["work"]` with this exact `hsVpn` shape and values while preserving every existing work key:

```ts
// src/content/home/types.ts, inside work:
hsVpn: {
  eyebrow: string;
  context: string;
  lead: string;
  screenshotCaption: string;
  statusAndroid: string;
  statusIos: string;
  caseStudyLink: string;
};

// src/content/home/en.ts, inside work:
hsVpn: {
  eyebrow: "Selected work · Client mobile product",
  context: "Idea, design, architecture, infrastructure, and store delivery",
  lead: "A location-and-connect experience built around a question that matters: has the tunnel actually established a protected session?",
  screenshotCaption: "Earlier iOS app captures. Android is the public Google Play release; iOS reached TestFlight.",
  statusAndroid: "Android · Google Play",
  statusIos: "iOS · TestFlight",
  caseStudyLink: "Read the HS VPN case study",
},
```

- [ ] **Step 4: Create the focused homepage component.** Use the shared media references and actual image dimensions; all figures are visible as historical iOS captures. The component must render only public study data, not import the private source project:

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/content";
import type { HomeCopy } from "@/content/home/types";

export function HsVpnFeature({ study, copy }: { study: CaseStudy; copy: HomeCopy["work"]["hsVpn"] }) {
  return <section className="hv2-vpn" aria-labelledby="hv2-vpn-title">
    <div className="hv2-pad hv2-vpn-head">
      <p className="hv2-eyebrow">{copy.eyebrow}</p>
      <h2 id="hv2-vpn-title">{study.publicTitle || study.title}</h2>
      <p>{copy.context}</p><p>{copy.lead}</p>
      <ul aria-label="Platform status"><li>{copy.statusAndroid}</li><li>{copy.statusIos}</li></ul>
    </div>
    <div className="hv2-vpn-strip" aria-label="Earlier iOS HS VPN app screenshots">
      {study.media.map((media) => <figure key={media.src}>
        <Image src={media.src} alt={media.alt} width={1284} height={2778} sizes="(max-width: 767px) 78vw, 420px" />
        <figcaption>{media.src.includes("connected") ? "Connected dashboard · earlier iOS capture" : "Session statistics · earlier iOS capture"}</figcaption>
      </figure>)}
    </div>
    <div className="hv2-pad hv2-vpn-foot"><p>{copy.screenshotCaption}</p>
      <Link className="hv2-link hv2-link-copper" href={`/work/${study.slug}`}>{copy.caseStudyLink}<ArrowUpRight aria-hidden="true" /></Link>
    </div>
  </section>;
}
```

- [ ] **Step 5: Insert the new feature after the current fuel-station selected-work conditional.** Keep the existing `id="work"` once; the hero anchor still points to the first selected-work block. Add the public record lookup and component call before the `approach` section:

```tsx
const hsVpnStudy = publicCaseStudies.find((study) => study.slug === "hs-vpn");
// After the existing Selected work section and before From idea to production:
{hsVpnStudy ? <HsVpnFeature study={hsVpnStudy} copy={copy.work.hsVpn} /> : null}
```

- [ ] **Step 6: Add scoped responsive styles.** Mirror the selected-work section's horizontal padding and editorial rhythm. Keep two portrait cards with dark backgrounds and cyan accents; on mobile, allow scroll within the strip without page overflow:

```css
.hv2-vpn { padding-block: 5rem; background: var(--hv2-cream); color: var(--hv2-ink); }
.hv2-vpn-head { display: grid; gap: 1rem; }
.hv2-vpn-head h2 { font-size: clamp(2rem, 5vw, 4rem); line-height: 1.05; }
.hv2-vpn-strip { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; margin-block: 2rem; padding-inline: 1rem; }
.hv2-vpn-strip figure { min-inline-size: 0; padding: 1.5rem; background: #0c1119; color: white; }
.hv2-vpn-strip img { display: block; inline-size: min(100%, 24rem); block-size: auto; margin-inline: auto; }
.hv2-vpn-strip figcaption { margin-block-start: .75rem; font-size: .8rem; }
.hv2-vpn-foot { display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; }
@media (max-width: 767px) { .hv2-vpn-strip { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; } .hv2-vpn-strip figure { flex: 0 0 min(78vw, 24rem); scroll-snap-align: start; } .hv2-vpn-foot { display: block; } }
```

- [ ] **Step 7: Verify and commit the homepage task.** Run `npm run lint` and `npm run build`. In the browser inspect desktop 1440px and mobile 390px with normal and reduced-motion settings: fuel feature remains first and unchanged, HS VPN follows with both loaded screenshots and visible captions, links and focus work, and `document.documentElement.scrollWidth <= window.innerWidth` on mobile. Capture both widths and compare to the red baseline. Commit only the homepage task's files with the model `Co-Authored-By` trailer, then submit Hub evidence for independent review.

### Task 4: Whole-feature editorial and visual verification

**Files:**
- No product-file changes expected. Use the existing evidence draft `/home/kepler/Desktop/Kepler/Evidence/portfolio/hs-vpn/HS-VPN-case-study-draft.md` as the source-to-claim map.

**Interfaces:**
- Consumes: both completed Hub task outputs and the approved spec.
- Produces: final lint/build logs, six page screenshots, a claim audit, and a review handoff in the Hub. This task is a verification gate, not a new feature.

- [ ] **Step 1: Run `npm run lint` and `npm run build` once in the final combined worktree.** Save concise pass/fail output and the exact commit hashes. Resolve only concrete failures, then rerun the failed gate.
- [ ] **Step 2: Capture six browser screenshots:** `/`, `/work`, `/work/hs-vpn` at 1440px and 390px. Check that image captions appear adjacent to images and that no page has horizontal viewport overflow. Recheck `/work/loyalty-operations-platform` if Task 2 touched its shell.
- [ ] **Step 3: Audit claims against the draft's source-to-claim table.** Search new public copy for `App Store`, `TestFlight`, `10K+`, `logs`, `Mbps`, `ms`, `IP`, `REALITY`, `Hysteria2`, and `MASQUE`. Each occurrence must agree with the spec and source map; the selected image files must be the two reviewed captures. Confirm the dated Play figure appears only with its check date.
- [ ] **Step 4: Verify navigation and semantics.** `/work/hs-vpn` resolves, unknown slugs return not-found, both project cards and homepage links point to the right route, all rail IDs exist, images have meaningful alt text, and keyboard focus is visible.
- [ ] **Step 5: Record evidence and request independent review.** Attach lint, build, screenshot paths, and source-claim-map path to the appropriate Hub tasks. A different session or assigned reviewer evaluates the code; the implementer does not approve their own work. Keep branches unmerged and unpushed until Mahmoud directs integration.

## Plan self-review checklist

- Spec sections map to Tasks 1–4: homepage, `/work`, article, evidence, accessibility, responsive behavior, and exclusions.
- `hs-vpn` slug and the two media paths are consistent across data, article, homepage, and navigation.
- The Hub's homepage task remains proposed until Mahmoud's explicit Hub approval; its dependency prevents premature implementation.
- No extra product dependencies, CMS, source-repository writes, server details, or unverified outcome claims enter the implementation.
