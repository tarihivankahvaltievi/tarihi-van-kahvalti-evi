"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./atmosphere-banner.module.css";

export function AtmosphereBanner({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";
  const reduceMotion = useReducedMotion();

  const headingLines = isEn
    ? [
        "A Van Table,",
        "at Home in Beyoğlu.",
      ]
    : [
        "Van Sofrası,",
        "Beyoğlu'nda.",
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
        <h2 className={styles.heading}>
          <span className={styles.headingText}>
            {headingLines.map((line, idx) => (
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
          </span>
        </h2>
      </div>

      <div className={styles.bottomTransition} aria-hidden="true" />
    </section>
  );
}
