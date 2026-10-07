"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Coffee, X } from "lucide-react";
import type { SiteLanguage } from "../site-languages";
import { coffeeOfferContent } from "./coffee-offer-content";
import styles from "./coffee-offer.module.css";

const dismissalKey = "van-coffee-indirim20-dismissed";

export function CoffeeOffer({ locale }: { locale: SiteLanguage }) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dismissedRef = useRef(false);
  const copy = coffeeOfferContent[locale];
  const isBooking = /(?:^|\/)rezervasyon(?:\/|$)/.test(pathname);
  const suppressOffer = isBooking || pathname === "/admin" || pathname.startsWith("/admin/");

  useEffect(() => {
    if (suppressOffer) return;
    const dialog = dialogRef.current;
    let dismissed = dismissedRef.current;
    try {
      dismissed = dismissed || sessionStorage.getItem(dismissalKey) === "1";
    } catch {
      // The offer still works when browser storage is unavailable.
    }
    if (dismissed) return;
    const timer = window.setTimeout(() => {
      // Do not interrupt another modal such as booking or the mobile menu.
      if (dialog?.isConnected && !dialog.open && !document.querySelector('dialog[open], [aria-modal="true"]:not([aria-hidden="true"])')) {
        dialog.showModal();
      }
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [suppressOffer, pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    let previousOverflow = "";
    let scrollLocked = false;
    const syncScroll = () => {
      if (dialog.open && !scrollLocked) {
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        scrollLocked = true;
      } else if (!dialog.open && scrollLocked) {
        document.body.style.overflow = previousOverflow;
        scrollLocked = false;
      }
    };
    const observer = new MutationObserver(syncScroll);
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => {
      observer.disconnect();
      if (scrollLocked) document.body.style.overflow = previousOverflow;
    };
  }, [suppressOffer]);

  const rememberDismissal = () => {
    dismissedRef.current = true;
    try {
      sessionStorage.setItem(dismissalKey, "1");
    } catch {
      // Keep the in-memory dismissal when storage is unavailable.
    }
  };

  const close = () => dialogRef.current?.close();

  if (suppressOffer) return null;

  return (
    <>
      <button className={styles.reopen} onClick={() => dialogRef.current?.showModal()} aria-haspopup="dialog">
        <Coffee size={18} aria-hidden="true" />
        <span>{copy.reopen}</span>
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="coffee-offer-title"
        aria-describedby="coffee-offer-instruction"
        onClose={rememberDismissal}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
        }}
      >
        <div className={styles.masthead}>
          <span className={styles.brand}>TARİHİ VAN <span>KAHVALTI EVİ · 1978</span></span>
          <button className={styles.close} onClick={close} aria-label={copy.close} autoFocus>
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.content}>
          <p className={styles.exclusive}><Coffee size={18} aria-hidden="true" />{copy.exclusive}</p>
          <h2 id="coffee-offer-title" className={styles.title}>{copy.title}</h2>
          <p className={styles.drinks}>{copy.drinks}</p>
          <p className={styles.discount}>{copy.discount}</p>
          <div className={styles.coupon}>
            <span>{copy.coupon}</span>
            <strong dir="ltr">indirim20</strong>
          </div>
          <p id="coffee-offer-instruction" className={styles.instruction}>{copy.instruction}</p>
          <button className={styles.confirm} onClick={close}>{copy.dismiss}</button>
        </div>
      </dialog>
    </>
  );
}
