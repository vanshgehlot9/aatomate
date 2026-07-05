"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import React, { useRef, useState } from "react";
import { submitLead } from "@/app/actions/leads";

export default function ProductCTA({ product }: { product: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "",
    phone: "",
    company_name: "",
    city: "",
    state: "",
    terms_accepted: false
  });
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.company_name,
        city: formData.city,
        state: formData.state,
        terms_accepted: formData.terms_accepted,
        service_interested: product.slug,
      });

      if (result.success) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="demo-form" className="py-32 bg-paper-white relative overflow-hidden perspective-1000">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="w-full"
        >
          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full cursor-crosshair group flex flex-col lg:flex-row items-center lg:p-16 lg:bg-[#0A0A0A] lg:rounded-[48px] lg:shadow-[0_40px_80px_rgba(0,0,0,0.2)] lg:overflow-hidden gap-0 lg:gap-12"
          >
            {/* Mobile Dark Background wrapper */}
            <div className="absolute inset-x-0 top-0 bottom-[220px] bg-[#0A0A0A] rounded-[40px] lg:hidden -z-10 shadow-[0_20px_40px_rgba(0,0,0,0.2)] overflow-hidden" style={{ transform: "translateZ(-10px)" }}>
               {/* Ambient Background Grid */}
               <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at center, white 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
               {/* Dynamic Glow Spotlight */}
               <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/3" style={{ backgroundColor: product.themeColor }} />
            </div>

            {/* Desktop Ambient Backgrounds */}
            <div className="hidden lg:block absolute inset-0 opacity-[0.05] pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(circle at center, white 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
            <div 
              className="hidden lg:block absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/3 group-hover:opacity-40 transition-opacity duration-1000 -z-10"
              style={{ backgroundColor: product.themeColor }}
            />

            <div className="flex-1 relative z-10 text-white w-full p-8 pt-12 pb-24 lg:p-0" style={{ transform: "translateZ(60px)" }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="font-display text-[48px] md:text-[64px] leading-[1.05] uppercase mb-6 tracking-tight text-white group-hover:text-white/90 transition-colors">
                  Ready to <br/><span style={{ color: product.themeColor }}>Upgrade?</span>
                </h2>
                <p className="text-[18px] text-white/60 mb-10 max-w-md leading-relaxed" style={{ transform: "translateZ(40px)" }}>
                  Register for a live demo of the {product.slug.split("-").join(" ")} and see exactly how it can scale your operations autonomously.
                </p>
                <div className="flex items-center gap-4" style={{ transform: "translateZ(20px)" }}>
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: product.themeColor }}></span>
                      <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: product.themeColor }}></span>
                    </div>
                    <span className="text-white/80 text-[13px] font-bold uppercase tracking-widest">Ready to deploy in 24 hours</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* The Form Card (Floating above the dark container) */}
            <div className="w-full lg:w-[480px] px-4 lg:px-0 relative z-20 -mt-16 lg:mt-0 pb-12 lg:pb-0">
              <div 
                className="w-full bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-black/5"
                style={{ transform: "translateZ(80px)" }}
              >
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg" style={{ backgroundColor: `${product.themeColor}20` }}>
                      <Send className="w-10 h-10" style={{ color: product.themeColor }} />
                    </div>
                    <h3 className="text-[28px] font-display font-bold text-midnight-ink mb-2">Request Received!</h3>
                    <p className="text-midnight-ink/60 font-medium">Our team will contact you shortly to schedule your live demo.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h3 className="text-[28px] font-display font-bold text-midnight-ink mb-2">Schedule a Demo</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-midnight-ink/50 uppercase tracking-widest mb-1.5">Full Name <span className="text-red-500">*</span></label>
                        <input 
                          required 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#f4f4f5] border-2 border-transparent focus:border-black/10 rounded-xl px-4 py-3 outline-none transition-all font-medium text-[14px] text-midnight-ink" 
                          placeholder="John Doe" 
                        />
                      </div>
                      
                      {/* Work Email */}
                      <div>
                        <label className="block text-[11px] font-bold text-midnight-ink/50 uppercase tracking-widest mb-1.5">Work Email <span className="text-red-500">*</span></label>
                        <input 
                          required 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#f4f4f5] border-2 border-transparent focus:border-black/10 rounded-xl px-4 py-3 outline-none transition-all font-medium text-[14px] text-midnight-ink" 
                          placeholder="john@company.com" 
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[11px] font-bold text-midnight-ink/50 uppercase tracking-widest mb-1.5">Contact Number <span className="text-red-500">*</span></label>
                        <input 
                          required 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#f4f4f5] border-2 border-transparent focus:border-black/10 rounded-xl px-4 py-3 outline-none transition-all font-medium text-[14px] text-midnight-ink" 
                          placeholder="+91 98765 43210" 
                        />
                      </div>

                      {/* Company Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-midnight-ink/50 uppercase tracking-widest mb-1.5">Company / Clinic</label>
                        <input 
                          type="text" 
                          value={formData.company_name}
                          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                          className="w-full bg-[#f4f4f5] border-2 border-transparent focus:border-black/10 rounded-xl px-4 py-3 outline-none transition-all font-medium text-[14px] text-midnight-ink" 
                          placeholder="City Health Inc." 
                        />
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-[11px] font-bold text-midnight-ink/50 uppercase tracking-widest mb-1.5">City</label>
                        <input 
                          type="text" 
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-[#f4f4f5] border-2 border-transparent focus:border-black/10 rounded-xl px-4 py-3 outline-none transition-all font-medium text-[14px] text-midnight-ink" 
                          placeholder="Mumbai" 
                        />
                      </div>

                      {/* State */}
                      <div>
                        <label className="block text-[11px] font-bold text-midnight-ink/50 uppercase tracking-widest mb-1.5">State</label>
                        <input 
                          type="text" 
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-[#f4f4f5] border-2 border-transparent focus:border-black/10 rounded-xl px-4 py-3 outline-none transition-all font-medium text-[14px] text-midnight-ink" 
                          placeholder="Maharashtra" 
                        />
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-3 mt-2">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        required
                        checked={formData.terms_accepted}
                        onChange={(e) => setFormData({ ...formData, terms_accepted: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <label htmlFor="terms" className="text-[12px] text-midnight-ink/60 leading-tight font-medium">
                        I agree to the <a href="/terms" className="underline hover:text-black">Terms & Conditions</a> and <a href="/privacy" className="underline hover:text-black">Privacy Policy</a>. I consent to be contacted regarding this request.
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="group/btn w-full mt-4 font-bold text-[16px] uppercase tracking-wider rounded-2xl py-5 flex justify-center items-center gap-3 transition-all duration-300 disabled:opacity-50 relative overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1"
                      style={{ backgroundColor: product.themeColor, color: product.slug === 'hotel-bot' ? 'black' : 'white' }}
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-[0%] transition-transform duration-300" />
                      <span className="relative z-10">{isSubmitting ? "Submitting..." : "Get Live Demo"}</span>
                      {!isSubmitting && <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
