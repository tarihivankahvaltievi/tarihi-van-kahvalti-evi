"use client";

import { useEffect } from "react";

export function UiMotion() {
  useEffect(() => {
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
      const items = document.querySelectorAll("[data-reveal]:not(.is-visible)");
      items.forEach((item) => observer.observe(item));
    };

    observeItems();

    // Watch for DOM changes to observe newly rendered items (like filtered menu cards)
    const mutationObserver = new MutationObserver(() => {
      observeItems();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
