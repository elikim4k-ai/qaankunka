import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/ui/CTA";
import { ecosystemCategories } from "@/data/about";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "An ecosystem for Quantum + AI innovation — connecting quantum hardware providers, AI companies, universities, research institutions, creators, and technology partners.",
};

export default function EcosystemPage() {
  return (
    <>
      <Section className="pt-32">
        <SectionHeader
          label="Ecosystem"
          title="An ecosystem for Quantum + AI innovation."
          description="Qaankunka is building connections across the quantum computing, artificial intelligence, and visual media ecosystems."
          align="center"
        />
      </Section>

      <Section dark>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ecosystemCategories.map((category) => (
            <article
              key={category.id}
              className="rounded-xl border border-border bg-bg-card p-6 transition-colors hover:border-border-accent"
            >
              <h3 className="mb-2 text-sm font-semibold text-text-primary">{category.title}</h3>
              <p className="text-xs leading-relaxed text-text-secondary">{category.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-text-muted">
            Qaankunka does not list specific partnerships unless formally established.
            The categories above indicate ecosystem areas we are actively exploring.
          </p>
        </div>
      </Section>

      <Section>
        <CTA
          title="Join the ecosystem."
          description="Interested in partnering with Qaankunka? We welcome conversations with organisations across the Quantum + AI landscape."
        />
      </Section>
    </>
  );
}
