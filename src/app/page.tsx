"use client";
// Force rebuild: Theme update verified

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProjectCardPremium } from "@/components/project-card-premium";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Contact } from "@/components/contact";
import { TechStack } from "@/components/tech-stack";
import { ProjectDetailsModal } from "@/components/project-details-modal";
import { AnimatedBackground } from "@/components/animated-background";
import { CustomCursor } from "@/components/custom-cursor";
import { Preloader } from "@/components/preloader";
import { projects, Project } from "@/lib/data";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="min-h-screen relative selection:bg-violet-500/30 cursor-none">
        <Preloader />
        <CustomCursor />
        <Navbar />
        <AnimatedBackground />
        <Hero />
        
        <TechStack />
        
        <section id="projects" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-mono">
                Selected_Projects <span className="text-violet-500">()</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl text-lg">
                High-impact applications demonstrating diverse architectural patterns—from Monorepos to Native Modules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(350px,auto)]">
              {projects.map((project: Project, idx: number) => (
                <div key={project.id} className={idx === 0 || idx === 3 ? "md:col-span-2" : "col-span-1"}>
                  <ProjectCardPremium 
                    {...project} 
                    index={idx}
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <ExperienceTimeline />
        
        <Contact />

        <footer className="py-8 text-center text-zinc-600 text-sm border-t border-zinc-900 mt-12 font-mono">
            © {new Date().getFullYear()} Mahmoud Attia. System.exit(0); <span className="text-zinc-800 ml-2 text-xs">v2.1</span>
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
