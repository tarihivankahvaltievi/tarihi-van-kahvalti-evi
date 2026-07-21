import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BookOpen, MapPin, UtensilsCrossed } from "lucide-react";
import ClientPage from "../client-page";
import { AnimatedFooter } from "../components/animated-footer";
import styles from "./culture-guide.module.css";
import { vanBreakfastSources as sources } from "../content-sources";
import {
  absoluteUrl,
  breakfastCultureUrl,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  jsonLd,
  mapsUrl,
  siteName,
  siteUrl,
} from "../seo";

const pageTitle = "Van Kahvaltısı Nedir? İçindekiler ve Sofra Kültürü";
const pageDescription =
  "Van kahvaltısı nedir, içinde neler olur? Otlu peynir, murtuğa, kavut, cacık ve gül reçelini; süt evlerinden bugüne sofra kültürüyle keşfedin.";

const cultureFaqItems = [
  {
    question: "Van kahvaltısı nedir?",
    answer:
      "Van kahvaltısı, Van'a özgü yöresel ürünlerin aynı paylaşım sofrasında buluştuğu geleneksel bir kahvaltı kültürüdür. Van otlu peyniri, murtuğa, Van kavut, cacık, kaymak, tereyağı, bal, gül reçeli ve yumurtalı sıcaklar temel ürünler arasındadır.",
  },
  {
    question: "Van kahvaltısında neler bulunur?",
    answer:
      "TÜRKPATENT'in 504 numaralı tescil belgesinde Van otlu peyniri, murtuğa, Van kavut, kaymak, tereyağı, bal, gül reçeli, cacık ve yumurtayla hazırlanan yiyecekler temel bileşenler olarak sıralanır. Çay, süt, zeytin, tahin-pekmez, çörek ve ekmek çeşitleri de sofraya eşlik edebilir.",
  },
  {
    question: "Van kahvaltısının tarihi nereye dayanır?",
    answer:
      "Resmî tescil metni, geleneği sabah dükkânını açan Van esnafının evine dönmeden şehirde kahvaltı etmesine dayandırır. İlk 'süt evi' 1947'de açılmış, bu dükkânlar zamanla kahvaltı salonlarına dönüşmüştür.",
  },
  {
    question: "Van kahvaltısı ile serpme kahvaltı aynı şey mi?",
    answer:
      "Tam olarak aynı değildir. Serpme kahvaltı, küçük tabakların masada paylaşılmasını anlatan bir servis biçimidir. Van kahvaltısı ise kendine özgü yöresel ürünleri, sıcakları ve tarihsel süt evi geleneği olan belirli bir sofra kültürüdür.",
  },
  {
    question: "Murtuğa ile kavut arasındaki fark nedir?",
    answer:
      "Murtuğa; tereyağında kavrulan una yumurta eklenerek sıcak servis edilir. Van kavut ise geleneksel tanımında sütle işlenmiş Tir buğdayı unu ile tereyağının kavrulmasına dayanır; üzerine bal, pekmez veya gül reçeli eklenebilir.",
  },
  {
    question: "Van kahvaltısı coğrafi işaretli midir?",
    answer:
      "Evet. Van Kahvaltısı, Van Yüzüncü Yıl Üniversitesi adına 504 tescil numarasıyla 16 Temmuz 2020 tarihinde mahreç işareti olarak tescil edilmiştir. Van otlu peyniri, murtuğa ve Van kavutun da ayrı coğrafi işaret kayıtları vardır.",
  },
] as const;

const tableElements = [
  {
    name: "Van otlu peyniri",
    role: "Sofranın tuzlu omurgası",
    description:
      "Başta koyun sütü olmak üzere süt ile sirmo, heliz, mendo ve yabani nane gibi yöresel otların buluştuğu, olgunlaştırılmış aromatik peynir.",
    source: sources.herbCheese,
    sourceLabel: "Kültür Portalı kaydı",
  },
  {
    name: "Murtuğa",
    role: "Yumurtalı sıcak",
    description:
      "Tereyağında pembeleştirilen una çırpılmış yumurta eklenerek pişirilen, tavadan sıcak gelen doyurucu Van lezzeti.",
    source: sources.murtuga,
    sourceLabel: "Geleneksel mutfak kaydı",
  },
  {
    name: "Van kavutu",
    role: "Buğdayın tok aroması",
    description:
      "Tescilli tarifte sütle işlenmiş Tir buğdayından elde edilen unun tereyağıyla kavrulmasına dayanır; bal, pekmez veya gül reçeliyle yenebilir.",
    source: sources.kavutRegistration,
    sourceLabel: "Tescil No. 390",
  },
  {
    name: "Van cacığı",
    role: "Serin ve otlu eşlikçi",
    description:
      "Çökelek ya da süzme yoğurdun dereotu, sivri biber, kişniş ve tercihe göre taze soğanla karıştırıldığı yoğun kıvamlı kahvaltılık.",
    source: sources.vanBreakfast,
    sourceLabel: "Tescil No. 504",
  },
  {
    name: "Bal, kaymak ve tereyağı",
    role: "Sofranın süt ve yayla izi",
    description:
      "Balın aroması, dinlendirilmiş sütün yüzeyinden alınan kaymak ve tereyağı; çörekten ekmeğe uzanan tatlı eşleşmeleri kurar.",
    source: sources.vanBreakfast,
    sourceLabel: "Tescil No. 504",
  },
  {
    name: "Gül reçeli",
    role: "Kokulu tatlı katman",
    description:
      "Tescil metninde Van'da yetişen kokulu Rosa damascena çeşitleriyle ilişkilendirilen, kaymak ve kavutla da eşleşen yöresel reçel.",
    source: sources.vanBreakfast,
    sourceLabel: "Tescil No. 504",
  },
  {
    name: "Yumurtalı sahanlar",
    role: "Masaya son anda gelen sıcaklar",
    description:
      "Sahanda ya da haşlanmış yumurta, menemen, sucuklu veya kavurmalı yumurta gibi çeşitler kahvaltının sıcak ritmini kurar.",
    source: sources.vanBreakfast,
    sourceLabel: "Tescil No. 504",
  },
  {
    name: "Çay ve hamur işleri",
    role: "Sofranın süresi",
    description:
      "Demli çay paylaşımın ritmini korur; çörek, kete, ekmek, pide ve lavaş gibi eşlikçiler tatlı ile tuzlu arasında köprü olur.",
    source: sources.vanBreakfast,
    sourceLabel: "Tescil No. 504",
  },
] as const;

const timeline = [
  {
    year: "1947",
    title: "İlk süt evi",
    text: "Resmî tescil kaydına göre Van'da ilk süt evi açıldı; sıcak süt, yöresel ürünler ve sabah esnafının ortak sofrası yeni bir kent alışkanlığına dönüştü.",
  },
  {
    year: "1978",
    title: "Aile yolculuğumuz",
    text: "Tarihi Van Kahvaltı Evi'nin aile emeğiyle süren hikâyesi başladı. Bugün aynı hafıza Beyoğlu'ndaki masalarda yaşamaya devam ediyor.",
  },
  {
    year: "2020",
    title: "Mahreç işareti",
    text: "Van Kahvaltısı, 504 tescil numarasıyla mahreç işareti olarak kayda geçti; temel ürünleri ve ayırt edici sofra düzeni resmî belgede tanımlandı.",
  },
  {
    year: "Bugün",
    title: "Beyoğlu'nda aynı paylaşım",
    text: "Yöresel ürünlerin, sıcak sahanların ve eksilmeyen çayın çevresinde kurulan sofra; acele etmeyen kahvaltı geleneğini İstanbul'da sürdürüyor.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: breakfastCultureUrl },
  openGraph: {
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    url: breakfastCultureUrl,
    siteName,
    locale: "tr_TR",
    type: "article",
    images: [
      {
        url: absoluteUrl("/images/og/van-kahvaltisi.jpg"),
        width: 1200,
        height: 630,
        alt: "Yukarıdan görülen otlu peynir, sıcak sahanlar ve çayla kurulu Van kahvaltısı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    images: [absoluteUrl("/images/og/van-kahvaltisi.jpg")],
  },
};

export default function VanBreakfastCulturePage() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "WebPage",
        "@id": `${breakfastCultureUrl}#webpage`,
        url: breakfastCultureUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${siteUrl}/#website` },
        publisher: { "@id": `${siteUrl}/#restaurant` },
        about: [
          { "@type": "Thing", name: "Van kahvaltısı", sameAs: sources.vanBreakfast },
          { "@type": "Thing", name: "Van otlu peyniri", sameAs: sources.herbCheese },
          { "@type": "Thing", name: "Murtuğa", sameAs: sources.murtugaRegistration },
          { "@type": "Thing", name: "Van kavutu", sameAs: sources.kavutRegistration },
        ],
        dateModified: "2026-07-20",
        citation: Object.values(sources),
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/og/van-kahvaltisi.jpg"),
          width: 1200,
          height: 630,
        },
      },
      buildBreadcrumbJsonLd(breakfastCultureUrl, "Van kahvaltısı nedir?", false),
      buildFaqJsonLd(cultureFaqItems, breakfastCultureUrl, false),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageJsonLd) }} />
      <ClientPage>
        <main id="main-content" className={styles.page}>
          <article>
            <header className={styles.hero}>
              <div className={styles.heroCopy}>
                <p className={styles.kicker}>Van sofrasının açık rehberi</p>
                <h1>
                  Van kahvaltısı <span>nedir?</span>
                </h1>
                <p className={styles.heroLead}>
                  Bir tabak listesinden fazlası: süt evlerinden bugüne uzanan, yöresel ürünleri aynı masada
                  buluşturan ve çay bitene kadar süren bir paylaşım kültürü.
                </p>
                <div className={styles.heroActions}>
                  <a className={styles.primaryAction} href="#kisa-cevap">
                    1 dakikada öğren <ArrowDown size={17} aria-hidden="true" />
                  </a>
                  <Link className={styles.secondaryAction} href="/menu#geleneksel-van-kahvaltisi">
                    Güncel soframızı gör <UtensilsCrossed size={17} aria-hidden="true" />
                  </Link>
                </div>
                <p className={styles.reviewed}>
                  Tarihi Van Kahvaltı Evi mutfak rehberi <span aria-hidden="true">·</span> Son gözden geçirme:
                  {" "}<time dateTime="2026-07-20">20 Temmuz 2026</time>
                </p>
              </div>
              <figure className={styles.heroVisual}>
                <Image
                  src="/images/hero-parallax/overhead-feast.webp"
                  alt="Otlu peynir, yumurtalı sıcaklar, reçeller ve çayla kurulu Van kahvaltısı sofrası"
                  fill
                  priority
                  sizes="(max-width: 880px) 100vw, 52vw"
                  quality={82}
                />
                <figcaption>
                  <span>Van sofrası</span>
                  Tatlı, tuzlu ve sıcak tabaklar aynı paylaşım düzeninde buluşur.
                </figcaption>
              </figure>
            </header>

            <nav className={styles.articleNav} aria-label="Van kahvaltısı rehberi bölümleri">
              <div>
                <strong>Bu rehberde</strong>
                <a href="#kisa-cevap">Kısa cevap</a>
                <a href="#tarih">Tarihi</a>
                <a href="#sofrada-neler-var">İçindekiler</a>
                <a href="#murtuga-kavut">Murtuğa ve kavut</a>
                <a href="#sorular">Sorular</a>
              </div>
            </nav>

            <section id="kisa-cevap" className={styles.answer} aria-labelledby="answer-title">
              <div className={styles.answerLabel}>
                <BookOpen size={20} aria-hidden="true" />
                <span>En kısa tanım</span>
              </div>
              <div className={styles.answerCopy}>
                <h2 id="answer-title">Van kahvaltısı nedir?</h2>
                <p>
                  Van kahvaltısı, resmî tescil metninde Van&apos;a özgü yöresel ürünlerden oluşan zengin bir
                  kahvaltı türü olarak tanımlanır. Onu sıradan bir serpme kahvaltıdan ayıran; Van otlu peyniri,
                  murtuğa, Van kavut, cacık, gül reçeli ve yöresel bal-kaymak gibi ürünlerin aynı paylaşım
                  sofrasında buluşmasıdır.
                </p>
                <a href={sources.vanBreakfast} target="_blank" rel="noopener noreferrer">
                  TÜRKPATENT, Van Kahvaltısı tescil belgesi No. 504
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </section>

            <section id="tarih" className={styles.history} aria-labelledby="history-title">
              <header className={styles.sectionHeading}>
                <h2 id="history-title">Süt evinden uzun sofralara</h2>
                <p>
                  Van kahvaltısının şehir hayatındaki hikâyesi sabah erkenden dükkânını açan esnafla başlar.
                  Bizim aile yolculuğumuz da bu geleneğin İstanbul&apos;daki izine 1978&apos;de katılır.
                </p>
              </header>
              <ol className={styles.timeline}>
                {timeline.map((item) => (
                  <li key={item.year}>
                    <time>{item.year}</time>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <figure className={styles.interlude}>
              <Image
                src="/images/hero-parallax/spread-close.webp"
                alt="Bakır sahanlar, peynirler ve çay bardaklarıyla Van kahvaltısı masası"
                fill
                sizes="100vw"
                quality={80}
              />
              <figcaption>
                <strong>Tek bir yıldız yoktur.</strong>
                Van sofrasının karakterini tabakların birbirine eşlik etmesi belirler.
              </figcaption>
            </figure>

            <section id="sofrada-neler-var" className={styles.elements} aria-labelledby="elements-title">
              <header className={styles.sectionHeading}>
                <h2 id="elements-title">Van kahvaltısında neler var?</h2>
                <p>
                  Aşağıdaki temel ürünler resmî tescil kaydı ve Kültür Portalı kaynakları temel alınarak
                  açıklanmıştır. Restoranımızdaki güncel içerik ve bulunabilirlik için canlı menü esas alınmalıdır.
                </p>
              </header>
              <dl className={styles.elementList}>
                {tableElements.map((item) => (
                  <div key={item.name}>
                    <dt>
                      <span>{item.role}</span>
                      {item.name}
                    </dt>
                    <dd>
                      <span>{item.description}</span>
                      <a href={item.source} target="_blank" rel="noopener noreferrer">
                        {item.sourceLabel} <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className={styles.menuNote}>
                Rehber geleneksel çerçeveyi anlatır. Bugün masaya gelen ürünler, porsiyonlar ve fiyatlar için
                {" "}<Link href="/menu">güncel Van kahvaltısı menüsünü</Link> inceleyin.
              </p>
            </section>

            <section id="murtuga-kavut" className={styles.comparison} aria-labelledby="comparison-title">
              <div className={styles.comparisonIntro}>
                <h2 id="comparison-title">Murtuğa ile kavut aynı şey mi?</h2>
                <p>
                  Hayır. İkisi de tavada sıcak hazırlanır ve un–tereyağı birlikteliğini taşır; fakat yumurta,
                  kullanılan buğday ve sofradaki tat rolleri onları birbirinden ayırır.
                </p>
              </div>
              <div className={styles.comparisonTable} role="region" aria-label="Murtuğa ve kavut karşılaştırması" tabIndex={0}>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Özellik</th>
                      <th scope="col">Murtuğa</th>
                      <th scope="col">Van kavutu</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Temel yapı</th>
                      <td>Un, tereyağı ve yumurta</td>
                      <td>İşlenmiş Tir buğdayı unu ve tereyağı</td>
                    </tr>
                    <tr>
                      <th scope="row">Yumurta</th>
                      <td>Tarifin ayırt edici parçası</td>
                      <td>Geleneksel tescil tarifinde yok</td>
                    </tr>
                    <tr>
                      <th scope="row">Tat yönü</th>
                      <td>Tuzlu, yumurtalı ve yoğun</td>
                      <td>Buğday aromalı; bal veya gül reçeliyle tatlıya açılır</td>
                    </tr>
                    <tr>
                      <th scope="row">Servis</th>
                      <td colSpan={2}>Bakır tavadan sıcak, masadaki herkesle paylaşılır</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.comparisonSources}>
                <a href={sources.murtugaRegistration} target="_blank" rel="noopener noreferrer">
                  Murtuğa tescili No. 243 <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <a href={sources.kavutRegistration} target="_blank" rel="noopener noreferrer">
                  Van kavut tescili No. 390 <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </section>

            <section className={styles.serviceMeaning} aria-labelledby="service-meaning-title">
              <div>
                <p className={styles.scriptWord}>Paylaşmak</p>
                <h2 id="service-meaning-title">Van kahvaltısı ile serpme kahvaltı aynı şey değildir.</h2>
              </div>
              <div>
                <p>
                  <strong>Serpme kahvaltı</strong>, küçük tabakların masaya yayılıp ortaklaşa yenmesini anlatan
                  bir servis biçimidir. <strong>Van kahvaltısı</strong> ise Van&apos;la özdeşleşmiş ürünleri, sıcak
                  sahanları ve süt evi geçmişi olan belirli bir mutfak kültürünü anlatır.
                </p>
                <p>
                  Bu yüzden bir Van sofrasını yalnız tabak sayısıyla değil; otlu peynirden kavuta uzanan ürün
                  kimliği, sıcakların gelişi ve çayın sohbet boyunca tazelenmesiyle tanımak gerekir.
                </p>
              </div>
            </section>

            <section className={styles.visit} aria-labelledby="visit-title">
              <figure>
                <Image
                  src="/images/hands-table.webp"
                  alt="Tarihi Van Kahvaltı Evi'nde ortak tabaklardan kahvaltı eden misafirler"
                  fill
                  sizes="(max-width: 800px) 100vw, 48vw"
                  quality={80}
                />
              </figure>
              <div>
                <h2 id="visit-title">Geleneği Beyoğlu&apos;nda tadın.</h2>
                <p>
                  Rehberi okudunuz; şimdi yöresel lezzetleri bakır sahanlar ve demli çay eşliğinde aynı masada
                  keşfedin. Tarihi Van Kahvaltı Evi, Taksim ve İstiklal Caddesi&apos;ne yürüme mesafesindeki Zambak
                  Sokak&apos;ta her gün 08.00–18.00 arasında açıktır.
                </p>
                <div className={styles.visitActions}>
                  <Link className={styles.lightAction} href="/menu#geleneksel-van-kahvaltisi">
                    Menü ve güncel fiyatlar <UtensilsCrossed size={17} aria-hidden="true" />
                  </Link>
                  <a className={styles.outlineLightAction} href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    Google Haritalar&apos;da aç <MapPin size={17} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>

            <section id="sorular" className={styles.faqSection} aria-labelledby="faq-title">
              <header className={styles.sectionHeading}>
                <h2 id="faq-title">Van kahvaltısı hakkında kısa cevaplar</h2>
                <p>Tanım, içerik, tarih, servis biçimi ve coğrafi işaret hakkında en çok aranan sorular.</p>
              </header>
              <div className={styles.faqList}>
                {cultureFaqItems.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <aside className={styles.sources} aria-labelledby="sources-title">
              <div>
                <h2 id="sources-title">Kaynaklar ve içerik notu</h2>
                <p>
                  Bu rehber, resmî tescil ve kamu kültür envanteri kayıtları karşılaştırılarak hazırlanmıştır.
                  Tarif öğretmekten çok ürünleri ve sofra kültürünü doğru terimlerle tanıtmayı amaçlar.
                </p>
              </div>
              <ul>
                <li><a href={sources.vanBreakfast} target="_blank" rel="noopener noreferrer">TÜRKPATENT — Van Kahvaltısı, tescil No. 504</a></li>
                <li><a href={sources.herbCheese} target="_blank" rel="noopener noreferrer">T.C. Kültür Portalı — Van Otlu Peyniri</a></li>
                <li><a href={sources.murtuga} target="_blank" rel="noopener noreferrer">T.C. Kültür Portalı — Murtuğa</a></li>
                <li><a href={sources.kavutRegistration} target="_blank" rel="noopener noreferrer">TÜRKPATENT — Van Kavut, tescil No. 390</a></li>
              </ul>
            </aside>
          </article>
        </main>
        <AnimatedFooter />
      </ClientPage>
    </>
  );
}
