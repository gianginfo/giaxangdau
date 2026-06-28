import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { base44 } from "@/api/base44Client";

const MONTH_NAMES = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];
const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export default function PriceCalendar({ onSelectDate }) {
  const [adjustmentDates, setAdjustmentDates] = useState({});
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDates() {
      try {
        const res = await base44.functions.invoke("getAdjustmentDates", {});
        setAdjustmentDates(res.data.adjustmentDates || {});
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchDates();
  }, []);

  const { year, month } = currentMonth;
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let startWeekday = firstDay.getDay() - 1;
  if (startWeekday < 0) startWeekday = 6;

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthAdjustments = Object.keys(adjustmentDates)
    .filter(d => d.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
    .sort();

  function prevMonth() {
    setCurrentMonth(prev => {
      const m = prev.month - 1;
      if (m < 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: m };
    });
  }

  function nextMonth() {
    setCurrentMonth(prev => {
      const m = prev.month + 1;
      if (m > 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: m };
    });
  }

  function dateStr(d) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  return (
    <section className="relative px-6 md:px-12 lg:px-[8vw] py-[10vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <span className="text-lime text-xs uppercase tracking-[0.3em] font-body block mb-3">Lịch điều chỉnh</span>
        <h2 className="font-display font-black text-parchment text-3xl md:text-5xl tracking-[-0.03em] leading-[0.95]">
          Ngày công bố
          <br />
          <span className="text-concrete">giá xăng dầu</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Calendar grid */}
        <div className="bg-card border border-card rounded-sm p-5 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="flex items-center justify-center w-9 h-9 bg-obsidian border border-input-soft rounded-sm hover:border-lime-30 transition-colors">
              <ChevronLeft className="w-4 h-4 text-parchment" />
            </button>
            <h3 className="font-display font-semibold text-parchment text-lg">
              {MONTH_NAMES[month]} {year}
            </h3>
            <button onClick={nextMonth} className="flex items-center justify-center w-9 h-9 bg-obsidian border border-input-soft rounded-sm hover:border-lime-30 transition-colors">
              <ChevronRight className="w-4 h-4 text-parchment" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-concrete text-[11px] uppercase tracking-wider font-body py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />;
              const ds = dateStr(d);
              const hasAdjustment = adjustmentDates[ds];
              if (hasAdjustment) {
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (onSelectDate) onSelectDate(ds);
                      document.getElementById("fuel-search")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="relative flex items-center justify-center h-10 rounded-sm text-sm font-body transition-colors cursor-pointer bg-lime-10 text-lime font-semibold hover:bg-lime-20"
                  >
                    {d}
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-lime" />
                  </button>
                );
              }
              return (
                <div
                  key={i}
                  className="relative flex items-center justify-center h-10 rounded-sm text-sm font-body text-concrete"
                >
                  {d}
                </div>
              );
            })}
          </div>
        </div>

        {/* Adjustment list */}
        <div className="bg-card border border-card rounded-sm p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-lime" />
            <h3 className="font-display font-semibold text-parchment text-base">
              {monthAdjustments.length} lần điều chỉnh trong {MONTH_NAMES[month]}
            </h3>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-4 border-card border-t-lime rounded-full animate-spin" />
            </div>
          ) : monthAdjustments.length === 0 ? (
            <p className="text-concrete text-sm font-body py-8 text-center">
              Không có lần điều chỉnh nào trong tháng này
            </p>
          ) : (
            <div className="space-y-2 max-h-[320px] overflow-y-auto">
              {monthAdjustments.map(d => {
                const [y, m, day] = d.split("-");
                const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(day));
                const weekday = WEEKDAYS[(date.getDay() + 6) % 7];
                return (
                  <div key={d} className="flex items-center gap-3 p-3 bg-obsidian border border-input-soft rounded-sm">
                    <div className="flex items-center justify-center w-10 h-10 bg-lime-10 rounded-sm">
                      <span className="text-lime font-display font-bold text-sm">{parseInt(day)}</span>
                    </div>
                    <div>
                      <p className="text-parchment text-sm font-body">{weekday}, {parseInt(day)}/{parseInt(m)}/{y}</p>
                      <p className="text-concrete text-xs font-body">{adjustmentDates[d]} mặt hàng</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}