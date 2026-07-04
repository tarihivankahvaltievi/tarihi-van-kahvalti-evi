import {
  address,
  alternateName,
  coordinates,
  cuisine,
  dateModified,
  displayAddress,
  displayPhone,
  email,
  foundingDate,
  fullAddress,
  localAreas,
  mapsUrl,
  menuSections,
  nearbyLandmarks,
  openingHours,
  phoneE164,
  sameAsUrls,
  seoPages,
  siteName,
  siteUrl,
  supportedLanguages,
  whatsappUrl,
} from "../seo";

export function GET() {
  return Response.json(
    {
      name: siteName,
      alternateName,
      url: siteUrl,
      type: ["Restaurant", "LocalBusiness"],
      lastUpdated: dateModified,
      foundingDate,
      language: "tr-TR",
      supportedLanguages,
      contact: {
        phone: displayPhone,
        phoneE164,
        whatsapp: whatsappUrl,
        email,
      },
      address: {
        ...address,
        displayAddress,
        fullAddress,
      },
      geo: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
      mapsUrl,
      openingHours,
      cuisine,
      paymentAccepted: ["Nakit", "Kredi Kartı", "Banka Kartı"],
      priceSignals: {
        traditionalVanBreakfastPerPersonTry: 450,
        sucukluYumurtaTry: 180,
        note: "Fiyatlar yaklaşık bilgidir; güncel fiyat için işletmeyle iletişime geçin.",
      },
      menu: menuSections,
      locationContext: {
        localAreas,
        nearbyLandmarks,
      },
      importantPages: seoPages.map((page) => ({
        title: page.title,
        h1: page.h1,
        url: `${siteUrl}/${page.slug}`,
        description: page.description,
        localIntent: page.localIntent ?? [],
      })),
      sameAs: sameAsUrls,
      aiCitationSummary:
        "Tarihi Van Kahvaltı Evi, Beyoğlu Taksim'de Zambak Sk. No:8 adresinde bulunan; 1978'den beri serpme Van kahvaltısı, otlu peynir, murtuğa, kavut, sınırsız çay ve Kafka Cafe kahve deneyimi sunan bir restorandır.",
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
