"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Coffee,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  User,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { phoneE164 } from "../seo";
import type { SiteLocale } from "../home-localization";
import { trackBookingLead, trackEvent } from "../analytics";
import styles from "./booking-modal.module.css";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedType?: string;
  preselectedItem?: string;
  locale?: SiteLocale;
}

interface SubmittedBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
  serviceType: string;
  icsUrl: string;
  googleCalendarUrl?: string;
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
  const backdropPressRef = useRef<{ x: number; y: number } | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedBooking | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      const todayStr = getTodayString();
      setDate(todayStr);
      setMinDate(todayStr);
    });
  }, []);

  // Reset submitted state when modal re-opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setSubmittedData(null);
        setIsSubmitting(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialog.showModal();
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
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
    const isBackdropPoint = (event: PointerEvent) => {
      if (event.target !== dialog) return false;
      const rect = dialog.getBoundingClientRect();
      return !(
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right
      );
    };
    const handlePointerDown = (event: PointerEvent) => {
      backdropPressRef.current = isBackdropPoint(event)
        ? { x: event.clientX, y: event.clientY }
        : null;
    };
    const handlePointerUp = (event: PointerEvent) => {
      const start = backdropPressRef.current;
      backdropPressRef.current = null;
      if (!start || !isBackdropPoint(event)) return;
      if (Math.hypot(event.clientX - start.x, event.clientY - start.y) <= 8) onClose();
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("pointerdown", handlePointerDown);
    dialog.addEventListener("pointerup", handlePointerUp);
    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("pointerdown", handlePointerDown);
      dialog.removeEventListener("pointerup", handlePointerUp);
    };
  }, [onClose]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (honeypot) {
      onClose();
      return;
    }

    setIsSubmitting(true);

    const formattedDate = date ? date.split("-").reverse().join(".") : "";
    const selectedService = type === "cafe" ? "Kafka Cafe" : isEnglish ? "Van breakfast" : "Van Kahvaltısı";

    let createdId = "";
    let icsDownloadUrl = "";
    let gCalUrl = "";

    try {
      // 1. Save to backend database & generate ics link
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          date,
          time,
          guests,
          serviceType: type,
          note,
          honeypot,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.reservation) {
          createdId = json.reservation.id;
          icsDownloadUrl = json.icsUrl || `/api/reservations/${createdId}/ics`;
          gCalUrl = json.googleCalendarUrl || "";
          trackBookingLead({ locale, service_type: type });
        }
      }
    } catch (err) {
      console.error("Booking API error:", err);
    }

    // 2. Format WhatsApp Message (including calendar link for the restaurant owner)
    const calendarLine = icsDownloadUrl
      ? isEnglish
        ? `\n📅 Add to iPhone / Google Calendar:\n${icsDownloadUrl}`
        : `\n📅 iPhone / Google Takvime Ekle (1-Tık):\n${icsDownloadUrl}`
      : "";

    const message = isEnglish
      ? `Hello, I would like to request a table at Tarihi Van Kahvaltı Evi:

${createdId ? `📋 Reservation ID: #${createdId}` : ""}
👤 Name: ${customerName}
📞 Phone: ${customerPhone}
📅 Date: ${formattedDate}
⏰ Time: ${time}
👥 Guests: ${guests}
🍳 Service: ${selectedService}
📝 Note: ${note || "None"}${calendarLine}

Could you please confirm availability? Thank you.`
      : `Merhaba, Tarihi Van Kahvaltı Evi için rezervasyon bilgi ve talebi:

${createdId ? `📋 Rezervasyon No: #${createdId}` : ""}
👤 Ad Soyad: ${customerName}
📞 Telefon: ${customerPhone}
📅 Tarih: ${formattedDate}
⏰ Saat: ${time}
👥 Kişi Sayısı: ${guests} Kişi
🍳 Tercih: ${selectedService}
📝 Not: ${note || "Yok"}${calendarLine}

Rezervasyonumu onaylayabilir misiniz? Şimdiden teşekkürler.`;

    const whatsappUrl = `https://wa.me/${phoneE164.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    trackEvent("booking_whatsapp_handoff", { locale, service_type: type, reservation_saved: Boolean(createdId) });

    // 3. Set submitted state to show confirmation & customer calendar button
    setSubmittedData({
      id: createdId || `VAN-${date.replace(/-/g, "")}`,
      customerName,
      customerPhone,
      date: formattedDate,
      time,
      guests,
      serviceType: selectedService,
      icsUrl: icsDownloadUrl || `/api/reservations/${createdId}/ics`,
      googleCalendarUrl: gCalUrl,
    });
    setIsSubmitting(false);
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-modal="true"
      aria-labelledby="booking-title"
      aria-describedby="booking-description"
    >
      <header className={styles.header}>
        <span className={styles.sheetHandle} aria-hidden="true" />
        <span className={styles.headerIcon} aria-hidden="true">
          {submittedData ? <CheckCircle2 size={25} strokeWidth={2} /> : <CalendarDays size={25} strokeWidth={1.9} />}
        </span>
        <div className={styles.headerCopy}>
          <h2 id="booking-title">
            {submittedData
              ? isEnglish ? "Reservation Sent!" : "Talebiniz Alındı!"
              : isEnglish ? "Request a table" : "Masa ayırtma talebi"}
          </h2>
          <p id="booking-description">
            {submittedData
              ? isEnglish
                ? "Your request was sent on WhatsApp and saved to our schedule."
                : "Talebiniz WhatsApp ile iletildi ve sisteme kaydedildi."
              : isEnglish
                ? "Choose a date and party size, then send your request on WhatsApp."
                : "Tarih ve kişi sayısını seçin; talebinizi WhatsApp üzerinden iletin."}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label={isEnglish ? "Close reservation dialog" : "Rezervasyon penceresini kapat"}
        >
          <X size={21} />
        </button>
      </header>

      {submittedData ? (
        <div className={styles.successContainer}>
          <div className={styles.successIconBadge}>
            <CheckCircle2 size={32} />
          </div>
          <h3 className={styles.successTitle}>
            {isEnglish ? "We Look Forward to Seeing You!" : "Sizi Ağırlamaktan Mutluluk Duyarız!"}
          </h3>
          <p className={styles.successDesc}>
            {isEnglish
              ? "Your request has been forwarded to our team via WhatsApp. You can also save this reservation to your phone calendar:"
              : "Rezervasyon talebiniz işletmeye iletildi. Unutmamak için bu randevuyu kendi takviminize de ekleyebilirsiniz:"}
          </p>

          <div className={styles.successCard}>
            <div className={styles.successRow}>
              <span className={styles.successRowLabel}>
                <User size={15} /> {isEnglish ? "Name" : "Ad Soyad"}
              </span>
              <span className={styles.successRowValue}>{submittedData.customerName}</span>
            </div>
            <div className={styles.successRow}>
              <span className={styles.successRowLabel}>
                <CalendarDays size={15} /> {isEnglish ? "Date & Time" : "Tarih & Saat"}
              </span>
              <span className={styles.successRowValue}>
                {submittedData.date} - {submittedData.time}
              </span>
            </div>
            <div className={styles.successRow}>
              <span className={styles.successRowLabel}>
                <Users size={15} /> {isEnglish ? "Guests" : "Kişi Sayısı"}
              </span>
              <span className={styles.successRowValue}>
                {submittedData.guests} {isEnglish ? "guests" : "kişi"} ({submittedData.serviceType})
              </span>
            </div>
          </div>

          <div className={styles.calendarBox}>
            <p className={styles.calendarPrompt}>
              <Calendar size={15} /> {isEnglish ? "Add to your personal calendar:" : "Kendi Takviminize Ekleyin:"}
            </p>
            <div className={styles.calendarButtons}>
              <a
                href={submittedData.icsUrl}
                download={`van-rezervasyon-${submittedData.id}.ics`}
                className={styles.appleCalButton}
              >
                <span>🍎</span>
                {isEnglish ? "Apple Calendar" : "Apple Takvimi"}
              </a>
              {submittedData.googleCalendarUrl ? (
                <a
                  href={submittedData.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.googleCalButton}
                >
                  <span>📅</span>
                  Google Calendar
                </a>
              ) : (
                <a
                  href={submittedData.icsUrl}
                  download={`van-rezervasyon-${submittedData.id}.ics`}
                  className={styles.googleCalButton}
                >
                  <span>📅</span>
                  {isEnglish ? "Download .ics" : ".ics İndir"}
                </a>
              )}
            </div>
          </div>

          <button type="button" onClick={onClose} className={styles.doneButton}>
            {isEnglish ? "Close Window" : "Pencereyi Kapat"}
          </button>
        </div>
      ) : (
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
                <span>
                  <strong>{isEnglish ? "Van breakfast" : "Van kahvaltısı"}</strong>
                  <small>{isEnglish ? "A long, shared breakfast table" : "Uzun kahvaltı masası"}</small>
                </span>
              </button>
              <button
                type="button"
                className={type === "cafe" ? styles.activeService : ""}
                aria-pressed={type === "cafe"}
                onClick={() => setType("cafe")}
              >
                <Coffee size={19} aria-hidden="true" />
                <span>
                  <strong>Kafka Cafe</strong>
                  <small>{isEnglish ? "Coffee and a shorter visit" : "Kahve ve kısa buluşma"}</small>
                </span>
              </button>
            </div>
          </fieldset>

          {/* Customer Name & Phone Fields */}
          <div className={styles.fieldGrid}>
            <label className={styles.field} htmlFor="booking-name">
              <span>
                <User size={16} aria-hidden="true" /> {isEnglish ? "Full name" : "Ad Soyad"}
              </span>
              <input
                type="text"
                id="booking-name"
                required
                placeholder={isEnglish ? "e.g. John Smith" : "örn. Ahmet Yılmaz"}
                value={customerName}
                maxLength={80}
                onChange={(event) => setCustomerName(event.target.value)}
              />
            </label>

            <label className={styles.field} htmlFor="booking-phone">
              <span>
                <Phone size={16} aria-hidden="true" /> {isEnglish ? "Phone number" : "Telefon Numarası"}
              </span>
              <input
                type="tel"
                id="booking-phone"
                required
                placeholder={isEnglish ? "+90 5XX XXX XX XX" : "05XX XXX XX XX"}
                value={customerPhone}
                maxLength={25}
                onChange={(event) => setCustomerPhone(event.target.value)}
              />
            </label>
          </div>

          <div className={styles.fieldGrid}>
            <label className={styles.field} htmlFor="booking-date">
              <span>
                <CalendarDays size={16} aria-hidden="true" /> {isEnglish ? "Date" : "Tarih"}
              </span>
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
              <span>
                <Clock3 size={16} aria-hidden="true" /> {isEnglish ? "Time" : "Saat"}
              </span>
              <select id="booking-time" value={time} onChange={(event) => setTime(event.target.value)}>
                <option value="08:00">08:00</option>
                <option value="08:30">08:30</option>
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
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
              </select>
            </label>
          </div>

          <div className={styles.guestField}>
            <div>
              <span className={styles.fieldLabel}>
                <Users size={16} aria-hidden="true" /> {isEnglish ? "Party size" : "Kişi sayısı"}
              </span>
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
              <span role="status" aria-live="polite">
                <strong>{guests}</strong>
                <small>{isEnglish ? "guests" : "kişi"}</small>
              </span>
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
            <span>
              {isEnglish ? "Note" : "Not"} <small>{isEnglish ? "optional" : "isteğe bağlı"}</small>
            </span>
            <textarea
              id="booking-note"
              rows={3}
              placeholder={
                isEnglish
                  ? "High chair, seating preference or another helpful detail"
                  : "Çocuk sandalyesi, masa tercihi veya paylaşmak istediğiniz başka bir detay"
              }
              value={note}
              maxLength={240}
              onChange={(event) => setNote(event.target.value)}
            />
            <small className={styles.characterCount}>{note.length}/240</small>
          </label>

          <footer className={styles.actions}>
            <p>
              <ShieldCheck size={17} aria-hidden="true" />{" "}
              {isEnglish
                ? "Your table is confirmed only after the restaurant replies on WhatsApp."
                : "Rezervasyon, işletmenin WhatsApp onayından sonra kesinleşir."}
            </p>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              <MessageCircle size={19} />
              {isSubmitting
                ? isEnglish ? "Processing..." : "Hazırlanıyor..."
                : isEnglish ? "Send request on WhatsApp" : "WhatsApp ile talep gönder"}
            </button>
          </footer>
        </form>
      )}
    </dialog>
  );
}
