"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createService(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const description = formData.get("description") as string;
  const icon_name = formData.get("icon_name") as string;
  const display_order_str = formData.get("display_order") as string;

  const display_order = display_order_str ? parseInt(display_order_str, 10) : 0;

  const { data: authData, error: authError } = await supabase.auth.getUser();
  console.log("Current Auth User in Action:", authData.user?.id, "Auth Error:", authError);

  if (!title) {
    throw new Error("Title is required");
  }

  const { error } = await supabase.from("services").insert({
    title,
    slug,
    description: description || null,
    icon_name: icon_name || null,
    display_order
  });

  if (error) {
    console.error("Error creating service:", error);
    throw new Error("Failed to create service");
  }

  revalidatePath("/admin/services");
  revalidatePath("/"); // Revalidate homepage
  redirect("/admin/services");
}
