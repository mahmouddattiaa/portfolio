"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Project } from "@/lib/data";

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const images = project.images && project.images.length > 0 ? project.images : (project.image ? [project.image] : []);
  const hasMultipleImages = images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl flex flex-col no-scrollbar"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Header Gallery */}
        <div className={`min-h-[400px] sm:min-h-[600px] w-full ${project.color.split(" ")[0]} relative overflow-hidden bg-black flex items-center justify-center p-8`}>
           {images.length > 0 ? (
             <>
               <Image 
                 src={images[currentImageIdx]} 
                 alt={`${project.title} screenshot ${currentImageIdx + 1}`}
                 fill
                 className="object-contain"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/20" />
               
               {hasMultipleImages && (
                 <>
                   <button onClick={prevImage} aria-label="Previous image" className="absolute left-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all">
                     <ChevronLeft className="w-6 h-6" />
                   </button>
                   <button onClick={nextImage} aria-label="Next image" className="absolute right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all">
                     <ChevronRight className="w-6 h-6" />
                   </button>
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                     {images.map((_, idx) => (
                       <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIdx ? 'bg-white w-4' : 'bg-white/40'}`} />
                     ))}
                   </div>
                 </>
               )}
             </>
           ) : (
             <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent" />
           )}

           <div className="absolute top-4 right-4 z-20">
             <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all"
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
