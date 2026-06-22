import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Loader2, AlertCircle, ArrowUpDown, X } from "lucide-react";
import PriceCard from "./PriceCard";

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price);
}

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function inferFuelType(title) {
  const t = title.toLowerCase();
  if (t.includes("dầu hỏa") || t.includes("dầu ko") || t.includes("hỏa")) return "kerosene";
  if (t.includes("do") || t.includes("diesel")) return "diesel";
  return "gasoline";
}

function mapApiItem(item, index) {
  return {
    id: item.id || `api-${index}`,
    name: item.title,
    fuel_type: inferFuelType(item.title),
    price_zone_1: item.zone1_price,
    price_zone_2: item.zone2_price,
    sort_order: index,
  };
}

const ZONE_FILTERS = [
  { key: "all", label: "Tất cả" },
  { key: "zone1", label: "Vùng 1" },
  { key: "zone2", label: "Vùng 2" },
];

export default function FuelSearch() {
  const [date, setDate] = useState(todayStr());
  const [query, setQuery] = useState("");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [sortDir, setSortDir] = useState("asc");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (selectedDate) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://giaxanghomnay.com/api/pvdate/${selectedDate}`);
      if (!res.ok) throw new Error("Không thể tải dữ liệu");
      const json = await res.json();
      // First array = selected date prices with zone1/zone2
      const firstBatch = Array.isArray(json) && Array.isArray(json[0]) ? json[0] : [];
      setData(firstBatch.map(mapApiItem));
      if (firstBatch.length === 0) {
        setError("Không có dữ liệu cho ngày này");
      }
    } catch (e) {
      setError(e.message || "Lỗi khi tải dữ liệu từ API");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(date);
  }, [date, fetchData]);

  // Filter + sort
  const filtered = useMemo(() => {
    let result = [...data];
    // Text search
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((item) => item.name.toLowerCase().includes(q));
    }
    // Sort by selected zone
    if (zoneFilter !== "all") {
      const field = zoneFilter === "zone1" ? "price_zone_1" : "price_zone_2";
      result.sort((a, b) => (sortDir === "asc" ? a[field] - b[field] : b[field] - a[field]));
    }
    return result;
  }, [data, query, zoneFilter, sortDir]);

  return (
    <section className="relative px-6 md:px-12 lg:px-[8vw] py-[10vh]">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <span className="text-lime text-xs uppercase tracking-[0.3em] font-body block mb-3">Tra cứu nhanh</span>
        <h2 className="font-display font-black text-parchment text-3xl md:text-5xl tracking-[-0.03em] leading-[0.95]">
          Tìm giá<br />
          <span className="text-concrete">theo vùng & ngày</span>
        </h2>
      </motion.div>

      {/* Search controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-[#111113] border border-[#1e1e22] rounded-sm p-5 md:p-6 mb-8"
      >
        <div className="flex flex-col gap-5">
          {/* Top row: search + date */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-concrete" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm theo tên nhiên liệu (vd: RON 95, Diesel...)"
                className="w-full bg-[#0A0A0B] border border-[#2a2a2e] rounded-sm pl-11 pr-10 py-3 text-parchment text-sm font-body placeholder:text-[#555] focus:outline-none focus:border-[#D1FF52]/50 transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-concrete hover:text-parchment transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Date picker */}
            <div className="relative md:w-56">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lime pointer-events-none" />
              <input
                type="date"
                value={date}
                max={todayStr()}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-[#2a2a2e] rounded-sm pl-11 pr-4 py-3 text-parchment text-sm font-body focus:outline-none focus:border-[#D1FF52]/50 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Bottom row: zone filter + sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Zone filter */}
            <div className="flex items-center gap-2">
              <span className="text-concrete text-[11px] uppercase tracking-[0.15em] font-body mr-1">Vùng:</span>
              <div className="flex bg-[#0A0A0B] border border-[#2a2a2e] rounded-sm p-1">
                {ZONE_FILTERS.map((zf) => (
                  <button
                    key={zf.key}
                    onClick={() => setZoneFilter(zf.key)}
                    className={`px-4 py-1.5 text-xs font-body font-medium rounded-sm transition-all ${
                      zoneFilter === zf.key
                        ? "bg-lime text-obsidian"
                        : "text-concrete hover:text-parchment"
                    }`}
                  >
                    {zf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort direction (only when zone selected) */}
            {zoneFilter !== "all" && (
              <button
                onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                className="flex items-center gap-2 text-concrete hover:text-parchment text-xs font-body uppercase tracking-[0.12em] transition-colors group"
              >
                <ArrowUpDown className="w-3.5 h-3.5 group-hover:text-lime transition-colors" />
                Giá {sortDir === "asc" ? "thấp → cao" : "cao → thấp"}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Status / Results */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-lime animate-spin" />
          <span className="ml-3 text-concrete text-sm font-body">Đang tải dữ liệu...</span>
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center gap-3 p-5 bg-[#111113] border border-orange-500/30 rounded-sm">
          <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
          <p className="text-concrete text-sm font-body">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Result count */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-concrete text-xs uppercase tracking-[0.15em] font-body">
              {filtered.length} mặt hàng
              {zoneFilter !== "all" && ` · Sắp xếp theo ${zoneFilter === "zone1" ? "Vùng 1" : "Vùng 2"}`}
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item, index) => (
                <PriceCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-concrete text-sm font-body">
                Không tìm thấy nhiên liệu phù hợp với "{query}"
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}