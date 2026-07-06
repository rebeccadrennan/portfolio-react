import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import PortfolioAssistant from "../../components/PortfolioAssistant";
import { meta } from "../../content_option";
import reframeImage from "../../assets/images/reframe.jpg";
import TechmakersImage from "../../assets/images/Techmakers.jpg";
import digitalDNAImage from "../../assets/images/digitalDNA.jpg";
import womenInTechImage from "../../assets/images/womenInTech.jpg";

const skillPillars = [
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

const certifications = [
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

const ConferenceCard = ({ title, years, description, children }) => {
  return (
    <article className="conference-card">
      <div className="conference-card-header">
        <h3>{title}</h3>
        <span className="conference-years">{years}</span>
      </div>
      <p>{description}</p>
      {children && <div className="conference-media">{children}</div>}
    </article>
  );
};

export const About = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title>About | {meta.title}</title>
          <meta
            name="description"
            content="Full Stack Software Engineer specialising in React, TypeScript, Python, AI prototypes and cloud engineering."
          />
        </Helmet>

        <section className="sec_sp">
          <PortfolioAssistant />
        </section>

        <section className="skills-showcase sec_sp">
          <div className="skill-pillar-grid">
            {skillPillars.map((pillar) => (
              <article className="skill-pillar-card" key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>

                <div className="stack-list">
                  {pillar.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="conferences-section sec_sp">
          <div className="section-heading">
            <p className="about-eyebrow">Conferences & Speaking</p>
          </div>

          <div className="conference-timeline">
            <ConferenceCard
              title="Women Techmakers Belfast"
              years="2024, 2025"
              description="Talks on AI, cloud engineering, developer tooling and networking with engineers across Northern Ireland."
            >
              <div className="linkedin-embed">
                <img
                  src={TechmakersImage}
                  alt="Women Techmakers Belfast"
                  loading="lazy"
                />
              </div>
            </ConferenceCard>

            <ConferenceCard
              title="Women in Tech Annual Conference"
              years="2024"
              description="Exploring leadership, software engineering careers and emerging technologies."
            >
              <div className="linkedin-embed">
                <img
                  src={womenInTechImage}
                  alt="Women in Tech Annual Conference"
                  loading="lazy"
                />
              </div>
            </ConferenceCard>

            <ConferenceCard
              title="Reframe Women in Tech"
              years="Manchester • 2024"
              description="Learning from industry leaders and connecting with software engineers from across the UK."
            >
              <div className="linkedin-embed">
                <img
                  src={reframeImage}
                  alt="Reframe Women in Tech"
                  loading="lazy"
                />
              </div>
            </ConferenceCard>

            <ConferenceCard
              title="Digital DNA Belfast"
              years="2022, 2023"
              description="Northern Ireland's largest technology conference covering AI, startups and software engineering."
            >
              <div className="linkedin-embed">
                <img
                  src={digitalDNAImage}
                  alt="Digital DNA Belfast"
                  loading="lazy"
                />
              </div>
            </ConferenceCard>
          </div>
        </section>

        <section className="cert-preview sec_sp">
          <Row>
            <Col lg="5">
              <h2 className="color_sec">Certifications</h2>
              <p>
                Credentials across AI, cloud, Python, Linux and developer
                productivity.
              </p>
            </Col>

            <div className="certification-grid">
              {certifications.map((cert) => (
                <div
                  className={`certification-card ${cert.colour}`}
                  key={cert.title}
                >
                  <div className="cert-top">
                    <div className="cert-icon">{cert.icon}</div>

                    <div className="cert-year">{cert.year}</div>
                  </div>

                  <h3>{cert.title}</h3>

                  <p className="issuer">{cert.issuer}</p>

                  <span className="category">{cert.category}</span>
                </div>
              ))}
            </div>
          </Row>
        </section>
      </Container>
    </HelmetProvider>
  );
};
