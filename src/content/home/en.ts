import { faqs, offers } from "@/lib/content";
import type { HomeCopy } from "./types";

/** English homepage copy. The Arabic version mirrors these keys (see README). */
export const homeEn: HomeCopy = {
  lang: "en",
  dir: "ltr",

  hero: {
    brand: "Kepler Dev",
    headline: "designs and builds digital products, from first idea to production.",
    workLink: "See selected work",
  },

  work: {
    eyebrow: "Selected work",
    allWork: "All work",
    deliveredLabel: "What was delivered",
    screensLabel: "Illustrative screens",
    screenPrefix: "Illustrative screen:",
    screens: {
      customer: "Customer app, Arabic-first",
      ledger: "Head-office points ledger",
      staff: "Station staff app",
      contract: "One API contract behind every app",
    },
    swipeHint: "Swipe for more",
    caseStudyLink: "Read the case study",
    empty: {
      eyebrow: "Private by nature",
      title: "Relevant work, shared with context.",
      body: "Much of our work is private. We share suitable examples directly, with permission and the story behind each decision.",
    },
  },

  growth: {
    eyebrow: "From idea to production",
    title: "Every product grows from a single idea.",
    lead: "We follow the same four steps on every engagement, so an early idea becomes a working product—and a working product keeps getting better.",
    steps: [
      {
        number: "01",
        title: "Listen closely",
        body: "We learn your context, goals, and challenges before suggesting a single solution.",
      },
      {
        number: "02",
        title: "Find the focus",
        body: "We define the right problems to solve and the outcomes that matter most.",
      },
      {
        number: "03",
        title: "Make it real",
        body: "We design and build products that are useful, usable, and built to last.",
      },
      {
        number: "04",
        title: "Improve with care",
        body: "We evolve your product with insight and long-term partnership.",
      },
    ],
  },

  founder: {
    eyebrow: "Founder-led",
    name: "Mahmoud Mohamed Attia",
    role: "Founder & Product Engineer",
    photoAlt: "Mahmoud Mohamed Attia, founder of Kepler Dev",
    title: "One accountable partner from first conversation to launch.",
    quote:
      "“I started Kepler Dev because too much product work ships without anyone really understanding the operation it has to serve.”",
    facts: [
      { label: "Based in", value: "United Kingdom and Cairo, Egypt" },
      { label: "Working with", value: "Teams across the GCC and worldwide" },
      { label: "Languages", value: "Arabic, English, French and German" },
      { label: "Involvement", value: "Discovery through delivery" },
    ],
    link: "Meet the founder",
  },

  services: {
    eyebrow: "Ways to work together",
    title: "Focused support for the next useful move.",
    notSure: "Not sure which fits? Start a conversation",
    whatYouGet: "What you get",
    discuss: "Discuss this route",
    offers,
  },

  faq: {
    eyebrow: "Questions, answered",
    title: "A clear place to begin.",
    items: faqs,
  },

  closing: {
    eyebrow: "Ready to start?",
    title: "Tell us what you're building.",
    button: "Start a conversation",
    note: "A short conversation can save weeks of guesswork.",
  },

  mobileCta: "Start a conversation",

  screens: {
    staff: {
      scanned: "Code scanned",
      purchase: "Purchase",
      points: "Points",
      station: "Station",
      stationValue: "Station A",
      code: "Code",
      codeValue: "Single use",
      confirm: "Confirm purchase",
      retryNote: "Settles once, even if retried",
    },
    ledger: {
      office: "Head office",
      nav: ["Stations", "Customers", "Transactions", "Complaints", "Offers"],
      activeNavIndex: 2,
      title: "Points ledger",
      appendOnly: "Append-only, enforced by the database",
      entry: "Entry",
      points: "Points",
    },
    contract: {
      clients: ["Customer app", "Staff app", "Dashboard"],
      core: "One API contract",
      coreDetail: "60 operations",
      services: ["Loyalty services", "Points ledger", "Message queue"],
    },
    contextBrief: {
      title: "Context brief",
      chip: "Draft",
      done: ["Who uses it", "Where work slows down"],
      pending: "What success looks like",
    },
    blueprint: {
      title: "Product blueprint",
      chip: "Scope agreed",
      rows: [
        { label: "Customer onboarding", priority: "must", priorityLabel: "Must" },
        { label: "Operations dashboard", priority: "must", priorityLabel: "Must" },
        { label: "Admin roles and access", priority: "next", priorityLabel: "Next" },
      ],
    },
    release: {
      title: "Working release",
      chip: "Live",
      journey: ["Submitted", "In review", "Approved", "Onboarding"],
      surfaces: ["Customer app", "Operations", "Admin"],
    },
    notes: {
      title: "Release notes",
      chip: "Ongoing",
      rows: [
        { version: "v1.4", label: "Export to spreadsheet", shipped: false },
        { version: "v1.3", label: "Arabic interface", shipped: true },
        { version: "v1.2", label: "Faster search", shipped: true },
      ],
      shipped: "Shipped",
      inProgress: "In progress",
    },
  },
};
