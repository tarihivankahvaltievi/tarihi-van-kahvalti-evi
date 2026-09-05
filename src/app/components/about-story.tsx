"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Landmark, HeartHandshake } from "lucide-react";
import styles from "./about-story.module.css";

export function AboutStory({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const reduceMotion = useReducedMotion();

  const easeLuxury = [0.16, 1, 0.3, 1] as const;

  const stats = isEn
    ? [
        {
          icon: HeartHandshake,
          num: "1978",
          label: "Three Generations",
          sub: "Family Heritage",
        },
        {
          icon: Landmark,
          num: "18th C.",
          label: "Historic Greek House",
          sub: "Beyoğlu Zambak St.",
        },
        {
          icon: Sparkles,
          num: "100%",
          label: "Authentic Van Plateaus",
          sub: "Protected Origin",
        },
      ]
    : [
        {
          icon: HeartHandshake,
          num: "1978",
          label: "Üç Kuşak",
          sub: "Aile Mirası",
        },
        {
          icon: Landmark,
          num: "18. YY",
          label: "Tarihi Rum Konağı",
          sub: "Beyoğlu Zambak Sokak",
        },
        {
          icon: Sparkles,
          num: "%100",
          label: "Hakiki Van Yaylası",
          sub: "Coğrafi İşaretli",
        },
      ];

  return (
    <section ref={sectionRef} className={styles.section1} id="hakkimizda">
      {/* Background Luminous Aura & Heritage Watermark */}
      <div className={styles.bgAura} aria-hidden="true" />

      <div className={styles.watermarkWrap} aria-hidden="true">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={
            isInView
              ? { opacity: 0.065, scale: 1 }
              : { opacity: 0, scale: 0.92 }
          }
          transition={{ duration: 1.4, ease: easeLuxury }}
          className={styles.watermarkInner}
        >
          <Image
            src="/images/brand-emblem-colored.png"
            alt=""
            width={720}
            height={492}
            className={styles.watermarkImg}
            priority
          />
        </motion.div>
      </div>

      <div className={styles.container}>
        <div className={styles.article}>
          {/* Top Heritage Emblem & Kicker Badge */}
          <motion.div
            className={styles.badgeWrapper}
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
            <div className={styles.kickerRow}>
              <span className={styles.kickerDiamond}>◆</span>
              <span className={styles.kickerLine} aria-hidden="true" />
              <span className={styles.kickerText}>
                {isEn ? "SINCE 1978 • BEYOĞLU, ISTANBUL" : "1978'DEN BERİ • BEYOĞLU ZAMBAK SOKAK"}
              </span>
              <span className={styles.kickerLine} aria-hidden="true" />
              <span className={styles.kickerDiamond}>◆</span>
            </div>
          </motion.div>

          {/* Staggered Heading Reveal with Tok Physics */}
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
              {isEn ? "Experience the Living Heritage" : "Van Sofrasının Asırlık Mirası,"}
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
              {isEn ? "of Authentic Van Breakfast" : "Beyoğlu'nun En Sıcak Masasında"}
            </motion.span>
          </h2>

          {/* Elegant Divider Flourish */}
          <motion.div
            className={styles.flourishDivider}
            initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
            animate={
              isInView
                ? { opacity: 1, scaleX: 1 }
                : { opacity: 0, scaleX: 0 }
            }
            transition={{ duration: 0.85, delay: 0.32, ease: easeLuxury }}
            aria-hidden="true"
          >
            <span className={styles.flourishLine} />
            <span className={styles.flourishDiamond}>◆</span>
            <span className={styles.flourishLine} />
          </motion.div>

          {/* Luxury Editorial Quote Pod */}
          <motion.div
            className={styles.quotePod}
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 24, scale: 0.98 }
            }
            transition={{ duration: 0.85, delay: 0.38, ease: easeLuxury }}
          >
            <div className={styles.quoteMark} aria-hidden="true">“</div>
            <p className={styles.quoteText}>
              {isEn ? (
                <>
                  For us, breakfast is an invitation to slow down—a generous table shared with loved
                  ones, oven-warm Van kete, and stories told over freshly brewed tea.
                </>
              ) : (
                <>
                  Bizim için kahvaltı; telaşsız bir sabahın, taş fırından yeni çıkan sıcak Van ketesinin ve
                  sevdiklerinizle paylaşılan cömert bir sofranın en samimi davetidir.
                </>
              )}
            </p>
            <div className={styles.quoteAuthor}>
              <span className={styles.authorLine} />
              <span className={styles.authorName}>
                {isEn ? "Historic Van Breakfast House Family" : "Tarihi Van Kahvaltı Evi Ailesi"}
              </span>
              <span className={styles.authorLine} />
            </div>
          </motion.div>

          {/* Rich Narrative Story Body in Balanced Dual Paragraphs */}
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

          {/* Sleek Prestige Heritage Strip */}
          <motion.div
            className={styles.heritageStrip}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.75, delay: 0.65, ease: easeLuxury }}
          >
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className={styles.heritageItem}>
                  <div className={styles.heritageIconWrap}>
                    <IconComp className={styles.heritageIcon} />
                  </div>
                  <div className={styles.heritageTextWrap}>
                    <span className={styles.heritageNum}>{stat.num}</span>
                    <span className={styles.heritageLabel}>{stat.label}</span>
                    <span className={styles.heritageSub}>{stat.sub}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Interactive Luxury CTA Link */}
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
