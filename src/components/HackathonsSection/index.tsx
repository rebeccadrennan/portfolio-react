import React from "react";
import { Container } from "react-bootstrap";
import { hackathons } from "../../content/about";
import "../../pages/about/style.css";

export const HackathonsSection = () => {
  return (
    <Container className="About-header">
      <section className="hackathon-section sec_sp">
        <div className="section-heading">
          <p className="about-eyebrow">Hackathons & Innovation</p>
          <h2>Rapid prototypes, real-world ideas and pitch-ready products</h2>
          <p>
            I love hackathons because they combine everything I enjoy: fast
            problem solving, user-focused design, technical creativity and
            pitching new ideas with talented people from different backgrounds.
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
    </Container>
  );
};
