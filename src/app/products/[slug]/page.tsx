import { productsData } from "@/data/products";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductHero from "./components/ProductHero";
import ProductProblems from "./components/ProductProblems";
import ProductSolutions from "./components/ProductSolutions";
import ProductWorkflow from "./components/ProductWorkflow";
import ProductIntegrations from "./components/ProductIntegrations";
import ProductFAQ from "./components/ProductFAQ";
import ProductCTA from "./components/ProductCTA";

export function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-paper-white min-h-screen selection:bg-[#25D366] selection:text-white">
      <Navbar />
      
      <div className="pt-24 md:pt-32">
        <ProductHero product={product} />
        <ProductProblems product={product} />
        <ProductSolutions product={product} />
        <ProductWorkflow product={product} />
        <ProductIntegrations product={product} />
        <ProductFAQ product={product} />
        <ProductCTA product={product} />
      </div>

      <Footer />
    </main>
  );
}
