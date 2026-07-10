"use client";

import { motion } from "framer-motion";
import { AlertCircle, Clock, TrendingDown, Users, FileWarning } from "lucide-react";
import { useEffect, useRef } from "react";

const problems = [
  {
    icon: <Clock className="w-6 h-6 text-red-500" />,
    title: "Time Bankrupt",
    description: "Your team spends 60% of their day on repetitive data entry, email follow-ups, and manual reporting instead of high-value work."
  },
  {
    icon: <Users className="w-6 h-6 text-red-500" />,
    title: "Leaky Funnels",
    description: "Prospective customers drop off because they wait hours for a reply. 78% of customers buy from the first responder."
  },
  {
    icon: <FileWarning className="w-6 h-6 text-red-500" />,
    title: "Siloed Operations",
    description: "Your CRM doesn't talk to your ERP, and your support team doesn't know what sales promised. Data chaos."
  },
  {
    icon: <TrendingDown className="w-6 h-6 text-red-500" />,
    title: "Unscalable Costs",
    description: "Every time you grow, you have to hire more administrators. Your operational overhead increases linearly with revenue."
  }
];

export default function Problems() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only auto-slide on mobile where scrolling is active
    const isMobile = window.innerWidth < 1024;
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
    <section className="py-24 bg-[#050505] relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      
      {/* Background Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 font-bold text-[13px] tracking-widest uppercase rounded-full w-fit border border-red-500/20 mb-6">
            <AlertCircle className="w-4 h-4" />
            The Status Quo
          </div>
          <h2 className="font-display text-[48px] md:text-[72px] leading-[1] tracking-tight uppercase text-white mb-6">
            The Cost of <br/><span className="text-red-500">Manual Work</span>
          </h2>
          <p className="text-[18px] md:text-[22px] text-white/50 max-w-2xl mx-auto font-medium">
            If your business relies on humans acting like robots, you are bleeding capital, burning out your team, and losing to faster competitors.
          </p>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 pb-4 md:pb-0 snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {problems.map((prob, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[24px] p-8 hover:bg-red-500/5 hover:border-red-500/30 transition-colors group relative overflow-hidden shrink-0 w-[85vw] sm:w-[320px] lg:w-auto snap-center"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/10 rounded-full blur-[20px] group-hover:bg-red-500/20 transition-colors" />
              
              <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 relative z-10">
                {prob.icon}
              </div>
              <h3 className="text-[22px] font-bold text-white mb-4 relative z-10">{prob.title}</h3>
              <p className="text-[15px] text-white/60 leading-relaxed font-medium relative z-10">{prob.description}</p>
            </motion.div>
          ))}
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
