import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditForm from "./edit-form";

export default async function EditPricingPlanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: plan, error } = await supabase.from("pricing_plans").select("*").eq("id", id).single();
  
  if (error || !plan) {
    notFound();
  }

  const { data: features } = await supabase.from("pricing_features").select("*").eq("plan_id", id).order("display_order");

  return <EditForm plan={plan} features={features || []} />;
}
