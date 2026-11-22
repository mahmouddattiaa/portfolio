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
  slug: "blueprint" | "launch-sprint" | "operations-platform" | "product-care";
  name: string;
  latinName: string;
  duration: string;
  pricing: string;
  bestFit: string;
  outcome: string;
  boundary: string;
  next: string;
};

export type HomeProject = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  facts: [string, string];
  imageLabels: [string, string];
  link: string;
};

export type HomeCopy = {
  lang: string;
  dir: Direction;

  hero: {
    eyebrow: string;
    /** Shown in copper before the rest of the headline. */
    brand: string;
    headline: string;
    lead: string;
    primaryCta: string;
    workLink: string;
    geo: string;
  };

  work: {
    eyebrow: string;
    title: string;
    lead: string;
    allWork: string;
    moreWork: string;
    moreWorkLead: string;
    projects: [HomeProject, HomeProject, HomeProject];
    compactProjects: Readonly<Record<string, string>>;
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

  hsVpnFeature: {
    eyebrow: string;
    title: string;
    body: string;
    proof: string;
    androidLabel: string;
    androidStatus: string;
    androidDetail: string;
    iosLabel: string;
    iosStatus: string;
    iosDetail: string;
    figureCaptionLabel: string;
    figures: Array<{
      caption: string;
      sourceNote: string;
    }>;
    platformNote: string;
    caseStudyLink: string;
  };

  growth: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: [HomeStep, HomeStep, HomeStep, HomeStep];
  };

  studio: {
    eyebrow: string;
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
    lead: string;
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
    customer: {
      greeting: string;
      balance: string;
      oneTimeCode: string;
      home: string;
      rewards: string;
      stations: string;
    };
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
