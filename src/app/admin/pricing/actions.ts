"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPricingPlan(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const badge_text = formData.get("badge_text") as string;
  const features_str = formData.get("features") as string;
  const monthly_price_str = formData.get("monthly_price") as string;
  const setup_fee = formData.get("setup_fee") as string;
  const cta_text = formData.get("cta_text") as string;
  const display_order_str = formData.get("display_order") as string;
  const popular = formData.get("popular") === "on";

  const monthly_price = monthly_price_str ? parseFloat(monthly_price_str) : null;
  const display_order = display_order_str ? parseInt(display_order_str, 10) : 0;

  if (!name) {
    throw new Error("Plan name is required");
  }

  const { data: plan, error } = await supabase.from("pricing_plans").insert({
    plan_name: name,
    description: description || null,
    badge_text: badge_text || null,
    monthly_price,
    setup_fee: setup_fee || null,
    cta_text: cta_text || null,
    display_order,
    popular
  }).select().single();

  if (error) {
    console.error("Error creating pricing plan:", error);
    throw new Error("Failed to create pricing plan");
  }

  if (features_str && plan) {
    const featureLines = features_str.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (featureLines.length > 0) {
      const featuresToInsert = featureLines.map((feature_text, index) => ({
        plan_id: plan.id,
        feature_text,
        display_order: index,
        is_included: true
      }));

      const { error: featuresError } = await supabase.from("pricing_features").insert(featuresToInsert);
      
      if (featuresError) {
        console.error("Error creating pricing features:", featuresError);
      }
    }
  }

  revalidatePath("/admin/pricing");
  revalidatePath("/");
  redirect("/admin/pricing");
}

export async function deletePricingPlan(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("pricing_plans").delete().eq("id", id);
  if (error) {
    console.error("Error deleting pricing plan:", error);
    throw new Error("Failed to delete pricing plan");
  }
  revalidatePath("/admin/pricing");
  revalidatePath("/");
}

export async function updatePricingPlan(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const badge_text = formData.get("badge_text") as string;
  const features_str = formData.get("features") as string;
  const monthly_price_str = formData.get("monthly_price") as string;
  const setup_fee = formData.get("setup_fee") as string;
  const cta_text = formData.get("cta_text") as string;
  const display_order_str = formData.get("display_order") as string;
  const popular = formData.get("popular") === "on";

  const monthly_price = monthly_price_str ? parseFloat(monthly_price_str) : null;
  const display_order = display_order_str ? parseInt(display_order_str, 10) : 0;

  if (!name) {
    throw new Error("Plan name is required");
  }

  const { error } = await supabase.from("pricing_plans").update({
    plan_name: name,
    description: description || null,
    badge_text: badge_text || null,
    monthly_price,
    setup_fee: setup_fee || null,
    cta_text: cta_text || null,
    display_order,
    popular
  }).eq("id", id);

  if (error) {
    console.error("Error updating pricing plan:", error);
    throw new Error("Failed to update pricing plan");
  }

  await supabase.from("pricing_features").delete().eq("plan_id", id);
  
  if (features_str) {
    const featureLines = features_str.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (featureLines.length > 0) {
      const featuresToInsert = featureLines.map((feature_text, index) => ({
        plan_id: id,
        feature_text,
        display_order: index,
        is_included: true
      }));
      const { error: featuresError } = await supabase.from("pricing_features").insert(featuresToInsert);
      if (featuresError) {
        console.error("Error updating pricing features:", featuresError);
      }
    }
  }

  revalidatePath("/admin/pricing");
  revalidatePath("/");
  redirect("/admin/pricing");
}
