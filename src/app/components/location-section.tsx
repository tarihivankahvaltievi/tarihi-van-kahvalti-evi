"use client";

import { MapPin, Train, Car, Compass, Phone, MessageCircle, Clock } from "lucide-react";

export function LocationSection() {
  const mapsSearchUrl =
    "https://www.google.com/maps/search/?api=1&query=Tarihi%20Van%20Kahvalt%C4%B1%20Evi%20Zambak%20Sk.%20No%3A8%20Beyo%C4%9Flu";
  const mapsEmbedUrl =
    "https://maps.google.com/maps?q=Tarihi%20Van%20Kahvalt%C4%B1%20Evi%20Zambak%20Sokak&t=&z=16&ie=UTF8&iwloc=&output=embed";
  const whatsappUrl =
    "https://wa.me/905415252868?text=Merhaba%2C%20Tarihi%20Van%20Kahvalt%C4%B1%20Evi%20i%C3%A7in%20rezervasyon%20bilgisi%20almak%20istiyorum.";

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 bg-white border-t border-[var(--line)]"
      aria-labelledby="location-heading"
    >
      <div className="max-w-6xl mx-auto" data-reveal>
        <div className="text-center mb-16">
          <span className="light-pill inline-block mb-3 bg-[var(--soft)] text-[var(--red-dark)] border border-[var(--line)] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Ulaşım & Konum
          </span>
          <h2
            id="location-heading"
            className="text-3xl md:text-5xl text-[var(--ink)] font-serif mb-4"
          >
            Bizi Kolayca Bulun
          </h2>
          <p className="text-[var(--muted)] text-base max-w-xl mx-auto">
            Taksim Meydanı'na ve İstiklal Caddesi'ne yürüme mesafesinde, tarihi Rum binasındayız.
            <br />
            <span className="text-xs text-[var(--gold-dark)] block mt-1">
              *We are located in a historic Greek building within walking distance to Taksim Square & Istiklal Street.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Transit Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-[var(--soft)] p-8 md:p-10 rounded-3xl border border-[var(--line)] shadow-sm">
            <div className="space-y-6">
              <h3 className="text-xl font-serif text-[var(--ink)] border-b border-[var(--line)] pb-3 flex items-center gap-2">
                <Compass className="text-[var(--red)] w-5 h-5" />
                Ulaşım Rehberi / Transit Guide
              </h3>

              {/* Transit 1: Metro */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white border border-[var(--line)] rounded-xl flex items-center justify-center text-[var(--red)] shadow-sm">
                  <Train size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--ink)] text-sm md:text-base">
                    Metro ile Ulaşım / By Metro
                  </h4>
                  <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed mt-0.5">
                    <strong>M2 Yenikapı - Hacıosman</strong> metrosu ile Taksim durağında inin. Sıraselviler çıkışından Zambak Sokak'a girerek 3 dakika yürümeniz yeterlidir.
                    <br />
                    <span className="text-xs text-[var(--muted)] opacity-85 block mt-1">
                      *Take the M2 Metro to Taksim station. Exit towards Sıraselviler and walk 3 mins down Zambak Street.
                    </span>
                  </p>
                </div>
              </div>

              {/* Transit 2: Tram / Walking */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white border border-[var(--line)] rounded-xl flex items-center justify-center text-[var(--red)] shadow-sm">
                  <Compass size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--ink)] text-sm md:text-base">
                    Tramvay & Yaya / Tram & On Foot
                  </h4>
                  <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed mt-0.5">
                    İstiklal Caddesi üzerinden Fransız Başkonsolosluğu sokağına girin, 100 metre ileride sağda yer almaktayız.
                    <br />
                    <span className="text-xs text-[var(--muted)] opacity-85 block mt-1">
                      *From Istiklal Street, enter the street next to the French Consulate, we are 100 meters ahead on the right.
                    </span>
                  </p>
                </div>
              </div>

              {/* Transit 3: Car */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white border border-[var(--line)] rounded-xl flex items-center justify-center text-[var(--red)] shadow-sm">
                  <Car size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--ink)] text-sm md:text-base">
                    Araç & Otopark / By Car & Parking
                  </h4>
                  <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed mt-0.5">
                    Zambak Sokak araç trafiğine açıktır. Sokağımızda ve yakın çevrede ücretli otoparklar (İSPARK, Katlı Otoparklar) mevcuttur.
                    <br />
                    <span className="text-xs text-[var(--muted)] opacity-85 block mt-1">
                      *Zambak Street is open to traffic. Several paid public parking lots (ISPARK and garages) are available nearby.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact & Details */}
            <div className="pt-6 border-t border-[var(--line)] space-y-4">
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <Clock size={16} className="text-[var(--gold-dark)]" />
                <span><strong>Her Gün / Open Daily:</strong> 08:00 - 18:00</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <MapPin size={16} className="text-[var(--gold-dark)]" />
                <span>Zambak Sk. No:8, 34435 Beyoğlu/İstanbul</span>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="tel:+905415252868"
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[var(--line)] rounded-full text-xs font-semibold text-[var(--ink)] hover:border-[var(--red)] hover:text-[var(--red)] transition-all shadow-sm"
                >
                  <Phone size={14} />
                  <span>Ara / Call</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-[#25D366] text-white rounded-full text-xs font-semibold hover:bg-[#1ebd59] transition-all shadow-sm"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-[var(--red)] text-white rounded-full text-xs font-semibold hover:bg-[var(--red-dark)] transition-all shadow-sm"
                >
                  <MapPin size={14} />
                  <span>Yol Tarifi / Directions</span>
                </a>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#4285F4] text-[#4285F4] rounded-full text-xs font-semibold hover:bg-[#4285F4] hover:text-white transition-all shadow-sm"
                >
                  <Compass size={14} />
                  <span>Değerlendirin / Review us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Map Embed */}
          <div className="lg:col-span-7 h-[350px] lg:h-auto min-h-[400px] relative rounded-3xl overflow-hidden border border-[var(--line)] shadow-md">
            <iframe
              src={mapsEmbedUrl}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tarihi Van Kahvaltı Evi Google Haritası"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
