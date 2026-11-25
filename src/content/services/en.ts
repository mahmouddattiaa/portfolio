import type { ServicesCopy } from "./types";

/** English copy for the services page. Mirrors the approved design canvas. */
export const servicesEn: ServicesCopy = {
  lang: "en",
  dir: "ltr",

  hero: {
    eyebrow: "Services & Pricing",
    headline: "Transparent Software Pricing, Fixed-Scope Sprints & Operations Platforms.",
    lead: "Turn an app idea into a production v1 MVP or replace WhatsApp threads and spreadsheets with one connected system. Four fixed-scope engagements cover the work—starting with a From $300 Product Blueprint delivered in 3–5 business days and 100% credited toward your build.",
    leadPhone:
      "Four fixed-scope engagements from a $300 credited Product Blueprint in 3–5 days to $1,800 Launch Sprints in 2–5 weeks.",
    workLink: "Inspect 13 shipped builds",
  },

  builds: {
    eyebrow: "What we build",
    title: "Three kinds of product.",
    line: "Most engagements are one of these. Several are two or three connected under one OpenAPI contract.",
  },

  engagements: {
    eyebrow: "How we work",
    title: "Four fixed-scope engagements.",
    line: "Each tier has a clear starting price, fixed scope boundary, and defined handoff—no agency account-manager markups or open-ended retainers.",
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
    line: "Founders with an app idea and ops teams replacing manual spreadsheets usually start with a $300 Product Blueprint—100% credited if you proceed.",
    steps: [
      "Lock your app or workflow scope in 3–5 days (From $300, 100% credited).",
      "Ship a production v1 web or mobile MVP in 2–5 weeks (From $1,800).",
      "Connect customer apps, Sunmi POS, and Arabic-first RTL dashboards (From $4,000 Phase 1).",
      "Keep improving on your own backlog without lock-in (From $250/mo).",
    ],
  },

  team: {
    eyebrow: "Economic & speed mechanism",
    title: "Direct Cairo engineering, contract-first OpenAPI, and verification gates.",
    body: "Three mechanisms keep delivery fast, verifiable, and competitively priced. First, senior engineers in Cairo (Africa/Cairo) work directly with founders and COOs across Riyadh (Asia/Riyadh) and London (Europe/London) with zero account-manager markup. Second, locking one OpenAPI contract on day one lets web, mobile, and POS streams run in parallel while automated scaffolding eliminates repetitive CRUD wiring. Third, mandatory CI schema-drift checks and idempotent ledger/webhook verification catch defects before launch.",
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Transparent starting tiers, scoped before code starts.",
    body: "Start with a From $300 Product Blueprint (100% credited toward development) or move directly into a Launch Sprint from $1,800, phased Operations Platform from $4,000 (Phase 1), or Product Care from $250/mo.",
    rows: [
      {
        label: "How it is set",
        body: "A 20-minute scoping review or 3–5 day Product Blueprint locks the OpenAPI plan and fixed milestone price before coding starts.",
      },
      {
        label: "What you own",
        body: "100% unconditional ownership of source repositories, OpenAPI contracts, databases, and cloud accounts upon milestone delivery.",
      },
    ],
  },

  closing: {
    title: "Start with a $300 Product Blueprint or scoping call.",
    note: "Bring an early-stage app idea or a manual workflow bottleneck. A senior Cairo engineer reviews it directly and confirms whether a 3–5 day Blueprint or Launch Sprint fits best.",
    button: "Start a $300 Blueprint",
  },
};
