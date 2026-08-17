"use client";

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  /** e.g. "5", "2+", "3+" — leading number animates, suffix is preserved */
  value: string;
};

export function StatCounter({ value }: StatCounterProps) {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number;
    let observer: IntersectionObserver | undefined;

    const run = () => {
      const duration = 1100;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplay(Math.round(eased * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // Create the observer inside useEffect so it only exists after mount.
    // If IntersectionObserver is unavailable, animate immediately.
    if (typeof IntersectionObserver === "undefined") {
      run();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              run();
              observer?.disconnect();
            }
          });
        },
        { rootMargin: "-40px" }
      );
      observer.observe(el);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
