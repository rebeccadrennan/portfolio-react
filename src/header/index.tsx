import React, { useState } from "react";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { logotext, socialprofils } from "../content_option";
import Themetoggle from "../components/themetoggle";

const logoUrl = `${import.meta.env.BASE_URL}CircleProfilePic.svg`;

const Headermain = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen((current) => {
      const next = !current;
      document.body.classList.toggle("ovhidden", next);
      return next;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove("ovhidden");
  };

  return (
    <>
      <header className="fixed-top site__header">
        <div className="d-flex align-items-center justify-content-between">
          <a className="navbar-brand nav_ac" href="#home">
            <img className="nav-logo" src={logoUrl} alt="Rebecca Drennan" />
          </a>
          <div className="d-flex align-items-center">
            <Themetoggle />
            <button className="menu__button nav_ac" onClick={handleToggle}>
              {isMenuOpen ? <VscClose /> : <VscGrabber />}
            </button>
          </div>
        </div>

        <div className={`site__navigation ${isMenuOpen ? "menu__opend" : ""}`}>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                  <li className="menu_item ">
                    <a onClick={closeMenu} href="#home" className="my-3">
                      Home
                    </a>
                  </li>
                  <li className="menu_item">
                    <a onClick={closeMenu} href="#about" className="my-3">
                      About
                    </a>
                  </li>
                  <li className="menu_item">
                    <a onClick={closeMenu} href="#portfolio" className="my-3">
                      Portfolio
                    </a>
                  </li>
                  <li className="menu_item">
                    <a onClick={closeMenu} href="#assistant" className="my-3">
                      AI Assistant
                    </a>
                  </li>
                  <li className="menu_item">
                    <a onClick={closeMenu} href="#contact" className="my-3">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="menu_footer d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3">
            <div className="d-flex">
              <a href={socialprofils.github}>Github</a>
              <a href={socialprofils.linkedin}>LinkedIn</a>
              <a href={socialprofils.codepen}>Codepen</a>
            </div>
            <p className="copyright m-0">copyright __ {logotext}</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Headermain;
