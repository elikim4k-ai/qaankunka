import { Suspense } from "react";
import type { Metadata } from "next";
import { Section } from "@/components/ui/SectionHeader";
import { ApplicationForm } from "@/components/careers/ApplicationForm";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply for a role at Qaankunka — quantum research and imaging systems positions.",
};

export default function ApplyPage() {
  return (
    <Section className="pt-32 pb-20">
      <Suspense>
        <ApplicationForm />
      </Suspense>
    </Section>
  );
}
