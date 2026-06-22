import React from "react";
import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden">
      {/* Left — Branding & Title */}
      <div className="relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-[8vw] py-16 lg:py-0 lg:w-[40%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              

              
              
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-parchment leading-[0.9] tracking-[-0.04em]">
            
            
            <span className="block text-lime text-[clamp(2.5rem,7vw,6rem)] mt-2">GIÁ BÁN LẺ</span>
            <span className="block text-[clamp(2rem,5vw,4rem)] text-concrete mt-1">XĂNG DẦU</span>
          </h1>

          {/* Effective Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4">
            
            


            
            


            
          </motion.div>

          






          
        </motion.div>
      </div>

      {/* Right — Hero Image */}
      <div className="relative lg:w-[60%] min-h-[50vh] lg:min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0">
          
          <img
            src={heroImage}
            alt="Abstract petroleum surface texture"
            className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-6 md:left-12 lg:left-[8vw] z-10 flex items-center gap-3">
        
        <div className="w-px h-12 bg-gradient-to-b from-lime to-transparent" />
        
      </motion.div>
    </section>);

}