"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, PenTool, Star, X } from "lucide-react";

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
    comment: "Taksim’in ortasında sakin bir Van sofrası. Tarihi atmosfer ve sıcak servis.",
    source: "Google Deneyimi",
    image: "/images/tea-service.jpg",
  },
  {
    id: 2,
    name: "Ebru A.",
    rating: 5,
    comment: "Kahvaltıdan sonra kalkmak istemiyorsun; Kafka Cafe sohbetin ikinci bölümü gibi.",
    source: "Google Deneyimi",
    thumbs: ["/images/coffee-moment.jpg", "/images/interior-chair.jpg", "/images/historic-mirror.jpg"],
  },
  {
    id: 3,
    name: "Alessandro M.",
    rating: 5,
    comment: "Authentic Turkish breakfast in Istanbul. Historic building, endless tea, warm service.",
    source: "TripAdvisor",
    image: "/images/breakfast-spread.jpg",
  },
  {
    id: 4,
    name: "Canan D.",
    rating: 5,
    comment: "Murtuğa, kavut ve peynirler sıcak bakır sahanlarda geliyor. Sunum çok özenli.",
    source: "Google Deneyimi",
    image: "/images/sucuk-egg.jpg",
  },
  {
    id: 5,
    name: "Selin K.",
    rating: 5,
    comment: "Çay hiç bitmiyor, masa da sohbet de uzuyor. Beyoğlu'nda böyle sakin bir köşe bulmak güzel.",
    source: "Google Deneyimi",
    image: "/images/terrace-tea.jpg",
  },
  {
    id: 6,
    name: "James R.",
    rating: 5,
    comment: "A generous breakfast table with character. The old building makes the whole morning feel special.",
    source: "TripAdvisor",
    image: "/images/hands-table.jpg",
  },
  {
    id: 7,
    name: "Zeynep Ö.",
    rating: 5,
    comment: "Otlu peynir, bal kaymak ve sıcak sahanlar çok dengeliydi. Servis hızlı ama telaşsız.",
    source: "Google Deneyimi",
    image: "/images/kete-detail.jpg",
  },
  {
    id: 8,
    name: "Marco L.",
    rating: 5,
    comment: "We came for breakfast and stayed for coffee. Warm people, beautiful room, memorable food.",
    source: "TripAdvisor",
    image: "/images/coffee-moment.jpg",
  }
];

export function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [cardSize, setCardSize] = useState(365);
  const [moveCount, setMoveCount] = useState(0);
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const writeDialogRef = useRef<HTMLDialogElement>(null);
  
  // Form states
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const dragStartX = useRef<number | null>(null);
  const dragSuppressClick = useRef(false);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 390) {
        setCardSize(276);
      } else if (width < 640) {
        setCardSize(306);
      } else {
        setCardSize(365);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleMove = (steps: number) => {
    if (steps === 0) return;

    setReviews((currentReviews) => {
      const nextReviews = [...currentReviews];

      if (steps > 0) {
        for (let i = steps; i > 0; i -= 1) {
          const item = nextReviews.shift();
          if (!item) return currentReviews;
          nextReviews.push(item);
        }
      } else {
        for (let i = steps; i < 0; i += 1) {
          const item = nextReviews.pop();
          if (!item) return currentReviews;
          nextReviews.unshift(item);
        }
      }

      return nextReviews;
    });
    setMoveCount((count) => count + 1);
  };

  const handleDragEnd = (clientX: number) => {
    if (dragStartX.current === null) return;

    const deltaX = clientX - dragStartX.current;
    dragStartX.current = null;

    if (Math.abs(deltaX) < 42) return;
    dragSuppressClick.current = true;
    handleMove(deltaX > 0 ? -1 : 1);
    window.setTimeout(() => {
      dragSuppressClick.current = false;
    }, 0);
  };

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

    setReviews((currentReviews) => [newReview, ...currentReviews]);
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
      <div className="stagger-testimonials" data-reveal>
        <div
          className="stagger-testimonials-stage"
          aria-label="Misafir yorumları"
          data-move-count={moveCount}
          style={{ "--card-size": `${cardSize}px` } as React.CSSProperties}
          onPointerDown={(event) => {
            dragStartX.current = event.clientX;
          }}
          onPointerUp={(event) => handleDragEnd(event.clientX)}
          onPointerCancel={() => {
            dragStartX.current = null;
          }}
        >
          {reviews.map((rev, index) => {
            const centerIndex = Math.floor(reviews.length / 2);
            const position = index - centerIndex;
            const isCenter = position === 0;
            const previewImage = rev.image || rev.thumbs?.[0] || "/images/brand-icon-small.png";

            return (
              <article
                key={rev.id}
                className={`stagger-testimonial-card ${isCenter ? "is-center" : ""}`}
                data-review-id={rev.id}
                style={
                  {
                    "--position": position,
                    "--abs-position": Math.abs(position),
                    "--direction": position > 0 ? 1 : -1,
                    "--tilt": position % 2 ? 2.5 : -2.5,
                    zIndex: isCenter ? 10 : Math.max(1, 8 - Math.abs(position)),
                  } as React.CSSProperties
                }
                onClick={() => {
                  if (dragSuppressClick.current) return;
                  handleMove(position);
                }}
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleMove(position);
                  }
                }}
                aria-current={isCenter ? "true" : undefined}
              >
                <figure style={{ margin: 0, height: "100%", display: "flex", flexDirection: "column" }}>
                  <span className="stagger-card-corner" aria-hidden="true" />
                  <div className="stagger-card-image">
                    <Image
                      src={previewImage}
                      alt={rev.name}
                      fill
                      sizes="64px"
                      loading="lazy"
                    />
                  </div>
                  <div className="stagger-card-stars" aria-label={`${rev.rating} yıldız`}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="stagger-card-quote" style={{ margin: 0, flexGrow: 1 }}>
                    <p>“{rev.comment}”</p>
                  </blockquote>
                  <figcaption className="stagger-card-author">
                    - {rev.name}, <cite>{rev.source}</cite>
                  </figcaption>
                </figure>
              </article>
            );
          })}

          <div className="stagger-testimonial-controls" aria-label="Yorum kontrolü">
            <button
              type="button"
              onClick={() => handleMove(-1)}
              aria-label="Önceki yorum"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              onClick={() => handleMove(1)}
              aria-label="Sonraki yorum"
            >
              <ChevronRight size={28} />
            </button>
          </div>
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
