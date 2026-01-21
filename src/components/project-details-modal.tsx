"use client";

import { motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Project } from "@/lib/data";

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        layoutId={`project-${project.id}`}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel rounded-2xl flex flex-col no-scrollbar"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Header Image Placeholder */}
        <div className={`h-48 w-full ${project.color.split(" ")[0]} relative overflow-hidden`}>
           <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent" />
           <div className="absolute top-4 right-4">
             <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                aria-label="Close modal"
             >
               <X className="w-5 h-5" />
             </button>
           </div>
        </div>

        <div className="p-8 space-y-6">
            <div>
                <h2 className="text-3xl font-bold font-mono text-white mb-2">{project.title}</h2>
                <p className="text-lg text-zinc-400 leading-relaxed font-light">
                    {project.longDescription}
                </p>
            </div>

            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-violet-400 mb-4">Core Technologies</h3>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-mono border rounded border-zinc-700 bg-zinc-800/50 text-zinc-300">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div>
                 <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-4">Key Features</h3>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {project.features.map((feature, idx) => (
                         <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                             <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                             {feature}
                         </li>
                     ))}
                 </ul>
            </div>
            
             <div className="pt-6 border-t border-zinc-800">
                <a 
                    href={project.link}
                    className="inline-flex items-center justify-center w-full py-3 text-sm font-bold text-black uppercase transition-transform rounded bg-gradient-to-r from-violet-500 to-cyan-400 hover:scale-[1.02] active:scale-[0.98]"
                >
                    View Live Project
                </a>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
