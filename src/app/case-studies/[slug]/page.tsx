import { notFound } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, User, Zap } from "lucide-react";

export function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyArticle({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const study = caseStudies.find((s) => s.slug === resolvedParams.slug);

  if (!study) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-paper-white font-sans selection:bg-[#fbff00] selection:text-black flex flex-col pt-32 relative">
      <Navbar />

      {/* Solid black mask to protect the transparent navbar during scroll */}
      <div className="fixed top-0 left-0 w-full h-[90px] bg-[#050505] z-40 pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8 relative z-30">
        
        {/* Left Content */}
        <div className="flex flex-col items-start gap-8 lg:col-span-7">
          <Link 
            href="/case-studies" 
            className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold text-[14px] hover:bg-gray-200 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> All Use Cases
          </Link>
          
          <h1 className="font-display text-[48px] sm:text-[60px] md:text-[72px] lg:text-[84px] uppercase leading-[0.9] tracking-tight max-w-[800px]">
            {study.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2 font-mono text-[12px] sm:text-[13px] uppercase tracking-wider text-gray-400">
            <div className="flex items-center gap-2">
               <span className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center text-white border border-white/5 shadow-inner">
                 <User className="w-3.5 h-3.5" />
               </span>
               {study.industry}
            </div>
            <div className="flex items-center gap-2">
               <span className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center text-white border border-white/5 shadow-inner">
                 <Zap className="w-3.5 h-3.5" />
               </span>
               {study.solution}
            </div>
            <div className="flex items-center text-gray-500">
               Published {study.date}
            </div>
          </div>
        </div>

        {/* Right Content (Visual & Metrics Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-5 h-[400px] lg:h-full lg:min-h-[450px]">
          
          {/* Abstract block */}
          <div className="rounded-[32px] p-8 flex items-center justify-center bg-[#e5e5e5] relative overflow-hidden h-full min-h-[200px]">
             {/* Noise texture overlay */}
             <div className="absolute inset-0 opacity-10 pointer-events-none z-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
             
             {/* Diagonal color slash */}
             <div className={`absolute bottom-0 left-0 w-[150%] h-[150%] origin-bottom-left -rotate-[25deg] translate-y-[60%] ${study.color} z-0`} />
             
             <div className="relative z-10 w-24 h-24 bg-[#efefef] shadow-[10px_10px_30px_rgba(0,0,0,0.1),-10px_-10px_30px_rgba(255,255,255,0.8)] rounded-2xl transform rotate-12 flex items-center justify-center border border-white">
                {study.icon}
             </div>
          </div>
          
          {/* Metric block */}
          <div className="rounded-[32px] p-8 flex flex-col justify-center bg-[#f7f7f7] text-midnight-ink relative overflow-hidden h-full min-h-[200px] border border-white shadow-sm">
             <div className={`absolute inset-0 opacity-10 ${study.color}`} />
             <div className="relative z-10">
               <h2 className="font-display text-[72px] md:text-[90px] leading-[0.8] tracking-tighter mb-4">{study.metrics.headline}</h2>
               <p className="text-[16px] md:text-[18px] font-medium leading-[1.2] opacity-70 pr-4">{study.metrics.subtext}</p>
             </div>
          </div>

        </div>
      </div>

      {/* Main Content Container matching Dayos large rounded top */}
      <div className="flex-1 bg-[#fbfbfb] text-midnight-ink rounded-t-[32px] md:rounded-t-[48px] w-full max-w-[1600px] mx-auto border-t border-white/5 flex flex-col relative z-30 mt-16 md:mt-24 pb-32">
        
        {/* Sticky Nav Pill */}
        <div className="sticky top-[90px] z-50 flex justify-center w-full pt-8 pb-4 bg-[#fbfbfb]/95 backdrop-blur-sm border-b border-black/5 rounded-t-[32px] md:rounded-t-[48px] shadow-sm">
          <div className="bg-white border border-gray-200/80 rounded-full flex items-center px-1.5 py-1.5 shadow-sm gap-1 overflow-x-auto max-w-[95vw] hide-scrollbar">
            {["Use case Overview", "Humans in the Loop", "Deployments", "Sample Process"].map((item, i) => (
              <a 
                key={item} 
                href={`#section-${i}`} 
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[14px] font-bold tracking-wide transition-all ${
                  i === 0 
                    ? 'bg-[#ffe4f1] text-[#d6006e]' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                }`}
                style={i === 0 ? { backgroundColor: '#fdf0fb', color: '#050505' } : {}}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto px-4 sm:px-8 w-full pt-16 md:pt-24">
          
          {/* Section 0: Overview */}
          <div id="section-0" className="scroll-mt-[200px]">
            
            {/* Problems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 md:mb-32">
              {study.problems.map((prob, i) => (
                <div key={i} className="bg-[#f0f0f0] rounded-[24px] p-8 md:p-10 transition-colors hover:bg-[#e8e8e8]">
                  <h3 className="font-bold text-[18px] mb-3 leading-tight text-black">{prob.title}</h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed font-medium">{prob.description}</p>
                </div>
              ))}
            </div>

            {/* Executive Summary */}
            <div className="mb-24 md:mb-40">
              <p className="font-display text-[28px] sm:text-[36px] md:text-[44px] leading-[1.2] tracking-tight text-black">
                {study.executiveSummary}
              </p>
            </div>

            {/* Section 1: Solution */}
            <div id="section-1" className="scroll-mt-[200px] mb-24 md:mb-40">
              <h2 className="font-display text-[48px] md:text-[64px] uppercase tracking-tighter mb-10 text-black">SOLUTION</h2>
              <div className="bg-white rounded-[32px] p-8 md:p-12 border border-gray-100 shadow-sm">
                <h3 className="font-display text-[24px] md:text-[32px] uppercase tracking-tight mb-6 text-black">{study.solutionHeading}</h3>
                <p className="text-[18px] md:text-[22px] text-gray-600 leading-[1.6] font-medium">
                  {study.solutionText}
                </p>
              </div>
            </div>

            {/* Empty sections for sticky nav anchors to work */}
            <div id="section-2" className="scroll-mt-[200px] min-h-[300px]">
              <h2 className="font-display text-[48px] md:text-[64px] uppercase tracking-tighter mb-10 text-black opacity-20">DEPLOYMENTS</h2>
              <p className="text-xl text-gray-400 italic">Coming soon...</p>
            </div>

            <div id="section-3" className="scroll-mt-[200px] min-h-[300px] pt-24">
              <h2 className="font-display text-[48px] md:text-[64px] uppercase tracking-tighter mb-10 text-black opacity-20">SAMPLE PROCESS</h2>
              <p className="text-xl text-gray-400 italic">Coming soon...</p>
            </div>

          </div>
        </div>
      </div>
      
      <div className="bg-[#050505]">
        <Footer />
      </div>
    </main>
  );
}
