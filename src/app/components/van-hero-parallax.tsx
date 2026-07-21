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
import { type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { messagesFor, type SiteLocale } from "../home-localization";

type HeroImage = {
  thumbnail: string;
  position?: string;
};

type FloatingFood = {
  src: string;
  altKey: "pan" | "tea" | "simit" | "omelette" | "cheese" | "greens" | "olives" | "jam";
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
    altKey: "pan",
    className: "hero-float-item hero-float-pan",
    entranceOrder: 2,
  },
  {
    src: "/images/hero-float/tea-glass.webp",
    altKey: "tea",
    className: "hero-float-item hero-float-tea",
    entranceOrder: 0,
  },
  {
    src: "/images/hero-float/simit-board.webp",
    altKey: "simit",
    className: "hero-float-item hero-float-simit",
    entranceOrder: 4,
  },
  {
    src: "/images/hero-float/omelette-plate.webp",
    altKey: "omelette",
    className: "hero-float-item hero-float-omelette",
    entranceOrder: 3,
  },
  {
    src: "/images/hero-float/cheese-platter.webp",
    altKey: "cheese",
    className: "hero-float-item hero-float-cheese-platter",
    entranceOrder: 1,
  },
  {
    src: "/images/hero-float/greens-platter.webp",
    altKey: "greens",
    className: "hero-float-item hero-float-greens-platter",
    entranceOrder: 5,
  },
  {
    src: "/images/hero-float/black-olive-bowl.webp",
    altKey: "olives",
    className: "hero-float-item hero-float-black-olives",
    entranceOrder: 6,
  },
  {
    src: "/images/hero-float/apricot-jam-bowl.webp",
    altKey: "jam",
    className: "hero-float-item hero-float-apricot-jam",
    entranceOrder: 8,
  },
];

const subscribeToMobileViewport = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(max-width: 680px)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getMobileViewportSnapshot = () =>
  window.matchMedia("(max-width: 680px)").matches;

export function VanHeroParallax({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const isMobile = useSyncExternalStore(
    subscribeToMobileViewport,
    getMobileViewportSnapshot,
    // Ship the smaller five-item scene in the initial HTML. Desktop enhances
    // after hydration; mobile avoids fetching decorative off-screen cutouts.
    () => true,
  );
  const prefersReducedMotion = useReducedMotion();
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

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
      ref={ref}
      className={`hero hero-parallax-dining hero-locale-${locale}${isHeroVisible ? " hero-is-visible" : ""}`}
      aria-label={messages.hero.aria}
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
              <span
                className="hero-provenance-year"
                aria-label={locale === "en"
                  ? `${messages.hero.yearSuffix} ${messages.hero.year}`
                  : `${messages.hero.year}${messages.hero.yearSuffix}`}
              >
                <strong aria-hidden="true">{messages.hero.year}</strong>
                <small aria-hidden="true">{messages.hero.yearSuffix}</small>
              </span>
              <span className="hero-provenance-place">{messages.hero.place}</span>
            </div>
            <h1 className="hero-title-lockup">
              <span className="hero-title-line hero-title-line-one">
                {messages.hero.titleLineOne}{" "}
                <span className="hero-title-accent">{messages.hero.titleAccent}</span>
              </span>
              <span className="hero-title-line hero-title-line-two">
                {messages.hero.titleLineTwo}
              </span>
            </h1>
            <p className="hero-intro">
              {messages.hero.intro}
            </p>
          </motion.div>
        </motion.div>

        {isMobile ? (
          <figure className="hero-mobile-scene">
            <Image
              src="/images/breakfast-spread.webp"
              alt={messages.hero.sceneAlt}
              fill
              sizes="100vw"
              quality={82}
              loading="eager"
              fetchPriority="high"
            />
          </figure>
        ) : (
          <>
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
              <HeroImageRow images={firstRow} translate={translateX} reverse />
              <HeroImageRow images={secondRow} translate={translateXReverse} />
            </motion.div>

            <motion.div
              className="hero-parallax-food-stage"
              style={{
                y: floatingFoodY,
                scale: foodScale,
                opacity: foodOpacity,
                rotateX: rotateXMouse,
                rotateY: rotateYMouse,
                transformStyle: "preserve-3d",
              }}
              aria-hidden="true"
            >
              {floatingFoods.map((item) => (
                <div
                  className={item.className}
                  key={item.src}
                  style={{
                    "--float-delay": `${90 + Math.min(item.entranceOrder, 6) * 68}ms`,
                    "--float-index": item.entranceOrder,
                  } as CSSProperties}
                >
                  <Image
                    src={item.src}
                    alt={messages.hero.floatingAlts[item.altKey]}
                    fill
                    sizes="(max-width: 1080px) 26vw, 320px"
                    quality={item.src.endsWith("/sucuk-egg-pan.webp") ? 75 : 70}
                    loading={item.src.endsWith("/sucuk-egg-pan.webp") ? "eager" : "lazy"}
                    fetchPriority={item.src.endsWith("/sucuk-egg-pan.webp") ? "high" : "auto"}
                  />
                </div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

function HeroImageRow({
  images,
  translate,
  reverse = false,
  enableHover = true,
}: {
  images: HeroImage[];
  translate: MotionValue<number>;
  reverse?: boolean;
  enableHover?: boolean;
}) {
  return (
    <div className={`hero-parallax-row ${reverse ? "is-reverse" : ""}`}>
      {images.map((image, index) => {
        const isPrimaryImage = index === 0;
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
              quality={65}
              loading={isPrimaryImage ? "eager" : "lazy"}
              fetchPriority={isPrimaryImage ? "high" : "auto"}
              style={{ objectPosition: image.position ?? "center" }}
            />
          </motion.figure>
        );
      })}
    </div>
  );
}
