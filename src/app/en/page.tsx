import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  UtensilsCrossed,
} from "lucide-react";
import {
  absoluteUrl,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  displayAddress,
  displayPhone,
  englishUrl,
  jsonLd,
  mapsUrl,
  openingHours,
  siteName,
  siteUrl,
  telUrl,
  whatsappUrl,
} from "../seo";
import styles from "./english.module.css";

const englishTitle = "Turkish Breakfast Near Taksim | Tarihi Van Kahvaltı Evi";
const englishDescription =
  "Traditional Van breakfast in Beyoğlu near Taksim: herb cheese, murtuğa, kavut, hot copper pans and unlimited tea. See the live menu, hours and directions.";

const englishFaqItems = [
  {
    question: "Where can I have a traditional Turkish breakfast near Taksim?",
    answer: `${siteName} serves a traditional Van-style Turkish breakfast at ${displayAddress}, within walking distance of Taksim Square and İstiklal Avenue.`,
  },
  {
    question: "What is included in a Van breakfast?",
    answer:
      "A Van breakfast is a shared table of regional cheeses, olives, honey and clotted cream, homemade preserves, breads, hot egg dishes, murtuğa, kavut and freshly brewed Turkish tea. Availability may vary by season and daily preparation.",
  },
  {
    question: "What are murtuğa and kavut?",
    answer:
      "Murtuğa is a warm Van dish made with flour, butter and egg. Kavut is a rich, gently sweet warm dish based on toasted flour and butter. Both are regional specialities served as part of the breakfast experience.",
  },
  {
    question: "What time is Tarihi Van Kahvaltı Evi open?",
    answer: `${siteName} is open every day from ${openingHours.opens} to ${openingHours.closes}. Call before travelling on public holidays or for a large group.`,
  },
  {
    question: "Where can I see current menu prices?",
    answer:
      "The live menu page lists the current breakfast, hot dish, regional speciality, tea and coffee prices. Prices and availability can change, so check the menu shortly before your visit.",
  },
  {
    question: "How can I ask about a reservation?",
    answer: `Call ${displayPhone} or send a WhatsApp message. A reservation is confirmed only after the restaurant replies.`,
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: englishTitle },
  description: englishDescription,
  alternates: {
    canonical: englishUrl,
    languages: {
      tr: siteUrl,
      en: englishUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    title: englishTitle,
    description: englishDescription,
    url: englishUrl,
    siteName,
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/og/van-kahvaltisi.jpg"),
        width: 1200,
        height: 630,
        alt: "Traditional Van breakfast table at Tarihi Van Kahvaltı Evi in Beyoğlu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: englishTitle,
    description: englishDescription,
    images: [absoluteUrl("/images/og/van-kahvaltisi.jpg")],
  },
};

export default function EnglishVisitorPage() {
  const englishJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "WebPage",
        "@id": `${englishUrl}#webpage`,
        url: englishUrl,
        name: englishTitle,
        description: englishDescription,
        inLanguage: "en",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: { "@id": `${siteUrl}/#restaurant` },
        translationOfWork: { "@id": `${siteUrl}/#webpage` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/og/van-kahvaltisi.jpg"),
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${englishUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "English visitor guide", item: englishUrl },
        ],
      },
      buildFaqJsonLd(englishFaqItems, englishUrl, false),
    ],
  };

  return (
    <div className={styles.page} lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(englishJsonLd) }} />

      <header className={styles.header}>
        <Link className={styles.brand} href="/" hrefLang="tr" aria-label="Tarihi Van Kahvaltı Evi home page">
          <Image src="/images/brand-icon-small.png" alt="" width={42} height={53} priority />
          <span>{siteName}</span>
        </Link>
        <nav aria-label="English visitor navigation">
          <Link href="/menu">Live menu</Link>
          <Link href="/konum">Map</Link>
          <Link href="/" hrefLang="tr">Türkçe</Link>
        </nav>
      </header>

      <main id="main-content" lang="en">
        <section className={styles.hero} aria-labelledby="english-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Traditional Van breakfast · Beyoğlu, Istanbul</p>
            <h1 id="english-title">Traditional Turkish breakfast near Taksim</h1>
            <p className={styles.lead}>
              A generous Van breakfast with regional herb cheese, murtuğa, kavut, hot copper-pan dishes,
              homemade preserves and freshly brewed tea—served in a historic Beyoğlu setting since 1978.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/menu">
                <UtensilsCrossed size={18} aria-hidden="true" /> See the live menu
              </Link>
              <a className={styles.secondaryAction} href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin size={18} aria-hidden="true" /> Get directions
              </a>
            </div>
            <dl className={styles.quickFacts}>
              <div>
                <dt><Clock3 size={17} aria-hidden="true" /> Opening hours</dt>
                <dd>Every day, {openingHours.opens}–{openingHours.closes}</dd>
              </div>
              <div>
                <dt><MapPin size={17} aria-hidden="true" /> Address</dt>
                <dd>{displayAddress}</dd>
              </div>
            </dl>
          </div>
          <figure className={styles.heroImage}>
            <Image
              src="/images/breakfast-spread.webp"
              alt="A shared traditional Van breakfast with cheese, preserves, hot dishes and Turkish tea"
              fill
              priority
              sizes="(max-width: 760px) 92vw, 46vw"
              quality={75}
            />
          </figure>
        </section>

        <section className={styles.explainer} aria-labelledby="van-breakfast-title">
          <div>
            <p className={styles.sectionLabel}>A regional breakfast tradition</p>
            <h2 id="van-breakfast-title">What makes a Van breakfast different?</h2>
            <p>
              Van breakfast is built for sharing. Sweet and savoury plates arrive together, tea is refreshed,
              and warm regional dishes turn breakfast into a long, social meal rather than a quick stop.
            </p>
          </div>
          <dl className={styles.foodGlossary}>
            <div><dt>Otlu peynir</dt><dd>Van&apos;s aromatic cheese prepared with regional herbs.</dd></div>
            <div><dt>Murtuğa</dt><dd>A warm, savoury mixture of flour, butter and egg.</dd></div>
            <div><dt>Kavut</dt><dd>A rich, gently sweet dish made with toasted flour and butter.</dd></div>
            <div><dt>Kete</dt><dd>A layered, buttery regional pastry served warm.</dd></div>
          </dl>
        </section>

        <section className={styles.plan} aria-labelledby="plan-title">
          <div className={styles.planCopy}>
            <p className={styles.sectionLabel}>Plan your visit</p>
            <h2 id="plan-title">From Taksim Square to Zambak Street</h2>
            <p>
              The restaurant is in Şehit Muhtar, Beyoğlu, within walking distance of Taksim Square,
              İstiklal Avenue and the M2 Taksim metro station. Use the live map for the most accurate route.
            </p>
            <address>{displayAddress}, Türkiye</address>
          </div>
          <div className={styles.contactCard}>
            <h3>Menu, availability and groups</h3>
            <p>Check the live menu for current prices. For weekend availability or a large group, contact the restaurant before travelling.</p>
            <a href={telUrl}><Phone size={17} aria-hidden="true" /> {displayPhone}</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={17} aria-hidden="true" /> Ask on WhatsApp
            </a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={17} aria-hidden="true" /> Open Google Maps <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="english-faq-title">
          <header>
            <p className={styles.sectionLabel}>Quick answers</p>
            <h2 id="english-faq-title">Visitor questions</h2>
          </header>
          <div className={styles.faqList}>
            {englishFaqItems.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p><strong>{siteName}</strong><span>{displayAddress}</span></p>
        <nav aria-label="Footer navigation">
          <Link href="/menu">Live menu</Link>
          <Link href="/konum">Location</Link>
          <Link href="/gizlilik">Privacy</Link>
          <Link href="/" hrefLang="tr">Türkçe site</Link>
        </nav>
      </footer>
    </div>
  );
}
