import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog'
import { industriesData } from '@/data/industries'
import { productsData } from '@/data/products'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aatomate.com'

  // Static Routes
  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ] as MetadataRoute.Sitemap

  // Dynamic Blog Routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.7,
  })) as MetadataRoute.Sitemap

  // Dynamic Industry Routes
  const industryRoutes = industriesData.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  })) as MetadataRoute.Sitemap

  // Dynamic Product Routes
  const productRoutes = productsData.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  })) as MetadataRoute.Sitemap

  // Fetch Case Studies from Supabase if possible (gracefully fallback on error)
  let caseStudyRoutes: MetadataRoute.Sitemap = []
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    )
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data } = await supabase.from('case_studies').select('slug, updated_at').eq('status', 'Published')
      if (data) {
        caseStudyRoutes = data.map((cs) => ({
          url: `${baseUrl}/case-studies/${cs.slug}`,
          lastModified: new Date(cs.updated_at || new Date()),
          changeFrequency: 'monthly',
          priority: 0.8,
        }))
      }
    }
  } catch (error) {
    console.error('Failed to fetch case studies for sitemap', error)
  }

  return [...staticRoutes, ...blogRoutes, ...industryRoutes, ...productRoutes, ...caseStudyRoutes]
}
