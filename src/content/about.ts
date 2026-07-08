export type AboutEvent = {
  title: string;
  date: string;
  project: string;
  description: string;
  skills: string[];
  ctaLabel?: string;
  linkUrl?: string;
};

export type EducationHighlight = {
  title: string;
  year: string;
  institution: string;
  description: string;
  ctaLabel?: string;
  linkUrl?: string;
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  icon: string;
  category?: string;
  colour: string;
  description?: string;
  badgeLabel?: string;
  ctaLabel?: string;
  linkUrl?: string;
};

export const hackathons: AboutEvent[] = [
  {
    title: "IEEE Queens",
    date: "Oct 2020",
    project: "Belong",
    description:
      "Developed CovidCare, a digital remote patient-monitoring concept for frontline healthcare workers. Collaborated remotely with engineers across the UK to rapidly prototype a healthcare technology solution.",

    skills: ["Mobile App", "Product Design", "COVID-19", "Pitching", "Teamwork"],
    ctaLabel: "View Pitch",
    linkUrl:
      "https://docs.google.com/presentation/d/1AEtKuR0gml034tLSEvinJWR1MPdUNq9DGxE66miEeSM/edit?slide=id.g72b44a6fb6_1_0#slide=id.g72b44a6fb6_1_0",
  },
  {
    title: "HACK THE COVID",
    date: "Aug 2020",
    project: "CovidCare",
    description:
      "Designed and pitched CovidCare, a community-focused mobile app concept created during COVID-19 to help people stay connected. Worked in a cross-functional team across product design, prototyping and pitching.",
    skills: ["Healthcare Tech", "Remote Monitoring", "Rapid Prototype", "Collaboration"],
    ctaLabel: "View Pitch",
    linkUrl:
      "https://docs.google.com/presentation/d/11frJHdswiXw-bfcagJTd2thd0owkcj9vofnQpVD0UUQ/edit?slide=id.gab36fa5d25_0_0#slide=id.gab36fa5d25_0_0",
  },
  {
    title: "Kainos",
    date: "Jul 2019",
    project: "Free Seat",
    description:
      "Built Free Seat, a web app concept that allowed customers to check seating availability and estimated wait times before arriving. Developed the prototype using HTML, CSS and JavaScript and achieved second place.",
    skills: ["HTML", "CSS", "JavaScript", "UX", "Second Place"],
    ctaLabel: "View Pitch",
    linkUrl:
      "https://docs.google.com/presentation/d/1OlEzC7h7AADfszcFuMQkYomQM-st87Utzl4fexrFOQs/edit",
  },
  {
    title: "Generation Innovation Programme",
    date: "Jun 2019",
    project: "Project Estimation Solution",
    description:
      "Led a hackathon team to design a project-estimation solution, translating business requirements into a clear user flow and interactive prototype before presenting to Oracle stakeholders.",
    skills: ["Leadership", "Prototyping", "User Flow", "Stakeholder Pitch"],
    ctaLabel: "View Report",
  },
  {
    title: "Girls Who ML",
    date: "Sep 2020",
    project: "Machine Learning Programme",
    description:
      "Completed a practical machine-learning programme focused on Python, ML concepts, mentoring and collaborative learning with industry experts, including a Microsoft Machine Learning Engineer.",
    skills: ["Machine Learning", "Python", "AI", "Workshops"],
  },
];

export const educationHighlights: EducationHighlight[] = [
  {
    title: "First Class Honours",
    year: "2024",
    institution: "Software Development with Digital Partnership",
    description:
      "Queen's University Belfast. Selected Specialisation: Video Analytics and Machine Learning. Dissertation: Developed Binder, an offline-first knowledge management platform enabling NGOs to deliver training materials in low-connectivity environments using a modular wiki-style architecture.",
    ctaLabel: "View Dissertation",
    linkUrl: "https://drive.google.com/file/d/1DxFlixZ4t9lkeX-IR0aUalk2ANK3XwPe/view",
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
    title: "Women in Tech - Outstanding Apprentice of the Year",
    issuer:
      "Recognised as a finalist for the Outstanding Apprentice of the Year award celebrating technical excellence, innovation, professional growth and impact within the technology industry.",
    year: "2024",
    icon: "🏆",
    category: "AWARD FINALIST",
    colour: "gold",
  },
  {
    title: "Sensata Technologies - Gold Crest Award",
    issuer:
      "Awarded for research contribution on Wake-Up Radio (WuR) receiver analysis and power-optimisation tooling.",
    year: "2019",
    icon: "🥇",
    colour: "gold",
    ctaLabel: "View Report",
    linkUrl: "https://drive.google.com/file/d/1j__SZS3WnVGvi3ePXLDs3GIstBrw8l7j/view",
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
