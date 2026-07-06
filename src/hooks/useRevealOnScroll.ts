import { useEffect } from "react";

const useRevealOnScroll = () => {
  useEffect(() => {
    const revealSelector =
      ".reveal-section, .reveal-text, .reveal-image, .reveal-card, .reveal-line";
    const observed = new WeakSet<Element>();

    const revealNow = (element: Element) => {
      element.classList.add("reveal-visible");
    };

    const observeElement = (element: Element) => {
      if (observed.has(element)) {
        return;
      }
      observed.add(element);
      observer.observe(element);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealNow(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    // Attach observers to initial elements on mount.
    const initialElements = document.querySelectorAll(revealSelector);
    initialElements.forEach(observeElement);

    // Lazy-loaded sections appear after mount, so observe new matching nodes.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) {
            return;
          }

          if (node.matches(revealSelector)) {
            observeElement(node);
          }

          node.querySelectorAll(revealSelector).forEach(observeElement);
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Fallback for browsers/environments where intersection events are delayed.
    window.requestAnimationFrame(() => {
      document.querySelectorAll(revealSelector).forEach((el) => {
        const rect = el.getBoundingClientRect();
        const viewportHeight =
          window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < viewportHeight * 0.95) {
          revealNow(el);
          observer.unobserve(el);
        }
      });
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
};

export default useRevealOnScroll;
