import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const LOGO_URL =
  "https://media.base44.com/images/public/6a396806623dcf432fdadf94/ce4838d6e_fuelvn-removebg-preview.png";

export default function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg-80)] backdrop-blur-md border-b border-card">
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-[8vw] h-20 md:h-24">
        <a href="https://fuel.vn" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
          <img
            src={LOGO_URL}
            alt="fuel.vn — Fuel Logistics Services"
            className="h-12 md:h-16 w-auto object-contain"
            style={theme === "dark" ? { filter: "brightness(1.8) saturate(1.15)" } : undefined}
          />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a href="https://fuel.vn" className="text-parchment text-sm font-body hover:text-lime transition-colors">Trang chủ</a>
          <a href="https://fuel.vn/about" className="text-parchment text-sm font-body hover:text-lime transition-colors">Giới thiệu</a>
          <a href="https://fuel.vn/gia-xang-dau/" className="text-parchment text-sm font-body hover:text-lime transition-colors">Giá xăng dầu</a>
          <a href="https://fuel.vn/Platts/" className="text-parchment text-sm font-body hover:text-lime transition-colors">Giá Platt's Singapore</a>
          <a href="https://fuel.vn/contact" className="text-parchment text-sm font-body hover:text-lime transition-colors">Liên hệ</a>
        </nav>
        <button
          onClick={toggle}
          aria-label="Chuyển chế độ sáng/tối"
          className="flex items-center gap-2 bg-card border border-card rounded-sm px-3 py-2 hover:border-lime-30 transition-all duration-300 group"
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
      </div>
    </header>
  );
}