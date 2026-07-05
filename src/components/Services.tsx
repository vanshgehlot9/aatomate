"use client";

import { motion, useAnimationControls } from "framer-motion";
import { PhoneCall, HeadphonesIcon, LineChart, Cpu, Workflow, ArrowRight, ArrowLeft, DatabaseZap, Activity } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { Database } from "@/lib/types/supabase";

type ServiceType = Database['public']['Tables']['services']['Row']

export default function Services({ services = [] }: { services?: ServiceType[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#030303] text-paper-white mt-12 rounded-[48px] lg:rounded-[64px] mx-2 lg:mx-4 overflow-hidden border border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-[#fbff00]/5 via-transparent to-transparent opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-[#fbff00] animate-pulse shadow-[0_0_10px_rgba(251,255,0,0.8)]" />
              <span className="font-mono text-[11px] text-white uppercase tracking-widest font-bold">Platform Capabilities</span>
            </div>
            <h2 className="font-display text-[56px] md:text-[80px] leading-[0.9] tracking-tight uppercase max-w-2xl drop-shadow-2xl">
              AI Agents for<br /><span className="text-white/30">Every Function.</span>
            </h2>
          </div>
          <p className="text-[16px] md:text-[18px] text-white/50 max-w-sm leading-relaxed font-medium">
            Production-ready in 2 weeks. Seven battle-tested AI solutions deployed across clinics, e-commerce, and agencies.
          </p>
        </motion.div>

        {/* FEATURED: WhatsApp Bot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-[32px] md:rounded-[48px] bg-gradient-to-br from-[#111111] to-[#050505] border border-white/10 overflow-hidden mb-8 grid grid-cols-1 lg:grid-cols-2 shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-[#fbff00]/5 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {/* Left Text */}
          <div className="p-10 md:p-16 flex flex-col justify-center relative z-10 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/5 border border-[#25D366]/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(37,211,102,0.15)]">
              {/* WhatsApp Icon SVG */}
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#25D366]" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </div>
            <h3 className="font-display text-[40px] md:text-[56px] leading-[0.9] uppercase tracking-tight text-white mb-6">
              Full-Scale <br/><span className="text-[#25D366]">WhatsApp AI Bot</span>
            </h3>
            <p className="text-[16px] text-white/50 leading-relaxed font-medium mb-10 max-w-md">
              Don't just send auto-replies. Our WhatsApp AI acts like a brilliant human agent — it handles complex product inquiries, qualifies leads instantly, books appointments, and syncs directly to your CRM.
            </p>
            <div className="flex gap-4">
              <span className="px-4 py-2 rounded-full bg-white/5 text-[13px] font-bold tracking-wide uppercase text-white border border-white/10">24/7 Booking</span>
              <span className="px-4 py-2 rounded-full bg-white/5 text-[13px] font-bold tracking-wide uppercase text-white border border-white/10">CRM Sync</span>
            </div>
          </div>
          
          {/* Right Integration Node Map */}
          <div className="relative bg-[#050505] p-8 md:p-12 overflow-hidden min-h-[400px] flex items-center justify-center border-l border-white/5">
            {/* Background Grid & Glows */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
            {/* Optimized Background Glows */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" 
              style={{ background: 'radial-gradient(circle, rgba(37,211,102,0.15) 0%, transparent 60%)' }}
            />
            <div className="relative z-10 w-full h-full flex items-center justify-center min-h-[300px]">
              
              {/* Central WhatsApp Node */}
              <div className="absolute z-30 w-20 h-20 bg-gradient-to-b from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(37,211,102,0.4)] border-4 border-[#050505]">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                
                {/* Central Pulse */}
                <div className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-50" style={{ animationDuration: '2s' }} />
              </div>

              {/* Orbital Path (Dashed Circle) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-white/5 border-dashed z-0" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-white/[0.02] border-dashed z-0" />

              {/* Connected Node 1: AI Engine (Top Left) */}
              <div className="absolute top-[15%] left-[20%] flex flex-col items-center gap-2 z-20">
                <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-white/10 flex items-center justify-center shadow-xl">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">GPT-4 Omni</span>
                
                {/* Connection Line */}
                <svg className="absolute top-full left-1/2 w-[80px] h-[60px] pointer-events-none -z-10 overflow-visible">
                  <path d="M 0 0 Q 20 40 50 70" fill="none" stroke="rgba(37,211,102,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="50" cy="70" r="2" fill="#25D366" />
                </svg>
              </div>

              {/* Connected Node 2: CRM (Top Right) */}
              <div className="absolute top-[10%] right-[15%] flex flex-col items-center gap-2 z-20">
                <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#fbff00]/20 flex items-center justify-center shadow-[0_0_20px_rgba(251,255,0,0.1)]">
                  <DatabaseZap className="w-5 h-5 text-[#fbff00]" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#fbff00]/60">CRM Sync</span>
                
                {/* Connection Line */}
                <svg className="absolute top-full right-1/2 w-[80px] h-[80px] pointer-events-none -z-10 overflow-visible" style={{ transform: 'scaleX(-1)' }}>
                  <path d="M 0 0 Q 30 50 60 90" fill="none" stroke="rgba(251,255,0,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Connected Node 3: Calendar (Bottom Left) */}
              <div className="absolute bottom-[10%] left-[10%] flex flex-col items-center gap-2 z-20">
                <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#3b82f6]/20 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <svg className="w-5 h-5 text-[#3b82f6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#3b82f6]/60">Calendar API</span>
              </div>

              {/* Connected Node 4: Payments (Bottom Right) */}
              <div className="absolute bottom-[20%] right-[10%] flex flex-col items-center gap-2 z-20">
                <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#a855f7]/20 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                  <svg className="w-5 h-5 text-[#a855f7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#a855f7]/60">Payments</span>
              </div>

              {/* Orbiting Data Packets (Glowing Dots) */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-transparent"
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fbff00] shadow-[0_0_10px_#fbff00]" />
              </motion.div>
              
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 w-[340px] h-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-transparent"
              >
                <div className="absolute top-1/2 left-0 w-2 h-2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#3b82f6] shadow-[0_0_10px_#3b82f6]" />
                <div className="absolute bottom-0 left-1/2 w-2 h-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#25D366] shadow-[0_0_10px_#25D366]" />
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* CAROUSEL HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-mono text-[14px] uppercase tracking-widest text-white/50 font-bold">More Automation Solutions</h3>
          <div className="flex gap-2">
            <button onClick={scrollLeft} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollRight} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CAROUSEL TRACK */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="snap-start flex-shrink-0 w-[300px] md:w-[380px] p-8 rounded-[32px] bg-[#0A0A0A] border border-white/5 hover:border-white/15 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#fbff00]/0 to-[#fbff00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-16 group-hover:bg-[#fbff00] group-hover:text-black group-hover:scale-110 transition-all duration-300">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-[26px] leading-none mb-3 uppercase tracking-tight text-white group-hover:text-[#fbff00] transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-[14px] leading-relaxed text-white/40 font-medium group-hover:text-white/60 transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global style for hiding scrollbar in carousel */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />

      </div>
    </section>
  );
}
