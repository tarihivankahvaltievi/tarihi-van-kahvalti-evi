"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Coffee,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import type { SiteLocale } from "../home-localization";
import { phoneE164 } from "../seo";
import styles from "./reservation.module.css";

type Service = "breakfast" | "cafe";

const translations = {
  tr: {
    back: "Ana sayfa",
    heritage: "1978’den beri Beyoğlu’nda",
    title: "Sofrada yeriniz hazır.",
    intro: "Tarih ve kişi sayısını seçin. Ekibimiz masanızı WhatsApp üzerinden netleştirsin.",
    location: "Zambak Sokak, Beyoğlu",
    hours: "Her gün 08.00–18.00",
    formTitle: "Rezervasyon oluştur",
    formIntro: "Bilgileri seçin, talebinizi gönderin.",
    service: "Ziyaret tercihi",
    breakfast: "Van kahvaltısı",
    breakfastDetail: "Serpme sofra",
    cafe: "Kafka Cafe",
    cafeDetail: "Kahve ve tatlı",
    date: "Tarih",
    time: "Saat",
    guests: "Kişi sayısı",
    decrease: "Kişi sayısını azalt",
    increase: "Kişi sayısını artır",
    unit: "kişi",
    note: "Not",
    optional: "isteğe bağlı",
    placeholder: "Çocuk sandalyesi veya masa tercihi",
    confirmation: "Rezervasyon, WhatsApp onayımızdan sonra kesinleşir.",
    submit: "WhatsApp ile talep gönder",
    selectedItem: "Menüden seçilen",
    greeting: "Merhaba, Tarihi Van Kahvaltı Evi için rezervasyon talebim:",
    preference: "Tercih",
    noNote: "Yok",
    close: "Uygunluğu teyit edebilir misiniz? Teşekkürler.",
  },
  en: {
    back: "Home",
    heritage: "In Beyoğlu since 1978",
    title: "Your place at the table.",
    intro: "Choose a date and party size. Our team will confirm your table on WhatsApp.",
    location: "Zambak Street, Beyoğlu",
    hours: "Open daily 08:00–18:00",
    formTitle: "Request a table",
    formIntro: "Choose the details and send your request.",
    service: "Your visit",
    breakfast: "Van breakfast",
    breakfastDetail: "Shared breakfast table",
    cafe: "Kafka Cafe",
    cafeDetail: "Coffee and dessert",
    date: "Date",
    time: "Time",
    guests: "Party size",
    decrease: "Decrease party size",
    increase: "Increase party size",
    unit: "guests",
    note: "Note",
    optional: "optional",
    placeholder: "High chair or seating preference",
    confirmation: "Your table is confirmed after our reply on WhatsApp.",
    submit: "Send request on WhatsApp",
    selectedItem: "Selected from menu",
    greeting: "Hello, I would like to request a table at Tarihi Van Kahvaltı Evi:",
    preference: "Service",
    noNote: "None",
    close: "Could you please confirm availability? Thank you.",
  },
} as const;

function todayInIstanbul() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Europe/Istanbul",
    year: "numeric",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

const times = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

export function ReservationExperience({
  locale = "tr",
  initialItem = "",
  initialService = "",
}: {
  locale?: SiteLocale;
  initialItem?: string;
  initialService?: string;
}) {
  const copy = translations[locale];
  const isEnglish = locale === "en";
  const selectedService = initialService.toLocaleLowerCase(isEnglish ? "en-US" : "tr-TR");
  const selectedItem = initialItem.trim();
  const [date, setDate] = useState(todayInIstanbul);
  const [time, setTime] = useState("10:00");
  const [guests, setGuests] = useState(2);
  const [service, setService] = useState<Service>(() =>
    selectedService?.includes("cafe") || selectedService?.includes("kahve") ? "cafe" : "breakfast",
  );
  const [note, setNote] = useState(() => selectedItem ? `${copy.selectedItem}: ${selectedItem}` : "");
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypot) return;

    const formattedDate = date.split("-").reverse().join(".");
    const serviceName = service === "breakfast" ? copy.breakfast : copy.cafe;
    const message = `${copy.greeting}\n\n📅 ${copy.date}: ${formattedDate}\n⏰ ${copy.time}: ${time}\n👥 ${copy.guests}: ${guests} ${copy.unit}\n🍽️ ${copy.preference}: ${serviceName}\n📝 ${copy.note}: ${note || copy.noNote}\n\n${copy.close}`;
    const url = `https://wa.me/${phoneE164.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main id="main-content" className={styles.page} lang={isEnglish ? "en" : "tr"}>
      <section className={styles.visual} aria-labelledby="reservation-title">
        <Image
          src="/images/hero-parallax/overhead-feast.webp"
          alt={isEnglish ? "A Van breakfast table prepared at Tarihi Van Kahvaltı Evi" : "Tarihi Van Kahvaltı Evi’nde hazırlanmış Van kahvaltısı sofrası"}
          fill
          priority
          unoptimized
          sizes="(max-width: 820px) 100vw, 45vw"
          className={styles.photo}
        />
        <div className={styles.visualShade} />
        <Link href={isEnglish ? "/en" : "/"} className={styles.backLink}>
          <ArrowLeft size={17} aria-hidden="true" />
          {copy.back}
        </Link>
        <div className={styles.visualCopy}>
          <p>{copy.heritage}</p>
          <h1 id="reservation-title">{copy.title}</h1>
          <span>{copy.intro}</span>
          <div className={styles.placeDetails}>
            <span><MapPin size={16} aria-hidden="true" /> {copy.location}</span>
            <span><Clock3 size={16} aria-hidden="true" /> {copy.hours}</span>
          </div>
        </div>
      </section>

      <section className={styles.booking} aria-labelledby="booking-form-title">
        <div className={styles.bookingInner}>
          <header className={styles.formHeader}>
            <div>
              <h2 id="booking-form-title">{copy.formTitle}</h2>
              <p>{copy.formIntro}</p>
            </div>
            <span className={styles.duration}><Clock3 size={15} /> 1 dk.</span>
          </header>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="reservation-website">Website</label>
              <input id="reservation-website" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} tabIndex={-1} autoComplete="off" />
            </div>

            <fieldset className={styles.serviceFieldset}>
              <legend>{copy.service}</legend>
              <div className={styles.serviceOptions}>
                <button type="button" className={service === "breakfast" ? styles.serviceActive : ""} aria-pressed={service === "breakfast"} onClick={() => setService("breakfast")}>
                  <UtensilsCrossed size={20} aria-hidden="true" />
                  <span><strong>{copy.breakfast}</strong><small>{copy.breakfastDetail}</small></span>
                  <Check className={styles.check} size={17} aria-hidden="true" />
                </button>
                <button type="button" className={service === "cafe" ? styles.serviceActive : ""} aria-pressed={service === "cafe"} onClick={() => setService("cafe")}>
                  <Coffee size={20} aria-hidden="true" />
                  <span><strong>{copy.cafe}</strong><small>{copy.cafeDetail}</small></span>
                  <Check className={styles.check} size={17} aria-hidden="true" />
                </button>
              </div>
            </fieldset>

            <div className={styles.dateTimeGrid}>
              <label className={styles.field} htmlFor="reservation-date">
                <span><CalendarDays size={17} aria-hidden="true" /> {copy.date}</span>
                <input id="reservation-date" type="date" required min={todayInIstanbul()} value={date} onChange={(event) => setDate(event.target.value)} />
              </label>
              <label className={styles.field} htmlFor="reservation-time">
                <span><Clock3 size={17} aria-hidden="true" /> {copy.time}</span>
                <select id="reservation-time" value={time} onChange={(event) => setTime(event.target.value)}>
                  {times.map((value) => <option key={value} value={value}>{value}</option>)}
                </select>
              </label>
            </div>

            <div className={styles.guestRow}>
              <span className={styles.guestLabel}><Users size={18} aria-hidden="true" /> {copy.guests}</span>
              <div className={styles.counter} role="group" aria-label={copy.guests}>
                <button type="button" disabled={guests <= 1} aria-label={copy.decrease} onClick={() => setGuests((value) => value - 1)}><Minus size={18} /></button>
                <output aria-live="polite"><strong>{guests}</strong><small>{copy.unit}</small></output>
                <button type="button" disabled={guests >= 30} aria-label={copy.increase} onClick={() => setGuests((value) => value + 1)}><Plus size={18} /></button>
              </div>
            </div>

            <label className={styles.noteField} htmlFor="reservation-note">
              <span>{copy.note} <small>{copy.optional}</small></span>
              <textarea id="reservation-note" rows={2} maxLength={240} value={note} placeholder={copy.placeholder} onChange={(event) => setNote(event.target.value)} />
              <small className={styles.count}>{note.length}/240</small>
            </label>

            <div className={styles.submitArea}>
              <p><ShieldCheck size={17} aria-hidden="true" /> {copy.confirmation}</p>
              <button type="submit" className={styles.submitButton}>
                <MessageCircle size={20} aria-hidden="true" />
                {copy.submit}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
