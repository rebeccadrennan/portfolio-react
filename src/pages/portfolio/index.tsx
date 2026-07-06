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
        <div className="section-heading">
          <p className="about-eyebrow">Featured Projects</p>
        </div>
        <p className="portfolio-lead mb-3">
          Public work demonstrating my approach to software engineering, AI
          integration and product development. Most commercial work cannot be
          shared publicly due to client confidentiality.
        </p>

        <div className="portfolio-grid mb-5">
          {portfolioItems.map((data) => {
            const hasExternalLink =
              typeof data.liveUrl === "string" &&
              data.liveUrl.length > 0 &&
              !data.liveUrl.startsWith("#");
            const hasInternalLink =
              typeof data.liveUrl === "string" && data.liveUrl.startsWith("#");
            const hasRepoLink =
              typeof data.repoUrl === "string" && data.repoUrl.length > 0;
            const externalLabel =
              hasExternalLink && data.liveUrl?.includes("github.com")
                ? "View GitHub Repo"
                : "View Live Site";

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
                        {externalLabel}
                      </a>
                    ) : null}
                    {hasInternalLink ? (
                      <a href={data.liveUrl}>View Frontend Section</a>
                    ) : null}
                    {hasRepoLink ? (
                      <a href={data.repoUrl} target="_blank" rel="noreferrer">
                        View GitHub Repo
                      </a>
                    ) : null}
                    {!hasExternalLink && !hasInternalLink && !hasRepoLink ? (
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
