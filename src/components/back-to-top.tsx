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
          className="fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-600 text-white shadow-lg shadow-cyan-500/25 transition-transform hover:scale-110 sm:right-8 sm:bottom-8"
        >
          <LuArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
