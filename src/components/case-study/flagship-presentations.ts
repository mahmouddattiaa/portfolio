export interface FlagshipPresentation {
  eyebrow: string;
  headline: string;
  lead: string;
  snapshot: Array<{ label: string; value: string }>;
  metrics: Array<{ value: string; label: string; source: string }>;
  before: { heading: string; points: string[] };
  after: { heading: string; points: string[] };
  architectureHeading: string;
  architectureLine: string;
  architectureText: string;
  nodes: Array<{ title: string; detail: string; column: 0 | 1 | 2 }>;
  edges: Array<[number, number, string?]>;
  decisions: Array<{ heading: string; consequence: string; mechanism: string }>;
  galleryHeading: string;
  evidenceNote: string;
  offer: "blueprint" | "launch-sprint" | "operations-platform" | "product-care";
}

export const flagshipPresentations: Record<string, FlagshipPresentation> = {
  "quickcharging-pos": {
    eyebrow: "Flagship study · industrial Android POS",
    headline: "Local payment and offline records keep the forecourt moving.",
    lead: "A React Native terminal connects the attendant workflow to the installed Nami POS app and Sunmi hardware, then reconciles delivery records when the network returns.",
    snapshot: [
      { label: "Classification", value: "Client work · production on Sunmi Android POS" },
      { label: "Our role", value: "Industrial mobile and hardware integration engineering" },
      { label: "Surface", value: "React Native terminal · Java bridge · Sunmi printer · .NET API" },
      { label: "Boundary", value: "Android Sunmi deployment; no iOS payment or printer path is claimed." },
    ],
    metrics: [
      { value: "0 sec", label: "Cloud gateway overhead on the local Android intent path", source: "Stage 2 flagship case study §3.A–D" },
      { value: "50 records", label: "Offline fuel-delivery queue capacity", source: "Stage 2 flagship case study §3.A, §3.D" },
      { value: "SHA-256", label: "HMAC-signed EMV and Mada payloads", source: "Stage 2 flagship case study §3.A, §3.D" },
      { value: "100%", label: "Native Sunmi ESC/POS thermal printing", source: "Stage 2 flagship case study §3.A, §3.D" },
    ],
    before: { heading: "Before", points: ["Cloud payment round trips added 3–5 seconds at busy bays.", "The cross-platform app could not directly call the signed Mada protocol or Sunmi printer bindings.", "Delivery records were at risk when forecourt connectivity dropped."] },
    after: { heading: "After", points: ["A local Android intent reaches the installed Nami POS app for authorization.", "Sunmi prints the receipt after settlement; client UUIDs keep retries idempotent.", "A local queue holds up to 50 delivery records until synchronization resumes."] },
    architectureHeading: "A local hardware bridge sits between the terminal app and payment devices.",
    architectureLine: "Payment and printing stay on the Sunmi device; delivery records sync to the .NET API when connectivity allows.",
    architectureText: "The React Native app sends a signed payment request through a Java NamiPayModule to the installed Nami POS app, receives the settlement result, prints through the Sunmi service, and synchronizes an idempotent delivery queue with the QuikCompany API.",
    nodes: [
      { title: "React Native POS", detail: "Attendant and station manager flows", column: 0 },
      { title: "StationDataContext", detail: "AsyncStorage offline delivery queue", column: 0 },
      { title: "NamiPayModule.java", detail: "SHA-256 HMAC · Android intent", column: 1 },
      { title: "Sunmi printer wrapper", detail: "ESC/POS receipt printing", column: 1 },
      { title: "Nami POS app", detail: "Local EMV / Mada authorization", column: 2 },
      { title: "QuikCompany API", detail: "Idempotent delivery reconciliation", column: 2 },
    ],
    edges: [[0, 2], [0, 3], [2, 4, "signed intent"], [1, 5, "when online"]],
    decisions: [
      { heading: "Local intent over a cloud payment round trip", consequence: "Attendants avoid the documented 3–5 second gateway wait at the pump.", mechanism: "Java builds an ecr-txn-event intent and signs its terminal and transaction references with SHA-256 HMAC before calling the installed Nami POS app." },
      { heading: "A hardware wrapper with an emulator path", consequence: "Receipts print directly on Sunmi terminals while standard emulators still exercise checkout flows.", mechanism: "The patched printer module handles ESC/POS layout on hardware and structured telemetry where printer services are absent." },
      { heading: "Station binding with a bounded offline queue", consequence: "A single APK can be provisioned per station, and delivery records survive a network outage.", mechanism: "AsyncStorage keeps up to 50 records with sync state; client UUIDs make reconciliation idempotent." },
    ],
    galleryHeading: "Production terminal screens.",
    evidenceNote: "Deployment and technical boundaries are recorded in the Stage 2 flagship case study and verified terminal asset inventory. Broader multi-tenant configuration hardening remains planned.",
    offer: "operations-platform",
  },
  "medconnect-egypt": {
    eyebrow: "Flagship study · healthcare operations MVP",
    headline: "Referral, clinic check-in and patient records share one protected workflow.",
    lead: "A NestJS API connects doctor and secretary mobile flows, a patient portal and a network admin console for Egypt-focused referral operations.",
    snapshot: [
      { label: "Classification", value: "Studio product build · multi-surface MVP" },
      { label: "Our role", value: "Full-stack architecture, security schema and mobile/web delivery" },
      { label: "Surfaces", value: "Doctor and secretary app · patient portal · admin console" },
      { label: "Boundary", value: "KMS key rotation and several external integrations remain Phase 2 work." },
    ],
    metrics: [
      { value: "38+", label: "Screens across three portals", source: "Stage 2 flagship case study §4.A" },
      { value: "256-bit", label: "AES encryption for patient National IDs", source: "Stage 2 flagship case study §4.A, §4.D" },
      { value: "O(1)", label: "Deterministic blind-index lookup", source: "Stage 2 flagship case study §4.A, §4.D" },
      { value: "3 roles", label: "Doctor · patient/secretary · admin", source: "Stage 2 flagship case study §4.A" },
    ],
    before: { heading: "Before", points: ["Referrals sent by handwritten notes or WhatsApp lost clinical context and visit attribution.", "Clinics had no reliable way to confirm an in-person visit.", "Encrypted National IDs could not be checked for duplicates with ordinary plaintext SQL lookup."] },
    after: { heading: "After", points: ["Doctors create referrals and patients receive a referral-linked discount code.", "A geofenced secretary check-in changes referral state and records the commission ledger entry.", "Encrypted IDs stay unreadable at rest while a blind index supports duplicate checks."] },
    architectureHeading: "One NestJS API coordinates three portals and a protected relational record.",
    architectureLine: "Authentication and referral state pass through shared domain modules; patient identity fields remain encrypted in PostgreSQL.",
    architectureText: "Doctor, patient and admin portals authenticate against one NestJS monolithic API. Referral and geofence logic uses a shared wallet ledger; patient identity is encrypted with AES-256 and indexed by a deterministic SHA-256 hash. PostgreSQL stores domain records and Redis holds session and check-in state.",
    nodes: [
      { title: "Doctor & secretary app", detail: "React Native / Expo", column: 0 },
      { title: "Patient portal", detail: "Mobile and web", column: 0 },
      { title: "Network admin", detail: "React web console", column: 0 },
      { title: "NestJS API", detail: "JWT · RBAC · referrals · wallet", column: 1 },
      { title: "Privacy module", detail: "AES-256 + SHA-256 blind index", column: 1 },
      { title: "PostgreSQL + Redis", detail: "Records · ledger · session state", column: 2 },
    ],
    edges: [[0, 3], [1, 3], [2, 3], [3, 4], [4, 5], [3, 5]],
    decisions: [
      { heading: "Encrypt identity while keeping duplicate checks practical", consequence: "A database backup does not expose readable National IDs, and intake can still detect existing patients.", mechanism: "AES-256 ciphertext is stored beside a deterministic SHA-256 blind index with a unique database constraint." },
      { heading: "Require a geofenced check-in before referral credit", consequence: "Remote claims cannot quietly trigger a clinic referral payout.", mechanism: "The NestJS state transition checks the secretary device location against the registered clinic geofence before writing the wallet ledger." },
      { heading: "Keep related domains in one deployable API", consequence: "A lean team can audit authentication, referrals and wallet accounting without premature distributed-system overhead.", mechanism: "A NestJS monolith in an npm-workspaces repository shares domain modules and a relational wallet and transaction ledger." },
    ],
    galleryHeading: "Three portals, five verified screens.",
    evidenceNote: "The MVP scope and screen count are from the Stage 2 case study. KMS-backed key rotation, live payment settlement, diagnostic lab APIs and push delivery remain Phase 2 boundaries.",
    offer: "operations-platform",
  },
  stayease: {
    eyebrow: "Flagship study · hospitality web platform",
    headline: "A room stays reserved while checkout and payment settle.",
    lead: "A React web platform combines geospatial discovery, a short booking flow and transactional holds so the last available room cannot be confirmed twice.",
    snapshot: [
      { label: "Classification", value: "Studio product build · full-stack web application" },
      { label: "Our role", value: "Full-stack engineering, transaction concurrency and Stripe integration" },
      { label: "Surface", value: "React web SPA · Node/Express API · host dashboard" },
      { label: "Boundary", value: "Web application, not a native mobile app; captures remain portrait scroll strips." },
    ],
    metrics: [
      { value: "10 min", label: "Transactional room hold before expiry", source: "Stage 2 flagship case study §5.A, §5.C–D" },
      { value: "3 steps", label: "Maximum checkout flow", source: "Stage 2 flagship case study §5.A" },
      { value: "<200 ms", label: "Documented cached and indexed city search", source: "Stage 2 flagship case study §5.A, §5.D" },
      { value: "24h", label: "Post-check-in Stripe Connect payout window", source: "Stage 2 flagship case study §5.A, §5.D" },
    ],
    before: { heading: "Before", points: ["Stale room counts could fail a booking after card entry.", "Two guests could race for the final room and create overlapping reservations.", "Repeated payment webhooks could duplicate booking confirmations or host payouts."] },
    after: { heading: "After", points: ["Guests see upfront pricing and search map-bounded inventory.", "A fresh availability check creates a 10-minute transactional hold before payment.", "Redis event deduplication protects booking and payout updates from webhook retries."] },
    architectureHeading: "Availability, payment and host updates each have a clear boundary.",
    architectureLine: "Search cache speeds discovery; transactional holds and idempotent webhook handling protect the booking path.",
    architectureText: "The React SPA uses a Node and Express API for geospatial search, room holds, webhook settlement and real-time host updates. MongoDB transactions protect the 10-minute reservation hold; Redis caches search and records processed Stripe event IDs; S3 and Lambda produce property image variants.",
    nodes: [
      { title: "React web SPA", detail: "Search · checkout · host tools", column: 0 },
      { title: "Geospatial search", detail: "MongoDB 2dsphere + Redis cache", column: 1 },
      { title: "Booking engine", detail: "MongoDB transaction · 10m TTL hold", column: 1 },
      { title: "Stripe webhook guard", detail: "Redis processed-event log", column: 1 },
      { title: "MongoDB + Redis", detail: "Reservations · cache · event IDs", column: 2 },
      { title: "S3 · CloudFront · Lambda", detail: "Property image variants", column: 2 },
    ],
    edges: [[0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [3, 4], [0, 5, "photo upload"]],
    decisions: [
      { heading: "Use a transactional hold before checkout", consequence: "Concurrent guests cannot both confirm the final room.", mechanism: "A fresh availability check inserts a temporary reservation in a MongoDB transaction; the hold expires after 10 minutes if payment is abandoned." },
      { heading: "Deduplicate payment events before changing bookings", consequence: "Webhook retries do not send duplicate confirmations or credit hosts twice.", mechanism: "Redis records Stripe event IDs atomically before booking, real-time update or payout work proceeds." },
      { heading: "Index search and optimize property imagery separately", consequence: "Map searches remain responsive without loading full-resolution host photos into the listing view.", mechanism: "A MongoDB 2dsphere index and short Redis cache serve search; S3 uploads trigger Lambda thumbnail, medium and full variants." },
    ],
    galleryHeading: "Mobile web viewport scroll captures.",
    evidenceNote: "The Stage 2 case study documents the search, hold and webhook design and the portrait viewport captures. StayEase is a web application; the image gallery preserves the original portrait scroll strips.",
    offer: "launch-sprint",
  },
  "classroom-sentinel": {
    eyebrow: "Flagship study · self-hosted automation",
    headline: "Course deadlines arrive once, with the source kept in view.",
    lead: "A small asyncio service joins structured Classroom coursework with schema-checked extraction from free-text announcements, then tracks reminder windows in SQLite.",
    snapshot: [
      { label: "Classification", value: "Studio automation system · production self-hosted daemon" },
      { label: "Our role", value: "Python systems architecture, bounded AI parsing and delivery automation" },
      { label: "Surface", value: "Google Classroom API · SQLite · Telegram bot · systemd" },
      { label: "Boundary", value: "Single-owner bot with an allowlist; not a multi-tenant SaaS product." },
    ],
    metrics: [
      { value: "24/7", label: "Headless polling daemon", source: "Stage 2 flagship case study §6.A, §6.D" },
      { value: "30 min", label: "Sync and reminder interval", source: "Stage 2 flagship case study §6.A–B" },
      { value: "24h + 2h", label: "Reminder windows tracked per deadline", source: "Stage 2 flagship case study §6.A, §6.D" },
      { value: "7 scopes", label: "Read-only Google OAuth permissions", source: "Stage 2 flagship case study §6.A" },
    ],
    before: { heading: "Before", points: ["Announcements and due dates were scattered across multiple Classroom identities.", "Expired OAuth tokens could stall unattended scripts that expected a browser login.", "Repeated polling or unstructured model output could produce duplicate or inaccurate reminders."] },
    after: { heading: "After", points: ["A headless poller collects coursework and announcements across tracked accounts.", "Official due-date fields are parsed deterministically; only free-text announcements reach Gemini with a JSON Schema.", "SQLite reminder flags make each 24-hour or 2-hour alert one-time and actionable."] },
    architectureHeading: "Structured dates stay deterministic; AI only handles free-text announcements.",
    architectureLine: "An auth guard protects the headless poller, while SQLite is the state boundary for deadline and reminder delivery.",
    architectureText: "Google Classroom account tokens pass through a headless refresh guard into a 30-minute asyncio poller. Structured coursework goes to a deterministic parser; free-text announcements go to Gemini with schema constraints. SQLite stores deduplication and reminder flags before the allowlisted Telegram bot sends alerts.",
    nodes: [
      { title: "Google Classroom API", detail: "Multiple OAuth account tokens", column: 0 },
      { title: "Refresh guard + poller", detail: "Headless auth · asyncio · 30m", column: 1 },
      { title: "Coursework parser", detail: "Native title and due fields", column: 1 },
      { title: "Gemini classifier", detail: "Free text only · JSON Schema", column: 1 },
      { title: "SQLite sentinel.db", detail: "Deduplication · reminder flags", column: 2 },
      { title: "Telegram bot", detail: "Allowlisted reminders and digests", column: 2 },
    ],
    edges: [[0, 1], [1, 2, "structured"], [1, 3, "free text"], [2, 4], [3, 4], [4, 5]],
    decisions: [
      { heading: "Keep official coursework dates out of the language model", consequence: "Structured assignment deadlines do not drift through generated date guesses.", mechanism: "Native Classroom dueDate and dueTime fields are parsed directly; only announcement prose uses Gemini under JSON Schema and enum limits." },
      { heading: "Guard OAuth refresh for background execution", consequence: "An expired token alerts the operator instead of opening a phantom browser or freezing the service.", mechanism: "Interactive setup and background polling use separate auth context; an AuthRequiredError routes an actionable message to the allowlisted Telegram ID." },
      { heading: "Persist deduplication and reminder thresholds", consequence: "Overlapping polling cycles do not send repeated alerts, and marking a task done silences later reminders.", mechanism: "SQLite records announcement IDs plus 24-hour, 2-hour and completed flags before Telegram dispatch." },
    ],
    galleryHeading: "The service mark and live daemon walkthrough.",
    evidenceNote: "The production and single-owner boundaries, reminder schedule, and OAuth allowlist are drawn from the Stage 2 case study. The service is a self-hosted daemon, not a multi-tenant web application.",
    offer: "blueprint",
  },
};
