# HS VPN portfolio feature and case study — design

**Date:** 25 September 2026

**Project:** Mahmoud portfolio (`portfolio`)

**Status:** Design approved in conversation; written spec awaiting Mahmoud's review

**Source brief:** `/home/kepler/Desktop/Kepler/Evidence/portfolio/hs-vpn/HS-VPN-case-study-draft.md`

**Hub task:** `task_bfbbe77faf924ea495714b2600646067`; homepage expansion recorded as `decision_69c35ab46f194403a97a1646fbbe7e64`

## Intent and success

Mahmoud wants HS VPN shown as a substantive client project in his portfolio. A visitor should see real app screens on the homepage, find the project on `/work`, and read a detailed case study at `/work/hs-vpn`. The story should show Mahmoud's contribution from product idea and visual design through architecture, infrastructure, and store delivery, while crediting him as the end-to-end lead rather than implying nobody else contributed.

Success means the three surfaces tell one consistent, evidence-backed story; the new work has comparable visual prominence to the fuel-station feature on the homepage; and the existing loyalty case study remains intact. Visitors can distinguish the Android production release from the iOS TestFlight implementation and can tell that the displayed app captures are older iOS screens.

## Scope and publication boundaries

1. Add a second featured-work block directly after the existing fuel-station block on the homepage. It has a project title, concise role and product framing, a strip with at least two genuine HS VPN app screenshots, a visible provenance caption, and a link to `/work/hs-vpn`. The fuel-station feature stays first and keeps its existing content and visual treatment.
2. Add an HS VPN `client` case study record to the public work collection so `/work` shows a card that links to `/work/hs-vpn`. Keep the existing publication and evidence gate. The fuel-station card stays first; HS VPN follows it.
3. Add a distinct HS VPN article at the existing dynamic route `/work/[slug]`. Reuse the page shell, theme handling, back navigation, and accessibility conventions; render HS VPN with its own article content and visual composition. Do not force VPN content into the loyalty-specific illustrative frames or change their claims.
4. Use only the screenshots and product claims described below. Do not modify the HS VPN source repository, `.env.local`, the publication gate, or the existing loyalty case study. Do not push or merge without Mahmoud's direction.

The older `src/lib/data.ts` project inventory and `public/projects/hs-vpn/` image set are not the source of truth for the current `/work` and homepage experience. This work uses the source project and evidence draft, then adds the new public media under `public/projects/HS-VPN/` as specified by the Hub task.

## Visitor experience

### Homepage

The existing Selected work section introduces the fuel-station platform and shows its illustrative product strip. Immediately below it, a second HS VPN feature uses the same broad editorial rhythm: title and short framing, a horizontal visual strip, concise facts, and a case-study link. The HS VPN strip shows the actual historical iOS connected dashboard and statistics screen. It is visually distinct through the app's dark surface and cyan accent, but retains the portfolio's typography, spacing, links, and motion language. The caption says that these are earlier iOS captures; it does not imply they show the current Android production build. On mobile, the screenshot strip remains readable through a horizontal scroll or stacked arrangement, with no clipped text or inaccessible controls.

The homepage should state three things quickly: HS VPN is a client mobile product; Mahmoud led it from idea through store delivery; Android is available on Google Play while iOS reached TestFlight. The case-study link supplies the technical depth. The dated public distribution measure can be shown only with its date and meaning: Google Play displayed **10K+ downloads on 25 September 2026**. It is not an active-user count or a connection-success measure.

### Work index

The HS VPN card is labeled **Client work**, uses the existing card style and filter behavior, and links to `/work/hs-vpn`. Its summary describes the problem of making a VPN connection trustworthy on networks where ordinary tunnel traffic can be interfered with. It should not claim an observed speed improvement, universal bypass success, or public iOS release. The card uses the shared `CaseStudy` data model and passes the existing publication gate with approved screenshot use and source-backed result entries.

### Full article

The article follows this order, with a contents rail on large screens and normal document navigation on mobile:

1. **Hero and facts:** HS VPN as a free, ad-supported mobile VPN; client work; Mahmoud's end-to-end leadership; Android on Google Play and iOS on TestFlight. Show a real app screenshot and label its platform and age.
2. **Problem:** on restrictive networks, starting a tunnel process is not enough to assure a usable protected connection. Explain why honest connection status and recoverable server selection matter to the user.
3. **Product experience:** choose a location, connect, understand the session state and statistics. Display the approved screenshots with useful alt text and captions.
4. **What Mahmoud delivered:** product concept, visual language, Flutter client, native VPN integration, server registration/control plane, infrastructure, and store delivery. Describe other contributors as a team without claiming sole implementation.
5. **Connection journey:** resolve the catalog, order candidate profiles, register a peer public key, start the native tunnel, and wait for handshake evidence before showing a protected state. Present this as a readable sequence, not an operational runbook.
6. **Architecture and decisions:** Flutter orchestration; Android native tunnel; iOS packet-tunnel work; per-node FastAPI registrar; Firebase Remote Config with cached and bundled fallback; native tunnel lifecycle; connection-aware ad placement. Explain the user or maintenance consequence of each decision.
7. **Delivery and evidence:** public Android Google Play listing and dated 10K+ download label; iOS TestFlight only; what has not been measured or validated in the reviewed evidence. Close with a link back to `/work` and the site's contact path.

The article needs enough detail to explain the trade-offs, not just list technologies. It must remain readable by a prospective client who does not know VPN internals.

## Content evidence and exact claim boundaries

| Public statement | Evidence and treatment |
| --- | --- |
| Mahmoud led idea, visual design, architecture, infrastructure, and store delivery | Mahmoud's statements in the Hub and evidence draft. Phrase as end-to-end leadership; do not claim sole authorship. |
| Free, ad-supported VPN intended for restrictive networks | HS VPN `docs/about/00-overview.md` and `HS_VPN_PROJECT_CONTEXT.md`, mapped in the evidence draft. |
| Flutter, Android native tunnel, iOS packet tunnel, registrar, and Remote Config architecture | HS VPN `docs/about/01-architecture.md`, `HS_VPN_PROJECT_CONTEXT.md`, and associated architecture/flow docs in the draft's source map. |
| Catalog fallback and handshake-confirmed state | HS VPN `docs/about/04-vpn-connection-flow.md` and `docs/about/05-config-sync-and-control-plane.md`. Describe source-backed behavior without publishing node configuration. |
| Android AmneziaWG-oriented path; iOS plain WireGuard path | HS VPN `docs/about/09-amneziawg-isp-bypass.md` and project context. Do not say iOS AmneziaWG, REALITY, Hysteria2, or MASQUE is live. |
| Android publicly available; 10K+ downloads as of 25 September 2026 | Public [Google Play listing](https://play.google.com/store/apps/details?id=com.hsvpn.vpn), checked on that date in the evidence draft. Include date beside the figure wherever used. |
| iOS reached TestFlight, not public App Store | Source `docs/SESSION_REPORT_2026_03_01_TESTFLIGHT.md` plus Mahmoud's explicit confirmation, Hub `decision_c7513d315a0f43c5b1cf32d1080c682e`. |
| Genuine historical iOS screenshots may be published | Mahmoud's explicit choice, Hub `decision_508fb6540b344bf79319ee09ba46b873`. Label platform and historical nature wherever shown. |

The page must not publish server IPs, keys, secrets, private user data, operational access details, unsupported latency or speed numbers, absolute privacy guarantees, live-node counts, connection-success rates, revenue, or retention estimates. Engagement dates remain omitted because none were confirmed. The design does not require a metric beyond the dated Google Play distribution figure.

## Visual assets

Use genuine source captures from `assets/images/appstore_screenshots/` in the HS VPN source project. Copy only selected public-safe images into `public/projects/HS-VPN/` with clear filenames and no source repository mutation:

- `screenshot_01.jpg`: connected dashboard and primary control. Its address is already masked in the capture. Use as the leading image.
- `screenshot_02.jpg`: session statistics. Use as a second screenshot and describe only what the screen shows, not a measured product outcome.

Both captures are older iOS screens. They should have descriptive alt text and a visible caption. Architecture graphics, if used, must be labeled diagrams rather than product screenshots. Avoid `screenshot_03.jpg` because it contains IP fields, `screenshot_05.jpg`, `screenshot_04.jpg`, and `screenshot_09.jpg` because they display broad privacy or zero-logs language, `screenshot_06.jpg` because it displays unverified latency numbers, and `screenshot_08.jpg` because its promotional metrics are unsupported. Do not use `slides/stitch_hs_vpn/` concepts as shipped app screens.

The homepage uses both approved captures, which satisfies the request for screenshots without introducing questionable figures. The article may reuse them at larger size rather than padding the story with unsafe imagery.

## Architecture of the portfolio change

- `src/lib/content.ts` remains the common index and publication gate. Add the HS VPN record with truthful classification, release status, role, scope, technologies, results, media, permissions, and verification date.
- `src/app/page.tsx` keeps the current fuel-station block and adds a separate HS VPN feature below it. A focused component under `src/components/home/` owns the HS VPN homepage presentation so the already long homepage file does not absorb another full article-like block. `src/content/home/` holds any new public-facing copy in the existing localized-copy pattern. `src/app/home-v2.css` holds scoped styles for the new feature.
- `src/components/work-grid.tsx` should only change if the existing generic card needs a specific adjustment for the second record. The default path is that the new record makes the card appear without a new card type. `src/app/work-v2.css` changes only for a demonstrated layout need.
- `src/app/work/[slug]/page.tsx` keeps its static parameter and metadata behavior, then selects the HS VPN article for its slug and the current article for loyalty. The contents-rail section list follows the selected article. Focused components under `src/components/case-study/` and scoped rules in `src/app/case-study.css` render the HS VPN content. This keeps the loyalty-specific presentation data and illustrative frames untouched.
- Public assets in `public/projects/HS-VPN/` are presentation copies of the approved source screenshots. The source repository remains read-only.

The existing Hub implementation task owns the `/work` and detail-page paths but not the homepage paths. Before code implementation, the Hub work assignment must cover `src/app/page.tsx`, `src/app/home-v2.css`, `src/content/home/`, and the new homepage component. That coordination change follows Mahmoud's approved design; it does not alter this spec's content.

## Accessibility, responsive behavior, and failure states

- Provide one clear article title per route and distinct section headings; contents-rail links match real section IDs.
- Give screenshots meaningful alt text naming the visible UI and identify them as historical iOS captures in adjacent visible text. Decorative diagrams use empty alt text only when equivalent text is adjacent.
- Keep the homepage and work links keyboard accessible with visible focus states. Honor reduced-motion preferences already used by the site.
- At mobile width, screenshot imagery stays legible and does not introduce horizontal page overflow; a contained gallery may scroll with a visible cue.
- At desktop width, image proportions remain intact and captions remain associated with their image.
- An unknown slug continues to return the existing not-found behavior. No unpublished or unverified study should slip through `publicCaseStudies`.
- If a screenshot fails to load, the text story, case-study links, and release facts remain understandable.

## Verification and acceptance

1. `/` shows both the original fuel-station feature and the new HS VPN feature with two labeled genuine screenshots and a working case-study link.
2. `/work` shows both client studies; its filter and card links work; the loyalty card and copy remain unchanged.
3. `/work/hs-vpn` contains the full narrative sections above, uses source-backed statements, labels screenshots correctly, and distinguishes Android production from iOS TestFlight.
4. `/work/loyalty-operations-platform` remains functional and visually intact.
5. A source-to-claim map accompanies the implementation evidence. No restricted operational detail or unsupported claim appears in rendered copy or selected screenshots.
6. `npm run lint` and `npm run build` pass in the implementation worktree.
7. Capture screenshots of `/`, `/work`, and `/work/hs-vpn` at mobile and desktop widths and inspect readability, asset loading, layout, and link targets. Capture the existing loyalty detail if an integration change affects it.

## Exclusions

This work does not change the HS VPN application or server, deploy the portfolio, merge or push branches, claim public iOS App Store availability, add a CMS, or restructure unrelated portfolio sections. It also does not invent engagement dates or measured outcomes that the reviewed evidence cannot support.
