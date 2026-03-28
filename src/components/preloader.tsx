"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
          className="fixed inset-0 z-10000 flex items-center justify-center bg-background"
        >
          {/* Dot grid background matching main page */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-4"
          >
            {/* Wordmark */}
            <span
              className="text-3xl font-bold tracking-tight text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              MA<span style={{ color: "#3E7BFA" }}>.</span>
            </span>

            {/* Thin animated progress line */}
            <motion.div
              className="h-px rounded-full w-12"
              style={{
                background: "#3E7BFA",
                transformOrigin: "left center",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
