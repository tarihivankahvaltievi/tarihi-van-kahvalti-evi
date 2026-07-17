"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryLightboxProps {
  gallery: [string, string][];
}

type GalleryRow = {
  items: [string, string][];
  duration: number;
  offset: string;
  reverse: boolean;
  density: "featured" | "tall";
};

export function GalleryLightbox({ gallery }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const getImage = (src: string) => gallery.find(([gallerySrc]) => gallerySrc === src);
  const compactImages = [
    "/images/tea-service.webp",
    "/images/historic-mirror.webp",
    "/images/coffee-moment.webp",
    "/images/interior-chair.webp",
    "/images/sucuk-egg.webp",
  ].map(getImage).filter((item): item is [string, string] => Boolean(item));
  const tableImages = [
    "/images/breakfast-spread.webp",
    "/images/terrace-tea.webp",
    "/images/hands-table.webp",
    "/images/balcony-breakfast.webp",
    "/images/street-table.webp",
  ].map(getImage).filter((item): item is [string, string] => Boolean(item));
  const galleryRows: GalleryRow[] = [
    {
      items: compactImages.length ? compactImages : gallery.slice(0, 5),
      duration: 52,
      offset: "0vw",
      reverse: false,
      density: "featured",
    },
    {
      items: tableImages.length ? tableImages : [...gallery.slice(5), ...gallery.slice(0, 2)],
      duration: 60,
      offset: "-11vw",
      reverse: true,
      density: "tall",
    },
  ];

  const openLightbox = (index: number) => {
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : null));
  }, [activeIndex, gallery.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : null));
  }, [activeIndex, gallery.length]);

  // Sync state with native dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeIndex !== null) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [activeIndex]);

  // Handle ESC and click outside (light-dismiss fallback)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      closeLightbox();
    };

    const handleCancel = (e: Event) => {
      e.preventDefault();
      closeLightbox();
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
          closeLightbox();
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

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handleNext, handlePrev]);

  return (
    <>
      <div className="gallery-hero-shell">
        <span className="gallery-ambient gallery-ambient-one" aria-hidden="true" />
        <span className="gallery-ambient gallery-ambient-two" aria-hidden="true" />
        <div className="mosaic gallery-marquee" aria-label="Mekan fotoğrafları">
          {galleryRows.map((row) => (
            <GalleryMarqueeRow
              key={`${row.density}-${row.offset}`}
              items={row.items}
              gallery={gallery}
              openLightbox={openLightbox}
              reverse={row.reverse}
              paused={Boolean(prefersReducedMotion)}
              duration={row.duration}
              offset={row.offset}
              density={row.density}
            />
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox-dialog"
        aria-labelledby="lightbox-caption"
      >
        {activeIndex !== null && (
          <div className="lightbox-content">
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Galeri kapat"
            >
              <X size={24} />
            </button>

            <button
              type="button"
              className="lightbox-nav prev"
              onClick={handlePrev}
              aria-label="Önceki fotoğraf"
            >
              <ChevronLeft size={36} />
            </button>

            <div className="lightbox-image-wrapper">
              <Image
                src={gallery[activeIndex][0]}
                alt={gallery[activeIndex][1]}
                fill
                sizes="(max-width: 1200px) 90vw, 1000px"
                className="lightbox-image"
              />
            </div>

            <button
              type="button"
              className="lightbox-nav next"
              onClick={handleNext}
              aria-label="Sonraki fotoğraf"
            >
              <ChevronRight size={36} />
            </button>

            <div className="lightbox-info">
              <span id="lightbox-caption">{gallery[activeIndex][1]}</span>
              <span className="lightbox-counter">
                {activeIndex + 1} / {gallery.length}
              </span>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function GalleryMarqueeRow({
  items,
  gallery,
  openLightbox,
  reverse = false,
  paused = false,
  duration,
  offset,
  density,
}: {
  items: [string, string][];
  gallery: [string, string][];
  openLightbox: (index: number) => void;
  reverse?: boolean;
  paused?: boolean;
  duration: number;
  offset: string;
  density: "featured" | "tall";
}) {
  const marqueeItems = [...items, ...items];

  return (
    <div
      className={`gallery-marquee-row gallery-marquee-row-${density}`}
      style={{ "--marquee-offset": offset } as CSSProperties}
    >
      <motion.div
        className="gallery-marquee-track"
        animate={paused ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={paused ? undefined : { duration, ease: "linear", repeat: Infinity }}
      >
        {marqueeItems.map(([src, alt], index) => {
          const galleryIndex = gallery.findIndex(([gallerySrc]) => gallerySrc === src);
          const resolvedIndex = galleryIndex >= 0 ? galleryIndex : index % gallery.length;
          const isDuplicate = index >= items.length;
          const cardStyle = {
            "--marquee-tilt": `${index % 2 === 0 ? -1.2 : 1.45}deg`,
            "--card-lift": `${index % 3 === 0 ? "-10px" : index % 3 === 1 ? "8px" : "0px"}`,
          } as CSSProperties;
          const cardImage = (
            <>
              <Image
                src={src}
                alt={isDuplicate ? "" : alt}
                fill
                sizes="(max-width: 760px) 58vw, (max-width: 1100px) 34vw, 360px"
                loading="lazy"
              />
              <span className="mosaic-overlay">
                <span>Görüntüle</span>
              </span>
            </>
          );

          if (isDuplicate) {
            return (
              <div
                className="mosaic-item gallery-marquee-card"
                key={`${src}-${index}-${reverse ? "reverse" : "forward"}`}
                aria-hidden="true"
                style={cardStyle}
              >
                {cardImage}
              </div>
            );
          }

          return (
            <button
              type="button"
              className="mosaic-item gallery-marquee-card"
              key={`${src}-${index}-${reverse ? "reverse" : "forward"}`}
              onClick={() => openLightbox(resolvedIndex)}
              aria-label={`${alt} görselini büyüt`}
              style={cardStyle}
            >
              {cardImage}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
