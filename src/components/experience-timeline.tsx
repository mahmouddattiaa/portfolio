"use client";

import { experience, Experience } from "@/lib/data";

export function ExperienceTimeline() {
  return (
    <section className="max-w-4xl px-6 mx-auto py-24">
      <h2 className="mb-12 text-3xl font-bold tracking-tight text-white">Experience</h2>
      <div className="relative border-l border-slate-800 ml-3 md:ml-6 space-y-12">
        {experience.map((item: Experience, index: number) => (
          <div key={index} className="relative pl-8 md:pl-12 group">
            {/* Dot */}
            <span className="absolute top-1.5 left-[-5px] h-2.5 w-2.5 rounded-full bg-slate-600 ring-4 ring-slate-950 group-hover:bg-emerald-500 transition-colors" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-xl font-semibold text-slate-100">{item.role}</h3>
              <span className="text-sm font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                {item.period}
              </span>
            </div>
            <p className="text-lg font-medium text-slate-400 mb-2">{item.company}</p>
            <p className="text-slate-500 max-w-2xl">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
