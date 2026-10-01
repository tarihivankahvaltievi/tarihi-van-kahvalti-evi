import type { MenuItem } from "./menu-data";
import type { MenuLocale } from "./menu-localization";

export type OrderingQuestion = { question: string; answer: string };

export function getOrderingQuestions(locale: MenuLocale, items: MenuItem[]): OrderingQuestion[] {
  const isEn = locale === "en";
  const serpme = items.find((item) => item.id === "serpme-fix-menu");
  const plate = items.find((item) => item.id === "van-golu-tabagi");
  const serving = [serpme, plate].filter((item): item is MenuItem => Boolean(item))
    .map((item) => `${item.name}: ${item.details.join("; ")}.`).join(" ");

  return [
    {
      question: isEn ? "Can I choose breakfast for one person?" : "Tek kişi için kahvaltı seçebilir miyim?",
      answer: isEn
        ? "The minimum of two people applies to Serpme Fix Menu. For an individual serving, compare the per-person Van Gölü Plate, Pişi Plate, Egg Bread Plate and à la carte dishes. Party size in a table request is separate from the minimum order for a dish."
        : "Minimum iki kişi kuralı Serpme Fix Menü içindir. Bireysel seçim için kişi başı sunulan Van Gölü Tabağı, Pişi Tabağı, Yumurtalı Ekmek Tabağı ve ayrı sipariş edilen ürünleri karşılaştırabilirsiniz. Masa talebindeki kişi sayısı, bir ürünün minimum sipariş koşulundan ayrıdır.",
    },
    {
      question: isEn ? "Which drinks and hot options are included?" : "Hangi içecekler ve sıcak seçenekler dahil?",
      answer: `${serving} ${isEn
        ? "Water, coffee and other drinks also have separate entries and prices in the menu. Check the selected breakfast's listed inclusions before adding a drink."
        : "Su, kahve ve diğer içecekler menüde ayrıca ürün ve fiyatlarıyla listelenir. İçecek eklerken seçtiğiniz kahvaltının dahil ürünlerini esas alın."}`,
    },
    {
      question: isEn ? "How do prices and additional charges work?" : "Fiyatlar ve ek ücretler nasıl değerlendirilir?",
      answer: isEn
        ? "Menu prices are in Turkish lira (TRY). A per-person label applies to each guest; add-ons are listed separately. Before ordering, confirm the total for your choices and any service or cover charge with the team."
        : "Menü fiyatları Türk lirası (TL) olarak gösterilir. Kişi başı notu her misafire uygulanır; ekstra ürünler ayrıca listelenir. Sipariş öncesinde seçimlerinizin toplam tutarını ve varsa servis/kuver koşullarını ekibimizle netleştirin.",
    },
    {
      question: isEn ? "Where can I get ingredient and allergen information?" : "İçerik ve alerjen bilgisine nasıl ulaşabilirim?",
      answer: isEn
        ? "Tell the team about any allergy or dietary restriction before ordering. Dish descriptions identify the dish but do not replace the kitchen's complete ingredient and allergen information. Confirm milk and meat types, sauces and possible cross-contact for your chosen items; a dish name alone does not establish suitability."
        : "Alerji veya beslenme kısıtınızı sipariş vermeden önce ekibimize bildirin. Ürün açıklamaları yemeği tanıtır; mutfağın tam içerik ve alerjen bilgisinin yerine geçmez. Seçiminiz için süt/et türünü, sosları ve olası çapraz teması netleştirin; yalnız ürün adından uygunluk sonucu çıkarmayın.",
    },
    {
      question: isEn ? "Which currency and payment method should I plan for?" : "Ödeme için hangi para birimini ve yöntemi esas almalıyım?",
      answer: isEn
        ? "Use the Turkish lira prices in the menu to plan your order. If you need a particular card or want to pay in another currency, confirm acceptance and any conversion with the restaurant before ordering."
        : "Siparişinizi planlarken menüdeki Türk lirası fiyatlarını esas alın. Belirli bir kart veya yabancı para birimiyle ödeme yapmak istiyorsanız kabul koşullarını ve varsa kur uygulamasını sipariş öncesinde işletmeyle netleştirin.",
    },
    {
      question: isEn ? "How can I plan step-free access or a stroller visit?" : "Basamaksız erişim veya bebek arabasıyla ziyareti nasıl planlayabilirim?",
      answer: isEn
        ? "Our address is Zambak Street No:8. Before travelling, contact the team about the entrance, steps, your preferred seating area and toilet access. Mention a wheelchair or stroller in your table request so the team can confirm a suitable arrangement."
        : "Adresimiz Zambak Sokak No:8. Gelmeden önce giriş, basamaklar, tercih ettiğiniz oturma alanı ve tuvalete erişim için ekibimizden bilgi alın. Tekerlekli sandalye veya bebek arabası ihtiyacınızı masa talebine ekleyerek uygun düzenin teyit edilmesini sağlayabilirsiniz.",
    },
    {
      question: isEn ? "Do opening hours guarantee every breakfast item is available?" : "Çalışma saatleri her kahvaltı ürününün bulunabileceği anlamına gelir mi?",
      answer: isEn
        ? "Opening hours describe when the venue is open. Check the availability of your chosen breakfast and hot dishes for your visit time, especially for a late breakfast or a group. A reservation request becomes a confirmed table only after the restaurant replies."
        : "Çalışma saatleri mekânın açık olduğu aralığı belirtir. Özellikle geç kahvaltı veya grup ziyaretinde seçtiğiniz kahvaltı ve sıcak ürünlerin ziyaret saatinizdeki uygunluğunu teyit edin. Masa talebi, işletmenin yanıtından sonra kesinleşir.",
    },
  ];
}
