import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/ui/CTA";
import { jobPostings } from "@/data/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Qaankunka — careers in quantum research and imaging systems. Open positions in Paris and Dubai.",
};

export default function CareersPage() {
  return (
    <>
      <Section className="pt-32">
        <SectionHeader
          label="Careers"
          title="Build the future of visual intelligence."
          description="Qaankunka brings together quantum research, artificial intelligence, and imaging systems. We are looking for people who want to work at the intersection of these fields."
          align="center"
        />
      </Section>

      <Section dark>
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {jobPostings.map((job) => (
            <article
              key={job.id}
              className="flex flex-col rounded-xl border border-border bg-bg-card p-6 transition-colors hover:border-border-accent"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded border border-border-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-cyan">
                  {job.department}
                </span>
                <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  {job.type}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-text-primary">{job.title}</h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-text-secondary">
                {job.location}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">{job.summary}</p>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Responsibilities
                  </h3>
                  <ul className="space-y-1.5 text-sm text-text-secondary">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="text-accent-cyan">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Requirements
                  </h3>
                  <ul className="space-y-1.5 text-sm text-text-secondary">
                    {job.requirements.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="text-accent-cyan">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <Link
                  href={`/careers/apply?role=${job.id}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-accent-cyan/40 bg-accent-cyan/15 px-5 py-2.5 text-sm font-medium text-accent-cyan transition-all hover:border-accent-cyan/60 hover:bg-accent-cyan/25"
                >
                  Apply
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <CTA
          title="Don’t see your role?"
          description="We are always interested in hearing from people working across quantum computing, AI, and visual media."
        />
      </Section>
    </>
  );
}
