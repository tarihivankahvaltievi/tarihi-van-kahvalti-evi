import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMenuJsonLd,
  buildRestaurantJsonLd,
  buildWebsiteJsonLd,
  createPageMetadata,
  dateModified,
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
  const graph: unknown[] = [
    buildWebsiteJsonLd(false),
    buildRestaurantJsonLd(false),
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      headline: page.h1,
      description: page.description,
      inLanguage: "tr-TR",
      dateModified,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#restaurant`,
      },
      mainEntity: slug === "menu" ? { "@id": `${siteUrl}/menu#menu` } : { "@id": `${siteUrl}/#restaurant` },
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
      { name: "Ana Sayfa", url: siteUrl },
      { name: page.h1, url: pageUrl },
    ], pageUrl, false),
    buildFaqJsonLd(page.questions, pageUrl, false),
  ];

  if (slug === "menu") {
    graph.push(buildMenuJsonLd());
  }

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <main className="seo-page theme-breakfast">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(pageJsonLd) }}
      />

      <nav className="seo-topbar" aria-label="Sayfa navigasyonu">
        <Link href="/" className="seo-brand">
          <Image src="/images/brand-icon-small.png" alt="" width={38} height={48} />
          <span>{siteName}</span>
        </Link>
        <div className="seo-toplinks">
          <Link href="/menu">Menü</Link>
          <Link href="/iletisim">İletişim</Link>
          <Link href="/sss">SSS</Link>
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
              WhatsApp
            </a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Yol tarifi
            </a>
            <a href={telUrl}>Ara</a>
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
        <h2 id="quick-answer">Kısa cevap</h2>
        <ul>
          {page.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section className="seo-content-grid" aria-label={`${page.h1} detayları`}>
        {page.sections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="seo-faq-list" aria-labelledby="page-faq">
        <h2 id="page-faq">Merak edilenler</h2>
        {page.questions.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>

      <section className="seo-related" aria-label="İlgili sayfalar">
        <Link href="/van-kahvaltisi">Van kahvaltısı nedir?</Link>
        <Link href="/beyoglu-kahvalti">Beyoğlu kahvaltı</Link>
        <Link href="/taksim-kahvalti">Taksim kahvaltı</Link>
        <Link href="/kahvalti-fiyatlari">Kahvaltı fiyatları</Link>
        <Link href="/kafka-cafe">Kafka Cafe</Link>
      </section>
    </main>
  );
}
