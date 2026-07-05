"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

const TiltCard = ({ problem, idx, themeColor }: { problem: any, idx: number, themeColor: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full bg-[#111111] p-8 rounded-3xl border border-white/10 overflow-hidden cursor-crosshair transition-colors duration-500 hover:bg-[#151515]"
      >
        {/* Hover Glow Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" 
          style={{ background: `radial-gradient(circle at 50% 50%, ${themeColor}, transparent 70%)`, transform: "translateZ(-10px)" }} 
        />
        
        {/* Massive 3D Number Watermark */}
        <div 
          className="absolute -right-4 -bottom-8 font-display text-[140px] leading-none opacity-5 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" 
          style={{ color: themeColor, transform: "translateZ(30px)" }}
        >
          0{idx + 1}
        </div>

        {/* Content */}
        <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-[24px] font-display font-bold" style={{ color: themeColor }}>
              0{idx + 1}
            </div>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          
          <h3 className="text-[24px] font-bold mb-4 text-white group-hover:text-white/90 transition-colors">
            {problem.title}
          </h3>
          <p className="text-white/50 leading-relaxed text-[15px]">
            {problem.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ProductProblems({ product }: { product: any }) {
  return (
    <section className="py-24 bg-midnight-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, white 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-[40px] md:text-[56px] leading-tight uppercase tracking-tight mb-6">
            The Cost of <span style={{ color: product.themeColor }}>Inefficiency</span>
          </h2>
          <p className="text-[18px] text-white/60 font-medium">
            Traditional methods are breaking down. Here is what you lose without AI automation.
          </p>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 pb-8 md:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {product.problems.map((problem: any, idx: number) => (
            <div key={idx} className="w-[85vw] max-w-[320px] md:w-auto md:max-w-none shrink-0 snap-center">
              <TiltCard problem={problem} idx={idx} themeColor={product.themeColor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
