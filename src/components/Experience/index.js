import React, { useState } from "react";
import "./Experience.css";

const experiences = [
  {
    company: "PwC UK",
    role: "Senior Associate | Full Stack Software Engineer",
    period: "2025 — Present",
    type: "AI Engineering",
    highlight: "Building full-stack AI proof of concepts and production-ready engineering foundations.",
    impact: [
      "Conversational AI, document intelligence and workflow automation",
      "React, TypeScript, Python, LangGraph and LLM-powered systems",
      "REST APIs, WebSockets, OCR pipelines and async processing",
      "Docker, CI/CD, automated testing and reusable templates",
    ],
    stack: ["React", "TypeScript", "Python", "LangGraph", "LLMs", "Azure", "Docker"],
  },
  {
    company: "PwC UK",
    role: "Associate | Lead Frontend Software Engineer",
    period: "2024 — 2025",
    type: "Frontend Leadership",
    highlight: "Owned frontend delivery across AI-enabled enterprise products.",
    impact: [
      "Led React architecture across two enterprise products",
      "Built reusable component libraries and scalable frontend patterns",
      "Integrated React apps with Python services and async APIs",
      "Led technical huddles and stakeholder demos",
    ],
    stack: ["React", "TypeScript", "Python", "REST APIs", "WebSockets", "Azure"],
  },
  {
    company: "PwC UK",
    role: "Tech Degree Apprentice | Software Engineer",
    period: "2020 — 2024",
    type: "Cloud & Full Stack",
    highlight: "Built cloud, automation and internal platforms used at scale.",
    impact: [
      "Delivered an internal engineering platform adopted by 1,000+ users on launch day",
      "Built AWS contact centre solutions with Amazon Connect and Lex",
      "Automated cloud operations with Azure, Terraform, Linux and PowerShell",
      "Created full-stack internal tools with search, profiles and DevOps integrations",
    ],
    stack: ["AWS", "Azure", "Terraform", "PowerShell", "Lambda", "DynamoDB"],
  },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const current = experiences[active];

  return (
    <section className="experience-section">
      <div className="experience-header">
        <p className="eyebrow">Career Timeline</p>
        <h2>Engineering products from idea to production</h2>
        <p>
          A snapshot of my journey across full-stack engineering, AI prototypes,
          frontend architecture and cloud delivery.
        </p>
      </div>

      <div className="experience-shell">
        <div className="experience-tabs">
          {experiences.map((item, index) => (
            <button
              key={item.role}
              className={`experience-tab ${active === index ? "active" : ""}`}
              onClick={() => setActive(index)}
            >
              <span>{item.period}</span>
              <strong>{item.role}</strong>
              <small>{item.type}</small>
            </button>
          ))}
        </div>

        <article className="experience-card">
          <div className="card-top">
            <div>
              <p className="company">{current.company}</p>
              <h3>{current.role}</h3>
            </div>
            <span className="period-pill">{current.period}</span>
          </div>

          <p className="highlight">{current.highlight}</p>

          <div className="impact-grid">
            {current.impact.map((point) => (
              <div className="impact-item" key={point}>
                <span>✦</span>
                <p>{point}</p>
              </div>
            ))}
          </div>

          <div className="stack-row">
            {current.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
