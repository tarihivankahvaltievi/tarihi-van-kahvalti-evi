import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import ClientPage from "../client-page";
import { AnimatedFooter } from "../components/animated-footer";
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
} from "../seo";
import { ReservationView } from "./reservation-view";
import styles from "./reservation.module.css";

const pageTitle = "Beyoğlu Rezervasyon | Tarihi Van Kahvaltı Evi, Taksim";
const pageDescription =
  "Tarihi Van Kahvaltı Evi'nde masanızı ayırtın. 1978'den beri Beyoğlu Zambak Sokak'ta serpme Van kahvaltısı, otlu peynir, murtuğa ve semaver çayı için WhatsApp ile hızlı rezervasyon.";

const reservationFaqItems = [
  {
    question: "Rezervasyon nasıl onaylanır?",
    answer:
      "Formu doldurup talebinizi ilettiğinizde, bilgileriniz doğrudan restoran yetkilimizin WhatsApp hattına aktarılır. Ekibimiz müsaitlik durumunu kontrol ederek ortalama 5–10 dakika içinde rezervasyonunuzu teyit eder.",
  },
  {
    question: "Rezervasyon için ön ödeme veya kapora gerekiyor mu?",
    answer:
      "Hayır. Tarihi Van Kahvaltı Evi'nde rezervasyonlar tamamen ücretsizdir ve kapora talep edilmez. Hesabınızı restoranda kahvaltı deneyiminiz sonrasında ödersiniz.",
  },
  {
    question: "Rezervasyonumu nasıl değiştirebilir veya iptal edebilirim?",
    answer:
      "Planınız değiştiğinde WhatsApp mesajınıza yanıt vererek veya +90 541 525 2868 numaralı telefonumuzdan bize ulaşarak rezervasyon saatinizi, kişi sayınızı güncelleyebilir ya da iptal edebilirsiniz.",
  },
  {
    question: "Grup kahvaltıları ve özel buluşmalar için yer ayrılıyor mu?",
    answer:
      "Evet. 8 kişiden 50 kişiye kadar kalabalık aile buluşmaları, şirket kahvaltıları ve arkadaş grupları için tarihi salonumuzda veya açık alanda bir arada oturabileceğiniz özel masalar organize edilmektedir.",
  },
  {
    question: "Rezervasyon saatine geç kalırsak masamız bekletilir mi?",
    answer:
      "Hafta sonu ve yoğun saatlerde masalarınız rezervasyon saatinizden itibaren 15 dakika süreyle adınıza ayrılmış olarak bekletilir. Gecikme yaşanması durumunda WhatsApp üzerinden bize haber vermeniz durumunda masanız korunur.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: reservationUrl,
    languages: {
      "tr-TR": reservationUrl,
      "en-US": englishReservationUrl,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: reservationUrl,
    siteName,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/breakfast-spread.webp"),
        width: 1200,
        height: 800,
        alt: "Tarihi Van Kahvaltı Evi Rezervasyon Masası",
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

export default function ReservationPage() {
  const reservationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "WebPage",
        "@id": `${reservationUrl}#webpage`,
        url: reservationUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${siteUrl}/#website` },
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
        "@id": `${reservationUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Rezervasyon", item: reservationUrl },
        ],
      },
      buildFaqJsonLd(reservationFaqItems, reservationUrl, false),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(reservationJsonLd) }}
      />
      <ClientPage locale="tr">
        <main id="main-content" className={styles.page}>
          <div className={styles.container}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Sayfa yolu">
              <Link href="/">Ana sayfa</Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>Rezervasyon</span>
            </nav>

            {/* Hero Header */}
            <header className={styles.heroHeader}>
              <div className={styles.eyebrowBadge}>
                <span className={styles.eyebrowDot} />
                <span>1978&apos;den Beri Beyoğlu Zambak Sokak</span>
              </div>
              <h1 className={styles.heroTitle}>
                Tarihi Van Kahvaltı Evi&apos;nde
                <em>Masanızı Ayırtın</em>
              </h1>
              <p className={styles.heroLead}>
                Otlu peynirden sıcak sahanlara, taze demlenen semaver çayından sıcacık pişiler ve murtuğaya kadar uzanan zengin Van kahvaltısı için yerinizi kolayca ayırtın; doğrudan WhatsApp ile teyit alın.
              </p>

              <div className={styles.heroTrustBadges}>
                <span className={styles.heroTrustBadge}>
                  <Star size={16} className={styles.ratingStar} fill="currentColor" />
                  <strong>4.9 Puan</strong> (1.300+ Google Yorumu)
                </span>
                <span className={styles.heroTrustBadge}>
                  <Clock3 size={16} />
                  <span>{openingHours.short}</span>
                </span>
                <span className={styles.heroTrustBadge}>
                  <ShieldCheck size={16} />
                  <span>Ücretsiz İptal ve Hızlı Teyit</span>
                </span>
                <span className={styles.heroTrustBadge}>
                  <MapPin size={16} />
                  <span>Taksim Zambak Sokak</span>
                </span>
              </div>
            </header>

            {/* Interactive Reservation Experience */}
            <Suspense fallback={<div style={{ minHeight: "500px" }} />}>
              <ReservationView locale="tr" />
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
              aria-labelledby="rezervasyon-faq-title"
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
                  Merak Edilenler
                </span>
                <h2
                  id="rezervasyon-faq-title"
                  style={{
                    fontFamily: "var(--font-literata-gf), Georgia, serif",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 700,
                    color: "#211d1b",
                    margin: "0.35rem 0 0",
                  }}
                >
                  Rezervasyon Hakkında Sıkça Sorulan Sorular
                </h2>
              </div>

              <div style={{ display: "grid", gap: "1rem", maxWidth: "880px", margin: "0 auto" }}>
                {reservationFaqItems.map((item) => (
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
        <AnimatedFooter locale="tr" />
      </ClientPage>
    </>
  );
}
