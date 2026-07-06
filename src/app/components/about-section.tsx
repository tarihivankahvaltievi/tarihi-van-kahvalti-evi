"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll animations for desktop parallax image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Soft parallax translation for the image frame
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-8%", "8%"]
  );

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="story"
      ref={sectionRef}
      className="about-section-wrap"
      aria-label="Tarihi Van Kahvaltıcısı Hakkımızda Bölümü"
    >
      {/* Background ambient lighting/elements */}
      <div className="about-ambient-glow" aria-hidden="true" />
      <div className="about-grid-pattern" aria-hidden="true" />

      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        {/* Column 1: Narrative */}
        <motion.div className="about-col about-narrative" variants={itemVariants}>
          <span className="about-tag-pill">Hikayemiz</span>
          <h2 className="about-title">Eski usul hazırlanır, sofrada uzun uzun yaşanır.</h2>
          
          <div className="about-description">
            <p>
              Tarihi Rum binasının sakin dokusunda, 1978&apos;den beri gelen aile emeğini Van
              kahvaltısının cömertliğiyle aynı sofrada buluşturuyoruz.
            </p>
            <p className="desktop-only">
              Burada kahvaltı aceleye gelmez. Bakır sahanlar masaya tek tek yerleşir,
              çay tazelenir, sohbet kendine yer açar; eski binanın ruhu her tabakta
              usulca hissedilir.
            </p>
          </div>

          {/* Quick stats row for both desktop & mobile */}
          <div className="about-stats-row">
            <div className="about-stat-item">
              <span className="about-stat-val">1978</span>
              <span className="about-stat-lbl">Aile İşletmesi</span>
            </div>
            <div className="about-stat-divider" aria-hidden="true" />
            <div className="about-stat-item">
              <span className="about-stat-val">2. Derece</span>
              <span className="about-stat-lbl">Tarihi Rum Eseri</span>
            </div>
          </div>
        </motion.div>

        {/* Column 2: Visual Frame (Hidden on Mobile for height optimization) */}
        <motion.div className="about-col about-visual-col desktop-only" variants={itemVariants}>
          <div className="about-image-frame">
            <motion.div className="about-image-parallax-container" style={{ y: imageY }}>
              <Image
                src="/images/interior-chair.jpg"
                alt="Tarihi Rum binasının yaşanmış iç mekan köşesi"
                fill
                sizes="(max-width: 1024px) 30vw, 380px"
                loading="lazy"
                className="about-parallax-img"
              />
            </motion.div>
            <div className="about-image-inner-border" />
          </div>
        </motion.div>

        {/* Column 3: Philosophy / Pillars (Hidden on Mobile for height optimization) */}
        <motion.div className="about-col about-philosophy-col desktop-only" variants={containerVariants}>
          <div className="about-pillars-list">
            <motion.div className="about-pillar-item" variants={itemVariants}>
              <div className="about-pillar-num">01</div>
              <div className="about-pillar-content">
                <h3>Zamansız Sofra</h3>
                <p>Bakır sahanların masaya tek tek yerleştiği, aceleye gelmeyen ve demli çayların eşlik ettiği bir sofra kültürü.</p>
              </div>
            </motion.div>

            <motion.div className="about-pillar-item" variants={itemVariants}>
              <div className="about-pillar-num">02</div>
              <div className="about-pillar-content">
                <h3>Tarihi Doku</h3>
                <p>Beyoğlu&apos;nun kalbindeki iki asırlık taş Rum binasının sakin, yaşanmış atmosferi ve ahşap kokusu.</p>
              </div>
            </motion.div>

            <motion.div className="about-pillar-item" variants={itemVariants}>
              <div className="about-pillar-num">03</div>
              <div className="about-pillar-content">
                <h3>Üçüncü Kuşak</h3>
                <p>Köklü bir aile işletmesi olarak, geleneksel Van kahvaltısını samimiyet ve özenle geleceğe taşıyoruz.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
