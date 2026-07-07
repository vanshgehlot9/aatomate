"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, User, CheckCircle2, Sparkles, MessageSquare, Database, ArrowUpRight, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const chatSequence = [
  { id: 1, type: "user", text: "Hi, I need a WhatsApp bot for my real estate company.", delay: 1000 },
  { id: 2, type: "bot", text: "Hello! I'd love to help you build an AI WhatsApp agent. How many properties do you currently manage?", delay: 1500 },
  { id: 3, type: "user", text: "We manage around 50 properties across the city.", delay: 2000 },
  { id: 4, type: "bot", text: "Perfect. An AI agent can automatically answer tenant queries, schedule viewings, and qualify buyers 24/7. Shall we schedule a quick 15-min demo?", delay: 1800 },
  { id: 5, type: "action", text: "Lead Qualified. Sent to CRM.", delay: 800 },
];

function PremiumBotVisual() {
  const [visibleMessages, setVisibleMessages] = useState<typeof chatSequence>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCRMCard, setShowCRMCard] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(visualRef, { margin: "200px 0px 200px 0px" });

  useEffect(() => {
    let isActive = true;

    const runSequence = async () => {
      setVisibleMessages([]);
      setShowCRMCard(false);
      
      for (const msg of chatSequence) {
        if (!isActive) return;

        if (msg.type === "bot") {
          setIsTyping(true);
          await new Promise((r) => setTimeout(r, 1200));
          setIsTyping(false);
        } else if (msg.type === "action") {
          await new Promise((r) => setTimeout(r, 600));
          setShowCRMCard(true);
          continue;
        } else {
          await new Promise((r) => setTimeout(r, msg.delay));
        }

        if (!isActive) return;
        setVisibleMessages((prev) => [...prev, msg]);
      }

      if (isActive) {
        await new Promise((r) => setTimeout(r, 5000));
        if (isActive) runSequence();
      }
    };

    if (isInView) {
      runSequence();
    }

    return () => {
      isActive = false;
    };
  }, [isInView]);

  return (
    <div ref={visualRef} className="relative w-full aspect-[4/5] lg:aspect-[1/1.1] flex items-center justify-center perspective-1000">
      
      {/* Optimized Background Glows */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(37,211,102,0.1) 0%, transparent 50%)' }} 
      />
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none translate-x-1/4 translate-y-1/4" 
        style={{ background: 'radial-gradient(circle, rgba(251,255,0,0.05) 0%, transparent 50%)' }} 
      />

      {/* WhatsApp Interface Mockup */}
      <motion.div 
        initial={{ rotateY: 15, rotateX: 5, scale: 0.9 }}
        animate={{ rotateY: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-[340px] md:max-w-[360px] h-[480px] md:h-[580px] bg-[#F0F2F5] rounded-[28px] md:rounded-[32px] overflow-hidden shadow-2xl border border-white/20 relative z-10 flex flex-col mx-auto"
      >
        {/* WA Header */}
        <div className="bg-[#075E54] text-white px-4 py-4 flex items-center gap-3 shadow-md z-10">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-[15px]">Aatomate AI Assistant</div>
            <div className="text-[12px] text-white/70">Online</div>
          </div>
        </div>

        {/* WA Chat Background */}
        <div className="flex-1 bg-[#E5DDD5] relative p-4 flex flex-col gap-3 overflow-y-auto no-scrollbar" style={{ backgroundImage: "url('https://i.pinimg.com/originals/8f/ba/cb/8fbacbd464e996966eb9d4a6b7a9c21e.jpg')", backgroundSize: "cover", backgroundBlendMode: "overlay" }}>
          
          {visibleMessages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex w-full ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] px-3 py-2 rounded-lg relative shadow-sm ${msg.type === "user" ? "bg-[#DCF8C6] text-black rounded-tr-sm" : "bg-white text-black rounded-tl-sm"}`}>
                <p className="text-[14px] leading-[1.4]">{msg.text}</p>
                <div className="text-[10px] text-black/40 text-right mt-1 flex justify-end items-center gap-1">
                  10:4{idx} AM 
                  {msg.type === "user" && <Check className="w-3 h-3 text-[#34B7F1]" />}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-full justify-start">
              <div className="bg-white rounded-lg rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1">
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-black/40 rounded-full" />
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-black/40 rounded-full" />
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-black/40 rounded-full" />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Floating CRM Card (Automation aspect) */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: showCRMCard ? 1 : 0, x: showCRMCard ? 0 : 20, y: showCRMCard ? 0 : 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute top-[60%] md:top-1/2 lg:top-1/3 right-4 md:right-0 lg:-right-12 md:translate-x-1/4 -translate-y-1/2 w-[220px] md:w-[240px] bg-[#111111]/95 border border-white/10 rounded-2xl p-3 md:p-4 shadow-2xl z-20 backdrop-blur-md"
      >
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
          <Database className="w-4 h-4 text-[#fbff00]" />
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Firebase CRM</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-white">Lead Qualified</div>
            <div className="text-[10px] text-white/50">Real Estate Agency</div>
          </div>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-3">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: showCRMCard ? "100%" : 0 }} 
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-[#fbff00] to-[#25D366]" 
          />
        </div>
      </motion.div>

    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative pt-[96px] pb-16 md:pt-[110px] md:pb-20 lg:pt-[130px] lg:pb-32 overflow-hidden px-4 sm:px-[32px] lg:px-[40px] max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-[64px] items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-7 z-10"
        >
          <div className="inline-flex items-center gap-[6px] md:gap-[8px] px-[12px] md:px-[16px] py-[6px] md:py-[8px] rounded-full bg-[#25D366]/10 border border-[#25D366]/20 mb-[24px] md:mb-[32px] shadow-sm">
            <Sparkles className="w-[10px] h-[10px] md:w-[12px] md:h-[12px] text-[#25D366]" />
            <span className="font-mono text-[10px] md:text-[11px] text-[#25D366] uppercase tracking-widest font-bold">AI Automation Agency</span>
          </div>
          
          <h1 className="font-display text-[44px] sm:text-[56px] md:text-[80px] lg:text-[100px] leading-[0.95] tracking-[-0.03em] text-midnight-ink uppercase mb-[20px] md:mb-[32px]">
            Build AI Agents<br/>
            <span className="text-[#25D366]">That Sell.</span>
          </h1>
          
          <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.6] text-ash-gray font-medium max-w-xl mb-[32px] md:mb-[48px]">
            We deploy intelligent WhatsApp bots and Voice AI systems that qualify leads, answer customer questions, and book appointments 24/7.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[16px] w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto group relative overflow-hidden rounded-[12px] bg-[#25D366] px-[24px] py-[16px] md:px-[32px] md:py-[18px] text-[15px] md:text-[16px] font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-[8px]">
              <span className="relative z-10 uppercase tracking-wide">Build Your AI Agent</span>
              <Bot className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] relative z-10 group-hover:scale-110 transition-transform" />
            </Link>

            <Link href="/contact" className="w-full sm:w-auto group rounded-[12px] bg-white/50 backdrop-blur-sm border-2 border-midnight-ink/10 px-[24px] py-[16px] md:px-[32px] md:py-[18px] text-[15px] md:text-[16px] font-bold text-midnight-ink transition-all hover:bg-white hover:border-midnight-ink/20 flex items-center justify-center gap-[8px]">
              <span className="uppercase tracking-wide">Book a Demo</span>
              <ArrowRight className="w-[16px] h-[16px] opacity-50 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
        
        {/* Visual Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-6 xl:col-span-5 relative"
        >
          <PremiumBotVisual />
        </motion.div>
      </div>
    </section>
  );
}
