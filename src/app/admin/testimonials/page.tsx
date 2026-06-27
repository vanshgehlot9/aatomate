import TestimonialsClient from "./client";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
  const supabase = await createClient();

  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  return <TestimonialsClient initialTestimonials={testimonials || []} />;
}
