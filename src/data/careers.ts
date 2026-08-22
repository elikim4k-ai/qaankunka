export interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: string;
  department: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

export const jobPostings: JobPosting[] = [
  {
    id: "quantum-researcher-paris",
    title: "Quantum Researcher",
    location: "Paris, France",
    type: "Full-time",
    department: "Quantum Research",
    summary:
      "Investigate quantum machine learning and quantum optimisation approaches for visual intelligence problems, from mathematical formulation through prototype demonstrators.",
    responsibilities: [
      "Formulate visual computing problems as QUBO / Ising models suited to quantum and quantum-inspired solvers",
      "Design and evaluate quantum machine learning experiments for image and video feature representations",
      "Develop hybrid quantum-classical prototypes and benchmark them against classical baselines",
      "Publish findings and contribute to Qaankunka's research-to-product pipeline",
    ],
    requirements: [
      "PhD or equivalent research experience in quantum computing, physics, or a related field",
      "Hands-on experience with quantum frameworks (e.g. Qiskit, PennyLane, or D-Wave toolchains)",
      "Strong background in linear algebra, optimisation, and machine learning fundamentals",
      "Interest in applying quantum methods to image and video domains",
    ],
  },
  {
    id: "optical-engineer-dubai",
    title: "Optical Engineer",
    location: "Dubai, UAE",
    type: "Full-time",
    department: "Imaging Systems",
    summary:
      "Design and evaluate optical imaging pipelines that feed Qaankunka's visual intelligence stack, bridging physical image capture and computational processing.",
    responsibilities: [
      "Specify and test optical capture pipelines for image and video acquisition",
      "Characterise sensors, lenses, and illumination for computational imaging workflows",
      "Collaborate with AI teams to optimise capture parameters for downstream visual analysis",
      "Prototype imaging setups for research demonstrators",
    ],
    requirements: [
      "Degree in optical engineering, photonics, physics, or a related discipline",
      "Experience with imaging system design, calibration, and optical metrology",
      "Familiarity with image formation, sensor characteristics, and image-quality assessment",
      "Practical prototyping skills in a lab environment",
    ],
  },
];

export const categoryLabels: Record<string, string> = {
  "quantum-research": "Quantum research",
  qml: "QML collaboration",
  ai: "AI collaboration",
  agentic: "Agentic systems",
  creative: "Creative technology",
  "tech-partnership": "Technology partnerships",
  "research-partnership": "Research partnerships",
  business: "Business enquiries",
};
