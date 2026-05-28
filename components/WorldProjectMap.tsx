"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { worldMapPins, type WorldMapPin } from "@/lib/world-map-projects";

type LandDotsData = {
  width: number;
  height: number;
  dots: [number, number][];
};

const PROJECT_COLOR = "#ef1016";
const LAND_DOT_COLOR = "rgba(244, 240, 230, 0.42)";
const HIT_RADIUS = 14;

function projectPoint(
  lat: number,
  lng: number,
  width: number,
  height: number
): [number, number] {
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return [x, y];
}

function findNearestPin(
  pins: WorldMapPin[],
  px: number,
  py: number,
  width: number,
  height: number
): WorldMapPin | null {
  let best: WorldMapPin | null = null;
  let bestDist = HIT_RADIUS * HIT_RADIUS;

  for (const pin of pins) {
    const [x, y] = projectPoint(pin.lat, pin.lng, width, height);
    const dx = x - px;
    const dy = y - py;
    const d2 = dx * dx + dy * dy;
    if (d2 < bestDist) {
      bestDist = d2;
      best = pin;
    }
  }

  return best;
}

export function WorldProjectMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const landRef = useRef<LandDotsData | null>(null);
  const [active, setActive] = useState<WorldMapPin | null>(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const land = landRef.current;
    if (!canvas || !wrap || !land) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = wrap.clientWidth;
    const cssH = Math.round(cssW * (land.height / land.width));
    const w = Math.floor(cssW * dpr);
    const h = Math.floor(cssH * dpr);

    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, cssW, cssH);

    const dotR = Math.max(1.1, cssW / land.width / 5.5);

    ctx.fillStyle = LAND_DOT_COLOR;
    for (const [nx, ny] of land.dots) {
      const x = nx * cssW;
      const y = ny * cssH;
      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const pin of worldMapPins) {
      const [x, y] = projectPoint(pin.lat, pin.lng, cssW, cssH);
      const isActive = active?.id === pin.id;
      const multi = pin.projects.length > 1;
      const r = isActive ? 3.25 : multi ? 2.75 : 2.25;

      ctx.beginPath();
      ctx.arc(x, y, r + 1.25, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? "rgba(239,16,22,0.32)" : "rgba(239,16,22,0.1)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = PROJECT_COLOR;
      ctx.fill();
    }
  }, [active]);

  useEffect(() => {
    let cancelled = false;

    fetch("/world-map/land-dots.json")
      .then((r) => r.json())
      .then((data: LandDotsData) => {
        if (cancelled) return;
        landRef.current = data;
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    draw();

    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ready, draw]);

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const land = landRef.current;
    if (!canvas || !land) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const hit = findNearestPin(worldMapPins, x, y, rect.width, rect.height);

    setActive(hit);
    setTooltip({ x: e.clientX, y: e.clientY });
    canvas.style.cursor = hit ? "pointer" : "default";
  };

  const onPointerLeave = () => {
    setActive(null);
    if (canvasRef.current) canvasRef.current.style.cursor = "default";
  };

  return (
    <section className="border-t border-white/[0.06] bg-carbon py-14 md:py-20">
      <div className="section-shell">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.38em] text-brand">
          Global reach
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-2xl font-extralight tracking-[-0.02em] text-pearl md:text-3xl">
          Projects across regions
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-pearl/50 md:text-base md:leading-8">
          Hover a red dot for project name, type, and year. Dense regions show
          multiple projects on one pin.
        </p>

        <div
          ref={wrapRef}
          className="relative mt-10 w-full overflow-hidden border border-white/[0.08] bg-[#050505]"
        >
          <canvas
            ref={canvasRef}
            className="block w-full touch-none"
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            aria-label="Interactive world map of Beglow projects"
            role="img"
          />
          {!ready ? (
            <div className="absolute inset-0 flex items-center justify-center bg-carbon text-[0.65rem] uppercase tracking-[0.28em] text-pearl/30">
              Loading map…
            </div>
          ) : null}
        </div>

        {active ? (
          <div
            className="pointer-events-none fixed z-[70] -translate-x-1/2 -translate-y-full"
            style={{ left: tooltip.x, top: tooltip.y - 12 }}
          >
            <div className="max-h-[min(70vh,22rem)] overflow-y-auto border border-white/10 bg-[#1a1a1a]/95 text-left shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-sm">
              <p className="border-b border-white/[0.06] px-4 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-brand">
                {active.region}
                {active.projects.length > 1
                  ? ` · ${active.projects.length} projects`
                  : null}
              </p>
              <ul className="divide-y divide-white/[0.06]">
                {active.projects.map((project) => (
                  <li key={`${project.name}-${project.year}`} className="px-4 py-3">
                    <p className="font-display text-sm font-extralight leading-snug text-pearl">
                      {project.name}
                    </p>
                    <p className="mt-1.5 text-[0.65rem] leading-relaxed text-pearl/50">
                      <span className="text-pearl/65">{project.category}</span>
                      <span className="mx-2 text-pearl/25">·</span>
                      <span>{project.year}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
