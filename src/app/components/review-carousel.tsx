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
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const writeDialogRef = useRef<HTMLDialogElement>(null);
  
  // Form states
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
      <div className="testimonials-stagger" data-reveal>
        <div className="testimonial-copy">
          <span>Misafir Notları</span>
          <p>
            Kısa cümleler, gerçek masalar, uzun kalan çay kokusu. Yorumlar
            gösterişli bir vitrin değil; sofradan kalkarken söylenenler.
          </p>
        </div>

        <div className="testimonial-stagger-grid" aria-label="Misafir yorumları">
          {reviews.map((rev, idx) => (
            <article
              key={rev.id}
              className={`testimonial-card testimonial-card-${idx + 1}`}
              style={{ "--stagger-index": idx } as React.CSSProperties}
            >
              <div className="testimonial-card-top">
                <span className="testimonial-quote-mark" aria-hidden="true">
                  <Quote size={16} />
                </span>
                <div className="testimonial-rating" aria-label={`${rev.rating} yıldız`}>
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>

              <p>“{rev.comment}”</p>

              <div className="testimonial-author">
                <strong>{rev.name}</strong>
                <span>{rev.source}</span>
              </div>

              {(rev.image || rev.thumbs) && (
                <div className="testimonial-media">
                  {rev.image && (
                    <div className="testimonial-thumb">
                      <Image src={rev.image} alt={rev.name} fill sizes="84px" loading="lazy" />
                    </div>
                  )}
                  {rev.thumbs?.slice(0, 3).map((thumb, index) => (
                    <div className="testimonial-thumb" key={thumb}>
                      <Image src={thumb} alt={`Mekan detayı ${index + 1}`} fill sizes="84px" loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </article>
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
