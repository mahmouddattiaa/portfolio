"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 origin-left"
      style={{
        scaleX,
        height: "2px",
        background: "linear-gradient(90deg, #3E7BFA 0%, rgba(62,123,250,0.6) 100%)",
        boxShadow: "0 0 8px rgba(62,123,250,0.6)",
        zIndex: 200,
      }}
    />
  );
}
