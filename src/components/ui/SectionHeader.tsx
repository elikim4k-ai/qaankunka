"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  badge?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  badge,
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  const headingAlignClass = align === "center" ? "mx-auto" : "";

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-14 max-w-3xl lg:mb-16 ${alignClass}`}
    >
      {label && (
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-accent-cyan">
          {label}
        </p>
      )}
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
          {badge}
        </span>
      )}
      <h2 className={`max-w-[15ch] text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-text-primary sm:text-5xl lg:text-6xl ${headingAlignClass}`}>
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function Section({ id, children, className = "", dark = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`section-padding ${dark ? "bg-bg-secondary" : ""} ${className}`}
    >
      <div className="container-wide">{children}</div>
    </section>
  );
}
