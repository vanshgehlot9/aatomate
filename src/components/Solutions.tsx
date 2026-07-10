"use client";

import { motion } from "framer-motion";
import { Zap, Bot, Network, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const solutions = [
  {
    icon: <Zap className="w-6 h-6 text-[#25D366]" />,
    title: "Instant Execution",
    description: "Automate entire workflows from data entry to customer responses. Our agents work 24/7/365 without sick days or sleep."
  },
  {
    icon: <Bot className="w-6 h-6 text-[#25D366]" />,
    title: "Zero Lead Leakage",
    description: "Respond to every inquiry in less than 2 seconds. Qualify leads automatically and book them directly onto your calendar."
  },
  {
    icon: <Network className="w-6 h-6 text-[#25D366]" />,
    title: "Perfect Sync",
    description: "We build agents that natively read and write to your existing tools. SAP, Salesforce, Shopify—everything stays perfectly in sync."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-[#25D366]" />,
    title: "Infinite Scale",
    description: "Handle 10 tickets or 10,000 tickets with the exact same overhead. Grow your revenue without growing your headcount."
  }
];

export default function Solutions() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only auto-slide on mobile where scrolling is active
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth * 0.8, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      
      {/* Background Green Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#25D366]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 text-[#25D366] font-bold text-[13px] tracking-widest uppercase rounded-full w-fit border border-[#25D366]/20 mb-6">
              <CheckCircle2 className="w-4 h-4" />
              The AI Advantage
            </div>
            <h2 className="font-display text-[48px] md:text-[64px] leading-[1] tracking-tight uppercase text-white mb-6">
              The <span className="text-[#25D366]">Aatomate</span> Reality
            </h2>
            <p className="text-[18px] text-white/50 font-medium mb-10 leading-relaxed">
              We replace fragile human workflows with robust, intelligent agentic systems. Experience unprecedented speed, perfect accuracy, and margins you've never seen before.
            </p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-[#25D366] text-black font-bold px-8 py-4 rounded-full hover:bg-[#20bd5a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(37,211,102,0.3)]">
              Explore Our Solutions
            </Link>
          </div>

          <div 
            ref={scrollRef}
            className="w-full lg:w-2/3 flex overflow-x-auto md:grid md:grid-cols-2 gap-6 pb-4 md:pb-0 snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {solutions.map((sol, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-[24px] p-8 hover:bg-[#25D366]/5 hover:border-[#25D366]/30 transition-colors group relative overflow-hidden shrink-0 w-[85vw] sm:w-auto snap-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center mb-6 relative z-10">
                  {sol.icon}
                </div>
                <h3 className="text-[20px] font-bold text-white mb-3 relative z-10">{sol.title}</h3>
                <p className="text-[15px] text-white/60 leading-relaxed font-medium relative z-10">{sol.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
