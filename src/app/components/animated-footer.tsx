import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  address,
  displayAddress,
  displayPhone,
  email,
  mapsUrl,
  openingHours,
  telUrl,
  whatsappUrl,
} from "../seo";
import { BookingOpenButton } from "./booking-open-button";

const footerLinks = [
  { href: "/menu", label: "Menü ve Fiyatlar" },
  { href: "/van-kahvaltisi", label: "Van Kahvaltısı" },
  { href: "/beyoglu-kahvalti", label: "Beyoğlu Kahvaltı" },
  { href: "/kafka-cafe", label: "Kafka Cafe" },
  { href: "/iletisim", label: "Konum ve Rezervasyon" },
  { href: "/sss", label: "Sıkça Sorulan Sorular" },
] as const;

function IstanbulSkyline() {
  return (
    <div className="footer-skyline-wrapper" aria-hidden="true">
      <svg
        className="footer-skyline-svg"
        viewBox="0 0 1200 240"
        preserveAspectRatio="xMidYMax slice"
        role="presentation"
      >
        <path
          d="M0 214V136h92v-34h76v52h88V92h66v62h94v-48h78v48h82V74h54v80h96v-30h92v30h88V88h72v66h94v60Z"
          fill="#efe4d2"
          stroke="#5d4b3d"
          strokeWidth="3"
        />
        <g fill="#fff8e8" stroke="#8f171a" strokeWidth="3">
          <path d="M555 154V68h90v86Z" />
          <path d="M566 68h68l-10-28h-48Z" />
          <path d="M590 40h20V18h-20Z" />
        </g>
        <g className="tram-group" transform="translate(138 168)">
          <rect width="150" height="48" rx="12" fill="#9a1d22" stroke="#321d1e" strokeWidth="3" />
          <path d="M14 12h122v20H14Z" fill="#f7e7bd" />
          <path d="M50 12v20m50-20v20" stroke="#321d1e" strokeWidth="2" />
          <circle cx="34" cy="49" r="10" fill="#321d1e" />
          <circle cx="116" cy="49" r="10" fill="#321d1e" />
        </g>
        <path d="M0 220h1200" stroke="#8d7a68" strokeWidth="6" />
        <path d="M0 229h1200" stroke="#b99b68" strokeWidth="2" strokeDasharray="18 12" />
      </svg>
    </div>
  );
}

export function AnimatedFooter() {
  return (
    <footer id="footer" className="footer-reimagined">
      <IstanbulSkyline />

      <div className="footer-content">
        <div className="footer-top-section">
          <div className="footer-brand-lockup">
            <a className="footer-brand-logo" href="#top" aria-label="Sayfanın başına dön">
              <Image
                src="/images/brand-icon-small.png"
                alt=""
                width={76}
                height={95}
                loading="lazy"
              />
            </a>
            <h2 className="footer-manifesto">
              Van kahvaltısı, <br />
              <span className="footer-manifesto-italic">tarihle aynı sofrada.</span>
            </h2>
            <p className="footer-brand-desc">
              1978’den beri süregelen aile yolculuğumuzda, Beyoğlu’nun kalbindeki tarihi
              binanın dokusunu bakır sahanlar ve eksilmeyen demli çayla buluşturuyoruz.
            </p>
            <BookingOpenButton className="footer-cta" category="Kahvaltı">
              Masada yerini ayırt
            </BookingOpenButton>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-col-title">Keşfet</h3>
            <ul className="footer-links">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Bize ulaşın</h3>
            <ul className="footer-links">
              <li>
                <a href={telUrl}><Phone size={16} /> {displayPhone}</a>
              </li>
              <li>
                <a href={`mailto:${email}`}><Mail size={16} /> {email}</a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </li>
              <li>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin size={16} /> {address.streetAddress} {address.locality}
                </a>
              </li>
            </ul>
            <address className="footer-address-semantic">{displayAddress}, {address.countryName}</address>
          </div>

          <div className="footer-col footer-col-info">
            <div className="info-hours">
              <span className="hours-label"><Clock size={14} /> Her gün açığız</span>
              <strong className="hours-value">{openingHours.opens} – {openingHours.closes}</strong>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">© 2026 Tarihi Van Kahvaltı Evi</div>
        </div>
      </div>
    </footer>
  );
}
