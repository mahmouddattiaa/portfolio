"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import Link from "next/link";
import {
  offerOptions,
  timingOptions,
  type Enquiry,
  type EnquiryErrors,
  type EnquiryField,
  validateEnquiry,
} from "@/lib/contact";
import styles from "./contact-form.module.css";

const initial: Enquiry = {
  name: "",
  company: "",
  email: "",
  offer: "",
  timing: "",
  problem: "",
  website: "",
};

type Status = "idle" | "submitting" | "failure" | "success";

export function ContactForm({
  defaultOffer = "",
  fallbackEmail,
  deliveryAvailable = true,
}: {
  defaultOffer?: Enquiry["offer"] | "";
  fallbackEmail?: string;
  deliveryAvailable?: boolean;
}) {
  const [values, setValues] = useState<Enquiry>({ ...initial, offer: defaultOffer });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");
  const fields = useRef<Partial<Record<EnquiryField | "website", HTMLElement | null>>>({});

  const update = (field: EnquiryField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const remaining = { ...current };
      delete remaining[field];
      return remaining;
    });
  };

  const focusFirstInvalid = (nextErrors: EnquiryErrors) => {
    const first = Object.keys(nextErrors).find((field): field is EnquiryField => field in fields.current);
    if (first) fields.current[first]?.focus();
  };

  const send = async () => {
    setStatus("submitting");
    setFailure("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.status === 422) {
        let nextErrors: EnquiryErrors = {};
        try {
          const body: unknown = await response.json();
          if (body && typeof body === "object" && "errors" in body) {
            const candidate = (body as { errors?: unknown }).errors;
            if (candidate && typeof candidate === "object") nextErrors = candidate as EnquiryErrors;
          }
        } catch {
          nextErrors = {};
        }
        if (Object.keys(nextErrors).length) {
          setErrors(nextErrors);
          setStatus("idle");
          focusFirstInvalid(nextErrors);
          return;
        }
      }

      if (!response.ok) {
        setFailure(
          fallbackEmail
            ? "Your submission could not be delivered through the form right now. Please email your brief directly to " + fallbackEmail + "."
            : "Your submission could not be delivered through the form right now. Please retry shortly.",
        );
        setStatus("failure");
        return;
      }

      setErrors({});
      setStatus("success");
    } catch {
      setFailure(
        fallbackEmail
          ? "Your submission could not be delivered through the form right now. Please email your brief directly to " + fallbackEmail + "."
          : "Your submission could not be delivered through the form right now. Please retry shortly.",
      );
      setStatus("failure");
    }
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    setFailure("");
    if (Object.keys(nextErrors).length) {
      focusFirstInvalid(nextErrors);
      return;
    }
    await send();
  }

  const startAnother = () => {
    setValues({ ...initial });
    setErrors({});
    setFailure("");
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <section className={styles.success} role="status" aria-live="polite">
        <h2>Project review request received.</h2>
        <p>A senior engineer will review your brief and reply within one business day.</p>
        <button className="atelier-primary-action" type="button" onClick={startAnother}>
          Send another project review
        </button>
      </section>
    );
  }

  const bind = (field: EnquiryField) => ({
    ref: (node: HTMLElement | null) => { fields.current[field] = node; },
    id: field,
    name: field,
    value: values[field],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      update(field, event.currentTarget.value),
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? field + "-error" : undefined,
  });

  const fieldError = (field: EnquiryField) => errors[field]
    ? <p id={field + "-error"} className={styles.fieldError}>{errors[field]}</p>
    : null;

  const failureText = fallbackEmail
    ? "Your submission could not be delivered through the form right now. Please email your brief directly to "
    : "Your submission could not be delivered through the form right now. Please retry shortly.";

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit} aria-busy={status === "submitting"}>
      {!deliveryAvailable && (
        <p className={styles.deliveryStatus} role="status">
          Online form delivery is not configured at the moment. You can still prepare your brief here.
          {fallbackEmail ? <> Use the verified fallback: <a href={"mailto:" + fallbackEmail}>{fallbackEmail}</a>.</> : " If delivery fails, retry when the service is available."}
        </p>
      )}
      {(Object.keys(errors).length > 0 || status === "failure") && (
        <div className={styles.errorSummary} role="alert">
          <strong>{status === "failure" ? "Your enquiry has not been sent." : "Please review the form."}</strong>
          {status === "failure" ? (
            <p>
              {failure || failureText}
              {fallbackEmail && !failure?.includes(fallbackEmail) ? (
                <>{" "}<a href={"mailto:" + fallbackEmail}>{fallbackEmail}</a>.</>
              ) : null}
            </p>
          ) : (
            <ul>
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>
                  <button type="button" onClick={() => fields.current[field as EnquiryField]?.focus()}>
                    {message}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {status === "failure" && (
            <div className={styles.failureActions}>
              <button
                className="atelier-secondary-action"
                type="button"
                onClick={() => void send()}
              >
                Retry submission
              </button>
              {fallbackEmail ? <a href={"mailto:" + fallbackEmail}>Email your brief directly</a> : null}
            </div>
          )}
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="name">Your name <span aria-hidden="true">*</span></label>
          <input {...bind("name")} type="text" autoComplete="name" placeholder="e.g., Tariq Al-Mansour or Sarah Jenkins" required />
          {fieldError("name")}
        </div>
        <div className={styles.field}>
          <label htmlFor="company">Company or organization <span aria-hidden="true">*</span></label>
          <input {...bind("company")} type="text" autoComplete="organization" placeholder="e.g., Gulf Fuel Retail Co. or MedTech Operations Ltd" required />
          {fieldError("company")}
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Work email address <span aria-hidden="true">*</span></label>
          <input {...bind("email")} type="email" autoComplete="email" placeholder="name@company.com" required />
          {fieldError("email")}
        </div>
        <div className={styles.field}>
          <label htmlFor="offer">Which engagement model fits best? <span aria-hidden="true">*</span></label>
          <select {...bind("offer")} required>
            <option value="">Select an engagement model</option>
            {offerOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          {fieldError("offer")}
        </div>
        <div className={styles.field}>
          <label htmlFor="timing">Target launch or discovery window</label>
          <select {...bind("timing")}>
            <option value="">Select timing (optional)</option>
            {timingOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          {fieldError("timing")}
        </div>
        <div className={styles.field + " " + styles.problemField}>
          <label htmlFor="problem">What workflow or product are we engineering? <span aria-hidden="true">*</span></label>
          <textarea
            {...bind("problem")}
            rows={5}
            minLength={20}
            placeholder="Describe the manual bottlenecks, user roles (customers, field staff, managers), hardware/POS needs, or Arabic RTL and payment requirements."
            required
          />
          {fieldError("problem")}
        </div>
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          ref={(node) => { fields.current.website = node; }}
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website || ""}
          onChange={(event) => setValues((current) => ({ ...current, website: event.currentTarget.value }))}
        />
      </div>

      <div className={styles.submitRow}>
        <button
          className="atelier-primary-action"
          type="submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
        >
          {status === "submitting" ? "Sending project brief..." : "Send project review request"}
        </button>
        <p className={styles.privacyNote}>
          Your technical brief is read exclusively by Kepler Dev engineering leads for scoping and qualification.
          Form submissions transmit securely via Formspree and are never shared with third-party brokers or marketing lists.
          {" "}Read the <Link href="/privacy">privacy notice</Link>.
        </p>
      </div>
    </form>
  );
}
