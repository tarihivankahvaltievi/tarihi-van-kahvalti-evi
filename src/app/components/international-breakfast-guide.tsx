import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Clock3, MapPin, Phone, Utensils } from "lucide-react";
import { displayAddress, displayPhone, mapsUrl, openingHours, telUrl } from "../seo";
import { guidePaths, guides, type GuideContent } from "./international-breakfast-guide-data";
import styles from "./international-breakfast-guide.module.css";

const languageLabels = { en: "English", ru: "Русский", ar: "العربية", ko: "한국어", ja: "日本語" } as const;

export function InternationalBreakfastGuide({ guide }: { guide: GuideContent }) {
  const menuHref = guide.seo?.menuItem?.url ?? "/en/menu";

  return (
    <main
      id="main-content"
      className={styles.page}
      lang={guide.languageTag}
      dir={guide.direction}
      data-locale={guide.locale}
    >
      <article>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.brandLine}>
              <Link href={guide.locale === "en" ? "/en" : "/"} aria-label="Tarihi Van Kahvaltı Evi">
                <Image src="/images/brand-icon-small.png" alt="" width={46} height={58} priority />
                <span>Tarihi Van Kahvaltı Evi</span>
              </Link>
              <nav className={styles.languageSwitch} aria-label="Language versions">
                {Object.entries(guidePaths).map(([locale, path]) => (
                  <Link
                    key={locale}
                    href={path}
                    hrefLang={locale}
                    aria-current={guide.locale === locale ? "page" : undefined}
                  >
                    {languageLabels[locale as keyof typeof languageLabels]}
                  </Link>
                ))}
              </nav>
            </div>

            <div className={styles.heroText}>
              <p className={styles.heroNote}>{guide.hero.note}</p>
              <h1>
                {guide.hero.title} <span>{guide.hero.accent}</span>
              </h1>
              <p className={styles.heroLead}>{guide.hero.lead}</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#what-is-turkish-breakfast">
                  {guide.hero.readLabel} <ArrowDown size={17} aria-hidden="true" />
                </a>
                <Link className={styles.secondaryAction} href={menuHref} hrefLang="en">
                  {guide.hero.menuLabel} <Utensils size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <p className={styles.byline}>
              {guide.authorHref ? <Link href={guide.authorHref}>{guide.authorLabel}</Link> : guide.authorLabel}{" "}
              <span aria-hidden="true">·</span> {guide.updatedLabel}:{" "}
              <time dateTime="2026-07-21">{guide.dateLabel}</time>
            </p>
          </div>

          <figure className={styles.heroVisual}>
            <Image
              src={guide.media?.hero ?? "/images/hero-parallax/overhead-feast.webp"}
              alt={guide.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 920px) 100vw, 54vw"
              quality={82}
            />
            <figcaption>{guide.hero.imageCaption}</figcaption>
          </figure>
        </header>

        <nav className={styles.articleNav} aria-label={guide.nav.label}>
          <strong>{guide.nav.label}</strong>
          <a href="#what-is-turkish-breakfast">{guide.nav.answer}</a>
          <a href="#breakfast-table">{guide.nav.table}</a>
          <a href="#why-choose-us">{guide.nav.choose}</a>
          <a href="#plan-your-visit">{guide.nav.visit}</a>
          <a href="#questions">{guide.nav.faq}</a>
        </nav>

        {guide.breadcrumbs ? (
          <nav className={styles.breadcrumbs} aria-label={guide.breadcrumbs.aria}>
            <ol>
              <li><Link href="/">{guide.breadcrumbs.home}</Link></li>
              <li aria-current="page">{guide.breadcrumbs.current}</li>
            </ol>
          </nav>
        ) : null}

        <section id="what-is-turkish-breakfast" className={styles.answer} aria-labelledby="answer-title">
          <div className={styles.sectionLabel}>{guide.shortAnswer.label}</div>
          <div className={styles.answerCopy}>
            <h2 id="answer-title">{guide.shortAnswer.title}</h2>
            {guide.shortAnswer.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        {guide.travelerBrief ? (
          <section className={styles.travelerBrief} aria-labelledby="traveler-brief-title">
            <header>
              <p className={styles.sectionLabel}>{guide.travelerBrief.label}</p>
              <h2 id="traveler-brief-title">{guide.travelerBrief.title}</h2>
              <p>{guide.travelerBrief.intro}</p>
            </header>
            <dl className={styles.factGrid}>
              {guide.travelerBrief.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.comparison}>
              <h3>{guide.travelerBrief.comparison.title}</h3>
              <div className={styles.comparisonScroller}>
                <table>
                  <thead><tr>{guide.travelerBrief.comparison.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
                  <tbody>
                    {guide.travelerBrief.comparison.rows.map((row) => (
                      <tr key={row.name}><th scope="row">{row.name}</th><td>{row.texture}</td><td>{row.taste}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.phrases}>
              <div><h3>{guide.travelerBrief.phrases.title}</h3><p>{guide.travelerBrief.phrases.intro}</p></div>
              <ul>
                {guide.travelerBrief.phrases.items.map((phrase) => (
                  <li key={phrase.turkish}><strong lang="tr">{phrase.turkish}</strong><span>{phrase.translation}</span></li>
                ))}
              </ul>
            </div>
            <Link className={styles.briefMenuLink} href={menuHref} hrefLang="en">
              {guide.hero.menuLabel} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </section>
        ) : null}

        <section id="breakfast-table" className={styles.tableSection} aria-labelledby="table-title">
          <header className={styles.sectionHeading}>
            <h2 id="table-title">{guide.table.title}</h2>
            <p>{guide.table.intro}</p>
          </header>
          <div className={styles.menuList}>
            {guide.table.items.map((item, index) => (
              <article key={item.name} className={styles.menuItem}>
                <span className={styles.itemNumber}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.name}</h3>
                  <p className={styles.itemRole}>{item.role}</p>
                </div>
                <p className={styles.itemDescription}>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.tradition} aria-labelledby="tradition-title">
          <figure>
            <Image
              src={guide.media?.article ?? "/images/hands-table.webp"}
              alt={guide.tradition.imageAlt}
              fill
              sizes="(max-width: 840px) 100vw, 48vw"
              quality={80}
            />
            <figcaption>{guide.tradition.caption}</figcaption>
          </figure>
          <div className={styles.traditionCopy}>
            <h2 id="tradition-title">{guide.tradition.title}</h2>
            {guide.tradition.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section id="why-choose-us" className={styles.reasons} aria-labelledby="reasons-title">
          <header className={styles.reasonsIntro}>
            <h2 id="reasons-title">{guide.reasons.title}</h2>
            <p>{guide.reasons.intro}</p>
          </header>
          <div className={styles.reasonList}>
            {guide.reasons.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.firstVisit} aria-labelledby="first-visit-title">
          <header>
            <h2 id="first-visit-title">{guide.firstVisit.title}</h2>
            <p>{guide.firstVisit.intro}</p>
          </header>
          <ol>
            {guide.firstVisit.steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="plan-your-visit" className={styles.practical} aria-labelledby="practical-title">
          <div>
            <h2 id="practical-title">{guide.practical.title}</h2>
            <p>{guide.practical.text}</p>
          </div>
          <dl>
            <div>
              <dt><MapPin size={18} aria-hidden="true" /> {guide.practical.labels.address}</dt>
              <dd>{displayAddress}</dd>
            </div>
            <div>
              <dt><Clock3 size={18} aria-hidden="true" /> {guide.practical.labels.hours}</dt>
              <dd>{openingHours.opens}–{openingHours.closes}</dd>
            </div>
          </dl>
          <div className={styles.practicalActions}>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              {guide.practical.labels.route} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <Link href={menuHref} hrefLang="en">{guide.practical.labels.menu}</Link>
            <a href={telUrl}>
              <Phone size={15} aria-hidden="true" /> {guide.practical.labels.call}: <bdi>{displayPhone}</bdi>
            </a>
          </div>
        </section>

        <section id="questions" className={styles.faq} aria-labelledby="faq-title">
          <h2 id="faq-title">{guide.faq.title}</h2>
          <div>
            {guide.faq.items.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <aside className={styles.sources} aria-labelledby="guide-sources-title">
          <div>
            <h2 id="guide-sources-title">{guide.sources.title}</h2>
            <p>{guide.sources.note}</p>
          </div>
          <ul>
            {guide.sources.items.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.label} <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <section className={styles.closing}>
          <div>
            <h2>{guide.closing.title}</h2>
            <p>{guide.closing.text}</p>
          </div>
          <div>
            <Link href={menuHref} hrefLang="en">{guide.closing.menu}</Link>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">{guide.closing.directions}</a>
          </div>
        </section>
      </article>

      <footer className={styles.footer}>
        <Link href={guide.locale === "en" ? "/en" : "/"} className={styles.footerBrand}>
          <Image src="/images/brand-icon-small.png" alt="" width={40} height={50} />
          <span>Tarihi Van Kahvaltı Evi<small>{guide.footer.note}</small></span>
        </Link>
        <nav aria-label="Footer">
          <Link href="/en" hrefLang="en">{guide.footer.home}</Link>
          <Link href={menuHref} hrefLang="en">{guide.footer.menu}</Link>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">{guide.footer.directions}</a>
        </nav>
      </footer>
    </main>
  );
}

export function getGuide(locale: keyof typeof guides) {
  return guides[locale];
}
