import { useEffect } from "react";

const useRevealOnScroll = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    const elements = document.querySelectorAll(
      ".reveal-section, .reveal-text, .reveal-image, .reveal-card, .reveal-line"
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default useRevealOnScroll;
