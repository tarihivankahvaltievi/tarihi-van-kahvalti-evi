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

type Vector2D = { x: number; y: number };
type Tone = "ink" | "accent" | "gold";

type ParticleTarget = Vector2D & { tone: Tone };

type Particle = {
  pos: Vector2D;
  vel: Vector2D;
  target: Vector2D;
  tone: Tone;
  radius: number;
  maxSpeed: number;
  maxForce: number;
  slowRadius: number;
  delay: number;
};

const MAX_MOBILE_PARTICLES = 5200;
const MAX_DESKTOP_PARTICLES = 7600;
const FRAME_MS = 1000 / 60;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeOutQuint = (value: number) => 1 - Math.pow(1 - clamp(value), 5);

function organicStartPosition(target: Vector2D, width: number, height: number) {
  const isMobile = width < 520;
  const maxDistance = isMobile ? Math.min(width * 0.34, 128) : Math.min(width * 0.3, 260);
  const minDistance = isMobile ? 18 : 32;

  for (let attempt = 0; attempt < 8; attempt++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = minDistance + Math.pow(Math.random(), 0.72) * maxDistance;
    const position = {
      x: target.x + Math.cos(angle) * distance,
      y: target.y + Math.sin(angle) * distance * (isMobile ? 0.46 : 0.56),
    };

    if (position.x > 5 && position.x < width - 5 && position.y > 4 && position.y < height - 4) {
      return position;
    }
  }

  const fallbackAngle = Math.random() * Math.PI * 2;
  const fallbackRadius = Math.sqrt(Math.random());
  return {
    x: width / 2 + Math.cos(fallbackAngle) * width * 0.43 * fallbackRadius,
    y: height / 2 + Math.sin(fallbackAngle) * height * 0.4 * fallbackRadius,
  };
}

function tangentialVelocity(position: Vector2D, target: Vector2D): Vector2D {
  const dx = position.x - target.x;
  const dy = position.y - target.y;
  const magnitude = Math.max(1, Math.hypot(dx, dy));
  const direction = target.y < position.y ? 1 : -1;
  const strength = 0.35 + Math.random() * 0.6;
  return {
    x: (-dy / magnitude) * strength * direction + (Math.random() - 0.5) * 0.18,
    y: (dx / magnitude) * strength * direction + (Math.random() - 0.5) * 0.18,
  };
}

function limitVector(vector: Vector2D, maximum: number) {
  const magnitude = Math.hypot(vector.x, vector.y);
  if (magnitude <= maximum || magnitude === 0) return vector;
  const ratio = maximum / magnitude;
  return { x: vector.x * ratio, y: vector.y * ratio };
}

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

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let mask: HTMLCanvasElement | null = null;
    let particles: Particle[] = [];
    let colors: Record<Tone, string> = { ink: "#211d1b", accent: "#70151c", gold: "#a77b37" };
    let animationFrame: number | null = null;
    let resizeFrame: number | null = null;
    let startTime = 0;
    let previousTime = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let isVisible = true;
    let isAnimating = false;

    const setCanvasSize = (nextWidth: number, nextHeight: number) => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(nextWidth * pixelRatio);
      canvas.height = Math.round(nextHeight * pixelRatio);
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    const drawText = (maskCtx: CanvasRenderingContext2D, element: HTMLElement, text: string, color: string) => {
      const rootRect = root.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      const computed = window.getComputedStyle(element);
      const scaledFontSize = Number.parseFloat(computed.fontSize) * pixelRatio;
      maskCtx.fillStyle = color;
      maskCtx.font = `${computed.fontStyle} ${computed.fontWeight} ${scaledFontSize}px ${computed.fontFamily}`;
      maskCtx.textAlign = "center";
      maskCtx.textBaseline = "middle";
      maskCtx.fontKerning = "normal";
      if ("letterSpacing" in maskCtx) {
        maskCtx.letterSpacing = `${Number.parseFloat(computed.letterSpacing || "0") * pixelRatio}px`;
      }
      maskCtx.fillText(
        text,
        (rect.left - rootRect.left + rect.width / 2) * pixelRatio,
        (rect.top - rootRect.top + rect.height / 2) * pixelRatio,
      );
    };

    const createMaskAndTargets = () => {
      const nextMask = document.createElement("canvas");
      nextMask.width = canvas.width;
      nextMask.height = canvas.height;
      const maskCtx = nextMask.getContext("2d", { alpha: true, willReadFrequently: true });
      if (!maskCtx) return null;

      const rootStyle = window.getComputedStyle(root);
      colors = {
        ink: rootStyle.color || "#211d1b",
        accent: rootStyle.getPropertyValue("--particle-accent").trim() || "#70151c",
        gold: rootStyle.getPropertyValue("--particle-underline").trim() || "#a77b37",
      };

      drawText(maskCtx, primary, primaryLine, colors.ink);
      drawText(maskCtx, secondary, secondaryLine, colors.ink);
      drawText(maskCtx, accent, accentLine, colors.accent);

      const rootRect = root.getBoundingClientRect();
      const underlineRect = underline.getBoundingClientRect();
      maskCtx.fillStyle = colors.gold;
      maskCtx.fillRect(
        (underlineRect.left - rootRect.left) * pixelRatio,
        (underlineRect.top - rootRect.top) * pixelRatio,
        underlineRect.width * pixelRatio,
        Math.max(2 * pixelRatio, underlineRect.height * pixelRatio),
      );

      const image = maskCtx.getImageData(0, 0, nextMask.width, nextMask.height);
      const accentRect = accent.getBoundingClientRect();
      const accentTop = (accentRect.top - rootRect.top) * pixelRatio;
      const underlineTop = (underlineRect.top - rootRect.top - 1) * pixelRatio;
      const underlineBottom = (underlineRect.bottom - rootRect.top + 1) * pixelRatio;
      const sampleStep = width < 520 ? 3 : 4;
      const candidates: ParticleTarget[] = [];

      for (let y = 0; y < nextMask.height; y += sampleStep) {
        const offset = ((y / sampleStep) * 7) % sampleStep;
        for (let x = offset; x < nextMask.width; x += sampleStep) {
          const index = (Math.floor(y) * nextMask.width + Math.floor(x)) * 4;
          if (image.data[index + 3] < 72) continue;
          const jitter = sampleStep * 0.24;
          const tone: Tone = y >= underlineTop && y <= underlineBottom ? "gold" : y >= accentTop ? "accent" : "ink";
          candidates.push({
            x: (x + (Math.random() - 0.5) * jitter) / pixelRatio,
            y: (y + (Math.random() - 0.5) * jitter) / pixelRatio,
            tone,
          });
        }
      }

      for (let index = candidates.length - 1; index > 0; index--) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [candidates[index], candidates[swapIndex]] = [candidates[swapIndex], candidates[index]];
      }

      const maximum = width < 520 ? MAX_MOBILE_PARTICLES : MAX_DESKTOP_PARTICLES;
      return { nextMask, targets: candidates.slice(0, maximum) };
    };

    const drawMask = (alpha: number) => {
      if (!mask || alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = clamp(alpha);
      ctx.drawImage(mask, 0, 0, mask.width, mask.height, 0, 0, width, height);
      ctx.restore();
    };

    const drawParticles = (particleAlpha: number) => {
      const tones: Tone[] = ["ink", "accent", "gold"];
      for (const tone of tones) {
        ctx.save();
        ctx.globalAlpha = particleAlpha * 0.045;
        ctx.fillStyle = colors[tone];
        ctx.beginPath();
        for (const particle of particles) {
          if (particle.tone !== tone) continue;
          const haloRadius = particle.radius * 1.85;
          ctx.moveTo(particle.pos.x + haloRadius, particle.pos.y);
          ctx.arc(particle.pos.x, particle.pos.y, haloRadius, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = particleAlpha;
        ctx.fillStyle = colors[tone];
        ctx.beginPath();
        for (const particle of particles) {
          if (particle.tone !== tone) continue;
          ctx.moveTo(particle.pos.x + particle.radius, particle.pos.y);
          ctx.arc(particle.pos.x, particle.pos.y, particle.radius, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      }
    };

    const drawFinalFrame = () => {
      ctx.clearRect(0, 0, width, height);
      drawMask(1);
    };

    const updateParticle = (particle: Particle, elapsed: number, frameScale: number) => {
      if (elapsed < particle.delay) return false;

      const toTarget = {
        x: particle.target.x - particle.pos.x,
        y: particle.target.y - particle.pos.y,
      };
      const distance = Math.hypot(toTarget.x, toTarget.y);
      if (distance < 0.08 && Math.hypot(particle.vel.x, particle.vel.y) < 0.08) {
        particle.pos.x = particle.target.x;
        particle.pos.y = particle.target.y;
        particle.vel.x = 0;
        particle.vel.y = 0;
        return false;
      }

      const arrival = distance < particle.slowRadius ? easeOutQuint(distance / particle.slowRadius) : 1;
      const desiredMagnitude = particle.maxSpeed * arrival;
      const desired = distance > 0
        ? { x: (toTarget.x / distance) * desiredMagnitude, y: (toTarget.y / distance) * desiredMagnitude }
        : { x: 0, y: 0 };
      const steering = limitVector(
        { x: desired.x - particle.vel.x, y: desired.y - particle.vel.y },
        particle.maxForce * frameScale,
      );

      particle.vel.x += steering.x;
      particle.vel.y += steering.y;
      particle.pos.x += particle.vel.x * frameScale;
      particle.pos.y += particle.vel.y * frameScale;
      return true;
    };

    const animate = (time: number) => {
      if (!isAnimating) return;
      if (!isVisible) {
        animationFrame = null;
        return;
      }

      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const frameScale = clamp((time - (previousTime || time - FRAME_MS)) / FRAME_MS, 0.35, 1.8);
      previousTime = time;
      let moving = false;

      for (const particle of particles) {
        if (updateParticle(particle, elapsed, frameScale)) moving = true;
      }

      const maskProgress = easeOutQuint((elapsed - 480) / 680);
      const particleFade = 1 - easeOutQuint((elapsed - 720) / 620) * 0.9;
      const particleEntrance = easeOutQuint(elapsed / 180);
      ctx.clearRect(0, 0, width, height);
      drawMask(maskProgress);
      drawParticles(particleFade * particleEntrance);

      if ((moving && elapsed < 2200) || elapsed < 1480) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        isAnimating = false;
        animationFrame = null;
        particles.forEach((particle) => {
          particle.pos.x = particle.target.x;
          particle.pos.y = particle.target.y;
          particle.vel.x = 0;
          particle.vel.y = 0;
        });
        drawFinalFrame();
      }
    };

    const startAnimation = () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      startTime = 0;
      previousTime = 0;
      isAnimating = true;
      if (isVisible) animationFrame = window.requestAnimationFrame(animate);
    };

    const rebuild = () => {
      const nextWidth = Math.max(1, Math.round(root.clientWidth));
      const nextHeight = Math.max(1, Math.round(root.clientHeight));
      if (nextWidth === width && nextHeight === height && mask) return;
      width = nextWidth;
      height = nextHeight;
      setCanvasSize(width, height);

      const result = createMaskAndTargets();
      if (!result) return;
      mask = result.nextMask;
      particles = result.targets.map((target) => {
        const start = organicStartPosition(target, width, height);
        const maxSpeed = 4.2 + Math.random() * 3.5;
        return {
          pos: start,
          vel: tangentialVelocity(start, target),
          target: { x: target.x, y: target.y },
          tone: target.tone,
          radius: width < 520 ? 0.43 + Math.random() * 0.28 : 0.56 + Math.random() * 0.38,
          maxSpeed,
          maxForce: maxSpeed * (0.046 + Math.random() * 0.016),
          slowRadius: 54 + Math.random() * 62,
          delay: Math.random() * 120,
        };
      });

      root.classList.add(styles.ready);
      startAnimation();
    };

    const scatter = (event: PointerEvent) => {
      if (!mask || particles.length === 0) return;
      if (event.pointerType === "mouse" && event.button !== 0 && event.button !== 2) return;
      const rect = canvas.getBoundingClientRect();
      const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };

      particles.forEach((particle) => {
        const dx = particle.target.x - point.x;
        const dy = particle.target.y - point.y;
        const distance = Math.max(12, Math.hypot(dx, dy));
        const localForce = clamp(1 - distance / Math.max(150, width * 0.28));
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.7;
        const displacement = 18 + localForce * (58 + Math.random() * 54);
        particle.pos.x = particle.target.x + Math.cos(angle) * displacement;
        particle.pos.y = particle.target.y + Math.sin(angle) * displacement;
        particle.vel.x = Math.cos(angle) * (1.4 + localForce * 3.2);
        particle.vel.y = Math.sin(angle) * (1.4 + localForce * 3.2);
        particle.delay = Math.random() * 90;
      });
      startAnimation();
    };

    const preventContextMenu = (event: MouseEvent) => event.preventDefault();
    const resizeObserver = new ResizeObserver(() => {
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(rebuild);
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && isAnimating && animationFrame === null) {
        previousTime = 0;
        animationFrame = window.requestAnimationFrame(animate);
      }
    }, { threshold: 0.05 });
    const onMotionPreferenceChange = () => {
      if (!motionPreference.matches) return;
      isAnimating = false;
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
      root.classList.remove(styles.ready);
    };

    canvas.addEventListener("pointerdown", scatter);
    canvas.addEventListener("contextmenu", preventContextMenu);
    motionPreference.addEventListener("change", onMotionPreferenceChange);
    resizeObserver.observe(root);
    visibilityObserver.observe(root);
    void document.fonts.ready.then(() => {
      mask = null;
      rebuild();
    });

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointerdown", scatter);
      canvas.removeEventListener("contextmenu", preventContextMenu);
      motionPreference.removeEventListener("change", onMotionPreferenceChange);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
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
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" title="Parçacık animasyonunu yeniden oynat" />
    </h1>
  );
}
