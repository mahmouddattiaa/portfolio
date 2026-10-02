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
  { number: "01", title: "Discover stations", body: "Five public screens show the network, the reward catalogue, and the persistent sign-up CTA before login. Discovery is intentionally not gated." },
  { number: "02", title: "Register", body: "Three registration screens cover consent, name, and OTP verification. The interim email-port is designed, not implemented." },
  { number: "03", title: "My QR", body: "Two login flows plus the rotating QR screen — single-use, HMAC-signed, expired on first scan." },
  { number: "04", title: "Redeem reward", body: "Authenticated surfaces: home, my vouchers, voucher reveal, redeem confirm. Idempotent on retry." },
  { number: "05", title: "Submit complaint", body: "Submission posts to the API with an Idempotency-Key; internal notes never appear in the customer-facing resolution field." },
];

// Image gate: no customer-app capture is approved for publication today.
// Both the five Stitch design-time mockups and the five renderable archived
// .run/ PNGs are gated on (a) explicit owner publication approval of the
// exact source, and (b) required pixel redaction (spec §11 Q3, §4.2.1,
// §4.2.2; audit §6.2, §6.3, §10 Q2). Until that gate clears, every visual
// slot renders a labelled placeholder via the helper below. The placeholder
// helper preserves the slot's caption and provenance fields so swapping in
// an approved source later is a one-diff change.
function customerAppPlaceholder(slot: string) {
  return (
    <figure className="glitre-placeholder" aria-label={`Placeholder for the ${slot} screen. Pending owner publication approval and pixel redaction.`}>
      <div className="glitre-placeholder-frame" aria-hidden="true">
        Pending owner publication approval
      </div>
      <figcaption>
        <span className="glitre-gallery-caption">{slot} — placeholder</span>
        <span className="glitre-gallery-provenance">
          No customer-app capture is published today. Both the Stitch design-time
          mockups (<code>apps/customer/design/assets/stitch-review/</code>) and
          the archived <code>.run/</code> captures
          (<code>apps/customer/.run/</code>) are pending owner publication
          approval of the exact source and required pixel redaction (spec §11
          Q3, §4.2.1, §4.2.2; audit §6.2, §6.3, §10 Q2). See
          <code> public/projects/glitre-loyalty-platform/customer-app/SOURCE.md</code>.
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
    "Code in place across 21 catalogued screens in Arabic-first RTL; 5 remain ComingSoonBody stubs; the mobile end-to-end test suite is not yet in place. Preparing for store release — not yet in stores.",
  heroEvidence:
    "Verified privately. The design catalog and the Flutter source tree are the audit trail. The slots below render labelled placeholders — both the Stitch design-time mockups and the archived .run/ captures are pending owner publication approval and pixel redaction (spec §11 Q3; audit §6.2, §6.3, §10 Q2); no customer-app capture is published today.",
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
      heading: "21 screens, four groups, five stubs called out honestly.",
      body: (
        <>
          <p>
            21 screens in 4 groups (Public 4, Registration 3, Login 2, Authenticated 12) catalogued in the design spec. Arabic-first with RTL; Latin digits for points and countdowns. Five screens (My QR, Redeem Confirm interstitial, Voucher Reveal, My Vouchers, History) remain ComingSoonBody stubs.
          </p>
        </>
      ),
    },
    {
      id: "section-handoff",
      eyebrow: "What is next",
      heading: "Preparing for store release.",
      body: (
        <ul className="glitre-controlled" aria-label="Customer app next phase">
          <li>Store submission (Google Play, App Store).</li>
          <li>OTP delivery adapter — the interim email-port is designed, not implemented.</li>
          <li>Account deletion flow — absent today across API, app, and website.</li>
          <li>Privacy Policy source still has placeholders for legal entity details.</li>
          <li>Token refresh — 15-minute expiry is unmitigated today.</li>
          <li>Production signing key — today&rsquo;s APKs are debug-signed.</li>
          <li>iOS bundle configuration — no current-Xcode archive, no PrivacyInfo.xcprivacy.</li>
          <li>Store-review OTP access — reviewers cannot reproduce a flow without live OTP.</li>
          <li>In-app Terms link is a dead control today.</li>
        </ul>
      ),
    },
  ],
  visualSlots: [
    {
      src: undefined,
      alt: "Placeholder for the public stations list screen. The Stitch design-time mockup and the archived .run/ captures are pending owner publication approval and pixel redaction.",
      caption: "Public stations list — placeholder.",
      provenance: "Pending owner publication approval and pixel redaction. See customer-app/SOURCE.md for the open gate.",
      inventoryFallback: customerAppPlaceholder("Public stations list"),
    },
    {
      src: undefined,
      alt: "Placeholder for the authenticated home screen. The Stitch design-time mockup and the archived .run/ captures are pending owner publication approval and pixel redaction.",
      caption: "Authenticated home — placeholder.",
      provenance: "Pending owner publication approval and pixel redaction. See customer-app/SOURCE.md for the open gate.",
      inventoryFallback: customerAppPlaceholder("Authenticated home"),
    },
    {
      src: undefined,
      alt: "Placeholder for the My Vouchers screen. The Stitch design-time mockup and the archived .run/ captures are pending owner publication approval and pixel redaction.",
      caption: "My Vouchers — placeholder.",
      provenance: "Pending owner publication approval and pixel redaction. See customer-app/SOURCE.md for the open gate.",
      inventoryFallback: customerAppPlaceholder("My Vouchers"),
    },
    {
      src: undefined,
      alt: "Placeholder for the Profile screen. The Stitch design-time mockup and the archived .run/ captures are pending owner publication approval and pixel redaction.",
      caption: "Profile — placeholder.",
      provenance: "Pending owner publication approval and pixel redaction. See customer-app/SOURCE.md for the open gate.",
      inventoryFallback: customerAppPlaceholder("Profile"),
    },
    {
      src: undefined,
      alt: "Placeholder for the Redeem confirm interstitial. The Stitch design-time mockup and the archived .run/ captures are pending owner publication approval and pixel redaction.",
      caption: "Redeem confirm interstitial — placeholder.",
      provenance: "Pending owner publication approval and pixel redaction. See customer-app/SOURCE.md for the open gate.",
      inventoryFallback: customerAppPlaceholder("Redeem confirm interstitial"),
    },
  ],
  controlledVocabulary: [
    "No production OTP delivery — the interim email-port is designed, not implemented.",
    "No customer-app capture is published today. Both the Stitch design-time mockups (apps/customer/design/assets/stitch-review/) and the archived .run/ captures (apps/customer/.run/) are pending owner publication approval and pixel redaction (spec §11 Q3; audit §6.2, §6.3, §10 Q2). The slots above render labelled placeholders.",
  ],
};

export const metadata: Metadata = {
  title: "Customer app study · Glitre Loyalty Platform",
  description:
    "Arabic-first loyalty app. 21 catalogued screens in RTL. Preparing for store release, not yet in stores.",
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