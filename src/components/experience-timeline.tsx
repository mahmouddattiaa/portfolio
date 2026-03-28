"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience, Experience } from "@/lib/data";

function TimelineItem({ item, index }: { item: Experience; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="relative pl-10 md:pl-16 group"
    >
      {/* Animated dot */}
      <div className="absolute top-2 left-[-5px] h-2.5 w-2.5 rounded-full bg-primary/20 ring-4 ring-background group-hover:bg-primary group-hover:shadow-[0_0_12px_rgba(62,123,250,0.5)] transition-all duration-500" />

      {/* Connecting line segment — animates in */}
      <motion.div
        className="absolute -left-px w-px bg-primary/15"
        style={{ top: "calc(0.75rem + 4px)" }}
        initial={{ height: 0 }}
        animate={isInView ? { height: "calc(100% + 4rem)" } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: "easeOut" }}
      />

      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">{item.role}</h3>
          <p className="font-mono text-primary/70 mt-1 tracking-widest uppercase text-[10px]">{item.company}</p>
        </div>
        <span className="mt-2 md:mt-0 inline-flex font-mono text-[10px] text-slate-500 bg-surface px-3 py-1 rounded border border-white/8">
          {item.period}
        </span>
      </div>

      <p className="text-sm text-slate-400 max-w-2xl font-light leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
}

export function ExperienceTimeline() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="max-w-4xl px-6 mx-auto py-28 relative z-10">

      {/* Section header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 16 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-20 pl-6 md:pl-0"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/60 block mb-3">
          Career
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-slate-100">
          Experience
          <span className="text-white/10 ml-3 font-light">History</span>
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative border-l border-white/6 ml-6 md:ml-8 space-y-16">
        {experience.map((item: Experience, index: number) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}

        {/* Bottom fade */}
        <div className="absolute bottom-[-20px] -left-px w-px h-24 bg-linear-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
