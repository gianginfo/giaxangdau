import React from "react";
import { motion } from "framer-motion";

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden">
      {/* Left — Title */}
      <div className="relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-[8vw] py-16 lg:py-0 lg:w-[40%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >

        </motion.div>
      </div>

      {/* Right — Hero Image */}
      <div className="relative lg:w-[60%] min-h-[50vh] lg:min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Abstract petroleum surface texture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg-60)] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-6 md:left-12 lg:left-[8vw] z-10 flex items-center gap-3"
      >
        <div className="w-px h-12 bg-gradient-to-b from-lime to-transparent" />
        <span className="text-concrete text-xs uppercase tracking-[0.2em] font-body">Cuộn xuống</span>
      </motion.div>
    </section>
  );
}