"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import styles from "./analytics-consent.module.css";

const consentStorageKey = "analytics-consent";

type ConsentChoice = "granted" | "denied";

function getStoredChoice(): ConsentChoice | null {
  try {
    const storedValue = window.localStorage.getItem(consentStorageKey);
    return storedValue === "granted" || storedValue === "denied" ? storedValue : null;
  } catch {
    return null;
  }
}

function subscribeToStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function updateGoogleConsent(choice: ConsentChoice) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag("consent", "update", {
    analytics_storage: choice,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function AnalyticsConsent() {
  const storedChoice = useSyncExternalStore(subscribeToStorage, getStoredChoice, () => undefined);
  const [sessionChoice, setSessionChoice] = useState<ConsentChoice | null>(null);
  const choice = sessionChoice ?? storedChoice;

  useEffect(() => {
    if (storedChoice) {
      updateGoogleConsent(storedChoice);
    }
  }, [storedChoice]);

  function saveChoice(nextChoice: ConsentChoice) {
    updateGoogleConsent(nextChoice);

    try {
      window.localStorage.setItem(consentStorageKey, nextChoice);
    } catch {
      // Seçim bu sayfa için uygulanır; depolama kullanılamıyorsa kalıcı olmaz.
    }

    setSessionChoice(nextChoice);
  }

  if (choice !== null) {
    return null;
  }

  return (
    <aside className={styles.banner} role="dialog" aria-label="Analitik çerez tercihi" aria-live="polite">
      <div className={styles.copy}>
        <strong>Ziyaret deneyimini geliştirmemize yardımcı olur musunuz?</strong>
        <p>
          İzin verirseniz site kullanımını Google Analytics ile toplu istatistikler üzerinden ölçeriz.
          Ayrıntılar <Link href="/cerez-politikasi">Çerez Politikası</Link> sayfasında.
        </p>
      </div>
      <div className={styles.actions}>
        <button className={styles.secondaryButton} type="button" onClick={() => saveChoice("denied")}>
          Reddet
        </button>
        <button className={styles.primaryButton} type="button" onClick={() => saveChoice("granted")}>
          Analitiğe izin ver
        </button>
      </div>
    </aside>
  );
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
