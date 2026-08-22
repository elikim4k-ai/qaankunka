"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ResearchStatus } from "@/data/site";
import { researchStatusColors } from "@/data/site";

interface ResearchCardProps {
  title: string;
  description: string;
  status: ResearchStatus;
  topics: string[];
}

export function ResearchCard({ title, description, status, topics }: ResearchCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group rounded-xl border border-border bg-bg-card p-6 transition-colors hover:border-border-accent"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${researchStatusColors[status]}`}
        >
          {status}
        </span>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">{description}</p>
      <ul className="space-y-1.5">
        {topics.map((topic) => (
          <li key={topic} className="flex items-start gap-2 text-xs text-text-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan/60" aria-hidden="true" />
            {topic}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

interface TechnologyCardProps {
  title: string;
  description: string;
  items?: readonly string[];
}

export function TechnologyCard({ title, description, items }: TechnologyCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border bg-bg-card p-6 transition-all hover:border-border-accent hover:bg-bg-elevated"
    >
      <h3 className="mb-2 text-base font-semibold text-text-primary">{title}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
      {items && items.length > 0 && (
        <ul className="mt-4 space-y-1">
          {items.map((item) => (
            <li key={item} className="text-xs text-text-muted">
              {item}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

interface ApplicationCardProps {
  title: string;
  description: string;
  items: readonly string[];
}

export function ApplicationCard({ title, description, items }: ApplicationCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border bg-bg-card p-6 transition-all hover:border-border-accent"
    >
      <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">{description}</p>
      <ul className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-border/50 bg-bg-elevated px-3 py-2 text-xs text-text-secondary"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
