"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Section, SectionHeader } from "@/components/ui/SectionHeader";
import { FlowDiagram } from "@/components/ui/FlowDiagram";

type PatternType = "portrait" | "architecture" | "motion";

interface Metrics {
  preservation: string;
  entropy: string;
  qubitCost: string;
}

function drawPattern(ctx: CanvasRenderingContext2D, width: number, height: number, pattern: PatternType) {
  ctx.fillStyle = "#050508";
  ctx.fillRect(0, 0, width, height);

  if (pattern === "portrait") {
    // High-contrast portrait contour preset
    const grad = ctx.createRadialGradient(width * 0.5, height * 0.4, 10, width * 0.5, height * 0.4, width * 0.4);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    grad.addColorStop(0.5, "rgba(200, 200, 220, 0.7)");
    grad.addColorStop(1, "rgba(8, 8, 12, 0.95)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.4, width * 0.28, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.beginPath();
    ctx.arc(width * 0.42, height * 0.38, width * 0.04, 0, Math.PI * 2);
    ctx.arc(width * 0.58, height * 0.38, width * 0.04, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.48, width * 0.12, 0.2, Math.PI - 0.2);
    ctx.stroke();
  } else if (pattern === "architecture") {
    // Geometric architectural structure preset
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 === 0 ? "rgba(255, 255, 255, 0.5)" : "rgba(180, 180, 200, 0.4)";
      const barHeight = height * (0.3 + (i % 4) * 0.15);
      ctx.fillRect(width * 0.1 + i * (width * 0.1), height - barHeight, width * 0.07, barHeight);
    }
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.5);
    ctx.lineTo(width, height * 0.2);
    ctx.stroke();
  } else {
    // Complex motion vector grid preset
    for (let x = 0; x < width; x += 30) {
      for (let y = 0; y < height; y += 30) {
        const angle = (x + y) * 0.02;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 + Math.sin(angle) * 0.45})`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * 20, y + Math.sin(angle) * 20);
        ctx.stroke();
      }
    }
  }
}

function processCanvas(
  sourceCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mode: "standard" | "intelligent"
): ImageData {
  const imageData = sourceCtx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const blockSize = mode === "standard" ? 16 : 10;

  for (let y = 0; y < height; y += blockSize) {
    for (let x = 0; x < width; x += blockSize) {
      let r = 0, g = 0, b = 0, count = 0;

      for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
        for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
          const idx = ((y + dy) * width + (x + dx)) * 4;
          r += data[idx];
          g += data[idx + 1];
          b += data[idx + 2];
          count++;
        }
      }

      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);

      let stepSize = blockSize;
      if (mode === "intelligent") {
        const cx = x + blockSize / 2;
        const cy = y + blockSize / 2;
        const dist = Math.sqrt(Math.pow(cx - width / 2, 2) + Math.pow(cy - height / 2, 2));
        const importance = Math.max(0.1, 1 - dist / (width * 0.45));
        stepSize = Math.max(4, Math.round(blockSize * (1.6 - importance)));
      }

      for (let dy = 0; dy < stepSize && y + dy < height; dy++) {
        for (let dx = 0; dx < stepSize && x + dx < width; dx++) {
          const idx = ((y + dy) * width + (x + dx)) * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
        }
      }
    }
  }

  return imageData;
}

export function PixelationDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pattern, setPattern] = useState<PatternType>("portrait");
  const [splitPos, setSplitPos] = useState<number>(50);
  const [metrics, setMetrics] = useState<Metrics>({
    preservation: "94.2%",
    entropy: "1.42 bit/px",
    qubitCost: "64 QUBO terms",
  });

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Create offscreen buffer for standard and intelligent renderings
    const offscreen = document.createElement("canvas");
    offscreen.width = w;
    offscreen.height = h;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    // Draw base pattern
    drawPattern(offCtx, w, h, pattern);

    // Standard pixelation image data
    const stdImgData = processCanvas(offCtx, w, h, "standard");
    
    // Intelligent pixelation image data
    drawPattern(offCtx, w, h, pattern);
    const intelImgData = processCanvas(offCtx, w, h, "intelligent");

    // Render composite split-view onto main canvas
    const splitX = Math.round((w * splitPos) / 100);

    ctx.putImageData(stdImgData, 0, 0);

    // Draw intelligent pixelation on the right portion.
    // putImageData ignores clip(), so restrict it via its dirty-rect parameters.
    if (splitX < w) {
      ctx.putImageData(intelImgData, 0, 0, splitX, 0, w - splitX, h);
    }

    // Draw divider line
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(splitX, 0);
    ctx.lineTo(splitX, h);
    ctx.stroke();
  }, [pattern, splitPos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 500;
    canvas.height = 340;
    render();

    // Update telemetry metrics dynamically based on slider
    const ratio = splitPos / 100;
    setMetrics({
      preservation: `${(82 + ratio * 14.8).toFixed(1)}%`,
      entropy: `${(2.1 - ratio * 0.68).toFixed(2)} bit/px`,
      qubitCost: `${Math.round(128 - ratio * 64)} QUBO terms`,
    });
  }, [render, splitPos]);

  return (
    <Section id="pixelation">
      <SectionHeader
        label="Intelligent Pixelation"
        title="Pixelation, reimagined."
        description="Traditional pixelation applies a predetermined uniform transformation. Qaankunka explores intelligent pixelation as an optimization problem, combining visual importance maps with quantum-inspired constraint formulations."
        badge="Research Demonstrator"
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <FlowDiagram
            accent="cyan"
            steps={[
              { label: "Original Image" },
              { label: "AI Visual Analysis" },
              { label: "Optimisation Problem" },
              { label: "Pixel Representation" },
              { label: "Optimised Result" },
            ]}
          />

          {/* Telemetry panel */}
          <div className="mt-8 rounded-xl border border-border/80 bg-bg-card p-5">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent-cyan">
              Research Telemetry
            </h4>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-lg border border-border/50 bg-bg-elevated/60 p-3">
                <div className="text-[10px] font-mono uppercase text-text-muted">Preservation</div>
                <div className="mt-1 text-sm font-semibold text-text-primary">{metrics.preservation}</div>
              </div>
              <div className="rounded-lg border border-border/50 bg-bg-elevated/60 p-3">
                <div className="text-[10px] font-mono uppercase text-text-muted">Entropy Rate</div>
                <div className="mt-1 text-sm font-semibold text-accent-cyan">{metrics.entropy}</div>
              </div>
              <div className="rounded-lg border border-border/50 bg-bg-elevated/60 p-3">
                <div className="text-[10px] font-mono uppercase text-text-muted">QUBO Terms</div>
                <div className="mt-1 text-sm font-semibold text-accent-violet">{metrics.qubitCost}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              {(["portrait", "architecture", "motion"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPattern(p)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-mono capitalize transition-all ${
                    pattern === p
                      ? "border-accent-cyan/50 bg-accent-cyan/15 text-accent-cyan"
                      : "border-border text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase text-text-muted">
              Slide to compare
            </span>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-border bg-bg-card">
            <canvas
              ref={canvasRef}
              className="w-full cursor-ew-resize"
              role="img"
              aria-label="Split-view intelligent pixelation demonstrator"
            />
            {/* Interactive Split Slider Control */}
            <input
              type="range"
              min="5"
              max="95"
              value={splitPos}
              onChange={(e) => setSplitPos(Number(e.target.value))}
              className="absolute inset-0 h-full w-full opacity-0 cursor-ew-resize"
              aria-label="Comparison split slider"
            />
            <div className="pointer-events-none absolute bottom-3 left-3 rounded bg-bg-primary/80 px-2 py-1 font-mono text-[10px] text-text-muted backdrop-blur">
              Standard
            </div>
            <div className="pointer-events-none absolute bottom-3 right-3 rounded bg-bg-primary/80 px-2 py-1 font-mono text-[10px] text-accent-cyan backdrop-blur">
              Intelligent
            </div>
          </div>

          <p className="text-xs leading-relaxed text-text-muted">
            This browser-based demonstrator simulates adaptive block-size pixelation informed by feature density maps. No quantum hardware is connected — this is a visual research concept.
          </p>
        </div>
      </div>
    </Section>
  );
}

