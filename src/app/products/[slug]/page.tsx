import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { productsData } from "@/data/products";
import { ArrowLeft, CheckCircle2, XCircle, Zap, Shield, ChevronRight, Play } from "lucide-react";
import Pricing from "@/components/Pricing";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ slug: string }>
};

export default async function ProductLandingPage(props: Props) {
  const params = await props.params;
  const { slug } = params;
  
  const product = productsData.find(p => p.slug === slug);
  if (!product) notFound();

  // Fetch Pricing if it's doctor-bot
  let mappedPlans: any[] = [];
  if (slug === 'doctor-bot') {
    try {
      const supabase = await createClient();
      const { data: pricingPlans } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('display_order', { ascending: true });

      const { data: pricingFeatures } = await supabase
        .from('pricing_features')
        .select('*')
        .order('display_order', { ascending: true });

      mappedPlans = (pricingPlans || []).map((plan: any) => ({
        ...plan,
        features: (pricingFeatures || []).filter((f: any) => f.plan_id === plan.id)
      }));
    } catch (e) {
      console.error("Failed to fetch pricing for doctor-bot", e);
    }
  }

  return (
    <main className="bg-[#030303] min-h-screen text-white overflow-hidden selection:bg-[#25D366]/30">
      <Navbar />

      {/* Hero Ambient Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/10 via-[#030303] to-[#030303] pointer-events-none" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20 pointer-events-none rounded-full blur-[120px]" 
        style={{ background: product.themeColor }}
      />
      
      {/* 1. Hero Section & Demo Video */}
      <section className="relative pt-[140px] pb-24 md:pt-[200px] md:pb-24 px-4 max-w-[1200px] mx-auto z-10 text-center">
        <Link 
          href="/#products" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-12 font-mono text-sm tracking-widest uppercase transition-colors group bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <h1 className="font-display text-[48px] sm:text-[64px] md:text-[80px] leading-[1.0] tracking-tight uppercase text-white drop-shadow-2xl mb-6 mx-auto max-w-4xl">
          {product.hero.title}
        </h1>
        <p className="text-[18px] md:text-[24px] text-white/70 max-w-2xl mx-auto mb-12 font-medium">
          {product.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/contact" className="w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-white text-black font-bold text-[18px] px-10 py-5 rounded-full hover:bg-gray-200 transition-all hover:scale-105 shadow-xl">
            Get Started <ChevronRight className="w-5 h-5" />
          </Link>
          <button className="w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-white/10 text-white font-bold text-[18px] px-10 py-5 rounded-full hover:bg-white/20 border border-white/20 transition-all">
            <Play className="w-5 h-5" /> Watch Demo
          </button>
        </div>

        {/* Demo Video Embed placeholder (Using Screenshot style if no real embed) */}
        {product.demoVideo && (
          <div className="relative w-full max-w-5xl mx-auto aspect-video bg-black/50 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-white/30 transition-all border border-white/30 shadow-2xl">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </div>
            {/* Using first screenshot as video poster fallback */}
            {product.screenshots && product.screenshots.length > 0 && (
              <img src={product.screenshots[0]} alt="Demo Video" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
            )}
          </div>
        )}
      </section>

      {/* 2. Features Section */}
      <section className="py-24 relative z-10 border-t border-white/5 bg-black/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-[40px] md:text-[56px] uppercase tracking-tight text-white mb-4">Core Features</h2>
            <p className="text-white/60 text-[18px]">Everything you need to automate your workflows.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.solutions.map((feature, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/20" style={{ color: product.themeColor }}>
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-[24px] font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-[16px] text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Comparison with Competitors */}
      {product.comparison && product.comparison.length > 0 && (
        <section className="py-24 relative z-10 border-t border-white/5">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-[40px] md:text-[56px] uppercase tracking-tight text-white mb-4">Why We Win</h2>
              <p className="text-white/60 text-[18px]">Compare us against traditional enterprise solutions.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">
              <div className="grid grid-cols-3 bg-white/10 p-6 border-b border-white/10 text-[14px] font-bold uppercase tracking-widest text-white/60">
                <div>Feature</div>
                <div style={{ color: product.themeColor }}>Aatomate</div>
                <div>Legacy Competitors</div>
              </div>
              {product.comparison.map((comp, idx) => (
                <div key={idx} className="grid grid-cols-3 p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors items-center">
                  <div className="font-medium text-white">{comp.feature}</div>
                  <div className="font-bold flex items-center gap-2" style={{ color: product.themeColor }}>
                    <CheckCircle2 className="w-5 h-5" /> {comp.aatomate}
                  </div>
                  <div className="text-white/50 flex items-center gap-2">
                    <XCircle className="w-5 h-5 opacity-50" /> {comp.competitor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Pricing */}
      {slug === 'doctor-bot' ? (
        <div className="-mt-16">
          <Pricing plans={mappedPlans} />
        </div>
      ) : product.pricing ? (
        <section className="py-24 relative z-10 border-t border-white/5 bg-black/20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-[40px] md:text-[56px] uppercase tracking-tight text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-white/60 text-[18px] mb-16">Scale without limits.</p>
            
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10 w-full max-w-sm mx-auto md:mx-0">
                <h3 className="text-[24px] font-bold text-white mb-2">Monthly</h3>
                <div className="text-[56px] font-display text-white mb-6">{product.pricing.monthly}<span className="text-[20px] text-white/40">/mo</span></div>
                <ul className="text-left space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-5 h-5 text-[#25D366]" /> Full Feature Access</li>
                  <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-5 h-5 text-[#25D366]" /> Standard Support</li>
                  <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-5 h-5 text-[#25D366]" /> Cancel Anytime</li>
                </ul>
                <Link href="/contact" className="block w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-full transition-colors">Choose Monthly</Link>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-[2rem] p-10 w-full max-w-sm mx-auto md:mx-0 relative shadow-[0_0_50px_rgba(255,255,255,0.05)] transform md:-translate-y-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black font-bold text-[12px] uppercase tracking-widest px-4 py-1 rounded-full">Save 20%</div>
                <h3 className="text-[24px] font-bold text-white mb-2">Yearly</h3>
                <div className="text-[56px] font-display text-white mb-6">{product.pricing.yearly}<span className="text-[20px] text-white/40">/yr</span></div>
                <ul className="text-left space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-5 h-5 text-[#25D366]" /> Full Feature Access</li>
                  <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-5 h-5 text-[#25D366]" /> Priority 24/7 Support</li>
                  <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-5 h-5 text-[#25D366]" /> Custom Integrations</li>
                </ul>
                <Link href="/contact" className="block w-full bg-white hover:bg-gray-200 text-black font-bold py-4 rounded-full transition-colors">Choose Yearly</Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 5. FAQs */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="py-24 relative z-10 border-t border-white/5">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-[40px] md:text-[56px] uppercase tracking-tight text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {product.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                  <h4 className="text-[20px] font-bold text-white mb-3">{faq.question}</h4>
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Call to Action */}
      <section className="py-32 px-4 relative z-10 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[#25D366]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#25D366]/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h2 className="font-display text-[48px] md:text-[72px] uppercase tracking-tight text-white mb-8">
            Ready to deploy <br/><span style={{ color: product.themeColor }}>{product.hero.title.split(':')[0]}</span>?
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black font-bold text-[18px] px-10 py-5 rounded-full hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Book a Free Demo <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
