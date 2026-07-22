"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  Coffee,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Minus,
  PhoneCall,
  Plus,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { displayPhone, phoneE164 } from "../seo";
import type { SiteLocale } from "../home-localization";
import styles from "./reservation.module.css";

interface ReservationExperienceProps {
  locale?: SiteLocale;
}

function getTodayString(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatDateDisplay(dateStr: string, locale: SiteLocale) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return d.toLocaleDateString(locale === "en" ? "en-US" : "tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ReservationExperience({ locale = "tr" }: ReservationExperienceProps) {
  const isEnglish = locale === "en";
  const searchParams = useSearchParams();

  const itemParam = searchParams.get("item") || "";
  const typeParam = searchParams.get("type") || "";

  const [date, setDate] = useState(() => getTodayString(0));
  const [minDate] = useState(() => getTodayString(0));
  const [time, setTime] = useState("10:00");
  const [guests, setGuests] = useState(2);
  const [service, setService] = useState<"breakfast" | "cafe">(() => {
    if (typeParam.toLocaleLowerCase().includes("cafe") || typeParam.toLocaleLowerCase().includes("kahve")) {
      return "cafe";
    }
    return "breakfast";
  });
  const [seating, setSeating] = useState<"balcony" | "hall" | "terrace" | "any">("any");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState(() => {
    if (itemParam) {
      return isEnglish ? `Selected dish: ${itemParam}` : `Seçilen lezzet: ${itemParam}`;
    }
    return "";
  });

  const todayStr = useMemo(() => getTodayString(0), []);
  const tomorrowStr = useMemo(() => getTodayString(1), []);
  const weekendStr = useMemo(() => {
    const d = new Date();
    const day = d.getDay(); // 0 is Sun, 6 is Sat
    const diff = day === 6 ? 0 : day === 0 ? 6 : 6 - day;
    return getTodayString(diff);
  }, []);

  const timeSlots = useMemo(
    () => ({
      morning: ["08:00", "08:30", "09:00", "09:30"],
      rush: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"],
      afternoon: ["13:00", "13:30", "14:00", "15:00", "16:00", "17:00"],
    }),
    [],
  );

  const seatingLabels = useMemo(
    () => ({
      any: isEnglish ? "First available table" : "Hızlı Oturum (İlk Boş Masa)",
      balcony: isEnglish ? "Balcony & Street Side" : "Ön Balkon & Zambak Sokak",
      hall: isEnglish ? "Historic Rum Building Hall" : "Tarihi Rum Salonu (İç Mekan)",
      terrace: isEnglish ? "Terrace & Garden" : "Teras & Bahçe Alanı",
    }),
    [isEnglish],
  );

  const handleSubmitWhatsApp = (event: React.FormEvent) => {
    event.preventDefault();

    const dateFormatted = formatDateDisplay(date, locale);
    const serviceName = service === "cafe" ? "Kafka Cafe & Kahve" : isEnglish ? "Van Breakfast" : "Serpme Van Kahvaltısı";
    const seatingName = seatingLabels[seating];

    const message = isEnglish
      ? `Hello Tarihi Van Kahvaltı Evi, I would like to make a table reservation:

👤 Name: ${name.trim() || "Guest"}
👥 Party Size: ${guests} guests
📅 Date: ${dateFormatted}
⏰ Time: ${time}
🍳 Choice: ${serviceName}
🪑 Seating Preference: ${seatingName}
📞 Phone: ${phone.trim() || "Via WhatsApp"}
📝 Special Request / Note: ${note.trim() || "None"}

Could you please confirm table availability? Thank you!`
      : `Merhaba Tarihi Van Kahvaltı Evi, masa rezervasyonu talebimdir:

👤 İsim Soyisim: ${name.trim() || "Misafir"}
👥 Kişi Sayısı: ${guests} Kişi
📅 Tarih: ${dateFormatted}
⏰ Saat: ${time}
🍳 Tercih: ${serviceName}
🪑 Masa / Alan Tercihi: ${seatingName}
📞 Telefon: ${phone.trim() || "WhatsApp İletişim"}
📝 Özel Not / İstek: ${note.trim() || "Yok"}

Masanızı onaylayabilir misiniz? Teşekkürler.`;

    const waUrl = `https://wa.me/${phoneE164.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              <span>{isEnglish ? "Est. 1978 · Taksim Beyoğlu" : "1978'den Beri · Beyoğlu'nda Masanız Hazır"}</span>
            </div>
            <h1 className={styles.heroTitle}>
              {isEnglish ? (
                <>
                  Reserve Your <span className={styles.titleHighlight}>Van Breakfast</span> Table
                </>
              ) : (
                <>
                  Van Sofrasına <span className={styles.titleHighlight}>Masa Rezervasyonu</span>
                </>
              )}
            </h1>
            <p className={styles.heroSubtitle}>
              {isEnglish
                ? "Select your preferred date, time and party size. Confirm your reservation instantly with our restaurant team."
                : "Ağır ağır kurulan Van kahvaltı masasında yerinizi hızlıca ayırın. Talebinizi WhatsApp ile iletin, ekibimiz anında onaylasın."}
            </p>

            <div className={styles.highlights}>
              <div className={styles.highlightChip}>
                <div className={styles.chipIcon}>
                  <Sparkles size={18} />
                </div>
                <span>{isEnglish ? "Instant WhatsApp Confirmation" : "⚡ Anında WhatsApp Onayı"}</span>
              </div>
              <div className={styles.highlightChip}>
                <div className={styles.chipIcon}>
                  <UtensilsCrossed size={18} />
                </div>
                <span>{isEnglish ? "Daily Fresh Pişi & Cheeses" : "🍳 Günlük Sıcak Pişi & Otlu Peynir"}</span>
              </div>
              <div className={styles.highlightChip}>
                <div className={styles.chipIcon}>
                  <MapPin size={18} />
                </div>
                <span>{isEnglish ? "2 Mins Walk from Taksim Sq." : "📍 Taksim İstiklal'e 2 Dk Yürüme"}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <form onSubmit={handleSubmitWhatsApp} className={styles.mainGrid}>
          {/* Main Form Fields */}
          <div className={styles.formSection}>
            {/* Step 1: Service & Party Size */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardStepNumber}>1</span>
                <div>
                  <h2>{isEnglish ? "Service & Party Size" : "Kahvaltı Tercihi & Kişi Sayısı"}</h2>
                  <p>{isEnglish ? "Choose table style and number of guests" : "Kahvaltı türünü ve katılacak kişi sayısını belirleyin"}</p>
                </div>
              </div>

              <div className={styles.serviceGrid}>
                <button
                  type="button"
                  className={`${styles.serviceOption} ${service === "breakfast" ? styles.serviceOptionActive : ""}`}
                  onClick={() => setService("breakfast")}
                >
                  <span className={styles.serviceBadge}>
                    <UtensilsCrossed size={14} />
                    {isEnglish ? "Full Spread" : "İmza Sofra"}
                  </span>
                  <h3>{isEnglish ? "Serpme Van Breakfast" : "Serpme Van Kahvaltısı"}</h3>
                  <p>{isEnglish ? "Shared table with regional cheeses, hot eggs in copper pans, kavut & murtuğa" : "Otlu peynir, sıcak sahanlar, murtuğa, kavut ve sınırsız taze demli çay"}</p>
                </button>

                <button
                  type="button"
                  className={`${styles.serviceOption} ${service === "cafe" ? styles.serviceOptionActive : ""}`}
                  onClick={() => setService("cafe")}
                >
                  <span className={styles.serviceBadge}>
                    <Coffee size={14} />
                    {isEnglish ? "Kafka Cafe" : "Kahve & Molalar"}
                  </span>
                  <h3>{isEnglish ? "Kafka Cafe & Drinks" : "Kafka Cafe & Atıştırmalık"}</h3>
                  <p>{isEnglish ? "Speciality coffees, sweet pişi, tea and lighter afternoon visits" : "Türk kahvesi, filtre kahve, tatlılar ve hafif sohbet molaları"}</p>
                </button>
              </div>

              <div className={styles.guestsRow}>
                <div className={styles.guestsLabel}>
                  <strong>{isEnglish ? "Number of Guests" : "Kişi Sayısı"}</strong>
                  <span>{isEnglish ? "Choose between 1 and 30 guests" : "1–30 kişi arasında seçim yapın"}</span>
                </div>

                <div className={styles.counterControl}>
                  <button
                    type="button"
                    className={styles.counterBtn}
                    disabled={guests <= 1}
                    onClick={() => setGuests((g) => g - 1)}
                    aria-label={isEnglish ? "Decrease guest count" : "Kişi sayısını azalt"}
                  >
                    <Minus size={16} />
                  </button>
                  <div className={styles.counterValue}>
                    {guests} <span>{isEnglish ? "guests" : "kişi"}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.counterBtn}
                    disabled={guests >= 30}
                    onClick={() => setGuests((g) => g + 1)}
                    aria-label={isEnglish ? "Increase guest count" : "Kişi sayısını artır"}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className={styles.guestPresets}>
                  {[2, 4, 6, 8, 12].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`${styles.presetBtn} ${guests === num ? styles.presetBtnActive : ""}`}
                      onClick={() => setGuests(num)}
                    >
                      {num} {isEnglish ? "Guests" : "Kişi"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Date & Time */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardStepNumber}>2</span>
                <div>
                  <h2>{isEnglish ? "Date & Time" : "Tarih ve Saat Seçimi"}</h2>
                  <p>{isEnglish ? "Select when you would like your table prepared" : "Masanızın ne zaman hazırlanmasını istersiniz?"}</p>
                </div>
              </div>

              <div className={styles.dateShortcuts}>
                <button
                  type="button"
                  className={`${styles.dateShortcutBtn} ${date === todayStr ? styles.dateShortcutActive : ""}`}
                  onClick={() => setDate(todayStr)}
                >
                  {isEnglish ? "Today" : "Bugün"}
                </button>
                <button
                  type="button"
                  className={`${styles.dateShortcutBtn} ${date === tomorrowStr ? styles.dateShortcutActive : ""}`}
                  onClick={() => setDate(tomorrowStr)}
                >
                  {isEnglish ? "Tomorrow" : "Yarın"}
                </button>
                <button
                  type="button"
                  className={`${styles.dateShortcutBtn} ${date === weekendStr ? styles.dateShortcutActive : ""}`}
                  onClick={() => setDate(weekendStr)}
                >
                  {isEnglish ? "Weekend" : "Hafta Sonu"}
                </button>
              </div>

              <div className={styles.dateInputWrap}>
                <label htmlFor="res-date">{isEnglish ? "Select Specific Date" : "Takvimden Tarih Seçin"}</label>
                <input
                  type="date"
                  id="res-date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={styles.dateInput}
                  required
                />
              </div>

              <div>
                <div className={styles.timeSectionTitle}>
                  🌅 {isEnglish ? "Early Morning (08:00 – 09:30)" : "Erken Sabah (08:00 – 09:30)"}
                </div>
                <div className={styles.timeGrid}>
                  {timeSlots.morning.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`${styles.timeBtn} ${time === t ? styles.timeBtnActive : ""}`}
                      onClick={() => setTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className={styles.timeSectionTitle}>
                  ☀️ {isEnglish ? "Peak Breakfast Hours (10:00 – 12:30)" : "En Çok Tercih Edilen Saatler (10:00 – 12:30)"}
                </div>
                <div className={styles.timeGrid}>
                  {timeSlots.rush.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`${styles.timeBtn} ${time === t ? styles.timeBtnActive : ""}`}
                      onClick={() => setTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className={styles.timeSectionTitle}>
                  ☕ {isEnglish ? "Afternoon & Tea (13:00 – 17:00)" : "Öğleden Sonra & Çay Saati (13:00 – 17:00)"}
                </div>
                <div className={styles.timeGrid}>
                  {timeSlots.afternoon.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`${styles.timeBtn} ${time === t ? styles.timeBtnActive : ""}`}
                      onClick={() => setTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Seating Preference */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardStepNumber}>3</span>
                <div>
                  <h2>{isEnglish ? "Seating & Atmosphere" : "Masa / Oturma Alanı Tercihi"}</h2>
                  <p>{isEnglish ? "Choose your preferred seating area in our historic building" : "Tarihi Rum binasında oturmak istediğiniz alanı belirleyin"}</p>
                </div>
              </div>

              <div className={styles.seatingGrid}>
                <button
                  type="button"
                  className={`${styles.seatingBtn} ${seating === "any" ? styles.seatingBtnActive : ""}`}
                  onClick={() => setSeating("any")}
                >
                  <div className={styles.seatingIcon}>
                    <Sparkles size={16} />
                  </div>
                  <div className={styles.seatingInfo}>
                    <strong>{isEnglish ? "First Available Table" : "İlk Boş Masa (En Hızlı)"}</strong>
                    <span>{isEnglish ? "Fastest confirmation for busy hours" : "Yoğun saatlerde masanızı en hızlı netleştiren tercih"}</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`${styles.seatingBtn} ${seating === "balcony" ? styles.seatingBtnActive : ""}`}
                  onClick={() => setSeating("balcony")}
                >
                  <div className={styles.seatingIcon}>
                    <Sun size={16} />
                  </div>
                  <div className={styles.seatingInfo}>
                    <strong>{isEnglish ? "Balcony & Street Side" : "Ön Balkon & Zambak Sokak"}</strong>
                    <span>{isEnglish ? "Nostalgic Beyoğlu street view" : "Zambak Sokak dokusuyla iç içe kahvaltı keyfi"}</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`${styles.seatingBtn} ${seating === "hall" ? styles.seatingBtnActive : ""}`}
                  onClick={() => setSeating("hall")}
                >
                  <div className={styles.seatingIcon}>
                    <HeartHandshake size={16} />
                  </div>
                  <div className={styles.seatingInfo}>
                    <strong>{isEnglish ? "Historic Interior Hall" : "Tarihi Rum Salonu (İç Mekan)"}</strong>
                    <span>{isEnglish ? "Authentic brick walls & wood details" : "Nostaljik ayna, taş ve ahşap mimari doku"}</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`${styles.seatingBtn} ${seating === "terrace" ? styles.seatingBtnActive : ""}`}
                  onClick={() => setSeating("terrace")}
                >
                  <div className={styles.seatingIcon}>
                    <UtensilsCrossed size={16} />
                  </div>
                  <div className={styles.seatingInfo}>
                    <strong>{isEnglish ? "Terrace & Garden" : "Teras & Bahçe"}</strong>
                    <span>{isEnglish ? "Open-air atmosphere for groups" : "Ferah ve açık hava kahvaltı masası"}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 4: Contact & Notes */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardStepNumber}>4</span>
                <div>
                  <h2>{isEnglish ? "Guest Details & Notes" : "Misafir Bilgileri & Özel İstek"}</h2>
                  <p>{isEnglish ? "Provide contact details for reservation confirmation" : "Rezervasyonu adına tanımlayacağımız misafir bilgisi"}</p>
                </div>
              </div>

              <div className={styles.contactGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="res-name">{isEnglish ? "Full Name *" : "Adınız Soyadınız *"}</label>
                  <input
                    type="text"
                    id="res-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isEnglish ? "e.g. Ahmet Yılmaz" : "Örn: Ahmet Yılmaz"}
                    className={styles.textInput}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="res-phone">{isEnglish ? "Phone Number (WhatsApp) *" : "Telefon Numarası (WhatsApp) *"}</label>
                  <input
                    type="tel"
                    id="res-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className={styles.textInput}
                    required
                  />
                </div>
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`} style={{ marginTop: "1rem" }}>
                <label htmlFor="res-note">{isEnglish ? "Special Notes or Preferences (Optional)" : "Özel Not veya İstek (İsteğe bağlı)"}</label>
                <textarea
                  id="res-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={
                    isEnglish
                      ? "High chair, birthday celebration, specific dish or seating preference..."
                      : "Çocuk sandalyesi, doğum günü kutlaması, özel lezzet tercihi veya paylaşmak istediğiniz bir detay..."
                  }
                  className={styles.textareaInput}
                />
              </div>
            </div>
          </div>

          {/* Sidebar Summary Card */}
          <aside className={styles.sidebar}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <h3>{isEnglish ? "Reservation Summary" : "Masa Özeti"}</h3>
                <span className={styles.summaryBadge}>{isEnglish ? "Live Request" : "Canlı Talep"}</span>
              </div>

              <div className={styles.summaryList}>
                <div className={styles.summaryItem}>
                  <UtensilsCrossed size={18} />
                  <span>
                    {isEnglish ? "Service:" : "Tercih:"}{" "}
                    <strong>{service === "cafe" ? "Kafka Cafe & Kahve" : isEnglish ? "Van Breakfast" : "Serpme Van Kahvaltısı"}</strong>
                  </span>
                </div>

                <div className={styles.summaryItem}>
                  <Users size={18} />
                  <span>
                    {isEnglish ? "Guests:" : "Kişi Sayısı:"}{" "}
                    <strong>
                      {guests} {isEnglish ? "guests" : "Kişi"}
                    </strong>
                  </span>
                </div>

                <div className={styles.summaryItem}>
                  <CalendarDays size={18} />
                  <span>
                    {isEnglish ? "Date:" : "Tarih:"} <strong>{formatDateDisplay(date, locale)}</strong>
                  </span>
                </div>

                <div className={styles.summaryItem}>
                  <Clock3 size={18} />
                  <span>
                    {isEnglish ? "Time:" : "Saat:"} <strong>{time}</strong>
                  </span>
                </div>

                <div className={styles.summaryItem}>
                  <MapPin size={18} />
                  <span>
                    {isEnglish ? "Seating:" : "Masa:"} <strong>{seatingLabels[seating]}</strong>
                  </span>
                </div>
              </div>

              <div className={styles.summaryNotice}>
                <ShieldCheck size={18} />
                <span>
                  {isEnglish
                    ? "Your table request will be sent to our WhatsApp line for instant confirmation. No upfront payment required."
                    : "Masa talebiniz işletmemizin WhatsApp hattına iletilir. Ön ödeme gerekmez, anında teyit edilir."}
                </span>
              </div>

              <button type="submit" className={styles.submitWhatsAppBtn}>
                <MessageCircle size={20} />
                <span>{isEnglish ? "Send Request on WhatsApp" : "Talebi WhatsApp ile İlet"}</span>
              </button>

              <a href={`tel:${phoneE164}`} className={styles.callAlternativeBtn}>
                <PhoneCall size={16} />
                <span>{isEnglish ? `Or Call: ${displayPhone}` : `Veya Hemen Ara: ${displayPhone}`}</span>
              </a>
            </div>
          </aside>

          {/* Mobile Fixed Sticky Footer */}
          <div className={styles.mobileStickyBar}>
            <div className={styles.mobileStickyMeta}>
              <strong>
                {guests} {isEnglish ? "Guests" : "Kişi"} · {time}
              </strong>
              <span>{formatDateDisplay(date, locale).split(",")[0]}</span>
            </div>
            <button type="submit" className={styles.mobileStickyBtn}>
              <MessageCircle size={18} />
              <span>{isEnglish ? "Request Table" : "Masayı İlet"}</span>
            </button>
          </div>
        </form>

        {/* Agency FAQ Section */}
        <section className={styles.faqContainer}>
          <div className={styles.faqHeader}>
            <span className={styles.eyebrow}>{isEnglish ? "Reservation Details" : "Merak Edilenler"}</span>
            <h2>{isEnglish ? "Frequently Asked Questions" : "Rezervasyon Hakkında Sıkça Sorulanlar"}</h2>
            <p>{isEnglish ? "Clear guidelines for group bookings, peak hours and visit planning." : "Hızlı ve konforlu bir kahvaltı ziyareti için pratik bilgiler."}</p>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqCard}>
              <h3>{isEnglish ? "Do I need a reservation in advance?" : "Rezervasyon yaptırmak zorunlu mu?"}</h3>
              <p>
                {isEnglish
                  ? "Reservations are highly recommended on weekends and during peak morning hours (10:00 - 13:00) to ensure immediate seating."
                  : "Hafta sonları ve sabah yoğun saatlerde (10:00 – 13:00 arası) beklemeden masaya geçebilmeniz için rezervasyon yaptırmanızı öneririz."}
              </p>
            </div>

            <div className={styles.faqCard}>
              <h3>{isEnglish ? "Is there any deposit or reservation fee?" : "Rezervasyon için herhangi bir ücret alınıyor mu?"}</h3>
              <p>
                {isEnglish
                  ? "No, table reservations are completely free. You only pay for what you order from the menu at the end of your meal."
                  : "Hayır, rezervasyonlarımız tamamen ücretsizdir. Sipariş ettiğiniz ürünlerin ödemesini kahvaltı sonunda masanızda yaparsınız."}
              </p>
            </div>

            <div className={styles.faqCard}>
              <h3>{isEnglish ? "How are large group bookings handled?" : "Kalabalık grup rezervasyonlarında ne yapılır?"}</h3>
              <p>
                {isEnglish
                  ? "For groups of 8 or more, we arrange adjacent long tables in our historic hall or terrace. Please specify group details in your request."
                  : "8 kişi ve üzeri kalabalık aile ve arkadaş grupları için uzun masalarımız özel olarak birleştirilip hazırlanmaktadır."}
              </p>
            </div>

            <div className={styles.faqCard}>
              <h3>{isEnglish ? "What happens if I am running late?" : "Gecikme durumunda ne yapmalıyım?"}</h3>
              <p>
                {isEnglish
                  ? "We hold reserved tables for 15 minutes past the selected time. If you are delayed, simply drop us a quick WhatsApp message."
                  : "Rezervasyonu yapılan masalar opsiyonel olarak 15 dakika saklanır. Gecikme durumunda WhatsApp hattımızdan bilgi vermeniz yeterlidir."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
