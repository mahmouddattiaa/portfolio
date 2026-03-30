"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.23, 1, 0.32, 1] as const;

const metrics = [
  { stat: "6+", label: "Production Apps" },
  { stat: "3+", label: "Years Building" },
  { stat: "Sub-100ms", label: "Real-time Sync" },
];

export function Hero() {
  return (
    <section className="relative flex flex-col justify-center min-h-[90vh] px-6 py-24 overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-5xl mx-auto w-full space-y-10 z-10 relative">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs border border-white/8 bg-white/4 text-slate-400 tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-[dot-pulse_2s_ease-in-out_infinite]" />
          Available for new engagements
        </motion.div>

        {/* Name + Role */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="font-display text-5xl md:text-7xl lg:text-[82px] font-bold tracking-[-0.03em] leading-[1.05] text-foreground"
          >
            Mahmoud Attia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
            className="font-display text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-[-0.02em] leading-[1.1] text-primary"
          >
            Systems Engineer.
          </motion.p>
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="max-w-xl text-base md:text-lg text-slate-400 font-light leading-relaxed"
        >
          I architect full-stack platforms and distributed systems that scale.
          From{" "}
          <span className="text-slate-200 font-medium">Monorepo APIs</span> to{" "}
          <span className="text-slate-200 font-medium">production mobile apps</span>{" "}
          — built for enterprise reliability and startup velocity.
        </motion.p>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap gap-8 pt-2"
        >
          {metrics.map(({ stat, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-display text-xl font-bold text-white">{stat}</span>
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 pt-2"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-lg transition-all duration-200 bg-primary hover:bg-primary/90 shadow-[0_0_24px_rgba(62,123,250,0.25)] hover:shadow-[0_0_36px_rgba(62,123,250,0.4)]"
          >
            View Projects
            <ArrowRight className="w-4 h-4" />
          </a>


        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
    </section>
  );
}
