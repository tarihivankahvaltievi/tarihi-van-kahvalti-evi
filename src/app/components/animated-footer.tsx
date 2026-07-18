"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { address, displayAddress, displayPhone, mapsUrl, openingHours, telUrl, whatsappUrl } from "../seo";
import styles from "./animated-footer.module.css";

const wallBlocks = [
  { x: -8, y: 2, w: 82, h: 28, tone: "stone" },
  { x: 80, y: 0, w: 108, h: 30, tone: "warm" },
  { x: 196, y: 3, w: 92, h: 27, tone: "stone" },
  { x: 296, y: 1, w: 128, h: 29, tone: "light" },
  { x: 432, y: 2, w: 82, h: 28, tone: "warm" },
  { x: 522, y: 0, w: 112, h: 30, tone: "stone" },
  { x: 642, y: 4, w: 96, h: 26, tone: "light" },
  { x: 746, y: 1, w: 134, h: 29, tone: "warm" },
  { x: 888, y: 0, w: 104, h: 30, tone: "stone" },
  { x: 1000, y: 2, w: 116, h: 28, tone: "light" },
  { x: 1124, y: 0, w: 92, h: 30, tone: "warm" },
  { x: -16, y: 38, w: 136, h: 38, tone: "light" },
  { x: 128, y: 36, w: 118, h: 40, tone: "stone" },
  { x: 254, y: 39, w: 96, h: 37, tone: "warm" },
  { x: 358, y: 36, w: 148, h: 40, tone: "light" },
  { x: 514, y: 38, w: 104, h: 38, tone: "stone" },
  { x: 626, y: 36, w: 154, h: 40, tone: "warm" },
  { x: 788, y: 39, w: 110, h: 37, tone: "light" },
  { x: 906, y: 36, w: 166, h: 40, tone: "stone" },
  { x: 1080, y: 38, w: 132, h: 38, tone: "warm" },
  { x: -8, y: 84, w: 98, h: 34, tone: "warm" },
  { x: 98, y: 82, w: 154, h: 36, tone: "light" },
  { x: 260, y: 84, w: 126, h: 34, tone: "stone" },
  { x: 394, y: 81, w: 102, h: 37, tone: "warm" },
  { x: 504, y: 83, w: 162, h: 35, tone: "light" },
  { x: 674, y: 82, w: 118, h: 36, tone: "stone" },
  { x: 800, y: 84, w: 144, h: 34, tone: "warm" },
  { x: 952, y: 81, w: 104, h: 37, tone: "light" },
  { x: 1064, y: 83, w: 152, h: 35, tone: "stone" },
  { x: -18, y: 126, w: 150, h: 38, tone: "stone" },
  { x: 140, y: 124, w: 106, h: 40, tone: "warm" },
  { x: 254, y: 126, w: 170, h: 38, tone: "light" },
  { x: 432, y: 124, w: 92, h: 40, tone: "stone" },
  { x: 532, y: 126, w: 138, h: 38, tone: "warm" },
  { x: 678, y: 123, w: 166, h: 41, tone: "light" },
  { x: 852, y: 126, w: 118, h: 38, tone: "stone" },
  { x: 978, y: 124, w: 106, h: 40, tone: "warm" },
  { x: 1092, y: 126, w: 124, h: 38, tone: "light" },
  { x: -10, y: 172, w: 112, h: 38, tone: "light" },
  { x: 110, y: 170, w: 168, h: 40, tone: "stone" },
  { x: 286, y: 173, w: 104, h: 37, tone: "warm" },
  { x: 398, y: 170, w: 146, h: 40, tone: "light" },
  { x: 552, y: 172, w: 116, h: 38, tone: "stone" },
  { x: 676, y: 170, w: 178, h: 40, tone: "warm" },
  { x: 862, y: 173, w: 98, h: 37, tone: "light" },
  { x: 968, y: 170, w: 156, h: 40, tone: "stone" },
  { x: 1132, y: 172, w: 84, h: 38, tone: "warm" },
  { x: -18, y: 218, w: 146, h: 40, tone: "warm" },
  { x: 136, y: 216, w: 112, h: 42, tone: "light" },
  { x: 256, y: 218, w: 174, h: 40, tone: "stone" },
  { x: 438, y: 216, w: 98, h: 42, tone: "warm" },
  { x: 544, y: 218, w: 148, h: 40, tone: "light" },
  { x: 700, y: 216, w: 120, h: 42, tone: "stone" },
  { x: 828, y: 218, w: 170, h: 40, tone: "warm" },
  { x: 1006, y: 216, w: 112, h: 42, tone: "light" },
  { x: 1126, y: 218, w: 92, h: 40, tone: "stone" },
] as const;

const wallPits = [
  { x: 62, y: 18, r: 3 }, { x: 182, y: 18, r: 2 }, { x: 360, y: 19, r: 3 },
  { x: 548, y: 15, r: 2 }, { x: 714, y: 20, r: 3 }, { x: 930, y: 18, r: 2 },
  { x: 1084, y: 20, r: 3 }, { x: 42, y: 58, r: 2 }, { x: 226, y: 56, r: 4 },
  { x: 414, y: 55, r: 2 }, { x: 580, y: 58, r: 3 }, { x: 752, y: 57, r: 2 },
  { x: 1024, y: 56, r: 4 }, { x: 168, y: 101, r: 3 }, { x: 330, y: 98, r: 2 },
  { x: 610, y: 100, r: 3 }, { x: 884, y: 99, r: 2 }, { x: 1138, y: 101, r: 3 },
  { x: 86, y: 145, r: 3 }, { x: 306, y: 144, r: 2 }, { x: 512, y: 146, r: 4 },
  { x: 744, y: 143, r: 2 }, { x: 934, y: 146, r: 3 }, { x: 1168, y: 146, r: 2 },
  { x: 214, y: 190, r: 3 }, { x: 470, y: 190, r: 2 }, { x: 648, y: 191, r: 3 },
  { x: 802, y: 188, r: 2 }, { x: 1050, y: 190, r: 3 }, { x: 132, y: 238, r: 2 },
  { x: 382, y: 237, r: 3 }, { x: 590, y: 239, r: 2 }, { x: 914, y: 238, r: 4 },
] as const;

type WallBlock = (typeof wallBlocks)[number];

const wobble = (index: number, salt: number, amount: number) =>
  Number((Math.sin((index + 1) * salt) * amount).toFixed(1));

const createStonePath = (block: WallBlock, index: number, inset = 0) => {
  const x = block.x + inset;
  const y = block.y + inset;
  const w = Math.max(8, block.w - inset * 2);
  const h = Math.max(8, block.h - inset * 2);

  return [
    `M ${x + 5 + wobble(index, 1.11, 2.4)} ${y + 1 + wobble(index, 1.73, 1.6)}`,
    `C ${x + w * 0.28} ${y - 1 + wobble(index, 2.17, 1.8)}, ${x + w * 0.64} ${y + 2 + wobble(index, 2.91, 2)}, ${x + w - 6 + wobble(index, 3.43, 2.2)} ${y + 2 + wobble(index, 3.89, 1.4)}`,
    `Q ${x + w + wobble(index, 4.37, 2.2)} ${y + h * 0.33}, ${x + w - 2 + wobble(index, 5.13, 1.8)} ${y + h * 0.57}`,
    `C ${x + w - 4 + wobble(index, 5.91, 2)} ${y + h - 4}, ${x + w * 0.62} ${y + h + wobble(index, 6.49, 1.8)}, ${x + w * 0.36} ${y + h - 1 + wobble(index, 7.07, 1.6)}`,
    `C ${x + w * 0.18} ${y + h + wobble(index, 7.83, 1.9)}, ${x + 4 + wobble(index, 8.41, 2.1)} ${y + h - 3 + wobble(index, 9.19, 1.5)}, ${x + 2 + wobble(index, 9.77, 1.7)} ${y + h * 0.66}`,
    `Q ${x - 2 + wobble(index, 10.31, 1.7)} ${y + h * 0.34}, ${x + 5 + wobble(index, 11.03, 2.2)} ${y + 1 + wobble(index, 1.73, 1.6)}`,
    "Z",
  ].join(" ");
};

const createStoneVein = (block: WallBlock, index: number) => {
  const startX = block.x + block.w * (0.2 + (index % 4) * 0.11);
  const startY = block.y + block.h * (0.28 + (index % 3) * 0.08);
  const length = Math.max(18, block.w * (0.26 + (index % 5) * 0.025));
  return `M ${startX.toFixed(1)} ${startY.toFixed(1)} c ${wobble(index, 1.29, 7)} ${wobble(index, 2.29, 5)} ${(length * 0.55).toFixed(1)} ${wobble(index, 3.29, 8)} ${length.toFixed(1)} ${wobble(index, 4.29, 5)}`;
};

function IstiklalWebglAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mobileViewport = window.matchMedia("(max-width: 768px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mobileViewport.matches) {
      canvas.dataset.webglSkipped = "mobile";
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
      premultipliedAlpha: true,
    });
    if (!gl) {
      canvas.classList.add("is-webgl-unavailable");
      return;
    }

    const vertexSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;

      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    const fragmentSource = `
      precision mediump float;

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_reduceMotion;
      varying vec2 v_uv;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float softCircle(vec2 uv, vec2 center, float radius, float blur) {
        float distanceToCenter = length((uv - center) * vec2(u_resolution.x / u_resolution.y, 1.0));
        return 1.0 - smoothstep(radius, radius + blur, distanceToCenter);
      }

      void main() {
        vec2 uv = v_uv;
        float t = u_time * (1.0 - u_reduceMotion);

        float sky = smoothstep(1.0, 0.16, uv.y);
        float horizon = exp(-pow((uv.y - 0.50) * 7.8, 2.0));
        float street = smoothstep(0.68, 1.0, uv.y);
        float vignette = smoothstep(0.9, 0.18, length((uv - vec2(0.5, 0.52)) * vec2(1.12, 0.92)));

        vec3 cream = vec3(1.0, 0.955, 0.835);
        vec3 gold = vec3(0.86, 0.62, 0.28);
        vec3 green = vec3(0.18, 0.34, 0.22);
        vec3 ink = vec3(0.13, 0.19, 0.22);

        vec3 color = cream * (0.07 * sky) + gold * (0.13 * horizon) + green * (0.035 * street);

        float railLine = exp(-pow((uv.y - 0.84) * 95.0, 2.0));
        float railPulse = 0.55 + 0.45 * sin(t * 1.35 + uv.x * 11.0);
        color += vec3(1.0, 0.76, 0.36) * railLine * (0.12 + 0.08 * railPulse);

        float tramX = fract(t * 0.045 - 0.14);
        float headlight = softCircle(uv, vec2(tramX, 0.74), 0.030, 0.070);
        float headlightBeam = smoothstep(0.0, 0.55, uv.x - tramX) * smoothstep(0.90, 0.72, uv.y);
        headlightBeam *= exp(-pow((uv.y - 0.73) * 6.0, 2.0)) * smoothstep(0.62, 0.0, uv.x - tramX);
        color += vec3(1.0, 0.80, 0.36) * (headlight * 0.18 + headlightBeam * 0.12);

        float lampLeft = softCircle(uv, vec2(0.250, 0.50), 0.035, 0.085);
        float lampRight = softCircle(uv, vec2(0.625, 0.48), 0.035, 0.085);
        float lampBreath = 0.72 + 0.28 * sin(t * 1.1);
        color += vec3(1.0, 0.78, 0.38) * (lampLeft + lampRight) * 0.105 * lampBreath;

        float towerAura = softCircle(uv, vec2(0.508, 0.42), 0.22, 0.32);
        color += vec3(0.93, 0.76, 0.48) * towerAura * 0.055;

        float dust = 0.0;
        for (int i = 0; i < 18; i++) {
          float fi = float(i);
          vec2 seed = vec2(fi * 7.17, fi * 3.31);
          vec2 p = vec2(hash(seed), 0.18 + hash(seed + 11.0) * 0.67);
          p.x = fract(p.x + t * (0.006 + hash(seed + 4.0) * 0.012));
          float radius = 0.0025 + hash(seed + 8.0) * 0.004;
          dust += softCircle(uv, p, radius, radius * 3.8) * (0.25 + hash(seed + 2.0) * 0.55);
        }
        color += vec3(1.0, 0.84, 0.52) * dust * 0.075;

        float scan = sin((uv.x + uv.y) * 52.0 + t * 0.8) * 0.5 + 0.5;
        color += ink * scan * street * 0.010;

        float alpha = clamp((sky * 0.10 + horizon * 0.18 + street * 0.12 + headlight * 0.18 + dust * 0.11) * vignette, 0.0, 0.38);
        gl_FragColor = vec4(color, alpha);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const positionBuffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const reduceMotionLocation = gl.getUniformLocation(program, "u_reduceMotion");

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    let animationFrame = 0;
    let start = performance.now();
    let isVisible = false;
    let pageVisible = document.visibilityState === "visible";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
    };

    const render = (now: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, (now - start) / 1000);
      gl.uniform1f(reduceMotionLocation, reduceMotion.matches ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      canvas.dataset.webglActive = "true";
      canvas.dataset.webglFrame = Math.round(now).toString();

      if (!reduceMotion.matches && isVisible && pageVisible) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        animationFrame = 0;
      }
    };

    const requestRender = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (isVisible && pageVisible) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handleMotionPreferenceChange = () => {
      start = performance.now();
      requestRender();
    };

    const handleVisibilityChange = () => {
      pageVisible = document.visibilityState === "visible";
      requestRender();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      requestRender();
    });
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) resize();
        requestRender();
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );

    reduceMotion.addEventListener("change", handleMotionPreferenceChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      reduceMotion.removeEventListener("change", handleMotionPreferenceChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="footer-istiklal-webgl"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        width: "100%",
        height: "100%",
        mixBlendMode: "multiply",
        opacity: 0.82,
        pointerEvents: "none",
      }}
    />
  );
}

export function AnimatedFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const handleOpenBooking = () => {
    window.dispatchEvent(
      new CustomEvent("open-booking", {
        detail: {
          category: "Kahvaltı",
        },
      }),
    );
  };

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    if (typeof IntersectionObserver === "undefined") {
      const visibilityTimer = window.setTimeout(() => setIsFooterVisible(true), 0);
      return () => window.clearTimeout(visibilityTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { rootMargin: "180px 0px", threshold: 0 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Check if browser has native support for scroll-driven animations
    const hasNativeScrollTimeline =
      typeof window !== "undefined" &&
      window.CSS?.supports?.("(animation-timeline: view()) and (animation-range: entry)");

    if (hasNativeScrollTimeline) {
      // Native is supported, CSS handles it, no scroll listener needed!
      return;
    }

    // Fallback for browsers that don't support scroll-driven animations (e.g. Firefox)
    const handleScroll = () => {
      const rect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const footerHeight = rect.height;

      // Position of footer relative to viewport
      const scrolled = windowHeight - rect.top;
      const totalRange = windowHeight + footerHeight;

      // Calculate scroll ratio [0, 1]
      const ratio = Math.max(0, Math.min(1, scrolled / totalRange));
      footer.style.setProperty("--scroll-ratio", ratio.toString());
    };

    if (typeof IntersectionObserver === "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll(); // Initial call
          } else {
            window.removeEventListener("scroll", handleScroll);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(footer);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className={`footer-reimagined${isFooterVisible ? " footer-is-visible" : ""}`}
    >

      {/* ─── Premium Live Beyoğlu Illustration ─── */}
      <div
        className={`footer-skyline-wrapper ${styles.skylineWrapper}`}
        role="img"
        aria-label="İstiklal Caddesi’nde nostaljik tramvay, Galata Kulesi ve tarihi Beyoğlu silüeti"
      >
        <span className={styles.sceneCaption} aria-hidden="true">
          İstiklal’den Zambak Sokak’a
        </span>
        <IstiklalWebglAtmosphere />
        <svg viewBox="0 0 1200 240" preserveAspectRatio="xMidYMax meet" className={`footer-skyline-svg ${styles.skylineSvg}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky-building-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fffdf7" />
              <stop offset="1" stopColor="#eee5d4" />
            </linearGradient>
            <linearGradient id="sky-building-side" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f5ebdc" />
              <stop offset="1" stopColor="#d6c6aa" />
            </linearGradient>
            <linearGradient id="galata-stone-base" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#b4a38e" />
              <stop offset="0.3" stopColor="#d2c3ae" />
              <stop offset="0.6" stopColor="#e3d6c4" />
              <stop offset="0.85" stopColor="#c5b39b" />
              <stop offset="1" stopColor="#a38e76" />
            </linearGradient>
            <linearGradient id="galata-roof-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#4a4c4e" />
              <stop offset="0.4" stopColor="#7a7c80" />
              <stop offset="0.75" stopColor="#55585b" />
              <stop offset="1" stopColor="#303133" />
            </linearGradient>
            <linearGradient id="tram-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c1272d" />
              <stop offset="0.7" stopColor="#9a1d22" />
              <stop offset="1" stopColor="#601014" />
            </linearGradient>
            <linearGradient id="tram-glass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f3f5ed" />
              <stop offset="0.48" stopColor="#c7d0c5" />
              <stop offset="1" stopColor="#78877e" />
            </linearGradient>
            <linearGradient id="brass-trim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ab8b4b" />
              <stop offset="0.5" stopColor="#f1dd90" />
              <stop offset="1" stopColor="#9a7a3b" />
            </linearGradient>
            <radialGradient id="headlight-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffba3" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#f9d976" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f9d976" stopOpacity="0" />
            </radialGradient>
            <pattern id="stone-pattern" width="20" height="10" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
              <path d="M0,5 H20 M10,0 V5 M0,5 V10" stroke="#8d7d67" strokeWidth="0.5" fill="none" opacity="0.3" />
            </pattern>
            <linearGradient id="street-paving" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#efe5d5" />
              <stop offset="0.54" stopColor="#d5c4ab" />
              <stop offset="1" stopColor="#a99678" />
            </linearGradient>
            <linearGradient id="warm-window" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff7d4" />
              <stop offset="0.52" stopColor="#f6d787" />
              <stop offset="1" stopColor="#d5a54f" />
            </linearGradient>
            <radialGradient id="street-glow" cx="50%" cy="48%" r="62%">
              <stop offset="0" stopColor="#fff4c9" stopOpacity="0.38" />
              <stop offset="0.5" stopColor="#d6b36e" stopOpacity="0.12" />
              <stop offset="1" stopColor="#d6b36e" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1200" height="240" fill="#f4ecdf" />
          <ellipse className="street-sun-glow" cx="610" cy="118" rx="260" ry="92" fill="url(#street-glow)" />

          {/* Subtle sky clouds */}
          <g className="clouds" fill="none" stroke="var(--gold-soft, rgba(197, 162, 90, 0.25))" strokeWidth="1.2">
            <path d="M -50 40 Q 0 25 50 40 T 150 35 T 250 45" strokeDasharray="3 6" className="cloud-fast" />
            <path d="M 850 30 Q 900 15 950 30 T 1050 25 T 1150 35" strokeDasharray="4 8" className="cloud-slow" />
          </g>

          {/* Seagulls in flight */}
          <g className="seagulls" stroke="var(--ink, #2a2a2d)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.45">
            <path d="M 320 30 Q 328 22 336 30 Q 344 22 352 30" className="seagull-1" />
            <path d="M 780 25 Q 786 18 792 25 Q 798 18 804 25" className="seagull-2" />
          </g>

          {/* BACKGROUND LAYER: Galata Tower & Silhouettes */}
          <g className="bg-layer">
            <path d="M 0 220 L 0 170 L 40 155 L 75 170 L 110 160 L 140 175 L 180 160 L 210 180 L 250 170 L 290 190 L 330 175 L 370 190 L 450 170 L 520 185 L 560 170 L 565 150 L 575 150 L 580 170 L 630 185 L 680 170 L 720 190 L 760 175 L 810 180 L 850 165 L 900 185 L 940 170 L 1000 180 L 1040 160 L 1080 175 L 1120 165 L 1160 180 L 1200 160 L 1200 220 Z" fill="var(--bg-silhouette, #f2efe7)" opacity="0.75" />

            <g className="galata-waterfront" fill="#e8decf" stroke="#b8aa93" strokeWidth="1.1" opacity="0.82">
              <path d="M350 220 L350 190 L378 190 L378 176 L420 176 L420 220 Z" />
              <path d="M432 220 L432 182 L470 182 L470 170 L520 170 L520 220 Z" />
              <path d="M700 220 L700 174 L750 174 L750 184 L792 184 L792 220 Z" />
              <path d="M806 220 L806 188 L844 188 L844 176 L888 176 L888 220 Z" />
            </g>

            <g className="distant-window-lights" fill="url(#warm-window)" opacity="0.5">
              <rect x="372" y="193" width="10" height="6" rx="1.5" />
              <rect x="398" y="186" width="8" height="6" rx="1.5" />
              <rect x="466" y="188" width="10" height="6" rx="1.5" />
              <rect x="720" y="186" width="9" height="6" rx="1.5" />
              <rect x="838" y="196" width="8" height="6" rx="1.5" />
              <rect x="868" y="190" width="10" height="6" rx="1.5" />
            </g>

            {/* REALISTIC GALATA TOWER */}
            <g className="galata-silhouette premium-tower refined-galata" transform="translate(610, 220) scale(0.86, 0.78) translate(-610, -220)">
              {/* Base shadow/foundation */}
              <ellipse cx="610" cy="223" rx="60" ry="8" fill="#7a654c" opacity="0.25" stroke="none" />

              {/* Main cylindrical body (Straight sides) */}
              <path d="M570 220 L570 80 C590 73 630 73 650 80 L650 220 Z" fill="url(#galata-stone-base)" />
              <path d="M570 220 L570 80 C590 73 630 73 650 80 L650 220 Z" fill="url(#stone-pattern)" />
              <path d="M570 220 L570 80 C590 73 630 73 650 80 L650 220 Z" fill="none" stroke="#5f4d39" strokeWidth="1.5" />

              {/* Horizontal Stone Belts (Kat Silmeleri) for 3D realism */}
              <path d="M570 175 Q610 178 650 175" fill="none" stroke="#5f4d39" strokeWidth="2.5" />
              <path d="M570 175 Q610 178 650 175" fill="none" stroke="#bfae99" strokeWidth="1.2" />
              <path d="M570 125 Q610 128 650 125" fill="none" stroke="#5f4d39" strokeWidth="2.5" />
              <path d="M570 125 Q610 128 650 125" fill="none" stroke="#bfae99" strokeWidth="1.2" />

              {/* Small windows on the body with 3D stone frames */}
              <g fill="#2d251c" stroke="#5f4d39" strokeWidth="0.8">
                {/* 3D frames */}
                <rect x="589" y="159" width="8" height="16" rx="4" fill="none" stroke="#bfae99" strokeWidth="1.5" />
                <rect x="623" y="159" width="8" height="16" rx="4" fill="none" stroke="#bfae99" strokeWidth="1.5" />
                <rect x="606" y="129" width="8" height="16" rx="4" fill="none" stroke="#bfae99" strokeWidth="1.5" />
                <rect x="589" y="194" width="8" height="16" rx="4" fill="none" stroke="#bfae99" strokeWidth="1.5" />
                <rect x="623" y="194" width="8" height="16" rx="4" fill="none" stroke="#bfae99" strokeWidth="1.5" />
                {/* Window glass */}
                <rect x="590" y="160" width="6" height="14" rx="3" fill="#1b1510" />
                <rect x="624" y="160" width="6" height="14" rx="3" fill="#1b1510" />
                <rect x="607" y="130" width="6" height="14" rx="3" fill="#1b1510" />
                <rect x="590" y="195" width="6" height="14" rx="3" fill="#1b1510" />
                <rect x="624" y="195" width="6" height="14" rx="3" fill="#1b1510" />
              </g>

              {/* Lower balcony support (corbels) - stylized nested arch supports */}
              <path d="M570 80 C567 76 564 72 562 68 C590 73 630 73 658 68 C656 72 653 76 650 80 Z" fill="#bfae99" stroke="#5f4d39" strokeWidth="1" />
              {/* Curved corbel brackets (realigned to straight cylinder) */}
              <g stroke="#5f4d39" strokeWidth="1.8" fill="none">
                <path d="M565 69 Q567 74 570 78" />
                <path d="M575 70 Q577 75 579 79" />
                <path d="M585 71 Q586 76 588 80" />
                <path d="M595 72 Q596 76 597 80" />
                <path d="M605 72 Q605.5 76 606 80" />
                <path d="M615 72 Q614.5 76 614 80" />
                <path d="M625 72 Q624 76 623 80" />
                <path d="M635 71 Q633 76 632 80" />
                <path d="M645 70 Q643 75 641 79" />
                <path d="M655 69 Q652 74 650 78" />
              </g>
              {/* Mini support arches (scallop patterns) under the balcony */}
              <g stroke="#5f4d39" strokeWidth="1.2" fill="none">
                <path d="M562 68 Q568.5 72 575 70" />
                <path d="M575 70 Q580 73 585 71" />
                <path d="M585 71 Q590 73 595 72" />
                <path d="M595 72 Q600 73 605 72" />
                <path d="M605 72 Q610 73 615 72" />
                <path d="M615 72 Q620 73 625 71" />
                <path d="M625 71 Q630 73 635 71" />
                <path d="M635 71 Q640 73 645 70" />
                <path d="M645 70 Q651.5 72 658 68" />
              </g>

              {/* Lower Balcony - Wrought Iron Railing & Base Slab */}
              <path d="M561 68 C590 72.5 630 72.5 659 68 L658 64 C630 68.5 590 68.5 562 64 Z" fill="#bfae99" stroke="#5f4d39" strokeWidth="1" />
              <g stroke="#2d251c" strokeWidth="0.8" fill="none">
                <path d="M562 58 C590 62.5 630 62.5 658 58" />
                <path d="M562 64 C590 68.5 630 68.5 658 64" />
                <line x1="565" y1="64.5" x2="565" y2="58.5" />
                <line x1="570" y1="65.2" x2="570" y2="59.2" />
                <line x1="575" y1="65.8" x2="575" y2="59.8" />
                <line x1="580" y1="66.3" x2="580" y2="60.3" />
                <line x1="585" y1="66.7" x2="585" y2="60.7" />
                <line x1="590" y1="67" x2="590" y2="61" />
                <line x1="595" y1="67.2" x2="595" y2="61.2" />
                <line x1="600" y1="67.3" x2="600" y2="61.3" />
                <line x1="605" y1="67.3" x2="605" y2="61.3" />
                <line x1="610" y1="67.3" x2="610" y2="61.3" />
                <line x1="615" y1="67.3" x2="615" y2="61.3" />
                <line x1="620" y1="67.2" x2="620" y2="61.2" />
                <line x1="625" y1="67" x2="625" y2="61" />
                <line x1="630" y1="66.7" x2="630" y2="60.7" />
                <line x1="635" y1="66.3" x2="635" y2="60.3" />
                <line x1="640" y1="65.8" x2="640" y2="59.8" />
                <line x1="645" y1="65.2" x2="645" y2="59.2" />
                <line x1="650" y1="64.5" x2="650" y2="58.5" />
                <line x1="655" y1="63.8" x2="655" y2="57.8" />
              </g>

              {/* Arched Observation Deck */}
              <path d="M569 60 C590 64 630 64 651 60 L648 42 C630 46 590 46 572 42 Z" fill="#d2c3ae" stroke="#5f4d39" strokeWidth="1.2" />
              <g className="tower-arches" fill="#1b1510" stroke="#5f4d39" strokeWidth="1">
                <path d="M574 58 V48 A5 5 0 0 1 584 48 V59" />
                <path d="M587 59 V47 A5.5 5.5 0 0 1 598 47 V60" />
                <path d="M601 60 V46 A6 6 0 0 1 613 46 V60" />
                <path d="M616 60 V46 A6 6 0 0 1 628 46 V60" />
                <path d="M631 59 V47 A5.5 5.5 0 0 1 642 47 V59" />
                <path d="M645 58 V49 A4 4 0 0 1 649 49 V58" />
              </g>
              {/* Arch columns detail */}
              <g stroke="#9b8a74" strokeWidth="1.5">
                <line x1="572.5" y1="50" x2="572.5" y2="58" />
                <line x1="585.5" y1="49" x2="585.5" y2="60" />
                <line x1="599.5" y1="48" x2="599.5" y2="60" />
                <line x1="614.5" y1="48" x2="614.5" y2="60" />
                <line x1="629.5" y1="49" x2="629.5" y2="60" />
                <line x1="643.5" y1="50" x2="643.5" y2="59" />
              </g>

              {/* Upper Balcony & Support (with detailed railing and slab) */}
              <path d="M569 42 C590 45.5 630 45.5 651 42 L650 40 C630 43.5 590 43.5 570 40 Z" fill="#bfae99" stroke="#5f4d39" strokeWidth="1" />
              {/* Upper Balcony Railing */}
              <g stroke="#2d251c" strokeWidth="0.8" fill="none">
                <path d="M570 38 C590 41.5 630 41.5 650 38" />
                <line x1="573" y1="40" x2="573" y2="38" />
                <line x1="578" y1="40.5" x2="578" y2="38.5" />
                <line x1="583" y1="41" x2="583" y2="39" />
                <line x1="588" y1="41.5" x2="588" y2="39.5" />
                <line x1="593" y1="41.8" x2="593" y2="39.8" />
                <line x1="598" y1="42" x2="598" y2="40" />
                <line x1="603" y1="42.1" x2="603" y2="40.1" />
                <line x1="608" y1="42.1" x2="608" y2="40.1" />
                <line x1="613" y1="42.1" x2="613" y2="40.1" />
                <line x1="618" y1="42" x2="618" y2="40" />
                <line x1="623" y1="41.8" x2="623" y2="39.8" />
                <line x1="628" y1="41.5" x2="628" y2="39.5" />
                <line x1="633" y1="41" x2="633" y2="39" />
                <line x1="638" y1="40.5" x2="638" y2="38.5" />
                <line x1="643" y1="40" x2="643" y2="38" />
                <line x1="647" y1="39.5" x2="647" y2="37.5" />
              </g>

              {/* Upper Deck Wall & windows */}
              <path d="M573 38 C590 41 630 41 647 38 L645 28 C630 31 590 31 575 28 Z" fill="#d2c3ae" stroke="#5f4d39" strokeWidth="1" />
              <g fill="#1b1510" stroke="#4a3e31" strokeWidth="0.8">
                <rect x="585" y="30" width="4" height="6" rx="2" />
                <rect x="600" y="31" width="4" height="6" rx="2" />
                <rect x="616" y="31" width="4" height="6" rx="2" />
                <rect x="631" y="30" width="4" height="6" rx="2" />
              </g>

              {/* Conical Roof */}
              <path d="M575 28 L610 -35 L645 28 C630 31 590 31 575 28 Z" fill="url(#galata-roof-gradient)" stroke="#3a3c3e" strokeWidth="1.2" />

              {/* Roof lead seams */}
              <g stroke="#2d2f31" strokeWidth="0.8" fill="none">
                <path d="M585 28 L610 -35" />
                <path d="M595 30 L610 -35" />
                <path d="M605 30 L610 -35" />
                <path d="M615 30 L610 -35" />
                <path d="M625 30 L610 -35" />
                <path d="M635 28 L610 -35" />
              </g>

              {/* Roof dormers */}
              <g fill="#3a3c3e" stroke="#1f2022" strokeWidth="0.5">
                <path d="M600 5 L605 0 L610 5 Z" />
                <rect x="603" y="5" width="4" height="5" fill="#1f2022" />
                <path d="M612 10 L617 5 L622 10 Z" />
                <rect x="615" y="10" width="4" height="5" fill="#1f2022" />
              </g>

              {/* Highly Detailed Golden Alem (Spire / Finial) */}
              <path d="M608 -35 L612 -35 L611 -38 L609 -38 Z" fill="url(#brass-trim)" stroke="#7a5a1f" strokeWidth="0.5" />
              <line x1="610" y1="-38" x2="610" y2="-58" stroke="url(#brass-trim)" strokeWidth="1.5" />
              {/* Spherical details */}
              <circle cx="610" cy="-41" r="2.5" fill="url(#brass-trim)" stroke="#7a5a1f" strokeWidth="0.5" />
              <circle cx="610" cy="-47" r="1.8" fill="url(#brass-trim)" stroke="#7a5a1f" strokeWidth="0.5" />
              <circle cx="610" cy="-52" r="1" fill="url(#brass-trim)" stroke="#7a5a1f" strokeWidth="0.5" />
              {/* Crescent Moon (Hilal) pointing up */}
              <path d="M608.5 -58 A 3 3 0 1 1 611.5 -58 A 2.5 2.5 0 1 0 608.5 -58 Z" fill="url(#brass-trim)" stroke="#7a5a1f" strokeWidth="0.4" />
            </g>
          </g>

          {/* MIDGROUND LAYER: Detailed Beyoğlu Apartments (Rum/Classic style) */}
          <g className="mid-layer" stroke="#34302d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Left High-End Classic Apartment */}
            <g className="building">
              <path d="M 120 220 L 120 60 L 240 60 L 240 220 Z" fill="url(#sky-building-fill)" />
              <path d="M 230 63 L 240 60 L 240 220 L 230 220 Z" fill="url(#sky-building-side)" opacity="0.8" />

              {/* Detailed Roof and Cornice */}
              <path d="M 110 60 L 250 60 L 245 50 L 115 50 Z" fill="#e2d2be" />
              <path d="M 115 50 L 245 50 L 235 35 L 125 35 Z" fill="#d0bea6" />
              <path d="M 140 35 L 220 35 L 210 20 L 150 20 Z" fill="#e2d2be" />
              <path d="M 120 65 H 240 M 120 70 H 240" stroke="#b8a88d" strokeWidth="1.5" opacity="0.6" />

              <g className="facade-detail" stroke="#8f8170" strokeWidth="0.8" opacity="0.6">
                <path d="M125 75V220M235 75V220" />
                <path d="M120 120H240M120 175H240" strokeWidth="1.5" />
              </g>

              {/* French Balconies Row 3 */}
              <path d="M 135 120 L 165 120 L 165 125 L 135 125 Z" fill="#d0bea6" stroke="none" />
              <path d="M 190 120 L 220 120 L 220 125 L 190 125 Z" fill="#d0bea6" stroke="none" />
              <rect x="140" y="80" width="20" height="40" rx="2" className="window-light" fill="#fffdf6" />
              <rect x="195" y="80" width="20" height="40" rx="2" className="window-light" fill="#fffdf6" />
              {/* Wrought Iron Railings */}
              <g stroke="#2a2a2d" strokeWidth="1" fill="none">
                <path d="M 135 110 H 165 M 135 120 V 110 M 142.5 120 V 110 M 150 120 V 110 M 157.5 120 V 110 M 165 120 V 110" />
                <path d="M 190 110 H 220 M 190 120 V 110 M 197.5 120 V 110 M 205 120 V 110 M 212.5 120 V 110 M 220 120 V 110" />
              </g>
              <g fill="#b09c82" stroke="none">
                <rect x="138" y="82" width="24" height="4" />
                <rect x="193" y="82" width="24" height="4" />
              </g>

              <g className="shop-awning" stroke="none">
                <path d="M126 178 H234 L226 191 H134 Z" fill="#d7b58b" />
                <path d="M134 178 H151 L145 191 H128 Z M169 178 H186 L180 191 H163 Z M204 178 H221 L215 191 H198 Z" fill="#b94b3f" opacity="0.72" />
              </g>

              {/* Large Arched Windows Row 2 */}
              <path d="M 140 145 A 10 10 0 0 1 160 145 V 175 H 140 Z" className="window-light" fill="#fffdf6" />
              <path d="M 195 145 A 10 10 0 0 1 215 145 V 175 H 195 Z" className="window-light" fill="#fffdf6" />
              <g stroke="#8f8170" strokeWidth="1" opacity="0.8">
                <path d="M 150 135 V 175 M 140 155 H 160 M 140 165 H 160" />
                <path d="M 205 135 V 175 M 195 155 H 215 M 195 165 H 215" />
              </g>

              {/* Ground Floor arches */}
              <path d="M 135 220 V 200 A 15 15 0 0 1 165 200 V 220" fill="#a4937d" opacity="0.4" />
              <path d="M 190 220 V 200 A 15 15 0 0 1 220 200 V 220" fill="#a4937d" opacity="0.4" />
            </g>

            {/* Right Apartment with Dome */}
            <g className="building">
              <path d="M 820 220 L 820 50 L 960 50 L 960 220 Z" fill="url(#sky-building-fill)" />
              <path d="M 950 54 L 960 50 L 960 220 L 950 220 Z" fill="url(#sky-building-side)" opacity="0.75" />

              {/* Copper Dome Roof */}
              <path d="M 820 50 L 960 50 L 960 40 L 820 40 Z" fill="#dfd0bc" />
              <path d="M 840 40 C 840 10 940 10 940 40 Z" fill="#91a299" stroke="#687670" strokeWidth="1" />
              <line x1="890" y1="12" x2="890" y2="0" stroke="#687670" strokeWidth="2" />
              <circle cx="890" cy="-2" r="3" fill="#b38a31" stroke="none" />

              {/* Roof Dormers */}
              <path d="M 860 30 L 870 20 L 880 30 Z" fill="#75827b" />
              <rect x="865" y="30" width="10" height="10" fill="#3a3c3e" />
              <path d="M 900 30 L 910 20 L 920 30 Z" fill="#75827b" />
              <rect x="905" y="30" width="10" height="10" fill="#3a3c3e" />

              <path d="M820 110 H960 M820 165 H960" stroke="#b8a88d" strokeWidth="2" opacity="0.5" />

              {/* Windows with shutters */}
              <g className="window-light" fill="#fffdf6">
                <rect x="845" y="65" width="18" height="30" rx="1" />
                <rect x="885" y="65" width="18" height="30" rx="1" />
                <rect x="925" y="65" width="18" height="30" rx="1" />

                <rect x="845" y="125" width="18" height="30" rx="1" />
                <rect x="885" y="125" width="18" height="30" rx="1" />
                <rect x="925" y="125" width="18" height="30" rx="1" />
              </g>

              {/* Shutters */}
              <g fill="#7e8c84" stroke="none">
                <rect x="837" y="65" width="8" height="30" />
                <rect x="863" y="65" width="8" height="30" />
                <rect x="877" y="65" width="8" height="30" />
                <rect x="903" y="65" width="8" height="30" />
                <rect x="917" y="65" width="8" height="30" />
                <rect x="943" y="65" width="8" height="30" />

                <rect x="837" y="125" width="8" height="30" />
                <rect x="863" y="125" width="8" height="30" />
                <rect x="877" y="125" width="8" height="30" />
                <rect x="903" y="125" width="8" height="30" />
                <rect x="917" y="125" width="8" height="30" />
                <rect x="943" y="125" width="8" height="30" />
              </g>

              {/* Balconies */}
              <path d="M 880 155 L 930 155 L 930 160 L 880 160 Z" fill="#d0bea6" stroke="none" />
              <g stroke="#2a2a2d" strokeWidth="1" fill="none">
                <path d="M 880 145 H 930 M 880 155 V 145 M 890 155 V 145 M 900 155 V 145 M 910 155 V 145 M 920 155 V 145 M 930 155 V 145" />
              </g>

              <g className="roof-garden" stroke="none">
                <rect x="824" y="42" width="132" height="5" rx="2" fill="#9aa77b" opacity="0.7" />
                <circle cx="848" cy="39" r="5" fill="#758b63" />
                <circle cx="930" cy="38" r="4.5" fill="#758b63" />
              </g>
            </g>
          </g>

          {/* FOREGROUND LAYER: Detailed Houses, Street Lights, Rail Track & Tram */}
          <g className="fore-layer" stroke="#2c2927" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Left Foreground House (Brick/Stone Details) */}
            <g className="building">
              <path d="M 20 220 L 20 120 L 140 120 L 140 220 Z" fill="url(#sky-building-fill)" />
              <path d="M 130 122 L 140 120 L 140 220 L 130 220 Z" fill="url(#sky-building-side)" opacity="0.7" />

              <path d="M 10 120 L 75 80 L 150 120 Z" fill="#cba896" />
              <path d="M 15 120 L 75 85 L 145 120" stroke="#a47d67" strokeWidth="4" fill="none" />

              <path d="M20 165 H140 M20 200 H140" stroke="#b8a88d" strokeWidth="1.5" opacity="0.5" />

              <rect x="40" y="135" width="22" height="25" rx="1" className="window-light" fill="#fffdf6" />
              <rect x="90" y="135" width="22" height="25" rx="1" className="window-light" fill="#fffdf6" />

              {/* Window grilles */}
              <g stroke="#4a3e31" strokeWidth="1" opacity="0.8">
                <path d="M 51 135 V 160 M 40 147 H 62" />
                <path d="M 101 135 V 160 M 90 147 H 112" />
              </g>

              {/* Elegant Door */}
              <path d="M 55 220 V 185 A 15 15 0 0 1 85 185 V 220" fill="#4a3e31" />
              <path d="M 69 185 V 220 M 55 200 H 85" stroke="#2d251c" strokeWidth="1" />
              <circle cx="65" cy="205" r="1.5" fill="#f1dd90" stroke="none" />
              <circle cx="75" cy="205" r="1.5" fill="#f1dd90" stroke="none" />
            </g>

            {/* Right Foreground House */}
            <g className="building">
              <path d="M 980 220 L 980 110 L 1120 110 L 1120 220 Z" fill="url(#sky-building-fill)" />
              <path d="M 1110 112 L 1120 110 L 1120 220 L 1110 220 Z" fill="url(#sky-building-side)" opacity="0.7" />

              <path d="M 970 110 L 1130 110 L 1130 100 L 970 100 Z" fill="#e2d2be" />
              <path d="M 1010 100 L 1050 70 L 1090 100 Z" fill="#8f171a" />

              <rect x="1000" y="130" width="24" height="35" rx="2" className="window-light" fill="#fffdf6" />
              <rect x="1050" y="130" width="24" height="35" rx="2" className="window-light" fill="#fffdf6" />
              <g stroke="#8f8170" strokeWidth="1.2" opacity="0.7">
                <path d="M 1012 130 V 165 M 1000 147 H 1024" />
                <path d="M 1062 130 V 165 M 1050 147 H 1074" />
              </g>

              {/* Ornate brick details */}
              <g fill="#cba896" stroke="none">
                <rect x="1000" y="125" width="24" height="4" />
                <rect x="1050" y="125" width="24" height="4" />
                <rect x="1000" y="166" width="24" height="4" />
                <rect x="1050" y="166" width="24" height="4" />
              </g>

              {/* Arch Doorway */}
              <path d="M 1020 220 V 195 A 15 15 0 0 1 1050 195 V 220" fill="#a4937d" opacity="0.5" />
            </g>

            {/* Classic street lamps with golden glow */}
            <g className="street-lamp-left">
              <path d="M 270 220 L 270 120 C 270 100 300 100 300 110" fill="none" stroke="#2d251c" strokeWidth="2.5" />
              <path d="M 268 220 L 272 220 L 272 200 L 268 200 Z" fill="#2d251c" />
              <path d="M 290 110 L 310 110 L 305 130 L 295 130 Z" fill="#2a2a2d" strokeWidth="1" />
              <circle cx="300" cy="120" r="5" fill="#f1dd90" stroke="none" />
              <circle cx="300" cy="138" r="7" className="lamp-glow-bulb" />
            </g>

            <g className="street-lamp-right">
              <path d="M 760 220 L 760 115 C 760 95 730 95 730 105" fill="none" stroke="#2d251c" strokeWidth="2.5" />
              <path d="M 758 220 L 762 220 L 762 200 L 758 200 Z" fill="#2d251c" />
              <path d="M 720 105 L 740 105 L 735 125 L 725 125 Z" fill="#2a2a2d" strokeWidth="1" />
              <circle cx="730" cy="115" r="5" fill="#f1dd90" stroke="none" />
              <circle cx="730" cy="133" r="7" className="lamp-glow-bulb" />
            </g>

            {/* Historic Tram Stop Sign */}
            <g className="tram-stop refined-tram-stop" fill="var(--card-light, #faf9f5)" stroke="var(--ink, #2a2a2d)" strokeWidth="1.5">
              <line x1="430" y1="220" x2="430" y2="154" strokeWidth="2.5" />
              <rect x="407" y="128" width="46" height="28" rx="5" fill="var(--white, #ffffff)" />
              <rect x="412" y="133" width="36" height="13" rx="2.5" fill="#c1272d" stroke="none" />
              <text x="430" y="143" fontSize="6.8" fontWeight="900" textAnchor="middle" stroke="none" fill="var(--white, #ffffff)" fontFamily="var(--font-sans)" letterSpacing="0.05em">İSTİKLAL</text>
              <path d="M416 150 H444" stroke="#cdbf9d" strokeWidth="1.5" opacity="0.8" />
            </g>

            {/* Istiklal paving and street life layer */}
            <g className="istiklal-paving" strokeLinecap="round" strokeLinejoin="round">
              <path d="M0 214 H1200 V240 H0 Z" fill="url(#street-paving)" stroke="none" />
              <path d="M0 215 H1200" stroke="#fff7e2" strokeWidth="2" opacity="0.54" />
              <path d="M0 231 C150 224 260 236 390 229 S640 224 780 230 S1040 236 1200 227" stroke="#7d705d" strokeWidth="1" opacity="0.2" fill="none" />
              <path d="M25 224H70M112 228H165M208 224H252M306 229H352M410 225H462M518 229H566M622 224H675M730 228H782M842 224H886M948 229H1002M1062 225H1110M1148 229H1194" stroke="#fff9ea" strokeWidth="1.2" opacity="0.38" />
            </g>

            <g className="street-figures" fill="#2b2a27" stroke="none">
              <g className="walker walker-one">
                <circle cx="344" cy="198" r="4" />
                <path d="M342 202 L340 216 H348 L346 202 Z" />
                <path d="M341 210 L332 219 M346 210 L355 219" stroke="#2b2a27" strokeWidth="2" strokeLinecap="round" />
              </g>
              <g className="walker walker-two" opacity="0.74">
                <circle cx="932" cy="199" r="3.5" />
                <path d="M930 203 L928 216 H936 L934 203 Z" />
                <path d="M929 211 L921 219 M934 211 L942 219" stroke="#2b2a27" strokeWidth="1.8" strokeLinecap="round" />
              </g>
              <g className="street-planter">
                <rect x="1016" y="207" width="38" height="12" rx="4" fill="#8a6b48" />
                <path d="M1022 207 C1026 198 1032 200 1035 207 C1038 197 1046 198 1049 207" fill="#5f7d57" />
              </g>
            </g>

            {/* Tram Rail Tracks */}
            <g className="tram-rails">
              <line x1="0" y1="219" x2="1200" y2="219" stroke="#9a9b9c" strokeWidth="4" />
              <line x1="0" y1="219" x2="1200" y2="219" stroke="#5a5b5c" strokeWidth="1.5" />
              <line x1="0" y1="223" x2="1200" y2="223" stroke="#9a9b9c" strokeWidth="2" />
              {/* Track sleepers */}
              <path d="M10 219V225 M60 219V225 M110 219V225 M160 219V225 M210 219V225 M260 219V225 M310 219V225 M360 219V225 M410 219V225 M460 219V225 M510 219V225 M560 219V225 M610 219V225 M660 219V225 M710 219V225 M760 219V225 M810 219V225 M860 219V225 M910 219V225 M960 219V225 M1010 219V225 M1060 219V225 M1110 219V225 M1160 219V225" stroke="#3a3b3c" strokeWidth="1.5" />
            </g>

            {/* ─── Nostalgic İstiklal Tram ─── */}
            <g className="tram-group">
              {/* Tram Chassis Group (for vibration animation) */}
              <g className="tram-chassis">
                {/* Nostalgic Istiklal tram body - more rounded and realistic */}
                <path d="M2 172 C2 155 10 155 25 155 H115 C130 155 138 155 138 172 L145 190 C145 208 135 210 125 210 H15 C5 210 -2 208 2 172 Z" fill="url(#tram-body)" stroke="#2a2a2d" strokeWidth="1.8" />

                {/* Darker lower section */}
                <path d="M3 195 L143 195 L135 210 H10 Z" fill="#2d251c" stroke="none" />

                {/* Roof details */}
                <path d="M12 155 H128 L133 162 H7 Z" fill="#3a3c3e" stroke="#2a2a2d" strokeWidth="1" />
                <rect x="35" y="152" width="70" height="4" rx="2" fill="#55585b" stroke="#2a2a2d" strokeWidth="1" />

                {/* Signage */}
                <rect x="46" y="145" width="48" height="12" rx="2" fill="#e8d5a5" stroke="#2a2a2d" strokeWidth="1.5" />
                <text x="70" y="154" fontSize="7" fontWeight="900" textAnchor="middle" stroke="none" fill="#6f1013" fontFamily="var(--font-sans)" letterSpacing="0.08em">TÜNEL</text>

                {/* Brass Trims */}
                <path d="M6 182 H138" stroke="url(#brass-trim)" strokeWidth="2.5" />
                <path d="M3 195 H143" stroke="url(#brass-trim)" strokeWidth="1.5" opacity="0.9" />

                {/* Windows and doors */}
                <g stroke="#2a2a2d" strokeWidth="1.5">
                  <rect x="15" y="167" width="18" height="26" rx="2" fill="url(#tram-glass)" className="tram-window" />
                  <rect x="38" y="167" width="18" height="26" rx="2" fill="url(#tram-glass)" className="tram-window" />
                  <rect x="61" y="167" width="18" height="26" rx="2" fill="url(#tram-glass)" className="tram-window" />
                  <rect x="84" y="167" width="18" height="26" rx="2" fill="url(#tram-glass)" className="tram-window" />
                  {/* Front curved window */}
                  <path d="M107 167 H125 C132 175 133 185 133 193 H107 Z" fill="url(#tram-glass)" className="tram-window" />
                </g>

                {/* Window reflections and driver silhouette keep the tram legible at mobile sizes. */}
                <g fill="none" stroke="#ffffff" strokeWidth="1.15" strokeLinecap="round" opacity="0.56">
                  <path d="M18 170 H28 M41 170 H51 M64 170 H74 M87 170 H97 M111 170 H124" />
                </g>
                <g fill="#28312d" opacity="0.72" stroke="none">
                  <circle cx="119" cy="177" r="3.2" />
                  <path d="M115 181 Q119 178 123 181 L124 191 H114 Z" />
                </g>

                {/* Wooden panels / dividers */}
                <g stroke="#4a1818" strokeWidth="1.5" opacity="0.8">
                  <path d="M35.5 167 V195 M58.5 167 V195 M81.5 167 V195 M104.5 167 V195" />
                </g>

                {/* Interior visible details (seats/poles) */}
                <g stroke="#8d6542" strokeWidth="1.5" opacity="0.6">
                  <path d="M20 185 V193 M43 185 V193 M66 185 V193 M89 185 V193 M112 185 V193" />
                </g>

                {/* Front Bumper and Grille */}
                <path d="M130 195 L148 195 L145 205 L128 205 Z" fill="#4a4c4e" stroke="#2a2a2d" strokeWidth="1" />
                <path d="M132 198 H145 M131 202 H143" stroke="#2a2a2d" strokeWidth="1" opacity="0.6" />

                {/* Headlight */}
                <circle cx="138" cy="188" r="6" fill="#fffba3" stroke="#2a2a2d" strokeWidth="1.5" />
                <circle cx="138" cy="188" r="4" fill="#ffffff" stroke="none" />
                <polygon points="144,186 175,170 175,206 144,190" fill="url(#headlight-glow)" stroke="none" />

                {/* Wheels and undercarriage */}
                <g stroke="#2a2a2d" strokeWidth="1.5">
                  {/* Wheel covers / mudguards */}
                  <path d="M18 205 C18 198 38 198 38 205" fill="#1a1c1e" />
                  <path d="M98 205 C98 198 118 198 118 205" fill="#1a1c1e" />

                  {/* Wheels */}
                  <circle cx="28" cy="213" r="6.5" fill="#55585b" className="tram-wheel" />
                  <circle cx="108" cy="213" r="6.5" fill="#55585b" className="tram-wheel" />
                  <circle cx="28" cy="213" r="2" fill="#2a2a2d" />
                  <circle cx="108" cy="213" r="2" fill="#2a2a2d" />

                  {/* Mechanisms connecting wheels */}
                  <path d="M28 213 H108" stroke="#3a3c3e" strokeWidth="2" />
                  <path d="M15 210 H120" stroke="#1a1c1e" strokeWidth="3" />
                </g>

                {/* Pantograph (Detailed) */}
                <g stroke="#2a2a2d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M25 152 H115" strokeWidth="2" />
                  {/* Lower arms */}
                  <line x1="75" y1="152" x2="60" y2="140" />
                  <line x1="60" y1="140" x2="90" y2="140" />
                  <line x1="90" y1="140" x2="75" y2="152" />
                  {/* Upper arms reaching wire */}
                  <line x1="60" y1="140" x2="75" y2="135" strokeWidth="1.2" />
                  <line x1="90" y1="140" x2="75" y2="135" strokeWidth="1.2" />
                  {/* Contact shoe */}
                  <line x1="65" y1="135" x2="85" y2="135" strokeWidth="2.5" />
                </g>
              </g>
            </g>

            {/* Overhead Electrical Cable Wire */}
            <g className="overhead-wire">
              <line x1="0" y1="135" x2="1200" y2="135" stroke="#3a3c3e" strokeWidth="1.0" opacity="0.25" />
              <path d="M300 135 C350 129 392 129 430 135 M730 135 C780 128 830 128 884 135" fill="none" stroke="#3a3c3e" strokeWidth="0.9" opacity="0.18" />
              <circle cx="430" cy="135" r="2" fill="#9b7a36" opacity="0.65" stroke="none" />
              <circle cx="884" cy="135" r="2" fill="#9b7a36" opacity="0.65" stroke="none" />
            </g>
          </g>
        </svg>
      </div>
      <div className={`footer-drawn-wall ${styles.drawnWall}`} aria-hidden="true">
        <svg viewBox="0 0 1200 260" preserveAspectRatio="none" className="footer-wall-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="wall-grain" x="-5%" y="-10%" width="110%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.88" numOctaves="4" seed="19" />
              <feColorMatrix type="matrix" values="0.62 0 0 0 0.18  0 0.58 0 0 0.15  0 0 0.5 0 0.08  0 0 0 0.34 0" />
            </filter>
            <filter id="stone-edge" x="-8%" y="-12%" width="116%" height="124%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035 0.12" numOctaves="3" seed="7" result="rough" />
              <feDisplacementMap in="SourceGraphic" in2="rough" scale="1.7" />
            </filter>
            <linearGradient id="wall-aged-stone" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f1d6a4" />
              <stop offset="0.45" stopColor="#c79557" />
              <stop offset="1" stopColor="#8f6238" />
            </linearGradient>
            <linearGradient id="wall-warm-stone" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e8b979" />
              <stop offset="0.48" stopColor="#b4773d" />
              <stop offset="1" stopColor="#7e4d2d" />
            </linearGradient>
            <linearGradient id="wall-light-stone" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f6ddb0" />
              <stop offset="0.55" stopColor="#d0a468" />
              <stop offset="1" stopColor="#9b6e3f" />
            </linearGradient>
            <linearGradient id="stone-glaze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff4cf" stopOpacity="0.58" />
              <stop offset="0.52" stopColor="#d29b57" stopOpacity="0.08" />
              <stop offset="1" stopColor="#3d2c20" stopOpacity="0.24" />
            </linearGradient>
          </defs>
          <rect width="1200" height="260" fill="#6b5137" />
          <g className="wall-blocks" stroke="#6b5136" strokeWidth="2.4" strokeLinejoin="round">
            {wallBlocks.map((block, index) => {
              const fill =
                block.tone === "warm"
                  ? "url(#wall-warm-stone)"
                  : block.tone === "light"
                    ? "url(#wall-light-stone)"
                    : "url(#wall-aged-stone)";

              return (
                <g key={`wall-block-${index}`} className="wall-block">
                  <path
                    className="wall-stone-shape"
                    d={createStonePath(block, index)}
                    fill={fill}
                    filter="url(#stone-edge)"
                  />
                  <path
                    className="wall-stone-glaze"
                    d={createStonePath(block, index, 3)}
                    fill="url(#stone-glaze)"
                  />
                  <path
                    className="wall-block-lip"
                    d={`M ${block.x + 9 + wobble(index, 1.67, 2)} ${block.y + 6 + wobble(index, 2.13, 1.4)} C ${block.x + block.w * 0.36} ${block.y + 3 + wobble(index, 2.93, 1.4)}, ${block.x + block.w * 0.64} ${block.y + 7 + wobble(index, 3.71, 1.4)}, ${block.x + block.w - 12 + wobble(index, 4.47, 2)} ${block.y + 6 + wobble(index, 5.21, 1.4)}`}
                    stroke="#fff0bf"
                    strokeWidth="1.05"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.44"
                  />
                  <path
                    className="stone-vein"
                    d={createStoneVein(block, index)}
                    stroke="#6a4529"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    fill="none"
                    opacity={index % 3 === 0 ? 0.32 : 0.18}
                  />
                  <path
                    d={`M ${block.x + 8 + wobble(index, 6.17, 2)} ${block.y + block.h - 5 + wobble(index, 7.11, 1.3)} C ${block.x + block.w * 0.42} ${block.y + block.h - 2 + wobble(index, 8.33, 1.2)}, ${block.x + block.w * 0.62} ${block.y + block.h - 7 + wobble(index, 9.07, 1.2)}, ${block.x + block.w - 9 + wobble(index, 10.61, 2)} ${block.y + block.h - 5 + wobble(index, 11.51, 1.3)}`}
                    stroke="#533821"
                    strokeWidth="0.95"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.24"
                  />
                </g>
              );
            })}
          </g>
          <rect width="1200" height="260" filter="url(#wall-grain)" opacity="0.56" />
          <g className="wall-pits" fill="#4d321d" opacity="0.34">
            {wallPits.map((pit, index) => (
              <ellipse key={`wall-pit-${index}`} cx={pit.x} cy={pit.y} rx={pit.r * 1.6} ry={pit.r} />
            ))}
          </g>
          <g className="wall-cracks" fill="none" stroke="#4f3520" strokeWidth="1.35" strokeLinecap="round">
            <path d="M98 34c8 12-2 24 10 36 8 8 2 20 16 30" />
            <path d="M424 8c-10 18 2 30-18 46 14 10 4 20 18 34" />
            <path d="M752 90c-14 14-4 26-24 38 16 10 6 24 20 38" />
            <path d="M1072 122c-16 12-8 28-26 42 12 8 2 24 16 38" />
          </g>
          <g className="wall-weeds" strokeLinecap="round">
            <path d="M802 62c8-14 14-18 22-30M812 65c2-18 8-26 12-36M818 64c12-10 22-14 34-18" />
            <path d="M150 158c-7-10-10-20-15-31M156 158c4-14 10-24 17-34M164 160c11-7 20-12 31-15" />
          </g>
        </svg>
      </div>

      {/* ─── Spacious Footer Content Area ─── */}
      <div className="footer-content">

        {/* Top Section: Brand Lockup & Manifesto */}
        <div className="footer-top-section">
          <div className="footer-brand-lockup">
            <a className="footer-brand-logo" href="#top" aria-label="Başa Dön">
              <Image src="/images/brand-icon-small.png" alt="Tarihi Van Kahvaltı Evi" width={76} height={95} loading="lazy" />
            </a>
            <h2 className="footer-manifesto">
              Van kahvaltısı, <br />
              <span className="footer-manifesto-italic">tarihle aynı sofrada.</span>
            </h2>
            <p className="footer-brand-desc">
              1978’den beri süregelen aile yolculuğumuzda, Beyoğlu’nun kalbindeki tarihi Rum binasının dokusunu,
              bakır sahanların tınısı ve eksilmeyen demli çayımızla buluşturuyoruz.
            </p>
            <button type="button" className="footer-cta" onClick={handleOpenBooking}>
              Masada Yerini Ayırt <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Delicate Golden-Fading Divider */}
        <hr className="footer-divider" />

        {/* Information Grid */}
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">Keşfet</h4>
            <ul className="footer-links">
              <li><Link href="/menu">Zengin Menü</Link></li>
              <li><Link href="/#faq">Van Kahvaltısı</Link></li>
              <li><Link href="/konum">Beyoğlu ve Taksim Kahvaltı</Link></li>
              <li><Link href="/menu">Kafka Cafe</Link></li>
              <li><Link href="/konum">Konum ve Yol Tarifi</Link></li>
              <li><Link href="/#faq">Sıkça Sorulan Sorular</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Bize Ulaşın</h4>
            <ul className="footer-links">
              <li>
                <a href={telUrl}>
                  <Phone size={16} />
                  <span className="link-text">{displayPhone}</span>
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} />
                  <span className="link-text">WhatsApp İletişim</span>
                </a>
              </li>
              <li>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin size={16} />
                  <span className="link-text">{address.streetAddress} {address.locality}</span>
                </a>
              </li>
            </ul>
            <address className="footer-address-semantic" style={{ fontStyle: "normal", display: "contents" }}>
              <span className="sr-only">{displayAddress}, {address.countryName}</span>
            </address>
          </div>

          <div className="footer-col footer-col-info">
            <div className="info-badge-wrapper">
              <div className="info-badge">
                <span className="info-badge-title">2. Derece</span>
                <span className="info-badge-subtitle">Tarihi Eser</span>
              </div>
            </div>
            <div className="info-hours">
              <span className="hours-label">
                <Clock size={12} style={{ display: "inline-block", marginRight: "4px", verticalAlign: "middle" }} />
                Her Gün Açığız
              </span>
              <span className="hours-value">{openingHours.opens} - {openingHours.closes}</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Strip */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 Tarihi Van Kahvaltı Evi. Tüm hakları saklıdır.
          </div>
          <div className="footer-legal-links">
            <span aria-hidden="true">Gizlilik Politikası</span>
            <span aria-hidden="true">Çerez Politikası</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
