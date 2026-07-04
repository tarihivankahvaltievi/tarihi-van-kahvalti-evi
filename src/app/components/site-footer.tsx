import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  address,
  displayAddress,
  displayPhone,
  mapsUrl,
  openingHours,
  siteName,
  telUrl,
  whatsappUrl,
} from "../seo";

export function SiteFooter() {
  return (
    <footer id="footer" className="footer-reimagined site-footer-lite">
      <div className="footer-content">
        <div className="footer-top-section">
          <div className="footer-brand-lockup">
            <Link href="/" className="footer-brand-logo" aria-label={siteName}>
              <Image src="/images/brand-icon-small.png" alt="" width={90} height={90} />
            </Link>
            <p className="footer-manifesto">
              Van kahvaltısı, <span className="footer-manifesto-italic">tarihle</span> aynı sofrada.
            </p>
            <p className="footer-brand-desc">
              Zambak Sokak&apos;ta, Taksim ve İstiklal rotasına yakın geleneksel serpme Van kahvaltısı.
            </p>
            <a className="footer-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} />
              WhatsApp&apos;tan bilgi al
            </a>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-grid">
          <div className="footer-col">
            <h2 className="footer-col-title">Yerel sayfalar</h2>
            <ul className="footer-links">
              <li>
                <Link href="/menu">
                  <ArrowRight size={17} />
                  <span className="link-text">Menü ve fiyatlar</span>
                </Link>
              </li>
              <li>
                <Link href="/van-kahvaltisi">
                  <ArrowRight size={17} />
                  <span className="link-text">Van kahvaltısı nedir?</span>
                </Link>
              </li>
              <li>
                <Link href="/beyoglu-kahvalti">
                  <ArrowRight size={17} />
                  <span className="link-text">Beyoğlu kahvaltı</span>
                </Link>
              </li>
              <li>
                <Link href="/taksim-kahvalti">
                  <ArrowRight size={17} />
                  <span className="link-text">Taksim kahvaltı</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-col-title">Ulaşım ve iletişim</h2>
            <ul className="footer-links">
              <li>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin size={17} />
                  <span className="link-text">{displayAddress}</span>
                </a>
              </li>
              <li>
                <a href={telUrl}>
                  <Phone size={17} />
                  <span className="link-text">{displayPhone}</span>
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={17} />
                  <span className="link-text">WhatsApp rezervasyon bilgisi</span>
                </a>
              </li>
              <li>
                <Link href="/kahvalti-yol-tarifi">
                  <MapPin size={17} />
                  <span className="link-text">Taksim metrodan yol tarifi</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-col-info">
            <div className="info-badge-wrapper">
              <div className="info-badge">
                <span className="info-badge-title">1978</span>
                <span className="info-badge-subtitle">Aile sofrası</span>
              </div>
            </div>
            <div className="info-hours">
              <span className="hours-label">
                <Clock size={15} /> Her gün
              </span>
              <span className="hours-value">{openingHours.short}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            {siteName} - {address.neighborhood}, {address.locality}
          </span>
          <div className="footer-legal-links">
            <Link href="/sss">SSS</Link>
            <Link href="/iletisim">İletişim</Link>
            <Link href="/turkish-breakfast-istanbul">English</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
