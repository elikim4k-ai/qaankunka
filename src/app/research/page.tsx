import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";
import { ResearchCard } from "@/components/ui/Cards";
import { CTA } from "@/components/ui/CTA";
import { researchAreas } from "@/data/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Qaankunka's research in Quantum Machine Learning, quantum optimization, hybrid quantum-classical computing, agentic orchestration, and quantum visual computing.",
};

export default function ResearchPage() {
  return (
    <>
      <Section className="pt-32">
        <SectionHeader
          label="Research"
          title="Investigating the future of visual intelligence"
          description="Qaankunka conducts research at the intersection of quantum computing, artificial intelligence, and visual media — with clear status labelling for every research direction."
        />
      </Section>

      <Section dark>
        <div className="grid gap-6 md:grid-cols-2">
          {researchAreas.map((area) => (
            <ResearchCard
              key={area.id}
              title={area.title}
              description={area.description}
              status={area.status}
              topics={area.topics}
            />
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-xl border border-border bg-bg-card p-6 sm:p-8">
          <h3 className="mb-4 text-lg font-semibold text-text-primary">Research Status Guide</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { status: "Research", desc: "Early investigation and literature review" },
              { status: "Experimental", desc: "Active experimentation and prototyping" },
              { status: "Prototype", desc: "Working prototype under development" },
              { status: "Demonstrator", desc: "Interactive proof-of-concept available" },
              { status: "Product", desc: "Commercial product or service" },
            ].map((item) => (
              <div key={item.status} className="rounded-lg border border-border/50 bg-bg-elevated p-3">
                <p className="text-xs font-semibold text-text-primary">{item.status}</p>
                <p className="mt-1 text-[10px] text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <CTA
          title="Collaborate on research."
          description="We welcome research partnerships in quantum machine learning, visual computing, and agentic systems."
          secondaryLabel="View Technology"
          secondaryHref="/technology"
        />
      </Section>
    </>
  );
}
