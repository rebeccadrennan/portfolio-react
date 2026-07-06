import React from "react";
import { Route, Routes } from "react-router-dom";
import withRouter from "../hooks/withRouter";
import { Home } from "../pages/home";
import { ContactUs } from "../pages/contact";
import { About } from "../pages/about";
import { Socialicons } from "../components/socialicons";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const AnimatedRoutes = withRouter(({ location }) => (
  <div className="scroll-container">
    <section id="home">
      <Home />
    </section>
    <section id="about">
      <About />
    </section>
    <section id="contact">
      {" "}
      <ContactUs />{" "}
    </section>

    <section id="footer-section" className="footer-section">
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
));

function AppRoutes() {
  return (
    <div className="s_c">
      <AnimatedRoutes />
    </div>
  );
}

export default AppRoutes;
