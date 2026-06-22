import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, Wallet } from "lucide-react";

const commitments = [
  {
    icon: ShieldCheck,
    title: "Chất lượng đảm bảo",
    description: "Nhiên liệu đạt tiêu chuẩn chất lượng quốc gia, được kiểm định nghiêm ngặt trước khi phân phối.",
    accent: "text-lime",
    bg: "bg-lime-10",
  },
  {
    icon: Heart,
    title: "Tận tâm phục vụ",
    description: "Hệ thống trạm xăng hiện đại, đội ngũ nhân viên chuyên nghiệp phục vụ 24/7.",
    accent: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Wallet,
    title: "Tiết kiệm cho mọi nhà",
    description: "Chính sách giá minh bạch, cạnh tranh, mang lại giá trị tốt nhất cho khách hàng.",
    accent: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

export default function CommitmentSection() {
  return (
    <section className="relative px-6 md:px-12 lg:px-[8vw] py-[12vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <span className="text-lime text-xs uppercase tracking-[0.3em] font-body block mb-3">Cam kết</span>
        <h2 className="font-display font-black text-parchment text-3xl md:text-5xl tracking-[-0.03em] leading-[0.95]">
          Giá trị<br />
          <span className="text-concrete">cốt lõi</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {commitments.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-card border border-card rounded-sm p-6 md:p-8 hover:border-lime-20 transition-all duration-500"
            >
              <div className={`w-10 h-10 rounded-sm ${item.bg} flex items-center justify-center mb-6`}>
                <Icon className={`w-5 h-5 ${item.accent}`} />
              </div>
              <h3 className="text-parchment font-display font-semibold text-lg tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-concrete text-sm font-body leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}