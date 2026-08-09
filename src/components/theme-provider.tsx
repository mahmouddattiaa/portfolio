"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ThemePreference } from "@/lib/content";

type ThemeContextValue = { theme: ThemePreference; setTheme: (theme: ThemePreference) => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: ThemePreference) {
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = theme === "system" ? (systemDark ? "dark" : "light") : theme;
  document.documentElement.style.colorScheme = document.documentElement.dataset.theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>(() => {
    if (typeof window === "undefined") return "system";
    const saved = window.localStorage.getItem("kepler-theme") as ThemePreference | null;
    return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
  });

  useEffect(() => {
    applyTheme(theme);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => theme === "system" && applyTheme("system");
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [theme]);

  const setTheme = (next: ThemePreference) => {
    setThemeState(next);
    applyTheme(next);
    try { window.localStorage.setItem("kepler-theme", next); } catch { /* storage is optional */ }
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
