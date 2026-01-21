"use client";

import { experience, Experience } from "@/lib/data";

export function ExperienceTimeline() {
  return (
    <section className="max-w-4xl px-6 mx-auto py-24 relative z-10">
      <h2 className="mb-12 text-3xl font-bold tracking-tight text-white font-mono uppercase tracking-widest">
        Experience <span className="text-violet-500">_</span>
      </h2>
      <div className="relative border-l border-zinc-800 ml-3 md:ml-6 space-y-12">
        {experience.map((item: Experience, index: number) => (
          <div key={index} className="relative pl-8 md:pl-12 group">
            {/* Dot */}
            <span className="absolute top-1.5 left-[-5px] h-2.5 w-2.5 rounded-full bg-zinc-700 ring-4 ring-zinc-950 group-hover:bg-violet-500 transition-colors shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-zinc-100 font-mono">{item.role}</h3>
              <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded border border-cyan-400/20">
                {item.period}
              </span>
            </div>
            <p className="text-lg font-medium text-violet-400 mb-2 font-mono uppercase text-sm tracking-widest">{item.company}</p>
            <p className="text-zinc-400 max-w-2xl font-light leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
