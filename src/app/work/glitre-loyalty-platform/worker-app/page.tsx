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
  { number: "01", title: "Scan customer QR", body: "The mobile_scanner package drives the camera; permission UX is part of the flow." },
  { number: "02", title: "Purchase entry → review", body: "Amount, category, payment method, optional external reference. The Idempotency-Key is generated once and reused on retry." },
  { number: "03", title: "Confirm → success", body: "Pending state shows the server-confirmation message only — never a success icon. Success shows transactionRef and pointsAwarded." },
  { number: "04", title: "Voucher review → consume", body: "Final review before consume; the Idempotency-Key is generated once and reused on retry." },
  { number: "05", title: "Recent activity", body: "Read-only, current session only. Activity does not survive a restart until a server endpoint exists." },
];

const inventoryRows = [
  { label: "Home / Station Hub", body: "Two dominant actions: scan customer purchase, consume voucher." },
  { label: "Customer Scanner", body: "Live QR scanner via the mobile_scanner package. Permission UX is part of the flow." },
  { label: "Scanned Customer", body: "Masked identity only. The server returns eligibility, never the customer's full balance." },
  { label: "Purchase Entry → Review", body: "Idempotency-Key generated once and reused on retry." },
  { label: "Purchase Confirming → Success", body: "Pending shows the server-confirmation message only; success shows transactionRef and pointsAwarded." },
  { label: "Voucher Scanner", body: "Same QR scanner surface, route depends on scan result." },
  { label: "Voucher Review", body: "Final review before consume; Idempotency-Key generated once and reused on retry." },
  { label: "Voucher Confirming → Success", body: "Same confirmation discipline as the purchase loop." },
  { label: "Recent Activity", body: "Read-only, current session only. Server endpoint pending." },
  { label: "Access Denied", body: "Server returns access-denied; the app surfaces it without leaking eligibility." },
];

const product: GlitreProduct = {
  key: "worker-app",
  railSections: workerAppRailSections,
  heroEyebrow: "Worker app study · Android station operations",
  heroHeadline:
    "A scanner-led app for the worker at the station, with idempotent retries that settle once.",
  heroStatus:
    "14 screens catalogued with server-authoritative hand-offs. Code in place but not deployed to production hardware. POS hardware integration is planned, not complete. No mobile end-to-end test suite.",
  heroEvidence:
    "Verified privately. The design spec and the Flutter source tree are the audit trail. No on-device captures exist; the screen inventory below is the proof today.",
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
            14 screens (apps/worker/design/03-screen-specs.md), one assigned station (no station picker), <code>mobile_scanner</code> for QR capture, and an <code>Idempotency-Key</code> on every value-moving write. The worker app never calculates points, balances, eligibility, station authority, or voucher validity — every value-moving decision goes through the backend.
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
        <ul className="glitre-controlled" aria-label="Worker app next phase">
          <li>POS hardware name, Android version, CPU ABI, scanner interface, kiosk / MDM policy.</li>
          <li>Vendor printer SDK integration.</li>
          <li>Real-device qualification against POS-class hardware.</li>
          <li>Production signing key — today&rsquo;s APK is debug-signed.</li>
          <li>Worker app distribution model — public vs managed (OD-5).</li>
          <li>Mobile end-to-end test suite — not in place today.</li>
        </ul>
      ),
    },
  ],
  visualSlots: [
    {
      src: undefined,
      alt: "Worker app screen inventory. Ten catalogued screens drawn from apps/worker/design/03-screen-specs.md. No on-device captures exist today.",
      caption: "Screen inventory — ten catalogued screens, no device captures.",
      provenance: "Drawn from apps/worker/design/03-screen-specs.md; no on-device captures exist today.",
      inventoryFallback: (
        <ul className="glitre-inventory" aria-label="Worker app screen inventory">
          {inventoryRows.map((row) => (
            <li key={row.label}>
              <span className="glitre-inventory-label">{row.label}</span>
              <span>{row.body}</span>
            </li>
          ))}
        </ul>
      ),
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
    "Android station operations. 14 screens with server-authoritative hand-offs. POS hardware integration planned, not complete.",
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