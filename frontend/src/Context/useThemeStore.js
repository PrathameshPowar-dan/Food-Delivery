import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "default",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },
}));