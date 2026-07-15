export const siteUrl = "https://www.tarihivankahvaltievi.com";
export const englishPageUrl = `${siteUrl}/en`;
export const siteName = "Tarihi Van Kahvaltı Evi";
export const alternateName = "Tarihi Van Kahvaltı Evi 1978";

export const homeTitle = "Van Kahvaltıcısı İstanbul | Tarihi Van Kahvaltı Evi";
export const homeDescription =
  "İstanbul Beyoğlu Taksim'de geleneksel Van kahvaltısı: otlu peynir, murtuğa, kavut, sıcak sahanlar ve sınırsız çay. Menü, konum ve rezervasyon.";
export const homeOgDescription =
  "Beyoğlu Taksim'de geleneksel Van kahvaltısı; güncel menü, açık adres, yol tarifi ve rezervasyon bilgileri.";

export const englishTitle =
  "Van Breakfast in Beyoğlu, Istanbul | Tarihi Van Kahvaltı Evi";
export const englishDescription =
  "Experience an authentic Van breakfast near Taksim Square in Beyoğlu, Istanbul: herb cheese, murtuğa, kavut, warm dishes and unlimited Turkish tea.";

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
export const englishDisplayAddress = `Zambak St. No:8, Şehit Muhtar, Beyoğlu, Istanbul ${address.postalCode}, Türkiye`;

export const coordinates = {
  latitude: 41.0367655,
  longitude: 28.9829478,
};

export const openingHours = {
  opens: "08:00",
  closes: "18:00",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  short: "Her gün 08:00 - 18:00",
  shortEnglish: "Open daily 08:00 - 18:00",
};

// Doğrudan doğrulanmış Google Maps işletme kaydı (CID), genel arama sonucu değil.
export const mapsUrl =
  "https://www.google.com/maps?cid=10380797280962926014";
export const whatsappUrl =
  "https://wa.me/905415252868?text=Merhaba%2C%20Tarihi%20Van%20Kahvalt%C4%B1%20Evi%20i%C3%A7in%20rezervasyon%20bilgisi%20almak%20istiyorum.";
export const whatsappEnglishUrl =
  "https://wa.me/905415252868?text=Hello%2C%20I%20would%20like%20reservation%20information%20for%20Tarihi%20Van%20Kahvalt%C4%B1%20Evi.";
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

export const menuSections = [
  {
    name: "Serpme Van Kahvaltısı",
    description:
      "En az iki kişilik servis edilen geleneksel Van sofrası; otlu peynir, murtuğa, kavut, cacık, kete, süzme bal, kaymak ve sınırsız çay içerir.",
    items: [
      {
        name: "Geleneksel Van Kahvaltısı",
        description:
          "Bakır sahanlarda servis edilen, Van otlu peyniri ve yöresel sıcaklarla tamamlanan serpme kahvaltı.",
        price: "450",
        priceCurrency: "TRY",
        unit: "kişi başı",
      },
    ],
  },
  {
    name: "Sıcaklar",
    description: "Bakır sahanda, masaya sıcak gelen kahvaltı lezzetleri.",
    items: [
      {
        name: "Sahanda Sucuklu Yumurta",
        description: "Kasap sucuğu ve köy yumurtası ile hazırlanan sıcak kahvaltılık.",
        price: "180",
        priceCurrency: "TRY",
      },
      {
        name: "Murtuğa",
        description: "Un, tereyağı ve yumurta ile hazırlanan Van'a özgü sıcak lezzet.",
      },
      {
        name: "Kavut",
        description:
          "Kavrulmuş un geleneğinden gelen, Van sofrasının tatlı ve doyurucu tamamlayıcısı.",
      },
    ],
  },
  {
    name: "Kafka Cafe",
    description: "Kahvaltı sonrası sohbet için Türk kahvesi ve nitelikli kahve seçenekleri.",
    items: [
      {
        name: "Geleneksel Türk Kahvesi",
        description: "Bakır cezvede yavaş pişirilen Türk kahvesi.",
      },
      {
        name: "Sınırsız Çay",
        description: "Serpme kahvaltı ile ince belli bardakta taze demlenmiş çay.",
      },
    ],
  },
] as const;

export const englishMenuSections = [
  {
    name: "Traditional Van Breakfast Spread",
    description:
      "A shared Van-style breakfast served for at least two guests, with herb cheese, murtuğa, kavut, cacık, kete, honey, clotted cream and unlimited Turkish tea.",
    items: [
      {
        name: "Traditional Van Breakfast",
        description:
          "A sharing breakfast completed with Van herb cheese, regional warm dishes and copper-pan service.",
        price: "450",
        priceCurrency: "TRY",
        unit: "per person",
      },
    ],
  },
  {
    name: "Warm Breakfast Dishes",
    description: "Breakfast favourites served hot in copper pans.",
    items: [
      {
        name: "Eggs with Sucuk",
        description: "Eggs cooked with Turkish sucuk and served hot at the table.",
        price: "180",
        priceCurrency: "TRY",
      },
      {
        name: "Murtuğa",
        description: "A traditional Van dish prepared with flour, butter and eggs.",
      },
      {
        name: "Kavut",
        description: "A rich regional dish rooted in Van's roasted-flour tradition.",
      },
    ],
  },
  {
    name: "Coffee and Tea",
    description: "Turkish coffee, coffee options and freshly brewed tea after breakfast.",
    items: [
      {
        name: "Traditional Turkish Coffee",
        description: "Turkish coffee slowly brewed in a copper pot.",
      },
      {
        name: "Unlimited Turkish Tea",
        description: "Freshly brewed tea served with the Van breakfast spread.",
      },
    ],
  },
] as const;

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
      "Geleneksel Van kahvaltısı kişi başı yaklaşık 450 TL'dir ve en az iki kişilik servis edilir. Güncel fiyatlar için işletmeyle iletişime geçmeniz önerilir.",
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

export const englishFaqItems = [
  {
    question: "Where can I have an authentic Van breakfast near Taksim?",
    answer: `${siteName} is at ${englishDisplayAddress}, within walking distance of Taksim Square and Istiklal Avenue.`,
  },
  {
    question: "What is included in a traditional Van breakfast?",
    answer:
      "The shared table includes Van herb cheese, murtuğa, kavut, cacık, kete, honey, clotted cream, warm dishes and unlimited freshly brewed Turkish tea.",
  },
  {
    question: "What are the opening hours?",
    answer: `${siteName} is open daily from 08:00 to 18:00.`,
  },
  {
    question: "How much is the Van breakfast?",
    answer:
      "The traditional Van breakfast is approximately TRY 450 per person and is served for at least two guests. Contact the restaurant for current prices.",
  },
  {
    question: "How do I get there from Taksim Metro?",
    answer:
      "Leave M2 Taksim station towards Sıraselviler and walk to Zambak Street. Use the direct Google Maps link for live walking directions.",
  },
  {
    question: "How can I reserve a table?",
    answer: `Call or send a WhatsApp message to ${displayPhone} for current availability and reservation information.`,
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
  { source: "/menu", destination: "/#menu" },
  { source: "/iletisim", destination: "/#contact" },
  { source: "/sss", destination: "/#faq" },
  { source: "/kafka-cafe", destination: "/#menu" },
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
    href: "#menu",
    linkLabel: "Menüyü gör",
  },
  {
    label: "Ziyaret saatleri",
    value: `${openingHours.short}; hafta sonu ve kalabalık gruplar için önceden bilgi almak önerilir.`,
    href: telUrl,
    linkLabel: "İşletmeyi ara",
  },
  {
    label: "English visitor guide",
    value: "English menu, prices, directions, opening hours and answers for visitors staying near Taksim.",
    href: "/en",
    linkLabel: "View in English",
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

type ContentLanguage = "tr" | "en";

export function buildMenuJsonLd(
  withContext = true,
  language: ContentLanguage = "tr",
) {
  const isEnglish = language === "en";
  const pageUrl = isEnglish ? englishPageUrl : siteUrl;
  const sections = isEnglish ? englishMenuSections : menuSections;
  const data = {
    "@type": "Menu",
    "@id": `${pageUrl}#menu`,
    name: isEnglish ? `${siteName} English Menu` : `${siteName} Menüsü`,
    url: `${pageUrl}#menu`,
    inLanguage: isEnglish ? "en" : "tr-TR",
    hasMenuSection: sections.map((section) => ({
      "@type": "MenuSection",
      name: section.name,
      description: section.description,
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers:
          "price" in item && item.price
            ? {
                "@type": "Offer",
                price: item.price,
                priceCurrency: item.priceCurrency,
                url: `${pageUrl}#menu`,
              }
            : undefined,
      })),
    })),
  };
  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildWebsiteJsonLd(withContext = true) {
  const data = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    alternateName,
    url: siteUrl,
    inLanguage: ["tr-TR", "en"],
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

export function buildEnglishWebPageJsonLd(withContext = true) {
  const data = {
    "@type": "WebPage",
    "@id": `${englishPageUrl}#webpage`,
    url: englishPageUrl,
    name: englishTitle,
    description: englishDescription,
    inLanguage: "en",
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: { "@id": `${siteUrl}/#restaurant` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/og/van-kahvaltisi.jpg`,
      width: 1200,
      height: 630,
      caption: `${siteName} traditional Van breakfast in Istanbul`,
    },
  };
  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildRestaurantJsonLd(
  withContext = true,
  language: ContentLanguage = "tr",
) {
  const isEnglish = language === "en";
  const pageUrl = isEnglish ? englishPageUrl : siteUrl;
  const data = {
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: siteName,
    alternateName,
    url: siteUrl,
    logo: `${siteUrl}/icons/icon-512.png`,
    image: [
      `${siteUrl}/images/hero-table.jpg`,
      `${siteUrl}/images/breakfast-spread.jpg`,
      `${siteUrl}/images/balcony-breakfast.jpg`,
    ],
    description: isEnglish
      ? "A Van breakfast restaurant in Beyoğlu, Istanbul, near Taksim Square and Istiklal Avenue, serving a traditional shared breakfast with regional dishes and Turkish tea."
      : "Beyoğlu Taksim'de otlu peynir, murtuğa, kavut, sıcak sahanlar ve sınırsız çayla geleneksel serpme Van kahvaltısı sunan restoran.",
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
      name: isEnglish ? "Istanbul" : "İstanbul",
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
    menu: `${pageUrl}#menu`,
    hasMenu: { "@id": `${pageUrl}#menu` },
    sameAs: sameAsUrls,
  };
  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildFaqJsonLd(
  items: readonly { question: string; answer: string }[],
  pageUrl = siteUrl,
  withContext = true,
  language: ContentLanguage = "tr",
) {
  const data = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage: language === "en" ? "en" : "tr-TR",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return withContext ? { "@context": "https://schema.org", ...data } : data;
}
