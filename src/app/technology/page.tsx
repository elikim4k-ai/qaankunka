import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";
import { TechnologyCard } from "@/components/ui/Cards";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { CTA } from "@/components/ui/CTA";
import {
  quantumTechnologies,
  aiTechnologies,
  agentTechnologies,
} from "@/data/technology";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Qaankunka's technology stack: Quantum Machine Learning, quantum optimization, artificial intelligence, agentic orchestration, and hybrid quantum-classical architectures for visual intelligence.",
};

export default function TechnologyPage() {
  return (
    <>
      <Section className="pt-32">
        <SectionHeader
          label="Technology"
          title="Quantum + AI + Agents"
          description="The technical foundation of Qaankunka's visual intelligence systems — combining quantum computing, artificial intelligence, and agentic orchestration."
        />
      </Section>

      <Section dark>
        <SectionHeader
          label="Quantum Computing"
          title="Quantum computational approaches"
          description="Exploring quantum machine learning, optimization, annealing, and hybrid quantum-classical architectures for visual problems."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quantumTechnologies.map((tech) => (
            <TechnologyCard key={tech.title} title={tech.title} description={tech.description} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          label="Artificial Intelligence"
          title="AI for visual intelligence"
          description="Machine learning, computer vision, generative AI, and image & video intelligence capabilities."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiTechnologies.map((tech) => (
            <TechnologyCard key={tech.title} title={tech.title} description={tech.description} />
          ))}
        </div>
      </Section>

      <Section dark>
        <SectionHeader
          label="Agentic Systems"
          title="Intelligent coordination"
          description="Multi-agent orchestration for decomposing complex visual objectives and coordinating specialised capabilities."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agentTechnologies.map((tech) => (
            <TechnologyCard key={tech.title} title={tech.title} description={tech.description} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          label="Hybrid Architecture"
          title="System architecture"
          description="How quantum, AI, and agentic layers combine to deliver visual intelligence for imagery and video."
          align="center"
        />
        <div className="mx-auto max-w-md">
          <ArchitectureDiagram />
        </div>
      </Section>

      <Section>
        <CTA
          title="Explore collaboration opportunities."
          description="Connect with Qaankunka to discuss quantum research, AI integration, and visual intelligence technology."
        />
      </Section>
    </>
  );
}
