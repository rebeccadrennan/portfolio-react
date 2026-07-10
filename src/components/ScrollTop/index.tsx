import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import "./style.css";

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={"scroll-top" + (visible ? " scroll-top--visible" : "")}
      onClick={handleClick}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <FaChevronUp />
    </button>
  );
};

export default ScrollTop;
