"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUseCase(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const bg_color = formData.get("bg_color") as string;
  const visual_color = formData.get("visual_color") as string;
  const display_order_str = formData.get("display_order") as string;

  const display_order = display_order_str ? parseInt(display_order_str, 10) : 0;

  if (!title || !slug) {
    throw new Error("Title and Slug are required");
  }

  const { error } = await supabase.from("use_cases").insert({
    title,
    slug,
    description: description || null,
    bg_color: bg_color || null,
    visual_color: visual_color || null,
    display_order,
    is_published: true
  });

  if (error) {
    console.error("Error creating use case:", error);
    throw new Error("Failed to create use case");
  }

  revalidatePath("/admin/use-cases");
  revalidatePath("/");
  redirect("/admin/use-cases");
}
