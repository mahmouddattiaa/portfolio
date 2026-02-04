"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex flex-col justify-center min-h-[85vh] px-6 py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-full text-violet-300 border-violet-500/30 bg-violet-500/10 font-mono shadow-[0_0_15px_rgba(139,92,246,0.3)] backdrop-blur-md"
        >
          <Terminal className="w-4 h-4 mr-2" />
          <span className="flex w-2 h-2 mr-2 bg-fuchsia-500 rounded-full animate-pulse shadow-[0_0_10px_#d946ef]" />
          System.out.println(&quot;Hello World&quot;);
        </motion.div>

        <div className="space-y-2">
            <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl font-mono text-white"
            >
            Architecting <br />
            </motion.h1>
            
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 0.5, ease: "linear" }}
                className="overflow-hidden whitespace-nowrap border-r-4 border-fuchsia-500 pr-5"
            >
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-fuchsia-400 text-5xl md:text-7xl lg:text-8xl font-bold font-mono animate-gradient-x text-glow">
                    Scalable Systems
                 </span>
            </motion.div>
        
            <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl font-mono text-white"
            >
            in Egypt & Beyond.
            </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="max-w-2xl text-lg text-zinc-300 md:text-xl font-light leading-relaxed"
        >
          I bridge the gap between <span className="text-white font-mono border-b border-cyan-500/50">complex infrastructure</span> and smooth user experiences. 
          Specializing in High-Performance Web, Mobile, and Distributed Systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="flex flex-col gap-5 sm:flex-row"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold uppercase transition-all bg-white text-black rounded hover:bg-zinc-200 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            View Code
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold uppercase transition-all border border-white/20 rounded text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
          >
            <FileText className="w-5 h-5 mr-2" />
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}
