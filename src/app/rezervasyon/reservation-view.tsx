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
import { englishReservationFaqItems, reservationFaqItems } from "./reservation-content";
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
  icsUrl?: string;
  googleCalendarUrl?: string;
}

const venuePhotos = [
  {
    src: "/images/hero-parallax/historic-corner.webp",
    badge: "1978'den Beri",
    badgeEn: "Since 1978",
    title: "Tarihi İç Salon",
    titleEn: "Historic Dining Hall",
  },
  {
    src: "/images/hero-parallax/balcony-full.webp",
    badge: "Beyoğlu Dokusu",
    badgeEn: "Beyoğlu Vibe",
    title: "Zambak Sokak Balkonu",
    titleEn: "Zambak Street Balcony",
  },
  {
    src: "/images/hero-parallax/spread-close.webp",
    badge: "Günlük Taze",
    badgeEn: "Daily Fresh",
    title: "Serpme Van Sofrası",
    titleEn: "Van Breakfast Feast",
  },
  {
    src: "/images/hero-parallax/table-pisi.webp",
    badge: "Sıcak & Çıtır",
    badgeEn: "Hot & Crisp",
    title: "Pişi & Bakır Sahanlar",
    titleEn: "Fried Dough & Copper Pans",
  },
  {
    src: "/images/hero-parallax/terrace-table.webp",
    badge: "Güneş Alan",
    badgeEn: "Sunlit",
    title: "Teras Masaları",
    titleEn: "Terrace Tables",
  },
];

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
    initialItem ? `${isEnglish ? "Item" : "Seçim"}: ${initialItem}` : "",
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
      tr: "İç Salon (Mekân İçi)",
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

    // Open synchronously while the submit click still carries user activation.
    // Some mobile browsers block a new WhatsApp tab after the API await.
    const whatsappWindow = window.open("", "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;

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

    // Direct WhatsApp message formatting
    const calendarLine = icsDownloadUrl
      ? isEnglish
        ? `\n📅 Add to Calendar:\n${icsDownloadUrl}`
        : `\n📅 Takvime Ekle:\n${icsDownloadUrl}`
      : "";

    const message = isEnglish
      ? `Hello, I'd like to book a table at Tarihi Van Kahvaltı Evi:

${createdId ? `📋 Booking Code: #${createdId}\n` : ""}👤 Name: ${customerName}
📞 Phone: ${customerPhone}
📅 Date: ${formattedDate}
⏰ Time: ${time}
👥 Guests: ${guests} Person(s)
🍳 Option: ${serviceLabel}
🪑 Area: ${seatingLabel}
📝 Note: ${note || "None"}${calendarLine}

Could you please confirm table availability? Thank you.`
      : `Merhaba, Tarihi Van Kahvaltı Evi için masa rezervasyonu talebi:

${createdId ? `📋 Rezervasyon Kodu: #${createdId}\n` : ""}👤 Ad Soyad: ${customerName}
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
    if (whatsappWindow && !whatsappWindow.closed) {
      whatsappWindow.location.replace(whatsappUrl);
    } else {
      window.location.assign(whatsappUrl);
    }
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
      icsUrl: icsDownloadUrl || undefined,
      googleCalendarUrl: gCalUrl,
    });

    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <section className={styles.glassCard} aria-labelledby="form-heading">
          <div className={styles.introPanel}>
            <Image
              src="/images/hero-parallax/historic-corner.webp"
              alt={
                isEnglish
                  ? "The historic dining room at Tarihi Van Kahvaltı Evi"
                  : "Tarihi Van Kahvaltı Evi'nin tarihi iç salonu"
              }
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 760px) 100vw, 420px"
              className={styles.introImage}
            />
            <div className={styles.introShade} />
            <div className={styles.introContent}>
              <p className={styles.introLocation}>
                <MapPin size={15} aria-hidden="true" />
                {isEnglish ? "Zambak Street, Beyoğlu" : "Zambak Sokak, Beyoğlu"}
              </p>
              <h1 id="form-heading" className={styles.brandTitle}>
                {isEnglish ? "Your table is waiting." : "Sofrada yeriniz hazır."}
              </h1>
              <p className={styles.introText}>
                {isEnglish
                  ? "Choose a time and send your request. We confirm availability personally on WhatsApp."
                  : "Günü ve saati seçin; müsaitliği WhatsApp üzerinden bizzat teyit edelim."}
              </p>
              <div className={styles.introFacts} aria-label={isEnglish ? "Reservation details" : "Rezervasyon bilgileri"}>
                <span>{isEnglish ? "Since 1978" : "1978'den beri"}</span>
                <span>{isEnglish ? "No deposit" : "Kapora yok"}</span>
              </div>
            </div>
          </div>

          <div className={styles.bookingPanel}>
          <div className={styles.cardHeader}>
            <div className={styles.brandWrap}>
              <h2 className={styles.formTitle}>
                {isEnglish ? "Table reservation" : "Masa rezervasyonu"}
              </h2>
              <p className={styles.formHint}>
                {isEnglish ? "Usually confirmed in 5–10 minutes" : "Genellikle 5–10 dakika içinde teyit edilir"}
              </p>
            </div>

            <div
              className={styles.serviceToggle}
              role="radiogroup"
              aria-label={isEnglish ? "Service preference" : "Hizmet tercihi"}
            >
              <button
                type="button"
                role="radio"
                aria-checked={serviceType === "breakfast"}
                className={`${styles.serviceTab} ${serviceType === "breakfast" ? styles.serviceTabActive : ""}`}
                onClick={() => setServiceType("breakfast")}
              >
                <UtensilsCrossed size={14} />
                <span>{isEnglish ? "Breakfast" : "Van Kahvaltısı"}</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={serviceType === "cafe"}
                className={`${styles.serviceTab} ${serviceType === "cafe" ? styles.serviceTabActive : ""}`}
                onClick={() => setServiceType("cafe")}
              >
                <Coffee size={14} />
                <span>Kafka Cafe</span>
              </button>
            </div>
          </div>

          {submittedData ? (
            <div className={styles.successCard} role="status" aria-live="polite">
              <div className={styles.successIcon} aria-hidden="true">
                <CheckCircle2 size={28} />
              </div>

              <h2 className={styles.successHeading}>
                {isEnglish ? "Request Sent on WhatsApp" : "Talebiniz WhatsApp ile İletildi"}
              </h2>

              <p className={styles.successText}>
                {isEnglish
                  ? "Your reservation has been submitted. You can quickly add this table booking to your personal calendar below:"
                  : "Rezervasyon talebiniz iletildi. Unutmamak için randevuyu telefon takviminize tek tıkla kaydedebilirsiniz:"}
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
                  <dt>{isEnglish ? "Details" : "Detay"}</dt>
                  <dd>{submittedData.guests} {isEnglish ? "Guests" : "Kişi"} • {submittedData.serviceType}</dd>
                </div>
              </dl>

              {submittedData.icsUrl ? (
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
                  ) : null}
                </div>
              ) : (
                <p className={styles.calendarNotice}>
                  {isEnglish
                    ? "WhatsApp is ready. Calendar links appear after the booking is saved successfully."
                    : "WhatsApp hazır. Takvim bağlantıları rezervasyon kaydı başarıyla oluştuğunda gösterilir."}
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  setSubmittedData(null);
                  setNote("");
                }}
                className={styles.anotherBtn}
              >
                <RotateCcw size={13} style={{ display: "inline-block", marginRight: "5px", verticalAlign: "middle" }} />
                {isEnglish ? "New Reservation" : "Yeni Rezervasyon Yap"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.cardForm}>
              {/* Honeypot */}
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="hp_check">Leave empty</label>
                <input
                  id="hp_check"
                  type="text"
                  name="hp_check"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Row 1: Name and Phone (Side-by-side) */}
              <div className={styles.gridRow}>
                <div className={styles.field}>
                  <label htmlFor="form-guest-name" className={styles.label}>
                    <span>{isEnglish ? "Full Name" : "Ad Soyad"}</span>
                  </label>
                  <input
                    id="form-guest-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    minLength={2}
                    maxLength={70}
                    placeholder={isEnglish ? "e.g. Ahmet Yılmaz" : "örn. Ahmet Yılmaz"}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="form-guest-phone" className={styles.label}>
                    <span>{isEnglish ? "Phone" : "Telefon"}</span>
                  </label>
                  <input
                    id="form-guest-phone"
                    name="tel"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    minLength={10}
                    maxLength={25}
                    pattern="[0-9+()\s-]{10,25}"
                    title={isEnglish ? "Enter a valid phone number" : "Geçerli bir telefon numarası girin"}
                    placeholder={isEnglish ? "+90 5XX XXX XX XX" : "05XX XXX XX XX"}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Row 2: Date and Time (Side-by-side) */}
              <div className={styles.gridRow}>
                <div className={styles.field}>
                  <label htmlFor="form-guest-date" className={styles.label}>
                    <Calendar size={13} />
                    <span>{isEnglish ? "Date" : "Tarih"}</span>
                  </label>
                  <input
                    id="form-guest-date"
                    name="reservation-date"
                    type="date"
                    required
                    value={date}
                    min={minDate}
                    onChange={(e) => setDate(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="form-guest-time" className={styles.label}>
                    <Clock size={13} />
                    <span>{isEnglish ? "Time" : "Saat"}</span>
                  </label>
                  <select
                    id="form-guest-time"
                    name="reservation-time"
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

              {/* Row 3: Party Size & Seating Area (Side-by-side) */}
              <div className={styles.gridRow}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    <span>{isEnglish ? "Party Size" : "Kişi Sayısı"}</span>
                  </label>
                  <div
                    className={styles.counterWrap}
                    role="group"
                    aria-label={isEnglish ? "Party size" : "Kişi sayısı"}
                  >
                    <button
                      type="button"
                      disabled={guests <= 1}
                      aria-label={isEnglish ? "Decrease guests" : "Kişi sayısını azalt"}
                      onClick={() => setGuests((c) => Math.max(1, c - 1))}
                      className={styles.counterBtn}
                    >
                      <Minus size={15} />
                    </button>
                    <div className={styles.counterValue}>
                      <strong>{guests}</strong>
                      <span>{isEnglish ? "guests" : "kişi"}</span>
                    </div>
                    <button
                      type="button"
                      disabled={guests >= 40}
                      aria-label={isEnglish ? "Increase guests" : "Kişi sayısını artır"}
                      onClick={() => setGuests((c) => Math.min(40, c + 1))}
                      className={styles.counterBtn}
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="form-guest-area" className={styles.label}>
                    <span>{isEnglish ? "Seating Area" : "Masa Tercihi"}</span>
                  </label>
                  <select
                    id="form-guest-area"
                    name="seating-area"
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value as "indoor" | "street" | "balcony")}
                    className={styles.select}
                  >
                    <option value="indoor">{isEnglish ? "Indoor Dining Room" : "İç Salon (Varsayılan)"}</option>
                    <option value="street">{isEnglish ? "Zambak Street (Outdoor)" : "Zambak Sokak (Dış)"}</option>
                    <option value="balcony">{isEnglish ? "Terrace / Window" : "Teras / Cam Kenarı"}</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Note (Single line compact) */}
              <div className={styles.field}>
                <label htmlFor="form-guest-note" className={styles.label}>
                  <span>{isEnglish ? "Special Request" : "Özel Not"}</span>
                  <small>({isEnglish ? "optional" : "isteğe bağlı"})</small>
                </label>
                <input
                  id="form-guest-note"
                  name="note"
                  type="text"
                  maxLength={140}
                  placeholder={
                    isEnglish
                      ? "e.g. High chair, window side, celebration..."
                      : "örn. Bebek sandalyesi, kutlama vb."
                  }
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className={styles.input}
                />
              </div>

              {/* Row 5: Action Button & Micro-Assurance */}
              <div className={styles.submitBlock}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className={styles.submitBtn}
                >
                  <MessageCircle size={18} />
                  <span>
                    {isSubmitting
                      ? isEnglish ? "Processing..." : "Hazırlanıyor..."
                      : isEnglish ? "Reserve via WhatsApp →" : "WhatsApp ile Hemen Ayırt →"}
                  </span>
                </button>

                <p className={styles.microNotice}>
                  <ShieldCheck size={13} style={{ color: "#237829", flex: "none" }} />
                  <span>
                    {isEnglish
                      ? "Free reservation • Instant confirmation on WhatsApp"
                      : "Ücretsiz rezervasyon • Anında WhatsApp teyidi"}
                  </span>
                </p>
              </div>
            </form>
          )}
          </div>
        </section>

      <section className={styles.venueGallerySection} aria-labelledby="venue-heading">
        <div className={styles.galleryHeader}>
          <div>
            <h2 id="venue-heading" className={styles.galleryTitle}>
              {isEnglish ? "Choose your corner" : "Köşenizi seçin"}
            </h2>
            <p className={styles.galleryHint}>
              {isEnglish ? "A table for every pace of Beyoğlu" : "Beyoğlu'nun her ritmine uygun bir masa"}
            </p>
          </div>
          <span className={styles.galleryMeta}>
            {isEnglish ? "Beyoğlu Zambak Street since 1978" : "1978'den günümüze Zambak Sokak"}
          </span>
        </div>

        <div className={styles.photoStrip}>
          {venuePhotos.map((photo) => (
            <figure key={photo.src} className={styles.photoCard}>
              <Image
                src={photo.src}
                alt={isEnglish ? photo.titleEn : photo.title}
                fill
                sizes="(max-width: 580px) 145px, 160px"
                className={styles.photoImg}
              />
              <div className={styles.photoOverlay}>
                <span className={styles.photoBadge}>
                  {isEnglish ? photo.badgeEn : photo.badge}
                </span>
                <h3 className={styles.photoTitle}>
                  {isEnglish ? photo.titleEn : photo.title}
                </h3>
              </div>
            </figure>
          ))}
        </div>
      </section>

      <div className={styles.quickInfoBar}>
        <a
          href={telUrl}
          className={styles.infoPill}
          onClick={() => trackEvent("contact_click", { contact_method: "phone", surface: "reservation_page" })}
        >
          <Phone size={13} />
          <span>{displayPhone}</span>
        </a>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.infoPill}
          onClick={() => trackEvent("contact_click", { contact_method: "directions", surface: "reservation_page" })}
        >
          <MapPin size={13} />
          <span>{displayAddress}</span>
        </a>
        <div className={styles.infoPill} aria-label={isEnglish ? "Opening hours" : "Çalışma saatleri"}>
          <Clock size={13} />
          <span>{openingHours.short}</span>
        </div>
      </div>

      <section className={styles.bookingGuide} aria-labelledby="booking-guide-heading">
        <div className={styles.guideIntro}>
          <h2 id="booking-guide-heading" className={styles.guideTitle}>
            {isEnglish ? "Plan your visit" : "Ziyaretinizi planlayın"}
          </h2>
          <p className={styles.guideLead}>
            {isEnglish
              ? "Tarihi Van Kahvaltı Evi is on Zambak Street in Beyoğlu, within walking distance of Taksim Square and İstiklal Avenue. Breakfast and Kafka Cafe tables are available every day."
              : "Tarihi Van Kahvaltı Evi, Beyoğlu Zambak Sokak'ta; Taksim Meydanı ve İstiklal Caddesi'ne yürüme mesafesindedir. Van kahvaltısı ve Kafka Cafe için haftanın her günü masa talebi oluşturabilirsiniz."}
          </p>
        </div>

        <dl className={styles.visitFacts}>
          <div>
            <dt>{isEnglish ? "Confirmation" : "Teyit"}</dt>
            <dd>{isEnglish ? "Usually within 5–10 minutes on WhatsApp" : "Genellikle 5–10 dakika içinde WhatsApp'tan"}</dd>
          </div>
          <div>
            <dt>{isEnglish ? "Hours" : "Saatler"}</dt>
            <dd>{isEnglish ? "Every day, 07:00–22:00" : openingHours.short}</dd>
          </div>
          <div>
            <dt>{isEnglish ? "Address" : "Adres"}</dt>
            <dd>{displayAddress}</dd>
          </div>
        </dl>

        <div className={styles.guideLinks}>
          <a href={isEnglish ? "/en/menu" : "/menu"}>{isEnglish ? "See the live menu and prices" : "Güncel menü ve fiyatları görün"}</a>
          <a href="/konum">{isEnglish ? "Open directions and transport details" : "Yol tarifi ve ulaşım bilgilerini açın"}</a>
        </div>

        <div className={styles.reservationFaq} aria-labelledby="reservation-faq-heading">
          <h2 id="reservation-faq-heading" className={styles.faqTitle}>
            {isEnglish ? "Reservation questions" : "Rezervasyon hakkında sık sorulanlar"}
          </h2>
          {(isEnglish ? englishReservationFaqItems : reservationFaqItems).map((item) => (
            <details key={item.question} className={styles.faqItem}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
