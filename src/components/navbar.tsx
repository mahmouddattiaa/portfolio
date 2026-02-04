"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/50 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold font-mono text-white tracking-tighter hover:text-violet-400 transition-colors">
          MAHMOUD<span className="text-violet-500">.DEV</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#projects" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Projects
          </a>
          <a href="#experience" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Experience
          </a>
          <a href="#contact" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Contact
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white bg-violet-600/90 rounded-full hover:bg-violet-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all"
          >
            <FileText className="w-3 h-3" />
            Resume
          </a>
        </div>
        
        {/* Mobile Resume Link */}
        <div className="md:hidden flex items-center gap-4">
             <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
             className="text-zinc-400 hover:text-white transition-colors">
                <span className="sr-only">Resume</span>
                <FileText className="w-5 h-5" />
            </a>
        </div>
      </div>
    </motion.nav>
  );
}
