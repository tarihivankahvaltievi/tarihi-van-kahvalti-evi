"use client";

import { useEffect } from "react";

export function HeroMotionActivator() {
  useEffect(() => {
    const hero = document.getElementById("home-hero");
    if (!hero) return;

    const activate = () => {
      if (window.scrollY <= 4) return;
      hero.classList.add("hero-motion-ready");
      window.removeEventListener("scroll", activate);
    };

    activate();
    window.addEventListener("scroll", activate, { passive: true });
    return () => window.removeEventListener("scroll", activate);
  }, []);

  return null;
}
