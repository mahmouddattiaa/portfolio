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
import { GlitreWorkerIllustration } from "@/components/case-study/glitre-illustrative-devices";

const workerAppRailSections = [
  { id: "section-hero", label: "Overview" },
  { id: "section-loop", label: "The worker's loop" },
  { id: "section-built", label: "What we built" },
  { id: "section-handoff", label: "Hand-off discipline" },
  { id: "section-pos", label: "POS integration planned" },
  { id: "glitre-visual-proof", label: "Visual proof" },
  { id: "glitre-not-shown", label: "What is not shown" },
  { id: "glitre-neighbour", label: "Other product studies" },
];

const loopSteps = [
  { number: "01", title: "Scan customer QR", body: "The scanner package drives the camera; permission UX is part of the flow." },
  { number: "02", title: "Purchase entry → review", body: "Amount, category, payment method, optional external reference. The Idempotency-Key is generated once and reused on retry." },
  { number: "03", title: "Confirm → success", body: "Pending state shows the server-confirmation message only — never a success icon. Success shows the transaction reference and points awarded." },
  { number: "04", title: "Voucher review → consume", body: "Final review before consume; the Idempotency-Key is generated once and reused on retry." },
  { number: "05", title: "Recent activity", body: "Read-only, current session only. Activity does not survive a restart until a server endpoint exists." },
];

const product: GlitreProduct = {
  key: "worker-app",
  railSections: workerAppRailSections,
  heroEyebrow: "Worker app study · Android station operations",
  heroHeadline:
    "A scanner-led app for the worker at the station, with idempotent retries that settle once.",
  heroStatus:
    "14 screens designed with server-authoritative hand-offs. Code in place but not deployed to production hardware. POS hardware integration is planned, not complete. The mobile end-to-end test suite is not yet in place.",
  heroEvidence:
    "The design and code are archived in the source repository. The four POS views below are studio-made illustrations from the approved screen specification; no on-device captures or POS hardware qualification exist today.",
  sections: [
    {
      id: "section-loop",
      eyebrow: "The worker's loop",
      heading: "Five steps, traced to the screen spec.",
      body: (
        <ol className="glitre-loop-frames" aria-label="Worker app loop steps">
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
      heading: "14 screens, one assigned station, server-authoritative hand-offs.",
      body: (
        <>
          <p>
            14 screens catalogued in the design spec, one assigned station (no station picker), a live QR scanner, and an Idempotency-Key on every value-moving write. The worker app never calculates points, balances, eligibility, station authority or voucher validity — every value-moving decision goes through the backend.
          </p>
        </>
      ),
    },
    {
      id: "section-handoff",
      eyebrow: "Hand-off discipline",
      heading: "Three concrete examples.",
      body: (
        <ul className="glitre-inventory" aria-label="Worker hand-off discipline">
          <li>
            <span className="glitre-inventory-label">No customer balance</span>
            <span>The success screen never shows the customer&rsquo;s full balance. Only server-returned values are surfaced.</span>
          </li>
          <li>
            <span className="glitre-inventory-label">Masked identity</span>
            <span>The worker sees only the server-returned masked customer identity and the eligibility result.</span>
          </li>
          <li>
            <span className="glitre-inventory-label">No false success</span>
            <span>Success appears only after a confirmed 2xx response; the pending state shows the server-confirmation message, never a success icon.</span>
          </li>
        </ul>
      ),
    },
    {
      id: "section-pos",
      eyebrow: "POS integration planned",
      heading: "What is named as the next phase.",
      body: (
        <>
          <p>
            The worker app earns its value when it talks to a real POS. That work is deliberately scheduled rather than assumed done.
          </p>
          <ul className="glitre-controlled" aria-label="Worker app next phase">
            <li>POS hardware qualification — name, Android version, scanner interface, MDM policy.</li>
            <li>Vendor printer SDK integration.</li>
            <li>Real-device qualification against POS-class hardware.</li>
            <li>Production signing key — current build is debug-signed.</li>
            <li>Worker app distribution model — public versus managed.</li>
          </ul>
        </>
      ),
    },
  ],
  visualSlots: [
    {
      alt: "Illustrative English station hub with purchase and voucher actions.",
      caption: "01 · Station hub",
      provenance: "Studio-made POS flow illustration based on the approved worker screen spec; no device capture.",
      inventoryFallback: <GlitreWorkerIllustration screen="hub" />,
    },
    {
      alt: "Illustrative English worker QR scan with masked customer identity and server eligibility.",
      caption: "02 · Customer QR scan",
      provenance: "Studio-made POS flow illustration based on the approved worker screen spec; no device capture.",
      inventoryFallback: <GlitreWorkerIllustration screen="scanner" />,
    },
    {
      alt: "Illustrative English purchase entry screen with amount and payment review.",
      caption: "03 · Purchase entry",
      provenance: "Studio-made POS flow illustration based on the approved worker screen spec; no device capture.",
      inventoryFallback: <GlitreWorkerIllustration screen="purchase" />,
    },
    {
      alt: "Illustrative English server-confirmed purchase receipt showing awarded points.",
      caption: "04 · Server confirmation",
      provenance: "Studio-made POS flow illustration; no live terminal or POS hardware is represented.",
      inventoryFallback: <GlitreWorkerIllustration screen="confirmation" />,
    },
  ],
  controlledVocabulary: [
    "No live POS hardware to point to.",
    "No production-distribution channel.",
    "No vendor SDK integration.",
  ],
};

export const metadata: Metadata = {
  title: "Worker app study · Glitre Loyalty Platform",
  description:
    "Android station operations, scanner-led, 14 screens with server-authoritative hand-offs. POS hardware integration is planned, not complete.",
  alternates: { canonical: "https://www.keplerdev.uk/work/glitre-loyalty-platform/worker-app" },
};

export default function GlitreWorkerAppPage() {
  const study = publicCaseStudies.find((item) => item.slug === "glitre-loyalty-platform");
  if (!study) notFound();
  return (
    <article className="cs-page glitre-page">
      <GlitreShell>
        <ContentsRail
          sections={workerAppRailSections}
          verification={glitreVerifiedLabel}
        />
        <GlitreProductArticle product={product} />
      </GlitreShell>
    </article>
  );
}
