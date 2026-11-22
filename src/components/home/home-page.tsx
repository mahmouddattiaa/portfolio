import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MobileCta } from "@/components/home/mobile-cta";
import {
  BlueprintScreen,
  ContextBriefScreen,
  CustomerAppScreen,
  ReleaseNotesScreen,
  ReleaseScreen,
  LedgerScreen,
} from "@/components/home/illustrative-screens";
import { getPresentation } from "@/components/case-study/presentation";
import { Reveal } from "@/components/home/reveal";
import type { HomeCopy } from "@/content/home";
import { caseStudies, showcaseBuilds } from "@/lib/content";

const mixedTokens = /([A-Za-z0-9][A-Za-z0-9+#.,:/+\-–%]*(?:[\u00a0 ][A-Za-z0-9][A-Za-z0-9+#.,:/+\-–%]*)*)/g;

function MixedText({ children }: { children: string }) {
  const parts = children.split(mixedTokens).filter(Boolean);
  return parts.map((part, index) =>
    /[A-Za-z0-9]/.test(part) ? (
      <bdi key={`${part}-${index}`} dir="ltr">
        {part}
      </bdi>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

function Arrow({ external = false }: { external?: boolean }) {
  return external ? (
    <ArrowUpRight className="hv2-home-directional" aria-hidden="true" />
  ) : (
    <ArrowRight className="hv2-home-directional" aria-hidden="true" />
  );
}

export function HomePage({ copy }: { copy: HomeCopy }) {
  const presentations = copy.work.projects.map((project) => {
    const record = caseStudies.find((item) => item.slug === project.slug);
    const mediaImages = record?.media.filter((item) => item.kind === "image") ?? [];
    const images = project.slug === "quickcharging-pos"
      ? mediaImages.filter((item) => item.src.includes("home_station_ready") || item.src.includes("payment_success"))
      : mediaImages.slice(0, 2);
    return { project, images };
  });
  const allProjects = [...caseStudies, ...showcaseBuilds];
  const remainingProjects = allProjects.filter(
    (project) => !copy.work.projects.some((featured) => featured.slug === project.slug),
  );
  const screenCopy = copy.screens;
  const glitrePresentation = getPresentation("glitre-loyalty-platform");
  const growthScreens = [
    <ContextBriefScreen key="brief" copy={screenCopy.contextBrief} />,
    <BlueprintScreen key="blueprint" copy={screenCopy.blueprint} />,
    <ReleaseScreen key="release" copy={screenCopy.release} />,
    <ReleaseNotesScreen key="notes" copy={screenCopy.notes} />,
  ];
  const homepageFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.items.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const faqJson = JSON.stringify(homepageFaqSchema)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  return (
    <div className="hv2 hv2-home" lang={copy.lang} dir={copy.dir}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJson }}
      />

      <section id="hv2-hero" className="hv2-home-hero" aria-labelledby="hv2-home-title">
        <Image
          className="hv2-home-hero-image"
          src="/media/home/hero-tree.webp"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="hv2-home-hero-shade" aria-hidden="true" />
        <div className="hv2-home-hero-copy">
          <p className="hv2-eyebrow">{copy.hero.eyebrow}</p>
          <h1 id="hv2-home-title">
            <span className="hv2-home-brand">{copy.hero.brand}</span>{" "}
            {copy.hero.headline.split(/(Multi-Surface)/g).map((part, index) =>
              part === "Multi-Surface" ? (
                <span className="hv2-home-no-break" key={index}>{part}</span>
              ) : part
            )}
          </h1>
          <p className="hv2-home-hero-lead">{copy.hero.lead}</p>
          <div className="hv2-home-hero-actions">
            <Link className="hv2-button" href="/contact">
              {copy.hero.primaryCta} <Arrow external />
            </Link>
            <Link className="hv2-link hv2-link-light" href="/work">
              {copy.hero.workLink} <Arrow />
            </Link>
          </div>
          <p className="hv2-home-geo">{copy.hero.geo}</p>
        </div>
      </section>

      <section id="work" className="hv2-home-work" aria-labelledby="hv2-home-work-title">
        <div className="hv2-home-section-top">
          <div>
            <p className="hv2-eyebrow">{copy.work.eyebrow}</p>
            <h2 id="hv2-home-work-title">{copy.work.title}</h2>
            <p className="hv2-home-section-lead">{copy.work.lead}</p>
          </div>
          <Link className="hv2-link hv2-link-copper" href="/work">
            {copy.work.allWork} <Arrow external />
          </Link>
        </div>

        {presentations.map(({ project, images }) => (
          <article className="hv2-home-project" key={project.slug}>
            <div className="hv2-home-project-copy">
              <p className="hv2-home-project-tag"><MixedText>{project.tag}</MixedText></p>
              <h3>{project.title}</h3>
              <p className="hv2-home-project-summary"><MixedText>{project.summary}</MixedText></p>
              <ul className="hv2-home-project-facts" aria-label={copy.work.deliveredLabel}>
                {project.facts.map((fact) => <li key={fact}><MixedText>{fact}</MixedText></li>)}
              </ul>
              <Link className="hv2-link hv2-link-copper" href={`/work/${project.slug}`}>
                {project.link} <Arrow external />
              </Link>
            </div>
            <div className="hv2-home-project-media" aria-label={copy.work.screensLabel}>
              {project.slug === "glitre-loyalty-platform" && glitrePresentation ? (
                <>
                  <figure className="hv2-home-project-figure">
                    <div className="hv2-home-project-frame hv2-home-illustrative-frame">
                      <CustomerAppScreen sample={glitrePresentation.momentSamples} copy={screenCopy.customer} />
                    </div>
                    <figcaption>{project.imageLabels[1]}</figcaption>
                  </figure>
                  <figure className="hv2-home-project-figure">
                    <div className="hv2-home-project-frame hv2-home-illustrative-frame">
                      <LedgerScreen sample={glitrePresentation.momentSamples} copy={screenCopy.ledger} />
                    </div>
                    <figcaption>{project.imageLabels[0]}</figcaption>
                  </figure>
                </>
              ) : images.map((image, imageIndex) => (
                <figure className="hv2-home-project-figure" key={image.src}>
                  <div className="hv2-home-project-frame">
                    <Image
                      src={image.src}
                      alt={project.imageLabels[imageIndex] ?? project.title}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 767px) 82vw, 23vw"
                    />
                  </div>
                  <figcaption>{project.imageLabels[imageIndex]}</figcaption>
                </figure>
              ))}
              {images.length === 0 && project.slug !== "glitre-loyalty-platform" ? (
                <div className="hv2-home-project-fallback" aria-hidden="true">
                  <span>{project.title}</span>
                  <strong><bdi dir="ltr">{project.slug}</bdi></strong>
                </div>
              ) : null}
            </div>
          </article>
        ))}

        <div className="hv2-home-more-work">
          <div>
            <p className="hv2-eyebrow">{copy.work.moreWork}</p>
            <p>{copy.work.moreWorkLead} {remainingProjects.map((project) => copy.work.compactProjects[project.slug] ?? project.title).join(" · ")}</p>
          </div>
          <Link className="hv2-button" href="/work">
            {copy.work.allWork} <Arrow external />
          </Link>
        </div>
      </section>

      <section id="approach" className="hv2-home-growth" aria-labelledby="hv2-home-growth-title">
        <div className="hv2-home-growth-head">
          <p className="hv2-eyebrow">{copy.growth.eyebrow}</p>
          <h2 id="hv2-home-growth-title">{copy.growth.title}</h2>
          <p>{copy.growth.lead}</p>
        </div>
        <div className="hv2-home-growth-steps">
          {copy.growth.steps.map((step, index) => (
            <article className="hv2-home-growth-step" key={step.number}>
              <span className="hv2-home-step-number"><bdi dir="ltr">{step.number}</bdi></span>
              <div>
                <h3>{step.title}</h3>
                <p><MixedText>{step.body}</MixedText></p>
              </div>
              <Reveal className="hv2-home-step-screen">{growthScreens[index]}</Reveal>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="hv2-home-services" aria-labelledby="hv2-home-services-title">
        <div className="hv2-home-section-top">
          <div>
            <p className="hv2-eyebrow">{copy.services.eyebrow}</p>
            <h2 id="hv2-home-services-title">{copy.services.title}</h2>
            <p className="hv2-home-section-lead">{copy.services.lead}</p>
          </div>
          <Link className="hv2-link hv2-link-copper" href="/services">
            {copy.services.notSure} <Arrow external />
          </Link>
        </div>
        <div className="hv2-home-offer-grid">
          {copy.services.offers.map((offer, index) => (
            <article className="hv2-home-offer" key={offer.slug}>
              <div className="hv2-home-offer-title">
                <span className="hv2-home-step-number"><bdi dir="ltr">{String(index + 1).padStart(2, "0")}</bdi></span>
                <h3>{offer.name}</h3>
              </div>
              <p className="hv2-home-offer-meta"><bdi dir="ltr">{offer.latinName}</bdi><span> · </span><bdi dir="ltr">{offer.duration}</bdi><span> · </span><bdi dir="ltr">{offer.pricing}</bdi></p>
              <p className="hv2-home-offer-fit">{offer.bestFit}</p>
              <p className="hv2-home-offer-outcome"><span>{copy.services.whatYouGet}</span> {offer.outcome}</p>
              <Link className="hv2-link hv2-link-copper" href={`/contact?offer=${offer.slug}`}>
                {copy.services.discuss} <Arrow external />
              </Link>
            </article>
          ))}
        </div>
        <Link className="hv2-home-services-link" href="/services">
          {copy.lang === "ar" ? "قارن المخرجات والحدود التفصيلية في صفحة الخدمات" : "Compare deliverables and boundaries on Services"}
          <Arrow external />
        </Link>
      </section>

      <section id="faq" className="hv2-home-faq" aria-labelledby="hv2-home-faq-title">
        <div className="hv2-home-faq-heading">
          <p className="hv2-eyebrow">{copy.faq.eyebrow}</p>
          <h2 id="hv2-home-faq-title">{copy.faq.title}</h2>
        </div>
        <div className="hv2-home-faq-list">
          {copy.faq.items.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p><MixedText>{answer}</MixedText></p>
            </details>
          ))}
        </div>
      </section>

      <section id="hv2-closing" className="hv2-home-closing" aria-labelledby="hv2-home-closing-title">
        <Image className="hv2-home-closing-image" src="/media/home/hero-tree.webp" alt="" fill sizes="100vw" />
        <div className="hv2-home-closing-shade" aria-hidden="true" />
        <div>
          <p className="hv2-eyebrow">{copy.closing.eyebrow}</p>
          <h2 id="hv2-home-closing-title">{copy.closing.title}</h2>
          <p>{copy.closing.note.split("mahmouddattiaa7@gmail.com")[0]}<bdi dir="ltr">{copy.closing.note.includes("mahmouddattiaa7@gmail.com") ? "mahmouddattiaa7@gmail.com" : ""}</bdi>{copy.closing.note.includes("mahmouddattiaa7@gmail.com") ? "." : ""}</p>
        </div>
        <Link className="hv2-button" href="/contact">{copy.closing.button} <Arrow external /></Link>
      </section>

      <MobileCta heroId="hv2-hero" closingId="hv2-closing" footerId="site-footer" label={copy.mobileCta} />
    </div>
  );
}
