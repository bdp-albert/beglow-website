"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const ease = [0.22, 1, 0.36, 1] as const;
const swipeThreshold = 72;

type ProjectImageCarouselProps = {
  images: string[];
  alt: string;
  priority?: boolean;
};

export function ProjectImageCarousel({
  images,
  alt,
  priority = false
}: ProjectImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [broken, setBroken] = useState<Record<number, true>>({});
  const reduceMotion = useReducedMotion();
  const hasMany = images.length > 1;

  if (!images.length) {
    return <ImagePlaceholder label="Project imagery" />;
  }

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index]
  );

  const goPrev = useCallback(() => {
    if (index > 0) goTo(index - 1);
  }, [index, goTo]);

  const goNext = useCallback(() => {
    if (index < images.length - 1) goTo(index + 1);
  }, [index, goTo, images.length]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (!hasMany) return;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -400) {
      goNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 400) {
      goPrev();
    }
  };

  const slideAlt =
    images.length > 1 ? `${alt} — image ${index + 1} of ${images.length}` : alt;

  return (
    <div className="relative">
      <div className="relative aspect-video w-full overflow-hidden bg-carbon">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            initial={
              reduceMotion ? false : { opacity: 0, x: direction >= 0 ? 56 : -56 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              reduceMotion ? undefined : { opacity: 0, x: direction >= 0 ? -56 : 56 }
            }
            transition={{ duration: 0.45, ease }}
            drag={hasMany ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={onDragEnd}
            className={
              hasMany
                ? "absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
                : "absolute inset-0"
            }
          >
            {broken[index] ? (
              <ImagePlaceholder label="Awaiting project assets" className="h-full" />
            ) : (
              <Image
                src={images[index]}
                alt={slideAlt}
                fill
                sizes="(max-width: 1240px) 100vw, 1240px"
                quality={92}
                priority={priority && index === 0}
                className="object-contain object-center"
                onError={() =>
                  setBroken((prev) => ({ ...prev, [index]: true }))
                }
              />
            )}
          </motion.div>
        </AnimatePresence>

        {hasMany && (
          <>
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/10 bg-carbon/75 text-pearl backdrop-blur-sm transition enabled:hover:border-brand/45 enabled:hover:text-brand disabled:opacity-20 md:left-4"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={index === images.length - 1}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/10 bg-carbon/75 text-pearl backdrop-blur-sm transition enabled:hover:border-brand/45 enabled:hover:text-brand disabled:opacity-20 md:right-4"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <p className="pointer-events-none absolute right-4 top-4 text-[0.55rem] uppercase tracking-[0.32em] text-pearl/35">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </p>
          </>
        )}
      </div>

      {hasMany && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-1 transition-all ${
                i === index
                  ? "w-6 bg-brand"
                  : "w-1 bg-pearl/25 hover:bg-pearl/45"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
