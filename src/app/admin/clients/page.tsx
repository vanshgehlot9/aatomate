import { createClient } from "@/lib/supabase/server";
import ClientsClient from "./client";

export default async function ClientsPage() {
  const supabase = await createClient();

  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching clients:", error);
  }

  return <ClientsClient initialClients={clients || []} />;
}
