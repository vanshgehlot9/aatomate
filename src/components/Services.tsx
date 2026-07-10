"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  BrainCircuit, 
  Workflow, 
  Users, 
  MessageSquare, 
  FileText, 
  GitMerge, 
  GraduationCap, 
  BarChart3, 
  Building2,
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Database } from "@/lib/types/supabase";

type ServiceType = Database['public']['Tables']['services']['Row']

const IconMap: Record<string, any> = {
  BrainCircuit, Workflow, Users, MessageSquare, FileText, GitMerge, GraduationCap, BarChart3, Building2, Cpu
};

const gradients = [
  "from-[#25D366]/40 to-[#25D366]/5",
  "from-[#fbff00]/40 to-[#fbff00]/5",
  "from-[#3b82f6]/40 to-[#3b82f6]/5",
  "from-[#a855f7]/40 to-[#a855f7]/5",
  "from-[#ef4444]/40 to-[#ef4444]/5",
  "from-[#f97316]/40 to-[#f97316]/5",
  "from-[#14b8a6]/40 to-[#14b8a6]/5",
  "from-[#ec4899]/40 to-[#ec4899]/5",
  "from-[#8b5cf6]/40 to-[#8b5cf6]/5",
];

// Abstract SVG patterns for different cards to add more visual interactivity
const SVGShape = ({ index }: { index: number }) => {
  if (index % 3 === 0) return (
    <>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-10 right-10 w-64 h-64 opacity-20 pointer-events-none text-[#25D366]">
        <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,96.5,-2.5C96.2,13,89.6,28.5,80.1,41.9C70.6,55.3,58.2,66.6,44.2,74.9C30.2,83.2,14.6,88.5,-0.6,89.5C-15.8,90.5,-31.6,87.2,-45.5,79.5C-59.4,71.8,-71.4,59.7,-80,45.4C-88.6,31.1,-93.8,14.6,-93.6,-1.7C-93.4,-18,-87.8,-33.9,-78.5,-47.3C-69.2,-60.7,-56.2,-71.6,-42.1,-78.8C-28,-86,-13.9,-89.5,0.7,-90.7C15.3,-91.9,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-10 left-10 w-96 h-96 opacity-[0.15] pointer-events-none text-white rotate-45">
        <path fill="currentColor" d="M39.9,-65.6C52.4,-57.8,63.6,-47,72.7,-34C81.8,-21,88.8,-5.8,87,8.2C85.2,22.2,74.6,35,63.1,46.1C51.6,57.2,39.2,66.6,25.2,73.1C11.2,79.6,-4.4,83.2,-19.9,81.1C-35.4,79,-50.8,71.2,-63.2,59.8C-75.6,48.4,-85,33.4,-88.4,17.4C-91.8,1.4,-89.2,-15.6,-81.4,-29.9C-73.6,-44.2,-60.6,-55.8,-46.8,-63.2C-33,-70.6,-18.4,-73.8,-2.9,-69.1C12.6,-64.4,27.4,-73.4,39.9,-65.6Z" transform="translate(100 100) rotate(45)" />
      </svg>
    </>
  );
  if (index % 3 === 1) return (
    <>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-20 right-0 w-72 h-72 opacity-20 pointer-events-none text-[#fbff00]">
        <path fill="currentColor" d="M47.7,-74.6C60.4,-65.4,68.2,-50,75.4,-34.5C82.6,-19,89.2,-3.4,86.6,10.6C84,24.6,72.2,37,60.2,49.1C48.2,61.2,36,73,21.5,78.8C7,84.6,-9.8,84.4,-25.2,78.9C-40.6,73.4,-54.6,62.6,-65.2,49.5C-75.8,36.4,-83,21,-84.9,5.2C-86.8,-10.6,-83.4,-26.8,-74.5,-39.8C-65.6,-52.8,-51.2,-62.6,-37.2,-70.7C-23.2,-78.8,-9.6,-85.2,4,-90.9C17.6,-96.6,35,-83.8,47.7,-74.6Z" transform="translate(100 100) scale(1.1)" />
      </svg>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -top-10 left-20 w-56 h-56 opacity-10 pointer-events-none text-white -rotate-12">
        <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,96.5,-2.5C96.2,13,89.6,28.5,80.1,41.9C70.6,55.3,58.2,66.6,44.2,74.9C30.2,83.2,14.6,88.5,-0.6,89.5C-15.8,90.5,-31.6,87.2,-45.5,79.5C-59.4,71.8,-71.4,59.7,-80,45.4C-88.6,31.1,-93.8,14.6,-93.6,-1.7C-93.4,-18,-87.8,-33.9,-78.5,-47.3C-69.2,-60.7,-56.2,-71.6,-42.1,-78.8C-28,-86,-13.9,-89.5,0.7,-90.7C15.3,-91.9,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
    </>
  );
  return (
    <>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-10 w-80 h-80 opacity-20 pointer-events-none text-white">
        <path fill="currentColor" d="M39.9,-65.6C52.4,-57.8,63.6,-47,72.7,-34C81.8,-21,88.8,-5.8,87,8.2C85.2,22.2,74.6,35,63.1,46.1C51.6,57.2,39.2,66.6,25.2,73.1C11.2,79.6,-4.4,83.2,-19.9,81.1C-35.4,79,-50.8,71.2,-63.2,59.8C-75.6,48.4,-85,33.4,-88.4,17.4C-91.8,1.4,-89.2,-15.6,-81.4,-29.9C-73.6,-44.2,-60.6,-55.8,-46.8,-63.2C-33,-70.6,-18.4,-73.8,-2.9,-69.1C12.6,-64.4,27.4,-73.4,39.9,-65.6Z" transform="translate(100 100) rotate(45)" />
      </svg>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 right-40 w-60 h-60 opacity-[0.12] pointer-events-none text-[#25D366] rotate-90">
        <path fill="currentColor" d="M47.7,-74.6C60.4,-65.4,68.2,-50,75.4,-34.5C82.6,-19,89.2,-3.4,86.6,10.6C84,24.6,72.2,37,60.2,49.1C48.2,61.2,36,73,21.5,78.8C7,84.6,-9.8,84.4,-25.2,78.9C-40.6,73.4,-54.6,62.6,-65.2,49.5C-75.8,36.4,-83,21,-84.9,5.2C-86.8,-10.6,-83.4,-26.8,-74.5,-39.8C-65.6,-52.8,-51.2,-62.6,-37.2,-70.7C-23.2,-78.8,-9.6,-85.2,4,-90.9C17.6,-96.6,35,-83.8,47.7,-74.6Z" transform="translate(100 100) scale(1.1)" />
      </svg>
    </>
  );
}

export default function Services({ services = [] }: { services?: ServiceType[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!services || services.length === 0) return null;

  const activeService = services[activeIndex];
  const IconComponent = activeService?.icon_name && IconMap[activeService.icon_name] ? IconMap[activeService.icon_name] : Cpu;
  const currentGradient = gradients[activeIndex % gradients.length];

  // Parse benefits safely to show them in the card
  const rawBenefits = activeService?.benefits;
  const benefits: string[] = Array.isArray(rawBenefits) ? rawBenefits as string[] : [];
  // Take only the first 3 benefits to display on the card
  const displayBenefits = benefits.slice(0, 3);

  return (
    <section id="services" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#030303] text-paper-white mt-12 rounded-[48px] lg:rounded-[64px] mx-2 lg:mx-4 overflow-hidden border border-white/5">
      
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Unique Interactive Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Interactive List */}
          <div className="w-full lg:w-5/12 flex flex-col relative z-20">
            {services.map((service, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div 
                  key={service.id} 
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`group cursor-pointer relative overflow-hidden transition-all duration-500 border-b border-white/5 ${isActive ? 'py-8' : 'py-5 hover:py-6'}`}
                >
                  {/* Active Indicator Background */}
                  <div className={`absolute inset-0 bg-white/5 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  
                  {/* Left Accent Bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#25D366] transition-transform duration-500 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
                  
                  <div className={`relative z-10 flex items-center gap-4 md:gap-8 px-4 md:px-8 transition-all duration-500 ${isActive ? 'translate-x-1 md:translate-x-2' : ''}`}>
                    <span className={`font-mono text-[12px] md:text-[16px] shrink-0 transition-colors duration-500 ${isActive ? 'text-[#25D366] font-bold' : 'text-white/20'}`}>
                      0{idx + 1}
                    </span>
                    <h3 className={`font-display uppercase tracking-tight transition-all duration-500 break-words leading-tight ${isActive ? 'text-[22px] sm:text-[28px] md:text-[44px] text-white' : 'text-[16px] sm:text-[20px] md:text-[32px] text-white/40 group-hover:text-white/70'}`}>
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Mobile Description (Hidden on Desktop) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden px-4 md:px-8 mt-4 overflow-hidden"
                      >
                        <p className="text-white/50 mb-6">{service.description}</p>
                        <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-[#25D366] font-bold text-[14px] uppercase tracking-widest pb-4">
                          Explore Service <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Sticky Preview (Desktop Only) */}
          <div className="hidden lg:block w-full lg:w-7/12 relative h-full min-h-[650px]">
            <div className="sticky top-32 w-full h-[650px] rounded-[48px] bg-[#0A0A0A] border border-white/10 overflow-hidden shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0 p-12 xl:p-16 flex flex-col justify-between"
                >
                  {/* Dynamic Glowing Background */}
                  <div className={`absolute top-0 right-0 w-full h-[500px] bg-gradient-to-bl ${currentGradient} opacity-30 blur-[100px] pointer-events-none rounded-full translate-x-1/4 -translate-y-1/4`} />
                  
                  {/* Interactive Abstract SVG Background */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden"
                  >
                    <SVGShape index={activeIndex} />
                  </motion.div>
                  
                  {/* Content Container */}
                  <div className="relative z-10">
                    <motion.div 
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-2xl backdrop-blur-xl"
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h3 className="font-display text-[48px] xl:text-[56px] leading-[1] uppercase tracking-tight text-white mb-6 max-w-lg">
                      {activeService.title}
                    </h3>
                    
                    <p className="text-[18px] xl:text-[20px] text-white/60 font-medium leading-relaxed max-w-md mb-8">
                      {activeService.description}
                    </p>

                    {/* Rich Description: Display Benefits inside the preview card */}
                    {displayBenefits.length > 0 && (
                      <div className="space-y-4 max-w-md">
                        <div className="text-[12px] font-mono text-[#fbff00] uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                          <Sparkles className="w-3 h-3" /> Key Benefits
                        </div>
                        {displayBenefits.map((benefit, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                            <span className="text-white/80 text-[15px] font-medium leading-snug">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 pt-10 mt-auto border-t border-white/10 flex items-center justify-between">
                    <div className="flex gap-2">
                      {services.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-8 bg-white' : 'w-2 bg-white/20'}`} />
                      ))}
                    </div>
                    <Link href={`/services/${activeService.slug}`} className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[14px] hover:scale-105 transition-transform active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                      View Details
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
