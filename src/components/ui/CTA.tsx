import Link from "next/link";

interface CTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTA({
  title = "Explore what's possible.",
  description = "Connect with Qaankunka to discuss Quantum + AI research, collaboration, and visual intelligence.",
  primaryLabel = "Connect",
  primaryHref = "/contact",
  secondaryLabel = "View Research",
  secondaryHref = "/research",
}: CTAProps) {
  return (
    <div className="surface-panel relative overflow-hidden border-y border-border-accent p-8 sm:p-12 lg:p-20">
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-accent-cyan/5 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent-violet/5 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent-cyan">Start a conversation</p>
        <h2 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-text-primary sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={primaryHref}
            className="group inline-flex items-center justify-center gap-3 border border-accent-cyan/50 bg-accent-cyan px-6 py-3.5 text-sm font-semibold text-bg-primary transition-all hover:-translate-y-0.5 hover:bg-[#7be8f6]"
          >
            {primaryLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
          <Link
            href={secondaryHref}
            className="interactive-link justify-center px-2 py-3 text-text-secondary hover:text-text-primary"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
