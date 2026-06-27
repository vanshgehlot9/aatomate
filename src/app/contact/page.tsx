"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { ArrowRight, CheckCircle2, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else if (result.success) {
      setIsSuccess(true);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-[#fbff00] selection:text-black flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
            
            {/* Left Side: Copy & Trust Signals */}
            <div className="w-full lg:w-1/2 flex flex-col justify-start lg:justify-center">
              <div className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 w-fit">
                <span className="font-mono text-[12px] text-[#fbff00] uppercase tracking-[0.2em] font-bold">Schedule A Demo</span>
              </div>
              
              <h1 className="font-display text-[38px] leading-[0.95] tracking-tight uppercase mb-4 drop-shadow-2xl sm:text-[48px] md:text-[64px] lg:text-[80px] lg:leading-[0.9] lg:mb-6">
                Let's <span className="text-[#fbff00]/90">Automate</span><br />Your Growth.
              </h1>
              
              <p className="text-[15px] sm:text-[16px] md:text-[20px] text-white/60 max-w-xl mb-6 lg:mb-12 font-medium leading-relaxed">
                Book a personalized demo to see how Aatomate's AI agents can eliminate operational bottlenecks, qualify leads 24/7, and scale your business without hiring.
              </p>

              <div className="hidden lg:block space-y-8 border-t border-white/10 pt-12">
                <div>
                  <h4 className="font-mono text-[11px] uppercase text-white/40 tracking-widest font-bold mb-2">Direct Contact</h4>
                  <p className="text-[18px] font-medium">+91 90002 72248</p>
                  <p className="text-[18px] font-medium text-[#fbff00]">hello@aatomate.com</p>
                </div>
                <div>
                  <h4 className="font-mono text-[11px] uppercase text-white/40 tracking-widest font-bold mb-2">Location</h4>
                  <p className="text-[16px] text-white/70 font-medium">Serving ambitious businesses across India & Asia.</p>
                </div>
              </div>
              
              {/* Mobile Compact Contact Cards */}
              <div className="flex flex-row gap-3 lg:hidden mb-2">
                <a href="tel:+919000272248" className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-[#fbff00]" />
                  <span className="text-[13px] font-bold">Call Us</span>
                </a>
                <a href="mailto:hello@aatomate.com" className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-[#fbff00]" />
                  <span className="text-[13px] font-bold">Email Us</span>
                </a>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2">
              <div className="bg-[#111111] border border-white/10 rounded-[24px] lg:rounded-[32px] p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-2xl">
                {/* Background glow inside card */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#fbff00]/5 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
                
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16 relative z-10"
                  >
                    <div className="w-16 h-16 bg-[#fbff00]/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-[#fbff00]" />
                    </div>
                    <h3 className="font-display text-[28px] uppercase tracking-tight mb-3">Request Received!</h3>
                    <p className="text-white/60 text-[15px] max-w-sm font-medium">
                      Thank you for reaching out. Our team will contact you shortly to schedule your personalized demo.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-6 relative z-10">
                    <div className="lg:hidden mb-2">
                      <h3 className="font-display text-[24px] uppercase tracking-tight text-white mb-1">Schedule a Demo</h3>
                      <p className="text-[13px] text-white/50">Fill out the form below to get started.</p>
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-[14px] font-medium">
                        {error}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="font-mono text-[10px] uppercase text-white/50 tracking-widest font-bold">Full Name *</label>
                        <input required type="text" id="name" name="name" className="bg-white/5 border border-white/10 rounded-xl px-4 h-[52px] text-white placeholder-white/20 focus:outline-none focus:border-[#fbff00]/50 focus:bg-white/10 transition-all font-medium text-[15px]" placeholder="John Doe" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="font-mono text-[10px] uppercase text-white/50 tracking-widest font-bold">Work Email *</label>
                        <input required type="email" id="email" name="email" className="bg-white/5 border border-white/10 rounded-xl px-4 h-[52px] text-white placeholder-white/20 focus:outline-none focus:border-[#fbff00]/50 focus:bg-white/10 transition-all font-medium text-[15px]" placeholder="john@company.com" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="company" className="font-mono text-[10px] uppercase text-white/50 tracking-widest font-bold">Company Name</label>
                      <input type="text" id="company" name="company" className="bg-white/5 border border-white/10 rounded-xl px-4 h-[52px] text-white placeholder-white/20 focus:outline-none focus:border-[#fbff00]/50 focus:bg-white/10 transition-all font-medium text-[15px]" placeholder="Acme Corp" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="service" className="font-mono text-[10px] uppercase text-white/50 tracking-widest font-bold">Primary Interest</label>
                      <select id="service" name="service" className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 h-[52px] text-white focus:outline-none focus:border-[#fbff00]/50 focus:bg-[#222] transition-all font-medium text-[15px] appearance-none">
                        <option value="Voice Agents">Voice AI Agents</option>
                        <option value="WhatsApp AI">WhatsApp Automation</option>
                        <option value="Customer Support">Customer Support Bots</option>
                        <option value="Not Sure">Not Sure / Other</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="font-mono text-[10px] uppercase text-white/50 tracking-widest font-bold">How can we help? *</label>
                      <textarea required id="message" name="message" rows={3} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#fbff00]/50 focus:bg-white/10 transition-all font-medium text-[15px] resize-none" placeholder="Tell us about your operational bottlenecks..." />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="mt-2 group relative overflow-hidden rounded-xl bg-[#fbff00] h-[52px] text-[15px] font-bold text-midnight-ink shadow-[0_0_30px_rgba(251,255,0,0.15)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                    >
                      <span className="relative z-10 uppercase tracking-wide">
                        {isSubmitting ? "Sending..." : "Request Demo"}
                      </span>
                      {!isSubmitting && <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />}
                    </button>
                    
                    <p className="text-center font-mono text-[10px] text-white/30 uppercase tracking-widest mt-1">
                      By submitting, you agree to our Privacy Policy.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
