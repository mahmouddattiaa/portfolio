"use client";

import { Mail, Github, Linkedin, Twitter } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-slate-900 bg-slate-950">
      <div className="max-w-4xl px-6 mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Engineer the Future?
        </h2>
        <p className="mt-4 text-lg text-slate-400">
          Whether you need a full-scale system architecture or a high-performance web app, I'm ready to discuss your vision.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 mt-12 sm:flex-row">
          <a
            href="mailto:mahmouddattia7@gmail.com" // Extracted from README
            className="flex items-center gap-3 px-8 py-4 text-lg font-semibold transition-all rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            mahmouddattia7@gmail.com
          </a>
        </div>

        <div className="flex justify-center gap-8 mt-12">
          <a href="https://github.com/mahmouddattiaa" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/mahmoud-attia-b372b0352" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-500 transition-colors">
            <Linkedin className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
          {/* Placeholder for others */}
        </div>
      </div>
    </section>
  );
}
