export const siteConfig = {
  name: "Qaankunka",
  tagline: "Quantum + AI + Agents. Intelligence for Images and Video.",
  description:
    "Qaankunka develops Quantum + AI technologies combining Quantum Machine Learning, quantum optimization, artificial intelligence and agentic systems for intelligent imagery and video.",
  url: "https://qaankunka.com",
};

export const navigation = [
  { label: "Technology", href: "/technology" },
  { label: "Applications", href: "/applications" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Ecosystem", href: "/ecosystem" },
] as const;

export const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Technology", href: "/technology" },
  { label: "Applications", href: "/applications" },
  { label: "Research", href: "/research" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const contactCategories = [
  "Quantum research",
  "QML collaboration",
  "AI collaboration",
  "Agentic systems",
  "Creative technology",
  "Technology partnerships",
  "Research partnerships",
  "Business enquiries",
] as const;

export type ResearchStatus =
  | "Research"
  | "Experimental"
  | "Prototype"
  | "Demonstrator"
  | "Product";

export const researchStatusColors: Record<ResearchStatus, string> = {
  Research: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Experimental: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Prototype: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Demonstrator: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Product: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};
