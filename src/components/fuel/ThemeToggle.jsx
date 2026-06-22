import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Chuyển chế độ sáng/tối"
      className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-card border border-card rounded-sm px-3 py-2 hover:border-lime-30 transition-all duration-300 group"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-lime group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-lime group-hover:-rotate-12 transition-transform duration-300" />
      )}
      <span className="text-concrete text-[11px] uppercase tracking-[0.15em] font-body hidden sm:inline">
        {theme === "dark" ? "Sáng" : "Tối"}
      </span>
    </button>
  );
}