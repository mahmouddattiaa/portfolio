import type { Metadata } from "next";
import Link from "next/link";
import { RouteHero } from "@/components/route-hero";
import { getContactConfig } from "@/lib/contact-config";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy & Trading Identity | Kepler Dev",
  description:
    "Read Kepler Dev's plain-language privacy policy and honest trading identity: Mahmoud Attia, trading as Kepler Dev in Cairo, Egypt, with minimal data handling.",
  alternates: { canonical: "/privacy" },
};

const lastUpdated = "November 2026";

export default function PrivacyPage() {
  const config = getContactConfig();

  return (
    <>
      <RouteHero
        titleId="privacy-hero-title"
        kicker="Privacy & Data Protection"
        title={
          <>
            <span>A plain-language notice</span>
            <span>about your data.</span>
          </>
        }
        lead="Kepler Dev handles project briefs with strict confidentiality and data minimization. This notice explains what we collect when you request a project review and how to exercise your rights."
      />

      <section className={styles.ledgerSection} aria-label="Privacy and data controller ledger">
        <div className={styles.ledger}>
          <article className={styles.row}>
            <div className={styles.label}>
              <p className="atelier-kicker">Who is responsible</p>
              <h2>Kepler Dev is the controller.</h2>
            </div>
            <div className={styles.copy}>
              <p>
                Mahmoud Attia, trading as Kepler Dev (Cairo, Egypt), operates as an independent software engineering studio serving founders and businesses across the GCC, Egypt, the United Kingdom, and international markets. We apply GDPR-aligned data minimization and strict confidentiality standards to every enquiry.
              </p>
            </div>
          </article>

          <article className={styles.row}>
            <div className={styles.label}>
              <p className="atelier-kicker">What we collect</p>
              <h2>The details you choose to share.</h2>
            </div>
            <div className={styles.copy}>
              <p>
                The project review details you submit: your name, company or organization, work email address, engagement model, optional target launch or discovery window, and workflow or product brief.
              </p>
              <p>Vercel Analytics also provides anonymous usage statistics when you browse the site.</p>
            </div>
          </article>

          <article className={styles.row}>
            <div className={styles.label}>
              <p className="atelier-kicker">Why we collect it</p>
              <h2>To scope and reply to your enquiry.</h2>
            </div>
            <div className={styles.copy}>
              <p>We use your project review details to understand your enquiry, prepare for the first conversation, and reply to you.</p>
            </div>
          </article>

          <article className={styles.row}>
            <div className={styles.label}>
              <p className="atelier-kicker">Processors</p>
              <h2>A short list of infrastructure processors.</h2>
            </div>
            <div className={styles.copy}>
              <p>
                Formspree delivers form submissions. Vercel hosts the site and provides anonymous analytics. The email provider that receives enquiries also handles your message.
              </p>
              <p>We do not sell your data. There is no advertising tracking on this site.</p>
            </div>
          </article>

          <article className={styles.row}>
            <div className={styles.label}>
              <p className="atelier-kicker">Retention</p>
              <h2>Non-project enquiries clear after 24 months.</h2>
            </div>
            <div className={styles.copy}>
              <p>Enquiries that do not become projects are deleted after 24 months. Active client repositories and cloud infrastructure remain owned by the client.</p>
            </div>
          </article>

          <article className={styles.row}>
            <div className={styles.label}>
              <p className="atelier-kicker">Your rights</p>
              <h2>Access, correction, deletion, and a route to raise concerns.</h2>
            </div>
            <div className={styles.copy}>
              <p>
                You can ask to see the data we hold about you, ask us to correct it, or ask us to delete it. Write to us using the public contact address on this site
                {config.fallbackEmail ? (
                  <> (<a href={"mailto:" + config.fallbackEmail}>{config.fallbackEmail}</a>)</>
                ) : (
                  <> (see the <Link href="/contact">contact page</Link>)</>
                )}.
              </p>
              <p>If you remain dissatisfied with how we handle your data, you may also raise a concern with the data protection authority in your jurisdiction.</p>
              <p className={styles.lastUpdated}>Last updated: {lastUpdated}.</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
