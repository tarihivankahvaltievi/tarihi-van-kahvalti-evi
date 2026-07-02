"use client";

import { useEffect } from "react";

export function UiMotion() {
  useEffect(() => {
    let observeFrame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    );

    const observeItems = () => {
      if (observeFrame) {
        return;
      }

      observeFrame = window.requestAnimationFrame(() => {
        observeFrame = 0;
        const items = document.querySelectorAll("[data-reveal]:not(.is-visible)");
        items.forEach((item) => observer.observe(item));
      });
    };

    const observeInitialItems = () => {
      const items = document.querySelectorAll("[data-reveal]:not(.is-visible)");
      items.forEach((item) => observer.observe(item));
    };

    observeInitialItems();

    // Watch for newly rendered reveal items without rescanning on every tiny DOM mutation.
    const mutationObserver = new MutationObserver(() => {
      observeItems();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (observeFrame) {
        window.cancelAnimationFrame(observeFrame);
      }
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
