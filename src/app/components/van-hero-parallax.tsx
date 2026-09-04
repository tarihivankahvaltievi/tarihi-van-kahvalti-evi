"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { messagesFor, type SiteLocale } from "../home-localization";

type HeroSlide = {
  image: string;
  altTr: string;
  altEn: string;
};

const heroSlides: HeroSlide[] = [
  {
    image: "/images/balcony-breakfast.webp",
    altTr: "Tarihi Rum binası balkonunda zengin serpme kahvaltı sofrası",
    altEn: "Grand Turkish breakfast table on the historic balcony",
  },
  {
    image: "/images/breakfast-spread.webp",
    altTr: "Geleneksel Van serpme kahvaltısı, otlu peynir, bal kaymak ve taze çay",
    altEn: "Traditional Van breakfast spread with regional cheese, honey and clotted cream",
  },
  {
    image: "/images/hero-parallax/overhead-feast.webp",
    altTr: "Bakır sahanlar ve taze sıcaklarla dolu Van kahvaltı masası",
    altEn: "Overhead view of an authentic Turkish breakfast feast",
  },
  {
    image: "/images/hero-parallax/sucuk-egg-action.webp",
    altTr: "Bakır sahanda cızırdayan taze tereyağlı sucuklu yumurta",
    altEn: "Sizzling Turkish sucuk and eggs in traditional copper pan",
  },
  {
    image: "/images/hero-parallax/terrace-table.webp",
    altTr: "Tarihi Van Kahvaltı Evi sıcak sofra atmosferi",
    altEn: "Warm historic dining atmosphere at Tarihi Van Kahvaltı Evi",
  },
];

export function VanHeroParallax({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const exitingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startSlideTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        setPreviousSlide(prev);
        if (exitingTimerRef.current) clearTimeout(exitingTimerRef.current);
        exitingTimerRef.current = setTimeout(() => {
          setPreviousSlide(null);
        }, 1800);
        return (prev + 1) % heroSlides.length;
      });
    }, 6500);
  };

  useEffect(() => {
    startSlideTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (exitingTimerRef.current) clearTimeout(exitingTimerRef.current);
    };
  }, []);

  const handleSelectSlide = (index: number) => {
    if (index === currentSlide) return;
    setPreviousSlide(currentSlide);
    setCurrentSlide(index);
    if (exitingTimerRef.current) clearTimeout(exitingTimerRef.current);
    exitingTimerRef.current = setTimeout(() => {
      setPreviousSlide(null);
    }, 1800);
    startSlideTimer();
  };

  return (
    <section className="hero-section hero hero-parallax-dining" aria-label={messages.hero.aria}>
      {/* Background Slides with Flawless Ken Burns Zoom & Crossfade */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        const isExiting = index === previousSlide;
        if (!isActive && !isExiting) return null;

        return (
          <div
            key={slide.image}
            className={`hero-slide ${isActive ? "is-active" : "is-exiting"}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            role="img"
            aria-label={locale === "en" ? slide.altEn : slide.altTr}
          />
        );
      })}

      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-content-inner animate-fade-in">
          <div className="hero-subtitle">
            <span className="hero-subtitle-dot" aria-hidden="true">◆</span>
            <span>{locale === "en" ? "SINCE 1978 · BEYOĞLU, ISTANBUL" : "1978'DEN BERİ BEYOĞLU"}</span>
            <span className="hero-subtitle-dot" aria-hidden="true">◆</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-title-main">TARİHİ VAN</span>
            <span className="hero-title-accent">KAHVALTI EVİ</span>
          </h1>
          <p className="hero-tagline">
            {locale === "en"
              ? "Authentic Van breakfast traditions, herb cheese, sizzling copper pans and unending fresh tea in a historic Beyoğlu building."
              : "Tarihi Rum binasında, Van'dan gelen hakiki lezzetler, bakır sahanlar ve yarım asırlık aile misafirperverliği."}
          </p>
          <div className="hero-actions">
            <Link href={messages.menuHref} className="btn btn-primary">
              {locale === "en" ? "MENÜLERİ İNCELE" : "MENÜLERİ İNCELE"}
            </Link>
            <Link
              href={locale === "en" ? "/en/rezervasyon" : "/rezervasyon"}
              className="btn btn-secondary-hero"
            >
              {locale === "en" ? "REZERVASYON" : "REZERVASYON"}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators: active amber pill & subtle circle dots */}
      <div className="carousel-indicators">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`indicator-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleSelectSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Hero Bottom Organic Wave Cutout Transition */}
      <div className="hero-bottom-transition" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="hero-wave-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle dark depth ribbon along the wave */}
          <path
            d="M0,62 C220,28 440,22 700,56 C960,88 1200,98 1440,48 L1440,120 L0,120 Z"
            fill="rgba(24, 12, 14, 0.25)"
          />
          {/* Subtle translucent highlight ribbon */}
          <path
            d="M0,66 C220,32 440,26 700,60 C960,92 1200,102 1440,52 L1440,120 L0,120 Z"
            fill="rgba(255, 255, 255, 0.35)"
          />
          {/* Main solid white wave connecting seamlessly into Section 1 */}
          <path
            d="M0,70 C220,36 440,30 700,64 C960,96 1200,106 1440,56 L1440,120 L0,120 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
