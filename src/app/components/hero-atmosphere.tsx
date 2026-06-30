"use client";

import { useEffect, useRef } from "react";

type WebGpuNavigator = Navigator & {
  gpu?: {
    requestAdapter: () => Promise<{
      requestDevice: () => Promise<unknown>;
    } | null>;
    getPreferredCanvasFormat: () => unknown;
  };
};

const shader = `
struct Uniforms {
  time: f32,
  width: f32,
  height: f32,
  pointerX: f32,
  pointerY: f32,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@vertex
fn vs(@builtin(vertex_index) index: u32) -> VertexOut {
  var pos = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>(1.0, -1.0),
    vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0, 1.0),
    vec2<f32>(1.0, -1.0),
    vec2<f32>(1.0, 1.0)
  );

  var out: VertexOut;
  out.position = vec4<f32>(pos[index], 0.0, 1.0);
  out.uv = pos[index] * 0.5 + vec2<f32>(0.5);
  return out;
}

fn hash(p: vec2<f32>) -> f32 {
  let h = dot(p, vec2<f32>(127.1, 311.7));
  return fract(sin(h) * 43758.5453);
}

fn noise(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let a = hash(i);
  let b = hash(i + vec2<f32>(1.0, 0.0));
  let c = hash(i + vec2<f32>(0.0, 1.0));
  let d = hash(i + vec2<f32>(1.0, 1.0));
  let v = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, v.x), mix(c, d, v.x), v.y);
}

fn fbm(p: vec2<f32>) -> f32 {
  var value = 0.0;
  var amp = 0.5;
  var freq = 1.0;
  for (var i = 0; i < 5; i = i + 1) {
    value = value + amp * noise(p * freq);
    amp = amp * 0.52;
    freq = freq * 2.03;
  }
  return value;
}

@fragment
fn fs(in: VertexOut) -> @location(0) vec4<f32> {
  let uv = in.uv;
  let aspect = max(u.width / max(u.height, 1.0), 0.1);
  let p = vec2<f32>((uv.x - 0.5) * aspect, uv.y - 0.5);
  let t = u.time * 0.055;
  let pointer = vec2<f32>((u.pointerX - 0.5) * aspect, u.pointerY - 0.5);
  let d = distance(p, pointer);

  let silk = fbm(vec2<f32>(p.x * 2.2 + t * 0.65, p.y * 5.0 - t * 1.2));
  let vertical = smoothstep(0.12, 0.82, uv.y) * (1.0 - smoothstep(0.86, 1.0, uv.y));
  let ribbon = smoothstep(0.52, 0.94, silk) * vertical;
  let glint = pow(max(0.0, 1.0 - abs(p.x + sin((uv.y + t) * 6.0) * 0.08) * 6.0), 4.0) * 0.24;
  let wake = max(0.0, 1.0 - d * 3.4) * 0.16;

  let red = vec3<f32>(0.56, 0.06, 0.07);
  let amber = vec3<f32>(0.95, 0.68, 0.26);
  let cream = vec3<f32>(1.0, 0.92, 0.76);
  let color = mix(red, amber, clamp(ribbon + glint, 0.0, 1.0));
  let alpha = clamp((ribbon * 0.18 + glint * 0.28 + wake) * (1.0 - smoothstep(0.0, 0.12, uv.y)), 0.0, 0.33);

  return vec4<f32>(mix(color, cream, glint * 0.35), alpha);
}
`;

export function HeroAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frame = 0;
    let disposed = false;
    const pointer = { x: 0.55, y: 0.45 };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    };

    const runFallback = () => {
      const context = canvas.getContext("2d");
      if (!context) return;

      const draw = (time: number) => {
        if (disposed) return;
        resize();
        const { width, height } = canvas;
        context.clearRect(0, 0, width, height);
        context.globalCompositeOperation = "screen";

        for (let i = 0; i < 6; i += 1) {
          const y = height * (0.24 + i * 0.09);
          const wave = Math.sin(time * 0.00045 + i * 0.9) * width * 0.08;
          const gradient = context.createLinearGradient(0, y, width, y + height * 0.16);
          gradient.addColorStop(0, "rgba(130, 24, 24, 0)");
          gradient.addColorStop(0.48, "rgba(221, 159, 68, 0.16)");
          gradient.addColorStop(1, "rgba(255, 242, 211, 0)");
          context.strokeStyle = gradient;
          context.lineWidth = Math.max(8, width * 0.035);
          context.beginPath();
          context.moveTo(-width * 0.1, y);
          context.bezierCurveTo(width * 0.25 + wave, y - height * 0.1, width * 0.58 - wave, y + height * 0.12, width * 1.1, y);
          context.stroke();
        }

        frame = window.requestAnimationFrame(draw);
      };

      frame = window.requestAnimationFrame(draw);
    };

    const runWebGpu = async () => {
      const gpu = (navigator as WebGpuNavigator).gpu;
      if (!gpu) {
        runFallback();
        return;
      }

      const adapter = await gpu.requestAdapter();
      if (!adapter || disposed) {
        runFallback();
        return;
      }

      const device = await adapter.requestDevice() as {
        createBuffer: (descriptor: unknown) => unknown;
        createShaderModule: (descriptor: unknown) => unknown;
        createRenderPipeline: (descriptor: unknown) => unknown;
        createBindGroup: (descriptor: unknown) => unknown;
        queue: {
          writeBuffer: (buffer: unknown, offset: number, data: BufferSource) => void;
          submit: (commandBuffers: unknown[]) => void;
        };
        createCommandEncoder: () => {
          beginRenderPass: (descriptor: unknown) => {
            setPipeline: (pipeline: unknown) => void;
            setBindGroup: (index: number, bindGroup: unknown) => void;
            draw: (vertexCount: number) => void;
            end: () => void;
          };
          finish: () => unknown;
        };
      };

      const context = canvas.getContext("webgpu") as {
        configure: (configuration: unknown) => void;
        getCurrentTexture: () => { createView: () => unknown };
      } | null;

      if (!context || disposed) {
        runFallback();
        return;
      }

      const format = gpu.getPreferredCanvasFormat();
      resize();
      context.configure({ device, format, alphaMode: "premultiplied" });

      const uniformBuffer = device.createBuffer({
        size: 32,
        usage: 0x0040 | 0x0008,
      });

      const shaderModule = device.createShaderModule({ code: shader });
      const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: { module: shaderModule, entryPoint: "vs" },
        fragment: { module: shaderModule, entryPoint: "fs", targets: [{ format, blend: {
          color: { srcFactor: "src-alpha", dstFactor: "one-minus-src-alpha", operation: "add" },
          alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha", operation: "add" },
        } }] },
        primitive: { topology: "triangle-list" },
      });

      const bindGroup = device.createBindGroup({
        layout: (pipeline as { getBindGroupLayout: (index: number) => unknown }).getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
      });

      const render = (time: number) => {
        if (disposed) return;
        resize();

        const uniforms = new Float32Array([
          time * 0.001,
          canvas.width,
          canvas.height,
          pointer.x,
          pointer.y,
          0,
          0,
          0,
        ]);

        device.queue.writeBuffer(uniformBuffer, 0, uniforms);
        const encoder = device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
          colorAttachments: [{
            view: context.getCurrentTexture().createView(),
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
            loadOp: "clear",
            storeOp: "store",
          }],
        });

        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindGroup);
        pass.draw(6);
        pass.end();
        device.queue.submit([encoder.finish()]);
        frame = window.requestAnimationFrame(render);
      };

      frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / Math.max(rect.width, 1);
      pointer.y = (event.clientY - rect.top) / Math.max(rect.height, 1);
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    void runWebGpu();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas className="hero-atmosphere-canvas" ref={canvasRef} aria-hidden="true" />;
}
