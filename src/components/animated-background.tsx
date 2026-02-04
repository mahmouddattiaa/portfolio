"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#030014]">
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Primary Glow (Top Left) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 rounded-full blur-[120px]"
      />

      {/* Secondary Glow (Bottom Right) */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-l from-cyan-500/30 to-blue-600/30 rounded-full blur-[120px]"
      />

      {/* Accent Orb (Center Floating) */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen"
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}
