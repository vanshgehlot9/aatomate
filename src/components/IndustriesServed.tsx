"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { industriesData } from "@/data/industries";
import { Activity, Factory, ShoppingBag, Terminal, GraduationCap, Building2, Truck, Coffee, Landmark, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

// Map string icon names from data to actual Lucide components
const IconMap: Record<string, any> = {
  Activity, Factory, ShoppingBag, Terminal, GraduationCap, Building2, Truck, Coffee, Landmark
};

export default function IndustriesServed() {
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
    <section id="industries" className="py-32 bg-[#030303] relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <h2 className="font-display text-[48px] md:text-[72px] leading-[1] tracking-tight uppercase text-white mb-4">
              Industries <br/><span className="text-white/40">We Serve</span>
            </h2>
            <p className="text-[18px] text-white/50 max-w-xl font-medium leading-relaxed">
              We deploy agentic workflows across sectors. Select your industry to see exactly how AI automation will transform your operations.
            </p>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 text-white font-bold hover:text-[#25D366] transition-colors pb-1 border-b border-white/20 hover:border-[#25D366]">
            Don't see yours? Let's talk <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4 md:pb-0 snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {industriesData.map((ind, idx) => {
            const IconComponent = IconMap[ind.iconName] || Activity;
            return (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} className="shrink-0 w-[85vw] sm:w-[320px] md:w-auto snap-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group block bg-white/5 border border-white/10 rounded-[24px] p-8 hover:bg-white/10 transition-all relative overflow-hidden h-full"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 blur-[30px] rounded-full translate-x-1/2 -translate-y-1/2 transition-opacity duration-500" style={{ background: ind.themeColor }} />
                  
                  <div className="flex justify-between items-start mb-12 relative z-10">
                    <div className="w-14 h-14 rounded-[16px] bg-white/5 border border-white/10 flex items-center justify-center transition-colors duration-500" style={{ color: ind.themeColor }}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:bg-white group-hover:text-black transition-all group-hover:scale-110 group-hover:-rotate-12">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-[24px] font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">{ind.shortName}</h3>
                    <p className="text-[14px] text-white/50 font-medium">{ind.hero.title}</p>
                  </div>
                </motion.div>
              </Link>
            )
          })}
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
