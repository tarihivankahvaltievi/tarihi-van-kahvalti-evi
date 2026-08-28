import type { Reservation } from "./reservation-storage";

function escapeIcalText(text: string): string {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|\n|\r/g, "\\n");
}

function formatIcalDateTime(dateStr: string, timeStr: string, durationMinutes = 120): { startStr: string; endStr: string } {
  // dateStr is "YYYY-MM-DD", timeStr is "HH:MM"
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);

  const startDate = new Date(year, month - 1, day, hour || 10, minute || 0, 0);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  const pad = (n: number) => String(n).padStart(2, "0");

  const startFormatted = `${startDate.getFullYear()}${pad(startDate.getMonth() + 1)}${pad(startDate.getDate())}T${pad(startDate.getHours())}${pad(startDate.getMinutes())}00`;
  const endFormatted = `${endDate.getFullYear()}${pad(endDate.getMonth() + 1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;

  return { startStr: startFormatted, endStr: endFormatted };
}

function formatUtcTimestamp(isoString?: string): string {
  const d = isoString ? new Date(isoString) : new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

const LOCATION = "Tarihi Van Kahvaltı Evi, Kılıçali Paşa Mah. Defterdar Yokuşu No:52/A, Cihangir, Beyoğlu / İstanbul";

export function generateSingleReservationIcs(reservation: Reservation): string {
  const { startStr, endStr } = formatIcalDateTime(reservation.date, reservation.time);
  const dtstamp = formatUtcTimestamp(reservation.updatedAt || reservation.createdAt);
  const serviceLabel = reservation.serviceType === "cafe" ? "Kafka Cafe" : "Van Kahvaltısı";

  const descriptionLines = [
    `🍳 Rezervasyon: ${reservation.customerName}`,
    `📞 Telefon: ${reservation.customerPhone || "Belirtilmedi"}`,
    `👥 Kişi Sayısı: ${reservation.guests} Kişi`,
    `🍽️ Tercih: ${serviceLabel}`,
    `📝 Not: ${reservation.note || "Yok"}`,
    `📌 Durum: ${reservation.status === "confirmed" ? "Onaylandı" : reservation.status === "cancelled" ? "İptal Edildi" : "Bekliyor"}`,
    `\n📍 Tarihi Van Kahvaltı Evi - Cihangir / Beyoğlu`,
    `💬 WhatsApp'tan Yaz: https://wa.me/${(reservation.customerPhone || "").replace(/\D/g, "")}`,
  ];

  const description = escapeIcalText(descriptionLines.join("\n"));
  const summary = escapeIcalText(`🍳 Rezervasyon: ${reservation.customerName} (${reservation.guests} Kişi - ${serviceLabel})`);
  const status = reservation.status === "cancelled" ? "CANCELLED" : reservation.status === "confirmed" ? "CONFIRMED" : "TENTATIVE";

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tarihi Van Kahvalti Evi//Reservation System//TR",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:res-${reservation.id}@tarihivankahvaltievi.com`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=Europe/Istanbul:${startStr}`,
    `DTEND;TZID=Europe/Istanbul:${endStr}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${escapeIcalText(LOCATION)}`,
    `STATUS:${status}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Yarın Tarihi Van Kahvaltı Evi Rezervasyonu",
    "TRIGGER:-P1D",
    "END:VALARM",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:2 Saat Sonra Tarihi Van Kahvaltı Evi Rezervasyonu",
    "TRIGGER:-PT2H",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return icsLines.join("\r\n") + "\r\n";
}

export function generateCalendarFeedIcs(reservations: Reservation[]): string {
  const dtstamp = formatUtcTimestamp();

  const eventBlocks = reservations
    .filter((r) => r.status !== "cancelled") // Do not clutter feed with cancelled ones or include with CANCELLED status
    .map((reservation) => {
      const { startStr, endStr } = formatIcalDateTime(reservation.date, reservation.time);
      const serviceLabel = reservation.serviceType === "cafe" ? "Kafka Cafe" : "Van Kahvaltısı";
      const cleanPhone = (reservation.customerPhone || "").replace(/\D/g, "");

      const descriptionLines = [
        `👤 Müşteri: ${reservation.customerName}`,
        `📞 Telefon: ${reservation.customerPhone || "Yok"}`,
        `👥 Kişi: ${reservation.guests} Kişi`,
        `🍽️ Hizmet: ${serviceLabel}`,
        `📝 Not: ${reservation.note || "Yok"}`,
        `📌 Durum: ${reservation.status === "confirmed" ? "Onaylandı" : "Beklemede"}`,
        `\n💬 WhatsApp: https://wa.me/${cleanPhone}`,
      ];

      const description = escapeIcalText(descriptionLines.join("\n"));
      const summary = escapeIcalText(`🍳 ${reservation.customerName} (${reservation.guests} Kişi - ${serviceLabel})`);

      return [
        "BEGIN:VEVENT",
        `UID:res-${reservation.id}@tarihivankahvaltievi.com`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART;TZID=Europe/Istanbul:${startStr}`,
        `DTEND;TZID=Europe/Istanbul:${endStr}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${escapeIcalText(LOCATION)}`,
        "STATUS:CONFIRMED",
        "BEGIN:VALARM",
        "ACTION:DISPLAY",
        `DESCRIPTION:Yarın Rezervasyon: ${escapeIcalText(reservation.customerName)} (${reservation.guests} Kişi)`,
        "TRIGGER:-P1D",
        "END:VALARM",
        "BEGIN:VALARM",
        "ACTION:DISPLAY",
        `DESCRIPTION:2 Saat Sonra Rezervasyon: ${escapeIcalText(reservation.customerName)} (${reservation.guests} Kişi)`,
        "TRIGGER:-PT2H",
        "END:VALARM",
        "END:VEVENT",
      ].join("\r\n");
    });

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tarihi Van Kahvalti Evi//Reservation System//TR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Tarihi Van Kahvaltı Evi Rezervasyonları",
    "X-WR-CALDESC:Siteden ve işletmeden alınan masa rezervasyonları canlı akışı",
    "X-WR-TIMEZONE:Europe/Istanbul",
    "REFRESH-INTERVAL;VALUE=DURATION:PT15M",
    "X-PUBLISHED-TTL:PT15M",
    ...eventBlocks,
    "END:VCALENDAR",
  ];

  return icsLines.join("\r\n") + "\r\n";
}
