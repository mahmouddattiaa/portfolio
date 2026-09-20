/**
 * Every word on the work page, by section. A language version is one object
 * of this shape (see en.ts). Mirrors the pattern in src/content/home.
 */

export type Direction = "ltr" | "rtl";

export type WorkClassificationCopy = {
  /** Label rendered in the chip and on the "how to read" band. */
  label: string;
  /** Short descriptor used in the band paragraph; reads as a noun phrase. */
  descriptor: string;
};

export type WorkCopy = {
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
    servicesLink: string;
  };

  /** The four engagement names shown above the divider in the hero. */
  engagements: readonly [string, string, string, string];

  howToRead: {
    eyebrow: string;
    title: string;
    line: string;
    rows: ReadonlyArray<{
      label: string;
      body: string;
    }>;
  };

  studies: {
    /** "All work" filter label. */
    heading: string;
    filterLabel: string;
    gridLabel: string;
    allLabel: string;
    /** The first segment of the result count line. */
    countPrefix: string;
    /** Middle separator used by the result count line. */
    countSeparator: string;
    countSuffixSingular: string;
    countSuffixPlural: string;
    /** Tail phrases after the count. */
    moreInPreparation: string;
    privateOnRequest: string;
    classificationGroup: {
      label: string;
      body: string;
    };
    statusGroup: {
      label: string;
      body: string;
    };
    evidenceGroup: {
      label: string;
      body: string;
    };
    /** Field labels on the lead card right column. */
    lead: {
      ourRole: string;
      context: string;
      evidence: string;
      surfaces: string;
      /** Phrase used when the client name has been withheld. */
      contextAnonymized: string;
      verifiedPublic: string;
      verifiedPrivate: string;
      lastCheckedPrefix: string;
    };
    /** Field labels on the smaller cards. */
    card: {
      ourRole: string;
      read: string;
    };
    /** Empty state when a filter matches no studies. */
    empty: {
      title: string;
      body: string;
    };
  };

  closing: {
    eyebrow: string;
    title: string;
    button: string;
    note: string;
  };

  /** Labels rendered by the chips and tags that come from data, not copy. */
  meta: {
    /** Word shown before the technologies list. */
    builtWith: string;
  };
};

export type WorkLocale = "en";
