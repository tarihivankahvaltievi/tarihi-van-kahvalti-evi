"use client";

import Image from "next/image";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { type CSSProperties, useRef } from "react";

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

export function VanHeroParallax() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const spring = { stiffness: 160, damping: 32, mass: 0.7 };
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-110, 190]),
    spring,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [120, -220]),
    spring,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.22], [12, 0]),
    spring,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.22], [-7, 0]),
    spring,
  );
  const galleryY = useSpring(
    useTransform(scrollYProgress, [0, 0.36, 1], [110, 82, 56]),
    spring,
  );
  const galleryOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.18, 0.9, 1], [0.72, 1, 1, 0.68]),
    spring,
  );
  const floatingFoodY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -28]),
    spring,
  );

  const firstRow = heroImages.slice(0, 5);
  const secondRow = heroImages.slice(5, 10);
  const thirdRow = heroImages.slice(10, 15);

  return (
    <section
      id="top"
      ref={ref}
      className="hero hero-parallax-dining"
      aria-label="Tarihi Van Kahvaltıcısı ana alanı"
    >
      <div className="hero-parallax-sticky">
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
          <HeroImageRow images={thirdRow} translate={translateX} reverse />
        </motion.div>

        <motion.div
          className="hero-parallax-food-stage"
          style={{ y: floatingFoodY }}
          aria-label="Uçan kahvaltı lezzetleri"
        >
          {floatingFoods.map((item, index) => (
            <div
              className={item.className}
              key={item.src}
              style={{ "--float-delay": `${index * 140}ms` } as CSSProperties}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 680px) 52vw, (max-width: 1080px) 34vw, 360px"
                priority={index < 4}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HeroImageRow({
  images,
  translate,
  reverse = false,
}: {
  images: HeroImage[];
  translate: MotionValue<number>;
  reverse?: boolean;
}) {
  return (
    <div className={`hero-parallax-row ${reverse ? "is-reverse" : ""}`}>
      {images.map((image, index) => (
        <motion.figure
          className="hero-parallax-card"
          style={{ x: translate }}
          key={image.thumbnail}
          whileHover={{ y: -12, scale: 1.015 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <Image
            src={image.thumbnail}
            alt=""
            fill
            sizes="(max-width: 680px) 64vw, (max-width: 1080px) 42vw, 30rem"
            priority={index < 2}
            style={{ objectPosition: image.position ?? "center" }}
          />
        </motion.figure>
      ))}
    </div>
  );
}
