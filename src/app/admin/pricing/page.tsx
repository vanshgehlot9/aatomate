import PricingClient from "./client";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  const supabase = await createClient();

  const { data: plans } = await supabase
    .from('pricing_plans')
    .select('*')
    .order('display_order', { ascending: true });

  const { data: features } = await supabase
    .from('pricing_features')
    .select('*')
    .order('display_order', { ascending: true });

  // Group features by plan_id
  const plansWithFeatures = (plans || []).map((plan: any) => ({
    ...plan,
    features: (features || []).filter((f: any) => f.plan_id === plan.id)
  }));

  return <PricingClient initialPlans={plansWithFeatures} />;
}
