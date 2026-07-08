"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as Icons from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const TiltSolutionCard = ({ solution, idx, themeColor }: { solution: any, idx: number, themeColor: string }) => {
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

  // @ts-ignore
  const Icon = Icons[solution.icon] || Icons.CheckCircle;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: idx * 0.15, type: "spring", bounce: 0.4 }}
      style={{ perspective: 1200 }}
      className="w-full h-full"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="group relative h-full bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-black/5 overflow-hidden cursor-crosshair transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:bg-white"
        >
          {/* Intense Glow Hover Background */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
            style={{ background: `radial-gradient(circle at 100% 0%, ${themeColor}25, transparent 70%)`, transform: "translateZ(-20px)" }} 
          />
          
          {/* 3D Content Layers */}
          <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: "translateZ(60px)" }}>
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-[0_10px_20px_rgba(0,0,0,0.08)] border border-black/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" 
              style={{ backgroundColor: `${themeColor}20`, transform: "translateZ(80px)" }}
            >
              <Icon className="w-8 h-8" style={{ color: themeColor }} />
            </div>
            
            <div>
              <h3 
                className="text-[24px] font-bold text-midnight-ink mb-4 group-hover:text-black transition-colors"
                style={{ transform: "translateZ(40px)" }}
              >
                {solution.title}
              </h3>
              <p 
                className="text-midnight-ink/60 leading-relaxed text-[16px]"
                style={{ transform: "translateZ(20px)" }}
              >
                {solution.description}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function ProductSolutions({ product }: { product: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-32 bg-[#F8F9FA] relative overflow-hidden"
    >
      {/* Dynamic Mouse Spotlight Background */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-[100px] opacity-30"
        animate={{ x: mousePosition.x - 300, y: mousePosition.y - 300 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
        style={{ backgroundColor: product.themeColor }}
      />
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="font-display text-[40px] md:text-[64px] leading-[1.1] text-midnight-ink uppercase tracking-tight max-w-2xl">
            Intelligent Solutions, <br/>
            <span>Instant Results.</span>
          </h2>
          <p className="text-[18px] text-midnight-ink/50 max-w-sm pb-2 font-medium">
            Turn your most tedious processes into autonomous operations that run flawlessly 24/7.
          </p>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-10 pb-8 md:pb-0 items-stretch snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {product.solutions.map((solution: any, idx: number) => (
            <div key={idx} className="w-[85vw] max-w-[320px] md:w-auto md:max-w-none shrink-0 snap-center h-auto">
              <TiltSolutionCard solution={solution} idx={idx} themeColor={product.themeColor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
