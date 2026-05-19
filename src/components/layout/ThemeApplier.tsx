"use client";

import { useEffect } from "react";
import { getDayTheme } from "@/lib/getDayTheme";

export function ThemeApplier() {
  useEffect(() => {
    const html = document.documentElement;

    function apply() {
      const next = getDayTheme(new Date().getHours());
      if (html.dataset.theme !== next) {
        html.dataset.theme = next;
      }
    }

    apply();
    const id = setInterval(apply, 60_000);
    return () => clearInterval(id);
  }, []);
  return null;
}
