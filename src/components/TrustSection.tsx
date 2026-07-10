"use client";

import { motion } from "framer-motion";
import { Star, Building2, Briefcase, Rocket } from "lucide-react";

const trustBadges = [
  {
    icon: <Star className="w-6 h-6 text-[#FBBC05] fill-[#FBBC05]" />,
    title: "Google Reviews",
    subtitle: "5.0/5.0 Rated",
  },
  {
    icon: <Building2 className="w-6 h-6 text-white" />,
    title: "MSME Registered",
    subtitle: "Govt. of India",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-white" />,
    title: "LLP Registered",
    subtitle: "Ministry of Corporate Affairs",
  },
  {
    icon: <Rocket className="w-6 h-6 text-white" />,
    title: "Startup India",
    subtitle: "DPIIT Recognized",
  }
];

export default function TrustSection() {
  return (
    <section className="w-full bg-[#0a0a0a] border-y border-white/5 py-10 relative z-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[12px] font-mono tracking-[0.2em] text-white/40 uppercase mb-8">
          Recognized & Trusted By
        </p>
        
        <div 
          className="flex overflow-x-auto md:grid md:grid-cols-4 gap-6 md:gap-12 items-center md:justify-center pb-4 md:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trustBadges.map((badge, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-3 group shrink-0 w-[160px] md:w-auto snap-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-xl backdrop-blur-md">
                {badge.icon}
              </div>
              <div className="text-center">
                <div className="text-[14px] font-bold text-white tracking-wide">{badge.title}</div>
                <div className="text-[12px] font-medium text-white/50">{badge.subtitle}</div>
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
