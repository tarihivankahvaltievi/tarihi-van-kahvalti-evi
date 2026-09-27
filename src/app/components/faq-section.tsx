import { messagesFor, type SiteLocale } from "../home-localization";
import styles from "./faq-section.module.css";

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
                  <span className={styles.number} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
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
