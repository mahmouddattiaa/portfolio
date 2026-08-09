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
export const caseStudies: CaseStudy[] = [];

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
  ["What kinds of projects are a good fit?", "Work is a strong fit when a real operational problem needs a clearer, more connected product—not another disconnected tool."],
  ["Do I need a complete specification before getting in touch?", "No. A useful starting point is the workflow that is currently difficult, repetitive, or hard to see end to end."],
  ["How long will my project take?", "That depends on the problem, the decision speed, and what needs to be connected. A project review is used to define a sensible next step before timing is discussed."],
  ["How is pricing determined?", "Pricing follows the scope, risk, and ownership required. It is discussed after the project review, not presented as a generic menu."],
  ["Will I own the product and source code?", "Ownership and handover are agreed clearly as part of the engagement so the product can remain useful beyond a single delivery cycle."],
  ["Can Kepler Dev improve an existing product?", "Yes—when the existing product, workflow, and decision constraints are understood well enough to make meaningful improvements."],
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
