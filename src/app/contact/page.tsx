import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import formStyles from "@/components/contact-form.module.css";
import { getContactConfig } from "@/lib/contact-config";
import { normalizeOfferParam } from "@/lib/contact";
import { RouteHero } from "@/components/route-hero";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Schedule a Project Review & Architecture Call — Kepler Dev",
  description:
    "Consult directly with senior engineers at Kepler Dev to scope your operational software, mobile app, or multi-surface system build on predictable timelines.",
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
        kicker="Project Review & Technical Scoping"
        title={
          <>
            <span>Schedule a Direct Project Review</span>
            <span>and Architecture Call</span>
          </>
        }
        lead="Tell us what operational bottleneck you are solving, which platforms or hardware are involved, and your target timeline. A senior engineer reviews every submission directly."
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
            <p className="atelier-kicker">Project review intake</p>
            <h2 id="contact-form-heading">Direct Project Review Intake Form</h2>
            <p>
              Complete the project parameters below. All fields marked with an asterisk are required so an engineer can prepare before responding.
            </p>
          </div>
          <ContactForm
            defaultOffer={defaultOffer}
            fallbackEmail={config.fallbackEmail}
            deliveryAvailable={config.enabled}
          />
        </section>

        <section className={formStyles.qualification} aria-labelledby="qualification-heading">
          <p className="atelier-kicker">Qualification & discovery</p>
          <h2 id="qualification-heading">Qualification Criteria for Potential Engineering Engagements</h2>
          <h3>Evaluating Operational Bottlenecks and High-Stakes Workflows</h3>
          <p>
            We are the strongest fit for businesses replacing manual spreadsheets, WhatsApp coordination, or fragile vendor software with connected web, mobile, POS, or automated backend systems.
          </p>
          <h3>Project Timeline, Technical Constraints, and Budget Alignment</h3>
          <p>
            Sharing your realistic launch window, regional compliance needs (such as Arabic RTL, Mada, Moyasar, or ZATCA), and target engagement tier lets us give you honest architectural feedback on the first call.
          </p>
          <h2>What to Expect During the Architecture Discovery Session</h2>
          <p>
            Within one business day, we review your intake notes and propose a 30-minute engineering review call. On that call, we inspect your current workflow, identify technical risk areas (offline sync, hardware SDKs, payment idempotency, or schema boundaries), and confirm whether to start with a 5–10 day Kepler Product Blueprint or move straight into a build sprint.
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
