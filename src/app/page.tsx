import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import TrustSection from "@/components/TrustSection";

const Problems = dynamic(() => import("@/components/Problems"));
const Solutions = dynamic(() => import("@/components/Solutions"));
const Products = dynamic(() => import("@/components/Products"));
const Services = dynamic(() => import("@/components/Services"));
const IndustriesServed = dynamic(() => import("@/components/IndustriesServed"));
const Results = dynamic(() => import("@/components/Results"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Process = dynamic(() => import("@/components/Process"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));
const Footer = dynamic(() => import("@/components/Footer"));

import { createClient } from "@/lib/supabase/server";

const fallbackFaqsForSchema = [
  { question: "How long does implementation take?", answer: "Implementation time varies based on complexity, but most of our core AI agents and WhatsApp bots are deployed within 2 to 4 weeks. Custom enterprise integrations may take 6 to 8 weeks." },
  { question: "How secure is your AI?", answer: "Security is our top priority. Our solutions are built with enterprise-grade encryption, and we offer HIPAA-compliant architecture for healthcare clients. We never train public models on your proprietary data." },
  { question: "Can AI integrate with ERP?", answer: "Absolutely. Our AI seamlessly integrates with leading ERPs and CRMs including SAP, Salesforce, Oracle, QuickBooks, and Hubspot." },
  { question: "Do you build custom AI?", answer: "Yes. While we have pre-built modules for quick deployment, we specialize in building bespoke AI agents tailored specifically to your unique business logic." },
  { question: "What industries do you support?", answer: "We build automation solutions across Healthcare, Manufacturing, E-commerce, Retail, Real Estate, and Recruitment." },
];

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch only published case studies
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('*')
    .eq('status', 'Published')
    .order('created_at', { ascending: false })
    .limit(4);

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });

  const { data: useCases } = await supabase
    .from('use_cases')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false });

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });


  // Build FAQ schema using Supabase data or fallback
  const faqsForSchema = (faqs && faqs.length > 0)
    ? faqs.map((f: any) => ({ question: f.question, answer: f.answer }))
    : fallbackFaqsForSchema;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsForSchema.map(({ question, answer }: { question: string; answer: string }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  // Product schemas for the two flagship bots
  const productSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Doctor Booking Bot by Aatomate",
      applicationCategory: "BusinessApplication",
      operatingSystem: "WhatsApp",
      description: "Automate patient appointment booking, reminders, and healthcare FAQs directly on WhatsApp with HIPAA-compliant AI.",
      offers: {
        "@type": "Offer",
        seller: { "@type": "Organization", name: "Aatomate" },
      },
      url: "https://aatomate.com/products/doctor-bot",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Hotel Booking Bot by Aatomate",
      applicationCategory: "BusinessApplication",
      operatingSystem: "WhatsApp",
      description: "Process room reservations, payments, and concierge requests instantly via WhatsApp. Direct zero-commission bookings.",
      offers: {
        "@type": "Offer",
        seller: { "@type": "Organization", name: "Aatomate" },
      },
      url: "https://aatomate.com/products/hotel-bot",
    },
  ];

  // Aggregate rating schema from testimonials or default
  const totalReviews = (testimonials && testimonials.length > 0) ? testimonials.length : 25;
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aatomate",
    url: "https://aatomate.com",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: totalReviews,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <main className="bg-canvas-ice min-h-screen">
      {/* Structured Data — FAQPage, Products, Ratings */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {productSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />

      <Navbar />
      
      {/* 1. Hero */}
      <Hero />
      
      {/* 2. Statistics (moved to immediately after Hero) */}
      <Statistics />

      {/* 3. Trusted by Companies */}
      <TrustSection />

      {/* 4. Problems */}
      <Problems />

      {/* 5. Solutions */}
      <Solutions />

      {/* 6. Products */}
      <Products />

      {/* 7. Services */}
      <Services services={services || []} />

      {/* 8. Industries Served */}
      <IndustriesServed />

      {/* 9. Case Studies (Results) */}
      <Results useCases={useCases || []} caseStudies={caseStudies || []} />

      {/* 10. Testimonials */}
      <Testimonials testimonials={testimonials || []} />

      {/* 11. Our Process */}
      <Process />

      {/* 12. Why Choose Us */}
      <WhyChooseUs />

      {/* 13. FAQs */}
      <FAQ faqs={faqs || []} />

      {/* 14. Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Icon */}
      <a 
        href="https://wa.me/919000272248?text=Hello%20Aatomate%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services." 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat with Aatomate on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-[64px] h-[64px] bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="w-[36px] h-[36px] text-white" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </main>
  );
}
