"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import React, { useRef } from "react";

const FlowNode = ({ step, idx, themeColor, isEven }: { step: string, idx: number, themeColor: string, isEven: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`relative shrink-0 snap-center w-[85vw] max-w-[320px] md:w-full flex ${isEven ? 'justify-start md:justify-end' : 'justify-start'} mb-0 md:mb-24 z-10 perspective-1000`}>
      
      {/* Glowing Neon Connector Line (Desktop Only) */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ transformOrigin: isEven ? 'right' : 'left' }}
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[10%] h-[2px] ${isEven ? 'right-[50%]' : 'left-[50%]'}`}
      >
        <div className="w-full h-full" style={{ backgroundColor: themeColor, boxShadow: `0 0 15px ${themeColor}, 0 0 30px ${themeColor}` }} />
        {/* Data Packet Particle */}
        <motion.div 
          animate={{ x: isEven ? ["100%", "0%"] : ["0%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_white]"
        />
      </motion.div>

      {/* The 3D Textured Node Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40, y: 30 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
        className={`w-full md:w-[45%] relative group z-10`}
        style={{ perspective: 1200 }}
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="bg-[#0A0A0A] border border-white/10 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)] transition-all duration-500 overflow-hidden flex items-center gap-6 cursor-crosshair group relative"
        >
          {/* Glass Noise Texture Background */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />
          
          {/* Intense Hover Aura */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
            style={{ background: `radial-gradient(circle at ${isEven ? '100%' : '0%'} 50%, ${themeColor}20, transparent 80%)`, transform: "translateZ(-20px)" }} 
          />
          
          {/* 3D Floating Badge */}
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-white/5 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 bg-[#151515]" 
            style={{ transform: "translateZ(80px)" }}
          >
            <div className="absolute inset-0 rounded-2xl opacity-20 blur-md" style={{ backgroundColor: themeColor }} />
            <span className="font-display text-[28px] font-bold relative z-10" style={{ color: themeColor }}>
              0{idx + 1}
            </span>
          </div>

          {/* 3D Floating Text */}
          <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
            <span className="font-bold text-white text-[18px] md:text-[22px] leading-tight drop-shadow-md">
              {step}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile-only connector dot */}
      <div 
        className="absolute left-full top-1/2 w-6 h-[2px] md:hidden -z-10 opacity-50 -translate-y-1/2"
        style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }}
      />
    </div>
  );
};

export default function ProductWorkflow({ product }: { product: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);
  const springLineHeight = useSpring(lineHeight, { stiffness: 100, damping: 20 });

  return (
    <section ref={containerRef} className="py-32 bg-[#050505] relative overflow-hidden">
      {/* 3D Texture Matrix Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) scale(2)', transformOrigin: 'top center' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      
      {/* Massive Glow Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-[0.07] pointer-events-none" style={{ backgroundColor: product.themeColor }} />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="font-display text-[40px] md:text-[64px] uppercase tracking-tight text-white drop-shadow-xl">
            How It <span style={{ color: product.themeColor }}>Works</span>
          </h2>
          <p className="text-white/50 mt-4 font-medium text-[20px]">An intelligent, non-linear data pipeline.</p>
        </div>

        <div className="relative w-full">
          
          {/* Desktop Central Neon Spine */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/5 z-0 rounded-full">
            <motion.div 
              className="w-full rounded-full relative"
              style={{ height: springLineHeight, backgroundColor: product.themeColor, boxShadow: `0 0 20px ${product.themeColor}, 0 0 40px ${product.themeColor}` }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 shadow-[0_0_20px_rgba(255,255,255,1)]" style={{ borderColor: product.themeColor }} />
            </motion.div>
          </div>

          <div className="flex overflow-x-auto md:flex-col gap-6 md:gap-0 pb-8 md:pb-0 relative z-10 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {product.workflow.map((step: string, idx: number) => (
              <FlowNode 
                key={idx} 
                step={step} 
                idx={idx} 
                themeColor={product.themeColor} 
                isEven={idx % 2 === 0} 
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
