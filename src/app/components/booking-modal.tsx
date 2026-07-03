"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, MessageCircle, Users, X } from "lucide-react";
import { phoneE164 } from "../seo";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedType?: string;
  preselectedItem?: string;
}

function getTodayString() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function BookingModal({ 
  isOpen, 
  onClose, 
  preselectedType, 
  preselectedItem 
}: BookingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [guests, setGuests] = useState(2);
  const [type, setType] = useState(() => preselectedType === "Kahve" ? "Kafka Cafe" : "Kahvaltı");
  const [note, setNote] = useState(() => preselectedItem ? `Seçilen Lezzet: ${preselectedItem}` : "");
  const [honeypot, setHoneypot] = useState("");

  // Set default date to today or tomorrow
  useEffect(() => {
    queueMicrotask(() => {
      const todayStr = getTodayString();
      setDate(todayStr);
      setMinDate(todayStr);
    });
  }, []);

  // Sync modal state with native dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle closedby fallback and ESC key
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    // Close when clicking backdrop
    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        const isInContent = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInContent) {
          onClose();
        }
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleBackdropClick);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam bot check
    if (honeypot) {
      console.warn("Spam detected!");
      onClose();
      return;
    }

    // Format date beautifully (e.g. 27.06.2026)
    const formattedDate = date ? date.split("-").reverse().join(".") : "";
    
    const message = `Merhaba, Tarihi Van Kahvaltı Evi için rezervasyon bilgi ve talebi:

📅 Tarih: ${formattedDate}
⏰ Saat: ${time}
👥 Kişi Sayısı: ${guests} Kişi
🍳 Tercih: ${type}
📝 Not: ${note || "Yok"}

Rezervasyonumu onaylayabilir misiniz? Şimdiden teşekkürler.`;

    const whatsappUrl = `https://wa.me/${phoneE164.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="booking-dialog"
      aria-labelledby="booking-title"
    >
      <div className="dialog-header">
        <h3 id="booking-title">Masa Rezervasyonu</h3>
        <button
          type="button"
          onClick={onClose}
          className="close-button"
          aria-label="Kapat"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        {/* Honeypot field (hidden from real users) */}
        <div 
          aria-hidden="true" 
          style={{ 
            position: "absolute", 
            width: "1px", 
            height: "1px", 
            padding: 0, 
            margin: "-1px", 
            overflow: "hidden", 
            clip: "rect(0, 0, 0, 0)", 
            border: 0 
          }}
        >
          <label htmlFor="website_hp">Lütfen bu alanı doldurmayın</label>
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

        <div className="form-group">
          <label>Rezervasyon Tipi</label>
          <div className="type-toggle-grid">
            <button
              type="button"
              className={type === "Kahvaltı" ? "active" : ""}
              onClick={() => setType("Kahvaltı")}
            >
              🍳 Van Kahvaltısı
            </button>
            <button
              type="button"
              className={type === "Kafka Cafe" ? "active" : ""}
              onClick={() => setType("Kafka Cafe")}
            >
              ☕ Kafka Cafe
            </button>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="booking-date">
              <Calendar size={15} /> Tarih
            </label>
            <input
              type="date"
              id="booking-date"
              required
              value={date}
              min={minDate}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="booking-time">
              <Clock size={15} /> Saat
            </label>
            <select
              id="booking-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
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
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>
            <Users size={15} /> Kişi Sayısı
          </label>
          <div className="guests-counter">
            <button
              type="button"
              disabled={guests <= 1}
              onClick={() => setGuests(guests - 1)}
            >
              -
            </button>
            <span className="guests-value">{guests} Kişi</span>
            <button
              type="button"
              disabled={guests >= 30}
              onClick={() => setGuests(guests + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="booking-note">Özel Not (İsteğe Bağlı)</label>
          <textarea
            id="booking-note"
            rows={2}
            placeholder="Cam kenarı masa, çocuk arabası alanı, doğum günü kutlaması vb."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button type="submit" className="booking-submit-btn">
          <MessageCircle size={18} /> Talebi WhatsApp ile İlet
        </button>
      </form>
    </dialog>
  );
}
