import React from "react";
import { motion } from "framer-motion";
import PriceCard from "./PriceCard";

export default function PriceTable({ prices, loading }) {
  if (loading) {
    return (
      <section className="px-6 md:px-12 lg:px-[8vw] py-[10vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) =>
          <div key={i} className="bg-card border border-card rounded-sm p-6 animate-pulse">
              <div className="h-4 bg-[#1e1e22] rounded w-1/3 mb-4" />
              <div className="h-6 bg-[#1e1e22] rounded w-2/3 mb-6" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-8 bg-[#1e1e22] rounded" />
                <div className="h-8 bg-[#1e1e22] rounded" />
              </div>
            </div>
          )}
        </div>
      </section>);

  }

  return (
    <section className="relative px-6 md:px-12 lg:px-[8vw] py-[10vh] hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12">
        
        
        


        
      </motion.div>

      {/* Price cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prices.map((item, index) =>
        <PriceCard key={item.id} item={item} index={index} />
        )}
      </div>
    </section>);

}