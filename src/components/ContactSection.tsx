"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Clock } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="py-32 px-4 relative bg-[#030303] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      
      {/* Massive Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Copy */}
        <div className="w-full lg:w-1/2">
          <h2 className="font-display text-[48px] md:text-[80px] leading-[1] tracking-tight uppercase text-white mb-6">
            Let's build <br/><span className="text-white/40">the future.</span>
          </h2>
          <p className="text-[18px] md:text-[22px] text-white/50 font-medium mb-12 max-w-lg leading-relaxed">
            Stop losing hours to manual tasks. Deploy intelligent AI agents and scale your business without scaling your headcount.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-12">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[12px] font-bold tracking-widest uppercase text-white/40">Response Time</div>
                <div className="font-bold text-white">&lt; 2 Hours</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[12px] font-bold tracking-widest uppercase text-white/40">Email Us directly</div>
                <div className="font-bold text-white">info@aatomate.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Form / CTA Box */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none" />
            
            <h3 className="text-[28px] font-display uppercase tracking-tight text-white mb-8">Book a Discovery Call</h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold tracking-widest uppercase text-white/40">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold tracking-widest uppercase text-white/40">Work Email</label>
                  <input type="email" placeholder="john@company.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[12px] font-bold tracking-widest uppercase text-white/40">Company Website</label>
                <input type="text" placeholder="https://yourcompany.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
              </div>

              <button className="w-full bg-white text-black font-bold text-[18px] py-5 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3 group mt-4">
                Submit Request <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-[12px] text-white/30 mt-6 text-center font-medium">
              By submitting, you agree to our Privacy Policy. No spam, we promise.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
