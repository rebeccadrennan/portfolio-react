export type Skill = {
  name: string;
  description: string;
  years: number;
  exams?: string[];
};

export type PortfolioItem = {
  title: string;
  summary: string;
  tech: string[];
  category: string;
  visibility: "Public" | "Private";
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
};

export type SocialProfiles = {
  github: string;
  linkedin: string;
  codepen: string;
};

export const logotext = "REBECCA";

export const meta = {
  title: "Rebecca Drennan Tech",
  description:
    "I’m Rebecca Drennan, a full-stack developer building user-friendly web and mobile applications.",
};

export const introdata = {
  title: "Hi, I'm Rebecca",
  animated: {
    first: "Mobile and web apps",
    second: "Proof of concepts",
    third: "Maintainable code",
  },
  description:
    "I’m a full-stack engineer with 6+ years of experience across React, TypeScript, Python, AI-enabled products and cloud engineering. I enjoy working end-to-end: shaping requirements, designing clean architecture, building intuitive interfaces, integrating backend services and shipping solutions that create real business value.",
  your_img_url: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d",
};

export const dataabout = {
  title: "A bit about myself",
  aboutme:
    "I enjoy turning ideas into practical products, from early proof of concepts to polished applications. My focus is on clean, maintainable code and thoughtful user experiences.",
};

export const worktimeline = [
  {
    jobtitle: "Designer of week",
    where: "YAdfi",
    date: "2020",
  },
  {
    jobtitle: "Designer of week",
    where: "Jamalya",
    date: "2019",
  },
  {
    jobtitle: "Designer of week",
    where: "ALquds",
    date: "2019",
  },
];

export const skills: Skill[] = [
  {
    name: "React",
    description:
      "Building dynamic, responsive web applications using modern React frameworks, with a focus on maintainable and scalable code.",
    years: 3,
  },
  {
    name: "React Native",
    description: "I have built an app for youth organisation ",
    years: 1,
  },
  {
    name: "JavaScript",
    description:
      "Proficient in modern JavaScript for front-end and back-end development, building efficient and maintainable applications.",
    years: 3,
  },
  {
    name: "Python",
    description: "Strong background in scripting, automation, and backend APIs.",
    exams: ["PCEP™"],
    years: 1,
  },
  {
    name: "Command Line",
    description:
      "Comfortable navigating and scripting in the command line environment for Linux and Windows systems.",
    exams: ["Linux Essentials"],
    years: 1,
  },
  {
    name: "AI",
    description:
      "Experience building AI proof-of-concepts and experimenting with machine learning models.",
    exams: ["Microsoft Certified: Azure AI Fundamentals"],
    years: 1,
  },
  {
    name: "Cloud Platforms",
    description:
      "Experience with cloud infrastructure and deployment, including AWS, Azure, and Google Cloud. Hands-on experience hosting web applications and leveraging cloud services effectively.",
    exams: ["AWS Certified Cloud Practitioner", "Microsoft Certified: Azure Fundamentals"],
    years: 4,
  },
  {
    name: "Github",
    description:
      "Git for version control, collaborative workflows, and continuous integration pipelines.",
    years: 3,
  },
];

export const socialprofils: SocialProfiles = {
  github: "https://github.com/rebeccadrennan",
  linkedin: "https://www.linkedin.com/in/rebeccakdrennan/",
  codepen: "https://codepen.io/Rebecca-Gilbert/collections/",
};

export const linkedindata = {
  title: "LinkedIn Profile",
  linked_url: "https://www.linkedin.com/in/rebeccakdrennan/",
  headline: "Full Stack Developer | React | Mobile Apps | Tech Enthusiast",
  summary:
    "I'm a full-stack developer passionate about creating user-friendly mobile and web applications. I focus on clean, maintainable code and thoughtful design. Currently exploring AI and cloud technologies.",
  experience: [
    {
      position: "Mobile and Web Developer",
      company: "Freelance and Personal Projects",
      location: "Berlin",
      startDate: "2022",
      endDate: "Present",
      description:
        "Developing responsive web applications and cross-platform mobile apps using React and React Native.",
    },
    {
      position: "Developer",
      company: "Previous Company",
      location: "Remote",
      startDate: "2021",
      endDate: "2022",
      description: "Built proof-of-concepts and maintained full-stack applications.",
    },
  ],
  education: [
    {
      school: "University in Berlin",
      degree: "Bachelor's Degree",
      field: "Computer Science",
      graduationYear: "2021",
    },
  ],
  endorsements: [
    "React",
    "JavaScript",
    "React Native",
    "Web Development",
    "Mobile Development",
    "Python",
    "AWS",
    "Azure",
  ],
};
