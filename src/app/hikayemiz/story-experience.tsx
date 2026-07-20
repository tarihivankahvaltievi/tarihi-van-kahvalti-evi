"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin, UtensilsCrossed } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { BookingOpenButton } from "../components/booking-open-button";
import styles from "./story-page.module.css";

const timeline = [
  {
    year: "18. yüzyılın sonu",
    title: "Bir Rum ailesinin evi",
    text: "Dönemin usta zanaatkârlarının izlerini taşıyan yapı; özgün motifleri, yüksek tavanları ve tarihi dokusuyla Beyoğlu'nun yaşayan hafızasının bir parçası oldu.",
  },
  {
    year: "1978",
    title: "Aile yolculuğumuz başladı",
    text: "Bu kıymetli yapı aile emeğiyle yeniden hayat buldu. Sofranın merkezine paylaşmayı, misafirperverliği ve Van'dan gelen tatları koyan yaklaşımımız o günden beri değişmedi.",
  },
  {
    year: "Bugün",
    title: "Üçüncü kuşak aynı mirası yaşatıyor",
    text: "İkinci derece tarihi eser statüsündeki mekânımızda sunulan her lezzet; geleneksel kültürün, samimi sofraların ve kuşaktan kuşağa aktarılan emeğin bir yansıması.",
  },
];

const tastes = ["Otlu peynir", "Bal & kaymak", "Van ketesi", "Murtuğa", "Kavut", "Demli çay"];

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0.72, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function StoryExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1]);
  const lineX = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <main id="main-content" className={styles.page}>
      <article>
        <section ref={heroRef} className={styles.hero} aria-labelledby="story-title">
          <div className={styles.heroCopy}>
            <motion.p
              className={styles.heroKicker}
              initial={reduceMotion ? false : { opacity: 0.72, x: -18 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              1978&apos;den beri bir aile sofrası
            </motion.p>
            <motion.h1
              id="story-title"
              initial={reduceMotion ? false : { opacity: 0.74, y: 26 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              Van&apos;ın sofrası,
              <span>Beyoğlu&apos;nun hafızasında.</span>
            </motion.h1>
            <motion.p
              className={styles.heroLead}
              initial={reduceMotion ? false : { opacity: 0.72, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              Geleneksel Van kahvaltısını, Taksim&apos;in tarihi atmosferi ve modern şehir yaşamıyla aynı masada
              buluşturduk. Burada kahvaltı yalnızca bir öğün değil; uzun sohbetlere açılan, kuşaktan kuşağa kalan
              bir buluşma biçimi.
            </motion.p>
            <motion.div
              className={styles.heroActions}
              initial={reduceMotion ? false : { opacity: 0.75, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.56, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link className={styles.primaryAction} href="/menu">
                <UtensilsCrossed size={18} aria-hidden="true" /> Menüyü keşfet
              </Link>
              <Link className={styles.textAction} href="/konum">
                Zambak Sokak&apos;ı bul <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          <div className={styles.heroMedia}>
            <motion.div
              className={styles.heroImage}
              style={{ y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1 : imageScale }}
            >
              <Image
                src="/images/historic-mirror.webp"
                alt="Tarihi Van Kahvaltı Evi'nin oymalı aynası, tuğla duvarı ve nostaljik iç mekânı"
                fill
                priority
                sizes="(max-width: 820px) 100vw, 48vw"
                quality={82}
              />
            </motion.div>
            <div className={styles.heroCaption}>
              <span>Tarihi Rum binası</span>
              <strong>Zambak Sokak No:8</strong>
            </div>
          </div>

          <motion.div className={styles.heroLine} style={{ x: reduceMotion ? 0 : lineX }} aria-hidden="true" />
          <a className={styles.scrollCue} href="#miras">
            Hikâyeyi keşfet <ArrowDown size={17} aria-hidden="true" />
          </a>
        </section>

        <section className={styles.openingStatement} aria-label="Hikâyemizin özü">
          <Reveal>
            <p>
              Geçmişin zarafetiyle şekillenen bu özel mekânda,
              <strong> lezzet ve tarih aynı masada buluşur.</strong>
            </p>
          </Reveal>
          <div className={styles.facts} aria-label="Tarihi Van Kahvaltı Evi kısa bilgiler">
            <div><strong>1978</strong><span>Aile yolculuğunun başlangıcı</span></div>
            <div><strong>3. kuşak</strong><span>Bugün mirası sürdüren aile</span></div>
            <div><strong>2. derece</strong><span>Tarihi eser statüsündeki yapı</span></div>
          </div>
        </section>

        <section id="miras" className={styles.heritage} aria-labelledby="heritage-title">
          <div className={styles.heritageIntro}>
            <Reveal>
              <p className={styles.chapterName}>Binanın hafızası</p>
              <h2 id="heritage-title">Bir evden, üç kuşaklık bir sofraya</h2>
              <p>
                Bu bina yalnızca duvarlardan ibaret değil. Beyoğlu&apos;nun farklı dönemlerine, bir ailenin emeğine ve
                her sabah yeniden kurulan sofralara tanıklık eden canlı bir miras.
              </p>
            </Reveal>
            <Reveal className={styles.heritageImage} delay={0.08}>
              <Image
                src="/images/interior-chair.webp"
                alt="Tarihi iç mekânda eski koltuk, ayna ve çevirmeli telefon"
                fill
                sizes="(max-width: 820px) calc(100vw - 2rem), 34vw"
                quality={82}
              />
            </Reveal>
          </div>

          <ol className={styles.timeline}>
            {timeline.map((item, index) => (
              <motion.li
                key={item.year}
                initial={reduceMotion ? false : { opacity: 0.72, x: 34 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.42 }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.timelineYear}>{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        <section className={styles.tableStory} aria-labelledby="table-title">
          <div className={styles.tableImageWrap}>
            <motion.div
              className={styles.tableImage}
              initial={reduceMotion ? false : { clipPath: "inset(7% 0 7% 0)" }}
              whileInView={reduceMotion ? undefined : { clipPath: "inset(0% 0 0% 0)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.84, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/breakfast-spread.webp"
                alt="Otlu peynir, sıcak sahanlar, pişi, reçeller ve çayla kurulan Van kahvaltısı sofrası"
                fill
                sizes="(max-width: 820px) 100vw, 52vw"
                quality={82}
              />
            </motion.div>
            <p className={styles.tableNote}>Sofra bekletmez; sıcaklar gelir, çay tazelenir, sohbet uzar.</p>
          </div>

          <Reveal className={styles.tableCopy}>
            <p className={styles.chapterName}>Van&apos;a özgü lezzetler</p>
            <h2 id="table-title">Geleneksel Van kahvaltısının en özel hâli</h2>
            <p>
              Otlu peynirden bal ve kaymağa, Van ketesinden sıcacık çaya uzanan soframız; doğal lezzetleri,
              özenle seçilen yöresel ürünleri ve samimi sunumuyla hazırlanır.
            </p>
            <p>
              Değişmeyen fikir basit: Kahvaltıyı tek tek tabaklardan oluşan hızlı bir öğün değil, masadaki herkesin
              paylaştığı uzun bir buluşma olarak yaşatmak.
            </p>
            <Link className={styles.inlineLink} href="/menu">
              Sofradaki lezzetleri görün <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>

          <ul className={styles.tasteLine} aria-label="Van sofrasından seçili lezzetler">
            {tastes.map((taste) => <li key={taste}>{taste}</li>)}
          </ul>
        </section>

        <section className={styles.placeStory} aria-labelledby="place-title">
          <div className={styles.placeCopy}>
            <Reveal>
              <p className={styles.chapterName}>Beyoğlu&apos;nun tarihi dokusu</p>
              <h2 id="place-title">Şehrin içinde huzurlu bir kaçış</h2>
              <p>
                Ahşap detaylar, doğal ışık ve tarihi mimari; Taksim&apos;in temposunu kapının dışında bırakabileceğiniz
                sıcak bir atmosfer kuruyor. Sabah Van kahvaltısıyla başlayan deneyim, gün boyunca kahve ve uzun
                sohbetlerle devam ediyor.
              </p>
              <p>
                Zambak Sokak&apos;taki masalarımız sakin bir kahvaltı, dostlarla buluşma ya da şehrin kalabalığından
                kısa bir mola için Beyoğlu&apos;nun en özel duraklarından biri.
              </p>
              <Link className={styles.inlineLink} href="/konum">
                <MapPin size={17} aria-hidden="true" /> Konum ve yol tarifi
              </Link>
            </Reveal>
          </div>
          <div className={styles.placeGallery}>
            <Reveal className={styles.placeImageMain}>
              <Image
                src="/images/street-table.webp"
                alt="Zambak Sokak'a açılan kahvaltı masaları ve servis anı"
                fill
                sizes="(max-width: 820px) 68vw, 34vw"
                quality={82}
              />
            </Reveal>
            <Reveal className={styles.placeImageSmall} delay={0.1}>
              <Image
                src="/images/terrace-tea.webp"
                alt="Tarihi atmosferde ince belli bardakta çay servisi"
                fill
                sizes="(max-width: 820px) 42vw, 20vw"
                quality={82}
              />
            </Reveal>
          </div>
        </section>

        <section className={styles.coffeeStory} aria-labelledby="coffee-title">
          <div className={styles.coffeeImage}>
            <Image
              src="/images/coffee-moment.webp"
              alt="Kafka Cafe'de tarihi iç mekânda dostlarla Türk kahvesi keyfi"
              fill
              sizes="(max-width: 820px) 100vw, 46vw"
              quality={82}
            />
          </div>
          <Reveal className={styles.coffeeCopy}>
            <p className={styles.coffeeMark}>Kafka Cafe</p>
            <h2 id="coffee-title">Kahve tutkunları için özel bir atmosfer</h2>
            <p>
              Aromatik espresso bazlı içeceklerden soğuk kahvelere uzanan menümüz, tarihi dokunun sıcaklığıyla
              modern kahve kültürünü bir araya getiriyor.
            </p>
            <p>
              Burası yalnızca bir kahve noktası değil; uzun sohbetlerin, sakin çalışma anlarının ve huzurlu
              buluşmaların adresi. Günün temposuna kısa bir ara vermek için kendinize bir masa seçin.
            </p>
          </Reveal>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.closingImage} aria-hidden="true">
            <Image src="/images/hands-table.webp" alt="" fill sizes="100vw" quality={80} />
          </div>
          <div className={styles.closingShade} aria-hidden="true" />
          <Reveal className={styles.closingCopy}>
            <p>Lezzet, nostalji ve uzun sohbetlerle dolu özel bir deneyim…</p>
            <h2 id="closing-title">Hikâyemizde size de bir yer ayıralım.</h2>
            <div className={styles.closingActions}>
              <BookingOpenButton className={styles.lightAction}>Rezervasyon yap</BookingOpenButton>
              <Link className={styles.outlineAction} href="/menu">Menüyü incele</Link>
            </div>
          </Reveal>
        </section>
      </article>
    </main>
  );
}
