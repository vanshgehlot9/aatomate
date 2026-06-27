"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFAQ(formData: FormData) {
  const supabase = await createClient();

  const question = formData.get("question") as string;
  const answer = formData.get("answer") as string;
  const display_order_str = formData.get("display_order") as string;

  const display_order = display_order_str ? parseInt(display_order_str, 10) : 0;

  if (!question || !answer) {
    throw new Error("Question and Answer are required");
  }

  const { error } = await supabase.from("faqs").insert({
    question,
    answer,
    display_order
  });

  if (error) {
    console.error("Error creating FAQ:", error);
    throw new Error("Failed to create FAQ");
  }

  revalidatePath("/admin/faqs");
  revalidatePath("/");
  redirect("/admin/faqs");
}
