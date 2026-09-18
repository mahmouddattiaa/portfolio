// Privacy notice copy is a DRAFT pending owner/legal review.
// Only facts authorised by the owner are stated on this page. Do not add
// compliance claims or change the contact email here.
import type { Metadata } from "next";
import Link from "next/link";
import { RouteHero } from "@/components/route-hero";
import { getContactConfig } from "@/lib/contact-config";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "Plain-language privacy notice for the Kepler Dev project review form, including what is collected, why, who else handles it, and how to exercise your rights.",
};

const lastUpdated = "18 September 2026";

export default function PrivacyPage() {
  const config = getContactConfig();

  return (
    <>
      <RouteHero
        titleId="privacy-hero-title"
        kicker="Privacy"
        title={
          <>
            <span>A short, plain-language </span>
            <span>notice about your data.</span>
          </>
        }
        lead="Kepler Dev is a sole trader in the United Kingdom. This page explains, in plain English, what we collect when you send a project enquiry, why we collect it, who else handles it, and how to use your rights."
      />

      <section
        className="atelier-route-content atelier-route-pearl"
        aria-labelledby="privacy-heading"
      >
        <div className="shell atelier-narrow">
          <p className="atelier-kicker" style={{ color: "#6F4224" }}>
            Who is responsible
          </p>
          <h2 id="privacy-heading">Kepler Dev is the controller.</h2>
          <p>
            Kepler Dev is the trading name of Mahmoud Attia, a sole trader in
            the United Kingdom. The framework that applies is UK data
            protection law (UK GDPR). If you have a concern you cannot resolve
            with us, the Information Commissioner&rsquo;s Office (ICO) is the
            complaints body.
          </p>

          <p className="atelier-kicker" style={{ color: "#6F4224" }}>
            What we collect
          </p>
          <h2>Two things, only when you choose to share them.</h2>
          <p>
            The enquiry form fields you fill in: your name, work email,
            company, country, the workflow or problem, the outcome you have
            in mind, the starting point, target timing, working budget, and
            any link you choose to add. The consent checkbox records that you
            have agreed to this notice.
          </p>
          <p>
            Anonymous usage statistics from Vercel Analytics when you browse
            the site. These tell us which pages are visited, not who you are.
          </p>

          <p className="atelier-kicker" style={{ color: "#6F4224" }}>
            Why we collect it
          </p>
          <h2>To respond to your enquiry.</h2>
          <p>
            The lawful basis is your consent, together with the legitimate
            interest in answering enquiries that come in through the form.
            Analytics are used only to understand which pages are useful and
            how the site is performing.
          </p>

          <p className="atelier-kicker" style={{ color: "#6F4224" }}>
            Who else handles it
          </p>
          <h2>A short list of processors.</h2>
          <p>
            Formspree delivers the form submission. Vercel hosts the site and
            provides anonymous analytics. The email provider that receives
            your enquiry holds the message until it is dealt with.
          </p>
          <p>
            We do not sell your data. There is no advertising tracking on
            this site.
          </p>

          <p className="atelier-kicker" style={{ color: "#6F4224" }}>
            How long we keep it
          </p>
          <h2>
            Enquiries that do not become projects are deleted after 24 months.
          </h2>
          <p>
            If an enquiry turns into a project, the usual record-keeping for
            that project applies. Anything that does not become a project is
            deleted 24 months after the last message.
          </p>

          <p className="atelier-kicker" style={{ color: "#6F4224" }}>
            Your rights
          </p>
          <h2>Access, correction, deletion, and withdrawal of consent.</h2>
          <p>
            You can ask to see the data we hold about you, ask us to correct
            it, ask us to delete it, or withdraw your consent. Write to us
            through the public contact address on this site
            {config.fallbackEmail ? (
              <>
                {" "}
                (<a href={`mailto:${config.fallbackEmail}`}>{config.fallbackEmail}</a>)
              </>
            ) : (
              <>
                {" "}
                (see the <Link href="/contact">contact page</Link>)
              </>
            )}
            .
          </p>
          <p>
            If we cannot resolve a concern, you have the right to complain to
            the ICO.
          </p>

          <p
            className="atelier-kicker"
            style={{ color: "#6F4224", marginBlockStart: "2rem" }}
          >
            Last updated
          </p>
          <p style={{ margin: 0 }}>{lastUpdated}</p>
        </div>
      </section>
    </>
  );
}