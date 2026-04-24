"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";

const strengths = [
  "Building Telegram/WhatsApp bots that actually stay online",
  "Integrating AI (Gemini, OpenAI) into existing apps",
  "Shipping Flutter and React Native apps to Google Play",
  "Self-hosting infrastructure (Linux, Docker, systemd, WireGuard)",
];

export function About() {
  return (
    <section id="about" className="py-24 border-t border-white/6 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative w-full max-w-[420px] lg:max-w-none mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-white/10 bg-surface"
          >
            <div className="aspect-[4/5] relative">
              <Image
                src="/resources/pics/mahmoud-headshot.jpeg"
                alt="Mahmoud Attia"
                fill
                className="object-cover"
                priority={false}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70 mb-4 block">
              About Me
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-100 mb-5">
              Builder, Not Just a Coder
            </h2>

            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                I&apos;m Mahmoud Attia, a Computer Engineering student at Cairo
                University (Expected 2027) working as a freelance developer.
                I&apos;ve shipped apps to Google Play, built 24/7 self-hosted
                infrastructure, and earned $1,000+ on Mostaql with a $2,000
                project currently in progress.
              </p>
              <p>
                I work remotely for QSERV building production mobile systems,
                and I&apos;m currently available for Upwork projects in automation,
                AI integration, and mobile development.
              </p>
            </div>

            <div className="mt-7 rounded-2xl border border-white/8 bg-surface/70 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-4">
                What I&apos;m Good At
              </p>
              <div className="space-y-3">
                {strengths.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <BadgeCheck className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <p className="text-sm text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 text-sm text-slate-400">
              <span className="text-slate-200 font-medium">Certifications:</span>{" "}
              CompTIA A+, Cisco CCNA
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.upwork.com/freelancers/~014f0862c73d6acb2f"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                View Upwork Profile
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://mostaql.com/u/kepler911"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-white/12 text-slate-200 hover:text-white hover:border-primary/40 transition-colors"
              >
                Mostaql Profile
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="/resume.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-white/12 text-slate-200 hover:text-white hover:border-primary/40 transition-colors"
              >
                Download CV
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
