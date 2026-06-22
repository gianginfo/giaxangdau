import React from "react";
import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <footer className="relative px-6 md:px-12 lg:px-[8vw] py-[8vh] border-t border-[#1e1e22]">
      {/* Big CTA text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16">
        
        <a
          href="tel:19001510"
          className="inline-block font-display font-black text-parchment text-[clamp(2rem,6vw,5rem)] tracking-[-0.04em] leading-none hover:text-lime transition-colors duration-500">
          
          LIÊN HỆ NGAY →
        </a>
        <p className="text-concrete text-sm mt-4 font-body">Hotline: 1900 1510 · Hỗ trợ 24/7</p>
      </motion.div>

      {/* Footer links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#1e1e22]">
        <div>
          <p className="text-concrete text-[11px] uppercase tracking-[0.2em] font-body mb-4">Công ty</p>
          <ul className="space-y-2">
            <li><a href="#" className="text-parchment text-sm font-body hover:text-lime transition-colors">Giới thiệu</a></li>
            <li><a href="#" className="text-parchment text-sm font-body hover:text-lime transition-colors">Hệ thống trạm xăng</a></li>
            <li><a href="#" className="text-parchment text-sm font-body hover:text-lime transition-colors">Tuyển dụng</a></li>
          </ul>
        </div>
        <div>
          <p className="text-concrete text-[11px] uppercase tracking-[0.2em] font-body mb-4">Dịch vụ</p>
          <ul className="space-y-2">
            <li><a href="#" className="text-parchment text-sm font-body hover:text-lime transition-colors">Bán lẻ xăng dầu</a></li>
            <li><a href="#" className="text-parchment text-sm font-body hover:text-lime transition-colors">Dầu nhớt & phụ gia</a></li>
            <li><a href="#" className="text-parchment text-sm font-body hover:text-lime transition-colors">Vận chuyển nhiên liệu</a></li>
          </ul>
        </div>
        <div>
          <p className="text-concrete text-[11px] uppercase tracking-[0.2em] font-body mb-4">Pháp lý</p>
          <ul className="space-y-2">
            <li><a href="#" className="text-parchment text-sm font-body hover:text-lime transition-colors">Chính sách bảo mật</a></li>
            <li><a href="#" className="text-parchment text-sm font-body hover:text-lime transition-colors">Điều khoản sử dụng</a></li>
            <li><a href="#" className="text-parchment text-sm font-body hover:text-lime transition-colors">Khiếu nại</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 gap-4">
        <div className="flex items-center gap-3 hidden">
          <div className="w-8 h-8 rounded-sm bg-lime flex items-center justify-center hidden">
            <span className="text-obsidian font-display font-black text-xs tracking-tighter">TP</span>
          </div>
          <span className="text-parchment font-display font-semibold text-sm tracking-tight hidden">TP PETRO</span>
        </div>
        <p className="text-concrete text-xs font-body">
          © 2026 TP Petro. Mọi quyền được bảo lưu.
        </p>
      </div>
    </footer>);

}