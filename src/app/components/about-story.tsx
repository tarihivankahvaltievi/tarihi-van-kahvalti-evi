import Image from "next/image";
import Link from "next/link";
import { BookingOpenButton } from "./booking-open-button";
import { messagesFor, type SiteLocale } from "../home-localization";
import styles from "./about-story.module.css";

export function AboutStory({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);

  return (
    <section id="story" className={styles.section} aria-labelledby="about-story-title">
      <div className={styles.inner}>
        <div className={styles.visual}>
          <figure className={styles.tablePhoto}>
            <Image
              src="/images/hands-table.webp"
              alt={messages.about.tableAlt}
              fill
              sizes="(max-width: 680px) 84vw, (min-width: 720px) and (max-width: 900px) 33vw, (max-width: 900px) 80vw, 520px"
              quality={74}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className={styles.memoryPhoto}>
            <Image
              src="/images/historic-mirror.webp"
              alt={messages.about.memoryAlt}
              fill
              sizes="(max-width: 680px) 34vw, (min-width: 720px) and (max-width: 900px) 16vw, (max-width: 900px) 37vw, 220px"
              quality={74}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        <div className={styles.copy}>
          <p className={styles.meta}>{messages.about.meta}</p>
          <h2 id="about-story-title" className={styles.title}>
            {messages.about.title}
            <em>{messages.about.titleEmphasis}</em>
          </h2>
          <p className={styles.lead}>{messages.about.lead}</p>

          <nav className={styles.actions} aria-label={messages.about.actionsAria}>
            <Link href={messages.menuHref} className={`${styles.action} ${styles.menuAction}`}>
              <span>{messages.about.primaryAction}</span>
              <span className={styles.actionArrow} aria-hidden="true">↗</span>
            </Link>
            <BookingOpenButton className={`${styles.action} ${styles.bookingAction}`}>
              {messages.about.bookingAction}
            </BookingOpenButton>
          </nav>
        </div>

        <ul className={styles.principles} aria-label={messages.about.principlesAria}>
          {messages.about.principles.map(([title, text]) => (
            <li key={title} className={styles.principle}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
