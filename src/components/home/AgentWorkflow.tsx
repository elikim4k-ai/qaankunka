"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { agentWorkflow } from "@/data/homepage";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";

const telemetry = [
  { label: "Vision", value: "86%", width: "86%" },
  { label: "Creative", value: "64%", width: "64%" },
  { label: "QML", value: "72%", width: "72%" },
  { label: "Optimisation", value: "91%", width: "91%" },
];

export function AgentWorkflow() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const selected = agentWorkflow.find((a) => a.id === selectedAgent);

  return (
    <Section id="agentic" dark>
      <SectionHeader
        label="Agentic Visual Intelligence"
        title="Intelligence that orchestrates itself."
        description="Qaankunka can use specialised agents to decompose complex visual objectives and coordinate the appropriate AI models, optimisation methods and computational resources."
        badge="Research Concept"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-2" role="list" aria-label="Agent workflow">
          {agentWorkflow.map((agent, index) => (
            <div key={agent.id} role="listitem">
              <button
                type="button"
                onClick={() =>
                  setSelectedAgent(selectedAgent === agent.id ? null : agent.id)
                }
                className={`group w-full rounded-lg border px-4 py-3 text-left transition-all ${
                  selectedAgent === agent.id
                    ? "border-accent-cyan/50 bg-accent-cyan/10"
                    : "border-border bg-bg-card hover:border-border-accent hover:bg-bg-elevated"
                }`}
                aria-expanded={selectedAgent === agent.id}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-primary">
                    {agent.label}
                  </span>
                  <svg
                    className={`h-4 w-4 text-text-muted transition-transform ${
                      selectedAgent === agent.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {index < agentWorkflow.length - 1 && (
                <div className="flex justify-center py-1" aria-hidden="true">
                  <div className="h-3 w-px bg-border-accent" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-accent-cyan">
                  {selected.label}
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-text-muted">Purpose</dt>
                    <dd className="mt-1 text-sm text-text-secondary">{selected.purpose}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-text-muted">Input</dt>
                    <dd className="mt-1 text-sm text-text-secondary">{selected.input}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-text-muted">Output</dt>
                    <dd className="mt-1 text-sm text-text-secondary">{selected.output}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-text-muted">Role</dt>
                    <dd className="mt-1 text-sm text-text-secondary">{selected.role}</dd>
                  </div>
                </dl>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[260px]"
              >
                <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-cyan">System view</p>
                    <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-text-primary">Orchestration map</h3>
                  </div>
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" aria-hidden="true" /> Concept
                  </span>
                </div>
                <p className="mb-7 text-sm leading-relaxed text-text-secondary">
                  A visual research concept for how specialist agents could be coordinated around a visual task.
                </p>
                <div className="space-y-5" aria-label="Conceptual agent activity levels">
                  {telemetry.map((item, index) => (
                    <div key={item.label}>
                      <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                      </div>
                      <div className="h-px overflow-hidden bg-border-accent">
                        <motion.span
                          className="block h-full bg-accent-cyan"
                          initial={prefersReducedMotion ? false : { width: 0 }}
                          whileInView={{ width: item.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-8 border-t border-border pt-4 text-xs text-text-muted">
                  Select an agent node to inspect its proposed role, input, and output.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
