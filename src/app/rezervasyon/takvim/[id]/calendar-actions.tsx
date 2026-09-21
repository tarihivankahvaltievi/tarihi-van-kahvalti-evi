"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Calendar,
  Check,
  Compass,
  Copy,
  Download,
  MapPin,
} from "lucide-react";
import styles from "./calendar-page.module.css";

interface CalendarActionsProps {
  icsUrl: string;
  googleCalendarUrl: string;
  mapsUrl: string;
  isEnglish: boolean;
  pageUrl: string;
}

function subscribe() {
  return () => {};
}
function getIsWhatsApp() {
  return typeof navigator !== "undefined" && /WhatsApp/i.test(navigator.userAgent || "");
}
function getServerSnapshot() {
  return false;
}

export function CalendarActions({
  icsUrl,
  googleCalendarUrl,
  mapsUrl,
  isEnglish,
  pageUrl,
}: CalendarActionsProps) {
  const isWhatsApp = useSyncExternalStore(subscribe, getIsWhatsApp, getServerSnapshot);
  const [showSafariHint, setShowSafariHint] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(pageUrl || window.location.href);
      } else {
        const dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = pageUrl || window.location.href;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleAppleClick = () => {
    if (isWhatsApp) {
      setShowSafariHint(true);
    }
  };

  return (
    <div className={styles.actionsSection}>
      {/* WhatsApp In-App Warning Banner */}
      {isWhatsApp ? (
        <div className={styles.inAppBanner} role="alert">
          <Compass className={styles.compassIcon} size={22} aria-hidden="true" />
          <div className={styles.inAppText}>
            <strong>
              {isEnglish ? "WhatsApp In-App Browser" : "WhatsApp İçindesiniz"}
            </strong>
            <p>
              {isEnglish
                ? "To add to your iPhone Calendar with one tap, tap the Safari (🧭) or Share icon in the bottom right corner."
                : "iPhone Takviminize doğrudan eklemek için lütfen sağ alttaki Safari (🧭) simgesine dokunun."}
            </p>
          </div>
        </div>
      ) : null}

      {/* Apple Calendar Primary Button */}
      <a
        href={icsUrl}
        onClick={handleAppleClick}
        className={styles.appleCalendarBtn}
        title={
          isEnglish
            ? "Add to iPhone or Mac Calendar"
            : "iPhone veya Mac Takviminize Ekleyin"
        }
      >
        <span className={styles.appleIcon} aria-hidden="true">
          🍏
        </span>
        <span>
          {isEnglish
            ? "Add to iPhone / Apple Calendar"
            : "iPhone / Apple Takvimine Ekle"}
        </span>
      </a>

      {/* Safari Prompt (when tapped inside WhatsApp) */}
      {showSafariHint ? (
        <div className={styles.hintModal} role="status">
          <p>
            {isEnglish ? (
              <>
                💡 <strong>Did your iPhone Calendar not pop up?</strong> WhatsApp restricts opening calendars directly. Please tap the <strong>Safari (🧭)</strong> compass icon at the bottom right of this screen to open and add in 1 tap!
              </>
            ) : (
              <>
                💡 <strong>iPhone Takviminiz açılmadı mı?</strong> WhatsApp takvimleri doğrudan açmayı kısıtlar. Lütfen ekranın sağ altındaki <strong>Safari (🧭)</strong> simgesine dokunarak Safari&apos;de açın!
              </>
            )}
          </p>
        </div>
      ) : null}

      {/* Secondary Buttons Row */}
      <div className={styles.secondaryRow}>
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.googleBtn}
        >
          <Calendar size={16} aria-hidden="true" />
          <span>{isEnglish ? "Google Calendar" : "Google Takvim"}</span>
        </a>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapsBtn}
        >
          <MapPin size={16} aria-hidden="true" />
          <span>{isEnglish ? "Get Directions" : "Yol Tarifi Al"}</span>
        </a>
      </div>

      {/* Auxiliary Utilities Row (Copy Link & Raw .ics Download) */}
      <div className={styles.auxRow}>
        <button
          type="button"
          onClick={handleCopyLink}
          className={styles.auxBtn}
          title={isEnglish ? "Copy calendar page link" : "Takvim sayfası linkini kopyala"}
        >
          {copied ? (
            <Check size={14} className={styles.copiedIcon} aria-hidden="true" />
          ) : (
            <Copy size={14} aria-hidden="true" />
          )}
          <span>
            {copied
              ? isEnglish
                ? "Link Copied!"
                : "Bağlantı Kopyalandı!"
              : isEnglish
              ? "Copy Link"
              : "Bağlantıyı Kopyala"}
          </span>
        </button>

        <a
          href={`${icsUrl}${icsUrl.includes("?") ? "&" : "?"}dl=1`}
          className={styles.auxBtn}
          download
          title={isEnglish ? "Download raw .ics calendar file" : ".ics takvim dosyasını indir"}
        >
          <Download size={14} aria-hidden="true" />
          <span>{isEnglish ? "Download .ics File" : ".ics Dosyası İndir"}</span>
        </a>
      </div>
    </div>
  );
}
