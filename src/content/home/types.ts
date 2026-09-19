/**
 * Every word on the homepage, by section. A language version is one object of
 * this shape (see en.ts). The shape is the contract: an Arabic version keeps
 * the same keys and writes its own copy for each one; it is not a
 * word-for-word translation of the English.
 */

export type Direction = "ltr" | "rtl";

export type HomeStep = {
  number: string;
  title: string;
  body: string;
};

export type HomeFact = {
  label: string;
  value: string;
};

export type HomeOffer = {
  name: string;
  bestFit: string;
  outcome: string;
};

export type HomeCopy = {
  lang: string;
  dir: Direction;

  hero: {
    /** Shown in copper before the rest of the headline. */
    brand: string;
    headline: string;
    workLink: string;
  };

  work: {
    eyebrow: string;
    allWork: string;
    deliveredLabel: string;
    screensLabel: string;
    screenPrefix: string;
    screens: {
      customer: string;
      ledger: string;
      staff: string;
      contract: string;
    };
    swipeHint: string;
    caseStudyLink: string;
    /** Used only when no case study has cleared the publication gate. */
    empty: {
      eyebrow: string;
      title: string;
      body: string;
    };
  };

  growth: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: [HomeStep, HomeStep, HomeStep, HomeStep];
  };

  founder: {
    eyebrow: string;
    name: string;
    role: string;
    photoAlt: string;
    title: string;
    quote: string;
    facts: HomeFact[];
    link: string;
  };

  services: {
    eyebrow: string;
    title: string;
    notSure: string;
    whatYouGet: string;
    discuss: string;
    offers: readonly HomeOffer[];
  };

  faq: {
    eyebrow: string;
    title: string;
    items: ReadonlyArray<readonly [question: string, answer: string]>;
  };

  closing: {
    eyebrow: string;
    title: string;
    button: string;
    note: string;
  };

  mobileCta: string;

  /** Labels inside the illustrative product screens. */
  screens: {
    staff: {
      scanned: string;
      purchase: string;
      points: string;
      station: string;
      stationValue: string;
      code: string;
      codeValue: string;
      confirm: string;
      retryNote: string;
    };
    ledger: {
      office: string;
      nav: [string, string, string, string, string];
      activeNavIndex: number;
      title: string;
      appendOnly: string;
      entry: string;
      points: string;
    };
    contract: {
      clients: [string, string, string];
      core: string;
      coreDetail: string;
      services: [string, string, string];
    };
    contextBrief: {
      title: string;
      chip: string;
      done: [string, string];
      pending: string;
    };
    blueprint: {
      title: string;
      chip: string;
      rows: Array<{ label: string; priority: "must" | "next"; priorityLabel: string }>;
    };
    release: {
      title: string;
      chip: string;
      journey: [string, string, string, string];
      surfaces: [string, string, string];
    };
    notes: {
      title: string;
      chip: string;
      rows: Array<{ version: string; label: string; shipped: boolean }>;
      shipped: string;
      inProgress: string;
    };
  };
};
