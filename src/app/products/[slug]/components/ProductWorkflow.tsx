"use client";

import { motion } from "framer-motion";
import React from "react";

const FlowNode = ({ step, idx, themeColor, total }: { step: string, idx: number, themeColor: string, total: number }) => {
  return (
    <div className="relative shrink-0 w-[280px] md:w-[320px] flex flex-col group h-full">
      {/* Horizontal Connector Line (Hidden on mobile, visible on desktop) */}
      {idx !== total - 1 && (
        <div className="hidden md:block absolute top-[31px] left-[64px] h-[2px] bg-white/10 z-0" style={{ width: 'calc(100% - 32px)' }}>
          <motion.div 
            className="h-full origin-left"
            style={{ backgroundColor: themeColor, opacity: 0.7 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
          />
        </div>
      )}

      {/* Step Number Circle (Using inline styles to bypass Tailwind JIT cache issues) */}
      <div 
        className="flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] relative z-20 transition-transform duration-300 group-hover:scale-110 mb-6 shrink-0"
        style={{ 
          width: '64px', 
          height: '64px', 
          borderRadius: '50%', 
          backgroundColor: '#000000', 
          border: `2px solid ${themeColor}` 
        }}
      >
        <span className="font-display text-[24px] font-bold drop-shadow-md" style={{ color: themeColor }}>
          0{idx + 1}
        </span>
      </div>

      {/* Step Content */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 transition-all duration-300 group-hover:border-white/20 group-hover:-translate-y-2 group-hover:shadow-2xl h-full flex-1 relative overflow-hidden">
        {/* Subtle hover gradient inside card */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{ background: `linear-gradient(135deg, ${themeColor}, transparent)` }}
        />
        <p className="text-white/90 font-medium text-[16px] md:text-[18px] relative z-10">
          {step}
        </p>
      </div>
    </div>
  );
};

export default function ProductWorkflow({ product }: { product: any }) {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
      
      {/* Background ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.05] pointer-events-none" 
        style={{ backgroundColor: product.themeColor }} 
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center md:text-left mb-16">
          <h2 className="font-display text-[40px] md:text-[56px] uppercase tracking-tight text-white drop-shadow-xl">
            How It <span style={{ color: product.themeColor }}>Works</span>
          </h2>
          <p className="text-white/50 mt-2 font-medium text-[18px]">An intelligent, non-linear data pipeline.</p>
        </div>

        {/* Horizontal scrollable container */}
        <div className="flex overflow-x-auto gap-6 md:gap-8 pb-12 pt-4 px-4 -mx-4 sm:px-0 sm:mx-0 snap-x snap-mandatory items-stretch [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {product.workflow.map((step: string, idx: number) => (
            <div key={idx} className="snap-start flex">
              <FlowNode 
                step={step} 
                idx={idx} 
                themeColor={product.themeColor} 
                total={product.workflow.length}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
