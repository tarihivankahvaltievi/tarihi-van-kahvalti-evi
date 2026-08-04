import fs from "node:fs";
import path from "node:path";

const categories = [
  ["kahvalti-menuleri", "Kahvaltı Menüleri", "Kahvaltı", "Serpme kahvaltı ve tek kişilik kahvaltı tabakları.", "Breakfast Menus", "Breakfast", "Shared breakfasts and individual breakfast plates."],
  ["peynirler", "Peynirler", "Peynir", "Van kahvaltısına eşlik eden yöresel ve klasik peynirler.", "Cheeses", "Cheese", "Regional and classic cheeses served with Van breakfast."],
  ["zeytinler", "Zeytinler & Söğüş", "Zeytin", "Zeytin çeşitleri, zeytin ezmesi ve taze söğüş tabağı.", "Olives & Salad", "Olives", "Olive varieties, olive paste and a fresh salad plate."],
  ["gozlemeler", "Gözlemeler", "Gözleme", "Farklı iç harçlarla sıcak hazırlanan gözlemeler.", "Gözleme", "Gözleme", "Turkish flatbreads prepared hot with a choice of fillings."],
  ["yoresel-tatlar", "Yöresel Tatlar", "Yöresel", "Van kahvaltı kültüründen gelen geleneksel sıcak ve soğuk lezzetler.", "Traditional Tastes", "Traditional", "Traditional hot and cold specialities from Van breakfast culture."],
  ["receller", "Tarihi Anne Reçelleri", "Reçel", "Kahvaltı sofraları için meyve reçelleri ve sürülebilir tatlılar.", "Historical Mother's Jams", "Jams", "Fruit preserves and sweet spreads for the breakfast table."],
  ["ballar", "Ballar & Kahvaltılık Tatlılar", "Bal", "Bal, kaymak, tereyağı, tahin ve pekmez çeşitleri.", "Honey & Sweet Breakfast Sides", "Honey", "Honey, clotted cream, butter, tahini and molasses selections."],
  ["omletler", "Omletler", "Omlet", "Sade ve farklı malzemelerle hazırlanan sıcak omletler.", "Omelettes", "Omelettes", "Hot omelettes prepared plain or with a choice of ingredients."],
  ["menemenler", "Menemenler", "Menemen", "Domates ve yumurta temelli, farklı malzemelerle hazırlanan menemenler.", "Menemen", "Menemen", "Turkish scrambled eggs with tomatoes and a choice of additions."],
  ["yumurtalar", "Yumurtalar", "Yumurta", "Bakır sahanda hazırlanan yumurta ve kuymak çeşitleri.", "Eggs", "Eggs", "Egg dishes and kuymak prepared and served in a pan."],
  ["sahanlar", "Sahanlar", "Sahan", "Sıcak servis edilen sucuk, sosis, kavurma ve pastırma tabakları.", "Pan Dishes", "Pan dishes", "Hot pan dishes with sausage, roast beef or pastrami."],
  ["sicak-icecekler", "Sıcak İçecekler", "Sıcak", "Çay, sıcak çikolata, salep ve sütlü sıcak içecekler.", "Hot Drinks", "Hot drinks", "Tea, hot chocolate, salep and warm milk drinks."],
  ["bitki-caylari", "Bitki Çayları", "Bitki Çayı", "Farklı bitki, meyve ve baharat aromalarından çaylar.", "Herbal Teas", "Herbal teas", "Teas with a selection of herbs, fruits and spices."],
  ["soft-icecekler", "Soft İçecekler", "Soft", "Su, gazlı içecekler, maden suyu ve meyveli içecekler.", "Soft Drinks", "Soft drinks", "Water, carbonated drinks, mineral water and fruit drinks."],
  ["soguk-icecekler", "Soğuk İçecekler", "Soğuk", "Limonata, taze meyve suyu ve ferah soğuk içecekler.", "Cold Drinks", "Cold drinks", "Lemonades, fresh fruit juices and refreshing cold drinks."],
  ["sicak-kahveler", "Sıcak Kahveler", "Kahve", "Espresso bazlı kahveler ve Türk kahvesi çeşitleri.", "Hot Coffees", "Hot coffee", "Espresso-based coffees and Turkish coffee varieties."],
  ["soguk-kahveler", "Soğuk Kahveler", "Soğuk Kahve", "Buzlu kahveler, cold brew ve frappe seçenekleri.", "Cold Coffees", "Cold coffee", "Iced coffees, cold brew and frappe."],
  ["milkshake-frozen-smoothie", "Milkshake, Frozen & Smoothie", "Özel İçecek", "Meyve ve tatlı aromalarıyla hazırlanan özel soğuk içecekler.", "Milkshake, Frozen & Smoothie", "Special drinks", "Special cold drinks in a range of fruit and dessert flavours."],
].map(([id, label, shortLabel, description, enLabel, enShortLabel, enDescription]) => ({
  id,
  label,
  shortLabel,
  description,
  image: "",
  imageAlt: "",
  translations: {
    en: {
      label: enLabel,
      shortLabel: enShortLabel,
      description: enDescription,
      imageAlt: "",
    },
  },
}));

const categoryById = new Map(categories.map((category) => [category.id, category]));

const rawItems = [];
const add = (category, rows, defaults = {}) => {
  for (const row of rows) {
    const [id, name, enName, price, description, extra = {}] = row;
    rawItems.push({
      id,
      category,
      name,
      description: description || defaults.description || `${name}, güncel menü porsiyonuyla servis edilir.`,
      story: extra.story || description || defaults.story || `${name}, sipariş üzerine hazırlanarak servis edilir.`,
      price: `₺${price}`,
      ...(extra.priceNote ? { priceNote: extra.priceNote } : {}),
      image: "",
      imageAlt: "",
      tags: extra.tags || [],
      details: extra.details || defaults.details || [categoryById.get(category).label, "Güncel menü porsiyonu"],
      translations: {
        en: {
          name: enName,
          description: extra.enDescription || defaults.enDescription || description || `${enName}, served in the current menu portion.`,
          story: extra.enStory || extra.enDescription || defaults.enStory || description || `${enName} is prepared to order and served fresh.`,
          imageAlt: "",
          details: extra.enDetails || defaults.enDetails || [categoryById.get(category).translations.en.label, "Current menu portion"],
        },
      },
    });
  }
};

add("kahvalti-menuleri", [
  ["serpme-fix-menu", "Serpme Fix Menü", "Serpme Fix Menu", 970, "Otlu Van peyniri, kavut, murtuğa, jaji, çemen, bal, kaymak, beyaz peynir, örgü peyniri, köy peyniri, taze peynir, yeşil ve siyah zeytin, domates, salatalık, haşlanmış yumurta, tereyağı, tahin-pekmez ve reçel.", {
    priceNote: "kişi başı",
    tags: ["Öne çıkan"],
    details: ["Kişi başı servis", "Sınırsız çay", "Bir sıcak seçenek: menemen, peynirli yumurta, sucuklu yumurta veya pişi tabağı"],
    enDescription: "Herb cheese, kavut, murtuğa, jaji, çemen, honey, clotted cream, assorted cheeses, green and black olives, tomatoes, cucumber, hard-boiled egg, butter, tahini-molasses and jam.",
    enDetails: ["Per person", "Unlimited Turkish tea", "One hot option: menemen, eggs with cheese, eggs with sucuk or fried dough plate"],
  }],
  ["van-golu-tabagi", "Van Gölü Tabağı", "Van Gölü Plate", 740, "Otlu Van peyniri, beyaz peynir, örgü peyniri, taze kaşar, yeşil ve siyah zeytin, domates, salatalık, jaji, haşlanmış yumurta, tereyağı, tahin-pekmez ve reçel.", {
    priceNote: "kişi başı",
    details: ["Kişi başı servis", "2 adet çay", "Peynirler, zeytinler, söğüş, yumurta ve tatlı eşlikçiler"],
    enDescription: "Herb cheese, white cheese, braided cheese, fresh kashar, green and black olives, tomatoes, cucumber, jaji, hard-boiled egg, butter, tahini-molasses and jam.",
    enDetails: ["Per person", "2 Turkish teas", "Cheeses, olives, salad, egg and sweet breakfast sides"],
  }],
  ["pisi-tabagi", "Pişi Tabağı", "Fried Dough Plate", 350, "Tulum peyniri, mevsim reçeli ve Nutella eşliğinde servis edilen sıcak pişi tabağı.", {
    details: ["Sıcak pişi", "Tulum peyniri", "Mevsim reçeli ve Nutella"],
    enDescription: "Warm fried dough served with goat cheese, seasonal jam and Nutella.",
    enDetails: ["Warm fried dough", "Goat cheese", "Seasonal jam and Nutella"],
  }],
  ["yumurtali-ekmek-tabagi", "Yumurtalı Ekmek Tabağı", "Egg Bread Plate", 350, "Beyaz peynir, mevsim reçeli ve zeytin ezmesi eşliğinde servis edilen yumurtalı ekmek.", {
    details: ["Yumurtalı ekmek", "Beyaz peynir", "Mevsim reçeli ve zeytin ezmesi"],
    enDescription: "Egg bread served with white cheese, seasonal jam and olive paste.",
    enDetails: ["Egg bread", "White cheese", "Seasonal jam and olive paste"],
  }],
]);

add("peynirler", [
  ["tulum-peyniri", "Tulum Peyniri", "Goat Cheese", 290],
  ["taze-kasar", "Taze Kaşar", "Fresh Kashar", 280],
  ["peynir-tabagi", "Peynir Tabağı", "Cheese Plate", 360],
  ["koy-peyniri", "Köy Peyniri", "Village Cheese", 260],
  ["beyaz-peynir", "Beyaz Peynir", "White Cheese", 280],
  ["otlu-peynir", "Otlu Peynir", "Herb Cheese", 310],
  ["cecil-peyniri", "Cecil Peyniri", "Chechil Cheese", 270],
  ["eski-kasar", "Eski Kaşar", "Mature Kashar", 250],
], {
  description: "Kahvaltı sofrası için porsiyon peynir servisi.",
  enDescription: "A portion of cheese for the breakfast table.",
  details: ["Porsiyon servis", "Kahvaltılık peynir"],
  enDetails: ["Portion serving", "Breakfast cheese"],
});

add("zeytinler", [
  ["siyah-zeytin", "Siyah Zeytin", "Black Olives", 250],
  ["yesil-zeytin", "Yeşil Zeytin", "Green Olives", 260],
  ["siyah-zeytin-ezmesi", "Siyah Zeytin Ezmesi", "Black Olive Paste", 250],
  ["karisik-zeytin", "Karışık Zeytin", "Mixed Olives", 250, "Yeşil ve siyah zeytinlerden oluşan karışık porsiyon."],
  ["sogus", "Söğüş", "Salad", 260, "Domates, salatalık ve mevsim yeşilliklerinden taze söğüş tabağı."],
], {
  description: "Kahvaltı sofrası için porsiyon zeytin servisi.",
  enDescription: "A portion of olives for the breakfast table.",
  details: ["Porsiyon servis", "Kahvaltılık eşlikçi"],
  enDetails: ["Portion serving", "Breakfast side"],
});

add("gozlemeler", [
  ["peynirli-gozleme", "Peynirli Gözleme", "Cheese Gözleme", 310],
  ["kasarli-gozleme", "Kaşarlı Gözleme", "Kashar Cheese Gözleme", 310],
  ["patatesli-gozleme", "Patatesli Gözleme", "Potato Gözleme", 300],
  ["ispanakli-gozleme", "Ispanaklı Gözleme", "Spinach Gözleme", 290],
  ["mantarli-gozleme", "Mantarlı Gözleme", "Mushroom Gözleme", 310],
  ["sucuklu-gozleme", "Sucuklu Gözleme", "Sucuk Gözleme", 370],
  ["kavurmali-gozleme", "Kavurmalı Gözleme", "Roast Beef Gözleme", 390],
  ["pastirmali-gozleme", "Pastırmalı Gözleme", "Pastrami Gözleme", 390],
  ["special-gozleme", "Special Gözleme", "Special Gözleme", 350],
  ["gozleme-ekstra-peynir", "Ekstra Peynir", "Extra Cheese", 70, "Gözleme siparişine eklenebilen ekstra peynir.", {
    priceNote: "ekstra",
    details: ["Gözleme için ek ürün", "Ekstra peynir"],
    enDescription: "Extra cheese available with any gözleme order.",
    enDetails: ["Add-on for gözleme", "Extra cheese"],
  }],
], {
  description: "Seçilen iç harçla hazırlanıp sıcak servis edilen gözleme.",
  enDescription: "Turkish flatbread prepared with the selected filling and served hot.",
  details: ["Sıcak servis", "Gözleme"],
  enDetails: ["Served hot", "Turkish flatbread"],
});

add("yoresel-tatlar", [
  ["cevizli-cemen", "Cevizli Çemen", "Çemen with Walnut", 240],
  ["tereyagli-jaji", "Tereyağlı Jaji", "Jaji with Butter", 260],
  ["balli-cevizli-kavut", "Ballı Cevizli Kavut", "Kavut with Walnut and Honey", 280],
  ["tereyagli-cevizli-murtuga", "Tereyağlı Cevizli Murtuğa", "Murtuğa with Walnut and Butter", 260],
], {
  description: "Van kahvaltı kültüründen gelen yöresel lezzet.",
  enDescription: "A regional speciality from Van breakfast culture.",
  details: ["Yöresel tarif", "Kahvaltılık servis"],
  enDetails: ["Regional recipe", "Breakfast serving"],
});

add("receller", [
  ["kayisi-receli", "Kayısı Reçeli", "Apricot Jam", 300],
  ["ayva-receli", "Ayva Reçeli", "Quince Jam", 320],
  ["portakal-receli", "Portakal Reçeli", "Orange Jam", 300],
  ["cilek-receli", "Çilek Reçeli", "Strawberry Jam", 300],
  ["ceviz-receli", "Ceviz Reçeli", "Walnut Jam", 380],
  ["nutella", "Nutella", "Hazelnut Spread", 280],
], {
  description: "Kahvaltı sofrası için porsiyon tatlı eşlikçi.",
  enDescription: "A sweet portion for the breakfast table.",
  details: ["Porsiyon servis", "Kahvaltılık tatlı"],
  enDetails: ["Portion serving", "Sweet breakfast side"],
});

add("ballar", [
  ["bal", "Bal", "Honey", 280],
  ["kaymak", "Kaymak", "Clotted Cream", 320],
  ["bal-kaymak", "Bal - Kaymak", "Clotted Cream and Honey", 300],
  ["tereyagi", "Tereyağı", "Butter", 320],
  ["bal-tereyagi", "Bal - Tereyağı", "Honey and Butter", 320],
  ["tahin", "Tahin", "Tahini", 280],
  ["tahin-pekmez", "Tahin - Pekmez", "Tahini and Molasses", 280],
  ["pekmez", "Pekmez", "Grape Molasses", 280],
], {
  description: "Kahvaltı sofrası için porsiyon servis.",
  enDescription: "A portion for the breakfast table.",
  details: ["Porsiyon servis", "Kahvaltılık eşlikçi"],
  enDetails: ["Portion serving", "Breakfast side"],
});

add("omletler", [
  ["sade-omlet", "Sade Omlet", "Plain Omelette", 300],
  ["peynirli-omlet", "Peynirli Omlet", "Cheese Omelette", 340],
  ["mantarli-omlet", "Mantarlı Omlet", "Mushroom Omelette", 360],
  ["sosisli-omlet", "Sosisli Omlet", "Hot Dog Omelette", 350],
  ["sucuklu-omlet", "Sucuklu Omlet", "Sucuk Omelette", 370],
  ["kavurmali-omlet", "Kavurmalı Omlet", "Roast Beef Omelette", 390],
  ["pastirmali-omlet", "Pastırmalı Omlet", "Pastrami Omelette", 390],
  ["et-karisik-omlet", "Et Karışık Omlet", "Mixed Meat Omelette", 390],
  ["sebze-karisik-omlet", "Sebze Karışık Omlet", "Mixed Vegetable Omelette", 360],
], {
  description: "Seçilen malzemeyle hazırlanıp sıcak servis edilen omlet.",
  enDescription: "Omelette prepared with the selected ingredient and served hot.",
  details: ["Yumurta", "Sıcak servis"],
  enDetails: ["Eggs", "Served hot"],
});

add("menemenler", [
  ["sade-menemen", "Sade Menemen", "Plain Menemen", 310],
  ["mantarli-menemen", "Mantarlı Menemen", "Mushroom Menemen", 340],
  ["peynirli-menemen", "Peynirli Menemen", "Cheese Menemen", 340],
  ["sucuklu-menemen", "Sucuklu Menemen", "Sucuk Menemen", 370],
  ["kavurmali-menemen", "Kavurmalı Menemen", "Roast Beef Menemen", 390],
  ["pastirmali-menemen", "Pastırmalı Menemen", "Pastrami Menemen", 390],
], {
  description: "Domates ve yumurta temeliyle hazırlanıp sıcak servis edilen menemen.",
  enDescription: "Turkish scrambled eggs with tomatoes, prepared with the selected ingredient and served hot.",
  details: ["Domates", "Yumurta", "Sıcak servis"],
  enDetails: ["Tomatoes", "Eggs", "Served hot"],
});

add("yumurtalar", [
  ["sahanda-yumurta", "Sahanda Yumurta", "Fried Eggs", 200],
  ["patatesli-yumurta", "Patatesli Yumurta", "Eggs with Potato", 300],
  ["ispanakli-yumurta", "Ispanaklı Yumurta", "Eggs with Spinach", 330],
  ["peynirli-yumurta", "Peynirli Yumurta", "Eggs with Cheese", 300],
  ["sucuklu-yumurta", "Sucuklu Yumurta", "Eggs with Sucuk", 320],
  ["mantarli-yumurta", "Mantarlı Yumurta", "Eggs with Mushroom", 330],
  ["sosisli-yumurta", "Sosisli Yumurta", "Eggs with Hot Dog", 300],
  ["kavurmali-yumurta", "Kavurmalı Yumurta", "Eggs with Roast Beef", 350],
  ["kuymak", "Kuymak", "Kuymak (Cornmeal and Cheese)", 320, "Mısır unu ve peynirle hazırlanan sıcak kuymak."],
  ["pastirmali-yumurta", "Pastırmalı Yumurta", "Eggs with Pastrami", 350],
], {
  description: "Seçilen malzemeyle sahanda hazırlanıp sıcak servis edilen yumurta.",
  enDescription: "Eggs prepared in a pan with the selected ingredient and served hot.",
  details: ["Sahanda hazırlanır", "Sıcak servis"],
  enDetails: ["Prepared in a pan", "Served hot"],
});

add("sahanlar", [
  ["salcali-sahanda-sosis", "Salçalı Sahanda Sosis", "Hot Dog with Tomato Sauce", 350],
  ["sahanda-kavurma", "Sahanda Kavurma", "Roast Beef Pan", 350],
  ["sahanda-sucuk", "Sahanda Sucuk", "Sucuk Pan", 350],
  ["sahanda-pastirma", "Sahanda Pastırma", "Pastrami Pan", 350],
], {
  description: "Sahanda hazırlanıp sıcak servis edilen kahvaltılık.",
  enDescription: "Prepared in a pan and served hot.",
  details: ["Sahanda hazırlanır", "Sıcak servis"],
  enDetails: ["Prepared in a pan", "Served hot"],
});

add("sicak-icecekler", [
  ["cay", "Çay", "Turkish Tea", 70],
  ["buyuk-cay", "Büyük Çay", "Large Turkish Tea", 130],
  ["sicak-cikolata", "Sıcak Çikolata", "Hot Chocolate", 220],
  ["beyaz-sicak-cikolata", "Beyaz Sıcak Çikolata", "White Hot Chocolate", 230],
  ["sahlep", "Sahlep", "Salep", 220],
  ["chai-tea-latte", "Chai Tea Latte", "Chai Tea Latte", 230],
  ["balli-sut", "Ballı Süt", "Milk with Honey", 220],
  ["sicak-sut", "Sıcak Süt", "Hot Milk", 120],
], {
  description: "Sipariş üzerine hazırlanıp sıcak servis edilir.",
  enDescription: "Prepared to order and served hot.",
  details: ["Sıcak servis"],
  enDetails: ["Served hot"],
});

add("bitki-caylari", [
  ["yesil-cay", "Yeşil Çay", "Green Tea", 270],
  ["nar-cicegi-cayi", "Nar Çiçeği", "Pomegranate Blossom Tea", 260],
  ["papatya-cayi", "Papatya", "Chamomile Tea", 280],
  ["ihlamur-cayi", "Ihlamur", "Linden Tea", 290],
  ["ada-cayi", "Ada Çayı", "Sage Tea", 270],
  ["kusburnu-cayi", "Kuşburnu", "Rosehip Tea", 270],
  ["elma-cayi", "Elma", "Apple Tea", 260],
  ["portakal-cayi", "Portakal", "Orange Tea", 260],
  ["tarcin-cayi", "Tarçın", "Cinnamon Tea", 280],
  ["kis-cayi", "Kış Çayı", "Winter Tea", 310],
  ["special-bitki-cayi", "Special", "Special Herbal Tea", 290],
], {
  description: "Demlenerek sıcak servis edilen bitki çayı.",
  enDescription: "Herbal tea brewed and served hot.",
  details: ["Demleme çay", "Sıcak servis"],
  enDetails: ["Brewed tea", "Served hot"],
});

add("soft-icecekler", [
  ["su", "Su", "Water", 60],
  ["cola", "Cola", "Cola", 160],
  ["cola-zero", "Cola Zero", "Cola Zero", 160],
  ["fanta", "Fanta", "Fanta", 160],
  ["sprite", "Sprite", "Sprite", 160],
  ["schweppes", "Schweppes", "Schweppes", 170],
  ["maden-suyu", "Maden Suyu", "Mineral Water", 120],
  ["elmali-maden-suyu", "Elmalı Maden Suyu", "Apple Mineral Water", 130],
  ["limonlu-maden-suyu", "Limonlu Maden Suyu", "Lemon Mineral Water", 130],
  ["fuse-tea", "Fuse Tea", "Fuse Tea", 160, "Mango, şeftali veya limon aroması seçeneği.", {
    details: ["Mango", "Şeftali", "Limon"],
    enDetails: ["Mango", "Peach", "Lemon"],
  }],
  ["cappy", "Cappy", "Cappy", 160, "Vişne, şeftali veya portakal aroması seçeneği.", {
    details: ["Vişne", "Şeftali", "Portakal"],
    enDetails: ["Sour cherry", "Peach", "Orange"],
  }],
  ["red-bull", "Red Bull", "Red Bull", 250],
], {
  description: "Soğuk servis edilen içecek.",
  enDescription: "Served cold.",
  details: ["Soğuk servis"],
  enDetails: ["Served cold"],
});

add("soguk-icecekler", [
  ["cool-lime", "Cool Lime", "Cool Lime", 210],
  ["hibiscus", "Hibiscus", "Hibiscus", 210],
  ["limonata", "Limonata", "Lemonade", 180],
  ["cilekli-limonata", "Çilekli Limonata", "Strawberry Lemonade", 190],
  ["taze-portakal-suyu", "Taze Portakal Suyu", "Fresh Orange Juice", 240],
  ["taze-nar-suyu", "Taze Nar Suyu", "Fresh Pomegranate Juice", 160],
  ["mix-nar-portakal-suyu", "Mix Nar / Portakal Suyu", "Mixed Pomegranate / Orange Juice", 140],
  ["churchill", "Churchill", "Churchill", 260],
  ["ayran", "Ayran", "Ayran", 260],
], {
  description: "Soğuk ve ferah servis edilen içecek.",
  enDescription: "A refreshing drink served cold.",
  details: ["Soğuk servis"],
  enDetails: ["Served cold"],
});

add("sicak-kahveler", [
  ["espresso", "Espresso", "Espresso", 220],
  ["double-espresso", "Double Espresso", "Double Espresso", 310],
  ["americano", "Americano", "Americano", 250],
  ["cappuccino", "Cappuccino", "Cappuccino", 270],
  ["latte", "Latte", "Latte", 270],
  ["filtre-kahve", "Filtre Kahve", "Filter Coffee", 210],
  ["flat-white", "Flat White", "Flat White", 270],
  ["mocha", "Mocha", "Mocha", 290],
  ["white-chocolate-mocha", "White Chocolate Mocha", "White Chocolate Mocha", 290],
  ["macchiato", "Macchiato", "Macchiato", 250],
  ["cortado", "Cortado", "Cortado", 260],
  ["turk-kahvesi", "Türk Kahvesi", "Turkish Coffee", 160],
  ["double-turk-kahvesi", "Double Türk Kahvesi", "Double Turkish Coffee", 290],
  ["osmanli-kahvesi", "Osmanlı Kahvesi", "Ottoman Coffee", 210],
  ["damla-sakizli-turk-kahvesi", "Damla Sakızlı Türk Kahvesi", "Mastic Turkish Coffee", 190],
  ["frambuazli-turk-kahvesi", "Frambuazlı Türk Kahvesi", "Raspberry Turkish Coffee", 190],
], {
  description: "Sipariş üzerine hazırlanıp sıcak servis edilen kahve.",
  enDescription: "Coffee prepared to order and served hot.",
  details: ["Sipariş üzerine hazırlanır", "Sıcak servis"],
  enDetails: ["Prepared to order", "Served hot"],
});

add("soguk-kahveler", [
  ["ice-americano", "Ice Americano", "Iced Americano", 250],
  ["ice-latte", "Ice Latte", "Iced Latte", 270],
  ["ice-turk-kahvesi", "Ice Türk Kahvesi", "Iced Turkish Coffee", 160],
  ["ice-filtre-kahve", "Ice Filtre Kahve", "Iced Filter Coffee", 210],
  ["ice-mocha", "Ice Mocha", "Iced Mocha", 290],
  ["ice-white-mocha", "Ice White Mocha", "Iced White Mocha", 290],
  ["ice-chai-tea-latte", "Ice Chai Tea Latte", "Iced Chai Tea Latte", 230],
  ["cold-brew", "Cold Brew", "Cold Brew", 260],
  ["frappe", "Frappe", "Frappe", 270],
], {
  description: "Buzla hazırlanıp soğuk servis edilen kahve.",
  enDescription: "Coffee prepared with ice and served cold.",
  details: ["Buzlu", "Soğuk servis"],
  enDetails: ["Iced", "Served cold"],
});

const specialFlavoursTr = ["Mango", "Çilek", "Çikolata", "Kivi", "Nar", "Frambuaz", "Şeftali", "Karamel", "Orman Meyveli", "Yeşil Elma", "Kavun", "Çarkıfelek", "Böğürtlen", "Karpuz", "Ananas", "Muz", "Karadut", "Vanilya"];
const specialFlavoursEn = ["Mango", "Strawberry", "Chocolate", "Kiwi", "Pomegranate", "Raspberry", "Peach", "Caramel", "Forest Fruit", "Green Apple", "Melon", "Passion Fruit", "Blackberry", "Watermelon", "Pineapple", "Banana", "Black Mulberry", "Vanilla"];
add("milkshake-frozen-smoothie", [
  ["milkshake", "Milkshake", "Milkshake", 290, "18 aroma seçeneğinden biriyle hazırlanır.", {
    details: specialFlavoursTr,
    enDescription: "Prepared with a choice of 18 flavours.",
    enDetails: specialFlavoursEn,
  }],
  ["frozen", "Frozen", "Frozen", 240, "18 aroma seçeneğinden biriyle hazırlanır.", {
    details: specialFlavoursTr,
    enDescription: "Prepared with a choice of 18 flavours.",
    enDetails: specialFlavoursEn,
  }],
  ["smoothie", "Smoothie", "Smoothie", 310, "Muz, çilek veya Oreo seçeneğiyle hazırlanır.", {
    details: ["Muz", "Çilek", "Oreo"],
    enDescription: "Prepared with banana, strawberry or Oreo.",
    enDetails: ["Banana", "Strawberry", "Oreo"],
  }],
]);

const ids = new Set();
const itemImages = {
  "serpme-fix-menu": "serpme-fix-menu.webp",
  "van-golu-tabagi": "van-golu-tabagi.webp",
  "pisi-tabagi": "pisi-tabagi.webp",
  "yumurtali-ekmek-tabagi": "yumurtali-ekmek-tabagi.webp",
  "tulum-peyniri": "tulum-peyniri.webp",
  "taze-kasar": "taze-kasar.webp",
  "peynir-tabagi": "peynir-tabagi.webp",
  "koy-peyniri": "koy-peyniri.webp",
  "beyaz-peynir": "beyaz-peynir.webp",
  "otlu-peynir": "otlu-peynir.webp",
  "cecil-peyniri": "cecil-peyniri.webp",
  "eski-kasar": "eski-kasar.webp",
  "siyah-zeytin": "siyah-zeytin.webp",
  "yesil-zeytin": "yesil-zeytin.webp",
  "siyah-zeytin-ezmesi": "siyah-zeytin-ezmesi.webp",
  "karisik-zeytin": "karisik-zeytin.webp",
  "sogus": "sogus.webp",
  "peynirli-gozleme": "gozleme.webp",
  "kasarli-gozleme": "gozleme.webp",
  "patatesli-gozleme": "gozleme.webp",
  "ispanakli-gozleme": "gozleme.webp",
  "mantarli-gozleme": "gozleme.webp",
  "sucuklu-gozleme": "gozleme.webp",
  "kavurmali-gozleme": "gozleme.webp",
  "pastirmali-gozleme": "gozleme.webp",
  "special-gozleme": "gozleme.webp",
  "cevizli-cemen": "cevizli-cemen.webp",
  "tereyagli-jaji": "tereyagli-jaji.webp",
  "balli-cevizli-kavut": "balli-cevizli-kavut.webp",
  "tereyagli-cevizli-murtuga": "tereyagli-cevizli-murtuga.webp",
  "kayisi-receli": "kayisi-receli.webp",
  "ayva-receli": "ayva-receli.webp",
  "portakal-receli": "portakal-receli.webp",
  "cilek-receli": "cilek-receli.webp",
  "ceviz-receli": "ceviz-receli.webp",
  "nutella": "nutella.webp",
  "bal": "bal.webp",
  "kaymak": "kaymak.webp",
  "bal-kaymak": "bal-kaymak.webp",
  "tereyagi": "tereyagi.webp",
  "bal-tereyagi": "bal-tereyagi.webp",
  "tahin": "tahin.webp",
  "tahin-pekmez": "tahin-pekmez.webp",
  "pekmez": "pekmez.webp",
  "et-karisik-omlet": "et-karisik-omlet.webp",
  "sebze-karisik-omlet": "sebze-karisik-omlet.webp",
  "sade-menemen": "sade-menemen.webp",
  "mantarli-menemen": "mantarli-menemen.webp",
  "peynirli-menemen": "peynirli-menemen.webp",
  "sucuklu-menemen": "sucuklu-menemen.webp",
  "kavurmali-menemen": "kavurmali-menemen.webp",
  "pastirmali-menemen": "pastirmali-menemen.webp",
  "sahanda-yumurta": "sahanda-yumurta.webp",
  "patatesli-yumurta": "patatesli-yumurta.webp",
  "ispanakli-yumurta": "ispanakli-yumurta.webp",
  "peynirli-yumurta": "peynirli-yumurta.webp",
  "sucuklu-yumurta": "sucuklu-yumurta.webp",
  "mantarli-yumurta": "mantarli-yumurta.webp",
  "sosisli-yumurta": "sosisli-yumurta.webp",
  "kavurmali-yumurta": "kavurmali-yumurta.webp",
  "kuymak": "kuymak.webp",
  "pastirmali-yumurta": "pastirmali-yumurta.webp",
  "salcali-sahanda-sosis": "salcali-sahanda-sosis.webp",
  "sahanda-kavurma": "sahanda-kavurma.webp",
  "sahanda-sucuk": "sahanda-sucuk.webp",
  "sahanda-pastirma": "sahanda-pastirma.webp",
  "latte": "latte.webp",
  "turk-kahvesi": "turk-kahvesi.webp",
  "ice-latte": "ice-latte.webp",
  "milkshake": "milkshake.webp",
};

for (const item of rawItems) {
  if (!categoryById.has(item.category)) throw new Error(`Unknown category: ${item.category}`);
  if (ids.has(item.id)) throw new Error(`Duplicate item id: ${item.id}`);
  ids.add(item.id);

  const imageFile = itemImages[item.id];
  if (imageFile) {
    item.image = `/images/menu-products/${imageFile}`;
    item.imageAlt = `${item.name} ürün görseli`;
    item.translations.en.imageAlt = `${item.translations.en.name} product image`;
  }
}

const menuData = {
  categories,
  items: rawItems,
  lastUpdated: "28 Temmuz 2026",
};

if (categories.length !== 18 || rawItems.length !== 142) {
  throw new Error(`Unexpected totals: ${categories.length} categories, ${rawItems.length} items`);
}

const outputPath = path.join(process.cwd(), "src/app/menu/menu-data.json");
fs.writeFileSync(outputPath, `${JSON.stringify(menuData, null, 2)}\n`, "utf8");
console.log(`Generated ${rawItems.length} menu items in ${categories.length} categories.`);
