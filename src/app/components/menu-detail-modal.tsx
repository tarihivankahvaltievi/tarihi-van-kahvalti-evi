"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";

interface MenuItem {
  title: string;
  tag: string;
  category: string;
  image: string;
  desc: string;
  detail: string;
  price: string;
}

interface MenuDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onSelectForBooking: (itemTitle: string) => void;
}

const detailedDescriptions: Record<string, { ingredients: string[]; origin: string; pairing: string }> = {
  "Serpme Van Kahvaltısı": {
    ingredients: [
      "Yöresel Van otlu peyniri (Sirmo, heliz ve mendi otlu)",
      "Gevaş karakovan balı ve manda kaymağı",
      "Geleneksel Van ketesi ve sıcak pişi",
      "Kavut (tereyağlı kavrulmuş buğday)",
      "Murtuğa (yumurtalı un kavurması)",
      "Yeşil ve siyah zeytinler, söğüş tabağı",
      "Sınırsız semaver çayı",
    ],
    origin: "Tüm peynir ve şarküteri ürünlerimiz doğrudan Van'daki yerel üreticilerden haftalık olarak ulaştırılmaktadır. Balımız Gevaş yaylalarından süzülmektedir.",
    pairing: "Yöresel sıcaklarımız Murtuğa ve Kavut ile birlikte çıtır pişilerin eşliğinde yenmesi tavsiye edilir.",
  },
  "Sahanda Sucuklu Yumurta": {
    ingredients: [
      "Yerli özel kasap sucuğu",
      "Serbest gezen tavuk çiftlik yumurtası",
      "Köy tereyağı",
    ],
    origin: "Baharatlı ve katkısız kasap sucuklarımız Afyon'dan, tereyağımız ise Trabzon Vakfıkebir'den getirilmektedir.",
    pairing: "Taze demlenmiş siyah çay ve sıcak pişiyle mükemmel gider.",
  },
  "Murtuğa (Van Spesiyali)": {
    ingredients: [
      "Kavrulmuş un",
      "Köy tereyağı",
      "Çiftlik yumurtası",
    ],
    origin: "Murtuğa, Van kahvaltı kültürünün en eski sıcak yemeklerinden biridir. Unun tereyağında kokusu çıkana kadar sabırla kavrulmasıyla hazırlanır.",
    pairing: "Üzerine az miktarda Van süzme balı gezdirilerek tatlı-tuzlu dengesiyle yenmesi geleneksel bir yöntemdir.",
  },
  "Kavut (Kavrulmuş Buğday)": {
    ingredients: [
      "Kavrulmuş organik buğday unu",
      "Eritilmiş tereyağı",
      "Ceviz içi ve süzme bal",
    ],
    origin: "Tarihi Urartu mutfağına kadar dayanan bu özel enerji tarifi, buğdayın yıkanıp kurutulduktan sonra kavrulması ve taş değirmende çekilmesiyle elde edilen unla yapılır.",
    pairing: "Yanında gelen süzme çiçek balı ile karıştırılarak sıcak servis edilir.",
  },
  "Sahanda Tereyağlı Menemen": {
    ingredients: [
      "Çanakkale tarla domatesleri",
      "İnce kabuklu köy biberleri",
      "Taze tereyağı ve erimiş Trakya kaşar peyniri",
    ],
    origin: "Mevsiminde toplanan domatesler ve taze sebzelerle hazırlanan menemenimiz, bakır sahanda servis edilir.",
    pairing: "Ekşi mayalı sıcak ekmek banarak yenmesi önerilir.",
  },
  "Kete & Sıcak Pişi Tabağı": {
    ingredients: [
      "İç dolgulu geleneksel Van ketesi",
      "Taze mayalanmış çıtır pişiler",
      "Ezine beyaz peyniri ve söğüş salata",
    ],
    origin: "Ketelerimiz, un ve tereyağı kavurmasıyla hazırlanan iç harçla elde açılmakta ve günlük taze fırınlanmaktadır.",
    pairing: "Yanında gelen Ezine peyniri ve taze nane yapraklarıyla harika bir atıştırmalıktır.",
  },
  "Kafka Cafe Kahveleri": {
    ingredients: [
      "100% Arabica nitelikli kahve çekirdekleri",
      "Taze tam yağlı veya yulaf sütü seçeneği",
    ],
    origin: "Çekirdeklerimiz Ethiopia Sidamo ve Colombia Supremo bölgelerinden adil ticaret (Fair Trade) ile temin edilip haftalık kavrulmaktadır.",
    pairing: "Tarihi binamızın kütüphane köşesinde kitap okurken veya çalışırken yudumlamak için idealdir.",
  },
  "Geleneksel Türk Kahvesi": {
    ingredients: [
      "İnce çekilmiş Arabica çekirdekleri",
      "Double shot közde pişirim",
      "Çikolatalı lokum ve damla sakızlı su",
    ],
    origin: "Cezvemiz el dövmesi bakırdır. Ağır ateşte kumda/közde köpürterek pişirme tekniği uygulanır.",
    pairing: "Kahvaltı sonrasında hazmı kolaylaştırmak ve sohbeti uzatmak için en iyi seçimdir.",
  },
};

export function MenuDetailModal({ item, onClose, onSelectForBooking }: MenuDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (item) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [item]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        const isInContent = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInContent) {
          onClose();
        }
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleBackdropClick);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, [onClose]);

  if (!item) return null;

  const info = detailedDescriptions[item.title] || {
    ingredients: [item.desc],
    origin: "Doğal malzemelerle hazırlanmış taze sunum.",
    pairing: "Kahvaltınızın yanında taze çay ile keyifle tüketebilirsiniz.",
  };

  return (
    <dialog
      ref={dialogRef}
      className="detail-dialog"
      aria-labelledby="detail-title"
    >
      <div className="detail-modal-wrapper">
        <button
          type="button"
          onClick={onClose}
          className="detail-close-btn"
          aria-label="Kapat"
        >
          <X size={22} />
        </button>

        <div className="detail-hero-image">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 550px"
            priority
          />
          <div className="detail-image-overlay">
            <span className="detail-tag">{item.tag}</span>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-meta">
            <h3 id="detail-title">{item.title}</h3>
            <div className="detail-price-badge">
              <strong>{item.price}</strong>
              <small>{item.detail}</small>
            </div>
          </div>

          <div className="detail-section">
            <h4>İçindekiler & Sunum</h4>
            <ul className="ingredients-list">
              {info.ingredients.map((ing, idx) => (
                <li key={idx}>✨ {ing}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h4>Lezzet Hikayesi & Menşei</h4>
            <p className="origin-text">{info.origin}</p>
          </div>

          <div className="detail-section">
            <h4>Nasıl Yenmeli?</h4>
            <p className="pairing-text">{info.pairing}</p>
          </div>

          <div className="detail-actions">
            <button
              type="button"
              className="detail-booking-btn"
              onClick={() => {
                onSelectForBooking(item.title);
                onClose();
              }}
            >
              <MessageCircle size={18} /> Bu Lezzetle Rezervasyon Talebi Yap
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
