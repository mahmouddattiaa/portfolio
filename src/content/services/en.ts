import type { ServicesCopy } from "./types";

/** English copy for the services page. Mirrors the approved design canvas. */
export const servicesEn: ServicesCopy = {
  lang: "en",
  dir: "ltr",

  hero: {
    eyebrow: "Services",
    headline: "Decide it, build it, keep it running.",
    lead: "We design and engineer digital products — focused v1 web and mobile applications, operational dashboards, and the integrations that connect them. Four structured engagements cover the work, each with a clear scope and a defined end.",
    leadPhone:
      "We design and engineer digital products — web apps, mobile apps, and connected operational systems across four defined engagements.",
    workLink: "See what we have built",
  },

  builds: {
    eyebrow: "What we build",
    title: "Three kinds of product.",
    line: "Most engagements are one of these. Several connect two or three surfaces under one shared OpenAPI contract.",
  },

  engagements: {
    eyebrow: "How we work",
    title: "Four engagements.",
    line: "Each one is fixed-scope, each one has a defined end, and each one is useful on its own. They compose in order, without obliging you to the next.",
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
    line: "You can start anywhere. Founders with a new product idea and operations teams replacing manual workflows usually start with a Product Blueprint, because the cheapest place to change your mind is before the build.",
    steps: [
      "Work out what is worth building and lock the contract.",
      "Ship a focused v1 release and put it in production.",
      "Connect customer, staff, and head-office operations.",
      "Keep it improving on a backlog you own.",
    ],
  },

  team: {
    eyebrow: "How we deliver fast without agency bloat",
    title: "Senior Cairo engineering, one shared contract, and strict verification gates.",
    body: "Three engineering habits keep delivery lean, verifiable, and predictably timed. Senior engineers in Cairo overlap Riyadh and London hours directly with zero account-manager layers; one OpenAPI contract pairs with automated scaffolding so boilerplate never slows down sprints; and mandatory CI schema-drift and verification checks catch defects before launch.",
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Transparent starting tiers, scoped before code starts.",
    body: "The four starting anchors set clear expectations up front; a written scope and verifiable acceptance points lock the actual engagement before development begins.",
    rows: [
      {
        label: "How it is set",
        body: "A project review first, then a written scope, OpenAPI contract, and milestone price.",
      },
      {
        label: "Blueprint credit",
        body: "Every Product Blueprint fee is credited in full if you proceed into a build with us.",
      },
      {
        label: "What you own",
        body: "100% source code, OpenAPI contracts, databases, and cloud accounts transfer cleanly as agreed.",
      },
    ],
  },

  closing: {
    title: "Tell us what you are trying to build.",
    note: "A project review is a working conversation about the problem, not a sales pitch. You leave it knowing whether we are the right studio for it.",
    button: "Request a project review",
  },
};
