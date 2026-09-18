export type ThemePreference = "light" | "dark" | "system";

export type Classification =
  | "client"
  | "employer"
  | "internal"
  | "owned-product"
  | "university"
  | "concept";

export type ProofState = "verified-public" | "verified-private" | "unverified";
export type PublicationStatus = "draft" | "public" | "private";

export interface CaseStudy {
  slug: string;
  title: string;
  publicTitle?: string;
  classification: Classification;
  productionStatus: "production" | "pilot" | "prototype" | "in-development" | "concept";
  publicationStatus: PublicationStatus;
  targetUser: string;
  problem: string;
  engagementContext: string;
  mahmoudRole: string;
  teamContext: string;
  scope: string[];
  solution: string;
  technicalChallenges: string[];
  results: Array<{ claim: string; proofState: ProofState; evidenceRef?: string }>;
  technologies: string[];
  media: Array<{ src: string; alt: string; permissionRef?: string }>;
  clientNamePermission: "approved" | "anonymize" | "pending";
  screenshotPermission: "approved" | "anonymize" | "pending";
  lastVerified: string;
}

/**
 * Only records that pass both the publication status and evidence gate are
 * serialized to page components. Keep prospective work in a private register.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "loyalty-operations-platform",
    title: "Connected loyalty and operations platform",
    publicTitle: "Connected loyalty and operations platform",
    classification: "client",
    productionStatus: "production",
    publicationStatus: "public",
    targetUser:
      "Drivers buying fuel and station services, station staff recording purchases, and head-office administrators.",
    problem:
      "Repeat fuel purchases created no continuing relationship, and the operator had no unified way to identify repeat customers, reward verified purchases, run offers, or handle complaints centrally.",
    engagementContext:
      "Private client engagement for a fuel-station network in the GCC. Phase 1, the platform build, was delivered. Phase 2, public launch and compliance, is proposed.",
    mahmoudRole:
      "Product and engineering lead. Product discovery, architecture, the API contract, and delivery.",
    teamContext:
      "A small team of developers working with AI agents on flagship models, each workstream isolated on its own branch against the shared contract, with review before merge.",
    scope: [
      "Contract-first API with 60 operations and 30 data models",
      "Admin dashboard with 9 pages, role-based, Arabic and English",
      "Arabic-first customer application",
      "Android station staff application with QR scanning",
      "In-region cloud environment",
    ],
    solution:
      "One API contract in the middle, generating the clients, fronting the loyalty services, an append-only points ledger, and a retrying message queue, all in-region.",
    technicalChallenges: [
      "An append-only points ledger enforced by a database trigger rather than by convention, so corrections are new reversing entries.",
      "Single-use signed QR codes plus an idempotency key on every write that moves value, so a retry settles once.",
      "Contract-first development with drift detection in CI keeping four clients in step.",
    ],
    results: [
      {
        claim:
          "Production environment live in-region about one month after kickoff.",
        proofState: "verified-private",
        evidenceRef:
          "Private repository and production runbook, owner-verified 2026-09-17.",
      },
      {
        claim:
          "Points history cannot be edited or deleted; the database enforces it and corrections are new visible entries.",
        proofState: "verified-private",
        evidenceRef:
          "Private repository and production runbook, owner-verified 2026-09-17.",
      },
      {
        claim:
          "Four client surfaces stay in step from one API contract, with drift checked in CI.",
        proofState: "verified-private",
        evidenceRef:
          "Private repository and production runbook, owner-verified 2026-09-17.",
      },
    ],
    technologies: ["NestJS", "PostgreSQL", "Redis", "Flutter", "Next.js", "TypeScript", "Azure"],
    media: [],
    clientNamePermission: "anonymize",
    screenshotPermission: "anonymize",
    lastVerified: "2026-09-17",
  },
];

export const publicCaseStudies = caseStudies.filter(
  (study) => study.publicationStatus === "public" &&
    study.results.every((result) => result.proofState !== "unverified") &&
    study.clientNamePermission !== "pending" &&
    study.screenshotPermission !== "pending",
);

export const offers = [
  {
    name: "Product Blueprint",
    bestFit: "For a high-stakes workflow that needs clarity before build.",
    outcome: "A decision-ready product direction, scope, and technical plan.",
    boundary: "A focused foundation—not a disguised full build.",
    next: "Often the right starting point before a Launch Sprint.",
  },
  {
    name: "Launch Sprint",
    bestFit: "For a defined product or workflow ready to become a working release.",
    outcome: "A focused, usable product with the essentials connected.",
    boundary: "Built around the agreed outcome, not an open-ended feature list.",
    next: "Can continue into an Operations Platform or Product Care.",
  },
  {
    name: "Operations Platform",
    bestFit: "For teams replacing fragmented operational tools and handoffs.",
    outcome: "One connected product shaped around the work that matters.",
    boundary: "A product engagement, not a generic software retainer.",
    next: "Can be supported through Product Care after launch.",
  },
  {
    name: "Product Care",
    bestFit: "For teams that need deliberate improvement after a product is live.",
    outcome: "A reliable path for prioritised fixes, refinements, and next steps.",
    boundary: "Capacity is agreed around real product priorities.",
    next: "A continuation for products with a clear owner and backlog.",
  },
] as const;

export const faqs = [
  ["How is pricing determined?", "Pricing follows the scope, risk, and ownership required. It is discussed after the project review, not presented as a generic menu."],
  ["Will I own the product and source code?", "Ownership and handover are agreed clearly as part of the engagement so the product can remain useful beyond a single delivery cycle."],
  ["Who will work on my project?", "Mahmoud remains accountable for technical direction and delivery. Specialist collaborators may be introduced transparently when they are the right fit."],
] as const;

export const classificationLabels: Record<Classification, string> = {
  client: "Client work",
  employer: "Employer work",
  internal: "Internal build",
  "owned-product": "Owned product",
  university: "University project",
  concept: "Concept",
};
