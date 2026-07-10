import { blogPosts } from "@/data/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aatomate Blog | Insights on AI Automation",
  description: "Read our latest articles on AI Automation India, Business Automation Company insights, AI Consulting Services, and Workflow Automation trends.",
  openGraph: {
    title: "Aatomate Blog | Insights on AI Automation",
    description: "Read our latest articles on AI Automation India, Business Automation Company insights, AI Consulting Services, and Workflow Automation trends.",
  }
};

export default function BlogIndex() {
  return (
    <main className="bg-canvas-ice min-h-screen text-midnight-ink overflow-hidden selection:bg-action-green selection:text-midnight-ink">
      <Navbar />

      <section className="relative pt-[140px] pb-24 md:pt-[200px] md:pb-32 px-4 sm:px-[32px] lg:px-[40px] max-w-[1400px] mx-auto z-10">
        <div className="max-w-3xl mb-20">
          <h1 className="font-display text-[48px] md:text-[80px] leading-[1] tracking-[-0.02em] uppercase mb-6 text-midnight-ink drop-shadow-sm">
            Insights & <br/><span className="text-midnight-ink/40">Perspectives</span>
          </h1>
          <p className="text-[18px] md:text-[24px] text-ash-gray font-medium leading-relaxed">
            Thoughts, frameworks, and strategies from the frontier of business automation and artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white border border-black/5 rounded-[32px] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                {post.coverImage && (
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {post.tags.slice(0, 1).map((tag, i) => (
                    <span key={i} className="bg-white/90 backdrop-blur-sm text-midnight-ink text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between text-[12px] font-mono text-ash-gray mb-4">
                  <span>{post.date}</span>
                </div>
                
                <h3 className="font-display text-[24px] md:text-[28px] leading-[1.1] uppercase tracking-tight text-midnight-ink mb-4 group-hover:text-action-green transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-[15px] text-midnight-ink/70 leading-relaxed font-medium mb-8 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-[14px] font-bold text-midnight-ink group-hover:text-action-green transition-colors mt-auto">
                  Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
