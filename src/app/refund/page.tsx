import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPolicy() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-[#fbff00] selection:text-black">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-40 pb-32">
        <h1 className="font-display text-[48px] md:text-[64px] uppercase font-bold tracking-tight mb-4">Refund Policy</h1>
        <p className="text-white/40 font-mono text-[14px] uppercase tracking-widest mb-16 border-b border-white/10 pb-8">Last Updated: June 2026</p>
        
        <div className="text-white/80 text-[18px] leading-relaxed space-y-8 [&>h2]:font-display [&>h2]:text-[32px] [&>h2]:text-white [&>h2]:uppercase [&>h2]:mt-16 [&>h2]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>p>a]:text-[#fbff00] [&>p>a]:underline">
          <h2>1. General Refund Terms</h2>
          <p>
            At Aatomate, we strive to ensure that you are fully satisfied with our AI automation services and deployments. However, due to the highly customized nature of our software and agent configurations, our refund policy is strictly governed by the terms outlined below.
          </p>

          <h2>2. Setup Fees</h2>
          <p>
            Any one-time setup or onboarding fees are non-refundable once work has commenced. These fees cover the manual labor, architectural planning, and custom integration work required to deploy your AI agents.
          </p>

          <h2>3. Monthly Subscriptions</h2>
          <p>
            If you are on a recurring monthly subscription, you may cancel at any time. Cancellations will take effect at the end of your current billing cycle. We do not provide prorated refunds for partial months of service used.
          </p>

          <h2>4. Exceptional Circumstances</h2>
          <p>
            If there is a failure on our part to deliver the software specifications agreed upon in your Service Level Agreement (SLA), you may be eligible for a partial or full refund. Such cases are reviewed by our management team on an individual basis.
          </p>

          <h2>5. How to Request a Refund</h2>
          <p>
            To request a refund or dispute a charge, please contact our billing department directly at: <a href="mailto:info@aatomate.com">info@aatomate.com</a> within 14 days of the charge. Please include your company name and detailed reasons for the request.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
