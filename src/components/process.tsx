"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const sprintFlow = [
  {
    label: "Day 1",
    title: "Scope and Milestones",
    description: "We agree on one clear outcome, fixed scope, and delivery checkpoints.",
  },
  {
    label: "Day 3",
    title: "Working Demo",
    description: "You get a real build or bot demo early, so feedback happens before final delivery.",
  },
  {
    label: "Day 7",
    title: "Final Delivery",
    description: "Production-ready handoff with deployment support and source code access.",
  },
];

const expectations = [
  "Clear milestones with fixed prices upfront",
  "Daily progress updates with screenshots",
  "Code hosted on GitHub with full access",
  "Deployment handled end-to-end (Google Play, VPS, cloud)",
];

export function Process() {
  return (
    <section id="process" className="py-24 relative border-t border-white/6 bg-[#090D18]/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70 mb-4 block"
          >
            How I Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-100"
          >
            Fast, Transparent Delivery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 mt-4 max-w-2xl mx-auto"
          >
            I work in 1-week sprints. You get a working demo by day 3, full
            delivery by day 7, and daily updates via Telegram or Slack. No
            surprises, no scope creep.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {sprintFlow.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-surface border border-white/6 hover:border-primary/25 transition-colors"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80 mb-3">
                {step.label}
              </p>
              <h3 className="font-display text-xl font-semibold text-slate-100 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-2xl border border-white/6 bg-surface/60 p-6 md:p-7"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-4">
            What You Can Expect
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {expectations.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
