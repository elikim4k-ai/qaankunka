import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/ui/CTA";
import { aboutSections } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Qaankunka explores what becomes possible when Quantum Computing and Artificial Intelligence are treated as complementary technologies for visual intelligence.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32">
        <SectionHeader
          label="About"
          title="Building at the intersection of Quantum + AI."
          description="Qaankunka explores what becomes possible when Quantum Computing and Artificial Intelligence are treated as complementary technologies."
        />
      </Section>

      <Section dark>
        <div className="mx-auto max-w-3xl">
          <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
            Visual media combines enormous amounts of information, complex representations,
            creative intent, learning problems and optimisation challenges, making it a rich
            domain for exploring Quantum + AI.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aboutSections.map((section) => (
            <article
              key={section.id}
              className="rounded-xl border border-border bg-bg-card p-6 transition-colors hover:border-border-accent"
            >
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-accent-cyan">
                {section.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">{section.content}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section dark>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
            Complexity becoming intelligence.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            From pixels and frames through quantum and AI computation to agentic coordination —
            Qaankunka builds the systems that transform visual complexity into intelligent output.
          </p>
        </div>
      </Section>

      <Section>
        <CTA />
      </Section>
    </>
  );
}
