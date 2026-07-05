"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function ProductFAQ({ product }: { product: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-paper-white">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-[40px] uppercase text-center mb-16 text-midnight-ink">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {product.faqs.map((faq: any, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-white border-black/10 shadow-sm' : 'border-black/5 hover:border-black/10'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-[16px] text-midnight-ink pr-8">{faq.question}</span>
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    style={{ backgroundColor: isOpen ? `${product.themeColor}20` : '#f5f5f5' }}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" style={{ color: product.themeColor }} />
                    ) : (
                      <Plus className="w-4 h-4 text-midnight-ink/50" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-midnight-ink/70 leading-relaxed text-[15px]">
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
