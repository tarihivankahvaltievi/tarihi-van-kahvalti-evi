"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./menu.module.css";
import type { MenuItem } from "./menu-data";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProductSheet({
  item,
  categoryLabel,
  onClose,
}: {
  item: MenuItem;
  categoryLabel?: string;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const requestClose = useCallback(() => setIsClosing(true), []);

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

  const duration = reduceMotion ? 0 : 0.3;

  return createPortal(
    <div className={styles.sheetLayer}>
      <motion.button
        type="button"
        className={styles.overlayBackdrop}
        aria-label="Ürün ayrıntılarını kapat"
        onClick={requestClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
      />
      <motion.div
        ref={sheetRef}
        className={styles.productSheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-sheet-title"
        initial={reduceMotion ? false : { y: 28, opacity: 0, scale: 0.99 }}
        animate={isClosing ? { y: 22, opacity: 0, scale: 0.995 } : { y: 0, opacity: 1, scale: 1 }}
        transition={{ duration, ease }}
        onAnimationComplete={() => {
          if (isClosing) onClose();
        }}
      >
        <div className={styles.sheetMedia}>
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 680px) 100vw, 430px"
            quality={80}
            loading="eager"
          />
          <span className={styles.sheetCategory}>{categoryLabel}</span>
        </div>

        <div className={styles.sheetContent}>
          <button ref={closeRef} type="button" className={styles.sheetClose} onClick={requestClose} aria-label="Kapat">
            <X size={20} />
          </button>

          <div className={styles.sheetTitleRow}>
            <h2 id="product-sheet-title">{item.name}</h2>
            <div className={styles.sheetPriceBlock}>
              <strong>{item.price}</strong>
              {item.priceNote ? <span>{item.priceNote}</span> : null}
            </div>
          </div>

          <p className={styles.sheetStory}>{item.story}</p>

          <div className={styles.sheetRule} />
          <h3 className={styles.sheetSectionTitle}>Bu tabakta</h3>
          <ul className={styles.sheetDetailsList}>
            {item.details.map((detail) => (
              <li key={detail}>
                <Check size={15} strokeWidth={2.2} />
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          <button type="button" className={styles.sheetAction} onClick={requestClose}>
            Menüye dön <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
