"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import styles from "./atmosphere-banner.module.css";

export function AtmosphereBanner({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Scroll-linked continuous parallax depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Background Parallax: smooth vertical shift and gentle scale
  const bgY = useTransform(smoothProgress, [0, 1], ["-7%", "7%"]);
  const bgScale = useTransform(smoothProgress, [0, 0.5, 1], [1.06, 1.11, 1.16]);

  // Content Parallax: subtle counter-shift to create true physical depth
  const textY = useTransform(smoothProgress, [0, 1], [28, -28]);
  const textScale = useTransform(smoothProgress, [0, 0.5, 1], [0.96, 1, 0.98]);

  // Signature luxury cubic-bezier easing
  const easeLuxury = [0.16, 1, 0.3, 1] as const;

  const line1 = isEn ? "A Van Table" : "Van Sofrası";
  const line2 = isEn ? "in Beyoğlu" : "Beyoğlu'nda";
  const kicker = isEn ? "TIMELESS TRADITION" : "KADİM VAN GELENEĞİ";
  const subtitle = isEn
    ? "Where historic Beyoğlu meets the authentic warmth of Van"
    : "Beyoğlu'nun tarihi dokusunda, Van'ın cömert sofrası";

  return (
    <section ref={sectionRef} className={styles.section2} id="atmosphere-banner">
      {/* Background Image with Cinematic Depth Parallax */}
      <motion.div
        className={styles.bgWrapper}
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : {
                y: bgY,
                scale: bgScale,
              }
        }
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

      <div className={styles.overlay} />

      {/* Floating Content Container with Scroll-Responsive Depth */}
      <motion.div
        className={styles.textContainer}
        style={
          reduceMotion
            ? undefined
            : {
                y: textY,
                scale: textScale,
              }
        }
      >
        {/* Heritage Eyebrow Kicker */}
        <motion.div
          className={styles.kickerWrap}
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeLuxury }}
        >
          <span className={styles.kickerLine} aria-hidden="true" />
          <span className={styles.kickerText}>✦ {kicker} ✦</span>
          <span className={styles.kickerLine} aria-hidden="true" />
        </motion.div>

        {/* Kinetic Staggered Masked Heading */}
        <h2 className={styles.heading} aria-label={`${line1} ${line2}`}>
          <span className={styles.lineMask}>
            <motion.span
              className={`${styles.kineticLine} ${styles.shimmer}`}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: "115%", rotateX: 20, filter: "blur(8px)" }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : { opacity: 1, y: "0%", rotateX: 0, filter: "blur(0px)" }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.85,
                delay: 0.08,
                ease: easeLuxury,
              }}
            >
              {line1}
            </motion.span>
          </span>

          <span className={styles.lineMask}>
            <motion.span
              className={`${styles.kineticLine} ${styles.shimmer}`}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: "115%", rotateX: 20, filter: "blur(8px)" }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : { opacity: 1, y: "0%", rotateX: 0, filter: "blur(0px)" }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.85,
                delay: 0.24,
                ease: easeLuxury,
              }}
            >
              {line2}
            </motion.span>
          </span>
        </h2>

        {/* Decorative Golden Flourish Line */}
        <motion.div
          className={styles.flourishWrap}
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.42, ease: easeLuxury }}
        >
          <span className={styles.flourishLine} />
          <span className={styles.flourishDiamond}>◆</span>
          <span className={styles.flourishLine} />
        </motion.div>

        {/* Atmospheric Subtitle */}
        <motion.p
          className={styles.subtitle}
          initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.52, ease: easeLuxury }}
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}
