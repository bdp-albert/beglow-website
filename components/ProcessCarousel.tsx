"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const steps = [
  {
    step: "01",
    title: "Acquisition",
    detail: [
      "We begin with structured conversations and document review—project brief, programme, stakeholders, and any existing drawings or brand guidelines. The aim is to agree what success looks like before design hours are committed.",
      "Early alignment on budget bands, key milestones, and approval paths helps avoid surprises later. Where useful, we note integration points with architecture, interiors, landscape, and MEP so lighting sits in the wider project story from day one."
    ],
    image: "/design/process/step-01.png"
  },
  {
    step: "02",
    title: "Predesign",
    detail: [
      "This phase turns the brief into measurable criteria: daylight and glare risk, ceiling and void conditions, power and control routes, maintenance access, and any planning or code constraints that will shape the scheme.",
      "Benchmarking and feasibility studies narrow viable strategies before concept visuals begin. Typical outputs include a predesign summary, preliminary load assumptions, and a shared risk register the whole team can reference."
    ],
    image: "/design/process/step-02.png"
  },
  {
    step: "03",
    title: "Conceptual design",
    detail: [
      "Mood references, sketch schemes, and simple calculations explain how light will feel in space—what is bright, what stays dark, and which architectural or landscape features become focal points.",
      "Reviews centre on experience and narrative rather than fixture counts. Agreed intent at this stage gives schematic and technical work a clear direction and reduces debate during documentation."
    ],
    image: "/design/process/step-03.png"
  },
  {
    step: "04",
    title: "Schematic design",
    detail: [
      "Layered drawings show luminaire families, mounting heights, aiming logic, and control groupings coordinated with reflected ceiling layouts and interior design.",
      "We resolve clashes with structure, HVAC, joinery, and façades while keeping the concept readable. This stage establishes the backbone for specifications, quantities, and contractor coordination."
    ],
    image: "/design/process/step-04.png"
  },
  {
    step: "05",
    title: "Technical spec proposal",
    detail: [
      "Fixture schedules, photometric notes, driver and dimming requirements, and interface details are compiled into documentation suitable for pricing and procurement.",
      "Specifications are checked against performance targets, warranty expectations, and supply realities in the project region. A coordinated cost view helps the client compare options before packages are issued to market."
    ],
    image: "/design/process/step-05.png"
  },
  {
    step: "06",
    title: "Tender",
    detail: [
      "We support tender issue, bidder queries, and compliance reviews so submissions remain comparable and aligned with the design intent.",
      "Substitution requests are assessed for equivalence, standards compliance, and impact on atmosphere and budget. The process stays transparent and auditable for client teams and successful contractors alike."
    ],
    image: "/design/process/step-06.png"
  },
  {
    step: "07",
    title: "Site supervision",
    detail: [
      "During installation and commissioning we verify aiming, scenes, and dimming behaviour against approved drawings and mock-ups agreed earlier in the project.",
      "Snag lists and sample sign-offs catch issues while ceilings and access are still available. Handover includes practical records and guidance so facilities teams can maintain the scheme with confidence."
    ],
    image: "/design/process/step-07.png"
  }
] as const;

/** Process images are 682×1024 (2:3). Size by height only so aspect stays exact — no letterbox. */
const frameClassName =
  "relative aspect-[2/3] h-[min(72vh,580px)] w-auto shrink-0";

const swipeThreshold = 72;

const textEase = [0.22, 1, 0.36, 1] as const;

export function ProcessCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [broken, setBroken] = useState<Record<number, true>>({});

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
    if (index < steps.length - 1) goTo(index + 1);
  }, [index, goTo]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -swipeThreshold || info.velocity.x < -400) {
      goNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 400) {
      goPrev();
    }
  };

  const current = steps[index];

  return (
    <div className="select-none" dir="ltr">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-x-12 lg:gap-x-16 xl:gap-x-20">
        {/* Left — step carousel */}
        <div className="order-1 md:col-start-1 md:row-start-1">
          <div className="mb-6 flex items-center justify-between gap-4 md:mb-8">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-pearl/40">
              Step {current.step} / 07
            </p>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-pearl/28">
              Drag or swipe
            </p>
          </div>

          <div className="relative mx-auto w-fit shrink-0 px-12 sm:px-14 md:mx-0">
            <div className="w-fit overflow-hidden border border-white/[0.08]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.article
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction >= 0 ? 48 : -48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction >= 0 ? -48 : 48 }}
                  transition={{ duration: 0.4, ease: textEase }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={onDragEnd}
                  className="cursor-grab touch-pan-y active:cursor-grabbing"
                >
                  <div className={frameClassName}>
                    {broken[index] ? (
                      <ImagePlaceholder
                        label={`Step ${current.step}`}
                        fill
                      />
                    ) : (
                      <Image
                        src={current.image}
                        alt={`${current.title} — Beglow lighting design process`}
                        fill
                        sizes="(max-width: 1024px) 320px, 400px"
                        quality={95}
                        className="object-contain object-center"
                        priority={index === 0}
                        onError={() =>
                          setBroken((prev) => ({ ...prev, [index]: true }))
                        }
                      />
                    )}
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              aria-label="Previous step"
              className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/10 bg-carbon/80 text-pearl transition enabled:hover:border-brand/50 enabled:hover:text-brand disabled:opacity-25"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={index === steps.length - 1}
              aria-label="Next step"
              className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/10 bg-carbon/80 text-pearl transition enabled:hover:border-brand/50 enabled:hover:text-brand disabled:opacity-25"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 md:justify-start">
            {steps.map((step, i) => (
              <button
                key={step.step}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to step ${step.step}: ${step.title}`}
                aria-current={i === index ? "step" : undefined}
                className={`h-1.5 transition-all ${
                  i === index
                    ? "w-8 bg-brand"
                    : "w-1.5 bg-pearl/25 hover:bg-pearl/45"
                }`}
              />
            ))}
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start md:gap-3">
            {steps.map((step, i) => (
              <button
                key={step.step}
                type="button"
                onClick={() => goTo(i)}
                className={`px-2 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] transition ${
                  i === index
                    ? "text-brand"
                    : "text-pearl/30 hover:text-pearl/55"
                }`}
              >
                {step.step}
              </button>
            ))}
          </div>
        </div>

        {/* Right — detailed notes */}
        <div className="order-2 flex min-w-0 flex-col justify-center md:col-start-2 md:row-start-1 md:pt-12 lg:max-w-xl xl:max-w-2xl">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -24 : 24 }}
              transition={{ duration: 0.4, ease: textEase }}
              className="text-center md:text-left"
            >
              <p className="font-display text-5xl font-extralight leading-none text-brand md:text-6xl">
                {current.step}
              </p>
              <h2 className="mt-4 font-display text-2xl font-extralight uppercase tracking-[0.04em] text-pearl md:text-3xl">
                {current.title}
              </h2>
              <div className="mt-6 space-y-5">
                {current.detail.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base leading-8 text-pearl/55 md:text-[1.05rem] md:leading-[1.85]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="mt-8 text-[0.65rem] uppercase tracking-[0.22em] text-pearl/30">
                Phase {index + 1} of 7
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
