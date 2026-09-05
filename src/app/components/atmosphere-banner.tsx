"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./atmosphere-banner.module.css";

export function AtmosphereBanner({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";
  const reduceMotion = useReducedMotion();

  const quoteLines = isEn
    ? [
        "“Since 1978 in Beyoğlu,",
        "the warmest family table shaped",
        "by authentic Van traditions.”",
      ]
    : [
        "“1978’den beri Beyoğlu’nda,",
        "Van’ın kadim lezzetleriyle kurulan",
        "en sıcak aile sofrası.”",
      ];

  return (
    <section className={styles.section2} id="atmosphere-banner">
      {/* Background Image with Slow Subtle Cinematic Scale */}
      <motion.div
        className={styles.bgWrapper}
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.045],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/atmosphere-banner-bg.webp"
          alt="Tarihi Van Kahvaltı Evi Nostaljik Atmosfer"
          fill
          priority
          sizes="100vw"
          quality={85}
          className={styles.bgImg}
        />
      </motion.div>

      {/* Top White Arch Notch Dipping from Section 1 into Section 2 */}
      <motion.div
        className={styles.topAnchor}
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, y: -18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/hamour/anchor-1_3.png"
          alt=""
          width={96}
          height={66}
          className={styles.anchorImg}
          priority
        />
        <div className={styles.notchLogoWrap}>
          <Image
            src="/images/brand-emblem-colored.png"
            alt="Tarihi Van Kahvaltı Evi"
            width={40}
            height={27}
            className={styles.notchLogo}
            priority
          />
        </div>
      </motion.div>

      <div className={styles.overlay} />

      <div className={styles.textContainer}>
        {/* Heritage Kicker Badge */}
        <motion.div
          className={styles.kickerBadge}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.kickerLine} aria-hidden="true" />
          <span className={styles.kickerText}>
            {isEn ? "BEYOĞLU • SINCE 1978" : "BEYOĞLU • 1978'DEN BERİ"}
          </span>
          <span className={styles.kickerLine} aria-hidden="true" />
        </motion.div>

        {/* Animated Staggered Quote Heading */}
        <h2 className={styles.heading}>
          <em className={styles.italicQuote}>
            {quoteLines.map((line, idx) => (
              <motion.span
                key={idx}
                className={styles.quoteLine}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 22, filter: "blur(4px)" }
                }
                whileInView={
                  reduceMotion
                    ? undefined
                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.75,
                  delay: reduceMotion ? 0 : 0.15 + idx * 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            ))}
          </em>
        </h2>

        {/* Decorative Heritage Flourish */}
        <motion.div
          className={styles.flourishWrap}
          initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <span className={styles.flourishLine} />
          <span className={styles.flourishDiamond}>◆</span>
          <span className={styles.flourishLine} />
        </motion.div>
      </div>

      {/* Bottom Architectural Cutout Transition to Section 3 (Filled with Section 3's exact background texture) */}
      <div className={styles.bottomTransition} aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className={styles.transitionSvg}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="section3BgPattern"
              patternUnits="userSpaceOnUse"
              width="100%"
              height="100%"
            >
              <image
                href="/hamour/section-3-bg-bot.jpg"
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMin slice"
              />
            </pattern>
          </defs>

          {/* Layer 1: Subtle dark depth shadow ribbon along the arch */}
          <path
            d="M0,97 C380,97 560,24 720,17 C880,24 1060,97 1440,97 L1440,120 L0,120 Z"
            fill="rgba(24, 12, 14, 0.32)"
          />
          {/* Layer 2: Subtle translucent highlight ribbon */}
          <path
            d="M0,101 C380,101 560,28 720,21 C880,28 1060,101 1440,101 L1440,120 L0,120 Z"
            fill="rgba(255, 255, 255, 0.4)"
          />
          {/* Layer 3: Solid arch filled with Section 3's exact background texture */}
          <path
            d="M0,105 C380,105 560,32 720,25 C880,32 1060,105 1440,105 L1440,120 L0,120 Z"
            fill="url(#section3BgPattern)"
          />
        </svg>
      </div>
    </section>
  );
}
