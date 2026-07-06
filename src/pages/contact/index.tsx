import React, { useState, type FormEvent, type ChangeEvent } from "react";
import * as emailjs from "emailjs-com";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content/site";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig } from "../../content/contact";

type ContactFormState = {
  email: string;
  name: string;
  subject: string;
  message: string;
  loading: boolean;
  show: boolean;
  alertmessage: string;
  variant: "success" | "danger" | "";
};

type EmailJsLikeError = {
  status?: number;
  text?: string;
  message?: string;
};

const getEmailErrorDetails = (error: unknown) => {
  const emailError = error as EmailJsLikeError | undefined;
  const status = emailError?.status;
  const text = emailError?.text;
  const message =
    text || emailError?.message || (error instanceof Error ? error.message : "Unknown error");
  return { status, message };
};

export const ContactUs = () => {
  const [formData, setFormdata] = useState<ContactFormState>({
    email: "",
    name: "",
    subject: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormdata((prev) => ({ ...prev, loading: true, show: false }));

    const senderName = formData.name.trim();
    const senderEmail = formData.email.trim().toLowerCase();
    const subject = formData.subject.trim();
    const message = formData.message.trim();
    const recipientEmail = contactConfig.YOUR_EMAIL.trim().toLowerCase();

    if (
      !contactConfig.YOUR_SERVICE_ID ||
      !contactConfig.YOUR_TEMPLATE_ID ||
      !contactConfig.YOUR_USER_ID
    ) {
      const encodedSubject = encodeURIComponent(
        subject || "Portfolio Contact",
      );
      const encodedBody = encodeURIComponent(
        `Name: ${senderName}\nEmail: ${senderEmail}\n\n${message}`,
      );

      window.location.href = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;

      setFormdata((prev) => ({
        ...prev,
        loading: false,
        alertmessage: "Opening your email app to send this message.",
        variant: "success",
        show: true,
      }));
      return;
    }

    const templateParams = {
      from_name: senderName,
      from_email: senderEmail,
      user_name: senderName,
      user_email: senderEmail,
      reply_to: senderEmail,
      subject,
      to_name: "Rebecca Drennan",
      to_email: recipientEmail,
      message,
    };

    try {
      const result = await emailjs.send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID,
      );

      console.log(result.text);
      setFormdata((prev) => ({
        ...prev,
        loading: false,
        alertmessage: "SUCCESS! Thank you for your message",
        variant: "success",
        show: true,
      }));
    } catch (error: unknown) {
      const { status, message } = getEmailErrorDetails(error);
      const statusLabel = typeof status === "number" ? ` (${status})` : "";
      console.error("EmailJS send failed", {
        status,
        message,
        origin: window.location.origin,
      });

      const helpText =
        status === 412
          ? " Check EmailJS settings for public key, service/template IDs, and allowed origins."
          : status === 422
            ? " Check the EmailJS template 'To email' field and map it to {{to_email}} or a valid fixed address."
            : "";

      if (status === 422) {
        const fallbackSubject = encodeURIComponent(subject || "Portfolio Contact");
        const fallbackBody = encodeURIComponent(
          `Name: ${senderName}\nEmail: ${senderEmail}\n\n${message}`,
        );
        window.location.href = `mailto:${recipientEmail}?subject=${fallbackSubject}&body=${fallbackBody}`;
      }

      setFormdata((prev) => ({
        ...prev,
        loading: false,
        alertmessage:
          status === 422
            ? "Email service rejected the recipient address. Opening your email app as a fallback."
            : `Failed to send${statusLabel}! ${message}.${helpText}`,
        variant: "danger",
        show: true,
      }));
      document
        .querySelector(".co_alert")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormdata((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

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
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form
              id="contact-form"
              className="php-email-form"
              onSubmit={handleSubmit}
            >
              <div className="row gy-4">
                <div className="col-md-6">
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
                  <button type="submit">Send Message</button>
                  <div className="sent-message" style={{ display: "none" }}>
                    Your message has been sent. Thank you!
                  </div>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      <span className={formData.loading ? "loading-bar" : "d-none"}></span>
    </HelmetProvider>
  );
};
