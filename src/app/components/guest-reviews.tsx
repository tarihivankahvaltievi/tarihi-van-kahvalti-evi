"use client";

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

        </header>

        <div className={styles.stage}>
          <aside
            className={styles.reviewSummary}
            aria-label={`${messages.reviews.rating} ${messages.reviews.ratingLabel}`}
          >
            <span className={styles.googleSource}>
              <span aria-hidden="true">G</span>
              {messages.reviews.googleLabel}
            </span>

            <div className={styles.summaryScore}>
              <strong>{messages.reviews.rating}</strong>
              <span className={styles.summaryStars} aria-hidden="true">
                {Array.from({ length: 5 }, (_, star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </span>
              <small>{messages.reviews.count}</small>
            </div>

            <span className={styles.quoteGlyph} aria-hidden="true">“</span>
          </aside>

          <div className={styles.reviewPanel} aria-live="polite" aria-atomic="true">
            <div className={styles.reviewTopline}>
              <span className={styles.reviewNumber} aria-hidden="true">
                {String(activeIndex + 1).padStart(2, "0")}
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
                <span aria-hidden="true">{String(reviews.length).padStart(2, "0")}</span>
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
