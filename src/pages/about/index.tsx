import React, { type ReactNode } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta } from "../../content/site";
import { certifications, skillPillars } from "../../content/about";
import reframeImage from "../../assets/images/reframe.jpg";
import TechmakersImage from "../../assets/images/Techmakers.jpg";
import digitalDNAImage from "../../assets/images/digitalDNA.jpg";
import womenInTechImage from "../../assets/images/womenInTech.jpg";

type ConferenceCardProps = {
  title: string;
  years: string;
  description: string;
  children?: ReactNode;
};

const ConferenceCard = ({
  title,
  years,
  description,
  children,
}: ConferenceCardProps) => {
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
