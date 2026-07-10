"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Stethoscope, CheckCircle2, ChevronLeft, Phone, Video } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const products = [
  {
    id: "doctor-bot",
    title: "Doctor Booking Bot",
    subtitle: "Automate patient appointments directly on WhatsApp.",
    description: "Eliminate front-desk bottlenecks. Our intelligent healthcare agent handles patient inquiries, schedules appointments instantly, and sends automated reminders—all through a seamless WhatsApp experience.",
    icon: <Stethoscope className="w-5 h-5 text-[#25D366]" />,
    color: "#25D366",
    features: [
      "Instant calendar syncing",
      "Automated appointment reminders",
      "Secure patient detail collection",
      "Effortless rescheduling & cancellations"
    ],
    chatMockup: [
      { sender: "bot", text: "Hello! Welcome to City Clinic 🏥. How can I help you today?", time: "10:00 AM" },
      { sender: "user", text: "I need to book an appointment with a cardiologist.", time: "10:01 AM" },
      { sender: "bot", text: "Dr. Sharma has openings tomorrow at 10:00 AM and 2:30 PM. Reply with the time you prefer!", time: "10:01 AM" },
      { sender: "user", text: "10:00 AM works.", time: "10:03 AM" },
      { sender: "bot", text: "✅ Appointment confirmed for tomorrow at 10:00 AM with Dr. Sharma. We'll send you a reminder 2 hours before.", time: "10:03 AM" }
    ]
  },
  {
    id: "hotel-bot",
    title: "Hotel Booking Bot",
    subtitle: "Process room reservations and room service inquiries instantly.",
    description: "Provide a 5-star digital concierge experience before guests even arrive. Allow users to check room availability, view photos, and securely pay for their stay entirely within WhatsApp.",
    icon: <Building2 className="w-5 h-5 text-[#fbff00]" />,
    color: "#fbff00",
    features: [
      "Real-time room availability",
      "Automated secure payment links",
      "Instant PDF booking confirmations",
      "24/7 Concierge & FAQ handling"
    ],
    chatMockup: [
      { sender: "bot", text: "Welcome to Paradise Resort 🌴. Are you looking to book a stay?", time: "4:30 PM" },
      { sender: "user", text: "Yes, looking for a sea-view suite for this weekend (2 nights).", time: "4:31 PM" },
      { sender: "bot", text: "Great! We have 1 Ocean View Suite available for Friday - Sunday. The total is $450. Would you like to proceed?", time: "4:31 PM" },
      { sender: "user", text: "Yes, please book it.", time: "4:35 PM" },
      { sender: "bot", text: "✅ Perfect. Please complete your payment here to confirm your reservation: pay.stripe.com/abcxyz", time: "4:35 PM" }
    ]
  }
];

// Interactive Phone Component
const InteractivePhone = ({ product }: { product: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [visibleMessages, setVisibleMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // 3D Tilt Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
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

  // Continuous Looping Message Sequence (like Hero.tsx)
  useEffect(() => {
    if (!isInView) return;

    let isActive = true;

    const runSequence = async () => {
      setVisibleMessages([]);
      
      for (const msg of product.chatMockup) {
        if (!isActive) return;

        if (msg.sender === "bot") {
          setIsTyping(true);
          await new Promise((r) => setTimeout(r, 1200));
          setIsTyping(false);
        } else {
          await new Promise((r) => setTimeout(r, 800)); // Delay before user replies
        }

        if (!isActive) return;
        setVisibleMessages((prev) => [...prev, msg]);
      }

      // Wait a few seconds after the full conversation, then loop
      if (isActive) {
        await new Promise((r) => setTimeout(r, 5000));
        runSequence();
      }
    };

    runSequence();

    return () => {
      isActive = false;
    };
  }, [isInView, product.chatMockup]);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ rotateY: 25, rotateX: 10, scale: 0.8, opacity: 0 }}
      whileInView={{ rotateY: 0, rotateX: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative flex justify-center items-center w-full max-w-[340px] perspective-1000 mx-auto cursor-crosshair"
    >
      {/* Animated Glowing Orb behind Phone */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[110%] pointer-events-none blur-3xl rounded-full"
        style={{ background: `radial-gradient(circle, ${product.color} 0%, transparent 65%)`, transform: "translateZ(-50px)" }}
      />

      {/* Deep Glassmorphic Phone Frame */}
      <div 
        className="relative w-[280px] h-[580px] bg-[#1a1a1a] rounded-[48px] p-2.5 shadow-[0_40px_80px_rgba(0,0,0,0.6)] border-[6px] border-[#333] ring-1 ring-black/50"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110px] h-[24px] bg-[#1a1a1a] rounded-b-[16px] z-30 flex items-center justify-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        </div>
        
        {/* Screen */}
        <div className="w-full h-full bg-[#0B141A] rounded-[40px] overflow-hidden flex flex-col relative z-20 border border-white/5 shadow-inner">
          
          {/* WhatsApp Header */}
          <div className="bg-[#202C33]/95 backdrop-blur-md px-4 pt-12 pb-3 flex items-center gap-3 shadow-md z-20">
            <ChevronLeft className="w-5 h-5 text-white/70 -ml-1 cursor-pointer" />
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
              {product.icon}
            </div>
            <div className="flex-1">
              <h4 className="text-white text-[14px] font-medium leading-tight">{product.title}</h4>
              <p className="text-white/50 text-[11px] flex items-center gap-1">
                 online
              </p>
            </div>
            <Video className="w-4 h-4 text-white/70" />
            <Phone className="w-4 h-4 text-white/70" />
          </div>

          {/* WhatsApp Chat Area */}
          <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-y-auto relative no-scrollbar">
            {/* Chat Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }} />
            
            <div className="flex justify-center mb-1 mt-2">
              <span className="bg-[#182229] text-white/60 text-[10px] px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">Today</span>
            </div>

            {/* Display Visible Messages */}
            {visibleMessages.map((msg: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15, scale: 0.9, rotateX: 20, originY: 1 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} relative z-10 w-full perspective-1000`}
              >
                <div className={`max-w-[85%] px-3.5 py-2 text-[13px] leading-[1.4] shadow-sm relative ${
                  msg.sender === 'bot' 
                    ? 'bg-[#202C33] text-[#E9EDEF] rounded-[12px] rounded-tl-sm ml-2' 
                    : 'bg-[#005C4B] text-[#E9EDEF] rounded-[12px] rounded-tr-sm mr-2'
                }`}>
                  {/* WhatsApp Chat Tail */}
                  {msg.sender === 'bot' ? (
                    <div className="absolute top-0 -left-2 w-2 h-3 overflow-hidden">
                       <div className="w-4 h-4 bg-[#202C33] absolute top-0 right-0 shadow-sm" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                    </div>
                  ) : (
                    <div className="absolute top-0 -right-2 w-2 h-3 overflow-hidden">
                       <div className="w-4 h-4 bg-[#005C4B] absolute top-0 left-0 shadow-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                    </div>
                  )}

                  {msg.text}
                  <div className="text-[9px] text-white/40 text-right mt-1 ml-3 float-right translate-y-0.5">
                    {msg.time}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-start relative z-10"
              >
                <div className="bg-[#202C33] rounded-2xl rounded-tl-[4px] px-4 py-3 shadow-sm flex items-center gap-1.5 h-[34px]">
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                </div>
              </motion.div>
            )}
            
            <div className="h-2 w-full shrink-0" /> {/* Spacer */}
          </div>

          {/* WhatsApp Input */}
          <div className="bg-[#202C33] p-2 pb-6 px-3 flex items-center gap-2 z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
            <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2 flex items-center shadow-inner">
              <span className="text-white/40 text-[13px]">Message</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center shrink-0 shadow-lg">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845L1.101,21.757z"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default function Products() {
  return (
    <section id="products" className="py-32 relative overflow-hidden bg-paper-white">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-paper-white/70 backdrop-blur-[2px] z-10" />
        <Image
          src="/pricing-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-60 mix-blend-multiply"
          loading="lazy"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-midnight-ink border border-midnight-ink/10 mb-6 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">Ready-to-Deploy Products</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[48px] md:text-[64px] leading-[1] tracking-[-0.02em] text-midnight-ink uppercase mb-6"
          >
            Plug-and-Play <br className="hidden md:block"/>
            <span className="text-midnight-ink/40">AI Solutions.</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-[18px] text-midnight-ink/60 font-medium max-w-2xl mx-auto"
          >
            Don't want to wait for a custom build? Launch your business on WhatsApp today with our battle-tested, ready-made intelligent bots.
          </motion.p>
        </div>

        <div className="flex flex-col gap-32 md:gap-48">
          {products.map((product, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={product.id} className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                
                {/* Text Content */}
                <div className={`flex-1 ${isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-midnight-ink flex items-center justify-center shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                        {product.icon}
                      </div>
                      <h3 className="font-display text-[36px] text-midnight-ink leading-tight tracking-tight">{product.title}</h3>
                    </div>

                    <p className="text-[22px] text-midnight-ink font-semibold mb-5 leading-relaxed">
                      {product.subtitle}
                    </p>
                    <p className="text-[16px] text-midnight-ink/70 mb-10 leading-relaxed max-w-lg">
                      {product.description}
                    </p>

                    <ul className="space-y-4 mb-12">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-black/5 shadow-sm">
                          <CheckCircle2 className={`w-5 h-5 mt-0 shrink-0`} style={{ color: product.color }} aria-hidden="true" />
                          <span className="text-[15px] font-medium text-midnight-ink/90">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <Link
                        href={`/products/${product.id}`}
                        className="inline-flex items-center gap-3 bg-midnight-ink text-white px-8 py-4 rounded-full text-[14px] font-bold uppercase tracking-wider hover:bg-black transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1 group"
                      >
                        Explore this Bot
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Interactive Phone Mockup */}
                <div className={`flex-1 flex justify-center w-full ${isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
                  <InteractivePhone product={product} />
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
