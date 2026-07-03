"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "../seo";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="py-24 px-6 md:px-12 bg-[var(--soft)]" 
      id="faq" 
      aria-labelledby="faq-heading"
      itemScope 
      itemType="https://schema.org/FAQPage"
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
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === index ? "bg-white border-[var(--red)] shadow-sm" : "bg-white border-[var(--line)] hover:border-[var(--gold)]"}`}
                itemProp="mainEntity"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:ring-inset"
                  onClick={() => toggleOpen(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={answerId}
                >
                  <span 
                    className={`font-medium pr-4 ${openIndex === index ? "text-[var(--red-dark)]" : "text-[var(--ink)]"}`}
                    itemProp="name"
                  >
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[var(--muted)] transition-transform duration-300 flex-shrink-0 ${openIndex === index ? "rotate-180 text-[var(--red)]" : ""}`} 
                  />
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={answerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      role="region"
                      aria-labelledby={`faq-heading-${index}`}
                      itemProp="acceptedAnswer"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <div 
                        className="px-6 pb-6 text-[var(--muted)] leading-relaxed"
                        itemProp="text"
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
