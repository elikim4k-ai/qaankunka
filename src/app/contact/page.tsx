import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/ui/ContactForm";
import { contactCategories } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Qaankunka for quantum research, QML collaboration, AI partnerships, agentic systems, creative technology, and business enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="pt-32">
        <SectionHeader
          label="Contact"
          title="Explore what's possible."
          description="Connect with Qaankunka to discuss research, collaboration, partnerships, and visual intelligence technology."
        />
      </Section>

      <Section dark>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-lg font-semibold text-text-primary">Enquiry Categories</h2>
            <ul className="space-y-3">
              {contactCategories.map((category) => (
                <li
                  key={category}
                  className="flex items-center gap-3 rounded-lg border border-border bg-bg-card px-4 py-3 text-sm text-text-secondary"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" aria-hidden="true" />
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-bg-card p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
