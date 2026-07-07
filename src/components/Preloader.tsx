"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after a short delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-canvas-ice"
        >
          {/* Beautiful Loader animation */}
          <div className="relative flex flex-col items-center justify-center">
            
            {/* Pulsing ring */}
            <motion.div 
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.8, 0.3] 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-28 h-28 rounded-full border border-neutral-300"
            />
            
            {/* Spinning ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-20 h-20 rounded-full border-t-2 border-r-2 border-black opacity-40"
            />
            
            {/* Center Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shadow-md border border-neutral-100"
            >
              <Image src="/aatomate.jpeg" alt="Logo" fill className="object-cover" />
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 font-sans font-bold text-black tracking-[0.2em] text-[10px] uppercase"
          >
            Loading Environment
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
