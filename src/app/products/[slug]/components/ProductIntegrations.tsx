"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { Link2 } from "lucide-react";

const TiltIntegrationNode = ({ integration, idx, themeColor }: { integration: string, idx: number, themeColor: string }) => {
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
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", bounce: 0.5 }}
      style={{ perspective: 1000 }}
      className="z-10 shrink-0 snap-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3 + (idx * 0.5), repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="group relative bg-[#111111] border border-white/10 rounded-full px-8 py-5 md:px-10 md:py-6 flex items-center gap-4 cursor-crosshair hover:bg-[#151515] transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          {/* Intense Glow Hover Background */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full" 
            style={{ background: `radial-gradient(circle at 50% 50%, ${themeColor}20, transparent 70%)`, transform: "translateZ(-10px)" }} 
          />
          
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
            style={{ backgroundColor: `${themeColor}20`, transform: "translateZ(30px)" }}
          >
            <Link2 className="w-5 h-5" style={{ color: themeColor }} />
          </div>

          <span 
            className="font-bold text-white text-[16px] md:text-[20px] tracking-wide"
            style={{ transform: "translateZ(20px)" }}
          >
            {integration}
          </span>

        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function ProductIntegrations({ product }: { product: any }) {
  return (
    <section className="py-32 bg-midnight-ink text-white text-center relative overflow-hidden">
      {/* Dynamic Background Network Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, white 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-[0.05] pointer-events-none" style={{ backgroundColor: product.themeColor }} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="font-display text-[40px] md:text-[56px] uppercase mb-16 tracking-tight">
          Seamlessly <span style={{ color: product.themeColor }}>Connects</span> With
        </h2>
        
        <div className="flex overflow-x-auto md:flex-wrap justify-start md:justify-center items-center gap-6 md:gap-10 pb-8 md:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {product.integrations.map((integration: string, idx: number) => (
            <TiltIntegrationNode key={idx} integration={integration} idx={idx} themeColor={product.themeColor} />
          ))}
        </div>
      </div>
    </section>
  );
}
