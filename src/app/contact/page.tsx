import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { getContactConfig } from "@/lib/contact-config";
import { RouteHero } from "@/components/route-hero";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Request a project review",
  description:
    "Start a Kepler Dev project review with the workflow or product problem that needs attention.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ offer?: string }>;
}) {
  const { offer } = await searchParams;
  const config = getContactConfig();

  return (
    <>
      <RouteHero
        titleId="contact-hero-title"
        kicker="Project review"
        title={
          <>
            <span>Start with the workflow </span>
            <span>that needs to work better.</span>
          </>
        }
        lead="Share the current problem, the outcome you need, and anything that gives useful context. This form is designed to make the first conversation more productive."
        actions={
          config.fallbackEmail ? (
            <a
              className="atelier-secondary-action"
              href={`mailto:${config.fallbackEmail}`}
            >
              Or email {config.fallbackEmail}
            </a>
          ) : null
        }
      />

      <section className="atelier-contact-card" aria-labelledby="contact-card-title">
        <div className="shell">
          <h2 id="contact-card-title" className="sr-only">
            Project review form
          </h2>
          {config.enabled ? (
            <ContactForm
              defaultOffer={offer || ""}
              fallbackEmail={config.fallbackEmail}
            />
          ) : (
            <section
              className="atelier-contact-unavailable"
              aria-labelledby="contact-unavailable-title"
            >
              <h2 id="contact-unavailable-title">
                Online project enquiries are not available at the moment.
              </h2>
              <p>
                Kepler Dev will only open this form once its delivery route and
                verified fallback are configured.
              </p>
              {config.fallbackEmail ? (
                <p>
                  For a project review, use the verified fallback:{" "}
                  <a href={`mailto:${config.fallbackEmail}`}>
                    {config.fallbackEmail}
                  </a>
                  .
                </p>
              ) : (
                <p>
                  For a project review in the meantime, please reach out
                  directly.
                </p>
              )}
              <p>
                <Link
                  className="atelier-secondary-action"
                  href="/mahmoud"
                >
                  About the studio <span aria-hidden="true">→</span>
                </Link>
              </p>
            </section>
          )}
        </div>
      </section>
    </>
  );
}
