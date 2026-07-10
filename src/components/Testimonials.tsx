"use client";

import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight, ArrowRight, Play, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const GoogleLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const reviews = [
  {
    name: "Rohan Gupta",
    role: "CEO",
    company: "TechFlow",
    text: "Aatomate completely transformed our inbound lead process. We're qualifying leads 10x faster with their voice agents. The ROI was immediate.",
    time: "2 weeks ago",
    avatar: "https://i.pravatar.cc/150?u=rohan",
    hasVideo: true
  },
  {
    name: "Priya Sharma",
    role: "Operations Director",
    company: "MedicaCorp",
    text: "The WhatsApp automation is flawless. Our customers think they are talking to a real human. Customer satisfaction scores have gone up 40%.",
    time: "1 month ago",
    avatar: "https://i.pravatar.cc/150?u=priya",
    hasVideo: false
  },
  {
    name: "Amit Desai",
    role: "Founder",
    company: "Desai Realty",
    text: "We used to lose leads after hours. Now, the AI books property viewings 24/7. It's like having a top-performing agent that never sleeps.",
    time: "3 months ago",
    avatar: "https://i.pravatar.cc/150?u=amit",
    hasVideo: true
  },
  {
    name: "Karan Patel",
    role: "E-commerce Head",
    company: "ShopZen",
    text: "Integrating Aatomate with our Shopify store took less than a week. The automated order tracking and returns handling is a game changer.",
    time: "2 weeks ago",
    avatar: "https://i.pravatar.cc/150?u=karan",
    hasVideo: false
  }
];

import { Database } from "@/lib/types/supabase";

type Testimonial = Database['public']['Tables']['testimonials']['Row']

export default function Testimonials({ testimonials = [] }: { testimonials?: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const displayTestimonials = testimonials.length > 0 ? testimonials : reviews;

  return (
    <section id="testimonials" className="py-32 bg-[#141414] text-paper-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-[48px] md:text-[64px] leading-[1] tracking-[-0.02em] uppercase mb-4 text-white">
              Client <span className="text-white/40">Reviews</span>
            </h2>
            <p className="text-[18px] text-white/60 font-medium">
              See what our partners say about scaling with Aatomate.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link 
              href="https://g.page/r/CeQcd3mmoRVfEBM/review" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-full transition-colors font-medium text-white"
            >
              <GoogleLogo />
              <span>Write a Google Review</span>
            </Link>
            
            <div className="flex items-center gap-2 hidden sm:flex">
              <button 
                onClick={() => scroll("left")} 
                className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={() => scroll("right")} 
                className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayTestimonials.map((review: any, idx) => {
            const avatarUrl = review.avatar_url || review.avatar;
            const hasVideo = review.hasVideo || false;
            
            return (
              <div 
                key={review.id || idx}
                className="snap-start shrink-0 w-[85vw] sm:w-[450px] md:w-[500px] bg-[#1a1a1a] border border-white/5 p-8 md:p-10 rounded-[32px] flex flex-col justify-between relative group"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5" aria-hidden="true" />
                
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex gap-1" aria-label={`${review.rating || 5} out of 5 stars`}>
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#FBBC05] text-[#FBBC05]" aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-[18px] md:text-[20px] leading-relaxed text-white/90 mb-10 font-medium relative z-10">
                    "{review.content || review.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  {/* Avatar / Video Thumbnail */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white/10 group-hover:border-[#25D366]/50 transition-colors">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={`Photo of ${review.author_name || review.name}${(review.author_title || review.role) ? `, ${review.author_title || review.role}` : ''}${review.company ? ` at ${review.company}` : ''}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center text-white font-bold text-xl" aria-label={`Avatar for ${review.author_name || review.name}`}>
                        {(review.author_name || review.name).charAt(0)}
                      </div>
                    )}
                    
                    {/* Video Play Overlay */}
                    {hasVideo && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] cursor-pointer hover:bg-black/20 transition-colors" aria-label="Watch video testimonial">
                        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center pl-0.5">
                          <Play className="w-4 h-4 text-black fill-black" aria-hidden="true" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Author Details */}
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-[16px]">{review.author_name || review.name}</h4>
                    <p className="text-[13px] text-white/50 mt-1 flex items-center gap-2">
                      <span>{review.author_title || review.role}</span>
                      {review.company && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-white/70 font-semibold">{review.company}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leave a Review CTA */}
        <div className="mt-12 flex justify-center px-4">
          <Link
            href="https://g.page/r/CeQcd3mmoRVfEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-lg"
          >
            <GoogleLogo />
            <span className="font-bold text-white text-[15px] sm:text-[16px]">Review us on Google</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
