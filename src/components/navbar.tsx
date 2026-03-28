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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-white/6 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          Mahmoud<span className="text-primary">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "#projects", label: "Projects" },
            { href: "#experience", label: "Experience" },
            { href: "#contact", label: "Contact" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              {label}
            </a>
          ))}

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-300 rounded-md border border-white/8 hover:border-primary/40 hover:text-primary transition-all duration-200"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>

        {/* Mobile resume */}
        <div className="md:hidden">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <span className="sr-only">Resume</span>
            <FileText className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
