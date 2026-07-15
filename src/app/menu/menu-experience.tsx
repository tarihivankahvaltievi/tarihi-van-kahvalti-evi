"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUp,
  Check,
  ChevronRight,
  Clock3,
  Leaf,
  Search,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import styles from "./menu.module.css";
import {
  menuCategories,
  menuItems,
  menuLastUpdated,
  type MenuFilterId,
  type MenuItem,
  type MenuTag,
} from "./menu-data";

const tagIcon: Partial<Record<MenuTag, typeof Sparkles>> = {
  "Öne çıkan": Sparkles,
  Vejetaryen: Leaf,
};

function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function CopperLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;
    let frame = 0;
    let disposed = false;

    const start = async () => {
      const gpu = (navigator as Navigator & { gpu?: { requestAdapter(): Promise<unknown> } }).gpu;
      if (!gpu) return;

      try {
        const adapter = await gpu.requestAdapter() as {
          requestDevice(): Promise<{
            createShaderModule(value: { code: string }): unknown;
            createRenderPipeline(value: unknown): unknown;
            createBuffer(value: { size: number; usage: number }): unknown;
            createBindGroup(value: unknown): unknown;
            queue: { writeBuffer(...args: unknown[]): void; submit(value: unknown[]): void };
            createCommandEncoder(): {
              beginRenderPass(value: unknown): {
                setPipeline(value: unknown): void;
                setBindGroup(index: number, value: unknown): void;
                draw(count: number): void;
                end(): void;
              };
              finish(): unknown;
            };
          }>;
        } | null;
        if (!adapter || disposed) return;
        const device = await adapter.requestDevice();
        const context = canvas.getContext("webgpu") as unknown as {
          configure(value: unknown): void;
          getCurrentTexture(): { createView(): unknown };
        } | null;
        if (!context) return;

        const format = "bgra8unorm";
        context.configure({ device, format, alphaMode: "premultiplied" });
        const shader = device.createShaderModule({ code: `
          struct Uniforms { time: f32, width: f32, height: f32, pad: f32 }
          @group(0) @binding(0) var<uniform> u: Uniforms;
          @vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
            var p = array<vec2f, 3>(vec2f(-1., -1.), vec2f(3., -1.), vec2f(-1., 3.));
            return vec4f(p[i], 0., 1.);
          }
          @fragment fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
            let uv = pos.xy / vec2f(u.width, u.height);
            let wave = sin((uv.x * 5.2 + uv.y * 2.1) - u.time * .26) * .5 + .5;
            let beam = smoothstep(.23, .0, abs(uv.x - (.18 + wave * .66)));
            let vignette = smoothstep(.88, .15, distance(uv, vec2f(.65, .42)));
            return vec4f(.82, .49, .18, beam * vignette * .11);
          }
        ` });
        const uniform = device.createBuffer({ size: 16, usage: 64 | 8 });
        const pipeline = device.createRenderPipeline({
          layout: "auto",
          vertex: { module: shader, entryPoint: "vs" },
          fragment: { module: shader, entryPoint: "fs", targets: [{ format, blend: { color: { srcFactor: "src-alpha", dstFactor: "one" }, alpha: { srcFactor: "one", dstFactor: "one" } } }] },
          primitive: { topology: "triangle-list" },
        });
        const bindGroup = device.createBindGroup({ layout: (pipeline as { getBindGroupLayout(index: number): unknown }).getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: uniform } }] });
        const begin = performance.now();

        const draw = (now: number) => {
          if (disposed) return;
          const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
          const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
          const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
          }
          device.queue.writeBuffer(uniform, 0, new Float32Array([(now - begin) / 1000, width, height, 0]));
          const encoder = device.createCommandEncoder();
          const pass = encoder.beginRenderPass({ colorAttachments: [{ view: context.getCurrentTexture().createView(), clearValue: { r: 0, g: 0, b: 0, a: 0 }, loadOp: "clear", storeOp: "store" }] });
          pass.setPipeline(pipeline);
          pass.setBindGroup(0, bindGroup);
          pass.draw(3);
          pass.end();
          device.queue.submit([encoder.finish()]);
          frame = requestAnimationFrame(draw);
        };
        frame = requestAnimationFrame(draw);
      } catch {
        canvas.hidden = true;
      }
    };

    void start();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className={styles.copperLight} aria-hidden="true" />;
}

function MenuImage({ item, sizes, priority = false }: { item: MenuItem; sizes: string; priority?: boolean }) {
  const frameRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-7, 7]);

  return (
    <span ref={frameRef} className={styles.imageFrame}>
      <motion.span className={styles.imagePlane} style={{ y: reduceMotion ? 0 : imageY }}>
        <Image src={item.image} alt={item.imageAlt} fill sizes={sizes} quality={82} priority={priority} />
      </motion.span>
      <span className={styles.imageWash} aria-hidden="true" />
    </span>
  );
}

function ProductDialog({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => closeRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const nodes = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]") ?? []);
      if (!nodes.length) return;
      if (event.shiftKey && document.activeElement === nodes[0]) {
        event.preventDefault(); nodes.at(-1)?.focus();
      } else if (!event.shiftKey && document.activeElement === nodes.at(-1)) {
        event.preventDefault(); nodes[0].focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [item, onClose]);

  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {item ? (
        <motion.div className={styles.dialogLayer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className={styles.dialogBackdrop} type="button" aria-label="Ürün detayını kapat" onClick={onClose} />
          <motion.section
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-dialog-title"
            initial={reduceMotion ? false : { opacity: 0, y: 34, clipPath: "inset(7% 0 0 0 round 14px)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0 round 14px)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 290, damping: 30, mass: 0.72 }}
          >
            <div className={styles.dialogMedia}>
              <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 680px) 100vw, 520px" quality={82} />
              <button ref={closeRef} className={styles.dialogClose} type="button" onClick={onClose} aria-label="Kapat"><X /></button>
              <div className={styles.dialogPrice}><strong>{item.price}</strong>{item.priceNote ? <span>{item.priceNote}</span> : null}</div>
            </div>
            <div className={styles.dialogContent}>
              <div className={styles.tagRow}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <h2 id="menu-dialog-title">{item.name}</h2>
              <p>{item.story}</p>
              <ul>{item.details.map((detail) => <li key={detail}><Check size={15} />{detail}</li>)}</ul>
              <button className={styles.dialogDone} type="button" onClick={onClose}>Menüye dön <ChevronRight size={18} /></button>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export function MenuExperience() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<MenuFilterId>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showTop, setShowTop] = useState(false);
  const deferredSearch = useDeferredValue(searchTerm);
  const resultsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smoothHeroProgress = useSpring(heroProgress, { stiffness: 115, damping: 28, mass: 0.45 });
  const heroImageY = useTransform(smoothHeroProgress, [0, 1], [0, 68]);
  const heroImageScale = useTransform(smoothHeroProgress, [0, 1], [1.035, 1.12]);
  const heroCopyY = useTransform(smoothHeroProgress, [0, 1], [0, 34]);
  const heroCopyOpacity = useTransform(smoothHeroProgress, [0, 0.84], [1, 0.56]);
  const heroSealRotate = useTransform(smoothHeroProgress, [0, 1], [-5, 9]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleItems = useMemo(() => {
    const query = normalizeSearch(deferredSearch);
    return menuItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (!query) return true;
      return normalizeSearch([item.name, item.description, item.story, ...item.tags, ...item.details].join(" ")).includes(query);
    });
  }, [activeCategory, deferredSearch]);

  const visibleGroups = menuCategories.map((category) => ({
    ...category,
    items: visibleItems.filter((item) => item.category === category.id),
  })).filter((group) => group.items.length);

  const selectCategory = (category: MenuFilterId) => {
    setActiveCategory(category);
    requestAnimationFrame(() => {
      if (window.scrollY < 430) return;
      const top = resultsRef.current?.getBoundingClientRect().top ?? 0;
      window.scrollTo({ top: window.scrollY + top - 142, behavior: reduceMotion ? "auto" : "smooth" });
    });
  };

  return (
    <main id="main-content" className={styles.page}>
      <section ref={heroRef} className={styles.hero} aria-labelledby="menu-title">
        <motion.div className={styles.heroImagePlane} style={{ y: reduceMotion ? 0 : heroImageY, scale: reduceMotion ? 1.035 : heroImageScale }}>
          <Image className={styles.heroImage} src="/images/hero-parallax/overhead-feast.webp" alt="Van kahvaltısı sofrasına yukarıdan bakış" fill priority sizes="100vw" quality={82} />
        </motion.div>
        <div className={styles.heroShade} aria-hidden="true" />
        <CopperLight />
        <motion.div className={styles.heroCopy} style={{ y: reduceMotion ? 0 : heroCopyY, opacity: reduceMotion ? 1 : heroCopyOpacity }}>
          <motion.div initial={reduceMotion ? false : { y: 22, clipPath: "inset(0 0 18% 0)" }} animate={{ y: 0, clipPath: "inset(0 0 0% 0)" }} transition={{ duration: reduceMotion ? 0 : 0.78, ease: [0.16, 1, 0.3, 1] }}>
            <div className={styles.heroTopline}>
              <Link href="/" className={styles.backLink}><ArrowLeft size={16} /> Ana sayfa</Link>
              <span>1978’den beri · Beyoğlu</span>
            </div>
            <h1 id="menu-title">Sofraya<br /><em>buyurun.</em></h1>
            <p>Van’dan gelen tatlar, bakır sahanlar ve demini hiç aceleye getirmeyen çay.</p>
            <div className={styles.heroMeta}>
              <span><Clock3 size={15} /> 08:00–18:00</span>
              <span><UtensilsCrossed size={15} /> {menuItems.length} lezzet</span>
            </div>
          </motion.div>
        </motion.div>
        <motion.div className={styles.heroSeal} style={{ rotate: reduceMotion ? -5 : heroSealRotate }} initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} aria-hidden="true"><span>Van</span><small>Kahvaltısı</small></motion.div>
        <div className={styles.scrollCue} aria-hidden="true"><span /> menüyü incele</div>
      </section>

      <section className={styles.menuArea} aria-label="Dijital menü">
        <div className={styles.stickyTools}>
          <div className={styles.toolInner}>
            <div className={styles.searchWrap}>
              <Search size={18} aria-hidden="true" />
              <label htmlFor="menu-search" className={styles.srOnly}>Menüde ara</label>
              <input id="menu-search" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Menüde ara…" autoComplete="off" />
              {searchTerm ? <button type="button" onClick={() => setSearchTerm("")} aria-label="Aramayı temizle"><X size={16} /></button> : null}
            </div>
            <nav className={styles.categories} aria-label="Menü kategorileri">
              <motion.button type="button" className={activeCategory === "all" ? styles.categoryActive : ""} aria-pressed={activeCategory === "all"} onClick={() => selectCategory("all")} whileTap={reduceMotion ? undefined : { scale: 0.95 }}>
                {activeCategory === "all" ? <motion.span layoutId="active-menu-category" className={styles.categoryPill} transition={{ type: "spring", stiffness: 420, damping: 34 }} /> : null}
                <span className={styles.categoryLabel}>Tümü</span><span className={styles.categoryCount}>{menuItems.length}</span>
              </motion.button>
              {menuCategories.map((category) => {
                const count = menuItems.filter((item) => item.category === category.id).length;
                return <motion.button key={category.id} type="button" className={activeCategory === category.id ? styles.categoryActive : ""} aria-pressed={activeCategory === category.id} onClick={() => selectCategory(category.id)} whileTap={reduceMotion ? undefined : { scale: 0.95 }}>
                  {activeCategory === category.id ? <motion.span layoutId="active-menu-category" className={styles.categoryPill} transition={{ type: "spring", stiffness: 420, damping: 34 }} /> : null}
                  <span className={`${styles.categoryLabel} ${styles.longCategory}`}>{category.label}</span><span className={`${styles.categoryLabel} ${styles.shortCategory}`}>{category.shortLabel}</span><span className={styles.categoryCount}>{count}</span>
                </motion.button>;
              })}
            </nav>
          </div>
        </div>

        <div ref={resultsRef} className={styles.results}>
          <div className={styles.resultsIntro}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2 key={activeCategory} initial={reduceMotion ? false : { y: 10, clipPath: "inset(0 0 60% 0)" }} animate={{ y: 0, clipPath: "inset(0 0 0% 0)" }} exit={reduceMotion ? { opacity: 0 } : { y: -8, clipPath: "inset(60% 0 0 0)" }} transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}>{activeCategory === "all" ? "Bugünün sofrası" : menuCategories.find((category) => category.id === activeCategory)?.label}</motion.h2>
            </AnimatePresence>
            <p role="status" aria-live="polite"><strong>{visibleItems.length}</strong> lezzet</p>
          </div>

          {visibleItems.length ? (
            <AnimatePresence initial={false} mode="popLayout">
              {visibleGroups.map((group, groupIndex) => (
                <motion.section key={group.id} data-category={group.id} className={styles.categorySection} layout={!reduceMotion} initial={reduceMotion ? false : { y: 24, clipPath: "inset(0 0 7% 0 round 10px)" }} whileInView={{ y: 0, clipPath: "inset(0 0 0% 0 round 10px)" }} exit={{ opacity: 0, y: -8 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduceMotion ? 0 : 0.62, delay: groupIndex * 0.025, ease: [0.16, 1, 0.3, 1] }} aria-labelledby={`category-${group.id}`}>
                  <motion.span className={styles.sectionSweep} aria-hidden="true" initial={reduceMotion ? false : { x: "-120%" }} whileInView={{ x: "170%" }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: reduceMotion ? 0 : 1.05, delay: 0.18, ease: [0.16, 1, 0.3, 1] }} />
                  <motion.header className={styles.categoryHeader} initial={reduceMotion ? false : { x: -12 }} whileInView={{ x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduceMotion ? 0 : 0.52, ease: [0.16, 1, 0.3, 1] }}>
                    <div><h3 id={`category-${group.id}`}>{group.label}</h3><p>{group.description}</p></div>
                    <span>{group.items.length} çeşit</span>
                  </motion.header>
                  <div className={styles.itemGrid}>
                    {group.items.map((item, itemIndex) => {
                      const feature = itemIndex === 0;
                      return (
                        <motion.article key={item.id} id={item.id} className={`${styles.menuItem} ${feature ? styles.featureItem : ""}`} layout={!reduceMotion} initial={reduceMotion ? false : { y: 14, clipPath: "inset(0 0 10% 0 round 7px)" }} whileInView={{ y: 0, clipPath: "inset(0 0 0% 0 round 7px)" }} viewport={{ once: true, amount: 0.22 }} whileHover={reduceMotion ? undefined : { y: -4 }} whileTap={reduceMotion ? undefined : { scale: 0.975 }} transition={{ duration: reduceMotion ? 0 : 0.48, delay: itemIndex * 0.06, ease: [0.16, 1, 0.3, 1] }}>
                          <button type="button" className={styles.itemButton} onClick={() => setSelectedItem(item)} aria-label={`${item.name} ayrıntılarını aç`}>
                            <MenuImage item={item} priority={groupIndex === 0 && itemIndex === 0} sizes={feature ? "(max-width: 640px) 100vw, 560px" : "(max-width: 640px) 45vw, 260px"} />
                            <span className={styles.itemContent}>
                              <span className={styles.itemTopline}>
                                <span className={styles.itemTags}>{item.tags.slice(0, 1).map((tag) => { const Icon = tagIcon[tag]; return <span key={tag}>{Icon ? <Icon size={11} /> : null}{tag}</span>; })}</span>
                                <ChevronRight className={styles.itemArrow} size={18} />
                              </span>
                              <span className={styles.itemName}>{item.name}</span>
                              <span className={styles.itemDescription}>{item.description}</span>
                              <span className={styles.itemPrice}><strong>{item.price}</strong>{item.priceNote ? <small>{item.priceNote}</small> : null}</span>
                            </span>
                          </button>
                        </motion.article>
                      );
                    })}
                  </div>
                </motion.section>
              ))}
            </AnimatePresence>
          ) : (
            <div className={styles.emptyState} role="status"><Search size={26} /><h3>Bu sofrada bulamadık.</h3><p>Başka bir ürün adı deneyin.</p><button type="button" onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}>Tüm menüyü göster</button></div>
          )}

          <footer className={styles.menuNote}><p><strong>İyi bilinsin:</strong> Ürün uygunluğu ve fiyatlar dönemsel olarak değişebilir. Alerjen veya özel beslenme ihtiyacınızı ekibimize söyleyin.</p><span>Son güncelleme · {menuLastUpdated}</span></footer>
        </div>
      </section>

      <AnimatePresence>{showTop ? <motion.button className={styles.toTop} type="button" aria-label="Menünün başına dön" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })} initial={{ opacity: 0, scale: 0.84, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.88 }} whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={reduceMotion ? undefined : { scale: 0.9 }} transition={{ type: "spring", stiffness: 380, damping: 28 }}><ArrowUp size={18} /></motion.button> : null}</AnimatePresence>
      <ProductDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  );
}
