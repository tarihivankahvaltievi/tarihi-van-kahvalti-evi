import Image from "next/image";
import Link from "next/link";
import { BookingOpenButton } from "./booking-open-button";
import { messagesFor, type SiteLocale } from "../home-localization";
import styles from "./about-story.module.css";

export function AboutStory({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const about = messages.about;

  return (
    <section id="story" className={styles.section} aria-labelledby="about-story-title">
      <div className={styles.container}>
        {/* Top Heraldic Crest / Vector Motif */}
        <div className={styles.crestWrapper}>
          <div className={styles.crestLine} aria-hidden="true" />
          <div className={styles.crestBadge}>
            <Image
              src="/images/brand-icon-small.png"
              alt={about.crestAlt}
              width={48}
              height={60}
              className={styles.crestImage}
              loading="lazy"
            />
          </div>
          <div className={styles.crestLine} aria-hidden="true" />
        </div>

        {/* Header & Typography */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>{about.eyebrow}</span>
          <h2 id="about-story-title" className={styles.title}>
            {about.title} <span className={styles.titleAccent}>{about.titleEmphasis}</span>
          </h2>
        </header>

        {/* Editorial Split Content */}
        <div className={styles.contentGrid}>
          {/* Visual Showcase: Overlapping Artisan Frames */}
          <div className={styles.visualColumn}>
            <div className={styles.mainFrame}>
              <Image
                src="/images/hands-table.webp"
                alt={about.tableAlt}
                fill
                sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 560px"
                className={styles.mainImage}
                quality={82}
                loading="lazy"
              />
              <div className={styles.imageOverlay} />
            </div>

            <div className={styles.floatingFrame}>
              <Image
                src="/images/historic-mirror.webp"
                alt={about.memoryAlt}
                fill
                sizes="(max-width: 768px) 42vw, 220px"
                className={styles.floatingImage}
                quality={80}
                loading="lazy"
              />
              <div className={styles.frameStamp}>
                <span>1978</span>
              </div>
            </div>
          </div>

          {/* Narrative & Philosophy */}
          <div className={styles.narrativeColumn}>
            <p className={styles.lead}>{about.lead}</p>
            <p className={styles.storyText}>{about.storyP1}</p>
            <p className={styles.storyText}>{about.storyP2}</p>

            <div className={styles.actions}>
              <Link href={messages.aboutHref} className={styles.primaryBtn}>
                <span>{about.primaryAction}</span>
                <span className={styles.btnArrow} aria-hidden="true">→</span>
              </Link>
              <Link href={messages.menuHref} className={styles.secondaryBtn}>
                <span>{about.secondaryAction}</span>
              </Link>
              <BookingOpenButton className={styles.bookingBtn}>
                <span>{about.bookingAction}</span>
              </BookingOpenButton>
            </div>
          </div>
        </div>

        {/* Bottom Three Pillars / Heritage Principles */}
        <div className={styles.principlesWrapper}>
          <ul className={styles.principles} aria-label={about.principlesAria}>
            {about.principles.map(([title, text], idx) => (
              <li key={title} className={styles.principle}>
                <span className={styles.principleNumber}>0{idx + 1}</span>
                <div className={styles.principleBody}>
                  <h3 className={styles.principleTitle}>{title}</h3>
                  <p className={styles.principleText}>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

