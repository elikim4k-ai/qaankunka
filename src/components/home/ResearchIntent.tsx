"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface ProgressivePhraseProps {
  children: string;
  index: number;
  progress: MotionValue<number>;
  reducedMotion: boolean | null;
}

function ProgressivePhrase({ children, index, progress, reducedMotion }: ProgressivePhraseProps) {
  const start = index * 0.19;
  const opacity = useTransform(progress, [start, start + 0.23], [0.28, 1]);
  const y = useTransform(progress, [start, start + 0.23], [8, 0]);
  const color = useTransform(progress, [start, start + 0.23], ["#606078", "#f0f0f5"]);

  return (
    <motion.span
      className={reducedMotion ? "inline text-text-primary" : "inline"}
      style={reducedMotion ? undefined : { opacity, y, color }}
      aria-label={children}
    >
      {children}{" "}
    </motion.span>
  );
}

const phrases = [
  "We investigate emerging technologies through practical visual applications,",
  "moving from mathematical formulation",
  "through prototypes and demonstrators",
  "toward real-world deployment.",
];

export function ResearchIntent() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 45%"],
  });
  const signalWidth = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);

  return (
    <section ref={sectionRef} id="research-intent" className="relative min-h-[130svh] overflow-hidden px-5 sm:px-6 lg:min-h-[150svh] lg:px-8">
      <div className="container-wide relative h-full">
        <div className="flex min-h-[130svh] items-center py-24 md:sticky md:top-0 md:min-h-[100svh] lg:min-h-[100svh]">
          <div className="max-w-6xl">
            <div className="mb-10 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-cyan">
              <span>/03</span>
              <span className="h-px w-10 bg-accent-cyan/50" />
              Research intent
            </div>
            <p className="max-w-5xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-text-primary sm:text-5xl lg:text-7xl">
              {phrases.map((phrase, index) => (
                <ProgressivePhrase
                  key={phrase}
                  index={index}
                  progress={scrollYProgress}
                  reducedMotion={prefersReducedMotion}
                >
                  {phrase}
                </ProgressivePhrase>
              ))}
            </p>
            <div className="mt-12 max-w-2xl">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                <span>Idea → signal → system</span>
                <span>Scroll to reveal</span>
              </div>
              <div className="mt-3 h-px bg-border-accent">
                <motion.div
                  className="h-full bg-accent-cyan"
                  style={prefersReducedMotion ? { width: "100%" } : { width: signalWidth }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
