"use client";

import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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
    role: "CEO, TechFlow",
    text: "Aatomate completely transformed our inbound lead process. We're qualifying leads 10x faster with their voice agents. The ROI was immediate.",
    time: "2 weeks ago"
  },
  {
    name: "Priya Sharma",
    role: "Operations Director",
    text: "The WhatsApp automation is flawless. Our customers think they are talking to a real human. Customer satisfaction scores have gone up 40%.",
    time: "1 month ago"
  },
  {
    name: "Amit Desai",
    role: "Founder, Desai Realty",
    text: "We used to lose leads after hours. Now, the AI books property viewings 24/7. It's like having a top-performing agent that never sleeps.",
    time: "3 months ago"
  },
  {
    name: "Karan Patel",
    role: "E-commerce Head",
    text: "Integrating Aatomate with our Shopify store took less than a week. The automated order tracking and returns handling is a game changer.",
    time: "2 weeks ago"
  },
  {
    name: "Neha Singh",
    role: "Clinic Manager",
    text: "Handling patient appointments was a nightmare before Aatomate. Now, the AI handles 80% of bookings and rescheduling. Fantastic service.",
    time: "1 month ago"
  },
  {
    name: "Vikram Malhotra",
    role: "Agency Owner",
    text: "The best investment we've made this year. The team is incredibly responsive and the AI agents are shockingly good at handling complex queries.",
    time: "2 months ago"
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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-[48px] md:text-[64px] leading-[1] tracking-[-0.02em] uppercase mb-4">
              Client <span className="text-white/40">Reviews</span>
            </h2>
            <p className="text-[18px] text-white/60 font-medium">
              See what our partners say about scaling with Aatomate.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link 
              href="https://g.page/r/your-google-link/review" 
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
          {displayTestimonials.map((review: any, idx) => (
            <div 
              key={review.id || idx}
              className="snap-start shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] bg-[#1a1a1a] border border-white/5 p-8 md:p-10 rounded-[32px] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-1">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FBBC05] text-[#FBBC05]" />
                    ))}
                  </div>
                  <GoogleLogo />
                </div>
                <p className="text-[18px] leading-relaxed text-white/90 mb-8 font-medium">
                  "{review.content || review.text}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <div>
                  <h4 className="font-bold text-white text-[16px]">{review.author_name || review.name}</h4>
                  <p className="text-[14px] text-white/50 mt-1">{review.author_title || review.role} {review.company ? `at ${review.company}` : ''}</p>
                </div>
                <span className="text-[12px] text-white/40 font-mono">{review.time || 'Recently'}</span>
              </div>
            </div>
          ))}
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
