import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/ui/CTA";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people behind Qaankunka — a team working across quantum research, machine learning, and visual intelligence.",
};

export default function TeamPage() {
  return (
    <>
      <Section className="pt-32">
        <SectionHeader
          label="Team"
          title="The people behind the system."
          description="Qaankunka is built by researchers and engineers working at the intersection of quantum computing, artificial intelligence, and visual media."
          align="center"
        />
      </Section>

      <Section dark>
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="rounded-xl border border-border bg-bg-card p-6 text-center transition-colors hover:border-border-accent"
            >
              <Image
                src={member.photoPath}
                alt={`${member.name} — ${member.role}`}
                width={160}
                height={160}
                className="mx-auto h-24 w-24 rounded-full border border-border-accent object-cover"
              />
              <h2 className="mt-5 text-lg font-semibold text-text-primary">{member.name}</h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-text-secondary">
                {member.role}
              </p>
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-text-secondary transition-all hover:border-accent-cyan/40 hover:text-accent-cyan"
              >
                LinkedIn
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <CTA
          title="Join the team."
          description="We are growing across quantum research and imaging systems. Explore open positions in Paris and Dubai."
          primaryLabel="View Careers"
          primaryHref="/careers"
          secondaryLabel="About Qaankunka"
          secondaryHref="/about"
        />
      </Section>
    </>
  );
}
