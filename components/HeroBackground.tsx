"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const VIDEO_SRC = "/beglow-architectural-lighting-animated.mp4";
const POSTER_SRC = "/beglow-architectural-lighting.png";
/** 20% slower than normal speed */
const PLAYBACK_RATE = 0.8;
/** Pause between each loop */
const LOOP_GAP_MS = 5000;

export function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const gapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = PLAYBACK_RATE;

    const scheduleReplay = () => {
      if (gapTimerRef.current) clearTimeout(gapTimerRef.current);
      gapTimerRef.current = setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, LOOP_GAP_MS);
    };

    const onEnded = () => scheduleReplay();

    video.addEventListener("ended", onEnded);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("ended", onEnded);
      if (gapTimerRef.current) clearTimeout(gapTimerRef.current);
    };
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-graphite">
      {reduceMotion ? (
        <Image
          src={POSTER_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover object-center brightness-[1.6]"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.6]"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          aria-hidden
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-carbon/75 to-carbon/25"
        aria-hidden
      />
    </div>
  );
}
