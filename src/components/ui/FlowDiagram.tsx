"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FlowStep {
  label: string;
  description?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  accent?: "cyan" | "violet" | "blue";
}

const accentColors = {
  cyan: "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
  violet: "border-accent-violet/30 bg-accent-violet/10 text-accent-violet",
  blue: "border-accent-blue/30 bg-accent-blue/10 text-accent-blue",
};

export function FlowDiagram({ steps, accent = "cyan" }: FlowDiagramProps) {
  const prefersReducedMotion = useReducedMotion();
  const colorClass = accentColors[accent];

  return (
    <div className="flex flex-col items-center gap-2" role="list" aria-label="Process flow">
      {steps.map((step, index) => (
        <div key={step.label} className="flex w-full flex-col items-center" role="listitem">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className={`w-full max-w-md rounded-lg border px-4 py-3 text-center ${colorClass}`}
          >
            <span className="font-mono text-xs font-medium uppercase tracking-wider">
              {step.label}
            </span>
            {step.description && (
              <p className="mt-1 text-xs text-text-secondary">{step.description}</p>
            )}
          </motion.div>
          {index < steps.length - 1 && (
            <div className="flex h-6 items-center justify-center" aria-hidden="true">
              <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
