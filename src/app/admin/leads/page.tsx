import { createClient } from "@/lib/supabase/server";
import LeadsClient from "./client";

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching leads:", error);
    // You could render an error state component here
  }

  return <LeadsClient initialLeads={leads || []} />;
}
