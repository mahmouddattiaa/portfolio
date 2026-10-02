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
      "Role-aware screens, access-denied paths, silent token refresh.",
    notShown: "Dashboard is live and used internally; no live screenshots published.",
    href: "/work/glitre-loyalty-platform/manager",
  },
  {
    key: "customer-app",
    product: "Customer app",
    scope:
      "21 screens designed in Arabic-first RTL; five are still placeholders.",
    evidence:
      "Five end-to-end screen flows traced through the screens.",
    notShown: "Preparing for store release — no store listing yet.",
    href: "/work/glitre-loyalty-platform/customer-app",
  },
  {
    key: "worker-app",
    product: "Worker app",
    scope: "Android station operations; scanner-led; 14 screens with server-authoritative hand-offs.",
    evidence:
      "No false success, no client-side balance, idempotent retries.",
    notShown: "No production-station deployment or POS hardware qualification yet.",
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
    next: "SMS sender and production seed data next.",
  },
  {
    surface: "Manager dashboard",
    status: "Live and used internally by head office.",
    next: "No live screenshots published with this case study.",
  },
  {
    surface: "Customer app",
    status:
      "21 screens designed in Arabic-first; the public station flows render in the build.",
    next:
      "Preparing for store release — OTP, in-app Terms, and a production signing key next.",
  },
  {
    surface: "Worker app",
    status:
      "Built for an Android station device; 14 screens designed.",
    next:
      "POS integration planned, not complete — hardware qualification next.",
  },
] as const;
