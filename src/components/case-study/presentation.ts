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
  "glitre-loyalty-platform": {
    heroEyebrow: "Case study · Loyalty platform · Fuel retail · GCC",
    heroHeadline:
      "A fuel-station network had no way to know its repeat customers.",
    heroLead:
      "One API contract, three clients, and an append-only points ledger — the foundation beneath the products, live today.",
    heroMeta: [
      { label: "Role", value: "Product and engineering lead" },
      { label: "Timeline", value: "July 2026 – production August 2026" },
      {
        label: "Status",
        value:
          "Backend live · Manager dashboard live · Customer app preparing for store release · Worker POS integration planned",
      },
      {
        label: "Region",
        value: "Azure UAE North",
      },
    ],
    numbers: {
      figures: [
        { value: 3, caption: "User-facing products" },
        { value: 1, caption: "OpenAPI contract" },
        { value: 30, caption: "Data models" },
        { value: 2, caption: "Languages, Arabic-first" },
        { value: 9, caption: "Manager dashboard pages" },
      ],
    },
    situationHeading:
      "Every fill-up was a transaction. None of them was a relationship.",
    situationBefore: {
      heading: "Before",
      paragraphs: [
        "A driver filled up and left. Nothing told the brand they had been there before.",
        "Workers had no way to record a loyalty purchase; head office could not see who came back.",
        "Complaints had no central place to be resolved.",
      ],
    },
    situationAfter: {
      heading: "After",
      paragraphs: [
        "The customer shows a code on their phone. Points land against a verified purchase.",
        "The worker scans it on the station device and records the purchase.",
        "Head office sees every station, customer and transaction in one dashboard.",
      ],
    },
    deliveryHeading: "Three products, one shared backend.",
    deliveryCards: [
      {
        number: "01",
        title: "Customer app",
        body: "Arabic-first, right-to-left. Balance, single-use QR, rewards, vouchers, station finder, complaints — the driver's loop.",
      },
      {
        number: "02",
        title: "Worker app",
        body: "Android, scanner-led. Scan a QR, record a purchase, redeem a voucher — idempotent retries settle once.",
      },
      {
        number: "03",
        title: "Manager dashboard",
        body: "Stations, workers, customers, transactions, complaints and offers, each role seeing only its own. Arabic and English.",
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
        body: "It expires and works exactly once, so it cannot be passed around or claimed twice.",
      },
      {
        number: "02",
        title: "The worker scans and confirms",
        body: "If the connection drops and they retry, the purchase still settles once.",
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
      attribution: "Mahmoud Attia, founder, Kepler Dev",
    },
    decisionsHeading: "Loyalty points are money. They were built that way from day one.",
    decisionsRows: [
      {
        heading: "A balance nobody can quietly edit",
        paragraph:
          "When a customer disputes their points, there is an answer. Every correction is a new visible entry; the history reads like a statement.",
        howLabel: "How",
        how: "Append-only, at the database.",
      },
      {
        heading: "A code that works exactly once",
        paragraph:
          "A code cannot be shared and claimed twice, and a repeated tap on a bad connection never awards twice.",
        howLabel: "How",
        how: "Single-use signed QR codes, plus an idempotency key on every value-moving write.",
      },
      {
        heading: "Three products that cannot drift apart",
        paragraph:
          "One change reaches the customer app, the worker app and head office together.",
        howLabel: "How",
        how: "A single OpenAPI contract is the source of truth; client code is generated from it.",
      },
    ],
    builtCards: [],
    closing: {
      headline: "Have a workflow that never became a product?",
      lead: "A project review is one conversation: your workflow, what would change it, and an honest answer about scope.",
      buttonLabel: "Start a project review",
      buttonHref: "/contact",
    },
    footerLine: {
      verificationDate: "Verified 2026-10-01",
      confidentiality:
        "Manager dashboard kept private.",
      backHref: "/work",
      backLabel: "Back to selected work",
    },
  },
};

export function getPresentation(slug: string): PresentationContent | null {
  return presentationBySlug[slug] ?? null;
}
