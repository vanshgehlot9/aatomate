"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPricingPlan(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const monthly_price_str = formData.get("monthly_price") as string;
  const yearly_price_str = formData.get("yearly_price") as string;
  const setup_fee = formData.get("setup_fee") as string;
  const cta_text = formData.get("cta_text") as string;
  const display_order_str = formData.get("display_order") as string;
  const popular = formData.get("popular") === "on";

  const monthly_price = monthly_price_str ? parseFloat(monthly_price_str) : null;
  const yearly_price = yearly_price_str ? parseFloat(yearly_price_str) : null;
  const display_order = display_order_str ? parseInt(display_order_str, 10) : 0;

  if (!name) {
    throw new Error("Plan name is required");
  }

  const { error } = await supabase.from("pricing_plans").insert({
    name,
    monthly_price,
    yearly_price,
    setup_fee: setup_fee || null,
    cta_text: cta_text || null,
    display_order,
    popular
  });

  if (error) {
    console.error("Error creating pricing plan:", error);
    throw new Error("Failed to create pricing plan");
  }

  revalidatePath("/admin/pricing");
  revalidatePath("/");
  redirect("/admin/pricing");
}
