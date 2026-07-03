import ClientPage from "./client-page";

const displayPhone = "+90 541 525 2868";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://tarihivankahvaltievi.com/#restaurant",
  name: "Tarihi Van Kahvaltı Evi",
  alternateName: "Tarihi Van Kahvaltıcısı",
  url: "https://tarihivankahvaltievi.com",
  image: [
    "https://tarihivankahvaltievi.com/images/hero-table.jpg",
    "https://tarihivankahvaltievi.com/images/breakfast-spread.jpg",
    "https://tarihivankahvaltievi.com/images/balcony-breakfast.jpg",
  ],
  description:
    "Beyoğlu Taksim'deki tarihi Rum binasında 1978'den beri süregelen geleneksel serpme Van kahvaltısı, otlu peynir, murtuğa, kavut ve Kafka Cafe kahve deneyimi.",
  servesCuisine: [
    "Van kahvaltısı",
    "Serpme kahvaltı",
    "Turkish breakfast",
    "Geleneksel Türk kahvaltısı",
    "Coffee",
  ],
  telephone: displayPhone,
  email: "info@tarihivankahvaltievi.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zambak Sk. No:8",
    addressLocality: "Beyoğlu",
    addressRegion: "İstanbul",
    postalCode: "34421",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0338,
    longitude: 28.9784,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "TRY",
  paymentAccepted: "Nakit, Kredi Kartı, Banka Kartı",
  acceptsReservations: true,
  hasMenu: {
    "@type": "Menu",
    name: "Tarihi Van Kahvaltı Evi Menüsü",
    description:
      "Serpme Van kahvaltısı, sahanda yumurtalar, murtuğa, kavut, kete ve Kafka Cafe kahveleri",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Serpme Kahvaltı",
        description: "Geleneksel Van serpme kahvaltı sofraları",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Geleneksel Van Kahvaltısı",
            description:
              "En az iki kişilik servis edilir. Yöresel otlu peynir, murtuğa, kavut, cacık, kete, süzme bal ve kaymak içerir.",
            offers: {
              "@type": "Offer",
              price: "450",
              priceCurrency: "TRY",
            },
          },
        ],
      },
      {
        "@type": "MenuSection",
        name: "Sıcaklar",
        description: "Bakır sahanda sıcak servisler",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Sahanda Sucuklu Yumurta",
            description:
              "Kasap sucuğu ve köy yumurtası ile hazırlanan sıcak lezzet.",
            offers: {
              "@type": "Offer",
              price: "180",
              priceCurrency: "TRY",
            },
          },
          {
            "@type": "MenuItem",
            name: "Murtuğa",
            description:
              "Van'a özgü, un, tereyağı ve yumurta ile hazırlanan geleneksel lezzet.",
          },
        ],
      },
      {
        "@type": "MenuSection",
        name: "Kafka Cafe",
        description: "Nitelikli kahve ve Türk kahvesi",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Geleneksel Türk Kahvesi",
            description:
              "Bakır cezvede közde ağır ağır pişen Türk kahvesi.",
          },
          {
            "@type": "MenuItem",
            name: "Sınırsız Çay",
            description:
              "Serpme kahvaltı eşliğinde ince belli bardakta taze demlenmiş Rize çayı.",
          },
        ],
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: "1200",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Murat Y.",
      },
      datePublished: "2026-03-15",
      reviewBody:
        "Taksim'in ortasında sakin bir Van sofrası. Tarihi atmosfer ve sıcak servis.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Ebru A.",
      },
      datePublished: "2026-05-10",
      reviewBody:
        "Kahvaltıdan sonra kalkmak istemiyorsun; Kafka Cafe sohbetin ikinci bölümü gibi.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
    },
  ],
  areaServed: [
    {
      "@type": "City",
      name: "İstanbul",
    },
    {
      "@type": "AdministrativeArea",
      name: "Beyoğlu",
    },
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Teras", value: true },
    { "@type": "LocationFeatureSpecification", name: "Balkon", value: true },
    {
      "@type": "LocationFeatureSpecification",
      name: "Tarihi bina",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Sınırsız çay",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Kafka Cafe",
      value: true,
    },
  ],
  foundingDate: "1978",
  sameAs: [
    "https://www.google.com/maps/search/?api=1&query=Tarihi%20Van%20Kahvalt%C4%B1%20Evi%20Zambak%20Sk.%20No%3A8%20Beyo%C4%9Flu",
  ],
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [
      ".hero-parallax-copy h1",
      ".story-copy h2",
      ".story-copy p",
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Van kahvaltısı nedir ve neler içerir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Van kahvaltısı, Türkiye'nin Van ilinin geleneksel serpme kahvaltısıdır. Otlu peynir, murtuğa (un, tereyağı ve yumurta karışımı), kavut (kavrulmuş un tatlısı), cacık, kete, süzme bal, kaymak, sahanda sucuklu yumurta ve sınırsız çay içerir. Tarihi Van Kahvaltı Evi'nde bu sofra bakır sahanlarda, en az iki kişilik servis edilir.",
      },
    },
    {
      "@type": "Question",
      name: "Tarihi Van Kahvaltı Evi çalışma saatleri nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tarihi Van Kahvaltı Evi her gün 08:00 - 18:00 saatleri arasında hizmet vermektedir. Haftanın 7 günü açıktır.",
      },
    },
    {
      "@type": "Question",
      name: "Fiyatlar ne kadar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Geleneksel Van Kahvaltısı kişi başı yaklaşık 450 TL'dir (en az 2 kişilik). Sahanda sucuklu yumurta 180 TL'dir. Serpme kahvaltı yanında sınırsız çay ücretsizdir. Kafka Cafe'de Türk kahvesi ve nitelikli kahve seçenekleri de mevcuttur.",
      },
    },
    {
      "@type": "Question",
      name: "Rezervasyon nasıl yapılır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rezervasyon için +90 541 525 2868 numaralı telefonu arayabilir veya WhatsApp üzerinden mesaj gönderebilirsiniz. Web sitemizden de online rezervasyon formu doldurabilirsiniz.",
      },
    },
    {
      "@type": "Question",
      name: "Tarihi Van Kahvaltı Evi nerede, nasıl gidilir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zambak Sk. No:8, Beyoğlu, İstanbul adresinde, Taksim Meydanı'na yürüme mesafesindedir. Tarihi 2. derece tescilli Rum binasında yer almaktadır. Taksim metrosu ve nostaljik tramvaydan kolayca ulaşılabilir.",
      },
    },
    {
      "@type": "Question",
      name: "Kafka Cafe nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kafka Cafe, Tarihi Van Kahvaltı Evi bünyesindeki kahve köşesidir. Bakır cezvede közde pişen geleneksel Türk kahvesi ve nitelikli üçüncü dalga kahve seçenekleri sunulmaktadır. Kahvaltı sonrası sohbeti uzatmak isteyenler için ideal bir mekandır.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ana Sayfa",
      item: "https://tarihivankahvaltievi.com",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ClientPage />
    </>
  );
}
