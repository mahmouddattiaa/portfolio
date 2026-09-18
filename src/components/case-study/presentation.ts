export interface HeroMetaEntry {
  label: string;
  value: string;
  note?: string;
}

export interface NumbersStrip {
  caption?: string;
  figures: Array<{ value: number; suffix?: string; caption: string }>;
}

export interface SituationPanel {
  heading: string;
  paragraphs: string[];
}

export interface DeliveryCard {
  number: string;
  title: string;
  body: string;
}

export interface IllustrativeFrameStep {
  number: string;
  title: string;
  body: string;
}

export interface IllustrativeFrameSample {
  balance: string;
  timer: string;
  purchaseAmount: string;
  pointsEarned: string;
  ledgerRows: Array<{ kind: string; detail: string; delta: string }>;
}

export interface DecisionRow {
  heading: string;
  paragraph: string;
  howLabel: string;
  how: string;
}

export interface BuiltCard {
  heading: string;
  body: string;
}

export interface ClosingCopy {
  headline: string;
  lead: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface FooterLine {
  verificationDate: string;
  confidentiality: string;
  backHref: string;
  backLabel: string;
}

export interface PresentationContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroLead: string;
  heroMeta: HeroMetaEntry[];
  numbers: NumbersStrip;
  situationHeading: string;
  situationBefore: SituationPanel;
  situationAfter: SituationPanel;
  deliveryHeading: string;
  deliveryCards: DeliveryCard[];
  momentHeading: string;
  momentCaption: string;
  momentSamples: IllustrativeFrameSample;
  momentSteps: IllustrativeFrameStep[];
  architectureHeading: string;
  architectureLine: string;
  pullQuote: { body: string; attribution: string };
  decisionsHeading: string;
  decisionsRows: DecisionRow[];
  builtCards: BuiltCard[];
  closing: ClosingCopy;
  footerLine: FooterLine;
}

export const presentationBySlug: Record<string, PresentationContent> = {
  "loyalty-operations-platform": {
    heroEyebrow: "Case study 01 · Private client · Fuel retail · GCC",
    heroHeadline:
      "A fuel-station network had no way to know its repeat customers.",
    heroLead:
      "In about a month we delivered a loyalty system across a customer app, a station staff app and a head-office dashboard — running in production, in-region, with customers signing in by email today.",
    heroMeta: [
      { label: "Role", value: "Product and engineering lead" },
      {
        label: "Timeline",
        value: "July 2026 – production August 2026",
      },
      { label: "Status", value: "Live in production" },
      {
        label: "Evidence",
        value: "Verified privately",
        note: "Client name withheld pending permission. Details available in a project review.",
      },
    ],
    numbers: {
      figures: [
        { value: 4, caption: "Connected products" },
        { value: 60, caption: "API operations under one contract" },
        { value: 30, caption: "Data models" },
        { value: 2, caption: "Languages, Arabic-first" },
        { value: 31, caption: "Days from kickoff to production" },
      ],
    },
    situationHeading:
      "Every fill-up was a transaction. None of them was a relationship.",
    situationBefore: {
      heading: "Before",
      paragraphs: [
        "A driver filled up and left. Nothing told the brand they had been there before.",
        "Station staff had no way to record a loyalty purchase.",
        "Head office could not see which customers came back, or reward the ones who did.",
        "Complaints had no central place to be tracked and resolved.",
      ],
    },
    situationAfter: {
      heading: "After",
      paragraphs: [
        "The customer shows a code on their phone. Points land against a verified purchase.",
        "Staff scan it on the station device and record the purchase.",
        "Head office sees every station, customer and transaction in one dashboard.",
        "Complaints arrive as tracked cases with an owner and a resolution.",
      ],
    },
    deliveryHeading: "Four products that behave like one.",
    deliveryCards: [
      {
        number: "01",
        title: "Customer app",
        body: "Arabic-first, right-to-left. Balance, one-time QR code, rewards, vouchers, station finder and complaints.",
      },
      {
        number: "02",
        title: "Station staff app",
        body: "Scan, record the purchase, redeem a voucher — and safe to retry on a poor connection.",
      },
      {
        number: "03",
        title: "Head-office dashboard",
        body: "Stations, staff, customers, transactions, complaints and offers, each role seeing only its own. Arabic and English.",
      },
      {
        number: "04",
        title: "The platform beneath",
        body: "Points ledger, rules, offers, a retrying message queue, and the in-region cloud environment the apps run on.",
      },
    ],
    momentHeading: "From code to points, at the pump.",
    momentCaption:
      "Illustrative screens in our own styling. The client's screens, branding and data are not shown.",
    momentSamples: {
      balance: "1,250",
      timer: "00:58",
      purchaseAmount: "100.00",
      pointsEarned: "+ 100",
      ledgerRows: [
        { kind: "Earn", detail: "Station A", delta: "+ 100" },
        { kind: "Redeem", detail: "Reward", delta: "− 500" },
        { kind: "Reversal", detail: "Case 1001", delta: "+ 100" },
        { kind: "Earn", detail: "Station B", delta: "+ 40" },
      ],
    },
    momentSteps: [
      {
        number: "01",
        title: "The customer shows a code",
        body: "It expires, and it works exactly once, so it cannot be passed around or claimed twice.",
      },
      {
        number: "02",
        title: "Staff scan and confirm",
        body: "If the connection drops and they try again, the purchase still settles once.",
      },
      {
        number: "03",
        title: "Head office sees it land",
        body: "Every earn, redemption and correction in one ledger that reads like a statement.",
      },
    ],
    architectureHeading:
      "One agreement in the middle, so nothing drifts apart.",
    architectureLine:
      "Three applications, one shared definition of what the system does. Change it once and every client follows.",
    pullQuote: {
      body: "The product is built; the workflow is not. People end up bridging the gaps between systems that were never designed to work together.",
      attribution: "Mahmoud Attia, Kepler Dev",
    },
    decisionsHeading: "Loyalty points are money. They were built that way from day one.",
    decisionsRows: [
      {
        heading: "A balance nobody can quietly edit",
        paragraph:
          "When a customer disputes their points, there is an answer. Every correction is a new visible entry, so the history reads like a statement.",
        howLabel: "How",
        how: "The ledger is append-only, enforced by the database rather than by convention.",
      },
      {
        heading: "A code that works exactly once",
        paragraph:
          "A code cannot be shared and claimed twice, and a repeated tap on a bad connection never awards twice.",
        howLabel: "How",
        how: "Single-use signed QR codes, plus an idempotency key on every write that moves value.",
      },
      {
        heading: "Four products that cannot drift apart",
        paragraph:
          "One change reaches the customer app, the staff app and head office together.",
        howLabel: "How",
        how: "A single API contract is the source of truth; client code is generated from it and CI fails the build when they disagree.",
      },
    ],
    builtCards: [
      {
        heading: "A small team of developers, working with AI agents on flagship models.",
        body: "Each workstream ran on its own branch against the shared contract, with review before merge. That is how four products reached production in about a month.",
      },
      {
        heading: "Live in production, with the next phase named.",
        body: "Customers register and sign in by email code today. App-store distribution and SMS codes are the next phase.",
      },
    ],
    closing: {
      headline: "Have a workflow that never became a product?",
      lead: "A project review is one conversation: your workflow, what would actually change it, and an honest answer about scope before anyone writes code.",
      buttonLabel: "Start a project review",
      buttonHref: "/contact",
    },
    footerLine: {
      verificationDate: "Verified 2026-09-17",
      confidentiality:
        "Client name withheld pending permission. Details available in a project review.",
      backHref: "/work",
      backLabel: "Back to selected work",
    },
  },
};

export function getPresentation(slug: string): PresentationContent | null {
  return presentationBySlug[slug] ?? null;
}
