"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Rocket, Infinity, Target } from "lucide-react";
import { useEffect, useRef } from "react";

const reasons = [
  {
    icon: <Rocket className="w-8 h-8 text-[#fbff00]" />,
    title: "Deployed in Days, Not Months",
    description: "Legacy IT projects take 6 months. We deploy intelligent agents in weeks using our pre-built automation modules.",
    color: "#fbff00"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#25D366]" />,
    title: "Enterprise Grade Security",
    description: "SOC2 & HIPAA compliant architecture. Your data is encrypted at rest and in transit. We never train public models on your private data.",
    color: "#25D366"
  },
  {
    icon: <Infinity className="w-8 h-8 text-[#ec4899]" />,
    title: "Zero-Commission Structure",
    description: "Unlike SaaS tools that take a cut of your revenue, our agents operate on fixed computational costs. Keep 100% of your bookings.",
    color: "#ec4899"
  },
  {
    icon: <Target className="w-8 h-8 text-[#3b82f6]" />,
    title: "Guaranteed ROI",
    description: "We don't build tech for tech's sake. Every workflow we architect is mapped directly to a massive reduction in operational overhead.",
    color: "#3b82f6"
  }
];

export default function WhyChooseUs() {
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
    <section className="py-32 bg-black relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="font-display text-[48px] md:text-[72px] leading-[1] tracking-tight uppercase text-white mb-16">
          Why Brands Choose <br/><span className="text-white/40">Aatomate</span>
        </h2>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto md:grid md:grid-cols-2 gap-8 pb-4 md:pb-0 snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reasons.map((reason, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 p-10 md:p-12 rounded-[2rem] flex flex-col items-center text-center hover:bg-white/10 transition-colors relative overflow-hidden group shrink-0 w-[85vw] sm:w-[320px] md:w-auto snap-center"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-0 group-hover:opacity-10 blur-[50px] rounded-full transition-opacity duration-700" style={{ background: reason.color }} />
              
              <div className="mb-6 relative z-10">
                {reason.icon}
              </div>
              <h3 className="text-[24px] font-bold text-white mb-4 relative z-10">{reason.title}</h3>
              <p className="text-[16px] text-white/50 leading-relaxed font-medium relative z-10 max-w-sm">
                {reason.description}
              </p>
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
