import { faqItems } from "../seo";

export function FaqSection() {
  return (
    <section
      className="faq-section"
      id="faq" 
      aria-labelledby="faq-heading"
    >
      <div className="faq-inner" data-reveal>
        <div className="faq-heading-wrap">
          <span>Merak edilenler</span>
          <h2 id="faq-heading">
          Sıkça Sorulan Sorular
          </h2>
          <p>Tarihi Van Kahvaltı Evi ve serpme kahvaltımız hakkında kısa cevaplar.</p>
        </div>

        <div className="faq-list">
          {faqItems.map((faq, index) => {
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
