import Image from "next/image";
import styles from "./about-story.module.css";

const principles = [
  {
    title: "Mekânın ruhu",
    text: "Zambak Sokak'ın nostaljik ayrıntıları arasında, şehrin hızından uzak bir masa.",
  },
  {
    title: "Günlük emek",
    text: "Taze hazırlanan reçeller, sıcak pişiler ve özenle kurulan kahvaltı.",
  },
  {
    title: "Van sofrası",
    text: "Otlu peynir, murtuğa, kete ve demli çayla yöresel karakter.",
  },
];

export function AboutStory() {
  return (
    <section id="story" className={styles.section} aria-labelledby="about-story-title">
      <div className={styles.inner}>
        <div className={styles.visual}>
          <figure className={styles.tablePhoto}>
            <Image
              src="/images/hands-table.jpg"
              alt="Kahvaltı sofrasında peynir, reçel ve tahin tabaklarını uzatan eller"
              fill
              sizes="(max-width: 680px) calc(100vw - 2rem), (max-width: 900px) calc(100vw - 7rem), 520px"
              loading="lazy"
            />
          </figure>
          <figure className={styles.memoryPhoto}>
            <Image
              src="/images/historic-mirror.jpg"
              alt="Mekândaki oymalı çerçeveli ayna ve aynaya yansıyan tuğla duvar"
              fill
              sizes="(max-width: 680px) 34vw, (max-width: 900px) 38vw, 220px"
              loading="lazy"
            />
          </figure>
        </div>

        <div className={styles.copy}>
          <p className={styles.meta}>Hakkımızda · Beyoğlu</p>
          <h2 id="about-story-title" className={styles.title}>
            Van sofrası,
            <em>Zambak Sokak&apos;ta ağır ağır kurulur.</em>
          </h2>
          <p className={styles.lead}>
            Zambak Sokak&apos;ın kendine özgü dokusu içinde, Van kahvaltısının sevilen tatlarını aynı sofrada buluşturuyoruz. Otlu peynirden murtuğaya, sıcak pişiden ev yapımı reçellere kadar her tabağı günlük, taze ve özenli hazırlıyoruz. Nostaljik ayrıntılarla çevrili mekânımızda kahvaltıyı hızlı bir öğün değil; çayın demlendiği, sohbetin uzadığı sakin bir buluşma olarak görüyoruz.
          </p>

          <ul className={styles.principles} aria-label="Tarihi Van Kahvaltı Evi'nin sofra yaklaşımı">
            {principles.map((principle) => (
              <li key={principle.title} className={styles.principle}>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
