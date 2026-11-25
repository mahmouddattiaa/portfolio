import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import formStyles from "@/components/contact-form.module.css";
import { getContactConfig } from "@/lib/contact-config";
import { normalizeOfferParam } from "@/lib/contact";
import { RouteHero } from "@/components/route-hero";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Start a $300 Product Blueprint Call | Kepler Dev",
  description:
    "Send your app idea or operations scope to hello@keplerdev.uk. Book a 20-minute call across Cairo, GCC, and UK hours to start a credited $300 Blueprint.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ offer?: string | string[] }>;
}) {
  const { offer: offerParam } = await searchParams;
  const config = getContactConfig();
  const defaultOffer = normalizeOfferParam(offerParam);

  return (
    <>
      <RouteHero
        titleId="contact-hero-title"
        kicker="Blueprint & Project Scoping"
        title={
          <>
            <span>Start Your Credited $300 Product Blueprint</span>
            <span>or Project Scoping Call</span>
          </>
        }
        lead="Share your app idea or manual workflow bottleneck, target surfaces, and timeline. A senior engineer from our Cairo studio replies directly across Cairo, GCC, and UK hours—no sales middlemen."
        actions={
          config.fallbackEmail ? (
            <a className="atelier-secondary-action" href={"mailto:" + config.fallbackEmail}>
              Prefer direct email? Write to {config.fallbackEmail}
            </a>
          ) : null
        }
      />

      <section className={formStyles.contactFunnel} aria-label="Project review qualification and intake">
        <section className={formStyles.contactIntake} aria-labelledby="contact-form-heading">
          <div className={formStyles.intakeHeading}>
            <p className="atelier-kicker">Project scoping intake</p>
            <h2 id="contact-form-heading">Tell Us What You Need to Ship</h2>
            <p>
              A senior engineer replies the same business day across Cairo, Riyadh, and London hours with a proposed 20-minute scoping slot or clarifying questions.
            </p>
          </div>
          <ContactForm
            defaultOffer={defaultOffer}
            fallbackEmail={config.fallbackEmail}
            deliveryAvailable={config.enabled}
          />
        </section>

        <section className={formStyles.qualification} aria-labelledby="qualification-heading">
          <p className="atelier-kicker">Two clear starting tracks</p>
          <h2 id="qualification-heading">Share Your Goal, Target Surfaces &amp; Timeline</h2>
          <h3>Idea-Stage Founders — Scope Your MVP Before Writing Code</h3>
          <p>
            Bringing an app or SaaS idea? Start with a 3–5 business day Product Blueprint (From $300, 100% credited toward your build) to lock user flows, OpenAPI contracts, and fixed Launch Sprint pricing (From $1,800, 2–5 weeks) without agency markup.
          </p>
          <h3>Operations Leads — Replace WhatsApp &amp; Spreadsheets in Phased Releases</h3>
          <p>
            Running a multi-branch or field operation? Share your manual spreadsheets, WhatsApp order flows, Sunmi POS needs, or Arabic-first RTL and ZATCA/Mada/Moyasar requirements to scope a phased Operations Platform (From $4,000 Phase 1).
          </p>
          <h2>What the First 20-Minute Scoping Call Produces</h2>
          <p>
            Within one business day, we review your brief and propose a 20-minute engineering call across Africa/Cairo, Asia/Riyadh, and Europe/London hours. On that call, we clarify technical risks (offline sync, hardware SDKs, payment idempotency, or v1 boundaries) and confirm the right fixed-scope starting tier—with 100% client ownership of code and cloud accounts.
          </p>
        </section>
      </section>

      <section className="atelier-route-content atelier-route-pearl" aria-labelledby="contact-channels-heading">
        <div className="shell atelier-narrow">
          <p className="atelier-kicker">Direct communication</p>
          <h2 id="contact-channels-heading">Direct Communication Channels and Studio Contact Information</h2>
          {config.fallbackEmail ? (
            <p>Email: <a href={"mailto:" + config.fallbackEmail}>{config.fallbackEmail}</a></p>
          ) : (
            <p>Use the project review form above to contact the studio.</p>
          )}
          <p>Operating hours: United Kingdom (Europe/London) · Cairo & GCC (Africa/Cairo · Asia/Riyadh).</p>
          <p>
            Your technical brief is read exclusively by Kepler Dev engineering leads for scoping and qualification. Form submissions transmit securely via Formspree and are never shared with third-party brokers or marketing lists.
          </p>
          <p><Link href="/privacy">Read the privacy notice</Link>.</p>
        </div>
      </section>
    </>
  );
}
