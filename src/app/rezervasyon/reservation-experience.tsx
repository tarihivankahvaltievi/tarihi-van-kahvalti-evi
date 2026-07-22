"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Coffee,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { mapsUrl, phoneE164, telUrl } from "../seo";
import type { SiteLocale } from "../home-localization";
import styles from "./reservation.module.css";

type ReservationService = "breakfast" | "cafe";

type ReservationExperienceProps = {
  locale?: SiteLocale;
};

function getTodayString() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Europe/Istanbul",
    year: "numeric",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

const copy = {
  tr: {
    back: "Ana sayfaya dön",
    provenance: "1978’den beri · Beyoğlu",
    title: "Sofrada yerinizi ayıralım.",
    intro: "Tarihi Van Kahvaltı Evi’nde kahvaltı uzun, çay taze, sohbet sakindir. Tarih ve kişi sayısını seçin; ekibimiz WhatsApp üzerinden masanızı netleştirsin.",
    hoursLabel: "Her gün",
    hours: "08.00–18.00",
    locationLabel: "Zambak Sokak",
    location: "Taksim, Beyoğlu",
    phoneLabel: "Telefon",
    imageAlt: "Tarihi Van Kahvaltı Evi'nde paylaşılan geniş Van kahvaltısı sofrası",
    memoryAlt: "Tarihi mekândaki oymalı çerçeveli ayna",
    formMeta: "Rezervasyon bilgileri",
    formTitle: "Masanızı birlikte planlayalım.",
    formTime: "Yaklaşık 1 dakika",
    serviceLegend: "Nasıl bir ziyaret planlıyorsunuz?",
    breakfast: "Van kahvaltısı",
    breakfastNote: "Paylaşımlık sofra ve sıcak sahanlar",
    cafe: "Kafka Cafe",
    cafeNote: "Kahve, tatlı ve daha kısa bir buluşma",
    date: "Tarih",
    time: "Saat",
    guests: "Kişi sayısı",
    guestsHint: "1–30 kişi",
    decrease: "Kişi sayısını azalt",
    increase: "Kişi sayısını artır",
    guestUnit: "kişi",
    note: "Eklemek istediğiniz bir not var mı?",
    optional: "İsteğe bağlı",
    placeholder: "Çocuk sandalyesi, masa tercihi veya bizimle paylaşmak istediğiniz başka bir detay",
    summary: "Masa özeti",
    chooseDate: "Tarih seçin",
    confirmation: "Talebiniz gönderildikten sonra ekibimiz uygunluğu WhatsApp üzerinden teyit eder. Rezervasyon bu teyitle kesinleşir.",
    submit: "WhatsApp’ta rezervasyon talebi oluştur",
    messageGreeting: "Merhaba, Tarihi Van Kahvaltı Evi için rezervasyon bilgi ve talebi:",
    messageDate: "Tarih",
    messageTime: "Saat",
    messageGuests: "Kişi Sayısı",
    messageService: "Tercih",
    messageNote: "Not",
    messageEmpty: "Yok",
    messageClose: "Rezervasyonumu onaylayabilir misiniz? Şimdiden teşekkürler.",
  },
  en: {
    back: "Back to home",
    provenance: "Since 1978 · Beyoğlu",
    title: "Let’s save you a place at the table.",
    intro: "Breakfast is unhurried, the tea is fresh and the table is made for sharing. Choose a date and party size; our team will confirm your table on WhatsApp.",
    hoursLabel: "Open daily",
    hours: "08:00–18:00",
    locationLabel: "Zambak Street",
    location: "Taksim, Beyoğlu",
    phoneLabel: "Telephone",
    imageAlt: "A generous Van breakfast shared at Tarihi Van Kahvaltı Evi",
    memoryAlt: "The carved historic mirror inside the restaurant",
    formMeta: "Reservation details",
    formTitle: "Let’s plan your table.",
    formTime: "Takes about 1 minute",
    serviceLegend: "What are you planning?",
    breakfast: "Van breakfast",
    breakfastNote: "A shared table with hot copper-pan dishes",
    cafe: "Kafka Cafe",
    cafeNote: "Coffee, dessert and a shorter visit",
    date: "Date",
    time: "Time",
    guests: "Party size",
    guestsHint: "1–30 guests",
    decrease: "Decrease guest count",
    increase: "Increase guest count",
    guestUnit: "guests",
    note: "Anything we should know?",
    optional: "Optional",
    placeholder: "High chair, seating preference or another helpful detail",
    summary: "Table summary",
    chooseDate: "Choose a date",
    confirmation: "After you send the request, our team will confirm availability on WhatsApp. Your reservation is final once confirmed.",
    submit: "Create reservation request on WhatsApp",
    messageGreeting: "Hello, I would like to request a table at Tarihi Van Kahvaltı Evi:",
    messageDate: "Date",
    messageTime: "Time",
    messageGuests: "Guests",
    messageService: "Service",
    messageNote: "Note",
    messageEmpty: "None",
    messageClose: "Could you please confirm availability? Thank you.",
  },
} as const;

export function ReservationExperience({
  locale = "tr",
}: ReservationExperienceProps) {
  const messages = copy[locale];
  const isEnglish = locale === "en";
  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [guests, setGuests] = useState(2);
  const [service, setService] = useState<ReservationService>("breakfast");
  const [note, setNote] = useState("");
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      const today = getTodayString();
      setDate(today);
      setMinDate(today);
    });
  }, []);

  const summaryDate = useMemo(() => {
    if (!date) return messages.chooseDate;
    const [year, month, day] = date.split("-").map(Number);
    return new Intl.DateTimeFormat(isEnglish ? "en-GB" : "tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(year, month - 1, day));
  }, [date, isEnglish, messages.chooseDate]);

  const selectedService = service === "cafe" ? "Kafka Cafe" : messages.breakfast;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypot) return;

    const formattedDate = date ? date.split("-").reverse().join(".") : "";
    const message = `${messages.messageGreeting}

📅 ${messages.messageDate}: ${formattedDate}
⏰ ${messages.messageTime}: ${time}
👥 ${messages.messageGuests}: ${guests}
🍳 ${messages.messageService}: ${selectedService}
📝 ${messages.messageNote}: ${note || messages.messageEmpty}

${messages.messageClose}`;

    const whatsappUrl = `https://wa.me/${phoneE164.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main id="main-content" className={styles.page} lang={isEnglish ? "en" : "tr"}>
      <section className={styles.story} aria-labelledby="reservation-title">
        <div className={styles.storyCopy}>
          <Link className={styles.backLink} href={isEnglish ? "/en" : "/"}>
            <ArrowLeft size={16} aria-hidden="true" />
            {messages.back}
          </Link>
          <p className={styles.provenance}>{messages.provenance}</p>
          <h1 id="reservation-title">{messages.title}</h1>
          <p className={styles.intro}>{messages.intro}</p>

          <div className={styles.visitDetails}>
            <div>
              <Clock3 size={17} aria-hidden="true" />
              <span>{messages.hoursLabel}</span>
              <strong>{messages.hours}</strong>
            </div>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={17} aria-hidden="true" />
              <span>{messages.locationLabel}</span>
              <strong>{messages.location}</strong>
            </a>
            <a href={telUrl}>
              <Phone size={17} aria-hidden="true" />
              <span>{messages.phoneLabel}</span>
              <strong>+90 541 525 28 68</strong>
            </a>
          </div>
        </div>

        <div className={styles.imageStage}>
          <figure className={styles.tableImage}>
            <Image
              src="/images/breakfast-spread.webp"
              alt={messages.imageAlt}
              fill
              priority
              sizes="(max-width: 820px) 100vw, 46vw"
            />
          </figure>
          <figure className={styles.memoryImage}>
            <Image
              src="/images/historic-mirror.webp"
              alt={messages.memoryAlt}
              fill
              sizes="(max-width: 820px) 28vw, 150px"
            />
          </figure>
        </div>
      </section>

      <section className={styles.reservation} aria-labelledby="reservation-form-title">
        <header className={styles.formHeader}>
          <div>
            <p>{messages.formMeta}</p>
            <h2 id="reservation-form-title">{messages.formTitle}</h2>
          </div>
          <span><Clock3 size={15} aria-hidden="true" /> {messages.formTime}</span>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="reservation-website">Leave this field empty</label>
            <input
              id="reservation-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <fieldset className={styles.serviceFieldset}>
            <legend>{messages.serviceLegend}</legend>
            <div className={styles.serviceOptions}>
              <button
                type="button"
                className={service === "breakfast" ? styles.activeService : ""}
                aria-pressed={service === "breakfast"}
                onClick={() => setService("breakfast")}
              >
                <UtensilsCrossed size={20} aria-hidden="true" />
                <span><strong>{messages.breakfast}</strong><small>{messages.breakfastNote}</small></span>
                <Check className={styles.serviceCheck} size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={service === "cafe" ? styles.activeService : ""}
                aria-pressed={service === "cafe"}
                onClick={() => setService("cafe")}
              >
                <Coffee size={20} aria-hidden="true" />
                <span><strong>{messages.cafe}</strong><small>{messages.cafeNote}</small></span>
                <Check className={styles.serviceCheck} size={17} aria-hidden="true" />
              </button>
            </div>
          </fieldset>

          <div className={styles.scheduleGrid}>
            <label className={styles.field} htmlFor="reservation-date">
              <span><CalendarDays size={17} aria-hidden="true" /> {messages.date}</span>
              <input
                id="reservation-date"
                type="date"
                required
                min={minDate}
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>

            <label className={styles.field} htmlFor="reservation-time">
              <span><Clock3 size={17} aria-hidden="true" /> {messages.time}</span>
              <select id="reservation-time" value={time} onChange={(event) => setTime(event.target.value)}>
                {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "16:00", "17:00"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.guestRow}>
            <div className={styles.guestLabel}>
              <Users size={18} aria-hidden="true" />
              <span><strong>{messages.guests}</strong><small>{messages.guestsHint}</small></span>
            </div>
            <div className={styles.guestCounter} role="group" aria-label={messages.guests}>
              <button
                type="button"
                aria-label={messages.decrease}
                disabled={guests <= 1}
                onClick={() => setGuests((current) => current - 1)}
              >
                <Minus size={18} />
              </button>
              <span role="status" aria-live="polite"><strong>{guests}</strong><small>{messages.guestUnit}</small></span>
              <button
                type="button"
                aria-label={messages.increase}
                disabled={guests >= 30}
                onClick={() => setGuests((current) => current + 1)}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <label className={styles.noteField} htmlFor="reservation-note">
            <span><strong>{messages.note}</strong><small>{messages.optional}</small></span>
            <textarea
              id="reservation-note"
              rows={4}
              maxLength={240}
              value={note}
              placeholder={messages.placeholder}
              onChange={(event) => setNote(event.target.value)}
            />
            <small className={styles.characterCount}>{note.length}/240</small>
          </label>

          <aside className={styles.summary} aria-label={messages.summary}>
            <p>{messages.summary}</p>
            <div>
              <strong>{summaryDate}</strong>
              <span aria-hidden="true" />
              <strong>{time}</strong>
              <span aria-hidden="true" />
              <strong>{guests} {messages.guestUnit}</strong>
            </div>
            <small>{selectedService}</small>
          </aside>

          <div className={styles.submitArea}>
            <p><ShieldCheck size={18} aria-hidden="true" /> {messages.confirmation}</p>
            <button type="submit" className={styles.submitButton}>
              <MessageCircle size={20} aria-hidden="true" />
              <span>{messages.submit}</span>
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
