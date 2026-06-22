import React, { useState, useMemo } from "react";
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

const PALETTE = ["#D1FF52", "#39E5E5", "#FF8FB1", "#FFA94D", "#A78BFA", "#34D399"];

function seededRandom(seed) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

function generateTrend(prices, zone, days = 30) {
  const key = zone === 2 ? "price_zone_2" : "price_zone_1";

  const trends = prices.map((p, i) => {
    const current = p[key];
    const deltas = [];
    for (let d = 0; d < days - 1; d++) {
      const r = seededRandom(i * 31 + d) - 0.5;
      deltas.push(Math.round(r * current * 0.02));
    }
    const series = [current];
    let v = current;
    for (let d = deltas.length - 1; d >= 0; d--) {
      v = v - deltas[d];
      series.unshift(v);
    }
    return { name: p.name, series };
  });

  const data = [];
  for (let d = 0; d < days; d++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - d));
    const point = {
      date: `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`,
    };
    trends.forEach((t) => {
      point[t.name] = t.series[d];
    });
    data.push(point);
  }
  return data;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-card rounded-sm p-3 shadow-xl max-w-[260px]">
      <p className="text-concrete text-[11px] uppercase tracking-wider mb-2">
        {label}
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

export default function PriceTrendChart({ prices, loading }) {
  const [zone, setZone] = useState(1);
  const [months, setMonths] = useState(6);
  const data = useMemo(
    () => (loading ? [] : generateTrend(prices, zone, months * 30)),
    [prices, zone, months, loading]
  );

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
                interval={Math.floor((months * 30) / 6)}
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
              {prices.map((p, i) => (
                <Line
                  key={p.id}
                  type="monotone"
                  dataKey={p.name}
                  stroke={PALETTE[i % PALETTE.length]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </section>
  );
}