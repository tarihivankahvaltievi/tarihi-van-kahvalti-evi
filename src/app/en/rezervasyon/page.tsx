import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import ClientPage from "../../client-page";
import { AnimatedFooter } from "../../components/animated-footer";
import {
  absoluteUrl,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  displayAddress,
  displayPhone,
  englishReservationUrl,
  jsonLd,
  openingHours,
  reservationUrl,
  siteName,
  siteUrl,
} from "../../seo";
import { ReservationView } from "../../rezervasyon/reservation-view";
import styles from "../../rezervasyon/reservation.module.css";

const pageTitle = "Table Reservation | Tarihi Van Breakfast House, Taksim Istanbul";
const pageDescription =
  "Book your table at Tarihi Van Kahvaltı Evi near Taksim Square, Istanbul. Experience traditional Van breakfast, regional cheeses, kaymak, and freshly brewed Turkish tea with fast WhatsApp confirmation.";

const englishReservationFaqItems = [
  {
    question: "How is my reservation confirmed?",
    answer:
      "When you send your reservation request, your details are instantly forwarded to our team via WhatsApp. We check table availability and confirm within 5–10 minutes.",
  },
  {
    question: "Is there a deposit or booking fee?",
    answer:
      "No. Table reservations at Tarihi Van Kahvaltı Evi are completely free of charge. No deposit or credit card is required. You pay after enjoying your breakfast at the restaurant.",
  },
  {
    question: "How can I modify or cancel my booking?",
    answer:
      "Simply reply to our WhatsApp confirmation message or call us at +90 541 525 2868 to change your arrival time, guest count, or cancel your table.",
  },
  {
    question: "Can you accommodate large travel groups or families?",
    answer:
      "Yes. We regularly host travel groups, large families, and gatherings from 8 up to 50 guests. We arrange connected tables in our historic indoor dining room or outdoor terrace.",
  },
  {
    question: "What happens if we arrive late?",
    answer:
      "During peak weekend hours, reserved tables are held for 15 minutes past your booked time. If you run into traffic or delays, simply send us a quick WhatsApp note and we will hold your table.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: englishReservationUrl,
    languages: {
      "tr-TR": reservationUrl,
      "en-US": englishReservationUrl,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: englishReservationUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/breakfast-spread.webp"),
        width: 1200,
        height: 800,
        alt: "Tarihi Van Breakfast House Table Reservation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [absoluteUrl("/images/breakfast-spread.webp")],
  },
};

export default function EnglishReservationPage() {
  const reservationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(true),
      {
        "@type": "WebPage",
        "@id": `${englishReservationUrl}#webpage`,
        url: englishReservationUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteUrl}/en#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: {
          "@type": "FoodEstablishment",
          "@id": `${siteUrl}/#restaurant`,
          name: siteName,
          acceptsReservations: "True",
          telephone: displayPhone,
          address: displayAddress,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/breakfast-spread.webp"),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${englishReservationUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/en` },
          { "@type": "ListItem", position: 2, name: "Reservation", item: englishReservationUrl },
        ],
      },
      buildFaqJsonLd(englishReservationFaqItems, englishReservationUrl, true),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(reservationJsonLd) }}
      />
      <ClientPage locale="en">
        <main id="main-content" className={styles.page}>
          <div className={styles.container}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb navigation">
              <Link href="/en">Home</Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>Reservation</span>
            </nav>

            {/* Hero Header */}
            <header className={styles.heroHeader}>
              <div className={styles.eyebrowBadge}>
                <span className={styles.eyebrowDot} />
                <span>Since 1978 • Beyoğlu Zambak Street</span>
              </div>
              <h1 className={styles.heroTitle}>
                Reserve Your Table at
                <em>Tarihi Van</em>
              </h1>
              <p className={styles.heroLead}>
                Secure your spot for Istanbul&apos;s authentic Van breakfast: artisanal cheeses, hot copper egg pans, buffalo kaymak with honeycomb, and unlimited fresh Turkish tea. Fast WhatsApp confirmation.
              </p>

              <div className={styles.heroTrustBadges}>
                <span className={styles.heroTrustBadge}>
                  <Star size={16} className={styles.ratingStar} fill="currentColor" />
                  <strong>4.9 Rating</strong> (1,300+ Google Reviews)
                </span>
                <span className={styles.heroTrustBadge}>
                  <Clock3 size={16} />
                  <span>Open Daily {openingHours.opens} – {openingHours.closes}</span>
                </span>
                <span className={styles.heroTrustBadge}>
                  <ShieldCheck size={16} />
                  <span>Free Cancellation & Fast Confirmation</span>
                </span>
                <span className={styles.heroTrustBadge}>
                  <MapPin size={16} />
                  <span>Taksim Zambak Street</span>
                </span>
              </div>
            </header>

            {/* Interactive Reservation Experience */}
            <Suspense fallback={<div style={{ minHeight: "500px" }} />}>
              <ReservationView locale="en" />
            </Suspense>

            {/* Frequently Asked Questions */}
            <section
              style={{
                marginTop: "4rem",
                padding: "2.5rem clamp(1.2rem, 3vw, 2.5rem)",
                background: "#fffdf9",
                borderRadius: "18px",
                border: "1px solid rgba(116, 25, 31, 0.12)",
                boxShadow: "0 10px 30px rgba(64, 48, 28, 0.05)",
              }}
              aria-labelledby="rezervasyon-faq-title-en"
            >
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <span
                  style={{
                    fontSize: "0.76rem",
                    fontWeight: 750,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: "#74191f",
                  }}
                >
                  Visitor Questions
                </span>
                <h2
                  id="rezervasyon-faq-title-en"
                  style={{
                    fontFamily: "var(--font-literata-gf), Georgia, serif",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 700,
                    color: "#211d1b",
                    margin: "0.35rem 0 0",
                  }}
                >
                  Frequently Asked Questions About Reservations
                </h2>
              </div>

              <div style={{ display: "grid", gap: "1rem", maxWidth: "880px", margin: "0 auto" }}>
                {englishReservationFaqItems.map((item) => (
                  <details
                    key={item.question}
                    style={{
                      border: "1px solid rgba(43, 29, 28, 0.14)",
                      borderRadius: "12px",
                      padding: "1rem 1.25rem",
                      background: "#fffaf2",
                    }}
                  >
                    <summary
                      style={{
                        fontWeight: 720,
                        fontSize: "0.96rem",
                        color: "#211d1b",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      {item.question}
                    </summary>
                    <p
                      style={{
                        margin: "0.75rem 0 0",
                        fontSize: "0.88rem",
                        lineHeight: 1.55,
                        color: "#5c4f48",
                      }}
                    >
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </main>
        <AnimatedFooter locale="en" />
      </ClientPage>
    </>
  );
}
