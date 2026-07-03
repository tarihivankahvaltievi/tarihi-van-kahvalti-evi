"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Van kahvaltısı nedir ve neler içerir?",
    answer: "Van kahvaltısı, Türkiye'nin Van ilinin geleneksel serpme kahvaltısıdır. Otlu peynir, murtuğa (un, tereyağı ve yumurta karışımı), kavut (kavrulmuş un tatlısı), cacık, kete, süzme bal, kaymak, sahanda sucuklu yumurta ve sınırsız çay içerir. Tarihi Van Kahvaltı Evi'nde bu sofra bakır sahanlarda, en az iki kişilik servis edilir.",
  },
  {
    question: "Tarihi Van Kahvaltı Evi çalışma saatleri nedir?",
    answer: "Tarihi Van Kahvaltı Evi her gün 08:00 - 18:00 saatleri arasında hizmet vermektedir. Haftanın 7 günü açıktır.",
  },
  {
    question: "Fiyatlar ne kadar?",
    answer: "Geleneksel Van Kahvaltısı kişi başı yaklaşık 450 TL'dir (en az 2 kişilik). Sahanda sucuklu yumurta 180 TL'dir. Serpme kahvaltı yanında sınırsız çay ücretsizdir. Kafka Cafe'de Türk kahvesi ve nitelikli kahve seçenekleri de mevcuttur.",
  },
  {
    question: "Rezervasyon nasıl yapılır?",
    answer: "Rezervasyon için +90 541 525 2868 numaralı telefonu arayabilir veya WhatsApp üzerinden mesaj gönderebilirsiniz. Web sitemizden de online rezervasyon formu doldurabilirsiniz.",
  },
  {
    question: "Tarihi Van Kahvaltı Evi nerede, nasıl gidilir?",
    answer: "Zambak Sk. No:8, Beyoğlu, İstanbul adresinde, Taksim Meydanı'na yürüme mesafesindedir. Tarihi 2. derece tescilli Rum binasında yer almaktadır. Taksim metrosu ve nostaljik tramvaydan kolayca ulaşılabilir.",
  },
  {
    question: "Kafka Cafe nedir?",
    answer: "Kafka Cafe, Tarihi Van Kahvaltı Evi bünyesindeki kahve köşesidir. Bakır cezvede közde pişen geleneksel Türk kahvesi ve nitelikli üçüncü dalga kahve seçenekleri sunulmaktadır. Kahvaltı sonrası sohbeti uzatmak isteyenler için ideal bir mekandır.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--soft)]" id="faq" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto" data-reveal>
        <h2 id="faq-heading" className="text-3xl md:text-5xl text-[var(--ink)] font-serif mb-4 text-center">
          Sıkça Sorulan Sorular
        </h2>
        <p className="text-[var(--muted)] text-center mb-12 max-w-xl mx-auto">
          Tarihi Van Kahvaltı Evi ve serpme kahvaltımız hakkında merak edilenler.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === index ? "bg-white border-[var(--red)] shadow-sm" : "bg-white border-[var(--line)] hover:border-[var(--gold)]"}`}
            >
              <button
                type="button"
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                onClick={() => toggleOpen(index)}
                aria-expanded={openIndex === index}
              >
                <span className={`font-medium pr-4 ${openIndex === index ? "text-[var(--red-dark)]" : "text-[var(--ink)]"}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-[var(--muted)] transition-transform duration-300 flex-shrink-0 ${openIndex === index ? "rotate-180 text-[var(--red)]" : ""}`} 
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-6 text-[var(--muted)] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
