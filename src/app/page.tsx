import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { createClient } from "@/lib/supabase/server";

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

  const { data: pricingPlans } = await supabase
    .from('pricing_plans')
    .select('*')
    .order('display_order', { ascending: true });

  const { data: pricingFeatures } = await supabase
    .from('pricing_features')
    .select('*')
    .order('display_order', { ascending: true });

  // Map features to plans
  const mappedPlans = (pricingPlans || []).map((plan: any) => ({
    ...plan,
    features: (pricingFeatures || []).filter((f: any) => f.plan_id === plan.id)
  }));

  return (
    <main className="bg-canvas-ice min-h-screen">
      <Navbar />
      <Hero />
      <Services services={services || []} />
      <Process />
      <Results useCases={useCases || []} caseStudies={caseStudies || []} />
      <Testimonials testimonials={testimonials || []} />
      <Pricing plans={mappedPlans} />
      <FAQ faqs={faqs || []} />
      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
