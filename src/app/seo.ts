export const siteUrl = "https://www.tarihivankahvaltievi.com";
export const siteName = "Tarihi Van Kahvaltı Evi";
export const alternateName = "Tarihi Van Kahvaltı Evi 1978";
export const englishUrl = `${siteUrl}/en`;

export const homeTitle = "Van Kahvaltıcısı İstanbul | Tarihi Van Kahvaltı Evi";
export const homeDescription =
  "İstanbul Beyoğlu Taksim'de geleneksel Van kahvaltısı: otlu peynir, murtuğa, kavut, sıcak sahanlar ve sınırsız çay. Menü, konum ve rezervasyon.";
export const homeOgDescription =
  "Beyoğlu Taksim'de geleneksel Van kahvaltısı; güncel menü, açık adres, yol tarifi ve rezervasyon bilgileri.";

export const displayPhone = "+90 541 525 2868";
export const phoneE164 = "+905415252868";
export const telUrl = `tel:${phoneE164}`;
export const email = "info@tarihivankahvaltievi.com";
export const foundingDate = "1978";
export const defaultOgImagePath = "/images/og/home.jpg";
export const defaultOgImage = `${siteUrl}${defaultOgImagePath}`;

export const address = {
  streetAddress: "Zambak Sk. No:8",
  neighborhood: "Şehit Muhtar Mahallesi",
  locality: "Beyoğlu",
  region: "İstanbul",
  postalCode: "34435",
  country: "TR",
  countryName: "Türkiye",
};

export const displayAddress = `${address.streetAddress}, ${address.neighborhood}, ${address.locality}, ${address.region} ${address.postalCode}`;

export const coordinates = {
  latitude: 41.0367655,
  longitude: 28.9829478,
};

export const openingHours = {
  opens: "08:00",
  closes: "18:00",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  short: "Her gün 08:00 - 18:00",
};

// Doğrudan doğrulanmış Google Maps işletme kaydı (CID), genel arama sonucu değil.
export const mapsUrl =
  "https://www.google.com/maps?cid=10380797280962926014";
export const whatsappUrl =
  "https://wa.me/905415252868?text=Merhaba%2C%20Tarihi%20Van%20Kahvalt%C4%B1%20Evi%20i%C3%A7in%20rezervasyon%20bilgisi%20almak%20istiyorum.";
export const instagramUrl = "https://www.instagram.com/tarihivankahvaltievi/";

export const sameAsUrls = [
  mapsUrl,
  instagramUrl,
];

export const cuisine = [
  "Van kahvaltısı",
  "Serpme kahvaltı",
  "Geleneksel Türk kahvaltısı",
  "Van breakfast",
  "Traditional Turkish breakfast",
];

export const faqItems = [
  {
    question: "Beyoğlu'nda Van kahvaltısı nerede yenir?",
    answer: `${siteName}, ${displayAddress} adresinde hizmet veren bir Van kahvaltıcısıdır. Taksim Meydanı ve İstiklal Caddesi'nden yürüyerek ulaşılabilir.`,
  },
  {
    question: "Van kahvaltısı nedir ve neler içerir?",
    answer:
      "Van kahvaltısı, otlu peynir, murtuğa, kavut, cacık, kete, süzme bal, kaymak ve sınırsız çay gibi yöresel ürünlerle hazırlanan zengin bir serpme kahvaltıdır.",
  },
  {
    question: "Tarihi Van Kahvaltı Evi nerede?",
    answer: `${siteName}, ${displayAddress} adresindedir; Taksim Meydanı ve İstiklal Caddesi'ne yürüme mesafesindedir.`,
  },
  {
    question: "Çalışma saatleri nedir?",
    answer: `${siteName} haftanın 7 günü 08:00 - 18:00 saatleri arasında hizmet verir.`,
  },
  {
    question: "Rezervasyon nasıl yapılır?",
    answer: `Rezervasyon ve güncel yoğunluk bilgisi için ${displayPhone} numarasını arayabilir veya WhatsApp üzerinden mesaj gönderebilirsiniz.`,
  },
  {
    question: "Serpme Van kahvaltısı fiyatı ne kadar?",
    answer:
      "Serpme Van kahvaltısı en az iki kişilik servis edilir. Güncel kişi başı fiyatı ve diğer ürün fiyatlarını, ziyaret öncesinde güncellenen menü sayfasından kontrol edebilirsiniz.",
  },
  {
    question: "Taksim metrodan nasıl gidilir?",
    answer:
      "M2 Taksim durağından Sıraselviler yönüne çıkıp Zambak Sokak'a yürüyerek kısa sürede ulaşabilirsiniz. İlk kez gelecek misafirler Google Haritalar bağlantısından rota alabilir.",
  },
  {
    question: "Serpme Van kahvaltısı en az kaç kişilik servis edilir?",
    answer:
      "Serpme Van kahvaltısı en az iki kişilik servis edilir. Kalabalık masa ve hafta sonu ziyaretleri için önceden telefon veya WhatsApp üzerinden bilgi almak önerilir.",
  },
  {
    question: "Aile ve kalabalık gruplar için uygun mu?",
    answer:
      "Aile kahvaltıları, arkadaş buluşmaları ve uzun sohbetli grup sofraları için uygundur. Kalabalık gruplarda masa uygunluğunu önceden teyit etmek iyi olur.",
  },
  {
    question: "Kafka Cafe nedir?",
    answer:
      "Kafka Cafe, Tarihi Van Kahvaltı Evi içinde yer alan kahve köşesidir; Türk kahvesi ve nitelikli kahve seçenekleri sunar.",
  },
] as const;

export const searchLandingPaths = [
  "/istanbul-van-kahvaltisi",
  "/van-kahvaltisi",
  "/beyoglu-kahvalti",
  "/taksim-kahvalti",
  "/serpme-van-kahvaltisi",
  "/serpme-kahvalti-beyoglu",
  "/istiklal-caddesi-kahvalti",
  "/cihangir-kahvalti",
  "/galata-kahvalti",
  "/aile-kahvaltisi-beyoglu",
  "/grup-kahvaltisi",
  "/hafta-sonu-kahvalti",
  "/kahvalti-rezervasyon",
  "/kahvalti-yol-tarifi",
  "/zambak-sokak-kahvalti",
  "/siraselviler-kahvalti",
  "/kahvalti-fiyatlari",
  "/van-otlu-peynir",
  "/murtuga-kavut",
  "/tarihi-mekanda-kahvalti",
  "/kahvalti-sonrasi-kahve",
  "/vejetaryen-kahvalti-beyoglu",
  "/beyoglu-kahvalti-mekanlari",
  "/taksim-brunch-kahvalti",
] as const;

// Yalnız bilinen eski URL'ler en yakın gerçek içeriğe tek adımda taşınır.
// Bilinmeyen URL'ler gerçek 404 kalır; site geneli wildcard yönlendirme yapılmaz.
export const legacyRedirects = [
  ...searchLandingPaths.map((source) => ({ source, destination: "/" })),
  { source: "/iletisim", destination: "/konum" },
  { source: "/sss", destination: "/#faq" },
  { source: "/kafka-cafe", destination: "/menu#turk-kahvesi" },
  { source: "/turkish-breakfast-istanbul", destination: "/en" },
  { source: "/breakfast-near-taksim", destination: "/en" },
  { source: "/zavtrak-taksim-stambul", destination: "/" },
  { source: "/arabic-breakfast-taksim", destination: "/" },
];

export const localSeoFacts = [
  {
    label: "Açık adres",
    value: `${displayAddress}. Taksim Meydanı ve İstiklal Caddesi'nden yürüyerek ulaşılabilir.`,
    href: mapsUrl,
    linkLabel: "Google Haritalar'da aç",
  },
  {
    label: "Van kahvaltısı",
    value: "Otlu peynir, murtuğa, kavut, kete, bal-kaymak, sıcak sahanlar ve sınırsız çayla serpme sofra.",
    href: "/menu",
    linkLabel: "Menüyü gör",
  },
  {
    label: "Ziyaret saatleri",
    value: `${openingHours.short}; hafta sonu ve kalabalık gruplar için önceden bilgi almak önerilir.`,
    href: telUrl,
    linkLabel: "İşletmeyi ara",
  },
];

export function absoluteUrl(path = "") {
  if (!path) return siteUrl;
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildWebsiteJsonLd(withContext = true) {
  const data = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    alternateName,
    url: siteUrl,
    inLanguage: "tr-TR",
    publisher: { "@id": `${siteUrl}/#restaurant` },
  };
  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildHomeWebPageJsonLd(withContext = true) {
  const data = {
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: siteUrl,
    name: homeTitle,
    description: homeOgDescription,
    inLanguage: "tr-TR",
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: { "@id": `${siteUrl}/#restaurant` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: defaultOgImage,
      width: 1200,
      height: 630,
      caption: `${siteName} serpme Van kahvaltısı`,
    },
  };
  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildRestaurantJsonLd(withContext = true) {
  const menuUrl = `${siteUrl}/menu#menu`;
  const data = {
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: siteName,
    alternateName,
    url: siteUrl,
    logo: `${siteUrl}/icons/icon-512.png`,
    image: [
      `${siteUrl}/images/hero-table.jpg`,
      `${siteUrl}/images/breakfast-spread.webp`,
      `${siteUrl}/images/balcony-breakfast.webp`,
    ],
    description:
      "Beyoğlu Taksim'de otlu peynir, murtuğa, kavut, sıcak sahanlar ve sınırsız çayla geleneksel serpme Van kahvaltısı sunan restoran.",
    foundingDate,
    telephone: phoneE164,
    email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phoneE164,
      contactType: "reservations",
      availableLanguage: "tr",
    },
    priceRange: "₺₺",
    acceptsReservations: true,
    servesCuisine: cuisine,
    areaServed: {
      "@type": "City",
      name: "İstanbul",
      containedInPlace: {
        "@type": "Country",
        name: address.countryName,
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.streetAddress}, ${address.neighborhood}`,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
    hasMap: mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: openingHours.days,
        opens: openingHours.opens,
        closes: openingHours.closes,
      },
    ],
    menu: menuUrl,
    hasMenu: { "@id": menuUrl },
    sameAs: sameAsUrls,
  };
  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildFaqJsonLd(
  items: readonly { question: string; answer: string }[],
  pageUrl = siteUrl,
  withContext = true,
) {
  const data = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage: "tr-TR",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return withContext ? { "@context": "https://schema.org", ...data } : data;
}
