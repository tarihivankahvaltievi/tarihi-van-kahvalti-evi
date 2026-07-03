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
export const dateModifiedIso = "2026-07-04T00:00:00+03:00";
export const defaultImage = "/images/hero-table.jpg";
export const defaultOgImagePath = "/images/og/home.jpg";
export const defaultOgImage = `${siteUrl}${defaultOgImagePath}`;

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
  imageAlt: string;
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

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function pageOgImagePath(slug: string) {
  return `/images/og/${slug}.jpg`;
}

export function createPageMetadata(page: SeoPage): Metadata {
  const url = absoluteUrl(page.slug);
  const image = absoluteUrl(pageOgImagePath(page.slug));

  return {
    title: page.title,
    description: page.description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        "tr-TR": url,
        tr: url,
        "x-default": url,
      },
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
      locale: "tr_TR",
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
      "geo.placename": "Beyoğlu, İstanbul",
      "geo.position": `${coordinates.latitude};${coordinates.longitude}`,
      ICBM: `${coordinates.latitude}, ${coordinates.longitude}`,
      "business:contact_data:street_address": address.streetAddress,
      "business:contact_data:locality": address.locality,
      "business:contact_data:region": address.region,
      "business:contact_data:postal_code": address.postalCode,
      "business:contact_data:country_name": address.countryName,
      "business:contact_data:phone_number": displayPhone,
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
    name: "Tarihi Van Kahvaltı Evi | Taksim Beyoğlu Serpme Van Kahvaltısı",
    headline: "Tarihi Van Kahvaltı Evi",
    description:
      "Beyoğlu Taksim'de 1978'den beri geleneksel serpme Van kahvaltısı, otlu peynir, murtuğa, kavut, sınırsız çay ve Kafka Cafe deneyimi.",
    inLanguage: "tr-TR",
    dateModified,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#restaurant` },
    mainEntity: { "@id": `${siteUrl}/#restaurant` },
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

export function buildRestaurantJsonLd(withContext = true) {
  const data = {
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": `${siteUrl}/#restaurant`,
    name: siteName,
    alternateName,
    url: siteUrl,
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
    keywords: keywords.join(", "),
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
    areaServed: [
      { "@type": "City", name: "İstanbul" },
      { "@type": "AdministrativeArea", name: "Beyoğlu" },
      { "@type": "Place", name: "Taksim" },
    ],
    containedInPlace: {
      "@type": "Place",
      name: "Şehit Muhtar Mahallesi, Taksim",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phoneE164,
        contactType: "reservations",
        availableLanguage: ["tr", "en"],
        areaServed: "TR",
      },
    ],
    knowsAbout: [
      "Van kahvaltısı",
      "Serpme kahvaltı",
      "Van otlu peyniri",
      "Murtuğa",
      "Kavut",
      "Türk kahvesi",
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Tarihi bina", value: true },
      { "@type": "LocationFeatureSpecification", name: "Balkon", value: true },
      { "@type": "LocationFeatureSpecification", name: "Teras", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sınırsız çay", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kafka Cafe", value: true },
    ],
    hasMenu: { "@id": `${siteUrl}/menu#menu` },
    department: {
      "@type": "CafeOrCoffeeShop",
      "@id": `${siteUrl}/kafka-cafe#cafe`,
      name: "Kafka Cafe",
      servesCuisine: ["Türk kahvesi", "Nitelikli kahve", "Coffee"],
      address: {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress,
        addressLocality: address.locality,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: address.country,
      },
    },
    potentialAction: [
      {
        "@type": "ReserveAction",
        target: whatsappUrl,
        name: "WhatsApp ile rezervasyon bilgisi al",
      },
      {
        "@type": "CommunicateAction",
        target: telUrl,
        name: "Telefonla ara",
      },
    ],
    sameAs: ["https://www.instagram.com/tarihivankahvaltievi/", mapsUrl],
  };

  return withContext ? { "@context": "https://schema.org", ...data } : data;
}

export function buildFaqJsonLd(items = faqItems, pageUrl = siteUrl, withContext = true) {
  const data = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage: "tr-TR",
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
