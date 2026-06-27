import { createClient } from "@/lib/supabase/server";
import DemosClient from "./client";

export default async function DemosPage() {
  const supabase = await createClient();

  const { data: demos, error } = await supabase
    .from('demo_bookings')
    .select('*')
    .order('booking_date', { ascending: true });

  if (error) {
    console.error("Error fetching demos:", error);
  }

  return <DemosClient initialDemos={demos || []} />;
}
