import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";
import { ApplicationCard } from "@/components/ui/Cards";
import { CTA } from "@/components/ui/CTA";
import { applications } from "@/data/applications";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "Qaankunka applies Quantum + AI visual intelligence to image understanding, video intelligence, creative systems, quantum visual computing, and agentic creative workflows.",
};

export default function ApplicationsPage() {
  return (
    <>
      <Section className="pt-32">
        <SectionHeader
          label="Applications"
          title="Visual intelligence in practice"
          description="Applying Quantum + AI technologies to real visual media problems — from image understanding and video intelligence to creative systems and agentic workflows."
        />
      </Section>

      <Section dark>
        <div className="grid gap-6 md:grid-cols-2">
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              title={app.title}
              description={app.description}
              items={app.items}
            />
          ))}
        </div>
      </Section>

      <Section>
        <CTA
          title="Discuss your visual intelligence needs."
          description="Whether you're exploring image intelligence, video processing, or agentic creative systems — we'd like to hear from you."
        />
      </Section>
    </>
  );
}
