import React from "react";
import { motion } from "framer-motion";
import { Info, AlertTriangle } from "lucide-react";

export default function NoticeSection({ detailImage }) {
  return (
    <section className="relative px-6 md:px-12 lg:px-[8vw] py-[12vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[3/2] rounded-sm overflow-hidden"
        >
          <img
            src={detailImage}
            alt="Close-up of fuel droplet on steel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-80)] via-transparent to-transparent" />
        </motion.div>

        {/* Notice Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-lime text-xs uppercase tracking-[0.3em] font-body block mb-3">Lưu ý quan trọng</span>
          <h2 className="font-display font-black text-parchment text-2xl md:text-4xl tracking-[-0.03em] leading-[0.95] mb-8">
            Thông tin<br />
            <span className="text-concrete">bổ sung</span>
          </h2>

          <div className="space-y-5">
            <div className="flex gap-4 p-5 bg-card border border-card rounded-sm">
              <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-[#D1FF52]/10 flex items-center justify-center">
                <Info className="w-4 h-4 text-lime" />
              </div>
              <div>
                <p className="text-parchment font-display font-medium text-sm mb-1">Thuế & phí</p>
                <p className="text-concrete text-sm font-body leading-relaxed">
                  Giá đã bao gồm thuế GTGT và thuế Bảo vệ môi trường (BVMT) theo quy định hiện hành.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-card border border-card rounded-sm">
              <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-orange-500/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <p className="text-parchment font-display font-medium text-sm mb-1">Chênh lệch địa phương</p>
                <p className="text-concrete text-sm font-body leading-relaxed">
                  Tùy từng địa phương, mức giá có thể chênh lệch so với bảng giá trên do chi phí vận chuyển và phân phối.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}