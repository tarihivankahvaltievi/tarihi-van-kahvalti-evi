import Image from "next/image";
import { type CSSProperties } from "react";
import { HeroMotionActivator } from "./hero-motion-activator";

type HeroImage = {
  thumbnail: string;
  position?: string;
};

type FloatingFood = {
  src: string;
  alt: string;
  className: string;
  entranceOrder: number;
};

const heroImages: HeroImage[] = [
  {
    thumbnail: "/images/hero-parallax/sucuk-egg-action.webp",
    position: "50% 45%",
  },
  {
    thumbnail: "/images/hero-parallax/balcony-full.webp",
    position: "50% 42%",
  },
  {
    thumbnail: "/images/hero-parallax/spread-close.webp",
    position: "48% 44%",
  },
  {
    thumbnail: "/images/hero-parallax/table-pisi.webp",
    position: "50% 46%",
  },
  {
    thumbnail: "/images/hero-parallax/historic-corner.webp",
    position: "50% 38%",
  },
  {
    thumbnail: "/images/hero-parallax/overhead-feast.webp",
    position: "50% 50%",
  },
  {
    thumbnail: "/images/hero-parallax/tea-tray.webp",
    position: "50% 48%",
  },
  {
    thumbnail: "/images/hero-parallax/kavurma-pan.webp",
    position: "50% 42%",
  },
  {
    thumbnail: "/images/hero-parallax/terrace-table.webp",
    position: "50% 42%",
  },
  {
    thumbnail: "/images/hero-parallax/overhead-classic.webp",
    position: "50% 50%",
  },
];

const floatingFoods: FloatingFood[] = [
  {
    src: "/images/hero-float/sucuk-egg-pan.webp",
    alt: "Bakır sahanda sucuklu yumurta",
    className: "hero-float-item hero-float-pan",
    entranceOrder: 2,
  },
  {
    src: "/images/hero-float/tea-glass.webp",
    alt: "İnce belli çay",
    className: "hero-float-item hero-float-tea",
    entranceOrder: 0,
  },
  {
    src: "/images/hero-float/simit-board.webp",
    alt: "Ahşap tabakta sıcak simit",
    className: "hero-float-item hero-float-simit",
    entranceOrder: 4,
  },
  {
    src: "/images/hero-float/omelette-plate.webp",
    alt: "Kahvaltı tabağı",
    className: "hero-float-item hero-float-omelette",
    entranceOrder: 3,
  },
  {
    src: "/images/hero-float/cheese-platter.webp",
    alt: "Van peynir tabağı",
    className: "hero-float-item hero-float-cheese-platter",
    entranceOrder: 1,
  },
  {
    src: "/images/hero-float/greens-platter.webp",
    alt: "Taze yeşillik tabağı",
    className: "hero-float-item hero-float-greens-platter",
    entranceOrder: 5,
  },
  {
    src: "/images/hero-float/black-olive-bowl.webp",
    alt: "Siyah zeytin kasesi",
    className: "hero-float-item hero-float-black-olives",
    entranceOrder: 6,
  },
  {
    src: "/images/hero-float/apricot-jam-bowl.webp",
    alt: "Kayısı reçeli kasesi",
    className: "hero-float-item hero-float-apricot-jam",
    entranceOrder: 8,
  },
];

const desktopOnlyFoods = new Set([
  "hero-float-item hero-float-omelette",
  "hero-float-item hero-float-black-olives",
  "hero-float-item hero-float-apricot-jam",
]);

export function VanHeroParallax() {
  const firstRow = heroImages.slice(0, 5);
  const secondRow = heroImages.slice(5, 10);

  return (
    <section
      id="home-hero"
      className="hero hero-parallax-dining"
      aria-label="Tarihi Van Kahvaltı Evi ana alanı"
    >
      <HeroMotionActivator />
      <div className="hero-parallax-sticky">
        <div className="hero-top-curtain" aria-hidden="true" />

        <div className="hero-parallax-copy">
          <div className="hero-copy-ambient-glow" aria-hidden="true" />
          <div className="hero-parallax-copy-motion">
            <div className="hero-provenance">
              <span className="hero-provenance-year">1978</span>
              <span className="hero-provenance-place">Beyoğlu · Aile sofrası</span>
            </div>
            <h1 className="hero-title-lockup">
              <span className="sr-only">Tarihi Van Kahvaltı Evi</span>
              <span className="hero-title-line hero-title-line-one" aria-hidden="true">
                <span className="hero-title-word" style={{ "--word-index": 0 } as CSSProperties}>Tarihi</span>{" "}
                <span className="hero-title-word" style={{ "--word-index": 1 } as CSSProperties}>Van</span>
              </span>
              <span className="hero-title-line hero-title-line-two" aria-hidden="true">
                <span className="hero-title-word" style={{ "--word-index": 2 } as CSSProperties}>Kahvaltı</span>{" "}
                <span className="hero-title-word" style={{ "--word-index": 3 } as CSSProperties}>Evi</span>
              </span>
            </h1>
            <p className="hero-intro">
              <span className="hero-intro-mobile">
                1978&apos;den beri Beyoğlu&apos;nda kurulan gerçek Van sofrası.
              </span>
              <span className="hero-intro-desktop">
                Van&apos;dan Beyoğlu&apos;na uzanan serpme kahvaltı: otlu peynir,
                kavut, murtuğa, sıcak bakır sahanlar ve sınırsız taze çay.
              </span>
            </p>
          </div>
        </div>

        <div
          className="hero-parallax-gallery"
          aria-hidden="true"
        >
          <HeroImageRow
            images={firstRow}
            reverse
            preloadCount={2}
          />
          <HeroImageRow
            images={secondRow}
            preloadCount={0}
          />
        </div>

        <div
          className="hero-parallax-food-stage"
          aria-hidden="true"
        >
          {floatingFoods.map((item) => {
            return (
              <div
                className={`${item.className}${desktopOnlyFoods.has(item.className) ? " hero-desktop-only" : ""}`}
                key={item.src}
                style={{
                  "--float-delay": `${120 + Math.min(item.entranceOrder, 6) * 88}ms`,
                  "--float-index": item.entranceOrder,
                } as CSSProperties}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 680px) 28vw, (max-width: 1080px) 26vw, 320px"
                  quality={82}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HeroImageRow({
  images,
  reverse = false,
  preloadCount = 0,
}: {
  images: HeroImage[];
  reverse?: boolean;
  preloadCount?: number;
}) {
  return (
    <div className={`hero-parallax-row ${reverse ? "is-reverse" : ""}`}>
      {images.map((image, index) => {
        const shouldPreload = index < preloadCount;

        return (
          <figure
            className="hero-parallax-card"
            key={image.thumbnail}
          >
            <Image
              src={image.thumbnail}
              alt=""
              fill
              sizes="(max-width: 420px) 32vw, (max-width: 680px) 40vw, (max-width: 1080px) 40vw, 32rem"
              preload={shouldPreload}
              fetchPriority={shouldPreload ? "high" : "auto"}
              loading={shouldPreload ? undefined : "lazy"}
              quality={74}
              style={{ objectPosition: image.position ?? "center" }}
            />
          </figure>
        );
      })}
    </div>
  );
}
