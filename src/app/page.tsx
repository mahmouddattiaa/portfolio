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
import { getHomeCopy } from "@/content/home";
import { publicCaseStudies } from "@/lib/content";

/*
 * Homepage. Layout and behaviour live here; every word comes from
 * src/content/home (see its README for adding the Arabic version), and
 * case-study facts come from the case study presentation module.
 */
export default function HomePage() {
  const copy = getHomeCopy("en");
  const { screens } = copy;
  const featured = publicCaseStudies[0];
  const presentation = featured ? getPresentation(featured.slug) : null;
  const context = presentation?.heroEyebrow.split(" · ").slice(1).join(" · ");

  const stepScreens = [
    <ContextBriefScreen key="brief" copy={screens.contextBrief} />,
    <BlueprintScreen key="blueprint" copy={screens.blueprint} />,
    <ReleaseScreen key="release" copy={screens.release} />,
    <ReleaseNotesScreen key="notes" copy={screens.notes} />,
  ];

  return (
    <div className="hv2" lang={copy.lang} dir={copy.dir}>
      {/* 1 — Hero */}
      <section id="hv2-hero" className="hv2-hero" aria-labelledby="hero-title">
        <div className="hv2-hero-media" aria-hidden="true">
          <Image
            className="hv2-hero-photo"
            src="/media/home/hero-tree.webp"
            alt=""
            fill
            priority
            quality={90}
            /* The photo is scaled to 1.045 by the push-in, so ask for a
               source wider than the viewport or it is drawn upscaled. */
            sizes="110vw"
          />
          <span className="hv2-hero-sun" />
        </div>
        <div className="hv2-hero-content">
          <h1 id="hero-title" className="hv2-rise">
            <span className="hv2-brand">{copy.hero.brand}</span>{" "}
            {copy.hero.headline}
          </h1>
          <Link
            className="hv2-link hv2-link-light hv2-rise hv2-rise-late"
            href={featured ? "#work" : "/work"}
          >
            {copy.hero.workLink} <ArrowDown aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 2 — Selected work */}
      {featured && presentation ? (
        <section id="work" className="hv2-work" aria-labelledby="work-title">
          <div className="hv2-pad hv2-work-top">
            <p className="hv2-eyebrow">{copy.work.eyebrow}</p>
            <Link className="hv2-link" href="/work">
              {copy.work.allWork} <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="hv2-pad hv2-work-head">
            <div className="hv2-work-title">
              <h2 id="work-title">{featured.publicTitle || featured.title}</h2>
              <span>{context}</span>
            </div>
            <ul className="hv2-tags" aria-label={copy.work.deliveredLabel}>
              {presentation.deliveryCards.map((card) => (
                <li key={card.number}>{card.title}</li>
              ))}
            </ul>
          </div>

          <ul className="hv2-strip" aria-label={copy.work.screensLabel}>
            <li className="hv2-tile hv2-tile-sand">
              <span className="sr-only">
                {copy.work.screenPrefix} {copy.work.screens.customer}
              </span>
              <Reveal y={24}>
                <CustomerAppScreen sample={presentation.momentSamples} />
              </Reveal>
            </li>
            <li className="hv2-tile hv2-tile-ivory hv2-tile-wide">
              <span className="sr-only">
                {copy.work.screenPrefix} {copy.work.screens.ledger}
              </span>
              <Reveal y={24} delay={0.1}>
                <LedgerScreen sample={presentation.momentSamples} copy={screens.ledger} />
              </Reveal>
            </li>
            <li className="hv2-tile hv2-tile-forest">
              <span className="sr-only">
                {copy.work.screenPrefix} {copy.work.screens.staff}
              </span>
              <Reveal y={24} delay={0.2}>
                <StaffAppScreen sample={presentation.momentSamples} copy={screens.staff} />
              </Reveal>
            </li>
            <li className="hv2-tile hv2-tile-clay">
              <span className="sr-only">
                {copy.work.screenPrefix} {copy.work.screens.contract}
              </span>
              <Reveal y={24} delay={0.3}>
                <ContractDiagram copy={screens.contract} />
              </Reveal>
            </li>
          </ul>
          <p className="hv2-pad hv2-swipe-hint" aria-hidden="true">
            {copy.work.swipeHint}
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
              {copy.work.caseStudyLink} <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      ) : (
        <section id="work" className="hv2-work hv2-work-empty" aria-labelledby="work-title">
          <div className="hv2-pad">
            <p className="hv2-eyebrow">{copy.work.empty.eyebrow}</p>
            <h2 id="work-title">{copy.work.empty.title}</h2>
            <p>{copy.work.empty.body}</p>
          </div>
        </section>
      )}

      {/* 3 — From idea to production */}
      <section id="approach" className="hv2-growth" aria-labelledby="growth-title">
        <div className="hv2-branch" aria-hidden="true">
          <Image
            src="/media/home/branch.webp"
            alt=""
            width={1891}
            height={831}
            quality={90}
            sizes="(min-width: 1200px) 860px, 560px"
          />
        </div>
        <span className="hv2-connector" aria-hidden="true" />
        <div className="hv2-growth-grid">
          <div className="hv2-growth-intro">
            <DrawnLine className="hv2-seg hv2-seg-intro" />
            <Reveal>
              <p className="hv2-eyebrow">{copy.growth.eyebrow}</p>
              <h2 id="growth-title">{copy.growth.title}</h2>
              <p className="hv2-lead-dark">{copy.growth.lead}</p>
            </Reveal>
          </div>
          <ol className="hv2-steps">
            {copy.growth.steps.map((step, index) => {
              const isLast = index === copy.growth.steps.length - 1;
              return (
                <li className="hv2-step" data-last={isLast || undefined} key={step.number}>
                  {!isLast && <DrawnLine className="hv2-seg" />}
                  <span className="hv2-node" aria-hidden="true" />
                  <Reveal className="hv2-step-card" delay={0.05}>
                    <div className="hv2-step-text">
                      <span className="hv2-step-number">{step.number}</span>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                    {stepScreens[index]}
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
            alt={copy.founder.photoAlt}
            width={800}
            height={1000}
            quality={90}
            sizes="(max-width: 767px) 128px, 232px"
          />
        </Reveal>
        <div className="hv2-founder-id">
          <p className="hv2-eyebrow">{copy.founder.eyebrow}</p>
          <p className="hv2-founder-name">{copy.founder.name}</p>
          <p className="hv2-founder-role">{copy.founder.role}</p>
        </div>
        <Reveal className="hv2-founder-copy" delay={0.1}>
          <h2 id="founder-title">{copy.founder.title}</h2>
          <blockquote>
            <p>{copy.founder.quote}</p>
          </blockquote>
        </Reveal>
        <Reveal className="hv2-founder-facts" delay={0.2}>
          <dl>
            {copy.founder.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <Link className="hv2-link hv2-link-light" href="/mahmoud">
            {copy.founder.link} <ArrowUpRight aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      {/* 5 — Ways to work together */}
      <section id="services" className="hv2-services" aria-labelledby="services-title">
        <div className="hv2-services-intro">
          <p className="hv2-eyebrow">{copy.services.eyebrow}</p>
          <h2 id="services-title">{copy.services.title}</h2>
          <Link className="hv2-link hv2-link-copper" href="/contact">
            {copy.services.notSure} <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <WaysAccordion
          offers={copy.services.offers}
          whatYouGet={copy.services.whatYouGet}
          discuss={copy.services.discuss}
        />
      </section>

      {/* 6 — FAQ */}
      <section className="hv2-faq" aria-labelledby="faq-title">
        <div>
          <p className="hv2-eyebrow">{copy.faq.eyebrow}</p>
          <h2 id="faq-title">{copy.faq.title}</h2>
        </div>
        <div className="hv2-faq-list">
          {copy.faq.items.map(([question, answer], index) => (
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
            quality={90}
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>
        <div className="hv2-closing-content">
          <Reveal>
            <p className="hv2-eyebrow">{copy.closing.eyebrow}</p>
            <h2 id="closing-title">{copy.closing.title}</h2>
            <div className="hv2-closing-actions">
              <Link className="hv2-button" href="/contact">
                {copy.closing.button} <ArrowUpRight aria-hidden="true" />
              </Link>
              <p>{copy.closing.note}</p>
            </div>
            <div className="hv2-thread" aria-hidden="true">
              <span className="hv2-thread-line" />
              <span className="hv2-thread-node" />
            </div>
          </Reveal>
        </div>
      </section>

      <MobileCta
        heroId="hv2-hero"
        closingId="hv2-closing"
        footerId="site-footer"
        label={copy.mobileCta}
      />
    </div>
  );
}
