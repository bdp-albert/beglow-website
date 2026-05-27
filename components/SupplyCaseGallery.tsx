"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  moreSupplyProjects,
  supplyProjects,
  type SupplyProject
} from "@/lib/supply-portfolio";
import { ProjectImageCarousel } from "@/components/ProjectImageCarousel";

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectFrame({
  project,
  index,
  reduceMotion
}: {
  project: SupplyProject;
  index: number;
  reduceMotion: boolean;
}) {
  const alt = project.location
    ? `${project.title}, ${project.location} — lighting supply`
    : `${project.title} — lighting supply`;

  return (
    <motion.figure
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.85, ease, delay: index === 0 ? 0 : 0.04 }}
    >
      <ProjectImageCarousel
        images={project.images}
        alt={alt}
        priority={index === 0}
      />

      <figcaption className="mt-5 border-b border-white/[0.06] pb-8">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            {project.location ? (
              <p className="text-[0.6rem] font-medium uppercase tracking-[0.38em] text-pearl/45">
                {project.location}
              </p>
            ) : null}
            <p
              className={`font-display text-xl font-extralight tracking-[0.02em] text-pearl md:text-2xl ${
                project.location ? "mt-2" : ""
              }`}
            >
              {project.title}
            </p>
          </div>
          <span className="shrink-0 text-[0.55rem] uppercase tracking-[0.32em] text-pearl/25">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-pearl/50 md:text-[0.95rem] md:leading-8">
          {project.description}
        </p>
      </figcaption>
    </motion.figure>
  );
}

export function SupplyCaseGallery() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="bg-carbon">
      <div className="section-shell space-y-14 py-12 md:space-y-20 md:py-16">
        {supplyProjects.map((project, index) => (
          <ProjectFrame
            key={project.slug}
            project={project}
            index={index}
            reduceMotion={!!reduceMotion}
          />
        ))}

        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6% 0px" }}
          transition={{ duration: 0.85, ease }}
          className="border-t border-white/[0.06] pt-12 md:pt-16"
        >
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.38em] text-pearl/40">
            Other project list
          </p>
          <ol className="mt-8 divide-y divide-white/[0.06]">
            {moreSupplyProjects.map((item, i) => (
              <li
                key={item.name}
                className="flex flex-wrap items-baseline gap-x-3 py-4 text-sm md:text-base"
              >
                <span className="text-[0.55rem] uppercase tracking-[0.28em] text-pearl/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-extralight text-pearl md:text-xl">
                  {item.name}
                </span>
                <span className="text-pearl/45">{item.location}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm italic text-pearl/35 md:text-base">
            More to be found..
          </p>
        </motion.aside>
      </div>
    </div>
  );
}
