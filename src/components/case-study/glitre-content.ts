import type { RailSection } from "./contents-rail";

export const glitreVerifiedLabel = "Verified 2026-10-01";

export const glitreRailSections: RailSection[] = [
  { id: "section-hero", label: "Overview" },
  { id: "section-situation", label: "The situation" },
  { id: "section-loop", label: "The loyalty loop" },
  { id: "section-delivery", label: "What we delivered" },
  { id: "section-architecture", label: "How it fits together" },
  { id: "section-deeper", label: "Deeper studies" },
  { id: "section-decisions", label: "Decisions that matter later" },
];

export type DeeperStudyKey = "manager" | "customer-app" | "worker-app";

export interface DeeperStudyCard {
  key: DeeperStudyKey;
  product: string;
  scope: string;
  evidence: string;
  notShown: string;
  href: string;
}

export const deeperStudyCards: DeeperStudyCard[] = [
  {
    key: "manager",
    product: "Manager dashboard",
    scope: "Stations, workers, customers, transactions, complaints and offers — role-based, Arabic and English.",
    evidence:
      "Role-aware screens in Arabic and English; the access-denied and silent token-refresh paths are part of the design.",
    notShown: "The live dashboard URL is private; this page shows redacted screenshots only.",
    href: "/work/glitre-loyalty-platform/manager",
  },
  {
    key: "customer-app",
    product: "Customer app",
    scope:
      "21 catalogued screens in Arabic-first RTL; the public station flows render in the build.",
    evidence:
      "Five screen flows traced end to end, with the catalogued ComingSoonBody stubs called out honestly.",
    notShown: "The app is preparing for store release — there is no store listing to link to.",
    href: "/work/glitre-loyalty-platform/customer-app",
  },
  {
    key: "worker-app",
    product: "Worker app",
    scope: "Android station operations; scanner-led; 14 screens with server-authoritative hand-offs.",
    evidence:
      "The hand-off discipline (no false success, no client-side balance, idempotent retries) traced to the design spec.",
    notShown: "No production-station deployment and no POS hardware qualification yet.",
    href: "/work/glitre-loyalty-platform/worker-app",
  },
];

export function deeperStudyCardFor(key: DeeperStudyKey): DeeperStudyCard {
  const card = deeperStudyCards.find((item) => item.key === key);
  if (!card) throw new Error(`Unknown deeper study key: ${key}`);
  return card;
}

export function neighbourStudiesFor(active: DeeperStudyKey): DeeperStudyCard[] {
  return deeperStudyCards.filter((card) => card.key !== active);
}

export const breadcrumbLabels = {
  work: "Work",
  overview: "Glitre Loyalty Platform",
  manager: "Manager dashboard",
  customerApp: "Customer app",
  workerApp: "Worker app",
} as const;

export const surfaceStatusRows = [
  {
    surface: "Backend / API",
    status: "Live in Azure UAE North, 2026-08-12.",
    next: "SMS sender, push notifications, tested backup restore, and production seed data are the next phase.",
  },
  {
    surface: "Manager dashboard",
    status: "Live and used internally; not published to the open web.",
    next: "Screenshots on this page are redacted.",
  },
  {
    surface: "Customer app",
    status:
      "Code in place across 21 catalogued screens in Arabic-first RTL; the public station flows render in the build.",
    next:
      "Preparing for store release — store submission, OTP delivery adapter, account deletion, in-app legal docs, token refresh, store-review access, and a production signing key are the next phase.",
  },
  {
    surface: "Worker app",
    status:
      "Built for an Android station device; 14 screens catalogued with server-authoritative hand-offs.",
    next:
      "POS hardware integration is planned, not complete — hardware qualification, MDM distribution, vendor SDK integration, and the choice between public vs managed distribution are the next phase.",
  },
  {
    surface: "POS / forecourt / ZATCA",
    status: "Planned as Release C. The current loop is manual entry by the worker.",
    next: "Release C.",
  },
  {
    surface: "Push notifications",
    status: "Outbox and retry queue exist; the sender adapter is not connected.",
    next: "Any copy about notifications arriving is aspirational until the adapter lands.",
  },
] as const;
