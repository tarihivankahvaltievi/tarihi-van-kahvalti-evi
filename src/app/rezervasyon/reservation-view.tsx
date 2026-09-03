"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Coffee,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  RotateCcw,
  ShieldCheck,
  UtensilsCrossed,
} from "lucide-react";
import { displayAddress, displayPhone, mapsUrl, openingHours, phoneE164, telUrl } from "../seo";
import type { SiteLocale } from "../home-localization";
import { trackBookingLead, trackEvent } from "../analytics";
import styles from "./reservation.module.css";

interface ReservationViewProps {
  locale?: SiteLocale;
  initialService?: "breakfast" | "cafe";
  initialItem?: string;
}

interface SubmittedBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
  serviceType: string;
  seatingArea: string;
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

export function ReservationView({
  locale = "tr",
  initialService,
  initialItem,
}: ReservationViewProps) {
  const isEnglish = locale === "en";

  const [serviceType, setServiceType] = useState<"breakfast" | "cafe">(() =>
    initialService ? initialService : "breakfast",
  );

  const [seatingArea, setSeatingArea] = useState<"indoor" | "street" | "balcony">("indoor");
  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [guests, setGuests] = useState(2);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [note, setNote] = useState(() =>
    initialItem ? `${isEnglish ? "Special item" : "Seçilen lezzet"}: ${initialItem}` : "",
  );
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedBooking | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const today = getTodayString();
      setDate(today);
      setMinDate(today);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const seatingLabels: Record<"indoor" | "street" | "balcony", { tr: string; en: string }> = {
    indoor: {
      tr: "İç Salon",
      en: "Indoor Dining",
    },
    street: {
      tr: "Zambak Sokak (Dış)",
      en: "Outdoor Street",
    },
    balcony: {
      tr: "Teras / Cam Kenarı",
      en: "Terrace / Window",
    },
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (honeypot) {
      return;
    }

    setIsSubmitting(true);

    const formattedDate = date ? date.split("-").reverse().join(".") : "";
    const serviceLabel =
      serviceType === "cafe"
        ? "Kafka Cafe"
        : isEnglish
        ? "Van Breakfast"
        : "Van Kahvaltısı";

    const seatingLabel = seatingLabels[seatingArea][isEnglish ? "en" : "tr"];

    let createdId = "";
    let icsDownloadUrl = "";
    let gCalUrl = "";

    try {
      const fullNote = note ? `${seatingLabel} | ${note}` : seatingLabel;

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          date,
          time,
          guests,
          serviceType,
          note: fullNote,
          honeypot,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.reservation) {
          createdId = json.reservation.id;
          icsDownloadUrl = json.icsUrl || `/api/reservations/${createdId}/ics`;
          gCalUrl = json.googleCalendarUrl || "";
          trackBookingLead({ locale, service_type: serviceType });
        }
      }
    } catch (err) {
      console.error("Booking submission error:", err);
    }

    // Format WhatsApp Message
    const calendarLine = icsDownloadUrl
      ? isEnglish
        ? `\n📅 Add to Calendar:\n${icsDownloadUrl}`
        : `\n📅 Takvime Ekle:\n${icsDownloadUrl}`
      : "";

    const message = isEnglish
      ? `Hello, I would like to reserve a table at Tarihi Van Kahvaltı Evi:

${createdId ? `📋 Reservation: #${createdId}\n` : ""}👤 Name: ${customerName}
📞 Phone: ${customerPhone}
📅 Date: ${formattedDate}
⏰ Time: ${time}
👥 Guests: ${guests} Person(s)
🍳 Service: ${serviceLabel}
🪑 Area: ${seatingLabel}
📝 Note: ${note || "None"}${calendarLine}

Could you please confirm table availability? Thank you.`
      : `Merhaba, Tarihi Van Kahvaltı Evi için masa rezervasyonu talebi:

${createdId ? `📋 Rezervasyon No: #${createdId}\n` : ""}👤 Ad Soyad: ${customerName}
📞 Telefon: ${customerPhone}
📅 Tarih: ${formattedDate}
⏰ Saat: ${time}
👥 Kişi Sayısı: ${guests} Kişi
🍳 Tercih: ${serviceLabel}
🪑 Alan: ${seatingLabel}
📝 Not: ${note || "Yok"}${calendarLine}

Müsaitlik durumunu teyit edebilir misiniz? Teşekkürler.`;

    const cleanPhone = phoneE164.replace("+", "");
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    trackEvent("booking_whatsapp_handoff", {
      locale,
      service_type: serviceType,
      reservation_saved: Boolean(createdId),
    });

    setSubmittedData({
      id: createdId || `VAN-${date.replace(/-/g, "")}`,
      customerName,
      customerPhone,
      date: formattedDate,
      time,
      guests,
      serviceType: serviceLabel,
      seatingArea: seatingLabel,
      icsUrl: icsDownloadUrl || `/api/reservations/${createdId}/ics`,
      googleCalendarUrl: gCalUrl,
    });

    setIsSubmitting(false);
  };

  return (
    <div className={styles.grid}>
      {/* ------------------------------------------------------------------ */}
      {/* Left: Venue Context & Atmosphere                                   */}
      {/* ------------------------------------------------------------------ */}
      <aside className={styles.aside} aria-label={isEnglish ? "Restaurant Information" : "Mekân Bilgileri"}>
        <div className={styles.photoCard}>
          <Image
            src="/images/breakfast-spread.webp"
            alt={isEnglish ? "Tarihi Van Breakfast Table" : "Tarihi Van Kahvaltı Sofrası"}
            fill
            sizes="(max-width: 840px) 100vw, 42vw"
            priority
            quality={80}
          />
          <span className={styles.photoTag}>
            {isEnglish ? "Zambak Street • Since 1978" : "Beyoğlu Zambak Sokak • 1978'den beri"}
          </span>
        </div>

        <div className={styles.venueDetails}>
          <a href={telUrl} className={styles.venueItem}>
            <Phone size={16} />
            <span>{displayPhone}</span>
          </a>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.venueItem}>
            <MapPin size={16} />
            <span>{displayAddress}</span>
          </a>
          <div className={styles.venueItem}>
            <Clock size={16} />
            <span>{openingHours.short}</span>
          </div>
        </div>

        <div className={styles.quoteBlock}>
          <p>
            {isEnglish
              ? "“A true Istanbul classic. Freshly prepared regional Van specialties and endless hot tea in a charming historic building.”"
              : "“Zambak Sokak'ta çayın hiç eksilmediği, otlu peynir ve murtuğanın en tazesinin sunulduğu gerçek bir aile sofrası.”"}
          </p>
          <small>{isEnglish ? "Google Reviews • 4.9 Rating" : "Google Yorumları • 4.9 Puan"}</small>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* Right: The Clean, Fast Reservation Card                            */}
      {/* ------------------------------------------------------------------ */}
      <section className={styles.card} aria-labelledby="form-title">
        <div className={styles.cardHead}>
          <div>
            <h2 id="form-title" className={styles.cardHeadTitle}>
              {submittedData
                ? isEnglish ? "Reservation Request Sent" : "Rezervasyon Talebiniz Alındı"
                : isEnglish ? "Reserve a Table" : "Masada Yerinizi Ayırtın"}
            </h2>
            <p className={styles.cardHeadNote}>
              {submittedData
                ? isEnglish ? "Saved to our schedule and forwarded to WhatsApp." : "WhatsApp üzerinden iletildi; takviminize ekleyebilirsiniz."
                : isEnglish ? "Select your party and time; confirm on WhatsApp." : "Tarih ve kişi sayısını seçin; WhatsApp ile hızlı teyit alın."}
            </p>
          </div>
        </div>

        {submittedData ? (
          <div className={styles.successCard}>
            <div className={styles.successIcon} aria-hidden="true">
              <CheckCircle2 size={32} />
            </div>

            <h3 className={styles.successHeading}>
              {isEnglish ? "We Look Forward to Welcoming You!" : "Sizi Ağırlamaktan Mutluluk Duyarız!"}
            </h3>

            <p className={styles.successText}>
              {isEnglish
                ? "Your reservation request has been forwarded to our team via WhatsApp. You can add it directly to your personal calendar below:"
                : "Talebiniz yetkili ekibimize iletildi. Unutmamak için bu randevuyu kendi takviminize kaydedebilirsiniz:"}
            </p>

            <dl className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <dt>{isEnglish ? "Code" : "Kod"}</dt>
                <dd>#{submittedData.id}</dd>
              </div>
              <div className={styles.summaryRow}>
                <dt>{isEnglish ? "Guest" : "Misafir"}</dt>
                <dd>{submittedData.customerName}</dd>
              </div>
              <div className={styles.summaryRow}>
                <dt>{isEnglish ? "Date & Time" : "Tarih & Saat"}</dt>
                <dd>{submittedData.date} — {submittedData.time}</dd>
              </div>
              <div className={styles.summaryRow}>
                <dt>{isEnglish ? "Party & Area" : "Kişi & Alan"}</dt>
                <dd>{submittedData.guests} {isEnglish ? "Guests" : "Kişi"} • {submittedData.seatingArea}</dd>
              </div>
            </dl>

            <div className={styles.calButtons}>
              <a
                href={submittedData.icsUrl}
                download={`tarihi-van-rezervasyon-${submittedData.id}.ics`}
                className={styles.appleBtn}
              >
                <span>🍎</span>
                {isEnglish ? "Apple Calendar (.ics)" : "Apple Takvimi"}
              </a>

              {submittedData.googleCalendarUrl ? (
                <a
                  href={submittedData.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.googleBtn}
                >
                  <span>📅</span>
                  Google Calendar
                </a>
              ) : (
                <a
                  href={submittedData.icsUrl}
                  download={`tarihi-van-rezervasyon-${submittedData.id}.ics`}
                  className={styles.googleBtn}
                >
                  <span>📅</span>
                  .ics İndir
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmittedData(null);
                setNote("");
              }}
              className={styles.anotherBtn}
            >
              <RotateCcw size={14} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
              {isEnglish ? "Make another reservation" : "Yeni bir rezervasyon yap"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.cardForm}>
            {/* Honeypot */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="website_hp">Leave empty</label>
              <input
                id="website_hp"
                type="text"
                name="website_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Service Toggle */}
            <div className={styles.serviceToggle} role="radiogroup" aria-label="Servis Tercihi">
              <button
                type="button"
                role="radio"
                aria-checked={serviceType === "breakfast"}
                className={`${styles.serviceTab} ${serviceType === "breakfast" ? styles.serviceTabActive : ""}`}
                onClick={() => setServiceType("breakfast")}
              >
                <UtensilsCrossed size={16} />
                <span>{isEnglish ? "Van Breakfast" : "Van Kahvaltısı"}</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={serviceType === "cafe"}
                className={`${styles.serviceTab} ${serviceType === "cafe" ? styles.serviceTabActive : ""}`}
                onClick={() => setServiceType("cafe")}
              >
                <Coffee size={16} />
                <span>Kafka Cafe</span>
              </button>
            </div>

            {/* Name and Phone */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="res-name" className={styles.label}>
                  <span>{isEnglish ? "Full Name" : "Ad Soyad"}</span>
                </label>
                <input
                  id="res-name"
                  type="text"
                  required
                  maxLength={80}
                  placeholder={isEnglish ? "e.g. Ahmet Yılmaz" : "örn. Ahmet Yılmaz"}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="res-phone" className={styles.label}>
                  <span>{isEnglish ? "Phone Number" : "Telefon Numarası"}</span>
                </label>
                <input
                  id="res-phone"
                  type="tel"
                  required
                  maxLength={30}
                  placeholder={isEnglish ? "+90 5XX XXX XX XX" : "05XX XXX XX XX"}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="res-date" className={styles.label}>
                  <Calendar size={14} />
                  <span>{isEnglish ? "Date" : "Tarih"}</span>
                </label>
                <input
                  id="res-date"
                  type="date"
                  required
                  value={date}
                  min={minDate}
                  onChange={(e) => setDate(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="res-time" className={styles.label}>
                  <Clock size={14} />
                  <span>{isEnglish ? "Time" : "Saat"}</span>
                </label>
                <select
                  id="res-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={styles.select}
                >
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
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                </select>
              </div>
            </div>

            {/* Guests and Seating Area */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label}>
                  <span>{isEnglish ? "Party Size" : "Kişi Sayısı"}</span>
                </label>
                <div className={styles.counterWrap} role="group" aria-label="Kişi Sayısı">
                  <button
                    type="button"
                    disabled={guests <= 1}
                    aria-label={isEnglish ? "Decrease guests" : "Kişi sayısını azalt"}
                    onClick={() => setGuests((c) => Math.max(1, c - 1))}
                    className={styles.counterBtn}
                  >
                    <Minus size={16} />
                  </button>
                  <div className={styles.counterValue}>
                    <strong>{guests}</strong>
                    <span>{isEnglish ? "guests" : "kişi"}</span>
                  </div>
                  <button
                    type="button"
                    disabled={guests >= 50}
                    aria-label={isEnglish ? "Increase guests" : "Kişi sayısını artır"}
                    onClick={() => setGuests((c) => Math.min(50, c + 1))}
                    className={styles.counterBtn}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  <span>{isEnglish ? "Area Preference" : "Masa Tercihi"}</span>
                </label>
                <div className={styles.seatingOptions} role="radiogroup" aria-label="Masa Tercihi">
                  {(["indoor", "street", "balcony"] as const).map((area) => (
                    <button
                      key={area}
                      type="button"
                      role="radio"
                      aria-checked={seatingArea === area}
                      className={`${styles.seatingBtn} ${seatingArea === area ? styles.seatingBtnActive : ""}`}
                      onClick={() => setSeatingArea(area)}
                    >
                      {seatingLabels[area][isEnglish ? "en" : "tr"]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Note */}
            <div className={styles.field}>
              <label htmlFor="res-note" className={styles.label}>
                <span>{isEnglish ? "Special Request" : "Not"}</span>
                <small>({isEnglish ? "optional" : "isteğe bağlı"})</small>
              </label>
              <textarea
                id="res-note"
                rows={2}
                maxLength={240}
                placeholder={
                  isEnglish
                    ? "High chair, window table, celebration note..."
                    : "Bebek sandalyesi, masa tercihi veya paylaşmak istediğiniz başka bir detay..."
                }
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={styles.textarea}
              />
            </div>

            {/* Submit Block */}
            <div className={styles.submitBlock}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                <MessageCircle size={19} />
                <span>
                  {isSubmitting
                    ? isEnglish ? "Processing..." : "Hazırlanıyor..."
                    : isEnglish ? "Send Request on WhatsApp →" : "WhatsApp ile Talep Gönder →"}
                </span>
              </button>

              <p className={styles.notice}>
                <ShieldCheck size={14} style={{ color: "#2e7d32", flex: "none" }} />
                <span>
                  {isEnglish
                    ? "Your table is confirmed by the restaurant on WhatsApp. Free cancellation."
                    : "Rezervasyon, işletmenin WhatsApp onayından sonra kesinleşir."}
                </span>
              </p>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
