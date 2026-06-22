import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Newspaper } from "lucide-react";

const sources = [
  {
    label: "Thông báo báo chí Petrolimex",
    url: "https://www.petrolimex.com.vn/ndi/thong-cao-bao-chi.html",
  },
  {
    label: "Báo Bộ Công Thương",
    url: "https://congthuong.vn/thi-truong.html",
  },
];

export default function SourcesSection() {
  return (
    <section className="relative px-6 md:px-12 lg:px-[8vw] py-[10vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <span className="text-lime text-xs uppercase tracking-[0.3em] font-body block mb-3">Nguồn tham khảo</span>
        <h2 className="font-display font-bold text-parchment text-2xl md:text-3xl tracking-[-0.02em]">
          Dữ liệu chính thống
        </h2>
      </motion.div>

      <div className="space-y-3">
        {sources.map((src, i) => (
          <motion.a
            key={i}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-center gap-4 p-5 bg-card border border-card rounded-sm hover:border-lime-30 transition-all duration-300 group"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-card flex items-center justify-center group-hover:bg-lime-10 transition-colors">
              <Newspaper className="w-4 h-4 text-concrete group-hover:text-lime transition-colors" />
            </div>
            <span className="text-parchment font-body text-sm flex-1">{src.label}</span>
            <ExternalLink className="w-4 h-4 text-concrete group-hover:text-lime transition-colors" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}