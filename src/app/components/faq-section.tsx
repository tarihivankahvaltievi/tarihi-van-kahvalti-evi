import { faqItems } from "../seo";

export function FaqSection() {
  return (
    <section 
      className="py-24 px-6 md:px-12 bg-[var(--soft)]" 
      id="faq" 
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto" data-reveal>
        <h2 id="faq-heading" className="text-3xl md:text-5xl text-[var(--ink)] font-serif mb-4 text-center">
          Sıkça Sorulan Sorular
        </h2>
        <p className="text-[var(--muted)] text-center mb-12 max-w-xl mx-auto">
          Tarihi Van Kahvaltı Evi ve serpme kahvaltımız hakkında merak edilenler.
        </p>

        <div className="space-y-4">
          {faqItems.map((faq, index) => {
            const answerId = `faq-answer-${index}`;
            return (
              <details
                key={index}
                className="border rounded-lg overflow-hidden bg-white border-[var(--line)] hover:border-[var(--gold)]"
              >
                <summary
                  id={`faq-question-${index}`}
                  className="w-full text-left px-6 py-5 cursor-pointer font-medium text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:ring-inset"
                  aria-controls={answerId}
                >
                  {faq.question}
                </summary>
                <div
                  id={answerId}
                  className="px-6 pb-6 text-[var(--muted)] leading-relaxed"
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
