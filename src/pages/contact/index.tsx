import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta, socialprofils } from "../../content/site";
import { Container, Row, Col } from "react-bootstrap";
import { FaLinkedin } from "react-icons/fa";
import { contactConfig } from "../../content/contact";
import { submitContactForm, type ContactApiError } from "../../services/contact";

type ContactFormState = {
  email: string;
  name: string;
  subject: string;
  message: string;
  errors: ContactApiError[];
  loading: boolean;
  show: boolean;
  alertmessage: string;
  variant: "success" | "danger" | "";
};

export const ContactUs = () => {
  const [formData, setFormdata] = useState<ContactFormState>({
    email: "",
    name: "",
    subject: "",
    message: "",
    errors: [],
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormdata((prev) => ({
      ...prev,
      loading: true,
      show: false,
      errors: [],
    }));

    const senderName = formData.name.trim();
    const senderEmail = formData.email.trim().toLowerCase();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    try {
      const response = await submitContactForm({
        name: senderName,
        email: senderEmail,
        subject,
        message,
      });

      if (response.success) {
        setFormdata((prev) => ({
          ...prev,
          email: "",
          name: "",
          subject: "",
          message: "",
          errors: [],
          loading: false,
          alertmessage: response.message || "SUCCESS! Thank you for your message",
          variant: "success",
          show: true,
        }));
        return;
      }

      setFormdata((prev) => ({
        ...prev,
        loading: false,
        alertmessage: response.message || "Failed to send message.",
        variant: "danger",
        show: true,
        errors: response.errors || [],
      }));

      document.querySelector(".co_alert")?.scrollIntoView({ behavior: "smooth" });
    } catch (error: unknown) {
      const messageText =
        error instanceof Error
          ? error.message
          : "Unable to submit the form right now. Please try again.";

      setFormdata((prev) => ({
        ...prev,
        loading: false,
        alertmessage: messageText,
        variant: "danger",
        show: true,
        errors: [],
      }));
      document.querySelector(".co_alert")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = event.target.name;
    setFormdata((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
      errors: prev.errors.filter((error) => error.field !== fieldName),
    }));
  };

  const getFieldError = (field: string) =>
    formData.errors.find((error) => error.field === field)?.message;

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Contact</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mt-3 pt-md-3 reveal-section">
          <Col lg="8">
            <h1 className="display-4 mb-4 reveal-line">Contact Me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp reveal-section">
          <Col lg="12">
            <Alert
              variant={formData.variant}
              className={`rounded-0 co_alert ${formData.show ? "d-block" : "d-none"}`}
              onClose={() => setFormdata((prev) => ({ ...prev, show: false }))}
              dismissible
            >
              <p className="my-0">{formData.alertmessage}</p>
            </Alert>
          </Col>
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">Get in touch</h3>
            <address>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>{contactConfig.YOUR_EMAIL}</a>
              <br />
              <br />
              {"YOUR_FONE" in contactConfig ? (
                <p>
                  <strong>Phone:</strong> {contactConfig.YOUR_FONE}
                </p>
              ) : null}
            </address>
            <p>{contactConfig.description}</p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form
              id="contact-form"
              className="php-email-form contact__form"
              onSubmit={handleSubmit}
            >
              <div className="row gy-4">
                <div className="col-md-6">
                  {getFieldError("name") ? (
                    <small className="text-danger d-block mb-2">{getFieldError("name")}</small>
                  ) : null}
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  {getFieldError("email") ? (
                    <small className="text-danger d-block mb-2">{getFieldError("email")}</small>
                  ) : null}
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  {getFieldError("subject") ? (
                    <small className="text-danger d-block mb-2">{getFieldError("subject")}</small>
                  ) : null}
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  {getFieldError("message") ? (
                    <small className="text-danger d-block mb-2">{getFieldError("message")}</small>
                  ) : null}
                  <textarea
                    name="message"
                    className="form-control"
                    rows={6}
                    placeholder="Message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-12 text-center">
                  <button type="submit" disabled={formData.loading}>
                    {formData.loading ? "Sending..." : "Send Message"}
                  </button>
                  <div className="sent-message" style={{ display: "none" }}>
                    Your message has been sent. Thank you!
                  </div>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
