"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient();

  const author_name = formData.get("author_name") as string;
  const author_title = formData.get("author_title") as string;
  const company = formData.get("company") as string;
  const content = formData.get("content") as string;
  const rating_str = formData.get("rating") as string;
  const is_featured = formData.get("is_featured") === "on";

  const rating = rating_str ? parseInt(rating_str, 10) : 5;

  if (!author_name || !content) {
    throw new Error("Author Name and Content are required");
  }

  const { error } = await supabase.from("testimonials").insert({
    author_name,
    author_title: author_title || null,
    company: company || null,
    content,
    rating,
    is_featured,
  });

  if (error) {
    console.error("Error creating testimonial:", error);
    throw new Error("Failed to create testimonial");
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}
