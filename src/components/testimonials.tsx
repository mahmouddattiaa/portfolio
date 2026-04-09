"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Mahmoud's custom Android Native Module was critical to our POS launch. He is a profoundly reliable engineer who delivers production-ready code.",
    author: "Engineering Manager",
    company: "QSERV",
  },
  {
    quote: "He doesn't just write code; he architects solutions. His work on the backend microservices drastically improved our system's scalability.",
    author: "Technical Lead",
    company: "MedConnect",
  },
  {
    quote: "Exceptional problem solver. Mahmoud navigated complex financial data restrictions flawlessly to deliver a highly secure mobile application.",
    author: "Project Manager",
    company: "iScore",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative border-t border-white/6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70 mb-4 block"
          >
            Client Trust
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-100"
          >
            Proven Track Record
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-surface border border-white/6 hover:border-white/12 transition-colors flex flex-col h-full"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-6" />
              <p className="text-sm text-slate-300 leading-relaxed font-light flex-grow mb-8">
                &quot;{t.quote}&quot;
              </p>
              <div>
                <p className="text-base font-medium text-slate-100">{t.author}</p>
                <p className="text-xs font-mono text-primary/80 uppercase tracking-widest mt-1">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
