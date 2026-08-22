"use client";

import { Section, SectionHeader } from "@/components/ui/SectionHeader";
import { FlowDiagram } from "@/components/ui/FlowDiagram";

export function QMLSection() {
  return (
    <Section id="qml">
      <SectionHeader
        label="Quantum Machine Learning"
        title="Quantum Machine Learning for Visual Intelligence"
        description="Qaankunka investigates how quantum machine learning can contribute to visual learning, representation, pattern recognition and optimisation, including hybrid architectures in which quantum and classical machine learning work together."
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <FlowDiagram
          accent="violet"
          steps={[
            { label: "Image / Video" },
            { label: "Feature Extraction" },
            { label: "Classical ML + QML" },
            { label: "Hybrid Intelligence" },
            { label: "Visual Understanding" },
          ]}
        />

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-bg-card p-6">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Hybrid Architecture</h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              Classical systems handle data preprocessing, feature extraction, and post-processing,
              while quantum subroutines address specific learning sub-problems where quantum
              representations may offer advantages.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-bg-card p-6">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Research Focus</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-violet" aria-hidden="true" />
                Quantum feature maps for visual data
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-violet" aria-hidden="true" />
                Variational quantum circuits for classification
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-violet" aria-hidden="true" />
                Hybrid QML/classical pipeline design
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function QuantumOptimizationSection() {
  return (
    <Section id="quantum-optimization" dark>
      <SectionHeader
        label="Quantum Optimization"
        title="Optimising complex visual decisions."
        description="Visual problems can involve extremely large combinatorial search spaces. Qaankunka investigates quantum and quantum-inspired optimisation for visual problems where large combinatorial search spaces make optimisation valuable."
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          {["QUBO", "Ising Models", "Quantum Annealing", "Adiabatic Optimisation", "Hybrid Optimisation"].map(
            (method) => (
              <div
                key={method}
                className="flex items-center gap-3 rounded-lg border border-border bg-bg-card px-4 py-3"
              >
                <span className="h-2 w-2 rounded-full bg-accent-cyan" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-wider text-text-primary">{method}</span>
              </div>
            )
          )}
        </div>

        <FlowDiagram
          accent="cyan"
          steps={[
            { label: "Many Possible Configurations" },
            { label: "Optimisation Landscape" },
            { label: "Candidate Solutions" },
            { label: "Selected Solution" },
          ]}
        />
      </div>
    </Section>
  );
}
