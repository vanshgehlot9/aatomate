"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { createRazorpayOrder, verifyRazorpayPayment, generateOnboardingToken } from "@/app/actions/payment";


import { Database } from "@/lib/types/supabase";

type PricingPlan = Database['public']['Tables']['pricing_plans']['Row'] & {
  features: Database['public']['Tables']['pricing_features']['Row'][]
}

export default function Pricing({ plans = [] }: { plans?: PricingPlan[] }) {
  const router = useRouter();
  const [isProcessing, startTransition] = useTransition();
  const [activePlanId, setActivePlanId] = useState<string | null>(null);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleGetStarted = (plan: PricingPlan) => {
    if (!plan.monthly_price) {
      router.push('/contact');
      return;
    }

    setActivePlanId(plan.id);
    startTransition(async () => {
      try {
        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
          alert("Failed to load Razorpay SDK");
          setActivePlanId(null);
          return;
        }

        const res = await createRazorpayOrder(plan.id, plan.monthly_price);
        
        if (res.error) {
          alert(res.error);
          setActivePlanId(null);
          return;
        }

        const options = {
          key: res.keyId,
          amount: res.amount,
          currency: "INR",
          name: "Aatomate",
          description: `Subscription for ${plan.plan_name}`,
          order_id: res.orderId,
          handler: async function (response: any) {
            const verifyRes = await verifyRazorpayPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );

            if (verifyRes.success) {
              const tokenRes = await generateOnboardingToken(response.razorpay_order_id);
              if (tokenRes.success) {
                const clinicUrl = process.env.NEXT_PUBLIC_CLINIC_URL || 'http://localhost:3001';
                window.location.href = `${clinicUrl}/onboarding?token=${tokenRes.token}`;
              } else {
                alert("Failed to create secure onboarding session: " + tokenRes.error);
                setActivePlanId(null);
              }
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          },
          theme: {
            color: "#fbff00",
          },
          modal: {
            ondismiss: function() {
              setActivePlanId(null);
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error(err);
        alert("An unexpected error occurred.");
        setActivePlanId(null);
      }
    });
  };

  return (
    <section id="pricing" className="py-32 relative overflow-hidden bg-paper-white">
      {/* Background using custom generated 3D neon geometric shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-paper-white/70 backdrop-blur-[2px] z-10" />
        <div className="w-full h-full opacity-60 mix-blend-multiply" style={{ backgroundImage: "url('/pricing-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 relative z-30">
        </div>

        <div 
          className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-6 items-center pb-8 lg:pb-0 snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {plans.map((plan, index) => {
            const isYellow = plan.popular;
            const currentPrice = plan.monthly_price;
            const currentSubtext = "/ month";
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
                      ? "bg-[#161616] text-white shadow-[0_0_60px_rgba(251,255,0,0.15)] lg:scale-105 z-10 border-2 border-[#fbff00]" 
                      : "bg-[#111111] text-white shadow-2xl border border-white/10"
                  }`}
                >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden rounded-tr-[38px]">
                    <div className="absolute top-6 -right-8 w-40 bg-[#fbff00] text-black font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-2 text-center transform rotate-45 shadow-lg">
                      {plan.badge_text || "MOST POPULAR"}
                    </div>
                  </div>
                )}

                <div className="mb-6 lg:mb-8">
                  <h3 className={`font-mono text-[12px] lg:text-[13px] font-bold tracking-[0.2em] mb-3 lg:mb-4 ${isYellow ? "text-[#fbff00]" : "text-white/50"}`}>
                    {plan.plan_name}
                  </h3>
                  <p className="text-[16px] md:text-[18px] font-medium leading-[1.5] pr-4 lg:pr-8 text-white/80">
                    {plan.description || "Perfect for businesses looking to scale."}
                  </p>
                </div>

                <div className="mb-8 lg:mb-10">
                  <div className="flex flex-col xl:flex-row xl:items-baseline gap-1 xl:gap-3 mb-4">
                    <div className="font-display text-[48px] md:text-[64px] lg:text-[72px] leading-[1] tracking-[-0.03em] text-white">
                      {priceDisplay}
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-widest font-bold text-white/40">
                      {currentSubtext}
                    </span>
                  </div>
                  
                  <div
                    className="inline-block px-3 py-1.5 rounded-lg text-[10px] md:text-[11px] font-bold uppercase tracking-wider bg-white/5 text-white/70"
                  >
                    {currentOnboarding}
                  </div>
                </div>

                <div className="w-full h-[1px] mb-10 bg-white/10" />

                <div className="flex-grow mb-8 lg:mb-12">
                  <ul className="space-y-4 lg:space-y-5">
                    {plan.features.map((feature, i) => (
                      <li key={feature.id} className="flex items-start gap-3 lg:gap-4">
                        <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-[#fbff00]/10">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#fbff00]" />
                        </div>
                        <span className="text-[14px] lg:text-[15px] font-medium leading-relaxed text-white/90">
                          {feature.feature_text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleGetStarted(plan)}
                  disabled={isProcessing && activePlanId === plan.id}
                  className={`group w-full py-5 px-6 text-center font-bold text-[15px] uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-3 mt-auto disabled:opacity-70 ${
                    isYellow
                      ? "bg-[#fbff00] text-black hover:shadow-[0_0_30px_rgba(251,255,0,0.4)] hover:bg-white hover:scale-[1.02]"
                      : "bg-white text-black hover:bg-[#fbff00] hover:scale-[1.02]"
                  }`}
                >
                  {isProcessing && activePlanId === plan.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {plan.cta_text || "GET STARTED"}
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </>
                  )}
                </button>
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
