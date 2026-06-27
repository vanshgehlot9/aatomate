"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Webhook, BrainCircuit, DatabaseZap, Rocket, Activity, GitCommit, ChevronRight, BarChart3, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const steps = [
  {
    id: "01",
    title: "Audit & Identify",
    desc: "We analyze your business workflows to pinpoint exact automation bottlenecks with high ROI potential.",
    icon: Webhook,
    color: "#fbff00"
  },
  {
    id: "02",
    title: "Map & Strategize",
    desc: "We architect the optimal logic routing, selecting the best LLMs to align with your brand voice.",
    icon: BrainCircuit,
    color: "#25D366"
  },
  {
    id: "03",
    title: "Build & Embed",
    desc: "We engineer the AI, integrate your vector databases, and rigorously test edge cases for zero hallucinations.",
    icon: DatabaseZap,
    color: "#3b82f6"
  },
  {
    id: "04",
    title: "Deploy & Scale",
    desc: "The agent goes live. We monitor performance logs and optimize latency as traffic scales.",
    icon: Rocket,
    color: "#ef4444"
  }
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play tabs every 6 seconds, pause on hover
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  return (
    <section id="process" className="py-16 lg:py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      
      {/* Background Texture & Floating Glow */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      
      <div 
        className="absolute top-1/4 right-1/4 w-[800px] h-[800px] pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-[32px] lg:px-[40px] relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20 lg:mb-32">
          <div>
            <div className="inline-flex items-center gap-[8px] px-[16px] py-[8px] rounded-full bg-white/5 border border-white/10 mb-[24px]">
              <GitCommit className="w-[12px] h-[12px] text-[#fbff00] animate-pulse" />
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest font-bold">Deployment Pipeline</span>
            </div>
            <h2 className="font-display text-[40px] sm:text-[48px] lg:text-[72px] leading-[0.9] tracking-[-0.02em] text-paper-white uppercase">
              Live Agent<br />
              <span className="text-white/30">in 14 Days.</span>
            </h2>
          </div>
          <p className="text-[16px] lg:text-[18px] text-white/50 leading-[1.6] max-w-md font-medium pb-2">
            We don't do endless consulting. We architect, build, and deploy intelligent systems at startup speed. Interactive pipeline below.
          </p>
        </div>

        {/* Interactive Tabbed Interface */}
        <div 
          className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[500px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Left Column: Navigation Tabs */}
          <div className="lg:w-5/12 flex overflow-x-auto lg:flex-col gap-4 pb-6 lg:pb-0 snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`relative flex flex-col lg:flex-row items-start gap-4 lg:gap-6 p-5 lg:p-6 rounded-2xl text-left transition-all duration-500 overflow-hidden shrink-0 w-[280px] sm:w-[320px] lg:w-full snap-center ${
                    isActive 
                      ? "bg-white/5 border-white/20 shadow-xl lg:scale-[1.02]" 
                      : "bg-transparent border-white/5 lg:border-transparent hover:bg-white/[0.02] hover:scale-[1.01]"
                  } border`}
                >
                  {/* Active Indicator Background Glow */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" 
                    />
                  )}
                  
                  {/* Auto-play Progress Bar */}
                  {isActive && !isHovered && (
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6, ease: "linear" }}
                      className="absolute bottom-0 left-0 w-full h-[2px] origin-left opacity-30"
                      style={{ backgroundColor: step.color }}
                    />
                  )}

                  <div className={`lg:mt-1 font-mono text-[14px] font-bold transition-colors duration-300 ${isActive ? "" : "text-white/20"}`} style={{ color: isActive ? step.color : undefined }}>
                    {step.id}
                  </div>
                  
                  <div className="flex-1 relative z-10 w-full">
                    <h3 className={`font-display text-[20px] lg:text-[24px] uppercase tracking-tight leading-none mb-2 lg:mb-3 transition-colors duration-300 ${isActive ? "text-white" : "text-white/40"}`}>
                      {step.title}
                    </h3>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-[14px] lg:text-[15px] text-white/50 leading-relaxed font-medium pt-1 lg:pt-2">
                            {step.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className={`hidden lg:block mt-1 transition-transform duration-300 ${isActive ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
                    <ChevronRight className="w-5 h-5 text-white/30" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Visual Showcase */}
          <div className="lg:w-7/12 relative group perspective-1000 mt-6 lg:mt-0">
            <motion.div 
              className="w-full h-full min-h-[350px] md:min-h-[400px] lg:min-h-[500px] rounded-[24px] lg:rounded-[32px] bg-[#0a0a0a] border border-white/10 relative overflow-hidden flex items-center justify-center p-6 lg:p-8 shadow-2xl transition-transform duration-700 hover:rotate-x-2 hover:-rotate-y-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/10 rounded-tl-[32px] opacity-50 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/10 rounded-br-[32px] opacity-50 pointer-events-none" />

              <AnimatePresence mode="wait">
                {/* VISUAL 1: AUDIT */}
                {activeStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, y: 20, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: 10 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="w-full max-w-md bg-[#111111] border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
                  >
                    {/* Scanning Laser Animation */}
                    <motion.div 
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 w-full h-[2px] bg-[#fbff00] shadow-[0_0_15px_#fbff00] z-20 opacity-30"
                    />

                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5 relative z-10">
                      <BarChart3 className="w-5 h-5 text-[#fbff00]" />
                      <div className="font-mono text-[12px] uppercase tracking-widest text-white/50">Workflow Analysis</div>
                      <div className="ml-auto w-2 h-2 rounded-full bg-[#fbff00] animate-pulse" />
                    </div>
                    <div className="space-y-6 relative z-10">
                      <div>
                        <div className="flex justify-between text-[11px] font-mono text-white/40 mb-2 uppercase"><span>Customer Support</span> <span className="text-[#fbff00]">High ROI</span></div>
                        <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                          <motion.div initial={{scaleX:0}} animate={{scaleX:0.85}} transition={{duration:1, ease:"circOut"}} className="absolute inset-0 bg-gradient-to-r from-[#fbff00]/40 to-[#fbff00] origin-left" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] font-mono text-white/40 mb-2 uppercase"><span>Lead Qualification</span> <span className="text-[#fbff00]">Critical</span></div>
                        <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                          <motion.div initial={{scaleX:0}} animate={{scaleX:0.95}} transition={{duration:1, delay:0.2, ease:"circOut"}} className="absolute inset-0 bg-gradient-to-r from-[#fbff00]/40 to-[#fbff00] origin-left" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] font-mono text-white/40 mb-2 uppercase"><span>Internal Operations</span> <span className="text-white/30">Low Priority</span></div>
                        <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                          <motion.div initial={{scaleX:0}} animate={{scaleX:0.3}} transition={{duration:1, delay:0.4, ease:"circOut"}} className="absolute inset-0 bg-white/20 origin-left" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* VISUAL 2: MAP */}
                {activeStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.6, type: "spring", damping: 15 }}
                    className="relative w-full max-w-sm aspect-square flex items-center justify-center"
                  >
                    {/* Glowing Core */}
                    <div className="absolute inset-0 animate-pulse pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,211,102,0.1) 0%, transparent 70%)' }} />
                    
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border border-white/5 border-dashed" 
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-8 rounded-full border border-[#25D366]/20 border-dotted" 
                    />
                    
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 bg-gradient-to-br from-[#25D366]/30 to-[#25D366]/10 border border-[#25D366]/50 rounded-2xl flex items-center justify-center z-10 shadow-[0_0_40px_rgba(37,211,102,0.3)] backdrop-blur-md"
                    >
                      <BrainCircuit className="w-10 h-10 text-[#25D366]" />
                    </motion.div>

                    {/* Nodes popping in */}
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#0a0a0a] border border-[#25D366]/30 rounded-full font-mono text-[10px] text-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.1)]">Input Detected</motion.div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#0a0a0a] border border-white/10 rounded-full font-mono text-[10px] text-white/50">Semantic Search</motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#0a0a0a] border border-white/10 rounded-full font-mono text-[10px] text-white/50">GPT-4 Logic</motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-4 py-1.5 bg-[#0a0a0a] border border-[#25D366]/30 rounded-full font-mono text-[10px] text-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.1)]">Action Triggered</motion.div>
                    
                    <svg className="absolute inset-0 w-full h-full -z-10">
                      <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.3 }} x1="50%" y1="0" x2="50%" y2="50%" stroke="rgba(37,211,102,0.5)" strokeWidth="2" strokeDasharray="4 4" />
                      <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} x1="0" y1="50%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
                      <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.7 }} x1="100%" y1="50%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
                      <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.9 }} x1="50%" y1="50%" x2="50%" y2="100%" stroke="rgba(37,211,102,0.5)" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                  </motion.div>
                )}

                {/* VISUAL 3: BUILD */}
                {activeStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-mono text-[13px] text-white/60 relative"
                  >
                    {/* Terminal Header */}
                    <div className="px-4 py-3 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="text-[10px] text-white/30 uppercase tracking-widest">aatomate-cli</div>
                    </div>
                    {/* Terminal Body with typing effect */}
                    <div className="p-5 space-y-3 min-h-[220px]">
                      <motion.div initial={{opacity:0, x:-5}} animate={{opacity:1, x:0}} transition={{delay:0.1}} className="text-[#3b82f6] flex gap-2"><span>➜</span> <span className="text-white">npm run build:agent</span></motion.div>
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}} className="text-white/40">Compiling neural logic paths...</motion.div>
                      
                      {/* Fake progress bar in terminal */}
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}} className="flex items-center gap-2">
                        <span className="text-[#3b82f6]">Injecting vector embeddings:</span>
                        <div className="flex-1 max-w-[100px] h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                          <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1, delay:1.2}} className="absolute inset-0 bg-[#3b82f6] origin-left" />
                        </div>
                        <span className="text-white/40 text-[10px]">100%</span>
                      </motion.div>

                      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.4}}>Linking APIs (Stripe, HubSpot, Twilio)...</motion.div>
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.0}} className="text-[#25D366] font-bold mt-4">✔ Build successful in 4.2s. Ready for deployment.</motion.div>
                      <motion.div initial={{opacity:0}} animate={{opacity:[0,1,0]}} transition={{delay:3.5, repeat:Infinity, duration:1}} className="w-2 h-4 bg-white/50 inline-block align-middle" />
                    </div>
                  </motion.div>
                )}

                {/* VISUAL 4: DEPLOY */}
                {activeStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative w-full max-w-sm"
                  >
                    {/* Rippling background */}
                    <motion.div 
                      animate={{ scale: [0.8, 1.2, 1.5], opacity: [0, 0.2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-[-50%] pointer-events-none"
                      style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 60%)' }}
                    />

                    <div className="relative bg-[#111111] border border-[#ef4444]/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(239,68,68,0.15)] flex flex-col items-center text-center">
                      
                      <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#ef4444]/20 to-transparent border border-[#ef4444]/50 flex items-center justify-center shrink-0 mb-6 relative">
                        <Globe className="w-8 h-8 text-[#ef4444]" />
                        <div className="absolute top-0 right-0 w-4 h-4 bg-[#111111] rounded-full flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-[#ef4444] rounded-full animate-pulse" />
                        </div>
                      </div>
                      
                      <div className="font-mono text-[11px] text-[#ef4444] uppercase tracking-widest font-bold mb-2">System Status</div>
                      <div className="text-[28px] font-display text-white uppercase tracking-tight leading-none mb-4">Production Live</div>
                      
                      <div className="w-full flex justify-between px-6 py-3 bg-[#050505] rounded-xl border border-white/5">
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] text-white/40 font-mono uppercase mb-1">Latency</span>
                          <span className="text-[14px] text-white font-bold">24ms</span>
                        </div>
                        <div className="w-px h-full bg-white/10" />
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] text-white/40 font-mono uppercase mb-1">Uptime</span>
                          <span className="text-[14px] text-[#25D366] font-bold">99.99%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
