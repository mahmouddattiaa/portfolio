"use client";

import { Github, Linkedin, Send, Loader2, Copy, Check } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Contact() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim() ?? "";
  const hasLiveForm = formId.length > 0;
  const [state, handleSubmit] = useForm(hasLiveForm ? formId : "form_not_configured");
  const [copied, setCopied] = useState(false);
  const showSuccessState = state.succeeded;
  const showFormUnavailableState = !showSuccessState && !hasLiveForm;
  const showLiveFormState = !showSuccessState && hasLiveForm;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const copyEmail = () => {
    navigator.clipboard.writeText("mahmouddattia7@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 border-t border-white/6 relative z-10">
      <div className="max-w-4xl px-6 mx-auto text-center">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/60 block mb-3">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Start a Project
          </h2>
          <div className="w-8 h-px bg-primary mx-auto mt-4 mb-5" />
          <p className="text-base text-slate-400 font-light max-w-md mx-auto mb-10">
            Available for enterprise contracts and startup builds.
            Let&apos;s architect something that scales.
          </p>
        </motion.div>

        {/* Email copy */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <button
            type="button"
            onClick={copyEmail}
            className="group flex items-center gap-3 px-5 py-2.5 rounded-lg bg-white/3 border border-white/8 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-copy"
          >
            <span className="font-mono text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
              mahmouddattia7@gmail.com
            </span>
            {copied
              ? <Check className="w-4 h-4 text-primary shrink-0" />
              : <Copy className="w-4 h-4 text-slate-600 group-hover:text-primary shrink-0 transition-colors" />
            }
          </button>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {showSuccessState && (
            <div className="p-8 rounded-xl bg-primary/8 border border-primary/20 text-primary max-w-md mx-auto">
              <p className="font-mono text-sm">Message received. I&apos;ll respond shortly.</p>
            </div>
          )}

          {showFormUnavailableState && (
            <div className="p-6 rounded-xl bg-white/3 border border-white/8 text-slate-300 max-w-md mx-auto text-left">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-500 mb-2">Contact setup</p>
              <p className="text-sm text-slate-300">
                The contact form is currently offline. You can still reach me directly at
                {" "}
                <span className="font-mono text-primary">mahmouddattia7@gmail.com</span>.
              </p>
            </div>
          )}

          {showLiveFormState && (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 text-left">
              <div>
                <label htmlFor="email" className="font-mono block text-xs uppercase tracking-wider text-slate-500 mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md bg-surface border border-white/8 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                  placeholder="you@company.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="message" className="font-mono block text-xs uppercase tracking-wider text-slate-500 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-md bg-surface border border-white/8 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm resize-none"
                  placeholder="Let's build something that scales..."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(62,123,250,0.2)] hover:shadow-[0_0_28px_rgba(62,123,250,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex justify-center gap-8 mt-14"
        >
          <a
            href="https://github.com/mahmouddattiaa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-200 transition-colors"
          >
            <Github className="w-6 h-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/mahmoud-attia-b372b0352"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-primary transition-colors"
          >
            <Linkedin className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
