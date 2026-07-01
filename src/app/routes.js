import React from "react";
import { Route, Routes } from "react-router-dom";
import withRouter from "../hooks/withRouter";
import { Home } from "../pages/home";
import { Portfolio } from "../pages/portfolio";
import { ContactUs } from "../pages/contact";
import { About } from "../pages/about";
import { Socialicons } from "../components/socialicons";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const AnimatedRoutes = withRouter(({ location }) => (
  <div className="scroll-container">
    <section id="home">
      <Home />
    </section>
    <section id="contact">
      {" "}
      <ContactUs />{" "}
    </section>
    <section id="about">
      <About />
    </section>
    <section id="portfolio">
      <Portfolio />
    </section>

    <Socialicons />
  </div>
));

function AppRoutes() {
  return (
    <div className="s_c">
      <AnimatedRoutes />
      <Socialicons />
    </div>
  );
}

export default AppRoutes;
