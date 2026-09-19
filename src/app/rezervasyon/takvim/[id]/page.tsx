import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  Calendar,
  CheckCircle2,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { getReservationById } from "@/app/reservations/reservation-storage";
import { displayAddress, displayPhone, mapsUrl, phoneE164, siteName, siteUrl } from "@/app/seo";
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

  const serviceLabel = reservation.serviceType === "cafe" ? "Kafka Cafe" : "Van Kahvaltısı";
  const formattedDate = reservation.date ? reservation.date.split("-").reverse().join(".") : "";
  const icsParams = new URLSearchParams({
    name: reservation.customerName,
    phone: reservation.customerPhone || "",
    date: reservation.date,
    time: reservation.time,
    guests: String(reservation.guests),
    service: reservation.serviceType,
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

  const gCalTitle = encodeURIComponent(`🍳 Tarihi Van Kahvaltı Evi | ${reservation.customerName} (${reservation.guests} Kişi)`);
  const gCalDetails = encodeURIComponent(`🍳 Tarihi Van Kahvaltı Evi Rezervasyonu\n\n👤 Misafir: ${reservation.customerName}\n📞 Telefon: ${reservation.customerPhone}\n👥 Kişi: ${reservation.guests} Kişi\n🍽️ Seçim: ${serviceLabel}\n📋 Kod: #${reservation.id}\n📝 Not: ${reservation.note || "Yok"}\n\n📍 Adres: ${displayAddress}\n📞 İletişim: ${displayPhone}\n🌐 Web: ${siteUrl}`);
  const gCalLocation = encodeURIComponent(`Tarihi Van Kahvaltı Evi, ${displayAddress}`);
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=${startStr}/${endStr}&details=${gCalDetails}&location=${gCalLocation}&ctz=Europe/Istanbul`;

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.badgeSuccess}>
          <CheckCircle2 size={16} />
          Rezervasyon Kaydedildi
        </span>
        <p className={styles.brandName}>{siteName}</p>
        <h1 className={styles.title}>Randevuyu Takvime Ekle</h1>
        <p className={styles.subtitle}>
          Unutmamak için rezervasyonunuzu telefon takviminize tek tıkla ekleyebilirsiniz.
        </p>
      </div>

      <div className={styles.detailsBody}>
        {/* Summary Details */}
        <div className={styles.summaryGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Misafir Adı</span>
            <span className={styles.infoValue}>{reservation.customerName}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Telefon Numarası</span>
            <span className={styles.infoValue}>{reservation.customerPhone || "Belirtilmedi"}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Tarih & Saat</span>
            <span className={styles.infoValue}>{formattedDate} — {reservation.time}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Kişi & Tercih</span>
            <span className={styles.infoValue}>{reservation.guests} Kişi • {serviceLabel}</span>
          </div>

          {reservation.note ? (
            <div className={styles.infoItemFull}>
              <span className={styles.infoLabel}>Masa Notu / İstek</span>
              <span className={styles.infoValue} style={{ fontWeight: 500 }}>{reservation.note}</span>
            </div>
          ) : null}

          <div className={styles.infoItemFull}>
            <span className={styles.infoLabel}>Mekan & Adres</span>
            <span className={styles.infoValue} style={{ fontSize: "0.88rem", fontWeight: 600 }}>
              {displayAddress}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionsSection}>
          {/* Apple Calendar Primary Button */}
          <a
            href={icsDownloadUrl}
            className={styles.appleCalendarBtn}
            title="iPhone veya Mac Takviminize Ekleyin"
          >
            <span className={styles.appleIcon} aria-hidden="true">🍏</span>
            <span>iPhone / Apple Takvimine Ekle</span>
          </a>

          {/* Secondary Buttons Row */}
          <div className={styles.secondaryRow}>
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.googleBtn}
            >
              <Calendar size={16} />
              <span>Google Takvim</span>
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapsBtn}
            >
              <MapPin size={16} />
              <span>Yol Tarifi Al</span>
            </a>
          </div>
        </div>

        {/* Smart iOS / In-App Browser Guidance */}
        <div className={styles.tipBox} role="note">
          <span className={styles.tipIcon} aria-hidden="true">💡</span>
          <div>
            <strong>iPhone Kullanıcıları İçin İpucu:</strong> &quot;iPhone / Apple Takvimine Ekle&quot; butonuna dokunduğunuzda Takvim uygulamanız otomatik açılır. Eğer bağlantıyı WhatsApp içinden açtıysanız ve takvim açılmazsa, sağ alttaki <strong>Safari (🧭)</strong> simgesine dokunarak Safari&apos;de açabilirsiniz.
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span>Tarihi Van Kahvaltı Evi • Kod: #{reservation.id}</span>
        <Link href="/" className={styles.homeLink}>
          Ana Sayfaya Dön
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
