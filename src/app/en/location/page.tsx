import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation, TrainFront, BusFront } from "lucide-react";
import ClientPage from "../../client-page";
import { AnimatedFooter } from "../../components/animated-footer";
import {
  absoluteUrl, buildBreadcrumbJsonLd, buildFaqJsonLd, buildRestaurantJsonLd,
  displayAddress, displayPhone, englishLocationUrl, englishUrl, jsonLd,
  locationUrl, mapsUrl, openingHours, siteName, siteUrl, telUrl, yandexMapsUrl,
} from "../../seo";
import styles from "../../konum/location.module.css";

const title = "Directions from Taksim & Opening Hours | Tarihi Van Kahvaltı Evi";
const description = "Find Tarihi Van Kahvaltı Evi at Zambak Street No:8, Beyoğlu. Walking directions from Taksim, opening hours, English menu and table requests.";
const hours = `Every day ${openingHours.opens}–${openingHours.closes}`;
const questions = [
  { question: "Where is Tarihi Van Kahvaltı Evi?", answer: `${siteName} is at ${displayAddress}. You can walk from Taksim Square and İstiklal Avenue; use the map link for a route from your starting point.` },
  { question: "Is the Cihangir Van Kahvaltı Evi listing the same visiting address?", answer: "The menu and table requests on this website are for Zambak Street No:8 in Beyoğlu. The listing at Defterdar Yokuşu No:52/A in Cihangir is not this website's visiting address. Check the street number and +90 541 525 2868 before travelling." },
  { question: "How do I get here from Taksim Metro?", answer: "Walk from the M2 Taksim station or Taksim Square to Zambak Street No:8. Choose the current walking route for your station exit in Google Maps. Journey time depends on your starting point and route." },
  { question: "Can I arrive by public transport or taxi?", answer: "M2 Taksim Metro and nearby bus stops are within walking distance. For a taxi, show the driver Zambak Sokak No:8, Şehit Muhtar, Beyoğlu. Check current road access and nearby parking before travelling by car." },
  { question: "What are the opening hours?", answer: `${hours}. These are the venue's opening hours; ask the team about breakfast and hot-dish availability for your planned time, especially for an early or late visit.` },
  { question: "How can I plan wheelchair or stroller access?", answer: "Call before travelling to check the entrance, steps, seating and toilet access. Include your access needs in the table request so the restaurant can confirm an appropriate arrangement." },
  { question: "Should I request a table before visiting?", answer: `For weekends or a group, use the English table request page or call ${displayPhone} to check availability. A request becomes a confirmed reservation only after the restaurant replies.` },
];

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: englishLocationUrl, languages: { tr: locationUrl, en: englishLocationUrl, "x-default": locationUrl } },
  openGraph: { title, description, url: englishLocationUrl, siteName, locale: "en_US", type: "website", images: [{ url: absoluteUrl("/images/street-table.webp"), alt: "Street-side tables at Zambak Street No:8" }] },
  twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/images/street-table.webp")] },
};

export default function EnglishLocationPage() {
  const graph = {
    "@context": "https://schema.org", "@graph": [
      buildRestaurantJsonLd(false),
      { "@type": "WebPage", "@id": `${englishLocationUrl}#webpage`, url: englishLocationUrl, name: title, description, inLanguage: "en", about: { "@id": `${siteUrl}/#restaurant` }, mainEntity: { "@id": `${siteUrl}/#restaurant` }, isPartOf: { "@id": `${siteUrl}/#website` }, translationOfWork: { "@id": `${locationUrl}#webpage` } },
      buildBreadcrumbJsonLd(englishLocationUrl, "Directions", false, "Home", englishUrl),
      buildFaqJsonLd(questions, englishLocationUrl, false, "en"),
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
    <ClientPage locale="en">
      <main id="main-content" tabIndex={-1} lang="en" className={styles.page}>
        <section className={styles.hero} aria-labelledby="location-title">
          <div className={styles.heroCopy}>
            <p className={styles.routeLabel}>Taksim · Beyoğlu · Istanbul</p>
            <h1 id="location-title">Tarihi Van Kahvaltı Evi<span>How to find us</span></h1>
            <p className={styles.heroLead}>Join us for Van breakfast on Zambak Street No:8, within walking distance of Taksim Square and İstiklal Avenue. Use our map pin to plan your route to the restaurant.</p>
            <div className={styles.heroActions} data-analytics-surface="location_en">
              <a className={styles.primaryAction} href={mapsUrl} target="_blank" rel="noopener noreferrer"><Navigation size={18} aria-hidden="true" /> Get directions</a>
              <a className={styles.secondaryAction} href={telUrl}>Call {displayPhone}</a>
              <a className={styles.secondaryAction} href={yandexMapsUrl} target="_blank" rel="noopener noreferrer">Yandex Maps</a>
            </div>
            <dl className={styles.heroFacts}><div><dt>Address</dt><dd>{displayAddress}</dd></div><div><dt>Opening hours</dt><dd>{hours}</dd></div></dl>
          </div>
          <div className={styles.heroVisual} aria-label="Restaurant on Zambak Street">
            <figure className={styles.streetPhoto}><Image src="/images/street-table.webp" alt="Outdoor tables at Tarihi Van Kahvaltı Evi on Zambak Street" fill priority sizes="(max-width: 760px) 92vw, 48vw" quality={80} /></figure>
            <figure className={styles.interiorPhoto}><Image src="/images/interior-chair.webp" alt="Brick walls and seating inside the restaurant" fill sizes="(max-width: 760px) 38vw, 230px" quality={75} /></figure>
            <p className={styles.photoNote}>Zambak Sokak No:8</p>
          </div>
        </section>
        <section className={styles.arrival} aria-labelledby="arrival-title">
          <header className={styles.sectionHead}><h2 id="arrival-title">From Taksim to your table</h2><p>Check the destination before setting off: our address is Zambak Sokak No:8, not the similarly named Cihangir listing at Defterdar Yokuşu No:52/A.</p></header>
          <ol className={styles.routes}>
            <li><span className={styles.routeIcon}><TrainFront aria-hidden="true" /></span><div><h3>M2 Taksim Metro</h3><p>{questions[2].answer}</p></div><span className={styles.routeMode}>Metro + walk</span></li>
            <li><span className={styles.routeIcon}><BusFront aria-hidden="true" /></span><div><h3>Bus, car or taxi</h3><p>{questions[3].answer}</p></div><span className={styles.routeMode}>Check live route</span></li>
          </ol>
        </section>
        <section className={styles.placeStory} aria-labelledby="place-title">
          <div className={styles.placeImage}><Image src="/images/historic-mirror.webp" alt="Carved mirror and brickwork inside Tarihi Van Kahvaltı Evi" fill sizes="(max-width: 760px) 100vw, 42vw" quality={80} /></div>
          <div className={styles.placeCopy}><h2 id="place-title">Plan your breakfast in Beyoğlu</h2><p>Browse shared breakfasts, individual plates and drinks with current prices in Turkish lira. The two-person minimum applies to Serpme Fix Menu; individual dishes are listed in the menu.</p><Link href="/en/menu">English menu &amp; prices →</Link><p>For a weekend or group visit, ask about availability before travelling. Your table is confirmed after the restaurant replies.</p><Link href="/en/rezervasyon" data-analytics-surface="location_en">Request a table →</Link><p><Link href="/en/coffee-taksim">Visiting for coffee? Explore our coffee menu →</Link></p></div>
        </section>
        <section className={styles.faq} aria-labelledby="location-faq-title"><div className={styles.faqHead}><h2 id="location-faq-title">Before you travel</h2><p>Address, hours, access and table requests.</p></div><div className={styles.faqList}>{questions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
      </main>
      <AnimatedFooter locale="en" />
    </ClientPage>
  </>;
}
