import Link from "next/link";
import { ArrowUpRight, Box, Compass, Heart, Layers3 } from "lucide-react";
import { KeplerFold } from "@/components/kepler-fold";
import { faqs, offers, publicCaseStudies } from "@/lib/content";

const capabilities = [
  { label: "Direction", icon: Compass },
  { label: "Experience", icon: Box },
  { label: "Build", icon: Layers3 },
  { label: "Care", icon: Heart },
];

const approach = [
  [
    "01",
    "Listen closely",
    "We learn your context, goals, and challenges before suggesting a single solution.",
  ],
  [
    "02",
    "Find the focus",
    "We define the right problems to solve and the outcomes that matter most.",
  ],
  [
    "03",
    "Make it real",
    "We design and build products that are useful, usable, and built to last.",
  ],
  [
    "04",
    "Improve with care",
    "We evolve your product with insight and long-term partnership.",
  ],
];

export default function HomePage() {
  const hasPublicWork = publicCaseStudies.length > 0;

  return (
    <>
      <section className="atelier-hero" aria-labelledby="hero-title">
        <KeplerFold className="hero-fold" priority />
        <div className="shell atelier-hero-content">
          <p className="atelier-kicker hero-kicker">
            Independent digital product studio · Cairo · Working worldwide
          </p>
          <h1 id="hero-title">
            <span>Thoughtful digital </span>
            <span>products, made </span>
            <span>to move your </span>
            <span>business forward.</span>
          </h1>
          <p className="atelier-hero-lead">
            We partner with ambitious teams across the GCC and worldwide to
            shape, design, and build products people value—and businesses can
            grow with.
          </p>
          <div className="atelier-hero-actions">
            <Link className="atelier-primary-action" href="/contact">
              Start a conversation <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link className="atelier-secondary-action" href="#approach">
              Explore our approach <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <p className="atelier-trust-line">
            <span>Founder-led</span>
            <span>Bilingual collaboration</span>
            <span>Working across borders</span>
          </p>
        </div>
      </section>

      <section
        className="atelier-capabilities"
        id="services"
        aria-labelledby="capabilities-heading"
      >
        <KeplerFold
          className="capability-fragment"
          src="/media/kepler-fold/capability-fragment.png"
        />
        <div className="shell atelier-capability-layout">
          <div>
            <h2 id="capabilities-heading">
              Clear thinking.
              <br />
              Beautiful execution.
              <br />
              Reliable delivery.
            </h2>
            <p>
              From early direction to launch and long-term care, we bring
              strategy, design, and engineering together around one clear goal.
            </p>
          </div>
          <ul className="atelier-capability-list">
            {capabilities.map(({ label, icon: Icon }) => (
              <li key={label}>
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="atelier-approach"
        id="approach"
        aria-labelledby="approach-heading"
      >
        <KeplerFold
          className="approach-fragment"
          src="/media/kepler-fold/approach-fragment.png"
        />
        <div className="shell">
          <div className="atelier-approach-intro">
            <p className="atelier-kicker">Our approach</p>
            <h2 id="approach-heading">
              A thoughtful process, shaped around your business.
            </h2>
          </div>
          <ol className="atelier-approach-steps">
            {approach.map(([number, title, body]) => (
              <li key={number}>
                <span className="atelier-step-number">{number}</span>
                <span className="atelier-step-dot" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="atelier-assurance"
        aria-label="Work and studio assurance"
      >
        <article className="atelier-work-disclosure" id="work">
          <div>
            <p className="atelier-kicker">
              {hasPublicWork ? "Selected work" : "Private by nature"}
            </p>
            <h2>
              {hasPublicWork
                ? "Work with the context left intact."
                : "Relevant work, shared with context."}
            </h2>
            <p>
              {hasPublicWork
                ? "Selected studies are published with their delivery context and evidence."
                : "Much of our work is private. We share suitable examples directly, with permission and the story behind each decision."}
            </p>
            <Link
              className="atelier-secondary-action atelier-secondary-dark"
              href={hasPublicWork ? "/work" : "/contact"}
            >
              {hasPublicWork ? "Explore our work" : "Start a conversation"}{" "}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </article>
        <article className="atelier-founder-assurance" id="studio">
          <KeplerFold
            className="assurance-fold-fragment"
            src="/media/kepler-fold/assurance-fragment.png"
          />
          <div>
            <p className="atelier-kicker">Founder-led</p>
            <h2>One accountable partner from first conversation to launch.</h2>
            <p>
              You work directly with the founder and a focused team that stays
              close to your product and your business.
            </p>
            <Link className="atelier-secondary-action" href="/mahmoud">
              About our studio <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </article>
      </section>

      <section className="atelier-services" aria-labelledby="services-heading">
        <div className="shell">
          <div className="atelier-services-heading">
            <p className="atelier-kicker">Ways to work together</p>
            <h2 id="services-heading">
              Focused support for the next useful move.
            </h2>
          </div>
          <div className="atelier-offer-list">
            {offers.map((offer, index) => (
              <article key={offer.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{offer.name}</h3>
                <p>{offer.bestFit}</p>
                <p className="atelier-offer-outcome">{offer.outcome}</p>
                <Link href={`/contact?offer=${encodeURIComponent(offer.name)}`}>
                  Discuss this route <ArrowUpRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="atelier-faq" aria-labelledby="faq-heading">
        <div className="shell atelier-faq-layout">
          <div>
            <p className="atelier-kicker">Questions, answered</p>
            <h2 id="faq-heading">A clear place to begin.</h2>
          </div>
          <div className="atelier-faq-list">
            {faqs.slice(0, 3).map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="atelier-final-cta"
        aria-labelledby="final-cta-heading"
      >
        <KeplerFold
          className="final-fold-fragment"
          src="/media/kepler-fold/final-cta-fragment.png"
        />
        <div className="shell atelier-final-content">
          <p className="atelier-kicker">Ready to start?</p>
          <h2 id="final-cta-heading">Tell us what you&apos;re building.</h2>
          <div>
            <Link className="atelier-primary-action" href="/contact">
              Start a conversation <ArrowUpRight aria-hidden="true" />
            </Link>
            <p>A short conversation can save weeks of guesswork.</p>
          </div>
        </div>
      </section>
    </>
  );
}
