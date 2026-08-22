"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { founderStoryPhrases } from "@/data/homepage";

interface PhraseBlockProps {
  phrase: (typeof founderStoryPhrases)[number];
  index: number;
  progress: MotionValue<number>;
  reducedMotion: boolean | null;
}

function PhraseBlock({ phrase, index, progress, reducedMotion }: PhraseBlockProps) {
  const step = 1 / founderStoryPhrases.length;
  const start = index * step;
  const end = start + step;

  const opacity = useTransform(progress, [start, end], [0.3, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  const color = useTransform(progress, [start, end], ["#606078", "#f0f0f5"]);

  if (reducedMotion) {
    return (
      <span className="block text-text-primary">
        {phrase.text}{" "}
      </span>
    );
  }

  return (
    <motion.span
      className="inline-block transition-colors duration-200"
      style={{ opacity, y, color }}
    >
      {phrase.text}{" "}
    </motion.span>
  );
}

interface NodeItemProps {
  index: number;
  activeStage: MotionValue<number>;
}

function NodeItem({ index, activeStage }: NodeItemProps) {
  const borderColor = useTransform(
    activeStage,
    (v) => (v >= index ? "rgba(255, 255, 255, 0.8)" : "rgba(60, 60, 80, 0.6)")
  );
  const color = useTransform(
    activeStage,
    (v) => (v >= index ? "#ffffff" : "#666677")
  );

  return (
    <motion.div
      className="rounded border border-border/60 bg-bg-elevated/80 py-2 transition-colors"
      style={{ borderColor, color }}
    >
      <div>N{index + 1}</div>
      <div className="text-[8px] opacity-70">
        {index === 0 ? "INIT" : index === 4 ? "OUT" : "PROC"}
      </div>
    </motion.div>
  );
}

function AsciiSignalGraphic({ progress }: { progress: MotionValue<number> }) {
  const nodeCount = 5;
  const signalWidth = useTransform(progress, [0, 1], ["10%", "100%"]);
  const activeStage = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 4]);

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-bg-card/90 p-6 shadow-2xl backdrop-blur-md">
      {/* Grid overlay */}
      <div className="interactive-grid absolute inset-0 opacity-40" />

      {/* Header telemetry */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-text-muted">
        <span className="flex items-center gap-2 text-accent-cyan">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-cyan" />
          /SYSTEM_SIGNAL
        </span>
        <span>LATENCY: 0.04ms</span>
      </div>

      {/* ASCII Node Topology Graphic */}
      <div className="relative z-10 my-8 space-y-4 font-mono text-xs leading-relaxed text-text-secondary">
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <span className="text-text-muted">[01] COORD</span>
          <span className="text-accent-cyan">· · · · · · · ·</span>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
          {Array.from({ length: nodeCount }).map((_, i) => (
            <NodeItem key={i} index={i} activeStage={activeStage} />
          ))}
        </div>

        <div className="rounded-lg border border-border/60 bg-bg-primary/80 p-3 text-[11px]">
          <div className="text-text-muted">TRANSFORMATION MATRIX:</div>
          <div className="mt-1 font-mono text-accent-cyan">
            GRID &#8594; SIGNAL &#8594; SYSTEM &#8594; IMPACT
          </div>
        </div>
      </div>

      {/* Footer signal progress bar */}
      <div className="relative z-10 space-y-1.5">
        <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-text-muted">
          <span>PROGRESSIVE REVEAL</span>
          <span className="text-white">ACTIVE</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-bg-elevated">
          <motion.div
            className="h-full bg-gradient-to-r from-white via-slate-200 to-slate-400"
            style={{ width: signalWidth }}
          />
        </div>
      </div>
    </div>
  );
}

export function FounderStory() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 30%"],
  });

  return (
    <section
      ref={containerRef}
      id="founders"
      className="relative min-h-[140svh] overflow-hidden px-5 sm:px-6 lg:min-h-[160svh] lg:px-8"
    >
      <div className="container-wide relative mx-auto">
        <div className="flex min-h-[140svh] flex-col justify-center py-24 md:sticky md:top-0 md:min-h-[100svh] lg:min-h-[100svh]">
          <div className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-cyan">
            <span>/FOUNDERS & BUILDERS</span>
            <span className="h-px w-10 bg-accent-cyan/50" />
            <span>THE PEOPLE BEHIND THE SYSTEM</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Scroll-Driven Highlighted Editorial Text */}
            <div className="lg:col-span-7">
              <p className="text-3xl font-semibold leading-[1.2] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                {founderStoryPhrases.map((phrase, index) => (
                  <PhraseBlock
                    key={phrase.concept}
                    phrase={phrase}
                    index={index}
                    progress={scrollYProgress}
                    reducedMotion={prefersReducedMotion}
                  />
                ))}
              </p>

              <div className="mt-8 flex items-center gap-6 font-mono text-xs text-text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent-cyan" />
                  Scroll to reveal story
                </span>
                <span>/03</span>
              </div>
            </div>

            {/* ASCII Node Topology Graphic */}
            <div className="lg:col-span-5">
              <AsciiSignalGraphic progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
