"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Landmark, HeartHandshake } from "lucide-react";
import styles from "./about-story.module.css";

export function AboutStory({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";
  const reduceMotion = useReducedMotion();

  const highlights = isEn
    ? [
        {
          icon: Sparkles,
          title: "Authentic Plateau Delicacies",
          desc: "Direct from Van: protected-origin herb cheese, wild Karakovan honeycomb & clotted cream",
        },
        {
          icon: HeartHandshake,
          title: "Family Heritage Since 1978",
          desc: "Three generations of hospitality, generous breakfast spreads, and enduring family warmth",
        },
        {
          icon: Landmark,
          title: "Historic Greek Townhouse",
          desc: "A registered 18th-century cultural heritage gem nestled in Beyoğlu Zambak Street",
        },
      ]
    : [
        {
          icon: Sparkles,
          title: "Hakiki Yayla Lezzetleri",
          desc: "Van'dan sofranıza coğrafi işaretli otlu peynir, Karakovan petek balı ve manda kaymağı",
        },
        {
          icon: HeartHandshake,
          title: "1978'den Beri Aile Mirası",
          desc: "Üç kuşaktır değişmeyen samimiyet, cömert sofra bereketi ve hakiki misafirperverlik",
        },
        {
          icon: Landmark,
          title: "Tarihi Rum Konağı",
          desc: "Beyoğlu Zambak Sokak'ta 18. yüzyıldan bugüne yaşayan 2. derece tescilli tarihi atmosfer",
        },
      ];

  return (
    <section className={styles.section1} id="hakkimizda">
      {/* Background Heritage Crest Watermark */}
      <div className={styles.watermarkWrap} aria-hidden="true">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          whileInView={reduceMotion ? undefined : { opacity: 0.05, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.crestMini}>
              <Image
                src="/images/brand-emblem-colored.png"
                alt="Tarihi Van Kahvaltı Evi"
                width={52}
                height={36}
                className={styles.crestMiniImg}
              />
            </div>
            <div className={styles.kickerRow}>
              <span className={styles.kickerLine} aria-hidden="true" />
              <span className={styles.kickerText}>
                {isEn ? "SINCE 1978 • BEYOĞLU, ISTANBUL" : "1978'DEN BERİ • BEYOĞLU ZAMBAK SOKAK"}
              </span>
              <span className={styles.kickerLine} aria-hidden="true" />
            </div>
          </motion.div>

          {/* Staggered Heading Reveal */}
          <motion.h2
            className={styles.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.14,
                  delayChildren: reduceMotion ? 0 : 0.08,
                },
              },
            }}
          >
            <motion.span
              className={styles.titleLine}
              variants={{
                hidden: reduceMotion ? {} : { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {isEn ? "Experience the Living Heritage" : "Van Sofrasının Asırlık Mirası,"}
            </motion.span>
            <motion.span
              className={styles.titleLineAccent}
              variants={{
                hidden: reduceMotion ? {} : { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {isEn ? "of Authentic Van Breakfast" : "Beyoğlu'nun En Sıcak Masasında"}
            </motion.span>
          </motion.h2>

          {/* Elegant Divider Flourish */}
          <motion.div
            className={styles.flourishDivider}
            initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <span className={styles.flourishLine} />
            <span className={styles.flourishDiamond}>◆</span>
            <span className={styles.flourishLine} />
          </motion.div>

          {/* Featured Warm Quote Statement */}
          <motion.p
            className={styles.quote}
            initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(4px)" }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {isEn ? (
              <>
                “For us, breakfast is an invitation to slow down—a generous table shared with loved
                ones, oven-warm Van kete, and stories told over freshly brewed tea.”
              </>
            ) : (
              <>
                “Bizim için kahvaltı; telaşsız bir sabahın, taş fırından yeni çıkan sıcak Van ketesinin ve
                sevdiklerinizle paylaşılan cömert bir sofranın en samimi davetidir.”
              </>
            )}
          </motion.p>

          {/* Rich Narrative Body */}
          <motion.div
            className={styles.richtext}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              <span>
                {isEn
                  ? "Since 1978, nestled within the historic architecture of Taksim Beyoğlu, three generations of our family have kept the authentic Van breakfast tradition alive. Direct from the pristine high plateaus of Van, we bring time-honored herb cheese (Otlu Peynir), wild Karakovan honeycomb, and velvety clotted cream—accompanied by sizzling copper pans of buttery murtuğa, roasted kavut, and slow-brewed tea. In our historic 18th-century townhouse, every morning is a timeless celebration of hospitality."
                  : "1978 yılından bu yana, Taksim’in tarihi dokusunda üç kuşaktır aynı tutku ve aile emeğiyle misafirlerimizi ağırlıyoruz. Doğrudan Van yaylalarından temin ettiğimiz coğrafi işaretli hakiki otlu peynir, Karakovan petek balı ve manda sütü taze kaymak; bakır sahanda cızırdayan tereyağlı murtuğa, kavut ve tavşan kanı demli çayımızla buluşuyor. Tarihi 18. yüzyıl Rum konağımızın nostaljik atmosferinde, sizi lezzetin ve paylaşmanın gerçek anlamına ortak olmaya davet ediyoruz."}
              </span>
            </p>
          </motion.div>

          {/* 3 Heritage Highlight Badges */}
          <div className={styles.highlightsGrid}>
            {highlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  className={styles.highlightCard}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: reduceMotion ? 0 : 0.42 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.25 } }}
                >
                  <div className={styles.highlightIconBox}>
                    <IconComp className={styles.highlightIcon} />
                  </div>
                  <h3 className={styles.highlightTitle}>{item.title}</h3>
                  <p className={styles.highlightDesc}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive CTA Link */}
          <motion.div
            className={styles.btnWrapper}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
