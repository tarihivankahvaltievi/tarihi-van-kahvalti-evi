"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { displayAddress, mapsUrl } from "../seo";
import styles from "./location.module.css";

const InteractiveLocationMap = dynamic(
  () => import("./interactive-location-map").then((module) => module.InteractiveLocationMap),
  {
    ssr: false,
    loading: () => <p className={styles.mapLoading} role="status">Harita yükleniyor…</p>,
  },
);

export function LocationMap() {
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);

  if (showInteractiveMap) {
    return <InteractiveLocationMap />;
  }

  return (
    <div className={styles.mapPlaceholder}>
      <Image
        src="/images/street-table.webp"
        alt=""
        fill
        sizes="(max-width: 760px) 92vw, 84vw"
        quality={65}
      />
      <div className={styles.mapPlaceholderOverlay}>
        <span className={styles.mapPlaceholderIcon} aria-hidden="true"><MapPin size={26} /></span>
        <p className={styles.mapPlaceholderLabel}>Şehit Muhtar · Beyoğlu</p>
        <h3>Tarihi Van Kahvaltı Evi haritası</h3>
        <address>{displayAddress}</address>
        <div className={styles.mapPlaceholderActions}>
          <button type="button" onClick={() => setShowInteractiveMap(true)}>
            Etkileşimli haritayı yükle
          </button>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <Navigation size={17} aria-hidden="true" /> Google Haritalar&apos;da aç
          </a>
        </div>
        <small>Harita yalnız istediğinizde yüklenir; böylece sayfa daha hızlı açılır.</small>
      </div>
    </div>
  );
}
