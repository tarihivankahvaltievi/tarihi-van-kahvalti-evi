import type { SiteLanguage } from "../site-languages";

type OfferCopy = {
  exclusive: string;
  title: string;
  drinks: string;
  discount: string;
  instruction: string;
  coupon: string;
  dismiss: string;
  close: string;
  reopen: string;
};

export const coffeeOfferContent: Record<SiteLanguage, OfferCopy> = {
  tr: {
    exclusive: "Web sitemize özel",
    title: "Kahve molasına davetlisiniz",
    drinks: "Filtre kahve & Americano",
    discount: "%20 indirim",
    instruction: "İndirimden yararlanmak için sipariş verirken indirim20 kuponunu garsonumuza söyleyin.",
    coupon: "Kupon kodunuz",
    dismiss: "Harika, aklımda",
    close: "Kampanyayı kapat",
    reopen: "Kahvede %20 indirim",
  },
  en: {
    exclusive: "Exclusive to our website",
    title: "Time for a coffee break",
    drinks: "Filter coffee & Americano",
    discount: "20% off",
    instruction: "To enjoy the discount, tell your waiter the coupon code indirim20 when placing your order.",
    coupon: "Your coupon code",
    dismiss: "Got it, thank you",
    close: "Close offer",
    reopen: "20% off coffee",
  },
  ko: {
    exclusive: "웹사이트 방문 고객 특별 혜택",
    title: "커피 한 잔의 여유",
    drinks: "필터 커피 & 아메리카노",
    discount: "20% 할인",
    instruction: "할인을 받으시려면 주문하실 때 직원에게 쿠폰 코드 indirim20을 말씀해 주세요.",
    coupon: "쿠폰 코드",
    dismiss: "확인했어요",
    close: "혜택 안내 닫기",
    reopen: "커피 20% 할인",
  },
  "zh-cn": {
    exclusive: "网站访客专享",
    title: "来享受一杯咖啡吧",
    drinks: "滴滤咖啡和美式咖啡",
    discount: "八折优惠（减免20%）",
    instruction: "享受优惠，请在点单时向服务员告知优惠码 indirim20。",
    coupon: "您的优惠码",
    dismiss: "好的，记住了",
    close: "关闭优惠信息",
    reopen: "咖啡八折优惠",
  },
  es: {
    exclusive: "Exclusivo para visitantes de nuestra web",
    title: "Una pausa para el café",
    drinks: "Café de filtro y americano",
    discount: "20% de descuento",
    instruction: "Para disfrutar del descuento, dile a tu camarero el código indirim20 al hacer tu pedido.",
    coupon: "Tu código de descuento",
    dismiss: "Entendido, gracias",
    close: "Cerrar oferta",
    reopen: "20% de descuento en café",
  },
  ar: {
    exclusive: "عرض خاص لزوار موقعنا",
    title: "حان وقت استراحة القهوة",
    drinks: "قهوة الفلتر والأمريكانو",
    discount: "خصم 20٪",
    instruction: "للاستفادة من الخصم، أخبر النادل برمز القسيمة indirim20 عند تقديم طلبك.",
    coupon: "رمز القسيمة الخاص بك",
    dismiss: "حسنًا، شكرًا",
    close: "إغلاق العرض",
    reopen: "خصم 20٪ على القهوة",
  },
  ru: {
    exclusive: "Специально для посетителей нашего сайта",
    title: "Время для кофейной паузы",
    drinks: "Фильтр-кофе и американо",
    discount: "Скидка 20%",
    instruction: "Чтобы получить скидку, назовите официанту промокод indirim20 при оформлении заказа.",
    coupon: "Ваш промокод",
    dismiss: "Понятно, спасибо",
    close: "Закрыть предложение",
    reopen: "Скидка 20% на кофе",
  },
  ja: {
    exclusive: "ウェブサイトをご覧の方限定",
    title: "コーヒーでひと休み",
    drinks: "フィルターコーヒー＆アメリカーノ",
    discount: "20%オフ",
    instruction: "割引をご利用いただくには、ご注文の際にスタッフへクーポンコード indirim20 をお伝えください。",
    coupon: "クーポンコード",
    dismiss: "確認しました",
    close: "キャンペーンを閉じる",
    reopen: "コーヒー20%オフ",
  },
};
