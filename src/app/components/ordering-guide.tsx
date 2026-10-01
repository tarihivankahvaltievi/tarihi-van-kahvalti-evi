import type { OrderingQuestion } from "../menu/ordering-questions";
import styles from "./ordering-guide.module.css";

export function OrderingGuide({ questions, locale = "tr" }: { questions: OrderingQuestion[]; locale?: "tr" | "en" }) {
  return (
    <section id="ordering-guide" className={styles.section} aria-labelledby="ordering-guide-title">
      <h2 id="ordering-guide-title">{locale === "en" ? "Before you order" : "Sipariş öncesinde"}</h2>
      <p>{locale === "en" ? "Choose a breakfast, check its inclusions and plan your visit." : "Kahvaltınızı seçin, dahil ürünleri kontrol edin ve ziyaretinizi planlayın."}</p>
      <div className={styles.questions}>
        {questions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
      </div>
    </section>
  );
}
