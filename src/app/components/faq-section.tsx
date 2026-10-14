import { messagesFor, type SiteLocale } from "../home-localization";
import styles from "./faq-section.module.css";
import { displayAddress, displayPhone, mapsUrl, openingHours, telUrl } from "../seo";

export function FaqSection({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);

  return (
    <section
      className={styles.section}
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className={styles.inner}>
        <div className={styles.headingWrap}>
          <span className={styles.eyebrow}>{messages.faq.eyebrow}</span>
          <h2 id="faq-heading">{messages.faq.title}</h2>
          <p>{messages.faq.intro}</p>
          <div id="location" className={styles.visit} aria-labelledby="home-location-heading">
            <h3 id="home-location-heading">{locale === "en" ? "Address & directions" : "Adres ve yol tarifi"}</h3>
            <address>{displayAddress}</address>
            <p>{locale === "en" ? `Every day ${openingHours.opens}–${openingHours.closes}` : openingHours.short}</p>
            <a href={telUrl}>{displayPhone}</a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              {locale === "en" ? "Get directions on Google Maps →" : "Google Haritalar’da yol tarifi al →"}
            </a>
          </div>
        </div>

        <div className={styles.list}>
          {messages.faq.items.map((faq, index) => {
            const answerId = `faq-answer-${index}`;
            return (
              <details
                key={index}
                className={styles.item}
              >
                <summary
                  id={`faq-question-${index}`}
                  className={styles.question}
                  aria-controls={answerId}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <span className={styles.toggle} aria-hidden="true" />
                </summary>
                <div
                  id={answerId}
                  className={styles.answer}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  {faq.answer}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
