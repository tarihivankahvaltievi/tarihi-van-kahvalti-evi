"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { BookingOpenButton } from "./booking-open-button";
import { messagesFor, type SiteLocale } from "../home-localization";
import styles from "./about-story.module.css";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export function AboutStory({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const tableY = useTransform(scrollYProgress, [0, 1], [-16, 22]);
  const memoryY = useTransform(scrollYProgress, [0, 1], [14, -18]);
  const markY = useTransform(scrollYProgress, [0, 1], [8, -10]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className={styles.section}
      aria-labelledby="about-story-title"
    >
      <div className={styles.inner}>
        <div className={styles.visual}>
          <motion.figure
            className={styles.tablePhoto}
            style={{ y: reduceMotion ? 0 : tableY }}
            initial={reduceMotion ? false : { clipPath: "inset(5% 0 7% 0)" }}
            whileInView={reduceMotion ? undefined : { clipPath: "inset(0% 0 0% 0)" }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.82, ease: premiumEase }}
          >
            <Image
              src="/images/hands-table.webp"
              alt={messages.about.tableAlt}
              fill
              sizes="(max-width: 680px) 88vw, (max-width: 900px) 41vw, 520px"
              quality={80}
              loading="lazy"
              decoding="async"
            />
            <figcaption className={styles.imageCaption}>
              <span>{locale === "tr" ? "Zambak Sokak" : "Zambak Street"}</span>
            </figcaption>
          </motion.figure>

          <motion.figure
            className={styles.memoryPhoto}
            style={{ y: reduceMotion ? 0 : memoryY }}
            initial={reduceMotion ? false : { opacity: 0.78, scale: 0.96 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.62, delay: 0.12, ease: premiumEase }}
          >
            <Image
              src="/images/historic-mirror.webp"
              alt={messages.about.memoryAlt}
              fill
              sizes="(max-width: 680px) 38vw, (max-width: 900px) 18vw, 220px"
              quality={80}
              loading="lazy"
              decoding="async"
            />
          </motion.figure>

          <motion.div
            className={styles.heritageMark}
            style={{ y: reduceMotion ? 0 : markY }}
            aria-label={locale === "tr" ? "1978'den beri bir aile sofrası" : "A family table since 1978"}
          >
            <span>1978</span>
            <small>{locale === "tr" ? "’den beri" : "since"}</small>
          </motion.div>
          <span className={styles.visualRule} aria-hidden="true" />
        </div>

        <motion.div
          className={styles.copy}
          initial={reduceMotion ? false : { opacity: 0.82, y: 28 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.68, delay: 0.04, ease: premiumEase }}
        >
          <p className={styles.meta}>
            <span aria-hidden="true" />
            {messages.about.meta}
          </p>
          <h2 id="about-story-title" className={styles.title}>
            {messages.about.title}
            <em>{messages.about.titleEmphasis}</em>
          </h2>
          <p className={styles.lead}>{messages.about.lead}</p>

          <nav className={styles.actions} aria-label={messages.about.actionsAria}>
            <Link href={messages.menuHref} className={`${styles.action} ${styles.menuAction}`}>
              <span>{messages.about.primaryAction}</span>
              <ArrowUpRight className={styles.actionIcon} size={18} aria-hidden="true" />
            </Link>
            <BookingOpenButton className={`${styles.action} ${styles.bookingAction}`}>
              {messages.about.bookingAction}
            </BookingOpenButton>
          </nav>
        </motion.div>

        <motion.ul
          className={styles.principles}
          aria-label={messages.about.principlesAria}
          initial={reduceMotion ? false : { opacity: 0.84, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.66, ease: premiumEase }}
        >
          {messages.about.principles.map(([title, text], index) => (
            <motion.li
              key={title}
              className={styles.principle}
              initial={reduceMotion ? false : { opacity: 0.84, x: -14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.52, delay: index * 0.06, ease: premiumEase }}
            >
              <span className={styles.principleMark} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
