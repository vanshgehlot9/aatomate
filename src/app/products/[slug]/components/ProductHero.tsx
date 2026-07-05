"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import * as Icons from "lucide-react";

const InteractivePhone = ({ product }: { product: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [visibleMessages, setVisibleMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (!isInView) return;
    let isActive = true;
    const runSequence = async () => {
      setVisibleMessages([]);
      for (const msg of product.chatDemo) {
        if (!isActive) return;
        if (msg.sender === "bot") {
          setIsTyping(true);
          await new Promise((r) => setTimeout(r, 1200));
          setIsTyping(false);
        } else {
          await new Promise((r) => setTimeout(r, 800));
        }
        if (!isActive) return;
        setVisibleMessages((prev) => [...prev, msg]);
      }
      if (isActive) {
        await new Promise((r) => setTimeout(r, 5000));
        runSequence();
      }
    };
    runSequence();
    return () => { isActive = false; };
  }, [isInView, product.chatDemo]);

  // @ts-ignore
  const IconComponent = Icons[product.icon] || Icons.Bot;

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ rotateY: 25, rotateX: 10, scale: 0.8, opacity: 0 }}
      whileInView={{ rotateY: 0, rotateX: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative flex justify-center items-center w-full max-w-[340px] perspective-1000 mx-auto cursor-crosshair z-20"
    >
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[110%] pointer-events-none blur-3xl rounded-full"
        style={{ background: `radial-gradient(circle, ${product.themeColor} 0%, transparent 65%)`, transform: "translateZ(-50px)" }}
      />
      <div 
        className="relative w-[280px] h-[580px] bg-[#1a1a1a] rounded-[48px] p-2.5 shadow-[0_40px_80px_rgba(0,0,0,0.6)] border-[6px] border-[#333] ring-1 ring-black/50"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110px] h-[24px] bg-[#1a1a1a] rounded-b-[16px] z-30 flex items-center justify-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        </div>
        
        <div className="w-full h-full bg-[#0B141A] rounded-[40px] overflow-hidden flex flex-col relative z-20 border border-white/5 shadow-inner">
          <div className="bg-[#202C33]/95 backdrop-blur-md px-4 pt-12 pb-3 flex items-center gap-3 shadow-md z-20">
            <Icons.ChevronLeft className="w-5 h-5 text-white/70 -ml-1 cursor-pointer" />
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
              <IconComponent className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white text-[14px] font-medium leading-tight">{product.hero.title.split(" ")[0]} Bot</h4>
              <p className="text-white/50 text-[11px] flex items-center gap-1">online</p>
            </div>
            <Icons.Video className="w-4 h-4 text-white/70" />
            <Icons.Phone className="w-4 h-4 text-white/70" />
          </div>

          <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-y-auto relative no-scrollbar">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }} />
            <div className="flex justify-center mb-1 mt-2">
              <span className="bg-[#182229] text-white/60 text-[10px] px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">Today</span>
            </div>
            {visibleMessages.map((msg: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15, scale: 0.9, rotateX: 20, originY: 1 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} relative z-10 w-full perspective-1000`}
              >
                <div className={`max-w-[85%] px-3.5 py-2 text-[13px] leading-[1.4] shadow-sm relative ${
                  msg.sender === 'bot' ? 'bg-[#202C33] text-[#E9EDEF] rounded-[12px] rounded-tl-sm ml-2' : 'bg-[#005C4B] text-[#E9EDEF] rounded-[12px] rounded-tr-sm mr-2'
                }`}>
                  {msg.sender === 'bot' ? (
                    <div className="absolute top-0 -left-2 w-2 h-3 overflow-hidden">
                       <div className="w-4 h-4 bg-[#202C33] absolute top-0 right-0 shadow-sm" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                    </div>
                  ) : (
                    <div className="absolute top-0 -right-2 w-2 h-3 overflow-hidden">
                       <div className="w-4 h-4 bg-[#005C4B] absolute top-0 left-0 shadow-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                    </div>
                  )}
                  {msg.text}
                  <div className="text-[9px] text-white/40 text-right mt-1 ml-3 float-right translate-y-0.5">{msg.time}</div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex justify-start relative z-10">
                <div className="bg-[#202C33] rounded-2xl rounded-tl-[4px] px-4 py-3 shadow-sm flex items-center gap-1.5 h-[34px] ml-2">
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                </div>
              </motion.div>
            )}
            <div className="h-2 w-full shrink-0" />
          </div>
          <div className="bg-[#202C33] p-2 pb-6 px-3 flex items-center gap-2 z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
            <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2 flex items-center shadow-inner">
              <span className="text-white/40 text-[13px]">Message</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center shrink-0 shadow-lg">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845L1.101,21.757z"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProductHero({ product }: { product: any }) {
  // @ts-ignore
  const IconComponent = Icons[product.icon] || Icons.Bot;

  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: product.hero.bgPattern }} />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay z-0" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-midnight-ink border border-midnight-ink/10 mb-8 shadow-sm self-start"
            >
              <IconComponent className="w-3 h-3" style={{ color: product.themeColor }} />
              <span className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">{product.title || product.slug.replace("-", " ")}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[56px] md:text-[80px] leading-[0.95] tracking-[-0.03em] text-midnight-ink uppercase mb-6"
            >
              {product.hero.title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[20px] text-midnight-ink/60 font-medium mb-12 max-w-xl leading-relaxed"
            >
              {product.hero.subtitle}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <button 
                onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-midnight-ink text-white px-8 py-4 rounded-full text-[14px] font-bold uppercase tracking-wider hover:bg-black transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3"
                style={{ borderBottom: `2px solid ${product.themeColor}` }}
              >
                Schedule Demo
                <Icons.ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          <div className="relative flex justify-center w-full">
            <InteractivePhone product={product} />
            
            {/* Floating UI Cards representing speed/intelligence */}
            {product.hero.floatingCards.map((card: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + (index * 0.2), type: "spring" }}
                className={`absolute hidden md:flex items-center gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-black/5 z-30 ${
                  index === 0 ? "top-10 -left-10" : index === 1 ? "bottom-32 -right-12" : "top-1/2 -left-16"
                }`}
                style={{ transform: 'translateZ(60px)' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${product.themeColor}20` }}>
                  <Icons.Check className="w-4 h-4" style={{ color: product.themeColor }} />
                </div>
                <span className="text-[12px] font-bold text-midnight-ink uppercase tracking-wider">{card}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
