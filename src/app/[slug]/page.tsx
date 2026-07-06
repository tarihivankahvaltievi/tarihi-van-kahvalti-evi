import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  absoluteUrl,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildDirectionsHowToJsonLd,
  buildFaqJsonLd,
  buildGeoCoverageJsonLd,
  buildMenuJsonLd,
  buildRestaurantJsonLd,
  buildWebsiteJsonLd,
  createPageMetadata,
  dateModified,
  getPageLanguage,
  getSeoPage,
  jsonLd,
  mapsUrl,
  pageOgImagePath,
  seoPages,
  siteName,
  siteUrl,
  telUrl,
  whatsappUrl,
} from "../seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) {
    return {};
  }

  return createPageMetadata(page);
}

export default async function SeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) {
    notFound();
  }

  const pageUrl = absoluteUrl(page.slug);
  const pageLanguage = getPageLanguage(page);
  const isArabic = pageLanguage.startsWith("ar");
  const labels = pageLanguage.startsWith("ru")
    ? {
        nav: "Навигация",
        menu: "Меню",
        contact: "Контакты",
        faq: "FAQ",
        whatsapp: "WhatsApp",
        directions: "Маршрут",
        call: "Позвонить",
        quick: "Кратко",
        context: "Поисковый контекст",
        details: "Подробности",
        questions: "Вопросы",
        related: "Полезные страницы",
        home: "Главная",
      }
    : pageLanguage.startsWith("en")
      ? {
          nav: "Page navigation",
          menu: "Menu",
          contact: "Contact",
          faq: "FAQ",
          whatsapp: "WhatsApp",
          directions: "Directions",
          call: "Call",
          quick: "Quick answer",
          context: "Search context",
          details: "Details",
          questions: "Questions",
          related: "Related pages",
          home: "Home",
        }
      : isArabic
        ? {
            nav: "تنقل الصفحة",
            menu: "القائمة",
            contact: "التواصل",
            faq: "أسئلة",
            whatsapp: "واتساب",
            directions: "الاتجاهات",
            call: "اتصال",
            quick: "إجابة سريعة",
            context: "سياق البحث",
            details: "التفاصيل",
            questions: "أسئلة شائعة",
            related: "صفحات مفيدة",
            home: "الرئيسية",
          }
        : {
            nav: "Sayfa navigasyonu",
            menu: "Menü",
            contact: "İletişim",
            faq: "SSS",
            whatsapp: "WhatsApp",
            directions: "Yol tarifi",
            call: "Ara",
            quick: "Kısa cevap",
            context: "Yerel arama bağlamı",
            details: "Detaylar",
            questions: "Merak edilenler",
            related: "İlgili sayfalar",
            home: "Ana Sayfa",
          };
  const graph: unknown[] = [
    buildWebsiteJsonLd(false),
    buildRestaurantJsonLd(false),
    {
      "@type": page.schemaType ?? "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      headline: page.h1,
      description: page.description,
      inLanguage: pageLanguage,
      dateModified,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: [
        { "@id": `${siteUrl}/#restaurant` },
        { "@id": `${siteUrl}/#geo-search-coverage` },
      ],
      spatialCoverage: { "@id": `${siteUrl}/#geo-search-coverage` },
      mentions: [
        ...(page.nearbyLandmarks ?? []).map((landmark) => ({
          "@type": "Place",
          name: landmark,
        })),
        ...(page.localIntent ?? []).map((intent) => ({
          "@type": "Thing",
          name: intent,
        })),
      ],
      mainEntity:
        slug === "menu"
          ? { "@id": `${siteUrl}/menu#menu` }
          : slug === "sss"
            ? { "@id": `${pageUrl}#faq` }
            : { "@id": `${siteUrl}/#restaurant` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl(page.image),
        caption: page.imageAlt,
      },
      image: {
        "@type": "ImageObject",
        url: absoluteUrl(pageOgImagePath(page.slug)),
        width: 1200,
        height: 630,
        caption: page.imageAlt,
      },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    buildBreadcrumbJsonLd([
      { name: labels.home, url: siteUrl },
      { name: page.h1, url: pageUrl },
    ], pageUrl, false),
    buildGeoCoverageJsonLd(false),
    buildFaqJsonLd(page.questions, pageUrl, false),
  ];

  if (slug === "menu") {
    graph.push(buildMenuJsonLd());
  }

  if (slug === "kahvalti-yol-tarifi") {
    graph.push(buildDirectionsHowToJsonLd(false));
  }

  if (page.article) {
    graph.push(buildArticleJsonLd(page, pageUrl, false));
  }

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <main className="seo-page theme-breakfast" lang={pageLanguage} dir={isArabic ? "rtl" : undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(pageJsonLd) }}
      />

      <nav className="seo-topbar" aria-label={labels.nav}>
        <Link href="/" className="seo-brand">
          <Image src="/images/brand-icon-small.png" alt="" width={38} height={48} />
          <span>{siteName}</span>
        </Link>
        <div className="seo-toplinks">
          <Link href="/menu">{labels.menu}</Link>
          <Link href="/iletisim">{labels.contact}</Link>
          <Link href="/sss">{labels.faq}</Link>
        </div>
      </nav>

      <section className="seo-hero">
        <div className="seo-hero-copy">
          <span className="seo-eyebrow">{page.eyebrow}</span>
          <h1>{page.h1}</h1>
          {page.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="seo-actions">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              {labels.whatsapp}
            </a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              {labels.directions}
            </a>
            <a href={telUrl}>{labels.call}</a>
          </div>
        </div>
        <figure className="seo-hero-media">
          <Image
            src={page.image}
            alt={page.imageAlt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 44vw"
          />
        </figure>
      </section>

      <section className="seo-answer-box" aria-labelledby="quick-answer">
        <h2 id="quick-answer">{labels.quick}</h2>
        <ul>
          {page.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        {(page.localIntent?.length || page.nearbyLandmarks?.length) ? (
          <div className="seo-context-strip" aria-label={labels.context}>
            {page.localIntent?.map((intent) => (
              <span key={intent}>{intent}</span>
            ))}
            {page.nearbyLandmarks?.map((landmark) => (
              <span key={landmark}>{landmark}</span>
            ))}
          </div>
        ) : null}
      </section>

      <section className="seo-content-grid" aria-label={`${page.h1} ${labels.details}`}>
        {page.sections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="seo-faq-list" aria-labelledby="page-faq">
        <h2 id="page-faq">{labels.questions}</h2>
        {page.questions.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>

      <section className="seo-related" aria-label={labels.related}>
        <Link href="/van-kahvaltisi">Van kahvaltısı nedir?</Link>
        <Link href="/beyoglu-kahvalti">Beyoğlu kahvaltı</Link>
        <Link href="/taksim-kahvalti">Taksim kahvaltı</Link>
        <Link href="/kahvalti-fiyatlari">Kahvaltı fiyatları</Link>
        <Link href="/kafka-cafe">Kafka Cafe</Link>
        <Link href="/zambak-sokak-kahvalti">Zambak Sokak</Link>
        <Link href="/siraselviler-kahvalti">Sıraselviler</Link>
        <Link href="/tarihi-mekanda-kahvalti">Tarihi mekan</Link>
      </section>
    </main>
  );
}
