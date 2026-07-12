"use client";

import { useEffect, useRef } from "react";

type IstiklalAtmosphereProps = {
  paused: boolean;
};

type NetworkInformation = {
  saveData?: boolean;
};

/**
 * Progressive atmosphere layer. The illustrated street remains complete without it;
 * capable browsers receive WebGPU, while Three's renderer falls back to WebGL 2.
 */
export function IstiklalAtmosphere({ paused }: IstiklalAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
    canvasRef.current?.dispatchEvent(new CustomEvent("istiklal-motion", { detail: { paused } }));
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const lowPower = (navigator.hardwareConcurrency ?? 4) <= 4 || connection?.saveData === true;
    const forceWebGL = lowPower || window.innerWidth < 768;

    if (reduceMotion.matches || connection?.saveData) {
      canvas.dataset.renderer = "static";
      return;
    }

    let disposed = false;
    let visible = false;
    let pageVisible = !document.hidden;
    let motionPaused = pausedRef.current;
    let renderer: import("three/webgpu").WebGPURenderer | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let bootstrapObserver: IntersectionObserver | null = null;
    let stopLoop = () => {};

    const boot = async () => {
      try {
        const THREE = await import("three/webgpu");
        if (disposed) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 2;

        const createRenderer = (useWebGL: boolean) => new THREE.WebGPURenderer({
          canvas,
          alpha: true,
          antialias: false,
          forceWebGL: useWebGL,
          outputBufferType: THREE.UnsignedByteType,
        });
        let activeWebGLFallback = forceWebGL;
        renderer = createRenderer(activeWebGLFallback);
        renderer.setClearColor(0x000000, 0);
        canvas.dataset.renderer = activeWebGLFallback ? "webgl2-loading" : "webgpu-loading";

        try {
          await Promise.race([
            renderer.init(),
            new Promise<never>((_, reject) => window.setTimeout(() => reject(new Error("GPU init timeout")), 1800)),
          ]);
        } catch {
          if (activeWebGLFallback) throw new Error("WebGL 2 atmosphere unavailable");
          renderer.dispose();
          activeWebGLFallback = true;
          renderer = createRenderer(true);
          renderer.setClearColor(0x000000, 0);
          canvas.dataset.renderer = "webgl2-loading";
          await renderer.init();
        }
        if (disposed || !renderer) return;

        canvas.dataset.renderer = !activeWebGLFallback && "gpu" in navigator ? "webgpu" : "webgl2";

        const glowCanvas = document.createElement("canvas");
        glowCanvas.width = 128;
        glowCanvas.height = 128;
        const glowContext = glowCanvas.getContext("2d");
        if (!glowContext) throw new Error("Atmosphere texture could not be created");
        const glow = glowContext.createRadialGradient(64, 64, 0, 64, 64, 64);
        glow.addColorStop(0, "rgba(255,245,190,.92)");
        glow.addColorStop(0.28, "rgba(243,194,103,.36)");
        glow.addColorStop(1, "rgba(219,153,66,0)");
        glowContext.fillStyle = glow;
        glowContext.fillRect(0, 0, 128, 128);
        const glowTexture = new THREE.CanvasTexture(glowCanvas);

        const lampMaterial = new THREE.SpriteMaterial({
          map: glowTexture,
          color: 0xffd485,
          transparent: true,
          opacity: 0.3,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const lampPositions = [
          [-0.5, 0.02, 0.38],
          [0.22, 0.06, 0.34],
          [0.69, -0.03, 0.24],
        ] as const;
        const lamps = lampPositions.map(([x, y, scale]) => {
          const sprite = new THREE.Sprite(lampMaterial.clone());
          sprite.position.set(x, y, 0);
          sprite.scale.set(scale, scale, 1);
          scene.add(sprite);
          return sprite;
        });

        const particleCount = lowPower || window.innerWidth < 768 ? 8 : 18;
        const particles = Array.from({ length: particleCount }, (_, index) => {
          const material = new THREE.SpriteMaterial({
            map: glowTexture,
            color: index % 3 === 0 ? 0xffdfa0 : 0xfff0c8,
            transparent: true,
            opacity: 0.1 + (index % 4) * 0.025,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });
          const sprite = new THREE.Sprite(material);
          const seed = ((index * 47) % 97) / 97;
          sprite.userData.seed = seed;
          sprite.position.set(seed * 2 - 1, -0.52 + (((index * 29) % 83) / 83) * 1.28, 0);
          const size = 0.018 + (index % 4) * 0.007;
          sprite.scale.set(size, size, 1);
          scene.add(sprite);
          return sprite;
        });

        const resize = () => {
          if (!renderer) return;
          const rect = canvas.getBoundingClientRect();
          const dprCap = window.innerWidth < 768 ? 1 : 1.35;
          const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
          const width = Math.max(1, Math.round(rect.width * dpr * 0.78));
          const height = Math.max(1, Math.round(rect.height * dpr * 0.78));
          renderer.setSize(width, height, false);
        };

        let lastFrame = 0;
        const render = (time: number) => {
          if (!renderer || motionPaused || !visible || !pageVisible) return;
          const targetInterval = lowPower || window.innerWidth < 768 ? 1000 / 30 : 1000 / 60;
          if (time - lastFrame < targetInterval) return;
          lastFrame = time;
          const seconds = time / 1000;

          lamps.forEach((lamp, index) => {
            const breath = 0.92 + Math.sin(seconds * 0.62 + index * 1.7) * 0.08;
            lamp.scale.setScalar(lampPositions[index][2] * breath);
            (lamp.material as import("three/webgpu").SpriteMaterial).opacity = 0.21 + breath * 0.08;
          });
          particles.forEach((particle, index) => {
            const seed = particle.userData.seed as number;
            particle.position.y += 0.00065 + seed * 0.00045;
            particle.position.x += Math.sin(seconds * 0.35 + index) * 0.00016;
            if (particle.position.y > 0.82) particle.position.y = -0.58;
          });
          renderer.render(scene, camera);
        };

        const syncLoop = () => {
          if (!renderer) return;
          if (visible && pageVisible && !motionPaused) {
            renderer.setAnimationLoop(render);
          } else {
            renderer.setAnimationLoop(null);
          }
        };
        stopLoop = () => renderer?.setAnimationLoop(null);

        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);
        resize();

        intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            syncLoop();
          },
          { rootMargin: "120px 0px", threshold: 0.02 },
        );
        intersectionObserver.observe(canvas);

        const onVisibilityChange = () => {
          pageVisible = !document.hidden;
          syncLoop();
        };
        document.addEventListener("visibilitychange", onVisibilityChange);
        const onMotionChange = (event: Event) => {
          motionPaused = (event as CustomEvent<{ paused: boolean }>).detail.paused;
          syncLoop();
        };
        canvas.addEventListener("istiklal-motion", onMotionChange);

        canvas.dataset.ready = "true";

        return () => {
          document.removeEventListener("visibilitychange", onVisibilityChange);
          canvas.removeEventListener("istiklal-motion", onMotionChange);
          particles.forEach((particle) => particle.material.dispose());
          lamps.forEach((lamp) => lamp.material.dispose());
          glowTexture.dispose();
          renderer?.dispose();
        };
      } catch {
        canvas.dataset.renderer = "static";
        canvas.classList.add("is-gpu-unavailable");
      }
    };

    let cleanupScene: (() => void) | undefined;
    let bootStarted = false;
    bootstrapObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || bootStarted) return;
        bootStarted = true;
        bootstrapObserver?.disconnect();
        void boot().then((cleanup) => {
          cleanupScene = cleanup;
        });
      },
      { rootMargin: "180px 0px", threshold: 0.01 },
    );
    bootstrapObserver.observe(canvas);

    return () => {
      disposed = true;
      stopLoop();
      bootstrapObserver?.disconnect();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      cleanupScene?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="footer-istiklal-gpu" aria-hidden="true" />;
}
