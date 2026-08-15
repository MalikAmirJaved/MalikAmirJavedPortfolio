"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type StatCounterProps = {
  /** e.g. "5", "2+", "3+" — leading number animates, suffix is preserved */
  value: string;
};

export function StatCounter({ value }: StatCounterProps) {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1100;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
