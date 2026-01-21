"use client";

import { Mail, Github, Linkedin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-zinc-900 border-dashed relative z-10">
      <div className="max-w-4xl px-6 mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-mono uppercase tracking-widest">
          Connect <span className="text-violet-500">//</span>
        </h2>
        <p className="mt-4 text-lg text-zinc-400 font-light max-w-xl mx-auto">
          System.ready(true); I&apos;m currently available for high-tier development roles and selected freelance projects.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 mt-12 sm:flex-row">
          <a
            href="mailto:mahmouddattia7@gmail.com" 
            className="flex items-center gap-3 px-10 py-4 text-base font-bold transition-all rounded bg-violet-600 text-white hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] active:scale-95 uppercase font-mono tracking-widest"
          >
            <Mail className="w-5 h-5" />
            Ping Me
          </a>
        </div>

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
