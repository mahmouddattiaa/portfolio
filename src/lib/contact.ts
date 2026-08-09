export type Enquiry = {
  name: string;
  email: string;
  company: string;
  country: string;
  problem: string;
  outcome: string;
  offer: string;
  timing: string;
  budget: string;
  link: string;
  consent: boolean;
  website?: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export function validateEnquiry(values: Partial<Enquiry>): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
  if (!text(values.name)) errors.name = "Enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(text(values.email))) errors.email = "Enter a valid work email.";
  if (!text(values.problem)) errors.problem = "Tell us about the workflow or problem.";
  if (!text(values.outcome)) errors.outcome = "Tell us what a useful outcome would be.";
  if (!values.consent) errors.consent = "Consent is required before submitting.";
  if (text(values.link) && !/^https?:\/\//i.test(text(values.link))) errors.link = "Enter a full URL beginning with http:// or https://.";
  return errors;
}
