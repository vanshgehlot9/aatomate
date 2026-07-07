"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "services", href: "/#services" },
    { name: "process", href: "/#process" },
    { name: "industries", href: "/#industries" },
    { name: "products", href: "/#products" },
    { name: "pricing", href: "/#pricing" },
    { name: "results", href: "/#results" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto w-full relative flex items-center justify-between min-h-[64px]">
        
        {/* Logo - Separated and Bigger */}
        <Link href="/" className="pointer-events-auto flex items-center gap-4 group relative z-10 shrink-0">
          <div className="relative flex items-center justify-center w-[48px] h-[48px] md:w-[64px] md:h-[64px] rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-sm border border-neutral-200/60 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
            <Image 
              src="/aatomate.jpeg" 
              alt="Aatomate Logo" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 48px, 64px"
            />
          </div>
          <span className="font-sans text-[28px] md:text-[36px] tracking-[-0.04em] font-extrabold leading-none lowercase text-neutral-900 transition-colors duration-200 group-hover:text-black">
            aatomate
          </span>
        </Link>

        {/* Desktop Center Nav Pill */}
        <nav 
          className={`pointer-events-auto hidden md:flex items-center rounded-full transition-all duration-500 ease-out border absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
            scrolled 
              ? "bg-white/95 backdrop-blur-xl border-neutral-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-2" 
              : "bg-white/60 backdrop-blur-md border-neutral-200/40 shadow-sm p-2"
          }`}
        >
          <div className="flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-5 py-2.5 rounded-full text-[15px] font-medium tracking-[-0.01em] text-neutral-600 hover:text-black hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Desktop CTA Right */}
        <div className="pointer-events-auto hidden md:flex items-center relative z-10 shrink-0">
          <Link
            href="/contact"
            className="h-[48px] px-[26px] rounded-full text-[15px] font-semibold tracking-tight text-white bg-neutral-900 hover:bg-black transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            Book a Demo
            <span className="opacity-70 font-normal transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Mobile Hamburger Pill */}
        <nav 
          className={`pointer-events-auto md:hidden flex items-center p-1.5 rounded-2xl transition-all duration-300 ease-out border relative z-10 ${
            scrolled || isOpen
              ? "bg-white/95 backdrop-blur-xl border-neutral-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)]" 
              : "bg-white/60 backdrop-blur-md border-neutral-200/40 shadow-sm"
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-neutral-800 hover:bg-white hover:shadow-sm transition-all"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto md:hidden absolute top-[80px] left-4 right-4 bg-white/95 backdrop-blur-xl border border-neutral-200/60 rounded-[24px] shadow-2xl overflow-hidden z-[99]"
          >
            <div className="flex flex-col p-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 h-[48px] rounded-xl text-[16px] font-medium tracking-[-0.01em] text-neutral-700 hover:text-black hover:bg-white hover:shadow-sm transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-neutral-100/80">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center bg-black text-white h-[52px] rounded-xl text-[15px] font-semibold tracking-tight transition-all hover:bg-neutral-800 hover:scale-[0.98]"
                >
                  Book a Demo →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

