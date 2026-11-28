"use client";

import { useEffect, useState } from "react";

type ThemePreference = "light" | "dark" | "system";

const ORDER: ThemePreference[] = ["system", "light", "dark"];

function getPreference(): ThemePreference {
  const value = window.localStorage.getItem("naffeez-theme");
  return value === "light" || value === "dark" ? value : "system";
}

function applyTheme(preference: ThemePreference) {
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = preference === "system" ? (systemDark ? "dark" : "light") : preference;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePreference = preference;
  window.localStorage.setItem("naffeez-theme", preference);
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    let active = true;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (getPreference() === "system") applyTheme("system");
    };

    async function hydratePreference() {
      await Promise.resolve();
      if (!active) return;
      const initial = getPreference();
      setPreference(initial);
      applyTheme(initial);
    }

    void hydratePreference();
    media.addEventListener("change", onSystemChange);
    return () => {
      active = false;
      media.removeEventListener("change", onSystemChange);
    };
  }, []);

  function cycleTheme() {
    const current = getPreference();
    const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
    setPreference(next);
    applyTheme(next);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={cycleTheme}
      aria-label={"Theme preference: " + preference + ". Activate to change theme."}
      title={"Theme: " + preference}
    >
      <span aria-hidden="true">{preference === "dark" ? "◐" : preference === "light" ? "☼" : "◑"}</span>
      <span className="theme-toggle__label">{preference}</span>
    </button>
  );
}