"use client";

import { Github, Linkedin, Send, Loader2, Copy, Check } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";

export function Contact() {
  const [state, handleSubmit] = useForm("YOUR_FORM_ID"); // TODO: Create a form at formspree.io and paste ID here
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("mahmouddattia7@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 border-t border-zinc-900 border-dashed relative z-10">
      <div className="max-w-4xl px-6 mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-mono uppercase tracking-widest">
          Connect <span className="text-violet-500">{"//"}</span>
        </h2>
        <p className="mt-4 text-lg text-zinc-400 font-light max-w-xl mx-auto mb-12">
          System.ready(true); I&apos;m currently available for high-tier development roles and selected freelance projects.
        </p>

        {/* Quick Action: Copy Email */}
        <div className="flex justify-center mb-12">
            <button 
                onClick={copyEmail}
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50 transition-all cursor-copy"
            >
                <span className="text-zinc-300 font-mono text-sm group-hover:text-white transition-colors">mahmouddattia7@gmail.com</span>
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-500 group-hover:text-violet-400" />}
            </button>
        </div>

        {state.succeeded ? (
           <div className="p-8 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-300">
             <p className="text-xl font-mono">Message received. I will ack shortly.</p>
           </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 text-left">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1 font-mono">
                Email Address
              </label>
              <input
                id="email"
                type="email" 
                name="email"
                required
                className="w-full px-4 py-3 rounded bg-zinc-900/50 border border-zinc-800 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                placeholder="recruiter@company.com"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1 font-mono">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-3 rounded bg-zinc-900/50 border border-zinc-800 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                placeholder="Let's build something scalable..."
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm mt-1" />
            </div>

            <button 
              type="submit" 
              disabled={state.submitting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 text-base font-bold transition-all rounded bg-violet-600 text-white hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed uppercase font-mono tracking-widest"
            >
              {state.submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {state.submitting ? "Sending..." : "Send Message"}
            </button>
            <p className="text-xs text-zinc-600 text-center mt-4">
              * Note: This form requires a valid Formspree ID to function. Use the email copy button above for immediate contact.
            </p>
          </form>
        )}

        <div className="flex justify-center gap-10 mt-16">
          <a href="https://github.com/mahmouddattiaa" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-all transform hover:scale-110">
            <Github className="w-8 h-8" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/mahmoud-attia-b372b0352" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-cyan-400 transition-all transform hover:scale-110">
            <Linkedin className="w-8 h-8" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
