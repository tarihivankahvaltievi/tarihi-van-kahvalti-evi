import type { Metadata } from "next";

export const siteUrl = "https://www.tarihivankahvaltievi.com";
export const siteName = "Tarihi Van Kahvaltı Evi";
export const alternateName = "Tarihi Van Kahvaltı Evi 1978";
export const homeTitle = "İstanbul Van Kahvaltıcısı | Tarihi Van Kahvaltı Evi";
export const homeDescription =
  "İstanbul Beyoğlu Taksim'de Van kahvaltısı: otlu peynir, murtuğa, kavut, sıcak sahanlar ve sınırsız çay. Menü, yol tarifi ve rezervasyon.";
export const homeOgDescription =
  "İstanbul Beyoğlu Taksim'de geleneksel Van kahvaltısı; menü, adres, yol tarifi ve rezervasyon bilgileri.";
export const displayPhone = "+90 541 525 2868";
export const phoneE164 = "+905415252868";
export const telUrl = `tel:${phoneE164}`;
export const email = "info@tarihivankahvaltievi.com";
export const foundingDate = "1978";
export const defaultOgImagePath = "/images/og/home.jpg";
export const defaultOgImage = `${siteUrl}${defaultOgImagePath}`;

export const sameAsUrls = ["https://www.instagram.com/tarihivankahvaltievi/"];

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

export const faqItems = [
  {
    question: "Beyoğlu'nda Van kahvaltısı nerede yenir?",
    answer: `${siteName}, ${displayAddress} adresinde hizmet veren köklü bir Van kahvaltıcısıdır. Taksim Meydanı ve İstiklal Caddesi'nden yürüyerek ulaşılabilir.`,
  },
  {
    question: "Van kahvaltısı nedir ve neler içerir?",
    answer:
      "Van kahvaltısı, otlu peynir, murtuğa, kavut, cacık, kete, süzme bal, kaymak, sahanda yumurta ve sınırsız çay gibi yöresel ürünlerle hazırlanan zengin bir serpme kahvaltıdır.",
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

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  image: string;
  ogImage: string;
  imageAlt: string;
  schemaType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  intro: string[];
  highlights: string[];
  sections: { title: string; body: string; id?: string }[];
  questions: { question: string; answer: string }[];
  resources?: { label: string; url: string; description: string }[];
};

export const seoPages: SeoPage[] = [
  {
    slug: "menu",
    title: "Van Kahvaltısı Menüsü ve Fiyatlar",
    description:
      "Tarihi Van Kahvaltı Evi menüsü: serpme Van kahvaltısı, otlu peynir, murtuğa, kavut, sahanda sucuklu yumurta, sınırsız çay ve Kafka Cafe kahveleri.",
    h1: "Tarihi Van Kahvaltı Evi menüsü",
    eyebrow: "Menü",
    image: "/images/breakfast-spread.jpg",
    ogImage: "/images/og/menu.jpg",
    imageAlt: "Bakır sahanlarda geleneksel serpme Van kahvaltısı",
    intro: [
      "Menünün odağı, Beyoğlu'nda uzun uzun paylaşılan geleneksel serpme Van kahvaltısıdır.",
      "Otlu peynir, murtuğa, kavut, bal-kaymak, kete ve sınırsız çay aynı sofrada servis edilir; sıcaklar bakır sahanlarla masaya gelir.",
    ],
    highlights: [
      "Geleneksel Van kahvaltısı kişi başı yaklaşık 450 TL'dir ve en az iki kişilik servis edilir.",
      "Sahanda sucuklu yumurta yaklaşık 180 TL'dir.",
      "Serpme kahvaltı yanında sınırsız çay sunulur.",
      "Fiyatlar değişebileceği için ziyaret öncesi güncel bilgi alınması önerilir.",
    ],
    sections: [],
    questions: [faqItems[1], faqItems[5], faqItems[7], faqItems[9]],
  },
  {
    slug: "iletisim",
    title: "İletişim ve Yol Tarifi",
    description:
      "Tarihi Van Kahvaltı Evi telefon, WhatsApp, adres, çalışma saatleri ve yol tarifi. Zambak Sk. No:8, Şehit Muhtar, Beyoğlu, İstanbul 34435.",
    h1: "İletişim ve yol tarifi",
    eyebrow: "Konum",
    image: "/images/street-table.jpg",
    ogImage: "/images/og/iletisim.jpg",
    imageAlt: "Beyoğlu Zambak Sokak'ta kahvaltı masası",
    schemaType: "ContactPage",
    intro: [
      "Tarihi Van Kahvaltı Evi, Taksim Meydanı'na ve İstiklal Caddesi'ne yürüme mesafesindeki Zambak Sokak'tadır.",
      "Rezervasyon, güncel yoğunluk ve yol tarifi için telefon veya WhatsApp üzerinden iletişime geçebilirsiniz.",
    ],
    highlights: [
      `Adres: ${displayAddress}`,
      `Telefon ve WhatsApp: ${displayPhone}`,
      `Çalışma saatleri: ${openingHours.short}`,
      "M2 Taksim metro durağından Sıraselviler yönüne kısa yürüyüşle ulaşılır.",
    ],
    sections: [
      {
        title: "Metro ile ulaşım",
        id: "ulasim",
        body: "M2 Yenikapı - Hacıosman hattında Taksim durağında inip Sıraselviler yönünden Zambak Sokak'a yürüyebilirsiniz.",
      },
      {
        title: "Yaya rota",
        body: "İstiklal Caddesi ve Taksim çevresinden gelen misafirler için işletme kısa bir yürüyüş mesafesindedir.",
      },
      {
        title: "Rezervasyon",
        id: "rezervasyon",
        body: "Hafta sonu ve kalabalık saatler için önceden telefon ya da WhatsApp üzerinden bilgi almak önerilir.",
      },
    ],
    questions: [faqItems[2], faqItems[3], faqItems[4], faqItems[6]],
  },
  {
    slug: "sss",
    title: "Sıkça Sorulan Sorular",
    description:
      "Van kahvaltısı içeriği, fiyatlar, çalışma saatleri, rezervasyon, konum ve Kafka Cafe hakkında kısa, güncel cevaplar.",
    h1: "Sıkça sorulan sorular",
    eyebrow: "SSS",
    image: "/images/tea-service.jpg",
    ogImage: "/images/og/sss.jpg",
    imageAlt: "İnce belli bardakta taze demlenmiş çay servisi",
    intro: [
      "Van kahvaltısı, rezervasyon, ulaşım ve menü hakkında en sık gelen soruları kısa ve net şekilde yanıtladık.",
      "Fiyat ve yoğunluk gibi değişebilen bilgiler için ziyaret öncesi işletmeyle iletişime geçebilirsiniz.",
    ],
    highlights: [
      "İşletme her gün 08:00 - 18:00 arasında açıktır.",
      `Adres ${displayAddress} olarak geçer.`,
      "Rezervasyon için telefon ve WhatsApp kullanılabilir.",
      "Van kahvaltısında otlu peynir, murtuğa, kavut, kete ve sınırsız çay öne çıkar.",
    ],
    sections: [],
    questions: [...faqItems],
  },
  {
    slug: "van-kahvaltisi",
    title: "Van Kahvaltısı Nedir?",
    description:
      "Van kahvaltısının kültürü ve temel lezzetleri: otlu peynir, murtuğa, kavut, kete, bal-kaymak ve demli çay.",
    h1: "Van kahvaltısı nedir?",
    eyebrow: "Sofra rehberi",
    image: "/images/kete-detail.jpg",
    ogImage: "/images/og/van-kahvaltisi.jpg",
    imageAlt: "Geleneksel Van kahvaltısında kete detayı",
    intro: [
      "Van kahvaltısı, tek bir tabaktan çok birlikte paylaşılan zengin bir sofra kültürüdür.",
      "Otlu peynir, murtuğa, kavut, kete, bal-kaymak ve demli çay bu kültürün en tanınan parçalarıdır.",
    ],
    highlights: [
      "Van otlu peyniri sofranın ayırt edici lezzetlerinden biridir.",
      "Murtuğa un, tereyağı ve yumurta ile hazırlanır.",
      "Kavut kavrulmuş un geleneğinden gelir.",
      "Sofra acele servis mantığından çok paylaşım ve sohbet üzerine kurulur.",
    ],
    sections: [
      {
        title: "Beyoğlu'nda Van sofrası",
        body: "Tarihi Van Kahvaltı Evi, Van kahvaltısı geleneğini Taksim'e yakın tarihi bir Rum binasında, bakır sahanlar ve sıcak servisle sunar.",
      },
      {
        title: "Sofranın ana lezzetleri",
        id: "lezzetler",
        body: "Otlu peynir, murtuğa, kavut, kete, süzme bal, kaymak, cacık ve sınırsız çay Van kahvaltısının temel bileşenleridir.",
      },
      {
        title: "Paylaşma kültürü",
        body: "Serpme servis, masadaki farklı lezzetlerin birlikte tadılmasına ve çay eşliğinde sohbetin uzamasına dayanır.",
      },
    ],
    questions: [faqItems[1], faqItems[7], faqItems[5]],
  },
  {
    slug: "beyoglu-kahvalti",
    title: "Beyoğlu Van Kahvaltıcısı",
    description:
      "Beyoğlu Van kahvaltıcısı arayanlara Zambak Sokak'ta serpme Van kahvaltısı; güncel menü, açık adres, saatler, ulaşım ve rezervasyon.",
    h1: "Beyoğlu'nda Van kahvaltıcısı ve serpme kahvaltı",
    eyebrow: "Beyoğlu",
    image: "/images/balcony-breakfast.jpg",
    ogImage: "/images/og/beyoglu-kahvalti.jpg",
    imageAlt: "Beyoğlu'nda balkonda kahvaltı sofrası",
    intro: [
      "Beyoğlu kahvaltıcısı arayanlar için Tarihi Van Kahvaltı Evi, Zambak Sokak'taki tarihi binasında geleneksel Van sofrası kurar.",
      "Van otlu peyniri, murtuğa, kavut, kete ve sınırsız çayla hazırlanan serpme kahvaltının menü, konum, saat ve rezervasyon bilgileri bu sayfadadır.",
    ],
    highlights: [
      "Taksim Meydanı'na ve M2 Taksim metroya yürüme mesafesindedir.",
      "İstiklal Caddesi ve Sıraselviler çevresinden kolay ulaşılır.",
      "Her gün 08:00 - 18:00 arasında açıktır.",
      "Kahvaltı sonrası aynı mekandaki Kafka Cafe'de kahve içilebilir.",
    ],
    sections: [
      {
        title: "Merkezi konum",
        body: "Taksim Meydanı, İstiklal Caddesi, Sıraselviler ve Cihangir çevresinden yürüyerek ulaşım mümkündür.",
      },
      {
        title: "Tarihi mekânda uzun kahvaltı",
        body: "Tarihi binanın balkon, teras ve iç mekân dokusu; bakır sahanlarla kurulan Van sofrasına sakin bir ritim eşlik eder.",
      },
      {
        title: "Ziyaret öncesi",
        body: "Hafta sonu veya kalabalık grupla gelecek misafirlerin masa ve güncel menü bilgisini telefonla teyit etmesi önerilir.",
      },
    ],
    questions: [faqItems[0], faqItems[2], faqItems[3], faqItems[4], faqItems[8]],
  },
  {
    slug: "taksim-kahvalti",
    title: "Taksim Van Kahvaltıcısı",
    description:
      "Taksim kahvaltıcısı arayanlara M2 metro ve İstiklal Caddesi yakınında serpme Van kahvaltısı; menü, saatler, yol tarifi ve rezervasyon.",
    h1: "Taksim'de Van kahvaltıcısı",
    eyebrow: "Taksim kahvaltı rehberi",
    image: "/images/street-table.jpg",
    ogImage: "/images/og/beyoglu-kahvalti.jpg",
    imageAlt: "Taksim Zambak Sokak yakınında serpme Van kahvaltısı",
    intro: [
      "Taksim kahvaltı seçenekleri arasında yöresel bir sofra arayanlar, Tarihi Van Kahvaltı Evi'nde Van otlu peyniri, murtuğa, kavut, kete ve sıcak bakır sahanları aynı masada bulur.",
      `İşletme ${displayAddress} adresindedir; M2 Taksim istasyonu, Taksim Meydanı ve İstiklal Caddesi çevresinden yürüyerek ulaşılabilir.`,
    ],
    highlights: [
      "Taksim Meydanı ve M2 Taksim istasyonu çevresinden yürüyerek ulaşılır.",
      "Serpme Van kahvaltısı en az iki kişilik servis edilir.",
      "Van otlu peyniri, murtuğa, kavut, kete, bal-kaymak ve sınırsız çay öne çıkar.",
      `Çalışma saatleri ${openingHours.short}; hafta sonu için masa uygunluğu önceden sorulabilir.`,
    ],
    sections: [
      {
        title: "Taksim'de kahvaltı için Van sofrası",
        body: "Tarihi Van Kahvaltı Evi, standart kahvaltı tabağı yerine küçük tabaklarla paylaşılan yöresel bir sofra sunar. Otlu peynir, murtuğa ve kavut; menüyü klasik kafe kahvaltısından ayırır.",
      },
      {
        title: "Taksim Meydanı ve metrodan ulaşım",
        id: "metrodan-ulasim",
        body: "M2 Taksim istasyonundan Sıraselviler yönüne ilerleyip Zambak Sokak'a geçebilirsiniz. Güncel istasyon ve sefer durumunu Metro İstanbul üzerinden kontrol etmek, özel günlerde rota değişikliklerini görmeyi kolaylaştırır.",
      },
      {
        title: "İstiklal Caddesi çevresinden",
        body: "İstiklal Caddesi, Tarlabaşı ve Şehit Muhtar çevresinden gelenler için Zambak Sokak merkezi bir buluşma noktasıdır. İlk ziyarette Google Haritalar yol tarifi kullanılabilir.",
      },
      {
        title: "Taksim kahvaltısı öncesi plan",
        body: "Güncel fiyatları menü sayfasından inceleyebilir; hafta sonu veya kalabalık grup ziyaretlerinde telefon ya da WhatsApp üzerinden masa uygunluğunu sorabilirsiniz.",
      },
    ],
    questions: [
      {
        question: "Taksim'de Van kahvaltısı nerede yenir?",
        answer: `Tarihi Van Kahvaltı Evi, ${displayAddress} adresinde yöresel serpme Van kahvaltısı sunar; Taksim Meydanı ve M2 metro çevresinden yürüyerek ulaşılabilir.`,
      },
      {
        question: "Taksim kahvaltıcısı seçerken nelere bakılır?",
        answer: "Menü içeriği, fiyatın kişi başı mı masa başı mı olduğu, çalışma saati, metroya yakınlık ve rezervasyon bilgisi birlikte değerlendirilmelidir.",
      },
      faqItems[6],
      faqItems[5],
      faqItems[3],
      faqItems[4],
    ],
    resources: [
      {
        label: "Metro İstanbul M2 hattı",
        url: "https://www.metro.istanbul/Hatlarimiz/HatDetay?hat=M2",
        description: "Taksim istasyonu, hat bilgisi ve güncel ulaşım ayrıntıları",
      },
    ],
  },
  {
    slug: "kafka-cafe",
    title: "Kafka Cafe ve Kahve",
    description:
      "Tarihi Van Kahvaltı Evi içindeki Kafka Cafe: kahvaltı sonrası Türk kahvesi ve nitelikli kahve seçenekleri, adres ve çalışma saatleri.",
    h1: "Kafka Cafe",
    eyebrow: "Kahve köşesi",
    image: "/images/coffee-moment.jpg",
    ogImage: "/images/og/kafka-cafe.jpg",
    imageAlt: "Kafka Cafe'de kahvaltı sonrası kahve molası",
    intro: [
      "Kafka Cafe, Tarihi Van Kahvaltı Evi'nin içinde kahvaltı sonrası sohbeti uzatan kahve köşesidir.",
      "Bakır cezvede Türk kahvesi ve nitelikli kahve seçenekleri, Van kahvaltısı deneyimini sakin bir kapanışa taşır.",
    ],
    highlights: [
      "Kahvaltı sonrası Türk kahvesi servis edilir.",
      "Nitelikli kahve seçenekleri bulunur.",
      "Kafka Cafe, Tarihi Van Kahvaltı Evi ile aynı adrestedir.",
      `Çalışma saatleri: ${openingHours.short}.`,
    ],
    sections: [
      {
        title: "Kahvaltıdan kahveye",
        body: "Uzun kahvaltıdan sonra aynı mekânda kahve içmek, özellikle hafta sonu buluşmalarında deneyimi kesintisiz kılar.",
      },
      {
        title: "Konum",
        body: `Kafka Cafe, ${displayAddress} adresindeki Tarihi Van Kahvaltı Evi içinde yer alır.`,
      },
    ],
    questions: [faqItems[9], faqItems[2], faqItems[3]],
  },
];

export const legacyRedirects = [
  // Google'da görünen eski sonuç doğrudan ana sayfaya gitmeli; yönlendirme zinciri oluşturmayın.
  { source: "/istanbul-van-kahvaltisi", destination: "/" },
  { source: "/serpme-van-kahvaltisi", destination: "/van-kahvaltisi" },
  { source: "/serpme-kahvalti-beyoglu", destination: "/beyoglu-kahvalti" },
  { source: "/istiklal-caddesi-kahvalti", destination: "/iletisim#ulasim" },
  { source: "/cihangir-kahvalti", destination: "/iletisim#ulasim" },
  { source: "/galata-kahvalti", destination: "/iletisim#ulasim" },
  { source: "/aile-kahvaltisi-beyoglu", destination: "/beyoglu-kahvalti" },
  { source: "/grup-kahvaltisi", destination: "/beyoglu-kahvalti" },
  { source: "/hafta-sonu-kahvalti", destination: "/beyoglu-kahvalti" },
  { source: "/kahvalti-rezervasyon", destination: "/iletisim#rezervasyon" },
  { source: "/kahvalti-yol-tarifi", destination: "/iletisim#ulasim" },
  { source: "/zambak-sokak-kahvalti", destination: "/iletisim#ulasim" },
  { source: "/siraselviler-kahvalti", destination: "/iletisim#ulasim" },
  { source: "/kahvalti-fiyatlari", destination: "/menu#fiyatlar" },
  { source: "/van-otlu-peynir", destination: "/van-kahvaltisi#lezzetler" },
  { source: "/murtuga-kavut", destination: "/van-kahvaltisi#lezzetler" },
  { source: "/tarihi-mekanda-kahvalti", destination: "/#story" },
  { source: "/kahvalti-sonrasi-kahve", destination: "/kafka-cafe" },
  { source: "/vejetaryen-kahvalti-beyoglu", destination: "/menu" },
  { source: "/beyoglu-kahvalti-mekanlari", destination: "/beyoglu-kahvalti" },
  { source: "/taksim-brunch-kahvalti", destination: "/taksim-kahvalti" },
] as const;

export const localSeoFacts = [
  {
    label: "Konum",
    value: `${displayAddress}; Taksim Meydanı, İstiklal Caddesi ve Sıraselviler hattına yürüme mesafesi.`,
    href: "/iletisim",
  },
  {
    label: "Van kahvaltısı",
    value: "Serpme Van kahvaltısı; otlu peynir, murtuğa, kavut, kete, bal-kaymak ve sınırsız çay.",
    href: "/menu",
  },
  {
    label: "Ziyaret saatleri",
    value: `${openingHours.short}; hafta sonu ve kalabalık gruplar için önceden bilgi almak önerilir.`,
    href: "/iletisim",
  },
  {
    label: "Kahvaltı sonrası",
    value: "Kafka Cafe aynı mekânda Türk kahvesi ve nitelikli kahve seçenekleri sunar.",
    href: "/kafka-cafe",
  },
];

export function absoluteUrl(path = "") {
  if (!path) return siteUrl;
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function pageOgImagePath(slug: string) {
  return getSeoPage(slug)?.ogImage ?? defaultOgImagePath;
}

export function createPageMetadata(page: SeoPage): Metadata {
  const url = absoluteUrl(page.slug);
  const image = absoluteUrl(page.ogImage);

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName,
      images: [{ url: image, width: 1200, height: 630, alt: page.imageAlt }],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}

export function buildMenuJsonLd(withContext = true) {
  const data = {
    "@type": "Menu",
    "@id": `${siteUrl}/menu#menu`,
    name: `${siteName} Menüsü`,
    url: `${siteUrl}/menu`,
    inLanguage: "tr-TR",
    hasMenuSection: menuSections.map((section) => ({
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
                url: `${siteUrl}/menu`,
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
    description:
      "Beyoğlu Taksim'deki tarihi Rum binasında 1978'den beri geleneksel serpme Van kahvaltısı sunan aile restoranı.",
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
    knowsAbout: [
      "Van kahvaltısı",
      "Serpme kahvaltı",
      "Van otlu peyniri",
      "Murtuğa",
      "Kavut",
      "Beyoğlu kahvaltı",
      "Beyoğlu Van kahvaltısı",
      "Taksim kahvaltı",
      "Taksim Van kahvaltısı",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.streetAddress}, ${address.neighborhood}`,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
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
    menu: `${siteUrl}/menu`,
    hasMenu: { "@id": `${siteUrl}/menu#menu` },
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

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[],
  pageUrl = items.at(-1)?.url ?? siteUrl,
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
