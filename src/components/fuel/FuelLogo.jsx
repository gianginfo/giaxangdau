import React from "react";

const SIZES = {
  sm: { svg: 28, title: "text-base", tagline: "text-[9px]" },
  md: { svg: 40, title: "text-xl", tagline: "text-[10px]" },
  lg: { svg: 64, title: "text-3xl md:text-4xl", tagline: "text-xs md:text-sm" },
};

export default function FuelLogo({ size = "md" }) {
  const s = SIZES[size];
  return (
    <div className="flex items-center gap-2 md:gap-3 select-none">
      <svg
        width={s.svg}
        height={s.svg * (56 / 48)}
        viewBox="0 0 48 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="fuelTopGrad" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#2de5c8" />
            <stop offset="1" stopColor="#30ccdd" />
          </linearGradient>
          <linearGradient id="fuelMidGrad" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#84e530" />
            <stop offset="1" stopColor="#2de5c8" />
          </linearGradient>
        </defs>
        {/* Stem */}
        <rect x="2" y="2" width="12" height="52" rx="6" fill="#84e530" />
        {/* Top bar */}
        <rect x="2" y="2" width="34" height="12" rx="6" fill="url(#fuelTopGrad)" />
        {/* Middle bar */}
        <rect x="2" y="22" width="24" height="12" rx="6" fill="url(#fuelMidGrad)" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold tracking-tight text-parchment ${s.title}`}>
          uel<span className="text-concrete">.vn</span>
        </span>
        <span className={`font-body tracking-[0.1em] uppercase text-concrete mt-1 ${s.tagline}`}>
          Fuel Logistics Services
        </span>
      </div>
    </div>
  );
}