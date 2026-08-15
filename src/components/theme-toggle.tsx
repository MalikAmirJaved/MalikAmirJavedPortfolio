"use client";

import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const toggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggle}
      className="rounded-full"
    >
      <LuSun className="size-5 text-amber-300 dark:hidden" />
      <LuMoon className="size-5 hidden text-slate-500 dark:block" />
    </Button>
  );
}
