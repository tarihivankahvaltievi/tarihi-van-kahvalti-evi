export const menuCategoryIds = ["sofra", "sicaklar", "vandan", "icecekler"] as const;

export type MenuCategoryId = (typeof menuCategoryIds)[number];
export type MenuFilterId = "all" | MenuCategoryId;
export type MenuTag = "Öne çıkan" | "Tavsiye" | "Vejetaryen" | "Yeni";

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  shortLabel: string;
  description: string;
};

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  story: string;
  price: string;
  priceNote?: string;
  image: string;
  imageAlt: string;
  tags: MenuTag[];
  details: string[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "sofra",
    label: "Serpme Sofra",
    shortLabel: "Sofra",
    description: "Paylaşmak için kurulan geleneksel Van kahvaltısı ve sofraya dahil lezzetler.",
  },
  {
    id: "sicaklar",
    label: "Bakır Sahanlar",
    shortLabel: "Sıcaklar",
    description: "Mutfaktan çıktığı anda masaya gelen, tereyağlı ve yumurtalı sıcaklar.",
  },
  {
    id: "vandan",
    label: "Van’dan Sofraya",
    shortLabel: "Van’dan",
    description: "Yörenin peynir, hamur işi ve kahvaltılık geleneğini taşıyan seçkiler.",
  },
  {
    id: "icecekler",
    label: "Çay & Kahve",
    shortLabel: "İçecek",
    description: "Sofranın ritmini koruyan taze çay ve Kafka Cafe kahveleri.",
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "geleneksel-van-kahvaltisi",
    category: "sofra",
    name: "Geleneksel Van Kahvaltısı",
    description: "Otlu peynir, murtuğa, kavut, cacık, kete, süzme bal, kaymak ve sınırsız çayla kurulan paylaşım sofrası.",
    story: "1978’den beri masanın ortasına birlikte yenmek üzere kurduğumuz Van sofrası. Yöresel ürünler, ev yapımı dokunuşlar ve sıcak bakır sahanlarla tamamlanır.",
    price: "₺450",
    priceNote: "kişi başı · en az 2 kişilik",
    image: "/images/breakfast-spread.jpg",
    imageAlt: "Peynirler, sıcak sahanlar ve çayla kurulmuş geleneksel Van kahvaltısı sofrası",
    tags: ["Öne çıkan", "Tavsiye"],
    details: ["En az iki kişilik servis", "Sınırsız taze çay", "Günlük hazırlanan eşlikçiler"],
  },
  {
    id: "peynir-zeytin-seckisi",
    category: "sofra",
    name: "Peynir & Zeytin Seçkisi",
    description: "Van otlu peyniri başta olmak üzere sofranın tuzlu açılışını yapan peynir ve zeytinler.",
    story: "Van kahvaltısının karakterini önce otlu peynir kurar. Farklı dokudaki peynirleri ve zeytinleri, her lokmada denge sağlayacak biçimde aynı tabakta buluşturuyoruz.",
    price: "Sofraya dahil",
    image: "/images/hero-float/cheese-platter.webp",
    imageAlt: "Van otlu peyniri, farklı peynirler ve zeytinlerden oluşan kahvaltı tabağı",
    tags: ["Vejetaryen"],
    details: ["Van otlu peyniri", "Günlük peynir seçkisi", "Yeşil ve siyah zeytin"],
  },
  {
    id: "bal-kaymak-recel",
    category: "sofra",
    name: "Bal, Kaymak & Ev Reçelleri",
    description: "Süzme bal, kaymak ve mevsime göre hazırlanan ev reçelleriyle sofranın tatlı dengesi.",
    story: "Sofranın tatlı tarafını tek bir yoğun tada bırakmıyoruz. Süzme balı kaymakla, ev reçellerini ise sıcak hamur işleriyle eşleştiriyoruz.",
    price: "Sofraya dahil",
    image: "/images/hero-float/apricot-jam-bowl.webp",
    imageAlt: "Küçük beyaz kasede ev yapımı kayısı reçeli",
    tags: ["Vejetaryen"],
    details: ["Süzme bal", "Kaymak", "Mevsimlik ev reçeli"],
  },
  {
    id: "sucuklu-yumurta",
    category: "sicaklar",
    name: "Sahanda Sucuklu Yumurta",
    description: "Kasap sucuğu ve köy yumurtasıyla bakır sahanda, masaya sıcak gelen kahvaltılık.",
    story: "Sucuk dilimlerini önce bakır sahanda çeviriyor, köy yumurtasını ardından ekliyoruz. Sarısı akışkan, kenarları sıcak kalacak anda servis ediyoruz.",
    price: "₺180",
    image: "/images/sucuk-egg.jpg",
    imageAlt: "Bakır sahanda sucuk dilimleri ve akışkan sarılı yumurta",
    tags: ["Öne çıkan", "Tavsiye"],
    details: ["Kasap sucuğu", "Köy yumurtası", "Bakır sahanda servis"],
  },
  {
    id: "murtuga",
    category: "sicaklar",
    name: "Murtuğa",
    description: "Un, tereyağı ve yumurtayla hazırlanan, Van’a özgü sıcak ve doyurucu lezzet.",
    story: "Murtuğa, az malzemeyle güçlü bir sofra kuran Van mutfağının en güzel örneklerinden. Tereyağının kokusu çıkana kadar pişirip sıcak servis ediyoruz.",
    price: "Sofraya dahil",
    image: "/images/hero-parallax/overhead-feast.webp",
    imageAlt: "Bakır sahanlar ve yöresel tabaklarla kurulu Van kahvaltısı",
    tags: ["Tavsiye", "Vejetaryen"],
    details: ["Tereyağı", "Yumurta", "Geleneksel Van tarifi"],
  },
  {
    id: "kavut",
    category: "sicaklar",
    name: "Kavut",
    description: "Kavrulmuş un geleneğinden gelen, tatlı ve doyurucu Van kahvaltısı klasiği.",
    story: "Kavutun sade görünümünün arkasında uzun bir yöre geleneği var. Kavrulmuş unun tok aromasını dengeli bir kıvamla masaya getiriyoruz.",
    price: "Sofraya dahil",
    image: "/images/hero-parallax/spread-close.webp",
    imageAlt: "Kahvaltı sofrasında bakır sahan ve yöresel Van lezzetleri",
    tags: ["Vejetaryen"],
    details: ["Kavrulmuş un", "Tereyağı", "Sıcak servis"],
  },
  {
    id: "van-otlu-peyniri",
    category: "vandan",
    name: "Van Otlu Peyniri",
    description: "Yöresel otların aromasıyla olgunlaşan, Van sofrasının imza peyniri.",
    story: "Sofraya koyduğumuz otlu peynir yalnızca bir eşlikçi değil, Van kahvaltısının hafızasıdır. Güçlü aromasını taze yeşillik ve çayla dengeleriz.",
    price: "Sofraya dahil",
    image: "/images/hero-float/cheese-platter.webp",
    imageAlt: "Dilimlenmiş Van otlu peyniri ve kahvaltılık peynir tabağı",
    tags: ["Öne çıkan", "Vejetaryen"],
    details: ["Yöresel ot aroması", "Olgunlaştırılmış peynir", "Van’dan gelen lezzet"],
  },
  {
    id: "kete",
    category: "vandan",
    name: "Van Ketesi",
    description: "Kat kat dokusu ve tereyağlı içiyle çaya, bala ve kaymağa eşlik eden yöresel hamur işi.",
    story: "Ketenin katlarını dağıtmadan, içini yumuşak tutacak şekilde ısıtıyoruz. Bal ve kaymakla buluştuğunda sofranın en sakin ama akılda kalan lokmalarından biri olur.",
    price: "Sofraya dahil",
    image: "/images/kete-detail.jpg",
    imageAlt: "Katmanlı dokusu görünen geleneksel Van ketesi",
    tags: ["Vejetaryen"],
    details: ["Tereyağlı hamur", "Kat kat doku", "Ilık servis"],
  },
  {
    id: "sinirsiz-cay",
    category: "icecekler",
    name: "Sınırsız Taze Çay",
    description: "Serpme kahvaltı boyunca ince belli bardakta, tazeliğini koruyarak servis edilir.",
    story: "Bizim için kahvaltının süresini saat değil, çayın demi belirler. Sofra boyunca bardakları taze çayla yenileriz; sohbet aceleye gelmez.",
    price: "Kahvaltıya dahil",
    image: "/images/tea-service.jpg",
    imageAlt: "İnce belli bardaklarda servis edilen taze demlenmiş Türk çayı",
    tags: ["Tavsiye", "Vejetaryen"],
    details: ["Taze dem", "Sınırsız servis", "İnce belli bardak"],
  },
  {
    id: "turk-kahvesi",
    category: "icecekler",
    name: "Geleneksel Türk Kahvesi",
    description: "Kahvaltı sonrası sohbet için bakır cezvede yavaş pişirilen Türk kahvesi.",
    story: "Kafka Cafe köşemizde kahveyi acele etmeden, köpüğünü koruyarak pişiriyoruz. Uzayan kahvaltının ardından küçük ama belirgin bir kapanış.",
    price: "Güncel fiyatı sorunuz",
    image: "/images/coffee-moment.jpg",
    imageAlt: "Kahvaltı sonrasında sunulan köpüklü Türk kahvesi",
    tags: ["Vejetaryen"],
    details: ["Bakır cezvede pişirim", "Köpüklü servis", "Kafka Cafe seçkisi"],
  },
];

export const menuLastUpdated = "15 Temmuz 2026";
