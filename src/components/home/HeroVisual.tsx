"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  glyph: string;
}

const GLYPHS = ["·", "+", "×", "○", "□", "∿"];

export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const prefersReducedMotion = useReducedMotion();

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(120, Math.floor((width * height) / 8000));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.5 ? 187 : 263,
      glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      // Reset before scaling so repeated resizes don't compound the transform.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };
    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const convergenceRadius = Math.min(width, height) * 0.15;

      particlesRef.current.forEach((p, i) => {
        const dx = cx - p.x;
        const dy = cy - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > convergenceRadius) {
          p.vx += dx * 0.00002;
          p.vy += dy * 0.00002;
        } else {
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (pointerRef.current.active) {
          const pointerDx = p.x - pointerRef.current.x;
          const pointerDy = p.y - pointerRef.current.y;
          const pointerDistance = Math.hypot(pointerDx, pointerDy);
          if (pointerDistance > 0 && pointerDistance < 150) {
            const force = (1 - pointerDistance / 150) * 0.025;
            p.vx += (pointerDx / pointerDistance) * force;
            p.vy += (pointerDy / pointerDistance) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (i % 3 === 0) {
          ctx.font = `${Math.max(8, p.size * 5)}px monospace`;
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.95})`;
          ctx.fillText(p.glyph, p.x - p.size, p.y + p.size);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 240, 245, ${p.opacity})`;
          ctx.fill();
        }
      });

      particlesRef.current.forEach((a, i) => {
        particlesRef.current.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * (1 - dist / 85)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, convergenceRadius * 2.2);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.12)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.04)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-bg-elevated"
        aria-hidden="true"
      >
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full border border-white/20 bg-white/5" />
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="surface-panel h-full w-full cursor-crosshair border border-border-accent/70"
      aria-hidden="true"
    />
  );
}
