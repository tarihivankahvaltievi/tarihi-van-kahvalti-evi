"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./about-story.module.css";

export function AboutStory({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const reduceMotion = useReducedMotion();

  const easeLuxury = [0.16, 1, 0.3, 1] as const;

  return (
    <section ref={sectionRef} className={styles.section1} id="hakkimizda">
      <div className={styles.container}>
        <div className={styles.article}>
          <motion.div
            className={styles.crestMini}
            initial={reduceMotion ? false : { opacity: 0, y: -16 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -16 }
            }
            transition={{ duration: 0.75, ease: easeLuxury }}
          >
            <div className={styles.crestMini}>
              <Image
                src="/images/brand-emblem-colored.png"
                alt="Tarihi Van Kahvaltı Evi"
                width={52}
                height={36}
                className={styles.crestMiniImg}
                priority
              />
            </div>
          </motion.div>

          <h2 className={styles.title}>
            <motion.span
              className={styles.titleLine}
              initial={reduceMotion ? false : { opacity: 0, y: 26, filter: "blur(5px)" }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 26, filter: "blur(5px)" }
              }
              transition={{ duration: 0.8, delay: 0.1, ease: easeLuxury }}
            >
              {isEn ? "The Warmth of a Van Table" : "Van Sofrasının Sıcaklığı"}
            </motion.span>
            <motion.span
              className={styles.titleLineAccent}
              initial={reduceMotion ? false : { opacity: 0, y: 26, filter: "blur(5px)" }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 26, filter: "blur(5px)" }
              }
              transition={{ duration: 0.8, delay: 0.22, ease: easeLuxury }}
            >
              {isEn ? "in the Heart of Beyoğlu" : "Beyoğlu'nun Kalbinde"}
            </motion.span>
          </h2>

          <motion.div
            className={styles.intro}
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 24, scale: 0.98 }
            }
            transition={{ duration: 0.85, delay: 0.38, ease: easeLuxury }}
          >
            <p>
              {isEn ? (
                <>
                  A generous breakfast, warm bread from the oven and unhurried conversation—this is
                  our invitation to gather around the table.
                </>
              ) : (
                <>
                  Taze ürünler, fırından çıkan sıcak kete ve uzun sohbetler için kurulan cömert bir
                  sofra. Bizim kahvaltı anlayışımız bu kadar yalın.
                </>
              )}
            </p>
          </motion.div>

          <div className={styles.richtext}>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.75, delay: 0.48, ease: easeLuxury }}
            >
              <span>
                {isEn
                  ? "Since 1978, nestled within the historic architecture of Taksim Beyoğlu, three generations of our family have kept the authentic Van breakfast tradition alive. In our registered 18th-century Greek townhouse, between centuried stone walls, every morning transforms into an unhurried, generous feast of hospitality."
                  : "1978 yılından bu yana, Taksim’in tarihi dokusunda üç kuşaktır aynı tutku ve aile emeğiyle misafirlerimizi ağırlıyoruz. İkinci derece tarihi eser statüsündeki 18. yüzyıl Rum konağımızın nostaljik atmosferinde, asırlık taş duvarlar arasında her sabahı lezzetin ve paylaşmanın gerçek anlamına ortak olunan telaşsız bir sofraya dönüştürüyoruz."}
              </span>
            </motion.p>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.75, delay: 0.58, ease: easeLuxury }}
            >
              <span>
                {isEn
                  ? "Direct from the pristine high plateaus of Van, we bring time-honored herb cheese (Otlu Peynir), wild Karakovan honeycomb, and velvety clotted cream—accompanied by sizzling copper pans of buttery murtuğa, roasted kavut, and slow-brewed samovar tea."
                  : "Doğrudan Van yaylalarından temin ettiğimiz coğrafi işaretli hakiki otlu peynir, Karakovan petek balı ve manda sütü taze kaymak; bakır sahanda cızırdayan tereyağlı murtuğa, kavut ve semaverden süzülen tavşan kanı demli çayımızla buluşuyor."}
              </span>
            </motion.p>
          </div>

          <motion.div
            className={styles.btnWrapper}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 18 }
            }
            transition={{ duration: 0.75, delay: 0.75, ease: easeLuxury }}
          >
            <Link href="/hikayemiz" className={styles.btn}>
              <span className={styles.btnLabel}>
                {isEn ? "Discover Our Story" : "Hikâyemizi Keşfedin"}
              </span>
              <span className={styles.btnIconWrap} aria-hidden="true">
                <ArrowRight className={styles.btnArrow} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
