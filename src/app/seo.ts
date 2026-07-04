import type { Metadata } from "next";

export const siteUrl = "https://tarihivankahvaltievi.com";
export const siteName = "Tarihi Van Kahvaltı Evi";
export const alternateName = "Tarihi Van Kahvaltıcısı";
export const displayPhone = "+90 541 525 2868";
export const phoneE164 = "+905415252868";
export const telUrl = `tel:${phoneE164}`;
export const email = "info@tarihivankahvaltievi.com";
export const foundingDate = "1978";
export const dateModified = "2026-07-04";
export const dateModifiedIso = "2026-07-04T12:00:00+03:00";
export const defaultImage = "/images/hero-table.jpg";
export const defaultOgImagePath = "/images/og/home.jpg";
export const defaultOgImage = `${siteUrl}${defaultOgImagePath}`;

export const sameAsUrls = [
  "https://www.instagram.com/tarihivankahvaltievi/",
];

export const supportedLanguages = ["tr", "en", "ru", "ar"];

export const supportedLanguageNames = [
  "Türkçe",
  "English",
  "Русский",
  "العربية",
];

export const address = {
  streetAddress: "Zambak Sk. No:8",
  neighborhood: "Şehit Muhtar Mahallesi",
  locality: "Beyoğlu",
  district: "Taksim",
  region: "İstanbul",
  postalCode: "34435",
  country: "TR",
  countryName: "Türkiye",
};

export const displayAddress = `${address.streetAddress}, ${address.neighborhood}, ${address.locality}, ${address.region} ${address.postalCode}`;
export const fullAddress = `${displayAddress}, ${address.countryName}`;

export const coordinates = {
  latitude: 41.0366,
  longitude: 28.9792,
};

export const localAreas = [
  "Beyoğlu",
  "Taksim",
  "Şehit Muhtar Mahallesi",
  "Zambak Sokak",
  "İstiklal Caddesi",
  "Sıraselviler",
  "Cihangir",
  "Galata",
  "Karaköy",
  "İstanbul",
];

export const nearbyLandmarks = [
  "Taksim Meydanı",
  "İstiklal Caddesi",
  "Zambak Sokak",
  "Sıraselviler Caddesi",
  "Cihangir",
  "Galata Kulesi",
  "Karaköy",
];

export const transitAccess = [
  "M2 Taksim Metro",
  "Taksim Meydanı yürüyüş rotası",
  "Sıraselviler Caddesi",
  "İstiklal Caddesi",
];

export const geoSearchIntents = [
  "yakınımdaki Van kahvaltısı",
  "Taksim'e yakın kahvaltı",
  "Beyoğlu'nda kahvaltı nerede yapılır",
  "İstiklal Caddesi yakınında kahvaltı",
  "Sıraselviler kahvaltı",
  "Zambak Sokak kahvaltı",
  "Taksim metroya yakın kahvaltı",
  "Beyoğlu tarihi binada kahvaltı",
  "breakfast near me Taksim",
  "Turkish breakfast near Taksim Square",
  "Van breakfast near Istiklal Avenue",
  "завтрак рядом со мной Таксим",
  "турецкий завтрак рядом с Истикляль",
  "فطور قريب من تقسيم",
  "فطور تركي قريب من شارع الاستقلال",
];

export const localAreaProfiles = [
  {
    name: "Taksim",
    type: "Neighborhood",
    relation: "Taksim Meydanı ve M2 Taksim metrodan yürüyerek ulaşılabilen kahvaltı noktası.",
    searchIntent: "Taksim kahvaltı, breakfast near Taksim Square",
  },
  {
    name: "Beyoğlu",
    type: "AdministrativeArea",
    relation: "Beyoğlu'nda tarihi Rum binasında Van kahvaltısı ve Kafka Cafe deneyimi.",
    searchIntent: "Beyoğlu kahvaltı, Beyoğlu serpme kahvaltı",
  },
  {
    name: "Şehit Muhtar Mahallesi",
    type: "Neighborhood",
    relation: "Açık adresin bulunduğu mahalle; Zambak Sk. No:8.",
    searchIntent: "Şehit Muhtar kahvaltı, Zambak Sokak kahvaltı",
  },
  {
    name: "İstiklal Caddesi",
    type: "LandmarksOrHistoricalBuildings",
    relation: "İstiklal Caddesi ve Sıraselviler hattından kısa yürüyüşle ulaşılır.",
    searchIntent: "İstiklal Caddesi kahvaltı, İstiklal'e yakın kahvaltı",
  },
  {
    name: "Cihangir",
    type: "Neighborhood",
    relation: "Cihangir ve Sıraselviler çevresinden yürüyerek gelen misafirler için yakın rota.",
    searchIntent: "Cihangir kahvaltı, Cihangir'e yakın Van kahvaltısı",
  },
  {
    name: "Galata",
    type: "TouristAttraction",
    relation: "Galata ve Karaköy rotası öncesi Beyoğlu'nda kahvaltı başlangıcı.",
    searchIntent: "Galata kahvaltı rotası, Galata öncesi kahvaltı",
  },
];

export const openingHours = {
  opens: "08:00",
  closes: "18:00",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  short: "Her gün 08:00 - 18:00",
};

export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Tarihi%20Van%20Kahvalt%C4%B1%20Evi%20Zambak%20Sk.%20No%3A8%20%C5%9Eehit%20Muhtar%20Beyo%C4%9Flu%2034435%20%C4%B0stanbul";
export const whatsappUrl =
  "https://wa.me/905415252868?text=Merhaba%2C%20Tarihi%20Van%20Kahvalt%C4%B1%20Evi%20i%C3%A7in%20rezervasyon%20bilgisi%20almak%20istiyorum.";

export const aiCitationSummary =
  "Tarihi Van Kahvaltı Evi, Beyoğlu Taksim'de Zambak Sk. No:8 adresinde bulunan; 1978'den beri serpme Van kahvaltısı, otlu peynir, murtuğa, kavut, sınırsız çay ve Kafka Cafe kahve deneyimi sunan, her gün 08:00 - 18:00 açık bir restorandır.";

export const localSeoFacts = [
  {
    label: "Konum",
    value: `${displayAddress}; Taksim Meydanı, İstiklal Caddesi ve Sıraselviler hattına yürüme mesafesi.`,
    href: "/iletisim",
    intent: "Beyoğlu kahvaltı, Taksim kahvaltı, Zambak Sokak kahvaltı",
  },
  {
    label: "Menü odağı",
    value: "Serpme Van kahvaltısı; otlu peynir, murtuğa, kavut, kete, bal-kaymak ve sınırsız çay.",
    href: "/menu",
    intent: "serpme Van kahvaltısı, Van otlu peyniri, murtuğa kavut",
  },
  {
    label: "Saatler",
    value: `${openingHours.short}; hafta sonu ve kalabalık gruplar için önceden bilgi almak önerilir.`,
    href: "/kahvalti-rezervasyon",
    intent: "hafta sonu kahvaltı Beyoğlu, kahvaltı rezervasyon Taksim",
  },
  {
    label: "Ulaşım",
    value: "M2 Taksim metrodan Sıraselviler yönüne çıkıp Zambak Sokak'a kısa yürüyüşle ulaşılır.",
    href: "/kahvalti-yol-tarifi",
    intent: "Taksim metro kahvaltı yol tarifi, İstiklal Caddesi'ne yakın kahvaltı",
  },
  {
    label: "Kahve",
    value: "Kafka Cafe aynı mekanda Türk kahvesi ve nitelikli kahve seçenekleri sunar.",
    href: "/kafka-cafe",
    intent: "kahvaltı sonrası kahve Beyoğlu, Kafka Cafe",
  },
];

export const internationalTouristFacts = [
  {
    language: "English",
    title: "Turkish breakfast near Taksim",
    value:
      "Van-style Turkish breakfast in Beyoğlu, a short walk from Taksim Square, Istiklal Avenue and Siraselviler.",
    href: "/turkish-breakfast-istanbul",
    intent: "Turkish breakfast Istanbul, breakfast near Taksim, Van breakfast Istanbul",
  },
  {
    language: "Русский",
    title: "Завтрак рядом с Таксим",
    value:
      "Турецкий завтрак в стиле Ван в Бейоглу: сыр с травами, муртуга, кавут, чай и удобный маршрут от площади Таксим.",
    href: "/zavtrak-taksim-stambul",
    intent: "завтрак Таксим, турецкий завтрак Стамбул, завтрак рядом с Таксим",
  },
  {
    language: "العربية",
    title: "فطور تركي قرب تقسيم",
    value:
      "فطور فان التركي في بيوغلو قرب ميدان تقسيم وشارع الاستقلال، مع شاي وخيارات تقليدية وموقع سهل للسياح.",
    href: "/arabic-breakfast-taksim",
    intent: "فطور تركي اسطنبول, فطور قرب تقسيم, فطور فان",
  },
];

export const cuisine = [
  "Van kahvaltısı",
  "Serpme kahvaltı",
  "Geleneksel Türk kahvaltısı",
  "Turkish breakfast",
  "Kahve",
];

export const keywords = [
  "Van kahvaltısı",
  "Tarihi Van Kahvaltı Evi",
  "Tarihi Van Kahvaltıcısı",
  "Beyoğlu kahvaltı",
  "Taksim kahvaltı",
  "İstanbul kahvaltı",
  "İstanbul Van kahvaltısı",
  "serpme kahvaltı",
  "Beyoğlu serpme kahvaltı",
  "Taksim serpme kahvaltı",
  "Van kahvaltı Beyoğlu",
  "Van kahvaltı Taksim",
  "Zambak Sokak kahvaltı",
  "Şehit Muhtar kahvaltı",
  "otlu peynir",
  "murtuğa",
  "kavut",
  "Kafka Cafe",
  "Traditional Turkish breakfast Istanbul",
  "Van breakfast Taksim",
  "Turkish breakfast Istanbul",
  "breakfast near Taksim",
  "breakfast near Taksim Square",
  "Istanbul breakfast for tourists",
  "завтрак Таксим",
  "турецкий завтрак Стамбул",
  "завтрак рядом с Таксим",
  "ванский завтрак Стамбул",
  "فطور تركي اسطنبول",
  "فطور قرب تقسيم",
  "Beyoğlu kahvaltı mekanları",
  "Sıraselviler kahvaltı",
  "tarihi mekanda kahvaltı",
  "kahvaltı sonrası kahve Beyoğlu",
  "vejetaryen kahvaltı Beyoğlu",
  "Taksim brunch",
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
];

export const faqItems = [
  {
    question: "Van kahvaltısı nedir ve neler içerir?",
    answer:
      "Van kahvaltısı, otlu peynir, murtuğa, kavut, cacık, kete, süzme bal, kaymak, sahanda yumurta ve sınırsız çay gibi yöresel ürünlerle hazırlanan zengin bir serpme kahvaltıdır.",
  },
  {
    question: "Tarihi Van Kahvaltı Evi nerede?",
    answer:
      `Tarihi Van Kahvaltı Evi, ${displayAddress} adresindedir; Taksim Meydanı ve İstiklal Caddesi'ne yürüme mesafesindedir.`,
  },
  {
    question: "Çalışma saatleri nedir?",
    answer: "Tarihi Van Kahvaltı Evi haftanın 7 günü 08:00 - 18:00 saatleri arasında hizmet verir.",
  },
  {
    question: "Rezervasyon nasıl yapılır?",
    answer:
      "Rezervasyon ve güncel yoğunluk bilgisi için +90 541 525 2868 numarasını arayabilir veya WhatsApp üzerinden mesaj gönderebilirsiniz.",
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
      "Tarihi Van Kahvaltı Evi aile kahvaltıları, arkadaş buluşmaları ve uzun sohbetli grup sofraları için uygundur. Kalabalık gruplarda masa uygunluğunu önceden teyit etmek iyi olur.",
  },
  {
    question: "Kafka Cafe nedir?",
    answer:
      "Kafka Cafe, Tarihi Van Kahvaltı Evi içinde yer alan kahve köşesidir; Türk kahvesi ve nitelikli kahve seçenekleri sunar.",
  },
];

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  image: string;
  ogImage?: string;
  imageAlt: string;
  language?: string;
  locale?: string;
  schemaType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  article?: boolean;
  keywords?: string[];
  localIntent?: string[];
  nearbyLandmarks?: string[];
  intro: string[];
  highlights: string[];
  sections: { title: string; body: string }[];
  questions: { question: string; answer: string }[];
};

export const seoPages: SeoPage[] = [
  {
    slug: "menu",
    title: "Menü ve Fiyatlar | Serpme Van Kahvaltısı",
    description:
      "Tarihi Van Kahvaltı Evi menüsü: serpme Van kahvaltısı, otlu peynir, murtuğa, kavut, sahanda sucuklu yumurta, sınırsız çay ve Kafka Cafe kahveleri.",
    h1: "Tarihi Van Kahvaltı Evi menüsü",
    eyebrow: "Menü",
    image: "/images/breakfast-spread.jpg",
    imageAlt: "Bakır sahanlarda geleneksel serpme Van kahvaltısı",
    intro: [
      "Tarihi Van Kahvaltı Evi'nde menünün odağı, Beyoğlu'nda uzun uzun paylaşılan geleneksel serpme Van kahvaltısıdır.",
      "Otlu peynir, murtuğa, kavut, bal-kaymak, kete ve sınırsız çay aynı sofrada servis edilir; sıcaklar bakır sahanlarla masaya gelir.",
    ],
    highlights: [
      "Geleneksel Van kahvaltısı kişi başı yaklaşık 450 TL'dir ve en az iki kişilik servis edilir.",
      "Sahanda sucuklu yumurta yaklaşık 180 TL'dir.",
      "Serpme kahvaltı yanında sınırsız çay sunulur.",
      "Kafka Cafe bölümünde Türk kahvesi ve nitelikli kahve seçenekleri bulunur.",
    ],
    sections: menuSections.map((section) => ({
      title: section.name,
      body: `${section.description} ${section.items.map((item) => item.name).join(", ")} seçenekleriyle tamamlanır.`,
    })),
    questions: [faqItems[0], faqItems[4], faqItems[8]],
  },
  {
    slug: "iletisim",
    title: "İletişim ve Yol Tarifi | Zambak Sokak Beyoğlu",
    description:
      "Tarihi Van Kahvaltı Evi iletişim, telefon, WhatsApp, adres ve yol tarifi bilgileri. Zambak Sk. No:8, Şehit Muhtar Mahallesi, Beyoğlu, İstanbul 34435.",
    h1: "İletişim ve yol tarifi",
    eyebrow: "Konum",
    image: "/images/street-table.jpg",
    imageAlt: "Beyoğlu Zambak Sokak'ta kahvaltı masası",
    intro: [
      "Tarihi Van Kahvaltı Evi, Taksim Meydanı'na ve İstiklal Caddesi'ne yürüme mesafesindeki Zambak Sokak'tadır.",
      "Rezervasyon, güncel yoğunluk ve yol tarifi için telefon veya WhatsApp üzerinden hızlıca iletişime geçebilirsiniz.",
    ],
    highlights: [
      `Adres: ${address.streetAddress}, ${address.neighborhood}, ${address.locality}, ${address.region} ${address.postalCode}`,
      `Telefon ve WhatsApp: ${displayPhone}`,
      `Çalışma saatleri: ${openingHours.short}`,
      "M2 Taksim metro durağından Sıraselviler yönüne kısa yürüyüşle ulaşılır.",
    ],
    sections: [
      {
        title: "Metro ile ulaşım",
        body: "M2 Yenikapı - Hacıosman hattında Taksim durağında inip Sıraselviler yönünden Zambak Sokak'a yürüyebilirsiniz.",
      },
      {
        title: "Yaya rota",
        body: "İstiklal Caddesi ve Taksim çevresinden gelen misafirler için işletme kısa bir yürüyüş mesafesindedir.",
      },
      {
        title: "Rezervasyon",
        body: "Hafta sonu ve kalabalık saatler için önceden telefon ya da WhatsApp üzerinden bilgi almak önerilir.",
      },
    ],
    questions: [faqItems[1], faqItems[2], faqItems[3], faqItems[5]],
  },
  {
    slug: "sss",
    title: "Sıkça Sorulan Sorular | Van Kahvaltısı Beyoğlu",
    description:
      "Tarihi Van Kahvaltı Evi hakkında sıkça sorulan sorular: Van kahvaltısı içeriği, fiyat, çalışma saatleri, rezervasyon, konum ve Kafka Cafe.",
    h1: "Sıkça sorulan sorular",
    eyebrow: "SSS",
    image: "/images/tea-service.jpg",
    imageAlt: "Taze demlenmiş çay servisi",
    intro: [
      "Van kahvaltısı, rezervasyon, ulaşım ve menü hakkında en sık gelen soruları kısa ve net şekilde yanıtladık.",
      "Bu sayfa hem misafirlerin hızlı karar vermesi hem de arama motorlarının işletme bilgisini doğru anlaması için hazırlanmıştır.",
    ],
    highlights: [
      "İşletme her gün 08:00 - 18:00 arasında açıktır.",
      `Adres ${displayAddress} olarak geçer.`,
      "Rezervasyon için telefon ve WhatsApp kullanılabilir.",
      "Van kahvaltısında otlu peynir, murtuğa, kavut, kete ve sınırsız çay öne çıkar.",
    ],
    sections: faqItems.map((item) => ({ title: item.question, body: item.answer })),
    questions: faqItems,
  },
  {
    slug: "van-kahvaltisi",
    title: "Van Kahvaltısı Nedir? | Beyoğlu'nda Geleneksel Sofra",
    description:
      "Van kahvaltısı nedir, içinde neler olur, Beyoğlu Taksim'de geleneksel serpme Van kahvaltısı nerede yenir? Tarihi Van Kahvaltı Evi rehberi.",
    h1: "Van kahvaltısı nedir?",
    eyebrow: "Rehber",
    image: "/images/kete-detail.jpg",
    imageAlt: "Geleneksel Van kahvaltısında kete detayı",
    intro: [
      "Van kahvaltısı, tek bir tabaktan çok birlikte paylaşılan zengin bir sofra kültürüdür.",
      "Otlu peynir, murtuğa, kavut, kete, bal-kaymak ve demli çay bu kültürün en tanınan parçalarıdır.",
    ],
    highlights: [
      "Van otlu peyniri sofranın ayırt edici lezzetlerinden biridir.",
      "Murtuğa un, tereyağı ve yumurta ile hazırlanır.",
      "Kavut kavrulmuş un geleneğinden gelir ve kahvaltıya yöresel karakter katar.",
      "Sofra acele servis mantığından çok paylaşım ve sohbet üzerine kurulur.",
    ],
    sections: [
      {
        title: "Beyoğlu'nda Van sofrası",
        body: "Tarihi Van Kahvaltı Evi, Van kahvaltısı geleneğini Taksim'e yakın tarihi bir Rum binasında, bakır sahanlar ve sıcak servisle sunar.",
      },
      {
        title: "Sofranın ana lezzetleri",
        body: "Otlu peynir, murtuğa, kavut, kete, süzme bal, kaymak, cacık ve sınırsız çay Van kahvaltısının temel bileşenleridir.",
      },
      {
        title: "Kimler için uygun?",
        body: "Kalabalık arkadaş kahvaltıları, aile buluşmaları ve İstanbul'da yöresel kahvaltı arayan ziyaretçiler için uygundur.",
      },
    ],
    questions: [faqItems[0], faqItems[6], faqItems[4]],
  },
  {
    slug: "beyoglu-kahvalti",
    title: "Beyoğlu Kahvaltı | Taksim'e Yakın Van Kahvaltısı",
    description:
      "Beyoğlu'nda kahvaltı arayanlar için Zambak Sokak'ta, Taksim'e yakın tarihi Rum binasında serpme Van kahvaltısı ve Kafka Cafe deneyimi.",
    h1: "Beyoğlu'nda kahvaltı: Van sofrası",
    eyebrow: "Beyoğlu",
    image: "/images/balcony-breakfast.jpg",
    imageAlt: "Beyoğlu'nda balkonda kahvaltı sofrası",
    intro: [
      "Beyoğlu kahvaltı aramalarında en önemli ihtiyaç, konumu kolay, menüsü net ve deneyimi güven veren bir sofradır.",
      "Tarihi Van Kahvaltı Evi, Zambak Sokak'taki tarihi binasında geleneksel Van kahvaltısını Beyoğlu rotasına yerleştirir.",
    ],
    highlights: [
      "Taksim Meydanı'na yürüme mesafesindedir.",
      "İstiklal Caddesi çevresindeki kültür rotalarına yakındır.",
      "Tarihi bina atmosferi, balkon ve teras deneyimi sunar.",
      "Kahvaltı sonrası Kafka Cafe'de kahve içilebilir.",
    ],
    sections: [
      {
        title: "Neden Beyoğlu'nda Van kahvaltısı?",
        body: "Beyoğlu'nun merkezi ulaşımı ve tarihi dokusu, uzun kahvaltı ve şehir gezisini aynı güne sığdırmak isteyen misafirler için güçlü bir avantaj sağlar.",
      },
      {
        title: "Yakın noktalar",
        body: "Taksim Meydanı, İstiklal Caddesi, Sıraselviler ve Cihangir çevresinden yürüyerek ulaşım mümkündür.",
      },
    ],
    questions: [faqItems[1], faqItems[2], faqItems[0], faqItems[7]],
  },
  {
    slug: "taksim-kahvalti",
    title: "Taksim Kahvaltı | Zambak Sokak'ta Serpme Van Kahvaltısı",
    description:
      "Taksim kahvaltı önerisi: Zambak Sokak No:8'de, Taksim metroya yakın geleneksel serpme Van kahvaltısı, sınırsız çay, sıcak servis ve yol tarifi.",
    h1: "Taksim'de serpme Van kahvaltısı",
    eyebrow: "Yakın çevre",
    image: "/images/terrace-tea.jpg",
    imageAlt: "Taksim'e yakın terasta çay servisi",
    intro: [
      "Taksim'de kahvaltı arayan misafirler için ulaşım kolaylığı, açık saat bilgisi ve menü netliği karar sürecini hızlandırır.",
      "Tarihi Van Kahvaltı Evi, Taksim metrosuna yakın konumuyla Van kahvaltısı deneyimini merkezi bir rotaya taşır.",
    ],
    highlights: [
      "M2 Taksim metro durağına kısa yürüyüş mesafesindedir.",
      "Her gün 08:00 - 18:00 saatleri arasında açıktır.",
      "Serpme Van kahvaltısı en az iki kişilik servis edilir.",
      "Yol tarifi için Google Haritalar ve WhatsApp bağlantıları kullanılabilir.",
    ],
    sections: [
      {
        title: "Taksim'den nasıl gidilir?",
        body: "Taksim metro çıkışından Sıraselviler yönüne yürüyüp Zambak Sokak'a girerek kısa sürede restorana ulaşabilirsiniz.",
      },
      {
        title: "Kahvaltıdan sonra",
        body: "İstiklal Caddesi, Cihangir ve Beyoğlu kültür rotaları kahvaltı sonrası yürüyüş için yakındır.",
      },
    ],
    questions: [faqItems[1], faqItems[5], faqItems[3], faqItems[4]],
  },
  {
    slug: "serpme-van-kahvaltisi",
    title: "Serpme Van Kahvaltısı | Otlu Peynir, Murtuğa, Kavut",
    description:
      "Serpme Van kahvaltısı içeriği: otlu peynir, murtuğa, kavut, kete, bal-kaymak, sıcaklar ve sınırsız çay. Beyoğlu Taksim'de geleneksel servis.",
    h1: "Serpme Van kahvaltısı",
    eyebrow: "Sofra içeriği",
    image: "/images/hands-table.jpg",
    imageAlt: "Paylaşılan serpme Van kahvaltısı masası",
    intro: [
      "Serpme Van kahvaltısı, küçük tabakların çokluğu kadar sofranın birlikte paylaşılmasıyla da ayırt edilir.",
      "Tarihi Van Kahvaltı Evi'nde bu sofra bakır sahanlar, yöresel sıcaklar ve eksilmeyen çayla servis edilir.",
    ],
    highlights: [
      "Otlu peynir, Van kahvaltısının imza lezzetidir.",
      "Murtuğa sıcak ve doyurucu bir Van klasiğidir.",
      "Kavut yöresel tatlı karakteriyle sofrayı dengeler.",
      "Sınırsız çay serpme kahvaltının doğal eşlikçisidir.",
    ],
    sections: [
      {
        title: "Sıcak ve soğuk denge",
        body: "Peynir, bal-kaymak ve cacık gibi soğuk lezzetler; murtuğa ve sahanda yumurta gibi sıcaklarla tamamlanır.",
      },
      {
        title: "Kimlerle paylaşılır?",
        body: "Serpme servis en az iki kişilik olduğu için aile, arkadaş grubu ve uzun sohbetli kahvaltılar için uygundur.",
      },
    ],
    questions: [faqItems[0], faqItems[6], faqItems[4], faqItems[2]],
  },
  {
    slug: "kahvalti-fiyatlari",
    title: "Kahvaltı Fiyatları | Tarihi Van Kahvaltı Evi",
    description:
      "Tarihi Van Kahvaltı Evi kahvaltı fiyatları: geleneksel Van kahvaltısı kişi başı yaklaşık 450 TL, sahanda sucuklu yumurta yaklaşık 180 TL.",
    h1: "Kahvaltı fiyatları",
    eyebrow: "Fiyat bilgisi",
    image: "/images/sucuk-egg.jpg",
    imageAlt: "Bakır sahanda sucuklu yumurta",
    intro: [
      "Fiyat sayfası, arama yapan misafirlerin hızlı ve şeffaf bilgi alması için ayrı tutulmuştur.",
      "Menü fiyatları dönemsel olarak değişebileceğinden rezervasyon öncesi işletmeden güncel bilgi almanız önerilir.",
    ],
    highlights: [
      "Geleneksel Van kahvaltısı kişi başı yaklaşık 450 TL'dir.",
      "Serpme Van kahvaltısı en az iki kişilik servis edilir.",
      "Sahanda sucuklu yumurta yaklaşık 180 TL'dir.",
      "Nakit, kredi kartı ve banka kartı kabul edilir.",
    ],
    sections: [
      {
        title: "Fiyat bilgisini nasıl doğrularım?",
        body: "Güncel fiyatlar için +90 541 525 2868 numarasından telefon veya WhatsApp ile bilgi alabilirsiniz.",
      },
      {
        title: "Fiyata neler dahildir?",
        body: "Serpme kahvaltıda yöresel ürünler ve sınırsız çay öne çıkar; ekstra sıcaklar ayrıca ücretlendirilebilir.",
      },
    ],
    questions: [faqItems[4], faqItems[3], faqItems[0]],
  },
  {
    slug: "kafka-cafe",
    title: "Kafka Cafe | Kahvaltı Sonrası Türk Kahvesi ve Nitelikli Kahve",
    description:
      "Tarihi Van Kahvaltı Evi içindeki Kafka Cafe, kahvaltı sonrası Türk kahvesi ve nitelikli kahve seçenekleriyle Beyoğlu'nda sohbeti uzatır.",
    h1: "Kafka Cafe",
    eyebrow: "Kahve köşesi",
    image: "/images/coffee-moment.jpg",
    imageAlt: "Kafka Cafe kahve molası",
    intro: [
      "Kafka Cafe, Tarihi Van Kahvaltı Evi'nin içinde kahvaltı sonrası sohbeti uzatan kahve köşesidir.",
      "Bakır cezvede Türk kahvesi ve nitelikli kahve seçenekleri, Van kahvaltısı deneyimini daha sakin bir kapanışa taşır.",
    ],
    highlights: [
      "Kahvaltı sonrası Türk kahvesi servis edilir.",
      "Nitelikli kahve seçenekleri bulunur.",
      "Beyoğlu'nda tarihi bina atmosferinde kahve molası sunar.",
      "Kafka Cafe aynı adreste, Tarihi Van Kahvaltı Evi bünyesindedir.",
    ],
    sections: [
      {
        title: "Kahvaltıdan kahveye",
        body: "Uzun kahvaltıdan sonra aynı mekanda kahve içmek, özellikle hafta sonu buluşmalarında deneyimi kesintisiz kılar.",
      },
      {
        title: "Konum",
        body: "Kafka Cafe, Zambak Sk. No:8 adresindeki Tarihi Van Kahvaltı Evi içinde yer alır.",
      },
    ],
    questions: [faqItems[8], faqItems[1], faqItems[2]],
  },
  {
    slug: "istanbul-van-kahvaltisi",
    title: "İstanbul Van Kahvaltısı | Beyoğlu Taksim'de Yöresel Sofra",
    description:
      "İstanbul'da Van kahvaltısı arayanlar için Beyoğlu Taksim'de otlu peynir, murtuğa, kavut, kete, bal-kaymak ve sınırsız çayla geleneksel sofra.",
    h1: "İstanbul'da Van kahvaltısı",
    eyebrow: "İstanbul",
    image: "/images/hero-table.jpg",
    ogImage: "/images/og/van-kahvaltisi.jpg",
    imageAlt: "İstanbul Beyoğlu'nda kurulan geleneksel Van kahvaltısı sofrası",
    schemaType: "CollectionPage",
    article: true,
    keywords: ["İstanbul Van kahvaltısı", "İstanbul yöresel kahvaltı", "İstanbul serpme Van kahvaltısı"],
    localIntent: ["İstanbul'da Van kahvaltısı nerede yenir?", "Taksim'e yakın yöresel kahvaltı"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi", "Cihangir"],
    intro: [
      "İstanbul'da Van kahvaltısı arayan misafirler için en önemli konu, yöresel lezzetleri merkezi ve ulaşılabilir bir adreste bulabilmektir.",
      "Tarihi Van Kahvaltı Evi, Beyoğlu Taksim hattında otlu peynir, murtuğa, kavut, kete ve sınırsız çayla geleneksel Van sofrası kurar.",
    ],
    highlights: [
      "Adres Beyoğlu Taksim'de Zambak Sk. No:8 olarak geçer.",
      "Her gün 08:00 - 18:00 arasında Van kahvaltısı servis edilir.",
      "Serpme kahvaltı en az iki kişilik servis edilir.",
      "Taksim metro, İstiklal Caddesi ve Cihangir çevresinden yürüyerek ulaşılabilir.",
    ],
    sections: [
      {
        title: "Merkezi konum avantajı",
        body: "İstanbul'da kahvaltı planlayan misafirler için Taksim, metro ve yürüyüş rotaları sayesinde kolay buluşma noktasıdır.",
      },
      {
        title: "Yöresel ürün odağı",
        body: "Sofrada Van otlu peyniri, murtuğa, kavut, kete, süzme bal, kaymak ve demli çay gibi Van kahvaltısı lezzetleri öne çıkar.",
      },
      {
        title: "Kimler tercih eder?",
        body: "Şehri gezen ziyaretçiler, aileler, arkadaş grupları ve İstanbul'da yöresel kahvaltı deneyimi arayanlar için uygundur.",
      },
    ],
    questions: [faqItems[0], faqItems[1], faqItems[2], faqItems[4]],
  },
  {
    slug: "serpme-kahvalti-beyoglu",
    title: "Serpme Kahvaltı Beyoğlu | Van Sofrası ve Sınırsız Çay",
    description:
      "Beyoğlu'nda serpme kahvaltı: Taksim'e yakın Zambak Sokak'ta Van otlu peyniri, murtuğa, kavut, sıcaklar ve sınırsız çay.",
    h1: "Beyoğlu'nda serpme kahvaltı",
    eyebrow: "Serpme kahvaltı",
    image: "/images/hands-table.jpg",
    ogImage: "/images/og/serpme-van-kahvaltisi.jpg",
    imageAlt: "Beyoğlu'nda paylaşılan serpme Van kahvaltısı",
    schemaType: "CollectionPage",
    keywords: ["serpme kahvaltı Beyoğlu", "Beyoğlu serpme kahvaltı", "Taksim serpme kahvaltı"],
    localIntent: ["Beyoğlu'nda serpme kahvaltı", "Taksim'e yakın serpme kahvaltı"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi", "Sıraselviler Caddesi"],
    intro: [
      "Beyoğlu'nda serpme kahvaltı arayanlar genellikle merkezi konum, net fiyat bilgisi ve doyurucu bir sofra ister.",
      "Tarihi Van Kahvaltı Evi'nde serpme servis Van kahvaltısı karakterini taşır; sıcaklar bakır sahanlarda, çay ise taze demlenmiş olarak gelir.",
    ],
    highlights: [
      "Serpme Van kahvaltısı en az iki kişilik servis edilir.",
      "Kişi başı fiyat yaklaşık 450 TL'dir; güncel bilgi için işletmeyle iletişim önerilir.",
      "Sınırsız çay serpme kahvaltıya dahildir.",
      "Beyoğlu, Taksim ve İstiklal Caddesi rotalarına yakındır.",
    ],
    sections: [
      {
        title: "Sofrada neler var?",
        body: "Otlu peynir, murtuğa, kavut, cacık, kete, süzme bal, kaymak ve sıcak yumurta seçenekleri sofrayı tamamlar.",
      },
      {
        title: "Paylaşım için uygun servis",
        body: "Serpme servis, iki kişi ve üzeri kahvaltı planlarında tabakların paylaşılmasını ve uzun sohbeti kolaylaştırır.",
      },
      {
        title: "Beyoğlu rotasına uyum",
        body: "Kahvaltıdan sonra İstiklal Caddesi, Cihangir veya Galata yönünde yürüyüşle gün planı sürdürülebilir.",
      },
    ],
    questions: [faqItems[6], faqItems[4], faqItems[0], faqItems[2]],
  },
  {
    slug: "istiklal-caddesi-kahvalti",
    title: "İstiklal Caddesi Kahvaltı | Zambak Sokak'ta Van Kahvaltısı",
    description:
      "İstiklal Caddesi'ne yakın kahvaltı için Zambak Sokak No:8'de geleneksel serpme Van kahvaltısı, sınırsız çay ve Kafka Cafe.",
    h1: "İstiklal Caddesi'ne yakın kahvaltı",
    eyebrow: "İstiklal",
    image: "/images/street-table.jpg",
    ogImage: "/images/og/beyoglu-kahvalti.jpg",
    imageAlt: "İstiklal Caddesi'ne yakın Beyoğlu kahvaltı masası",
    schemaType: "CollectionPage",
    keywords: ["İstiklal Caddesi kahvaltı", "İstiklal'e yakın kahvaltı", "Zambak Sokak kahvaltı"],
    localIntent: ["İstiklal Caddesi yakınında kahvaltı", "Beyoğlu yürüyüş rotası kahvaltı"],
    nearbyLandmarks: ["İstiklal Caddesi", "Taksim Meydanı", "Sıraselviler Caddesi"],
    intro: [
      "İstiklal Caddesi çevresinde kahvaltı arayan misafirler için kısa yürüyüş mesafesi ve açık adres bilgisi belirleyicidir.",
      "Tarihi Van Kahvaltı Evi, İstiklal ve Taksim rotalarına yakın Zambak Sokak'ta Van kahvaltısı sunar.",
    ],
    highlights: [
      "Zambak Sokak No:8 adresindedir.",
      "İstiklal Caddesi ve Taksim Meydanı'ndan yürüyerek ulaşılabilir.",
      "Her gün 08:00 - 18:00 saatleri arasında açıktır.",
      "Kahvaltı sonrası Kafka Cafe'de kahve molası verilebilir.",
    ],
    sections: [
      {
        title: "Yürüyerek ulaşım",
        body: "İstiklal Caddesi'nden Sıraselviler yönüne geçerek Zambak Sokak'a kısa sürede varabilirsiniz.",
      },
      {
        title: "Turistik güne uygun",
        body: "Beyoğlu gezisi, müze veya Galata rotası öncesinde uzun kahvaltı için merkezi bir başlangıç noktasıdır.",
      },
    ],
    questions: [faqItems[1], faqItems[5], faqItems[2], faqItems[3]],
  },
  {
    slug: "cihangir-kahvalti",
    title: "Cihangir Kahvaltı | Taksim'e Yakın Serpme Van Kahvaltısı",
    description:
      "Cihangir'e yakın kahvaltı arayanlar için Beyoğlu Zambak Sokak'ta serpme Van kahvaltısı, otlu peynir, murtuğa, kavut ve sınırsız çay.",
    h1: "Cihangir'e yakın kahvaltı",
    eyebrow: "Cihangir",
    image: "/images/terrace-tea.jpg",
    ogImage: "/images/og/taksim-kahvalti.jpg",
    imageAlt: "Cihangir'e yakın terasta kahvaltı ve çay servisi",
    schemaType: "CollectionPage",
    keywords: ["Cihangir kahvaltı", "Cihangir'e yakın kahvaltı", "Cihangir Van kahvaltısı"],
    localIntent: ["Cihangir çevresinde kahvaltı", "Cihangir'den yürünebilir Van kahvaltısı"],
    nearbyLandmarks: ["Cihangir", "Sıraselviler Caddesi", "Taksim Meydanı"],
    intro: [
      "Cihangir çevresinde kahvaltı planlayanlar için Taksim'e yakın bir Van sofrası, buluşma ve yürüyüş planlarını kolaylaştırır.",
      "Tarihi Van Kahvaltı Evi, Cihangir ve Sıraselviler hattından yürüyerek ulaşılabilen Zambak Sokak konumundadır.",
    ],
    highlights: [
      "Cihangir ve Sıraselviler çevresine yakındır.",
      "Serpme Van kahvaltısında yöresel sıcaklar ve sınırsız çay bulunur.",
      "Kalabalık saatlerde rezervasyon bilgisi almak önerilir.",
      "Kahvaltı sonrası Beyoğlu ve Cihangir yürüyüşü yapılabilir.",
    ],
    sections: [
      {
        title: "Cihangir'den rota",
        body: "Cihangir'den Sıraselviler yönüne yürüyerek Taksim çevresindeki Zambak Sokak'a ulaşabilirsiniz.",
      },
      {
        title: "Sakin kapanış",
        body: "Uzun kahvaltıdan sonra aynı mekandaki Kafka Cafe, Türk kahvesi ve nitelikli kahve seçenekleriyle deneyimi tamamlar.",
      },
    ],
    questions: [faqItems[1], faqItems[2], faqItems[3], faqItems[8]],
  },
  {
    slug: "galata-kahvalti",
    title: "Galata Kahvaltı Rotası | Beyoğlu'nda Van Kahvaltısı",
    description:
      "Galata ve Karaköy rotası öncesi Beyoğlu'nda Van kahvaltısı: Zambak Sokak'ta serpme kahvaltı, sınırsız çay ve tarihi bina atmosferi.",
    h1: "Galata rotası öncesi kahvaltı",
    eyebrow: "Galata",
    image: "/images/balcony-breakfast.jpg",
    ogImage: "/images/og/beyoglu-kahvalti.jpg",
    imageAlt: "Galata rotasına yakın Beyoğlu balkon kahvaltısı",
    schemaType: "CollectionPage",
    keywords: ["Galata kahvaltı", "Galata'ya yakın kahvaltı", "Karaköy Galata kahvaltı rotası"],
    localIntent: ["Galata turu öncesi kahvaltı", "Beyoğlu Galata hattında kahvaltı"],
    nearbyLandmarks: ["Galata Kulesi", "Karaköy", "İstiklal Caddesi"],
    intro: [
      "Galata ve Karaköy rotası yapacak ziyaretçiler için Beyoğlu'nda merkezi bir kahvaltı başlangıcı pratik olabilir.",
      "Tarihi Van Kahvaltı Evi, Taksim ve İstiklal hattındaki konumuyla Galata yönüne geçmeden önce doyurucu bir Van kahvaltısı sunar.",
    ],
    highlights: [
      "Beyoğlu gezi rotalarıyla kolay birleşir.",
      "Tarihi bina atmosferi ve balkon/teras deneyimi öne çıkar.",
      "Van kahvaltısı en az iki kişilik serpme servis edilir.",
      "Yol tarifi için Google Haritalar bağlantısı kullanılabilir.",
    ],
    sections: [
      {
        title: "Rota planı",
        body: "Kahvaltıdan sonra İstiklal Caddesi üzerinden Galata yönüne yürüyüş yapılabilir veya Taksim bağlantıları kullanılabilir.",
      },
      {
        title: "Fotoğraf ve deneyim",
        body: "Tarihi Rum binasının taş dokusu, balkon ve kahvaltı sofrası şehir gezisine yerel bir başlangıç hissi katar.",
      },
    ],
    questions: [faqItems[1], faqItems[5], faqItems[0], faqItems[2]],
  },
  {
    slug: "aile-kahvaltisi-beyoglu",
    title: "Aile Kahvaltısı Beyoğlu | Tarihi Binada Van Sofrası",
    description:
      "Beyoğlu'nda aile kahvaltısı için Taksim'e yakın tarihi binada serpme Van kahvaltısı, yöresel lezzetler, sınırsız çay ve rezervasyon bilgisi.",
    h1: "Beyoğlu'nda aile kahvaltısı",
    eyebrow: "Aile",
    image: "/images/breakfast-spread.jpg",
    ogImage: "/images/og/home.jpg",
    imageAlt: "Aile ve arkadaşlarla paylaşılan zengin Van kahvaltısı",
    schemaType: "CollectionPage",
    keywords: ["aile kahvaltısı Beyoğlu", "aile kahvaltısı Taksim", "çocuklu aile kahvaltısı Beyoğlu"],
    localIntent: ["Beyoğlu aile kahvaltısı", "Taksim'de ailece kahvaltı"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi", "Cihangir"],
    intro: [
      "Aile kahvaltısı planında masa uygunluğu, ulaşım kolaylığı ve paylaşılabilir menü özellikle önemlidir.",
      "Tarihi Van Kahvaltı Evi'nin serpme Van kahvaltısı, ailece uzun oturulabilecek sıcak ve doyurucu bir sofra sunar.",
    ],
    highlights: [
      "Serpme kahvaltı aile sofraları için paylaşılabilir yapıdadır.",
      "Hafta sonu ve kalabalık saatler için önceden bilgi almak önerilir.",
      "Taksim'e yakın konum aile bireylerinin buluşmasını kolaylaştırır.",
      "Çay servisi serpme kahvaltıya dahildir.",
    ],
    sections: [
      {
        title: "Aileler için neden uygun?",
        body: "Küçük tabaklarla kurulan serpme servis, farklı damak zevklerine aynı sofrada seçenek sunar.",
      },
      {
        title: "Rezervasyon önerisi",
        body: "Hafta sonu sabah ve öğlen saatleri yoğun olabildiği için telefon veya WhatsApp üzerinden masa uygunluğunu teyit etmek iyi olur.",
      },
    ],
    questions: [faqItems[7], faqItems[3], faqItems[6], faqItems[2]],
  },
  {
    slug: "grup-kahvaltisi",
    title: "Grup Kahvaltısı | Taksim Beyoğlu Serpme Van Kahvaltısı",
    description:
      "Arkadaş grubu ve kalabalık kahvaltılar için Taksim Beyoğlu'nda serpme Van kahvaltısı, rezervasyon, yol tarifi ve güncel fiyat bilgisi.",
    h1: "Grup kahvaltısı ve kalabalık sofralar",
    eyebrow: "Grup",
    image: "/images/breakfast-spread.jpg",
    ogImage: "/images/og/menu.jpg",
    imageAlt: "Kalabalık grup için serpme Van kahvaltısı masası",
    schemaType: "CollectionPage",
    keywords: ["grup kahvaltısı Beyoğlu", "kalabalık kahvaltı Taksim", "arkadaş grubu kahvaltı"],
    localIntent: ["Beyoğlu grup kahvaltısı", "Taksim kalabalık kahvaltı rezervasyon"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi", "Sıraselviler Caddesi"],
    intro: [
      "Kalabalık kahvaltı planlarında masa düzeni, kişi sayısı ve ulaşım bilgisi önceden netleştiğinde deneyim daha rahat ilerler.",
      "Tarihi Van Kahvaltı Evi, arkadaş buluşmaları ve grup kahvaltıları için Taksim'e yakın serpme Van kahvaltısı sunar.",
    ],
    highlights: [
      "Grup ziyaretlerinde önceden aramak veya WhatsApp yazmak önerilir.",
      "Serpme kahvaltı kişi başı yaklaşık 450 TL'dir.",
      "Konum Taksim ve İstiklal çevresinden buluşmayı kolaylaştırır.",
      "Menüde sıcaklar ve Kafka Cafe kahveleri de bulunur.",
    ],
    sections: [
      {
        title: "Grup planı nasıl yapılır?",
        body: "Kişi sayısı, tercih edilen saat ve varsa özel notlar WhatsApp üzerinden iletilerek masa uygunluğu sorulabilir.",
      },
      {
        title: "Paylaşılabilir menü",
        body: "Serpme Van kahvaltısı çoklu tabak yapısı sayesinde kalabalık masalarda ortak paylaşım için uygundur.",
      },
    ],
    questions: [faqItems[7], faqItems[3], faqItems[4], faqItems[6]],
  },
  {
    slug: "hafta-sonu-kahvalti",
    title: "Hafta Sonu Kahvaltı | Beyoğlu Taksim Van Kahvaltısı",
    description:
      "Hafta sonu Beyoğlu Taksim'de kahvaltı planı için çalışma saatleri, rezervasyon, serpme Van kahvaltısı fiyatı ve yol tarifi bilgileri.",
    h1: "Hafta sonu Beyoğlu kahvaltısı",
    eyebrow: "Hafta sonu",
    image: "/images/tea-service.jpg",
    ogImage: "/images/og/taksim-kahvalti.jpg",
    imageAlt: "Hafta sonu kahvaltısı için taze çay servisi",
    schemaType: "CollectionPage",
    keywords: ["hafta sonu kahvaltı Beyoğlu", "hafta sonu kahvaltı Taksim", "pazar kahvaltısı Beyoğlu"],
    localIntent: ["Beyoğlu hafta sonu kahvaltı", "Taksim pazar kahvaltısı"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi", "Cihangir"],
    intro: [
      "Hafta sonu kahvaltısında yoğunluk, açık saat ve rezervasyon bilgisi arama yapan misafirler için kritik bilgidir.",
      "Tarihi Van Kahvaltı Evi her gün 08:00 - 18:00 arasında açıktır; hafta sonu için önceden iletişim kurmak iyi olur.",
    ],
    highlights: [
      "Cumartesi ve pazar 08:00 - 18:00 saatleri arasında açıktır.",
      "Yoğun saatlerde rezervasyon veya masa uygunluğu için WhatsApp önerilir.",
      "Serpme Van kahvaltısı en az iki kişilik servis edilir.",
      "Kahvaltıdan sonra Beyoğlu yürüyüş rotaları yakındır.",
    ],
    sections: [
      {
        title: "Ne zaman gitmeli?",
        body: "Hafta sonu yoğunluğu değişebileceği için gitmeden önce telefon veya WhatsApp üzerinden güncel durum sorulabilir.",
      },
      {
        title: "Gün planı",
        body: "Kahvaltı sonrası İstiklal Caddesi, Cihangir veya Galata yönünde yürüyüşle gün devam ettirilebilir.",
      },
    ],
    questions: [faqItems[2], faqItems[3], faqItems[4], faqItems[5]],
  },
  {
    slug: "kahvalti-rezervasyon",
    title: "Kahvaltı Rezervasyon | Telefon ve WhatsApp ile Bilgi Al",
    description:
      "Tarihi Van Kahvaltı Evi kahvaltı rezervasyon bilgisi: telefon, WhatsApp, açık saatler, grup kahvaltısı, hafta sonu yoğunluğu ve yol tarifi.",
    h1: "Kahvaltı rezervasyon bilgisi",
    eyebrow: "Rezervasyon",
    image: "/images/interior-chair.jpg",
    ogImage: "/images/og/iletisim.jpg",
    imageAlt: "Tarihi binada kahvaltı rezervasyonu için iç mekan",
    schemaType: "ContactPage",
    keywords: ["kahvaltı rezervasyon Beyoğlu", "Taksim kahvaltı rezervasyon", "Van kahvaltısı rezervasyon"],
    localIntent: ["Beyoğlu kahvaltı rezervasyonu", "WhatsApp ile kahvaltı rezervasyon"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi", "Sıraselviler Caddesi"],
    intro: [
      "Rezervasyon aramalarında misafirlerin hızlıca telefon, WhatsApp, saat ve adres bilgisine ulaşması gerekir.",
      "Tarihi Van Kahvaltı Evi için güncel masa uygunluğu ve grup bilgisi +90 541 525 2868 numarasından alınabilir.",
    ],
    highlights: [
      `Telefon ve WhatsApp: ${displayPhone}`,
      `Çalışma saatleri: ${openingHours.short}`,
      `Adres: ${displayAddress}`,
      "Hafta sonu ve kalabalık gruplar için önceden iletişim önerilir.",
    ],
    sections: [
      {
        title: "WhatsApp ile bilgi",
        body: "Kişi sayısı, tarih ve saat bilgisi paylaşarak masa uygunluğunu hızlıca sorabilirsiniz.",
      },
      {
        title: "Telefonla ulaşım",
        body: "Güncel yoğunluk, fiyat ve yol tarifi için doğrudan işletme telefonu kullanılabilir.",
      },
      {
        title: "Grup notu",
        body: "Kalabalık gruplarda oturma düzeninin rahat hazırlanabilmesi için kişi sayısını önceden bildirmek faydalıdır.",
      },
    ],
    questions: [faqItems[3], faqItems[7], faqItems[2], faqItems[4]],
  },
  {
    slug: "van-otlu-peynir",
    title: "Van Otlu Peyniri | Van Kahvaltısının İmza Lezzeti",
    description:
      "Van otlu peyniri nedir, Van kahvaltısında nasıl yer alır? Beyoğlu Taksim'de serpme Van kahvaltısının yöresel peynir odağı.",
    h1: "Van otlu peyniri",
    eyebrow: "Yöresel lezzet",
    image: "/images/kete-detail.jpg",
    ogImage: "/images/og/van-kahvaltisi.jpg",
    imageAlt: "Van kahvaltısında yöresel peynir ve kete detayı",
    schemaType: "AboutPage",
    article: true,
    keywords: ["Van otlu peyniri", "otlu peynir kahvaltı", "Van kahvaltısı otlu peynir"],
    localIntent: ["Van otlu peyniri nerede yenir?", "Beyoğlu'nda otlu peynirli Van kahvaltısı"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi"],
    intro: [
      "Van otlu peyniri, Van kahvaltısını sıradan serpme kahvaltıdan ayıran en bilinen yöresel lezzetlerden biridir.",
      "Tarihi Van Kahvaltı Evi'nde otlu peynir, murtuğa, kavut, kete ve çayla birlikte sofranın merkezindeki tatlardan biri olarak sunulur.",
    ],
    highlights: [
      "Otlu peynir Van kahvaltısının imza ürünlerindendir.",
      "Serpme Van kahvaltısı içinde diğer yöresel lezzetlerle birlikte gelir.",
      "Kete, bal-kaymak ve sıcaklarla dengeli bir sofra oluşturur.",
      "Beyoğlu Taksim'de merkezi konumda deneyimlenebilir.",
    ],
    sections: [
      {
        title: "Sofradaki rolü",
        body: "Otlu peynir, kahvaltıya yöresel karakter ve belirgin aroma katar; sıcak murtuğa ve tatlı kavutla dengelenir.",
      },
      {
        title: "Nasıl eşleşir?",
        body: "Kete, bal-kaymak, cacık ve demli çay ile birlikte servis edildiğinde Van kahvaltısının ana dengesi ortaya çıkar.",
      },
    ],
    questions: [faqItems[0], faqItems[6], faqItems[4]],
  },
  {
    slug: "murtuga-kavut",
    title: "Murtuğa ve Kavut | Van Kahvaltısı Yöresel Sıcakları",
    description:
      "Murtuğa ve kavut nedir? Van kahvaltısında tereyağlı sıcak murtuğa, kavrulmuş un geleneği ve Beyoğlu'nda yöresel kahvaltı deneyimi.",
    h1: "Murtuğa ve kavut nedir?",
    eyebrow: "Van sıcakları",
    image: "/images/sucuk-egg.jpg",
    ogImage: "/images/og/serpme-van-kahvaltisi.jpg",
    imageAlt: "Bakır sahanda servis edilen Van kahvaltısı sıcakları",
    schemaType: "AboutPage",
    article: true,
    keywords: ["murtuğa", "kavut", "Van kahvaltısı murtuğa kavut"],
    localIntent: ["murtuğa nerede yenir?", "kavutlu Van kahvaltısı Beyoğlu"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi"],
    intro: [
      "Murtuğa ve kavut, Van kahvaltısının sıcak ve yöresel karakterini taşıyan iki önemli lezzettir.",
      "Beyoğlu'ndaki Tarihi Van Kahvaltı Evi'nde bu lezzetler serpme Van kahvaltısı deneyiminin ayırt edici parçaları arasında anlatılır.",
    ],
    highlights: [
      "Murtuğa un, tereyağı ve yumurta ile hazırlanan sıcak bir Van lezzetidir.",
      "Kavut kavrulmuş un geleneğinden gelen doyurucu bir kahvaltı tamamlayıcısıdır.",
      "İkisi de otlu peynir ve demli çayla birlikte Van sofrasını güçlendirir.",
      "Güncel servis ve fiyat bilgisi için işletmeyle iletişim kurulabilir.",
    ],
    sections: [
      {
        title: "Murtuğa",
        body: "Murtuğa, sıcak servis edilen ve kahvaltıya doyuruculuk katan geleneksel bir Van lezzetidir.",
      },
      {
        title: "Kavut",
        body: "Kavut, kavrulmuş un karakteriyle sofraya tatlı ve yöresel bir denge ekler.",
      },
      {
        title: "Neden birlikte anılır?",
        body: "Van kahvaltısında otlu peynir kadar sıcak lezzetler de kimlik oluşturur; murtuğa ve kavut bu yüzden sıkça birlikte aranır.",
      },
    ],
    questions: [faqItems[0], faqItems[4], faqItems[2]],
  },
  {
    slug: "kahvalti-yol-tarifi",
    title: "Kahvaltı Yol Tarifi | Taksim Metrodan Zambak Sokak'a",
    description:
      "Taksim metrodan Tarihi Van Kahvaltı Evi'ne yol tarifi: Zambak Sk. No:8, Şehit Muhtar Mahallesi, Beyoğlu adresine yürüyüş rotası.",
    h1: "Taksim metrodan kahvaltıya yol tarifi",
    eyebrow: "Yol tarifi",
    image: "/images/street-table.jpg",
    ogImage: "/images/og/iletisim.jpg",
    imageAlt: "Zambak Sokak Beyoğlu kahvaltı adresi",
    schemaType: "ContactPage",
    keywords: ["Taksim metro kahvaltı yol tarifi", "Zambak Sokak yol tarifi", "Tarihi Van Kahvaltı Evi adres"],
    localIntent: ["Taksim metrodan kahvaltı adresi", "Zambak Sokak nasıl gidilir"],
    nearbyLandmarks: ["Taksim Meydanı", "Sıraselviler Caddesi", "İstiklal Caddesi"],
    intro: [
      "Yol tarifi aramalarında açık adres, yakın durak ve harita bağlantısı en hızlı karar verdiren bilgilerdir.",
      "Tarihi Van Kahvaltı Evi, Taksim metro ve İstiklal Caddesi çevresinden yürüyerek ulaşılabilecek Zambak Sokak No:8 adresindedir.",
    ],
    highlights: [
      `Açık adres: ${displayAddress}`,
      "M2 Taksim metro durağına yürüme mesafesindedir.",
      "Google Haritalar bağlantısından rota alınabilir.",
      `Telefon: ${displayPhone}`,
    ],
    sections: [
      {
        title: "Taksim metrodan yürüyüş",
        body: "Taksim durağından Sıraselviler yönüne çıkıp Zambak Sokak'a ilerleyerek restorana ulaşabilirsiniz.",
      },
      {
        title: "İlk kez gelenler için",
        body: "Beyoğlu sokakları yoğun olabildiği için harita bağlantısını açıp adresi Zambak Sk. No:8 olarak kontrol etmek pratik olur.",
      },
    ],
    questions: [faqItems[5], faqItems[1], faqItems[2], faqItems[3]],
  },
  {
    slug: "zambak-sokak-kahvalti",
    title: "Zambak Sokak Kahvaltı | Taksim'de Van Sofrası",
    description:
      "Zambak Sokak'ta kahvaltı arayanlar için Şehit Muhtar Mahallesi No:8'de serpme Van kahvaltısı, açık adres, yol tarifi ve rezervasyon bilgisi.",
    h1: "Zambak Sokak'ta kahvaltı",
    eyebrow: "Zambak Sokak",
    image: "/images/street-table.jpg",
    ogImage: "/images/og/iletisim.jpg",
    imageAlt: "Zambak Sokak'ta Beyoğlu kahvaltı masası",
    schemaType: "ContactPage",
    keywords: ["Zambak Sokak kahvaltı", "Şehit Muhtar kahvaltı", "Zambak Sk No 8 kahvaltı"],
    localIntent: ["Zambak Sokak'ta kahvaltı", "Şehit Muhtar Mahallesi kahvaltı adresi"],
    nearbyLandmarks: ["Taksim Meydanı", "Sıraselviler Caddesi", "İstiklal Caddesi"],
    intro: [
      "Zambak Sokak kahvaltı aramalarında açık adres ve kısa yol tarifi en önemli bilgidir.",
      "Tarihi Van Kahvaltı Evi, Şehit Muhtar Mahallesi Zambak Sk. No:8 adresinde, Taksim ve İstiklal hattına yakın geleneksel Van kahvaltısı sunar.",
    ],
    highlights: [
      `Adres: ${displayAddress}`,
      "Taksim Meydanı ve İstiklal Caddesi'nden yürüyerek ulaşılabilir.",
      "Serpme Van kahvaltısı en az iki kişilik servis edilir.",
      `Rezervasyon ve yol tarifi için ${displayPhone} kullanılabilir.`,
    ],
    sections: [
      {
        title: "Açık adres nasıl bulunur?",
        body: "Haritada Zambak Sk. No:8, Şehit Muhtar Mahallesi, Beyoğlu olarak aratıldığında işletmenin Taksim ve Sıraselviler hattındaki konumu görünür.",
      },
      {
        title: "Sokak rotasına uygun kahvaltı",
        body: "Zambak Sokak konumu, kahvaltı sonrası İstiklal Caddesi, Cihangir ve Galata yönüne yürüyüş planı yapan misafirler için pratiktir.",
      },
    ],
    questions: [faqItems[1], faqItems[5], faqItems[3], faqItems[2]],
  },
  {
    slug: "siraselviler-kahvalti",
    title: "Sıraselviler Kahvaltı | Taksim'e Yakın Van Kahvaltısı",
    description:
      "Sıraselviler ve Cihangir çevresine yakın kahvaltı için Zambak Sokak'ta serpme Van kahvaltısı, sınırsız çay, yol tarifi ve fiyat bilgisi.",
    h1: "Sıraselviler'e yakın kahvaltı",
    eyebrow: "Sıraselviler",
    image: "/images/terrace-tea.jpg",
    ogImage: "/images/og/taksim-kahvalti.jpg",
    imageAlt: "Sıraselviler'e yakın terasta kahvaltı ve çay",
    schemaType: "CollectionPage",
    keywords: ["Sıraselviler kahvaltı", "Sıraselviler'e yakın kahvaltı", "Taksim Sıraselviler serpme kahvaltı"],
    localIntent: ["Sıraselviler çevresinde kahvaltı", "Taksim Sıraselviler Van kahvaltısı"],
    nearbyLandmarks: ["Sıraselviler Caddesi", "Cihangir", "Taksim Meydanı"],
    intro: [
      "Sıraselviler çevresinde kahvaltı arayanlar genellikle Taksim'e yakın, yürünebilir ve menüsü net bir mekan ister.",
      "Tarihi Van Kahvaltı Evi, Sıraselviler hattından Zambak Sokak'a kısa yürüyüşle ulaşılabilen geleneksel bir Van kahvaltısı adresidir.",
    ],
    highlights: [
      "Sıraselviler Caddesi ve Cihangir çevresinden yürüyerek gelmek mümkündür.",
      "Otlu peynir, murtuğa, kavut ve sınırsız çay sofranın öne çıkan lezzetleridir.",
      "Kişi başı yaklaşık fiyat bilgisi menü sayfasında takip edilebilir.",
      "Hafta sonu yoğunluğu için WhatsApp ile bilgi almak önerilir.",
    ],
    sections: [
      {
        title: "Sıraselviler'den rota",
        body: "Sıraselviler yönünden Zambak Sokak'a geçerek Taksim çevresindeki kahvaltı rotasını kısa bir yürüyüşle tamamlayabilirsiniz.",
      },
      {
        title: "Cihangir ve Taksim bağlantısı",
        body: "Konum, Cihangir'de konaklayanlar ve Taksim'de buluşan gruplar için ortak bir kahvaltı noktası oluşturur.",
      },
    ],
    questions: [faqItems[1], faqItems[4], faqItems[3], faqItems[6]],
  },
  {
    slug: "turkish-breakfast-istanbul",
    title: "Turkish Breakfast Istanbul | Van Breakfast Near Taksim",
    description:
      "Traditional Turkish breakfast in Istanbul near Taksim: Van breakfast spread with herbed cheese, murtuğa, kavut, endless tea and Kafka Cafe in Beyoğlu.",
    h1: "Traditional Turkish breakfast in Istanbul",
    eyebrow: "For visitors",
    image: "/images/hero-table.jpg",
    ogImage: "/images/og/van-kahvaltisi.jpg",
    imageAlt: "Traditional Turkish Van breakfast table in Istanbul Beyoğlu",
    language: "en",
    locale: "en_US",
    schemaType: "AboutPage",
    article: true,
    keywords: [
      "Turkish breakfast Istanbul",
      "Van breakfast Istanbul",
      "breakfast near Taksim",
      "breakfast near Taksim Square",
      "Istanbul breakfast for tourists",
      "traditional Turkish breakfast Beyoglu",
    ],
    localIntent: ["traditional Turkish breakfast near Taksim", "Van breakfast in Istanbul"],
    nearbyLandmarks: ["Taksim Square", "Istiklal Avenue", "Cihangir"],
    intro: [
      "Visitors looking for Turkish breakfast in Istanbul often need a central location, clear opening hours and a table that represents local breakfast culture.",
      "Tarihi Van Kahvaltı Evi serves a Van-style Turkish breakfast in Beyoğlu, close to Taksim, with herbed cheese, murtuğa, kavut, kete and endless tea.",
    ],
    highlights: [
      "Located at Zambak Sk. No:8 in Beyoğlu, close to Taksim Square.",
      "Open every day from 08:00 to 18:00.",
      "The Van breakfast spread is served for at least two guests.",
      "WhatsApp and phone contact are available for reservation information.",
    ],
    sections: [
      {
        title: "What makes Van breakfast different?",
        body: "Van breakfast is built around shared plates, regional herbed cheese, warm dishes such as murtuğa and kavut, and freshly brewed tea.",
      },
      {
        title: "Good fit for Istanbul itineraries",
        body: "The Beyoğlu location works well before walking along Istiklal Avenue, visiting Cihangir or continuing toward Galata.",
      },
      {
        title: "Helpful visitor notes",
        body: "Menus, current prices and table availability can change during busy periods, so checking by phone or WhatsApp before visiting is practical.",
      },
    ],
    questions: [
      {
        question: "Where is Tarihi Van Kahvaltı Evi located?",
        answer:
          `Tarihi Van Kahvaltı Evi is at ${displayAddress}, close to Taksim Square, Istiklal Avenue and Siraselviler in Beyoğlu, Istanbul.`,
      },
      {
        question: "What is served in the Van breakfast spread?",
        answer:
          "The table focuses on Van-style breakfast with herbed cheese, murtuğa, kavut, kete, honey and clotted cream, hot plates and freshly brewed tea.",
      },
      {
        question: "Is it suitable for tourists staying around Taksim?",
        answer:
          "Yes. The restaurant is in central Beyoğlu and works well for visitors before walking to Istiklal Avenue, Cihangir, Galata or other Istanbul routes.",
      },
      {
        question: "How can visitors ask about reservation or availability?",
        answer:
          `Visitors can call or send a WhatsApp message to ${displayPhone} for current table availability, opening hours and group information.`,
      },
    ],
  },
  {
    slug: "zavtrak-taksim-stambul",
    title: "Завтрак в Таксиме Стамбул | Турецкий завтрак Ван",
    description:
      "Традиционный турецкий завтрак в Стамбуле рядом с Таксим: завтрак Ван с сыром с травами, муртуга, кавут, чаем и Kafka Cafe в Бейоглу.",
    h1: "Турецкий завтрак рядом с Таксим",
    eyebrow: "Для туристов",
    image: "/images/hero-table.jpg",
    ogImage: "/images/og/taksim-kahvalti.jpg",
    imageAlt: "Традиционный турецкий завтрак Ван в Бейоглу Стамбул",
    language: "ru",
    locale: "ru_RU",
    schemaType: "AboutPage",
    article: true,
    keywords: [
      "завтрак Таксим",
      "турецкий завтрак Стамбул",
      "завтрак рядом с Таксим",
      "ванский завтрак Стамбул",
      "завтрак Бейоглу",
      "Taksim breakfast Russian tourists",
    ],
    localIntent: ["завтрак рядом с площадью Таксим", "турецкий завтрак для туристов в Стамбуле"],
    nearbyLandmarks: ["Площадь Таксим", "Улица Истикляль", "Сирасельвилер", "Джихангир"],
    intro: [
      "Туристам, которые ищут завтрак в Таксиме, обычно важны понятный адрес, близость к метро и традиционная турецкая еда без сложного маршрута.",
      "Tarihi Van Kahvaltı Evi находится в Бейоглу, недалеко от площади Таксим, и подает завтрак в стиле Ван: сыр с травами, муртуга, кавут, кете и свежий чай.",
    ],
    highlights: [
      `Адрес: ${displayAddress}, рядом с площадью Таксим и улицей Истикляль.`,
      "Открыто каждый день с 08:00 до 18:00.",
      "Завтрак Ван подается как общий стол минимум для двух гостей.",
      `Для информации о месте и бронировании можно написать в WhatsApp или позвонить: ${displayPhone}.`,
    ],
    sections: [
      {
        title: "Почему удобно для туристов",
        body: "Ресторан расположен в центральном районе Бейоглу: после завтрака удобно идти на улицу Истикляль, в Джихангир или продолжить прогулку к Галате.",
      },
      {
        title: "Что попробовать",
        body: "Главные вкусы стола Ван: сыр с травами, горячая муртуга, кавут, кете, мед со сливками и свежезаваренный чай.",
      },
      {
        title: "Оптимально для Яндекса и русскоязычных запросов",
        body: "Эта страница использует русские заголовки, описание, FAQ и hreflang-разметку, чтобы поисковые системы корректно понимали ее язык и туристический контекст Таксима.",
      },
    ],
    questions: [
      {
        question: "Где находится Tarihi Van Kahvaltı Evi?",
        answer:
          `Ресторан находится по адресу ${displayAddress}. От площади Таксим, улицы Истикляль и Сирасельвилер можно дойти пешком.`,
      },
      {
        question: "Что входит в турецкий завтрак Ван?",
        answer:
          "В основе стола сыр с травами, муртуга, кавут, кете, мед со сливками, горячие блюда и свежий чай.",
      },
      {
        question: "Подходит ли место для русских туристов в районе Таксим?",
        answer:
          "Да. Локация центральная, адрес понятный для навигации, а страница подготовлена на русском языке для запросов вроде завтрак Таксим и турецкий завтрак Стамбул.",
      },
      {
        question: "Как уточнить наличие мест?",
        answer:
          `Лучше заранее позвонить или написать в WhatsApp по номеру ${displayPhone}, особенно в выходные и для групп.`,
      },
    ],
  },
  {
    slug: "arabic-breakfast-taksim",
    title: "فطور تركي في تقسيم إسطنبول | فطور فان في بيوغلو",
    description:
      "فطور تركي تقليدي قرب تقسيم في إسطنبول: فطور فان مع جبن بالأعشاب، شاي، أطباق ساخنة، وموقع قريب من شارع الاستقلال.",
    h1: "فطور تركي قرب تقسيم في إسطنبول",
    eyebrow: "للزوار",
    image: "/images/breakfast-spread.jpg",
    ogImage: "/images/og/van-kahvaltisi.jpg",
    imageAlt: "مائدة فطور فان التركي في بيوغلو إسطنبول",
    language: "ar",
    locale: "ar_AR",
    schemaType: "AboutPage",
    article: true,
    keywords: [
      "فطور تركي اسطنبول",
      "فطور قرب تقسيم",
      "فطور فان",
      "فطور في بيوغلو",
      "مطعم فطور تركي تقسيم",
    ],
    localIntent: ["فطور تركي قرب ميدان تقسيم", "فطور للسياح في اسطنبول"],
    nearbyLandmarks: ["ميدان تقسيم", "شارع الاستقلال", "سيراسيلفيلر", "جيهانغير"],
    intro: [
      "للزوار الذين يبحثون عن فطور تركي في إسطنبول، الموقع الواضح والقرب من تقسيم وشارع الاستقلال يساعدان في التخطيط لليوم.",
      "يقدم Tarihi Van Kahvaltı Evi فطور فان التركي في بيوغلو مع جبن بالأعشاب، أطباق ساخنة، كيتا، عسل وقشطة، وشاي طازج.",
    ],
    highlights: [
      `العنوان: ${displayAddress}، قريب من ميدان تقسيم وشارع الاستقلال.`,
      "ساعات العمل يوميا من 08:00 إلى 18:00.",
      "فطور فان يقدم كمائدة مشاركة ومناسب لشخصين أو أكثر.",
      `للاستفسار عن الحجز أو التوفر يمكن الاتصال أو إرسال واتساب: ${displayPhone}.`,
    ],
    sections: [
      {
        title: "مناسب للسياح في تقسيم",
        body: "المطعم في بيوغلو، ويمكن الوصول إليه بسهولة من تقسيم وسيراسيلفيلر قبل جولة شارع الاستقلال أو جيهانغير.",
      },
      {
        title: "ماذا يوجد على المائدة؟",
        body: "تضم مائدة فان جبنا بالأعشاب، أطباقا ساخنة، كيتا، عسل وقشطة، وشايا تركيا طازجا.",
      },
      {
        title: "معلومات سريعة قبل الزيارة",
        body: "في عطلة نهاية الأسبوع أو مع المجموعات، من الأفضل التأكد عبر الهاتف أو واتساب من توفر الطاولات والأسعار الحالية.",
      },
    ],
    questions: [
      {
        question: "أين يقع Tarihi Van Kahvaltı Evi؟",
        answer:
          `يقع المطعم في ${displayAddress}، على مسافة قريبة من ميدان تقسيم وشارع الاستقلال في بيوغلو.`,
      },
      {
        question: "هل الفطور مناسب للسياح حول تقسيم؟",
        answer:
          "نعم، الموقع مركزي وقريب من مسارات المشي في بيوغلو، لذلك يناسب الزوار قبل جولة إسطنبول.",
      },
      {
        question: "ما أبرز أطباق فطور فان؟",
        answer:
          "تشمل المائدة جبنا بالأعشاب، أطباقا ساخنة، كيتا، عسل وقشطة، وشايا طازجا.",
      },
      {
        question: "كيف يمكن الاستفسار عن الحجز؟",
        answer:
          `يمكن الاتصال أو إرسال رسالة واتساب إلى ${displayPhone} لمعرفة التوفر الحالي.`,
      },
    ],
  },
  {
    slug: "tarihi-mekanda-kahvalti",
    title: "Tarihi Mekanda Kahvaltı | Beyoğlu'nda Rum Binasında Van Sofrası",
    description:
      "Beyoğlu'nda tarihi mekanda kahvaltı: Zambak Sokak'taki tarihi Rum binasında serpme Van kahvaltısı, balkon, teras ve Kafka Cafe atmosferi.",
    h1: "Beyoğlu'nda tarihi mekanda kahvaltı",
    eyebrow: "Tarihi mekan",
    image: "/images/interior-chair.jpg",
    ogImage: "/images/og/home.jpg",
    imageAlt: "Beyoğlu'nda tarihi Rum binası iç mekan kahvaltı atmosferi",
    schemaType: "AboutPage",
    article: true,
    keywords: ["tarihi mekanda kahvaltı", "Beyoğlu tarihi kahvaltı", "Rum binasında kahvaltı"],
    localIntent: ["Beyoğlu'nda tarihi mekanda kahvaltı", "Taksim tarihi bina kahvaltı"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi", "Cihangir"],
    intro: [
      "Tarihi mekanda kahvaltı arayanlar için atmosfer, ulaşım ve menünün yerel karakteri birlikte önem kazanır.",
      "Tarihi Van Kahvaltı Evi, Beyoğlu'ndaki tarihi Rum binasında Van kahvaltısı geleneğini balkon, teras ve taş doku hissiyle birleştirir.",
    ],
    highlights: [
      "Tarihi bina atmosferi kahvaltı deneyiminin ayırt edici parçasıdır.",
      "Balkon ve teras alanları mevsim ve uygunluğa göre deneyime eşlik eder.",
      "Menü Van otlu peyniri, murtuğa, kavut ve sınırsız çay etrafında şekillenir.",
      "Kahvaltı sonrası Kafka Cafe'de kahve molası verilebilir.",
    ],
    sections: [
      {
        title: "Mekan deneyimi",
        body: "Tarihi yapı dokusu, kahvaltıyı sadece menüden ibaret olmayan, Beyoğlu'nun eski sokaklarıyla bağlantılı bir deneyime dönüştürür.",
      },
      {
        title: "Sofra ile atmosferin uyumu",
        body: "Bakır sahanlar, sıcak çay ve yöresel Van lezzetleri tarihi binanın sakin ritmiyle birlikte algılanır.",
      },
    ],
    questions: [faqItems[1], faqItems[0], faqItems[2], faqItems[8]],
  },
  {
    slug: "kahvalti-sonrasi-kahve",
    title: "Kahvaltı Sonrası Kahve | Beyoğlu Kafka Cafe",
    description:
      "Beyoğlu'nda kahvaltı sonrası kahve için Tarihi Van Kahvaltı Evi içindeki Kafka Cafe: Türk kahvesi, nitelikli kahve ve Taksim'e yakın konum.",
    h1: "Beyoğlu'nda kahvaltı sonrası kahve",
    eyebrow: "Kahve rotası",
    image: "/images/coffee-moment.jpg",
    ogImage: "/images/og/kafka-cafe.jpg",
    imageAlt: "Beyoğlu Kafka Cafe kahvaltı sonrası kahve molası",
    schemaType: "CollectionPage",
    keywords: ["kahvaltı sonrası kahve Beyoğlu", "Kafka Cafe Beyoğlu", "Taksim kahve kahvaltı"],
    localIntent: ["Beyoğlu kahvaltı sonrası kahve", "Taksim kahvaltı ve kahve"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi", "Cihangir"],
    intro: [
      "Kahvaltı sonrası kahve arayan misafirler için aynı adreste sohbeti uzatabilmek pratik bir avantajdır.",
      "Kafka Cafe, Tarihi Van Kahvaltı Evi'nin içinde Türk kahvesi ve nitelikli kahve seçenekleriyle kahvaltı deneyimini tamamlar.",
    ],
    highlights: [
      "Kafka Cafe aynı adreste, kahvaltı mekanının içinde yer alır.",
      "Türk kahvesi ve nitelikli kahve seçenekleri sunulur.",
      "Taksim ve İstiklal rotasına yakın kahve molası için uygundur.",
      "Kahvaltıdan sonra masada sohbeti uzatmak isteyenler için ayrı bir odak oluşturur.",
    ],
    sections: [
      {
        title: "Kahvaltıdan kahveye kesintisiz geçiş",
        body: "Uzun Van kahvaltısı sonrası mekan değiştirmeden Türk kahvesi ya da nitelikli kahve içmek özellikle grup buluşmalarını kolaylaştırır.",
      },
      {
        title: "Beyoğlu yürüyüşünden önce",
        body: "Kahve molası, İstiklal Caddesi veya Cihangir yönüne devam etmeden önce sakin bir ara vermek isteyen misafirler için uygundur.",
      },
    ],
    questions: [faqItems[8], faqItems[1], faqItems[2], faqItems[3]],
  },
  {
    slug: "vejetaryen-kahvalti-beyoglu",
    title: "Vejetaryen Kahvaltı Beyoğlu | Van Sofrasında Etsiz Seçenekler",
    description:
      "Beyoğlu'nda vejetaryen kahvaltı arayanlar için Van otlu peyniri, murtuğa, kavut, kete, bal-kaymak, cacık ve sınırsız çay odaklı sofra notları.",
    h1: "Beyoğlu'nda vejetaryen kahvaltı notları",
    eyebrow: "Seçenekler",
    image: "/images/kete-detail.jpg",
    ogImage: "/images/og/van-kahvaltisi.jpg",
    imageAlt: "Van kahvaltısında kete, peynir ve etsiz kahvaltılık detayları",
    schemaType: "AboutPage",
    keywords: ["vejetaryen kahvaltı Beyoğlu", "etsiz kahvaltı Taksim", "otlu peynir kahvaltı"],
    localIntent: ["Beyoğlu vejetaryen kahvaltı", "Taksim etsiz serpme kahvaltı"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi", "Cihangir"],
    intro: [
      "Vejetaryen kahvaltı arayan misafirler için sofradaki ürünlerin içeriğini ve sıcak seçenekleri önceden bilmek rahatlatıcıdır.",
      "Van kahvaltısı; otlu peynir, murtuğa, kavut, kete, bal-kaymak, cacık ve çay gibi etsiz lezzetlerle güçlü bir kahvaltı zemini sunar.",
    ],
    highlights: [
      "Otlu peynir, kete, bal-kaymak, cacık, murtuğa, kavut ve çay etsiz sofranın öne çıkan parçalarıdır.",
      "Sucuklu yumurta gibi etli sıcaklar ayrı tercih olarak düşünülebilir.",
      "Özel hassasiyet ve içerik soruları için gitmeden önce işletmeyle iletişime geçmek önerilir.",
      "Taksim'e yakın konum, farklı beslenme tercihleri olan gruplar için buluşmayı kolaylaştırır.",
    ],
    sections: [
      {
        title: "Sofrada etsiz lezzetler",
        body: "Van kahvaltısının peynir, hamur işi, bal-kaymak ve yöresel sıcaklar etrafındaki yapısı, et tüketmeyen misafirler için birçok seçenek sunar.",
      },
      {
        title: "İçerik teyidi",
        body: "Yumurta, süt ürünü veya özel alerjen hassasiyeti olan misafirlerin güncel hazırlık bilgisini telefon ya da WhatsApp üzerinden teyit etmesi en sağlıklı yoldur.",
      },
    ],
    questions: [faqItems[0], faqItems[3], faqItems[4], faqItems[2]],
  },
  {
    slug: "beyoglu-kahvalti-mekanlari",
    title: "Beyoğlu Kahvaltı Mekanları | Van Kahvaltısı Seçim Rehberi",
    description:
      "Beyoğlu kahvaltı mekanları arasında seçim yaparken konum, menü içeriği, fiyat, rezervasyon ve tarihi mekan atmosferi için pratik Van kahvaltısı rehberi.",
    h1: "Beyoğlu kahvaltı mekanları nasıl seçilir?",
    eyebrow: "Seçim rehberi",
    image: "/images/balcony-breakfast.jpg",
    ogImage: "/images/og/beyoglu-kahvalti.jpg",
    imageAlt: "Beyoğlu kahvaltı mekanları arasında balkonlu Van kahvaltısı",
    schemaType: "AboutPage",
    article: true,
    keywords: ["Beyoğlu kahvaltı mekanları", "Beyoğlu kahvaltı önerisi", "Taksim kahvaltı mekanları"],
    localIntent: ["Beyoğlu kahvaltı mekanı seçimi", "Taksim kahvaltı önerisi"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi", "Galata"],
    intro: [
      "Beyoğlu kahvaltı mekanları arasında seçim yaparken sadece menü değil; yürüyüş mesafesi, açık saat, fiyat bilgisi ve masa uygunluğu da karar verir.",
      "Tarihi Van Kahvaltı Evi, Taksim'e yakın konumu, Van kahvaltısı odağı ve tarihi bina atmosferiyle bu arama niyetlerinin çoğunu aynı sayfada yanıtlar.",
    ],
    highlights: [
      "Konum Taksim ve İstiklal hattına yakındır.",
      "Menü, klasik serpme kahvaltıdan farklı olarak Van otlu peyniri, murtuğa ve kavutla ayrışır.",
      "Fiyat ve rezervasyon bilgisi sitede açıkça belirtilir.",
      "Aile, grup ve turistik rota kahvaltıları için ayrı bilgi sayfaları bulunur.",
    ],
    sections: [
      {
        title: "Konum ve ulaşım",
        body: "Beyoğlu'nda kahvaltı mekanı seçerken metroya, yürüyüş rotalarına ve buluşma noktalarına yakınlık özellikle hafta sonları önemlidir.",
      },
      {
        title: "Menü şeffaflığı",
        body: "Serpme kahvaltının neleri içerdiği, fiyatın kişi başı mı masa başı mı olduğu ve çayın dahil olup olmadığı karar sürecini hızlandırır.",
      },
      {
        title: "Atmosfer ve süre",
        body: "Tarihi bina, balkon/teras ve kahvaltı sonrası kahve seçeneği, hızlı bir öğünden çok uzun sohbetli kahvaltı isteyenler için belirleyici olabilir.",
      },
    ],
    questions: [faqItems[1], faqItems[4], faqItems[7], faqItems[8]],
  },
  {
    slug: "taksim-brunch-kahvalti",
    title: "Taksim Brunch ve Kahvaltı | Serpme Van Sofrası",
    description:
      "Taksim brunch ve geç kahvaltı planı için Beyoğlu Zambak Sokak'ta Van kahvaltısı, çalışma saatleri, rezervasyon, fiyat ve kahve bilgisi.",
    h1: "Taksim'de brunch ve geç kahvaltı",
    eyebrow: "Brunch",
    image: "/images/tea-service.jpg",
    ogImage: "/images/og/taksim-kahvalti.jpg",
    imageAlt: "Taksim brunch ve geç kahvaltı için çay servisi",
    schemaType: "CollectionPage",
    keywords: ["Taksim brunch", "Taksim geç kahvaltı", "Beyoğlu brunch kahvaltı"],
    localIntent: ["Taksim brunch", "Beyoğlu geç kahvaltı"],
    nearbyLandmarks: ["Taksim Meydanı", "İstiklal Caddesi", "Sıraselviler Caddesi"],
    intro: [
      "Taksim'de brunch veya geç kahvaltı planlayanlar için servis saatleri, masa uygunluğu ve kahvaltı içeriği özellikle önemlidir.",
      "Tarihi Van Kahvaltı Evi her gün 08:00 - 18:00 arasında, uzun oturmaya uygun serpme Van kahvaltısı ve kahve seçenekleri sunar.",
    ],
    highlights: [
      "Geç kahvaltı ve brunch planı için 08:00 - 18:00 saat aralığı kullanılabilir.",
      "Serpme Van kahvaltısı en az iki kişilik servis edilir.",
      "Kahvaltı sonrası Kafka Cafe kahveleriyle sohbet uzatılabilir.",
      "Yoğun saatler için önceden telefon veya WhatsApp önerilir.",
    ],
    sections: [
      {
        title: "Brunch için saat planı",
        body: "Taksim çevresinde geç buluşan gruplar, gitmeden önce yoğunluk bilgisi alarak daha rahat masa planı yapabilir.",
      },
      {
        title: "Uzun oturmalı sofra",
        body: "Serpme Van kahvaltısı, küçük tabakların paylaşılması ve sürekli çay servisi sayesinde brunch ritmine doğal olarak uyum sağlar.",
      },
    ],
    questions: [faqItems[2], faqItems[3], faqItems[4], faqItems[6]],
  },
];

export function absoluteUrl(path = "") {
  if (!path) {
    return siteUrl;
  }

  if (path.startsWith("http")) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const homeLanguageAlternates = {
  "tr-TR": siteUrl,
  tr: siteUrl,
  en: absoluteUrl("turkish-breakfast-istanbul"),
  ru: absoluteUrl("zavtrak-taksim-stambul"),
  ar: absoluteUrl("arabic-breakfast-taksim"),
  "x-default": siteUrl,
};

export const internationalSeoSlugs = new Set([
  "turkish-breakfast-istanbul",
  "zavtrak-taksim-stambul",
  "arabic-breakfast-taksim",
]);

export function getPageLanguage(page?: SeoPage) {
  return page?.language ?? "tr-TR";
}

export function getPageLocale(page?: SeoPage) {
  return page?.locale ?? "tr_TR";
}

export function getPageLanguageAlternates(page?: SeoPage, url = siteUrl) {
  if (page && internationalSeoSlugs.has(page.slug)) {
    return homeLanguageAlternates;
  }

  return {
    "tr-TR": url,
    tr: url,
    "x-default": url,
  };
}

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const existingOgImagePaths = new Set([
  "/images/og/beyoglu-kahvalti.jpg",
  "/images/og/home.jpg",
  "/images/og/iletisim.jpg",
  "/images/og/kafka-cafe.jpg",
  "/images/og/kahvalti-fiyatlari.jpg",
  "/images/og/menu.jpg",
  "/images/og/serpme-van-kahvaltisi.jpg",
  "/images/og/sss.jpg",
  "/images/og/taksim-kahvalti.jpg",
  "/images/og/van-kahvaltisi.jpg",
]);

export function pageOgImagePath(slug: string) {
  const page = getSeoPage(slug);
  if (page?.ogImage) {
    return page.ogImage;
  }

  const expectedPath = `/images/og/${slug}.jpg`;
  return existingOgImagePaths.has(expectedPath) ? expectedPath : defaultOgImagePath;
}

export function createPageMetadata(page: SeoPage): Metadata {
  const url = absoluteUrl(page.slug);
  const image = absoluteUrl(pageOgImagePath(page.slug));
  const pageKeywords = [...new Set([...(page.keywords ?? []), ...keywords])];
  const pageLanguage = getPageLanguage(page);

  return {
    title: page.title,
    description: page.description,
    keywords: pageKeywords,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "restaurant",
    alternates: {
      canonical: url,
      languages: getPageLanguageAlternates(page, url),
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: page.imageAlt,
        },
      ],
      locale: getPageLocale(page),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
    other: {
      "geo.region": "TR-34",
      "geo.country": address.country,
      "geo.placename": "Beyoğlu, İstanbul",
      "geo.position": `${coordinates.latitude};${coordinates.longitude}`,
      ICBM: `${coordinates.latitude}, ${coordinates.longitude}`,
      "placename": "Taksim, Beyoğlu, İstanbul",
      "coverage": localAreas.join(", "),
      "target": geoSearchIntents.join(", "),
      "business:contact_data:street_address": address.streetAddress,
      "business:contact_data:locality": address.locality,
      "business:contact_data:region": address.region,
      "business:contact_data:postal_code": address.postalCode,
      "business:contact_data:country_name": address.countryName,
      "business:contact_data:phone_number": displayPhone,
      "business:contact_data:email": email,
      "business:contact_data:website": siteUrl,
      "place:location:latitude": String(coordinates.latitude),
      "place:location:longitude": String(coordinates.longitude),
      "article:modified_time": dateModifiedIso,
      "og:updated_time": dateModifiedIso,
      "restaurant:contact_info:phone_number": displayPhone,
      "restaurant:contact_info:website": siteUrl,
      "restaurant:contact_info:street_address": address.streetAddress,
      "restaurant:contact_info:locality": address.locality,
      "restaurant:contact_info:region": address.region,
      "restaurant:contact_info:postal_code": address.postalCode,
      "restaurant:contact_info:country_name": address.countryName,
      "content-language": pageLanguage,
      ...(page.article
        ? {
            "article:published_time": dateModifiedIso,
            "article:section": page.eyebrow,
            "article:tag": [...new Set([...(page.keywords ?? []), ...(page.localIntent ?? [])])].join(", "),
          }
        : {}),
    },
  };
}

export function buildMenuJsonLd() {
  return {
    "@type": "Menu",
    "@id": `${siteUrl}/menu#menu`,
    name: `${siteName} Menüsü`,
    url: `${siteUrl}/menu`,
    description: "Serpme Van kahvaltısı, sıcaklar ve Kafka Cafe kahveleri.",
    inLanguage: "tr-TR",
    provider: { "@id": `${siteUrl}/#restaurant` },
    hasMenuSection: menuSections.map((section) => ({
      "@type": "MenuSection",
      name: section.name,
      description: section.description,
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: item.price
          ? {
              "@type": "Offer",
              price: item.price,
              priceCurrency: item.priceCurrency,
              availability: "https://schema.org/InStock",
              url: `${siteUrl}/menu`,
              seller: { "@id": `${siteUrl}/#restaurant` },
              eligibleRegion: {
                "@type": "Country",
                name: "Türkiye",
              },
            }
          : undefined,
      })),
    })),
  };
}

export function buildWebsiteJsonLd(withContext = true) {
  const data = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    alternateName,
    url: siteUrl,
    inLanguage: supportedLanguages,
    dateModified: dateModifiedIso,
    publisher: { "@id": `${siteUrl}/#restaurant` },
    about: { "@id": `${siteUrl}/#restaurant` },
    keywords: keywords.join(", "),
    audience: {
      "@type": "Audience",
      audienceType:
        "İstanbul'da kahvaltı, Beyoğlu, Taksim, Van kahvaltısı ve turistik kahvaltı rotası arayan misafirler",
    },
    hasPart: seoPages.map((page) => ({
      "@type": page.schemaType ?? "WebPage",
      "@id": `${absoluteUrl(page.slug)}#webpage`,
      url: absoluteUrl(page.slug),
      name: page.title,
      description: page.description,
      inLanguage: getPageLanguage(page),
    })),
    sameAs: sameAsUrls,
  };

  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildHomeWebPageJsonLd(withContext = true) {
  const data = {
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: siteUrl,
    name: "Tarihi Van Kahvaltı Evi | Taksim Beyoğlu Serpme Van Kahvaltısı",
    headline: "Tarihi Van Kahvaltı Evi",
    description:
      "Beyoğlu Taksim'de 1978'den beri geleneksel serpme Van kahvaltısı, otlu peynir, murtuğa, kavut, sınırsız çay ve Kafka Cafe deneyimi.",
    inLanguage: "tr-TR",
    dateModified: dateModifiedIso,
    datePublished: dateModified,
    isAccessibleForFree: true,
    keywords: keywords.join(", "),
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: [
      { "@id": `${siteUrl}/#restaurant` },
      { "@id": `${siteUrl}/#geo-search-coverage` },
    ],
    mainEntity: { "@id": `${siteUrl}/#restaurant` },
    spatialCoverage: { "@id": `${siteUrl}/#geo-search-coverage` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: defaultOgImage,
      width: 1200,
      height: 630,
      caption: `${siteName} serpme Van kahvaltısı`,
    },
    significantLink: seoPages.map((page) => absoluteUrl(page.slug)),
  };

  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildImageGalleryJsonLd(withContext = true) {
  const images = [
    { url: "/images/hero-table.jpg", name: "Serpme Van kahvaltısı sofrası" },
    { url: "/images/breakfast-spread.jpg", name: "Bakır sahanlarda Van kahvaltısı" },
    { url: "/images/balcony-breakfast.jpg", name: "Beyoğlu balkon kahvaltısı" },
    { url: "/images/tea-service.jpg", name: "Sınırsız çay servisi" },
    { url: "/images/coffee-moment.jpg", name: "Kafka Cafe kahve molası" },
    { url: "/images/interior-chair.jpg", name: "Tarihi Rum binası iç mekan" },
  ];

  const data = {
    "@type": "ImageGallery",
    "@id": `${siteUrl}/#image-gallery`,
    name: `${siteName} görsel galerisi`,
    url: `${siteUrl}/#gallery`,
    inLanguage: "tr-TR",
    about: { "@id": `${siteUrl}/#restaurant` },
    associatedMedia: images.map((image) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(image.url),
      url: absoluteUrl(image.url),
      name: image.name,
      caption: image.name,
      representativeOfPage: image.url === defaultImage,
    })),
  };

  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildLocalPagesItemListJsonLd(withContext = true) {
  const data = {
    "@type": "ItemList",
    "@id": `${siteUrl}/#local-breakfast-guide`,
    name: "Beyoğlu Taksim Van kahvaltısı yerel rehberi",
    description:
      "Tarihi Van Kahvaltı Evi'nin menü, yol tarifi, rezervasyon, semt ve yöresel lezzet sayfaları.",
    inLanguage: "tr-TR",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: seoPages.length,
    itemListElement: seoPages.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.h1,
      url: absoluteUrl(page.slug),
      item: {
        "@type": page.schemaType ?? "WebPage",
        "@id": `${absoluteUrl(page.slug)}#webpage`,
        name: page.title,
        description: page.description,
        url: absoluteUrl(page.slug),
        inLanguage: getPageLanguage(page),
      },
    })),
  };

  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildGeoCoverageJsonLd(withContext = true) {
  const data = {
    "@type": "ItemList",
    "@id": `${siteUrl}/#geo-search-coverage`,
    name: "Tarihi Van Kahvaltı Evi geo arama kapsamı",
    description:
      "Beyoğlu Taksim çevresinde Van kahvaltısı, serpme kahvaltı, yol tarifi ve turist kahvaltısı aramaları için yerel kapsam.",
    inLanguage: ["tr-TR", "en", "ru", "ar"],
    about: { "@id": `${siteUrl}/#restaurant` },
    spatialCoverage: [
      {
        "@type": "Place",
        name: "Beyoğlu, İstanbul",
        geo: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
          geoRadius: "2500",
        },
      },
      ...localAreaProfiles.map((area) => ({
        "@type": "Place",
        name: area.name,
        additionalType: `https://schema.org/${area.type}`,
        description: area.relation,
      })),
    ],
    itemListElement: localAreaProfiles.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: area.name,
      description: area.relation,
      item: {
        "@type": "Place",
        name: area.name,
        additionalType: `https://schema.org/${area.type}`,
        description: area.searchIntent,
      },
    })),
    keywords: geoSearchIntents.join(", "),
  };

  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildDirectionsHowToJsonLd(withContext = true) {
  const data = {
    "@type": "HowTo",
    "@id": `${siteUrl}/kahvalti-yol-tarifi#howto`,
    name: "Taksim metrodan Tarihi Van Kahvaltı Evi'ne nasıl gidilir?",
    description:
      "M2 Taksim durağından Sıraselviler yönüne çıkıp Zambak Sokak No:8 adresindeki Tarihi Van Kahvaltı Evi'ne yürüyüş rotası.",
    inLanguage: "tr-TR",
    totalTime: "PT6M",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Google Haritalar rota bağlantısı",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "M2 Taksim durağından çıkış",
        text: "Taksim metro durağından Sıraselviler yönüne çıkın.",
        url: `${siteUrl}/kahvalti-yol-tarifi#quick-answer`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Zambak Sokak'a yürüyüş",
        text: "Sıraselviler hattından Zambak Sokak'a ilerleyip No:8 adresine ulaşın.",
        url: `${siteUrl}/kahvalti-yol-tarifi#page-faq`,
      },
    ],
  };

  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildRestaurantJsonLd(withContext = true) {
  const areaServed = localAreas.map((area) => ({
    "@type": area === "İstanbul" ? "City" : "Place",
    name: area,
  }));

  const data = {
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: siteName,
    alternateName,
    legalName: siteName,
    url: siteUrl,
    identifier: siteUrl,
    logo: `${siteUrl}/images/brand-icon-small.png`,
    image: [
      `${siteUrl}/images/hero-table.jpg`,
      `${siteUrl}/images/breakfast-spread.jpg`,
      `${siteUrl}/images/balcony-breakfast.jpg`,
      `${siteUrl}/images/interior-chair.jpg`,
    ],
    description:
      "Beyoğlu Taksim'deki tarihi Rum binasında 1978'den beri geleneksel serpme Van kahvaltısı, otlu peynir, murtuğa, kavut, sınırsız çay ve Kafka Cafe kahve deneyimi sunan restoran.",
    slogan: "Van kahvaltısı, tarihle aynı sofrada.",
    foundingDate,
    telephone: phoneE164,
    email,
    priceRange: "₺₺",
    currenciesAccepted: "TRY",
    paymentAccepted: "Nakit, Kredi Kartı, Banka Kartı",
    acceptsReservations: true,
    servesCuisine: cuisine,
    knowsLanguage: supportedLanguages,
    keywords: [...new Set([...keywords, ...geoSearchIntents])].join(", "),
    brand: {
      "@type": "Brand",
      name: siteName,
      url: siteUrl,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.streetAddress}, ${address.neighborhood}`,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    location: {
      "@type": "Place",
      name: "Zambak Sokak, Şehit Muhtar Mahallesi",
      address: {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress,
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
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
    map: mapsUrl,
    hasMap: mapsUrl,
    mainEntityOfPage: { "@id": `${siteUrl}/#webpage` },
    openingHours: "Mo-Su 08:00-18:00",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: openingHours.days,
        opens: openingHours.opens,
        closes: openingHours.closes,
      },
    ],
    areaServed,
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
      geoRadius: "2500",
    },
    containedInPlace: {
      "@type": "Place",
      name: "Şehit Muhtar Mahallesi, Taksim",
      address: {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress,
        addressLocality: address.locality,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: address.country,
      },
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phoneE164,
        contactType: "reservations",
        availableLanguage: supportedLanguages,
        areaServed: "TR",
      },
      {
        "@type": "ContactPoint",
        telephone: phoneE164,
        contactType: "customer service",
        availableLanguage: supportedLanguages,
        areaServed: "TR",
      },
    ],
    knowsAbout: [
      "Van kahvaltısı",
      "Serpme kahvaltı",
      "Van otlu peyniri",
      "Murtuğa",
      "Kavut",
      "Kete",
      "Türk kahvesi",
      "Beyoğlu kahvaltı",
      "Taksim kahvaltı",
      "Sıraselviler kahvaltı",
      "Zambak Sokak kahvaltı",
      "Turkish breakfast Istanbul",
      "Breakfast near Taksim",
      "Istanbul breakfast for tourists",
      "завтрак Таксим",
      "турецкий завтрак Стамбул",
      "завтрак рядом с Таксим",
      "فطور تركي اسطنبول",
      "فطور قرب تقسيم",
      ...geoSearchIntents,
    ],
    spatialCoverage: [
      {
        "@type": "Place",
        name: "Beyoğlu, İstanbul",
        geo: {
          "@type": "GeoCoordinates",
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
      },
      ...localAreaProfiles.map((area) => ({
        "@type": "Place",
        name: area.name,
        additionalType: `https://schema.org/${area.type}`,
        description: area.relation,
      })),
    ],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Minimum serpme kahvaltı servisi",
        value: "En az iki kişilik",
      },
      {
        "@type": "PropertyValue",
        name: "Yakın toplu taşıma",
        value: transitAccess.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Rezervasyon kanalı",
        value: "Telefon ve WhatsApp",
      },
      {
        "@type": "PropertyValue",
        name: "Öne çıkan yerel lezzetler",
        value: "Van otlu peyniri, murtuğa, kavut, kete, sınırsız çay",
      },
      {
        "@type": "PropertyValue",
        name: "Turist ve yabancı dil sayfaları",
        value: "English, Russian and Arabic visitor pages are available with reciprocal hreflang links.",
      },
      {
        "@type": "PropertyValue",
        name: "Yandex uyumlu yerelleştirme",
        value: "Русская страница использует видимый русский текст, canonical URL and head hreflang markup.",
      },
      {
        "@type": "PropertyValue",
        name: "Geo arama kapsamı",
        value: geoSearchIntents.join(", "),
      },
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Tarihi bina", value: true },
      { "@type": "LocationFeatureSpecification", name: "Balkon", value: true },
      { "@type": "LocationFeatureSpecification", name: "Teras", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sınırsız çay", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kafka Cafe", value: true },
      { "@type": "LocationFeatureSpecification", name: "WhatsApp ile bilgi", value: true },
    ],
    menu: `${siteUrl}/menu`,
    hasMenu: { "@id": `${siteUrl}/menu#menu` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${siteName} kahvaltı ve kahve seçenekleri`,
      itemListElement: menuSections.map((section) => ({
        "@type": "OfferCatalog",
        name: section.name,
        description: section.description,
        itemListElement: section.items.map((item) => ({
          "@type": "Offer",
          name: item.name,
          description: item.description,
          price: item.price,
          priceCurrency: item.priceCurrency,
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/menu`,
        })),
      })),
    },
    makesOffer: menuSections.flatMap((section) =>
      section.items
        .filter((item) => item.price)
        .map((item) => ({
          "@type": "Offer",
          name: item.name,
          description: item.description,
          price: item.price,
          priceCurrency: item.priceCurrency,
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/menu`,
          seller: { "@id": `${siteUrl}/#restaurant` },
          itemOffered: {
            "@type": "Service",
            name: item.name,
            serviceType: section.name,
            areaServed,
          },
        })),
    ),
    department: {
      "@type": "CafeOrCoffeeShop",
      "@id": `${siteUrl}/kafka-cafe#cafe`,
      name: "Kafka Cafe",
      url: `${siteUrl}/kafka-cafe`,
      telephone: phoneE164,
      image: `${siteUrl}/images/coffee-moment.jpg`,
      priceRange: "₺₺",
      servesCuisine: ["Türk kahvesi", "Nitelikli kahve", "Coffee"],
      openingHours: "Mo-Su 08:00-18:00",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: openingHours.days,
          opens: openingHours.opens,
          closes: openingHours.closes,
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress,
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
      parentOrganization: { "@id": `${siteUrl}/#restaurant` },
    },
    potentialAction: [
      {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: whatsappUrl,
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
        name: "WhatsApp ile rezervasyon bilgisi al",
      },
      {
        "@type": "CommunicateAction",
        target: telUrl,
        name: "Telefonla ara",
      },
    ],
    sameAs: sameAsUrls,
    subjectOf: [
      {
        "@type": "DigitalDocument",
        "@id": `${siteUrl}/llms.txt`,
        url: `${siteUrl}/llms.txt`,
        name: "Kısa AI işletme özeti",
        encodingFormat: "text/plain",
      },
      {
        "@type": "DigitalDocument",
        "@id": `${siteUrl}/llms-full.txt`,
        url: `${siteUrl}/llms-full.txt`,
        name: "Detaylı AI işletme özeti",
        encodingFormat: "text/plain",
      },
      {
        "@type": "DataFeed",
        "@id": `${siteUrl}/business-profile.json`,
        url: `${siteUrl}/business-profile.json`,
        name: "Makine okunur işletme profili",
        encodingFormat: "application/json",
      },
    ],
  };

  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildArticleJsonLd(page: SeoPage, pageUrl = absoluteUrl(page.slug), withContext = true) {
  const data = {
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: page.h1,
    name: page.title,
    description: page.description,
    image: absoluteUrl(page.image),
    inLanguage: getPageLanguage(page),
    datePublished: dateModified,
    dateModified: dateModifiedIso,
    isAccessibleForFree: true,
    keywords: [...new Set([...(page.keywords ?? []), ...(page.localIntent ?? [])])].join(", "),
    author: { "@id": `${siteUrl}/#restaurant` },
    publisher: { "@id": `${siteUrl}/#restaurant` },
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    articleSection: page.eyebrow,
    about: [
      { "@id": `${siteUrl}/#restaurant` },
      ...(page.localIntent ?? []).map((intent) => ({
        "@type": "Thing",
        name: intent,
      })),
    ],
    mentions: [
      ...nearbyLandmarks.map((landmark) => ({
        "@type": "Place",
        name: landmark,
      })),
      ...page.highlights.map((highlight) => ({
        "@type": "Thing",
        name: highlight,
      })),
    ],
  };

  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildFaqJsonLd(items = faqItems, pageUrl = siteUrl, withContext = true) {
  const data = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage: getPageLanguage(seoPages.find((page) => absoluteUrl(page.slug) === pageUrl)),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[],
  pageUrl = items.length ? items[items.length - 1].url : siteUrl,
  withContext = true,
) {
  const data = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return withContext ? { "@context": "https://schema.org", ...data } : data;
}
