"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { messagesFor, type SiteLocale } from "../home-localization";
import { address, openingHours, mapsUrl, googleMapsSnapshot } from "../seo";
import { getMenuOrderNote } from "../menu/menu-rules";

type HeroSlide = {
  image: string;
  altTr: string;
  altEn: string;
};

const heroSlides: HeroSlide[] = [
  {
    image: "/images/balcony-breakfast.webp",
    altTr: "Beyoğlu’nda balkonda zengin serpme kahvaltı sofrası",
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

export function VanHeroParallax({ locale = "tr", serpmePrice }: { locale?: SiteLocale; serpmePrice?: string }) {
  const messages = messagesFor(locale);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);
  const [readySlide, setReadySlide] = useState(0);
  useEffect(() => {
    if (previousSlide === null || readySlide !== currentSlide) return;
    const timer = setTimeout(() => setPreviousSlide(null), 1500);
    return () => clearTimeout(timer);
  }, [currentSlide, readySlide, previousSlide]);

  const handleSelectSlide = (index: number) => {
    if (index === currentSlide) return;
    // Keep the last decoded photograph visible on a slow connection.
    setPreviousSlide(index === readySlide ? null : readySlide);
    setCurrentSlide(index);
  };

  return (
    <section className="hero-section hero-cinematic" aria-label={messages.hero.aria}>
      {/* Inactive photographs stay out of the DOM until selected. Lazy images
          stacked inside the viewport can still download and compete with LCP. */}
      {heroSlides.map((slide, index) => {
        const isActive = index === readySlide;
        const isExiting = index === previousSlide && readySlide === currentSlide;
        if (!isActive && index !== previousSlide && index !== currentSlide) return null;

        return (
          <div
            key={slide.image}
            className={`hero-slide hero-slide-${(index % 3) + 1} ${index === 0 ? "is-initial" : ""} ${isActive ? "is-active" : ""} ${isExiting ? "is-exiting" : ""}`}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.image}
              alt={locale === "en" ? slide.altEn : slide.altTr}
              fill
              sizes="100vw"
              quality={84}
              loading="eager"
              fetchPriority={index === 0 ? "high" : "auto"}
              onLoad={() => {
                if (index === currentSlide) setReadySlide(index);
              }}
              className="hero-slide-image"
            />
          </div>
        );
      })}

      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-content-inner animate-fade-in">
          <h1 className="hero-title hero-title-visual">
            <span className="sr-only">Tarihi Van Kahvaltı Evi</span>
            <Image
              src="/images/hero-title-lockup-heritage.png"
              alt=""
              width={1560}
              height={560}
              priority
              sizes="(max-width: 768px) 352px, 624px"
              className="hero-title-lockup-image"
            />
          </h1>
          <p className="hero-tagline">
            {locale === "en"
              ? "Traditional Van breakfast in Beyoğlu, near Taksim."
              : "Beyoğlu / Taksim’de geleneksel Van kahvaltısı."}
          </p>
          <div className="hero-visit-facts">
            <address>{address.neighborhood}, {address.streetAddress}<br />{address.postalCode} {address.locality} / {address.region}</address>
            <p>{locale === "en" ? "Every day" : "Her gün"} {openingHours.opens}–{openingHours.closes}</p>
          </div>
          {serpmePrice && <p className="hero-breakfast-price"><Link href={`${messages.menuHref}#serpme-fix-menu`}>{locale === "en" ? "Serpme breakfast" : "Serpme kahvaltı"}: {serpmePrice} {locale === "en" ? "per person" : "kişi başı"} · {getMenuOrderNote("serpme-fix-menu", locale)}</Link></p>}
          <div className="hero-actions">
            <Link href={messages.menuHref} className="btn btn-primary">
              {locale === "en" ? "MENU & PRICES" : "MENÜ VE FİYATLAR"}
            </Link>
            <a href={mapsUrl} className="btn btn-secondary-hero" target="_blank" rel="noopener noreferrer" data-analytics-surface="home_hero">
              {locale === "en" ? "DIRECTIONS" : "YOL TARİFİ"}
            </a>
            <Link
              href={locale === "en" ? "/en/rezervasyon" : "/rezervasyon"}
              className="btn btn-secondary-hero"
            >
              {locale === "en" ? "MAKE A RESERVATION" : "REZERVASYON YAP"}
            </Link>
          </div>
          <p className="hero-review-source">
            <a href={googleMapsSnapshot.sourceUrl} target="_blank" rel="noopener noreferrer" data-analytics-surface="home_review_source" data-analytics-purpose="review_source">
              Google Maps · {googleMapsSnapshot.rating.toLocaleString(locale === "en" ? "en-US" : "tr-TR")}/5 · {googleMapsSnapshot.reviewCount.toLocaleString(locale === "en" ? "en-US" : "tr-TR")} {locale === "en" ? "reviews" : "yorum"}
            </a>
            <span>{locale === "en" ? "Checked" : "Kontrol"}: <time dateTime={googleMapsSnapshot.checkedAt}>{new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" }).format(new Date(`${googleMapsSnapshot.checkedAt}T12:00:00+03:00`))}</time></span>
          </p>
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
