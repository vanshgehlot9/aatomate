import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-[#fbff00] selection:text-black">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-40 pb-32">
        <h1 className="font-display text-[48px] md:text-[64px] uppercase font-bold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-white/40 font-mono text-[14px] uppercase tracking-widest mb-16 border-b border-white/10 pb-8">Last Updated: June 2026</p>
        
        <div className="text-white/80 text-[18px] leading-relaxed space-y-8 [&>h2]:font-display [&>h2]:text-[32px] [&>h2]:text-white [&>h2]:uppercase [&>h2]:mt-16 [&>h2]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>p>a]:text-[#fbff00] [&>p>a]:underline">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Aatomate. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>

          <h2>2. The Data We Collect About You</h2>
          <p>
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes billing address, email address and telephone numbers.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
          </ul>

          <h2>3. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>

          <h2>5. Contact Details</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:info@aatomate.com">info@aatomate.com</a>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
