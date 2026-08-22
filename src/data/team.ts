export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoPath: string;
  linkedinUrl: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "elijah",
    name: "Elijah",
    role: "Founder & CEO",
    photoPath: "/team/elijah.png",
    linkedinUrl: "https://www.linkedin.com/in/eli-kim-4k",
  },
  {
    id: "dingding",
    name: "Dingding",
    role: "Senior Machine Learning Engineer",
    photoPath: "/team/dingding.png",
    linkedinUrl: "https://www.linkedin.com/in/dingding-park-20a7b7278",
  },
];
