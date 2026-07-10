"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Database } from "@/lib/types/supabase";

type FAQ = Database['public']['Tables']['faqs']['Row'];

const fallbackFaqs = [
  {
    id: "1",
    question: "How long does implementation take?",
    answer: "Implementation time varies based on complexity, but most of our core AI agents and WhatsApp bots are deployed within 2 to 4 weeks. Custom enterprise integrations may take 6 to 8 weeks."
  },
  {
    id: "2",
    question: "How secure is your AI?",
    answer: "Security is our top priority. Our solutions are built with enterprise-grade encryption, and we offer HIPAA-compliant architecture for healthcare clients. We never train public models on your proprietary data."
  },
  {
    id: "3",
    question: "Can AI integrate with ERP?",
    answer: "Absolutely. Our AI seamlessly integrates with leading ERPs and CRMs including SAP, Salesforce, Oracle, QuickBooks, and Hubspot, ensuring data flows perfectly into your existing infrastructure."
  },
  {
    id: "4",
    question: "Do you build custom AI?",
    answer: "Yes. While we have pre-built modules for quick deployment, we specialize in building bespoke AI agents tailored specifically to your unique business logic and operational workflows."
  },
  {
    id: "5",
    question: "What industries do you support?",
    answer: "We build automation solutions across a wide range of sectors, with deep expertise in Healthcare, Manufacturing, E-commerce, Retail, Real Estate, and Recruitment."
  }
];

export default function FAQ({ faqs = [] }: { faqs?: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs;

  return (
    <section className="py-24 bg-[#0a0a0a] text-white relative border-t border-white/5">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] uppercase mb-6">
            Frequently Asked <br />
            <span className="text-white/40">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {displayFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  id={`faq-btn-${faq.id}`}
                >
                  <span className="font-bold text-[18px] text-white pr-8 group-hover:text-[#25D366] transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-[#25D366] text-black rotate-180" : "bg-white/10 text-white group-hover:bg-[#25D366] group-hover:text-black"
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-[16px] leading-relaxed text-white/70 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
