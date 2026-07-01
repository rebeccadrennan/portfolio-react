import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { linkedindata, meta } from "../../content_option";
import { FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
// import { fetchLinkedInData } from "../../services/linkedinService"; // Uncomment if using API

export const LinkedIn = () => {
  const [data, setData] = useState(linkedindata);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Uncomment this useEffect to fetch live LinkedIn data
  /*
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchLinkedInData(linkedindata.linked_url);
        if (result) {
          setData(result);
        }
      } catch (err) {
        console.error("Failed to fetch LinkedIn data:", err);
        setError("Could not load live LinkedIn data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  */

  if (loading) {
    return (
      <Container className="About-header">
        <Row className="mt-5 pt-5 text-center">
          <Col>
            <Spinner animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Loading LinkedIn profile...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> LinkedIn | {meta.title}</title>
          <meta name="description" content={data.headline} />
        </Helmet>
        <Row className="mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">
              <FaLinkedin className="linkedin-icon" /> LinkedIn Profile
            </h1>
            <hr className="t_border my-4 ml-0 text-left" />
            {error && <div className="alert alert-warning">{error}</div>}
          </Col>
        </Row>

        {/* Profile Header */}
        <Row className="mb-5">
          <Col lg="8">
            <div className="linkedin-card">
              <div className="profile-header">
                <h2>{data.headline}</h2>
                <a
                  href={data.linked_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-link-btn"
                >
                  <FaLinkedin /> View Full Profile <FaExternalLinkAlt />
                </a>
              </div>

              {/* Summary */}
              <div className="profile-section">
                <h3>Professional Summary</h3>
                <p className="profile-summary">{data.summary}</p>
              </div>

              {/* Experience */}
              {data.experience && data.experience.length > 0 && (
                <div className="profile-section">
                  <h3>Experience</h3>
                  <div className="experience-list">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="experience-item">
                        <div className="exp-header">
                          <h4>{exp.position || exp.title}</h4>
                          <span className="exp-date">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <p className="exp-company">{exp.company}</p>
                        <p className="exp-location">{exp.location}</p>
                        <p className="exp-description">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {data.education && data.education.length > 0 && (
                <div className="profile-section">
                  <h3>Education</h3>
                  <div className="education-list">
                    {data.education.map((edu, i) => (
                      <div key={i} className="education-item">
                        <h4>{edu.school}</h4>
                        <p className="edu-degree">
                          {edu.degree} in {edu.field}
                        </p>
                        <span className="edu-year">
                          Graduated: {edu.graduationYear}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Endorsements/Skills */}
              {data.endorsements && data.endorsements.length > 0 && (
                <div className="profile-section">
                  <h3>Endorsed Skills</h3>
                  <div className="endorsements">
                    {data.endorsements.map((skill, i) => (
                      <span key={i} className="endorsement-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="profile-cta">
                <a
                  href={data.linked_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary linkedin-btn"
                >
                  <FaLinkedin /> Connect with me on LinkedIn
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
