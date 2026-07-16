"use client";

import { Check, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./menu.module.css";
import { menuCategories, type MenuItem } from "./menu-data";

export function ProductSheet({ item, onClose }: { item: MenuItem; onClose: () => void }) {
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

  useEffect(() => {
    if (!isClosing) return;

    // The timer is a safety net for browsers that suppress transitionend
    // while an entrance animation is handing control back to the element.
    const closeTimer = window.setTimeout(onClose, 320);
    return () => window.clearTimeout(closeTimer);
  }, [isClosing, onClose]);

  const category = menuCategories.find((entry) => entry.id === item.category);
  return createPortal(
    <div className={styles.sheetLayer} data-closing={isClosing || undefined}>
      <button
        type="button"
        className={styles.overlayBackdrop}
        aria-label="Ürün ayrıntılarını kapat"
        onClick={requestClose}
      />
      <div
        ref={sheetRef}
        className={styles.productSheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-sheet-title"
        onTransitionEnd={(event) => {
          if (isClosing && event.target === event.currentTarget && event.propertyName === "opacity") onClose();
        }}
      >
        <div className={styles.sheetMedia}>
          <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 680px) 100vw, 430px" quality={80} priority />
          <span className={styles.sheetCategory}>{category?.label}</span>
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
      </div>
    </div>,
    document.body,
  );
}
