"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";
import { FlowDiagram } from "@/components/ui/FlowDiagram";

const videoChallenges = [
  "Temporal consistency",
  "Motion analysis",
  "Object tracking",
  "Scene understanding",
  "Frame-to-frame continuity",
  "Visual quality",
  "Temporal optimisation",
];

export function ImageToVideo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="image-to-video" dark>
      <SectionHeader
        label="Image to Video"
        title="From pixels to moving worlds."
        description="Video introduces temporal complexity beyond static imagery — requiring consistency, motion understanding, and frame-to-frame coherence alongside visual quality."
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <FlowDiagram
          accent="blue"
          steps={[
            { label: "Image" },
            { label: "Visual Understanding" },
            { label: "Temporal Representation" },
            { label: "AI + Quantum / Optimisation" },
            { label: "Video" },
          ]}
        />

        <div>
          <div className="mb-6 overflow-hidden rounded-xl border border-border bg-bg-card">
            <div className="flex items-center gap-1 border-b border-border px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-red-500/60" aria-hidden="true" />
              <div className="h-2 w-2 rounded-full bg-yellow-500/60" aria-hidden="true" />
              <div className="h-2 w-2 rounded-full bg-green-500/60" aria-hidden="true" />
              <span className="ml-2 font-mono text-xs text-text-muted">timeline</span>
            </div>
            <div className="relative h-24 p-4" aria-hidden="true">
              <div className="absolute top-1/2 right-4 left-4 h-px bg-border-accent" />
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="absolute top-1/2 h-8 w-12 -translate-y-1/2 rounded border border-accent-blue/30 bg-accent-blue/10"
                  style={{ left: `${8 + i * 11}%` }}
                />
              ))}
              <div className="absolute top-1/2 left-[8%] h-3 w-3 -translate-y-1/2 rounded-full bg-accent-cyan" />
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-2">
            {videoChallenges.map((challenge) => (
              <li
                key={challenge}
                className="flex items-center gap-2 rounded-md border border-border/50 bg-bg-elevated px-3 py-2 text-xs text-text-secondary"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-accent-blue" aria-hidden="true" />
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function ResearchPipeline() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="research-pipeline">
      <SectionHeader
        label="Research to Application"
        title="From research to real-world impact."
        description="Qaankunka investigates emerging Quantum + AI technologies through practical visual applications, moving from research and mathematical formulation toward prototypes, demonstrators and commercial opportunities."
        align="center"
      />

      <div className="relative">
        <div
          className="absolute top-1/2 right-0 left-0 hidden h-px -translate-y-1/2 bg-border-accent lg:block"
          aria-hidden="true"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {[
            { label: "Research", description: "Investigating emerging approaches" },
            { label: "Algorithm", description: "Mathematical formulation" },
            { label: "Prototype", description: "Initial implementation" },
            { label: "Benchmark", description: "Systematic evaluation" },
            { label: "Demonstrator", description: "Interactive proof-of-concept" },
            { label: "Application", description: "Applied to visual problems" },
            { label: "Real-World Use", description: "Commercial deployment" },
          ].map((step, index) => (
            <motion.div
              key={step.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="relative rounded-lg border border-border bg-bg-card p-4 text-center transition-colors hover:border-border-accent"
            >
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-accent-cyan/30 bg-accent-cyan/10 font-mono text-xs text-accent-cyan">
                {index + 1}
              </div>
              <h3 className="text-xs font-semibold text-text-primary">{step.label}</h3>
              <p className="mt-1 text-[10px] leading-relaxed text-text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
