"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StarProps {
  top: number;
  left: number;
  delay: number;
  duration: number;
}

export function AnimatedBackground() {
  const [stars, setStars] = useState<StarProps[]>([]);

  useEffect(() => {
    // Generate random stars on the client side to avoid hydration mismatch
    const generatedStars = Array.from({ length: 40 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#030014]">
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Twinkling Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
          className="absolute w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_2px_#fff]"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
        />
      ))}

      {/* Shooting Star 1 */}
      <motion.div
        initial={{ x: "100vw", y: -100, opacity: 0 }}
        animate={{ x: "-20vw", y: "40vh", opacity: [0, 1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-0 right-0 w-[150px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent -rotate-12 blur-[1px]"
      />

      {/* Shooting Star 2 (Different Angle) */}
      <motion.div
        initial={{ x: "120vw", y: 200, opacity: 0 }}
        animate={{ x: "-20vw", y: 800, opacity: [0, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 15,
          ease: "easeInOut",
          delay: 7
        }}
        className="absolute top-0 right-0 w-[200px] h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent -rotate-45 blur-[1px]"
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
        className="absolute top-[-10%] left-[-20%] md:top-[-20%] md:left-[-10%] w-[120vw] h-[120vw] md:w-[900px] md:h-[900px] bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 rounded-full blur-[80px] md:blur-[120px]"
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
        className="absolute bottom-[-10%] right-[-20%] md:bottom-[-20%] md:right-[-10%] w-[100vw] h-[100vw] md:w-[800px] md:h-[800px] bg-gradient-to-l from-cyan-500/30 to-blue-600/30 rounded-full blur-[80px] md:blur-[120px]"
      />

      {/* Accent Orb (Center Floating) */}
      <motion.div
        animate={{
          x: [-50, 50, -50],
          y: [-30, 30, -30],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[30%] left-[10%] md:left-[20%] w-[60vw] h-[60vw] md:w-[500px] md:h-[500px] bg-purple-500/20 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen"
      />

      {/* Drifting Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08] animate-[grid-scroll_20s_linear_infinite]"
        style={{
          backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}