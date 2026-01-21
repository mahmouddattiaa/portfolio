"use client";

import { skills, Skill } from "@/lib/data";

export function TechStack() {
  return (
    <section className="py-10 overflow-hidden border-y border-zinc-900/50 bg-black/20 backdrop-blur-sm">
      <div className="flex w-full select-none overflow-hidden">
        <div className="flex animate-scroll min-w-full shrink-0 items-center justify-around gap-10 sm:gap-20 px-10">
          {skills.map((skill: Skill) => (
            <div key={skill.name} className="flex items-center gap-2 group">
              <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                {skill.icon}
              </span>
              <span className="text-lg font-mono text-zinc-500 group-hover:text-violet-400 transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex animate-scroll min-w-full shrink-0 items-center justify-around gap-10 sm:gap-20 px-10" aria-hidden="true">
          {skills.map((skill: Skill) => (
            <div key={`${skill.name}-duplicate`} className="flex items-center gap-2 group">
              <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                {skill.icon}
              </span>
              <span className="text-lg font-mono text-zinc-500 group-hover:text-violet-400 transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
