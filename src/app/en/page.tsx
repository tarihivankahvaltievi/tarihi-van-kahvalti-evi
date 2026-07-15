import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  buildEnglishWebPageJsonLd,
  buildFaqJsonLd,
  buildMenuJsonLd,
  buildRestaurantJsonLd,
  buildWebsiteJsonLd,
  englishDescription,
  englishDisplayAddress,
  englishFaqItems,
  englishMenuSections,
  englishPageUrl,
  englishTitle,
  jsonLd,
  mapsUrl,
  openingHours,
  siteName,
  siteUrl,
  telUrl,
  whatsappEnglishUrl,
} from "../seo";

const englishOgImage = `${siteUrl}/images/og/van-kahvaltisi.jpg`;

export const metadata: Metadata = {
  title: { absolute: englishTitle },
  description: englishDescription,
  alternates: {
    canonical: englishPageUrl,
    languages: {
      tr: siteUrl,
      en: englishPageUrl,
      "x-default": siteUrl,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: englishTitle,
    description: englishDescription,
    url: englishPageUrl,
    siteName,
    images: [
      {
        url: englishOgImage,
        width: 1200,
        height: 630,
        alt: "Traditional Van breakfast table in Beyoğlu, Istanbul",
      },
    ],
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: englishTitle,
    description: englishDescription,
    images: [englishOgImage],
  },
};

export default function EnglishPage() {
  const englishJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebsiteJsonLd(false),
      buildRestaurantJsonLd(false, "en"),
      buildEnglishWebPageJsonLd(false),
      buildMenuJsonLd(false, "en"),
      buildFaqJsonLd(englishFaqItems, englishPageUrl, false, "en"),
    ],
  };

  return (
    <div lang="en" className="seo-page theme-breakfast">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(englishJsonLd) }}
      />

      <nav className="seo-topbar" aria-label="English page navigation">
        <Link href="/" className="seo-brand" aria-label={`${siteName} Turkish homepage`}>
          <Image src="/images/brand-icon-small.png" alt="" width={38} height={48} />
          <span>{siteName}</span>
        </Link>
        <div className="seo-toplinks">
          <a href="#menu">Menu</a>
          <a href="#location">Location</a>
          <a href="#faq-en">FAQ</a>
          <Link href="/" hrefLang="tr">Türkçe</Link>
        </div>
      </nav>

      <main id="main-content">
        <section className="seo-hero" aria-labelledby="english-page-title">
          <div className="seo-hero-copy">
            <span className="seo-eyebrow">Traditional Turkish breakfast near Taksim</span>
            <h1 id="english-page-title">Authentic Van breakfast in Beyoğlu, Istanbul</h1>
            <p>
              Tarihi Van Kahvaltı Evi serves a traditional sharing breakfast within
              walking distance of Taksim Square and Istiklal Avenue.
            </p>
            <p>
              Our Van-style spread brings herb cheese, murtuğa, kavut, kete, honey and
              clotted cream, warm copper-pan dishes and unlimited Turkish tea to one table.
            </p>
            <div className="seo-actions">
              <a href={whatsappEnglishUrl} target="_blank" rel="noopener noreferrer">
                Ask on WhatsApp
              </a>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
              <a href={telUrl}>Call</a>
            </div>
          </div>
          <figure className="seo-hero-media">
            <Image
              src="/images/hero-table.jpg"
              alt="A traditional Van breakfast spread served at Tarihi Van Kahvaltı Evi in Beyoğlu"
              fill
              preload
              sizes="(max-width: 820px) 100vw, 44vw"
            />
          </figure>
        </section>

        <section className="seo-answer-box" aria-labelledby="visitor-facts-title">
          <h2 id="visitor-facts-title">Visitor essentials</h2>
          <ul>
            <li>
              <strong>Address:</strong> {englishDisplayAddress}
            </li>
            <li>
              <strong>Hours:</strong> {openingHours.shortEnglish}
            </li>
            <li>
              <strong>From Taksim:</strong> Take the Sıraselviler exit and walk to Zambak
              Street.
            </li>
            <li>
              <strong>Reservations:</strong> Call or message on WhatsApp for current table
              availability.
            </li>
          </ul>
        </section>

        <section id="menu" className="seo-section" aria-labelledby="english-menu-title">
          <div className="seo-section-heading">
            <span className="seo-eyebrow">Menu and prices</span>
            <h2 id="english-menu-title">What is served in a Van breakfast?</h2>
            <p>
              Prices can change. Please contact the restaurant before your visit for the
              latest menu and price confirmation.
            </p>
          </div>
          <div className="seo-content-grid">
            {englishMenuSections.map((section) => (
              <article key={section.name}>
                <h2>{section.name}</h2>
                <p>{section.description}</p>
                <ul className="seo-menu-list">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                      </div>
                      {"price" in item && item.price ? (
                        <p className="seo-menu-price">
                          <strong>{item.price} {item.priceCurrency}</strong>
                          {"unit" in item && item.unit ? <span>{item.unit}</span> : null}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="location" className="seo-answer-box" aria-labelledby="location-title">
          <h2 id="location-title">Breakfast near Taksim Square and Istiklal Avenue</h2>
          <p className="seo-section-copy">
            The restaurant is on Zambak Street in central Beyoğlu. From M2 Taksim Metro,
            leave towards Sıraselviler and follow the live walking route to Zambak Street.
          </p>
          <address className="seo-address">{englishDisplayAddress}</address>
          <div className="seo-actions">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">Open Google Maps</a>
            <a href={whatsappEnglishUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={telUrl}>Call the restaurant</a>
          </div>
        </section>

        <section id="faq-en" className="seo-faq-list" aria-labelledby="english-faq-title">
          <h2 id="english-faq-title">Frequently asked questions</h2>
          {englishFaqItems.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>

        <nav className="seo-related" aria-label="Visitor actions">
          <a href="#menu">View breakfast menu</a>
          <a href="#location">Plan your route</a>
          <a href={whatsappEnglishUrl} target="_blank" rel="noopener noreferrer">
            Ask about a table
          </a>
          <Link href="/" hrefLang="tr">Türkçe ana sayfa</Link>
        </nav>
      </main>
    </div>
  );
}
