import React from "react";
import Themetoggle from "../components/themetoggle";

const logoUrl = `${import.meta.env.BASE_URL}CircleProfilePic.svg`;

const Headermain = () => {
  return (
    <header className="fixed-top site__header">
      <div className="d-flex align-items-center justify-content-between">
        <a className="navbar-brand nav_ac" href="#landing-hero">
          <img className="nav-logo" src={logoUrl} alt="Rebecca Drennan" />
        </a>
        <div className="d-flex align-items-center">
          <Themetoggle />
        </div>
      </div>
    </header>
  );
};

export default Headermain;
