import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] text-paper-white pt-[120px] pb-[40px] border-t border-white/5 overflow-hidden">
      
      {/* Background Texture (Subtle Noise) */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
      
      {/* Background Yellow Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#fbff00]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-[32px] lg:px-[40px] relative z-10">
        
        {/* Top CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[40px] pb-[64px] border-b border-white/10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-[8px] px-[16px] py-[8px] rounded-full bg-white/5 border border-white/10 mb-[32px]">
              <div className="w-[8px] h-[8px] rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
              <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest font-bold">System Status: Operational</span>
            </div>
            
            <h2 className="font-display text-[48px] md:text-[64px] leading-[1] tracking-tight uppercase mb-[24px]">
              Ready to <span className="text-[#fbff00]">Automate</span> Your Reality?
            </h2>
            
            <p className="text-[16px] text-white/50 leading-relaxed font-medium">
              We architect intelligent automation for ambitious brands. Let's build something extraordinary together.
            </p>
          </div>

          <div className="flex flex-col items-end gap-[32px] shrink-0">
            <Link href="/contact" className="group flex items-center justify-center gap-[8px] bg-white text-black px-[32px] py-[16px] rounded-[12px] font-bold text-[16px] hover:bg-[#fbff00] transition-colors shadow-lg">
              Start a Project
              <ArrowUpRight className="w-[20px] h-[20px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-[16px]">
              <Link href="https://www.instagram.com/aatomate/" target="_blank" rel="noopener noreferrer" className="w-[44px] h-[44px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#fbff00] hover:bg-white/10 transition-all shadow-sm">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[48px] py-[64px]">
          
          {/* Contact Info */}
          <div className="lg:col-span-3 flex flex-col gap-[24px]">
            <h4 className="font-mono text-[11px] uppercase text-white font-bold tracking-widest mb-[8px]">Contact Info</h4>
            
            <div className="flex items-center gap-[16px]">
              <div className="w-[40px] h-[40px] rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 shrink-0">
                <Mail className="w-[16px] h-[16px]" />
              </div>
              <Link href="mailto:hello@aatomate.com" className="text-[14px] text-white/60 hover:text-[#fbff00] transition-colors">
                hello@aatomate.com
              </Link>
            </div>
            
            <div className="flex items-center gap-[16px]">
              <div className="w-[40px] h-[40px] rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 shrink-0">
                <Phone className="w-[16px] h-[16px]" />
              </div>
              <Link href="tel:+919000272248" className="text-[14px] text-white/60 hover:text-[#fbff00] transition-colors">
                +91 90002 72248
              </Link>
            </div>
            
            <div className="flex items-center gap-[16px]">
              <div className="w-[40px] h-[40px] rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 shrink-0">
                <MapPin className="w-[16px] h-[16px]" />
              </div>
              <span className="text-[14px] text-white/60 leading-relaxed">
                Remote First<br/>India & Global
              </span>
            </div>
          </div>
          
          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-[11px] uppercase text-white font-bold tracking-widest mb-[32px]">Services</h4>
            <ul className="flex flex-col gap-[16px]">
              <li><Link href="#services" className="text-[14px] text-white/60 hover:text-[#fbff00] transition-colors">WhatsApp Agents</Link></li>
              <li><Link href="#services" className="text-[14px] text-white/60 hover:text-[#fbff00] transition-colors">Voice AI Agents</Link></li>
              <li><Link href="#services" className="text-[14px] text-white/60 hover:text-[#fbff00] transition-colors">Customer Support</Link></li>
              <li><Link href="#services" className="text-[14px] text-white/60 hover:text-[#fbff00] transition-colors">Sales Automation</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-[11px] uppercase text-white font-bold tracking-widest mb-[32px]">Products</h4>
            <ul className="flex flex-col gap-[16px]">
              <li><Link href="/products/doctor-bot" className="text-[14px] text-white/60 hover:text-[#fbff00] transition-colors">Hospital Bot</Link></li>
              <li><Link href="/products/hotel-bot" className="text-[14px] text-white/60 hover:text-[#fbff00] transition-colors">Hotel Bot</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-[11px] uppercase text-white font-bold tracking-widest mb-[32px]">Company</h4>
            <ul className="flex flex-col gap-[16px]">
              <li><Link href="#process" className="text-[14px] text-white/60 hover:text-[#fbff00] transition-colors">How It Works</Link></li>
              <li><Link href="#pricing" className="text-[14px] text-white/60 hover:text-[#fbff00] transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="text-[14px] text-white/60 hover:text-[#fbff00] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal & Policy Box */}
          <div className="lg:col-span-3">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-[24px] p-[32px] h-full flex flex-col justify-center">
              <div className="flex items-center gap-[12px] mb-[32px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <h4 className="font-mono text-[11px] uppercase text-white font-bold tracking-widest">Legal & Policy</h4>
              </div>
              <div className="grid grid-cols-2 gap-y-[24px] gap-x-[16px]">
                <Link href="/privacy" className="text-[14px] text-white/50 hover:text-[#fbff00] transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-[14px] text-white/50 hover:text-[#fbff00] transition-colors">Terms of Service</Link>
                <Link href="/refund" className="text-[14px] text-white/50 hover:text-[#fbff00] transition-colors">Refund Policy</Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-[32px] gap-[16px] relative z-10">
          <p className="text-[11px] font-mono text-white/30 tracking-wider text-center md:text-left uppercase">
            © {new Date().getFullYear()} AATOMATE. ALL RIGHTS RESERVED.
          </p>
          <div className="text-[11px] font-mono text-white/30 tracking-wider uppercase text-center md:text-right">
            DESIGNED WITH <span className="text-red-500">♥</span> IN INDIA
          </div>
        </div>
      </div>

      {/* Massive Background Text (Watermark) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[25%] w-full text-center overflow-hidden pointer-events-none select-none flex justify-center z-0 opacity-[0.06]">
        <span 
          className="font-display text-[18vw] leading-none font-bold tracking-tighter whitespace-nowrap text-transparent bg-clip-text"
          style={{ 
            backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png'), linear-gradient(180deg, #ffffff 0%, #666666 100%)",
            backgroundSize: "auto, 100% 100%",
            backgroundBlendMode: "overlay"
          }}
        >
          AATOMATE
        </span>
      </div>
      
    </footer>
  );
}
