"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LuChevronLeft, LuChevronRight, LuZoomIn } from "react-icons/lu";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/lib/images";

type GalleryProps = {
  images: ProjectImage[];
};

export function Gallery({ images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  const active = images[activeIndex];
  const prev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

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
            <DialogContent className="w-[min(92vw,1200px)] max-w-none border-none bg-transparent p-0 shadow-none">
              {/* Clicking the backdrop closes; clicking the image area is inert */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative"
                role="presentation"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-black/90">
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
                        sizes="92vw"
                        className="object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
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

                <div className="mt-3 flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center gap-1.5">
                    {images.map((img, i) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => setActiveIndex(i)}
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
                  <span className="font-mono text-[11px] tracking-wider text-white/70">
                    {activeIndex + 1} / {images.length}
                  </span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
