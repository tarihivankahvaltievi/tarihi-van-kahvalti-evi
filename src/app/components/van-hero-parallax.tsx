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
};

const heroImages: HeroImage[] = [
  {
    thumbnail: "/images/hero-parallax/sucuk-egg-action.jpg",
    position: "50% 45%",
  },
  {
    thumbnail: "/images/hero-parallax/balcony-full.jpg",
    position: "50% 42%",
  },
  {
    thumbnail: "/images/hero-parallax/spread-close.jpg",
    position: "48% 44%",
  },
  {
    thumbnail: "/images/hero-parallax/table-pisi.jpg",
    position: "50% 46%",
  },
  {
    thumbnail: "/images/hero-parallax/historic-corner.jpg",
    position: "50% 38%",
  },
  {
    thumbnail: "/images/hero-parallax/overhead-feast.jpg",
    position: "50% 50%",
  },
  {
    thumbnail: "/images/hero-parallax/tea-tray.jpg",
    position: "50% 48%",
  },
  {
    thumbnail: "/images/hero-parallax/kavurma-pan.jpg",
    position: "50% 42%",
  },
  {
    thumbnail: "/images/hero-parallax/terrace-table.jpg",
    position: "50% 42%",
  },
  {
    thumbnail: "/images/hero-parallax/overhead-classic.jpg",
    position: "50% 50%",
  },
  {
    thumbnail: "/images/hero-parallax/simit-table.jpg",
    position: "50% 44%",
  },
  {
    thumbnail: "/images/hero-parallax/hands-breakfast.jpg",
    position: "50% 45%",
  },
  {
    thumbnail: "/images/hero-parallax/terrace-plate.jpg",
    position: "50% 44%",
  },
  {
    thumbnail: "/images/hero-parallax/indoor-table.jpg",
    position: "50% 42%",
  },
  {
    thumbnail: "/images/hero-parallax/tea-service.jpg",
    position: "50% 46%",
  },
];

const floatingFoods: FloatingFood[] = [
  {
    src: "/images/hero-float/sucuk-egg-pan.png",
    alt: "Bakır sahanda sucuklu yumurta",
    className: "hero-float-item hero-float-pan",
  },
  {
    src: "/images/hero-float/tea-glass.png",
    alt: "İnce belli çay",
    className: "hero-float-item hero-float-tea",
  },
  {
    src: "/images/hero-float/simit-board.png",
    alt: "Ahşap tabakta sıcak simit",
    className: "hero-float-item hero-float-simit",
  },
  {
    src: "/images/hero-float/omelette-plate.png",
    alt: "Kahvaltı tabağı",
    className: "hero-float-item hero-float-omelette",
  },
  {
    src: "/images/hero-float/cheese-platter.png",
    alt: "Van peynir tabağı",
    className: "hero-float-item hero-float-cheese-platter",
  },
  {
    src: "/images/hero-float/greens-platter.png",
    alt: "Taze yeşillik tabağı",
    className: "hero-float-item hero-float-greens-platter",
  },
  {
    src: "/images/hero-float/black-olive-bowl.png",
    alt: "Siyah zeytin kasesi",
    className: "hero-float-item hero-float-black-olives",
  },
  {
    src: "/images/hero-float/cherry-jam-bowl.png",
    alt: "Vişne reçeli kasesi",
    className: "hero-float-item hero-float-cherry-jam",
  },
  {
    src: "/images/hero-float/apricot-jam-bowl.png",
    alt: "Kayısı reçeli kasesi",
    className: "hero-float-item hero-float-apricot-jam",
  },
  {
    src: "/images/hero-float/tahin-bowl.png",
    alt: "Tahin ve pekmez kasesi",
    className: "hero-float-item hero-float-jam",
  },
  {
    src: "/images/hero-float/tomato-slice.png",
    alt: "Taze domates dilimi",
    className: "hero-float-item hero-float-tomato",
  },
  {
    src: "/images/hero-float/mint-leaf.png",
    alt: "Taze nane yaprağı",
    className: "hero-float-item hero-float-mint",
  },
];

const mobileFloatingFoodClassNames = new Set([
  "hero-float-item hero-float-pan",
  "hero-float-item hero-float-tea",
  "hero-float-item hero-float-simit",
  "hero-float-item hero-float-omelette",
  "hero-float-item hero-float-tomato",
]);

const eagerFloatingFoodClassNames = new Set([
  "hero-float-item hero-float-tea",
  "hero-float-item hero-float-cheese-platter",
]);

const subscribeToMobileViewport = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(max-width: 679px)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getMobileViewportSnapshot = () =>
  window.matchMedia("(max-width: 679px)").matches;

export function VanHeroParallax() {
  const isMobile = useSyncExternalStore(
    subscribeToMobileViewport,
    getMobileViewportSnapshot,
    () => false,
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
    ? { stiffness: 74, damping: 31, mass: 1.05 }
    : { stiffness: 88, damping: 29, mass: 1 };
  const visibleFloatingFoods = isMobile
    ? floatingFoods.filter((item) => mobileFloatingFoodClassNames.has(item.className))
    : floatingFoods;
  
  // Smooth mouse values
  const smoothMouseX = useSpring(mouseX, { stiffness: 48, damping: 24 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 48, damping: 24 });

  // Map mouse positions to 3D rotation angles for premium desktop interactivity
  const rotateXMouse = useTransform(smoothMouseY, [-0.5, 0.5], [4.8, -4.8]);
  const rotateYMouse = useTransform(smoothMouseX, [-0.5, 0.5], [-5.2, 5.2]);

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], isMobile ? [-46, 82] : [-96, 164]),
    spring,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], isMobile ? [58, -92] : [108, -188]),
    spring,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.24], isMobile ? [3.2, 0] : [6, 0]),
    spring,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.24], isMobile ? [-1.8, 0] : [-3.2, 0]),
    spring,
  );
  const galleryY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.36, 1],
      isMobile ? [82, 12, -118] : [104, 78, 58]
    ),
    spring,
  );
  const galleryOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.18, 0.9, 1], [0.72, 1, 1, 0.68]),
    spring,
  );
  const floatingFoodY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? -24 : -36]),
    spring,
  );
  const foodScale = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.45, 0.75],
      isMobile ? [1, 1.04, 1.1] : [1, 1.08, 1.18],
    ),
    spring,
  );
  const foodOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.35, 0.65], [1, 0.9, 0]),
    spring,
  );

  // Copy parallax Y offset on scroll
  const copyY = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [0, isMobile ? -54 : -112]),
    spring,
  );

  // Copy opacity fade on scroll
  const copyOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 0.8, 0]),
    spring,
  );

  // Copy blur effect on scroll
  const copyBlurPx = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, prefersReducedMotion ? 0 : 3.5]),
    spring,
  );
  const copyFilter = useTransform(copyBlurPx, (v) => `blur(${v}px)`);

  const firstRow = heroImages.slice(0, 5);
  const secondRow = heroImages.slice(5, 10);
  const thirdRow = heroImages.slice(10, 15);

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
      aria-label="Tarihi Van Kahvaltıcısı ana alanı"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-parallax-sticky">
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
            <h1>
              Çay&nbsp;taze,
              <br />
              sofra
              <br />
              sıcak.
            </h1>
            <p>
              Otlu peynir, kavut, murtuğa ve bakır sahanlar. Van kahvaltısı
              burada aceleye gelmez.
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
            priorityCount={isMobile ? 1 : 2}
          />
          <HeroImageRow
            images={secondRow}
            translate={translateXReverse}
            enableHover={!isMobile}
            priorityCount={0}
          />
          {!isMobile && (
            <HeroImageRow images={thirdRow} translate={translateX} reverse enableHover priorityCount={0} />
          )}
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
          aria-label="Uçan kahvaltı lezzetleri"
        >
          {visibleFloatingFoods.map((item, index) => {
            const isEager = eagerFloatingFoodClassNames.has(item.className);

            return (
              <div
                className={item.className}
                key={item.src}
                style={{ "--float-delay": `${index * (isMobile ? 70 : 110)}ms` } as CSSProperties}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 680px) 28vw, (max-width: 1080px) 34vw, 360px"
                  priority={isEager}
                  loading={isEager ? "eager" : "lazy"}
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
  priorityCount = 0,
}: {
  images: HeroImage[];
  translate: MotionValue<number>;
  reverse?: boolean;
  enableHover?: boolean;
  priorityCount?: number;
}) {
  return (
    <div className={`hero-parallax-row ${reverse ? "is-reverse" : ""}`}>
      {images.map((image, index) => (
        <motion.figure
          className="hero-parallax-card"
          style={{ x: translate }}
          key={image.thumbnail}
          whileHover={enableHover ? { y: -8, scale: 1.01 } : undefined}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <Image
            src={image.thumbnail}
            alt=""
            fill
            sizes="(max-width: 680px) 40vw, (max-width: 1080px) 42vw, 30rem"
            priority={index < priorityCount}
            loading={index < priorityCount ? "eager" : "lazy"}
            style={{ objectPosition: image.position ?? "center" }}
          />
        </motion.figure>
      ))}
    </div>
  );
}
