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
  { number: "01", title: "Scan customer QR", body: "The scanner package drives the camera; permission UX is part of the flow." },
  { number: "02", title: "Purchase entry → review", body: "Amount, category, payment method, optional external reference. The Idempotency-Key is generated once and reused on retry." },
  { number: "03", title: "Confirm → success", body: "Pending state shows the server-confirmation message only — never a success icon. Success shows the transaction reference and points awarded." },
  { number: "04", title: "Voucher review → consume", body: "Final review before consume; the Idempotency-Key is generated once and reused on retry." },
  { number: "05", title: "Recent activity", body: "Read-only, current session only. Activity does not survive a restart until a server endpoint exists." },
];

const inventoryRows = [
  { label: "Home / Station Hub", body: "Two dominant actions: scan customer purchase, consume voucher." },
  { label: "Customer Scanner", body: "Live QR scanner. Permission UX is part of the flow." },
  { label: "Scanned Customer", body: "Masked identity only. The server returns eligibility, never the customer's full balance." },
  { label: "Purchase Entry → Review", body: "Idempotency-Key generated once and reused on retry." },
  { label: "Purchase Confirming → Success", body: "Pending shows the server-confirmation message only; success shows the transaction reference and points awarded." },
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
    "14 screens designed with server-authoritative hand-offs. Code in place but not deployed to production hardware. POS hardware integration is planned, not complete. The mobile end-to-end test suite is not yet in place.",
  heroEvidence:
    "The design and code are archived in the source repository. No on-device captures exist today; the screen inventory below is the visible evidence.",
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
      src: undefined,
      alt: "Worker app screen inventory. Ten catalogued screens. No on-device captures exist today.",
      caption: "Screen inventory — ten catalogued screens, no device captures.",
      provenance: "Drawn from the worker app screen spec; no on-device captures exist today.",
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
    "Android station operations, scanner-led, 14 screens with server-authoritative hand-offs. POS hardware integration is planned, not complete.",
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