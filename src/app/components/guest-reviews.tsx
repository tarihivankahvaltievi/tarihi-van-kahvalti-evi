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

  const transition = {
    duration: reduceMotion ? 0.12 : 0.38,
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
            <h2 id="guest-reviews-title" className={styles.title}>
              {messages.reviews.title} <span>{messages.reviews.titleAccent}</span>
            </h2>
            <p className={styles.intro}>{messages.reviews.intro}</p>
          </div>
        </header>

        <div className={styles.note}>
          <div className={styles.stage} aria-live="polite" aria-atomic="true">
            <div className={styles.cardMeta}>
              <div
                className={styles.rating}
                aria-label={`${messages.reviews.rating} ${messages.reviews.ratingLabel}`}
              >
                <strong>{messages.reviews.rating}</strong>
                <span className={styles.stars} aria-hidden="true">
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star key={star} size={13} fill="currentColor" />
                  ))}
                </span>
                <small>{messages.reviews.count}</small>
              </div>
              <div className={styles.reviewMeta}>
                <span>{activeReview.time}</span>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.article
                key={activeReview.name}
                className={styles.review}
                initial={{
                  opacity: 0,
                  x: reduceMotion ? 0 : direction * 10,
                  clipPath: reduceMotion
                    ? "inset(0% 0% 0% 0%)"
                    : direction > 0
                      ? "inset(0% 100% 0% 0%)"
                      : "inset(0% 0% 0% 100%)",
                }}
                animate={{ opacity: 1, x: 0, clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{
                  opacity: 0,
                  x: reduceMotion ? 0 : direction * -7,
                  clipPath: reduceMotion
                    ? "inset(0% 0% 0% 0%)"
                    : direction > 0
                      ? "inset(0% 0% 0% 100%)"
                      : "inset(0% 100% 0% 0%)",
                }}
                transition={transition}
              >
                <motion.blockquote
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: reduceMotion ? 0 : 0.05 }}
                >
                  {activeReview.quote}
                </motion.blockquote>

                <motion.footer
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: reduceMotion ? 0 : 0.1 }}
                >
                  <strong>{activeReview.name}</strong>
                </motion.footer>
              </motion.article>
            </AnimatePresence>

            <div className={styles.cardFooter}>
              <a
                className={styles.viewAll}
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{messages.reviews.viewAll}</span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>

              <div className={styles.navigation}>
                <span className={styles.progress} aria-hidden="true">
                  {reviews.map((review, index) => (
                    <i key={review.name} data-active={index === activeIndex} />
                  ))}
                </span>

                <div className={styles.controls}>
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
      </div>
    </section>
  );
}
