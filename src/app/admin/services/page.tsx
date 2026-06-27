import ServicesClient from "./client";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });

  return <ServicesClient initialServices={services || []} />;
}
