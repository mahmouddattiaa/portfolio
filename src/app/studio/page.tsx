import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RouteHero } from "@/components/route-hero";
import styles from "./studio.module.css";

export const metadata: Metadata = {
  title: "Contract-First OpenAPI Engineering Team | Kepler Dev",
  description:
    "Meet our Cairo engineering team overlapping Riyadh and London hours. Contract-first OpenAPI specs, native hardware bridges, and strict verification gates.",
  alternates: { canonical: "/studio" },
};

const facts = [
  { label: "Timezone overlap", value: "Cairo engineering team (Africa/Cairo) overlapping Riyadh (Asia/Riyadh) and London (Europe/London) hours." },
  { label: "Speed & economics", value: "Direct senior Cairo execution with zero account-manager markup, contract-first OpenAPI, and automated scaffolding." },
  { label: "Verification gates", value: "CI schema-drift checks, deterministic ledger/webhook tests, and native hardware/offline QA before handoff." },
  { label: "Client ownership", value: "100% unconditional ownership of source repositories, OpenAPI contracts, databases, and cloud accounts." },
];

const signatures = [
  {
    title: "Contract-First Architecture and Automated Schema Drift Prevention",
    body: "Multi-surface products fail when backend engineers and mobile developers work from stale assumptions. We anchor every web dashboard, mobile app, and backend service to one shared OpenAPI contract, with automated continuous integration checks that block schema drift before merge (proven across 60 operations and 30 data models in glitre-loyalty-platform and 38+ screens in medconnect-egypt).",
  },
  {
    title: "Fault-Tolerant Native Hardware and Offline Resilience",
    body: "Field operations do not pause for weak cellular reception, and cross-platform UI kits often hit operating system ceilings. Our engineers write local offline transaction queues alongside native Kotlin, Swift, and Java platform channels. These cover iOS and Android packet tunnels in hs-vpn, a 30ms pre-warmed FlutterEngine keyboard service in aksira-ai-keyboard, and Sunmi thermal printer and Mada card terminal drivers in quickcharging-pos.",
  },
  {
    title: "Mathematical Data Integrity and Append-Only Financial Ledgers",
    body: "Balances, loyalty points, and room inventory cannot rely on optimistic client updates. Every value-moving write uses strict idempotency keys, database-enforced append-only ledgers, or atomic distributed locks. This prevents double-spent points in glitre-loyalty-platform, concurrent last-room double bookings in stayease, and duplicate payment webhook settlements in qiraaty.",
  },
  {
    title: "Bounded Schema-Validated AI Systems",
    body: "When an operational workflow requires language models or document parsing, we wrap inference inside strict JSON schema validators, fallback cascades, and deterministic schedulers. This approach runs in 24/7 production in classroom-sentinel and powers bilingual rewriting in aksira-ai-keyboard.",
  },
];

export default function StudioPage() {
  return (
    <>
      <RouteHero
        titleId="studio-hero-title"
        kicker="Cairo Engineering Studio · GCC & UK Overlap"
        title={
          <>
            <span>Contract-First Engineering Studio</span>
            <span>Built in Cairo for GCC &amp; UK Teams</span>
          </>
        }
        lead="Senior engineers working directly with founders and operations leads—pairing one OpenAPI contract, automated scaffolding, native Kotlin/Java/Swift hardware bridges, and independent verification gates across Cairo, Riyadh, and London hours."
        actions={
          <>
            <Link className="atelier-primary-action" href="/contact">
              Schedule a technical scoping call <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link className="atelier-secondary-action" href="/services">
              Review our 4 offer tiers
            </Link>
          </>
        }
      />

      <section className={styles.factsSection} aria-label="Studio operating facts">
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div className={styles.fact} key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={"atelier-route-content atelier-route-pearl " + styles.contentSection} aria-labelledby="accountability-heading">
        <div className={"shell atelier-narrow " + styles.narrow}>
          <p className="atelier-kicker">Economic &amp; speed discipline</p>
          <h2 id="accountability-heading">Why Kepler Dev Ships Production Releases in 2–5 Weeks Without Agency Markups</h2>
          <p>
            Early-stage founders and operations-driven SMEs face two flawed options: fragmented freelancers who write isolated screens without shared data integrity, or large agencies that charge account-manager markups and multi-month discovery retainers. Kepler Dev operates as a focused Cairo engineering team with full same-day overlap across Riyadh and London hours. The senior engineers who scope your Product Blueprint are the same engineers who lock the OpenAPI contract, eliminate CRUD boilerplate with automated scaffolding, and verify every production release.
          </p>
          <h3>Three-Prong Engineering Discipline and Verification Gates</h3>
          <p>
            Direct Cairo execution removes middleman layers while a single frozen OpenAPI contract lets backend, web, mobile, and Sunmi POS clients build in parallel without mid-sprint rework. Before handoff, every build clears automated CI schema-drift checks, idempotent financial ledger and webhook tests, and documented deployment runbooks.
          </p>
          <h3>Unconditional Client Source Code and Cloud Ownership</h3>
          <p>
            Your organization retains 100% unconditional ownership of all source repositories, OpenAPI contracts, database schemas, and cloud accounts upon milestone completion. We deploy straight into your Microsoft Azure UAE North, AWS, or Linux environments with zero vendor lock-in.
          </p>
        </div>
      </section>

      <section className={styles.signaturesSection} aria-labelledby="signatures-heading">
        <div className={styles.signaturesHeading}>
          <p className="atelier-kicker">How we engineer</p>
          <h2 id="signatures-heading">Studio Engineering Signatures</h2>
        </div>
        <div className={styles.signatures}>
          {signatures.map((signature) => (
            <article className={styles.signature} key={signature.title}>
              <h3>{signature.title}</h3>
              <p>{signature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={"atelier-route-content atelier-route-pearl " + styles.governanceSection} aria-labelledby="governance-heading">
        <div className="shell">
          <p className="atelier-kicker">Footprint & commercial standards</p>
          <h2 id="governance-heading">Transparent Commercial Standards and Active GCC & UK Delivery</h2>
          <dl className={styles.governance}>
            <div className={styles.governanceRow}>
              <dt>Written milestone accountability and time-zone aligned engineering</dt>
              <dd>
                Kepler Dev operates from Cairo with full working-day overlap across Riyadh, Dubai, London, and European product teams — backed by written statements of work, milestone-gated invoicing, unconditional IP assignment upon payment, and strict confidentiality.
              </dd>
            </div>
            <div className={styles.governanceRow}>
              <dt>Active GCC operational delivery and bilingual architecture</dt>
              <dd>
                Our studio builds natively for Saudi Arabia, the UAE, Qatar, Kuwait, and Egypt (Africa/Cairo and Asia/Riyadh), pairing Arabic-first RTL user interfaces and English localization with regional payment and compliance rails including Mada (SkyBand), Moyasar, and Saudi ZATCA e-invoicing.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={"atelier-final-cta " + styles.centeredCta} aria-labelledby="studio-cta-heading">
        <div className={"shell atelier-final-content " + styles.centeredContent}>
          <p className="atelier-kicker">Start a Technical Conversation</p>
          <h2 id="studio-cta-heading">Put Your System Requirements in Front of Senior Engineers</h2>
          <div className={styles.ctaLinks}>
            <Link className="atelier-primary-action" href="/contact">
              Request a project review <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link className="atelier-secondary-action" href="/work">Review our 13 studio builds</Link>
          </div>
        </div>
      </section>
    </>
  );
}
