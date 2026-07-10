import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content/site";
import waveGif from "./../../assets/images/robot-hi-gif.gif";
import waveStill from "./../../assets/images/robot-hi-still.svg";
import girlCodingBackground from "./../../assets/images/girlCodingBackground.png";

export const Home = () => {
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGif(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <section id="home-introduction" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center reveal-section">
          <div className="order-1 order-lg-2 text-center mb-4 reveal-image">
            <img src={girlCodingBackground} alt="Girl coding" className="hero-illustration" />
          </div>

          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center reveal-text">
            <div className="align-self-center ">
              <div className="intro mx-auto">
                <h2 className="mb-1x reveal-line">
                  <img
                    src={showGif ? waveGif : waveStill}
                    alt="Waving hand"
                    className="waving-hand-gif"
                  />
                  {introdata.title}
                </h2>
                <div style={{ marginBottom: "1.5rem" }}></div>

                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 20,
                    }}
                  />
                </h1>
                <p className="mb-1x">{introdata.description}</p>
                <div className="intro_btn-action pb-5">
                  <a href="#contact-details">
                    <div id="button_h" className="ac_btn btn">
                      Contact Me
                      <span className="ring one"></span>
                      <span className="ring two"></span>
                      <span className="ring three"></span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
