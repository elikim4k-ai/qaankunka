"use client";

import { motion, useReducedMotion } from "framer-motion";
import { architectureLayers } from "@/data/technology";

export function ArchitectureDiagram() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-2" role="list" aria-label="System architecture">
      {architectureLayers.map((layer, index) => (
        <div key={layer.id} className="flex w-full flex-col items-center" role="listitem">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className={`w-full rounded-lg border px-4 py-3 text-center font-mono text-xs uppercase tracking-wider ${
              layer.id === "orchestrator"
                ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
                : layer.id === "qml"
                  ? "border-accent-violet/40 bg-accent-violet/10 text-accent-violet"
                  : layer.id === "visual" || layer.id === "output"
                    ? "border-accent-teal/40 bg-accent-teal/10 text-accent-teal"
                    : "border-border bg-bg-card text-text-secondary"
            }`}
          >
            {layer.label}
          </motion.div>
          {index < architectureLayers.length - 1 && (
            <div className="flex h-4 items-center justify-center" aria-hidden="true">
              <svg className="h-3 w-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
