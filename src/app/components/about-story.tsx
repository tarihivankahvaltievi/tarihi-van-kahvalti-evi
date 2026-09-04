import Image from "next/image";
import Link from "next/link";
import { messagesFor, type SiteLocale } from "../home-localization";
import styles from "./about-story.module.css";

export function AboutStory({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const about = messages.about;

  return (
    <section id="story" className={styles.section} aria-labelledby="about-story-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <Image
            src="/images/brand-icon-small.png"
            alt={about.crestAlt}
            width={54}
            height={67}
            className={styles.crestImage}
            loading="lazy"
          />
          <h2 id="about-story-title" className={styles.title}>
            {about.title} <span className={styles.titleAccent}>{about.titleEmphasis}</span>
          </h2>
        </header>

        <div className={styles.narrative}>
          <p className={styles.lead}>{about.lead}</p>
          <p className={styles.storyText}>{about.storyP1}</p>
          <p className={styles.storyText}>{about.storyP2}</p>
          <Link href={messages.aboutHref} className={styles.storyLink}>
            <span>{about.primaryAction}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className={styles.principlesWrapper}>
          <ul className={styles.principles} aria-label={about.principlesAria}>
            {about.principles.map(([title, text], idx) => (
              <li key={title} className={styles.principle}>
                <span className={styles.principleNumber}>{idx + 1}</span>
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
