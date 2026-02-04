"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Share2, Database, ShieldCheck, Zap, Brain } from "lucide-react";
import clsx from "clsx";
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

const ROTATION_RANGE = 20.5; // Decreased for subtlety
const HALF_ROTATION_RANGE = 20.5 / 2;

export function ProjectCardPremium({ iconName, title, description, tags, color, index, onClick }: ProjectCardProps) {
  const Icon = iconMap[iconName] || Share2;
  
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Generate a unique gradient based on the project's color class
  const getGradient = (colorClass: string) => {
    if (colorClass.includes("emerald")) return "from-emerald-600 via-teal-900 to-black";
    if (colorClass.includes("blue")) return "from-blue-600 via-indigo-900 to-black";
    if (colorClass.includes("yellow")) return "from-amber-500 via-orange-900 to-black";
    if (colorClass.includes("purple")) return "from-purple-600 via-fuchsia-900 to-black";
    if (colorClass.includes("red")) return "from-red-600 via-rose-900 to-black";
    return "from-zinc-500 via-zinc-900 to-black";
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ transformStyle: "preserve-3d", transform }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-full cursor-pointer group rounded-3xl"
    >
        {/* Glow Effect behind card */}
        <div 
            style={{ transform: "translateZ(-50px)" }}
            className={clsx("absolute inset-4 rounded-3xl blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-500", color.split(" ")[0].replace("/10", ""))} 
        />

        <div className="relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:border-white/20">
            
            {/* Abstract Header Image */}
            <div className={`h-48 w-full relative overflow-hidden bg-gradient-to-br ${getGradient(color)}`}>
                <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                
                <div className="absolute top-6 left-6">
                    <div className={clsx("w-12 h-12 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg", color.split(" ")[1])}>
                         <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
                    <div className="p-3 rounded-full bg-white text-black shadow-lg hover:scale-110 transition-transform">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all font-mono">
                    {title}
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                    {description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider border rounded-full border-white/5 bg-white/5 text-zinc-300"
                    >
                        {tag}
                    </span>
                    ))}
                    {tags.length > 3 && (
                         <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider border rounded-full border-white/5 bg-white/5 text-zinc-500">
                         +{tags.length - 3}
                     </span>
                    )}
                </div>
            </div>
        </div>
    </motion.div>
  );
}
