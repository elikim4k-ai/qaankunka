import type { ResearchStatus } from "./site";

export interface ResearchArea {
  id: string;
  title: string;
  status: ResearchStatus;
  description: string;
  topics: string[];
}

export const researchAreas: ResearchArea[] = [
  {
    id: "qml",
    title: "Quantum Machine Learning",
    status: "Research",
    description:
      "Investigating how quantum machine learning can contribute to visual learning, representation, pattern recognition and optimisation. Research directions include hybrid architectures where quantum and classical machine learning work together on visual data.",
    topics: [
      "Hybrid QML/classical ML architectures",
      "Quantum feature maps for visual data",
      "Variational quantum circuits for classification",
      "Quantum kernel methods",
    ],
  },
  {
    id: "quantum-optimization",
    title: "Quantum Optimization",
    status: "Experimental",
    description:
      "Exploring quantum and quantum-inspired optimisation for visual problems involving large combinatorial search spaces. Formulations include QUBO, Ising models, quantum annealing, and adiabatic optimisation approaches.",
    topics: [
      "QUBO formulations for visual constraints",
      "Ising models for pixel optimisation",
      "Quantum annealing experiments",
      "Adiabatic optimisation approaches",
    ],
  },
  {
    id: "hybrid-computing",
    title: "Hybrid Quantum-Classical Computing",
    status: "Research",
    description:
      "Developing architectures where classical and quantum systems complement each other. Classical systems handle data preprocessing and post-processing while quantum subroutines address specific sub-problems.",
    topics: [
      "Hybrid pipeline architectures",
      "Classical-quantum data interfaces",
      "Resource allocation strategies",
      "Benchmarking hybrid approaches",
    ],
  },
  {
    id: "agentic-orchestration",
    title: "Agentic Orchestration",
    status: "Prototype",
    description:
      "Designing multi-agent systems that coordinate specialised capabilities for complex visual workflows. Agents decompose objectives, select tools, and manage computational resources dynamically.",
    topics: [
      "Multi-agent visual workflows",
      "Dynamic tool selection",
      "Task decomposition strategies",
      "Quality gate orchestration",
    ],
  },
  {
    id: "quantum-visual-computing",
    title: "Quantum Visual Computing",
    status: "Experimental",
    description:
      "Applying quantum techniques specifically to imagery and video problems — including intelligent pixelation, representation optimisation, and visual constraint satisfaction.",
    topics: [
      "Intelligent pixelation research",
      "Visual representation optimisation",
      "Pixel-level constraint problems",
      "Image-to-video temporal optimisation",
    ],
  },
];
