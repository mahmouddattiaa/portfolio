import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HomeCopy } from "@/content/home/types";
import { Reveal } from "./reveal";

/*
 * HS VPN homepage feature.
 *
 * Two genuine historical iOS captures from the project repository, labelled
 * with their platform and provenance. The platform status (Google Play,
 * TestFlight only) is stated explicitly so the iOS build is not implied to
 * have reached the App Store.
 */
type HsVpnFigure = HomeCopy["hsVpnFeature"]["figures"][number];

const FIGURE_SOURCES: ReadonlyArray<{ src: string; alt: string; width: number; height: number }> = [
  {
    src: "/projects/HS-VPN/connected-ios.jpg",
    alt: "Earlier iOS HS VPN screen showing the connected dashboard and primary connection control.",
    width: 1284,
    height: 2778,
  },
  {
    src: "/projects/HS-VPN/statistics-ios.jpg",
    alt: "Earlier iOS HS VPN statistics screen showing session duration and traffic panels.",
    width: 1284,
    height: 2778,
  },
];

export function HsVpnFeature({ copy }: { copy: HomeCopy["hsVpnFeature"] }) {
  return (
    <section
      id="hs-vpn"
      className="hv2-hs-vpn"
      aria-labelledby="hs-vpn-title"
    >
      <div className="hv2-pad hv2-hs-vpn-band">
        <div className="hv2-hs-vpn-head">
          <div className="hv2-hs-vpn-intro">
            <p className="hv2-eyebrow">{copy.eyebrow}</p>
            <h2 id="hs-vpn-title">{copy.title}</h2>
            <p className="hv2-hs-vpn-body">{copy.body}</p>
          </div>

          <dl className="hv2-hs-vpn-status" aria-label="Platform status">
            <div className="hv2-hs-vpn-status-row" data-platform="android">
              <dt>{copy.androidLabel}</dt>
              <dd>
                <span className="hv2-hs-vpn-pill" data-state="released">
                  {copy.androidStatus}
                </span>
                <p>{copy.androidDetail}</p>
              </dd>
            </div>
            <div className="hv2-hs-vpn-status-row" data-platform="ios">
              <dt>{copy.iosLabel}</dt>
              <dd>
                <span className="hv2-hs-vpn-pill" data-state="beta">
                  {copy.iosStatus}
                </span>
                <p>{copy.iosDetail}</p>
              </dd>
            </div>
          </dl>
        </div>

        <Reveal y={24}>
          <ul className="hv2-hs-vpn-strip" aria-label="HS VPN app screens">
            {copy.figures.map((figure, index) => {
              const source = FIGURE_SOURCES[index];
              if (!source) return null;
              return <HsVpnFigureTile key={source.src} figure={figure} source={source} captionLabel={copy.figureCaptionLabel} />;
            })}
          </ul>
        </Reveal>
      </div>

      <p className="hv2-pad hv2-hs-vpn-platform-note" aria-live="polite">
        {copy.platformNote}
      </p>

      <div className="hv2-pad hv2-hs-vpn-foot">
        <Link className="hv2-link hv2-link-copper" href="/work/hs-vpn">
          {copy.caseStudyLink} <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function HsVpnFigureTile({
  figure,
  source,
  captionLabel,
}: {
  figure: HsVpnFigure;
  source: { src: string; alt: string; width: number; height: number };
  captionLabel: string;
}) {
  return (
    <li className="hv2-hs-vpn-tile">
      <figure>
        <Image
          src={source.src}
          alt={source.alt}
          width={source.width}
          height={source.height}
          sizes="(max-width: 767px) 42vw, (max-width: 1023px) 30vw, 220px"
        />
        <figcaption>
          <span className="hv2-hs-vpn-figcaption-label">{captionLabel}</span>
          <span className="hv2-hs-vpn-figcaption-title">{figure.caption}</span>
          <span className="hv2-hs-vpn-figcaption-note">{figure.sourceNote}</span>
        </figcaption>
      </figure>
    </li>
  );
}
