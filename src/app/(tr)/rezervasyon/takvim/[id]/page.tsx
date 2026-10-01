import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getReservationById } from "@/app/reservations/reservation-storage";
import { displayAddress, displayPhone, mapsUrl, siteName, siteUrl } from "@/app/seo";
import { CalendarActions } from "../../../../rezervasyon/takvim/[id]/calendar-actions";
import styles from "../../../../rezervasyon/takvim/[id]/calendar-page.module.css";

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
  const reservation = await getReservationById(id);
  if (!reservation) notFound();

  const isEnglish = sp?.lang === "en" || sp?.locale === "en";
  const serviceLabel = reservation.serviceType === "cafe"
    ? "Kafka Cafe"
    : isEnglish
    ? "Van Traditional Breakfast"
    : "Van Kahvaltısı";
  const formattedDate = reservation.date ? reservation.date.split("-").reverse().join(".") : "";
  const icsDownloadUrl = `/api/reservations/${reservation.id}/ics${isEnglish ? "?locale=en" : ""}`;

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
    isEnglish ? "Tarihi Van Breakfast House - table request" : "Tarihi Van Kahvaltı Evi - masa talebi"
  );
  const gCalDetails = encodeURIComponent(
    isEnglish
      ? `Table request for ${reservation.guests} guests. Service: ${serviceLabel}. Await restaurant confirmation.\n${displayAddress}\n${displayPhone}`
      : `${reservation.guests} kişilik masa talebi. Hizmet: ${serviceLabel}. İşletme teyidini bekleyin.\n${displayAddress}\n${displayPhone}`
  );
  const gCalLocation = encodeURIComponent(`Tarihi Van Kahvaltı Evi, ${displayAddress}`);
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=${startStr}/${endStr}&details=${gCalDetails}&location=${gCalLocation}&ctz=Europe/Istanbul`;

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.badgeSuccess}>
          <CheckCircle2 size={16} />
          {reservation.status === "confirmed"
            ? isEnglish ? "Reservation Confirmed" : "Rezervasyon Onaylandı"
            : reservation.status === "cancelled"
              ? isEnglish ? "Request Cancelled" : "Talep İptal Edildi"
              : isEnglish ? "Request Saved" : "Talep Kaydedildi"}
        </span>
        <p className={styles.brandName}>{isEnglish ? "Tarihi Van Breakfast House" : siteName}</p>
        <h1 className={styles.title}>
          {isEnglish ? "Add to Your Calendar" : "Randevuyu Takvime Ekle"}
        </h1>
        <p className={styles.subtitle}>
          {reservation.status === "confirmed"
            ? isEnglish
              ? "Save your confirmed table booking to your calendar."
              : "Onaylanan rezervasyonunuzu takviminize ekleyebilirsiniz."
            : reservation.status === "cancelled"
              ? isEnglish
                ? "This request was cancelled. Contact the restaurant to make a new booking."
                : "Bu talep iptal edildi. Yeni rezervasyon için işletmeyle iletişime geçin."
            : isEnglish
              ? "Save this request to your calendar and wait for the restaurant's confirmation."
              : "Bu talebi takviminize ekleyebilir, işletmenin teyidini bekleyebilirsiniz."}
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
        {reservation.status !== "cancelled" ? (
          <CalendarActions
            icsUrl={icsDownloadUrl}
            googleCalendarUrl={googleCalendarUrl}
            mapsUrl={mapsUrl}
            isEnglish={isEnglish}
            pageUrl={`${siteUrl}${isEnglish ? "/en" : ""}/rezervasyon/takvim/${reservation.id}`}
          />
        ) : null}

        {/* Smart iOS / Safari Guidance */}
        {reservation.status !== "cancelled" ? <div className={styles.tipBox} role="note">
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
        </div> : null}
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
