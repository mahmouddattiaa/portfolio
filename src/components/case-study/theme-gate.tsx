"use client";

import { useEffect } from "react";

export function ThemeGate() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const override = params.get("theme");
    if (override === "light" || override === "dark") {
      document.documentElement.dataset.theme = override;
      document.documentElement.style.colorScheme = override;
      try {
        window.localStorage.setItem("kepler-theme", override);
      } catch {
        // ignore
      }
    }
  }, []);
  return null;
}
