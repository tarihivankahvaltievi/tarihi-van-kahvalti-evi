"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PenTool, Quote, Star, X } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  source: string;
  image?: string;
  thumbs?: string[];
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Murat Y.",
    rating: 5,
    comment: "Taksim’in ortasında sakin bir Van sofrası. Tarihi atmosfer, sıcak servis ve gerçekten zengin bir serpme kahvaltı deneyimi.",
    source: "Google Deneyimi",
    image: "/images/tea-service.jpg",
  },
  {
    id: 2,
    name: "Ebru A.",
    rating: 5,
    comment: "Kahvaltıdan sonra kahve için kalkmak istemiyorsun. Kafka Cafe alanı, kahvaltı sonrası sohbet ve çalışma molası için aynı hikayenin ikinci bölümü gibi.",
    source: "Google Deneyimi",
    thumbs: ["/images/coffee-moment.jpg", "/images/interior-chair.jpg", "/images/historic-mirror.jpg"],
  },
  {
    id: 3,
    name: "Alessandro M.",
    rating: 5,
    comment: "The most authentic Turkish breakfast in Istanbul! The historic Greek building has an amazing soul. Sınırsız çay service was incredible.",
    source: "TripAdvisor",
  },
  {
    id: 4,
    name: "Canan D.",
    rating: 5,
    comment: "Van kahvaltısının buradaki sunumu tam anlamıyla sanat. Murtuğa ve kavut sıcak sıcak bakır sahanda geliyor, peynirlerin kokusu harika. Mutlaka gelin.",
    source: "Google Deneyimi",
  }
];

export function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const writeDialogRef = useRef<HTMLDialogElement>(null);
  
  // Form states
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getRelativeIndex = (idx: number) => {
    const forward = (idx - activeIndex + reviews.length) % reviews.length;
    if (forward === 0) return 0;
    if (forward <= Math.floor(reviews.length / 2)) return forward;
    return forward - reviews.length;
  };

  // Auto-play interval
  useEffect(() => {
    if (isWriteOpen) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews.length, isWriteOpen]);

  // Sync state with native dialog
  useEffect(() => {
    const dialog = writeDialogRef.current;
    if (!dialog) return;

    if (isWriteOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isWriteOpen]);

  // Handle closedby click outside
  useEffect(() => {
    const dialog = writeDialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setIsWriteOpen(false);
    };

    const handleCancel = (e: Event) => {
      e.preventDefault();
      setIsWriteOpen(false);
    };

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
          setIsWriteOpen(false);
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
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newReview: Review = {
      id: Date.now(),
      name: newName,
      rating: newRating,
      comment: newComment,
      source: "Müşteri Yorumu",
    };

    setReviews([newReview, ...reviews]);
    setActiveIndex(0);
    setIsWriteOpen(false);
    
    // Clear inputs
    setNewName("");
    setNewRating(5);
    setNewComment("");

    // Show toast success
    setToastMessage("Yorumunuz başarıyla eklendi! Teşekkür ederiz.");
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <>
      <div className="carousel-container" data-reveal>
        <div className="carousel-track" aria-label="Misafir yorumları">
          {reviews.map((rev, idx) => {
            const relativeIndex = getRelativeIndex(idx);
            const visible = Math.abs(relativeIndex) <= 2;

            return (
            <article 
              key={rev.id} 
              className={`carousel-slide ${idx === activeIndex ? "active" : ""} ${visible ? "is-visible" : ""}`}
              data-offset={relativeIndex}
              aria-hidden={!visible}
              role="button"
              tabIndex={visible ? 0 : -1}
              aria-label={`${rev.name} yorumunu göster`}
              onClick={() => setActiveIndex(idx)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveIndex(idx);
                }
              }}
              style={{ "--stagger-index": Math.abs(relativeIndex) } as React.CSSProperties}
            >
              <div className="slide-content">
                <span className="slide-quote-mark" aria-hidden="true">
                  <Quote size={18} />
                </span>
                <div className="slide-rating">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
                  ))}
                  {Array.from({ length: 5 - rev.rating }).map((_, i) => (
                    <Star key={i} size={16} color="var(--line)" />
                  ))}
                </div>
                
                <p className="slide-comment">“{rev.comment}”</p>
                
                <div className="slide-author">
                  <strong>{rev.name}</strong>
                  <span>{rev.source}</span>
                </div>

                {rev.image && (
                  <div className="slide-media single">
                    <Image src={rev.image} alt={rev.name} fill sizes="100px" loading="lazy" />
                  </div>
                )}

                {rev.thumbs && (
                  <div className="slide-media thumbs">
                    {rev.thumbs.map((t, index) => (
                      <div className="thumb-item" key={index}>
                        <Image src={t} alt="Mekan" fill sizes="60px" loading="lazy" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
            );
          })}
        </div>

        <div className="carousel-indicators">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`indicator-dot ${idx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`${idx + 1}. yoruma git`}
            />
          ))}
        </div>

        <button 
          type="button" 
          className="write-review-trigger-btn"
          onClick={() => setIsWriteOpen(true)}
        >
          <PenTool size={16} /> Deneyiminizi Paylaşın
        </button>
      </div>

      {toastMessage && (
        <div className="toast-notification" role="status">
          ✨ {toastMessage}
        </div>
      )}

      <dialog
        ref={writeDialogRef}
        className="write-dialog"
        aria-labelledby="write-dialog-title"
      >
        <div className="dialog-header">
          <h3 id="write-dialog-title">Deneyiminizi Paylaşın</h3>
          <button
            type="button"
            onClick={() => setIsWriteOpen(false)}
            className="close-button"
            aria-label="Kapat"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="write-review-form">
          <div className="form-group">
            <label htmlFor="writer-name">Adınız Soyadınız</label>
            <input
              type="text"
              id="writer-name"
              required
              placeholder="Örn. Ahmet Yılmaz"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Deneyim Puanınız</label>
            <div className="star-rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  aria-label={`${star} Yıldız Ver`}
                >
                  <Star
                    size={32}
                    fill={
                      (hoverRating !== null ? star <= hoverRating : star <= newRating)
                        ? "var(--gold)"
                        : "none"
                    }
                    color={
                      (hoverRating !== null ? star <= hoverRating : star <= newRating)
                        ? "var(--gold)"
                        : "var(--line)"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="writer-comment">Yorumunuz</label>
            <textarea
              id="writer-comment"
              required
              rows={3}
              placeholder="Tarih, lezzetler ve servis hakkında görüşleriniz..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>

          <button type="submit" className="write-submit-btn">
            Değerlendirmeyi Gönder
          </button>
        </form>
      </dialog>
    </>
  );
}
