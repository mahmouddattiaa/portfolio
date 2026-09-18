import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import "./home-v2.css";
import { getPresentation } from "@/components/case-study/presentation";
import { CountUp } from "@/components/case-study/count-up";
import {
  BlueprintScreen,
  ContextBriefScreen,
  ContractDiagram,
  CustomerAppScreen,
  LedgerScreen,
  ReleaseNotesScreen,
  ReleaseScreen,
  StaffAppScreen,
} from "@/components/home/illustrative-screens";
import { MobileCta } from "@/components/home/mobile-cta";
import { DrawnLine, Reveal } from "@/components/home/reveal";
import { WaysAccordion } from "@/components/home/ways-accordion";
import { faqs, offers, publicCaseStudies } from "@/lib/content";

const steps = [
  {
    number: "01",
    title: "Listen closely",
    body: "We learn your context, goals, and challenges before suggesting a single solution.",
    Screen: ContextBriefScreen,
  },
  {
    number: "02",
    title: "Find the focus",
    body: "We define the right problems to solve and the outcomes that matter most.",
    Screen: BlueprintScreen,
  },
  {
    number: "03",
    title: "Make it real",
    body: "We design and build products that are useful, usable, and built to last.",
    Screen: ReleaseScreen,
  },
  {
    number: "04",
    title: "Improve with care",
    body: "We evolve your product with insight and long-term partnership.",
    Screen: ReleaseNotesScreen,
  },
];

const founderFacts = [
  ["Based in", "United Kingdom"],
  ["Working with", "Teams across the GCC and worldwide"],
  ["Languages", "Arabic, English, French and German"],
  ["Involvement", "Discovery through delivery"],
];

export default function HomePage() {
  const featured = publicCaseStudies[0];
  const presentation = featured ? getPresentation(featured.slug) : null;
  const context = presentation?.heroEyebrow.split(" · ").slice(1).join(" · ");

  return (
    <div className="hv2">
      {/* 1 — Hero */}
      <section id="hv2-hero" className="hv2-hero" aria-labelledby="hero-title">
        <div className="hv2-hero-media" aria-hidden="true">
          <Image
            className="hv2-hero-photo"
            src="/media/home/hero-tree.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 767px) 100vw, 60vw"
          />
          <span className="hv2-hero-sun" />
        </div>
        <div className="hv2-hero-content">
          <h1 id="hero-title" className="hv2-rise">
            <span className="hv2-brand">Kepler Dev</span> designs and builds
            digital products, from first idea to production.
          </h1>
          <Link
            className="hv2-link hv2-link-light hv2-rise hv2-rise-late"
            href={featured ? "#work" : "/work"}
          >
            See selected work <ArrowDown aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 2 — Selected work */}
      {featured && presentation ? (
        <section id="work" className="hv2-work" aria-labelledby="work-title">
          <div className="hv2-pad hv2-work-top">
            <p className="hv2-eyebrow">Selected work</p>
            <Link className="hv2-link" href="/work">
              All work <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="hv2-pad hv2-work-head">
            <div className="hv2-work-title">
              <h2 id="work-title">{featured.publicTitle || featured.title}</h2>
              <span>{context}</span>
            </div>
            <ul className="hv2-tags" aria-label="What was delivered">
              {presentation.deliveryCards.map((card) => (
                <li key={card.number}>{card.title}</li>
              ))}
            </ul>
          </div>

          <ul className="hv2-strip" aria-label="Illustrative screens">
            <li className="hv2-tile hv2-tile-sand">
              <span className="sr-only">Illustrative screen: Customer app, Arabic-first</span>
              <Reveal y={24}>
                <CustomerAppScreen sample={presentation.momentSamples} />
              </Reveal>
            </li>
            <li className="hv2-tile hv2-tile-ivory hv2-tile-wide">
              <span className="sr-only">Illustrative screen: Head-office points ledger</span>
              <Reveal y={24} delay={0.1}>
                <LedgerScreen sample={presentation.momentSamples} />
              </Reveal>
            </li>
            <li className="hv2-tile hv2-tile-forest">
              <span className="sr-only">Illustrative screen: Station staff app</span>
              <Reveal y={24} delay={0.2}>
                <StaffAppScreen sample={presentation.momentSamples} />
              </Reveal>
            </li>
            <li className="hv2-tile hv2-tile-clay">
              <span className="sr-only">Illustrative screen: One API contract behind every app</span>
              <Reveal y={24} delay={0.3}>
                <ContractDiagram />
              </Reveal>
            </li>
          </ul>
          <p className="hv2-pad hv2-swipe-hint" aria-hidden="true">
            Swipe for more
          </p>

          <dl className="hv2-pad hv2-figures">
            {presentation.numbers.figures.map((figure) => (
              <div key={figure.caption}>
                <dt>{figure.caption}</dt>
                <dd>
                  <CountUp value={figure.value} />
                  {figure.suffix}
                </dd>
              </div>
            ))}
          </dl>

          <div className="hv2-pad hv2-work-foot">
            <p>{presentation.momentCaption}</p>
            <Link className="hv2-link hv2-link-copper" href={`/work/${featured.slug}`}>
              Read the case study <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      ) : (
        <section id="work" className="hv2-work hv2-work-empty" aria-labelledby="work-title">
          <div className="hv2-pad">
            <p className="hv2-eyebrow">Private by nature</p>
            <h2 id="work-title">Relevant work, shared with context.</h2>
            <p>
              Much of our work is private. We share suitable examples directly,
              with permission and the story behind each decision.
            </p>
          </div>
        </section>
      )}

      {/* 3 — From idea to production */}
      <section id="approach" className="hv2-growth" aria-labelledby="growth-title">
        <div className="hv2-branch" aria-hidden="true">
          <Image src="/media/home/branch.webp" alt="" width={860} height={400} />
        </div>
        <span className="hv2-connector" aria-hidden="true" />
        <div className="hv2-growth-grid">
          <div className="hv2-growth-intro">
            <DrawnLine className="hv2-seg hv2-seg-intro" />
            <Reveal>
              <p className="hv2-eyebrow">From idea to production</p>
              <h2 id="growth-title">Every product grows from a single idea.</h2>
              <p className="hv2-lead-dark">
                We follow the same four steps on every engagement, so an early
                idea becomes a working product—and a working product keeps
                getting better.
              </p>
            </Reveal>
          </div>
          <ol className="hv2-steps">
            {steps.map(({ number, title, body, Screen }, index) => {
              const isLast = index === steps.length - 1;
              return (
                <li className="hv2-step" data-last={isLast || undefined} key={number}>
                  {!isLast && <DrawnLine className="hv2-seg" />}
                  <span className="hv2-node" aria-hidden="true" />
                  <Reveal className="hv2-step-card" delay={0.05}>
                    <div className="hv2-step-text">
                      <span className="hv2-step-number">{number}</span>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                    <Screen />
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 4 — Founder */}
      <section id="founder" className="hv2-founder" aria-labelledby="founder-title">
        <Reveal className="hv2-founder-photo">
          <Image
            src="/media/home/founder.webp"
            alt="Mahmoud Mohamed Attia, founder of Kepler Dev"
            width={650}
            height={812}
            sizes="(max-width: 767px) 128px, 232px"
          />
        </Reveal>
        <div className="hv2-founder-id">
          <p className="hv2-eyebrow">Founder-led</p>
          <p className="hv2-founder-name">Mahmoud Mohamed Attia</p>
          <p className="hv2-founder-role">Founder &amp; Product Engineer</p>
        </div>
        <Reveal className="hv2-founder-copy" delay={0.1}>
          <h2 id="founder-title">
            One accountable partner from first conversation to launch.
          </h2>
          <blockquote>
            <p>
              “I started Kepler Dev because too much product work ships without
              anyone really understanding the operation it has to serve.”
            </p>
          </blockquote>
        </Reveal>
        <Reveal className="hv2-founder-facts" delay={0.2}>
          <dl>
            {founderFacts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <Link className="hv2-link hv2-link-light" href="/mahmoud">
            Meet the founder <ArrowUpRight aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      {/* 5 — Ways to work together */}
      <section id="services" className="hv2-services" aria-labelledby="services-title">
        <div className="hv2-services-intro">
          <p className="hv2-eyebrow">Ways to work together</p>
          <h2 id="services-title">Focused support for the next useful move.</h2>
          <Link className="hv2-link hv2-link-copper" href="/contact">
            Not sure which fits? Start a conversation{" "}
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <WaysAccordion offers={offers} />
      </section>

      {/* 6 — FAQ */}
      <section className="hv2-faq" aria-labelledby="faq-title">
        <div>
          <p className="hv2-eyebrow">Questions, answered</p>
          <h2 id="faq-title">A clear place to begin.</h2>
        </div>
        <div className="hv2-faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} name="hv2-faq" open={index === 0}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 7 — Closing call */}
      <section id="hv2-closing" className="hv2-closing" aria-labelledby="closing-title">
        <div className="hv2-closing-media" aria-hidden="true">
          <Image
            src="/media/home/hero-tree.webp"
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>
        <div className="hv2-closing-content">
          <Reveal>
            <p className="hv2-eyebrow">Ready to start?</p>
            <h2 id="closing-title">Tell us what you&apos;re building.</h2>
            <div className="hv2-closing-actions">
              <Link className="hv2-button" href="/contact">
                Start a conversation <ArrowUpRight aria-hidden="true" />
              </Link>
              <p>A short conversation can save weeks of guesswork.</p>
            </div>
            <div className="hv2-thread" aria-hidden="true">
              <span className="hv2-thread-line" />
              <span className="hv2-thread-node" />
            </div>
          </Reveal>
        </div>
      </section>

      <MobileCta heroId="hv2-hero" closingId="hv2-closing" />
    </div>
  );
}
