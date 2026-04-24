"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Share2, Database, ShieldCheck, Zap, Brain } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/data";

interface ProjectCardProps extends Project {
  index: number;
  onClick: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Zap,
  Share2,
  Database,
  Brain,
};

const ROTATION_RANGE = 8;
const HALF_ROTATION_RANGE = 4;

const categoryColors: Record<string, string> = {
  web: "text-primary border-primary/30 bg-primary/5",
  mobile: "text-slate-400 border-white/10 bg-white/4",
  system: "text-slate-400 border-white/10 bg-white/4",
};

export function ProjectCardPremium({
  iconName, title, description, tags, image,
  category, previewLayout, index, onClick,
}: ProjectCardProps) {
  const Icon = iconMap[iconName] || Share2;
  const useMobilePreview = previewLayout === "mobile";

  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;
  const spotlightBg = useMotionTemplate`radial-gradient(380px at ${mouseX}px ${mouseY}px, rgba(62,123,250,0.08), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const rX = ((e.clientY - rect.top) * ROTATION_RANGE / rect.height - HALF_ROTATION_RANGE) * -1;
    const rY = (e.clientX - rect.left) * ROTATION_RANGE / rect.width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ transformStyle: "preserve-3d", transform }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative block w-full text-left h-full cursor-pointer group rounded-2xl"
    >
      {/* Card shell */}
      <div className={cn(
        "relative h-full flex overflow-hidden rounded-2xl border border-white/6 bg-surface transition-all duration-500",
        "group-hover:border-white/10 group-hover:shadow-[0_0_0_1px_rgba(62,123,250,0.1),0_8px_32px_rgba(0,0,0,0.5)]",
        "flex-col",
      )}>

        {/* Media section */}
        <div className={cn(
          "relative overflow-hidden bg-[#090D18]",
          "h-56 w-full",
        )}>
          {image ? (
            <>
              <div className="absolute inset-0 bg-black/40 z-10" />
              <div className={cn(
                "absolute inset-0 flex items-center justify-center p-6 z-10",
                useMobilePreview ? "pt-10" : "",
              )}>
                <div className={cn(
                  "relative h-full rounded-xl overflow-hidden border border-white/8 transition-transform duration-700 group-hover:scale-[1.03]",
                  useMobilePreview ? "w-full max-w-[150px]" : "w-full",
                )}>
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className={cn(useMobilePreview ? "object-contain" : "object-cover object-center")}
                  />
                </div>
              </div>
              {/* Bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#090D18] to-transparent z-20 pointer-events-none" />
            </>
          ) : (
            /* No image fallback — clean monogram */
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-6xl font-bold text-white/5 select-none">
                {title.charAt(0)}
              </span>
            </div>
          )}

          {/* Icon badge */}
          <div className="absolute top-4 left-4 z-30">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm border border-white/8 transition-colors group-hover:border-primary/20">
              <Icon className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Hover arrow */}
          <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-400">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/30 text-primary">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Cursor spotlight glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: spotlightBg }}
        />

        {/* Content section */}
        <div className={cn(
          "p-7 flex-1 flex flex-col justify-center",
        )}>
          {/* Category badge + title row */}
          <div className="flex items-center gap-3 mb-3">
            <span className={cn(
              "px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest rounded border",
              categoryColors[category] ?? categoryColors.system,
            )}>
              {category}
            </span>
          </div>

          <h3 className="font-display text-xl font-bold tracking-tight text-slate-100 mb-3 group-hover:text-white transition-colors">
            {title}
          </h3>

          <p className="text-sm text-slate-400 font-light leading-relaxed mb-6 line-clamp-3">
            {description}
          </p>

          {/* Tags */}
          <div className="mt-auto flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono px-2.5 py-1 text-[10px] uppercase tracking-wider border rounded border-white/6 bg-white/3 text-slate-500 group-hover:border-primary/20 group-hover:text-slate-400 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
