"use client";

import { useEffect, useRef } from "react";
import styles from "./particle-text-effect.module.css";

type ParticleTextEffectProps = {
  id?: string;
  className?: string;
  title?: string;
  primaryLine?: string;
  secondaryLine?: string;
  accentLine?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  color: string;
  size: number;
};

type ParticleTarget = Pick<Particle, "x" | "y" | "color">;

const MAX_PARTICLES = 5600;

export function ParticleTextEffect({
  id,
  className,
  title = "Tarihi Van Kahvaltı Evi Menü",
  primaryLine = "Tarihi Van",
  secondaryLine = "Kahvaltı Evi",
  accentLine = "Menü",
}: ParticleTextEffectProps) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const primaryRef = useRef<HTMLSpanElement>(null);
  const secondaryRef = useRef<HTMLSpanElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const primary = primaryRef.current;
    const secondary = secondaryRef.current;
    const accent = accentRef.current;
    const underline = underlineRef.current;
    if (!root || !canvas || !primary || !secondary || !accent || !underline) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrame = 0;
    let resizeFrame = 0;
    let activeUntil = 0;
    let pointer = { x: -1000, y: -1000, active: false };

    const drawTextMask = (maskCtx: CanvasRenderingContext2D, element: HTMLElement, text: string, color: string) => {
      const rootRect = root.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      const computed = window.getComputedStyle(element);
      maskCtx.fillStyle = color;
      maskCtx.font = `${computed.fontStyle} ${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
      maskCtx.textAlign = "center";
      maskCtx.textBaseline = "middle";
      maskCtx.fillText(text, rect.left - rootRect.left + rect.width / 2, rect.top - rootRect.top + rect.height / 2);
    };

    const render = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      let moving = false;
      for (const particle of particles) {
        const dx = particle.tx - particle.x;
        const dy = particle.ty - particle.y;
        particle.vx = (particle.vx + dx * 0.028) * 0.84;
        particle.vy = (particle.vy + dy * 0.028) * 0.84;

        if (pointer.active) {
          const pointerDx = particle.x - pointer.x;
          const pointerDy = particle.y - pointer.y;
          const distanceSquared = pointerDx * pointerDx + pointerDy * pointerDy;
          if (distanceSquared > 0 && distanceSquared < 6400) {
            const force = (1 - Math.sqrt(distanceSquared) / 80) * 1.35;
            particle.vx += (pointerDx / Math.sqrt(distanceSquared)) * force;
            particle.vy += (pointerDy / Math.sqrt(distanceSquared)) * force;
          }
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        if (Math.abs(dx) + Math.abs(dy) + Math.abs(particle.vx) + Math.abs(particle.vy) > 0.35) moving = true;

        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      }

      if (moving || pointer.active || time < activeUntil) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        particles.forEach((particle) => {
          particle.x = particle.tx;
          particle.y = particle.ty;
        });
      }
    };

    const startAnimation = (duration = 1200) => {
      activeUntil = performance.now() + duration;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(render);
    };

    const buildParticles = () => {
      const width = Math.max(1, Math.round(root.clientWidth));
      const height = Math.max(1, Math.round(root.clientHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mask = document.createElement("canvas");
      mask.width = width;
      mask.height = height;
      const maskCtx = mask.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return;

      const rootStyle = window.getComputedStyle(root);
      const ink = rootStyle.color;
      const accentColor = rootStyle.getPropertyValue("--particle-accent").trim() || "#70151c";
      const underlineColor = rootStyle.getPropertyValue("--particle-underline").trim() || "#a77b37";
      drawTextMask(maskCtx, primary, primaryLine, ink);
      drawTextMask(maskCtx, secondary, secondaryLine, ink);
      drawTextMask(maskCtx, accent, accentLine, accentColor);

      const rootRect = root.getBoundingClientRect();
      const underlineRect = underline.getBoundingClientRect();
      maskCtx.fillStyle = underlineColor;
      maskCtx.fillRect(
        underlineRect.left - rootRect.left,
        underlineRect.top - rootRect.top,
        underlineRect.width,
        Math.max(2, underlineRect.height),
      );

      const image = maskCtx.getImageData(0, 0, width, height);
      const stride = width < 520 ? 3 : 4;
      const targets: ParticleTarget[] = [];
      for (let y = 0; y < height; y += stride) {
        for (let x = 0; x < width; x += stride) {
          const index = (y * width + x) * 4;
          if (image.data[index + 3] < 100) continue;
          targets.push({
            x,
            y,
            color: `rgb(${image.data[index]}, ${image.data[index + 1]}, ${image.data[index + 2]})`,
          });
        }
      }

      let selectedTargets: ParticleTarget[];
      if (targets.length > MAX_PARTICLES) {
        const keepEvery = targets.length / MAX_PARTICLES;
        selectedTargets = Array.from({ length: MAX_PARTICLES }, (_, index) => targets[Math.floor(index * keepEvery)]);
      } else {
        selectedTargets = targets;
      }

      particles = selectedTargets.map((target, index) => {
        const angle = (index / Math.max(1, selectedTargets.length)) * Math.PI * 2 + Math.random() * 0.45;
        const radius = Math.max(width, height) * (0.54 + Math.random() * 0.34);
        return {
          x: width / 2 + Math.cos(angle) * radius,
          y: height / 2 + Math.sin(angle) * radius,
          vx: 0,
          vy: 0,
          tx: target.x,
          ty: target.y,
          color: target.color,
          size: width < 520 ? 1.55 : 1.8,
        };
      });

      root.classList.add(styles.ready);
      startAnimation(1800);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
      startAnimation(800);
    };
    const onPointerLeave = () => {
      pointer.active = false;
      startAnimation(1200);
    };

    const resizeObserver = new ResizeObserver(() => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(buildParticles);
    });
    resizeObserver.observe(root);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    void document.fonts.ready.then(buildParticles);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(resizeFrame);
    };
  }, [accentLine, primaryLine, secondaryLine]);

  return (
    <h1 id={id} ref={rootRef} className={`${styles.root} ${className ?? ""}`} aria-label={title}>
      <span className={styles.text} aria-hidden="true">
        <span ref={primaryRef} className={styles.line}>{primaryLine}</span>
        <span ref={secondaryRef} className={`${styles.line} ${styles.lineSecondary}`}>{secondaryLine}</span>
        <span ref={accentRef} className={`${styles.line} ${styles.lineAccent}`}>
          {accentLine}
          <span ref={underlineRef} className={styles.underline} />
        </span>
      </span>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </h1>
  );
}
