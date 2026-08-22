export const pillars = [
  {
    id: "quantum",
    title: "Quantum",
    accent: "cyan" as const,
    items: [
      "Quantum Machine Learning",
      "Quantum Optimization",
      "Quantum Annealing",
      "Hybrid Quantum-Classical",
    ],
    description:
      "Exploring quantum computational approaches for visual learning, representation, and optimisation problems.",
  },
  {
    id: "ai",
    title: "AI",
    accent: "violet" as const,
    items: [
      "Computer Vision",
      "Machine Learning",
      "Generative AI",
      "Image & Video Intelligence",
    ],
    description:
      "Applying perception, learning, and generation capabilities to understand and create visual media.",
  },
  {
    id: "agents",
    title: "Agents",
    accent: "blue" as const,
    items: [
      "Agentic AI",
      "Planning",
      "Reasoning",
      "Tool Selection",
      "Orchestration",
    ],
    description:
      "Coordinating specialised intelligence and computational resources through agentic orchestration.",
  },
] as const;

export const capabilities = [
  {
    id: "create",
    title: "Create",
    description:
      "AI-assisted creation of images and video, combining generative models with intelligent visual understanding.",
    icon: "create",
  },
  {
    id: "understand",
    title: "Understand",
    description:
      "Analyse images and video using AI, computer vision and emerging QML approaches for visual comprehension.",
    icon: "understand",
  },
  {
    id: "transform",
    title: "Transform",
    description:
      "Intelligently modify, enhance, stylise, reconstruct and transform visual media with precision.",
    icon: "transform",
  },
  {
    id: "optimise",
    title: "Optimise",
    description:
      "Apply classical, quantum-inspired and quantum optimisation to suitable visual problems and constraints.",
    icon: "optimise",
  },
  {
    id: "orchestrate",
    title: "Orchestrate",
    description:
      "Coordinate specialised agents, models, optimisation engines and computational resources.",
    icon: "orchestrate",
  },
] as const;

export const agentWorkflow = [
  {
    id: "user",
    label: "User / Creator",
    purpose: "Defines the visual objective and creative intent.",
    input: "Creative brief, reference images, constraints",
    output: "Structured visual objective",
    role: "Initiates the workflow with a defined goal.",
  },
  {
    id: "orchestrator-1",
    label: "Orchestrator",
    purpose: "Decomposes the objective and routes tasks to specialised agents.",
    input: "Visual objective",
    output: "Task plan and agent assignments",
    role: "Central coordination layer for the entire workflow.",
  },
  {
    id: "vision",
    label: "Vision Agent",
    purpose: "Analyses visual content and extracts semantic features.",
    input: "Images or video frames",
    output: "Visual features, scene understanding",
    role: "Provides perception and understanding capabilities.",
  },
  {
    id: "creative",
    label: "Creative Agent",
    purpose: "Interprets creative intent and proposes visual directions.",
    input: "Features, creative brief",
    output: "Creative specifications",
    role: "Bridges technical analysis with creative goals.",
  },
  {
    id: "qml",
    label: "QML Agent",
    purpose: "Evaluates quantum machine learning approaches for the task.",
    input: "Feature representations, learning objectives",
    output: "Hybrid ML/QML recommendations",
    role: "Investigates quantum-enhanced learning pathways.",
  },
  {
    id: "quantum-opt",
    label: "Quantum Optimization Agent",
    purpose: "Formulates suitable optimisation problems for visual constraints.",
    input: "Problem constraints, search space definition",
    output: "QUBO/Ising formulations, candidate solutions",
    role: "Applies quantum and quantum-inspired optimisation.",
  },
  {
    id: "generation",
    label: "Generation Agent",
    purpose: "Executes image or video generation using selected models.",
    input: "Specifications, model parameters",
    output: "Generated visual media",
    role: "Produces the visual output through AI generation.",
  },
  {
    id: "quality",
    label: "Quality Agent",
    purpose: "Evaluates output quality against objectives and constraints.",
    input: "Generated media, quality criteria",
    output: "Quality assessment, refinement suggestions",
    role: "Ensures output meets defined standards.",
  },
  {
    id: "orchestrator-2",
    label: "Orchestrator",
    purpose: "Integrates results and delivers final output.",
    input: "Agent outputs, quality assessment",
    output: "Final image or video",
    role: "Completes the workflow and returns results.",
  },
  {
    id: "output",
    label: "Final Image / Video",
    purpose: "The completed visual output.",
    input: "Validated media",
    output: "Delivered visual intelligence result",
    role: "End product of the agentic visual pipeline.",
  },
] as const;

export const researchPipeline = [
  { id: "research", label: "Research", description: "Investigating emerging Quantum + AI approaches" },
  { id: "algorithm", label: "Algorithm", description: "Mathematical formulation and method design" },
  { id: "prototype", label: "Prototype", description: "Initial implementation and validation" },
  { id: "benchmark", label: "Benchmark", description: "Systematic evaluation against baselines" },
  { id: "demonstrator", label: "Demonstrator", description: "Interactive proof-of-concept" },
  { id: "application", label: "Application", description: "Applied to real visual problems" },
  { id: "real-world", label: "Real-World Use", description: "Commercial and practical deployment" },
] as const;

export const founderStoryPhrases = [
  {
    text: "We work with quantum researchers, AI visionaries, and computational pioneers",
    highlight: "quantum researchers, AI visionaries & pioneers",
    concept: "FOUNDERS & BUILDERS",
  },
  {
    text: "who see visual intelligence through a different mathematical lens",
    highlight: "see visual intelligence through a different lens",
    concept: "PERSPECTIVE",
  },
  {
    text: "build what does not yet exist across hybrid quantum-classical architectures",
    highlight: "build what does not yet exist",
    concept: "CREATION",
  },
  {
    text: "and turn complex mathematical theory into visual systems that create meaningful impact.",
    highlight: "turn theory into meaningful impact",
    concept: "SYSTEM IMPACT",
  },
] as const;

