import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildRestaurantJsonLd,
  displayAddress,
  displayPhone,
  englishMenuUrl,
  englishUrl,
  jsonLd,
  mapsUrl,
  menuUrl,
  openingHours,
  siteName,
  siteUrl,
  telUrl,
} from "../../seo";
import { getMenuData } from "../../menu/menu-storage";
import styles from "./english-menu.module.css";

const pageTitle = "English Breakfast Menu & Prices | Taksim Istanbul";
const pageDescription =
  "See the current English menu and prices for traditional Van breakfast near Taksim: shared breakfast, herb cheese, murtuğa, kavut, hot dishes, tea and coffee.";

const categoryCopy: Record<string, { name: string; description: string }> = {
  sofra: {
    name: "Van Breakfast Tables",
    description: "Shared breakfast spreads, regional cheeses, preserves and plates designed for the whole table.",
  },
  sicaklar: {
    name: "Hot Copper-Pan Dishes",
    description: "Eggs and regional specialities served from the kitchen while the butter is still sizzling.",
  },
  vandan: {
    name: "Specialities from Van",
    description: "Herb cheese, kete and other regional flavours that carry the memory of Van's breakfast culture.",
  },
  icecekler: {
    name: "Tea & Coffee",
    description: "Fresh Turkish tea for the breakfast table and coffee prepared by our Kafka Cafe corner.",
  },
};

const itemCopy: Record<string, { name: string; description: string }> = {
  "geleneksel-van-kahvaltisi": { name: "Traditional Van Breakfast", description: "Herb cheese, murtuğa, kavut, cacık, kete, honey and clotted cream, plus unlimited Turkish tea." },
  "iki-kisilik-van-sofrasi": { name: "Van Breakfast for Two", description: "A compact shared table with one hot dish, regional cheeses, homemade preserves and freshly brewed tea." },
  "peynir-zeytin-seckisi": { name: "Cheese & Olive Selection", description: "Van herb cheese, daily cheeses, green olives and black olives." },
  "bal-kaymak-recel": { name: "Honey, Clotted Cream & Preserves", description: "Strained honey, buffalo clotted cream and two homemade seasonal preserves." },
  "sucuklu-yumurta": { name: "Eggs with Sucuk", description: "Butcher-style Turkish beef sausage and village eggs, served hot in a copper pan." },
  murtuga: { name: "Murtuğa", description: "A filling Van speciality prepared with flour, butter and egg." },
  kavut: { name: "Kavut", description: "A gently sweet, rich warm dish made with toasted flour and butter." },
  menemen: { name: "Menemen with Butter", description: "Tomato, village peppers and eggs, kept soft and juicy in a copper pan." },
  "kavurmali-yumurta": { name: "Eggs with Braised Beef", description: "Braised beef and village eggs cooked with butter in a copper pan." },
  "otlu-peynirli-omlet": { name: "Van Herb Cheese Omelette", description: "A soft omelette with Van herb cheese and fresh greens." },
  "van-otlu-peyniri": { name: "Van Herb Cheese", description: "Van's signature cheese, matured with the aroma of regional herbs." },
  kete: { name: "Van Kete", description: "A layered regional pastry with a rich, buttery filling." },
  "pisi-sepeti": { name: "Warm Pişi Basket", description: "Four pieces of freshly fried dough, lightly crisp outside and soft inside." },
  "van-cacigi": { name: "Van-Style Cacık", description: "A thick breakfast dip with strained yoghurt, cucumber and fresh herbs." },
  "simit-ekmek-sepeti": { name: "Simit & Warm Bread", description: "Crisp sesame simit, warm bread and butter for the table." },
  "sinirsiz-cay": { name: "Unlimited Fresh Turkish Tea", description: "Strong Turkish tea, refreshed in a traditional tulip-shaped glass throughout the meal." },
  "turk-kahvesi": { name: "Traditional Turkish Coffee", description: "Foamy Turkish coffee slowly brewed in a copper cezve pot." },
  "sutlu-turk-kahvesi": { name: "Turkish Coffee with Milk", description: "A softer Turkish coffee slowly prepared with milk." },
  "filtre-kahve": { name: "Filter Coffee of the Day", description: "A clean, balanced cup prepared with Kafka Cafe's daily beans." },
  "ev-limonatasi": { name: "Homemade Lemonade", description: "Fresh lemon, light sugar and seasonal herbs, served cold." },
};

const priceNoteCopy: Record<string, string> = {
  "kişi başı · en az 2 kişilik": "per person · minimum 2 guests",
  "iki kişilik": "serves two",
  "4 adet": "4 pieces",
  "serpme kahvaltıya dahil": "included with the shared breakfast",
};

function englishDate(value: string) {
  const months: Record<string, string> = {
    Ocak: "January", Şubat: "February", Mart: "March", Nisan: "April", Mayıs: "May", Haziran: "June",
    Temmuz: "July", Ağustos: "August", Eylül: "September", Ekim: "October", Kasım: "November", Aralık: "December",
  };
  return Object.entries(months).reduce((date, [turkish, english]) => date.replace(turkish, english), value);
}

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: englishMenuUrl,
    languages: {
      tr: menuUrl,
      en: englishMenuUrl,
      "x-default": menuUrl,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: englishMenuUrl,
    siteName,
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    type: "website",
    images: [{
      url: absoluteUrl("/images/og/menu.jpg"),
      width: 1200,
      height: 630,
      alt: "Traditional Van breakfast menu with shared dishes and Turkish tea",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [absoluteUrl("/images/og/menu.jpg")],
  },
};

export default function EnglishMenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f4ecdf]" lang="en">
          <p className="font-serif text-lg text-[#5e4940]">Loading the current menu…</p>
        </div>
      }
    >
      <EnglishMenuContent />
    </Suspense>
  );
}

async function EnglishMenuContent() {
  await cookies();
  const { categories, items, lastUpdated } = await getMenuData();

  const menuSchema = {
    "@type": "Menu",
    "@id": `${englishMenuUrl}#menu`,
    name: `${siteName} English Menu`,
    description: pageDescription,
    url: englishMenuUrl,
    inLanguage: "en",
    isBasedOn: { "@id": `${menuUrl}#menu` },
    hasMenuSection: categories.map((category) => {
      const copy = categoryCopy[category.id] ?? { name: category.label, description: category.description };
      return {
        "@type": "MenuSection",
        name: copy.name,
        description: copy.description,
        hasMenuItem: items.filter((item) => item.category === category.id).map((item) => {
          const translated = itemCopy[item.id] ?? { name: item.name, description: item.description };
          const numericPrice = item.price.match(/^₺?(\d+)/)?.[1];
          return {
            "@type": "MenuItem",
            name: translated.name,
            alternateName: item.name,
            description: translated.description,
            image: absoluteUrl(item.image),
            offers: numericPrice ? {
              "@type": "Offer",
              price: numericPrice,
              priceCurrency: "TRY",
              url: `${englishMenuUrl}#${item.id}`,
            } : undefined,
          };
        }),
      };
    }),
  };

  const menuJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "WebPage",
        "@id": `${englishMenuUrl}#webpage`,
        url: englishMenuUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "en",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: { "@id": `${englishMenuUrl}#menu` },
        translationOfWork: { "@id": `${menuUrl}#webpage` },
        primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl("/images/og/menu.jpg"), width: 1200, height: 630 },
      },
      buildBreadcrumbJsonLd(englishMenuUrl, "English menu and prices", false, "Visitor guide", englishUrl),
      menuSchema,
    ],
  };

  return (
    <div className={styles.page} lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(menuJsonLd) }} />
      <header className={styles.header}>
        <Link className={styles.brand} href="/en" hrefLang="en" aria-label="Tarihi Van Kahvaltı Evi English visitor guide">
          <Image src="/images/brand-icon-small.png" alt="" width={42} height={53} priority />
          <span>{siteName}</span>
        </Link>
        <nav aria-label="English visitor navigation">
          <Link href="/en">Visitor guide</Link>
          <Link href="/en/menu" aria-current="page">Menu</Link>
          <Link href="/konum">Map</Link>
          <Link href="/menu" hrefLang="tr">Türkçe</Link>
        </nav>
      </header>

      <main id="main-content" lang="en">
        <section className={styles.hero} aria-labelledby="english-menu-title">
          <p className={styles.eyebrow}>Current menu · prices in Turkish lira</p>
          <h1 id="english-menu-title">Traditional Van breakfast <span>menu</span></h1>
          <p className={styles.lead}>
            Explore our shared Van breakfast, hot copper-pan dishes, regional specialities, unlimited Turkish tea
            and Kafka Cafe coffees. Original Turkish dish names are shown so you can order with confidence.
          </p>
          <div className={styles.heroMeta}>
            <span>Menu updated: {englishDate(lastUpdated)}</span>
            <span>Every day {openingHours.opens}–{openingHours.closes}</span>
            <span>Prices shown in TRY</span>
          </div>
        </section>

        <nav className={styles.categoryNav} aria-label="Menu categories">
          <div>
            {categories.map((category) => (
              <a key={category.id} href={`#${category.id}`}>{categoryCopy[category.id]?.name ?? category.label}</a>
            ))}
          </div>
        </nav>

        <div className={styles.menu}>
          <div id="menu">
            {categories.map((category) => {
              const copy = categoryCopy[category.id] ?? { name: category.label, description: category.description };
              return (
                <section id={category.id} className={styles.section} key={category.id} aria-labelledby={`${category.id}-title`}>
                  <header className={styles.sectionHeader}>
                    <div>
                      <p className={styles.sectionLabel}>{category.label}</p>
                      <h2 id={`${category.id}-title`}>{copy.name}</h2>
                    </div>
                    <p>{copy.description}</p>
                  </header>
                  <ul className={styles.items}>
                    {items.filter((item) => item.category === category.id).map((item) => {
                      const translated = itemCopy[item.id] ?? { name: item.name, description: item.description };
                      return (
                        <li className={styles.item} id={item.id} key={item.id}>
                          <h3>{translated.name}<span className={styles.originalName}>{item.name}</span></h3>
                          <p className={styles.price}>{item.price}</p>
                          <p className={styles.description}>{translated.description}</p>
                          {item.priceNote ? <p className={styles.priceNote}>{priceNoteCopy[item.priceNote] ?? item.priceNote}</p> : null}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>

          <section className={styles.visit} aria-labelledby="english-menu-visit-title">
            <div>
              <h2 id="english-menu-visit-title">Plan your breakfast near Taksim</h2>
              <p>{displayAddress}. Prices and daily availability can change; check this page shortly before your visit.</p>
            </div>
            <div className={styles.actions}>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={17} /> Directions <ArrowUpRight size={15} /></a>
              <a href={telUrl}><Phone size={17} /> {displayPhone}</a>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <p><strong>{siteName}</strong><span>{displayAddress}</span></p>
        <nav aria-label="Footer navigation">
          <Link href="/en">Visitor guide</Link>
          <Link href="/konum">Location</Link>
          <Link href="/gizlilik">Privacy</Link>
          <Link href="/menu" hrefLang="tr">Türkçe menü</Link>
        </nav>
      </footer>
    </div>
  );
}
