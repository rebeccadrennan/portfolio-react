import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import Experience from "../../components/Experience";
import { meta } from "../../content_option";

const engineeringHighlights = [
  {
    number: "6+",
    label: "Years engineering experience",
  },
  {
    number: "1,000+",
    label: "Users on launch day",
  },
  {
    number: "AI",
    label: "LLMs, LangGraph & document intelligence",
  },
  {
    number: "Cloud",
    label: "Azure, AWS, Docker & CI/CD",
  },
];

const skillPillars = [
  {
    title: "Frontend Engineering",
    description:
      "React and TypeScript applications with reusable component libraries, complex state management, interactive dashboards and polished user experiences.",
    stack: [
      "React",
      "TypeScript",
      "AppKit",
      "WebSockets",
      "Data Visualisation",
    ],
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

        <section className="about-hero">
          <p className="about-eyebrow">Full Stack Software Engineer</p>

          <h1>
            I build polished, scalable software that turns complex ideas into
            real products.
          </h1>

          <p className="about-intro">
            I’m a full-stack engineer with 6+ years of experience across React,
            TypeScript, Python, AI-enabled products and cloud engineering. I
            enjoy working end-to-end: shaping requirements, designing clean
            architecture, building intuitive interfaces, integrating backend
            services and shipping solutions that create real business value.
          </p>

          <div className="about-cta-row">
            <a href="/portfolio" className="about-primary-link">
              View Projects
            </a>
            <a href="/contact" className="about-secondary-link">
              Contact Me
            </a>
          </div>
        </section>

        <section className="impact-grid">
          {engineeringHighlights.map((item) => (
            <article className="impact-card" key={item.label}>
              <strong>{item.number}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </section>

        <section className="about-story sec_sp">
          <Row>
            <Col lg="5">
              <h2 className="color_sec">How I Engineer</h2>
            </Col>

            <Col lg="7">
              <p>
                My background spans enterprise frontend leadership, full-stack
                AI prototypes, cloud automation and internal platforms. I’ve
                built conversational AI tools, document intelligence systems,
                analytical dashboards, workflow automation solutions and
                internal engineering platforms adopted by large user groups.
              </p>

              <p>
                I care about more than just getting features working. I like
                creating reusable foundations, clean component systems, secure
                configuration, automated delivery pipelines and products that
                are genuinely enjoyable to use.
              </p>
            </Col>
          </Row>
        </section>

        <section className="sec_sp">
          <Experience />
        </section>

        <section className="skills-showcase sec_sp">
          <div className="section-heading">
            <p className="about-eyebrow">Technical Strengths</p>
            <h2>Where I can add value quickly</h2>
          </div>

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
