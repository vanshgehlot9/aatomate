import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { industriesData } from "@/data/industries";
import { ArrowLeft, CheckCircle2, ChevronRight, Activity, Factory, ShoppingBag, Terminal, GraduationCap, Building2, Truck, Coffee, Landmark, TrendingUp, AlertCircle, Zap } from "lucide-react";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
};

// Map string icon names from data to actual Lucide components
const IconMap: Record<string, any> = {
  Activity, Factory, ShoppingBag, Terminal, GraduationCap, Building2, Truck, Coffee, Landmark
};

const siteUrl = "https://aatomate.com";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const industry = industriesData.find(i => i.slug === params.slug);
  
  if (!industry) {
    return { title: 'Industry Not Found' };
  }

  const pageUrl = `${siteUrl}/industries/${industry.slug}`;
  const ogImageUrl = `${siteUrl}/og-image.png`;

  return {
    title: `${industry.title} | Aatomate AI Automation`,
    description: industry.hero.subtitle,
    keywords: [
      `AI for ${industry.shortName}`,
      `Automate ${industry.shortName}`,
      `${industry.shortName} AI automation`,
      "AI Automation India",
      "Business Automation",
      "WhatsApp Bot",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: pageUrl,
      siteName: "Aatomate",
      title: `${industry.title} | Aatomate AI Automation`,
      description: industry.hero.subtitle,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Aatomate AI Automation solutions for ${industry.shortName} — ${industry.hero.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} | Aatomate`,
      description: industry.hero.subtitle,
      images: [
        {
          url: ogImageUrl,
          alt: `Aatomate AI Automation for ${industry.shortName}`,
        },
      ],
    },
  };
}

export default async function IndustryPage(props: Props) {
  const params = await props.params;
  const { slug } = params;
  
  const industry = industriesData.find(i => i.slug === slug);
  if (!industry) notFound();

  const IconComponent = IconMap[industry.iconName] || Zap;

  const pageUrl = `${siteUrl}/industries/${industry.slug}`;

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Industries",
        item: `${siteUrl}/industries`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: industry.title,
        item: pageUrl,
      },
    ],
  };

  // Service schema for this industry
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: industry.title,
    description: industry.hero.subtitle,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: "Aatomate",
      url: siteUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: `AI Automation for ${industry.shortName}`,
    offers: industry.solutions.map((solution) => ({
      "@type": "Offer",
      name: solution.title,
      description: solution.description,
    })),
  };

  return (
    <main className="bg-[#030303] min-h-screen text-white overflow-hidden selection:bg-[#25D366]/30">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Navbar />

      {/* Ambient Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{
        background: `linear-gradient(to bottom, ${industry.themeColor}15, #030303, #030303)`
      }} aria-hidden="true" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20 pointer-events-none rounded-full blur-[150px]" 
        style={{ background: industry.themeColor }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} aria-hidden="true" />

      {/* 1. Hero Section */}
      <section className="relative pt-[140px] pb-24 md:pt-[200px] md:pb-24 px-4 max-w-[1200px] mx-auto z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-white font-bold text-[13px] tracking-widest uppercase rounded-full w-fit border border-white/10 mb-8 backdrop-blur-md shadow-xl">
          <IconComponent className="w-4 h-4" style={{ color: industry.themeColor }} aria-hidden="true" />
          {industry.title}
        </div>

        <h1 className="font-display text-[48px] sm:text-[64px] md:text-[80px] leading-[1.0] tracking-tight uppercase text-white drop-shadow-2xl mb-6 mx-auto max-w-5xl">
          {industry.hero.title}
        </h1>
        <p className="text-[18px] md:text-[24px] text-white/70 max-w-3xl mx-auto mb-12 font-medium">
          {industry.hero.subtitle}
        </p>

        <div className="flex justify-center">
          <Link href="/contact" className="inline-flex items-center gap-3 text-black font-bold text-[18px] px-10 py-5 rounded-full hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all" style={{ backgroundColor: industry.themeColor }}>
            Automate Your Operations <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 2. Problems vs Solutions Bento */}
      <section className="py-24 relative z-10 border-t border-white/5 bg-black/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-[40px] md:text-[56px] uppercase tracking-tight text-white mb-4">The Old Way vs. The AI Way</h2>
            <p className="text-white/60 text-[18px]">How we eliminate friction in {industry.shortName}.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Problems Column */}
            <div className="space-y-6">
              {industry.problems.map((problem, idx) => (
                <div key={idx} className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2rem] flex items-start gap-4 hover:bg-red-500/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 border border-red-500/30">
                    <AlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-white mb-2">{problem.title}</h3>
                    <p className="text-white/60 leading-relaxed font-medium">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Solutions Column */}
            <div className="space-y-6">
              {industry.solutions.map((solution, idx) => {
                const SolIcon = IconMap[solution.icon] || CheckCircle2;
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex items-start gap-4 hover:bg-white/10 transition-colors relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:opacity-40 transition-opacity" style={{ background: industry.themeColor }} aria-hidden="true" />
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20" style={{ color: industry.themeColor }}>
                      <SolIcon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-[20px] font-bold text-white mb-2">{solution.title}</h3>
                      <p className="text-white/80 leading-relaxed font-medium">{solution.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Results */}
      <section className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
             <div className="absolute inset-0 pointer-events-none" style={{
              background: `linear-gradient(to top right, transparent, ${industry.themeColor}10, transparent)`
            }} aria-hidden="true" />
            
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
              <div className="w-full md:w-1/3 shrink-0">
                <h3 className="text-[32px] md:text-[48px] font-display uppercase tracking-tight text-white leading-none mb-4">
                  Expected<br/><span style={{ color: industry.themeColor }}>ROI</span>
                </h3>
                <p className="text-white/60 font-medium">
                  The impact of deploying our agentic workflows in {industry.shortName}.
                </p>
              </div>
              
              <ul className="w-full md:w-2/3 space-y-6">
                {industry.results.map((res: string, i: number) => (
                  <li key={i} className="flex items-start gap-6 bg-white/5 border border-white/5 p-6 rounded-3xl hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-white/10" style={{ backgroundColor: `${industry.themeColor}20` }}>
                      <TrendingUp className="w-6 h-6" style={{ color: industry.themeColor }} aria-hidden="true" />
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

      {/* 4. CTA */}
      <section className="py-32 px-4 relative z-10 border-t border-white/5 overflow-hidden text-center">
        <h2 className="font-display text-[48px] md:text-[72px] uppercase tracking-tight text-white mb-8">
          Ready to scale your <br/><span style={{ color: industry.themeColor }}>{industry.shortName}</span> operations?
        </h2>
        <Link href="/contact" className="inline-flex items-center gap-3 text-black font-bold text-[18px] px-10 py-5 rounded-full hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all" style={{ backgroundColor: industry.themeColor }}>
          Book a Free Consultation <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}

