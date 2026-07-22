"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Quote, Star } from "lucide-react";
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

  const selectReview = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const moveReview = (nextDirection: 1 | -1) => {
    setDirection(nextDirection);
    setActiveIndex((current) => (current + nextDirection + reviews.length) % reviews.length);
  };

  const reviewMotion = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: direction * 28, filter: "blur(4px)" },
        animate: { opacity: 1, x: 0, filter: "blur(0px)" },
        exit: { opacity: 0, x: direction * -22, filter: "blur(3px)" },
      };

  return (
    <section className={styles.section} aria-labelledby="guest-reviews-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{messages.reviews.eyebrow}</p>
          <h2 id="guest-reviews-title" className={styles.title}>
            {messages.reviews.title} <span>{messages.reviews.titleAccent}</span>
          </h2>
          <p className={styles.intro}>{messages.reviews.intro}</p>
        </header>

        <div className={styles.stage}>
          <div className={styles.reviewPanel} aria-live="polite">
            <div className={styles.reviewTopline}>
              <span className={styles.googleMark} aria-label={messages.reviews.googleLabel}>
                <span aria-hidden="true">G</span>
                {messages.reviews.googleLabel}
              </span>
              <span className={styles.reviewCount}>{messages.reviews.count}</span>
            </div>

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.article
                key={activeReview.name}
                className={styles.review}
                initial={reviewMotion.initial}
                animate={reviewMotion.animate}
                exit={reviewMotion.exit}
                transition={{ duration: reduceMotion ? 0.14 : 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                <Quote className={styles.quoteMark} strokeWidth={1.4} aria-hidden="true" />
                <div className={styles.stars} aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, star) => <Star key={star} size={16} fill="currentColor" aria-hidden="true" />)}
                </div>
                <blockquote>{activeReview.quote}</blockquote>
                <footer>
                  <strong>{activeReview.name}</strong>
                  <span>{activeReview.time}</span>
                </footer>
              </motion.article>
            </AnimatePresence>

            <div className={styles.controls}>
              <button type="button" onClick={() => moveReview(-1)} aria-label={messages.reviews.previous}>
                <ChevronLeft aria-hidden="true" />
              </button>
              <div className={styles.dots} aria-label={messages.reviews.googleLabel}>
                {reviews.map((review, index) => (
                  <button
                    key={review.name}
                    type="button"
                    className={index === activeIndex ? styles.activeDot : undefined}
                    onClick={() => selectReview(index)}
                    aria-label={`${messages.reviews.choose}: ${review.name}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>
              <button type="button" onClick={() => moveReview(1)} aria-label={messages.reviews.next}>
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>

          <aside className={styles.placePanel} aria-label={messages.reviews.photoLabel}>
            <div className={styles.rating}>
              <span>{messages.reviews.rating}</span>
              <div>
                <div className={styles.ratingStars} aria-hidden="true">
                  {Array.from({ length: 5 }, (_, star) => <Star key={star} size={13} fill="currentColor" />)}
                </div>
                <small>{messages.reviews.ratingLabel}</small>
              </div>
            </div>

            <div className={styles.photoFrame}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeReview.photo}
                  className={styles.photoMotion}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0.14 : 0.48, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={activeReview.photo} alt={activeReview.alt} fill sizes="(max-width: 700px) 100vw, 42vw" quality={76} />
                </motion.div>
              </AnimatePresence>
              <span className={styles.photoCaption}>{messages.reviews.photoLabel}</span>
            </div>

            <div className={styles.photoTabs}>
              {reviews.map((review, index) => (
                <button
                  key={review.photo}
                  type="button"
                  className={index === activeIndex ? styles.activePhotoTab : undefined}
                  onClick={() => selectReview(index)}
                  aria-label={`${messages.reviews.choose}: ${review.name}`}
                  aria-pressed={index === activeIndex}
                >
                  <Image src={review.photo} alt="" fill sizes="72px" quality={60} />
                </button>
              ))}
            </div>
          </aside>
        </div>

        <a className={styles.allReviews} href={mapsUrl} target="_blank" rel="noopener noreferrer">
          <span>{messages.reviews.viewAll}</span>
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
