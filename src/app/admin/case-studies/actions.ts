'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createCaseStudy(formData: FormData) {
  const supabase = await createClient()

  // Extract data
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const industry = formData.get('industry') as string
  const problem = formData.get('problem') as string
  const solution = formData.get('solution') as string
  const status = formData.get('status') as string || 'Draft'
  
  // Results formatting
  const metricNames = formData.getAll('metricName')
  const metricValues = formData.getAll('metricValue')
  
  const results = metricNames.map((name, i) => ({
    name: name as string,
    value: metricValues[i] as string
  })).filter(r => r.name && r.value)

  // Handle Image Upload
  const imageFile = formData.get('featuredImage') as File
  let featured_image = null
  
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${slug}-${Date.now()}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('case-studies')
      .upload(fileName, imageFile)
      
    if (!uploadError && uploadData) {
      const { data: publicUrlData } = supabase.storage
        .from('case-studies')
        .getPublicUrl(uploadData.path)
        
      featured_image = publicUrlData.publicUrl
    }
  }

  // Insert into DB
  const { data, error } = await supabase.from('case_studies').insert([{
    title,
    slug,
    industry,
    problem,
    solution,
    status,
    featured_image,
    results: results as any,
  }]).select().single()

  if (error) {
    console.error("Error creating case study:", error)
    return { error: error.message }
  }

  revalidatePath('/admin/case-studies')
  revalidatePath('/')
  redirect('/admin/case-studies')
}
