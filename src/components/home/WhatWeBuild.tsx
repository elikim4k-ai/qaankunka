"use client";

import { motion, useReducedMotion } from "framer-motion";
import { capabilities } from "@/data/homepage";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";

const iconPaths: Record<string, string> = {
  create: "M12 4.5v15m7.5-7.5h-15",
  understand: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  transform: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182",
  optimise: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  orchestrate: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6A2.25 2.25 0 0115.75 3.75H18a2.25 2.25 0 012.25 2.25V6A2.25 2.25 0 0118 8.25h-2.25A2.25 2.25 0 0113.5 6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
};

export function WhatWeBuild() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="capabilities">
      <SectionHeader
        label="What We Build"
        title="We build intelligence for visual media."
        description="Five core capabilities that span the full spectrum of visual intelligence — from creation and understanding to transformation, optimisation, and orchestration."
      />

      <div className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap, index) => (
          <motion.div
            key={cap.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="group border-t border-border py-7 transition-all hover:border-accent-cyan/60"
          >
            <div className="mb-7 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted">0{index + 1}</span>
              <svg
                className="h-5 w-5 text-accent-cyan transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={iconPaths[cap.icon]} />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold tracking-[-0.03em] text-text-primary">{cap.title}</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{cap.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
