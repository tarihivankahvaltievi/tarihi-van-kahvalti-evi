"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Star } from "lucide-react";
import Image from "next/image";
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

  const motionDistance = reduceMotion ? 0 : direction * 12;
  const transition = {
    duration: reduceMotion ? 0.12 : 0.44,
    ease: [0.22, 1, 0.36, 1] as const,
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

        <div className={styles.plaque}>
          <aside className={styles.identityPanel}>
            <span className={styles.brandSeal} aria-hidden="true">
              <Image
                src="/images/brand-icon-small.png"
                alt=""
                width={96}
                height={96}
                sizes="72px"
              />
            </span>

            <div
              className={styles.rating}
              aria-label={`${messages.reviews.rating} ${messages.reviews.ratingLabel}`}
            >
              <strong>{messages.reviews.rating}</strong>
              <div>
                <span className={styles.stars} aria-hidden="true">
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star key={star} size={14} fill="currentColor" />
                  ))}
                </span>
                <small>{messages.reviews.count}</small>
              </div>
            </div>

            <span className={styles.position} aria-hidden="true">
              <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
              <small>/ {String(reviews.length).padStart(2, "0")}</small>
            </span>
          </aside>

          <div className={styles.stage} aria-live="polite" aria-atomic="true">
            <div className={styles.cardMeta}>
              <span className={styles.eyebrow}>{messages.reviews.ratingLabel}</span>
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
                  x: motionDistance,
                  y: reduceMotion ? 0 : 6,
                  filter: reduceMotion ? "blur(0px)" : "blur(4px)",
                }}
                animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  x: -motionDistance * 0.65,
                  y: reduceMotion ? 0 : -4,
                  filter: reduceMotion ? "blur(0px)" : "blur(2px)",
                }}
                transition={transition}
              >
                <motion.blockquote
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: reduceMotion ? 0 : 0.04 }}
                >
                  {activeReview.quote}
                </motion.blockquote>

                <motion.footer
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: reduceMotion ? 0 : 0.09 }}
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
    </section>
  );
}
