"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLockup } from "@/components/BrandLockup";

const PLAY_MS = 3000;
const EXIT_MS = 900;

type IntroStatus = "playing" | "exiting" | "complete";

export function HomeIntroGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<IntroStatus>("playing");
  const [enabled, setEnabled] = useState(true);

  const finish = useCallback(() => {
    setStatus((current) => {
      if (current === "complete" || current === "exiting") return current;
      return "exiting";
    });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setEnabled(false);
      setStatus("complete");
      return;
    }

    setEnabled(true);
    setStatus("playing");
    const timer = window.setTimeout(finish, PLAY_MS);
    return () => window.clearTimeout(timer);
  }, [finish]);

  useEffect(() => {
    if (status !== "exiting") return;
    const timer = window.setTimeout(() => {
      setStatus("complete");
    }, EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    const lockScroll = enabled && status !== "complete";
    document.documentElement.style.overflow = lockScroll ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [enabled, status]);

  const showOverlay = enabled && (status === "playing" || status === "exiting");
  const showContent = !enabled || status === "exiting" || status === "complete";

  return (
    <>
      <AnimatePresence>
        {showOverlay ? (
          <motion.div
            key="home-intro"
            className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-carbon"
            onClick={() => status === "playing" && finish()}
            initial={{ opacity: 1 }}
            animate={{ opacity: status === "exiting" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden={status === "exiting"}
          >
            <motion.div
              className="section-shell flex w-full flex-col items-center px-6 text-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.2, delayChildren: 0.15 }
                }
              }}
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
                  }
                }}
                className="mb-8 text-[0.65rem] font-medium uppercase tracking-[0.44em] text-pearl/30"
              >
                Architectural lighting
              </motion.p>

              <motion.div
                className="flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] }
                  }
                }}
              >
                <BrandLockup
                  priority
                  logoClassName="w-[min(72vw,15rem)] sm:w-[17rem]"
                  sloganClassName="text-[0.62rem] sm:text-[0.7rem] tracking-[0.38em]"
                />
              </motion.div>

              <motion.div
                className="mt-14 h-px w-full max-w-sm origin-center bg-gradient-to-r from-transparent via-brand to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: 1.15,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!showContent}
      >
        {children}
      </motion.div>
    </>
  );
}
