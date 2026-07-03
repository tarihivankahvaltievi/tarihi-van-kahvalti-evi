import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMenuJsonLd,
  createPageMetadata,
  displayPhone,
  getSeoPage,
  jsonLd,
  mapsUrl,
  seoPages,
  siteName,
  siteUrl,
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
  const jsonLdGraph: unknown[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      headline: page.h1,
      description: page.description,
      inLanguage: "tr-TR",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
      },
      about: {
        "@id": `${siteUrl}/#restaurant`,
      },
      primaryImageOfPage: absoluteUrl(page.image),
    },
    buildBreadcrumbJsonLd([
      { name: "Ana Sayfa", url: siteUrl },
      { name: page.h1, url: pageUrl },
    ]),
    buildFaqJsonLd(page.questions),
  ];

  if (slug === "menu") {
    jsonLdGraph.push({ "@context": "https://schema.org", ...buildMenuJsonLd() });
  }

  return (
    <main className="seo-page theme-breakfast">
      {jsonLdGraph.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
        />
      ))}

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
            <a href={`tel:${displayPhone.replace(/\s/g, "")}`}>Ara</a>
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
