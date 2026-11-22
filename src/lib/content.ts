export type ThemePreference = "light" | "dark";

export type Classification =
  | "client"
  | "employer"
  | "internal"
  | "owned-product"
  | "university"
  | "concept";

export type ProofState = "verified-public" | "verified-private" | "unverified";
export type PublicationStatus = "draft" | "public" | "private";
export type ProjectCategory = "web" | "mobile" | "ai" | "rnd";
export type ProjectKind = "flagship" | "showcase";
export type ProjectMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
      permissionRef?: string;
    }
  | {
      kind: "video";
      src: string;
      alt: string;
      preload: "metadata";
      caption: string;
      permissionRef?: string;
    };

export interface ProjectCatalogCore {
  slug: string;
  title: string;
  kind: ProjectKind;
  categories: ProjectCategory[];
  classification: Classification;
  productionStatus: "production" | "pilot" | "prototype" | "in-development" | "concept";
  studioRole: string;
  context: string;
  evidence: string[];
  surfaces: string[];
  technologies: string[];
  media: ProjectMedia[];
}

export interface CaseStudy extends ProjectCatalogCore {
  publicTitle?: string;
  publicationStatus: PublicationStatus;
  targetUser: string;
  problem: string;
  engagementContext: string;
  teamContext: string;
  scope: string[];
  solution: string;
  technicalChallenges: string[];
  results: Array<{ claim: string; proofState: ProofState; evidenceRef?: string }>;
  clientNamePermission: "approved" | "anonymize" | "pending";
  screenshotPermission: "approved" | "anonymize" | "pending";
  lastVerified: string;
}

export interface ShowcaseBuild extends ProjectCatalogCore {
  targetUser: string;
  problem: string;
  scope: string[];
  scopeBoundary: string;
}

/**
 * Only records that pass both the publication status and evidence gate are
 * serialized to page components. Keep prospective work in a private register.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "glitre-loyalty-platform",
    title: "Glitre Loyalty Platform",
    publicTitle: "Glitre Loyalty Platform",
    kind: "flagship",
    categories: ["web", "mobile"],
    classification: "client",
    productionStatus: "production",
    publicationStatus: "public",
    targetUser:
      "Drivers buying fuel and station services; station workers recording purchases; head-office administrators operating the network.",
    problem:
      "A fuel-station network had no way to know its repeat customers. Every fill-up was a transaction; none became a relationship.",
    engagementContext:
      "Client engagement for a GCC fuel-station network. Backend and private manager dashboard are live; the customer app is preparing for store release, and worker POS hardware integration is planned, not complete.",
    studioRole:
      "Product and engineering lead. Product discovery, the API contract, the three clients, and delivery.",
    context:
      "A connected loyalty platform for drivers, station teams, and head office. The backend and private manager console are live; the customer app is preparing for store release, while worker POS hardware integration remains planned.",
    evidence: [
      "Stage 2 flagship case study, section 1: release boundaries and four surfaces.",
      "Stage 2 visual asset manifest, flagship 1: owner-approved English manager-console captures.",
      "Glitre audit 2026-08-25: backend production status and mobile publication status.",
    ],
    surfaces: ["Manager dashboard", "Customer mobile app", "Worker mobile app", "Shared backend and API contract"],
    teamContext:
      "A small team of developers working with AI agents on flagship models, each workstream isolated on its own branch against the shared contract, with review before merge.",
    scope: [
      "Manager dashboard — internal operations",
      "Customer app — Arabic-first loyalty",
      "Worker app — Android station operations",
      "Shared backend and API contract — the foundation beneath",
    ],
    solution:
      "One API contract in the middle, generating the three clients, fronting the loyalty services, an append-only points ledger, and a retrying message queue, all in-region.",
    technicalChallenges: [
      "An append-only points ledger enforced by a database trigger rather than by convention, so corrections are new reversing entries.",
      "Single-use signed QR codes plus an idempotency key on every write that moves value, so a retry settles once.",
      "Contract-first development with drift detection in CI keeping three clients in step.",
    ],
    results: [
      {
        claim: "Backend is live in production in Azure UAE North.",
        proofState: "verified-private",
        evidenceRef: "Glitre PROJECT_CONTEXT.md:60, 120-156; audit-2026-08-25 §Executive verdict.",
      },
      {
        claim: "One OpenAPI contract is the seam between the API and the three clients.",
        proofState: "verified-private",
        evidenceRef: "Glitre PROJECT_CONTEXT.md:46-48; packages/contract/openapi.yaml exists.",
      },
      {
        claim: "The manager dashboard runs 9 pages, role-based, Arabic and English with RTL.",
        proofState: "verified-private",
        evidenceRef: "Glitre apps/web/docs/ux/02-screen-inventory.md; audit-2026-08-16 §4.",
      },
      {
        claim: "0 axe-core WCAG 2.1 AA violations across the dashboard's 36 audited captures.",
        proofState: "verified-private",
        evidenceRef: "Glitre audit-2026-08-16 §4.1 (lines 95-110).",
      },
      {
        claim: "The customer app design catalogs 21 screens across the loop in Arabic-first RTL; the public station flows render in the build; five screens remain ComingSoonBody stubs and no automated mobile end-to-end test suite exists. The app is preparing for store release — not yet in stores.",
        proofState: "verified-private",
        evidenceRef: "Glitre apps/customer/design/06-screen-catalog.md:60-766; audit §4.4 (mobile end-to-end suite bullet); audit §7 customer-app controlled vocabulary.",
      },
      {
        claim: "The worker app design catalogs 14 screens with server-authoritative hand-offs; no on-device captures, no mobile end-to-end test suite, and no POS hardware qualification exist. POS hardware integration is planned, not complete.",
        proofState: "verified-private",
        evidenceRef: "Glitre apps/worker/design/03-screen-specs.md; audit §4.4; audit §5.2 (POS qualification bullet); audit §7 worker-app controlled vocabulary.",
      },
      {
        claim: "Customer and worker apps are not published in any store today.",
        proofState: "verified-private",
        evidenceRef: "Glitre audit-2026-08-25 §Executive verdict (lines 11-12), §3, §6.",
      },
      {
        claim: "Both current Android APKs are signed with the shared debug key.",
        proofState: "verified-private",
        evidenceRef: "Glitre audit-2026-08-25 §3.",
      },
      {
        claim: "Email-OTP interim delivery is designed, not implemented.",
        proofState: "verified-private",
        evidenceRef: "Glitre PROJECT_CONTEXT.md:168; 08_Build_State_Three_Buckets.md:53.",
      },
      {
        claim: "POS / forecourt / ZATCA integration is Release C, not Release A.",
        proofState: "verified-private",
        evidenceRef: "Glitre 08_Build_State_Three_Buckets.md:85.",
      },
      {
        claim: "Append-only points ledger is enforced by a database trigger.",
        proofState: "verified-private",
        evidenceRef: "Glitre PROJECT_CONTEXT.md:81, 196-197.",
      },
      {
        claim: "No measured throughput, latency, uptime, conversion, retention, revenue, or active-customer figures are claimed.",
        proofState: "verified-private",
        evidenceRef: "Glitre audit §5.2.",
      },
    ],
    technologies: ["NestJS", "PostgreSQL", "Redis", "Flutter", "Next.js", "TypeScript", "Azure"],
    media: [
      {
        kind: "image",
        src: "/projects/glitre-loyalty-platform/manager/overview.webp",
        alt: "Glitre Loyalty Platform operations console overview showing station metrics and queue summary",
        width: 1842,
        height: 965,
        caption: "English operations-console overview showing station, crew, complaint, and audit summaries.",
        permissionRef: "Owner-approved manager console capture; Stage 2 visual asset manifest, flagship 1.",
      },
      {
        kind: "image",
        src: "/projects/glitre-loyalty-platform/manager/sign-in.webp",
        alt: "Glitre Loyalty Platform secure administration sign-in screen with bilingual language switcher",
        width: 1309,
        height: 773,
        caption: "Administration sign-in surface with English and Arabic locale controls.",
        permissionRef: "Owner-approved manager console capture; Stage 2 visual asset manifest, flagship 1.",
      },
      {
        kind: "image",
        src: "/projects/glitre-loyalty-platform/manager/stations.webp",
        alt: "Glitre station directory management view with operating mode controls and Arabic profile fields",
        width: 1566,
        height: 963,
        caption: "Station directory with operating overrides, service tags, and bilingual profile controls.",
        permissionRef: "Owner-approved manager console capture; Stage 2 visual asset manifest, flagship 1.",
      },
      {
        kind: "image",
        src: "/projects/glitre-loyalty-platform/manager/complaints.webp",
        alt: "Glitre customer complaint queue with server audit reference details",
        width: 1574,
        height: 966,
        caption: "Complaint queue and audit detail panel.",
        permissionRef: "Owner-approved manager console capture; Stage 2 visual asset manifest, flagship 1.",
      },
    ],
    clientNamePermission: "anonymize",
    screenshotPermission: "approved",
    lastVerified: "2026-10-01",
  },
  {
    slug: "hs-vpn",
    title: "HS VPN",
    publicTitle: "HS VPN",
    kind: "flagship",
    categories: ["mobile"],
    classification: "client",
    productionStatus: "production",
    publicationStatus: "public",
    targetUser:
      "People who need a dependable VPN connection on restrictive networks.",
    problem:
      "On restrictive networks, starting a VPN tunnel does not always mean a protected connection works. HS VPN makes connection state visible and waits for handshake evidence before showing a protected session.",
    engagementContext:
      "Client mobile product. Android is published on Google Play; iOS reached TestFlight.",
    studioRole:
      "End-to-end product and engineering lead: idea, visual design, architecture, infrastructure, and store delivery.",
    context:
      "Android is published on Google Play. The iOS client reached TestFlight and has no confirmed public App Store release; its transport remains plain WireGuard.",
    evidence: [
      "Stage 2 flagship case study, section 2: Android Google Play and iOS TestFlight release boundaries.",
      "Google Play listing checked 2026-09-25; TestFlight verification dated 2026-09-25.",
      "Stage 2 visual asset manifest, flagship 2: exact Android, historical iOS, and video paths.",
    ],
    surfaces: ["Flutter Android app", "Android native VPN tunnel", "iOS TestFlight packet-tunnel client", "FastAPI peer registrar and configuration control plane"],
    teamContext:
      "Kepler Dev led the product end to end with other contributors involved in the repository.",
    scope: [
      "Flutter mobile app",
      "Android native VPN tunnel",
      "iOS packet-tunnel implementation",
      "Server registrar and configuration control plane",
    ],
    solution:
      "A simple location-and-connect experience backed by catalog fallback, peer registration, a native tunnel, and a confirmed handshake before protected status appears.",
    technicalChallenges: [
      "Keep connection status tied to handshake evidence.",
      "Recover when remote catalog data is unavailable.",
      "Coordinate Flutter orchestration with native VPN lifecycle and server registration.",
    ],
    results: [
      {
        claim:
          "Android is publicly available on Google Play.",
        proofState: "verified-public",
        evidenceRef:
          "Google Play listing, checked 2026-09-25.",
      },
      {
        claim:
          "Google Play displayed 10K+ downloads on 25 September 2026.",
        proofState: "verified-public",
        evidenceRef:
          "Google Play listing, checked 2026-09-25; dated distribution count only.",
      },
      {
        claim:
          "The iOS build reached TestFlight, with no public App Store release confirmed.",
        proofState: "verified-private",
        evidenceRef:
          "TestFlight session report and studio verification, 2026-09-25.",
      },
    ],
    technologies: ["Flutter", "Kotlin", "Swift", "WireGuard", "FastAPI", "Firebase Remote Config"],
    media: [
      {
        kind: "image",
        src: "/projects/hs-vpn/hero.png",
        alt: "HS VPN Android app connected screen showing Nuremberg tunnel status and live throughput",
        width: 706,
        height: 1600,
        caption: "Connected Android tunnel view with handshake state and session telemetry.",
      },
      {
        kind: "image",
        src: "/projects/hs-vpn/server_selection.png",
        alt: "HS VPN server selection list showing regional nodes and latency indicators",
        width: 706,
        height: 1600,
        caption: "Android server catalog backed by remote configuration and local fallback.",
      },
      {
        kind: "image",
        src: "/projects/hs-vpn/statistics_page.png",
        alt: "HS VPN session statistics screen showing encrypted traffic and connection duration",
        width: 706,
        height: 1600,
        caption: "Android session statistics and connection telemetry.",
      },
      {
        kind: "image",
        src: "/projects/hs-vpn/premium_infrastructure.png",
        alt: "HS VPN infrastructure view showing AmneziaWG transport and routing nodes",
        width: 706,
        height: 1600,
        caption: "Android infrastructure and transport configuration.",
      },
      {
        kind: "image",
        src: "/projects/hs-vpn/privacy_setup.png",
        alt: "HS VPN privacy setup screen with split tunneling and DNS protection controls",
        width: 702,
        height: 1600,
        caption: "Android tunnel permissions and privacy controls.",
      },
      {
        kind: "image",
        src: "/projects/HS-VPN/connected-ios.jpg",
        alt: "Historical HS VPN iOS TestFlight capture showing the packet-tunnel connection state",
        width: 1284,
        height: 2778,
        caption: "Historical iOS TestFlight build; no public App Store release is confirmed.",
      },
      {
        kind: "image",
        src: "/projects/HS-VPN/servers-ios.jpg",
        alt: "Historical HS VPN iOS TestFlight server directory listing regional tunnel endpoints",
        width: 1284,
        height: 2778,
        caption: "Historical iOS TestFlight endpoint selector.",
      },
      {
        kind: "image",
        src: "/projects/HS-VPN/statistics-ios.jpg",
        alt: "Historical HS VPN iOS TestFlight statistics screen showing encrypted tunnel traffic",
        width: 1284,
        height: 2778,
        caption: "Historical iOS TestFlight connection statistics.",
      },
      {
        kind: "video",
        src: "/projects/hs-vpn/preview.mp4",
        alt: "HS VPN Android connection, server selection, and session telemetry walkthrough.",
        preload: "metadata",
        caption: "Android connection, server switching, and telemetry walkthrough.",
      },
    ],
    clientNamePermission: "approved",
    screenshotPermission: "approved",
    lastVerified: "2026-09-25",
  },
  {
    slug: "quickcharging-pos",
    title: "QuickChargingPOS",
    kind: "flagship",
    categories: ["mobile"],
    classification: "client",
    productionStatus: "production",
    publicationStatus: "public",
    targetUser: "Fuel and EV charging attendants and station managers using Android forecourt terminals.",
    problem: "Cloud payment round trips and unstable forecourt networks interrupt terminal checkout and delivery reconciliation.",
    engagementContext: "Android-based Sunmi POS deployment with the local Nami POS app installed; the Stage 2 boundary notes that broader multi-tenant rollout still needs per-terminal configuration hardening.",
    studioRole: "Industrial mobile and hardware-integration engineering.",
    context: "A React Native forecourt terminal integrates local Nami payment intents, Sunmi receipt printing, and an offline delivery queue. The recorded deployment is Android Sunmi hardware; no iOS payment or printer path is claimed.",
    evidence: [
      "Stage 2 flagship case study, section 3: hardware scope and rollout boundary.",
      "Stage 2 visual asset manifest, flagship 3: verified terminal captures and walkthrough path.",
    ],
    surfaces: ["React Native Android terminal", "Nami POS payment bridge", "Sunmi thermal printer", "Offline delivery queue"],
    teamContext: "Product engineering work focused on a field terminal and its hardware bridges.",
    scope: ["Terminal checkout", "Local Android payment intent bridge", "Thermal receipt printing", "Offline delivery reconciliation"],
    solution: "A local Android payment bridge and persisted delivery queue keep the forecourt workflow usable when cloud connectivity is delayed.",
    technicalChallenges: [
      "Bridge signed payment payloads from React Native to the installed Android POS application.",
      "Support Sunmi printer hardware while keeping emulator flows testable.",
      "Persist delivery records until network reconciliation succeeds.",
    ],
    results: [
      {
        claim: "The application is deployed on physical Sunmi Android POS hardware.",
        proofState: "verified-private",
        evidenceRef: "Stage 2 flagship case study, section 3; deployment boundary.",
      },
    ],
    technologies: ["React Native", "TypeScript", "Java", "SkyBand / Mada SDK", "Sunmi SDK", "AsyncStorage", ".NET API"],
    media: [
      {
        kind: "image",
        src: "/projects/quickcharging/home_station_ready/screen.png",
        alt: "QuickChargingPOS Sunmi terminal ready screen showing station status and charge initiation.",
        width: 706,
        height: 1600,
        caption: "Forecourt terminal idle state with terminal identity, connectivity, and QR entry.",
      },
      {
        kind: "image",
        src: "/projects/quickcharging/charging_configuration/screen.png",
        alt: "QuickChargingPOS charging configuration screen for energy volume and tariff.",
        width: 662,
        height: 1600,
        caption: "Attendant workflow for setting charging volume, pump bay, and billing parameters.",
      },
      {
        kind: "image",
        src: "/projects/quickcharging/payment_processing/screen.png",
        alt: "QuickChargingPOS Mada payment processing screen using the Java NamiPayModule bridge.",
        width: 706,
        height: 1600,
        caption: "Local SkyBand and Mada authorization through the Android NamiPayModule intent handler.",
      },
      {
        kind: "image",
        src: "/projects/quickcharging/payment_success/screen.png",
        alt: "QuickChargingPOS payment confirmation screen with thermal receipt status.",
        width: 673,
        height: 1600,
        caption: "Payment confirmation followed by Sunmi thermal receipt printing.",
      },
      {
        kind: "image",
        src: "/projects/quickcharging/transaction_history/screen.png",
        alt: "QuickChargingPOS offline-capable transaction history showing reconciled fuel charges.",
        width: 706,
        height: 1600,
        caption: "Local terminal ledger retaining delivery records until cloud reconciliation.",
      },
      {
        kind: "video",
        src: "/projects/quickcharging/preview.mp4",
        alt: "QuickChargingPOS Sunmi setup, Mada authorization, and receipt-printing walkthrough.",
        preload: "metadata",
        caption: "Sunmi POS setup, payment authorization, and receipt-printing walkthrough.",
      },
    ],
    clientNamePermission: "approved",
    screenshotPermission: "approved",
    lastVerified: "2026-11-22",
  },
  {
    slug: "medconnect-egypt",
    title: "MedConnect Egypt",
    kind: "flagship",
    categories: ["web"],
    classification: "internal",
    productionStatus: "prototype",
    publicationStatus: "public",
    targetUser: "Referring physicians, specialist clinics, patients, and network administrators.",
    problem: "Referral workflows need tracked patient handoffs, clinic check-ins, and privacy-aware patient matching.",
    engagementContext: "A multi-surface MVP; clinical production launch and several external integrations remain outside the delivered scope.",
    studioRole: "Full-stack systems architecture, security-schema design, and dual mobile and admin-web delivery.",
    context: "A referral MVP with a NestJS monolithic API, React Native and web clients, encrypted national IDs, and geofenced clinic check-ins. Clinical deployment and the documented Phase 2 integrations are not claimed.",
    evidence: [
      "Stage 2 flagship case study, section 4: MVP status and Phase 2 boundaries.",
      "Stage 2 visual asset manifest, flagship 4: verified interface captures and walkthrough path.",
    ],
    surfaces: ["Doctor mobile portal", "Patient mobile portal", "Clinic and network admin web portals", "NestJS API"],
    teamContext: "Studio product build delivered as a full-stack multi-surface MVP.",
    scope: ["Doctor referrals", "Patient referral status", "Clinic check-in workflow", "Network administration"],
    solution: "A single API and relational wallet ledger connect referral creation, clinic check-in, and administrative review.",
    technicalChallenges: [
      "Pair encrypted patient identifiers with a deterministic blind index for duplicate checks.",
      "Validate clinic check-ins against registered geofences.",
      "Keep referral, wallet, and administration domains in one deployable monolith.",
    ],
    results: [
      {
        claim: "The documented delivery is a multi-surface MVP, not a clinical production launch.",
        proofState: "verified-private",
        evidenceRef: "Stage 2 flagship case study, section 4; honest release boundary.",
      },
    ],
    technologies: ["NestJS", "React Native", "React", "PostgreSQL", "TypeORM", "Prisma", "Redis"],
    media: [
      {
        kind: "image",
        src: "/projects/medconnect/doctor_dashboard/screen.png",
        alt: "MedConnect Egypt doctor referral dashboard showing active patient cases and specialist capacity.",
        width: 1600,
        height: 1566,
        caption: "Doctor portal overview of referrals, statuses, and specialist capacity.",
      },
      {
        kind: "image",
        src: "/projects/medconnect/patient_medical_record/screen.png",
        alt: "MedConnect Egypt patient medical record view with diagnostic history and visit logs.",
        width: 1252,
        height: 1600,
        caption: "Patient record backed by encrypted identifiers and blind-index lookup.",
      },
      {
        kind: "image",
        src: "/projects/medconnect/create_referral_form/screen.png",
        alt: "MedConnect Egypt referral form linking a clinic department and specialist.",
        width: 1600,
        height: 1485,
        caption: "Structured referral workflow with geofence-verified clinic check-ins.",
      },
      {
        kind: "image",
        src: "/projects/medconnect/patient_portal_home/screen.png",
        alt: "MedConnect Egypt patient portal showing upcoming visits and referral status.",
        width: 1600,
        height: 1280,
        caption: "Patient portal for appointments and referral status.",
      },
      {
        kind: "image",
        src: "/projects/medconnect/admin_dashboard/screen.png",
        alt: "MedConnect Egypt network admin dashboard for clinic verification and referral review.",
        width: 1459,
        height: 1600,
        caption: "Administrative view of clinic onboarding, referrals, and compliance logs.",
      },
      {
        kind: "video",
        src: "/projects/medconnect/preview.mp4",
        alt: "MedConnect Egypt doctor referral, patient record, and administration walkthrough.",
        preload: "metadata",
        caption: "Referral creation, patient record, and administrator review walkthrough.",
      },
    ],
    clientNamePermission: "approved",
    screenshotPermission: "approved",
    lastVerified: "2026-11-22",
  },
  {
    slug: "stayease",
    title: "StayEase",
    kind: "flagship",
    categories: ["web"],
    classification: "internal",
    productionStatus: "prototype",
    publicationStatus: "public",
    targetUser: "Travelers searching for stays and property hosts managing availability and bookings.",
    problem: "Concurrent bookings, stale room availability, and duplicate payment events can undermine a hotel booking flow.",
    engagementContext: "Full-stack React web application with a Node and Express backend; not a native mobile app.",
    studioRole: "Full-stack engineering, transaction-concurrency architecture, and Stripe payment integration.",
    context: "A React web booking platform with transactional room holds and deduplicated payment webhooks. The Stage 2 spec frames all supplied captures as tall mobile-viewport scroll strips.",
    evidence: [
      "Stage 2 flagship case study, section 5: web-only scope and portrait capture framing.",
      "Stage 2 visual asset manifest, flagship 5: verified screenshots and walkthrough path.",
    ],
    surfaces: ["React web application", "Node / Express API", "MongoDB booking state", "Redis and Stripe integrations"],
    teamContext: "Studio product build spanning the guest booking flow and host operations.",
    scope: ["Property search", "Property details and reservation hold", "Guest checkout", "Host inventory and messaging"],
    solution: "Transactional room holds and idempotent payment processing coordinate guest checkout with host inventory.",
    technicalChallenges: [
      "Hold room inventory while checkout is in progress.",
      "Deduplicate payment webhook events before booking or settlement changes.",
      "Serve property images through a multi-resolution image pipeline.",
    ],
    results: [
      {
        claim: "StayEase is a React web application with a Node and Express backend.",
        proofState: "verified-private",
        evidenceRef: "Stage 2 flagship case study, section 5; honest release boundary.",
      },
    ],
    technologies: ["React", "Redux Toolkit", "TanStack Query", "Node.js", "Express", "MongoDB", "Redis", "Stripe", "AWS"],
    media: [
      {
        kind: "image",
        src: "/projects/StayEase/stayease_landing_page/screen.png",
        alt: "StayEase booking landing view with destination search and curated properties.",
        width: 267,
        height: 1600,
        caption: "Property discovery landing screen with destination, date, and guest filters.",
      },
      {
        kind: "image",
        src: "/projects/StayEase/stayease_search_results/screen.png",
        alt: "StayEase search results showing nightly rates, amenities, and availability filters.",
        width: 310,
        height: 1600,
        caption: "Filtered property inventory and room availability.",
      },
      {
        kind: "image",
        src: "/projects/StayEase/stayease_hotel_detail/screen.png",
        alt: "StayEase property detail view with room breakdown, pricing, and reservation action.",
        width: 273,
        height: 1600,
        caption: "Listing details and reservation hold initiation.",
      },
      {
        kind: "image",
        src: "/projects/StayEase/stayease_confirmation/screen.png",
        alt: "StayEase reservation confirmation showing the payment settlement state.",
        width: 382,
        height: 1600,
        caption: "Confirmed reservation state after payment webhook processing.",
      },
      {
        kind: "image",
        src: "/projects/StayEase/stayease_host_dashboard/screen.png",
        alt: "StayEase host dashboard showing property occupancy, payouts, and bookings.",
        width: 239,
        height: 1600,
        caption: "Host inventory and payout operations.",
      },
      {
        kind: "image",
        src: "/projects/StayEase/stayease_inbox/screen.png",
        alt: "StayEase guest and host inbox with booking-linked conversation threads.",
        width: 583,
        height: 1600,
        caption: "Guest-to-host messages linked to booking references.",
      },
      {
        kind: "video",
        src: "/projects/StayEase/preview.mp4",
        alt: "StayEase search, property details, checkout hold, and host dashboard walkthrough.",
        preload: "metadata",
        caption: "Search, property inspection, checkout hold, and host dashboard walkthrough.",
      },
    ],
    clientNamePermission: "approved",
    screenshotPermission: "approved",
    lastVerified: "2026-11-22",
  },
  {
    slug: "classroom-sentinel",
    title: "Classroom Sentinel",
    kind: "flagship",
    categories: ["ai", "rnd"],
    classification: "internal",
    productionStatus: "production",
    publicationStatus: "public",
    targetUser: "An individual monitoring Google Classroom deadlines across personal and university identities.",
    problem: "Course deadlines and announcements arrive across accounts, while unattended authentication and repeated polling can interrupt or duplicate reminders.",
    engagementContext: "A single-owner, allowlisted systemd daemon, not a multi-tenant SaaS product.",
    studioRole: "Python asyncio systems architecture, schema-constrained AI parsing, and delivery automation.",
    context: "A self-hosted Google Classroom-to-Telegram daemon combines deterministic parsing of structured API dates with schema-constrained parsing for free-text announcements.",
    evidence: [
      "Stage 2 flagship case study, section 6: single-owner daemon boundary and pipeline.",
      "Stage 2 visual asset manifest, flagship 6: icon and verified walkthrough path.",
    ],
    surfaces: ["Python asyncio daemon", "Google Classroom API and OAuth", "SQLite reminder state", "Telegram bot"],
    teamContext: "Studio automation system built for one allowlisted operator.",
    scope: ["Multi-account polling", "Deadline parsing", "Reminder dispatch", "Inline completion and health commands"],
    solution: "A headless poller, schema-constrained parser, and idempotent dispatcher route course deadlines into Telegram.",
    technicalChallenges: [
      "Use structured Classroom dates directly and reserve AI parsing for unstructured announcements.",
      "Handle expired background OAuth without blocking on an interactive browser flow.",
      "Persist deduplication, completion, and reminder-threshold state.",
    ],
    results: [
      {
        claim: "The documented deployment is a single-owner daemon secured by a Telegram chat allowlist.",
        proofState: "verified-private",
        evidenceRef: "Stage 2 flagship case study, section 6; honest release boundary.",
      },
    ],
    technologies: ["Python", "asyncio", "Google Classroom API", "Google Gemini", "SQLite", "Telegram Bot API", "systemd"],
    media: [
      {
        kind: "image",
        src: "/projects/Sintenel/logo.png",
        alt: "Classroom Sentinel shield and notification bell mark on a dark background.",
        width: 1024,
        height: 1024,
        caption: "Service mark for the Google Classroom-to-Telegram automation.",
      },
      {
        kind: "video",
        src: "/projects/Sintenel/preview.mp4",
        alt: "Classroom Sentinel terminal polling and Telegram reminder walkthrough.",
        preload: "metadata",
        caption: "Terminal polling, Telegram commands, and reminder dispatch walkthrough.",
      },
    ],
    clientNamePermission: "approved",
    screenshotPermission: "approved",
    lastVerified: "2026-11-22",
  },
];

export const showcaseBuilds: ShowcaseBuild[] = [
  {
    slug: "aksira-ai-keyboard",
    title: "Aksira (Faseeh AI Keyboard)",
    kind: "showcase",
    categories: ["mobile", "ai", "rnd"],
    classification: "owned-product",
    productionStatus: "production",
    studioRole: "Android input-method integration and bilingual AI workflow engineering.",
    context: "A release-signed Android binary embeds Flutter inside an Android keyboard service. The iOS extension remains a folder stub; no store launch is claimed.",
    evidence: ["Stage 2 showcase case study, section 7.1: Android-only release and iOS stub boundary.", "Stage 2 visual asset manifest, showcase 7: no raster screenshot path; use a code-drawn architecture card."],
    surfaces: ["Android keyboard / input method", "Flutter writing interface", "AI rewrite and translation workflow"],
    targetUser: "Bilingual Arabic–English mobile product teams and consumer utility businesses.",
    problem: "Rewriting, translating, and cleaning up dictation in a separate AI app interrupts the typing flow.",
    scope: ["Android input-method integration", "Flutter writing interface", "Bilingual AI actions"],
    scopeBoundary: "Android-only release-signed binary. The iOS extension is a folder stub, and no public app-store availability is stated.",
    technologies: ["Flutter", "Android InputMethodService", "Kotlin"],
    media: [],
  },
  {
    slug: "fitforge",
    title: "FitForge",
    kind: "showcase",
    categories: ["mobile"],
    classification: "internal",
    productionStatus: "production",
    studioRole: "Mobile product engineering, deterministic workout programming, and offline-first training flows.",
    context: "A mobile training product built and deployed across iOS and Android with AWS backend infrastructure.",
    evidence: ["Stage 2 showcase case study, section 7.2: platform and deployment scope.", "Stage 2 visual asset manifest, showcase 8: verified mobile captures and walkthrough path."],
    surfaces: ["iOS and Android app", "Node.js program-generation engine", "AWS backend infrastructure"],
    targetUser: "Fitness and coaching operators needing structured, offline-capable mobile training products.",
    problem: "Generic exercise libraries put programming on the user, while cloud-dependent trackers can fail in gyms with poor reception.",
    scope: ["Training program generation", "Workout logging", "Progress dashboard", "Goal selection"],
    scopeBoundary: "The Stage 2 source supports an iOS and Android deployment; it does not specify public storefront launch dates.",
    technologies: ["Flutter", "Node.js", "AWS", "MongoDB Atlas"],
    media: [
      {
        kind: "image",
        src: "/projects/FitForge/home_screen/screen.png",
        alt: "FitForge dark-mode home dashboard showing today's workout and intensity gauge.",
        width: 512,
        height: 1600,
      },
      {
        kind: "image",
        src: "/projects/FitForge/active_workout/screen.png",
        alt: "FitForge active workout logger tracking sets, reps, and rest timer.",
        width: 706,
        height: 1600,
      },
      {
        kind: "image",
        src: "/projects/FitForge/progress_dashboard/screen.png",
        alt: "FitForge progress analytics view of weekly training volume trends.",
        width: 410,
        height: 1600,
      },
      {
        kind: "image",
        src: "/projects/FitForge/onboarding_goal_selection_refined/screen.png",
        alt: "FitForge onboarding goal selection for strength and hypertrophy targets.",
        width: 691,
        height: 1600,
      },
      {
        kind: "video",
        src: "/projects/FitForge/preview.mp4",
        alt: "FitForge mobile workout and progress walkthrough.",
        preload: "metadata",
        caption: "FitForge workout and progress walkthrough.",
      },
    ],
  },
  {
    slug: "qiraaty",
    title: "Qiraaty",
    kind: "showcase",
    categories: ["web", "ai"],
    classification: "client",
    productionStatus: "prototype",
    studioRole: "Regional education-platform engineering and operational workflow integration.",
    context: "A production-oriented Saudi and GCC live-instruction platform implemented as a Laravel monolith with PHPUnit suites and sprint smoke verification.",
    evidence: ["Stage 2 showcase case study, section 7.3: platform scope and implementation evidence.", "Stage 2 visual asset manifest, showcase 9: spec-backed entry with no public raster screenshots."],
    surfaces: ["Laravel web platform", "Live-class attendance and recording workflows", "Saudi payment and e-invoicing integrations"],
    targetUser: "Saudi and GCC live-instruction academies, tutoring networks, and compliance-bound EdTech operators.",
    problem: "Live-class academies need to reconcile attendance, detect stalled recordings, assign follow-up tasks, and meet regional payment and e-invoicing requirements.",
    scope: ["Live-class operations", "Attendance and recording workflows", "Follow-up teaching tasks", "Regional payment compliance"],
    scopeBoundary: "The source describes a production-oriented implementation; no production launch claim or screenshot path is recorded here.",
    technologies: ["PHP 8.1", "Laravel 10", "MySQL 8", "Laravel Nova", "PHPUnit"],
    media: [],
  },
  {
    slug: "focus-ritual",
    title: "Focus Ritual",
    kind: "showcase",
    categories: ["web", "ai"],
    classification: "owned-product",
    productionStatus: "production",
    studioRole: "Full-stack product engineering across study workflows, AI-assisted learning, and cohort accountability.",
    context: "A deployed web application with a React SPA, Express API, MongoDB Atlas, and Google Cloud Storage.",
    evidence: ["Stage 2 showcase case study, section 7.4: deployed web product and technical scope.", "Stage 2 visual asset manifest, showcase 10: verified captures; it records the original capture while the oversized legacy PNG is no longer served."],
    surfaces: ["React web application", "Express API", "MongoDB Atlas", "Google Cloud Storage"],
    targetUser: "EdTech teams and productivity software operators building study and cohort-accountability tools.",
    problem: "Large lecture files, multi-tab presence, and process restarts make study-card storage, presence, and habit tracking difficult to coordinate.",
    scope: ["Focus sessions", "Analytics", "Habit tracking", "Lecture library", "AI coach"],
    scopeBoundary: "The verified build is a web application. The optimized WebP cover preserves the Stage 2 source image.",
    technologies: ["React", "Express", "MongoDB Atlas", "Google Cloud Storage", "Socket.io"],
    media: [
      {
        kind: "image",
        src: "/projects/focus-ritual/focus-ritual-hero.webp",
        alt: "Focus Ritual web application hero screen introducing its study and deep-work workflow.",
        width: 988,
        height: 601,
      },
      {
        kind: "image",
        src: "/projects/focus-ritual/Screenshot 2026-04-09 225656.png",
        alt: "Focus Ritual analytics dashboard with session count, productivity score, and AI insights.",
        width: 1011,
        height: 486,
      },
      {
        kind: "image",
        src: "/projects/focus-ritual/Screenshot 2026-04-09 225702.png",
        alt: "Focus Ritual Pomodoro timer with session progress and audio controls.",
        width: 988,
        height: 503,
      },
      {
        kind: "image",
        src: "/projects/focus-ritual/Screenshot 2026-04-09 225711.png",
        alt: "Focus Ritual lecture library for PDF uploads and AI flashcard generation.",
        width: 1014,
        height: 484,
      },
      {
        kind: "image",
        src: "/projects/focus-ritual/Screenshot 2026-04-09 225706.png",
        alt: "Focus Ritual habit tracker with a weekly calendar and filters.",
        width: 1010,
        height: 498,
      },
      {
        kind: "image",
        src: "/projects/focus-ritual/Screenshot 2026-04-09 225716.png",
        alt: "Focus Ritual ambient sound mixer with rain, ocean, forest, and cafe controls.",
        width: 995,
        height: 490,
      },
      {
        kind: "image",
        src: "/projects/focus-ritual/Screenshot 2026-04-09 225722.png",
        alt: "Focus Ritual AI Coach interface with study prompts and focus insights.",
        width: 1026,
        height: 495,
      },
    ],
  },
  {
    slug: "getlab-system",
    title: "GetLab System",
    kind: "showcase",
    categories: ["web", "rnd"],
    classification: "university",
    productionStatus: "prototype",
    studioRole: "Desktop systems architecture and relational-database workflow design.",
    context: "A completed C# WinForms desktop system demonstrating three-tier relational architecture and stored-procedure enforcement on SQL Server.",
    evidence: ["Stage 2 showcase case study, section 7.5: completed desktop-system scope.", "Stage 2 visual asset manifest, showcase 11: spec-backed entry with no public raster screenshots."],
    surfaces: ["C# WinForms desktop application", "SQL Server relational database", "Stored-procedure enforcement"],
    targetUser: "Laboratory facilities, campus equipment pools, and hardware-lending operations.",
    problem: "Shared facilities need conflict-free scheduling for short checkouts, multi-day loans, and room bookings.",
    scope: ["Equipment and room scheduling", "Loan workflows", "Damage reports", "Approval queues"],
    scopeBoundary: "The source identifies a completed desktop system; no public raster screenshots are registered.",
    technologies: ["C#", "WinForms", "SQL Server 2019+"],
    media: [],
  },
  {
    slug: "collab-platform",
    title: "AI Collab Platform",
    kind: "showcase",
    categories: ["web", "ai", "rnd"],
    classification: "concept",
    productionStatus: "prototype",
    studioRole: "Real-time collaboration and shared AI-context prototyping.",
    context: "A standalone R&D prototype for engineering teams exploring live code editing and shared in-room AI context.",
    evidence: ["Stage 2 showcase case study, section 7.6: prototype scope.", "Stage 2 visual asset manifest, showcase 12: spec-backed entry with no public raster screenshots."],
    surfaces: ["React collaboration client", "Socket.io room sync", "Shared Gemini context stream"],
    targetUser: "Product engineering teams exploring shared editing and room-level AI context.",
    problem: "Asynchronous discussion and isolated AI prompts fragment shared engineering problem-solving.",
    scope: ["Shared code editing", "Room chat", "File sharing", "Room-level AI context"],
    scopeBoundary: "R&D prototype; the manifest records no raster screenshot assets.",
    technologies: ["React", "Node.js", "Express", "Socket.io", "Google Gemini API"],
    media: [],
  },
  {
    slug: "agency-os",
    title: "AgencyOS",
    kind: "showcase",
    categories: ["web", "rnd"],
    classification: "concept",
    productionStatus: "concept",
    studioRole: "Internal studio-tool concept and dashboard design build.",
    context: "Concept and UI design build with four verified dashboard screens and a walkthrough. A Next.js, PostgreSQL, and BullMQ backend is anticipated future work, not a deployed system.",
    evidence: ["Stage 2 showcase case study, section 7.7: concept and anticipated-backend boundary.", "Stage 2 visual asset manifest, showcase 13: four verified screens and walkthrough."],
    surfaces: ["Agency operations dashboard concept", "Client workspace concept", "Delivery and financials screens"],
    targetUser: "Growing service agencies and multi-client delivery teams evaluating a unified command center.",
    problem: "Disconnected delivery, client, and finance tools create manual coordination and risk exposing internal margins.",
    scope: ["Executive performance dashboard", "Delivery kanban", "Client workspace", "Financial tracking"],
    scopeBoundary: "Concept/UI design build only. The documented backend stack is anticipated and has not been described as deployed.",
    technologies: ["Next.js (anticipated)", "PostgreSQL (anticipated)", "BullMQ (anticipated)"],
    media: [
      {
        kind: "image",
        src: "/projects/AgencyOS/stitch_agency_operating_system/executive_performance_dashboard/screen.png",
        alt: "AgencyOS executive dashboard concept displaying net profit, active clients, and revenue chart.",
        width: 1600,
        height: 1280,
      },
      {
        kind: "image",
        src: "/projects/AgencyOS/stitch_agency_operating_system/agency_kanban_board/screen.png",
        alt: "AgencyOS delivery board concept tracking milestones and contract review gates.",
        width: 1600,
        height: 1280,
      },
      {
        kind: "image",
        src: "/projects/AgencyOS/stitch_agency_operating_system/client_workspace_brandx/screen.png",
        alt: "AgencyOS client workspace concept showing deliverable progress and project artifacts.",
        width: 1600,
        height: 1280,
      },
      {
        kind: "image",
        src: "/projects/AgencyOS/stitch_agency_operating_system/financials_expense_tracking/screen.png",
        alt: "AgencyOS financial tracking concept listing milestone invoices and operational expenses.",
        width: 1600,
        height: 1280,
      },
      {
        kind: "video",
        src: "/projects/AgencyOS/preview.mp4",
        alt: "AgencyOS concept dashboard walkthrough.",
        preload: "metadata",
        caption: "Walkthrough of the AgencyOS concept dashboard screens.",
      },
    ],
  },
];

export type ProjectCatalogRecord = CaseStudy | ShowcaseBuild;
export const projectCatalog: ProjectCatalogRecord[] = [...caseStudies, ...showcaseBuilds];

export const publicCaseStudies = caseStudies.filter(
  (study) => study.publicationStatus === "public" &&
    study.results.every((result) => result.proofState !== "unverified") &&
    study.clientNamePermission !== "pending" &&
    study.screenshotPermission !== "pending",
);

/*
 * What we build: the kind of product, which is a different question from how
 * we work. Keeping the two apart is why `offers` below holds three ways of
 * working rather than a mixed list with a product type inside it.
 */
export const builds = [
  {
    name: "Web apps & dashboards",
    summary:
      "Internal tools, operations platforms and customer-facing apps — the screens a team lives in all day. Roles and permissions, reporting that reconciles, and states that hold up when two people act at once.",
  },
  {
    name: "Mobile apps",
    summary:
      "iOS and Android for work that happens away from a desk — drivers, field staff, customers at a counter. Built to stay useful on a bad connection and to reconcile cleanly when it comes back.",
  },
  {
    name: "Integrations & automation",
    summary:
      "The wiring between systems that were never meant to talk — payment rails, loyalty engines, ERPs, queues. One contract in the middle, so a change on one side does not quietly break the other.",
  },
] as const;

/*
 * How we work: four defined commercial engagements. Each has an explicit
 * duration, range, outcome, boundary, and next step.
 */
export const offers = [
  {
    value: "blueprint",
    slug: "blueprint",
    name: "Product Blueprint",
    duration: "5–10 business days",
    pricing: "$350–$1,200",
    pricingCurrency: "USD",
    bestFit: "For a high-stakes workflow that needs clarity before anyone writes code.",
    outcome:
      "A decision-ready direction: the scope, the technical plan, the risks named out loud, and an estimate you can hold us to.",
    boundary: "A foundation, not a disguised build. No production code ships in a Blueprint.",
    next: "Most continue into a Launch Sprint. The plan is yours either way.",
  },
  {
    value: "launch-sprint",
    slug: "launch-sprint",
    name: "Launch Sprint",
    duration: "6–10 weeks",
    pricing: "$3,000–$8,000",
    pricingCurrency: "USD",
    bestFit: "For a defined product or workflow that is ready to become a working release.",
    outcome:
      "A usable product in production, the essentials connected, and the decisions behind it written down rather than carried in someone's head.",
    boundary:
      "The agreed outcome, not an open-ended feature list. New scope is a new agreement, said plainly.",
    next: "Hand it to your own team with the handover done properly, or continue into Product Care.",
  },
  {
    value: "operations-platform",
    slug: "operations-platform",
    name: "Operations Platform",
    duration: "8–16+ weeks, phased",
    pricing: "$6,000–$15,000+ (Phase 1)",
    pricingCurrency: "USD",
    bestFit: "For an operation that needs one connected platform across customer, staff, and head-office workflows.",
    outcome:
      "A phased multi-surface system connecting customer apps, staff or POS terminals, and a management dashboard behind one API contract.",
    boundary: "Phase 1 has an agreed scope and acceptance milestones; later phases are separately planned.",
    next: "Hand over the platform to your team, or continue with Product Care for prioritized improvements.",
  },
  {
    value: "product-care",
    slug: "product-care",
    name: "Product Care",
    duration: "Monthly",
    pricing: "$400–$1,500+/mo",
    pricingCurrency: "USD",
    bestFit: "For a live product that needs deliberate improvement — not a help desk.",
    outcome:
      "Agreed capacity each month for prioritized fixes, refinements, and the next increment against a backlog you own.",
    boundary: "The priorities you set. It is not an open retainer, and it is not on-call cover.",
    next: "It runs for as long as it earns its place, and ends cleanly when it stops earning it.",
  },
] as const;

export const faqs = [
  [
    "How does Kepler Dev scope and price custom software engagements?",
    "Kepler Dev scopes custom engagements through four structured commercial tiers: a fixed-definition Product Blueprint ($350–$1,200), a focused Launch Sprint ($3,000–$8,000 for initial production releases), an Operations Platform build ($6,000–$15,000+ phased), and monthly Product Care ($400–$1,500+/mo). Every engagement begins with explicit architectural boundaries, OpenAPI schemas, and verifiable acceptance milestones before production development begins.",
  ],
  [
    "What kinds of operational, web, and mobile platforms does Kepler Dev build?",
    "Kepler Dev engineers multi-surface systems connecting mobile applications, industrial hardware, and management dashboards. Production examples include the Glitre fuel loyalty ecosystem connecting four surfaces under one contract, the HS VPN utility with native mobile tunnels, QuickChargingPOS on Sunmi Android hardware, and MedConnect Egypt uniting patient, physician, and admin portals under cryptographic privacy.",
  ],
  [
    "How does Kepler Dev handle Arabic-first RTL, offline networks, and regional compliance?",
    "Kepler Dev designs native Arabic-first RTL interfaces paired with English localization for GCC operations. In QuickChargingPOS, our team integrated custom Java modules for Sunmi terminals to execute HMAC-SHA256 signed Mada payments offline. In Aksira, we embedded bilingual writing within a native Android keyboard, while Glitre and Qiraaty implement append-only ledgers and ZATCA compliance.",
  ],
  [
    "Who owns the source code, API contracts, and infrastructure after launch?",
    "Clients maintain 100% unconditional ownership of all source code, database architectures, OpenAPI specifications, and deployment infrastructure upon milestone completion. Kepler Dev deploys directly to client-owned cloud environments, such as Microsoft Azure UAE North or AWS. We provide complete technical documentation, schema drift testing in continuous integration, and optional monthly Product Care maintenance without proprietary lock-in.",
  ],
] as const;

export const classificationLabels: Record<Classification, string> = {
  client: "Client work",
  employer: "Employer work",
  internal: "Internal build",
  "owned-product": "Owned product",
  university: "University project",
  concept: "Concept",
};
