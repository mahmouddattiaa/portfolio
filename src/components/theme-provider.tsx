"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import type { ThemePreference } from "@/lib/content";

type ThemeContextValue = { theme: ThemePreference; setTheme: (theme: ThemePreference) => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);
const listeners = new Set<() => void>();
let inMemoryTheme: ThemePreference | undefined;

function getThemeSnapshot(): ThemePreference {
  if (inMemoryTheme) return inMemoryTheme;
  try { return window.localStorage.getItem("kepler-theme") === "dark" ? "dark" : "light"; } catch { return "light"; }
}

function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === "kepler-theme" || event.key === null) {
      inMemoryTheme = event.key === "kepler-theme" && event.newValue === "dark"
        ? "dark"
        : event.key === "kepler-theme" && event.newValue === "light"
          ? "light"
          : undefined;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function notifyThemeChange() {
  for (const listener of listeners) listener();
}

function getServerThemeSnapshot(): ThemePreference {
  return "light";
}

function applyTheme(theme: ThemePreference) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = document.documentElement.dataset.theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const setTheme = useCallback((next: ThemePreference) => {
    inMemoryTheme = next;
    applyTheme(next);
    try { window.localStorage.setItem("kepler-theme", next); } catch { /* storage is optional */ }
    notifyThemeChange();
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
