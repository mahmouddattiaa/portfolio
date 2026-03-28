"use client";

import { skills, Skill } from "@/lib/data";

function SkillItem({ skill, id }: { skill: Skill; id: string }) {
  return (
    <div key={id} className="flex items-center gap-6 group shrink-0">
      <span className="font-mono text-xs tracking-widest text-slate-500 group-hover:text-primary transition-colors duration-300 uppercase whitespace-nowrap">
        {skill.name}
      </span>
      <span className="text-white/10 text-xs select-none">·</span>
    </div>
  );
}

export function TechStack() {
  return (
    <section className="py-16 overflow-hidden relative border-t border-b border-white/4">
      {/* Section eyebrow */}
      <div className="text-center mb-10">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-600">
          Technical Stack
        </span>
      </div>

      {/* Gradient masks — match new background color */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent z-10 top-0" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent z-10 top-0" />

      <div className="flex w-full select-none overflow-hidden">
        {/* Primary row */}
        <div className="flex animate-scroll min-w-full shrink-0 items-center gap-8 px-8">
          {skills.map((skill: Skill) => (
            <SkillItem key={skill.name} skill={skill} id={skill.name} />
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex animate-scroll min-w-full shrink-0 items-center gap-8 px-8" aria-hidden="true">
          {skills.map((skill: Skill) => (
            <SkillItem key={`${skill.name}-dup`} skill={skill} id={`${skill.name}-dup`} />
          ))}
        </div>
      </div>
    </section>
  );
}
