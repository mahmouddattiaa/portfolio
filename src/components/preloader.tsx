"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Initializing...");

  const loadingText = [
    "Loading modules...",
    "Verifying system integrity...",
    "Connecting to neural net...",
    "Optimizing experience...",
    "System Ready."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500); // Reduced delay before unmounting
          return 100;
        }
        // Increased jump size for faster loading
        const jump = Math.floor(Math.random() * 20) + 5;
        return Math.min(prev + jump, 100);
      });
    }, 80); // Faster interval (was 150)

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setText(loadingText[Math.floor(Math.random() * loadingText.length)]);
    }, 400); // Faster text switching (was 900)
    return () => clearInterval(textTimer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#030014] text-white overflow-hidden"
        >
          <div className="w-64 space-y-4">
            {/* Terminal Icon */}
            <motion.div 
               initial={{ scale: 0.5, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="flex items-center gap-2 text-violet-400 font-mono text-sm mb-8"
            >
               <Terminal className="w-4 h-4" />
               <span>SYSTEM_BOOT_SEQUENCE</span>
            </motion.div>

            {/* Percentage */}
            <h1 className="text-6xl md:text-8xl font-bold font-mono tracking-tighter">
              {progress}%
            </h1>

            {/* Loading Bar */}
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>

            {/* Dynamic Text */}
            <div className="flex justify-between items-center text-xs font-mono text-zinc-500 h-4">
                <span>{text}</span>
                <span className="animate-pulse">_</span>
            </div>
          </div>

          {/* Background Noise/Grid */}
           <div className="absolute inset-0 pointer-events-none opacity-20" 
                style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
           />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
