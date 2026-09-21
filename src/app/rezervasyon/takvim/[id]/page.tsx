import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { CheckCircle2 } from "lucide-react";
import { getReservationById } from "@/app/reservations/reservation-storage";
import { displayAddress, displayPhone, mapsUrl, siteName, siteUrl } from "@/app/seo";
import { CalendarActions } from "./calendar-actions";
import styles from "./calendar-page.module.css";

export const metadata: Metadata = {
  title: `Rezervasyon Takvime Ekle | ${siteName}`,
  description: "Tarihi Van Kahvaltı Evi masa rezervasyonunuzu iPhone, Apple Takvim veya Google Takvim'e tek tıkla ekleyin.",
  robots: {
    index: false,
    follow: false,
  },
};

interface CalendarPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function CalendarContent({ params, searchParams }: CalendarPageProps) {
  await connection();
  const { id } = await params;
  const sp = searchParams ? await searchParams : {};
  const reservationFromDb = await getReservationById(id);

  const nameParam = typeof sp?.name === "string" ? sp.name : "";
  const phoneParam = typeof sp?.phone === "string" ? sp.phone : "";
  const dateParam = typeof sp?.date === "string" ? sp.date : "";
  const timeParam = typeof sp?.time === "string" ? sp.time : "";
  const guestsParam = typeof sp?.guests === "string" ? sp.guests : "";
  const serviceParam = typeof sp?.service === "string" ? sp.service : "";
  const noteParam = typeof sp?.note === "string" ? sp.note : "";

  let reservation = reservationFromDb;
  if (!reservation) {
    let fallbackDate = dateParam;
    const idDateMatch = id.match(/van-(\d{4})(\d{2})(\d{2})/);
    if (!fallbackDate && idDateMatch) {
      fallbackDate = `${idDateMatch[1]}-${idDateMatch[2]}-${idDateMatch[3]}`;
    }

    reservation = {
      id,
      customerName: nameParam || "Değerli Misafirimiz",
      customerPhone: phoneParam || "",
      date: fallbackDate || new Date().toISOString().slice(0, 10),
      time: timeParam || "10:00",
      guests: Number(guestsParam) || 2,
      serviceType: serviceParam === "cafe" ? "cafe" : "breakfast",
      note: noteParam || undefined,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const isEnglish = sp?.lang === "en" || sp?.locale === "en";
  const serviceLabel = reservation.serviceType === "cafe"
    ? "Kafka Cafe"
    : isEnglish
    ? "Van Traditional Breakfast"
    : "Van Kahvaltısı";
  const formattedDate = reservation.date ? reservation.date.split("-").reverse().join(".") : "";
  const icsParams = new URLSearchParams({
    name: reservation.customerName,
    phone: reservation.customerPhone || "",
    date: reservation.date,
    time: reservation.time,
    guests: String(reservation.guests),
    service: reservation.serviceType,
    locale: isEnglish ? "en" : "tr",
    ...(reservation.note ? { note: reservation.note } : {}),
  });
  const icsDownloadUrl = `/api/reservations/${reservation.id}/ics?${icsParams.toString()}`;

  // Google Calendar URL
  const [reservationYear, reservationMonth, reservationDay] = reservation.date.split("-");
  const [hour, min] = reservation.time.split(":");
  const startStr = `${reservationYear}${reservationMonth}${reservationDay}T${hour}${min}00`;
  const startDate = new Date(
    Number(reservationYear),
    Number(reservationMonth) - 1,
    Number(reservationDay),
    Number(hour || 10),
    Number(min || 0),
  );
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  const endStr = `${endDate.getFullYear()}${pad(endDate.getMonth() + 1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;

  const gCalTitle = encodeURIComponent(
    isEnglish
      ? `🍳 Tarihi Van Breakfast | ${reservation.customerName} (${reservation.guests} ${reservation.guests > 1 ? "Guests" : "Guest"})`
      : `🍳 Tarihi Van Kahvaltı Evi | ${reservation.customerName} (${reservation.guests} Kişi)`
  );
  const gCalDetails = encodeURIComponent(
    isEnglish
      ? `🍳 Tarihi Van Breakfast House Reservation\n\n👤 Guest: ${reservation.customerName}\n📞 Phone: ${reservation.customerPhone}\n👥 Party Size: ${reservation.guests} Persons\n🍽️ Choice: ${serviceLabel}\n📋 Booking Code: #${reservation.id}\n📝 Note: ${reservation.note || "None"}\n\n📍 Address: ${displayAddress}\n📞 Contact: ${displayPhone}\n🌐 Website: ${siteUrl}/en`
      : `🍳 Tarihi Van Kahvaltı Evi Rezervasyonu\n\n👤 Misafir: ${reservation.customerName}\n📞 Telefon: ${reservation.customerPhone}\n👥 Kişi: ${reservation.guests} Kişi\n🍽️ Seçim: ${serviceLabel}\n📋 Kod: #${reservation.id}\n📝 Not: ${reservation.note || "Yok"}\n\n📍 Adres: ${displayAddress}\n📞 İletişim: ${displayPhone}\n🌐 Web: ${siteUrl}`
  );
  const gCalLocation = encodeURIComponent(`Tarihi Van Kahvaltı Evi, ${displayAddress}`);
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=${startStr}/${endStr}&details=${gCalDetails}&location=${gCalLocation}&ctz=Europe/Istanbul`;

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.badgeSuccess}>
          <CheckCircle2 size={16} />
          {isEnglish ? "Reservation Confirmed" : "Rezervasyon Kaydedildi"}
        </span>
        <p className={styles.brandName}>{isEnglish ? "Tarihi Van Breakfast House" : siteName}</p>
        <h1 className={styles.title}>
          {isEnglish ? "Add to Your Calendar" : "Randevuyu Takvime Ekle"}
        </h1>
        <p className={styles.subtitle}>
          {isEnglish
            ? "Save this table booking directly to your iPhone or Google Calendar so you don't forget."
            : "Unutmamak için rezervasyonunuzu telefon takviminize tek tıkla ekleyebilirsiniz."}
        </p>
      </div>

      <div className={styles.detailsBody}>
        {/* Summary Details */}
        <div className={styles.summaryGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>{isEnglish ? "Guest Name" : "Misafir Adı"}</span>
            <span className={styles.infoValue}>{reservation.customerName}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>{isEnglish ? "Phone Number" : "Telefon Numarası"}</span>
            <span className={styles.infoValue}>{reservation.customerPhone || (isEnglish ? "Not provided" : "Belirtilmedi")}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>{isEnglish ? "Date & Time" : "Tarih & Saat"}</span>
            <span className={styles.infoValue}>{formattedDate} — {reservation.time}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>{isEnglish ? "Party & Service" : "Kişi & Tercih"}</span>
            <span className={styles.infoValue}>
              {reservation.guests} {isEnglish ? (reservation.guests > 1 ? "Guests" : "Guest") : "Kişi"} • {serviceLabel}
            </span>
          </div>

          {reservation.note ? (
            <div className={styles.infoItemFull}>
              <span className={styles.infoLabel}>{isEnglish ? "Special Request / Note" : "Masa Notu / İstek"}</span>
              <span className={styles.infoValue} style={{ fontWeight: 500 }}>{reservation.note}</span>
            </div>
          ) : null}

          <div className={styles.infoItemFull}>
            <span className={styles.infoLabel}>{isEnglish ? "Venue & Address" : "Mekan & Adres"}</span>
            <span className={styles.infoValue} style={{ fontSize: "0.88rem", fontWeight: 600 }}>
              {displayAddress}
            </span>
          </div>
        </div>

        {/* Action Buttons & In-App Browser Guidance */}
        <CalendarActions
          icsUrl={icsDownloadUrl}
          googleCalendarUrl={googleCalendarUrl}
          mapsUrl={mapsUrl}
          isEnglish={isEnglish}
          pageUrl={`${siteUrl}/rezervasyon/takvim/${reservation.id}?${icsParams.toString()}`}
        />

        {/* Smart iOS / Safari Guidance */}
        <div className={styles.tipBox} role="note">
          <span className={styles.tipIcon} aria-hidden="true">💡</span>
          <div>
            {isEnglish ? (
              <>
                <strong>iPhone & Apple Calendar:</strong> Tapping &quot;Add to iPhone / Apple Calendar&quot; opens your iOS Calendar sheet with prefilled details, reminders, and map location. Tap &quot;Add&quot; in the top right of your screen to save it.
              </>
            ) : (
              <>
                <strong>iPhone & Apple Takvim:</strong> &quot;iPhone / Apple Takvimine Ekle&quot; butonuna dokunduğunuzda Takvim uygulamanız açılır; kişi sayısı, ad soyad, telefon ve konum otomatik gelir. Sağ üstteki &quot;Ekle&quot;ye dokunarak kaydedebilirsiniz.
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span>{isEnglish ? "Tarihi Van Breakfast House" : siteName} • {isEnglish ? "Code" : "Kod"}: #{reservation.id}</span>
        <Link href={isEnglish ? "/en" : "/"} className={styles.homeLink}>
          {isEnglish ? "Back to Homepage" : "Ana Sayfaya Dön"}
        </Link>
      </div>
    </div>
  );
}

export default function ReservationCalendarPage(props: CalendarPageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Suspense
          fallback={
            <div className={styles.card} style={{ minHeight: "480px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ color: "var(--res-muted)" }}>Rezervasyon bilgileri yükleniyor...</p>
            </div>
          }
        >
          <CalendarContent params={props.params} searchParams={props.searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
