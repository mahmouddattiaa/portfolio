"use client";

import { motion } from "framer-motion";
import { Search, Cpu, Code2, ShieldCheck, Rocket } from "lucide-react";

const steps = [
  {
    title: "1. Discovery & Scope",
    description: "Deep dive into business requirements, defining clear KPIs, constraints, and success criteria before writing a single line of code.",
    icon: Search,
  },
  {
    title: "2. System Architecture",
    description: "Designing fault-tolerant, scalable infrastructure. Choosing the right tech stack (Monorepos, microservices) to ensure long-term viability.",
    icon: Cpu,
  },
  {
    title: "3. Agile Development",
    description: "Iterative, test-driven development with frequent staging deployments, ensuring you have constant visibility into the progress.",
    icon: Code2,
  },
  {
    title: "4. QA & Security",
    description: "Rigorous automated and manual testing, performance profiling, and vulnerability scanning to guarantee enterprise-grade reliability.",
    icon: ShieldCheck,
  },
  {
    title: "5. Launch & Handoff",
    description: "Seamless deployment to production, CI/CD pipeline setup, and comprehensive documentation for smooth team handoff.",
    icon: Rocket,
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 relative border-t border-white/6 bg-[#090D18]/50">
      <div className="max-w-5xl mx-auto px-6">
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
            Engineering Methodology
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 mt-4 max-w-2xl mx-auto"
          >
            A predictable, transparent process designed to de-risk development 
            and guarantee high-quality technical outcomes.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/6 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Desktop Node */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#090D18] border border-white/12 rounded-full items-center justify-center z-10 shadow-[0_0_15px_rgba(62,123,250,0.15)]">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="p-6 rounded-2xl bg-surface border border-white/6 hover:border-white/12 transition-colors">
                      <div className="md:hidden w-10 h-10 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-slate-100 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
