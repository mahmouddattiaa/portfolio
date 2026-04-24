"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Linkedin, Mail } from "lucide-react";

const contactLinks = [
  {
    title: "Upwork Profile",
    description: "Best for new automation and AI project requests.",
    href: "https://www.upwork.com/freelancers/~014f0862c73d6acb2f",
    icon: Briefcase,
  },
  {
    title: "Email",
    description: "mahmouddattia7@gmail.com",
    href: "mailto:mahmouddattia7@gmail.com",
    icon: Mail,
  },
  {
    title: "LinkedIn",
    description: "Professional profile and work history.",
    href: "https://www.linkedin.com/in/mahmoud-attia-b372b0352",
    icon: Linkedin,
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-white/6 relative z-10">
      <div className="max-w-4xl px-6 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/60 block mb-3">
            Availability
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Let&apos;s Build Something
          </h2>
          <div className="w-8 h-px bg-primary mx-auto mt-4 mb-5" />
          <p className="text-base text-slate-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Currently available for Telegram/WhatsApp bots, AI integrations,
            and mobile app development. Taking projects in the $300-$1,500 range.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {contactLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="group rounded-2xl border border-white/8 bg-surface/80 p-5 hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl border border-white/8 bg-white/4 flex items-center justify-center text-primary">
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-xl text-slate-100 mb-1.5">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
