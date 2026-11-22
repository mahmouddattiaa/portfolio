import { offers } from "@/lib/content";
import type { WorkCopy } from "./types";

/** English copy for the work page. Mirrors the keys of the design spec. */
export const workEn: WorkCopy = {
  lang: "en",
  dir: "ltr",

  hero: {
    eyebrow: "Studio Catalog · 13 Engineered Systems",
    headline: "Production Systems Engineered for Operational Demands",
    lead:
      "Every project in this catalog pairs the business consequence we solved with the exact architectural mechanism deployed in production or applied R&D.",
    leadPhone:
      "Six flagship case studies and seven studio builds verified by production metrics and architectural evidence.",
    servicesLink: "How we work with teams",
  },

  // Taken from the offer itself so the hero cannot drift from the services
  // page. A language that translates the engagement names lists them here
  // instead of deriving them.
  engagements: offers.map((offer) => offer.name),

  howToRead: {
    eyebrow: "How to read this work",
    title: "Published only with permission and evidence.",
    line: "Relevant private examples can be discussed in a project review.",
    rows: [
      {
        label: "Classification",
        body: "Client work, employer work, internal build, owned product, university project or concept. Each study says which it is.",
      },
      {
        label: "Production status",
        body: "In production, pilot, prototype, in development or concept. A running product and an idea are never shown as the same thing.",
      },
      {
        label: "Evidence",
        body: "Every claim is marked as publicly verifiable or privately verified, with the date it was last checked.",
      },
    ],
  },

  studies: {
    heading: "Studio work and case studies",
    filterLabel: "Filter work by classification",
    gridLabel: "Thirteen studio projects and case studies",
    allLabel: "All work",
    countPrefix: "shown",
    countSeparator: "\u00a0\u00b7\u00a0",
    countSuffixSingular: "study",
    countSuffixPlural: "studies",
    moreInPreparation: "more in preparation",
    privateOnRequest: "private examples on request",
    classificationGroup: {
      label: "Classification",
      body: "Client work, employer work, internal build, owned product, university project or concept. Each study says which it is.",
    },
    statusGroup: {
      label: "Production status",
      body: "In production, pilot, prototype, in development or concept. A running product and an idea are never shown as the same thing.",
    },
    evidenceGroup: {
      label: "Evidence",
      body: "Every claim is marked as publicly verifiable or privately verified, with the date it was last checked.",
    },
    lead: {
      ourRole: "Our role",
      context: "Context",
      evidence: "Evidence",
      surfaces: "Surfaces",
      contextAnonymized: "Client name withheld by agreement.",
      verifiedPublic: "Verified publicly",
      verifiedPrivate: "Verified privately",
      lastCheckedPrefix: ", last checked",
    },
    card: {
      ourRole: "Our role",
      read: "Read the case study",
    },
    empty: {
      title: "No published studies match that filter.",
      body: "Try another classification, or request a project review.",
    },
  },

  closing: {
    eyebrow: "Not everything is public",
    title: "The rest is a conversation.",
    button: "Request a project review",
    note: "Work under agreement can be walked through privately, in context.",
  },

  meta: {
    builtWith: "Built with",
  },
};
