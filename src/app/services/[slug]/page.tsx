import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  BrainCircuit, 
  Workflow, 
  Users, 
  MessageSquare, 
  FileText, 
  GitMerge, 
  GraduationCap, 
  BarChart3, 
  Building2,
  Cpu,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Target
} from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>
};

const SVGShape = ({ index }: { index: number }) => {
  if (index % 3 === 0) return (
    <>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-10 right-10 w-80 h-80 opacity-20 pointer-events-none text-[#25D366]">
        <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,96.5,-2.5C96.2,13,89.6,28.5,80.1,41.9C70.6,55.3,58.2,66.6,44.2,74.9C30.2,83.2,14.6,88.5,-0.6,89.5C-15.8,90.5,-31.6,87.2,-45.5,79.5C-59.4,71.8,-71.4,59.7,-80,45.4C-88.6,31.1,-93.8,14.6,-93.6,-1.7C-93.4,-18,-87.8,-33.9,-78.5,-47.3C-69.2,-60.7,-56.2,-71.6,-42.1,-78.8C-28,-86,-13.9,-89.5,0.7,-90.7C15.3,-91.9,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-10 left-10 w-[500px] h-[500px] opacity-[0.15] pointer-events-none text-white rotate-45">
        <path fill="currentColor" d="M39.9,-65.6C52.4,-57.8,63.6,-47,72.7,-34C81.8,-21,88.8,-5.8,87,8.2C85.2,22.2,74.6,35,63.1,46.1C51.6,57.2,39.2,66.6,25.2,73.1C11.2,79.6,-4.4,83.2,-19.9,81.1C-35.4,79,-50.8,71.2,-63.2,59.8C-75.6,48.4,-85,33.4,-88.4,17.4C-91.8,1.4,-89.2,-15.6,-81.4,-29.9C-73.6,-44.2,-60.6,-55.8,-46.8,-63.2C-33,-70.6,-18.4,-73.8,-2.9,-69.1C12.6,-64.4,27.4,-73.4,39.9,-65.6Z" transform="translate(100 100) rotate(45)" />
      </svg>
    </>
  );
  if (index % 3 === 1) return (
    <>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-20 right-0 w-96 h-96 opacity-20 pointer-events-none text-[#fbff00]">
        <path fill="currentColor" d="M47.7,-74.6C60.4,-65.4,68.2,-50,75.4,-34.5C82.6,-19,89.2,-3.4,86.6,10.6C84,24.6,72.2,37,60.2,49.1C48.2,61.2,36,73,21.5,78.8C7,84.6,-9.8,84.4,-25.2,78.9C-40.6,73.4,-54.6,62.6,-65.2,49.5C-75.8,36.4,-83,21,-84.9,5.2C-86.8,-10.6,-83.4,-26.8,-74.5,-39.8C-65.6,-52.8,-51.2,-62.6,-37.2,-70.7C-23.2,-78.8,-9.6,-85.2,4,-90.9C17.6,-96.6,35,-83.8,47.7,-74.6Z" transform="translate(100 100) scale(1.1)" />
      </svg>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -top-10 left-20 w-72 h-72 opacity-10 pointer-events-none text-white -rotate-12">
        <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,96.5,-2.5C96.2,13,89.6,28.5,80.1,41.9C70.6,55.3,58.2,66.6,44.2,74.9C30.2,83.2,14.6,88.5,-0.6,89.5C-15.8,90.5,-31.6,87.2,-45.5,79.5C-59.4,71.8,-71.4,59.7,-80,45.4C-88.6,31.1,-93.8,14.6,-93.6,-1.7C-93.4,-18,-87.8,-33.9,-78.5,-47.3C-69.2,-60.7,-56.2,-71.6,-42.1,-78.8C-28,-86,-13.9,-89.5,0.7,-90.7C15.3,-91.9,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
    </>
  );
  return (
    <>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-10 w-[400px] h-[400px] opacity-20 pointer-events-none text-white">
        <path fill="currentColor" d="M39.9,-65.6C52.4,-57.8,63.6,-47,72.7,-34C81.8,-21,88.8,-5.8,87,8.2C85.2,22.2,74.6,35,63.1,46.1C51.6,57.2,39.2,66.6,25.2,73.1C11.2,79.6,-4.4,83.2,-19.9,81.1C-35.4,79,-50.8,71.2,-63.2,59.8C-75.6,48.4,-85,33.4,-88.4,17.4C-91.8,1.4,-89.2,-15.6,-81.4,-29.9C-73.6,-44.2,-60.6,-55.8,-46.8,-63.2C-33,-70.6,-18.4,-73.8,-2.9,-69.1C12.6,-64.4,27.4,-73.4,39.9,-65.6Z" transform="translate(100 100) rotate(45)" />
      </svg>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 right-40 w-72 h-72 opacity-[0.12] pointer-events-none text-[#25D366] rotate-90">
        <path fill="currentColor" d="M47.7,-74.6C60.4,-65.4,68.2,-50,75.4,-34.5C82.6,-19,89.2,-3.4,86.6,10.6C84,24.6,72.2,37,60.2,49.1C48.2,61.2,36,73,21.5,78.8C7,84.6,-9.8,84.4,-25.2,78.9C-40.6,73.4,-54.6,62.6,-65.2,49.5C-75.8,36.4,-83,21,-84.9,5.2C-86.8,-10.6,-83.4,-26.8,-74.5,-39.8C-65.6,-52.8,-51.2,-62.6,-37.2,-70.7C-23.2,-78.8,-9.6,-85.2,4,-90.9C17.6,-96.6,35,-83.8,47.7,-74.6Z" transform="translate(100 100) scale(1.1)" />
      </svg>
    </>
  );
}

const IconMap: Record<string, any> = {
  BrainCircuit, Workflow, Users, MessageSquare, FileText, GitMerge, GraduationCap, BarChart3, Building2, Cpu
};

// Rich composed SVG scenes for the Hero box using Lucide icons
const DynamicServiceIcon = ({ iconName }: { iconName: string }) => {
  if (iconName === "Workflow") {
    // Business Process Automation - "2 business owners" + Workflow
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <Users className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-lg group-hover:text-[#25D366] group-hover:scale-110 transition-all duration-500 z-20" />
        <Workflow className="absolute bottom-3 right-3 md:bottom-5 md:right-5 w-6 h-6 md:w-8 md:h-8 text-[#fbff00]/60 z-10 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500" />
        <Building2 className="absolute top-3 left-3 md:top-5 md:left-5 w-6 h-6 md:w-8 md:h-8 text-white/20 group-hover:translate-y-2 group-hover:translate-x-2 transition-transform duration-500" />
      </div>
    );
  }
  if (iconName === "BrainCircuit") {
    // AI Consulting
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-lg group-hover:text-[#25D366] group-hover:scale-110 transition-all duration-500 z-20" />
        <Users className="absolute bottom-3 right-3 md:bottom-5 md:right-5 w-6 h-6 md:w-8 md:h-8 text-white/40 z-10 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500" />
        <Lightbulb className="absolute top-3 left-3 md:top-5 md:left-5 w-6 h-6 md:w-8 md:h-8 text-[#fbff00]/60 group-hover:scale-110 animate-pulse transition-transform duration-500" />
      </div>
    );
  }
  if (iconName === "MessageSquare") {
    // Chatbots
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <MessageSquare className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-lg group-hover:text-[#25D366] group-hover:scale-110 transition-all duration-500 z-20" />
        <Cpu className="absolute bottom-3 right-3 md:bottom-5 md:right-5 w-6 h-6 md:w-8 md:h-8 text-[#25D366]/60 z-10 group-hover:-translate-y-2 transition-transform duration-500" />
        <Users className="absolute top-3 left-3 md:top-5 md:left-5 w-6 h-6 md:w-8 md:h-8 text-white/20 group-hover:translate-x-2 transition-transform duration-500" />
      </div>
    );
  }
  
  // Fallback for others
  const BaseIcon = IconMap[iconName] || Cpu;
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <BaseIcon className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:text-[#25D366] group-hover:scale-110 transition-all duration-500 z-20" />
      <Sparkles className="absolute top-4 right-4 w-4 h-4 md:w-6 md:h-6 text-[#fbff00]/40 group-hover:rotate-180 transition-transform duration-700" />
    </div>
  );
};

export default async function ServicePage(props: Props) {
  const params = await props.params;
  const { slug } = params;
  
  const supabase = await createClient();

  const { data: service, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !service) {
    notFound();
  }

  const IconComponent = service.icon_name && IconMap[service.icon_name] ? IconMap[service.icon_name] : Cpu;

  // Safely parse JSON fields
  const rawBenefits = service.benefits;
  const benefits: string[] = Array.isArray(rawBenefits) ? rawBenefits as string[] : [];
  
  const rawProcess = service.process;
  const process: string[] = Array.isArray(rawProcess) ? rawProcess as string[] : [];
  
  const rawFaq = service.faq;
  const faq: { question: string, answer: string }[] = Array.isArray(rawFaq) ? rawFaq as { question: string, answer: string }[] : [];

  return (
    <main className="bg-[#030303] min-h-screen text-white overflow-hidden selection:bg-[#25D366]/30">
      <Navbar />

      {/* Hero Ambient Backgrounds */}
      <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-[#25D366]/10 via-transparent to-transparent opacity-50 pointer-events-none mix-blend-screen" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[#fbff00]/5 via-[#25D366]/5 to-transparent opacity-30 pointer-events-none rounded-full blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

      {/* Rotating Abstract SVGs */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none opacity-60 mix-blend-screen animate-[spin_60s_linear_infinite] origin-center">
        <SVGShape index={service.id || service.title.length} />
      </div>

      <section className="relative pt-[140px] pb-24 md:pt-[200px] md:pb-32 px-4 sm:px-[32px] lg:px-[40px] max-w-[1200px] mx-auto z-10">
        
        {/* Breadcrumb / Back Button */}
        <Link href="/#services" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all mb-10 md:mb-16 text-[12px] font-bold uppercase tracking-widest font-mono group w-fit shadow-lg backdrop-blur-sm">
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </Link>

        {/* Hero Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-20 lg:mb-32 items-start relative z-10">
          <div className="relative shrink-0">
            {/* Glow behind icon */}
            <div className="absolute inset-0 bg-[#25D366]/20 blur-[40px] md:blur-[50px] rounded-full" />
            <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-xl group hover:scale-[1.05] transition-transform duration-500 hover:border-[#25D366]/30 overflow-hidden">
              {/* Animated background glow inside the box */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#25D366]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <DynamicServiceIcon iconName={service.icon_name} />
            </div>
          </div>
          <div className="pt-2 md:pt-10">
            <h1 className="font-display text-[40px] sm:text-[48px] md:text-[64px] lg:text-[88px] leading-[0.95] tracking-tight uppercase text-white mb-6 md:mb-8 drop-shadow-2xl">
              {service.title}
            </h1>
            <p className="text-[18px] md:text-[24px] leading-relaxed text-white/50 font-medium max-w-3xl">
              {service.description}
            </p>
          </div>
        </div>

        {/* Bento Grid: Problem & Solution */}
        {(service.problem || service.solution) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-24">
            {service.problem && (
              <div className="group relative rounded-[32px] bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/5 p-10 md:p-12 overflow-hidden hover:border-red-500/20 transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-red-500/10 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/20">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <h4 className="font-mono text-[14px] text-white/40 tracking-widest uppercase font-bold mb-4">The Challenge</h4>
                  <p className="text-white/80 leading-relaxed text-[18px] md:text-[20px]">{service.problem}</p>
                </div>
              </div>
            )}
            {service.solution && (
              <div className="group relative rounded-[32px] bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/5 p-10 md:p-12 overflow-hidden hover:border-[#25D366]/20 transition-all duration-500">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#25D366]/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2 group-hover:bg-[#25D366]/10 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mb-8 border border-[#25D366]/20">
                    <Lightbulb className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <h4 className="font-mono text-[14px] text-white/40 tracking-widest uppercase font-bold mb-4">Our Solution</h4>
                  <p className="text-white/80 leading-relaxed text-[18px] md:text-[20px]">{service.solution}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bento Grid: Benefits */}
        {benefits.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-12">
              <Sparkles className="w-6 h-6 text-[#fbff00]" />
              <h2 className="font-display text-[32px] md:text-[40px] uppercase tracking-tight text-white">Key Benefits</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="group bg-[#0A0A0A] border border-white/5 hover:border-white/20 p-8 rounded-[32px] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#25D366]/10 group-hover:text-[#25D366] transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-white/30 group-hover:text-[#25D366]" />
                  </div>
                  <p className="text-white/80 text-[18px] font-medium leading-snug">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process: Horizontal Cards */}
        {process.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-12">
              <Target className="w-6 h-6 text-[#25D366]" />
              <h2 className="font-display text-[32px] md:text-[40px] uppercase tracking-tight text-white">Implementation Process</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {process.map((step, i) => {
                const stepText = step.replace(/^\d+\.\s*/, '');
                return (
                  <div key={i} className="relative group bg-[#111111] border border-white/5 p-8 rounded-[32px] overflow-hidden hover:border-white/20 transition-colors duration-300 flex flex-col h-full min-h-[200px]">
                    {/* Number Background */}
                    <div className="absolute -right-4 -bottom-8 font-display text-[120px] text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-500 pointer-events-none select-none">
                      {i + 1}
                    </div>
                    
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-mono text-[14px] font-bold mb-6">
                      0{i + 1}
                    </div>
                    
                    <p className="text-white/90 text-[18px] font-medium relative z-10 leading-snug">
                      {stepText}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQ Accordion */}
        {faq.length > 0 && (
          <div className="mb-24 max-w-4xl">
            <h2 className="font-display text-[32px] md:text-[40px] uppercase tracking-tight text-white mb-12">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {faq.map((item, i) => (
                <details key={i} className="group bg-transparent overflow-hidden [&_summary::-webkit-details-marker]:hidden border-b border-white/10 last:border-0">
                  <summary className="flex items-center justify-between py-6 cursor-pointer font-bold text-white/80 hover:text-white text-[18px] md:text-[22px] select-none transition-colors">
                    {item.question}
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-open:bg-[#fbff00]/10 transition-colors">
                      <ChevronDown className="w-5 h-5 text-white/50 group-open:text-[#fbff00] group-open:rotate-180 transition-transform duration-300" />
                    </div>
                  </summary>
                  <div className="pb-8 pr-12 text-white/50 text-[16px] md:text-[18px] leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Ultra Premium CTA Section */}
        <div className="relative rounded-[40px] overflow-hidden bg-[#0A0A0A] border border-white/10 p-12 md:p-20 text-center shadow-2xl mt-12 group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/20 via-[#fbff00]/5 to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-700 blur-[80px]" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-8 backdrop-blur-xl">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display text-[40px] md:text-[56px] text-white uppercase tracking-tight mb-6 max-w-2xl">
              Ready to automate your {service.title.toLowerCase()}?
            </h3>
            <p className="text-white/50 text-[18px] md:text-[20px] max-w-xl mx-auto mb-10">
              Book a free discovery call to discuss your specific requirements and see how our AI agents can transform your workflows.
            </p>
            <Link href="/contact" className="group/btn relative overflow-hidden rounded-full bg-white px-10 py-5 text-[16px] font-bold text-black shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
              <span className="relative z-10 uppercase tracking-widest">Get Started Today</span>
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white group-hover/btn:bg-[#25D366] transition-colors">
                <ArrowRight className="w-4 h-4 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
