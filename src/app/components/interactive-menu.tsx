"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BookOpen, ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface MenuItem {
  title: string;
  tag: string;
  category: string;
  image: string;
  desc: string;
  detail: string;
  price: string;
}

interface InteractiveMenuProps {
  items: MenuItem[];
  onSelectItem: (itemTitle: string) => void;
}

const categories = [
  { id: "Hepsi", label: "Hepsi" },
  { id: "Serpme", label: "Serpme" },
  { id: "Sıcaklar", label: "Sıcaklar" },
  { id: "Van Lezzetleri", label: "Van Lezzetleri" },
  { id: "Kahve", label: "Kahve" },
];

const DESKTOP_ITEMS_PER_PAGE = 2;
const MOBILE_ITEMS_PER_PAGE = 1;

export function InteractiveMenu({ items, onSelectItem }: InteractiveMenuProps) {
  const [activeCategory, setActiveCategory] = useState("Hepsi");
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobileBook, setIsMobileBook] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 819px)");
    const syncViewport = () => setIsMobileBook(media.matches);

    syncViewport();
    media.addEventListener("change", syncViewport);

    return () => media.removeEventListener("change", syncViewport);
  }, []);

  const visibleItems = useMemo(() => {
    if (activeCategory === "Hepsi") {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const menuPages = useMemo(() => {
    const chunks: MenuItem[][] = [];
    const itemsPerPage = isMobileBook ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE;

    for (let index = 0; index < visibleItems.length; index += itemsPerPage) {
      chunks.push(visibleItems.slice(index, index + itemsPerPage));
    }

    if (!isMobileBook && chunks.length % 2 !== 0) {
      chunks.push([]);
    }

    return chunks;
  }, [isMobileBook, visibleItems]);

  const pageCount = menuPages.length + 2;
  const pageStep = isMobileBook ? 1 : 2;
  const dotCount = isMobileBook ? menuPages.length : Math.max(1, Math.ceil(menuPages.length / 2));
  const currentDot = isMobileBook
    ? Math.max(0, currentPage - 1)
    : Math.max(0, Math.ceil(Math.max(0, currentPage - 1) / 2));
  const isAtCover = currentPage === 0;
  const isAtEnd = currentPage >= pageCount - 1;
  const currentContentIndex = Math.max(0, currentPage - 1);
  const leftPageIndex = isMobileBook
    ? currentContentIndex
    : Math.floor(currentContentIndex / 2) * 2;
  const rightPageIndex = leftPageIndex + 1;
  const currentMobileSide = currentContentIndex % 2 === 0 ? "left" : "right";

  const changeCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(0);
  };

  const jumpToPage = (page: number) => {
    const targetPage = Math.max(0, Math.min(page, pageCount - 1));
    setCurrentPage(targetPage);
  };

  const flipNext = () => {
    jumpToPage(currentPage === 0 ? 1 : currentPage + pageStep);
  };

  const flipPrevious = () => {
    jumpToPage(currentPage <= 1 ? 0 : currentPage - pageStep);
  };

  return (
    <div className="dear-menu">
      <div className="dear-menu-tabs" role="tablist" aria-label="Menü kategorileri">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === category.id}
            className={activeCategory === category.id ? "selected" : ""}
            onClick={() => changeCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="dear-book-shell">
        <div className="dear-book-table" aria-hidden="true" />
        <div
          className={`dear-flipbook dear-manual-book ${
            isMobileBook ? "portrait" : "landscape"
          } ${isAtCover ? "show-cover" : isAtEnd ? "show-back" : "show-pages"}`}
          data-page={currentPage}
        >
          {isAtCover ? (
            <CoverPage />
          ) : isAtEnd ? (
            <BackCoverPage />
          ) : isMobileBook ? (
            <PrintedPage
              items={menuPages[currentContentIndex] ?? []}
              pageNumber={currentContentIndex + 1}
              side={currentMobileSide}
              onSelectItem={onSelectItem}
            />
          ) : (
            <div className="dear-manual-spread">
              <PrintedPage
                items={menuPages[leftPageIndex] ?? []}
                pageNumber={leftPageIndex + 1}
                side="left"
                onSelectItem={onSelectItem}
              />
              <PrintedPage
                items={menuPages[rightPageIndex] ?? []}
                pageNumber={rightPageIndex + 1}
                side="right"
                onSelectItem={onSelectItem}
              />
            </div>
          )}
        </div>
      </div>

      <div className="dear-book-controls" aria-label="Menü kitabı kontrolleri">
        <button
          type="button"
          onClick={flipPrevious}
          disabled={isAtCover}
          aria-label="Önceki menü sayfası"
        >
          <ChevronLeft size={18} />
          <span>Önceki</span>
        </button>

        <button
          type="button"
          className="primary"
          onClick={flipNext}
          disabled={isAtEnd}
          aria-label={isAtCover ? "Menü kitabını aç" : "Sonraki menü sayfası"}
        >
          <BookOpen size={18} />
          <span>{isAtCover ? "Aç" : "Çevir"}</span>
        </button>

        <button
          type="button"
          onClick={flipNext}
          disabled={isAtEnd}
          aria-label="Sonraki menü sayfası"
        >
          <span>Sonraki</span>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="dear-book-dots" aria-label="Menü spread seçimi">
        {Array.from({ length: dotCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === currentDot ? "current" : ""}
            onClick={() => jumpToPage(isMobileBook ? index + 1 : index * 2 + 1)}
            aria-label={`${index + 1}. menü sayfasına git`}
            aria-current={index === currentDot ? "page" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function CoverPage() {
  return (
    <div className="dear-page dear-cover" data-density="hard">
      <div className="dear-cover-spine" />
      <div className="dear-cover-frame" />
      <p>Tarihi Van</p>
      <h3>Kahvaltı Menüsü</h3>
      <span>TV</span>
    </div>
  );
}

function BackCoverPage() {
  return (
    <div className="dear-page dear-back-cover" data-density="hard">
      <div className="dear-cover-frame" />
      <p>Tarihi Van Kahvaltıcısı</p>
      <span>Beyoğlu</span>
    </div>
  );
}

function PrintedPage({
  items,
  pageNumber,
  side,
  onSelectItem,
}: {
  items: MenuItem[];
  pageNumber: number;
  side: "left" | "right";
  onSelectItem: (itemTitle: string) => void;
}) {
  const feature = items[0];
  const secondary = items.slice(1);

  return (
    <div className={`dear-page dear-paper dear-${side}`}>
      <div className="dear-paper-border" />
      <header className="dear-paper-head">
        <span>{side === "left" ? "Tarihi Van Kahvaltı Evi" : "Geleneksel Lezzetler"}</span>
        <b>{pageNumber}</b>
      </header>

      {feature ? (
        <>
          <section className="dear-feature">
            <div className="dear-feature-image">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                sizes="(max-width: 820px) 34vw, 220px"
                loading="lazy"
              />
            </div>
            <div>
              <span>{feature.tag}</span>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          </section>

          <section className="dear-lines">
            <MenuRow item={feature} onSelectItem={onSelectItem} />
            {secondary.map((item) => (
              <MenuRow key={item.title} item={item} onSelectItem={onSelectItem} />
            ))}
          </section>
        </>
      ) : (
        <div className="dear-empty-page">
          <span>Tarihi Van</span>
        </div>
      )}

      <footer className="dear-paper-foot">
        <span>{side === "left" ? "Van kahvaltısı" : "Sıcak servis"}</span>
        <b>{pageNumber.toString().padStart(2, "0")}</b>
      </footer>
    </div>
  );
}

function MenuRow({
  item,
  onSelectItem,
}: {
  item: MenuItem;
  onSelectItem: (itemTitle: string) => void;
}) {
  return (
    <div className="dear-row">
      <div>
        <h4>{item.title}</h4>
        <p>{item.detail}</p>
      </div>
      <strong>{item.price}</strong>
      <button
        type="button"
        onClick={() => onSelectItem(item.title)}
        aria-label={`${item.title} seç`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
