import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RouteHero } from "@/components/route-hero";
import styles from "./studio.module.css";

export const metadata: Metadata = {
  title: "Studio Engineering Standards & Footprint | Kepler Dev",
  description:
    "Meet Kepler Dev's Cairo engineering team overlapping Riyadh and London hours—contract-first OpenAPI specs, native hardware bridges, and strict verification gates.",
  alternates: { canonical: "/studio" },
};

const facts = [
  { label: "Commercial model", value: "Written milestone contracts, explicit acceptance gates, and unconditional IP handover." },
  { label: "Regions served", value: "Saudi Arabia, UAE, Qatar, Kuwait, Egypt, the United Kingdom, Europe, and international product teams." },
  { label: "Architecture", value: "Contract-first OpenAPI, automated verification gates, Arabic-first RTL, and English localization." },
  { label: "Ownership", value: "100% client-owned source repositories, API schemas, and cloud infrastructure across every engagement." },
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
        kicker="Studio Standards & Operating Footprint"
        title={
          <>
            <span>Studio Engineering Principles</span>
            <span>and Commercial Standards</span>
          </>
        }
        lead="Kepler Dev is structured for founders and businesses that cannot afford broken field terminals, silent API regressions, or vendor lock-in."
        actions={
          <>
            <Link className="atelier-primary-action" href="/contact">
              Discuss a project <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link className="atelier-secondary-action" href="/work">
              View selected work
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
          <p className="atelier-kicker">Studio accountability</p>
          <h2 id="accountability-heading">Why Kepler Dev Operates as an Independent Senior Studio</h2>
          <p>
            Founders and businesses needing custom software usually face two flawed options: fragmented freelancers who write isolated screens without shared data integrity, or large agencies that pad headcount with account managers and lock clients into multi-month retainers. Kepler Dev operates as a focused Cairo engineering team overlapping Riyadh and London hours. The senior engineers who scope your Product Blueprint are the same engineers who lock the OpenAPI contract, automate repetitive boilerplate, and verify every production release.
          </p>
          <h3>Direct Engineering Ownership Without Intermediary Layers</h3>
          <p>
            Decisions happen directly in technical reviews without telephone-game translation across non-technical account managers. Every release clears automated CI schema-drift checks, deterministic ledger and webhook tests, and documented deployment runbooks.
          </p>
          <h3>Complete Client Source Code and Infrastructure Ownership</h3>
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
