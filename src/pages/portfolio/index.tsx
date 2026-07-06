import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { portfolioItems } from "../../content/portfolio";
import { meta } from "../../content/site";

export const Portfolio = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="9">
            <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
            <p className="portfolio-lead mb-3">
              These are selected public projects. I have many more client and
              internal projects that I cannot share publicly.
            </p>
          </Col>
        </Row>

        <div className="portfolio-grid mb-5">
          {portfolioItems.map((data) => {
            const hasExternalLink =
              typeof data.liveUrl === "string" &&
              data.liveUrl.length > 0 &&
              !data.liveUrl.startsWith("#");
            const hasInternalLink =
              typeof data.liveUrl === "string" && data.liveUrl.startsWith("#");

            return (
              <article key={data.title} className="portfolio-card reveal-card">
                {data.imageUrl ? (
                  <img src={data.imageUrl} alt={data.title} />
                ) : (
                  <div className="portfolio-placeholder" aria-hidden="true">
                    {data.title}
                  </div>
                )}

                <div className="portfolio-card-content">
                  <div className="portfolio-meta-row">
                    <span className="portfolio-badge">{data.category}</span>
                    <span
                      className={`portfolio-visibility ${
                        data.visibility === "Private" ? "private" : "public"
                      }`}
                    >
                      {data.visibility}
                    </span>
                  </div>

                  <h3>{data.title}</h3>
                  <p>{data.summary}</p>

                  <div className="portfolio-tech-list">
                    {data.tech.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <div className="portfolio-actions">
                    {hasExternalLink ? (
                      <a href={data.liveUrl} target="_blank" rel="noreferrer">
                        View Live Site
                      </a>
                    ) : null}
                    {hasInternalLink ? (
                      <a href={data.liveUrl}>View Frontend Section</a>
                    ) : null}
                    {!hasExternalLink && !hasInternalLink ? (
                      <span className="portfolio-private-note">
                        Details available on request.
                      </span>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </HelmetProvider>
  );
};
