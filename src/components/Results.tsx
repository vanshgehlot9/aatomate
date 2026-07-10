"use client";

import { motion, useInView } from "framer-motion";
import { PhoneCall, MessageSquare, Clock, Workflow, RotateCw, Pause, Activity, TrendingUp, CheckCircle2, Database, Zap, Sparkles, Server } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

// Ultra-Premium Robust Overlapping Visual Compositions
const WhatsAppVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center p-8 group perspective-1000">
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay" />
    
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative z-10 w-full max-w-[320px] transition-transform duration-500 group-hover:-translate-y-2"
    >
      <div className="bg-white/60 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-6 relative z-20">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center border border-[#25D366]/20 shadow-inner">
            <MessageSquare className="w-6 h-6 text-[#25D366]" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#25D366]/10 rounded-full border border-[#25D366]/20">
            <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shadow-[0_0_10px_#25D366]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#25D366]">Online</span>
          </div>
        </div>
        <div className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1">Total Patient Bookings</div>
        <div className="text-4xl font-black text-gray-900 tracking-tighter flex items-center gap-3">
          14,204
          <span className="text-sm font-bold text-[#25D366] bg-[#25D366]/10 px-2 py-1 rounded-lg flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +42%
          </span>
        </div>
      </div>

      <div className="absolute -bottom-8 -right-8 bg-white/80 backdrop-blur-2xl border border-white shadow-2xl rounded-xl p-4 z-30 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-[9px] uppercase font-bold text-gray-500">CRM Sync</div>
            <div className="text-sm font-bold text-gray-900">Real-time</div>
          </div>
        </div>
      </div>

      <div className="absolute -top-4 -left-4 bg-gray-900 text-white shadow-2xl rounded-lg px-4 py-2 z-30 flex items-center gap-2 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2">
        <Zap className="w-3 h-3 text-[#fbff00]" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Zero Latency</span>
      </div>
    </motion.div>
  </div>
);

const WorkflowVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center p-8 group perspective-1000">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative z-10 w-full max-w-[320px] transition-transform duration-500 group-hover:scale-105"
    >
      <div className="bg-white/60 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-6 relative z-20 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-10" />
        <motion.div 
          animate={{ left: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -translate-y-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent -z-10"
        />

        <div className="flex justify-between items-center mb-8 relative">
          <div className="w-12 h-12 rounded-xl bg-white shadow-md border border-gray-100 flex items-center justify-center z-10">
            <Workflow className="w-5 h-5 text-gray-700" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] shadow-md border border-gray-800 flex items-center justify-center z-10">
            <Sparkles className="w-5 h-5 text-[#fbff00]" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 shadow-md border border-[#25D366]/20 flex items-center justify-center z-10">
            <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
          </div>
        </div>

        <div className="text-center">
          <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Manual Hours Eliminated</div>
          <div className="text-3xl font-black text-gray-900 tracking-tighter">4,500<span className="text-sm text-gray-400 font-bold ml-1">/mo</span></div>
        </div>
      </div>
    </motion.div>
  </div>
);

const VoiceVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center p-8 group perspective-1000">
    <div className="absolute inset-0 bg-[#b87af5]/5 mix-blend-overlay" />
    
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative z-10 w-full max-w-[320px] transition-transform duration-500 group-hover:-translate-y-2"
    >
      <div className="bg-white/60 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-6 relative z-20">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200/50">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b87af5] to-[#9333ea] flex items-center justify-center shadow-lg shadow-[#b87af5]/30">
            <PhoneCall className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 flex gap-1 items-center h-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div 
                key={i}
                animate={{ scaleY: [0.2, 1, 0.2] }}
                transition={{ duration: 0.6, delay: i * 0.05, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-full bg-[#b87af5] rounded-full origin-bottom"
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-gray-500">
            <span>Sentiment</span>
            <span className="text-[#25D366]">Highly Positive</span>
          </div>
          <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-gray-500">
            <span>Intent Score</span>
            <span className="text-gray-900 text-sm">98.5%</span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -left-6 bg-gray-900 border border-gray-800 shadow-2xl rounded-xl p-4 z-30 w-48 transition-transform duration-500 group-hover:-translate-x-4 group-hover:translate-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Server className="w-3 h-3 text-[#b87af5]" />
          <span className="text-[9px] uppercase font-mono text-gray-400">Live Agent Log</span>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-[#25D366]">➜ Connecting...</div>
          <div className="text-[10px] font-mono text-white">➜ Qualifying Lead</div>
          <motion.div animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-1.5 h-3 bg-[#b87af5] mt-1" />
        </div>
      </div>
    </motion.div>
  </div>
);

const SupportVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center p-8 group perspective-1000">
    <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay" />
    
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative z-10 w-full max-w-[320px] transition-transform duration-500 group-hover:-translate-y-2"
    >
      <div className="bg-white/60 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-6 relative z-20 text-center">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 transform -rotate-6">
          <Clock className="w-8 h-8 text-white" />
        </div>
        <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-2">Average Resolution Time</div>
        <div className="text-5xl font-black text-gray-900 tracking-tighter mb-4">
          1.2<span className="text-2xl text-gray-400">s</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "95%" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="h-full bg-blue-500" 
          />
        </div>
      </div>

      <div className="absolute -top-6 -right-6 bg-white shadow-2xl rounded-xl p-3 z-30 flex items-center gap-3 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2">
        <div className="w-8 h-8 rounded-full bg-[#fbff00]/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-yellow-600" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div>
          <div className="text-[9px] uppercase font-bold text-gray-500">CSAT Score</div>
          <div className="text-sm font-black text-gray-900">4.9/5.0</div>
        </div>
      </div>
    </motion.div>
  </div>
);

const visualStyles = [
  { bgColor: "bg-[#e5fcc2]", visualColor: "bg-[#d5eca4]", visualContent: <WhatsAppVisual /> },
  { bgColor: "bg-[#d9f2ff]", visualColor: "bg-[#c5e5f5]", visualContent: <WorkflowVisual /> },
  { bgColor: "bg-[#f0d9ff]", visualColor: "bg-[#e1c5f5]", visualContent: <VoiceVisual /> },
  { bgColor: "bg-[#ffecd4]", visualColor: "bg-[#f5deb5]", visualContent: <SupportVisual /> }
];

export default function Results({ caseStudies = [] }: { useCases?: any[], caseStudies?: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const displayStudies = caseStudies.length > 0 ? caseStudies : [
    {
      slug: "healthcare-patient-bookings",
      title: "Automating Patient Bookings for a Leading Clinic",
      industry: "Healthcare Company",
      problem: "The clinic was overwhelmed with manual appointment scheduling via phone calls and emails, leading to a 40% missed call rate and overwhelmed reception staff.",
      solution: "Deployed a HIPAA-compliant WhatsApp AI agent that handles patient booking requests, answers FAQs, and synchronizes directly with their internal CRM 24/7.",
      results: [
        "Reduced manual administrative work by 72%",
        "Saved ₹8 lakh annually in operational costs",
        "Processing time reduced from 3 days to 2 hours"
      ]
    },
    {
      slug: "manufacturing-supply-chain",
      title: "Streamlining Supply Chain Reporting",
      industry: "Manufacturing Company",
      problem: "Generating daily inventory and supply chain reports required pulling data from three legacy systems, taking a dedicated team over 15 hours a week.",
      solution: "Implemented an automated agentic workflow that extracts data from legacy systems overnight, synthesizes it, and sends a daily actionable PDF report via email.",
      results: [
        "Saved 60+ hours of manual data entry per month",
        "Achieved 100% reporting accuracy",
        "Enabled real-time decision making for procurement"
      ]
    },
    {
      slug: "recruitment-candidate-screening",
      title: "Accelerating Candidate Screening",
      industry: "Recruitment Agency",
      problem: "Recruiters spent 70% of their time manually reviewing resumes and conducting initial phone screens for hundreds of unqualified applicants.",
      solution: "Built an AI-powered voice agent that calls applicants immediately upon submission, asks 5 qualifying questions, and scores their intent and fit automatically.",
      results: [
        "Qualified 4,000+ leads automatically in month one",
        "Reduced time-to-hire by 12 days",
        "Increased recruiter placement rate by 45%"
      ]
    },
    {
      slug: "retail-customer-support",
      title: "Scaling 24/7 Customer Support",
      industry: "Retail Business",
      problem: "The brand experienced a massive spike in support tickets regarding order tracking during the holiday season, resulting in response times over 48 hours.",
      solution: "Integrated a smart chatbot across their website and Instagram that resolves tracking queries instantly and escalates complex issues with full context.",
      results: [
        "Resolved 85% of tier-1 support queries instantly",
        "Cut response times from 48 hours to 2 seconds",
        "Saved ₹12 lakh during peak holiday season"
      ]
    }
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[0] as HTMLElement;
    if (!card) return;
    
    const itemWidth = card.offsetWidth + 16;
    const newIndex = Math.round(container.scrollLeft / itemWidth);
    
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < displayStudies.length) {
      setActiveIndex(newIndex);
    }
  };

  const isInView = useInView(scrollRef, { margin: "-20%" });

  const scrollTo = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = Array.from(container.children) as HTMLElement[];
    const targetCard = cards[index];
    
    if (targetCard) {
      const scrollPosition = targetCard.offsetLeft - (container.offsetWidth / 2) + (targetCard.offsetWidth / 2);
      container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
    
    setActiveIndex(index);
    
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
  }, [isAutoPlaying]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying && isInView) {
      interval = setInterval(() => {
        setActiveIndex(current => {
          const nextIndex = current + 1 >= displayStudies.length ? 0 : current + 1;
          
          if (scrollRef.current) {
            const container = scrollRef.current;
            const cards = Array.from(container.children) as HTMLElement[];
            const targetCard = cards[nextIndex];
            if (targetCard) {
              const scrollPosition = targetCard.offsetLeft - (container.offsetWidth / 2) + (targetCard.offsetWidth / 2);
              container.scrollTo({ left: scrollPosition, behavior: "smooth" });
            }
          }
          
          return nextIndex;
        });
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, isInView]);

  return (
    <section id="case-studies" className="py-24 bg-paper-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <h2 className="font-display text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] text-midnight-ink uppercase mb-6 relative inline-block">
            <span className="absolute inset-0 bg-[#d9e8fa] -z-10 transform -skew-x-2 rounded-sm" />
            CASE STUDIES
          </h2>
          <p className="text-[18px] md:text-[24px] text-midnight-ink font-bold tracking-tight">
            Businesses buy proof.
          </p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-4 hide-scrollbar px-[5vw] md:px-[10vw]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayStudies.map((item, index) => {
          const style = visualStyles[index % visualStyles.length];
          const resultsArray = Array.isArray(item.results) ? item.results : [];

          return (
            <div 
              key={index}
              className={`snap-center shrink-0 w-[85vw] md:w-[75vw] max-w-[1200px] h-auto min-h-[600px] md:h-[650px] rounded-[32px] md:rounded-[48px] flex flex-col md:flex-row overflow-hidden relative ${style.bgColor}`}
            >
              {/* Mobile Arrow Button (Top Right) */}
              <Link href={`/case-studies/${item.slug}`} className="absolute top-6 right-6 w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center z-30 hover:scale-105 transition-transform md:hidden shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </Link>

              {/* Content Area */}
              <div className={`w-full md:w-1/2 p-6 md:p-14 flex flex-col justify-start md:justify-center relative z-20 shrink-0`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 text-midnight-ink font-bold text-[11px] md:text-[13px] tracking-widest uppercase rounded-full mb-6 w-fit border border-black/10">
                  {item.industry || "Case Study"}
                </div>
                
                <h3 className="font-display text-[26px] sm:text-[32px] md:text-[42px] leading-[1.0] tracking-[-0.02em] text-midnight-ink uppercase mb-6 pr-14 md:pr-0">
                  {item.title}
                </h3>
                
                <div className="space-y-6 mb-8 pr-4">
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-midnight-ink/50 mb-2">Problem</h4>
                    <p className="text-[14px] md:text-[15px] text-midnight-ink/80 leading-relaxed font-medium">
                      {item.problem}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-[#20bd5a] mb-2">Solution</h4>
                    <p className="text-[14px] md:text-[15px] text-midnight-ink leading-relaxed font-bold">
                      {item.solution}
                    </p>
                  </div>

                  {resultsArray.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-midnight-ink/50 mb-3">Key Result</h4>
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-5 h-5 text-[#20bd5a] shrink-0 mt-0.5" />
                        <span className="text-[15px] md:text-[17px] font-bold text-midnight-ink leading-tight">
                          {resultsArray[0]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Desktop Link Button */}
                <Link 
                  href={`/case-studies/${item.slug}`}
                  className="hidden md:flex bg-midnight-ink text-white text-[13px] font-bold px-6 py-3 rounded-full w-fit hover:bg-black transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
                >
                  Read Full Case Study
                </Link>
              </div>

              {/* Visual Area */}
              <div className={`w-full md:w-1/2 flex-1 flex items-center justify-center relative overflow-hidden rounded-t-[32px] md:rounded-none ${style.visualColor}`}>
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
                
                <div className="relative z-10 w-full h-full flex items-center justify-center scale-90 md:scale-100 origin-top md:origin-center">
                  {style.visualContent}
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="shrink-0 w-[5vw] md:w-[10vw]" />
      </div>

      <div className="flex items-center gap-2 justify-start mt-4 px-[5vw] md:px-[10vw]">
        <button 
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-12 h-12 rounded-full bg-[#f2f2f2] flex items-center justify-center hover:bg-[#e5e5e5] transition-colors shrink-0"
          aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
        >
          {isAutoPlaying ? (
            <RotateCw className="w-5 h-5 text-midnight-ink animate-[spin_4s_linear_infinite]" />
          ) : (
            <Pause className="w-5 h-5 text-midnight-ink" />
          )}
        </button>

        <div className="h-12 bg-[#f2f2f2] rounded-full px-5 flex items-center gap-2.5">
          {displayStudies.map((_, i) => (
            <button 
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all duration-300 bg-midnight-ink ${i === activeIndex ? 'w-6 h-2.5' : 'w-2.5 h-2.5 hover:bg-midnight-ink/50'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
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
