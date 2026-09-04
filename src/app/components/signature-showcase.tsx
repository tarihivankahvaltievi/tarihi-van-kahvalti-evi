"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./signature-showcase.module.css";

interface TabData {
  id: string;
  name: string;
  nameEn: string;
  iconInactive: string;
  iconActive: string;
  plateImg: string;
  floating1: string;
  floating2: string;
  floating3: string;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  btnText: string;
  btnTextEn: string;
  btnHref: string;
}

const TABS: TabData[] = [
  {
    id: "royal-breakfast",
    name: "Royal Breakfast",
    nameEn: "Royal Breakfast",
    iconInactive: "/hamour/mi_tab-input-4-img-1.png",
    iconActive: "/hamour/mi_tab-input-4-img-2_1.png",
    plateImg: "/hamour/amr1_tab-1-content-img-1.png",
    floating1: "/hamour/amr2_section-3-tab-1-img-1.png",
    floating2: "/hamour/amr3_section-3-tab-1-img-2.png",
    floating3: "/hamour/amr4_section-3-tab-1-img-3_1.png",
    title: "Güne Hamour'da Başla!",
    titleEn: "Start the Day at Hamour!",
    desc: "Hamour’da yapılan kahvaltı, özenle seçilmiş malzemelerle hazırlanan özel lezzetlerle güne başlamak isteyenlere unutulmaz bir deneyim sunuyor. Sağlıklı, doyurucu ve zarif sunumlarıyla her damak zevkine hitap eden bu kahvaltı, gününüze taptaze bir dokunuş katıyor.",
    descEn: "Breakfast at Hamour offers an unforgettable experience for those who want to start the day with special delicacies prepared with carefully selected ingredients.",
    btnText: "Menü",
    btnTextEn: "Menu",
    btnHref: "/menu",
  },
  {
    id: "ana-yemekler",
    name: "Ana Yemekler",
    nameEn: "Main Courses",
    iconInactive: "/hamour/mi_tab-input-3-img-1.png",
    iconActive: "/hamour/mi_tab-input-3-img-2.png",
    plateImg: "/hamour/amr1_tab-2-content-img-1.png",
    floating1: "/hamour/amr2_section-3-tab-2-img-1.png",
    floating2: "/hamour/amr3_section-3-tab-2-img-2.png",
    floating3: "/hamour/amr4_section-3-tab-2-img-3.png",
    title: "Hamour Lezzetleriyle Tanışın!",
    titleEn: "Meet Hamour Delights!",
    desc: "Hamour’un mutfağında doğallık ve kalite buluşuyor. Organik ve taze ürünlerle hazırlanan ana yemeklerimiz, her lokmada sağlığı ve lezzeti bir araya getiriyor. Özenle seçilmiş malzemelerle hazırlanan bu özel menü, unutulmaz bir tat deneyimi sunuyor.",
    descEn: "Naturalness and quality meet in Hamour's kitchen. Our main courses prepared with organic and fresh products bring health and flavor together in every bite.",
    btnText: "Menü",
    btnTextEn: "Menu",
    btnHref: "/menu",
  },
  {
    id: "alkollu-icecekler",
    name: "Alkollü İçecekler",
    nameEn: "Alcoholic Drinks",
    iconInactive: "/hamour/mi_tab-input-1-img-1.png",
    iconActive: "/hamour/mi_tab-input-1-img-2.png",
    plateImg: "/hamour/amr1_tab-3-content-img-1.png",
    floating1: "/hamour/amr2_section-3-tab-3-img-1.png",
    floating2: "/hamour/amr3_section-3-tab-3-img-2.png",
    floating3: "/hamour/amr4_section-3-tab-3-img-3.png",
    title: "Her Yudumda Eşsiz Lezzet!",
    titleEn: "Unique Flavor in Every Sip!",
    desc: "Hamour’un alkollü içecek menüsü, dünya standartlarında kırmızı ve beyaz şaraplardan şampanyaya, özenle hazırlanan kokteyllerden özel viski çeşitlerine kadar geniş bir yelpaze sunuyor. Kaliteli ve seçkin içeceklerle, lezzet deneyiminizi en üst düzeye çıkarıyor; her damakta unutulmaz izler bırakıyoruz.",
    descEn: "Hamour's alcoholic beverage menu offers a wide range of world-class wines, champagne, craft cocktails and select spirits.",
    btnText: "Menü",
    btnTextEn: "Menu",
    btnHref: "/menu",
  },
  {
    id: "icecekler",
    name: "İçecekler",
    nameEn: "Beverages",
    iconInactive: "/hamour/mi_tab-input-2-img-1.png",
    iconActive: "/hamour/mi_tab-input-2-img-2.png",
    plateImg: "/hamour/amr1_tab-4-content-img-1.png",
    floating1: "/hamour/amr2_section-3-tab-4-img-1.png",
    floating2: "/hamour/amr3_section-3-tab-4-img-2.png",
    floating3: "/hamour/amr4_section-3-tab-4-img-3.png",
    title: "Hamour'da Her An Kutlamaya Değer!",
    titleEn: "Every Moment is Worth Celebrating at Hamour!",
    desc: "Hamour’un içecek menüsü, zengin çay çeşitleri, sağlıklı smoothie’ler ve eşsiz kahve seçenekleriyle her anınıza eşlik ediyor. Doğal aromalarla hazırlanan sıcak ve soğuk içeceklerimiz, her damak zevkine hitap eden keyifli bir deneyim sunuyor.",
    descEn: "Hamour's drink menu accompanies every moment with rich tea varieties, healthy smoothies, and distinct coffee choices.",
    btnText: "Menü",
    btnTextEn: "Menu",
    btnHref: "/menu",
  },
  {
    id: "patiseri",
    name: "Patiseri",
    nameEn: "Patisserie",
    iconInactive: "/hamour/mi_patisseria-beyaz_1.png",
    iconActive: "/hamour/mi_patisseria.png",
    plateImg: "/hamour/amr1_tab-5-content-img-1.png",
    floating1: "/hamour/amr2_section-3-tab-5-img-1.png",
    floating2: "/hamour/amr3_section-3-tab-5-img-2.png",
    floating3: "/hamour/amr4_section-3-tab-5-img-3.png",
    title: "Güne Anlam Katan Hamour Lezzetleri!",
    titleEn: "Hamour Delights Adding Meaning to the Day!",
    desc: "Hamour’un patiseri bölümü, günlük taze kruvasanlar, özenle hazırlanan ekmekler, pastalar ve tatlılarla lezzet dolu anlar sunuyor. Her biri özenle hazırlanan bu özel tatlar, Hamour’un zarif dokunuşlarıyla buluşarak, misafirlerimize Fransız esintili bir tatlı deneyimi yaşatıyor.",
    descEn: "Hamour's patisserie section offers moments full of flavor with daily fresh croissants, artisan breads, and pastries.",
    btnText: "Menü",
    btnTextEn: "Menu",
    btnHref: "/menu",
  },
  {
    id: "pasta",
    name: "Pasta",
    nameEn: "Cakes",
    iconInactive: "/hamour/mi_pasta-beyaz.png",
    iconActive: "/hamour/mi_pasta.png",
    plateImg: "/hamour/amr1_pasta-siparisi.png",
    floating1: "/hamour/amr2_pasta-siparisi-2.png",
    floating2: "/hamour/amr3_pasta-siparisi-3.png",
    floating3: "/hamour/amr4_pasta-siparisi-4.png",
    title: "Özel Günlere Anlam Katan Hamour Pastaları!",
    titleEn: "Hamour Cakes Adding Meaning to Special Days!",
    desc: "Hamour’un pasta bölümü, günlük taze hazırlanan pastaları, özenle seçilmiş malzemelerle tasarlanan özel tatlıları ve zarif sunumlarıyla unutulmaz anlara eşlik ediyor. Her biri titizlikle hazırlanan bu pastalar, Hamour’un zarif dokunuşlarıyla birleşerek misafirlerimize sadece bir tatlı değil, özel günlerini taçlandıracak Fransız esintili bir lezzet deneyimi sunuyor.",
    descEn: "Hamour's cake department accompanies unforgettable moments with fresh daily cakes and exquisite sweets.",
    btnText: "Sipariş Vermek İçin Ara",
    btnTextEn: "Call to Order",
    btnHref: "tel:+905320502717",
  },
];

export function SignatureShowcase({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";
  const [activeTab, setActiveTab] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) / 25;
      const y = (window.innerHeight / 2 - e.clientY) / 25;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const current = TABS[activeTab];

  return (
    <section className={styles.section3} id="hamour-menu-showcase">
      <div className={styles.container}>
        {/* Category Tabs */}
        <div className={styles.navGrid}>
          {TABS.map((tab, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                onClick={() => setActiveTab(idx)}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={(idx + 1) * 80}
              >
                <span className={styles.iconWrapper}>
                  <Image
                    src={tab.iconInactive}
                    alt=""
                    width={56}
                    height={48}
                    className={`${styles.iconImg} ${styles.iconInactive} ${isActive ? styles.iconHidden : ""}`}
                  />
                  <Image
                    src={tab.iconActive}
                    alt=""
                    width={56}
                    height={48}
                    className={`${styles.iconImg} ${styles.iconActive} ${isActive ? styles.iconVisible : ""}`}
                  />
                </span>
                <span className={styles.navText}>{isEn ? tab.nameEn : tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Pane */}
        <div className={styles.tabContentPane} key={current.id}>
          {/* Floating Ingredients Parallax */}
          <div
            className={`${styles.movingImg} ${styles.moving1}`}
            style={{
              transform: `translate(${-(mousePos.x * 2) / 10}px, ${-(mousePos.y * 2) / 10}px)`,
            }}
          >
            <Image
              src={current.floating1}
              alt=""
              width={160}
              height={160}
              className={styles.floatAsset}
            />
          </div>

          <div
            className={`${styles.movingImg} ${styles.moving2}`}
            style={{
              transform: `translate(${-(mousePos.x * 6) / 10}px, ${-(mousePos.y * 6) / 10}px)`,
            }}
          >
            <Image
              src={current.floating2}
              alt=""
              width={120}
              height={120}
              className={styles.floatAsset}
            />
          </div>

          <div
            className={`${styles.movingImg} ${styles.moving3}`}
            style={{
              transform: `translate(${-(mousePos.x * 4) / 10}px, ${-(mousePos.y * 4) / 10}px)`,
            }}
          >
            <Image
              src={current.floating3}
              alt=""
              width={140}
              height={140}
              className={styles.floatAsset}
            />
          </div>

          <div className={styles.contentRow}>
            {/* Dish Plate Column */}
            <div className={styles.plateCol}>
              <div
                className={styles.plateWrapper}
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                {/* Decorative concentric arch lines background */}
                <div className={styles.contourArch} aria-hidden="true" />
                <Image
                  src={current.plateImg}
                  alt={isEn ? current.titleEn : current.title}
                  width={520}
                  height={520}
                  className={styles.plateImg}
                  priority
                />
              </div>
            </div>

            {/* Article Column */}
            <div className={styles.articleCol}>
              <div
                className={styles.article}
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <h3 className={styles.articleTitle}>
                  {isEn ? current.titleEn : current.title}
                </h3>
                <p className={styles.articleDesc}>
                  {isEn ? current.descEn : current.desc}
                </p>
                <Link href={current.btnHref} className={styles.articleBtn}>
                  {isEn ? current.btnTextEn : current.btnText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
