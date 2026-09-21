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
 * How we work: three engagements — decide, build, keep running. Each one is
 * paid, each has a defined end, and none of them obliges the client to the
 * next. Rendered by the homepage accordion, the services page and the work
 * page hero, so a change here reaches all three.
 */
export const offers = [
  {
    name: "Product Blueprint",
    bestFit: "For a high-stakes workflow that needs clarity before anyone writes code.",
    outcome:
      "A decision-ready direction: the scope, the technical plan, the risks named out loud, and an estimate you can hold us to.",
    boundary: "A foundation, not a disguised build. No production code ships in a Blueprint.",
    next: "Most continue into a Launch Sprint. Yours does not have to; the plan is yours either way.",
  },
  {
    name: "Launch Sprint",
    bestFit: "For a defined product or workflow that is ready to become a working release.",
    outcome:
      "A usable product in production, the essentials connected, and the decisions behind it written down rather than carried in someone's head.",
    boundary:
      "The agreed outcome, not an open-ended feature list. New scope is a new agreement, said plainly.",
    next: "Hand it to your own team with the handover done properly, or continue into Product Care.",
  },
  {
    name: "Product Care",
    bestFit: "For a live product that needs deliberate improvement — not a help desk.",
    outcome:
      "Agreed capacity each month for prioritised fixes, refinements and the next increment, against a backlog you own.",
    boundary: "The priorities you set. It is not an open retainer, and it is not on-call cover.",
    next: "It runs for as long as it earns its place, and ends cleanly when it stops earning it.",
  },
] as const;

export const faqs = [
  ["How is pricing determined?", "Pricing follows the scope, risk, and ownership required. It is discussed after the project review, not presented as a generic menu."],
  ["Will I own the product and source code?", "Ownership and handover are agreed clearly as part of the engagement so the product can remain useful beyond a single delivery cycle."],
  ["Who will work on my project?", "Kepler Dev is a founder-led studio. Mahmoud Attia is accountable for technical direction and delivery on every engagement, and specialists join for the parts that genuinely need them. You are told who is working on your product before they start, not after."],
] as const;

export const classificationLabels: Record<Classification, string> = {
  client: "Client work",
  employer: "Employer work",
  internal: "Internal build",
  "owned-product": "Owned product",
  university: "University project",
  concept: "Concept",
};
