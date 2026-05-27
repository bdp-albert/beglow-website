"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { designProjects, type DesignProject } from "@/lib/design-portfolio";
import { ProjectImageCarousel } from "@/components/ProjectImageCarousel";

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectFrame({
  project,
  index,
  reduceMotion
}: {
  project: DesignProject;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.figure
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.85, ease, delay: index === 0 ? 0 : 0.04 }}
    >
      <ProjectImageCarousel
        images={project.images}
        alt={`${project.title}, ${project.location} — architectural lighting`}
        priority={index === 0}
      />

      <figcaption className="mt-5 flex items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
        <div>
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.38em] text-pearl/45">
            {project.location}
          </p>
          <p className="mt-2 font-display text-xl font-extralight tracking-[0.02em] text-pearl md:text-2xl">
            {project.title}
          </p>
        </div>
        <span className="text-[0.55rem] uppercase tracking-[0.32em] text-pearl/25">
          {String(index + 1).padStart(2, "0")}
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function DesignPortfolioGallery() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="bg-carbon">
      <div className="section-shell space-y-14 py-12 md:space-y-20 md:py-16">
        {designProjects.map((project, index) => (
          <ProjectFrame
            key={project.slug}
            project={project}
            index={index}
            reduceMotion={!!reduceMotion}
          />
        ))}
      </div>

      <footer className="border-t border-white/[0.05] py-14 md:py-16">
        <div className="section-shell flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xs text-[0.65rem] uppercase tracking-[0.28em] text-pearl/30">
            Selected commissions · Middle East &amp; Asia
          </p>
          <Link
            href="/design/process"
            className="inline-flex items-center gap-2 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-pearl/45 transition hover:text-brand"
          >
            Process
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
