import React, { useEffect, useState } from "react";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";

const Themetoggle = () => {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") ?? "dark");

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button type="button" className="nav_ac" onClick={toggleTheme} aria-label="Toggle theme">
      <WiMoonAltWaningCrescent4 />
    </button>
  );
};

export default Themetoggle;
