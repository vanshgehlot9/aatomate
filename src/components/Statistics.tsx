"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Clock, PiggyBank } from "lucide-react";

const stats = [
  {
    id: 1,
    value: "500+",
    label: "Hours Saved",
    icon: Clock,
  },
  {
    id: 2,
    value: "95%",
    label: "Automation Accuracy",
    icon: CheckCircle2,
  },
  {
    id: 3,
    value: "60%",
    label: "Faster Operations",
    icon: TrendingUp,
  },
  {
    id: 4,
    value: "40%",
    label: "Lower Admin Costs",
    icon: PiggyBank,
  },
];

export default function Statistics() {
  return (
    <section className="relative w-full py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto z-20 -mt-16 md:-mt-24 mb-16 md:mb-24">
      <div className="group rounded-[32px] md:rounded-[48px] bg-gradient-to-br from-[#0A0A0A] to-[#050505] p-6 md:p-16 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-700 hover:border-white/20">
        
        {/* Dynamic Glowing Backgrounds */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#25D366]/20 blur-[100px] md:blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:bg-[#25D366]/30 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#fbff00]/10 blur-[100px] md:blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none group-hover:bg-[#fbff00]/20 transition-colors duration-700" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

        <div 
          className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 md:gap-8 relative z-10 lg:divide-x divide-white/10 pb-4 md:pb-0 snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center justify-center text-center group/stat px-2 md:px-4 shrink-0 w-[140px] md:w-auto snap-center"
            >
              <div className="w-12 h-12 md:w-20 md:h-20 rounded-[16px] md:rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center mb-4 md:mb-6 text-white group-hover/stat:scale-110 group-hover/stat:bg-[#25D366]/10 group-hover/stat:text-[#25D366] group-hover/stat:border-[#25D366]/30 transition-all duration-500 shadow-xl backdrop-blur-md">
                <stat.icon className="w-6 h-6 md:w-10 md:h-10" />
              </div>
              <div className="font-display text-[40px] md:text-[72px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-1 md:mb-2 tracking-tight leading-none group-hover/stat:scale-105 transition-transform duration-500">
                {stat.value}
              </div>
              <div className="text-[12px] md:text-[16px] font-bold text-white/40 uppercase tracking-widest font-mono mt-2 md:mt-4 group-hover/stat:text-white/80 transition-colors duration-500 text-center leading-tight">
                {stat.label}
              </div>
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
