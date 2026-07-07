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
    <div className="fixed top-0 left-0 w-full z-[100] flex justify-center pointer-events-none mt-4 sm:mt-6 px-4">
      
      {/* Desktop Floating Pill */}
      <nav 
        className={`pointer-events-auto hidden md:flex items-center p-2 rounded-full transition-all duration-500 ease-out border ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl border-neutral-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] scale-95 origin-top" 
            : "bg-white/80 backdrop-blur-md border-neutral-200/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] scale-100 origin-top"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 pl-3 pr-4 group cursor-pointer">
          <div className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full overflow-hidden bg-white shadow-sm border border-neutral-100 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/aatomate.jpeg" 
              alt="Aatomate Logo" 
              fill 
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span className="font-sans text-[20px] tracking-[-0.04em] font-extrabold leading-none lowercase text-neutral-900 transition-colors duration-200 group-hover:text-black">
            aatomate
          </span>
        </Link>
        
        {/* Links */}
        <div className="flex items-center gap-1 px-4 border-l border-neutral-200/60">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-2 rounded-full text-[15px] font-medium tracking-[-0.01em] text-neutral-600 hover:text-black hover:bg-neutral-100/50 transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="pl-4">
          <Link
            href="/contact"
            className="h-[40px] px-[20px] rounded-full text-[14px] font-semibold tracking-tight text-white bg-black hover:bg-neutral-800 transition-all duration-200 shadow-sm flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
          >
            Schedule demo <span className="opacity-70 font-normal">→</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Floating Nav */}
      <nav 
        className={`pointer-events-auto md:hidden w-full max-w-[600px] mx-auto flex items-center justify-between p-2 rounded-2xl transition-all duration-300 ease-out border ${
          scrolled || isOpen
            ? "bg-white/95 backdrop-blur-xl border-neutral-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)]" 
            : "bg-white/80 backdrop-blur-md border-neutral-200/40 shadow-sm"
        }`}
      >
        {/* Logo Mobile */}
        <Link href="/" className="flex items-center gap-2.5 pl-2 group">
          <div className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full overflow-hidden bg-white shadow-sm border border-neutral-100">
            <Image 
              src="/aatomate.jpeg" 
              alt="Aatomate Logo" 
              fill 
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span className="font-sans text-[20px] tracking-[-0.04em] font-extrabold leading-none lowercase text-neutral-900">
            aatomate
          </span>
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 mr-1 rounded-xl text-neutral-900 bg-neutral-100/50 hover:bg-neutral-200/50 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto md:hidden absolute top-[72px] left-4 right-4 bg-white/95 backdrop-blur-xl border border-neutral-200/60 rounded-[24px] shadow-2xl overflow-hidden z-[99]"
          >
            <div className="flex flex-col p-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 h-[48px] rounded-xl text-[16px] font-medium tracking-[-0.01em] text-neutral-700 hover:text-black hover:bg-neutral-100/50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-neutral-100/80">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center bg-black text-white h-[52px] rounded-xl text-[15px] font-semibold tracking-tight transition-colors hover:bg-neutral-800"
                >
                  Schedule demo →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
