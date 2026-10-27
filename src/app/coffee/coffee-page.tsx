import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ClientPage, { type PageNavigation } from "../client-page";
import { getPublicMenuData } from "../menu/public-menu-data";
import { CoffeeMenuPreview } from "./coffee-menu-preview";
import { getFeaturedCoffees, buildCoffeeMenuList, type FeaturedCoffee } from "./coffee-menu-data";
import { CoffeeVisit } from "./coffee-visit";
import { CoffeeFooter } from "./coffee-footer";
import { CoffeeScene } from "./coffee-interactions";
import { absoluteUrl, buildBreadcrumbJsonLd, buildRestaurantJsonLd, jsonLd, mapsUrl, openingHours, siteName, siteUrl } from "../seo";
import styles from "./coffee.module.css";

import { coffeeCopy, coffeePaths, coffeeLocales, coffeeLanguageNames, coffeeLanguageTags, coffeeGuidePaths, coffeeOgLocales, type CoffeeLocale } from "./coffee-localization";

export const coffeeAlternates = Object.fromEntries([
  ...coffeeLocales.map((locale) => [coffeeLanguageTags[locale], absoluteUrl(coffeePaths[locale])]),
  ["x-default", absoluteUrl(coffeePaths.tr)],
]);

export function coffeeMetadata(locale: CoffeeLocale): Metadata {
  const c = coffeeCopy[locale];
  const url = absoluteUrl(coffeePaths[locale]);
  return {
    title: { absolute: c.title }, description: c.description,
    alternates: { canonical: url, languages: coffeeAlternates },
    openGraph: { title: c.title, description: c.description, url, siteName, locale: coffeeOgLocales[locale], alternateLocale: coffeeLocales.filter((other) => other !== locale).map((other) => coffeeOgLocales[other]), type: "website", images: [{ url: absoluteUrl("/images/coffee/coffee-og.jpg"), width: 1200, height: 630, alt: c.images.guests }] },
    twitter: { card: "summary_large_image", title: c.title, description: c.description, images: [absoluteUrl("/images/coffee/coffee-og.jpg")] },
  };
}

function LanguageLinks({ locale }: { locale: CoffeeLocale }) {
  return <nav className={styles.languageLinks} aria-label={coffeeCopy[locale].languages}>
    {coffeeLocales.map((other) => <Link key={other} href={coffeePaths[other]} hrefLang={coffeeLanguageTags[other]} lang={coffeeLanguageTags[other]} aria-current={other === locale ? "page" : undefined}>{coffeeLanguageNames[other]}</Link>)}
  </nav>;
}

function CoffeeContent({ locale, items }: { locale: CoffeeLocale; items: FeaturedCoffee[] }) {
  const c = coffeeCopy[locale];
  const menu = locale === "tr" ? "/menu" : "/en/menu";
  const choiceTargets = ["turk-kahvesi", "sicak-kahveler", "soguk-kahveler"];
  return <main data-analytics-surface="coffee_page" id="main-content" className={styles.page} lang={coffeeLanguageTags[locale]} dir={locale === "ar" ? "rtl" : "ltr"} data-locale={locale} tabIndex={-1}>
    <LanguageLinks locale={locale} />
    <section className={styles.hero} aria-labelledby="coffee-heading">
      <CoffeeScene alt={c.images.cup} />
      <div className={styles.heroCopy}>
        <h1 id="coffee-heading">{c.hero[0]}<br /><span>{c.hero[1]}</span></h1>
        <p>{c.introduction}</p>
        <div className={styles.heroActions}>
          <Link href={`${menu}#sicak-kahveler`} hrefLang={locale === "tr" ? "tr" : "en"} data-analytics-surface="coffee_hero" className={styles.heroMenu}>{c.menu} <ArrowUpRight size={18} /></Link>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" data-analytics-surface="coffee_hero" className={styles.heroDirections}>{c.visit} <ArrowUpRight size={17} /></a>
        </div>
        <a href="#kahve-hikayesi" className={styles.discover} aria-label={c.discover}><ArrowDown size={21} strokeWidth={1.3} /></a>
      </div>
    </section>

    <section id="kahve-hikayesi" className={styles.story} aria-labelledby="coffee-story-title">
      <div className={styles.engraving} aria-hidden="true" />
      <div className={styles.storyIntro}>
        <Image src="/images/brand-emblem-colored.png" alt="" width={85} height={58} className={styles.emblem} />
        <h2 id="coffee-story-title">{c.story[0]}<br /><span>{c.story[1]}</span></h2>
        <p>{c.storyText}</p>
        <Link href={`${menu}#sicak-kahveler`} hrefLang={locale === "tr" ? "tr" : "en"} data-analytics-surface="coffee_story" className={styles.menuLink}>{c.menu} <ArrowUpRight size={17} /></Link>
        <p className={styles.menuNote}>{c.menuNote}</p>
      </div>
      <div className={styles.frames}>
        <figure className={styles.frameLeft} data-aos="fade-right">
          <div className={styles.framedPhoto}>
            <Image src="/images/interior-chair.webp" alt={c.images.interior} fill sizes="(max-width: 600px) 42vw, 360px" className={styles.venuePhoto} />
            <Image src="/images/coffee/antique-frame.webp" alt="" fill sizes="(max-width: 600px) 45vw, 390px" className={styles.pictureFrame} />
          </div>
          <figcaption>{c.captions[0]}</figcaption>
        </figure>
        <figure className={styles.frameRight} data-aos="fade-left">
          <div className={styles.framedPhoto}>
            <Image src="/images/coffee-moment.webp" alt={c.images.guests} fill sizes="(max-width: 600px) 42vw, 360px" className={styles.venuePhoto} />
            <Image src="/images/coffee/antique-frame.webp" alt="" fill sizes="(max-width: 600px) 45vw, 390px" className={styles.pictureFrame} />
          </div>
          <figcaption>{c.captions[1]}</figcaption>
        </figure>
      </div>
    </section>

    <section className={styles.coffeeBar} aria-labelledby="coffee-bar-title">
      <div className={styles.coffeeBarHead}>
        <h2 id="coffee-bar-title">{c.bar[0]}<br /><span>{c.bar[1]}</span></h2>
        <p>{c.barText[0]}<br />{c.barText[1]}</p>
      </div>
      <nav aria-label={c.nav.coffee} className={styles.coffeeChoices}>
        {c.choices.map(([name, first, second, action], index) => <Link key={choiceTargets[index]} href={`${menu}#${choiceTargets[index]}`} hrefLang={locale === "tr" ? "tr" : "en"} data-analytics-surface="coffee_selection"><span className={styles.choiceName}>{name}</span><span className={styles.choiceDescription}>{first}<br />{second}</span><span className={styles.choiceAction}>{action} <ArrowUpRight size={18} /></span></Link>)}
      </nav>
    </section>

    <CoffeeMenuPreview items={items} locale={locale} />

    <section className={styles.venue} aria-labelledby="coffee-venue-title">
      <Image src="/hamour/anchor-2.png" alt="" width={74} height={41} className={styles.sectionAnchor} />
      <Image src="/images/atmosphere-banner-bg.webp" alt={c.images.venue} fill sizes="100vw" quality={84} className={styles.venueBackground} />
      <div className={styles.venueContent}>
        <div><h2 id="coffee-venue-title">{c.venue}</h2><p dir="ltr">Zambak Sk. No:8 · Beyoğlu · İstanbul</p><p className={styles.hours}>{c.hours} · <bdi dir="ltr">{openingHours.opens}–{openingHours.closes}</bdi></p></div>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" data-analytics-surface="coffee_venue" className={styles.directions}>{c.directions} <ArrowUpRight size={18} /></a>
      </div>
    </section>
    <CoffeeVisit locale={locale} />
  </main>;
}

export async function LocalizedCoffeePage({ locale }: { locale: CoffeeLocale }) {
  const menu = await getPublicMenuData();
  const items = getFeaturedCoffees(menu.items, locale);
  const c = coffeeCopy[locale];
  const url = absoluteUrl(coffeePaths[locale]);
  const navigation: PageNavigation = {
    language: coffeeLanguageTags[locale], homeHref: coffeePaths[locale],
    open: c.nav.open, close: c.nav.close, languageLabel: c.languages,
    items: [
      { href: coffeePaths[locale], label: c.nav.coffee },
      { href: locale === "tr" ? "/menu" : "/en/menu", label: c.nav.menu },
      { href: coffeeGuidePaths[locale], label: c.nav.guide },
      { href: mapsUrl, label: c.nav.location },
    ],
    languages: coffeeLocales.map((other) => ({ href: coffeePaths[other], label: coffeeLanguageNames[other], language: coffeeLanguageTags[other] })),
  };
  const schema = { "@context": "https://schema.org", "@graph": [{ ...buildRestaurantJsonLd(false), amenityFeature: ["Wi-Fi", "Power outlets", "Laptop work areas"].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })) },
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: c.title, description: c.description, inLanguage: coffeeLanguageTags[locale], isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${siteUrl}/#restaurant` }, mainEntity: { "@id": `${siteUrl}/#restaurant` },
      primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl("/images/coffee/coffee-og.jpg"), width: 1200, height: 630, caption: c.images.guests },
      ...(items.length ? { mentions: { "@id": `${url}#coffee-menu` } } : {}),
    },
    buildBreadcrumbJsonLd(url, c.nav.coffee, false, locale === "tr" ? "Ana sayfa" : c.nav.guide, locale === "tr" ? siteUrl : absoluteUrl(coffeeGuidePaths[locale])),
    ...(items.length ? [buildCoffeeMenuList(items, locale)] : []),
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <ClientPage locale={locale === "tr" ? "tr" : "en"} navigation={navigation}><CoffeeContent locale={locale} items={items} /><CoffeeFooter locale={locale} /></ClientPage>
  </>;
}
