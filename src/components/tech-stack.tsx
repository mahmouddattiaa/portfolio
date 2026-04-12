"use client";

import { motion } from "framer-motion";
import { Server, Database, Code2, Cpu, Globe, Layers, ShieldCheck, Zap } from "lucide-react";

const coreTech = [
  { name: "Next.js 15", icon: Globe, description: "Frontend Architecture" },
  { name: "NestJS / Node", icon: Server, description: "Backend Microservices" },
  { name: "TypeScript 5", icon: Code2, description: "Static Typing & Safety" },
  { name: "Docker", icon: Layers, description: "Containerization" },
  { name: "PostgreSQL", icon: Database, description: "Data Modeling" },
  { name: "AWS / Cloud", icon: Cpu, description: "Infrastructure" },
  { name: "Security", icon: ShieldCheck, description: "Zero Trust Systems" },
  { name: "Performance", icon: Zap, description: "Low-Latency Logic" },
];

export function TechStack() {
  return (
    <section className="py-24 overflow-hidden relative border-t border-b border-white/4 bg-[#090D18]/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-600 mb-4 block"
          >
            Core Competencies
          </motion.span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-100">
            Enterprise-Grade Tech Stack
          </h2>
        </div>

        {/* Static Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {coreTech.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group p-6 rounded-2xl border border-white/6 bg-surface/50 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-xl bg-white/3 border border-white/8 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all">
                    <Icon className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                      {tech.name}
                    </h3>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-slate-600 mt-1">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
