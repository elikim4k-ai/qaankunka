import { Hero } from "@/components/home/Hero";
import { Convergence } from "@/components/home/Convergence";
import { ResearchIntent } from "@/components/home/ResearchIntent";
import { FounderStory } from "@/components/home/FounderStory";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { AgentWorkflow } from "@/components/home/AgentWorkflow";
import { QMLSection, QuantumOptimizationSection } from "@/components/home/QuantumSections";
import { PixelationDemo } from "@/components/home/PixelationDemo";
import { ImageToVideo, ResearchPipeline } from "@/components/home/ImageToVideo";
import { Section } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/ui/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Convergence />
      <FounderStory />
      <ResearchIntent />
      <WhatWeBuild />
      <AgentWorkflow />
      <QMLSection />
      <QuantumOptimizationSection />
      <PixelationDemo />
      <ImageToVideo />
      <ResearchPipeline />
      <Section>
        <CTA />
      </Section>
    </>
  );
}
