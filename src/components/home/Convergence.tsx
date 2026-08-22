"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { pillars } from "@/data/homepage";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";

const accentStyles = {
  cyan: {
    border: "border-accent-cyan/30 hover:border-accent-cyan/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]",
    dot: "bg-accent-cyan",
    text: "text-accent-cyan",
  },
  violet: {
    border: "border-accent-violet/30 hover:border-accent-violet/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]",
    dot: "bg-accent-violet",
    text: "text-accent-violet",
  },
  blue: {
    border: "border-accent-blue/30 hover:border-accent-blue/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
    dot: "bg-accent-blue",
    text: "text-accent-blue",
  },
};

export function Convergence() {
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="convergence" dark>
      <SectionHeader
        label="The Convergence"
        title="Three pillars. One intelligence."
        description="Quantum computing, artificial intelligence, and agentic orchestration converge into visual intelligence for imagery and video."
        align="center"
      />

      <div className="grid gap-px overflow-hidden border-y border-border md:grid-cols-3 md:bg-border">
        {pillars.map((pillar, index) => {
          const styles = accentStyles[pillar.accent];
          const isActive = activePillar === pillar.id;

          return (
            <motion.div
              key={pillar.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative cursor-pointer bg-bg-secondary p-7 transition-all duration-300 md:min-h-[19rem] ${styles.border} ${styles.glow}`}
              onMouseEnter={() => setActivePillar(pillar.id)}
              onMouseLeave={() => setActivePillar(null)}
              onFocus={() => setActivePillar(pillar.id)}
              onBlur={() => setActivePillar(null)}
              tabIndex={0}
              role="article"
              aria-label={`${pillar.title} pillar`}
            >
              <span className="mb-10 block font-mono text-[10px] tracking-[0.2em] text-text-muted">0{index + 1}</span>
              <div className="mb-4 flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${styles.dot}`} aria-hidden="true" />
                <h3 className={`font-mono text-sm font-semibold uppercase tracking-wider ${styles.text}`}>
                  {pillar.title}
                </h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">{pillar.description}</p>
              <ul className="space-y-2">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-text-muted">
                    <span className={`h-1 w-1 rounded-full ${styles.dot} opacity-60`} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              {isActive && !prefersReducedMotion && (
                <motion.div
                  layoutId="pillar-highlight"
                  className="absolute inset-0 border border-white/10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="mx-auto mb-6 flex items-center justify-center gap-4" aria-hidden="true">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-cyan/50" />
          <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-violet/50" />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
          Visual Intelligence
        </p>
        <p className="mt-2 text-2xl font-semibold text-text-primary sm:text-3xl">
          Images + Video
        </p>
      </motion.div>
    </Section>
  );
}
