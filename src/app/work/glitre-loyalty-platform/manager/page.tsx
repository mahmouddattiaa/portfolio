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

const managerRailSections = [
  { id: "section-hero", label: "Overview" },
  { id: "section-inventory", label: "Nine pages" },
  { id: "section-roles", label: "Roles and permissions" },
  { id: "section-arabic", label: "Arabic-first rendering" },
  { id: "section-workflows", label: "Critical workflows" },
  { id: "glitre-visual-proof", label: "Visual proof" },
  { id: "glitre-not-shown", label: "What is not shown" },
  { id: "glitre-neighbour", label: "Other product studies" },
];

const inventoryRows = [
  { label: "Login", body: "Email-based sign-in; silent token refresh; access-denied state on stale or missing role." },
  { label: "Overview", body: "At-a-glance counters and recent activity; the reference page for localization." },
  { label: "Stations", body: "Station roster; per-station configuration; live status indicators." },
  { label: "Workers", body: "Worker roster; per-station assignment; credential reset." },
  { label: "Customers", body: "Customer search; masked identity surfaces; complaint history." },
  { label: "Transactions", body: "Cursor pagination; server-side filters; URL-encoded filter state." },
  { label: "Complaints", body: "Triage queue; internal notes that never appear in customer-facing resolution fields." },
  { label: "Audit", body: "Append-only audit-event surface with actor, time, action, object, reason, result, reference." },
  { label: "Offers", body: "Draft / publish / archive lifecycle; multilingual; station-scoped." },
];

const product: GlitreProduct = {
  key: "manager",
  railSections: managerRailSections,
  heroEyebrow: "Dashboard study · Internal operations",
  heroHeadline:
    "An internal control surface for stations, workers, customers, transactions, complaints and offers.",
  heroStatus:
    "Live and used internally by head-office operations; not published to the open web. Screenshots on this page are redacted.",
  heroEvidence:
    "Captured 36 PNGs at 1440 × 900 and 390 × 844 for the 9 pages × 2 locales × 2 viewports. 0 axe-core WCAG 2.1 AA violations, 0 console errors, 0 failed network requests across the captures. The captures are excluded from the audit's own .gitignore; they are not on disk today.",
  sections: [
    {
      id: "section-inventory",
      eyebrow: "Nine pages",
      heading: "An inventory drawn from the design spec.",
      body: (
        <ul className="glitre-inventory" aria-label="Dashboard page inventory">
          {inventoryRows.map((row) => (
            <li key={row.label}>
              <span className="glitre-inventory-label">{row.label}</span>
              <span>{row.body}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "section-roles",
      eyebrow: "Roles and permissions",
      heading: "RBAC-aware navigation; minimum necessary disclosure.",
      body: (
        <>
          <p>
            Admin / cs / finance roles each see only their own pages. Silent token refresh; access-denied states on stale or missing permissions. The dashboard never calculates a balance or derives loyalty state client-side — every read goes through the server.
          </p>
        </>
      ),
    },
    {
      id: "section-arabic",
      eyebrow: "Arabic-first rendering",
      heading: "Arabic is primary, English is secondary — honestly disclosed.",
      body: (
        <>
          <p>
            Seven protected pages currently ship with hardcoded English headings/text in the AR locale. The fix path is documented work-in-progress, not a hidden flaw — and the audit&rsquo;s accessibility run is across both locales.
          </p>
        </>
      ),
    },
    {
      id: "section-workflows",
      eyebrow: "Critical workflows",
      heading: "Eight flows, with reversal as the audit-by-design example.",
      body: (
        <>
          <p>
            Login, Stations, Workers, Customer Lookup, Transaction Search, Manual Adjustment, Reversal, Rewards &amp; Offers, and Audit. Reversal never edits the original transaction — it posts a new opposite ledger entry. Manual adjustments require a reason. The audit-event surface captures actor, time, action, object, reason, result, and reference.
          </p>
        </>
      ),
    },
  ],
  visualSlots: [],
  controlledVocabulary: [
    "Production tenant data is not exposed.",
    "Credentials and tokens are not shown.",
    "Until the 36 audited captures are recovered, re-run, or substituted, no dashboard images are committed.",
  ],
};

export const metadata: Metadata = {
  title: "Manager dashboard study · Glitre Loyalty Platform",
  description:
    "Internal control surface for stations, workers, customers, transactions, complaints and offers. Live and private.",
};

export default function GlitreManagerPage() {
  const study = publicCaseStudies.find((item) => item.slug === "glitre-loyalty-platform");
  if (!study) notFound();
  return (
    <article className="cs-page glitre-page">
      <GlitreShell>
        <ContentsRail
          sections={managerRailSections}
          verification={glitreVerifiedLabel}
        />
        <GlitreProductArticle product={product} />
      </GlitreShell>
    </article>
  );
}