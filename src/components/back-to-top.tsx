"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowUp } from "react-icons/lu";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.25 }}
          className="fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full border border-border/70 bg-primary text-primary-foreground shadow-[3px_3px_0_0_var(--hard-shadow)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_var(--hard-shadow)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none sm:right-8 sm:bottom-8"
        >
          <LuArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
