"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryLightboxProps {
  gallery: [string, string][];
}

export function GalleryLightbox({ gallery }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const firstRow = gallery.filter((_, index) => index % 2 === 0);
  const secondRow = gallery.filter((_, index) => index % 2 === 1);

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
      <div className="mosaic gallery-marquee" data-reveal aria-label="Mekan fotoğrafları">
        <GalleryMarqueeRow
          items={firstRow}
          gallery={gallery}
          openLightbox={openLightbox}
          reverse={false}
          paused={Boolean(prefersReducedMotion)}
        />
        <GalleryMarqueeRow
          items={secondRow}
          gallery={gallery}
          openLightbox={openLightbox}
          reverse
          paused={Boolean(prefersReducedMotion)}
        />
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
                priority
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
}: {
  items: [string, string][];
  gallery: [string, string][];
  openLightbox: (index: number) => void;
  reverse?: boolean;
  paused?: boolean;
}) {
  const marqueeItems = [...items, ...items];
  const duration = reverse ? 44 : 52;

  return (
    <div className="gallery-marquee-row">
      <motion.div
        className="gallery-marquee-track"
        animate={paused ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={paused ? undefined : { duration, ease: "linear", repeat: Infinity }}
      >
        {marqueeItems.map(([src, alt], index) => {
          const galleryIndex = gallery.findIndex(([gallerySrc]) => gallerySrc === src);
          const resolvedIndex = galleryIndex >= 0 ? galleryIndex : index % gallery.length;

          return (
            <button
              type="button"
              className="mosaic-item gallery-marquee-card"
              key={`${src}-${index}-${reverse ? "reverse" : "forward"}`}
              onClick={() => openLightbox(resolvedIndex)}
              onPointerDown={() => openLightbox(resolvedIndex)}
              aria-label={`${alt} görselini büyüt`}
              style={{ "--marquee-tilt": `${index % 2 === 0 ? -1.4 : 1.8}deg` } as CSSProperties}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 760px) 58vw, (max-width: 1100px) 34vw, 360px"
                loading="lazy"
              />
              <span className="mosaic-overlay">
                <span>Görüntüle</span>
              </span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
