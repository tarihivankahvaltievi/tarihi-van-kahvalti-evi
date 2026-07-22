"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Coffee,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { phoneE164 } from "../seo";
import type { SiteLocale } from "../home-localization";
import styles from "./booking-modal.module.css";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedType?: string;
  preselectedItem?: string;
  locale?: SiteLocale;
}

function getTodayString() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function BookingModal({
  isOpen,
  onClose,
  preselectedType,
  preselectedItem,
  locale = "tr",
}: BookingModalProps) {
  const isEnglish = locale === "en";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [guests, setGuests] = useState(2);
  const [type, setType] = useState<"breakfast" | "cafe">(() =>
    preselectedType?.toLocaleLowerCase("tr-TR").includes("kahve") ||
    preselectedType?.toLocaleLowerCase("en-US").includes("cafe")
      ? "cafe"
      : "breakfast",
  );
  const [note, setNote] = useState(() =>
    preselectedItem ? `${isEnglish ? "Selected item" : "Seçilen lezzet"}: ${preselectedItem}` : "",
  );
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      const todayStr = getTodayString();
      setDate(todayStr);
      setMinDate(todayStr);
    });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const inside =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;
      if (!inside) onClose();
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleBackdropClick);
    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, [onClose]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (honeypot) {
      onClose();
      return;
    }

    const formattedDate = date ? date.split("-").reverse().join(".") : "";
    const selectedService = type === "cafe" ? "Kafka Cafe" : isEnglish ? "Van breakfast" : "Kahvaltı";
    const message = isEnglish
      ? `Hello, I would like to request a table at Tarihi Van Kahvaltı Evi:

📅 Date: ${formattedDate}
⏰ Time: ${time}
👥 Guests: ${guests}
🍳 Service: ${selectedService}
📝 Note: ${note || "None"}

Could you please confirm availability? Thank you.`
      : `Merhaba, Tarihi Van Kahvaltı Evi için rezervasyon bilgi ve talebi:

📅 Tarih: ${formattedDate}
⏰ Saat: ${time}
👥 Kişi Sayısı: ${guests} Kişi
🍳 Tercih: ${selectedService}
📝 Not: ${note || "Yok"}

Rezervasyonumu onaylayabilir misiniz? Şimdiden teşekkürler.`;

    const whatsappUrl = `https://wa.me/${phoneE164.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="booking-title"
      aria-describedby="booking-description"
    >
      <header className={styles.header}>
        <span className={styles.headerIcon} aria-hidden="true">
          <CalendarDays size={25} strokeWidth={1.9} />
        </span>
        <div className={styles.headerCopy}>
          <h2 id="booking-title">{isEnglish ? "Request a table" : "Masa ayırtma talebi"}</h2>
          <p id="booking-description">
            {isEnglish
              ? "Choose a date and party size, then send your request on WhatsApp."
              : "Tarih ve kişi sayısını seçin; talebinizi WhatsApp üzerinden iletin."}
          </p>
        </div>
        <button type="button" onClick={onClose} className={styles.closeButton} aria-label={isEnglish ? "Close reservation dialog" : "Rezervasyon penceresini kapat"}>
          <X size={21} />
        </button>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="website_hp">{isEnglish ? "Leave this field empty" : "Lütfen bu alanı doldurmayın"}</label>
          <input
            id="website_hp"
            type="text"
            name="website_hp"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <fieldset className={styles.serviceFieldset}>
          <legend>{isEnglish ? "Choose a service" : "Rezervasyon tercihi"}</legend>
          <div className={styles.serviceToggle}>
            <button
              type="button"
              className={type === "breakfast" ? styles.activeService : ""}
              aria-pressed={type === "breakfast"}
              onClick={() => setType("breakfast")}
            >
              <UtensilsCrossed size={19} aria-hidden="true" />
              <span><strong>{isEnglish ? "Van breakfast" : "Van kahvaltısı"}</strong><small>{isEnglish ? "A long, shared breakfast table" : "Uzun kahvaltı masası"}</small></span>
            </button>
            <button
              type="button"
              className={type === "cafe" ? styles.activeService : ""}
              aria-pressed={type === "cafe"}
              onClick={() => setType("cafe")}
            >
              <Coffee size={19} aria-hidden="true" />
              <span><strong>Kafka Cafe</strong><small>{isEnglish ? "Coffee and a shorter visit" : "Kahve ve kısa buluşma"}</small></span>
            </button>
          </div>
        </fieldset>

        <div className={styles.fieldGrid}>
          <label className={styles.field} htmlFor="booking-date">
            <span><CalendarDays size={16} aria-hidden="true" /> {isEnglish ? "Date" : "Tarih"}</span>
            <input
              type="date"
              id="booking-date"
              required
              value={date}
              min={minDate}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>

          <label className={styles.field} htmlFor="booking-time">
            <span><Clock3 size={16} aria-hidden="true" /> {isEnglish ? "Time" : "Saat"}</span>
            <select id="booking-time" value={time} onChange={(event) => setTime(event.target.value)}>
              <option value="09:00">09:00</option>
              <option value="09:30">09:30</option>
              <option value="10:00">10:00</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
          </label>
        </div>

        <div className={styles.guestField}>
          <div>
            <span className={styles.fieldLabel}><Users size={16} aria-hidden="true" /> {isEnglish ? "Party size" : "Kişi sayısı"}</span>
            <small>{isEnglish ? "Choose between 1 and 30 guests." : "1–30 kişi arasında seçim yapabilirsiniz."}</small>
          </div>
          <div className={styles.guestCounter} role="group" aria-label={isEnglish ? "Party size" : "Kişi sayısı"}>
            <button
              type="button"
              aria-label={isEnglish ? "Decrease guest count" : "Kişi sayısını azalt"}
              disabled={guests <= 1}
              onClick={() => setGuests((current) => current - 1)}
            >
              <Minus size={17} />
            </button>
            <span role="status" aria-live="polite"><strong>{guests}</strong><small>{isEnglish ? "guests" : "kişi"}</small></span>
            <button
              type="button"
              aria-label={isEnglish ? "Increase guest count" : "Kişi sayısını artır"}
              disabled={guests >= 30}
              onClick={() => setGuests((current) => current + 1)}
            >
              <Plus size={17} />
            </button>
          </div>
        </div>

        <label className={styles.noteField} htmlFor="booking-note">
          <span>{isEnglish ? "Note" : "Not"} <small>{isEnglish ? "optional" : "isteğe bağlı"}</small></span>
          <textarea
            id="booking-note"
            rows={3}
            placeholder={isEnglish ? "High chair, seating preference or another helpful detail" : "Çocuk sandalyesi, masa tercihi veya paylaşmak istediğiniz başka bir detay"}
            value={note}
            maxLength={240}
            onChange={(event) => setNote(event.target.value)}
          />
          <small className={styles.characterCount}>{note.length}/240</small>
        </label>

        <footer className={styles.actions}>
          <p><ShieldCheck size={17} aria-hidden="true" /> {isEnglish ? "Your table is confirmed only after the restaurant replies on WhatsApp." : "Rezervasyon, işletmenin WhatsApp onayından sonra kesinleşir."}</p>
          <button type="submit" className={styles.submitButton}>
            <MessageCircle size={19} />
            {isEnglish ? "Send request on WhatsApp" : "WhatsApp ile talep gönder"}
          </button>
        </footer>
      </form>
    </dialog>
  );
}
