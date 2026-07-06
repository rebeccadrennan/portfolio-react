import React, { useEffect, type PropsWithChildren } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import Headermain from "../header";
import AnimatedCursor from "../hooks/AnimatedCursor";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import "./App.css";
import ScrollTop from "../components/ScrollTop";

function ScrollToTop({ children }: PropsWithChildren) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}

const routerBase =
  import.meta.env.BASE_URL === "/"
    ? "/"
    : import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  useRevealOnScroll();

  return (
    <Router basename={routerBase}>
      <span className="animated-background" aria-hidden="true" />
      <div className="cursor__dot">
        <AnimatedCursor
          innerSize={15}
          outerSize={15}
          color="255, 255 ,255"
          outerAlpha={0.4}
          innerScale={0.7}
          outerScale={5}
        />
      </div>
      <ScrollToTop>
        <Headermain />
        <AppRoutes />
        <ScrollTop />
      </ScrollToTop>
    </Router>
  );
}