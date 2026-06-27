"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";

import { Database } from "@/lib/types/supabase";

type PricingPlan = Database['public']['Tables']['pricing_plans']['Row'] & {
  features: Database['public']['Tables']['pricing_features']['Row'][]
}

export default function Pricing({ plans = [] }: { plans?: PricingPlan[] }) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "onetime">("onetime");

  return (
    <section id="pricing" className="py-32 relative overflow-hidden bg-paper-white">
      {/* Background using custom generated 3D neon geometric shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-paper-white/70 backdrop-blur-[2px] z-10" />
        <div className="w-full h-full opacity-60 mix-blend-multiply" style={{ backgroundImage: "url('/pricing-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 md:mb-32 relative z-30">

          {/* Animated Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="bg-[#111111] border border-white/10 p-1.5 rounded-full flex gap-1 relative z-10 shadow-2xl">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`relative px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors z-20 ${
                  billingCycle === "monthly" ? "text-black" : "text-white/60 hover:text-white"
                }`}
              >
                {billingCycle === "monthly" && (
                  <motion.div
                    layoutId="pricing-pill"
                    className="absolute inset-0 bg-[#fbff00] rounded-full -z-10 shadow-[0_0_20px_rgba(251,255,0,0.3)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                Pay Monthly
              </button>
              <button
                onClick={() => setBillingCycle("onetime")}
                className={`relative px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors z-20 ${
                  billingCycle === "onetime" ? "text-black" : "text-white/60 hover:text-white"
                }`}
              >
                {billingCycle === "onetime" && (
                  <motion.div
                    layoutId="pricing-pill"
                    className="absolute inset-0 bg-[#fbff00] rounded-full -z-10 shadow-[0_0_20px_rgba(251,255,0,0.3)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                Pay Once (Lifetime)
              </button>
            </div>
          </motion.div>
        </div>

        <div 
          className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-6 items-center pb-8 lg:pb-0 snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {plans.map((plan, index) => {
            const isYellow = plan.popular;
            const currentPrice = billingCycle === "monthly" ? plan.monthly_price : plan.yearly_price;
            const currentSubtext = billingCycle === "monthly" ? "/ month" : "/ year";
            const priceDisplay = currentPrice ? `₹${currentPrice.toLocaleString('en-IN')}` : "Custom";
            const currentOnboarding = plan.setup_fee || "Onboarding included";
            
            return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 100, damping: 20 }}
                  whileHover={{ y: -10 }}
                  className={`relative p-8 md:p-10 lg:p-12 rounded-[32px] md:rounded-[40px] flex flex-col h-full shrink-0 w-[80vw] sm:w-[320px] lg:w-auto snap-center transition-all duration-500 ${
                    isYellow 
                      ? "bg-gradient-to-br from-[#fbff00] to-[#e5e800] text-black shadow-[0_0_80px_rgba(251,255,0,0.15)] lg:scale-105 z-10 border border-[#fbff00]" 
                      : "bg-[#111111] text-white shadow-2xl border border-white/10"
                  }`}
                >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden rounded-tr-[40px]">
                    <div className="absolute top-6 -right-8 w-40 bg-black text-[#fbff00] font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-2 text-center transform rotate-45 shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="mb-6 lg:mb-8">
                  <h3 className={`font-mono text-[12px] lg:text-[13px] font-bold tracking-[0.2em] mb-3 lg:mb-4 ${isYellow ? "text-black/60" : "text-white/50"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-[16px] md:text-[20px] font-medium leading-[1.4] pr-4 lg:pr-8 ${isYellow ? "text-black" : "text-white"}`}>
                    Perfect for businesses looking to scale.
                  </p>
                </div>

                <div className="mb-8 lg:mb-10">
                  <div className="flex flex-col xl:flex-row xl:items-baseline gap-1 xl:gap-3 mb-4">
                    <div className="font-display text-[48px] md:text-[64px] lg:text-[72px] leading-[1] tracking-[-0.03em]">
                      {priceDisplay}
                    </div>
                    <span className={`font-mono text-[11px] uppercase tracking-widest font-bold ${isYellow ? "text-black/50" : "text-white/40"}`}>
                      {currentSubtext}
                    </span>
                  </div>
                  
                  <div
                    className={`inline-block px-3 py-1.5 rounded-lg text-[10px] md:text-[11px] font-bold uppercase tracking-wider ${
                      isYellow ? "bg-black/10 text-black/70" : "bg-white/10 text-white/70"
                    }`}
                  >
                    {currentOnboarding}
                  </div>
                </div>

                <div className={`w-full h-[1px] mb-10 ${isYellow ? "bg-black/10" : "bg-white/10"}`} />

                <div className="flex-grow mb-8 lg:mb-12">
                  <ul className="space-y-4 lg:space-y-5">
                    {plan.features.map((feature, i) => (
                      <li key={feature.id} className="flex items-start gap-3 lg:gap-4">
                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isYellow ? "bg-black/10" : "bg-white/10"}`}>
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isYellow ? "text-black" : "text-[#fbff00]"}`} />
                        </div>
                        <span className={`text-[14px] lg:text-[15px] font-medium leading-relaxed ${isYellow ? "text-black/80" : "text-white/80"}`}>
                          {feature.feature_text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="#contact"
                  className={`group w-full py-5 px-6 text-center font-bold text-[15px] uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-3 mt-auto ${
                    isYellow
                      ? "bg-black text-[#fbff00] hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:scale-[1.02]"
                      : "bg-white text-black hover:bg-[#fbff00] hover:scale-[1.02]"
                  }`}
                >
                  {plan.cta_text || "GET STARTED"}
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </motion.div>
            );
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
