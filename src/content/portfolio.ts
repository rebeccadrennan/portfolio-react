import type { PortfolioItem } from "./site";
import jgilbertFurnitureGif from "../assets/gif/jgilbertFurniture.gif";
import portfolioGif from "../assets/gif/Portfolio.gif";
import swaggerUiGif from "../assets/gif/SwaggerUI.gif";
import contactDemoGif from "../assets/gif/ContactDemo.gif";

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Business Website & Lead Generation Platform",
    summary:
      "Designed and developed a responsive business website focused on performance, SEO and customer conversion. Built a clean information architecture, interactive contact experience and local search optimisation to help establish a strong online presence for a family business.",
    tech: ["HTML", "CSS", "Google Spark", "HOSTED ON GOOGLE SPARK"],
    category: "Client Website",
    visibility: "Private",
    imageUrl: jgilbertFurnitureGif,
    liveUrl: "https://www.jgilbertfurniture.co.uk/",
  },
  {
    title: "Interactive Portfolio Platform",
    summary:
      "Production-grade React portfolio platform featuring modular component architecture, AI-powered experiences, responsive design, reusable UI systems, and automated deployment pipelines. Built to showcase modern full-stack engineering practices rather than simply display projects.",
    tech: [
      "React",
      "TypeScript",
      "CSS",
      "Vite",
      "AI Integration",
      "REST APIs",
      "Responsive UI",
      "HOSTED ON VERCEL",
    ],
    category: "Frontend",
    visibility: "Public",
    imageUrl: portfolioGif,
    liveUrl: "https://github.com/rebeccadrennan/portfolio-react",
  },
  {
    title: "Portfolio AI Backend",
    summary:
      "Modular backend powering AI conversations, secure contact workflows, prompt orchestration and external service integrations. Designed with scalable APIs, configuration-driven architecture and production deployment in mind.",
    tech: [
      "ElevenLabs",
      "Gemini",
      "FastAPI",
      "Python",
      "AI",
      "Docker",
      "REST API",
      "GitHub Actions",
      "HOSTED ON RENDER",
    ],
    category: "Backend",
    visibility: "Public",
    imageUrl: swaggerUiGif,
    repoUrl: "https://github.com/rebeccadrennan/portfolio-ai-api",
  },
  {
    title: "Portfolio Contact API",
    summary:
      "The live backend service used by this website's contact form. Built with Node.js, TypeScript and Express, it exposes a REST API that validates requests, applies security middleware and rate limiting, sends emails via Resend, and returns structured error responses for seamless frontend integration.",
    tech: [
      "Node.js",
      "TypeScript",
      "Express",
      "REST API",
      "Docker",
      "GitHub Actions",
      "Resend",
      "Railway",
    ],
    category: "Backend",
    visibility: "Public",
    imageUrl: contactDemoGif,
    repoUrl: "https://github.com/rebeccadrennan/portfolio-contact-api",
  },
];
