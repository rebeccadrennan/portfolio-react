import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta, socialprofils } from "../../content/site";
import { Container, Row, Col } from "react-bootstrap";
import { FaLinkedin } from "react-icons/fa";
import { contactConfig } from "../../content/contact";

export const ContactUs = () => {
  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Contact</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <section id="contact-methods">
          <Row className="mt-3 pt-md-3 reveal-section">
            <Col lg="8">
              <h1 className="display-4 mb-4 reveal-line">Contact Me</h1>
              <hr className="t_border my-4 ml-0 text-left" />
            </Col>
          </Row>
          <Row className="sec_sp reveal-section">
            <Col lg="5" className="mb-5">
              <h3 className="color_sec py-4">Get in touch</h3>
              <address>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                  {contactConfig.YOUR_EMAIL}
                </a>
                <br />
                <br />
                {"YOUR_FONE" in contactConfig ? (
                  <p>
                    <strong>Phone:</strong> {contactConfig.YOUR_FONE}
                  </p>
                ) : null}
              </address>
              <p>{contactConfig.description}</p>
              <a
                href={socialprofils.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary d-inline-flex align-items-center gap-2 mt-2"
              >
                <FaLinkedin size={20} />
                Message me on LinkedIn
              </a>
            </Col>
          </Row>
        </section>
      </Container>
    </HelmetProvider>
  );
};
