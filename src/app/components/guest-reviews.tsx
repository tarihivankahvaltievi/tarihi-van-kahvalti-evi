"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Star } from "lucide-react";
import { useState } from "react";
import { messagesFor, type SiteLocale } from "../home-localization";
import { mapsUrl } from "../seo";
import styles from "./guest-reviews.module.css";

export function GuestReviews({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const reviews = messages.reviews.reviews;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const reduceMotion = useReducedMotion();
  const activeReview = reviews[activeIndex];

  const moveReview = (nextDirection: 1 | -1) => {
    setDirection(nextDirection);
    setActiveIndex((current) => (current + nextDirection + reviews.length) % reviews.length);
  };

  const motionDistance = reduceMotion ? 0 : direction * 18;
  const transition = {
    duration: reduceMotion ? 0.12 : 0.42,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <section
      id="reviews"
      className={styles.section}
      aria-labelledby="guest-reviews-title"
      data-testid="guest-reviews"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headingCopy}>
            <p className={styles.sourceLabel}>{messages.reviews.googleLabel}</p>
            <h2 id="guest-reviews-title" className={styles.title}>
              {messages.reviews.title} <span>{messages.reviews.titleAccent}</span>
            </h2>
            <p className={styles.intro}>{messages.reviews.intro}</p>
          </div>

          <div
            className={styles.proof}
            aria-label={`${messages.reviews.rating} ${messages.reviews.ratingLabel}`}
          >
            <strong>{messages.reviews.rating}</strong>
            <div>
              <span className={styles.proofStars} aria-hidden="true">
                {Array.from({ length: 5 }, (_, star) => (
                  <Star key={star} size={14} fill="currentColor" />
                ))}
              </span>
              <small>{messages.reviews.count}</small>
            </div>
          </div>
        </header>

        <div className={styles.stage}>
          <div className={styles.media}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeReview.photo}
                className={styles.mediaMotion}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
              >
                <Image
                  src={activeReview.photo}
                  alt={activeReview.alt}
                  fill
                  sizes="(max-width: 760px) calc(100vw - 32px), 56vw"
                  quality={75}
                />
              </motion.div>
            </AnimatePresence>
            <span className={styles.placeLabel}>{messages.reviews.photoLabel}</span>
          </div>

          <div className={styles.reviewPanel} aria-live="polite" aria-atomic="true">
            <div className={styles.reviewTopline}>
              <span className={styles.googleSource}>
                <span aria-hidden="true">G</span>
                {messages.reviews.googleLabel}
              </span>
              <span>{activeReview.time}</span>
            </div>

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.article
                key={activeReview.name}
                className={styles.review}
                initial={{ opacity: 0, x: motionDistance }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -motionDistance }}
                transition={transition}
              >
                <span className={styles.stars} aria-hidden="true">
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star key={star} size={15} fill="currentColor" />
                  ))}
                </span>

                <blockquote>{activeReview.quote}</blockquote>

                <footer>
                  <span className={styles.avatar} aria-hidden="true">
                    {activeReview.name.charAt(0)}
                  </span>
                  <div>
                    <strong>{activeReview.name}</strong>
                    <small>{messages.reviews.googleLabel}</small>
                  </div>
                </footer>
              </motion.article>
            </AnimatePresence>

            <div className={styles.reviewFooter}>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <span>{messages.reviews.viewAll}</span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>

              <div className={styles.controls}>
                <span aria-hidden="true">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => moveReview(-1)}
                  aria-label={messages.reviews.previous}
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => moveReview(1)}
                  aria-label={messages.reviews.next}
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
