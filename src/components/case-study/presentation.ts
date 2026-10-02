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
      "One API contract, three clients, and an append-only points ledger in-region — backend live in Azure UAE North; manager dashboard live and private; customer app preparing for store release; worker app code in place with POS hardware integration planned, not complete.",
    heroMeta: [
      { label: "Role", value: "Product and engineering lead" },
      { label: "Timeline", value: "July 2026 – production August 2026" },
      {
        label: "Status",
        value:
          "Backend live · Manager dashboard live and private · Customer app preparing for store release · Worker app code in place, POS hardware integration planned, not complete",
      },
      {
        label: "Evidence",
        value: "Verified privately",
        note: "Client name withheld pending permission. Screenshots are redacted.",
      },
    ],
    numbers: {
      figures: [
        { value: 3, caption: "User-facing products" },
        { value: 1, caption: "API contract — the seam" },
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
        "Station workers had no way to record a loyalty purchase.",
        "Head office could not see which customers came back, or reward the ones who did.",
        "Complaints had no central place to be tracked and resolved.",
      ],
    },
    situationAfter: {
      heading: "After",
      paragraphs: [
        "The customer shows a code on their phone. Points land against a verified purchase.",
        "The worker scans it on the station device and records the purchase.",
        "Head office sees every station, customer and transaction in one dashboard.",
        "Complaints arrive as tracked cases with an owner and a resolution.",
      ],
    },
    deliveryHeading: "Three products, one shared backend.",
    deliveryCards: [
      {
        number: "01",
        title: "Customer app",
        body: "Arabic-first, right-to-left. Balance, one-time QR code, rewards, vouchers, station finder and complaints. Code in place across 21 catalogued screens; five screens remain ComingSoonBody stubs. Preparing for store release — store submission, OTP delivery adapter, account deletion, and a production signing key are the next phase.",
      },
      {
        number: "02",
        title: "Worker app",
        body: "Android, scanner-led. Scan a customer QR, record a purchase, redeem a voucher — idempotent retries settle once. 14 screens catalogued with server-authoritative hand-offs. POS hardware integration is planned, not complete — hardware qualification, MDM distribution, and the choice between public vs managed distribution are the next phase.",
      },
      {
        number: "03",
        title: "Manager dashboard",
        body: "Stations, workers, customers, transactions, complaints and offers, each role seeing only its own. Arabic and English. Live and private; the page below shows redacted screenshots only.",
      },
      {
        number: "04",
        title: "The platform beneath",
        body: "One API contract, one ledger, one queue. In Azure UAE North. Backend live in production as of 2026-08-12.",
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
        title: "The worker scans and confirms",
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
        heading: "Three products that cannot drift apart",
        paragraph:
          "One change reaches the customer app, the worker app and head office together.",
        howLabel: "How",
        how: "A single OpenAPI contract is the source of truth; client code is generated from it and CI fails the build when they disagree.",
      },
      {
        heading: "Data stays in-region",
        paragraph:
          "Saudi PDPL is the reason the production region is UAE North and not central.",
        howLabel: "How",
        how: "The platform runs in Azure UAE North today, with Saudi East planned for Q4 2026 to keep PDPL residency as the network expands.",
      },
    ],
    builtCards: [
      {
        heading: "A small team of developers, working with AI agents on flagship models.",
        body: "Each workstream ran on its own branch against the shared contract, with review before merge.",
      },
      {
        heading: "Live in production, with the next phase named honestly.",
        body: "Customer app store release, worker POS hardware qualification, and dashboard legal pages and account deletion are the named next steps — none of them implied as done.",
      },
    ],
    closing: {
      headline: "Have a workflow that never became a product?",
      lead: "A project review is one conversation: your workflow, what would actually change it, and an honest answer about scope before anyone writes code.",
      buttonLabel: "Start a project review",
      buttonHref: "/contact",
    },
    footerLine: {
      verificationDate: "Verified 2026-10-01",
      confidentiality:
        "Client name withheld pending permission. Screenshots are redacted.",
      backHref: "/work",
      backLabel: "Back to selected work",
    },
  },
};

export function getPresentation(slug: string): PresentationContent | null {
  return presentationBySlug[slug] ?? null;
}
