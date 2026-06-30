import ClientPage from "./client-page";

const displayPhone = "+90 541 525 2868";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Tarihi Van Kahvaltı Evi",
  image: ["/images/hero-table.jpg", "/images/breakfast-spread.jpg"],
  servesCuisine: ["Van kahvaltısı", "Turkish breakfast", "Coffee"],
  telephone: displayPhone,
  email: "info@tarihivankahvaltievi.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zambak Sk. No:8",
    addressLocality: "Beyoğlu",
    addressRegion: "İstanbul",
    postalCode: "34421",
    addressCountry: "TR",
  },
  priceRange: "$$",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage />
    </>
  );
}

