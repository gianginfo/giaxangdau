import React from "react";
import { motion } from "framer-motion";
import FuelIcon from "./FuelIcon";

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price);
}

export default function PriceCard({ item, index }) {
  const diff = item.price_zone_2 - item.price_zone_1;
  const isUp = diff > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative bg-card border border-card rounded-sm p-5 md:p-6 hover:border-lime-30 transition-all duration-500">
        {/* Index number */}
        <span className="absolute top-4 right-5 text-faint font-display font-black text-5xl md:text-6xl leading-none select-none">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Fuel type badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`flex items-center justify-center w-8 h-8 rounded-sm ${
            item.fuel_type === "gasoline" ? "bg-lime-10 text-lime" :
            item.fuel_type === "diesel" ? "bg-blue-500/10 text-blue-400" :
            "bg-orange-500/10 text-orange-400"
          }`}>
            <FuelIcon type={item.fuel_type} />
          </div>
          <span className="text-concrete text-xs uppercase tracking-[0.15em] font-body">
            {item.fuel_type === "gasoline" ? "Xăng" : item.fuel_type === "diesel" ? "Dầu Diesel" : "Dầu hỏa"}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-parchment font-display font-semibold text-base md:text-lg tracking-tight leading-tight mb-6 pr-12">
          {item.name}
        </h3>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-concrete text-[11px] uppercase tracking-[0.15em] font-body mb-1">Vùng 1</p>
            <p className="text-parchment font-display font-bold text-xl md:text-2xl tracking-tight">
              {formatPrice(item.price_zone_1)}
            </p>
            <p className="text-concrete text-[11px] mt-0.5">đ/lít</p>
          </div>
          <div>
            <p className="text-concrete text-[11px] uppercase tracking-[0.15em] font-body mb-1">Vùng 2</p>
            <p className="text-lime font-display font-bold text-xl md:text-2xl tracking-tight">
              {formatPrice(item.price_zone_2)}
            </p>
            <p className="text-concrete text-[11px] mt-0.5">đ/lít</p>
          </div>
        </div>

        {/* Diff indicator */}
        <div className="mt-4 pt-4 border-t border-card">
          <div className="flex items-center justify-between">
            <span className="text-concrete text-[11px] uppercase tracking-[0.12em]">Chênh lệch vùng</span>
            <span className={`font-display font-semibold text-sm ${isUp ? "text-lime" : "text-emerald-400"}`}>
              {isUp ? "+" : ""}{formatPrice(diff)} đ
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}