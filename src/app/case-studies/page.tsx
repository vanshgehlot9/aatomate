"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, Settings, Zap } from "lucide-react";
import { useState } from "react";
import { caseStudies } from "@/data/caseStudies";

export default function CaseStudiesPage() {
  const [activeIndustry, setActiveIndustry] = useState("All");

  return (
    <main className="min-h-screen bg-[#050505] text-paper-white font-sans selection:bg-[#fbff00] selection:text-black flex flex-col pt-32 lg:pt-[120px] relative">
      <Navbar />
      
      {/* Solid black mask to protect the transparent navbar during scroll */}
      <div className="fixed top-0 left-0 w-full h-[90px] md:h-[110px] bg-[#050505] z-40 pointer-events-none" />
      
      {/* Container matching Dayos large rounded top */}
      <div className="flex-1 bg-[#f2f2f2] text-midnight-ink rounded-t-[32px] md:rounded-t-[48px] w-full max-w-[1600px] mx-auto border-t border-white/5 flex flex-col relative z-30 mt-4 md:mt-8">
        
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left Sidebar (Filters) */}
          <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200/80 p-6 md:p-8 lg:p-10 bg-[#fafafa]">
            
            {/* Search */}
            <div className="relative mb-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-transparent border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-[14px] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              />
            </div>

            <h2 className="font-display text-[22px] uppercase tracking-tight mb-8">Filter View</h2>

            {/* Industry Dropdown */}
            <div className="mb-8">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">Industry</label>
              <div className="relative">
                <select className="w-full bg-transparent border border-gray-300 rounded-xl py-3 px-4 pr-10 text-[14px] focus:outline-none appearance-none cursor-pointer font-medium hover:border-black transition-colors">
                  <option>All</option>
                  <option>Healthcare</option>
                  <option>Real Estate</option>
                  <option>E-commerce</option>
                  <option>Finance</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>

            {/* Platform Type Pills */}
            <div className="mb-8">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">Platform type</label>
              <div className="flex flex-col gap-2.5">
                {['Voice Agents', 'WhatsApp AI', 'Customer Support', 'Agentic Workflows'].map(type => (
                  <button key={type} className="flex items-center gap-3 bg-white border border-gray-200 rounded-full p-2 text-[13px] font-medium hover:border-black hover:shadow-sm transition-all w-fit pr-5 text-left group">
                    <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-gray-100 transition-colors">
                      <Settings className="w-3.5 h-3.5 text-black" />
                    </div>
                    {type}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Main Grid */}
          <div className="flex-1 p-6 sm:p-8 lg:p-12 xl:p-16 bg-[#f2f2f2]">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
              
              {caseStudies.map((study, i) => (
                <Link href={`/case-studies/${study.slug}`} key={i} className="block group">
                  <div className="bg-white rounded-[24px] lg:rounded-[32px] overflow-hidden flex flex-col sm:flex-row transition-all group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:-translate-y-1 border border-white group-hover:border-gray-100 min-h-[280px]">
                    
                    {/* Left Graphic Area */}
                    <div className="w-full sm:w-[35%] lg:w-[30%] h-[180px] sm:h-auto bg-[#e5e5e5] relative overflow-hidden shrink-0 flex items-center justify-center">
                      <div className="absolute inset-0 opacity-10 pointer-events-none z-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
                      <div className={`absolute bottom-0 left-0 w-[150%] h-[150%] origin-bottom-left -rotate-[25deg] translate-y-[70%] sm:translate-y-[65%] ${study.color} transition-transform duration-700 ease-out group-hover:translate-y-[55%] z-0`} />
                      <div className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 bg-[#efefef] shadow-[8px_8px_20px_rgba(0,0,0,0.1),-8px_-8px_20px_rgba(255,255,255,0.8)] rounded-xl transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 flex items-center justify-center border border-white">
                        {study.icon}
                      </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col bg-white relative">
                      <div className="absolute top-6 right-6 w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform z-20 shadow-md">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                      </div>

                      <h3 className="font-display text-[26px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[1] tracking-tight uppercase text-black mb-3 pr-14 group-hover:text-gray-800 transition-colors">
                        {study.title}
                      </h3>
                      
                      <p className="text-[13px] md:text-[14px] text-gray-500 font-medium mb-8 leading-relaxed pr-2">
                        {study.description}
                      </p>

                      <div className="mt-auto flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-[#ededed] flex items-center justify-center shrink-0 border border-gray-200">
                            <svg viewBox="0 0 24 24" className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                          </div>
                          <span className="text-[12px] font-bold text-gray-800">{study.industry}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-[#ededed] flex items-center justify-center shrink-0 border border-gray-200">
                            <svg viewBox="0 0 24 24" className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                          </div>
                          <span className="text-[12px] font-bold text-gray-800">{study.solution}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

            </div>
          </div>

        </div>
      </div>
      
      <div className="bg-[#f2f2f2]">
        <div className="bg-[#050505]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
