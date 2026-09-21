import type { ServicesCopy } from "./types";

/** English copy for the services page. Mirrors the approved design canvas. */
export const servicesEn: ServicesCopy = {
  lang: "en",
  dir: "ltr",

  hero: {
    eyebrow: "Services",
    headline: "Decide it, build it, keep it running.",
    lead: "We design and build digital products — web apps and dashboards, mobile apps, and the integrations that connect them. Three engagements cover the work, each one paid and each one with a defined end. Most teams start with the first.",
    leadPhone:
      "We design and build digital products — web apps and dashboards, mobile apps, and the integrations that connect them. Three engagements cover the work, each one paid and each one with a defined end.",
    workLink: "See what we have built",
  },

  builds: {
    eyebrow: "What we build",
    title: "Three kinds of product.",
    line: "Most engagements are one of these. Several are two of them talking to each other.",
  },

  engagements: {
    eyebrow: "How we work",
    title: "Three engagements.",
    line: "Each one is paid, each one has a defined end, and each one is useful on its own. They compose in order, but none of them obliges you to the next.",
    labels: {
      bestFit: "For",
      outcome: "You get",
      boundary: "It stops at",
      next: "Then",
    },
  },

  path: {
    eyebrow: "The path",
    title: "They compose, in that order.",
    line: "You can start anywhere. Most teams start at the left, because the cheapest place to change your mind is before the build.",
    steps: [
      "Work out what is worth building.",
      "Build it and put it in production.",
      "Keep it working and keep it moving.",
    ],
  },

  team: {
    eyebrow: "Who does the work",
    title: "A small team, named up front.",
    body: "Kepler Dev is a founder-led studio. Mahmoud Attia is accountable for technical direction and delivery on every engagement, and specialists join for the parts that genuinely need them — design, mobile, infrastructure. You are told who is working on your product and what they are doing before they start, not after. We would rather turn work down than staff it with people we cannot vouch for.",
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Priced per engagement, once we understand the work.",
    body: "There is no rate card, because the honest price depends on scope, risk and how much ownership you want us to carry. We would rather give you a number we can stand behind than one that quietly changes in week three.",
    rows: [
      {
        label: "How it is set",
        body: "A project review first, then a written scope with a price against it.",
      },
      {
        label: "What you own",
        body: "Ownership and handover are agreed in writing before the work starts.",
      },
    ],
  },

  closing: {
    title: "Tell us what you are trying to build.",
    note: "A project review is a working conversation about the problem, not a pitch. You leave it knowing whether we are the right studio for it.",
    button: "Request a project review",
  },
};
