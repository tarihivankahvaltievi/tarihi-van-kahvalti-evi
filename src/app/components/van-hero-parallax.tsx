"use client";

import Image from "next/image";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { type CSSProperties, useRef } from "react";

type HeroImage = {
  title: string;
  eyebrow: string;
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
    title: "Bakır sahanda sıcak servis",
    eyebrow: "Sıcaklar",
    thumbnail: "/images/hero-parallax/sucuk-egg-action.jpg",
    position: "50% 45%",
  },
  {
    title: "Balkonda Van sofrası",
    eyebrow: "Beyoğlu",
    thumbnail: "/images/hero-parallax/balcony-full.jpg",
    position: "50% 42%",
  },
  {
    title: "Otlu peynir ve Van balı",
    eyebrow: "Serpme",
    thumbnail: "/images/hero-parallax/spread-close.jpg",
    position: "48% 44%",
  },
  {
    title: "Pişi, reçel ve sahanda yumurta",
    eyebrow: "Geleneksel",
    thumbnail: "/images/hero-parallax/table-pisi.jpg",
    position: "50% 46%",
  },
  {
    title: "Tarihi binada kahve molası",
    eyebrow: "Mekan",
    thumbnail: "/images/hero-parallax/historic-corner.jpg",
    position: "50% 38%",
  },
  {
    title: "Kalabalık sofralar",
    eyebrow: "Paylaşım",
    thumbnail: "/images/hero-parallax/overhead-feast.jpg",
    position: "50% 50%",
  },
  {
    title: "Sınırsız demli çay",
    eyebrow: "Çay",
    thumbnail: "/images/hero-parallax/tea-tray.jpg",
    position: "50% 48%",
  },
  {
    title: "Kavut ve sıcak tabaklar",
    eyebrow: "Van Lezzeti",
    thumbnail: "/images/hero-parallax/kavurma-pan.jpg",
    position: "50% 42%",
  },
  {
    title: "Teras masası",
    eyebrow: "Açık Hava",
    thumbnail: "/images/hero-parallax/terrace-table.jpg",
    position: "50% 42%",
  },
  {
    title: "Klasik kahvaltı düzeni",
    eyebrow: "İmza",
    thumbnail: "/images/hero-parallax/overhead-classic.jpg",
    position: "50% 50%",
  },
  {
    title: "Simit ve çay",
    eyebrow: "Sabah",
    thumbnail: "/images/hero-parallax/simit-table.jpg",
    position: "50% 44%",
  },
  {
    title: "Masa başında servis",
    eyebrow: "Özen",
    thumbnail: "/images/hero-parallax/hands-breakfast.jpg",
    position: "50% 45%",
  },
  {
    title: "Balkon tabağı",
    eyebrow: "Manzara",
    thumbnail: "/images/hero-parallax/terrace-plate.jpg",
    position: "50% 44%",
  },
  {
    title: "Tarihi iç mekan",
    eyebrow: "Rum Binası",
    thumbnail: "/images/hero-parallax/indoor-table.jpg",
    position: "50% 42%",
  },
  {
    title: "İnce belli bardaklar",
    eyebrow: "Ritüel",
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

type VanHeroParallaxProps = {
  onOpenBooking: () => void;
};

export function VanHeroParallax({ onOpenBooking }: VanHeroParallaxProps) {
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
    useTransform(scrollYProgress, [0, 0.36, 1], [86, 10, -16]),
    spring,
  );
  const galleryOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.18, 0.9, 1], [0.58, 1, 1, 0.55]),
    spring,
  );
  const copyY = useSpring(
    useTransform(scrollYProgress, [0, 0.72], [0, -40]),
    spring,
  );
  const copyOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.68, 0.92], [1, 1, 0]),
    spring,
  );
  const floatingFoodY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -34]),
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
          className="hero-parallax-copy"
          style={{ y: copyY, opacity: copyOpacity }}
          data-reveal
        >
          <div className="hero-kicker">
            <span>Beyoğlu</span>
            <span>Rum binasında</span>
            <span>08.00-18.00</span>
          </div>

          <h1>
            Van kahvaltısı <span>sofraya</span> dönüşür.
          </h1>

          <div className="hero-bottom">
            <div className="hero-actions">
              <a className="red-cta" href="#menu">
                Menüyü İncele <ArrowRight size={16} />
              </a>
              <button type="button" className="ghost-cta" onClick={onOpenBooking}>
                Masa Ayırt <ArrowRight size={15} />
              </button>
            </div>

            <p>
              Otlu peynir, hakiki Van balı, sıcak pişi, bakır sahanlar ve
              sınırsız demli çay. Beyoğlu&apos;nun tarihi dokusunda cömert bir sabah
              ritüeli.
            </p>
          </div>

          <div className="hero-proof" aria-label="Mekan özellikleri">
            <span>
              <strong>1978</strong>
              Aile geleneği
            </span>
            <span>
              <strong>2. derece</strong>
              Tarihi yapı
            </span>
            <span>
              <strong>Sınırsız</strong>
              Demli çay
            </span>
          </div>
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

        <div className="hero-parallax-badge hero-parallax-badge-hours">
          <Clock3 size={16} />
          <span>Her gün 08.00-18.00</span>
        </div>
        <div className="hero-parallax-badge hero-parallax-badge-place">
          <MapPin size={16} />
          <span>Zambak Sk. No:8, Beyoğlu</span>
        </div>
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
          <figcaption>
            <span>{image.eyebrow}</span>
            <strong>{image.title}</strong>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
