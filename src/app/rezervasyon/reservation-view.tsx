"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock3,
  Coffee,
  HeartHandshake,
  Info,
  MapPin,
  MessageCircle,
  Minus,
  Navigation,
  Phone,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { displayAddress, displayPhone, mapsUrl, phoneE164, telUrl } from "../seo";
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

function getOffsetDateString(daysOffset: number) {
  const target = new Date();
  target.setDate(target.getDate() + daysOffset);
  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, "0");
  const dd = String(target.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getNextWeekendDay(targetDay: 6 | 0) {
  // 6: Saturday, 0: Sunday
  const today = new Date();
  const currentDay = today.getDay();
  let diff = (targetDay - currentDay + 7) % 7;
  if (diff === 0) diff = 7; // next week if today is that day
  return getOffsetDateString(diff);
}

function formatTurkishDate(dateStr: string, isEnglish: boolean) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts.map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString(isEnglish ? "en-US" : "tr-TR", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

export function ReservationView({
  locale = "tr",
  initialService,
  initialItem,
}: ReservationViewProps) {
  const isEnglish = locale === "en";

  const [serviceType, setServiceType] = useState<"breakfast" | "cafe">(() => {
    if (initialService) return initialService;
    return "breakfast";
  });

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
  const [datePresets, setDatePresets] = useState<{
    today: string;
    tomorrow: string;
    saturday: string;
    sunday: string;
  }>({
    today: "",
    tomorrow: "",
    saturday: "",
    sunday: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const today = getTodayString();
      const tomorrow = getOffsetDateString(1);
      const saturday = getNextWeekendDay(6);
      const sunday = getNextWeekendDay(0);

      setDate(today);
      setMinDate(today);
      setDatePresets({
        today,
        tomorrow,
        saturday,
        sunday,
      });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const seatingLabels: Record<"indoor" | "street" | "balcony", { tr: string; en: string }> = {
    indoor: {
      tr: "Tarihi Salon (İç Mekân)",
      en: "Historic Dining Room (Indoor)",
    },
    street: {
      tr: "Zambak Sokak (Dış Masalar)",
      en: "Zambak Street (Outdoor Tables)",
    },
    balcony: {
      tr: "Teras / Cam Kenarı (Müsaitse)",
      en: "Terrace / Window Side (If Available)",
    },
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (honeypot) {
      // Spam honeypot triggered
      return;
    }

    setIsSubmitting(true);

    const formattedDateTr = date ? date.split("-").reverse().join(".") : "";
    const displayDate = formatTurkishDate(date, isEnglish);
    const serviceLabel =
      serviceType === "cafe"
        ? "Kafka Cafe (Kahve & Mola)"
        : isEnglish
        ? "Van Breakfast"
        : "Van Kahvaltısı";

    const seatingLabel = seatingLabels[seatingArea][isEnglish ? "en" : "tr"];

    let createdId = "";
    let icsDownloadUrl = "";
    let gCalUrl = "";

    try {
      // 1. Save to backend database
      const fullNote = note
        ? `${seatingLabel} | ${note}`
        : `${seatingLabel}`;

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
      console.error("Reservation API call error:", err);
    }

    // 2. Format WhatsApp Message
    const calendarLine = icsDownloadUrl
      ? isEnglish
        ? `\n📅 Add to iPhone / Google Calendar (1-Click):\n${icsDownloadUrl}`
        : `\n📅 iPhone / Google Takvime Ekle (Tek Tık):\n${icsDownloadUrl}`
      : "";

    const message = isEnglish
      ? `Hello, I would like to request a table reservation at Tarihi Van Kahvaltı Evi:

${createdId ? `📋 Reservation ID: #${createdId}\n` : ""}👤 Name: ${customerName}
📞 Phone: ${customerPhone}
📅 Date: ${formattedDateTr} (${displayDate})
⏰ Time: ${time}
👥 Guests: ${guests} Person(s)
🍳 Service: ${serviceLabel}
🪑 Seating: ${seatingLabel}
📝 Special Request: ${note || "None"}${calendarLine}

Could you please confirm table availability? Thank you!`
      : `Merhaba, Tarihi Van Kahvaltı Evi için masa rezervasyonu talebim:

${createdId ? `📋 Rezervasyon No: #${createdId}\n` : ""}👤 Misafir: ${customerName}
📞 Telefon: ${customerPhone}
📅 Tarih: ${formattedDateTr} (${displayDate})
⏰ Saat: ${time}
👥 Kişi Sayısı: ${guests} Kişi
🍳 Tercih: ${serviceLabel}
🪑 Alan: ${seatingLabel}
📝 Özel Not: ${note || "Yok"}${calendarLine}

Rezervasyonumuzu teyit edebilir misiniz? Teşekkürler, iyi çalışmalar.`;

    const cleanPhone = phoneE164.replace("+", "");
    const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
    trackEvent("booking_whatsapp_handoff", {
      locale,
      service_type: serviceType,
      reservation_saved: Boolean(createdId),
    });

    // 3. Set submitted state to show celebratory confirmation card
    setSubmittedData({
      id: createdId || `VAN-${date.replace(/-/g, "")}`,
      customerName,
      customerPhone,
      date: `${formattedDateTr} (${displayDate})`,
      time,
      guests,
      serviceType: serviceLabel,
      seatingArea: seatingLabel,
      icsUrl: icsDownloadUrl || `/api/reservations/${createdId}/ics`,
      googleCalendarUrl: gCalUrl,
    });

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setSubmittedData(null);
    setNote("");
  };

  return (
    <div className={styles.mainGrid}>
      {/* ------------------------------------------------------------------ */}
      {/* Left Column: Visual Story, Ambiance & Hospitality Highlights       */}
      {/* ------------------------------------------------------------------ */}
      <aside className={styles.ambianceColumn} aria-label={isEnglish ? "Venue Information" : "Mekân Bilgileri"}>
        <div className={styles.ambianceCard}>
          <div className={styles.ambianceImageWrap}>
            <Image
              src="/images/breakfast-spread.webp"
              alt={isEnglish ? "Tarihi Van Breakfast Table" : "Tarihi Van Kahvaltısı Serpme Masa"}
              fill
              sizes="(max-width: 992px) 100vw, 40vw"
              priority
              quality={82}
            />
            <span className={styles.ambianceImageTag}>
              <Sparkles size={14} /> {isEnglish ? "Authentic Van Heritage" : "1978'den Beri Van Geleneği"}
            </span>
          </div>

          <div className={styles.ambianceContent}>
            <h3 className={styles.ambianceHeading}>
              {isEnglish ? "A Table Waiting for You in Beyoğlu" : "Beyoğlu'nda Sizin İçin Hazır Bir Sofra"}
            </h3>
            <p className={styles.ambianceDescription}>
              {isEnglish
                ? "Experience the warmth of a genuine Van breakfast: authentic Otlu cheese, warm murtuğa, honey with clotted buffalo kaymak, and freshly brewed Turkish tea in our historic 19th-century building on Zambak Street."
                : "Zambak Sokak'ın kendine has dokusunda, 19. yüzyıl tarihi Rum binasında kurulan soframız; hakiki Van otlu peyniri, sıcak murtuğa, bal-kaymak ve demli çayımızla sizleri bekliyor."}
            </p>

            <ul className={styles.perkList}>
              <li className={styles.perkItem}>
                <div className={styles.perkIconWrap}>
                  <UtensilsCrossed size={17} />
                </div>
                <div className={styles.perkText}>
                  <strong>{isEnglish ? "Fresh Regional Delicacies" : "Günlük ve Yöresel Lezzetler"}</strong>
                  <span>{isEnglish ? "Specialities prepared every morning with love." : "Her sabah özenle hazırlanan sıcak pişiler ve taze reçeller."}</span>
                </div>
              </li>
              <li className={styles.perkItem}>
                <div className={styles.perkIconWrap}>
                  <Coffee size={17} />
                </div>
                <div className={styles.perkText}>
                  <strong>{isEnglish ? "Fresh Tea & Kafka Cafe" : "Eksilmeyen Taze Çay & Kafka Cafe"}</strong>
                  <span>{isEnglish ? "Unlimited samovar tea with breakfast; specialty coffee in our cafe corner." : "Kahvaltı boyunca taze çay; kahve tutkunları için Kafka Cafe köşesi."}</span>
                </div>
              </li>
              <li className={styles.perkItem}>
                <div className={styles.perkIconWrap}>
                  <HeartHandshake size={17} />
                </div>
                <div className={styles.perkText}>
                  <strong>{isEnglish ? "Direct WhatsApp Confirmation" : "WhatsApp ile Doğrudan İletişim"}</strong>
                  <span>{isEnglish ? "Fast confirmation directly from the restaurant management." : "Talebiniz işletmeye anında iletilir ve hızlıca teyit edilir."}</span>
                </div>
              </li>
            </ul>

            <div className={styles.contactBox}>
              <a href={telUrl} className={styles.contactRow}>
                <Phone size={16} />
                <span>{displayPhone}</span>
              </a>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.contactRow}>
                <MapPin size={16} />
                <span>{displayAddress}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Secondary Guest Quote Card */}
        <div className={styles.quoteCard}>
          <div className={styles.quoteAvatar}>
            <Image
              src="/images/interior-chair.webp"
              alt="Mekân Detayı"
              fill
              sizes="52px"
              quality={75}
            />
          </div>
          <div className={styles.quoteCopy}>
            <p>
              {isEnglish
                ? "“The best breakfast experience in Istanbul. Generous portions, unmatched hospitality, and historic atmosphere.”"
                : "“İstanbul’da kahvaltı için tek adres. Güler yüzlü hizmet, otlu peynir ve murtuğa harika!”"}
            </p>
            <small>{isEnglish ? "Google Reviews • 4.9 Rating" : "Google Değerlendirmeleri • 4.9 Puan"}</small>
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* Right Column: Interactive Reservation Form & Calendar Workflow    */}
      {/* ------------------------------------------------------------------ */}
      <section className={styles.formCard} aria-labelledby="form-card-title">
        <header className={styles.formHeader}>
          <div className={styles.formHeaderLeft}>
            <div className={styles.formHeaderIcon} aria-hidden="true">
              {submittedData ? <CheckCircle2 size={24} /> : <CalendarDays size={24} />}
            </div>
            <div>
              <h2 id="form-card-title" className={styles.formHeaderTitle}>
                {submittedData
                  ? isEnglish ? "Reservation Request Received!" : "Rezervasyon Talebiniz Alındı!"
                  : isEnglish ? "Table Reservation Request" : "Masa Rezervasyonu Oluştur"}
              </h2>
              <p className={styles.formHeaderSubtitle}>
                {submittedData
                  ? isEnglish
                    ? "Your request was forwarded on WhatsApp and saved to our schedule."
                    : "Talebiniz WhatsApp ile iletildi; unutmamak için takviminize ekleyin."
                  : isEnglish
                    ? "Fill in your details below and confirm via WhatsApp in 1-click."
                    : "Bilgilerinizi seçin, tek tıkla WhatsApp üzerinden yerinizi ayırtın."}
              </p>
            </div>
          </div>
          <span className={styles.formHeaderPill}>
            {submittedData
              ? isEnglish ? "Sent & Saved" : "İletildi & Kaydedildi"
              : isEnglish ? "Instant Teyit" : "Anında Teyit"}
          </span>
        </header>

        {submittedData ? (
          /* -------------------------------------------------------------- */
          /* Confirmation & Success State                                   */
          /* -------------------------------------------------------------- */
          <div className={styles.successContainer}>
            <div className={styles.successIconBadge}>
              <CheckCircle2 size={40} />
            </div>

            <h3 className={styles.successTitle}>
              {isEnglish ? "We Look Forward to Welcoming You!" : "Sizi Ağırlamaktan Mutluluk Duyarız!"}
            </h3>

            <p className={styles.successDesc}>
              {isEnglish
                ? "Your reservation request has been transmitted to our team via WhatsApp. Please save this date to your personal calendar below so you don't miss it:"
                : "Masa talebiniz işletmemize WhatsApp üzerinden iletildi. Randevuyu unutmamak için aşağıdaki butonlarla tek tıkla kendi takviminize ekleyebilirsiniz:"}
            </p>

            <div className={styles.successReceipt}>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>
                  <Info size={15} /> {isEnglish ? "Reservation No" : "Rezervasyon Kodu"}
                </span>
                <span className={styles.receiptValue}>#{submittedData.id}</span>
              </div>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>
                  <User size={15} /> {isEnglish ? "Guest Name" : "Ad Soyad"}
                </span>
                <span className={styles.receiptValue}>{submittedData.customerName}</span>
              </div>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>
                  <CalendarIcon size={15} /> {isEnglish ? "Date & Time" : "Tarih ve Saat"}
                </span>
                <span className={styles.receiptValue}>
                  {submittedData.date} — {submittedData.time}
                </span>
              </div>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>
                  <Users size={15} /> {isEnglish ? "Party Size" : "Kişi Sayısı"}
                </span>
                <span className={styles.receiptValue}>
                  {submittedData.guests} {isEnglish ? "People" : "Kişi"}
                </span>
              </div>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>
                  <UtensilsCrossed size={15} /> {isEnglish ? "Service & Seating" : "Tercih & Alan"}
                </span>
                <span className={styles.receiptValue}>
                  {submittedData.serviceType} • {submittedData.seatingArea}
                </span>
              </div>
            </div>

            <div className={styles.calendarBox}>
              <p className={styles.calendarPrompt}>
                <CalendarDays size={16} /> {isEnglish ? "Add to your personal calendar:" : "Kendi Takviminize Ekleyin:"}
              </p>
              <div className={styles.calendarButtons}>
                <a
                  href={submittedData.icsUrl}
                  download={`tarihi-van-rezervasyon-${submittedData.id}.ics`}
                  className={styles.appleCalBtn}
                >
                  <span>🍎</span>
                  {isEnglish ? "Apple Calendar (.ics)" : "Apple Takvimi (.ics)"}
                </a>

                {submittedData.googleCalendarUrl ? (
                  <a
                    href={submittedData.googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.googleCalBtn}
                  >
                    <span>📅</span>
                    Google Calendar
                  </a>
                ) : (
                  <a
                    href={submittedData.icsUrl}
                    download={`tarihi-van-rezervasyon-${submittedData.id}.ics`}
                    className={styles.googleCalBtn}
                  >
                    <span>📅</span>
                    {isEnglish ? "Download .ics" : ".ics İndir"}
                  </a>
                )}
              </div>
            </div>

            <div className={styles.successActions}>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directionsBtn}
              >
                <Navigation size={17} />
                {isEnglish ? "Get Directions to Zambak Sk." : "Zambak Sokak Yol Tarifi Al"}
              </a>
              <button
                type="button"
                onClick={resetForm}
                className={styles.resetBtn}
              >
                <RotateCcw size={15} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                {isEnglish ? "Make Another Reservation" : "Yeni Bir Rezervasyon Yap"}
              </button>
            </div>
          </div>
        ) : (
          /* -------------------------------------------------------------- */
          /* Interactive Reservation Form                                   */
          /* -------------------------------------------------------------- */
          <form onSubmit={handleSubmit} className={styles.formBody}>
            {/* Honeypot for Anti-spam */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="website_hp">Bot verification - leave empty</label>
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

            {/* 1. Service Type Selector */}
            <div className={styles.formSection}>
              <div className={styles.sectionLabel}>
                <span className={styles.sectionLabelText}>
                  <UtensilsCrossed size={17} />
                  {isEnglish ? "1. Service Preference" : "1. Rezervasyon Tercihi"}
                </span>
                <span className={styles.sectionHelp}>
                  {isEnglish ? "Select experience" : "Deneyiminizi seçin"}
                </span>
              </div>

              <div className={styles.serviceCards} role="radiogroup" aria-label="Servis Tercihi">
                <button
                  type="button"
                  role="radio"
                  aria-checked={serviceType === "breakfast"}
                  className={`${styles.serviceCard} ${serviceType === "breakfast" ? styles.serviceCardActive : ""}`}
                  onClick={() => setServiceType("breakfast")}
                >
                  <div className={styles.serviceCardHeader}>
                    <div className={styles.serviceIconWrap}>
                      <UtensilsCrossed size={20} />
                    </div>
                    <span className={styles.serviceBadge}>
                      {isEnglish ? "Most Popular" : "En Çok Tercih Edilen"}
                    </span>
                  </div>
                  <strong className={styles.serviceName}>
                    {isEnglish ? "Van Breakfast Feast" : "Van Serpme Kahvaltısı"}
                  </strong>
                  <p className={styles.serviceDesc}>
                    {isEnglish
                      ? "Full table spread with cheeses, warm egg pans, murtuğa, kavut and unlimited fresh tea."
                      : "Otlu peynir, sıcak sahanlar, murtuğa, kavut, sıcacık pişiler ve sınırsız semaver çayı."}
                  </p>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={serviceType === "cafe"}
                  className={`${styles.serviceCard} ${serviceType === "cafe" ? styles.serviceCardActive : ""}`}
                  onClick={() => setServiceType("cafe")}
                >
                  <div className={styles.serviceCardHeader}>
                    <div className={styles.serviceIconWrap}>
                      <Coffee size={20} />
                    </div>
                    <span className={styles.serviceBadge}>
                      {isEnglish ? "Coffee & Relax" : "Kahve & Buluşma"}
                    </span>
                  </div>
                  <strong className={styles.serviceName}>Kafka Cafe</strong>
                  <p className={styles.serviceDesc}>
                    {isEnglish
                      ? "Specialty Turkish coffee, tea, desserts or a lighter café stop in our cozy corner."
                      : "Nitelikli Türk kahvesi, tatlılar veya kısa bir kahve sohbeti molası."}
                  </p>
                </button>
              </div>
            </div>

            {/* 2. Seating Preference */}
            <div className={styles.formSection}>
              <div className={styles.sectionLabel}>
                <span className={styles.sectionLabelText}>
                  <MapPin size={17} />
                  {isEnglish ? "2. Seating Area Preference" : "2. Masa & Alan Tercihi"}
                </span>
                <span className={styles.sectionHelp}>
                  {isEnglish ? "Based on availability" : "Müsaitliğe göre düzenlenir"}
                </span>
              </div>

              <div className={styles.seatingChips}>
                {(["indoor", "street", "balcony"] as const).map((area) => (
                  <button
                    key={area}
                    type="button"
                    className={`${styles.seatingChip} ${seatingArea === area ? styles.seatingChipActive : ""}`}
                    onClick={() => setSeatingArea(area)}
                  >
                    <span>{seatingLabels[area][isEnglish ? "en" : "tr"]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Date Selection: Quick Presets + Date Input */}
            <div className={styles.formSection}>
              <div className={styles.sectionLabel}>
                <span className={styles.sectionLabelText}>
                  <CalendarDays size={17} />
                  {isEnglish ? "3. Date" : "3. Rezervasyon Tarihi"}
                </span>
                <span className={styles.sectionHelp}>
                  {date ? formatTurkishDate(date, isEnglish) : ""}
                </span>
              </div>

              <div className={styles.datePresets}>
                <button
                  type="button"
                  className={`${styles.datePill} ${date && date === datePresets.today ? styles.datePillActive : ""}`}
                  onClick={() => datePresets.today && setDate(datePresets.today)}
                >
                  {isEnglish ? "Today" : "Bugün"}
                </button>
                <button
                  type="button"
                  className={`${styles.datePill} ${date && date === datePresets.tomorrow ? styles.datePillActive : ""}`}
                  onClick={() => datePresets.tomorrow && setDate(datePresets.tomorrow)}
                >
                  {isEnglish ? "Tomorrow" : "Yarın"}
                </button>
                <button
                  type="button"
                  className={`${styles.datePill} ${date && date === datePresets.saturday ? styles.datePillActive : ""}`}
                  onClick={() => datePresets.saturday && setDate(datePresets.saturday)}
                >
                  {isEnglish ? "This Saturday" : "Bu Cumartesi"}
                </button>
                <button
                  type="button"
                  className={`${styles.datePill} ${date && date === datePresets.sunday ? styles.datePillActive : ""}`}
                  onClick={() => datePresets.sunday && setDate(datePresets.sunday)}
                >
                  {isEnglish ? "This Sunday" : "Bu Pazar"}
                </button>
              </div>

              <div className={styles.dateInputWrap}>
                <CalendarDays size={19} className={styles.dateInputIcon} />
                <input
                  type="date"
                  required
                  value={date}
                  min={minDate}
                  onChange={(e) => setDate(e.target.value)}
                  aria-label={isEnglish ? "Select reservation date" : "Rezervasyon tarihi seçin"}
                />
              </div>
            </div>

            {/* 4. Time Selection: Grouped Slot Chips */}
            <div className={styles.formSection}>
              <div className={styles.sectionLabel}>
                <span className={styles.sectionLabelText}>
                  <Clock3 size={17} />
                  {isEnglish ? "4. Arrival Time" : "4. Geliş Saati"}
                </span>
                <span className={styles.sectionHelp}>
                  {isEnglish ? `Selected: ${time}` : `Seçilen saat: ${time}`}
                </span>
              </div>

              <div className={styles.timeGroups}>
                <div className={styles.timeCategory}>
                  <span className={styles.timeCategoryTitle}>
                    {isEnglish ? "☀️ Morning Breakfast (08:00 - 11:30)" : "☀️ Sabah Kahvaltısı (08:00 - 11:30)"}
                  </span>
                  <div className={styles.timeSlots}>
                    {["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`${styles.timeSlot} ${time === t ? styles.timeSlotActive : ""}`}
                        onClick={() => setTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.timeCategory}>
                  <span className={styles.timeCategoryTitle}>
                    {isEnglish ? "🌤️ Afternoon Feast (12:00 - 16:30)" : "🌤️ Öğle & İkindi Sofrası (12:00 - 16:30)"}
                  </span>
                  <div className={styles.timeSlots}>
                    {["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`${styles.timeSlot} ${time === t ? styles.timeSlotActive : ""}`}
                        onClick={() => setTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.timeCategory}>
                  <span className={styles.timeCategoryTitle}>
                    {isEnglish ? "☕ Evening & Kafka Cafe (17:00 - 20:00)" : "☕ Akşamüstü & Kafka Cafe (17:00 - 20:00)"}
                  </span>
                  <div className={styles.timeSlots}>
                    {["17:00", "18:00", "19:00", "20:00"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`${styles.timeSlot} ${time === t ? styles.timeSlotActive : ""}`}
                        onClick={() => setTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Party Size / Guests */}
            <div className={styles.formSection}>
              <div className={styles.sectionLabel}>
                <span className={styles.sectionLabelText}>
                  <Users size={17} />
                  {isEnglish ? "5. Party Size (Guests)" : "5. Kişi Sayısı"}
                </span>
                <span className={styles.sectionHelp}>
                  {isEnglish ? "1 to 50 guests" : "1–50 kişi arası"}
                </span>
              </div>

              <div className={styles.guestRow}>
                <div className={styles.guestPresets}>
                  <button
                    type="button"
                    className={`${styles.guestPreset} ${guests === 2 ? styles.guestPresetActive : ""}`}
                    onClick={() => setGuests(2)}
                  >
                    {isEnglish ? "2 People" : "2 Kişi (Baş Başa)"}
                  </button>
                  <button
                    type="button"
                    className={`${styles.guestPreset} ${guests === 4 ? styles.guestPresetActive : ""}`}
                    onClick={() => setGuests(4)}
                  >
                    {isEnglish ? "4 People" : "4 Kişi (Aile / Dostlar)"}
                  </button>
                  <button
                    type="button"
                    className={`${styles.guestPreset} ${guests === 6 ? styles.guestPresetActive : ""}`}
                    onClick={() => setGuests(6)}
                  >
                    {isEnglish ? "6 People" : "6 Kişi"}
                  </button>
                  <button
                    type="button"
                    className={`${styles.guestPreset} ${guests === 8 ? styles.guestPresetActive : ""}`}
                    onClick={() => setGuests(8)}
                  >
                    {isEnglish ? "8+ Group" : "8 Kişi (Grup)"}
                  </button>
                </div>

                <div className={styles.stepper} role="group" aria-label="Kişi Sayısı Ayarla">
                  <button
                    type="button"
                    disabled={guests <= 1}
                    aria-label={isEnglish ? "Decrease guests" : "Kişi sayısını azalt"}
                    onClick={() => setGuests((c) => Math.max(1, c - 1))}
                  >
                    <Minus size={17} />
                  </button>
                  <div className={styles.stepperValue}>
                    <strong>{guests}</strong>
                    <small>{isEnglish ? "guests" : "kişi"}</small>
                  </div>
                  <button
                    type="button"
                    disabled={guests >= 50}
                    aria-label={isEnglish ? "Increase guests" : "Kişi sayısını artır"}
                    onClick={() => setGuests((c) => Math.min(50, c + 1))}
                  >
                    <Plus size={17} />
                  </button>
                </div>
              </div>
            </div>

            {/* 6. Guest Details */}
            <div className={styles.formSection}>
              <div className={styles.sectionLabel}>
                <span className={styles.sectionLabelText}>
                  <User size={17} />
                  {isEnglish ? "6. Contact Information" : "6. İletişim Bilgileriniz"}
                </span>
                <span className={styles.sectionHelp}>
                  {isEnglish ? "Required for reservation name" : "Masa teyidi için gereklidir"}
                </span>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.inputField}>
                  <label htmlFor="res-name" className={styles.inputLabel}>
                    <User size={15} />
                    <span>{isEnglish ? "Full Name" : "Adınız Soyadınız"}</span>
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    required
                    maxLength={80}
                    placeholder={isEnglish ? "e.g. Ahmet Yılmaz" : "örn. Ahmet Yılmaz"}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={styles.textInput}
                  />
                </div>

                <div className={styles.inputField}>
                  <label htmlFor="res-phone" className={styles.inputLabel}>
                    <Phone size={15} />
                    <span>{isEnglish ? "Phone Number" : "Telefon Numaranız"}</span>
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    required
                    maxLength={30}
                    placeholder={isEnglish ? "+90 5XX XXX XX XX" : "05XX XXX XX XX"}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className={styles.textInput}
                  />
                </div>
              </div>

              <div className={styles.inputField} style={{ marginTop: "0.5rem" }}>
                <label htmlFor="res-note" className={styles.inputLabel}>
                  <Info size={15} />
                  <span>
                    {isEnglish ? "Special Notes (Optional)" : "Özel İstek / Not (İsteğe Bağlı)"}
                  </span>
                </label>
                <div className={styles.textareaWrap}>
                  <textarea
                    id="res-note"
                    rows={3}
                    maxLength={240}
                    placeholder={
                      isEnglish
                        ? "High chair for baby, stroller space, celebration, or dietary preferences..."
                        : "Bebek sandalyesi, bebek arabası için ferah köşe, doğum günü kutlaması vb..."
                    }
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className={styles.textarea}
                  />
                  <span className={styles.charCounter}>{note.length}/240</span>
                </div>
              </div>
            </div>

            {/* 7. Live Summary Recap Card */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <span>{isEnglish ? "Reservation Summary" : "Canlı Rezervasyon Özeti"}</span>
                <span style={{ fontSize: "0.74rem", fontWeight: "normal", color: "#6b5c56" }}>
                  {isEnglish ? "Review before sending" : "Göndermeden önce kontrol edin"}
                </span>
              </div>
              <div className={styles.summaryGrid}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>
                    <UtensilsCrossed size={12} /> {isEnglish ? "Service" : "Tercih"}
                  </span>
                  <span className={styles.summaryValue}>
                    {serviceType === "breakfast" ? (isEnglish ? "Van Breakfast" : "Van Kahvaltısı") : "Kafka Cafe"}
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>
                    <CalendarDays size={12} /> {isEnglish ? "Date" : "Tarih"}
                  </span>
                  <span className={styles.summaryValue}>
                    {date ? formatTurkishDate(date, isEnglish) : "—"}
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>
                    <Clock3 size={12} /> {isEnglish ? "Time" : "Saat"}
                  </span>
                  <span className={styles.summaryValue}>{time}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>
                    <Users size={12} /> {isEnglish ? "Party" : "Kişi"}
                  </span>
                  <span className={styles.summaryValue}>
                    {guests} {isEnglish ? "Guests" : "Kişi"}
                  </span>
                </div>
              </div>
            </div>

            {/* 8. WhatsApp Submit Section */}
            <div className={styles.submitSection}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                <MessageCircle size={22} />
                <span>
                  {isSubmitting
                    ? isEnglish ? "Preparing Request..." : "Talebiniz Hazırlanıyor..."
                    : isEnglish ? "Send Reservation Request on WhatsApp" : "WhatsApp ile Rezervasyon Talebini Gönder"}
                </span>
              </button>

              <p className={styles.trustGuarantee}>
                <ShieldCheck size={16} />
                <span>
                  {isEnglish
                    ? "Your table is confirmed directly by the restaurant team on WhatsApp. Free cancellation at any time."
                    : "Rezervasyonunuz doğrudan yetkiliye iletilir ve WhatsApp üzerinden onaylanır. İptal veya değişiklik ücretsizdir."}
                </span>
              </p>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
