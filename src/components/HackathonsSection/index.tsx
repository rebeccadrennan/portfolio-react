import React from "react";
import { Container } from "react-bootstrap";
import { hackathons } from "../../content/about";
import "../../pages/about/style.css";

export const HackathonsSection = () => {
  return (
    <Container className="About-header">
      <section className="hackathon-section sec_sp">
        <div className="section-heading">
          <div className="section-heading">
            <p className="about-eyebrow">
              Rapid prototypes, real-world ideas and pitch-ready products
            </p>
          </div>
          <p>
            I love hackathons because they combine everything I enjoy: fast
            problem solving, user-focused design, technical creativity and
            pitching new ideas with talented people from different backgrounds.
          </p>
        </div>

        <div className="hackathon-grid">
          {hackathons.map((item) => {
            const hasLink = Boolean(item.linkUrl && item.ctaLabel);
            const cardBody = (
              <>
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

                {hasLink && (
                  <div className="hackathon-card-footer">
                    <span className="hackathon-cta" aria-hidden="true">
                      {item.ctaLabel}
                      <span className="hackathon-cta-arrow">→</span>
                    </span>
                  </div>
                )}
              </>
            );

            if (hasLink) {
              return (
                <a
                  className="hackathon-card hackathon-card-link"
                  key={item.title}
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.title} ${item.project} - ${item.ctaLabel} (opens in new tab)`}
                >
                  {cardBody}
                </a>
              );
            }

            return (
              <article className="hackathon-card" key={item.title}>
                {cardBody}
              </article>
            );
          })}
        </div>
      </section>
    </Container>
  );
};
