import React, { Suspense } from "react";
import { Home } from "../pages/home";
import { Portfolio } from "../pages/portfolio";
import { Socialicons } from "../components/socialicons";
import { HackathonsSection } from "../components/HackathonsSection";
import { BeyondKeyboardSection } from "../components/BeyondKeyboardSection";

const About = React.lazy(() =>
  import("../pages/about").then((module) => ({ default: module.About }))
);
const ContactUs = React.lazy(() =>
  import("../pages/contact").then((module) => ({ default: module.ContactUs }))
);

const sectionFallback = null;

function AppRoutes() {
  return (
    <div className="s_c">
      <div className="scroll-container">
        <section id="landing-hero">
          <Home />
        </section>

        <section id="about-highlights">
          <Suspense fallback={sectionFallback}>
            <About />
          </Suspense>
        </section>

        <section id="featured-projects">
          <Portfolio />
        </section>

        <section id="hackathon-highlights">
          <HackathonsSection />
        </section>

        <section id="beyond-keyboard-highlights">
          <BeyondKeyboardSection />
        </section>

        <section id="contact-details">
          <Suspense fallback={sectionFallback}>
            <ContactUs />
          </Suspense>
        </section>

        <section id="site-footer" className="footer-section">
          <footer className="site-footer">
            <div className="footer-inner">
              <p>
                &copy; {new Date().getFullYear()} Rebecca Drennan. All rights reserved.
                <br />
                You reached the end... but hopefully not the end of our conversation!
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
