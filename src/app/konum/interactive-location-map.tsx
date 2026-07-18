"use client";

import Image from "next/image";
import { Clock3, MapPin, Navigation } from "lucide-react";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/mapcn-marker-popup";
import { displayAddress, mapsUrl, openingHours } from "../seo";
import styles from "./location.module.css";

const restaurantCoordinates: [number, number] = [28.9829478, 41.0367655];

export function InteractiveLocationMap() {
  return (
    <div className={styles.mapFrame}>
      <Map
        className={styles.mapCanvas}
        center={restaurantCoordinates}
        zoom={15.4}
        ariaLabel="Tarihi Van Kahvaltı Evi'nin Zambak Sokak konumu"
      >
        <MapControls center={restaurantCoordinates} zoom={15.4} />
        <MapMarker
          longitude={restaurantCoordinates[0]}
          latitude={restaurantCoordinates[1]}
          ariaLabel="Tarihi Van Kahvaltı Evi konum bilgisini aç"
        >
          <MarkerContent>
            <span className={styles.mapMarker}>
              <span className={styles.markerPulse} aria-hidden="true" />
              <span className={styles.markerPin} aria-hidden="true">
                <MapPin size={22} strokeWidth={2.3} />
              </span>
              <MarkerLabel>Tarihi Van</MarkerLabel>
            </span>
          </MarkerContent>
          <MarkerPopup className={styles.mapPopup} defaultOpen>
            <div className={styles.popupMedia}>
              <Image
                src="/images/street-table.webp"
                alt="Tarihi Van Kahvaltı Evi'nin Zambak Sokak'taki dış mekân masaları"
                fill
                sizes="280px"
                quality={74}
              />
            </div>
            <div className={styles.popupBody}>
              <strong>Tarihi Van Kahvaltı Evi</strong>
              <p><MapPin size={14} aria-hidden="true" /> {displayAddress}</p>
              <p><Clock3 size={14} aria-hidden="true" /> {openingHours.short}</p>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation size={15} aria-hidden="true" />
                Yol tarifi al
              </a>
            </div>
          </MarkerPopup>
        </MapMarker>
      </Map>
      <div className={styles.mapCaption}>
        <span>Şehit Muhtar · Beyoğlu</span>
        <span>Haritayı sürükleyebilir, yakınlaştırabilirsiniz.</span>
      </div>
    </div>
  );
}
