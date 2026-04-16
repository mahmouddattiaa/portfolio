"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ChevronLeft, ChevronRight, Github, ExternalLink, Play, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

type MediaMode = "gallery" | "video";

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [mediaMode, setMediaMode] = useState<MediaMode>("gallery");
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    
    // Auto-focus the close button for accessibility
    closeBtnRef.current?.focus();

    return () => { 
      document.body.style.overflow = "auto"; 
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const images = project.images?.length ? project.images : project.image ? [project.image] : [];
  const hasMultipleImages = images.length > 1;
  const useMobilePreview = project.category === "mobile" && project.previewLayout !== "wide";
  const hasVideo = Boolean(project.videoUrl);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((p) => (p + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((p) => (p - 1 + images.length) % images.length);
  };

  const statusLabel = project.id === "hs-vpn" ? "Live on Stores" : "Production";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden">

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/85 backdrop-blur-xl"
      >
        {/* Ambient blue glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] rounded-full blur-[120px] opacity-10 bg-primary" />
      </motion.div>

      {/* Modal */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-6xl h-[88vh] md:h-[80vh] bg-surface border border-white/8 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-white/4 border border-white/8 text-slate-400 hover:text-white hover:bg-white/8 transition-all"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT: Media panel */}
        <div className="relative w-full md:w-1/2 h-[300px] md:h-full bg-[#090D18] flex items-center justify-center overflow-hidden shrink-0">

          {/* Gallery / Video tab strip — only shown when videoUrl exists */}
          {hasVideo && (
            <div className="absolute top-4 left-4 z-30 flex rounded-md border border-white/8 overflow-hidden bg-surface">
              <button
                type="button"
                onClick={() => setMediaMode("gallery")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors",
                  mediaMode === "gallery" ? "bg-white/8 text-white" : "text-slate-500 hover:text-white",
                )}
              >
                <ImageIcon className="w-3 h-3" />
                Gallery
              </button>
              <button
                type="button"
                onClick={() => setMediaMode("video")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors",
                  mediaMode === "video" ? "bg-white/8 text-white" : "text-slate-500 hover:text-white",
                )}
              >
                <Play className="w-3 h-3" />
                Demo
              </button>
            </div>
          )}

          {/* Video embed */}
          {mediaMode === "video" && hasVideo ? (
            <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/8">
                <iframe
                  src={project.videoUrl}
                  title={`${project.title} demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ) : images.length > 0 ? (
            /* Gallery */
            <div className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIdx}
                  initial={{ opacity: 0, x: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -16, filter: "blur(8px)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={cn(
                    "relative rounded-xl overflow-hidden border border-white/8 shadow-2xl bg-black/40",
                    useMobilePreview ? "w-[200px] sm:w-[240px] aspect-[9/19.5]" : "w-full h-full",
                  )}
                >
                  <Image
                    src={images[currentImageIdx]}
                    alt={`${project.title} screenshot ${currentImageIdx + 1}`}
                    fill
                    className={cn(useMobilePreview ? "object-contain" : "object-contain object-center")}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Nav arrows */}
              {hasMultipleImages && (
                <>
                  <button type="button" onClick={prevImage} aria-label="Previous image" className="absolute left-3 p-2 rounded-lg bg-surface/80 border border-white/8 text-slate-400 hover:text-white hover:border-primary/30 transition-all backdrop-blur-sm">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={nextImage} aria-label="Next image" className="absolute right-3 p-2 rounded-lg bg-surface/80 border border-white/8 text-slate-400 hover:text-white hover:border-primary/30 transition-all backdrop-blur-sm">
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Dot indicators */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10 px-3 py-1.5 rounded-full bg-surface/70 backdrop-blur-sm border border-white/6">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`Go to screenshot ${idx + 1}`}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIdx(idx); }}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          idx === currentImageIdx ? "w-4 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40",
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="font-mono text-xs text-slate-600 z-10">[ NO MEDIA ]</div>
          )}
        </div>

        {/* RIGHT: Content panel */}
        <div className="flex-1 flex flex-col h-full bg-surface border-t md:border-t-0 md:border-l border-white/6 overflow-y-auto no-scrollbar">
          <div className="p-6 md:p-9 flex flex-col gap-7">

            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono px-2 py-0.5 text-[9px] uppercase tracking-widest rounded border text-primary border-primary/30 bg-primary/5">
                  {project.category}
                </span>
                <span className="font-mono px-2 py-0.5 text-[9px] uppercase tracking-widest rounded border text-slate-500 border-white/8 bg-transparent">
                  {statusLabel}
                </span>
              </div>

              <h2 id="modal-title" className="font-display text-2xl md:text-3xl font-bold text-slate-100 tracking-tight mb-4">
                {project.title}
              </h2>

              {project.challenge || project.solution || project.impact ? (
                <div className="space-y-4">
                  {project.challenge && (
                    <div>
                      <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary/80 mb-2">The Challenge</h3>
                      <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">{project.challenge}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div>
                      <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary/80 mb-2">The Solution</h3>
                      <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">{project.solution}</p>
                    </div>
                  )}
                  {project.impact && (
                    <div>
                      <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary/80 mb-2">The Impact</h3>
                      <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">{project.impact}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
                  {project.longDescription || project.description}
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-3">System Architecture</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="font-mono px-3 py-1.5 text-[10px] tracking-wider border rounded-lg border-white/8 bg-white/3 text-slate-300 hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture Diagram */}
            {project.architectureDiagram && (
              <div className="pt-2">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-4">Infrastructure Blueprint</h3>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/20 group">
                  <Image
                    src={project.architectureDiagram}
                    alt={`${project.title} Architecture`}
                    fill
                    className="object-contain p-4 group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              </div>
            )}

            {/* Features */}
            {project.features && (
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-3">Core Capabilities</h3>
                <ul className="grid grid-cols-1 gap-2.5">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 shrink-0 p-1 rounded bg-primary/8 text-primary">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-slate-300 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTAs */}
            <div className="pt-5 mt-auto border-t border-white/6 flex flex-wrap gap-2.5">
              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(62,123,250,0.2)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-white/8 text-slate-300 hover:border-white/16 hover:text-white hover:bg-white/4 transition-all"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
