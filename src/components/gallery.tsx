"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  LuChevronLeft,
  LuChevronRight,
  LuZoomIn,
  LuPlus,
  LuMinus,
  LuRotateCcw,
} from "react-icons/lu";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/lib/images";

const MIN_SCALE = 1;
const MAX_SCALE = 4;

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

type GalleryProps = {
  images: ProjectImage[];
};

export function Gallery({ images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scaleState, setScaleState] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    panX: number;
    panY: number;
    moved: boolean;
  } | null>(null);
  const lastTapRef = useRef(0);

  // Motion values drive transforms so panning stays 1:1 with the pointer;
  // springs smooth out wheel-zoom steps.
  const scaleMV = useMotionValue(1);
  const xMV = useMotionValue(0);
  const yMV = useMotionValue(0);
  const springScale = useSpring(scaleMV, { stiffness: 320, damping: 30 });
  const springX = useSpring(xMV, { stiffness: 500, damping: 50 });
  const springY = useSpring(yMV, { stiffness: 500, damping: 50 });

  if (images.length === 0) return null;

  const active = images[activeIndex];

  const resetZoom = () => {
    scaleMV.set(1);
    xMV.set(0);
    yMV.set(0);
    setScaleState(1);
  };

  const prev = () => {
    resetZoom();
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = () => {
    resetZoom();
    setActiveIndex((i) => (i + 1) % images.length);
  };

  const applyZoom = (nextScale: number, cx = 0, cy = 0) => {
    const s = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    const current = scaleMV.get();
    if (s === current) return;
    const ratio = s / current;
    // Keep the point under the cursor fixed while scaling
    const nx = cx - (cx - xMV.get()) * ratio;
    const ny = cy - (cy - yMV.get()) * ratio;
    const rect = containerRef.current?.getBoundingClientRect();
    const boundX = rect ? (rect.width * (s - 1)) / 2 : 0;
    const boundY = rect ? (rect.height * (s - 1)) / 2 : 0;
    xMV.set(clamp(nx, -boundX, boundX));
    yMV.set(clamp(ny, -boundY, boundY));
    scaleMV.set(s);
    setScaleState(s);
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    const factor = e.deltaY < 0 ? 1.25 : 0.8;
    applyZoom(scaleMV.get() * factor, cx, cy);
    e.preventDefault();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: xMV.get(),
      panY: yMV.get(),
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    if (scaleMV.get() <= 1) return;
    const rect = containerRef.current?.getBoundingClientRect();
    const boundX = rect ? (rect.width * (scaleMV.get() - 1)) / 2 : 0;
    const boundY = rect ? (rect.height * (scaleMV.get() - 1)) / 2 : 0;
    xMV.set(clamp(d.panX + dx, -boundX, boundX));
    yMV.set(clamp(d.panY + dy, -boundY, boundY));
  };

  const zoomed = scaleState > 1;

  return (
    <div>
      <h3 className="mb-2 font-serif text-2xl font-medium">
        Screenshots{" "}
        <span className="font-mono text-sm text-muted-foreground">
          ({images.length})
        </span>
      </h3>
      <p className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {"// Click to view full size"}
      </p>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <Dialog key={img.src}>
            <DialogTrigger asChild>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group relative block aspect-[16/10] overflow-hidden rounded-md border border-border/70 transition-all hover:border-primary/50"
                aria-label={`Open screenshot ${i + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                  <LuZoomIn className="size-5 text-white" />
                </div>
              </button>
            </DialogTrigger>

            <DialogContent
              className="w-auto max-w-none border-none bg-transparent p-0 shadow-none"
              style={{ width: "min(90vw, calc(90dvh * 1.6))", maxWidth: "none" }}
            >
              {/* Clicking the backdrop closes; clicking the image area is inert */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative"
                role="presentation"
              >
                {/* Hint — sits above the image so it never overlaps it */}
                <div className="mb-2 flex h-4 items-center justify-center">
                  {!zoomed && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">
                      click to zoom · scroll to zoom in
                    </span>
                  )}
                </div>

                <div className="relative">
                <div
                  ref={containerRef}
                  onWheel={onWheel}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={() => {
                    const d = dragRef.current;
                    dragRef.current = null;
                    if (!d || d.moved) return;
                    // Tap / click (no drag): toggle zoom. Double-tap zooms deeper.
                    const now = Date.now();
                    const isDouble = now - lastTapRef.current < 300;
                    lastTapRef.current = now;
                    const s = scaleMV.get();
                    if (isDouble) applyZoom(s > 1 ? 1 : 2.5);
                    else applyZoom(s > 1 ? 1 : 2);
                  }}
                  onPointerCancel={() => {
                    const d = dragRef.current;
                    dragRef.current = null;
                    if (!d || d.moved) return;
                    const now = Date.now();
                    const isDouble = now - lastTapRef.current < 300;
                    lastTapRef.current = now;
                    const s = scaleMV.get();
                    if (isDouble) applyZoom(s > 1 ? 1 : 2.5);
                    else applyZoom(s > 1 ? 1 : 2);
                  }}
                  className={cn(
                    "relative aspect-[16/10] w-full touch-none overflow-hidden rounded-md bg-black/90 select-none",
                    zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                  )}
                  title={zoomed ? "Drag to pan · scroll to zoom" : "Click to zoom"}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ x: springX, y: springY, scale: springScale }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active.src}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={active.src}
                          alt={active.alt}
                          fill
                          sizes="90vw"
                          className="object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Nav buttons */}
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous screenshot"
                  className="absolute top-1/2 left-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80"
                >
                  <LuChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next screenshot"
                  className="absolute top-1/2 right-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80"
                >
                  <LuChevronRight className="size-5" />
                </button>
                </div>

                {/* Bottom bar: dots + counter + zoom controls */}
                <div className="mt-3 flex flex-col items-center gap-2.5">
                  <div className="flex items-center justify-center gap-1.5">
                    {images.map((img, i) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => {
                          resetZoom();
                          setActiveIndex(i);
                        }}
                        aria-label={`Go to screenshot ${i + 1}`}
                        className={cn(
                          "size-2 rounded-full transition-all",
                          i === activeIndex
                            ? "w-6 bg-primary"
                            : "bg-white/40 hover:bg-white/70"
                        )}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] tracking-wider text-white/70">
                      {activeIndex + 1} / {images.length}
                    </span>
                    <span className="h-3 w-px bg-white/20" aria-hidden />
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => applyZoom(scaleMV.get() - 0.5)}
                        disabled={!zoomed}
                        aria-label="Zoom out"
                        className="flex size-7 items-center justify-center rounded-md border border-white/20 bg-white/5 text-white/80 transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <LuMinus className="size-3.5" />
                      </button>
                      <span className="w-11 text-center font-mono text-[11px] tabular-nums text-white/80">
                        {Math.round(scaleState * 100)}%
                      </span>
                      <button
                        type="button"
                        onClick={() => applyZoom(scaleMV.get() + 0.5)}
                        disabled={scaleState >= MAX_SCALE}
                        aria-label="Zoom in"
                        className="flex size-7 items-center justify-center rounded-md border border-white/20 bg-white/5 text-white/80 transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <LuPlus className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => applyZoom(1)}
                        disabled={!zoomed}
                        aria-label="Reset zoom"
                        className="flex size-7 items-center justify-center rounded-md border border-white/20 bg-white/5 text-white/80 transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <LuRotateCcw className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
