import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publicCaseStudies } from "@/lib/content";
import { ContentsRail } from "@/components/case-study/contents-rail";
import {
  GlitreProductArticle,
  type GlitreProduct,
} from "@/components/case-study/glitre-product-article";
import { GlitreShell } from "@/components/case-study/glitre-shell";
import { glitreVerifiedLabel } from "@/components/case-study/glitre-content";

const customerAppRailSections = [
  { id: "section-hero", label: "Overview" },
  { id: "section-loop", label: "The customer's loop" },
  { id: "section-built", label: "What we built" },
  { id: "section-handoff", label: "What is next" },
  { id: "glitre-visual-proof", label: "Visual proof" },
  { id: "glitre-not-shown", label: "What is not shown" },
  { id: "glitre-neighbour", label: "Other product studies" },
];

const loopSteps = [
  { number: "01", title: "Discover stations", body: "Five public screens show the network, the reward catalogue and a persistent sign-up prompt before login. Discovery is intentionally not gated." },
  { number: "02", title: "Register", body: "Three registration screens cover consent, name and OTP verification. The interim email-port is designed, not implemented." },
  { number: "03", title: "My QR", body: "Two login flows plus the rotating QR screen — single-use, signed, expired on first scan." },
  { number: "04", title: "Redeem reward", body: "Authenticated surfaces: home, my vouchers, voucher reveal and redeem confirm. Idempotent on retry." },
  { number: "05", title: "Submit complaint", body: "Submission posts to the API with an Idempotency-Key; internal notes never appear in the customer-facing resolution field." },
];

// Image gate: no customer-app capture is approved for publication today.
// Each visual slot renders a labelled placeholder via the helper below
// until the owner approves a specific source. The placeholder preserves
// the slot's caption so swapping in an approved image later is a
// one-diff change.
function customerAppPlaceholder(slot: string) {
  return (
    <figure className="glitre-placeholder" aria-label={`Placeholder for the ${slot} screen. No customer-app capture is approved for publication today.`}>
      <div className="glitre-placeholder-frame" aria-hidden="true">
        Image pending approval
      </div>
      <figcaption>
        <span className="glitre-gallery-caption">{slot} — placeholder</span>
        <span className="glitre-gallery-provenance">
          No customer-app capture is published with this case study. A real
          capture pass is planned for the next phase, with redaction of any
          literal identifiers before any image is approved.
        </span>
      </figcaption>
    </figure>
  );
}

const product: GlitreProduct = {
  key: "customer-app",
  railSections: customerAppRailSections,
  heroEyebrow: "Customer app study · Arabic-first loyalty",
  heroHeadline:
    "From a phone, a driver sees a balance, holds up a code, redeems a reward, files a complaint.",
  heroStatus:
    "21 screens designed in Arabic-first RTL; five are still placeholders; the mobile end-to-end test suite is not yet in place. Preparing for store release — not yet in stores.",
  heroEvidence:
    "The design and code are archived in the source repository. The slots below render labelled placeholders — no customer-app capture is published with this case study. A real capture pass is planned for the next phase.",
  sections: [
    {
      id: "section-loop",
      eyebrow: "The customer's loop",
      heading: "Five steps, traced to the screen catalog.",
      body: (
        <ol className="glitre-loop-frames" aria-label="Customer app loop steps">
          {loopSteps.map((step) => (
            <li key={step.number} className="glitre-loop-step">
              <span className="glitre-loop-step-number">Step {step.number}</span>
              <h3 className="glitre-loop-step-title">{step.title}</h3>
              <p className="glitre-loop-step-body">{step.body}</p>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "section-built",
      eyebrow: "What we built",
      heading: "21 screens, four groups, five placeholders called out honestly.",
      body: (
        <>
          <p>
            21 screens in 4 groups (Public 5, Registration 3, Login 2, Authenticated 11) catalogued in the design spec. Arabic-first with RTL; Latin digits for points and countdowns. Five screens — My QR, Redeem Confirm interstitial, Voucher Reveal, My Vouchers and History — remain placeholder bodies.
          </p>
        </>
      ),
    },
    {
      id: "section-handoff",
      eyebrow: "What is next",
      heading: "Preparing for store release.",
      body: (
        <>
          <p>
            Store release is gated on a short list of work the platform does not do today. Each item is a deliberate follow-up rather than an oversight in the current build.
          </p>
          <ul className="glitre-controlled" aria-label="Customer app next phase">
            <li>Store submission (Google Play, App Store) — blocked on a production signing key.</li>
            <li>OTP delivery adapter — the interim email-port is designed, not implemented.</li>
            <li>Account deletion — absent today across API, app and website.</li>
            <li>Privacy Policy text and in-app Terms — placeholders remain for the legal entity.</li>
            <li>iOS bundle configuration — no current-Xcode archive yet.</li>
          </ul>
        </>
      ),
    },
  ],
  visualSlots: [
    {
      src: undefined,
      alt: "Placeholder for the public stations list screen. No customer-app capture is approved for publication today.",
      caption: "Public stations list — placeholder.",
      provenance: "No customer-app capture is published with this case study. A capture pass is planned for the next phase.",
      inventoryFallback: customerAppPlaceholder("Public stations list"),
    },
    {
      src: undefined,
      alt: "Placeholder for the authenticated home screen. No customer-app capture is approved for publication today.",
      caption: "Authenticated home — placeholder.",
      provenance: "No customer-app capture is published with this case study. A capture pass is planned for the next phase.",
      inventoryFallback: customerAppPlaceholder("Authenticated home"),
    },
    {
      src: undefined,
      alt: "Placeholder for the My Vouchers screen. No customer-app capture is approved for publication today.",
      caption: "My Vouchers — placeholder.",
      provenance: "No customer-app capture is published with this case study. A capture pass is planned for the next phase.",
      inventoryFallback: customerAppPlaceholder("My Vouchers"),
    },
    {
      src: undefined,
      alt: "Placeholder for the Profile screen. No customer-app capture is approved for publication today.",
      caption: "Profile — placeholder.",
      provenance: "No customer-app capture is published with this case study. A capture pass is planned for the next phase.",
      inventoryFallback: customerAppPlaceholder("Profile"),
    },
    {
      src: undefined,
      alt: "Placeholder for the Redeem confirm interstitial. No customer-app capture is approved for publication today.",
      caption: "Redeem confirm interstitial — placeholder.",
      provenance: "No customer-app capture is published with this case study. A capture pass is planned for the next phase.",
      inventoryFallback: customerAppPlaceholder("Redeem confirm interstitial"),
    },
  ],
  controlledVocabulary: [
    "No production OTP delivery today — the interim email-port is designed, not implemented.",
    "No customer-app capture is published with this case study. The slots above render labelled placeholders.",
  ],
};

export const metadata: Metadata = {
  title: "Customer app study · Glitre Loyalty Platform",
  description:
    "Arabic-first loyalty app, 21 screens designed, five still placeholders. Preparing for store release; not yet in stores.",
};

export default function GlitreCustomerAppPage() {
  const study = publicCaseStudies.find((item) => item.slug === "glitre-loyalty-platform");
  if (!study) notFound();
  return (
    <article className="cs-page glitre-page">
      <GlitreShell>
        <ContentsRail
          sections={customerAppRailSections}
          verification={glitreVerifiedLabel}
        />
        <GlitreProductArticle product={product} />
      </GlitreShell>
    </article>
  );
}