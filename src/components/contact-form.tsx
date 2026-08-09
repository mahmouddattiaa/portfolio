"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { type Enquiry, type EnquiryErrors, validateEnquiry } from "@/lib/contact";

const initial: Enquiry = { name: "", email: "", company: "", country: "", problem: "", outcome: "", offer: "", timing: "", budget: "", link: "", consent: false, website: "" };
type Status = "idle" | "submitting" | "failure" | "success";

export function ContactForm({ defaultOffer = "", fallbackEmail }: { defaultOffer?: string; fallbackEmail?: string }) {
  const [values, setValues] = useState<Enquiry>({ ...initial, offer: defaultOffer });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const fields = useRef<Partial<Record<keyof Enquiry, HTMLElement | null>>>({});

  useEffect(() => { if (Object.keys(errors).length || status === "failure") summaryRef.current?.focus(); }, [errors, status]);
  useEffect(() => { if (status === "success") successRef.current?.focus(); }, [status]);
  const update = (field: keyof Enquiry, value: string | boolean) => { setValues((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })); };
  const focusField = (field: keyof Enquiry) => fields.current[field]?.focus();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    setFailure("");
    if (Object.keys(nextErrors).length) return;
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const body = await response.json();
      if (!response.ok) {
        if (body.errors) setErrors(body.errors as EnquiryErrors);
        setFailure(body.error || "We could not send your enquiry. Your details are still here—please try again.");
        setStatus("failure");
        return;
      }
      setStatus("success");
    } catch {
      setFailure("We could not reach the enquiry service. Your details are still here—please try again.");
      setStatus("failure");
    }
  }

  if (status === "success") return <section className="form-success" aria-live="polite"><h2 ref={successRef} tabIndex={-1}>Your project review request has been sent.</h2><p>Thank you for sharing the context. We&apos;ll review the details you provided.</p></section>;
  const input = (name: keyof Enquiry, label: string, type = "text", required = false) => <div className="field"><label htmlFor={name}>{label}{required && <span aria-hidden="true"> *</span>}</label><input ref={(node) => { fields.current[name] = node; }} id={name} name={name} type={type} value={String(values[name])} onChange={(event) => update(name, event.target.value)} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} />{errors[name] && <p id={`${name}-error`} className="field-error">{errors[name]}</p>}</div>;
  const errorKeys = Object.keys(errors) as Array<keyof Enquiry>;
  return <form noValidate onSubmit={onSubmit}>{(errorKeys.length > 0 || status === "failure") && <div ref={summaryRef} className="error-summary" role="alert" tabIndex={-1}><strong>{status === "failure" ? "Your enquiry has not been sent." : "Please review the form."}</strong><p>{failure || "Some required information is missing or needs attention."}</p>{errorKeys.length > 0 && <ul>{errorKeys.map((field) => <li key={field}><button type="button" onClick={() => focusField(field)}>{errors[field]}</button></li>)}</ul>}</div>}<div className="form-grid">{input("name", "Your name", "text", true)}{input("email", "Work email", "email", true)}{input("company", "Company")}{input("country", "Country")}</div><div className="field"><label htmlFor="problem">What workflow or problem needs attention? <span aria-hidden="true">*</span></label><textarea ref={(node) => { fields.current.problem = node; }} id="problem" value={values.problem} onChange={(event) => update("problem", event.target.value)} aria-invalid={Boolean(errors.problem)} aria-describedby={errors.problem ? "problem-error" : undefined} />{errors.problem && <p id="problem-error" className="field-error">{errors.problem}</p>}</div><div className="field"><label htmlFor="outcome">What would a useful outcome look like? <span aria-hidden="true">*</span></label><textarea ref={(node) => { fields.current.outcome = node; }} id="outcome" value={values.outcome} onChange={(event) => update("outcome", event.target.value)} aria-invalid={Boolean(errors.outcome)} aria-describedby={errors.outcome ? "outcome-error" : undefined} />{errors.outcome && <p id="outcome-error" className="field-error">{errors.outcome}</p>}</div><div className="form-grid"><div className="field"><label htmlFor="offer">Most relevant starting point</label><select ref={(node) => { fields.current.offer = node; }} id="offer" value={values.offer} onChange={(event) => update("offer", event.target.value)}><option value="">Not sure yet</option><option>Product Blueprint</option><option>Launch Sprint</option><option>Operations Platform</option><option>Product Care</option><option>Existing product review</option></select></div><div className="field"><label htmlFor="timing">Target timing</label><select ref={(node) => { fields.current.timing = node; }} id="timing" value={values.timing} onChange={(event) => update("timing", event.target.value)}><option value="">Select timing</option><option>Exploring</option><option>Planning this quarter</option><option>Specific deadline</option><option>Already in progress</option></select></div><div className="field"><label htmlFor="budget">Working budget (optional)</label><input ref={(node) => { fields.current.budget = node; }} id="budget" value={values.budget} onChange={(event) => update("budget", event.target.value)} /></div><div className="field"><label htmlFor="link">Relevant link (optional)</label><input ref={(node) => { fields.current.link = node; }} id="link" type="url" value={values.link} onChange={(event) => update("link", event.target.value)} aria-invalid={Boolean(errors.link)} aria-describedby={errors.link ? "link-error" : undefined} />{errors.link && <p id="link-error" className="field-error">{errors.link}</p>}</div></div><div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} /></div><label className="consent"><input ref={(node) => { fields.current.consent = node; }} type="checkbox" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} aria-invalid={Boolean(errors.consent)} /> <span>I agree that Kepler Dev may use this information to respond to this project enquiry.</span></label>{errors.consent && <p className="field-error">{errors.consent}</p>}<button className="button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending enquiry…" : "Request a project review"}</button><p className="form-note" aria-live="polite">{fallbackEmail ? <>If sending fails, use the verified fallback: <a href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a>.</> : "We only enable online enquiries once a provider and verified fallback are configured."}</p></form>;
}
