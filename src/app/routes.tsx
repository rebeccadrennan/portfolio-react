import React, { Suspense } from "react";
import { Home } from "../pages/home";
import { Portfolio } from "../pages/portfolio";
import { Socialicons } from "../components/socialicons";
import { HackathonsSection } from "../components/HackathonsSection";

const About = React.lazy(() =>
  import("../pages/about").then((module) => ({ default: module.About })),
);
const ContactUs = React.lazy(() =>
  import("../pages/contact").then((module) => ({ default: module.ContactUs })),
);

const sectionFallback = null;

function AppRoutes() {
  return (
    <div className="s_c">
      <div className="scroll-container">
        <section id="home">
          <Home />
        </section>

        <section id="about">
          <Suspense fallback={sectionFallback}>
            <About />
          </Suspense>
        </section>

        <section id="portfolio">
          <Portfolio />
        </section>

        <section id="hackathons">
          <HackathonsSection />
        </section>

        <section id="contact">
          <Suspense fallback={sectionFallback}>
            <ContactUs />
          </Suspense>
        </section>

        <section id="footer-section" className="footer-section">
          <footer className="site-footer">
            <div className="footer-inner">
              <p>
                &copy; {new Date().getFullYear()} Rebecca Drennan. All rights
                reserved.
                <br />
                You reached the end... but hopefully not the end of our
                conversation!
              </p>
            </div>
          </footer>
          <Socialicons />
        </section>
      </div>
    </div>
  );
}

export default AppRoutes;
