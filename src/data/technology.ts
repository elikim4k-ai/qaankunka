export const quantumTechnologies = [
  {
    title: "Quantum Machine Learning",
    description:
      "Investigating how quantum circuits and hybrid architectures can contribute to visual learning and pattern recognition.",
  },
  {
    title: "Quantum Optimization",
    description:
      "Exploring quantum and quantum-inspired methods for combinatorial visual problems with large search spaces.",
  },
  {
    title: "Quantum Annealing",
    description:
      "Evaluating annealing-based approaches for suitable visual optimisation formulations.",
  },
  {
    title: "Adiabatic Computing",
    description:
      "Researching adiabatic quantum computing for specific visual representation problems.",
  },
  {
    title: "QUBO Formulations",
    description:
      "Developing Quadratic Unconstrained Binary Optimization models for visual constraint problems.",
  },
  {
    title: "Ising Models",
    description:
      "Applying Ising model formulations to pixel-level and feature-level visual optimisation.",
  },
  {
    title: "Hybrid Quantum-Classical",
    description:
      "Building architectures where quantum and classical computation work together for visual intelligence.",
  },
] as const;

export const aiTechnologies = [
  {
    title: "Machine Learning",
    description:
      "Classical and deep learning approaches for visual data analysis, classification, and prediction.",
  },
  {
    title: "Computer Vision",
    description:
      "Image and video understanding through feature extraction, detection, segmentation, and scene analysis.",
  },
  {
    title: "Generative AI",
    description:
      "AI-assisted creation of images and video through diffusion models, transformers, and hybrid approaches.",
  },
  {
    title: "Image Intelligence",
    description:
      "Comprehensive image understanding, transformation, and optimisation capabilities.",
  },
  {
    title: "Video Intelligence",
    description:
      "Temporal reasoning, motion analysis, and frame-to-frame consistency for video media.",
  },
] as const;

export const agentTechnologies = [
  {
    title: "Agent Orchestration",
    description:
      "Coordinating multiple specialised agents to decompose and execute complex visual objectives.",
  },
  {
    title: "Planning",
    description:
      "Strategic task decomposition and workflow planning for multi-step visual pipelines.",
  },
  {
    title: "Reasoning",
    description:
      "Logical inference over visual constraints, creative goals, and computational resources.",
  },
  {
    title: "Task Decomposition",
    description:
      "Breaking complex visual objectives into manageable sub-tasks for specialised agents.",
  },
  {
    title: "Tool Selection",
    description:
      "Dynamic selection of AI models, optimisation engines, and computational backends.",
  },
  {
    title: "Workflow Coordination",
    description:
      "Managing data flow, dependencies, and quality gates across the visual intelligence pipeline.",
  },
] as const;

export const architectureLayers = [
  { id: "user", label: "User" },
  { id: "orchestrator", label: "Agentic Orchestrator" },
  { id: "ai", label: "AI Layer" },
  { id: "qml", label: "QML / Quantum Layer" },
  { id: "optimisation", label: "Optimisation Layer" },
  { id: "classical", label: "Classical Computing" },
  { id: "visual", label: "Visual Intelligence" },
  { id: "output", label: "Image / Video" },
] as const;
