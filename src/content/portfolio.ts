import type { PortfolioItem } from "./site";
import jgilbertFurnitureGif from "../assets/gif/jgilbertFurniture.gif";
import swaggerUiGif from "../assets/gif/SwaggerUI.gif";

export const portfolioItems: PortfolioItem[] = [
  {
    title: "James Gilbert Furniture Website",
    summary:
      "Business website built in HTML for a family furniture business, focused on clear service information and local customer trust.",
    tech: ["HTML", "CSS", "Google Spark"],
    category: "Client Website",
    visibility: "Public",
    imageUrl: jgilbertFurnitureGif,
    liveUrl: "https://www.jgilbertfurniture.co.uk/",
  },
  {
    title: "Portfolio Website Frontend",
    summary:
      "Single-page React frontend for my portfolio with section-based navigation, polished UI animation, and responsive design.",
    tech: ["React", "TypeScript", "CSS"],
    category: "Personal Project",
    visibility: "Public",
    liveUrl: "#home",
  },
  {
    title: "Portfolio Project Backend",
    summary:
      "Backend service layer powering contact and integration workflows for this portfolio ecosystem.",
    tech: ["API", "Node.js", "Integrations"],
    category: "Backend",
    visibility: "Private",
    imageUrl: swaggerUiGif,
  },
];
