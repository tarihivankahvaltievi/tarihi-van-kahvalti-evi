"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Calendar, X } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./menu.module.css";
import type { MenuItem } from "./menu-data";
import { menuMessages, type MenuLocale } from "./menu-localization";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProductSheet({
  item,
  categoryLabel,
  locale = "tr",
  onClose,
}: {
  item: MenuItem;
  categoryLabel?: string;
  locale?: MenuLocale;
  onClose: () => void;
}) {
  const messages = menuMessages[locale];
  const reduceMotion = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const requestClose = useCallback(() => setIsClosing(true), []);

  const handleBookTable = () => {
    requestClose();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-booking", {
          detail: {
            itemTitle: item.name,
            category: categoryLabel,
          },
        }),
      );
    }
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousActive = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.classList.add("menu-sheet-open");
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        sheetRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-sheet-open");
      document.body.style.overflow = previousOverflow;
      previousActive?.focus();
    };
  }, [requestClose]);

  const duration = reduceMotion ? 0 : 0.28;

  return createPortal(
    <div className={styles.sheetOverlay}>
      <motion.button
        type="button"
        className={styles.sheetBackdrop}
        aria-label={messages.sheetClose}
        onClick={requestClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
      />
      <motion.div
        ref={sheetRef}
        className={`${styles.sheetCard} ${!item.image || imageFailed ? styles.sheetCardWithoutMedia : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-sheet-title"
        initial={reduceMotion ? false : { y: 26, opacity: 0, scale: 0.985 }}
        animate={isClosing ? { y: 20, opacity: 0, scale: 0.99 } : { y: 0, opacity: 1, scale: 1 }}
        transition={{ duration, ease }}
        onAnimationComplete={() => {
          if (isClosing) onClose();
        }}
      >
        {item.image && !imageFailed ? (
          <div className={styles.sheetMediaPane}>
            <Image
              src={item.image}
              alt={item.imageAlt || item.name}
              fill
              sizes="(max-width: 960px) 100vw, 460px"
              quality={82}
              loading="eager"
              onError={() => setImageFailed(true)}
            />
            {categoryLabel ? (
              <span className={styles.sheetCategoryBadge}>{categoryLabel}</span>
            ) : null}
          </div>
        ) : null}

        <div className={styles.sheetContentPane}>
          <button
            ref={closeRef}
            type="button"
            className={styles.sheetCloseBtn}
            onClick={requestClose}
            aria-label={messages.close}
          >
            <X size={19} />
          </button>

          <div className={styles.sheetHeaderRow}>
            <h2 id="product-sheet-title" className={styles.sheetTitle}>{item.name}</h2>
            <div className={styles.sheetPriceBlock}>
              <span className={styles.sheetPriceText}>{item.price}</span>
              {item.priceNote ? (
                <span className={styles.sheetPriceNote}>{item.priceNote}</span>
              ) : null}
            </div>
          </div>

          <p className={styles.sheetStory}>{item.story || item.description}</p>

          {item.details && item.details.length > 0 ? (
            <>
              <h3 className={styles.sheetDetailsTitle}>{messages.onThisPlate}</h3>
              <ul className={styles.sheetIngredientsList}>
                {item.details.map((detail) => (
                  <li key={detail} className={styles.sheetIngredientItem}>
                    <Check size={16} strokeWidth={2.2} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <button
            type="button"
            className={styles.sheetBookingCta}
            onClick={handleBookTable}
          >
            <Calendar size={18} />
            <span>{messages.reserveDish}</span>
          </button>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
