import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Qaankunka — Quantum + AI + Agents for Images and Video";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#050508",
          padding: "60px 80px",
          fontFamily: "monospace",
        }}
      >
        {/* Subtle grid pattern background simulation */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(34, 211, 238, 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top telemetry banner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#22d3ee",
            fontSize: "20px",
            letterSpacing: "0.2em",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 500 500" fill="none">
            <path
              d="M 248.5 70 C 278 70, 310 88, 351 154 L 435 290 C 453 320, 452 346, 432 378 L 374 470 C 356 498, 328 510, 290 510 L 142 510 C 106 510, 84 494, 68 464 L 38 410 C 22 380, 24 354, 46 320 L 112 216 C 134 182, 160 148, 194 104 C 214 78, 230 70, 248.5 70 Z"
              fill="#FFFFFF"
            />
            <path
              d="M 188 178 C 168 182, 156 196, 160 216 C 164 236, 180 262, 206 304 L 282 426 C 300 456, 316 470, 332 466 C 346 462, 344 446, 328 420 L 242 284 C 224 254, 208 230, 204 212 C 200 194, 206 182, 222 176 Z"
              fill="#050508"
            />
            <path
              d="M 314 136 L 404 282 C 424 314, 428 334, 412 354 C 396 374, 372 372, 348 334 L 262 196 C 246 170, 246 150, 264 136 C 280 124, 298 124, 314 136 Z"
              fill="#050508"
            />
          </svg>
          QAANKUNKA / VISUAL INTELLIGENCE
        </div>

        {/* Main Title & Subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#f0f0f5",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Quantum + AI + Agents.
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 400,
              color: "#22d3ee",
              lineHeight: 1.2,
            }}
          >
            Intelligence for Images and Video.
          </div>
        </div>

        {/* Footer badges */}
        <div style={{ display: "flex", gap: "24px", color: "#a0a0b8", fontSize: "16px" }}>
          <div style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #1a1a28", backgroundColor: "#0a0a12" }}>
            QML & Optimization
          </div>
          <div style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #1a1a28", backgroundColor: "#0a0a12" }}>
            Agentic Orchestration
          </div>
          <div style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #1a1a28", backgroundColor: "#0a0a12" }}>
            Image + Video Research
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
