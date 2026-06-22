import React from "react";

const SIZES = {
  sm: { svg: 28, title: "text-base", tagline: "text-[9px]" },
  md: { svg: 40, title: "text-xl", tagline: "text-[10px]" },
  lg: { svg: 64, title: "text-3xl md:text-4xl", tagline: "text-xs md:text-sm" }
};

export default function FuelLogo({ size = "md" }) {
  const s = SIZES[size];
  return (
    <div className="flex items-center gap-2 md:gap-3 select-none">
      























      
      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold tracking-tight text-parchment ${s.title}`}>
          uel<span className="text-concrete">.vn</span>
        </span>
        

        
      </div>
    </div>);

}