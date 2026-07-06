import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import Experience from "../../components/Experience";
import { meta } from "../../content_option";
import reframeImage from "../../assets/images/reframe.jpg";
import TechmakersImage from "../../assets/images/Techmakers.jpg";
import digitalDNAImage from "../../assets/images/digitalDNA.jpg";
import womenInTechImage from "../../assets/images/womenInTech.jpg";

const engineeringHighlights = [
  {
    number: `${new Date().getFullYear() - 2020}+`,
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

const hackathons = [
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

        <section className="about-hero reveal-section">
          <p className="about-eyebrow reveal-line">Full Stack Software Engineer</p>

          <h1 className="reveal-line">
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

        <section className="hackathon-section sec_sp">
          <div className="section-heading">
            <p className="about-eyebrow">Hackathons & Innovation</p>
            <h2>Rapid prototypes, real-world ideas and pitch-ready products</h2>
            <p>
              I love hackathons because they combine everything I enjoy: fast
              problem solving, user-focused design, technical creativity and
              pitching new ideas with talented people from different
              backgrounds.
            </p>
          </div>

          <div className="hackathon-grid">
            {hackathons.map((item) => (
              <article className="hackathon-card" key={item.title}>
                <div className="hackathon-top">
                  <span className="hackathon-date">{item.date}</span>
                  <span className="hackathon-badge">Innovation Sprint</span>
                </div>

                <h3>{item.title}</h3>
                <h4>{item.project}</h4>

                <p>{item.description}</p>

                <div className="hackathon-skills">
                  {item.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="conferences-section sec_sp">
          <div className="section-heading">
            <p className="about-eyebrow">Conferences & Speaking</p>
            <h2>Events where I’ve shared ideas and built community</h2>
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
