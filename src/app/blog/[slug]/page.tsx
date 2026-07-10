import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
};

// Generate SEO Metadata for the specific blog post
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Aatomate Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Aatomate Blog`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage ? [post.coverImage] : []
    }
  };
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const { slug } = params;
  
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  // JSON-LD Schema for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.coverImage ? [post.coverImage] : [],
    "datePublished": post.date,
    "author": [{
      "@type": "Person",
      "name": post.author
    }]
  };

  return (
    <main className="bg-canvas-ice min-h-screen text-midnight-ink selection:bg-action-green selection:text-midnight-ink">
      {/* Inject Article Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />

      <article className="relative pt-[140px] pb-24 md:pt-[180px] md:pb-32 px-4 sm:px-[32px] lg:px-[40px] max-w-[900px] mx-auto z-10">
        
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-midnight-ink/60 hover:text-midnight-ink mb-10 font-mono text-[12px] tracking-widest uppercase transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, i) => (
            <span key={i} className="bg-action-green/20 text-[#1a9a4b] font-bold text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-action-green/30">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-display text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em] uppercase text-midnight-ink mb-8">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 border-b border-black/10 pb-8 mb-12">
          <div className="w-12 h-12 rounded-full bg-midnight-ink text-white flex items-center justify-center font-bold text-[18px]">
            {post.author.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-[15px]">{post.author}</div>
            <div className="text-[13px] text-midnight-ink/60 font-mono mt-0.5">{post.date}</div>
          </div>
        </div>

        {post.coverImage && (
          <div className="w-full aspect-[21/9] bg-gray-200 rounded-[32px] overflow-hidden mb-16 shadow-xl">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-lg md:prose-xl prose-p:font-medium prose-p:text-midnight-ink/80 prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight prose-a:text-action-green max-w-none">
          {/* Note: In a real CMS implementation, this would be MDX or rich text HTML rendering */}
          <p className="text-[20px] md:text-[24px] leading-relaxed mb-8">
            {post.content}
          </p>
          
          <p>
            Implementing intelligent automation within modern enterprise environments is no longer just a competitive advantage—it is a baseline requirement for survival in the rapidly digitizing economy of 2026.
          </p>
          
          <h2>The True Cost of Manual Processes</h2>
          <p>
            For years, organizations threw human capital at operational inefficiencies. If a process was broken or too complex for legacy software, the answer was simply to hire more administrators. This approach created massive overhead and fundamentally flawed scaling models.
          </p>

          <blockquote>
            "AI doesn't just replace the task; it re-engineers the entire workflow, eliminating the friction points that humans were previously hired to smooth over."
          </blockquote>

          <h2>Moving Forward</h2>
          <p>
            To begin your journey into AI automation, start by mapping out your highest-frequency, lowest-complexity tasks. Whether it's answering customer FAQs, parsing invoices, or scheduling appointments, there is an agentic workflow ready to handle it.
          </p>
        </div>

      </article>

      {/* CTA Section */}
      <section className="py-24 bg-midnight-ink text-white text-center px-4">
        <h2 className="font-display text-[40px] md:text-[56px] uppercase tracking-tight mb-6">Ready to Automate?</h2>
        <p className="text-white/70 text-[18px] max-w-2xl mx-auto mb-10">Stop wasting time on manual tasks. Deploy our pre-built AI agents in days, not months.</p>
        <Link href="/contact" className="inline-block bg-action-green text-midnight-ink font-bold px-10 py-5 rounded-full hover:bg-[#20bd5a] transition-all hover:scale-105 shadow-xl">
          Book a Free Consultation
        </Link>
      </section>

      <Footer />
    </main>
  );
}
