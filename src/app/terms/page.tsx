import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-[#fbff00] selection:text-black">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-40 pb-32">
        <h1 className="font-display text-[48px] md:text-[64px] uppercase font-bold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-white/40 font-mono text-[14px] uppercase tracking-widest mb-16 border-b border-white/10 pb-8">Last Updated: June 2026</p>
        
        <div className="text-white/80 text-[18px] leading-relaxed space-y-8 [&>h2]:font-display [&>h2]:text-[32px] [&>h2]:text-white [&>h2]:uppercase [&>h2]:mt-16 [&>h2]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>p>a]:text-[#fbff00] [&>p>a]:underline">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using our services at Aatomate, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access our services.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Aatomate and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>
            You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, or impairs the service. We reserve the right to terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
            In no event shall Aatomate, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>5. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. We will try to provide at least 30 days notice prior to any new terms taking effect.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at: <a href="mailto:hello@aatomate.com">hello@aatomate.com</a>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
