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
import { GlitreCustomerIllustration } from "@/components/case-study/glitre-illustrative-devices";

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
  { number: "01", title: "Discover stations", body: "Public screens show the network, the reward catalogue and a persistent sign-up prompt before login. Discovery is intentionally not gated." },
  { number: "02", title: "Register", body: "Three registration screens cover consent, name and OTP verification. The interim email-port is designed, not implemented." },
  { number: "03", title: "Single-use QR", body: "Two login flows plus the signed QR screen, which expires on first scan." },
  { number: "04", title: "Redeem reward", body: "Authenticated surfaces: home, voucher list, voucher reveal and redeem confirmation. Idempotent on retry." },
  { number: "05", title: "Submit complaint", body: "Submission posts to the API with an Idempotency-Key; internal notes never appear in the customer-facing resolution field." },
];

const product: GlitreProduct = {
  key: "customer-app",
  railSections: customerAppRailSections,
  heroEyebrow: "Customer app study · Arabic-first loyalty",
  heroHeadline:
    "From a phone, a driver sees a balance, holds up a code, redeems a reward, files a complaint.",
  heroStatus:
    "21 screens designed in Arabic-first RTL; the five views below are studio-made illustrations, while five application screen bodies remain placeholders. Preparing for store release — not yet in stores.",
  heroEvidence:
    "The design catalog and implementation status are recorded in the source repository. These five studio-made illustrations describe the specified flows; they are not customer-app captures.",
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
      heading: "21 screens, four groups, five illustrative views.",
      body: (
        <>
          <p>
            21 screens in 4 groups (Public 5, Registration 3, Login 2, Authenticated 11) catalogued in the design spec. Arabic-first with RTL; Latin digits for points and countdowns. Five implementation screens — My QR, Redeem Confirm interstitial, Voucher Reveal, My Vouchers and History — still render placeholder bodies. The pictures below are independent studio-made illustrations, not captures of the app.
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
      alt: "Illustrative Arabic RTL customer screen for discovering nearby stations.",
      caption: "01 · Discover stations",
      provenance: "Studio-made screen illustration based on the approved design specification; not a product capture.",
      inventoryFallback: <GlitreCustomerIllustration screen="stations" />,
    },
    {
      alt: "Illustrative Arabic RTL authenticated customer home with a points balance and station action.",
      caption: "02 · Authenticated home",
      provenance: "Studio-made screen illustration based on the approved design specification; not a product capture.",
      inventoryFallback: <GlitreCustomerIllustration screen="home" />,
    },
    {
      alt: "Illustrative Arabic RTL single-use signed QR screen with expiry information.",
      caption: "03 · Single-use signed QR",
      provenance: "Studio-made screen illustration; the decorative code is not scannable and is not a customer-app capture.",
      inventoryFallback: <GlitreCustomerIllustration screen="qr" />,
    },
    {
      alt: "Illustrative Arabic RTL voucher redemption confirmation screen.",
      caption: "04 · Redeem confirmation",
      provenance: "Studio-made screen illustration based on the approved design specification; not a product capture.",
      inventoryFallback: <GlitreCustomerIllustration screen="redeem" />,
    },
    {
      alt: "Illustrative Arabic RTL customer voucher list with two available rewards.",
      caption: "05 · Customer vouchers",
      provenance: "Studio-made screen illustration based on the approved design specification; not a product capture.",
      inventoryFallback: <GlitreCustomerIllustration screen="vouchers" />,
    },
  ],
  controlledVocabulary: [
    "No production OTP delivery today — the interim email-port is designed, not implemented.",
    "The five views above are illustrative; the customer app is preparing for store release and is not yet published in any store.",
  ],
};

export const metadata: Metadata = {
  title: "Customer app study · Glitre Loyalty Platform",
  description:
    "Arabic-first loyalty app, 21 screens designed, five still placeholders. Preparing for store release; not yet in stores.",
  alternates: { canonical: "https://www.keplerdev.uk/work/glitre-loyalty-platform/customer-app" },
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
