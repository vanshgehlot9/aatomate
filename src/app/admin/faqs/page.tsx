import FAQsClient from "./client";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function FAQsPage() {
  const supabase = await createClient();

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });

  return <FAQsClient initialFAQs={faqs || []} />;
}
