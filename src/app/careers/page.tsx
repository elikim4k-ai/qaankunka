import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/ui/CTA";
import { CareersBoard } from "@/components/careers/CareersBoard";

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
        <CareersBoard />
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
