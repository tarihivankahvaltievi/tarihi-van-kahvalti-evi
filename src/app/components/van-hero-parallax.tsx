"use client";

import Image from "next/image";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { type CSSProperties, useRef, useSyncExternalStore } from "react";

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
  {
    thumbnail: "/images/hero-parallax/simit-table.webp",
    position: "50% 44%",
  },
  {
    thumbnail: "/images/hero-parallax/hands-breakfast.webp",
    position: "50% 45%",
  },
  {
    thumbnail: "/images/hero-parallax/terrace-plate.webp",
    position: "50% 44%",
  },
  {
    thumbnail: "/images/hero-parallax/indoor-table.webp",
    position: "50% 42%",
  },
  {
    thumbnail: "/images/hero-parallax/tea-service.webp",
    position: "50% 46%",
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
    src: "/images/hero-float/cherry-jam-bowl.webp",
    alt: "Vişne reçeli kasesi",
    className: "hero-float-item hero-float-cherry-jam",
    entranceOrder: 7,
  },
  {
    src: "/images/hero-float/apricot-jam-bowl.webp",
    alt: "Kayısı reçeli kasesi",
    className: "hero-float-item hero-float-apricot-jam",
    entranceOrder: 8,
  },
  {
    src: "/images/hero-float/tahin-bowl.webp",
    alt: "Tahin ve pekmez kasesi",
    className: "hero-float-item hero-float-jam",
    entranceOrder: 9,
  },
  {
    src: "/images/hero-float/tomato-slice.webp",
    alt: "Taze domates dilimi",
    className: "hero-float-item hero-float-tomato",
    entranceOrder: 10,
  },
  {
    src: "/images/hero-float/mint-leaf.webp",
    alt: "Taze nane yaprağı",
    className: "hero-float-item hero-float-mint",
    entranceOrder: 11,
  },
];

const eagerFloatingFoodClassNames = new Set([
  "hero-float-item hero-float-pan",
  "hero-float-item hero-float-tea",
  "hero-float-item hero-float-cheese-platter",
  "hero-float-item hero-float-apricot-jam",
  "hero-float-item hero-float-black-olives",
]);

const mobileFloatingFoodClassNames = new Set([
  "hero-float-item hero-float-pan",
  "hero-float-item hero-float-tea",
  "hero-float-item hero-float-simit",
  "hero-float-item hero-float-cheese-platter",
  "hero-float-item hero-float-greens-platter",
]);

const subscribeToMobileViewport = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(max-width: 680px)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getMobileViewportSnapshot = () =>
  window.matchMedia("(max-width: 680px)").matches;

export function VanHeroParallax() {
  const isMobile = useSyncExternalStore(
    subscribeToMobileViewport,
    getMobileViewportSnapshot,
    // Ship the smaller five-item scene in the initial HTML. Desktop enhances
    // after hydration; mobile avoids fetching decorative off-screen cutouts.
    () => true,
  );
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const spring = isMobile
    ? { stiffness: 92, damping: 30, mass: 1 }
    : { stiffness: 112, damping: 27, mass: 0.95 };
  
  // Smooth mouse values
  const smoothMouseX = useSpring(mouseX, { stiffness: 48, damping: 24 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 48, damping: 24 });

  // Map mouse positions to 3D rotation angles for premium desktop interactivity
  const rotateXMouse = useTransform(smoothMouseY, [-0.5, 0.5], [6.6, -6.6]);
  const rotateYMouse = useTransform(smoothMouseX, [-0.5, 0.5], [-7.2, 7.2]);
  const still = prefersReducedMotion;

  const translateX = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      still ? [0, 0] : isMobile ? [-58, 102] : [-132, 224],
    ),
    spring,
  );
  const translateXReverse = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      still ? [0, 0] : isMobile ? [72, -118] : [154, -246],
    ),
    spring,
  );
  const rotateX = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.26],
      still ? [0, 0] : isMobile ? [7, -0.8] : [14, -2.2],
    ),
    spring,
  );
  const rotateZ = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.26],
      still ? [0, 0] : isMobile ? [-3.2, 0.55] : [-7.2, 1.35],
    ),
    spring,
  );
  const galleryY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.36, 1],
      still ? [0, 0, 0] : isMobile ? [58, -4, -98] : [116, 72, 30],
    ),
    spring,
  );
  const galleryOpacity = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.16, 0.9, 1],
      still ? [1, 1, 1, 1] : [0.84, 1, 1, 0.72],
    ),
    spring,
  );
  const floatingFoodY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.28, 0.55, 0.82],
      still ? [0, 0, 0, 0] : isMobile ? [0, 180, 285, 340] : [0, 80, 132, 158],
    ),
    spring,
  );
  const foodScale = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.28, 0.55, 0.82],
      still ? [1, 1, 1, 1] : isMobile ? [1, 1.24, 1.38, 1.46] : [1, 1.16, 1.28, 1.34],
    ),
    spring,
  );
  const foodRotateX = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.28, 0.55, 0.82],
      still ? [0, 0, 0, 0] : isMobile ? [0, -3.8, -7.2, -8.4] : [0, -2.8, -5.2, -6.2],
    ),
    spring,
  );
  const foodOpacity = useSpring(
    useTransform(
      scrollYProgress,
      isMobile ? [0, 0.36, 0.58, 0.76] : [0, 0.55, 0.82, 0.94],
      still ? [1, 1, 1, 1] : isMobile ? [1, 0.98, 0.46, 0] : [1, 1, 0.76, 0],
    ),
    spring,
  );

  // Copy parallax Y offset on scroll
  const copyY = useSpring(
    useTransform(
      scrollYProgress,
      [0, isMobile ? 0.42 : 0.6],
      still ? [0, 0] : [0, isMobile ? -74 : -112],
    ),
    spring,
  );

  // Copy opacity fade on scroll
  const copyOpacity = useSpring(
    useTransform(
      scrollYProgress,
      isMobile ? [0, 0.22, 0.34] : [0, 0.35, 0.55],
      [1, isMobile ? 0.35 : still ? 0.7 : 0.8, 0],
    ),
    spring,
  );

  // Copy blur effect on scroll
  const copyBlurPx = useSpring(
    useTransform(
      scrollYProgress,
      [0, isMobile ? 0.32 : 0.5],
      [0, prefersReducedMotion ? 0 : 3.5],
    ),
    spring,
  );
  const copyFilter = useTransform(copyBlurPx, (v) => `blur(${v}px)`);

  const firstRow = heroImages.slice(0, 5);
  const secondRow = heroImages.slice(5, 10);
  const thirdRow = heroImages.slice(10, 15);
  const visibleFloatingFoods = isMobile
    ? floatingFoods.filter((item) => mobileFloatingFoodClassNames.has(item.className))
    : floatingFoods;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5; // [-0.5, 0.5]
    const y = (e.clientY - rect.top) / height - 0.5; // [-0.5, 0.5]
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="top"
      ref={ref}
      className="hero hero-parallax-dining"
      aria-label="Tarihi Van Kahvaltı Evi ana alanı"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-parallax-sticky">
        <div className="hero-top-curtain" aria-hidden="true" />

        <motion.div
          className="hero-parallax-copy"
        >
          <div className="hero-copy-ambient-glow" aria-hidden="true" />
          <motion.div
            style={{
              y: copyY,
              opacity: copyOpacity,
              filter: copyFilter,
            }}
          >
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
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-parallax-gallery"
          style={{
            rotateX,
            rotateZ,
            y: galleryY,
            opacity: galleryOpacity,
          }}
          aria-hidden="true"
        >
          <HeroImageRow
            images={firstRow}
            translate={translateX}
            reverse
            enableHover={!isMobile}
            preloadCount={isMobile ? 2 : 3}
          />
          <HeroImageRow
            images={secondRow}
            translate={translateXReverse}
            enableHover={!isMobile}
            preloadCount={isMobile ? 1 : 2}
          />
          {!isMobile && (
            <HeroImageRow images={thirdRow} translate={translateX} reverse enableHover preloadCount={0} />
          )}
        </motion.div>

        <motion.div
          className="hero-parallax-food-stage"
          style={{
            y: floatingFoodY,
            scale: foodScale,
            opacity: foodOpacity,
            rotateX: isMobile ? foodRotateX : rotateXMouse,
            rotateY: rotateYMouse,
            transformStyle: "preserve-3d",
          }}
          aria-hidden="true"
        >
          {visibleFloatingFoods.map((item) => {
            const shouldPreload = eagerFloatingFoodClassNames.has(item.className)
              && (!isMobile || mobileFloatingFoodClassNames.has(item.className));

            return (
              <div
                className={item.className}
                key={item.src}
                style={{
                  "--float-delay": `${(isMobile ? 120 : 90) + Math.min(item.entranceOrder, 6) * (isMobile ? 88 : 68)}ms`,
                  "--float-index": item.entranceOrder,
                } as CSSProperties}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 680px) 30vw, (max-width: 1080px) 26vw, 320px"
                  priority={shouldPreload}
                  fetchPriority={shouldPreload ? "high" : "auto"}
                  quality={82}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function HeroImageRow({
  images,
  translate,
  reverse = false,
  enableHover = true,
  preloadCount = 0,
}: {
  images: HeroImage[];
  translate: MotionValue<number>;
  reverse?: boolean;
  enableHover?: boolean;
  preloadCount?: number;
}) {
  return (
    <div className={`hero-parallax-row ${reverse ? "is-reverse" : ""}`}>
      {images.map((image, index) => {
        const shouldPreload = index < preloadCount;

        return (
          <motion.figure
            className="hero-parallax-card"
            style={{ x: translate }}
            key={image.thumbnail}
            whileHover={enableHover ? { y: -10, scale: 1.018, rotateZ: reverse ? -0.4 : 0.4 } : undefined}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={image.thumbnail}
              alt=""
              fill
              sizes="(max-width: 680px) 38vw, (max-width: 1080px) 40vw, 32rem"
              priority={shouldPreload}
              fetchPriority={shouldPreload ? "high" : "low"}
              quality={74}
              style={{ objectPosition: image.position ?? "center" }}
            />
          </motion.figure>
        );
      })}
    </div>
  );
}
