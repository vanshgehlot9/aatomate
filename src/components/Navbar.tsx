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

  const isHomePage = pathname === "/";
  // The text should be dark if we are on the light homepage and haven't scrolled down yet.
  const isDarkText = isHomePage && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Services", href: "/#services" },
    { name: "Process", href: "/#process" },
    { name: "Industries", href: "/#industries" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Results", href: "/#results" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-out border-b ${
        scrolled 
          ? "py-4 bg-[#050505]/90 backdrop-blur-[20px] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)]" 
          : "py-6 bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-[40px]">
          
          {/* Logo (Left) */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden group-hover:opacity-90 transition-opacity bg-white shadow-sm">
              <Image 
                src="/aatomate.jpeg" 
                alt="Aatomate Logo" 
                fill 
                className="object-cover"
                sizes="40px"
              />
            </div>
            <span className={`font-display text-[22px] tracking-tight font-bold leading-none mt-1 uppercase transition-colors duration-300 ${isDarkText ? "text-black" : "text-white"}`}>
              aatomate
            </span>
          </Link>
          
          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[14px] font-medium relative group transition-colors duration-300 ${
                  isDarkText 
                    ? "text-black/60 hover:text-black" 
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out ${isDarkText ? "bg-[#25D366]" : "bg-[#fbff00]"}`} />
              </Link>
            ))}
          </div>

          {/* CTA Button (Right) */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className={`px-6 py-2.5 rounded-full text-[14px] font-bold tracking-wide hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center ${
                isDarkText 
                  ? "bg-black text-white shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]" 
                  : "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              }`}
            >
              Schedule Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors focus:outline-none p-2 ${isDarkText ? "text-black hover:text-[#25D366]" : "text-white hover:text-[#fbff00]"}`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-[100%] left-0 w-full bg-[#050505] overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col px-6 py-8 space-y-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-[28px] font-display uppercase tracking-tight text-white/80 hover:text-white hover:translate-x-2 transition-all"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8 mt-4 border-t border-white/10"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center bg-[#fbff00] text-black h-[56px] rounded-2xl text-[16px] font-bold uppercase tracking-wide active:scale-95 transition-transform"
                >
                  Schedule Demo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
