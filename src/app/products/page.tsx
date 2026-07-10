import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Products from "@/components/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Products & Automation Bots | Aatomate",
  description: "Explore our ready-to-deploy AI products, including the Doctor Booking Bot and Hotel Booking Bot. Scale your operations instantly on WhatsApp.",
};

export default function ProductsPage() {
  return (
    <main className="bg-paper-white min-h-screen text-midnight-ink overflow-hidden selection:bg-action-green selection:text-midnight-ink">
      <Navbar />

      {/* Hero for Products Page */}
      <section className="pt-[140px] pb-10 md:pt-[180px] text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-display text-[48px] md:text-[72px] leading-[1] tracking-[-0.02em] uppercase text-midnight-ink mb-6">
          Ready-to-Deploy <br/><span className="text-midnight-ink/40">AI Agents</span>
        </h1>
        <p className="text-[18px] md:text-[22px] text-midnight-ink/60 font-medium">
          Stop building from scratch. Leverage our battle-tested automation models tailored for your exact industry.
        </p>
      </section>

      {/* Reusing the Products Component */}
      <div className="-mt-16">
        <Products />
      </div>

      <Footer />
    </main>
  );
}
