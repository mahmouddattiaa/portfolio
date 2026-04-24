"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";

const COMMANDS = {
  help: "Available commands: about, skills, contact, clear, projects",
  about: "Mahmoud Attia: Mobile and backend developer focused on bots, AI integrations, and production mobile apps.",
  skills: "Core Stack: Flutter, React Native, Python, FastAPI, Node.js, Kotlin, WireGuard, Gemini/OpenAI.",
  contact: "Direct Link: https://wa.me/201061977283 | Email: mahmouddattia7@gmail.com",
  projects: "Top Projects: HS VPN, Faseeh AI Keyboard, Classroom Sentinel, Focus Ritual.",
};

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(["Welcome to Mahmoud Terminal. Type 'help' to begin."]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    if (!cmd) return;

    let response = "";
    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (COMMANDS[cmd as keyof typeof COMMANDS]) {
      response = COMMANDS[cmd as keyof typeof COMMANDS];
    } else {
      response = `Command not found: ${cmd}. Type 'help' for options.`;
    }

    setHistory((prev) => [...prev, `> ${input}`, response]);
    setInput("");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-surface border border-white/10 text-primary shadow-2xl hover:scale-110 transition-transform group"
        aria-label="Open Terminal"
      >
        <TerminalIcon className="w-5 h-5" />
        <span className="absolute left-14 bg-surface border border-white/10 px-2 py-1 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          SYSTEM_TERM.exe
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 left-6 z-50 w-[90vw] md:w-[450px] h-[400px] bg-[#0A0F1A] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                <span className="text-[10px] text-slate-500 ml-2">mahmoud_shell — bash</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto text-xs space-y-2 no-scrollbar"
            >
              {history.map((line, i) => (
                <div key={i} className={line.startsWith(">") ? "text-primary" : "text-slate-300"}>
                  {line}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleCommand} className="p-4 bg-white/3 flex items-center gap-2">
              <span className="text-primary tracking-tighter">mahmoud@builder:~$</span>
              <input
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none text-slate-100 flex-1"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
