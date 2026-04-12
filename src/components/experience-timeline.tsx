"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Briefcase, Calendar, Target, Zap } from "lucide-react";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#090D18]/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70 mb-4 block"
          >
            Track Record
          </motion.span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-slate-100">
            Professional Experience
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
          {experience.map((item, idx) => {
            const isFeatured = idx === 0; // Highlight the latest role (QSERV)
            const isSecond = idx === 1;   // Highlight iScore

            return (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={cn(
                  "group relative p-8 rounded-3xl border border-white/6 bg-surface/40 hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-500 flex flex-col",
                  isFeatured ? "md:col-span-4 md:row-span-2" : isSecond ? "md:col-span-2 md:row-span-2" : "md:col-span-3"
                )}
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary/80">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span className="font-mono text-[10px] uppercase tracking-widest">{item.company}</span>
                    </div>
                    <h3 className={cn(
                      "font-display font-bold text-slate-100 tracking-tight",
                      isFeatured ? "text-2xl md:text-3xl" : "text-xl"
                    )}>
                      {item.role}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 bg-white/3 px-3 py-1.5 rounded-full border border-white/6 h-fit shrink-0">
                    <Calendar className="w-3 h-3" />
                    {item.period}
                  </div>
                </div>

                {/* Description */}
                <p className={cn(
                  "text-slate-400 font-light leading-relaxed mb-8",
                  isFeatured ? "text-base md:text-lg" : "text-sm"
                )}>
                  {item.description}
                </p>

                {/* Quick Stats/Badges for Featured */}
                {isFeatured && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-auto">
                    <div className="p-4 rounded-2xl bg-white/3 border border-white/6 space-y-1">
                      <Zap className="w-4 h-4 text-primary" />
                      <div className="font-display font-bold text-slate-100">Zero Loss</div>
                      <div className="text-[10px] text-slate-500 uppercase">Offline Sync</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/3 border border-white/6 space-y-1">
                      <Target className="w-4 h-4 text-primary" />
                      <div className="font-display font-bold text-slate-100">Java Native</div>
                      <div className="text-[10px] text-slate-500 uppercase">Android Bridge</div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
