import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, buildRestaurantJsonLd, displayAddress, mapsUrl, openingHours, siteName, siteUrl, telUrl } from "../seo";
import { jsonLd } from "../seo";
import styles from "./taksim-travel-guide.module.css";

export type TravelGuide = {
  path: string;
  language: "ko-KR" | "zh-CN" | "en-GB" | "es";
  title: string;
  description: string;
  kicker: string;
  heading: string;
  lead: string;
  image: string;
  imageAlt: string;
  date: string;
  author: string;
  sections: { id: string; title: string; paragraphs: string[]; points?: { title: string; text: string }[] }[];
  faqTitle: string;
  faq: { question: string; answer: string }[];
  sourcesTitle: string;
  sourcesIntro: string;
  sources: { name: string; url: string }[];
  relatedTitle: string;
  related: { name: string; href: string; language: string }[];
  menuLabel: string;
  menuHref?: string;
  mapLabel: string;
  callLabel: string;
  homeLabel: string;
  contentsLabel?: string;
  topMenuLabel?: string;
  hoursLabel: string;
  addressLabel: string;
  translations?: Record<string, string>;
};

export function travelGuideMetadata(guide: TravelGuide): Metadata {
  const url = absoluteUrl(guide.path);
  return {
    title: { absolute: guide.title },
    description: guide.description,
    alternates: { canonical: url, ...(guide.translations ? { languages: guide.translations } : {}) },
    authors: [{ name: siteName, url: siteUrl }],
    openGraph: {
      type: "article", title: guide.title, description: guide.description, url,
      siteName, locale: ({ "ko-KR": "ko_KR", "zh-CN": "zh_CN", "en-GB": "en_GB", es: "es_ES" } as const)[guide.language],
      publishedTime: guide.date, modifiedTime: guide.date,
      images: [{ url: absoluteUrl(guide.image), alt: guide.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.description, images: [absoluteUrl(guide.image)] },
  };
}

export function TaksimTravelGuide({ guide }: { guide: TravelGuide }) {
  const url = absoluteUrl(guide.path);
  const home = ({ "ko-KR": "/ko", "zh-CN": "/zh-cn", "en-GB": "/en", es: "/es" } as const)[guide.language];
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "BlogPosting", "@id": `${url}#article`, headline: guide.title,
        description: guide.description, inLanguage: guide.language, url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        datePublished: guide.date, dateModified: guide.date,
        author: { "@type": "Organization", name: siteName, url: siteUrl },
        publisher: { "@type": "Organization", name: siteName, url: siteUrl },
        image: absoluteUrl(guide.image),
        citation: guide.sources.map((source) => source.url),
        about: [
          { "@type": "Place", name: "Taksim, Beyoğlu, İstanbul" },
          { "@type": "Thing", name: "Bal kaymak" },
          { "@type": "Thing", name: "Turkish breakfast" },
        ],
      },
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: guide.title, description: guide.description, inLanguage: guide.language, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${url}#article` } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: siteUrl },
        { "@type": "ListItem", position: 2, name: guide.homeLabel, item: absoluteUrl(home) },
        { "@type": "ListItem", position: 3, name: guide.heading, item: url },
      ] },
    ],
  };

  return (
    <main id="main-content" tabIndex={-1} lang={guide.language} className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
      <header className={styles.topbar}>
        <Link href={home} hrefLang={guide.language}>{siteName}</Link>
        <nav aria-label={guide.homeLabel}>
          <Link href={home} hrefLang={guide.language}>{guide.homeLabel}</Link>
          <Link href="/en/menu" hrefLang="en">{guide.topMenuLabel ?? "Menu"}</Link>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">{guide.mapLabel}</a>
        </nav>
      </header>
      <article>
        <header className={styles.hero}>
          <div>
            <p className={styles.kicker}>{guide.kicker}</p>
            <h1>{guide.heading}</h1>
            <p className={styles.lead}>{guide.lead}</p>
            <p className={styles.byline}>{guide.author} · <time dateTime={guide.date}>{guide.date.slice(0, 10)}</time></p>
          </div>
          <figure><Image src={guide.image} alt={guide.imageAlt} fill priority sizes="(max-width: 800px) 100vw, 50vw" /><figcaption>{guide.imageAlt}</figcaption></figure>
        </header>
        <nav className={styles.contents} aria-label={guide.contentsLabel ?? "Contents"}>
          {guide.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
          <a href="#questions">{guide.faqTitle}</a>
        </nav>
        <div className={styles.body}>
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id} className={styles.section}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.points ? <div className={styles.points}>{section.points.map((point) => <div key={point.title}><h3>{point.title}</h3><p>{point.text}</p></div>)}</div> : null}
            </section>
          ))}
          <aside className={styles.visit} aria-label={guide.addressLabel}>
            <h2>Tarihi Van Kahvaltı Evi</h2>
            <dl><div><dt>{guide.addressLabel}</dt><dd>{displayAddress}</dd></div><div><dt>{guide.hoursLabel}</dt><dd>{openingHours.opens}–{openingHours.closes}</dd></div></dl>
            <div className={styles.actions}><Link href={guide.menuHref ?? "/en/menu"} hrefLang="en">{guide.menuLabel}</Link><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{guide.mapLabel}</a><a href={telUrl}>{guide.callLabel}</a></div>
          </aside>
          <section id="questions" className={styles.section}>
            <h2>{guide.faqTitle}</h2>
            {guide.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </section>
          <section className={styles.sources}>
            <h2>{guide.sourcesTitle}</h2><p>{guide.sourcesIntro}</p>
            <ul>{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a></li>)}</ul>
          </section>
          <nav className={styles.related} aria-label={guide.relatedTitle}>
            <h2>{guide.relatedTitle}</h2>
            {guide.related.map((item) => <Link key={item.href} href={item.href} hrefLang={item.language}>{item.name} ↗</Link>)}
          </nav>
        </div>
      </article>
    </main>
  );
}
