import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import formStyles from "@/components/contact-form.module.css";
import { getContactConfig } from "@/lib/contact-config";
import { normalizeOfferParam } from "@/lib/contact";
import { RouteHero } from "@/components/route-hero";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Schedule a Project Review & Architecture Call | Kepler Dev",
  description:
    "Consult directly with senior Cairo engineers at Kepler Dev to scope your app MVP, technical blueprint, or multi-surface operational platform.",
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
        lead="Tell us what product you are launching or which operational bottleneck you are solving, what platforms are involved, and your target window. A senior engineer reviews every submission directly."
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
              Complete the project parameters below. An engineer replies within one business day across Cairo, Riyadh, and London hours with thoughtful questions or a review slot.
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
          <h2 id="qualification-heading">Who We Partner With Best</h2>
          <h3>Founders Turning a Concept Into a Production First Release</h3>
          <p>
            Bringing an app or SaaS idea before writing code? We begin with a focused Product Blueprint to lock user flows, OpenAPI contracts, and realistic release boundaries (with the Blueprint fee credited in full if we build together) before moving into a Launch Sprint.
          </p>
          <h3>Operations Teams Replacing Manual Workflows &amp; Hardware Gaps</h3>
          <p>
            Outgrowing WhatsApp coordination, spreadsheets, or disconnected vendor tools? Share your multi-surface needs—such as Arabic-first RTL dashboards, Sunmi Android POS terminals, or Mada, Moyasar, and ZATCA compliance—to scope a phased Operations Platform.
          </p>
          <h2>What to Expect During the Architecture Review</h2>
          <p>
            Within one business day, a senior engineer reviews your brief and proposes a focused 30-minute technical call. We inspect your core constraints (offline sync, hardware SDKs, payment idempotency, or first-release scope) and give you clear, honest architectural feedback with 100% client ownership of all code and infrastructure.
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
