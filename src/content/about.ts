export type AboutSkillPillar = {
  title: string;
  description: string;
  stack: string[];
};

export type AboutEvent = {
  title: string;
  date: string;
  project: string;
  description: string;
  skills: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  icon: string;
  category: string;
  colour: string;
};

export const skillPillars: AboutSkillPillar[] = [
  {
    title: "Frontend Engineering",
    description:
      "React and TypeScript applications with reusable component libraries, complex state management, interactive dashboards and polished user experiences.",
    stack: ["React", "TypeScript", "WebSockets", "Data Visualisation"],
  },
  {
    title: "AI & Automation",
    description:
      "Conversational AI, document intelligence, OCR pipelines, multi-agent workflows and workflow automation using Python and modern AI tooling.",
    stack: ["Python", "LLMs", "LangGraph", "OCR", "Automation"],
  },
  {
    title: "Backend & APIs",
    description:
      "Scalable backend services, REST APIs, asynchronous processing and full-stack integrations designed for resilient, real-time products.",
    stack: [
      "REST APIs",
      "Async Processing",
      "Python Services",
      "SQL",
      "Integrations",
    ],
  },
  {
    title: "Cloud & Delivery",
    description:
      "Engineering foundations including Docker, CI/CD pipelines, GitHub Actions, Azure, AWS, Terraform, secure configuration and reusable project templates.",
    stack: ["Azure", "AWS", "Docker", "Terraform", "GitHub Actions"],
  },
];

export const hackathons: AboutEvent[] = [
  {
    title: "IEEE Queens",
    date: "Oct 2020",
    project: "Belong",
    description:
      "Collaborated in a cross-functional team to design, prototype and pitch a community-focused mobile app helping people stay connected during COVID-19.",
    skills: ["Mobile App", "Product Design", "Pitching", "Teamwork"],
  },
  {
    title: "HACK THE COVID",
    date: "Aug 2020",
    project: "CovidCare",
    description:
      "Developed a digital solution to support remote patient monitoring for frontline healthcare workers, collaborating remotely with engineers across the UK.",
    skills: ["Remote Collaboration", "Healthcare Tech", "Rapid Prototype"],
  },
  {
    title: "Kainos",
    date: "Jul 2019",
    project: "Free Seat",
    description:
      "Built a web app concept helping customers view seating availability and estimated waiting times before arriving, achieving second place.",
    skills: ["HTML", "CSS", "JavaScript", "UX"],
  },
  {
    title: "Generation Innovation Programme",
    date: "Jun 2019",
    project: "Project Estimation Solution",
    description:
      "Led a hackathon team to design an innovative solution for project estimation challenges, creating the user flow and prototype before presenting to Oracle stakeholders.",
    skills: ["Leadership", "Prototyping", "User Flow", "Stakeholder Pitch"],
  },
  {
    title: "Girls Who ML",
    date: "Sep 2020",
    project: "Machine Learning Programme",
    description:
      "Completed a practical machine learning programme focused on Python, ML concepts, mentoring and collaborative learning with industry experts.",
    skills: ["Machine Learning", "Python", "AI", "Workshops"],
  },
];

export const certifications: Certification[] = [
  {
    title: "GitHub Copilot Certification",
    issuer: "GitHub",
    year: "2025",
    icon: "🤖",
    category: "AI Assisted Development",
    colour: "purple",
  },
  {
    title: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft",
    year: "2025",
    icon: "🧠",
    category: "Artificial Intelligence",
    colour: "blue",
  },
  {
    title: "PCEP™ – Certified Entry-Level Python Programmer",
    issuer: "Python Institute",
    year: "2025",
    icon: "🐍",
    category: "Python",
    colour: "green",
  },
  {
    title: "Linux Essentials Professional Development Certification",
    issuer: "Linux Professional Institute",
    year: "2024",
    icon: "🐧",
    category: "Linux",
    colour: "orange",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2023",
    icon: "☁️",
    category: "Cloud",
    colour: "yellow",
  },
  {
    title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    year: "2021",
    icon: "⚡",
    category: "Cloud",
    colour: "blue",
  },
];
