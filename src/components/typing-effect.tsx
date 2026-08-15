"use client";

import { useEffect, useState } from "react";

export function useTypingEffect(
  phrases: readonly string[],
  typeSpeed = 55,
  deleteSpeed = 30,
  pauseTime = 1800
) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseTime);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, 120);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex, phrases, typeSpeed, deleteSpeed, pauseTime]);

  return text;
}
