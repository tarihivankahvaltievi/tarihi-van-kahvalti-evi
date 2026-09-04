"use client";

import Image from "next/image";
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
        }, 1500);
        return (prev + 1) % heroSlides.length;
      });
    }, 7000);
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
    }, 1500);
    startSlideTimer();
  };

  return (
    <section className="hero-section hero-cinematic" aria-label={messages.hero.aria}>
      {/* Keep every frame mounted so the next photograph is decoded before its reveal. */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        const isExiting = index === previousSlide;

        return (
          <div
            key={slide.image}
            className={`hero-slide hero-slide-${(index % 3) + 1} ${isActive ? "is-active" : ""} ${isExiting ? "is-exiting" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            role="img"
            aria-label={locale === "en" ? slide.altEn : slide.altTr}
            aria-hidden={!isActive}
          />
        );
      })}

      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-content-inner animate-fade-in">
          <div className="hero-subtitle">
            <span className="hero-subtitle-rule" aria-hidden="true" />
            <span>{locale === "en" ? "BEYOĞLU · SINCE 1978" : "BEYOĞLU · 1978"}</span>
          </div>
          <h1 className="hero-title hero-title-visual">
            <span className="sr-only">Tarihi Van Kahvaltı Evi</span>
            <Image
              src="/images/hero-title-lockup-heritage.png"
              alt=""
              width={1560}
              height={560}
              priority
              className="hero-title-lockup-image"
            />
          </h1>
          <p className="hero-tagline">
            {locale === "en"
              ? "A family table bringing the breakfast traditions of Van to Beyoğlu."
              : "Van'ın sofra geleneği, yarım asırdır aynı aile sıcaklığıyla Beyoğlu'nda."}
          </p>
          <div className="hero-actions">
            <Link href={messages.menuHref} className="btn btn-primary">
              {locale === "en" ? "VIEW MENU" : "MENÜYÜ GÖR"}
            </Link>
            <Link
              href={locale === "en" ? "/en/rezervasyon" : "/rezervasyon"}
              className="btn btn-secondary-hero"
            >
              <span>{locale === "en" ? "BOOK A TABLE" : "MASA AYIR"}</span>
              <span className="hero-action-arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="carousel-indicators" role="group" aria-label={locale === "en" ? "Hero photographs" : "Hero fotoğrafları"}>
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`indicator-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleSelectSlide(index)}
            aria-label={locale === "en" ? `Show photograph ${index + 1}` : `${index + 1}. fotoğrafı göster`}
            aria-current={index === currentSlide ? "true" : undefined}
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
