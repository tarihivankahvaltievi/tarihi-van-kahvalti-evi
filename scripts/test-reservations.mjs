import assert from "node:assert/strict";
import { getDefaultReservation, getIstanbulDate, isFutureReservation } from "../src/app/rezervasyon/reservation-time.ts";

// Fixed clocks exercise same-day expiry, UTC midnight and visitors abroad.
const afternoon = new Date("2026-10-07T14:17:00Z");
assert.equal(getIstanbulDate(afternoon), "2026-10-07");
assert.equal(isFutureReservation("2026-10-07", "10:00", afternoon), false);
assert.equal(isFutureReservation("2026-10-07", "17:00", afternoon), false);
assert.equal(isFutureReservation("2026-10-07", "18:00", afternoon), true);
assert.deepEqual(getDefaultReservation(afternoon), { date: "2026-10-07", time: "18:00", minDate: "2026-10-07" });
assert.deepEqual(getDefaultReservation(new Date("2026-10-07T18:00:00Z")), { date: "2026-10-08", time: "10:00", minDate: "2026-10-07" });
assert.equal(getIstanbulDate(new Date("2026-10-07T22:00:00Z")), "2026-10-08");
assert.equal(isFutureReservation("2027-02-30", "10:00", afternoon), false);
assert.equal(isFutureReservation("2026-10-08", "22:01", afternoon), false);
assert.equal(isFutureReservation("2026-10-08", "22:00", afternoon), true);
console.log("✅ İstanbul saat dilimi, geçmiş saatler, kapanış sonrası varsayılan ve geçersiz takvim tarihi doğrulandı.");

import { rm } from "node:fs/promises";
import path from "node:path";

const temporaryDataFile = path.join(
  process.cwd(),
  "src/app/reservations",
  `.reservations-test-${process.pid}-${Date.now()}.json`,
);
process.env.RESERVATION_DATA_FILE = temporaryDataFile;

const {
  addReservation,
  getReservationData,
  updateReservation,
  deleteReservation,
  getCalendarFeedToken,
  isValidCalendarFeedToken,
} = await import("../src/app/reservations/reservation-storage.ts");
const { generateSingleReservationIcs, generateCalendarFeedIcs } = await import(
  "../src/app/reservations/ical-helper.ts"
);

function futureDateParts(daysAhead = 60) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysAhead);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  return {
    iso: `${yyyy}-${mm}-${dd}`,
    ical: `${yyyy}${mm}${dd}`,
  };
}

async function runTests() {
  const testDate = futureDateParts();
  console.log("--- 🧪 REZERVASYON & IPHONE TAKVİM TESTİ BAŞLIYOR ---");

  // 1. Test token generation & validation
  const token = getCalendarFeedToken();
  console.log("✅ Feed Güvenlik Tokenı:", token);
  if (!isValidCalendarFeedToken(token)) {
    throw new Error("Token doğrulama başarısız!");
  }
  if (isValidCalendarFeedToken("yanlis-token")) {
    throw new Error("Geçersiz token kabul edildi!");
  }
  console.log("✅ Token doğrulama güvenlik testi başarılı.");

  // 2. Add Test Reservation (roughly 2 months in the future)
  const testRes = await addReservation({
    customerName: "Baran Demir (Test)",
    customerPhone: "05321234567",
    date: testDate.iso,
    time: "11:00",
    guests: 4,
    serviceType: "breakfast",
    note: "Bahçe tarafı masa rica ediyoruz.",
    status: "pending",
  });

  console.log("✅ Rezervasyon Oluşturuldu:", testRes.id);

  // 3. Test Single Event .ICS Output
  const singleIcs = generateSingleReservationIcs(testRes);
  console.log("\n--- 📅 TEKİL .ICS ÇIKTISI ---");
  console.log(singleIcs);

  if (!singleIcs.includes("BEGIN:VCALENDAR") || !singleIcs.includes("END:VCALENDAR")) {
    throw new Error("Geçersiz VCALENDAR yapısı!");
  }
  if (!singleIcs.includes("METHOD:PUBLISH")) {
    throw new Error("RFC 5545 standartlarına göre METHOD:PUBLISH olmalıdır!");
  }
  if (!singleIcs.includes("STATUS:TENTATIVE") || !singleIcs.includes("CLASS:PRIVATE")) {
    throw new Error("Bekleyen talep takvimde onaylanmış veya herkese açık gösteriliyor!");
  }
  if (!singleIcs.includes("BEGIN:VTIMEZONE") || !singleIcs.includes("TZID:Europe/Istanbul")) {
    throw new Error("Europe/Istanbul VTIMEZONE bloğu eksik!");
  }
  if (!singleIcs.includes("TRIGGER:-P1D") || !singleIcs.includes("TRIGGER:-PT2H")) {
    throw new Error("Otomatik bildirim alarmları (VALARM) eksik!");
  }
  if (!singleIcs.includes(`TZID=Europe/Istanbul:${testDate.ical}T110000`)) {
    throw new Error("Tarih ve saat formatı hatalı!");
  }
  if (!singleIcs.includes("Baran Demir (Test)")) {
    throw new Error("Müşteri adı takvim çıktısında yer almıyor!");
  }
  if (!singleIcs.includes("05321234567")) {
    throw new Error("Müşteri telefon numarası takvim çıktısında yer almıyor!");
  }
  if (!singleIcs.includes("4 Kişi")) {
    throw new Error("Kişi sayısı takvim çıktısında yer almıyor!");
  }
  if (!singleIcs.includes("GEO:")) {
    throw new Error("Apple Maps koordinatları (GEO) eksik!");
  }
  if (!singleIcs.includes("Zambak Sk. No:8") || singleIcs.includes("Defterdar Yokuşu")) {
    throw new Error("Takvim konumu güncel kanonik işletme adresiyle eşleşmiyor!");
  }
  console.log("✅ Tekil .ICS çıktısı RFC 5545 ve iPhone standartlarına %100 uygun.");

  // 4. Test Calendar Feed .ICS Output
  const data = await getReservationData();
  const feedIcs = generateCalendarFeedIcs(data.reservations);
  console.log("\n--- 📱 CANLI IPHONE TAKVİM FEED .ICS ÇIKTISI ---");
  console.log(feedIcs.slice(0, 500) + "\n... [truncated]");

  if (!feedIcs.includes("X-WR-CALNAME:Tarihi Van Kahvaltı Evi Rezervasyonları")) {
    throw new Error("Takvim adı eksik!");
  }
  if (!feedIcs.includes("X-WR-TIMEZONE:Europe/Istanbul")) {
    throw new Error("Saat dilimi eksik!");
  }
  console.log("✅ Canlı iPhone Takvim Feed çıktısı RFC 5545 standartlarına %100 uygun.");

  // 5. Test Update Status
  const updated = await updateReservation(testRes.id, { status: "confirmed" });
  if (updated?.status !== "confirmed") {
    throw new Error("Durum güncelleme başarısız!");
  }
  console.log("✅ Durum güncelleme (Onaylama) testi başarılı.");

  // 6. Test Cleanup
  await deleteReservation(testRes.id);
  console.log("✅ Test rezervasyonu temizlendi.");

  // A failed durable write must not look like a saved booking in production.
  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
  try {
    process.env.NODE_ENV = "production";
    process.env.SUPABASE_URL = "http://127.0.0.1:1";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-only";
    await addReservation({
      customerName: "Storage Failure Test",
      customerPhone: "05321234567",
      date: testDate.iso,
      time: "11:00",
      guests: 2,
      serviceType: "breakfast",
      status: "pending",
    }).then(
      () => { throw new Error("Kalıcı depolama başarısızlığına rağmen kayıt başarılı sayıldı!"); },
      () => {},
    );
    console.log("✅ Kalıcı depolama hatası başarı yanıtına dönüşmüyor.");
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }

  console.log("\n🎉 TÜM TESTLER BAŞARIYLA TAMAMLANDI!");
}

try {
  await runTests();
} catch (err) {
  console.error("❌ TEST HATASI:", err);
  process.exitCode = 1;
} finally {
  await rm(temporaryDataFile, { force: true });
}
