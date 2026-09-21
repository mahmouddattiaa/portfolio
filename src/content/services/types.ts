/**
 * Every word on the services page, by section. A language version is one
 * object of this shape (see en.ts). Mirrors the pattern in src/content/work.
 *
 * The engagement and build names themselves are not here: they come from
 * `offers` and `builds` in src/lib/content.ts, so the page, the homepage
 * accordion and the work page hero cannot drift apart.
 */

export type Direction = "ltr" | "rtl";

export type ServicesCopy = {
  lang: string;
  dir: Direction;

  hero: {
    eyebrow: string;
    headline: string;
    /** Default lead copy (desktop and tablet). */
    lead: string;
    /** Shorter lead used on phones. */
    leadPhone: string;
    /** Pushed to the right of the engagement row on desktop. */
    workLink: string;
  };

  builds: {
    eyebrow: string;
    title: string;
    line: string;
  };

  engagements: {
    eyebrow: string;
    title: string;
    line: string;
    /** Field labels on each engagement card. */
    labels: {
      bestFit: string;
      outcome: string;
      boundary: string;
      /** Prefix on the closing line of a card, e.g. "Then →". */
      next: string;
    };
  };

  path: {
    eyebrow: string;
    title: string;
    line: string;
    /** One short line per engagement, in the same order as `offers`. */
    steps: readonly string[];
  };

  team: {
    eyebrow: string;
    title: string;
    body: string;
  };

  pricing: {
    eyebrow: string;
    title: string;
    body: string;
    rows: ReadonlyArray<{
      label: string;
      body: string;
    }>;
  };

  closing: {
    title: string;
    note: string;
    button: string;
  };
};

export type ServicesLocale = "en";
