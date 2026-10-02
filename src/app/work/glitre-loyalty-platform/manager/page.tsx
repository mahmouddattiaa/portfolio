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

const workflowCards = [
  {
    label: "Customer lookup",
    body: "Search by phone, name or voucher. The dashboard returns only what each role is allowed to see — no full customer record by accident.",
  },
  {
    label: "Transaction search",
    body: "Cursor pagination over the ledger. Filters are server-side and URL-encoded so a view is shareable and replayable for the same role.",
  },
  {
    label: "Manual adjustment",
    body: "Used to correct the human-error case. The adjustment posts as a new ledger entry with a reason and never edits the original.",
  },
  {
    label: "Reversal",
    body: "Used to correct a real error. The reversal posts an opposite ledger entry — never a delete or undo of the original record.",
  },
  {
    label: "Rewards & offers",
    body: "Offers are drafted, published and archived in Arabic and English, scoped by station and role. Head office sees what was published, when, and to whom.",
  },
  {
    label: "Audit",
    body: "Every privileged action is captured as an audit-event with reason and reference — the trail a fuel-company compliance team asks for.",
  },
];

const product: GlitreProduct = {
  key: "manager",
  railSections: managerRailSections,
  heroEyebrow: "Dashboard study · Internal operations",
  heroHeadline:
    "An internal control surface for stations, workers, customers, transactions, complaints and offers.",
  heroStatus:
    "Live and used internally by head-office operations; not published to the open web. No production screenshots are published with this case study.",
  heroEvidence:
    "The dashboard is built and in daily use by head office. Captures from an internal accessibility audit exist off-portfolio; until they are recovered or re-run, the page below uses the nine-page inventory as the visible evidence and shows no live screenshots.",
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
            Admin, customer service and finance roles each see only their own pages. Silent token refresh; access-denied states on stale or missing permissions. The dashboard never calculates a balance or derives loyalty state client-side — every read goes through the server.
          </p>
          <p>
            That decision is what lets the same surface serve head office, regional managers and customer-service agents without ever exposing a full customer record by mistake.
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
            Seven protected pages currently ship with hardcoded English headings in the Arabic locale. The fix path is documented work-in-progress, not a hidden flaw; the platform&rsquo;s accessibility review covers both locales and the issue is named as a follow-up rather than glossed.
          </p>
        </>
      ),
    },
    {
      id: "section-workflows",
      eyebrow: "Critical workflows",
      heading: "Six daily flows, with reversal as the audit-by-design example.",
      body: (
        <>
          <p>
            Customer lookup, transaction search, manual adjustment, reversal, rewards &amp; offers, and audit. Reversal never edits the original transaction — it posts a new opposite ledger entry. Manual adjustments require a reason. The audit-event surface captures actor, time, action, object, reason, result and reference.
          </p>
          <ul className="glitre-inventory" aria-label="Critical workflows">
            {workflowCards.map((row) => (
              <li key={row.label}>
                <span className="glitre-inventory-label">{row.label}</span>
                <span>{row.body}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
  ],
  visualSlots: [],
  controlledVocabulary: [
    "Production tenant data is not exposed.",
    "Credentials and tokens are not shown.",
    "No live manager dashboard screenshots are published with this case study.",
  ],
};

export const metadata: Metadata = {
  title: "Manager dashboard study · Glitre Loyalty Platform",
  description:
    "Internal control surface for stations, workers, customers, transactions, complaints and offers. Live and used internally; the dashboard URL stays private.",
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