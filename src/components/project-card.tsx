"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Share2, Database, ShieldCheck, Zap } from "lucide-react";
import clsx from "clsx";

interface ProjectCardProps {
  id: string; // Added ID
  iconName: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  link: string;
  index: number;
  onClick: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Zap,
  Share2,
  Database,
};

export function ProjectCard({ id, iconName, title, description, tags, color, index, onClick }: ProjectCardProps) {
  const Icon = iconMap[iconName] || Share2; // Fallback

  return (
    <motion.div
      layoutId={`project-${id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col justify-between p-8 h-full overflow-hidden border rounded-3xl glass-panel hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all cursor-pointer"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-6 h-6 text-cyan-400" />
      </div>
      
      <div className="space-y-4">
        <div className={clsx("w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-800/50 group-hover:scale-110 transition-transform duration-300", color)}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-violet-400 transition-colors font-mono">{title}</h3>
        <p className="text-zinc-400 leading-relaxed line-clamp-3">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-8">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-mono border rounded border-zinc-800 bg-zinc-900/50 text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
