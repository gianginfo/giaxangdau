import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { base44 } from "@/api/base44Client";

const PALETTE = ["#D1FF52", "#39E5E5", "#FF8FB1", "#FFA94D", "#A78BFA", "#34D399", "#60A5FA", "#F472B6"];

function formatDate(dateStr) {
  const [y, m, d] = String(dateStr).split("-");
  return `${d}/${m}/${y}`;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-card rounded-sm p-3 shadow-xl max-w-[260px]">
      <p className="text-concrete text-[11px] uppercase tracking-wider mb-2">
        {formatDate(label)}
      </p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs py-0.5">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-parchment truncate">{entry.name}</span>
          <span className="text-concrete ml-auto font-mono whitespace-nowrap">
            {new Intl.NumberFormat("vi-VN").format(entry.value)} đ
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PriceTrendChart() {
  const [zone, setZone] = useState(1);
  const [months, setMonths] = useState(6);
  const [data, setData] = useState([]);
  const [fuelNames, setFuelNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchHistory() {
      setLoading(true);
      try {
        const res = await base44.functions.invoke("getPriceHistory", { months, zone });
        if (!cancelled) {
          setData(res.data.data || []);
          setFuelNames(res.data.fuelNames || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchHistory();
    return () => { cancelled = true; };
  }, [months, zone]);

  return (
    <section className="relative px-6 md:px-12 lg:px-[8vw] py-[10vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-end justify-between flex-wrap gap-4"
      >
        <div>
          <span className="text-lime text-xs uppercase tracking-[0.3em] font-body block mb-3">
            Xu hướng {months} tháng
          </span>
          <h2 className="font-display font-black text-parchment text-3xl md:text-5xl tracking-[-0.03em] leading-[0.95]">
            Biến động
            <br />
            <span className="text-concrete">giá xăng dầu</span>
          </h2>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 bg-card border border-card rounded-sm p-1">
            {[1, 2].map((z) => (
              <button
                key={z}
                onClick={() => setZone(z)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-body rounded-sm transition-all ${
                  zone === z
                    ? "bg-lime text-obsidian"
                    : "text-concrete hover:text-parchment"
                }`}
              >
                Vùng {z}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-card border border-card rounded-sm p-1">
            {[3, 6, 12, 24, 48].map((m) => (
              <button
                key={m}
                onClick={() => setMonths(m)}
                className={`px-3 py-2 text-xs uppercase tracking-wider font-body rounded-sm transition-all ${
                  months === m
                    ? "bg-lime text-obsidian"
                    : "text-concrete hover:text-parchment"
                }`}
              >
                {m} tháng
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-card border border-card rounded-sm p-4 md:p-6"
      >
        {loading ? (
          <div className="h-[300px] md:h-[400px] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-card border-t-lime rounded-full animate-spin" />
          </div>
        ) : data.length === 0 ? (
          <div className="h-[300px] md:h-[400px] flex items-center justify-center">
            <p className="text-concrete text-sm font-body">Chưa có dữ liệu cho khoảng thời gian này</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={380}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--faint)" />
              <XAxis
                dataKey="date"
                stroke="var(--muted)"
                tick={{ fontSize: 11, fontFamily: "Inter" }}
                tickFormatter={formatDate}
                angle={-90}
                textAnchor="end"
                height={80}
                interval={Math.max(0, Math.floor(data.length / 6) - 1)}
                tickLine={false}
                axisLine={{ stroke: "var(--faint)" }}
              />
              <YAxis
                stroke="var(--muted)"
                tick={{ fontSize: 11, fontFamily: "Inter" }}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  fontSize: 11,
                  fontFamily: "Inter",
                  paddingTop: 12,
                }}
                iconType="circle"
              />
              {fuelNames.map((name, i) => (
                <Line
                  key={name}
                  type="monotone"
                  dataKey={name}
                  stroke={PALETTE[i % PALETTE.length]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </section>
  );
}