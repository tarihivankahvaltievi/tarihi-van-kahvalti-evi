"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section" aria-label={messages.hero.aria}>
      {heroSlides.map((slide, index) => (
        <div
          key={slide.image}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          role="img"
          aria-label={locale === "en" ? slide.altEn : slide.altTr}
        />
      ))}

      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-content-inner animate-fade-in">
          <div className="hero-subtitle">
            {locale === "en" ? "SINCE 1978 · BEYOĞLU, ISTANBUL" : "1978'DEN BERİ BEYOĞLU"}
          </div>
          <h1 className="hero-title font-serif">
            TARİHİ VAN <br />
            <span className="gold-text-gradient">KAHVALTI EVİ</span>
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

      <div className="carousel-indicators">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`indicator-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="hero-bottom-transition" aria-hidden="true">
        <div className="wave-divider to-story">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,32 C320,82 400,-18 800,62 C1100,122 1200,12 1440,42 L1440,100 L0,100 Z"
              style={{ fill: "var(--accent-gold, #c5a25a)", opacity: 0.45 }}
            />
            <path
              d="M0,40 C320,90 400,-10 800,70 C1100,130 1200,20 1440,50 L1440,100 L0,100 Z"
              style={{ fill: "#7a1b22" }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
