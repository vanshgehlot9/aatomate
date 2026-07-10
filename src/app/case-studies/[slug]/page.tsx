import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, TrendingUp, CheckCircle2, ChevronRight, Activity, Zap, Building } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>
};

export default async function CaseStudyPage(props: Props) {
  const params = await props.params;
  const { slug } = params;
  
  const supabase = await createClient();

  const { data: study, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !study) {
    // If not found in DB, fallback to hardcoded if it matches for seamless dev experience
    // since we can't reliably seed the DB automatically due to RLS.
    if (slug !== 'healthcare-patient-bookings') {
      notFound();
    }
  }

  // Fallback data if DB fetch fails (e.g. RLS issues before user runs seed script)
  const caseStudy = study || {
    title: 'Automating Patient Bookings for a Leading Clinic',
    slug: 'healthcare-patient-bookings',
    industry: 'Healthcare Company',
    problem: 'The clinic was overwhelmed with manual appointment scheduling via phone calls and emails, leading to a 40% missed call rate and overwhelmed reception staff.',
    solution: 'Deployed a HIPAA-compliant WhatsApp AI agent that handles patient booking requests, answers FAQs, and synchronizes directly with their internal CRM 24/7.',
    results: [
      "Reduced manual administrative work by 72%",
      "Saved ₹8 lakh annually in operational costs",
      "Processing time reduced from 3 days to 2 hours"
    ],
    featured_image: '/images/case-study-healthcare.png',
  };

  const resultsArray = Array.isArray(caseStudy.results) ? caseStudy.results : [];

  return (
    <main className="bg-[#030303] min-h-screen text-white overflow-hidden selection:bg-[#25D366]/30">
      <Navbar />

      {/* Hero Ambient Backgrounds */}
      <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-blue-900/20 via-transparent to-transparent opacity-50 pointer-events-none mix-blend-screen" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[#25D366]/5 via-[#030303]/5 to-transparent opacity-30 pointer-events-none rounded-full blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

      <section className="relative pt-[140px] pb-24 md:pt-[200px] md:pb-32 px-4 sm:px-[32px] lg:px-[40px] max-w-[1200px] mx-auto z-10">
        
        {/* Breadcrumb / Back Button */}
        <Link 
          href="/#case-studies" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-12 md:mb-16 font-mono text-sm tracking-widest uppercase transition-colors group bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Case Studies
        </Link>

        {/* Hero Content */}
        <div className="flex flex-col gap-6 mb-16 relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 text-[#25D366] font-bold text-[13px] tracking-widest uppercase rounded-full w-fit border border-[#25D366]/20">
            <Building className="w-4 h-4" />
            {caseStudy.industry}
          </div>
          
          <h1 className="font-display text-[40px] sm:text-[48px] md:text-[64px] lg:text-[72px] leading-[1.0] tracking-tight uppercase text-white drop-shadow-2xl">
            {caseStudy.title}
          </h1>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          
          {/* Problem Box */}
          <div className="col-span-1 md:col-span-6 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-red-500/20 transition-colors duration-700" />
            
            <h3 className="text-[14px] font-black uppercase tracking-widest text-red-400 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5" /> The Problem
            </h3>
            <p className="text-[18px] md:text-[22px] text-white/80 leading-relaxed font-medium">
              {caseStudy.problem}
            </p>
          </div>

          {/* Solution Box */}
          <div className="col-span-1 md:col-span-6 bg-gradient-to-br from-[#25D366]/10 to-transparent border border-[#25D366]/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#25D366]/20 blur-[80px] rounded-full translate-x-1/2 translate-y-1/2 group-hover:bg-[#25D366]/30 transition-colors duration-700" />
            
            <h3 className="text-[14px] font-black uppercase tracking-widest text-[#25D366] mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5" /> The Solution
            </h3>
            <p className="text-[18px] md:text-[22px] text-white leading-relaxed font-medium">
              {caseStudy.solution}
            </p>
          </div>

          {/* Results Box */}
          <div className="col-span-1 md:col-span-12 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden mt-2">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#fbff00]/5 to-transparent pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
              <div className="w-full md:w-1/3 shrink-0">
                <h3 className="text-[32px] md:text-[48px] font-display uppercase tracking-tight text-white leading-none mb-4">
                  Massive<br/><span className="text-[#fbff00]">ROI & Results</span>
                </h3>
                <p className="text-white/60 font-medium">
                  The implementation drove immediate top-line and bottom-line impact.
                </p>
              </div>
              
              <ul className="w-full md:w-2/3 space-y-6">
                {resultsArray.map((res: string, i: number) => (
                  <li key={i} className="flex items-start gap-6 bg-white/5 border border-white/5 p-6 rounded-3xl hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#fbff00]/10 flex items-center justify-center shrink-0 border border-[#fbff00]/20">
                      <TrendingUp className="w-6 h-6 text-[#fbff00]" />
                    </div>
                    <span className="text-[18px] md:text-[24px] font-bold text-white leading-tight">
                      {res}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[40px] md:text-[64px] uppercase tracking-tight text-white mb-8">
            Ready for similar results?
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-[#25D366] text-black font-bold text-[18px] px-10 py-5 rounded-full hover:bg-[#20bd5a] transition-all hover:scale-105 shadow-[0_0_40px_rgba(37,211,102,0.3)]">
            Book a Free Consultation <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
