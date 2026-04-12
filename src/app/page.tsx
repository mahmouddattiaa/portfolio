"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProjectCardPremium } from "@/components/project-card-premium";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Process } from "@/components/process";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Terminal } from "@/components/terminal";
import { TechStack } from "@/components/tech-stack";
import { ProjectDetailsModal } from "@/components/project-details-modal";
import { AnimatedBackground } from "@/components/animated-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/custom-cursor";
import { Preloader } from "@/components/preloader";
import { projects, Project } from "@/lib/data";
import { cn } from "@/lib/utils";

type FilterCategory = "all" | "web" | "mobile" | "system";

const filterLabels: Record<FilterCategory, string> = {
  all: "All",
  web: "Web",
  mobile: "Mobile",
  system: "Systems",
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<FilterCategory>("all");

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen relative selection:bg-primary/30 cursor-none">
      <ScrollProgress />
      <Preloader />
      <CustomCursor />
      <Navbar />
      <AnimatedBackground />
      <Hero />
      <TechStack />

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-14 md:mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/70 mb-4 block"
            >
              Selected Work
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display text-3xl md:text-5xl font-bold tracking-tight text-slate-100 mb-4"
            >
              Production Systems
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-400 max-w-xl text-base mb-10 leading-relaxed"
            >
              Architected for scale, performance, and real business outcomes.
              Each system is production-deployed and battle-tested.
            </motion.p>

            {/* Filter bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap gap-2"
            >
              {(Object.keys(filterLabels) as FilterCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-md font-mono text-xs tracking-widest uppercase transition-all border",
                    filter === cat
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-transparent border-white/6 text-slate-500 hover:text-slate-300 hover:border-white/12",
                  )}
                >
                  {filterLabels[cat]}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Project grid — fades when filter changes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(320px,auto)]"
            >
              {filteredProjects.map((project: Project, idx: number) => (
                <div
                  key={project.id}
                  className={idx === 0 || idx === 3 ? "md:col-span-2" : "col-span-1"}
                >
                  <ProjectCardPremium
                    {...project}
                    index={idx}
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Process />
      <ExperienceTimeline />
      <Testimonials />
      <Contact />
      <Terminal />

      <footer className="py-8 text-center border-t border-white/6 mt-8">
        <p className="font-mono text-slate-700 text-xs tracking-wider">
          © {new Date().getFullYear()} Mahmoud Attia
          <span className="text-white/8 mx-2">·</span>
          <span className="text-primary/30">Systems Engineer</span>
        </p>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
