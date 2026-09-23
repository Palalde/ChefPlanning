import { useEffect, useSyncExternalStore } from "react";
import useLocalStorage from "./useLocalStorage";

type Theme = "light" | "dark" | "system";

// helper function to determine if the theme should be dark
function resolveIsDark(theme: Theme, systemPreference: boolean) {
  return theme === "dark" || (theme === "system" && systemPreference);
}

// helper function to subscribe to changes in the system's dark mode preference
function subscribeToSystemDarkMode(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = () => callback();
  mediaQuery.addEventListener("change", handleChange);
  return () => mediaQuery.removeEventListener("change", handleChange);
}

// helper function to get the current system dark mode preference
function getSystemDarkModeSnapshot(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// custom hook to track the system's dark mode preference using useSyncExternalStore
function useSystemDarkMode(): boolean {
  return useSyncExternalStore(
    subscribeToSystemDarkMode,
    getSystemDarkModeSnapshot,
  );
}

/**
 * Custom hook to manage theme (light, dark, system)
 * @returns { theme, isDark, setTheme, toggleTheme }
 * - theme: current theme
 * - isDark: boolean indicating if the current theme is dark
 * - setTheme: function to set the theme
 * - toggleTheme: function to toggle between light and dark mode
 */

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");

  const systemDarkMode = useSystemDarkMode();
  const isDark = resolveIsDark(theme, systemDarkMode);

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, isDark]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const currentlyDark = resolveIsDark(prev, systemDarkMode);
      return currentlyDark ? "light" : "dark";
    });
  };

  return { theme, isDark, setTheme, toggleTheme };
}
