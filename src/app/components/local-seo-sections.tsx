import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  displayAddress,
  localSeoFacts,
  mapsUrl,
  menuSections,
  openingHours,
  telUrl,
  whatsappUrl,
} from "../seo";

export function LocalSeoSections() {
  return (
    <div className="local-seo-stack">
      <section id="menu" className="local-answer-panel menu-answer-panel" aria-labelledby="menu-heading">
        <div className="local-answer-head">
          <span className="local-answer-label">Sofrada neler var?</span>
          <h2 id="menu-heading">Van kahvaltısı menüsü ve fiyat bilgisi</h2>
          <p>
            Serpme Van kahvaltısı en az iki kişilik servis edilir. Güncel fiyat ve ürün
            uygunluğu değişebileceği için ziyaret öncesi işletmeden teyit alabilirsiniz.
          </p>
        </div>

        <div className="menu-answer-grid">
          {menuSections.map((section) => (
            <article key={section.name} className="menu-answer-card">
              <h3>{section.name}</h3>
              <p>{section.description}</p>
              <ul className="menu-answer-list">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.description}</small>
                    </span>
                    {"price" in item && item.price ? (
                      <span className="menu-answer-price">
                        {item.price} {item.priceCurrency}
                        {"unit" in item && item.unit ? <small>{item.unit}</small> : null}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="local-answer-panel" aria-labelledby="local-answer-heading">
        <div className="local-answer-head">
          <span className="local-answer-label">Ziyaretinizi planlayın</span>
          <h2 id="local-answer-heading">Beyoğlu ve Taksim&apos;de Van kahvaltısı nerede yenir?</h2>
          <p>
            <strong>Tarihi Van Kahvaltı Evi</strong>, {displayAddress}{" "}adresindedir. Taksim
            Meydanı, M2 Taksim metro ve İstiklal Caddesi&apos;nden Zambak Sokak&apos;a yürüyerek
            ulaşabilirsiniz.
          </p>
        </div>

        <div className="local-answer-grid">
          {localSeoFacts.map((fact) => {
            const external = fact.href.startsWith("http");
            const content = (
              <>
                {fact.linkLabel} <ChevronRight size={16} aria-hidden="true" />
              </>
            );

            return (
              <article key={fact.label} className="local-answer-card">
                <h3>{fact.label}</h3>
                <p>{fact.value}</p>
                {fact.href.startsWith("/") ? (
                  <Link href={fact.href} hrefLang={fact.href === "/en" ? "en" : undefined}>
                    {content}
                  </Link>
                ) : (
                  <a
                    href={fact.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {content}
                  </a>
                )}
              </article>
            );
          })}
        </div>

        <div className="local-contact-strip" aria-label="İletişim ve çalışma saatleri">
          <address>{displayAddress}</address>
          <span>{openingHours.short}</span>
          <a href={telUrl}>Ara</a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">Yol tarifi</a>
        </div>
      </section>
    </div>
  );
}
