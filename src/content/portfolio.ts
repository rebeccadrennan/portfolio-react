import type { PortfolioItem } from "./site";
import jgilbertFurnitureGif from "../assets/gif/jgilbertFurniture.gif";
import portfolioGif from "../assets/gif/Portfolio.gif";
import swaggerUiGif from "../assets/gif/SwaggerUI.gif";

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Business Website & Lead Generation Platform",
    summary:
      "Designed and developed a responsive business website focused on performance, SEO and customer conversion. Built a clean information architecture, interactive contact experience and local search optimisation to help establish a strong online presence for a family business.",
    tech: ["HTML", "CSS", "Google Spark"],
    category: "Client Website",
    visibility: "Public",
    imageUrl: jgilbertFurnitureGif,
    liveUrl: "https://www.jgilbertfurniture.co.uk/",
  },
  {
    title: "This Web App :)",
    summary:
      "Single-page React frontend for my portfolio with section-based navigation, polished UI animation, and responsive design.",
    tech: ["React", "TypeScript", "CSS"],
    category: "Personal Project",
    visibility: "Public",
    imageUrl: portfolioGif,
    liveUrl: "https://github.com/rebeccadrennan/portfolio-react",
  },
  {
    title: "This Project's AI Service",
    summary:
      "Modular backend powering AI conversations, secure contact workflows, prompt orchestration and external service integrations. Designed with scalable APIs, configuration-driven architecture and production deployment in mind.",
    tech: ["FastAPI", "Python", "AI", "Docker", "REST API", "GitHub Actions"],
    category: "Backend",
    visibility: "Public",
    imageUrl: swaggerUiGif,
    repoUrl: "https://github.com/rebeccadrennan/portfolio-ai-api",
  },
];
