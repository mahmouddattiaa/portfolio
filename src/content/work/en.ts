import { offers } from "@/lib/content";
import type { WorkCopy } from "./types";

/** English copy for the work page. Mirrors the keys of the design spec. */
export const workEn: WorkCopy = {
  lang: "en",
  dir: "ltr",

  hero: {
    eyebrow: "Work",
    headline: "The products we design, build and keep running.",
    lead:
      "Each study follows one engagement end to end: the problem, what we designed and built, the decisions that shaped it, and how every claim is evidenced. Client names and screens appear only where we have permission.",
    leadPhone:
      "Each study follows one engagement end to end: the problem, what we designed and built, and how every claim is evidenced.",
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
    heading: "Published studies",
    filterLabel: "Filter work by classification",
    gridLabel: "Published case studies",
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
