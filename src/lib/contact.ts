export const offerOptions = [
  {
    value: "blueprint",
    label: "Kepler Product Blueprint (3–5 days · From $300): Architecture & fixed-scope spec",
  },
  {
    value: "launch-sprint",
    label: "Kepler Launch Sprint (2–5 weeks · From $1,800): Focused v1 web or mobile app",
  },
  {
    value: "operations-platform",
    label: "Kepler Operations Platform (5–10 weeks · From $4,000): Multi-surface system",
  },
  {
    value: "product-care",
    label: "Kepler Product Care (From $250/mo): Ongoing monthly engineering retainer",
  },
  { value: "not-sure", label: "Not sure yet: help us choose the right tier" },
] as const;

export const timingOptions = [
  { value: "immediate", label: "Immediate (starting within 2 weeks)" },
  { value: "this-quarter", label: "This quarter (1–3 months)" },
  { value: "planning-ahead", label: "Planning ahead (3+ months)" },
] as const;

export type OfferValue = (typeof offerOptions)[number]["value"];
export type TimingValue = (typeof timingOptions)[number]["value"];

export type Enquiry = {
  name: string;
  company: string;
  email: string;
  offer: OfferValue | "";
  timing: TimingValue | "";
  problem: string;
  website?: string;
};

export type EnquiryField = "name" | "company" | "email" | "offer" | "timing" | "problem";
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

const offerValues = new Set<string>(offerOptions.map((option) => option.value));
const canonicalOfferValues = new Set<string>(offerOptions.slice(0, 4).map((option) => option.value));
const timingValues = new Set<string>(timingOptions.map((option) => option.value));
const emailPattern = /^(?!\.)(?!.*\.\.)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

const requiredMessages = {
  name: "Please enter your name so we know who to address.",
  company: "Please enter your company or project name.",
  email: "Please enter a valid email address so we can reply.",
  offer: "Select the engagement tier closest to your current stage.",
  problem: "Add a short description of your workflow or goals (at least 20 characters).",
} as const;

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export function normalizeOfferParam(value: string | string[] | undefined): OfferValue | "" {
  if (typeof value !== "string" || !canonicalOfferValues.has(value)) return "";
  return value as OfferValue;
}

export function validateEnquiry(values: Partial<Enquiry>): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = text(values.name);
  const company = text(values.company);
  const email = text(values.email);
  const offer = text(values.offer);
  const timing = text(values.timing);
  const problem = text(values.problem);

  if (!name) errors.name = requiredMessages.name;
  if (!company) errors.company = requiredMessages.company;
  if (!emailPattern.test(email)) errors.email = requiredMessages.email;
  if (!offerValues.has(offer)) errors.offer = requiredMessages.offer;
  if (values.timing !== undefined && (typeof values.timing !== "string" || (timing && !timingValues.has(timing)))) {
    errors.timing = "Select a supported target launch or discovery window.";
  }
  if (problem.length < 20) errors.problem = requiredMessages.problem;

  return errors;
}

export function toProviderPayload(values: Enquiry) {
  return {
    name: text(values.name),
    company: text(values.company),
    email: text(values.email),
    offer: values.offer,
    timing: values.timing,
    problem: text(values.problem),
  };
}
