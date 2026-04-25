"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 75;
const CONNECTION_DIST = 140;
const MOUSE_REPEL_DIST = 180;
const MAX_SPEED = 0.35;

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      baseVx: number; baseVy: number;
      r: number; alpha: number;
    }

    let animId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const vx = (Math.random() - 0.5) * MAX_SPEED * 2;
        const vy = (Math.random() - 0.5) * MAX_SPEED * 2;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx, vy,
          baseVx: vx, baseVy: vy,
          r: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
        };
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw interactive mouse spotlight glow
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 500);
        gradient.addColorStop(0, "rgba(62, 123, 250, 0.06)");
        gradient.addColorStop(1, "rgba(62, 123, 250, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      // Move & wrap particles
      for (const p of particles) {
        // Mouse interaction (repel)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < MOUSE_REPEL_DIST) {
          const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
        } else {
          // Slowly return to base speed
          p.vx += (p.baseVx - p.vx) * 0.02;
          p.vy += (p.baseVy - p.vy) * 0.02;
        }

        // Apply velocity limit
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > MAX_SPEED * 3) {
          p.vx = (p.vx / speed) * MAX_SPEED * 3;
          p.vy = (p.vy / speed) * MAX_SPEED * 3;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x += w;
        else if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        else if (p.y > h) p.y -= h;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(62,123,250,${p.alpha})`;
        ctx.fill();
      }

      // Draw connections between particles
      for (let i = 0; i < particles.length - 1; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);

          if (d < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = (1 - d / CONNECTION_DIST) * 0.16;
            ctx.strokeStyle = `rgba(62,123,250,${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw connections to mouse
      for (let i = 0; i < particles.length; i++) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const d = Math.hypot(dx, dy);

        if (d < CONNECTION_DIST * 1.5) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = (1 - d / (CONNECTION_DIST * 1.5)) * 0.25;
          ctx.strokeStyle = `rgba(62,123,250,${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(tick);
    };

    setup();
    tick();

    const onResize = () => setup();
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 bg-background overflow-hidden">
      {/* Ambient blue color wash & Auroras */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-beam-1" />
      <div className="bg-beam-2" />
      
      {/* Interactive Particle constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Dot grid texture */}
      <div className="bg-dot-grid opacity-70" />
      
      {/* Bottom vignette */}
      <div className="bg-vignette-bottom" />
    </div>
  );
}
