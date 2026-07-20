import { messagesFor, type SiteLocale } from "../home-localization";

export function FaqSection({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);

  return (
    <section
      className="faq-section"
      id="faq" 
      aria-labelledby="faq-heading"
    >
      <div className="faq-inner">
        <div className="faq-heading-wrap">
          <span>{messages.faq.eyebrow}</span>
          <h2 id="faq-heading">{messages.faq.title}</h2>
          <p>{messages.faq.intro}</p>
        </div>

        <div className="faq-list">
          {messages.faq.items.map((faq, index) => {
            const answerId = `faq-answer-${index}`;
            return (
              <details
                key={index}
                className="faq-item"
              >
                <summary
                  id={`faq-question-${index}`}
                  className="faq-question"
                  aria-controls={answerId}
                >
                  {faq.question}
                </summary>
                <div
                  id={answerId}
                  className="faq-answer"
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
