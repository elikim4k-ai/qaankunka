"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-16">
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" aria-hidden="true" />
      <div
        className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent-cyan/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent-cyan/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent-violet/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-wide relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-center px-5 py-20 sm:px-6 lg:flex-row lg:items-center lg:gap-20 lg:px-8 lg:py-24">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex-1 text-center lg:text-left"
        >
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-text-muted">
            QUANTUM + AI + AGENTIC INTELLIGENCE
          </p>
          <h1 className="max-w-[12ch] text-4xl font-semibold leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-6xl xl:text-7xl">
            <span className="block text-white">ORCHESTRATE.</span>
            <span className="block text-white">OPTIMIZE.</span>
            <span className="text-gradient">DELIVER IMPACT.</span>
          </h1>
          <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.22em] text-text-secondary sm:text-sm">
            AI ORCHESTRATION &nbsp;|&nbsp; INTELLIGENT OPTIMIZATION &nbsp;|&nbsp; REAL-WORLD IMPACT
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg lg:mx-0">
            Qaankunka develops intelligent visual systems combining Quantum Machine Learning, quantum optimization, artificial intelligence, and agentic orchestration for images and video.
          </p>
          <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row lg:justify-start">
            <Link
              href="/technology"
              className="group inline-flex items-center justify-center gap-3 border border-white bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-200"
            >
              Explore Technology
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
            <Link
              href="/about"
              className="interactive-link justify-center px-2 py-3 text-text-secondary hover:text-white"
            >
              Discover Qaankunka
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mt-14 h-64 w-full max-w-xl flex-1 sm:h-80 lg:mt-0 lg:h-[30rem]"
        >
          <HeroVisual />
          <div className="pointer-events-none absolute top-5 left-5 border-l border-accent-cyan/50 pl-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan/80">
            Agent network / 01
          </div>
          <div className="pointer-events-none absolute right-5 bottom-5 border-r border-accent-violet/50 pr-3 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-accent-violet/80">
            Hybrid systems
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted lg:flex" aria-hidden="true">
        <span className="h-px w-10 bg-border-accent" /> Scroll to explore <span className="h-px w-10 bg-border-accent" />
      </div>
    </section>
  );
}
