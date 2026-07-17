"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const GalleryLightbox = dynamic(
  () => import("./gallery-lightbox").then((mod) => mod.GalleryLightbox),
  {
    ssr: false,
    loading: () => <GalleryPlaceholder />,
  },
);

type DeferredGalleryProps = {
  gallery: [string, string][];
};

function GalleryPlaceholder() {
  return <div className="gallery-deferred-placeholder" aria-hidden="true" />;
}

/**
 * The gallery is visually below the initial hero and story on every breakpoint.
 * Mount it shortly before it enters the viewport so its image decodes and marquee
 * animation do not compete with the first mobile render.
 */
export function DeferredGallery({ gallery }: DeferredGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isActivated) return;
    if (typeof IntersectionObserver === "undefined") {
      const activationTimer = window.setTimeout(() => setIsActivated(true), 0);
      return () => window.clearTimeout(activationTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsActivated(true);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isActivated]);

  return (
    <div
      ref={containerRef}
      className="gallery-deferred"
      data-ready={isActivated || undefined}
    >
      {isActivated ? (
        <GalleryLightbox gallery={gallery} />
      ) : (
        <GalleryPlaceholder />
      )}
    </div>
  );
}
